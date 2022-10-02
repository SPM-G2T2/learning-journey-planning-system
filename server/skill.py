from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
import json
from os import environ
from flask_cors import CORS

app = Flask(__name__) 

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/spm'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False 

db = SQLAlchemy(app) 

#Course DB Model
class Course(db.Model): 

    __tablename__ = 'course' 

    course_id = db.Column(db.String(20), primary_key=True) 
    course_name = db.Column(db.String(50), nullable=False) 
    course_desc = db.Column(db.String(255), nullable=False) 
    course_status = db.Column(db.String(15), nullable=False)
    course_type = db.Column(db.String(10), nullable=False)
    course_category = db.Column(db.String(50), nullable=False)
    skill_id = db.Column(db.Integer, primary_key=True)

    def __init__(self, course_id, course_name, course_desc, course_status, course_type, course_category, skill_id): 
        self.course_id = course_id 
        self.course_name = course_name 
        self.course_desc = course_desc
        self.course_status = course_status 
        self.course_type = course_type
        self.course_category = course_category
        self.skill_id = skill_id

    def json(self): 
        return {"course_id": self.course_id, "course_name": self.course_name, "course_desc": self.course_desc, "course_status": self.course_status, "course_type": self.course_type, "course_category": self.course_category, "skill_id": self.skill_id} 


#Skill DB Model
class Skill(db.Model): 

    __tablename__ = 'skill' 

    skill_id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    skill_name = db.Column(db.String(50), nullable=False) 
    skill_description = db.Column(db.String(255), nullable=False) 
    skill_status = db.Column(db.String(10), nullable=False)

    def __init__(self, skill_id, skill_name, skill_description, skill_status): 
        self.skill_id = skill_id 
        self.skill_name = skill_name 
        self.skill_description = skill_description
        self.skill_status = skill_status 

    def json(self): 
        return {"skill_id": self.skill_id, "skill_name": self.skill_name, "skill_description": self.skill_description, "skill_status": self.skill_status} 


#FUNCTION 1: Return all courses
@app.route("/get_all__courses") 
def get_all_courses(): 
    courselist = Course.query.all() 

    if len(courselist): 

        return jsonify( 

            { 

                "code": 200, 

                "data": { 

                    "courses": [course.json() for course in courselist] 

                } 

            } 

        ) 

    return jsonify( 

        { 

            "code": 404, 

            "message": "There are no courses." 

        } 

    ), 404 


#FUNCTION 2: Add a skill **Validate using skill name**
@app.route("/add_skill", methods=['POST']) 
def create_skill(): 

    data = request.get_json() 
    skill_name = data['skill_name']

    if (Skill.query.filter_by(skill_name=skill_name).first()): 
        return jsonify( 
            { 
                "code": 400, 
                "data": { 
                    "skill_name": skill_name
                }, 
                "message": "skill already exists." 
            } 
        ), 400 

    max_skill_id = db.session.query(func.max(Skill.skill_id)).first()

    if(max_skill_id[0] == None):
        incremented_skill_id = 1
    else:
        max_skill_id = int(max_skill_id[0])
        incremented_skill_id = max_skill_id + 1

    skill = Skill(incremented_skill_id, **data) 

    try: 
        db.session.add(skill) 
        db.session.commit() 

    except: 
        return jsonify( 
            { 
                "code": 500, 
                "data": { 
                    "skill_id": incremented_skill_id 
                }, 
                "message": "An error occurred creating the skill." 
            } 
        ), 500 

    return jsonify( 
        { 
            "code": 201, 
            "data": skill.json() 
        } 
    ), 201 


#FUNCTION 3: Assign courses to the created skill (adding another course entry with different skill_ID)
@app.route("/assign_skill", methods=['POST']) 
def assign_skill(): 

    data = request.get_json() 
    course = Course(**data) #follow course data structure

    try: 
        db.session.add(course) 
        db.session.commit() 

    except: 
        return jsonify( 
            { 
                "code": 500, 
                "data": {}, 
                "message": "An error occurred creating the skill." 
            } 
        ), 500 

    return jsonify( 
        { 
            "code": 201, 
            "data": course.json(),
            "message": "Skill successfully created."
        } 
    ), 201 


#FUNCTION 4: Filter courses by skill_id
@app.route("/filter_courses/<int:skill_id>", methods=['GET']) 
def filter_courses(skill_id): 

    courselist = Course.query.filter_by(skill_id=skill_id).all()

    if courselist: 
        return jsonify( 
            { 
                "code": 200, 
                "data": [course.json() for course in courselist]  
            } 
        ) 

    return jsonify( 
        { 
            "code": 404, 
            "message": "courses not found." 
        } 
    ), 404 


#FUNCTION 5: Delete skill from courses (delete course entry by course_id and skill_id)
@app.route("/delete_course_skill/<int:skill_id>", methods=['POST'])
def delete_course_skill(skill_id):

    data = request.get_json() #Pass course_id's to be deleted in a list with key: "to_delete"

    for course_id in data["to_delete"]:
        course_to_delete = Course.query.filter_by(course_id=course_id, skill_id=skill_id)

        try:
            db.session.delete(course_to_delete)
            db.session.commit()
        
        except: 
            return jsonify( 
                { 
                    "code": 500, 
                    "data": {}, 
                    "message": "An error occurred editing the skill." 
                } 
            ), 500 

    return jsonify( 
        { 
            "code": 201, 
            "message": "Skill successfully edited."
        } 
    ), 201 


if __name__ == '__main__': 
    app.run(port=5000, debug=True) 