import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'moment';
import './calendar.css';

export function Calendar() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchTrips() {
      try {
        const response = await fetch('/api/trips'); // Adjust the endpoint URL as per your API
        console.log("wahoo")
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const trips = await response.json();

        // Format the retrieved trips to match FullCalendar event format
        const formattedEvents = trips.map(trip => ({
          title: `User: ${trip.userName}\nLocation: ${trip.location}\nDifficulty: ${trip.difficulty}\nPeople: ${trip.people}`,
          start: trip.date,
          end: trip.date,
          allDay: true,
          backgroundColor: '#D2B48C',
        }));

        setEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    }

    fetchTrips();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const tripForm = event.target;
    const date = tripForm.date.value;
    const people = tripForm.people.value;
    const location = tripForm.location.value;
    const difficulty = tripForm.difficulty.value;

    try {
      const response = await fetch('/api/submit-trip', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          date: date,
          people: people,
          location: location,
          difficulty: difficulty
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Trip submitted successfully');

      // Add the newly submitted trip to the calendar
      const newEvent = {
        title: `User: ${localStorage.getItem('userName')}\nLocation: ${location}\nDifficulty: ${difficulty}\nPeople: ${people}`,
        start: date,
        end: date,
        allDay: true,
        backgroundColor: '#D2B48C',
      };

      // Update events state with new event
      setEvents(prevEvents => [...prevEvents, newEvent]);

      tripForm.reset();
    } catch (error) {
      console.error('Error submitting trip:', error);
    }
  };

  return (
    <div>
      <main className="main">
        <h1> Upcoming Trips</h1>
        <div>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            eventContent={renderEventContent}
            events={events} // Pass events array to FullCalendar component
          />
        </div>

        {/* Submission form */}
        <section className="form-container">
          <h2>Submit a Trip!</h2>
          <form onSubmit={handleSubmit} id="tripForm">
            <label htmlFor="date">Date:</label>
            <input type="date" id="date" name="date" required /><br />

            <label htmlFor="people">Number of People:</label>
            <input type="number" id="people" name="people" min="1" required /><br />

            <label htmlFor="location">Location:</label>
            <input type="text" id="location" name="location" required /><br />

            <label htmlFor="difficulty">Difficulty:</label>
            <select id="difficulty" name="difficulty" required>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select><br />

            <button type="submit">Submit</button>
          </form>
        </section>
      </main>
    </div>
  );
}

// Custom render function
function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
