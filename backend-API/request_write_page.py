from pymongo import MongoClient
from flask import jsonify
import datetime

client = MongoClient('mongodb://localhost:27017/')

def get_possible_reviewers(email):
    PET_db = client["PET"]
    
    employee_data = PET_db["employee_data"]
    # Find the first employee with the same email as the current user
    current_employee = employee_data.find_one({"email": email})
    
    possible_reviewers = []

    # Check if they have a manager
    # Only the CEO should not have a manager
    print(current_employee)
    if current_employee["managerId"]:
        companyId = current_employee["companyId"]
        managerId = current_employee["managerId"]

        # In posts.find(), the first parameter is for filtering and the second is for data attributes returned
        # More details here for the 2nd parameter: https://www.w3schools.com/python/python_mongodb_find.asp
        # Finds entries with the same company and manager, and returns their names and emails
        for employee in employee_data.find({"managerId": managerId, "companyId": companyId}, { "_id": 0, "firstName": 1, "lastName": 1, "email": 1 }):
            if employee["email"] != current_employee["email"]:
                possible_reviewers.append({"value": employee["email"], "label": employee["firstName"] + " " + employee["lastName"]})
    
    # Returns the list of possible reviewers with a 200 response which means the request was successful
    return jsonify(possible_reviewers=possible_reviewers), 200

def send_review_requests(email, json):
    PET_db = client["PET"]
    
    employee_data = PET_db["employee_data"]
    
    # Find the first employee with the same email as the current user
    current_employee = employee_data.find_one({"email": email})
    
    review_content = PET_db["review_content"]
    
    requests = PET_db["requests"]

    reviewer_emails = json["reviewer_emails"]

    for reviewer_email in reviewer_emails:
        reviewer = employee_data.find_one({"email": reviewer_email})
        # Note that this records local time right now instead of UTC
        new_review_content = {"content": "", "date": datetime.datetime.now()}

        new_rev_cont_id = review_content.insert_one(new_review_content).inserted_id

        new_request = {
            "requester_id": current_employee["employeeId"],
            "reviewer_id": reviewer["employeeId"],
            "review_content_id": new_rev_cont_id,
            "complete": False,
            "rejected": False,
            "date": datetime.datetime.now(),
            "companyId": current_employee["companyId"]
        }

        requests.insert_one(new_request)

    # Returns just a 200 response which means the request was successful
    return jsonify(), 200