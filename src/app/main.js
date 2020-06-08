const tmi = require('tmi.js');
var nw = require('nw.gui')

var check = ""
console.log("starting")
const opts = {
    identity: {
      username: 'jayemochi',
      password: 'oauth:x641cmc676w7y8h01179r7veqjy6z8'
    },
    channels: [
      'jayemochi'
    ]
};
function onConnectedHandler (addr, port) {
    const message = `* Connected to ${addr}:${port}`
    console.log(message);
    var value = message
    var elem = document.querySelector('#output');
    elem.innerHTML = value
}
function onMessageHandler (target, context, msg, self) {
    // Remove whitespace from chat message
    if(context.username == check){
        const commandName = msg.trim();
        console.log("message recieved", commandName)
        console.log("context", context)
        var value = commandName
        var message = "message recieved from -- " + check + ": " + value
        var elem = document.querySelector('#output');
        elem.innerHTML = elem.innerHTML + '<br />' + message
    }
    else{
        const commandName = msg.trim();
        var value = commandName
        var message = "message recieved from -- unknown sender: " + value
        var elem = document.querySelector('#output');
        elem.innerHTML = elem.innerHTML + '<br />' + message
    }
    
    // If the command is known, let's execute it
    
}
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);
client.connect();
console.log("client-connected")




function myFunction(){
    var value = document.getElementById('fname').value
    check = value.trim()
    var message = "displaying messages from username: " + value
    var elem = document.querySelector('#output');
    elem.innerHTML = elem.innerHTML + '<br />' + message
    var title = document.querySelector('#title');
    title.innerHTML = "Displaying messages from --" + value
}