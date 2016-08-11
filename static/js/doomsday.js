$(document).ready(function() {
    DAYS_OF_THE_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 
                        'Friday', 'Saturday'];
    /** The date currently being displayed to the user */
    var current_date;

    function generate_random_date() {
	/** Generates a random date between January 1st 1800 and December 31st
	 *  2199. Returns the date as a string of the form "dd/mm/yyyy"
	 */
	var rand_year = 2015;
	//var rand_year = Math.floor(Math.random() * (2199 - 1800)) + 1800;
	var rand_month = Math.floor(Math.random() * 12) + 1;
	var day_scale;
	if(rand_month === 2) {
	    // ignore leap years for now
	    day_scale = 28;
	} else if(rand_month === 4 || rand_month === 6 || rand_month === 9 || rand_month === 11) {
	    day_scale = 30;
	} else {
	    day_scale = 31;
	}
	var rand_day = Math.floor(Math.random() * day_scale) + 1;

	var date_string = "" + rand_month + "/" + rand_day + "/" + rand_year;
	return date_string;
    }

    $('#guess').keydown(function(event) {
	console.log(event.keyCode);
        if (event.keyCode != 13) return true;
	// check the user's guess
	var user_input = $('#guess').val();
	user_input = user_input.toLowerCase();
	console.log(current_date);
	var day_of_week = current_date.getDayName();
	day_of_week = day_of_week.toLowerCase();
	var correct = (user_input === day_of_week);

	// update the answer div accordingly
	if(correct) {
	    $('#answer').text("Correct!");
	    $('#answer').css('text-color', '#0000ff');
	} else {
	    var correct_answer = current_date.toString("MMMM d yyyy");
	    correct_answer += " was a " + current_date.getDayName();
	    $('#answer').text(correct_answer);
	    $('#answer').css('text-color', '#ff0000');
	}

	// generate a new query and update the query div
	current_date = Date.parse(generate_random_date());
	$("#query").text(current_date.toString("MMMM d yyyy"));

	// clear the input field
	$('#guess').val('');
	
	return false;
    });

    // initialize the first query on page load
    current_date = Date.parse(generate_random_date());
    $("#query").text(current_date.toString("MMMM d yyyy"));
});
