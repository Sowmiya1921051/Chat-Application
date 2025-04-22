
# 💬 Real-Time Chat Application

A lightweight and responsive real-time chat app built with **React Native** (frontend) and **Node.js + Socket.io** (backend). Users can instantly send and receive messages with timestamps in a clean and mobile-friendly interface.

---

## 🚀 Tech Stack

| Tech         | Role                    |
|--------------|--------------------------|
| ⚛️ React Native | Mobile UI (Android/iOS) |
| 🟦 Node.js      | Backend server           |
| 🔄 Socket.io    | Real-time communication  |
| 📡 Express.js   | HTTP API & middleware    |

---

## ✨ Features

- 🔐 **Dummy Login** – Enter your name to start chatting
- ⚡ **Real-Time Messaging** – Powered by Socket.io
- ⏰ **Timestamps** – All messages include a local time
- 📱 **Mobile-Friendly UI** – Clean layout for better usability
- 🔄 **Auto-Broadcast** – All messages are seen by everyone

---

## 📁 Project Structure

```
chat-app/
├── backend/         # Node.js + Socket.io server
│   └── server.js
└── frontend/        # React Native app
    └── App.tsx
```

---

## 🛠 Setup Instructions

### ✅ Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

4. Server runs on:
   ```
   http://192.168.94.235:3000
   ```

---

### 📱 Frontend Setup (React Native)

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run on Android:
   ```bash
   npx react-native run-android
   ```

4. Or run on iOS:
   ```bash
   npx react-native run-ios
   ```

> ✅ Ensure the socket server IP is updated in `App.tsx`:
```tsx
const socket = io('http://192.168.94.235:3000');
```

---

## 🧪 Demo Flow

1. 🧍‍♂️ User opens the app and enters a name to log in.
2. 💬 Starts sending messages instantly.
3. 📡 Messages are broadcast to all users in real time.
4. ⏰ Timestamps show when each message was sent.

---

## 🖼 UI Preview (Optional)

> _(Add screenshots here if you have them, e.g.,![image](https://github.com/user-attachments/assets/d059f412-4401-4275-9149-9f4d376c868e)
 login screen, chat view, etc.)_

---

## 💡 Future Improvements

- ✅ Message storage using a database (MongoDB / MySQL)
- ✅ User authentication (email/password or Google login)
- ✅ Chat rooms
