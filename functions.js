function loadComments(){
    // Button
    let $button = $(window.event.target)
    let dataInfo = $button.attr("data-unique").split(';');

    // Facebook Comments
    let $fbCommentsDiv = 
        $(document.createElement('div'))
        .attr('class', 'fb-comments')
        .attr('style', 'grid-column-start: span 12')
        .attr('data-href', 'https://news.google.com/articles/'+dataInfo[1])
        .attr('data-numposts', '1')
        .attr('data-width', '100%')
        .attr('data-order-by', 'social')
        .attr('data-lazy', true);
    $fbCommentLoader = $(document.createElement('div')).attr('class', 'gnc-loader')

    // Add Loader
    $button.before($fbCommentLoader);

    // Add Comments
    $button.before($fbCommentsDiv);
    setTimeout(function(){ $fbCommentLoader.remove() }, 3000)
    $button.hide();
    FB.XFBML.parse();
}

function GNCInit(){
    // Facebook Comments
    try{
        var $commentButton = $(document.createElement('button'))
            .attr('class', "gnc-button-comment")
            .text("Carregar Comentários");

        var parent_links = $("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']");
        for (i = 0; i < parent_links.length; i++) {
            let uniqueIdentifier = $(parent_links[i]).attr("jsdata");
            let $cloned = $(parent_links[i]).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));
            $cloned[0].addEventListener("click", loadComments);
        }

        /*// Button (As Icon for sub-articles)
        $commentImage = $(document.createElement('button'))
        .attr('class', "gnc-image-comment")
        .text("Image");

        var child_links = $("menu");
        for (i = 0; i < child_links.length; i++) {
            $(child_links[i]).prepend($commentImage.clone());
        }*/
    }
    catch(e){
        console.log("GNC Error - Adding Buttons", e);
    }

    // Mutation Observer
    var GNCObserver = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            try{
                $article = ($(mutation.addedNodes[0]).find("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']"));
                let uniqueIdentifier = $($article).attr("jsdata");
                $($article).parent().append($(document.createElement('hr')));
                let $clonedaa = $($article).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));
                if ($clonedaa[0]){
                    $clonedaa[0].addEventListener("click", loadComments);
                }
            }
            catch(e){
                console.log("GNC Observing - Adding Buttons", e);
            }
        });
    });
    GNCObserver.observe(document.getElementsByTagName("body")[0], { childList: true, subtree: true });
}

// Wait for JQuery to fully load
setTimeout(GNCInit, 2000);