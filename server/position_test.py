import unittest
from flask import jsonify

from requests import request
import json
from main import app
from backend import db

from backend.model import Position

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
            
    def tearDown(self):
        db.session.remove()
        db.drop_all()

    def test_get_all_positions(self):
        response = self.client.get("/positions/all")
        self.assertEquals(response.json, {"message": "There are no positions."})

    def test_get_active_positions(self):
        response = self.client.get("/positions/active")
        self.assertEquals(response.json, {"message": "There are no active positions."})

    def test_create_position(self):
        
        json_data = {
            "position_id": 1,
            "position_name": "Software Engineer", 
            "position_desc": "Code reusable components", 
            "position_dept": "IT Team", 
            "position_res": "Code 24 hours per day", 
            "position_status": "Active"
        }

        response = self.client.post("/positions/create", data=json.dumps(json_data), content_type="application/json")
       
        self.assertEquals(response.status_code, 201)
        self.assertEquals(response.json['data'], json_data)
