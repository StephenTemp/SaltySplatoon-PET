from pymongo import MongoClient
from flask import jsonify
import datetime

client = MongoClient('mongodb://localhost:27017/')

def get_user_reviews(email):
    PET_db = client["PET"]

    # initialize review list
    reviews_list = [] 

    # get requests and review_content data
    requests = PET_db["requests"]
    review_content = PET_db["review_content"]

    # get current user data
    employee_data = PET_db["employee_data"]
    current_employee = employee_data.find_one({"email": email})
    cur_employee_id = current_employee["employeeId"]
    cur_employee_company_id = current_employee["companyId"]

    # search for reviews
    for review in requests.find({"requester.id": cur_employee_id, "companyId": cur_employee_company_id}):
        # only if review is complete then add
        if(review["complete"]):
            # get reviewer data and review content and append
            cur_reviewer = employee_data.find_one({"employeeId": review["reviewer_id"]})
            cur_review = review_content.find_one({"_id": review["review_content_id"]})
            reviews_list.append({"reviewer_id": cur_reviewer["employeeId"], "reviewer_lastname": cur_reviewer["lastName"], "reviewer_firstname": cur_reviewer["firstName"], "review": cur_review["content"], "date": cur_review["date"]})

    return jsonify(reviews_list=reviews_list), 200 # add more if needed

# def get_employee_reviews(email):


