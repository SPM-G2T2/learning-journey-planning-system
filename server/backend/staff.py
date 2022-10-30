from flask import Blueprint, jsonify

from .model import StaffSkill

staff = Blueprint("staff", __name__)


@staff.route("<string:staff_id>/skills")
def get_skills_by_staff(staff_id):

    staffs = StaffSkill.query.filter_by(staff_id=staff_id).all()
    if staffs:
        return jsonify(
            {
                "data": [staff.json() for staff in staffs]
            }
        )
    return jsonify(
        {
            "message": "Staff not found."
        }
    ), 404


@staff.route("/<string:staff_id>/learning_journeys") 
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