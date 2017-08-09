var json_promise = $.getJSON($SCRIPT_ROOT + '/get_json/testq_1.json');
                
json_promise.done(function(json) {
    json_data = json;
    console.log(json_data);

    var i = 0;
    for(var q in json_data){
        questions[i] = json_data[q];
        i++;
    }
    console.log(questions[0]);
    $('#question_header').text(questions[0].title);
    $('#question').text(questions[0].question);

});

json_promise.fail(function(){
    alert('failed to load flashcard');
});