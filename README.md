# alois - live js api
The alois - live API is made to be used in your JS projects.
The focus of our API is to be used in DOM applications like to make a custom OBS browser source but a node.js version will be availabe in the futur.
Our API works with the jquery library.

# How to use?
In your html page put 
```html
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script src="https://live.alois.xyz/api/api.js"></script>
```
inside your ``<head>`` tag.

# What protocols are used?
It depends on what function you intend to use.
Function such as ``getChatMessages()`` need a live flow of data and use event-streams also known as Server-Sent-Events (basically unidirectional websocket).

# Functions
### ``getChatMessages(username, callback)`` :
* username: type: string, usage: username of the user from whoses chat need to be fetched.
* callback: type: function, usage: fucntion to which messages are passed one by one.
##### Example:
```js
getChatMessages('aloisxyz', function(message) {
  console.log(message.pseudo, ' said ', message.message);
  //username: message.pseudo
  //message: message.message
  //username color: message.userColor
  //message color: message.messageColor
  //sending time (microtime): message.time
});
```

### ``sendChatMessage(message, key)``
* message: type: string, usage: message to send in chat, needs to be below 300 chars.
* key: type: string, usage: streamer's streaming key whoses chat will receive an alert with the above message.
* *return: type: json, usage: status of the request (error/succes/delay)*
If two messages are sends without 1 second of interval, the messages following the first one and so on will be delayed of the time required to separate them of 1 second.
##### Example:
```js
var status = sendChatMessage('Hi! This message is automated.', 'REDACTED');
if(status.status === 'success') {
console.log('Message has been delayed by ', success.delay);
}else {
console.log(status.error);
}
```

### ``getStreams(limit)``
* limit: type: int, usage: limit of number of broadcasting streams to be fetched, must be between 4 and 9999.
* *return: type: json, usage: array of currently broadcasting streams.*
##### Example:
```js
console.log(getStreams(10));
```

### ``getViews(username)``
* username: type: string, usage: username whose stream current number of viewers as to be fetched.
* *return: type: int, usage: number of current viewers of the stream*
##### Example:
```js
var views = getViews('aloisxyz');
console.log('aloisxyz has ', views, ' viewers');
```

### ``getViewsLive(username, callback)``
* username: type: string, usage: username whose stream current number of viewers as to be fetched.
* callback: type: function, usage: function to which the live number of views is passed.
##### Example:
```js
getViewsLive('aloisxyz', function(views){
//gets run every time the number of views changes
console.log('aloisxyz has now ', views, 'viewers.');
});
```

### ``getUserDetails(username)``
* username: type: string, usage: username of user whose details will be fetched
* *return: type: json, usage: an array containing user details*
##### Example:
```js
console.log(getUserDetails('aloisxyz'));

console.log('aloisxyz has ', getUserDetails(aloisxyz).subs, ' subscribers');
```
