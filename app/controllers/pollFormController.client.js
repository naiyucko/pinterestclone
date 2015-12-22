'use strict';

(function () {
   var chartarea = document.querySelector('.charting');
   var apiUrlPolls = 'https://votingapp-naiyucko.c9users.io/api/polls';
   
   function ready (fn) {
      if (typeof fn !== 'function') {
         return;
      }

      if (document.readyState === 'complete') {
         return fn();
      }

      document.addEventListener('DOMContentLoaded', fn, false);
   }
   
   function ajaxRequest (method, url, callback) {
      var xmlhttp = new XMLHttpRequest();

      xmlhttp.onreadystatechange = function () {
         if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            callback(xmlhttp.response);
         }
      };

      xmlhttp.open(method, url, true);
      xmlhttp.send();
   }
   
    function updateClickCount (data) {
        var goddamn = JSON.parse(data);
        var keystuff = Object.keys(goddamn);
        var html = "<h1>" + goddamn.title + "</h1>";
        if (window.location.href.endsWith('/'))
        {
           html += '<form method="post" action="postpoll">';
        }
        else
        {
           html += '<form method="post" action="' + window.location.href + '/postpoll">';
        }
        for (var v = 2; v < keystuff.length; v++)
        {
            html += '<input type="radio" name="poll"' + '" value="' + keystuff[v] + '">' + keystuff[v] + '<br /><br />';
        }
        html += '<input type="submit" name="commit" value="Vote"></form>';
      chartarea.innerHTML = html;
   }
   
   ready(ajaxRequest('POST', window.location.href, updateClickCount));
})();