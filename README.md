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
Function such as ``getStreamEvents()`` need a live flow of data and use event-streams also known as Server-Sent-Events (basically unidirectional websocket).

# Functions
### ``getStreamEvents(username, callback)`` :
* username: type: string, usage: username of the user from whoses chat need to be fetched.
* callback: type: function, usage: fucntion to which messages/views/donations are passed one by one.
##### Example:
```js
getStreamEvents('aloisxyz', function(event) {
if(event.message != undefined) {
console.log(event.pseudo, ' said ', event.message);
  //username: event.pseudo
  //message: event.message
  //username color: event.userColor
  //message color: event.messageColor
  }else if(event.views != undefined){
  //live viewers reported every two seconds: event.views
  }else if(event.dono != undefined) {
  //new donation:
  //who donated? event.dono.from
  //donation ammount? event.dono.ammount
  //donation message? event.dono.message
  }
});
```

### ``sendChatMessage(message, username)``
* message: type: string, usage: message to send in chat, needs to be below 300 chars.
* username: type: string, usage: streamer's username whoses chat will receive an alert with the above message.
If two messages are sends without 1 second of interval, the messages following the first one and so on will be delayed of the time required to separate them of 1 second.
##### Example:
```js
sendChatMessage('Hi! This message is automated.', 'aloisxyz');
```

### ``getStreams(limit)``
* limit: type: int, usage: limit of number of broadcasting streams to be fetched, must be between 4 and 9999.
* *return: type: json, usage: array of currently broadcasting streams.*
##### Example:
```js
console.log(getStreams(10));
```

### ``getUserDetails(username)``
* username: type: string, usage: username of user whose details will be fetched
* *return: type: json, usage: an array containing user details*
##### Example:
```js
console.log(getUserDetails('aloisxyz'));

console.log('aloisxyz has ', getUserDetails(aloisxyz).subs, ' subscribers');
```
