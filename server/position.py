from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
# Mac User
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/learning_journey_planning_system'
# Window User
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/learning_journey_planning_system'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

class Position(db.Model):
    __tablename__ = "Position"

    Position_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Position_Name = db.Column(db.String(50), nullable=False)
    Position_Desc = db.Column(db.String(255), nullable=False)
    Position_Dept = db.Column(db.String(20), nullable=False)
    Position_Res = db.Column(db.String(1000), nullable=False)
    Position_Status = db.Column(db.String(10), nullable=False)


    def __init__(self, Position_Name, Position_Desc, Position_Dept, Position_Res, Position_Status): # constructor, initializes the record
        self.Position_Name = Position_Name
        self.Position_Desc = Position_Desc
        self.Position_Dept = Position_Dept
        self.Position_Res = Position_Res
        self.Position_Status = Position_Status


    def json(self): # returns json representation of the table in dict form
        return { "Position_ID": self.Position_ID, "Position_Name": self.Position_Name, "Position_Desc": self.Position_Desc, "Position_Dept": self.Position_Dept, "Position_Res": self.Position_Res, "Position_Status": self.Position_Status }


class Position_Skill(db.Model):
    __tablename__ = "Position_Skill"

    Position_ID = db.Column(db.Integer, primary_key=True, nullable=False)
    Skill_ID = db.Column(db.Integer, primary_key=True, nullable=False)
   

    def __init__(self, Position_ID, Skill_ID): # constructor, initializes the record
        self.Position_ID = Position_ID
        self.Skill_ID = Skill_ID


    def json(self): # returns json representation of the table in dict form
        return {"Position_ID": self.Position_ID, "Skill_ID": self.Skill_ID}


class Skill(db.Model): 
    __tablename__ = 'Skill' 

    Skill_ID = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    Skill_Name = db.Column(db.String(50), nullable=False) 
    Skill_Desc = db.Column(db.String(255), nullable=False) 
    Skill_Status = db.Column(db.String(10), nullable=False)


    def __init__(self, Skill_ID, Skill_Name, Skill_Desc, Skill_Status): 
        self.Skill_ID = Skill_ID 
        self.Skill_Name = Skill_Name 
        self.Skill_Desc = Skill_Desc
        self.Skill_Status = Skill_Status 


    def json(self): 
        return { "Skill_ID": self.Skill_ID, "Skill_Name": self.Skill_Name, "Skill_Desc": self.Skill_Desc, "Skill_Status": self.Skill_Status } 


@app.route("/position")
def get_all_position():
    positionList = Position.query.all() 
    if len(positionList): 
        return jsonify ( 
        {
            "code": 200,
            "data": {
            "Positions": [position.json() for position in positionList] 
                    }
                }
            )
    return jsonify(
        {
        "code": 404,
        "message": "There are no Positions."
        }
        ), 404


@app.route("/skill")
def get_all_skill():
    skillList = Skill.query.all() 
    if len(skillList): 
        return jsonify ( 
        {
            "code": 200,
            "data": {
            "Skills": [skill.json() for skill in skillList] 
                    }
                }
            )
    return jsonify(
        {
        "code": 404,
        "message": "There are no Skills."
        }
        ), 404


#FUNCTION 6: Get Skill by Skill ID
@app.route("/getSkillById/<int:skill_id>", methods=['GET'])
def find_by_skillId(skill_id):

    skill = Skill.query.filter_by(Skill_ID=skill_id).first()

    if skill:
        return jsonify(
            {
                "code": 200,
                "data": skill.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "Skill not found."
        }
    ), 404


@app.route("/createPosition", methods=['POST'])
def create_position():

    position = request.get_json()
    print(type(position)) #dict 
    positionName = position['Position_Name']

    if (Position.query.filter_by(Position_Name=positionName).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "Position Name": positionName
                },
                "message": "Position Name already exists."
            }
        ), 400

    positionDesc = position['Position_Desc']
    positionDept = position['Position_Dept']
    positionRes = position['Position_Res']
    positionStatus = position['Position_Status']

    print(positionName, positionDesc, positionDept, positionRes, positionStatus)
    position = Position(positionName, positionDesc, positionDept, positionRes, positionStatus)
    print(position)
 
    try:
        db.session.add(position)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the position."
            }
        ), 500
 
    return jsonify(
        {
            "code": 201,
            "data": position.json()
        }
    ), 201


@app.route("/createPositionSkill", methods=['POST'])
def create_position_skill():

    position = request.get_json()
    print(type(position)) #dict 
    positionID = position['Position_ID']
    skillID = position['Skill_ID']


    print(positionID, skillID)
    position = Position_Skill(positionID, skillID)
    print(position)
 
    try:
        db.session.add(position)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred adding the position and skill."
            }
        ), 500
 
    return jsonify(
        {
            "code": 201,
            "data": position.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=5000, debug=True)