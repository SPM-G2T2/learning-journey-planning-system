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

    def __init__(self, staff_id, skill_id, position_id, course_id): #constructor, initializes the record
        self.staff_id = staff_id
        self.skill_id = skill_id
        self.position_id = position_id
        self.course_id = course_id


    def json(self): #returns json representation of the table in dict form
        return {"lj_id": self.lj_id, "staff_id": self.staff_id, "skill_id": self.skill_id, "position_id": self.position_id, "course_id": self.course_id}

    #Fill up columns here



@app.route('/learningjourney') # Just a decorator to route to certain url
def get_all_learningjourney():
    learningjourneyList = Learning_Journey.query.all() #Retrieves all records from the learningjourney table -> Returns a list which we assign to learningjourneyList
    if len(learningjourneyList): 
        return jsonify ( 
        {
            "code": 200, #Return the code + list of learningjourney in JSON representation using jsonify
            "data": {
            "Learning Journey": [learningjourney.json() for learningjourney in learningjourneyList] #for learningjourney iteration to create JSON representation using learningjourney.json() 
                    }
                }
            )
    return jsonify(
        {
        "code": 404, #When nothing is found in the table
        "message": "There are no learning journeys."
        }
        ), 404


@app.route("/createLearningjourney", methods=['POST'])
def create_learningjourney():

    learningjourney = request.get_json()
    print(type(learningjourney)) #dict 
    # staffID = learningjourney['staff_id']
    # learningjourneyID = learningjourney['lj_id']

    # if (Learning_Journey.query.filter_by(lj_id=learningjourneyID).first()):
    #     return jsonify(
    #         {
    #             "code": 400,
    #             "data": {
    #                 "Learning Journey ID": learningjourneyID
    #             },
    #             "message": "Learning Journey already exists."
    #         }
    #     ), 400

    staff_id = learningjourney['staff_id']
    skill_id = learningjourney['skill_id']
    position_id = learningjourney['position_id']
    course_id = learningjourney['course_id']

    print(skill_id, position_id, course_id)
    learningjourney = Learning_Journey(staff_id, skill_id, position_id, course_id)
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


if __name__ == '__main__':
    app.run(port=5000, debug=True)