// $(()=>{
//     $("#send").click(()=>{
//         //addmessage({name : 'John', message : 'gaand mara lo!'})
//         var message = {name : $("#name").val(), message : $("#message").val()}
//         postmessage(message)
//     })
//     getmessages()
// })

// function addmessage(message){
//     $("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message}</p>`)
// }

// function getmessages(){
//     $.get('http://localhost:4321/messages',(data)=>{
//         console.log(data)
//     })
// }

// function postmessage(message){
//     $.post('http://localhost:4321/messages',message)
// }


const socket = io()
$(()=>{
$("#send").click(()=>{
//addmessage({name : 'John', message : 'gaand mara lo!'})
var message = {name : $("#name").val(), message : $("#message").val()}
postmessage(message)
})
getmessages()
})

socket.on('message',addmessage)

setTimeout(()=>{
console.log('Connected '+socket.id)
},1000)

function addmessage(message){
$("#messages").append(`<h4> ${message.name} </h4> <p> ${message.message}</p>`)
}

function getmessages(){
$.get('http://localhost:4321/messages',(data)=>{
data.foreach(addmessage);
})
}

function postmessage(message){
$.post('http://localhost:4321/messages',message)
}


