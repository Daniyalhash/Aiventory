from bson import ObjectId
from pymongo import MongoClient

class InsightsManager:
    def __init__(self, db):
        self.db = db

    def get_low_stock_products(self, user_id):
        """Fetch low stock products for the given user."""
        if not user_id:
            return {"error": "User ID is required!"}, 400

        try:
            # Fetch all product documents for the user
            product_documents = self.db["products"].find({"user_id": ObjectId(user_id)})
            
            low_stock_product_list = []
            for product_doc in product_documents:
                products_array = product_doc.get("products", [])
                if not isinstance(products_array, list):
                    continue  # Skip invalid data
                
                for product in products_array:
                    stockquantity = product.get("stockquantity", 0)
                    reorderthreshold = product.get("reorderthreshold", 0)

                    if stockquantity < reorderthreshold:
                        low_stock_product_list.append({
                            "productname": product.get("productname"),
                            "category": product.get("category", "N/A"),
                            "stockquantity": stockquantity,
                            "vendor_id": str(product.get("vendor_id", "N/A"))  # Convert ObjectId to string
                        })

            return {"low_stock_products": low_stock_product_list}, 200

        except Exception as e:
            return {"error": str(e)}, 500

    def get_vendor_details(self, user_id, category, vendor_id, productname):
        """Fetch vendor details for a specific product and category."""
        if not user_id or not category or not vendor_id or not productname:
            return {"error": "Missing required parameters!"}, 400

        try:
            user_id = ObjectId(user_id)
            product_documents = list(self.db["products"].find({"user_id": user_id}))
            vendor_documents = list(self.db["vendors"].find({"user_id": user_id}))

            if not product_documents:
                return {"error": "No products found for this user!"}, 404
            if not vendor_documents:
                return {"error": "No vendors found for this user!"}, 404

            # Find the requested product
            product_found = None
            for product_doc in product_documents:
                for product in product_doc.get("products", []):
                    if product.get("category") == category and product.get("productname") == productname:
                        product_found = product
                        break
                if product_found:
                    break

            if not product_found:
                return {"error": "Product not found in the specified category!"}, 404

            # Find vendor details
            vendor_list = []
            for vendor_doc in vendor_documents:
                for vendor in vendor_doc.get("vendors", []):
                    if str(vendor.get("_id")) == vendor_id:
                        vendor_list.append({
                            "vendor": vendor.get("vendor", "Unknown Vendor"),
                            "DeliveryTime": vendor.get("DeliveryTime", "Unknown"),
                            "ReliabilityScore": vendor.get("ReliabilityScore", 0)
                        })

            if not vendor_list:
                return {"error": "Vendor not found!"}, 404

            # Sort vendors by reliability score
            sorted_vendors = sorted(vendor_list, key=lambda x: x.get("ReliabilityScore", 0), reverse=True)

            return sorted_vendors, 200

        except Exception as e:
            return {"error": str(e)}, 500
