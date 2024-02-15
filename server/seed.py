#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from datetime import date

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Owner, Dog, Business, Review, Appointment

fake = Faker()

def create_owners():
    owners = []
    for _ in range(20):
        o = Owner(
            name=fake.name(),
            phone_number=fake.msisdn()[:10],
            email=fake.email(),
            username=fake.first_name()
        )
        owners.append(o)

    return owners


def create_dogs(owners):
    dogs = []
    names = []
    for _ in range(50):
        name = fake.name()
        while name in names:
            name = fake.name()
        names.append(name)

        d = Dog(
            name=name,
            breed=rc(["Great Pyrenees", "Golden Retreiver", "Boxer", "Anatolian Shepherd", "German Shepherd", "Mastiff", "Great Dane", "Greyhoud", "Lab", "Husky", "Terrier"]),
            owner_id=rc(owners).id
        )
        dogs.append(d)

    return dogs

def create_businesses():
    businesses = []

    b = Business(
        name="4 Paws Pet Resort & Activity Center",
        address=fake.address(),
        phone_number=fake.msisdn()[:10]
    )
    businesses.append(b)

    b2 = Business(
        name="Free Spirit Doggy Daycare",
        address=fake.address(),
        phone_number=fake.msisdn()[:10]
    )
    businesses.append(b2)

    b3 = Business(
        name="Doggie Works",
        address=fake.address(),
        phone_number=fake.msisdn()[:10]
    )
    businesses.append(b3)

    return businesses

def create_reviews(owners, businesses):
    reviews = []
 
    for _ in range(5):

        r = Review(
            rating=rc([1,2,3,4,5,6,7,8,9,10]),
            description=fake.sentence(),
            owner_id=rc(owners).id,
            business_id=rc(businesses).id
        )
        reviews.append(r)

    return reviews

def create_appointments(dogs, businesses):
    appointments = []
    morning = [700, 730, 800, 830, 900, 930, 1000, 1030, 1100, 1130, 1200]
    afternoon = [1230, 1300, 1330, 1400, 1430, 1500, 1530, 1600, 1630, 1700]
    day = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30']
    month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    today = date.today()
 
    for _ in range(5):

        a = Appointment(
            price=fake.pricetag(),
            in_time=rc(morning),
            out_time=rc(afternoon),
            in_date=rc(month)+rc(day)+str(today.year),
            out_date=rc(month)+rc(day)+str(today.year),
            dog_id=rc(dogs).id,
            business_id=rc(businesses).id
        )
        appointments.append(a)

    return appointments

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        
        print("Clearing db...")
        Owner.query.delete()
        Dog.query.delete()
        Business.query.delete()
        Review.query.delete()
        Appointment.query.delete()

        print("Seeding owners...")
        owners = create_owners()
        db.session.add_all(owners)
        db.session.commit()

        print("Seeding dogs...")
        dogs = create_dogs(owners)
        db.session.add_all(dogs)
        db.session.commit()

        print("Seeding businesses...")
        businesses = create_businesses()
        db.session.add_all(businesses)
        db.session.commit()

        print("Seeding reviews...")
        reviews = create_reviews(owners, businesses)
        db.session.add_all(reviews)
        db.session.commit()

        print("Seeding appointments...")
        appointments = create_appointments(dogs, businesses)
        db.session.add_all(appointments)
        db.session.commit()

        print("Done seeding!")
