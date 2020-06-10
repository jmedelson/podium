const tmi = require('tmi.js');
var nw = require('nw.gui')

var check = ""
var viewerTargets = ['','','','','']
console.log("starting")
const opts = {
    identity: {
      username: 'jayemochi',
      password: 'oauth:x641cmc676w7y8h01179r7veqjy6z8'
    },
    channels: [
      'trihex'
    ]
};
function onConnectedHandler (addr, port) {
    const message = `* Connected to ${addr}:${port}`
    console.log(message);
}
function onMessageHandler (target, context, msg, self) {
    // Remove whitespace from chat message
    console.log("message Handler")
    if(viewerTargets.includes(context.username)){
        var pointer = viewerTargets.indexOf(context.username)
        const commandName = msg.trim();
        console.log("message recieved", commandName)
        console.log("context", context)
        var value = commandName
        var message = context.username+ ": " + value
        var target = '#output' + pointer
        var elem = document.querySelector(target);
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
    // var title = document.querySelector('#title');
    // title.innerHTML = "Displaying messages from --" + value
}
$(".podiumImage").keydown(function(event) {
    var select = event.target
    console.log(select.id)
    var target = select.id.slice(-1)
    var input = "#input" + target
    var text = $(input).val()
    var size = text.length + 2 +"ch"
    $(input).width(size)
})
$(".podiumInput").click(function(event) {
    var select = event.target
    console.log(select.id)
    var target = select.id.slice(-1)
    target = "#podiumImage" + target
    $(target).show()
    console.log("input")
})
$(".podiumImage").click(function(event) {
    var select = event.target
    console.log(select.id)
    var target = select.id.slice(-1)
    var image = '#podiumImage' + target
    var input = '#input' + target
    var name = $(input).val().toLowerCase();
    viewerTargets[target] = name
    console.log("viewerTargets", viewerTargets)
    $(image).hide()
    $(input).blur()
    console.log("image")
});

$('.expand-icon').click(function(event) {
    var select = event.target
    var target = select.id.slice(-1)
    var i = 1
    while(i<5){
        var elem = '#pb' + i
        console.log("test", i, i!=target, elem)
        if(i!=target){
            $(elem).addClass('no-show')
        }else{
            $(elem).addClass('pb-scale')
        }
        i++
    }
    $('.expand-icon').hide()
    $('.collapse-icon').show()
});
$('.collapse-icon').click(function(event) {
    collapse()
});
$(document).keyup(function(e) {
    if (e.key === "Escape") { // escape key maps to keycode `27`
        collapse()
    }
});
function collapse(){
    var i = 1
    while(i<5){
        var elem = '#pb' + i
        $(elem).removeClass('no-show pb-scale')
        i++
    }
    $('.expand-icon').show()
    $('.collapse-icon').hide()
}