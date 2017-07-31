function get_index(){
    var text = $('#question_header').text();
    var index = text[text.length - 1];

    return index;
}

function get_direction(thisObj) {
    var direction = $(thisObj).attr('name');

    //we need to return a direction to increment the question index
    //example: if 'next' is pressed, the question index increases by 1, inverse for 'previous'
    //returns 0 if direction couldn't be determined, keeping the question the same
    if (direction){
        if(direction === 'next'){
            return 1;
        } else {
            return -1;
        }
    } else {
        return 0;
    }
}

$('.change').click(function(){
    //int, either -1 or 1 if there was an error, defining the direction to move along the index
    var new_index = 'q' + (get_index() + get_direction(this));

    $('#question_header').text(json_data[new_index].title);
    $('#question').text(json_data[new_index].question);
 });