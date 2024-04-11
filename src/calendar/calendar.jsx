import React, { useEffect } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
import $ from 'jquery';
import FullCalendar from '@fullcalendar/react'
import 'moment';
import './calendar.css';

export function Calendar() {
  useEffect(() => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('userName') !== null;

    // Toggle visibility of the submit trip section based on if they're logged in
    const submitTripSection = document.querySelector('.form-container');
    if (submitTripSection) {
      submitTripSection.style.display = isLoggedIn ? 'block' : 'none';
    }

    // Display the user's name
    const storedUser = localStorage.getItem('userName');
    if (storedUser) {
      document.getElementById('displayedUser').innerText = storedUser;
    }

    // Initialize the calendar
    $('#calendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      },
      defaultView: 'month',
      eventLimit: true,
      events: []
    });

    // Event handler for form submission
    const tripForm = document.getElementById('tripForm');

    if (tripForm) {
      tripForm.addEventListener('submit', async function (event) {
        event.preventDefault();

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

          const eventObject = {
            title: `User: ${storedUser}\nLocation: ${location}\nDifficulty: ${difficulty}\nPeople: ${people}`,
            start: date,
            end: date,
            allDay: true,
            backgroundColor: '#D2B48C',
          };

          $('#calendar').fullCalendar('renderEvent', eventObject, true);

          tripForm.reset();
        } catch (error) {
          // Handle error
          console.error('Error submitting trip:', error);
        }
      });
    }
  }, []);

  return (
    <div>
      <main className="main">
        <h1> Upcoming Trips</h1>
        <div id="calendar"></div>

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

