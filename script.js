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
    });
});
