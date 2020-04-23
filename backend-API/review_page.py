from pymongo import MongoClient
from flask import jsonify
import datetime

client = MongoClient('mongodb://localhost:27017/')

def get_user_reviews(email):
    PET_db = client["PET"]
    #print("Email: " + email)
    
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
    for review in requests.find({"requester_id": cur_employee_id, "companyId": cur_employee_company_id}):
        # only if review is complete then add
        if(review["complete"]):
            # get reviewer data and review content and append
            cur_reviewer = employee_data.find_one({"employeeId": review["reviewer_id"]})
            cur_review = review_content.find_one({"_id": review["review_content_id"]})
            reviews_list.append({"reviewer_id": cur_reviewer["employeeId"], "reviewer_lastname": cur_reviewer["lastName"], "reviewer_firstname": cur_reviewer["firstName"], "review": cur_review["content"], "date": cur_review["date"]})

    return jsonify(reviews_list=reviews_list), 200 # add more if needed

def get_managers():
    PET_db = client["PET"]

    # initialize managers list
    managers_list = []

    # get employee data
    employee_data = PET_db["employee_data"]

    # search for managers
    for employee in employee_data:
        if hasattr(employee, "managerId"):
            cur_manager_name = employee["firstName"] + " " + employee["lastName"]
            managers_list.append({"id": employee["employeeId"],"manager": cur_manager_name})
    
    return jsonify(managers_list=managers_list), 200
        
def get_employees_of_manager(email):
    PET_db = client["PET"]
    # initialize employees of manager liste
    employees_of_manager = []

    #get the employee id of manager
    employees = PET_db["employee_data"]

    # get the id of the manager whose email corresponds with parameter
    manager = employees.find_one({"email": email}) #uses regex to ignore case-sensitivity
    managerId = manager["employeeId"]

    #get every employee who has the given managerId
    for employee in employees.find({"managerId": managerId}):
        employees_of_manager.append({"value": employee["email"], "label": employee["firstName"] + " " + employee["lastName"]})
    
    return jsonify(employees_of_manager=employees_of_manager), 200


