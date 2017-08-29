/*
    Pagination is tied to the current Deck.  It updates the DOM based on what page the user selects,
    pulling the required Flashcard from the Deck.  Whenever a Flashcard is added to the Deck, normally
    when the Deck is initialized, Pagination grows.

    Pagination is a Module with the following functions and variables:
        private:
            current_page: int  - Persistent index keeping track of the current page
            total_pages : int  - Persistent integer tracking the total number of Flashcards in the Deck
        
        public:
            next():       void - If the next page exists, increments the current page by 1 and updates the DOM
            previous():   void - If the previous page exists, decrements the current page by 1 and updates the DOM
            go_to(page):  void - Sets current_page to (page) and updates the DOM.  next() and previous() are 
                                 implementations of go_to()
            init:         void - Initializes the Module, reseting the current_page to 1, reseting the total_pages,
                                 and resubscribing to the new Deck

*/

var Pagination = (function($){ //function($) passes in the jQuery module to be used within the function
    var current_page, total_pages;


    var init = function(){
        current_page = 1;
        total_pages = 0;
        //Use the pubsub model for some reason, probably a better way but lazy
        $.subscribe('card-added', function(){
            total_pages++;
        });
    };

    function update_page(){
        $('#question_header').text(Deck.title(current_page - 1));
        $('#question').text(Deck.question(current_page - 1));

        var cleared_answer = document.getElementById('answer')
        cleared_answer.value = '';
    }

    function go_to(page){
        if(page <= 0 || page > total_pages){
            return;
        } else {
            current_page = page;
            update_page();
        }
    }

    function get_current_page(){
        return current_page;
    }

    return {
        next: function(){
            return go_to(current_page + 1);
        },
        previous: function(){
            return go_to(current_page - 1);
        },
        go_to: go_to,
        init: init,
        current_page: get_current_page
    };
})(jQuery);