from bson import ObjectId
from pymongo import MongoClient

class InventoryUtils:
    def __init__(self, db):
        self.db = db

    def get_user_products(self, user_id):
        """Fetch and format product data for a user."""
        if not user_id or not ObjectId.is_valid(user_id):
            return {"error": "Invalid or missing user_id"}, 400

        products_cursor = self.db["products"].find({"user_id": ObjectId(user_id)})
        products_list = list(products_cursor)

        if not products_list:
            return {"error": "No products found for the user"}, 404

        formatted_products = [
            {
                "_id": str(product.get("_id")),
                "dataset_id": str(product.get("dataset_id")) if product.get("dataset_id") else None,
                "products": [
                    {
                        "productname": item.get("productname"),
                        "category": item.get("category"),
                        "subcategory": item.get("subcategory"),
                        "stockquantity": item.get("stockquantity"),
                        "sellingprice": item.get("sellingprice"),
                        "Barcode": item.get("Barcode"),
                        "expirydate": item.get("expirydate"),
                        "pastsalesdata": item.get("pastsalesdata"),
                        "timespan": item.get("timespan"),
                        "reorderthreshold": item.get("reorderthreshold"),
                        "costprice": item.get("costprice"),
                        "vendor_id": str(item.get("vendor_id")) if item.get("vendor_id") else None,
                    }
                    for item in product.get("products", [])
                ],
                "upload_date": product.get("upload_date"),
            }
            for product in products_list
        ]

        return {"products": [product["products"] for product in formatted_products]}, 200

    def get_inventory_visuals(self, user_id):
        """Calculate category-wise and product-wise visualizations."""
        if not user_id or not ObjectId.is_valid(user_id):
            return {"error": "Invalid or missing user_id"}, 400

        user = self.db["users"].find_one({"_id": ObjectId(user_id)})
        if not user:
            return {"error": "User not found!"}, 404

        products_cursor = self.db["products"].find({"user_id": ObjectId(user_id)})
        products_list = list(products_cursor)
        
        if not products_list:
            return {"error": "No products found for the user"}, 404

        formatted_products = self.get_user_products(user_id)[0]["products"]

        category_profit_margin, category_cost, product_profit_margin, product_price_comparison = [], [], [], []

        category_data, product_data = {}, {}

        for product in formatted_products:
            for item in product:
                category = item["category"]
                selling_price = item["sellingprice"]
                cost_price = item["costprice"]
                product_name = item["productname"]

                profit_margin = ((selling_price - cost_price) / cost_price * 100) if cost_price > 0 else 0

                if category not in category_data:
                    category_data[category] = {"total_profit_margin": 0, "count": 0, "total_cost": 0}
                category_data[category]["total_profit_margin"] += profit_margin
                category_data[category]["count"] += 1
                category_data[category]["total_cost"] += cost_price

                product_data[product_name] = product_data.get(product_name, {"total_profit_margin": 0, "count": 0})
                product_data[product_name]["total_profit_margin"] += profit_margin
                product_data[product_name]["count"] += 1

                product_price_comparison.append({
                    "productname": product_name,
                    "sellingprice": selling_price,
                    "costprice": cost_price
                })

        for category, data in category_data.items():
            avg_profit_margin = data["total_profit_margin"] / data["count"] if data["count"] > 0 else 0
            category_profit_margin.append({
                "category": category,
                "avg_profit_margin": avg_profit_margin,
                "total_cost": data["total_cost"]
            })

        product_profit_margin = [{"productname": product_name, "avg_profit_margin": data["total_profit_margin"] / data["count"]}
                                 for product_name, data in product_data.items()]

        product_profit_margin = sorted(product_profit_margin, key=lambda x: x["avg_profit_margin"], reverse=True)[:10]

        return {
            "category_profit_margin": category_profit_margin,
            "category_cost": [{"category": category, "total_cost": data["total_cost"]} for category, data in category_data.items()],
            "product_profit_margin": product_profit_margin,
            "product_price_comparison": product_price_comparison,
        }, 200
