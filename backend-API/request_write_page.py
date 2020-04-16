from pymongo import MongoClient
from flask import jsonify

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
            possible_reviewers.append({"value": employee["email"], "label": employee["firstName"] + " " + employee["lastName"]})
    
    # Returns the list of possible reviewers with a 200 response which means the request was successful
    return jsonify(possible_reviewers=possible_reviewers), 200