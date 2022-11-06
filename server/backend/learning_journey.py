from flask import Blueprint, request, jsonify

from . import db

from .model import Position, Skill, Course, LearningJourney

learning_journey = Blueprint("learning_journey", __name__)


@learning_journey.route('all') 
def get_all_learning_journeys():

    learning_journeys = LearningJourney.query.all()

    if learning_journeys:
        return jsonify ( 
            {
                "data": [learning_journey.json() for learning_journey in learning_journeys]
            }
        )
    return jsonify(
        {
            "message": "There are no learning journeys."
        }
        ), 404


@learning_journey.route("/create", methods=['POST'])
def create_learning_journey():

    learningjourney = request.get_json()
    # print(type(learningjourney)) #dict 
    
    staff_id = learningjourney['staff_id']
    position_id = learningjourney['position_id']
    skill_id = learningjourney['skill_id']
    course_id = learningjourney['course_id']

    learningjourney = LearningJourney(staff_id, position_id, skill_id, course_id)
    # print(learningjourney)

    try:
        db.session.add(learningjourney)
        db.session.commit()
    except:
        return jsonify(
            {
                "message": "An error occurred creating the learning journey."
            }
        ), 500
    return jsonify(
        {
            "data": learningjourney.json()
        }
    ), 201


@learning_journey.route("/<int:lj_id>/delete", methods=['POST'])
def delete_learning_journey(lj_id):
    
    lj_to_delete = LearningJourney.query.filter_by(lj_id=lj_id).all()

    for lj in lj_to_delete:
        try:   
            db.session.delete(lj)
            db.session.commit()
        
        except: 
            return jsonify( 
                { 
                    "data": {}, 
                    "message": "An error occurred while deleting the learning journey." 
                } 
            ), 500 
    return jsonify( 
        { 
            "message": "Learning Journey has been successfully deleted."
        } 
    ), 201


@learning_journey.route("/<int:lj_id>/filterLearningjourneyById", methods=['GET'])
def filter_learning_journey_by_id(lj_id):
    
    learning_journeys = LearningJourney.query.filter_by(lj_id=lj_id).all()

    if learning_journeys:
        return jsonify ( 
            {
                "data": [learning_journey.json() for learning_journey in learning_journeys]
            }
        )
    return jsonify(
        {
            "message": "An error occured filtering the learning journey's by LJID."
        }
        ), 404


@learning_journey.route("/edit", methods=['PUT'])
def edit_learning_journey():

    front_end_json = request.get_json()
    print(front_end_json["params"]["ljid"])

    lj_id = front_end_json["params"]["ljid"]
    role = front_end_json["params"]["role"]
    courses = front_end_json["params"]["courses"]
    skills = front_end_json["params"]["skills"]

    return front_end_json