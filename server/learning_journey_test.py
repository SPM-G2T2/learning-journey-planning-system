import unittest

from requests import request
import json
from main import app
from backend import db

from backend.model import LearningJourney

class TestLearningJourney(unittest.TestCase): 

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

    def test_delete_learning_journey(self, ljid = "1"):

        lj_1 = LearningJourney(lj_id = ljid, staff_id=3, position_id=3, skill_id=2, course_id=3)

        db.session.add(lj_1)

        endpoint_call = self.client.post("learning_journeys/" + ljid + "/deleteLearningjourney")
        self.assertEquals(endpoint_call.json["message"], "Learning Journey Successfully Deleted")

        lj_delete_check = self.client.get("learning_journeys/all")
        self.assertEquals(lj_delete_check.json["message"], "There are no learning journeys.") #Check DB if LJ has been deleted

    def test_edit_learning_journey(self, ljid = "1"):

        lj_1 = LearningJourney(lj_id = ljid, staff_id=3, position_id=3, skill_id=2, course_id=3)

        db.session.add(lj_1)

        lj_edit = {
            "ljid": 1,
            "role": {
                "id": 1,
                "name": "Manager",
                "status": "Active"
            },
            "position":{
                "position_id": 2, 
                "position_name": "Manager", 
                "position_desc": "Blah BLah", 
                "position_dept": "Management", 
                "position_res": "Blah Blah", 
                "position_status": "Active"
            },
            "courses": [
                {
                "course_id": "COR001",
                "course_name": "Systems Thinking and Design",
                "course_desc": "This foundation module aims to introduce students ...",
                "course_type": "Internal",
                "course_category": "Core",
                "course_status": "Active"
                }, 
                {
                "course_id": "COR002",
                "course_name": "Lean Six Sigma Green Belt Certification",
                "course_desc": "Apply Lean Six Sigma methodology and statistical t...",
                "course_type": "Internal",
                "course_category": "Core",
                "course_status": "Active"
                }
            ],
            "skills": [
                {
                "skill_id": 1,
                "skill_name": "Project Management",
                "skill_desc": "Teach you how to manage a project",
                "skill_status": "Active"
                },
                {
                "skill_id": 2,
                "skill_name": "Statistics",
                "skill_desc": "Teach you statistics",
                "skill_status": "Active"
                }
            ]
        }

        endpoint_call = self.client.post("learning_journeys/edit", data = json.dumps(lj_edit), content_type = "application/json")
        self.assertEquals(endpoint_call.json["message"], "Learning Journey has been successfully edited.")
