////////LIVE - ALOIS ///// API.JS /////////
//////////////COPYRIGHT ALOIS LAURENT BOE//
///////////////////////////////////////////
/// <reference path="https://code.jquery.com/jquery-3.4.1.min.js" />
function getStreamEvents(name, callback) {
  var evtSource = new EventSource("https://alois.xyz:3003/?token=null&chan="+name);
  evtSource.onmessage = function(e) {
    item = JSON.parse(e.data);
        if(item.m != undefined) {
          callback({'pseudo': item.p, 'message': item.m, 'userColor': item.c, 'messageColor': item.mc, 'time': item.t});
      }else if(item.views != undefined) {
          callback({'views':item.views});
      }
  };
}

function sendChatMessage(message, username) {
  var result;
  $.ajax({
        url: "https://alois.xyz:3002/send?msg="+message+"&chan"+username,
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
function getDonations(username, callback){
  var evtSource = new EventSource("https://live.alois.xyz/api/?GetDonations="+username);
  evtSource.onmessage = function(e) {
    dono = JSON.parse(e.data);
      callback(dono);
    };
}
