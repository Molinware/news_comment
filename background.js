var onHeadersReceivedCspPass = function(details) {
  for (var i = 0; i < details.responseHeaders.length; i++) {
    if (details.responseHeaders[i].name.toLowerCase() === 'content-security-policy') {
      var headerValueString = details.responseHeaders[i].value;
      details.responseHeaders[i].value = headerValueString.replace(";",' https://connect.facebook.net ;');
      console.log(details.responseHeaders[i].value);
    }
  }

  return {
    responseHeaders: details.responseHeaders
  };
}

var initalizeCspPass = function(){
  var onHeaderFilter = { urls: ['https://news.google.com/*'], types: ['main_frame', 'sub_frame'] };
  chrome.webRequest.onHeadersReceived.addListener(
    onHeadersReceivedCspPass, onHeaderFilter, ['blocking', 'responseHeaders']
  );
}

// Call init
initalizeCspPass();