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

class Learning_Journey(db.Model):
    __tablename__ = "learning_journey"

    lj_id = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    staff_id = db.Column(db.Integer, nullable=False)
    skill_id = db.Column(db.Integer, nullable=False)
    position_id = db.Column(db.Integer, nullable=False)
    course_id = db.Column(db.String(20), nullable=False)

    def __init__(self, staff_id, position_id, skill_id, course_id): #constructor, initializes the record
        self.staff_id = staff_id
        self.position_id = position_id
        self.skill_id = skill_id
        self.course_id = course_id


    def json(self): #returns json representation of the table in dict form
        return {"lj_id": self.lj_id, "staff_id": self.staff_id, "position_id": self.position_id, "skill_id": self.skill_id, "course_id": self.course_id}

    #Fill up columns here



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

    ljList = Learning_Journey.query.filter_by(staff_id=staffID).all() #Retrieves all records for a particular staff from the learningjourney table -> Returns a list which we assign to ljList
    if ljList:
        return jsonify(
            {
                "code": 200, #Return the code + list of learning journeys that the staff has in JSON representation using jsonify
                "data": {
                    "Positions": [lj.json() for lj in ljList]
                }
            }
        )
    return jsonify(
        {
            "code": 404, #When nothing is found in the table
            "message": "This staff does not have any learning journeys."
        }
    ), 404


if __name__ == '__main__':
    app.run(port=5007, debug=True)