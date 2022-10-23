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

class Staff_skills(db.Model):
    __tablename__ = "staff_skills"

    Staff_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Skill_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)

    def __init__(self, Staff_ID, Skill_ID): #constructor, initializes the record
        self.Staff_ID = Staff_ID
        self.Skill_ID = Skill_ID

    def json(self): #returns json representation of the table in dict form
        return {"Staff_ID": self.Staff_ID, "Skill_ID": self.Skill_ID}

    #Fill up columns here

@app.route("/getStaffByStaffID/<string:staffID>")
def get_staff_by_staffID(staffID):

    staffList = Staff_skills.query.filter_by(Staff_ID=staffID).all()
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

if __name__ == '__main__':
    app.run(port=5006, debug=True)