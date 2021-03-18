# pupdate

View pupdate [here](https://pupdate-app.vercel.app/).

View the server repo [here](https://github.com/sallygaller/pupdate-api).

pupdate is an app designed for dog owners to schedule playdates for their pups. pupdate users can quickly see and RSVP to pupdates happening in their area, and see profiles of the pups attending. Pup profiles contain pertinent information including breed, age, size, and playstyle to ensure a happy playdate. 

## How to Use
### Logging In
Users may login with a demo account (using the credentials provided on the Login page), register for their own account, or login with an existing account. 

<img src="src/Utils/images/1-LoginPage.png" alt="Login Page" width="500">

### Pupdates
The Pupdates page is the central hub of the application. This is where users can see pupdates they're attending, pupdates that are happening in their area, and pupdates they've organized. Users can see which pup is "organizing" each pupdate, and click to view more details and RSVP. 

<img src="src/Utils/images/2-Pupdates.PNG" alt="Pupdates Page" width="500">

### Pupdate
The Pupdate page shows more information about each pupdate, including an attendee list. This is where users can RSVP to pupdates, and where organizers can edit or delete their pupdates. 

<img src="src/Utils/images/3-Pupdate.PNG" alt="Pupdate Profile Page" width="500">

### New Pupdate
The New Pupdate form allows the user to create a pupdate for other users to RSVP to:
- Location
- Date
- Start time 
- End time
- Description

<img src="src/Utils/images/4-New-Pupdate.PNG" alt="New Pupdate Page" width="500">

### New Pup
The New Pup form allows the user to log pertinent details about their pup. Other pupdate users can see this profile when scheduling pupdates:
- Name
- Breed
- Age
- Size
- Playstyle
- Description
- Photo

<img src="src/Utils/images/5-New-Pup.PNG" alt="New Pup Page" width="500">

### My Pups
The My Pups page allows users to view, edit, and delete their pup profiles. 

<img src="src/Utils/images/6-MyPups.PNG" alt="My Pups Page" width="500">

## Technology Used
- HTML
- CSS
- JavaScript
- React
- Jest
- Enzyme
- Amazon S3
- [Google Places API](https://developers.google.com/maps/documentation/places/web-service/overview)