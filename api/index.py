"""
Vercel Serverless Function entry point for Electrical Machines Digital Twin Laboratory.
Exposes the WSGI Flask app callable.
"""
import sys
import os

# Ensure the repository root directory is on the Python path
root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from app import app
