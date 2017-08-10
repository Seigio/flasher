var Pagination = (function($){
    var current_page, total_pages;

    var init = (function(){
        current_page = 1;
        total_pages = 0;
        $.subscribe('card-added', function(){
            total_pages++;
        });
    })();

    function update_page(){
        console.log(current_page + "    " + total_pages);
        $('#question_header').text(Deck.title(current_page - 1));
        $('#question').text(Deck.question(current_page - 1));
    }

    function go_to(page){
        if(page <= 0 || page > total_pages){
            return;
        } else {
            current_page = page;
            update_page();
        }
    }

    return {
        next: function(){
            return go_to(current_page + 1);
        },
        previous: function(){
            return go_to(current_page - 1);
        },
        go_to: go_to
    };
})(jQuery);