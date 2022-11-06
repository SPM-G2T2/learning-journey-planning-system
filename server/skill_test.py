import unittest

from requests import request
import json
from main import app
from backend import db

from backend.model import Skill, SkillCourse, PositionSkill, StaffSkill

class TestSkill(unittest.TestCase): 

    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite://"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['TESTING'] = True

    def create_app(self):
        return app
    
    def setUp(self):
        self.client = app.test_client()
        ctx = app.app_context()
        ctx.push()
        with ctx:
            db.create_all()
            
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_all_skills(self):
        response = self.client.get("/skills/all")
        self.assertEquals(response.json, {"message": "There are no skills."})

    def test_delete_skill(self, skill_id= "1"):

        skill_1 = Skill(
            skill_id = skill_id, 
            skill_name = "Solution Management", 
            skill_desc = "Learn to manage solutions", 
            skill_status = "Active")

        skill_course_1 = SkillCourse(skill_id = skill_id, course_id = 1)
        position_skill_1 = PositionSkill(position_id = "1", skill_id = skill_id)
        staff_skill_1 = StaffSkill(staff_id = 1, skill_id = skill_id)

        db.session.add(skill_1)
        db.session.add(skill_course_1)
        db.session.add(position_skill_1)
        db.session.add(staff_skill_1)
        
        endpoint_call = self.client.post("/skills/" + skill_id + "/delete_skill")
        self.assertEquals(endpoint_call.json, {"message": "Skill successfully deleted."})

        skill_to_assert = self.client.get("/skills/" + skill_id)
        self.assertEquals(skill_to_assert.json["data"]["skill_status"], "Retired") #Check if skill has been retired

    def test_edit_skill(self):

        skill_1 = Skill(
            skill_id = 1, 
            skill_name = "Solution Management", 
            skill_desc = "Learn to manage solutions", 
            skill_status = "Active")

        skill_course_1 = SkillCourse(1, "2")

        edited_skill = {
            "skill_id": 1,
            "skill_name": "Project Management",
            "skill_desc": "Learn to manage projects",
            "skill_status": "Active",
            "courses": ["3"]
        }

        edited_skill_verification = {
            "skill_desc": "Learn to manage projects",
            "skill_id": 1,
            "skill_name": "Project Management",
            "skill_status": "Active"
        }


        db.session.add(skill_1)
        db.session.add(skill_course_1)

        endpoint_call = self.client.put("/skills/edit_skill", data = json.dumps(edited_skill), content_type = "application/json")
        self.assertEquals(endpoint_call.json, {"message": "Skill successfully edited."})

        edited_skill_to_assert = self.client.get("/skills/1")
        self.assertEquals(edited_skill_to_assert.json['data'], edited_skill_verification) #Check if skill is edited

    def test_edit_skill_with_duplicate_name(self):

        skill_1 = Skill(
            skill_id = 1, 
            skill_name = "Solution Management", 
            skill_desc = "Learn to manage solutions", 
            skill_status = "Active")

        skill_2 = Skill(
            skill_id = 2, 
            skill_name = "Project Management", 
            skill_desc = "Learn to manage projects", 
            skill_status = "Active")

        edited_skill = {
            "skill_id": 1,
            "skill_name": "Project Management", #Same skill name as skill_2
            "skill_desc": "Learn to manage projects",
            "skill_status": "Active",
            "courses": ["3"]
        }


        db.session.add(skill_1)
        db.session.add(skill_2)

        endpoint_call = self.client.put("/skills/edit_skill", data = json.dumps(edited_skill), content_type = "application/json")
        self.assertEquals(endpoint_call.json, {"message": "skill already exists."})

    def test_edit_skill_with_same_name(self):

        skill_1 = Skill(
            skill_id = 1, 
            skill_name = "Solution Management", 
            skill_desc = "Learn to manage solutions", 
            skill_status = "Active")

        skill_2 = Skill(
            skill_id = 2, 
            skill_name = "Project Management", 
            skill_desc = "Learn to manage projects", 
            skill_status = "Active")

        edited_skill = {
            "skill_id": 1,
            "skill_name": "Solution Management", #Same skill name as skill_2
            "skill_desc": "Learn to manage projects",
            "skill_status": "Active",
            "courses": ["3"]
        }


        db.session.add(skill_1)
        db.session.add(skill_2)

        endpoint_call = self.client.put("/skills/edit_skill", data = json.dumps(edited_skill), content_type = "application/json")
        self.assertEquals(endpoint_call.json, {"message": "Skill successfully edited."})

    def test_edit_skill_with_duplicate_course(self):

        skill_1 = Skill(
            skill_id = 1, 
            skill_name = "Solution Management", 
            skill_desc = "Learn to manage solutions", 
            skill_status = "Active")

        skill_2 = Skill(
            skill_id = 2, 
            skill_name = "Project Management", 
            skill_desc = "Learn to manage projects", 
            skill_status = "Active")

        edited_skill = {
            "skill_id": 1,
            "skill_name": "Project Management", #Same skill name as skill_2
            "skill_desc": "Learn to manage projects",
            "skill_status": "Active",
            "courses": ["3", "3"]
        }


        db.session.add(skill_1)
        db.session.add(skill_2)

        endpoint_call = self.client.put("/skills/edit_skill", data = json.dumps(edited_skill), content_type = "application/json")
        self.assertEquals(endpoint_call.json, {"message": "Duplicate courses detected. Please try again."})





