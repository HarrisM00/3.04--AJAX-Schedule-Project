$(document).ready(function () {
    $('#submitDay').on('click', function () {
        let dayInput = $('#dayInput').val().toUpperCase();

        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(dayInput)) {
            alert('Please enter a valid day (A-G).');
            return;
        }

        $('#scheduleList').empty(); 

        $.getJSON('schedule.json', function (data) {
            // Find classes for the  day
            let classesForDay = data.schedule.filter(item => item.days.includes(dayInput));

            // No more than 5 classes
            let selectedClasses = [];
            for (let i = 0; i < classesForDay.length; i++) {
                if (selectedClasses.length < 4 && classesForDay[i].class !== "Lunch") {
                    selectedClasses.push(classesForDay[i]);
                }
            }

            // Add lunch 
            let lunchClass = classesForDay.find(item => item.class === "Lunch");
            if (lunchClass && selectedClasses.length < 5) {
                selectedClasses.push(lunchClass);
            }

            // Five entries 
            while (selectedClasses.length < 5) {
                selectedClasses.push({ class: "Senior Leave", teacher: "", room: "" });
            }

            // Display the schedule
            for (let i = 0; i < selectedClasses.length; i++) {
                $('#scheduleList').append(`
                    <tr>
                        <td>${i + 1}</td>
                        <td>${selectedClasses[i].class}</td>
                        <td>${selectedClasses[i].teacher || "N/A"}</td>
                        <td>${selectedClasses[i].room || "N/A"}</td>
                    </tr>
                `);
            }
        }).fail(function () {
            alert('Failed to load schedule. Please try again later.');
        });
    });
});
