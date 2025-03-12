from itertools import product
import random
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from pymongo import MongoClient
import bcrypt
from utils.csv_validator import validate_columns
from utils.validate_file_extension import validate_file_extension
import pandas as pd
import jwt
import os
from django.core.files.storage import FileSystemStorage
from bson import ObjectId  # Import ObjectId from bson to handle MongoDB IDs
import csv
from io import StringIO
from datetime import datetime, timedelta
from io import BytesIO
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.core.exceptions import ValidationError  # Add this import for ValidationError
from rest_framework.decorators import api_view
from rest_framework.response import Response
from bson import ObjectId
from io import BytesIO
import pandas as pd
from datetime import datetime
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.ensemble import RandomForestClassifier

from datetime import datetime, timedelta  # ✅ Correct import


from django.core.mail import send_mail
from django.conf import settings
# utils 
from utils.Signup import Signup
from utils.Login import Login
from utils.dashboard_utils import DashboardUtils
from utils.inventory_utils import InventoryUtils
from utils.vendor_utils import VendorUtils
from utils.insights_utils import InsightsUtils
from utils.insights2_utils import InsightsManager


# MongoDB Atlas connection
client = MongoClient("mongodb+srv://syeddaniyalhashmi123:test123@cluster0.dutvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["FYP"]
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "fallback_secret_key")

# Initialize class with the database
dashboard_utils = DashboardUtils(db)
inventory_utils = InventoryUtils(db)
insights_manager = InsightsManager(db)
# Predefined mappings for keywords
COLUMN_MAP = {
    'vendor': ['vendor', 'reliability','ReliabilityScore', 'DeliveryTime','DeliveryTime', "new vendors", 'manufacturer', 'supplier'],
    'product': [
        'productname', 'category', 'subcategory', 'stock',
        'reorder', 'cost', 'selling', 'price', 'barcode',
        'expiry', 'past', 'sales', 'timespan', 'quantity'
    ]
    
    ,'unclassified': []  # This will be dynamically filled

}

REQUIRED_COLUMNS = [
    'productname', 'category', 'subcategory', 'vendor',
    'stockquantity', 'reorderthreshold', 'costprice',
    'sellingprice', 'timespan', 'expirydate', 'pastsalesdata',
    'DeliveryTime', 'ReliabilityScore', 'Barcode'
]

@api_view(['POST'])
def upload_dataset(request):
    try:
        # Get User ID
        user_id = request.data.get("user_id")
        if not user_id:
            return Response({"error": "User ID is required."}, status=400)

        # Check if the user already has a dataset uploaded
        user = db["users"].find_one({"_id": ObjectId(user_id)})
        if user and user.get("datasets") and len(user["datasets"]) > 0:
            return Response({"error": "You can only upload one dataset."}, status=400)

        # Check Dataset File
        if 'dataset' not in request.FILES:
            return Response({"error": "Dataset file is required."}, status=400)

        # Get Dataset File
        dataset_file = request.FILES['dataset']

        # Validate file type and size
        validate_file_extension(dataset_file.name)

        # Read the dataset into memory
        file_bytes = dataset_file.read()
        df = pd.read_csv(BytesIO(file_bytes))  # Load into pandas dataframe
        df.columns = df.columns.str.strip()

    # Assign IDs to vendors and process vendor data
        vendor_columns = ["vendor","DeliveryTime", "ReliabilityScore"]  # The column we are interested in for vendor data
        vendor_data = df[vendor_columns].drop_duplicates().reset_index(drop=True)
        # Generate unique vendor IDs
        vendor_data['_id'] = vendor_data.apply(lambda x: ObjectId(), axis=1)
        vendor_mapping = dict(zip(vendor_data['vendor'], vendor_data['_id']))

    # we can define vednor in vendor_columns
       # Simulate Product Columns and Mapping to Vendor IDs
        product_columns = [
            "productname", "category", "subcategory", "vendor", "stockquantity", "sellingprice", "Barcode", 
            "expirydate", "pastsalesdata", "timespan",'reorderthreshold', 'costprice'
        ]
        # Process product data (with foreign key)
        
        product_data = df[product_columns].drop_duplicates().reset_index(drop=True)
        # Map Vendor IDs to Product Data
        product_data['vendor_id'] = df['vendor'].map(vendor_mapping)
        
        
         # Remove the 'vendor' column from the product data after mapping vendor IDs
        product_data.drop(columns=['vendor'], inplace=True)

 # Perform column classification
        classified_columns = {
            'vendor': [],
            'product': [],
            'unclassified': []
        }
      # Classify columns as per your predefined mappings
        for col in df.columns:
            if col in COLUMN_MAP['vendor']:
                classified_columns['vendor'].append(col)
            elif col in COLUMN_MAP['product']:
                classified_columns['product'].append(col)
            else:
                classified_columns['unclassified'].append(col)

        # Check column existence and report any missing required columns
        missing_columns = [col for col in REQUIRED_COLUMNS if col not in df.columns]
        if missing_columns:
            return Response({"error": f"Missing required columns: {', '.join(missing_columns)}"}, status=400)

        # Output the classification result for debugging
        print("Classified Columns:", classified_columns)

        # Check if 'DeliveryTime' is being mapped and classified correctly
        if 'DeliveryTime' in classified_columns['product'] or 'DeliveryTime' in classified_columns['vendor']:
            print("'DeliveryTime' is classified correctly.")
        else:
            print("'DeliveryTime' is not classified correctly. Please check column mapping.")

        # Handle missing vendor IDs in product data
        if product_data['vendor_id'].isnull().any():
            missing_products = product_data[product_data['vendor_id'].isnull()]
            return Response({
                "error": "Some products do not have a corresponding vendor.",
                "missing_products": missing_products.to_dict(orient='records')
            }, status=400)

        
        # start here
        dataset_id = ObjectId()
        
 # for product db
        product_document = {
            "_id": ObjectId(),  # Generate unique ID for dataset
            "user_id": ObjectId(user_id),
            "dataset_id": dataset_id,
            "products": product_data.to_dict(orient="records"),  # Product references
            "upload_date": datetime.utcnow().isoformat(),
        }    
        db["products"].insert_one(product_document)
        
       
 # for vendor db

        vendor_document = {
            "_id": ObjectId(),  # Generate unique ID for dataset
            "user_id": ObjectId(user_id),
            "dataset_id": dataset_id,
            "vendors": vendor_data.to_dict(orient="records"),  # Vendor references
            "upload_date": datetime.utcnow().isoformat(),
        }
        db["vendors"].insert_one(vendor_document)
      
        # 3. Create Dataset Document
        dataset_document = {
            "_id": dataset_id,
            "user_id": ObjectId(user_id),
            "filename": dataset_file.name,
            "vendor_id": vendor_document["_id"],  # Reference the vendor document
            "product_id": product_document["_id"],   # Product references # make this foreign key
            "upload_date": datetime.utcnow().isoformat(),
        }
        db["datasets"].insert_one(dataset_document)
        

        # Update user document to reference this dataset
        dataset_info = {
            "dataset_id": dataset_id,
            "filename": dataset_file.name,
            "upload_date": dataset_document["upload_date"],
            "status": "uploaded"
        }
        db["users"].update_one(
            {"_id": ObjectId(user_id)},
            {"$push": {"datasets": dataset_info}}
        )
  # Return success response
        return Response({
            "message": f"Dataset '{dataset_file.name}' uploaded successfully!",
            "dataset_id": str(dataset_document["_id"]),
            "message": "Dataset successfully processed.",
          
        })
        

    except ValidationError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
#done-------------------------------------------------------------------------------------------------------------------------------------
# signUp page-1

@api_view(['POST'])
def signup(request):
    try:
        data = request.data
        # Use the Signup class to handle user registration
        response_data, status_code = Signup.register_user(
            data["username"],
            data["email"],
            data["password"]
        )
        return Response(response_data, status=status_code)
    except Exception as e:
        return Response({"error": str(e)}, status=500)

#login-2

@api_view(['POST'])
def login(request):
    data = request.data
    email = data.get("email")
    password = data.get("password")

    # Use the Login class to handle authentication
    response_data, status_code = Login.authenticate_user(email, password)

    return Response(response_data, status=status_code)

#login Purpose

 
#for login/signup 
#signup--->
@api_view(['POST'])
def complete_signup(request):
    try:
        user_id = request.data.get("user_id")  # Get user_id from the request
        if not user_id:
            return Response({"error": "User ID is required."}, status=400)

        result = db["users"].update_one(
            {"_id": ObjectId(user_id), "status": "incomplete"},  # Query by user_id
            {"$set": {"status": "complete"}}  # Set status to "complete"
        )

        if result.matched_count == 0:
            return Response({"error": "No such user found or user already completed signup."}, status=404)

        return Response({"message": "User signup completed successfully."})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
@api_view(['GET'])
def validate_token(request):
    token = request.headers.get("Authorization", "").split(" ")[1]  # Get token from the header
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user = db["users"].find_one({"_id": ObjectId(payload["id"])}, {"_id": 0, "password": 0})
        if not user:
            return Response({"error": "User not found."}, status=404)
        return Response({"user": user})
    except jwt.ExpiredSignatureError:
        return Response({"error": "Token has expired!"}, status=401)
    except jwt.InvalidTokenError:
        return Response({"error": "Invalid token!"}, status=401)
    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
#dashboard count-3
@api_view(['GET'])
def get_total_products(request):
    user_id = request.query_params.get('user_id')
    result = dashboard_utils.get_total_products(user_id)

    if "error" in result:
        return Response({"error": result["error"]}, status=result["status"])

    return Response(result)

#dashboard count-4

@api_view(['GET'])
def get_dashboard_visuals(request):
    user_id = request.query_params.get('user_id')
    result = dashboard_utils.get_dashboard_visuals(user_id)

    if "error" in result:
        return Response({"error": result["error"]}, status=result["status"])

    return Response(result)

#inventory count-5

@api_view(['GET'])
def get_current_dataset(request):
    user_id = request.GET.get("user_id")
    response, status = inventory_utils.get_user_products(user_id)
    return Response(response, status=status)

#inventory count-6

@api_view(['GET'])
def get_inventory_visuals(request):
    user_id = request.query_params.get("user_id")
    response, status = inventory_utils.get_inventory_visuals(user_id)
    return Response(response, status=status)

#vendor count-7

@api_view(['GET'])
def get_vendor(request):
    user_id = request.GET.get("user_id", None)

    if not user_id:
        return Response({"error": "Missing user_id"}, status=400)

    try:
        vendors = VendorUtils.get_vendors_by_user(user_id)
        if not vendors:
            return Response({"error": "No vendor found for the user"}, status=404)

        return Response({"vendors": [vendor["vendors"] for vendor in vendors]})
    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": "Internal server error"}, status=500)

#vendor count-8


@api_view(['GET'])
def get_vendor_visuals(request):
    user_id = request.query_params.get('user_id')

    if not user_id:
        return Response({"error": "User ID is required!"}, status=400)

    try:
        visuals = VendorUtils.get_vendor_visuals(user_id)
        if not visuals:
            return Response({"error": "No vendors found for the user"}, status=404)

        return Response(visuals)
    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Internal server error"}, status=500)
    
#insights count-9


@api_view(['GET'])
def get_categories(request):
    user_id = request.query_params.get('user_id')
    if not user_id:
        return Response({"error": "User ID is required!"}, status=400)

    try:
        categories = InsightsUtils.fetch_categories(user_id)
        if not categories:
            return Response({"error": "No products found for this user!"}, status=404)

        return Response({"categories": categories})
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)
#insights count-10

@api_view(['GET'])
def get_top_products_by_category(request):
    user_id = request.query_params.get('user_id')
    category = request.query_params.get('category')

    if not user_id or not category:
        return Response({"error": "User ID and category are required!"}, status=400)

    try:
        products = InsightsUtils.fetch_top_products(user_id, category)
        if not products:
            return Response({"error": "No products found for this user in this category!"}, status=404)

        return Response({"products": products})
    
    except Exception as e:
        return Response({"error": str(e)}, status=500)
#insights count-11

@api_view(['GET'])
def get_products_by_name(request):
    user_id = request.query_params.get('user_id')
    category = request.query_params.get('category')
    vendor_id = request.query_params.get('vendor_id')

    if not user_id or not category or not vendor_id:
        return Response({"error": "User ID, category, and vendor ID are required!"}, status=400)

    try:
        result = InsightsUtils.fetch_products_by_name(user_id, category, vendor_id)
        if "error" in result:
            return Response(result, status=404)

        return Response({"products": result})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
#insights count-12

@api_view(['GET'])
def get_categories_p(request):
    """API endpoint to fetch low stock products."""
    user_id = request.query_params.get('user_id')
    result, status = insights_manager.get_low_stock_products(user_id)
    return Response(result, status=status)
#insights count-13

@api_view(['GET'])
def get_vendor_details(request):
    """API endpoint to fetch vendor details for a product."""
    user_id = request.query_params.get('user_id')
    category = request.query_params.get('category')
    vendor_id = request.query_params.get('vendor_id')
    productname = request.query_params.get('productname')

    result, status = insights_manager.get_vendor_details(user_id, category, vendor_id, productname)
    return Response(result, status=status)


# # Forgot Password Endpoint
# @api_view(['POST'])
# def forgot_password(request):
#     email = request.data.get("email")
#     user = db["users"].find_one({"email": email})


#     if not user:
#         return Response({"error": "Email not found"}, status=404)

#     # Generate Reset Token
#     reset_token = jwt.encode(
#         {"userId": str(user["_id"]), "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
#         SECRET_KEY, algorithm="HS256"
#     )

#     # Create Password Reset URL
#     reset_url = f"http://localhost:3000/reset-password?token={reset_token}"

#     # Send Reset Email
#     try:
#         send_mail(
#             'Password Reset Request',
#             f'Hi {user["username"]},\n\nClick the link below to reset your password:\n{reset_url}\n\nIf you did not request a password reset, please ignore this email.',
#             settings.DEFAULT_FROM_EMAIL,  # Make sure this is set in your settings.py
#             [email],
#             fail_silently=False,
#         )
#         return Response({"message": "Password reset link sent to your email"})
#     except Exception as e:
#         print(f"Error sending email: {str(e)}")  # Add logging
#         return Response({"error": f"Failed to send email: {str(e)}"}, status=500)

# Forgot Password Endpoint
@api_view(['POST'])
def forgot_password(request):
    email = request.data.get("email")
    
    # Check if user exists in the database
    user = db["users"].find_one({"email": email})
    if not user:
        return Response({"error": "Email not found"}, status=404)
    
   # Generate Reset Token (1-hour expiry)
    reset_token = jwt.encode(
        {"userId": str(user["_id"]), "exp": datetime.utcnow() + timedelta(hours=1)},
        SECRET_KEY, algorithm="HS256"
    )

    # Password Reset URL
    reset_url = f"http://localhost:3000/resetpassword?token={reset_token}"
    
 # Send Reset Email
    try:
        send_mail(
            'Password Reset Request',
            f'Hi {user["username"]},\n\nClick the link to reset your password:\n{reset_url}\n\nIf you did not request this, ignore this email.',
            settings.DEFAULT_FROM_EMAIL,
            [email],
            fail_silently=False,
        )
        return Response({"message": "Password reset link sent to your email"}, status=200)

    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return Response({"error": "Failed to send email. Please try again later."}, status=500)

# Reset Password Endpoint
@api_view(['POST'])
def reset_password(request):
    token = request.data.get("token")
    new_password = request.data.get("newPassword")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
        user_id = payload["userId"]
        user = db["users"].find_one({"_id": ObjectId(user_id)})

        if not user:
            return Response({"error": "User not found"}, status=404)

        # Hash the new password
        hashed_password = bcrypt.hashpw(new_password.encode("utf-8"), bcrypt.gensalt())
        db["users"].update_one(
            {"_id": ObjectId(user_id)},
            {"$set": {"password": hashed_password}}
        )

        # Send Confirmation Email
        send_mail(
            'Password Reset Successful',
            f'Hi {user["username"]},\n\nYour password has been reset successfully. You can now log in with your new password.\n\nThank you!',
            settings.DEFAULT_FROM_EMAIL,
            [user["email"]],
            fail_silently=False,
        )

        return Response({"message": "Password reset successful"})

    except jwt.ExpiredSignatureError:
        return Response({"error": "Token has expired"}, status=400)
    except jwt.InvalidTokenError:
        return Response({"error": "Invalid token"}, status=400)

# done --------------------------------------------------------------------------------------------------------------------------



# delete a user based on cancel button while registeration
# delete a user based on user_id
# not use yet
@api_view(['POST'])
def delete_user(request):
    try:
        user_id = request.data.get("user_id")
        if not user_id or not ObjectId.is_valid(user_id):
            return Response({"error": "Invalid User ID."}, status=400)

        result = db["users"].delete_one({"_id": ObjectId(user_id), "status": "incomplete"})
        if result.deleted_count == 0:
            return Response({"error": "No such user found or user already completed signup."}, status=404)

        return Response({"message": "User data deleted successfully."})
    except Exception as e:
        return Response({"error": str(e)}, status=500)





