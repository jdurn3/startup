import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import 'moment';
import './calendar.css';

export function Calendar() {
  useEffect(() => {
    const tripForm = document.getElementById('tripForm');

    const handleFormSubmit = async (event) => {
      event.preventDefault();
      const storedUser = localStorage.getItem('userName');
      const date = document.getElementById('date').value;
      const people = document.getElementById('people').value;
      const location = document.getElementById('location').value;
      const difficulty = document.getElementById('difficulty').value;

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
      
        const newEvent = {
          title: `User: ${storedUser}\nLocation: ${location}\nDifficulty: ${difficulty}\nPeople: ${people}`,
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

    if (tripForm) {
      tripForm.addEventListener('submit', handleFormSubmit);
    }

    return () => {
      if (tripForm) {
        tripForm.removeEventListener('submit', handleFormSubmit);
      }
    };
  }, []);

  const [events, setEvents] = React.useState([]);

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

        <section className="form-container">
          <h2>Submit a Trip!</h2>

          <form action="submit_trip.php" method="post" id="tripForm">
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
