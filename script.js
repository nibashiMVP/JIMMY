// 初始化 GUN
const gun = Gun({
    peers: ['https://gun-manhattan.herokuapp.com/gun'] // 使用公共節點，也可以改用自己的節點
});

// 建立聊天訊息的參考
const messages = gun.get('chat-messages');

// 監聽新訊息
messages.map().on(function(data, id) {
    if (data && !document.getElementById(id)) {
        displayMessage(data, id);
    }
});

// 顯示訊息
function displayMessage(message, id) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.id = id;
    messageElement.className = `message ${message.username === getUserName() ? 'message-outgoing' : 'message-incoming'}`;
    
    const usernameElement = document.createElement('div');
    usernameElement.className = 'username';
    usernameElement.textContent = message.username;
    
    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.textContent = message.text;
    
    const timeElement = document.createElement('div');
    timeElement.className = 'time';
    timeElement.textContent = new Date(message.timestamp).toLocaleTimeString();
    
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    messageElement.appendChild(timeElement);
    
    // 按時間順序插入訊息
    let inserted = false;
    Array.from(messagesDiv.children).some(child => {
        const childMessage = gun.get(child.id);
        if (childMessage && message.timestamp < childMessage.timestamp) {
            messagesDiv.insertBefore(messageElement, child);
            inserted = true;
            return true;
        }
    });
    
    if (!inserted) {
        messagesDiv.appendChild(messageElement);
    }
    
    // 滾動到最新訊息
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// 取得使用者名稱
function getUserName() {
    return document.getElementById('username').value.trim() || '匿名';
}

// 發送訊息
function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    const username = getUserName();
    
    if (message) {
        // 建立新訊息
        messages.set({
            username: username,
            text: message,
            timestamp: Date.now()
        });
        
        messageInput.value = '';
    }
}

// 按 Enter 發送訊息
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});