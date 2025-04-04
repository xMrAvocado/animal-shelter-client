# Animal Shelter

## [See the App!](https://animalshelterapp.netlify.app/)

![App Logo](https://res.cloudinary.com/dh8naz2ht/image/upload/v1743757502/animal-shelter-app/zd0ei0nkli6iha3yhb0y.jpg)

## Description

Website created with React, which provides a list of animals available for adoption by type and pages with details about each one, as well as a list of events in which customers can participate. In addition to viewing the list, the administrator can add, delete, or edit elements.

#### [Client Repo here](https://github.com/xMrAvocado/animal-shelter-client)
#### [Server Repo here](https://github.com/xMrAvocado/animal-shelter-server)

## Technologies & Libraries used

**HTML, CSS, Javascript, React, axios, React Context, Cloudinary, Nodemailer**

## Backlog Functionalities

**Animals pagination for better order and a profile page for the user**

# Client Structure

## User Stories

**NOTE -**  List here all the actions a user can do in the app. Example:

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault 
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can interact with all the events that I could attend and animals I could adopt 
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **events list** - As a client I want to see all the events available so that I can choose which ones I want to attend
- **events create** - As an admin I want to create an event so that I can invite clients to attend.
- **animals list** - As a client I want to see all the animals available so that I can choose which one I want to adopt.
- **animals create** - As an admin I want to create an animal so that I can let clients that it needs adoption.
- **animals edit** - As an admin I want to edit an animal so that I can keep it´s details updated.
- **events edit** - As an admin I want to edit an event so that I can keep it´s details updated.

## Client Routes

**NOTE -** Use below table to list your frontend routes

## React Router Routes (React App)
| Path                      | Page            | Components        | Permissions              | Behavior                                                      |
| ------------------------- | ----------------| ----------------  | ------------------------ | ------------------------------------------------------------  |
| `/`                       | Home            | AnimalList        | public                   | Home page, list of all the animals that need adoption         |
| `/signup`                 | Signup          |                   | public                   | Signup form, link to login, navigate to login after signup    |
| `/login`                  | Login           |                   | public                   | Login form, navigate to homepage after login                  |
| `/about`                  | About           |                   | public                   | Navigate to the project explanation and dev profile page      |
| `/add-animal`             | AddAnimal       |                   | admin only `<OnliAdmin>` | Creates a new animal                                          |
| `/add-event`              | AddEvent        |                   | admin only `<OnlyAdmin>` | Creates a new event                                           |
| `/animals/edit/:animalId` | EditAnimal      |                   | admin only `<OnlyAdmin>` | Edits an existing animal                                      |
| `/events/edit/:eventId`   | EditEvent       |                   | admin only `<OnlyAdmin>` | Edits an existign event                                       |
| `/animals/:animalId`      | AnimalDetails   |                   | user only `<OnlyPrivate>`| Let the user read all the information of a certain animal     |
| `/events/:eventId`        | EventDetails    |                   | user only `<OnlyPrivate>`| Let the user read all the information of a certain event      |
| `/events`                 | EventList       |                   | public                   | List of all the events                                        |

## Other Components

- Navbar
- Footer
- OnlyAdmin
- OnlyPrivate

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()
  - auth.role()

- Backlog Service
  - animal.filter(type)
  - animal.detail(id)
  - animal.add(id)
  - animal.delete(id)
  - animal.update(id)
  - animal.patch(id)

  - event.detail(id)
  - event.add(id)
  - event.delete(id)
  - event.update(id)
  - event.patch(id)
  
## Context

- auth.context
  
## Links

### Project

[Repository Link Client](https://github.com/xMrAvocado/animal-shelter-client)

[Repository Link Server](https://github.com/xMrAvocado/animal-shelter-server)

[Deploy Link](https://animalshelterapp.netlify.app/)