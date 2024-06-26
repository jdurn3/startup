import React, { useEffect, useState } from 'react';
import './chat.css';

export function Chat() {
    const [ws, setWs] = useState(null); // State to hold WebSocket object

    useEffect(() => {
        const storedUser = localStorage.getItem('userName');
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
        setWs(socket); // Set WebSocket object in state

        socket.onmessage = function(event) {
            const message = JSON.parse(event.data);
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML += `<div class="message-container">
                                            <div class="user-name">${message.user}</div>
                                            <div class="chat-message ${message.user === storedUser ? 'user-message' : 'other-user-message'}">${message.message}</div>
                                        </div>`;
        };

        displayMountainPicture();
    }, []);

    function sendMessage() {
        const storedUser = localStorage.getItem('userName');
        const messageInput = document.getElementById('message');
        const messageText = messageInput.value.trim();
    
        if (messageText !== '' && ws && ws.readyState === WebSocket.OPEN) {
            const message = { user: storedUser, message: messageText };
            ws.send(JSON.stringify(message));
    
            const chatMessages = document.getElementById('chatMessages');
            chatMessages.innerHTML += `<div class="message-container">
                                            <div class="user-name">${storedUser}</div>
                                            <div class="chat-message user-message">${messageText}</div>
                                        </div>`;
    
            messageInput.value = '';
        } else {
            console.error('WebSocket is not in the OPEN state.');
        }
    }
    

    function displayMountainPicture() {
        const randomImageId = Math.floor(Math.random() * 1000) + 1;

        const containerEl = document.querySelector('#mountain-picture');
        containerEl.innerHTML = '';

        const imgEl = document.createElement('img');
        imgEl.classList.add('mountain-picture');
        imgEl.src = `https://picsum.photos/id/${randomImageId}/800/600`;
        imgEl.alt = 'Random Mountain';

        containerEl.appendChild(imgEl);
    }

    return (
        <div>
            <main className='main'>
                <div className="chat-container" id="chatContainer">
                    <div id="chatMessages"></div>
                </div>
                <div className="mountain-container">
                    <div id="mountain-picture"></div>
                </div>
            </main>

            <div className="form">
                <input type="text" id="message" className="input" placeholder="Type your message..." />
                <button type="button" className="button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
