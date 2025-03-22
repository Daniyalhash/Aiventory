from bson import ObjectId
from rest_framework.response import Response
import random
from datetime import datetime

class DashboardUtils:
    def __init__(self, db):
        self.db = db
    def get_total_products(self, user_id):
        if not user_id:
            return {"error": "User ID is required!", "status": 400}

        try:
            today_date = datetime.utcnow()  # Get current UTC date

            pipeline = [
                {"$match": {"user_id": ObjectId(user_id)}},
                {"$unwind": "$products"},
                {
                    "$group": {
                        "_id": None,
                        "total_unique_products": {"$addToSet": "$products.productname"},
                        "expired_products_list": {
                            "$sum": {
                                "$cond": [
                                {"$lt": ["$products.expirydate", today_date]},
                                    1,
                                    0
                                ]
                            }
                        },
                        "total_vendors": {"$addToSet": "$products.vendor_id"}
                    }
                },
                {
                    "$project": {
                        "_id": 0,
                        "total_unique_products": {"$size": "$total_unique_products"},
                        "expired_products_list": 1,
                        "total_vendors": {"$size": "$total_vendors"}
                    }
                }
            ]

            result = list(self.db["products"].aggregate(pipeline))

            if result:
                return result[0]
            else:
                return {"error": "No products found for this user!", "status": 404}

        except Exception as e:
            return {"error": str(e), "status": 500}

    def get_dashboard_visuals(self, user_id):
        if not user_id:
            return {"error": "User ID is required!", "status": 400}

        try:
            user = self.db["users"].find_one({"_id": ObjectId(user_id)})
            if not user:
                return {"error": "User not found!", "status": 404}

            product_documents = list(self.db["products"].aggregate([
                {"$match": {"user_id": ObjectId(user_id)}},
                {"$sample": {"size": 2}}  # Fetch 2 random products directly
            ]))
            if not product_documents:
                return {"error": "No products found for this user!", "status": 404}

            category_products = {}

            for product_doc in product_documents:
                products_array = product_doc.get("products", [])
                if not isinstance(products_array, list):
                    continue

                for product in products_array:
                    category = product.get("category")
                    if category:
                        if category not in category_products:
                            category_products[category] = []

                        selling_price = product.get("sellingprice", 0)
                        cost_price = product.get("costprice", 0)
                        profit_margin = (selling_price - cost_price) / selling_price if selling_price > 0 else 0

                        category_products[category].append({
                            "productname": product.get("productname"),
                            "category": category,
                            "sellingprice": selling_price,
                            "costprice": cost_price,
                            "profit_margin": profit_margin
                        })

            if category_products:
                random_category = random.choice(list(category_products.keys()))
                products_in_category = category_products[random_category]

                if len(products_in_category) >= 2:
                    random_products = random.sample(products_in_category, 2)
                    response_data = {
                        "benchmarks": [
                            {
                                "productname": random_products[0]["productname"],
                                "sellingprice": random_products[0]["sellingprice"],
                                "profitmargin": random_products[0]["profit_margin"] * 100
                            },
                            {
                                "productname": random_products[1]["productname"],
                                "sellingprice": random_products[1]["sellingprice"],
                                "profitmargin": random_products[1]["profit_margin"] * 100
                            }
                        ]
                    }
                    return response_data
                else:
                    return {"error": "Not enough products in this category for comparison.", "status": 404}
            else:
                return {"error": "No products available for comparison.", "status": 404}

        except Exception as e:
            return {"error": str(e), "status": 500}