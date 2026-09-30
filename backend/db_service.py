"""
Database Persistence and Repository Service Layer.
Implements dual persistence:
1. Enterprise MongoDB Atlas when configured via MONGODB_URI.
2. Zero-dependency local SQLite database when offline or without external credentials.
Ensures password hashing, frozen experiment snapshots, and indexed collections.
"""

import os
import json
import sqlite3
import time
from typing import Dict, Any, List, Optional, Tuple
from werkzeug.security import generate_password_hash, check_password_hash

class DatabaseService:
    def __init__(self):
        self.use_mongo = False
        self.mongo_client = None
        self.db = None
        self.sqlite_path = os.path.join(os.path.dirname(__file__), "digital_lab.sqlite3")

        mongo_uri = os.environ.get("MONGODB_URI")
        if mongo_uri:
            try:
                from pymongo import MongoClient
                # Timeout quickly if unreachable so local dev does not hang
                self.mongo_client = MongoClient(mongo_uri, serverSelectionTimeoutMS=2000)
                self.mongo_client.admin.command("ping")
                self.db = self.mongo_client[os.environ.get("DB_NAME", "electrical_machines_db")]
                self.use_mongo = True
                print("Connected successfully to MongoDB Atlas.")
            except Exception as e:
                print(f"MongoDB connection failed ({e}). Falling back to local SQLite repository.")
                self.use_mongo = False

        if not self.use_mongo:
            self._init_sqlite()

        self._seed_default_users()

    def _init_sqlite(self):
        conn = sqlite3.connect(self.sqlite_path)
        cur = conn.cursor()
        # Users table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS users (
                username TEXT PRIMARY KEY,
                password_hash TEXT NOT NULL,
                role TEXT NOT NULL,
                created_at REAL NOT NULL
            )
        """)
        # Machine presets table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS machine_presets (
                id TEXT PRIMARY KEY,
                name TEXT NOT NULL,
                config_json TEXT NOT NULL,
                updated_at REAL NOT NULL
            )
        """)
        # Experiment runs table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS experiment_runs (
                run_id TEXT PRIMARY KEY,
                experiment_id TEXT NOT NULL,
                student_name TEXT NOT NULL,
                data_json TEXT NOT NULL,
                created_at REAL NOT NULL
            )
        """)
        # AI Change requests table
        cur.execute("""
            CREATE TABLE IF NOT EXISTS ai_improvements (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                prompt TEXT NOT NULL,
                username TEXT NOT NULL,
                status TEXT NOT NULL,
                branch_name TEXT,
                created_at REAL NOT NULL
            )
        """)
        conn.commit()
        conn.close()

    def _seed_default_users(self):
        # Default admin and student with securely hashed passwords
        if self.use_mongo:
            users_col = self.db["users"]
            if users_col.count_documents({"username": "admin"}) == 0:
                users_col.insert_one({
                    "username": "admin",
                    "password_hash": generate_password_hash("password"),
                    "role": "admin",
                    "created_at": time.time()
                })
            if users_col.count_documents({"username": "student"}) == 0:
                users_col.insert_one({
                    "username": "student",
                    "password_hash": generate_password_hash("password"),
                    "role": "student",
                    "created_at": time.time()
                })
        else:
            conn = sqlite3.connect(self.sqlite_path)
            cur = conn.cursor()
            cur.execute("SELECT username FROM users WHERE username = 'admin'")
            if not cur.fetchone():
                cur.execute(
                    "INSERT INTO users VALUES (?, ?, ?, ?)",
                    ("admin", generate_password_hash("password"), "admin", time.time())
                )
            cur.execute("SELECT username FROM users WHERE username = 'student'")
            if not cur.fetchone():
                cur.execute(
                    "INSERT INTO users VALUES (?, ?, ?, ?)",
                    ("student", generate_password_hash("password"), "student", time.time())
                )
            conn.commit()
            conn.close()

    def authenticate_user(self, username: str, password: str) -> Optional[Dict[str, Any]]:
        """Verifies credentials using secure password hash comparison."""
        if self.use_mongo:
            user = self.db["users"].find_one({"username": username})
            if user:
                # Check hashed or legacy plaintext fallback
                phash = user.get("password_hash")
                if phash and check_password_hash(phash, password):
                    return {"username": user["username"], "role": user.get("role", "student")}
                elif user.get("password") == password:
                    # Upgrade legacy plaintext password to secure hash
                    self.db["users"].update_one(
                        {"username": username},
                        {"$set": {"password_hash": generate_password_hash(password)}, "$unset": {"password": ""}}
                    )
                    return {"username": user["username"], "role": user.get("role", "student")}
        else:
            conn = sqlite3.connect(self.sqlite_path)
            cur = conn.cursor()
            cur.execute("SELECT password_hash, role FROM users WHERE username = ?", (username,))
            row = cur.fetchone()
            conn.close()
            if row and check_password_hash(row[0], password):
                return {"username": username, "role": row[1]}
        return None

    def save_experiment_run(self, run_data: Dict[str, Any]) -> bool:
        """Stores complete experiment run record with frozen machine configuration."""
        run_id = run_data.get("run_id", f"RUN-{int(time.time())}")
        if self.use_mongo:
            self.db["experiment_runs"].replace_one({"run_id": run_id}, run_data, upsert=True)
            return True
        else:
            conn = sqlite3.connect(self.sqlite_path)
            cur = conn.cursor()
            cur.execute(
                "INSERT OR REPLACE INTO experiment_runs VALUES (?, ?, ?, ?, ?)",
                (
                    run_id,
                    run_data.get("experiment_id", ""),
                    run_data.get("student_name", "Student"),
                    json.dumps(run_data),
                    time.time()
                )
            )
            conn.commit()
            conn.close()
            return True

    def get_experiment_runs(self, student_name: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.use_mongo:
            query = {"student_name": student_name} if student_name else {}
            runs = []
            for r in self.db["experiment_runs"].find(query, {"_id": 0}):
                runs.append(r)
            return runs
        else:
            conn = sqlite3.connect(self.sqlite_path)
            cur = conn.cursor()
            if student_name:
                cur.execute("SELECT data_json FROM experiment_runs WHERE student_name = ? ORDER BY created_at DESC", (student_name,))
            else:
                cur.execute("SELECT data_json FROM experiment_runs ORDER BY created_at DESC")
            rows = cur.fetchall()
            conn.close()
            return [json.loads(r[0]) for r in rows]

    def log_ai_improvement(self, prompt: str, username: str, branch_name: str) -> bool:
        if self.use_mongo:
            self.db["improvements"].insert_one({
                "prompt": prompt,
                "username": username,
                "status": "pending_approval",
                "branch_name": branch_name,
                "created_at": time.time()
            })
            return True
        else:
            conn = sqlite3.connect(self.sqlite_path)
            cur = conn.cursor()
            cur.execute(
                "INSERT INTO ai_improvements (prompt, username, status, branch_name, created_at) VALUES (?, ?, ?, ?, ?)",
                (prompt, username, "pending_approval", branch_name, time.time())
            )
            conn.commit()
            conn.close()
            return True
