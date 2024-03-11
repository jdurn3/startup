// calendar.js

document.addEventListener('DOMContentLoaded', function () {
    const storedUser = localStorage.getItem('user');

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
                const response = await fetch('https://your-domain.com/api/submit-trip', {
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
});
