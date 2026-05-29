# TICKETIFY

## [See the App!](www.ticketify-theta.vercel.app)

![App Logo](TICKETIFY)

## Description

Ticketify is a concert booking and management website built with the
MERN stack. Users can explore concerts, view details, and book tickets
through a smooth and modern interface.

#### [Client Repo](www.github.com/AybikeCV/ticketify-app-client)

#### [Server Repo](www.github.com/AybikeCV/ticketify-app-server)

## Technologies & Libraries used

- HTML
- TailwindCSS vite plugin
- JavaScript
- React
- Express
- Axios
- Node.js
- MongoDB
- Cloudinary
- Leaflet


## Backlog Functionalities

- Real ticketing system
- Upgraded/improved seat selection
- Mail confirmation/cancel notifications to admin

# Client Structure

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I see the errors as toast meassages
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the events that I could attend
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **concerts list** - As a user I want to see all the concerts available so that I can choose which ones I want to attend
- **events create** - As a user I want to create an event so that I can invite others to attend
- **concerts list** - As a user I want to see all the concerts available so that I can choose which ones I want to attend
- **venues list** - As a user I want to see all the venues available so that I can see the details like address or map
- **edit concert** - As an admin, I can change the details of a concert
- **edit venue** - As an admin, I can change the details of a venue
- **edit bookings** - As a user I can cancel my booking, as an admin I can cancel the booking
- **edit profile** - As a user I can change my name, email, avatar picture etc.
- **delete profile** - As a user I can delete my profile
- **create concert** - As an admin I can create a concert
- **create venue** - As an admin I can create a venue
- **create booking** - As a user I can do a booking to a concert
- **delete concert** - As an admin I can delete a concert, if I delete a concert, bookings related to that concert automatically get cancelled
- **delete venues** - As an admin I can delete a venue
- **dashboard** - As an admin I have a page where I can see the paths to manage
- **profile** - As a user I have page to show my info and bookings
- **delete venues** - As an admin I can delete a venue

## Client Routes



## React Router Routes (React App)

| Path                | Page          | Components        | Permissions             | Behavior                                                      |
| ------------------- | ------------- | ----------------- | ----------------------- | ------------------------------------------------------------- |
| `/`                 | Home          |   - Concert Featured Slider/ Featured Concert Card                | public                  | Home page                                                     |
| `/signup`           | Signup        |                   | anon only `<IsAnon>`    | Signup form, link to login, navigate to homepage after signup |
| `/login`            | Login         |                   | anon only `<IsAnon>`    | Login form, link to signup, navigate to homepage after login  |
| `/profile`          | Profile       | EditProfile       | user only `<IsPrivate>` | Navigate to homepage after logout, expire session             |
| `/about`       | About      |  | Public | Shows what the page is about       |
| `/concerts`       | AllConcerts ConcerCard     |                   | Public | Shows all concerts                                    |
| `/concerts/:id`       |  Concert Detail Concert Card    |                   | Public | Shows detail of a concert                                    |
| `/events`       | AllVenues VenueCard     |                   | Public| Shows all venues                                    |
| `/venues/:id`       | Venue Detail Venue Card     |                   | Public |Shows details of  a venue                                    |
| `/profile/edit`       | Edit Profile     |                   | Private-User | User edits profile info                                    |
| `/dashboard`       | Admin Dashboard     |                   | Private-Admin |Shows admin dashboard                                    |
| `/dashboard/users`       | AdminUsers AdminEditUsers    |                   | Private-Admin |Shows details of  users for admin to manage                                    |
| `/dashboard/concerts`       | AdminConcerts    |                   | Private-Admin |Shows details of  concerts for admin to manage                                    |
| `/dashboard/venues`       | AdminVenues    |                   | Private-Admin |Shows details of  venues for admin to manage                                    |
| `/dashboard/bookings`       | AdminBookings   |                   | Private-Admin |Shows details of bookings for admin to manage                                    |
| `/dashboard/concerts/create`       | AdminCreateConcert   |                   | Private-Admin | Admin creates concert                                   |
| `/dashboard/concerts/venue`       | AdminCreateVenue   |                   | Private-Admin | Admin creates venue                                   |
| `/dashboard/concerts/edit/:id`       | AdminEditConcert   |                   | Private-Admin | Admin edits concert                                   |
| `/dashboard/venues/edit/:id`       | AdminEditVenue   |                   | Private-Admin | Admin edits venue                                   |
| `/dashboard/bookings/edit/:id`       | AdminEditBookings   |                   | Private-Admin | Admin manages and cancels booking                                   |
| `*`       | Not Found   |                   | Public | Not found page                                  |

## Other Components

- Navbar
- Footer
- Delete Function
- Loader

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.verify()

- Backlog Service
  - Concerts: filter, detail, create, edit, delete
  - Venues: filter, detail, create, edit, delete
  - Bookings: filter, detail, create, edit-cancel
  - Users: filter, detail, create, edit, delete
- External Packages
  - Cloudinary
  - Leaflet

## Context

- auth.context
- concertapi.context

## Links

### Collaborators

[Aybike Celebi Visser](www.github.com/AybikeCV)

### Project

[Repository Link Client](www.github.com/AybikeCV/ticketify-app-client)

[Repository Link Server](www.github.com/AybikeCV/ticketify-app-server)

[Deploy Link](www.ticketify-theta.vercel.app/)

### Trello

[Sketches and Wireframes](www.excalidraw.com/#json=6jnnPUwAxs38soKWjJ5r3,sooLTbnZDD_Sbg3eiASRLA)

### Slides

[Slides Link](https://docs.google.com/presentation/d/1JtMY8X4sbqucA7S-gOPvai35mNzwO3nfjHxWdwkOpAU/edit?slide=id.gc6f73a04f_0_0#slide=id.gc6f73a04f_0_0)
