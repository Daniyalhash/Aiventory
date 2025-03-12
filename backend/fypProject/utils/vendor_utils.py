from pymongo import MongoClient
from bson import ObjectId
from typing import List, Dict
import os

# Assuming 'db' is imported from the settings or initialized here

# MongoDB Atlas connection
client = MongoClient("mongodb+srv://syeddaniyalhashmi123:test123@cluster0.dutvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["FYP"]
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "fallback_secret_key")

class VendorUtils:
    @staticmethod
    def get_vendors_by_user(user_id: str) -> List[Dict]:
        """Fetch vendor details for a given user_id."""
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user_id format")
        
        vendor_cursor = db["vendors"].find({"user_id": ObjectId(user_id)})
        vendor_list = list(vendor_cursor)

        if not vendor_list:
            return []

        # Format vendor data
        formatted_vendor = [
            {
                "_id": str(vendor.get("_id")),
                "dataset_id": str(vendor.get("dataset_id")) if vendor.get("dataset_id") else None,
                "vendors": [
                    {
                        "vendor": vendor_item.get("vendor"),
                        "DeliveryTime": vendor_item.get("DeliveryTime"),
                        "ReliabilityScore": vendor_item.get("ReliabilityScore"),
                        "_id": str(vendor_item.get("_id")) if vendor_item.get("_id") else None,
                    }
                    for vendor_item in vendor.get("vendors", [])
                ],
                "upload_date": vendor.get("upload_date"),
            }
            for vendor in vendor_list
        ]
        return formatted_vendor

    @staticmethod
    def get_vendor_visuals(user_id: str) -> Dict:
        """Fetch and process vendor data for visualization."""
        if not ObjectId.is_valid(user_id):
            raise ValueError("Invalid user_id format")

        user = db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            raise ValueError("User not found")

        vendors_list = VendorUtils.get_vendors_by_user(user_id)

        if not vendors_list:
            return {}

        # Separate lists for reliability scores and delivery times
        all_reliability_scores = []
        all_delivery_times = []

        for vendor in vendors_list:
            for item in vendor["vendors"]:
                if item.get("DeliveryTime") is not None:
                    all_delivery_times.append({
                        "vendor": item["vendor"],
                        "delivery_time": item["DeliveryTime"]
                    })
                if item.get("ReliabilityScore") is not None:
                    all_reliability_scores.append({
                        "vendor": item["vendor"],
                        "reliability_score": item["ReliabilityScore"]
                    })

        # Get top vendors based on reliability and delivery time
        top_reliability_vendors = sorted(all_reliability_scores, key=lambda x: x["reliability_score"], reverse=True)[:5]
        top_delivery_vendors = sorted(all_delivery_times, key=lambda x: x["delivery_time"])[:5]

        return {
            "top_reliability_vendors": top_reliability_vendors,
            "top_delivery_vendors": top_delivery_vendors,
        }
