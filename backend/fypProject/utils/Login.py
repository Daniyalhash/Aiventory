import bcrypt
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from pymongo import MongoClient
from rest_framework.response import Response
from bson import ObjectId

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://syeddaniyalhashmi123:test123@cluster0.dutvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["FYP"]

SECRET_KEY = settings.SECRET_KEY if hasattr(settings, 'SECRET_KEY') else "fallback_secret_key"

class Login:

    @staticmethod
    def authenticate_user(email, password):
        user = db["users"].find_one({"email": email})

        if not user:
            return {"error": "User does not exist!"}, 404

        # Verify password
        # if not bcrypt.checkpw(password.encode('utf-8'), user["password"].encode('utf-8')):
        if not bcrypt.checkpw(password.encode('utf-8'), user["password"]):

            return {"error": "Invalid password!"}, 400

        # Generate JWT token
        payload = {
            "id": str(user["_id"]),
            "email": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=24)  # Token valid for 24 hours
        }

        # Correct usage of jwt.encode() with PyJWT
        token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")

        return {
            "message": "Login successful!",
            "token": token,
            "userId": str(user["_id"])  # Include userId in the response
        }, 200
