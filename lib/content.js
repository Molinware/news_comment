// Functions
$jqueryScript = $(document.createElement('script')).attr('src', chrome.extension.getURL('lib/jquery-3.5.1.min.js'));
$(document.body).prepend($jqueryScript);
$funcoesScript = $(document.createElement('script')).attr('src', chrome.extension.getURL('lib/functions.js'));
$(document.body).append($funcoesScript);

// Facebook Setup
$fbDiv = $(document.createElement('div')).attr('id', 'fb-root');
$fbScript = $(document.createElement('script'))
  .attr('crossorigin', 'anonymous')
  .attr('src', 'https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v9.0&appId=440508052663260')
  .attr('nonce', 'amPl98kg');
$(document.body).prepend($fbDiv);
$(document.body).prepend($fbScript);