# 🧑‍💻 Frontend – Real-time Scoreboard App

This is the frontend part of the scoreboard system, providing a real-time user interface for viewing and updating scores.

## 📦 Tech Stack

- React
- TypeScript
- Axios (with interceptors for JWT)
- WebSocket (native or via Socket.IO)
- TailwindCSS

## 🧩 Features

- Display top 10 users by score.
- Login and persist JWT in localStorage.
- Real-time updates via WebSocket.
- Button to trigger an action that increases score.

## 🔧 Setup Instructions

1. Install dependencies:
```bash
pnpm install
```

2. Set up `.env`:
```
REACT_APP_API_URL=http://localhost:4000
REACT_APP_ACCESS_TOKEN_KEY=accessToken
REACT_APP_REFRESH_TOKEN_KEY=refreshToken
REACT_APP_SOCKET_SERVER_SCORE_URL=http://localhost:4000/score
```

3. Run the app:
```bash
pnpm run start
```

## 🚀 Pages & Components

- `Login`: Authenticate and store token.
- `Dashboard`: Displays top 10 scores.
- `UpdateScoreModal`: Triggers score update and show modak.
- `useScoreSocket`: WebSocket hook for live updates.
- `axios`: Handles token injection.

## 📡 Real-time Updates

Frontend connects to the WebSocket server. On receiving `score_update` events, it updates the UI without refreshing.

## 🔐 Auth Flow

- JWT stored in `localStorage`
- Axios adds JWT to `Authorization` header
- Protected routes redirect to login if a token is missing

## 📈 Suggested Improvements
- [ ] Add unit test and coverage 100%.
- [ ] Add form validation
- [ ] Add sound or visual notification on score update.
- [ ] Show a user’s rank in real-time.
- [ ] Display update timestamps.