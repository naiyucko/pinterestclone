'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var namesection = document.querySelector('#display-name');
   var pollsection = document.querySelector('#newpoll');
   var apiUrl = 'https://pinterest-naiyucko.c9users.io/api/clicks';
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
      var clicksObject = JSON.parse(data);
      namesection.innerHTML = clicksObject.username;
      clickNbr.innerHTML = 'https://pinterest-naiyucko.c9users.io/view/' + clicksObject.username;
   }
   
   function updateNewPoll () {
      pollsection.innerHTML = '<form id="myForm" method="post" action="newpoll"><p>Image Link: <input type="text" name="title" id="title" onkeyup=topLel(this.value) /></p><br /><div></div><p class="submit"><input type="submit" name="commit" value="Save" id="savebtn"></p></form>';
      
   }
   
   addButton.addEventListener('click', function () {
      updateNewPoll();
   }, false);
   
   deleteButton.addEventListener('click', function () {
      ajaxRequest('GET', apiUrlPolls, function (data) {
         var html = "";
         var jdata = JSON.parse(data);
         if (jdata.length === 0)
         {
            html += "You haven't added any images yet!";
         }
         for (var v = 0; v < jdata.length; v++)
         {
            html += '<div class="masonryImage"><img onError="this.onerror=null;this.src=\'http://www.positive-magazine.com/edge/wp-content/themes/15zine/library/images/placeholders/placeholder-360x240.png\';" class="masonryImg" src="' + jdata[v].title + '" />' + '<form action="/delete" method="post"><button class="btn btn-remove" name="foo" value="' + jdata[v].title + '">Delete</button></form>' + '</div>';
         }
         pollsection.innerHTML = html;
         var ayylmao = $('#newpoll').masonry({
           itemSelector: '.masonryImage',
           gutter: 1,
           columnWidth: 20
         });
         ayylmao.imagesLoaded().progress( function() {
           ayylmao.masonry('layout');
         });
         $('.btn-delete').hide();
      });

   }, false);
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
   
   
   
})();

function topLel(textf) {
   console.log(textf);
   if (textf.indexOf("'") !== -1) {
      $('#savebtn').attr('disabled','disabled');
      $('#wowthere').html("No special characters allowed");
   }
   else {
      $('#savebtn').attr('disabled',false);
      $('#wowthere').html("");
   }
}