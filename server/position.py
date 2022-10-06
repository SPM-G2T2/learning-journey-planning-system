from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
# Mac User
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:root@localhost:8889/SPM'
# Window User
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/SPM'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 299}

db = SQLAlchemy(app)

class Position(db.Model):
    __tablename__ = "Position"

    Position_ID = db.Column(db.Integer, primary_key=True, autoincrement=True, nullable=False)
    Position_name = db.Column(db.String(50), nullable=False)
    Position_desc = db.Column(db.String(255), nullable=False)
    Position_dept = db.Column(db.String(20), nullable=False)
    Position_rept = db.Column(db.String(1000), nullable=False)
    Position_status = db.Column(db.String(10), nullable=False)


    def __init__(self, Position_name, Position_desc, Position_dept, Position_rept, Position_status): # constructor, initializes the record
        self.Position_name = Position_name
        self.Position_desc = Position_desc
        self.Position_dept = Position_dept
        self.Position_rept = Position_rept
        self.Position_status = Position_status


    def json(self): # returns json representation of the table in dict form
        return {"Position_ID": self.Position_ID, "Position_name": self.Position_name, "Position_desc": self.Position_desc, "Position_dept": self.Position_dept, "Position_rept": self.Position_rept, "Position_status": self.Position_status}


class Position_Skill(db.Model):
    __tablename__ = "Position_Skill"

    Position_ID = db.Column(db.Integer, primary_key=True, nullable=False)
    Skill_ID = db.Column(db.Integer, primary_key=True, nullable=False)
   

    def __init__(self, Position_ID, Skill_ID): # constructor, initializes the record
        self.Position_ID = Position_ID
        self.Skill_ID = Skill_ID


    def json(self): # returns json representation of the table in dict form
        return {"Position_ID": self.Position_ID, "Skill_ID": self.Skill_ID}


@app.route("/position")
def get_all_position():
    positionList = Position.query.all() 
    if len(positionList): 
        return jsonify ( 
        {
            "code": 200,
            "data": {
            "Positions": [position.json() for position in positionList] 
                    }
                }
            )
    return jsonify(
        {
        "code": 404,
        "message": "There are no Positions."
        }
        ), 404


@app.route("/createPosition", methods=['POST'])
def create_position():

    position = request.get_json()
    print(type(position)) #dict 
    positionName = position['Position_name']

    if (Position.query.filter_by(Position_name=positionName).first()):
        return jsonify(
            {
                "code": 400,
                "data": {
                    "Position Name": positionName
                },
                "message": "Position Name already exists."
            }
        ), 400

    positionDesc = position['Position_desc']
    positionDept = position['Position_dept']
    positionRes = position['Position_rept']
    positionStatus = position['Position_status']

    print(positionName, positionDesc, positionDept, positionRes, positionStatus)
    position = Position(positionName, positionDesc, positionDept, positionRes, positionStatus)
    print(position)
 
    try:
        db.session.add(position)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred creating the position."
            }
        ), 500
 
    return jsonify(
        {
            "code": 201,
            "data": position.json()
        }
    ), 201


@app.route("/createPositionSkill", methods=['POST'])
def create_position_skill():

    position = request.get_json()
    print(type(position)) #dict 
    positionID = position['Position_ID']
    skillID = position['Skill_ID']


    print(positionID, skillID)
    position = Position_Skill(positionID, skillID)
    print(position)
 
    try:
        db.session.add(position)
        db.session.commit()
    except:
        return jsonify(
            {
                "code": 500,
                "message": "An error occurred adding the position and skill."
            }
        ), 500
 
    return jsonify(
        {
            "code": 201,
            "data": position.json()
        }
    ), 201


if __name__ == '__main__':
    app.run(port=5000, debug=True)