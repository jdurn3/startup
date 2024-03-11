const express = require('express');
const app = express();

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 3000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);


// SubmitTrip
app.post('/api/submit-trip', (req, res) => {
  const tripData = req.body;
  console.log('Received trip data:', tripData);
  res.json({ message: 'Trip submitted successfully' });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function updateTrip(response) {
  console.log('Trip submitted successfully');

  const event = {
      title: `User: ${storedUser}\nLocation: ${location}\nDifficulty: ${difficulty}\nPeople: ${people}`,
      start: date,
      end: date,
      allDay: true,
      backgroundColor: '#D2B48C',
  };
  $('#calendar').fullCalendar('renderEvent', event, true);
};

