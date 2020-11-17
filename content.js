$fbDiv = $(document.createElement('div')).attr('id', 'fb-root');
$fbScript = $(document.createElement('script'))
  .attr('crossorigin', 'anonymous')
  .attr('src', 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v9.0&appId=440508052663260')
  .attr('nonce', 'amPl98kg');
$fbCommentsDiv = 
  $(document.createElement('div'))
  .attr('class', 'fb-comments')
  .attr('style', 'grid-column-start: span 12')
  .attr('data-href', 'https://news.google.com/')
  .attr('data-numposts', '1')
  .attr('data-width', '100%')
  .attr('data-order-by', 'social')
  .attr('data-lazy', true);

$(document.body).prepend($fbDiv);
$(document.body).prepend($fbScript);



var divs = $('div[class="DBQmFf NclIid BL5WZb Oc0wGc xP6mwf j7vNaf"]');
for (i = 0; i < divs.length; i++) {
  $(divs[i]).append($fbCommentsDiv.clone());
}