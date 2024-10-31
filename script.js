$(document).ready(function () {
    // Event listener for the 'Show Schedule' button click
    $('#submitDay').on('click', function () {
        // Get the value entered in the day input, and convert it to uppercase for standardization
        let dayInput = $('#dayInput').val().toUpperCase();
        
        // Check if the input is a valid day (A-G); if not, alert the user and stop further execution
        if (!['A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(dayInput)) {
            alert('Please enter a valid day (A-G).');
            return;
        }

                // Clear any previous schedule from the table to avoid duplicate entries
                $('#scheduleList').empty();

                // AJAX call to fetch the schedule data from an external JSON file
                $.ajax({
                    // Replace 'your-npoint-url' with your actual JSON file URL hosted on npoint.io
                    url: 'https://api.npoint.io/1ffad91cf0ac80379f0c',
                    method: 'GET', // Type of request
                    dataType: 'json', // We expect JSON data in return
                    success: function (data) {
                        // Filter the classes to only show those scheduled for the selected day
                        let classes = data.schedule.filter(item => item.days.includes(dayInput));
        
                        // Check if any classes were found for the selected day
                        if (classes.length === 0) {
                            // If no classes, show a message in the table
                            $('#scheduleList').append('<tr><td colspan="4" class="text-center">No classes today</td></tr>');
                        } else {
                            // Loop through each class for the selected day
                            classes.forEach(item => {
                                // Append a row to the table with the class details
                                $('#scheduleList').append(`
                                    <tr>
                                        <td>${item.period}</td> <!-- Period number -->
                                        <td>${item.class}</td> <!-- Class name -->
                                        <td>${item.teacher}</td> <!-- Teacher's name -->
                                        <td>${item.room}</td> <!-- Room number -->
                                    </tr>
                                `);
                            });
                        }
                    },
                    // If there’s an error in loading data, show an alert
                    error: function () {
                        alert('Failed to load schedule. Please try again later.');
                    }
                });
        
    });
});
