

# Carpool

<br>

## Description

Do you drive to work alone? Wouldn't it be nice if you could find people in your area to carpool with? That is what Carpool is about. 
It doesn't mind if you don't have a car and you are looking for a driver or if you have a car and you are looking for passengers, the idea is to find people in your area to carpool with!

Carpooling isn't just saving money and time to people and helping to decrease the pollution and traffic jams created by cars, it also helps companies to create stronger bonds among co-workers and make them more productive.

## User Stories

- **ANON:**
    - **Home Page:** As an anon (non-registered user) I can see the home page. (clicking on the "search ride" and "create ride" buttons will redirect me to the Log in)
    - **Signup:** As an anon I can sign up in the platform so that I can start being part of Carpool (the user data will be stored in DB in mongoDB).
    - **Login:** As a user I can login to the platform so that I can access my profile or start searching / creating rides. 
    - **404:** As an anon/user/admin I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

- **USER:**
    - **User Profile:** As a user I can see my user profile, which will display my usual rides. I also have a button to display all the notification (messages) that other users may have sent me. 
    - **Publishing Rides:** As a user I can publish a usual ride by filling a form. (we will ask for the departure location, the destination, the time of departure and arrival, the frequency and whether you have a car or not. 
    - **Searching Rides:** As a user I can see the rides that other users have publised. Also, there will be a method for the user to filter the rides that are displayed (i.e. the user will be able to filter the rides that departures from a exact location, exact time ... ) from there the user will be able to visit the other user profile.  
    - **Other Users Profiles:** Once I found a user who has an itinerary similar to mine I can access his/her profile. There I will be able to see his usual rides and send him a notification(message) so that he/she can contact me back. 

## Backlog

Challenges:
- Editing profile information. Adding a description, changing the profile picture, etc. 
- Improve the notification messages (creating a chat between the users).
- Creating the possibility for the user to receive notifications when someone creates a ride similar to the one you have already created (so you can connect in an easier way)
- Adding the possibility for the user to select which specifics days s/he makes that ride. 
 
<br>


# Client / Frontend

## Routes
| Path | Component | Permissions | Behavior |
| - | - | - | - |
| `/` | HomePage > Navbar, MainHeader, Section (3 divs) | public | Home page with 3 components: NavBar, Header, infoSection (with 3 divs) |
| `/not-found` | NotFoundPage | public | Not found page |
| `/signup` | SignupPage | public | Sign up page |
| `/login` | LoginPage | public | Log in page |
| `/user` |  entUserPage > UserProfile, Usual rides, Notificartions | Registered users | Shows you your profile details, usual rides and the notification (messages) that other users has sent you |
| `/createRide` | CurrentUserPage > Form | CurrentUser only | Form to create a new ride |
| `/editRide/:rideId` | CurrentUserPage > Form | Current User Only | Form to edit a new ride  |
| `/user/:userId` | CurrentUserPage > UserProfile, Usualrides, send Notifications | CurrentUser only | Shows that user profile details, his/her usualrides and form to send him/her a notification (message)  |


## Components

### Pages
  - HomePage
  - NotFoundPage
  - SignupPage
  - LoginPage
  - UserPage
  - CreateRide Page
  - SearchRide Page
  
### Components
  - TBD

## Services
- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Rides Service
  - TBD 
  
- Notification Service 
  - TBD

<br>


# Server / Backend


## Models

User model

```javascript
{
  name:String, // required
  lastName:String,
  image:String, // default
  email:String, // required & unique
  password:String, // required
  newNotifications: Number
}
```

Ride model

```javascript
 {
  Departure: {
    location: String, //required
    zip: Number, //required
    time: Number, // required enum
  },
  Arrival: {
    location: String / required
    zip: Number, // required
    time: Number // required enum
  },
  Frequency: String, // required enum
  Car: boolean, 
  user: {type: Schema.Types.ObjectId,ref:'User'},
 }
```

Notification model

```javascript
{
  creator: {type: Schema.Types.ObjectId,ref:'User'},
  receiver: {type: Schema.Types.ObjectId,ref:'User'},
  text: String, 
  date: Date // default: new Date()
}
```

<br>

## API Endpoints (backend routes)

| HTTP Method | URL | Request Body | Success status | Error Status | Returns |         Details            |
| - | - | - | - | - | - | - |
| GET | /auth/me | | 201 | 404 | get my user from session |
| POST | /auth/signup | {name, email, password} | 201 | 404 | | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST | /auth/login | {username, password} | 200 | 401 | | Checks if fields not empty (422), if user exists (404), and if password challenges (404), then stores user in session |
| POST | /auth/logout | | 204 | 400 | | Logs out the user |
| GET | /user | Saved session | 200 | 404 | session.currentUser (except password) | get currentUser data, arts and challenges |
| PUT | /user/edit | Saved session | 201 | 400 | - | edit user data |
| GET | /createRide | | 200 | 400 | | Show all challenges |
| POST | /createRide | {body} | 201 | 400 | confimation message | Create and save a new ride |
| GET | /editRide/:rideId/ | {rideId} | 200 | 400 | ride | edit challenge |
| PUT | /editRide/:rideId/ | {rideId} | 200 | 400 | confimation message | edit challenge |
| DELETE | /editRide/:rideId/ | {rideId} | 200 | 400 | confimation message | edit challenge |
| POST | /searchRide/ | {body} | 200 | 400 | every ride that matches conditions | finding the challenges |
| GET | /user/:userId | {userId} | 200 | 400 | user (except password and notifications) | get other user data, his arts and the challenges has joined |
| POST | /createNewNotification | {body} | 200 | 400 | confirmation message | posting new notifications |

<br>
