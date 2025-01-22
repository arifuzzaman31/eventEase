
const ws = new WebSocket('ws://localhost:8181');

const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

const appendMessage = (text, isIncoming = true) => {
    const message = document.createElement('div');
    message.textContent = text;

    message.className = isIncoming
        ? 'bg-gray-200 text-black p-2 rounded my-2 w-fit'
        : 'bg-blue-500 text-white p-2 rounded my-2 ml-auto w-fit';

    messagesDiv.appendChild(message);

    messagesDiv.scrollTop = messagesDiv.scrollHeight;
};

ws.onmessage = (event) => {
    appendMessage(event.data, true); 
};

sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();

    if (message) {
        ws.send(message);
        appendMessage(message, false); 
        messageInput.value = '';
    }
});

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('WebSocket connection closed');
};
