from flask import Blueprint, request, jsonify

from .model import Skill, Course, SkillCourse
from sqlalchemy import func
import string

skill = Blueprint("skill", __name__)


@skill.route("all")
def get_all_skills():
    skills = Skill.query.all() 
    if skills: 
        return jsonify ( 
            {
                "data": [skill.json() for skill in skills]
            }
        )
    return jsonify(
        {
            "message": "There are no skills."
        }
    ), 404


@skill.route("<int:skill_id>")
def get_skill_by_id(skill_id):
    skill = Skill.query.filter_by(skill_id=skill_id).first()
    if skill:
        return jsonify(
            {
                "data": skill.json()
            }
        )
    return jsonify(
        {
            "message": "Skill not found."
        }
    ), 404


#FUNCTION 3: Filter courses by skill_id
@skill.route("<int:skill_id>/courses")
def get_courses_by_skill(skill_id): 

    courselist = SkillCourse.query.filter_by(skill_id=skill_id).all()

    courses = []

    for item in courselist:

        course_id = item.json()['course_id']
        # print(course_id)

        course = Course.query.filter_by(course_id=course_id).all()
        # print(course[0].json())

        courses.append(course[0].json())

    # print(courses)

    if courses: 
        return jsonify( 
            {
                "data": [course for courses in courses]
            } 
        ) 

    return jsonify( 
        {
            "message": "Skill ID invalid." 
        } 
    ), 404 


#FUNCTION 4: Filter ACTIVE courses by skill_id
@skill.route("<int:skill_id>/courses/active") 
def get_active_courses_by_skill(skill_id): 

    courselist = SkillCourse.query.filter_by(skill_id=skill_id).all()

    courses = []

    for item in courselist:

        course_id = item.json()['course_id']
        # print(course_id)
        course = Course.query.filter_by(course_id=course_id).all()
        course_obj=course[0].json()
        if course_obj["course_status"] == "Active":
            courses.append(course_obj)

    # print(courses)

    if courses: 
        return jsonify( 
            {
                "data": [courses for courses in courses]
            } 
        ) 

    return jsonify( 
        {
            "message": "Skill ID invalid." 
        } 
    ), 404 


#FUNCTION 2: Add a skill and assign it to selected courses
@skill.route("add", methods=['POST']) 
def add_skill(): 

    data = request.get_json() 

    #2.1 Check for duplicates in courses
    courses = data['courses']

    def checkIfDuplicates_1(listOfElems):
        if len(listOfElems) == len(set(listOfElems)):
            return False
        else:
            return True

    result = checkIfDuplicates_1(courses)
    if result:
        return jsonify( 
            {
                "message": "Duplicate courses detected. Please try again." 
            } 
        ), 406

    #2.2 Add skill
    skill_name = string.capwords(data['skill_name'])

    if (Skill.query.filter_by(skill_name=skill_name).first()): 
        return jsonify( 
            {
                "message": "skill already exists." 
            } 
        ), 400 

    max_skill_id = db.session.query(func.max(Skill.skill_id)).first()

    if(max_skill_id[0] == None):
        incremented_skill_id = 1
    else:
        max_skill_id = int(max_skill_id[0])
        incremented_skill_id = max_skill_id + 1

    skill = Skill(incremented_skill_id, string.capwords(data['skill_name']), data['skill_desc'], data['skill_status']) 

    try: 
        db.session.add(skill) 
        db.session.commit() 

    except: 
        return jsonify( 
            {
                "message": "An error occurred creating the skill." 
            } 
        ), 500 
    
    #2.3 assigning skill to courses
    courses = data['courses']

    for course_id in courses:
        # course_obj = Course.query.filter_by(course_id=course_id).first().json()
        # new_course_obj = Course(course_obj['course_id'], course_obj['course_name'], course_obj['course_desc'], course_obj['course_status'], course_obj['course_type'], course_obj['course_category'], incremented_skill_id)

        skill_course_obj = SkillCourse(incremented_skill_id, course_id)

        try: 
            db.session.add(skill_course_obj) 
            db.session.commit() 

        except:
            return jsonify( 
                {
                    "message": "An error occurred assigning the skill." 
                } 
            ), 500 
    
    return jsonify( 
        {
            "message": "Skill successfully created and assigned"
        } 
    ), 201 


#FUNCTION 5: Assign courses to the created skill (assigning different courses to a skill_id)
@skill.route("assign_course", methods=['POST']) 
def create_skill_course(): 

    data = request.get_json()
    courses = data['courses']
    skill_id = int(data["skill_id"])

    for course_id in courses:
        
        course_obj = Course.query.filter_by(course_id=course_id).first().json()
        new_course_obj = Course(course_obj['course_id'], course_obj['course_name'], course_obj['course_desc'], course_obj['course_status'], course_obj['course_type'], course_obj['course_category'], skill_id)
        
        try: 
            db.session.add(new_course_obj) 
            db.session.commit() 

        except:
            return jsonify( 
                {
                    "message": "An error occurred creating the skill." 
                } 
            ), 500 

    return jsonify( 
        {
            "message": "Skill successfully created."
        } 
    ), 201


#FUNCTION 6: Delete skill from courses (delete course entry by course_id and skill_id)
@skill.route("<int:skill_id>/unassign_course", methods=['POST'])
def delete_skill_course(skill_id):

    data = request.get_json() #Pass course_id's to be deleted in a list with key: "to_delete"

    for course_id in data["to_delete"]:
        course_to_delete = Course.query.filter_by(course_id=course_id, skill_id=skill_id)

        try:
            db.session.delete(course_to_delete)
            db.session.commit()
        
        except: 
            return jsonify( 
                {
                    "message": "An error occurred editing the skill." 
                } 
            ), 500 

    return jsonify( 
        {
            "message": "Skill successfully edited."
        } 
    ), 201 

