# ClimbCoord

## Elevator Pitch

Have dozens of climbing trips that have never made it out of the group chat? ClimbCoord is your new ultimate companion for seamless climbing adventures! ClimbCoord is a group calendering platform designed for passionate climbers to effortlessly plan their next ascent and join other's trips. Connect with fellow climbers, coordinate gear, and assess skill levels with ease. Whether you're a novice or a seasoned pro, our platform empowers you to meet new climbers and make your climbing goals a reality! Elevate your climbing experience with ClimbCoord – Where planning meets precision, and summits become memories!

## Design 
![Main Calendar Page](~/Downloads/page_design.jpg)
![A diagram demonstrating how the server and beckend would interact.](~/Downolads/server_design.jpg)

## Key Features
- Secure login over HTTPS
- Group Calender listing trips of connected friends. 
- A place to sign up for other's trips. 
- A general itinerary/description of each trip. 
- Listed details such as skill level, gear needed, and climb difficulty. 
- Ability to chat with climbing partners. 

## Technologies
I am going to use the required technologies in the following ways.

**HTML** - Implements proper HTML structure for the application with two distinct pages – one dedicated to login and the other for submitting and viewing climbing trips. Includes hyperlinks for navigating between selected artifacts. Would display a calender view to make it easy for users to view. 
**CSS** - Employed to create a visually appealing and responsive interface, ensuring an immersive and user-friendly experience for climbers. 
**JavaScript** - Provides login, retirives details of trips, submits the trips, displays other scheduled trips, backend endpoint calls.
**Service** - Backend service with endpoints for:
login
retrieving location, dates, number of people, difficulty, amd needed gear
submitting trips
retrieving trips 
**DB/Login** - Store users and trip data in database. Register and login users by storing credentials securely in database. Can't plan a trip unless authenticated.
**WebSocket** - When a trip is submitted, it is visible to other users.
**React** - The application has been adapted to utilize the React web framework.