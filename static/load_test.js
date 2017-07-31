function get_index(){
    var text = $('#question_header').text();
    var index = text[text.length - 1];

    return index;
}

function get_direction(test) {
    var direction = $(test).attr('name');

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
    /*
        Json file formatting:
            q(int) { title, question, answer}  --the int serves as an index of the question number
        new_index generates a string featuring a new index based on which button was pressed (get_direction(this))

        This index is used to update the flashcard view
    */
    var new_index = 'q' + (parseInt(get_index()) + get_direction(this));

    $('#question_header').text(json_data[new_index].title);
    $('#question').text(json_data[new_index].question);
 });