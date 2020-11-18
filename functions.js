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