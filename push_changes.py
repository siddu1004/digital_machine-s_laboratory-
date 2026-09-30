import os
import sys
from github import Github

# Fetch GitHub credentials strictly from environment
token = os.environ.get("GITHUB_PAT")
repo_name = os.environ.get("GITHUB_REPO", "siddardhvanguri-source/digital_machine-s_laboratory-")

if not token:
    print("Warning: GITHUB_PAT environment variable is not set.")
    print("Please export GITHUB_PAT='your_token' to push changes securely.")
    sys.exit(0)

try:
    g = Github(token)
    repo = g.get_repo(repo_name)
    
    # Push index.html
    if os.path.exists("index.html"):
        with open("index.html", "r", encoding="utf-8") as f:
            content = f.read()
            
        try:
            contents = repo.get_contents("index.html", ref="main")
            repo.update_file(contents.path, "Update 3D Models, Simulation & UI", content, contents.sha, branch="main")
            print("Successfully updated index.html on main branch.")
        except Exception as e:
            print(f"File might not exist or error occurred: {e}")
            repo.create_file("index.html", "Initial 3D Models and UI", content, branch="main")
            print("Successfully created index.html on main branch.")
            
    # Push app.py
    if os.path.exists("app.py"):
        with open("app.py", "r", encoding="utf-8") as f:
            app_content = f.read()
        try:
            app_contents = repo.get_contents("app.py", ref="main")
            repo.update_file(app_contents.path, "Update app.py", app_content, app_contents.sha, branch="main")
            print("Successfully updated app.py on main branch.")
        except Exception as e:
            repo.create_file("app.py", "Initial app.py", app_content, branch="main")
            print("Successfully created app.py on main branch.")
            
    # Push requirements.txt
    if os.path.exists("requirements.txt"):
        with open("requirements.txt", "r", encoding="utf-8") as f:
            req_content = f.read()
        try:
            req_contents = repo.get_contents("requirements.txt", ref="main")
            repo.update_file(req_contents.path, "Update requirements.txt", req_content, req_contents.sha, branch="main")
            print("Successfully updated requirements.txt on main branch.")
        except Exception as e:
            repo.create_file("requirements.txt", "Initial requirements.txt", req_content, branch="main")
            print("Successfully created requirements.txt on main branch.")
            
except Exception as e:
    print(f"Error during GitHub operation: {e}")
