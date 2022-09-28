from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
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
    skill_id = db.Column(db.Integer)

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

    skill_id = db.Column(db.Integer, primary_key=True) 
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
@app.route("/course") 
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


#FUNCTION 2: Add a skill
@app.route("/skill/<int:skill_id>", methods=['POST']) 
def create_skill(skill_id): 
    if (Skill.query.filter_by(skill_id=skill_id).first()): 

        return jsonify( 
            { 
                "code": 400, 
                "data": { 
                    "skill_id": skill_id 
                }, 
                "message": "skill already exists." 
            } 
        ), 400 

    data = request.get_json() 
    skill = Skill(skill_id, **data) 

    try: 
        db.session.add(skill) 
        db.session.commit() 

    except: 
        return jsonify( 
            { 
                "code": 500, 
                "data": { 
                    "skill_id": skill_id 
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


#FUNCTION 3: Assign courses to the created skill


if __name__ == '__main__': 
    app.run(port=5000, debug=True) 