from bson import ObjectId
from pymongo import MongoClient

# Initialize DB Connection
client = MongoClient("mongodb+srv://syeddaniyalhashmi123:test123@cluster0.dutvq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client["FYP"]

class InsightsUtils:

    @staticmethod
    def convert_objectid(data):
        """ Convert ObjectId to string recursively in a dictionary or list """
        if isinstance(data, dict):
            return {key: InsightsUtils.convert_objectid(value) for key, value in data.items()}
        elif isinstance(data, list):
            return [InsightsUtils.convert_objectid(item) for item in data]
        elif isinstance(data, ObjectId):
            return str(data)
        return data

    @staticmethod
    def fetch_categories(user_id):
        """ Fetch unique product categories for a user """
        product_documents = db["products"].find({"user_id": ObjectId(user_id)})
        unique_categories = set()

        for product_doc in product_documents:
            for product in product_doc.get("products", []):
                category = product.get("category")
                if category:
                    unique_categories.add(category)

        return list(unique_categories)

    @staticmethod
    def fetch_top_products(user_id, category):
        """ Fetch top products by category """
        product_documents = db["products"].find({"user_id": ObjectId(user_id)})
        products_in_category = []

        for product_doc in product_documents:
            for product in product_doc.get("products", []):
                if product.get("category") == category:
                    products_in_category.append({
                        "productname": product.get("productname"),
                        "category": product.get("category"),
                        "stockquantity": product.get("stockquantity"),
                        "sellingprice": product.get("sellingprice"),
                        "Barcode": product.get("Barcode"),
                        "expirydate": product.get("expirydate"),
                        "reorderthreshold": product.get("reorderthreshold"),
                        "costprice": product.get("costprice"),
                        "id": str(product.get("_id", "")),  
                        "vendor_id": product.get("vendor_id")
                    })

        return InsightsUtils.convert_objectid(products_in_category)

    @staticmethod
    def calculate_profit_margin(selling_price, cost_price):
        """ Calculate profit margin percentage """
        return ((selling_price - cost_price) / selling_price) * 100 if selling_price else 0

    @staticmethod
    def fetch_products_by_name(user_id, category, vendor_id):
        """ Fetch products by category and vendor """
        product_documents = list(db["products"].find({"user_id": ObjectId(user_id)}))
        vendors = list(db["vendors"].find({"user_id": ObjectId(user_id)}))

        # Find vendor details
        vendor_info = next(
            (vendor for vendor_doc in vendors for vendor in vendor_doc.get("vendors", []) if str(vendor.get("_id")) == vendor_id), 
            None
        )
        
        if not vendor_info:
            return {"error": "Vendor not found!"}

        vendor_name = vendor_info.get("vendor", "Unknown Vendor")
        delivery_time = vendor_info.get("DeliveryTime", "Unknown")
        reliability_score = vendor_info.get("ReliabilityScore", "Unknown")

        products_in_category = [
            {
                "productname": product.get("productname"),
                "category": product.get("category"),
                "stockquantity": product.get("stockquantity"),
                "sellingprice": product.get("sellingprice"),
                "Barcode": product.get("Barcode"),
                "expirydate": product.get("expirydate"),
                "reorderthreshold": product.get("reorderthreshold"),
                "costprice": product.get("costprice"),
                "profitmargin": InsightsUtils.calculate_profit_margin(product.get("sellingprice", 0), product.get("costprice", 0)),
                "id": str(product.get("_id", "")),
                "vendor": vendor_name,
                "DeliveryTime": delivery_time,
                "ReliabilityScore": reliability_score
            }
            for product_doc in product_documents
            for product in product_doc.get("products", [])
            if product.get("category") == category
        ]

        return InsightsUtils.convert_objectid(products_in_category)
