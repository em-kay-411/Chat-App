// Client side script


const socket = io('http://localhost:8000');

const form = document.getElementById('send-cont');
const msgInput = document.getElementById('message_input');
const msgContainer = document.querySelector(".container");
var audio = new Audio('Beep.mp3');

const append = (message, position)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(position);
    msgContainer.append(msgElement);
    if(position == 'left'){
        audio.play();
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = msgInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    msgInput.value = '';
});

const name = prompt("Enter your name to join");
socket.emit('new-user-joined', name);

socket.on('user-joined', name =>{
    append(`${name} joined the chat`, 'right');    
});

socket.on('receive', data =>{
    append(`${data.name}: ${data.message}`, 'left');    
});

socket.on('leave', name =>{
    append(`${name} left the chat`, 'left');    
});