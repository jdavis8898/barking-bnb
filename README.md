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
    - Relationships
        - An `Owner` has many `Dogs`, `Reviews`, `Appointments`
            - When an `Owner` gets deleted, it will delete all `Dogs` and `Appointments` associated with it
    - Validations
        - Must have `name` and `phone_number`
        - `email` will be optional and default to None if not provided
        - `coordinates` is a part of the stretch goal but would also be optional and default to None if the user does not want to use their location
- Dogs
    - This table will store information related to a dog
    - Relationships
        - A `Dog` has one `Owner`
        - A `Dog` has many `Appointments`
            - When a `Dog` gets deleted, it will delete all `Appointments` associated with it
    - Validations
        - Must have `name` and `breed`
- Businesses
    - This table will store information related to a business
    - Relationships
        - A `Business` has many `Appointments` and `Reviews`
            - When a `Business` gets delete, it will delete all `Appointments` and `Reviews` associated with it
    - Validations
        - Must have a `name`, `address`, and `phone_number`
        - `coordinates` is part of the stretch goal but would be mandatory for creating an instance of business
- Reviews
    - This table will store information related to a review a customer (owner) would leave for a business
    - Relationships
        - A `Review` has one `Owners` and one `Business`
    - Validations
        - Must have a `rating` and `description`
- Appointments
    - This table will store information related to appointments and when those are created
    - Relationships
        - An `Appointment` has one `Business`, one `Dog`, and one `Owner` 
    - Validations
        - Must have a `price`, `in_time`, `out_time`, `in_date`, and `out_date`

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

## **Tools/Libraries Utilized**
- SQLite
- Datetime
- Drawio
- dbdiargram