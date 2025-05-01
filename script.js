// Firebase 設定
const firebaseConfig = {
    // 你需要從 Firebase Console 獲取這些設定值
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 初始化 Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const messagesRef = database.ref('messages');

// 監聽新訊息
messagesRef.on('child_added', (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});

// 顯示訊息
function displayMessage(message) {
    const messagesDiv = document.getElementById('messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${message.username === getUserName() ? 'message-outgoing' : 'message-incoming'}`;
    
    const usernameElement = document.createElement('div');
    usernameElement.className = 'username';
    usernameElement.textContent = message.username;
    
    const textElement = document.createElement('div');
    textElement.className = 'text';
    textElement.textContent = message.text;
    
    messageElement.appendChild(usernameElement);
    messageElement.appendChild(textElement);
    messagesDiv.appendChild(messageElement);
    
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
        messagesRef.push({
            username: username,
            text: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
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