#!/usr/bin/env python3
"""
Simple script to start the FastAPI server from the correct directory
"""
import os
import sys
import subprocess


def start_server():
    """Start the FastAPI server"""
    try:
        # Change to the correct directory
        script_dir = os.path.dirname(os.path.abspath(__file__))
        os.chdir(script_dir)

        print(f"Starting server from: {os.getcwd()}")
        print("🚀 Starting FastAPI server...")

        # Start uvicorn
        subprocess.run([
            sys.executable, "-m", "uvicorn",
            "app.main:app",
            "--reload",
            "--host", "0.0.0.0",
            "--port", "8000"
        ])

    except KeyboardInterrupt:
        print("\n👋 Server stopped by user")
    except Exception as e:
        print(f"❌ Error starting server: {e}")
        sys.exit(1)


if __name__ == "__main__":
    start_server()
