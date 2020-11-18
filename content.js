// Functions
$jqueryScript = $(document.createElement('script')).attr('src', chrome.extension.getURL('jquery-3.5.1.min.js'));
$funcoesScript = $(document.createElement('script')).attr('src', chrome.extension.getURL('functions.js'));
$(document.body).prepend($jqueryScript);
$(document.body).prepend($funcoesScript);

// Facebook Setup
$fbDiv = $(document.createElement('div')).attr('id', 'fb-root');
$fbScript = $(document.createElement('script'))
  .attr('crossorigin', 'anonymous')
  .attr('src', 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v9.0&appId=440508052663260')
  .attr('nonce', 'amPl98kg');
$(document.body).prepend($fbDiv);
$(document.body).prepend($fbScript);

// Facebook Comments
$commentButton = $(document.createElement('button'))
  .attr('class', "gnc-button-comment")
  .attr('onClick', 'loadComments()')
  .text("Comments");

var parent_links = $("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']");
for (i = 0; i < parent_links.length; i++) {
  let uniqueIdentifier = $(parent_links[i]).attr("jsdata");
  $(parent_links[i]).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));
}

// Mutation Observer
var observer = new MutationObserver(function(mutations){
  mutations.forEach(function(mutation){
    console.log(mutation);
    $article = ($(mutation.addedNodes[0]).find("article[class*='MQsxIb xTewfe R7GTQ keNKEd j7vNaf Cc0Z5d EjqUne']"));
    let uniqueIdentifier = $($article).attr("jsdata");
    $($article).parent().append($commentButton.clone().attr("data-unique", uniqueIdentifier));
  });
});

observer.observe(document.getElementsByTagName("body")[0], { childList: true, subtree: true });

/*// Button
$commentImage = $(document.createElement('button'))
  .attr('class', "gnc-image-comment")
  .text("Image");

var child_links = $("menu");
for (i = 0; i < child_links.length; i++) {
  $(child_links[i]).prepend($commentImage.clone());
}*/