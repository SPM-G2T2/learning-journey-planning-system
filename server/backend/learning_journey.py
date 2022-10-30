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


@learning_journey.route("/<string:staff_id>/learning_journeys") 
def get_learning_journeys_by_staff(staff_id):

    learning_journeys = db.session.query(LearningJourney.lj_id, Position.position_id, Position.position_name, Position.position_status, Skill.skill_id, Skill.skill_name, Skill.skill_status, Course.course_id, Course.course_name, Course.course_status).filter(LearningJourney.position_id == Position.position_id).filter(LearningJourney.skill_id == Skill.skill_id).filter(LearningJourney.course_id == Course.course_id).filter(LearningJourney.staff_id == staff_id).all()
    # print(learning_journeys)

    sorted_learning_journeys = {}
    for learning_journey in learning_journeys:
        if learning_journey.lj_id not in sorted_learning_journeys:
            sorted_learning_journeys[learning_journey.lj_id] = {"position":{"position_id":learning_journey.position_id, "position_name":learning_journey.position_name, "position_status":learning_journey.position_status}, "skill":[{"skill_id":learning_journey.skill_id, "skill_name":learning_journey.skill_name, "skill_status":learning_journey.skill_status}], "course":[{"course_id":learning_journey.course_id, "course_name":learning_journey.course_name, "course_status":learning_journey.course_status}]}
        else:
            sorted_learning_journeys[learning_journey.lj_id]["skill"].append({"skill_id":learning_journey.skill_id, "skill_name":learning_journey.skill_name, "skill_status":learning_journey.skill_status})
            sorted_learning_journeys[learning_journey.lj_id]["course"].append({"course_id":learning_journey.course_id, "course_name":learning_journey.course_name, "course_status":learning_journey.course_status})

    # print(sorted_learning_journeys)

    if learning_journeys:
        return jsonify(
            {
                "data": sorted_learning_journeys
            }
        )
    return jsonify(
        {
            "message": "This staff does not have any learning journey."
        }
    ), 404


@learning_journey.route("/<int:lj_id>/deleteLearningjourney", methods=['POST'])
def delete_learningjourney(lj_id):
    
    lj_to_delete = LearningJourney.query.filter_by(lj_id=lj_id).all()

    for lj in lj_to_delete:
        try:   
            db.session.delete(lj)
            db.session.commit()
        
        except: 
            return jsonify( 
                { 
                    "code": 500, 
                    "data": {}, 
                    "message": "An error occurred while deleting the learning journey." 
                } 
            ), 500 
    
    return jsonify( 
        { 
            "code": 201, 
            "message": "Learning Journey Successfully Deleted"
        } 
    ), 201


@learning_journey.route("/<int:lj_id>/filterLearningjourneyById", methods=['GET'])
def filter_learningjourney_by_id(lj_id):
    
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
def edit_learningjourney():

    front_end_json = request.get_json()
    print(front_end_json["params"]["ljid"])

    lj_id = front_end_json["params"]["ljid"]
    role = front_end_json["params"]["role"]
    courses = front_end_json["params"]["courses"]
    skills = front_end_json["params"]["skills"]

    return front_end_json

