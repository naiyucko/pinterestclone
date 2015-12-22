'use strict';

(function () {
   var chartarea = document.getElementById("myChart").getContext("2d");
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
        var currenthome = window.location.href.substring( 0, window.location.href.length - 4);
        document.querySelector('#ummm').innerHTML = "<h1>" + goddamn.title + "</h1>";
        document.querySelector('#wellthen').innerHTML = 'Share this voting Link: <input type="text" name="country" value="' + currenthome + '" readonly></input>';
        var keystuff = Object.keys(goddamn);
        var data3 = {};
        keystuff.splice(0, 2);
        data3.labels = keystuff;
        data3.datasets = [];
        var valuesofdata = [];
        for (var v = 0; v < keystuff.length; v++)
        {
            valuesofdata[v] = goddamn[keystuff[v]];
        }
        data3.datasets[0] = {
            label: "My First dataset",
            fillColor: "rgba(49,75,112,0.5)",
            strokeColor: "rgba(49,75,112,0.8)",
            highlightFill: "rgba(49,75,112,0.75)",
            highlightStroke: "rgba(49,75,112,1)",
            data: valuesofdata
        };
        var myLineChart = new Chart(chartarea).Bar(data3);
   }
   
   ready(ajaxRequest('POST', window.location.href, updateClickCount));
})();