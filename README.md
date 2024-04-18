# Real-Time Board Game: An Online App using Next.js, TypeScript, and Firebase Cloud Firestore

## To play the game, please copy and paste the following link into your browser's address bar, or right-click and select "Open link in new tab":

https://tictactoe-gomoku-online.web.app

---

#### Features:

- Real-time updates for synchronized gameplay.
- Choose between Tic Tac Toe or Gomoku.
- Simple and intuitive interface.

#### Technologies:

- Next.js
- TypeScript
- Firebase Cloud Firestore

---

# Setup: 

### Firebase and Cloud Firestore Setup:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/).
2. Add Firestore database to your project.

### Local Setup:

1. Clone this repository.
2. Ensure npm version 20 is installed.
3. Run `npm install` in the project root directory.
4. Create a `.env.local` file with the following variables:
    - `NEXT_PUBLIC_FIREBASE_API_KEY`
    - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
    - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
    - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
    - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
    - `NEXT_PUBLIC_FIREBASE_APP_ID`
5. Run `npm run dev`.
6. Navigate to `http://localhost:3000` in your browser.

---

# Deployment:

1. Install and login to Firebase CLI.
2. Run `npm run build` or `next build`.
3. Enable web frameworks experiment with `firebase experiments:enable webframeworks`.
4. Deploy to Firebase Hosting with `firebase deploy --only hosting`.