import unittest 
from flask import jsonify

import json
from main import app
from backend import db

from backend.model import Position, Skill, PositionSkill

class TestPosition(unittest.TestCase): 

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
            position_1 = Position(
                position_id = 1,
                position_name = "Software Engineer", 
                position_desc = "Code reusable components", 
                position_dept = "IT Team", 
                position_res = "Code 24 hours per day", 
                position_status = "Active"
            )

            position_2 = Position(
                position_id = 2,
                position_name = "Product Designer", 
                position_desc = "Design components and user journey", 
                position_dept = "IT Team", 
                position_res = "Design 12 hours per day", 
                position_status = "Retired"
            )

            skill_1 = Skill(
                skill_id = 1, 
                skill_name = "Java Programming",
                skill_desc = "Code in Java", 
                skill_status = "Active"
            )

            skill_2 = Skill(
                skill_id = 2, 
                skill_name = "Python Programming",
                skill_desc = "Code in Python", 
                skill_status = "Retired"
            )

            skill_3 = Skill(
                skill_id = 3, 
                skill_name = "Designing",
                skill_desc = "Design on Figma", 
                skill_status = "Active"
            )

            skill_4 = Skill(
                skill_id = 4, 
                skill_name = "Usability Testing",
                skill_desc = "Conduct UT with potential users", 
                skill_status = "Retired"
            )

            PS_1 = PositionSkill(1, 1)
            PS_2 = PositionSkill(1, 2)

            db.session.add(position_1)
            db.session.add(position_2)
            db.session.add(skill_1)
            db.session.add(skill_2)
            db.session.add(skill_3)
            db.session.add(skill_4)
            db.session.add(PS_1)
            db.session.add(PS_2)


    def tearDown(self):
        db.session.remove()
        db.drop_all()


    def test_get_all_positions(self):
        response = self.client.get("/positions/all")
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json['data']), 2)


    def test_get_active_positions(self):
        response = self.client.get("/positions/active")
        self.assertEquals(response.json['data'], [{ 
            "position_id": 1,
            "position_name": "Software Engineer", 
            "position_desc": "Code reusable components", 
            "position_dept": "IT Team", 
            "position_res": "Code 24 hours per day", 
            "position_status": "Active"}])


    def test_get_skills_by_position(self):
        response = self.client.get("/positions/1/skills")
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json['data']), 2)


    def test_get_skill_ids_by_position(self, position_id = "1"):
        response = self.client.get("/positions/" + position_id + "/skill_ids")
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json['data']), 2)


    def test_get_active_skills_by_position(self):
        response = self.client.get("/positions/1/skills/active")
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json['data']), 1)

    
    def test_create_position(self):
        
        json_data = {
            "position_name": "Staff Software Engineer", 
            "position_desc": "Manage team and code reusable components", 
            "position_dept": "IT Team", 
            "position_res": "Code 36 hours per day", 
            "position_status": "Active",
            "position_skills": [1, 2, 3]
        }

        response = self.client.post("/positions/create", data=json.dumps(json_data), content_type="application/json")
        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.json['data'], {
            "position_id": 3,
            "position_name": "Staff Software Engineer", 
            "position_desc": "Manage team and code reusable components", 
            "position_dept": "IT Team", 
            "position_res": "Code 36 hours per day", 
            "position_status": "Active",
        })


    # def test_edit_position(self):

    #     json_data = {
    #         "position_id": 2,
    #         "position_name": "Product Designer", 
    #         "position_desc": "Design components and user journey", 
    #         "position_dept": "IT Team", 
    #         "position_res": "Design 12 hours per day", 
    #         "position_status": "Active",
    #         "position_skills": [1, 2, 3, 4]
    #     }

    #     response = self.client.put("/positions/edit", data=json.dumps(json_data), content_type="application/json")

    #     with open('op.txt', 'w') as f:
    #         f.write(json.dumps(response))

    #     self.assertEquals(response.status_code, 200)
    #     self.assertEquals(response.json['message'], "Position has been successfully editted." )
