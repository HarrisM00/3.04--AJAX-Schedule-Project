$(document).ready(function () {
    $('#submitDay').on('click', function () {
        let dayInput = $('#dayInput').val().toUpperCase();

        // Validate day input
        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(dayInput)) {
            alert('Please enter a valid day (A-G).');
            return;
        }

        $('#scheduleList').empty(); // Clear previous schedule

        // Fetch schedule data
        $.ajax({
            url: 'https://api.npoint.io/1ffad91cf0ac80379f0c',
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                // Filter classes for the selected day
                let classesForDay = data.schedule.filter(item => item.days.includes(dayInput));

                // Shuffle classes to ensure different selections
                classesForDay.sort(() => Math.random() - 0.5);

                // Initialize selected classes and ensure lunch is included
                let selectedClasses = [];
                let lunchClass = classesForDay.find(item => item.class === "Lunch");

                // Add classes until we have 4, ensuring lunch is included
                for (let item of classesForDay) {
                    if (selectedClasses.length < 4 && item.class !== "Lunch") {
                        selectedClasses.push(item);
                    }
                }

                // Include lunch
                if (lunchClass) {
                    selectedClasses.push(lunchClass);
                }

                // Randomly shuffle the selected classes to mix lunch in
                selectedClasses.sort(() => Math.random() - 0.5);

                // Ensure we always have 5 entries
                while (selectedClasses.length < 5) {
                    selectedClasses.push({ class: "", teacher: "", room: "" }); // Add empty class objects
                }

                // Display selected classes
                selectedClasses.forEach((item, index) => {
                    $('#scheduleList').append(`
                        <tr>
                            <td>${index + 1}</td>
                            <td>${item.class || "Senior Leave"}</td>
                            <td>${item.teacher || "N/A"}</td>
                            <td>${item.room || "N/A"}</td>
                        </tr>
                    `);
                });
            },
            error: function () {
                alert('Failed to load schedule. Please try again later.');
            }
        });
    });
});
