////////LIVE - ALOIS ///// API.JS /////////
//////////////COPYRIGHT ALOIS LAURENT BOE//
///////////////////////////////////////////
/// <reference path="https://code.jquery.com/jquery-3.4.1.min.js" />
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.4.1.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);
var getChatMessageslasttime = 0;

function getChatMessages(name, callback) {
  var evtSource = new EventSource("https://live.alois.xyz/api/?GetChatMessages="+name+"&lasttime="+getChatMessageslasttime);
  evtSource.onmessage = function(e) {
    item = JSON.parse(e.data);
        if(item.m != undefined) {
          getChatMessageslasttime = item.t;
          callback({'pseudo': item.p, 'message': item.m, 'userColor': item.c, 'messageColor': item.mc, 'time': item.t});
      }
  };
  evtSource.onerror = function() {
    evtSource.close();
    evtSource = new EventSource("https://live.alois.xyz/api/?GetChatMessages="+name+"&lasttime="+getChatMessageslasttime);
  };
}

function sendChatMessage(message, key) {
  var result;
  $.get("https://live.alois.xyz/api/?SendChatMessage="+message+"&key="+key, function(e) {
    result = JSON.parse(e);
  });
  return result;
}

function getStreams(limit, callback) {
  $.get("https://live.alois.xyz/api/?GetStreams="+limit, function(e) {
    callback(Json.parse(e));
  });
}

function getViews(username) {
  var views;
  $.get("https://live.alois.xyz/api/?GetViews="+username, function(e) {
    views = e;
  });
  return views;
}

function getViewsLive(username, callback) {
  var evtSource = new EventSource("https://live.alois.xyz/api/?GetViewsLive="+username);
  evtSource.onmessage = function(e) {
      callback(e.data);
    };
}
