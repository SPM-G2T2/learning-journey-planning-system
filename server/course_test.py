import unittest

import json
from main import app
from backend import db

from backend.model import Course

class TestCourse(unittest.TestCase): 

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

    def test_get_all_courses(self):
        response = self.client.get("/courses/all")
        self.assertEquals(response.json, {"message": "There are no courses."})

    def test_get_all_active_courses(self):
        response = self.client.get("/courses/active")
        self.assertEquals(response.json, {"message": "There are no active courses."})

    def test_get_skills_by_course(self, course_id="1"):
        response = self.client.get("/courses/" + course_id + "/skills")
        self.assertEquals(response.json, {"message": "There are no skills taught in this course."})