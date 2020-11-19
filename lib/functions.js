function loadFacebookWidget(){
    // Clicked Button
    let $button = $(window.event.target)

    // Get article identifier
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

function GNCInjectButtons(){
    // Wait Jquery to Load
    if (!window.jQuery){
        setTimeout(GNCInjectButtons, 1000);
        return;
    }

    try{
        // Create Default Comment Button
        var $commentButton = $(document.createElement('button'))
            .attr('class', "gnc-button-comment")
            .text("Carregar Comentários");
        
        // Add Comment Button to all parent articles
        // Child articles are discarded
        var parent_links = $("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']");
        for (i = 0; i < parent_links.length; i++) {
            // Set article identifier
            let uniqueIdentifier = $(parent_links[i]).attr("jsdata");

            // Add Cloned Button
            let $cloned = $(parent_links[i]).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));
            $cloned[0].addEventListener("click", loadFacebookWidget);
        }

        /*// Button (As Icon for child articles)
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

    // Observe for more articles loaded (Then Add Comment Button to all parent articles )
    var GNCObserver = new MutationObserver(function(mutations){
        mutations.forEach(function(mutation){
            try{
                // Check if an article was added
                $article = ($(mutation.addedNodes[0]).find("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']"));
                if (!$article){
                    return;
                }
                
                // Set article identifier
                let uniqueIdentifier = $($article).attr("jsdata");

                // Add Cloned Button
                let $clonedaa = $($article).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));

                // Check because sometimes gives 'undefined' (I don't know why yet)
                if ($clonedaa[0]){
                    $clonedaa[0].addEventListener("click", loadFacebookWidget);
                }
            }
            catch(e){
                console.log("GNC Observing - Adding Buttons", e);
            }
        });
    });

    // Begin to observe
    GNCObserver.observe(document.getElementsByTagName("body")[0], { childList: true, subtree: true });
}

// Call Init
GNCInjectButtons();