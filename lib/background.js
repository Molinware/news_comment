function initalizeContentSecurityPolicyPass(){
  // Add Event Listener on Google news Page
  var onHeaderFilter = { urls: ['https://news.google.com/*'], types: ['main_frame', 'sub_frame'] };
  chrome.webRequest.onHeadersReceived.addListener(
    function(details){
      // Intercept content-security-policy header and add https://connect.facebook.net
      // This is to allow inject the facebook sdk on the google news page
      for (var i = 0; i < details.responseHeaders.length; i++) {
        if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
          var headerValueString = details.responseHeaders[i].value;
          details.responseHeaders[i].value = headerValueString.replace(";",' https://connect.facebook.net ;');
          console.log(details.responseHeaders[i].value);
        }
      }

      return { responseHeaders: details.responseHeaders };
    }, onHeaderFilter, ['blocking', 'responseHeaders']
  );
}

// Call the function
initalizeContentSecurityPolicyPass();