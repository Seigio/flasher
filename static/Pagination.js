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
    var current_page, total_pages, display_card;


    var init = function(){
        current_page = 1;
        total_pages = 0;
        display_card=true;
        //Updates total_pages whenever a new card is added to the current deck
        $.subscribe('card-added', function(){
            total_pages++;
        });
    };

    function update_page(){
        $('#card-text').text(Deck.title(current_page - 1));
        $('#video').attr('src', `https://www.youtube.com/embed/${Deck.url(current_page - 1)}?rel=0&amp&autoplay=1`);
        $('#video').css('display', 'none');
        $('#card-text-wrapper').show();
    }

    function change_view(){
        if(display_card){
            $('#card-text-wrapper').hide();
            $('#video').css('display', 'block');
            display_card=false;
        } else {
            $('#video').css('display', 'none');
            $('#card-text-wrapper').show();
            display_card=true;
        }
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
        //next and previous are implementations of go_to    
        next: function(){
            return go_to(current_page + 1);
        },
        previous: function(){
            return go_to(current_page - 1);
        },
        go_to: go_to,
        init: init,
        current_page: get_current_page,
        cycle: change_view,
        update_page: update_page
    };
})(jQuery);