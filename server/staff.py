from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
# Mac User
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/SPM'
# Window User
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/SPM'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

class Staff(db.Model):
    __tablename__ = "staff"

    Staff_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Staff_FName = db.Column(db.String(50), nullable=False)
    Staff_LName = db.Column(db.String(255), nullable=False)
    Dept = db.Column(db.String(50), nullable=False)
    Email = db.Column(db.String(50), nullable=False)
    Role_ID = db.Column(db.String(20), nullable=False)

    def __init__(self, Staff_ID, Staff_FName, Staff_LName, Dept, Email, Role_ID): #constructor, initializes the record
        self.Staff_ID = Staff_ID
        self.Staff_FName = Staff_FName
        self.Staff_LName = Staff_LName
        self.Dept = Dept
        self.Email = Email
        self.Role_ID = Role_ID

    def json(self): #returns json representation of the table in dict form
        return {"Staff_ID": self.Staff_ID, "Staff_FName": self.Staff_FName, "Staff_LName": self.Staff_LName, "Dept": self.Dept, "Email": self.Email,
        "Role_ID": self.Role_ID}

    #Fill up columns here

@app.route("/getStaffByStaffID/<string:staffID>")
def get_staff_by_staffID(staffID):

    staffList = Staff.query.filter_by(Staff_ID=staffID).all()
    if staffList:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "Positions": [staff.json() for staff in staffList]
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Staff not found."
        }
    ), 404

@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'


if __name__ == '__main__':
    app.run(port=5000, debug=True)