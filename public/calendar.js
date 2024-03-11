const storedUser = localStorage.getItem('user');

function initializeCalendar() {
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
}

function submitTrip() {
    const date = $('#date').val();
    const people = $('#people').val();
    const location = $('#location').val();
    const difficulty = $('#difficulty').val();

    $.ajax({
        url: '/api/submit-trip',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            date: date,
            people: people,
            location: location,
            difficulty: difficulty
        }),
        success: function (response) {
            console.log('Trip submitted successfully');

            const event = {
                title: `User: ${storedUser}\nLocation: ${location}\nDifficulty: ${difficulty}\nPeople: ${people}`,
                start: date,
                end: date,
                allDay: true,
                backgroundColor: '#D2B48C',
            };
            $('#calendar').fullCalendar('renderEvent', event, true);
        },
        error: function (error) {
            console.error('Error submitting trip:', error);
        }
    });
}

$(document).ready(function () {
    initializeCalendar();

    $('#submitBtn').click(function () {
        submitTrip();
    });
});