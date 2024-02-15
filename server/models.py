from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

# from config import db


metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

class Owner(db.Model, SerializerMixin):
    __tablename__ = 'owners'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    phone_number = db.Column(db.String)
    email = db.Column(db.String)
    username = db.Column(db.String, unique=True)

    # Relationsips
    dogs = db.relationship("Dog", back_populates = "owner", cascade = "all, delete-orphan")
    reviews = db.relationship("Review", back_populates = "owner")
    # appointments = db.relationship("Appointment", back_populates = "owner", cascade = "all, delete-orphan")
    
    # Serialization
    serialize_rules = ("-dogs.owner", "-reviews.owner", "-appointments.owner")

    # Validations
    @validates("name")
    def validates_name(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    @validates("phone_number")
    def validates_phone_number(self, key, value):
        if not len(value) == 10:
            raise ValueError("phone_number must be 9 digits long.")
        return value
    
    @validates("email")
    def validates_email(self, key, value):
        if "@" not in value:
            raise ValueError("email not valid")
        return value
    
    def __repr__(self):
        return f'<Owner {self.id}, {self.name}, {self.phone_number}, {self.email}>'


class Dog(db.Model, SerializerMixin):
    __tablename__ = 'dogs'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    breed = db.Column(db.String)

    #Foreign Keys
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))

    # Relationships
    owner = db.relationship("Owner", back_populates = "dogs")
    appointments = db.relationship("Appointment", back_populates = "dog", cascade = "all, delete-orphan")
    
    # Serialization
    serialize_rules = ("-owner.dogs", "-appointment.dog")

    @validates("name", "breed")
    def validates_dog(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    def __repr__(self):
        return f'<Dog {self.id}, {self.name}, {self.breed}, {self.owner.name}>'


class Business(db.Model, SerializerMixin):
    __tablename__ = 'businesses'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    address = db.Column(db.String)
    phone_number = db.Column(db.String)

    # Relationships
    appointments = db.relationship("Appointment", back_populates = "business", cascade = "all, delete-orphan")
    reviews = db.relationship("Review", back_populates = "business", cascade = "all, delete-orphan")
    
    # Serialization
    serialize_rules = ("-appointments.business", "-reviews.business")
    
    # Validations
    @validates("name", "address")
    def validates_business(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    @validates("phone_number")
    def validates_phone_number(self, key, value):
        if not len(value) == 10:
            raise ValueError("phone_number must be 10 digits long.")
        return value
    
    def __repr__(self):
        return f'<Business {self.id}, {self.name}, {self.address}, {self.phone_number}>'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer)
    description = db.Column(db.String)

    # Foreign Keys
    owner_id = db.Column(db.Integer, db.ForeignKey("owners.id"))
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))

    # Relationships
    owner = db.relationship("Owner", back_populates = "reviews")
    business = db.relationship("Business", back_populates = "reviews")
    
    # Serialization
    serialize_rules = ("-owner.reviews", "-business.reviews")
    
    # Validations
    @validates("description")
    def validates_description(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value

    @validates("rating")
    def validates_rating(self, key, value):
        if not 0 < value < 11:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    def __repr__(self):
        return f'<Review {self.id}, {self.rating}, {self.description}, {self.owner.name}, {self.business.name}>'
    
class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    price = db.Column(db.String)
    in_time = db.Column(db.Integer)
    out_time = db.Column(db.Integer)
    in_date = db.Column(db.String)
    out_date = db.Column(db.String)

    # Foreign Keys
    dog_id = db.Column(db.Integer, db.ForeignKey("dogs.id"))
    business_id = db.Column(db.Integer, db.ForeignKey("businesses.id"))

    # Relationships
    business = db.relationship("Business", back_populates = "appointments")
    dog = db.relationship("Dog", back_populates = "appointments")
    # owner = db.relationship("Owner", back_populates = "appointments")
    
    # Serialization
    serialize_rules = ("-business.appointments", "-dog.appointments", "-owner.appointments")
    
    # Validations
    @validates("price")
    def validates_price(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    @validates("in_time")
    def validates_in_time(self, key, value):
        if not 659 < value < 1201:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    @validates("out_time")
    def validates_out_time(self, key, value):
        if not 1200 < value < 1901:
            raise ValueError(f"{value} is not a valid {key}.")
        return value

    @validates("in_date")
    def validates_in_date(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value

    @validates("out_date")
    def validates_out_date(self, key, value):
        if not value:
            raise ValueError(f"{value} is not a valid {key}.")
        return value
    
    def __repr__(self):
        return f'<Appointment {self.id}, {self.price}, {self.in_time}, {self.out_time}, {self.in_date}, {self.out_date}, {self.dog.name}, {self.business.name}>'