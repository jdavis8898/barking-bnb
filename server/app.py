#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from models import db, Owner, Dog, Business, Review, Appointment
from flask_migrate import Migrate
from flask import Flask, request, make_response
from flask_restful import Api, Resource
import os

# Local imports
# from config import app, db, api

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATABASE = os.environ.get(
    "DB_URI", f"sqlite:///{os.path.join(BASE_DIR, 'app.db')}")

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)


@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route("/sessions/<string:key>", methods=["GET"])
def show_session(key):
    response = make_response({
        'session': {
            'session_key': key,
            'session_value': session[key],
            'session_accessed': session.accessed,
        },
        'cookies': [{cookie: request.cookies[cookie]}
            for cookie in request.cookies],
    }, 200)

    return response

# @app.before_request
# def check_if_logged_in():
#     if not session["user_id"] and request.endpoint == "owner":
#         response = make_response({"error": "Unauthorized"}, 401)

#         return response

class Login(Resource):
    def get(self):
        usernames = [owner.to_dict(rules=("-dogs", "-email", "-name", "-phone_number", "-reviews")) for owner in Owner.query.all()]

        response = make_response(
            usernames,
            200
        )

        return response

    def post(self):
        user = Owner.query.filter(Owner.username == request.get_json()["username"]).first()

        session["user_id"] = user.id

        return user.to_dict()

api.add_resource(Login, "/login")

class CheckSession(Resource):
    def get(self):
        user = Owner.query.filter(Owner.id == session.get("user_id")).first()

        if user:
            return user.to_dict()
        
        else:
            response = make_response({"message": "401: Not Authorized"}, 401)

            return response

api.add_resource(CheckSession, "/check_session")

class Owners(Resource):
    def get(self):
        owners = [owner.to_dict(rules=("-reviews", "-dogs.appointments")) for owner in Owner.query.all()]

        response = make_response(
            owners,
            200
        )

        return response

    def post(self):

        form_data = request.get_json()

        try:
            new_owner = Owner(
                name=form_data["name"],
                phone_number=form_data["phone_number"],
                email=form_data["email"]
            )
            
            db.session.add(new_owner)
            db.session.commit()

            response =  make_response(new_owner.to_dict(), 201)
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response

api.add_resource(Owners, "/owners")

class OwnersById(Resource):
    def get(self, id):
        owner = Owner.query.filter(Owner.id == id).first()

        if not owner:
            response = make_response(
                {"error": "Owner not found"},
                404
            )
        
        else:
            response = make_response(
                owner.to_dict(rules=("-reviews", "-dogs.appointments")),
                200
            )
        
        return response

    def patch(self, id):
        owner = Owner.query.filter(Owner.id == id).first()

        if not owner:
            response = make_response({'error': 'Owner not found'}, 404)

        form_data = request.get_json()

        try:
            for attr in form_data:
                setattr(owner, attr, form_data[attr])

            db.session.commit()

            owner_dict = owner.to_dict()

            response = make_response(owner_dict, 202)

        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response
    
    def delete(self, id):
        owner = Owner.query.filter(Owner.id==id).first()

        if owner:
            db.session.delete(owner)
            db.session.commit()
            response = make_response({}, 204)
        
        else:
            response = make_response({"error": "Owner not found"}, 404)
        
        return response

api.add_resource(OwnersById, "/owners/<int:id>", endpoint="owner")

class Dogs(Resource):
    def get(self):
        dogs = [dog.to_dict(rules=("-reviews", "-appointments", "-owner.reviews")) for dog in Dog.query.all()]

        response = make_response(
            dogs,
            200
        )

        return response

    def post(self):

        form_data = request.get_json()

        try:
            new_dog = Dog(
                name=form_data["name"],
                breed=form_data["breed"],
                owner_id=form_data["owner_id"]
            )
            
            db.session.add(new_dog)
            db.session.commit()

            response =  make_response(new_dog.to_dict(), 201)
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response

api.add_resource(Dogs, "/dogs")

class DogsById(Resource):
    def get(self, id):
        dog = Dog.query.filter(Dog.id == id).first()

        if not dog:
            response = make_response(
                {"error": "Dog not found"},
                404
            )
        
        else:
            response = make_response(
                dog.to_dict(rules=("-reviews", "-appointments", "-owner.reviews")),
                200
            )
        
        return response

    def patch(self, id):
        dog = Dog.query.filter(Dog.id == id).first()

        if not dog:
            response = make_response({'error': 'Dog not found'}, 404)

        form_data = request.get_json()

        try:
            for attr in form_data:
                setattr(dog, attr, form_data[attr])

            db.session.commit()

            dog_dict = dog.to_dict()

            response = make_response(dog_dict, 202)

        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response
    
    def delete(self, id):
        dog = Dog.query.filter(Dog.id==id).first()

        if dog:
            db.session.delete(dog)
            db.session.commit()
            response = make_response({}, 204)
        
        else:
            response = make_response({"error": "Dog not found"}, 404)
        
        return response

api.add_resource(DogsById, "/dogs/<int:id>")

class Businesses(Resource):
    def get(self):
        businesses = [business.to_dict(rules=("-reviews", "-appointments")) for business in Business.query.all()]

        response = make_response(
            businesses,
            200
        )

        return response

    def post(self):

        form_data = request.get_json()

        try:
            new_business = Business(
                name=form_data["name"],
                address=form_data["address"],
                phone_number=form_data["phone_number"]
            )
            
            db.session.add(new_business)
            db.session.commit()

            response =  make_response(new_business.to_dict(), 201)
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response

api.add_resource(Businesses, "/businesses")

class BusinessesById(Resource):
    def get(self, id):
        business = Business.query.filter(Business.id == id).first()

        if not business:
            response = make_response(
                {"error": "Business not found"},
                404
            )
        
        else:
            response = make_response(
                business.to_dict(rules=("-appointments",)),
                200
            )
        
        return response

    def patch(self, id):
        business = Business.query.filter(Business.id == id).first()

        if not business:
            response = make_response({'error': 'Business not found'}, 404)

        form_data = request.get_json()

        try:
            for attr in form_data:
                setattr(business, attr, form_data[attr])

            db.session.commit()

            business_dict = business.to_dict()

            response = make_response(business_dict, 202)

        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response
    
    def delete(self, id):
        business = Business.query.filter(Business.id==id).first()

        if business:
            db.session.delete(business)
            db.session.commit()
            response = make_response({}, 204)
        
        else:
            response = make_response({"error": "Business not found"}, 404)
        
        return response

api.add_resource(BusinessesById, "/businesses/<int:id>")

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict(rules=("-business",)) for review in Review.query.all()]

        response = make_response(
            reviews,
            200
        )

        return response

    def post(self):

        form_data = request.get_json()

        try:
            new_review = Review(
                rating=form_data["rating"],
                description=form_data["description"],
                owner_id=form_data["owner_id"],
                business_id=form_data["business_id"]
            )
            
            db.session.add(new_review)
            db.session.commit()

            response =  make_response(new_review.to_dict(), 201)
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response

api.add_resource(Reviews, "/reviews")

class ReviewsById(Resource):
    def get(self, id):
        review = Review.query.filter(Review.id == id).first()

        if not review:
            response = make_response(
                {"error": "review not found"},
                404
            )
        
        else:
            response = make_response(
                review.to_dict(rules=("-business",)),
                200
            )
        
        return response

    def patch(self, id):
        review = Review.query.filter(Review.id == id).first()

        if not review:
            response = make_response({'error': 'Review not found'}, 404)

        form_data = request.get_json()

        try:
            for attr in form_data:
                setattr(review, attr, form_data[attr])

            db.session.commit()

            review_dict = review.to_dict()

            response = make_response(review_dict, 202)

        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response
    
    def delete(self, id):
        review = Review.query.filter(Review.id==id).first()

        if review:
            db.session.delete(review)
            db.session.commit()
            response = make_response({}, 204)
        
        else:
            response = make_response({"error": "Review not found"}, 404)
        
        return response

api.add_resource(ReviewsById, "/reviews/<int:id>")

class Appointments(Resource):
    def get(self):
        appointments = [appointment.to_dict(rules=("-business.reviews",)) for appointment in Appointment.query.all()]

        response = make_response(
            appointments,
            200
        )

        return response

    def post(self):

        form_data = request.get_json()

        try:
            new_appointment = Appointment(
                price=form_data["price"],
                in_time=form_data["in_time"],
                out_time=form_data["out_time"],
                in_date=form_data["in_date"],
                out_date=form_data["out_date"],
                dog_id=form_data["dog_id"],
                business_id=form_data["business_id"]
            )
            
            db.session.add(new_appointment)
            db.session.commit()

            response =  make_response(new_appointment.to_dict(), 201)
        
        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response

api.add_resource(Appointments, "/appointments")

class AppointmentsById(Resource):
    def get(self, id):
        appointment = Appointment.query.filter(Appointment.id == id).first()

        if not appointment:
            response = make_response(
                {"error": "Appointment not found"},
                404
            )
        
        else:
            response = make_response(
                appointment.to_dict(rules=("-business.reviews",)),
                200
            )
        
        return response

    def patch(self, id):
        appointment = Appointment.query.filter(Appointment.id == id).first()

        if not appointment:
            response = make_response({'error': 'Appointment not found'}, 404)

        form_data = request.get_json()

        try:
            for attr in form_data:
                setattr(appointment, attr, form_data[attr])

            db.session.commit()

            appointment_dict = appointment.to_dict()

            response = make_response(appointment_dict, 202)

        except ValueError:
            response = make_response({"errors": ["validation errors"]}, 400)
        
        return response
    
    def delete(self, id):
        appointment = Appointment.query.filter(Appointment.id==id).first()

        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            response = make_response({}, 204)
        
        else:
            response = make_response({"error": "Appointment not found"}, 404)
        
        return response

api.add_resource(AppointmentsById, "/appointments/<int:id>")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

