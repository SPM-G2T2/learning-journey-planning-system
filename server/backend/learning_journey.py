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
