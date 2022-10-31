from flask import Blueprint, request, jsonify

from . import db

from .model import Position, Skill, PositionSkill

position = Blueprint("position", __name__)


@position.route('all')
def get_all_positions():
    positions = Position.query.all() 
    if positions:
        return jsonify (
            {
                "data": [position.json() for position in positions]
            }
        )
    return jsonify(
        {
            "message": "There are no positions."
        }
    ), 404


@position.route("active")
def get_active_positions():
    positions = Position.query.filter_by(position_status="Active").all()
    if positions:
        return jsonify (
            {
                "data": [position.json() for position in positions]
            }
        )
    return jsonify(
        {
            "message": "There are no positions."
        }
    ), 404


@position.route('<int:position_id>/skills')
def get_skills_by_position(position_id):
    skills = db.session.query(Skill).filter(PositionSkill.skill_id==Skill.skill_id, PositionSkill.position_id==position_id).all()

    if skills:
        return jsonify (
            {
                "data": [skill.json() for skill in skills]
            }
        )
    return jsonify(
        {
            "message": "There are no skills for this position."
        }
    ), 404


@position.route('<int:position_id>/skills/active')
def get_active_skills_by_position(position_id):
    skills = db.session.query(Skill).filter(PositionSkill.skill_id==Skill.skill_id, PositionSkill.position_id==position_id, Skill.skill_status=="Active").all()

    if skills:
        return jsonify (
            {
                "data": [skill.json() for skill in skills]
            }
        )
    return jsonify(
        {
            "message": "There are no active skills for this position."
        }
    ), 404


@position.route("create", methods=['POST'])
def create_position():

    position = request.get_json()
    print(type(position)) #dict 
    positionName = position['position_name']

    if (Position.query.filter_by(position_name=positionName).first()):
        return jsonify(
            {
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
                "message": "An error occurred creating the position."
            }
        ), 500
 
    return jsonify(
        {
            "data": position.json()
        }
    ), 201


@position.route("assign_skill", methods=['POST'])
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
                "message": "An error occurred adding the position and skill."
            }
        ), 500
 
    return jsonify(
        {
            "data": position.json()
        }
    ), 201
