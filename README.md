# 即時聊天室

這是一個使用 HTML、CSS 和 JavaScript 實現的即時聊天室，使用 Firebase Realtime Database 作為後端服務。

## 使用方法

1. 首先你需要在 [Firebase Console](https://console.firebase.google.com/) 建立一個新專案
2. 在專案設定中找到網頁應用程式的設定值
3. 將 `script.js` 中的 `firebaseConfig` 替換成你的 Firebase 設定值：
   ```javascript
   const firebaseConfig = {
       apiKey: "你的 API Key",
       authDomain: "你的 Auth Domain",
       databaseURL: "你的 Database URL",
       projectId: "你的 Project ID",
       storageBucket: "你的 Storage Bucket",
       messagingSenderId: "你的 Messaging Sender ID",
       appId: "你的 App ID"
   };
   ```
4. 在 Firebase Console 的 Realtime Database 中，將資料庫規則設為：
   ```json
   {
     "rules": {
       ".read": true,
       ".write": true
     }
   }
   ```
5. 將專案部署到 GitHub Pages 或其他靜態網站托管服務

## 功能特點

- 即時訊息傳送和接收
- 支援使用者名稱設定
- 自動捲動到最新訊息
- 響應式設計，支援各種螢幕尺寸
- 按 Enter 快速發送訊息

## 注意事項

- 這是一個示範用的聊天室，沒有實作使用者認證機制
- 在實際應用中，建議添加適當的安全性設定
- Firebase 免費方案有使用限制，請參考 Firebase 官方文件