'use strict';

(function () {
   var chartarea = document.querySelector('.charting');
   var apiUrlPolls = 'https://pinterest-naiyucko.c9users.io/api/polls';
   
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
        var jdata = JSON.parse(data);
        var html = '';
        if (jdata.length === 0)
         {
            html += "This user hasn't added any images yet!";
         }
         for (var v = 0; v < jdata.length; v++)
         {
            html += '<div class="masonryImage"><img onError="this.onerror=null;this.src=\'http://www.positive-magazine.com/edge/wp-content/themes/15zine/library/images/placeholders/placeholder-360x240.png\';" class="masonryImg" src="' + jdata[v].title + '" />' + '</div>';
         }
         chartarea.innerHTML = html;
         var ayylmao = $('.charting').masonry({
           itemSelector: '.masonryImage',
           gutter: 1,
           columnWidth: 20
         });
         ayylmao.imagesLoaded().progress( function() {
           ayylmao.masonry('layout');
         });
   }
   
   ready(ajaxRequest('POST', window.location.href, updateClickCount));
})();