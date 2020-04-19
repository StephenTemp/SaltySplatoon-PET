from pymongo import MongoClient
from flask import jsonify
import datetime

client = MongoClient('mongodb://localhost:27017/')

def get_user_reviews(email):
    PET_db = client["PET"]

    # Create a review list
    reviews_list = [] 

    # Get review list
    review_content = PET_db["review_content"]

    # Get user information
    employee_data = PET_db["employee_data"]
    current_employee = employee_data.find_one({"email": email})
    
    cur_employee_id = current_employee["employeeId"]
    cur_employee_company_id = current_employee["companyId"]

    for review in review_content.find({"reviewer_id": cur_employee_id, "companyId": cur_employee_company_id}):
        # If the one being reviewed is same as the user
        if review["email"] == current_employee["email"]: 
            # Get reviewer
            cur_reviewer = employee_data.find_one({"employeeId": review["reviewer_id"]}) 
             # Get reviewer name
            cur_reviewer_name = cur_reviewer["firstName"] + " " + cur_reviewer["lastName"]
            # Append reviewer, review, data
            reviews_list.append({"reviewer": cur_reviewer_name, "review": review["content"], "date": review["date"]}) 

    return jsonify(reviews_list=reviews_list), 200

# def get_employee_reviews(email):

