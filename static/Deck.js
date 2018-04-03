/*
    Deck is a Module used to hold and access Flashcard objects.  Each Flashcard contains three* properties
    (title, answer, and question) instantiated from a json object.  The json file is a representation of 
    a Deck Module, containing json objects representing each individual Flashcard.  Deck, and its
    children Flashcards, are all instantiated from a single json file.

    Flashcards are stored in the flashcards[] array.  To access a Flashcard property, the Flashcard is 
    retrieved from the array by index, and the get function for the required property is called on the
    retrieved Flashcard.

    Deck is a Module with the following functions and variables:
        private:
            flashcards[]: array - Holds all the Flashcard objects in the Deck
        
        public:
            init_from_json():   void - Intializes the Deck Module from a json file
            add_flashcard():    void - Pushes a Flashcard to the flashcards[] array
            remove_flashcard(): void - Removes a Flashcard from the flashcards[] array
            get_length():       void - Gets the length of the flashcards[] array
            get_flashcard():    void - Gets a Flashcard from the flashcards[] array
            get_title():        void - Gets the title of a Flashcard
            get_question():     void - Gets the question text of a Flashcard
*/
var Deck = (function($){
    var flashcards = [];

    /*
        Creates a Flashcard module accessible only from within the Deck module
        Flashcard properties can only be instantiated from the init_from_json function
        Properties:
            private:
                string: title, question, answer;
            public:
                string: get_title(), get_question(), get_answer();
                void:   init_from_json();
                
    */
    var Flashcard = function(){
        var title, url;

        function init_from_json( q ){
            title = q.title;
            url = q.url;
        }

        function get_title(){
            return title;
        }

        function get_url(){
            return url;
        }

        return{
            init: init_from_json,
            title: get_title,
            url: get_url
        };
    };


    /*------------------------------------------------------------------------------------------------
       Functions for manipulating the flashcards[] array
    ------------------------------------------------------------------------------------------------*/
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
    //The publish functionality was to see if I could
    //to-do, refactor this to works better with selecting a deck
    function add_flashcard(flashcard){
        flashcards.push(flashcard);
        $.publish('card-added');
    }

    function remove_flashcard(index){
        flashcards.splice(index, 1);
    }
    
    function get_length(){
        return flashcards.length;
    }
    

    /*------------------------------------------------------------------------------------------------
       Functions for accessing Flashcards and Flashcard properties from the flashcards[] array
    ------------------------------------------------------------------------------------------------*/
    function get_flashcard(index){
        if (index >= flashcards.length || index < 0){
            return;
        } else {
            return flashcards[index];
        }
    }

    function get_title(index){
        return get_flashcard(index).title();
    }

    function get_url(index){
        return get_flashcard(index).url();
    }


    return {
        add: add_flashcard,
        remove: remove_flashcard,
        get: get_flashcard,
        title: get_title,
        url: get_url,
        init: init_from_json,
        length: get_length,
    };
    
})(jQuery);