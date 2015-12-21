'use strict';

(function () {
   var addButton = document.querySelector('.btn-add');
   var deleteButton = document.querySelector('.btn-delete');
   var clickNbr = document.querySelector('#click-nbr');
   var namesection = document.querySelector('#display-name');
   var pollsection = document.querySelector('#newpoll');
   var apiUrl = 'https://votingapp-naiyucko.c9users.io/api/clicks';
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
      var clicksObject = JSON.parse(data);
      namesection.innerHTML = clicksObject.username;
   }
   
   function updateNewPoll () {
      pollsection.innerHTML = '<form id="myForm" method="post" action="newpoll"><p>Poll Title: <input type="text" name="title" id="title" /></p><br /><div id="input1" style="margin-bottom:4px;" class="clonedInput">Option: <input type="text" name="name1" id="name1" /></div><div><input type="button" id="btnAdd" value="Add Another" /></div><p class="submit"><input type="submit" name="commit" value="Save"></p></form>';
      $('#btnAdd').click(function() {
          var num        = $('.clonedInput').length;    // how many "duplicatable" input fields we currently have
          var newNum    = new Number(num + 1);        // the numeric ID of the new input field being added
      
          // create the new element via clone(), and manipulate it's ID using newNum value
          var newElem = $('#input' + num).clone().attr('id', 'input' + newNum);
      
          // manipulate the name/id values of the input inside the new element
          newElem.children(':first').attr('id', 'name' + newNum).attr('name', 'name' + newNum);
      
          // insert the new element after the last "duplicatable" input field
          $('#input' + num).after(newElem);
      });
   }
   
   addButton.addEventListener('click', function () {
      updateNewPoll();

   }, false);
   
   deleteButton.addEventListener('click', function () {
      ajaxRequest('GET', apiUrlPolls, function (data) {
         var html = "";
         var jdata = JSON.parse(data);
         for (var v = 0; v < jdata.length; v++)
         {
            html += '<br /><br /><a class = "menu" href="/poll/' + jdata[v].user + '/' + jdata[v].title + '/view"><b>' + jdata[v].title + '</b></a>' + '<div class="remove-btn"><a href="/poll/' + jdata[v].user + '/' + jdata[v].title + '/delete"><button class="btn btn-remove">Delete</button></div>';
         }
         pollsection.innerHTML = html;
      });

   }, false);
   
   ready(ajaxRequest('GET', apiUrl, updateClickCount));
})();