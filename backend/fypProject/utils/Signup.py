import bcrypt
from pymongo import MongoClient
from django.conf import settings

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://syeddaniyalhashmi123:test123@cluster0.dutvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["FYP"]

class Signup:

    @staticmethod
    def register_user(username, email, password):
        if db["users"].find_one({"email": email}):
            return {"error": "User already exists!"}, 400

        # Hash password
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        user = {
            "username": username,
            "email": email,
            "password": hashed_password.decode('utf-8'),
            "status": "incomplete",  # New field to indicate incomplete user profile
        }

        # Insert user into the database
        result = db["users"].insert_one(user)
        user_id = str(result.inserted_id)  # Get the user_id (MongoDB ObjectId as a string)

        return {
            "message": "User registered successfully!",
            "user_id": user_id
        }, 201
