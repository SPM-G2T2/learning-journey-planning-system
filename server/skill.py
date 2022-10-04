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

class Skill(db.Model):
    __tablename__ = "skill"

    Skill_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Skill_Name = db.Column(db.String(50), nullable=False)
    Skill_Description = db.Column(db.String(255), nullable=False)
    Skill_Status = db.Column(db.String(10), nullable=False)

    def __init__(self, Skill_ID, Skill_Name, Skill_Description, Skill_Status): #constructor, initializes the record
        self.Skill_ID = Skill_ID
        self.Skill_Name = Skill_Name
        self.Skill_Description = Skill_Description
        self.Skill_Status = Skill_Status


    def json(self): #returns json representation of the table in dict form
        return {"Skill_ID": self.Skill_ID, "Skill_Name": self.Skill_Name, "Skill_Description": self.Skill_Description, "Skill_Status": self.Skill_Status}

    #Fill up columns here

@app.route("/getSkillBySkillID/<string:skillID>")
def get_skill_by_skillID(skillID):

    skill = Skill.query.filter_by(Skill_ID=skillID).all()
    if skill:
        return jsonify(
            {
                "code": 200,
                "data": {
                    "Skill": skill.json()
                }
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Skill not found."
        }
    ), 404

@app.route('/') # Just a decorator to route to certain url
def hello():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(port=5000, debug=True)