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

class Learning_Journey(db.Model):
    __tablename__ = "learning_journey"

    lj_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    staff_id = db.Column(db.Integer, nullable=False)
    skill_id = db.Column(db.Integer, primary_key=True, nullable=False)
    position_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.String(20), primary_key=True, nullable=False)

    def __init__(self, staff_id, position_id, skill_id, course_id): #constructor, initializes the record
        self.staff_id = staff_id
        self.position_id = position_id
        self.skill_id = skill_id
        self.course_id = course_id


    def json(self): #returns json representation of the table in dict form
        return {"lj_id": self.lj_id, "staff_id": self.staff_id, "position_id": self.position_id, "skill_id": self.skill_id, "course_id": self.course_id}

    #Fill up columns here


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


class Course(db.Model): 

    __tablename__ = 'course' 

    course_id = db.Column(db.String(20), primary_key=True) 
    course_name = db.Column(db.String(50), nullable=False) 
    course_desc = db.Column(db.String(255), nullable=False) 
    course_status = db.Column(db.String(15), nullable=False)
    course_type = db.Column(db.String(10), nullable=False)
    course_category = db.Column(db.String(50), nullable=False)

    def __init__(self, course_id, course_name, course_desc, course_status, course_type, course_category): 
        self.course_id = course_id 
        self.course_name = course_name 
        self.course_desc = course_desc
        self.course_status = course_status 
        self.course_type = course_type
        self.course_category = course_category

    def json(self): 
        return {"course_id": self.course_id, "course_name": self.course_name, "course_desc": self.course_desc, "course_status": self.course_status, "course_type": self.course_type, "course_category": self.course_category} 


@app.route("/position/<int:position_id>")
def get_position_by_id(position_id):
    position = Position.query.filter_by(position_id=position_id).first()
    if position:
        return jsonify (
            {
                "code": 200,
                "data": position.json()
            }
        )
    return jsonify(
        {
            "code": 404,
            "message": "There are no Positions."
        }
    ), 404


@app.route('/get_all_learning_journey') # Just a decorator to route to certain url
def get_all_learningjourney():
    learning_journey_list = Learning_Journey.query.all() #Retrieves all records from the learningjourney table -> Returns a list which we assign to learningjourneyList
    if len(learning_journey_list): 
        return jsonify ( 
        {
            "code": 200, #Return the code + list of learningjourney in JSON representation using jsonify
            "data": {
            "Learning Journey": [learning_journey.json() for learning_journey in learning_journey_list] #for learningjourney iteration to create JSON representation using learningjourney.json() 
                    }
                }
            )
    return jsonify(
        {
        "code": 404, #When nothing is found in the table
        "message": "There are no learning journeys."
        }
        ), 404


@app.route("/create_learning_journey", methods=['POST'])
def create_learning_journey():

    learningjourney = request.get_json()
    print(type(learningjourney)) #dict 
    
    staff_id = learningjourney['staff_id']
    skill_id = learningjourney['skill_id']
    position_id = learningjourney['position_id']
    course_id = learningjourney['course_id']

    print(skill_id, position_id, course_id)
    learningjourney = Learning_Journey(staff_id,position_id, skill_id, course_id)
    print(learningjourney)

    try:
        db.session.add(learningjourney)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the learning journey."
            }
        ), 500
 
    return jsonify(
        {
            "code": 201,
            "data": learningjourney.json()
        }
    ), 201


@app.route("/get_learning_journey_by_staff_ID/<string:staffID>") #Just a decorator to route to certain url
def get_learning_journey_by_staff_ID(staffID):

    ljList = db.session.query(Learning_Journey.lj_id, Position.position_id, Position.position_name, Position.position_status, Skill.skill_id, Skill.skill_name, Skill.skill_status, Course.course_id, Course.course_name, Course.course_status).filter(Learning_Journey.position_id == Position.position_id).filter(Learning_Journey.skill_id == Skill.skill_id).filter(Learning_Journey.course_id == Course.course_id).filter(Learning_Journey.staff_id == staffID).all()
    # print(ljList)

    learningJourneyData = {}
    #  learningJourneyData = [ { lj_id: 1, position: {}, course: [ {}, {} ], skill: [ {}, {} ] } ]
    for lj in ljList:
        if lj.lj_id not in learningJourneyData:
            learningJourneyData[lj.lj_id] = {"position":{"position_id":lj.position_id, "position_name":lj.position_name, "position_status":lj.position_status}, "skill":[{"skill_id":lj.skill_id, "skill_name":lj.skill_name, "skill_status":lj.skill_status}], "course":[{"course_id":lj.course_id, "course_name":lj.course_name, "course_status":lj.course_status}]}
        else:
            learningJourneyData[lj.lj_id]["skill"].append({"skill_id":lj.skill_id, "skill_name":lj.skill_name, "skill_status":lj.skill_status})
            learningJourneyData[lj.lj_id]["course"].append({"course_id":lj.course_id, "course_name":lj.course_name, "course_status":lj.course_status})

    # print(learningJourneyData)

    if ljList:
        return jsonify(
            {
                "code": 200, #Return the code + list of learning journeys that the staff has in JSON representation using jsonify
                "data": [learningJourneyData]
            }
        )
    return jsonify(
        {
            "code": 404, #When nothing is found in the table
            "message": "This staff does not have any learning journeys."
        }
    ), 404
    return "hello"


if __name__ == '__main__':
    app.run(port=5007, debug=True)