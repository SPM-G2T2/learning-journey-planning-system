from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
# Mac User
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/learning_journey_planning_system'
# Window User
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/learning_journey_planning_system'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

class Position(db.Model):
    __tablename__ = "position"

    position_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    position_name = db.Column(db.String(50), nullable=False)
    position_desc = db.Column(db.String(255), nullable=False)
    position_dept = db.Column(db.String(20), nullable=False)
    position_res = db.Column(db.String(1000), nullable=False)
    position_status = db.Column(db.String(10), nullable=False)


    def __init__(self, position_name, position_desc, position_dept, position_res, position_status): # constructor, initializes the record
        self.position_name = position_name
        self.position_desc = position_desc
        self.position_dept = position_dept
        self.position_res = position_res
        self.position_status = position_status


    def json(self): # returns json representation of the table in dict form
        return { "position_id": self.position_id, "position_name": self.position_name, "position_desc": self.position_desc, "position_dept": self.position_dept, "position_res": self.position_res, "position_status": self.position_status }


class PositionSkill(db.Model):
    __tablename__ = "position_skill"

    position_id = db.Column(db.Integer, primary_key=True, nullable=False)
    skill_id = db.Column(db.Integer, primary_key=True, nullable=False)
   

    def __init__(self, position_id, skill_id): # constructor, initializes the record
        self.position_id = position_id
        self.skill_id = skill_id


    def json(self): # returns json representation of the table in dict form
        return {"position_id": self.position_id, "skill_id": self.skill_id}


class Skill(db.Model): 
    __tablename__ = 'skill' 

    skill_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    skill_name = db.Column(db.String(50), nullable=False) 
    skill_desc = db.Column(db.String(255), nullable=False) 
    skill_status = db.Column(db.String(10), nullable=False)


    def __init__(self, skill_id, skill_name, skill_desc, skill_status): 
        self.skill_id = skill_id
        self.skill_name = skill_name 
        self.skill_desc = skill_desc
        self.skill_status = skill_status 


    def json(self): 
        return { "skill_id": self.skill_id, "skill_name": self.skill_name, "skill_desc": self.skill_desc, "skill_status": self.skill_status } 


@app.route("/positions")
def get_all_positions():
    positions = Position.query.all() 
    if positions:
        return jsonify (
            {
                "code": 200,
                "data": [position.json() for position in positions]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no Positions."
        }
    ), 404

@app.route("/active_positions")
def get_active_positions():
    positions = Position.query.filter_by(position_status="Active").all()
    if positions:
        return jsonify (
            {
                "code": 200,
                "data": [position.json() for position in positions]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no Positions."
        }
    ), 404

@app.route("/skills")
def get_all_skill():
    skillList = Skill.query.all() 
    if skillList: 
        return jsonify ( 
            {
                "code": 200,
                "data": [skill.json() for skill in skillList]
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no Skills."
        }
    ), 404

@app.route('/position_skills/<int:position_id>')
def get_position_skills(position_id):
    positionSkills = PositionSkill.query.filter_by(position_id=position_id).all()

    skills = []

    for positionSkill in positionSkills:
        skill = Skill.query.filter_by(skill_id=positionSkill.json()["skill_id"], skill_status="Active").first()
        if skill:
            skills.append(skill.json())

    if skills:
        return jsonify (
            {
                "code": 200,
                "data": skills
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


@app.route("/create_position", methods=['POST'])
def create_position():

    position = request.get_json()
    print(type(position)) #dict 
    positionName = position['position_name']

    if (Position.query.filter_by(position_name=positionName).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "positionName": positionName
                },
                "message": "Position Name already exists."
            }
        ), 400

    positionDesc = position['position_desc']
    positionDept = position['position_dept']
    positionRes = position['position_res']
    positionStatus = position['position_status']

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


@app.route("/create_position_skill", methods=['POST'])
def create_position_skill():

    position = request.get_json()
    print(type(position)) #dict 
    positionID = position['position_id']
    skillID = position['skill_id']


    print(positionID, skillID)
    position = PositionSkill(positionID, skillID)
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