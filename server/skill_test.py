import unittest

import json
from main import app
from backend import db

from backend.model import Skill

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

    def test_get_all_active_skills(self):
        response = self.client.get("/skills/active")
        self.assertEquals(response.json, {"message": "There are no active skills."})
