# **Welcome to Barking B&B!**
## Owner: Jeffrey Davis
## **Short Description**
Barking B&B is an application that will allow users to sign their pups up to a doggie daycare!
## **Domain Model**
![Domain Model drawio](https://i.imgur.com/tJhEntb.png)
## **ERD**
![ERD](https://i.imgur.com/KM4JX8v.png)
## **MVP**
C - owners, dogs, reviews, businesses, appointments\
R - reviews, businesses\
U - owners, dogs, reviews, businesses, appointments\
D - owners, dogs, reviews, businesses, appointments
## **Backend**
### Models
- Owners
    - This table will store information related to a dog's owner
    - Validations
        - Name and phone number will both be mandatory when creating an instance of Owner
        - Email will be optional and default to None if not provided
        - Coordinates is a part of the stretch goal but would also be optional and default to None if the user does not want to use their location
    - Relationships
        - This table has a one-to-many relationship with dogs (an owner can have multiple dogs)
            - When an owner gets deleted, it will delete all dogs associated with that owner
        - This table has a one-to-many relationship with reviews (an owner can have multiple reviews)
        - This table has a one-to-many relationship with appointments through dogs (an owner can have multiple appointments)
            - When an owner gets deleted, it will delete all appointments associated with that owner
- Dogs
    - This table will store information related to a dog
    - Validations
     - Name and breed will both be mandatory when creating an instance of Dog
    - Relationships
        - This table has a many-to-one relationship with owners (a dog can only have one owner)
        - This table has a one-to-many relationship with appointments (a dog can have multiple appointments)
            - When a dog gets deleted, it will delete all appointments associated with that dog
- Businesses
    - This table will store information related to a business
    - Validations
        - Name, address, and phone number will all be mandatory when creating an instance of Business
        - Coordinates is part of the stretch goal but would be mandatory for creating an instance of business
    - Relationships
        - This table has a one-to-many relationship with appointments (a business can have multiple appointments)
            - When a business gets deleted, it will delete all appointments associated with that business
        - This table has a one-to-many relationship with reviews (a business can have multiple reviews)
            - When a business gets deleted, it will delete all reviews associated with that business
- Reviews
    - This table will store information related to a review a customer (owner) would leave for a business
    - Validations
        - Rating and description will both be mandatory when creating an instance of Review
    - Relationships
        - This table has a many-to-one relationship with owners (a review can only have one owner)
        - This table has a many-to-one relatiosnip with businesses (a review can only have one business)
- Appointments
    - This table will store information related to appointments and when those are created
    - Validations
        - Price, in time, out time, in date, and out date will all be mandatory when creating an instance of Appointment
    - Relationships
        - This table has a many-to-one relationship with businesses (an appointment can only have one business)
        - This table has a many-to-one relationship with dogs (an appointment can only have one dog)
        - This table has a many-to-one relationship with owners through dogs (an appointment can only have one owner)

## **Controllers**
API routes
RESTful conventions

```
POST /owners/
```

```
PATCH /owners/<int:id>
DELETE /owners/<int:id>
```

```
POST /dogs/
```

```
PATCH /dogs/<int:id>
DELETE /dogs/<int:id>
```

```
GET /businesses/
POST /businesses/
```

```
GET /businesses/<int:id>
PATCH /businesses/<int:id>
DELETE /businesses/<int:id>
```

```
GET /reviews/
POST /reviews/
```

```
GET /reviews/<int:id>
PATCH /reviews/<int:id>
DELETE /reviews/<int:id>
```

```
POST /appointments/
```

```
PATCH /appointments/<int:id>
DELETE /appointments/<int:id>
```
## **Stretch Goals**
- Add an interactable calendar when making an appointment
- Utilize coordinates to show daycares that are nearby if the user approves
- User can create an account and they would be the only ones who can see their dogs and appointments

## **Timeline**
- Friday (2/9): Make wireframe and a layout of the React components
- Saturday & Sunday: Get models and routes all made
- Monday: Work on frontend and get that connected to backend
- Tuesday: Make sure frontend is good and connected to backend, then start working on stretch goals and styling
- Wednesday & Thursday: Work on stretch goals and making it look presentable.  Make sure README is updated!
- Friday (2/16): Present!