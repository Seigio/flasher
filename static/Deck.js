//Each deck is made of multiple flashcards, which contain a title, a question, and an answer
var Deck = (function($){
    //array of flashcard objects
    var flashcards = [];

    /*
        Creates a flashcard module accessible only from within the Deck module
        Flashcard properties can only be instantiated from the init_from_json function
        Properties:
            public:
                string: get_title(), get_question(), get_answer();
                void:   init_from_json();
            private:
                string: title, question, answer;
                
    */
    var Flashcard = function(){
        var title, question, answer;

        function init_from_json( q ){
            answer = q.answer;
            question = q.question;
            title = q.title;
        }

        function get_title(){
            return title;
        }

        function get_question(){
            return question;
        }

        function get_answer(){
            return answer;
        }

        return{
            init: init_from_json,
            title: get_title,
            question: get_question,
            answer: get_answer
        };
    };

    function get_flashcard(index){
        if (index >= flashcards.length || index < 0){
            return;
        } else {
            return flashcards[index];
        }
    }

    /*
        Checks an input answer against the correct answer
        Paramaters:       int: index        u_answer (user answer): string
        Returns:          boolean: true if answer matches, false otherwise
    */          
    function check_answer(index, u_answer){
        var answer = get_flashcard(index).get_answer();
        
        return (answer.toLowerCase() === u_answer.toLowerCase());
    }

    //The publish functionality was to see if I could
    //to-do, refactor this to works better with selecting a deck
    function add_flashcard(flashcard){
        flashcards.push(flashcard);
        $.publish('card-added');
    }

    function remove_flashcard(index){
        flashcards.splice(index, 1);
    }

    function get_title(index){
        return get_flashcard(index).title();
    }

    function get_question(index){
        return get_flashcard(index).question();
    }

    function get_answer(index){
        return get_flashcard(index).answer();
    }

    function init_from_json(json){
        var i = 0;
        var n_flashcard;
        for(var q in json){
            //not sure if this will work, initializes a new flashcard (n_flashcard) from a json object
            n_flashcard = Flashcard();
            n_flashcard.init(json[q]);
            add_flashcard(n_flashcard);
        }
    }

    function get_length(){
        return flashcards.length;
    }

    return{
        add: add_flashcard,
        remove: remove_flashcard,
        get: get_flashcard,
        title: get_title,
        question: get_question,
        init: init_from_json,
        length: get_length
    };
    
})(jQuery);