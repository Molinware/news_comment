/*chrome.webRequest.onHeadersReceived.addListener(details => {
    let header = details.responseHeaders.find(e => e.name.toLowerCase() === 'content-security-policy') ;
    header.value = null;
    return {responseHeaders: details.responseHeaders};
  }, {urls: ['<all_urls>']}, ['blocking', 'responseHeaders']);*/