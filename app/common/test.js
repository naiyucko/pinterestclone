var apiUrl = appUrl + '/api/:id/clicks';

document.querySelector('.btn-add').addEventListener('click', function () {

      ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
         ajaxFunctions.ajaxRequest('GET', apiUrl, updateClickCount);
      });

   }, false);