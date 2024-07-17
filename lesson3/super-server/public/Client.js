let ws
let message;
let userName = "Anonimous"

function connectWebSocket() {
    //1. create an instance of a WebSocket pointing to a specific server and port 
    ws = new WebSocket('ws://localhost:3006');
    // 2. Event handeling - onopen, on message, onclose
    // - Conne
    ws.onopen = () => {
        console.log("connected to server")
    };

    // - Server sends a message to me
    ws.onmessage = (event) => {
        const chat = document.getElementById('chat');
        const message = document.createElement('div');
        //servr sends data that is 'blob' - event.data
        const reader = new FileReader();
        // will work only after -- 'reader.readAsText'
        reader.onload = () => {
            message.textContent = reader.result
            chat.appendChild(message);
        };

        if (event.data instanceof Blob) {
            reader.readAsText(event.data);
        }
    };

    // - connection to server closed
    ws.onclose = () => {

    }

}

function sendMessage() {
    if (ws.readyState == WebSocket.OPEN && message){
        ws.send(userName+": "+message);
    }
}

function updateUserName(value) {
    userName = value;
}
function updateMessage(value) {
    message = value;
}

connectWebSocket();
