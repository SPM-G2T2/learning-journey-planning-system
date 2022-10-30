from flask import Blueprint, jsonify

from .model import Skill, Course, SkillCourse

course = Blueprint("course", __name__)


@course.route("all")
def get_all_courses(): 
    courses = Course.query.all() 
    if courses:
        return jsonify( 
            {
                "data": [course.json() for course in courses]
            } 
        )
    return jsonify( 
        {
            "message": "There are no courses." 
        } 
    ), 404 


@course.route("<int:course_id>/skills")
def get_skills_by_course(course_id):

    skilllist = SkillCourse.query.filter_by(course_id=course_id).all()

    skills = []

    for item in skilllist:

        skill_id = item.json()['skill_id']
        # print(skill_id)
        skill = Skill.query.filter_by(skill_id=skill_id).all()
        skill_obj=skill[0].json()
        if skill_obj["skill_status"] == "Active":
            skills.append(skill_obj)

    # print(skills)

    if skills: 
        return jsonify( 
            {
                "data": [skill for skill in skills]
            } 
        )
    return jsonify( 
        {
            "message": "Course ID is invalid." 
        } 
    ), 404 
