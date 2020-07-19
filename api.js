////////LIVE - ALOIS ///// API.JS /////////
//////////////COPYRIGHT ALOIS LAURENT BOE//
///////////////////////////////////////////
/// <reference path="https://code.jquery.com/jquery-3.4.1.min.js" />
function getChatMessages(name, callback) {
  var evtSource = new EventSource("https://live.alois.xyz/api/?GetChatMessages="+name);
  evtSource.onmessage = function(e) {
    item = JSON.parse(e.data);
        if(item.m != undefined) {
          callback({'pseudo': item.p, 'message': item.m, 'userColor': item.c, 'messageColor': item.mc, 'time': item.t});
      }
  };
}

function sendChatMessage(message, key) {
  var result;
  $.ajax({
        url: "https://live.alois.xyz/api/?SendChatMessage="+message+"&key="+key,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
     });
  return result;
}

function getStreams(limit) {
  var result;
  $.ajax({
        url: "https://live.alois.xyz/api/?GetStreams="+limit,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
     });
  return result;
}

function getViews(username) {
  var views;
  $.ajax({
        url: "https://live.alois.xyz/api/?GetViews="+username,
        type: 'get',
        dataType: 'html',
        async: false,
        success: function(data) {
            views = data;
        }
     });
  return views;
}

function getViewsLive(username, callback) {
  var evtSource = new EventSource("https://live.alois.xyz/api/?GetViewsLive="+username);
  evtSource.onmessage = function(e) {
      callback(e.data);
    };
}

function getUserDetails(username) {
  var result;
  $.ajax({
        url: "https://live.alois.xyz/api/?GetUserDetails="+username,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(data) {
            result = data;
        }
     });
  return result;
}
