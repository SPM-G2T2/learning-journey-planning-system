from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+mysqlconnector://admin:{os.environ['PASSWORD']}@learning-journey-planning-system.czgju3uctwbf.ap-southeast-1.rds.amazonaws.com:3306/learning_journey_planning_system"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {'pool_recycle': 280}

    
    db.init_app(app)

    from .position import position
    from .skill import skill
    from .course import course
    from .staff import staff
    from .learning_journey import learning_journey

    app.register_blueprint(position, url_prefix='/positions/')
    app.register_blueprint(skill, url_prefix='/skills/')
    app.register_blueprint(course, url_prefix='/courses/')
    app.register_blueprint(staff, url_prefix='/staff/')
    app.register_blueprint(learning_journey, url_prefix='/learning_journeys/')

    return app