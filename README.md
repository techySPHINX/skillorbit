# SkillOrbit: A Platform for Skill Swapping and Collaboration

![SkillOrbit](https://placehold.co/1200x628/e75480/fdf6f9?text=SkillOrbit)

SkillOrbit is a dynamic mobile application designed to connect individuals for skill sharing and swapping. Whether you're looking to learn a new language, master a musical instrument, or pick up a technical skill, SkillOrbit provides a platform to find and connect with others who have the expertise you need and are looking for the skills you possess.

## ✨ Features

*   **User Authentication:** Secure user registration and login.
*   **Skill Matching:** An intelligent algorithm to match users based on the skills they offer and the skills they seek.
*   **Real-time Chat:** In-app messaging for users to communicate and coordinate.
*   **User Profiles:** Showcase your skills and what you're looking to learn.
*   **Feedback and Ratings:** A system for users to rate and provide feedback on their skill swap experiences.
*   **Notifications:** Stay updated on new matches, messages, and other activities.

## 🚀 Tech Stack

### Backend

*   **Framework:** [Node.js](https://nodejs.org/) with [Express.js](https://expressjs.com/)
*   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
*   **Real-time Communication:** [Socket.IO](https://socket.io/)
*   **Authentication:** [JSON Web Tokens (JWT)](https://jwt.io/)
*   **Image Uploads:** [Cloudinary](https://cloudinary.com/)
*   **Validation:** [Joi](https://joi.dev/)
*   **Logging:** [Winston](https://github.com/winstonjs/winston) and [Morgan](https://github.com/expressjs/morgan)
*   **Security:** [Helmet](https://helmetjs.github.io/), [CORS](https://github.com/expressjs/cors), [express-rate-limit](https://github.com/nfriedly/express-rate-limit)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

### Mobile (React Native)

*   **Framework:** [React Native](https://reactnative.dev/)
*   **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
*   **Navigation:** [React Navigation](https://reactnavigation.org/)
*   **API Communication:** [Axios](https://axios-http.com/)
*   **Real-time Communication:** [Socket.IO Client](https://socket.io/docs/v4/client-initialization/)
*   **Push Notifications:** [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)

## 📂 Project Structure

The project is a monorepo with the following structure:

```
skillorbit/
├── backend/         # Node.js/Express.js backend
│   ├── src/
│   └── package.json
├── mobile/          # React Native mobile application
│   ├── src/
│   └── package.json
└── README.md
```

## 🏁 Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/en/download/) (v18 or higher)
*   [MongoDB](https://www.mongodb.com/try/download/community)
*   [Yarn](https://classic.yarnpkg.com/en/docs/install/) (or npm)
*   [React Native CLI](https://reactnative.dev/docs/environment-setup)

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create a `.env` file** by copying `.env.example` and fill in the required environment variables (database connection string, JWT secret, etc.).
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

### Mobile App Setup

1.  **Navigate to the mobile directory:**
    ```bash
    cd mobile
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **For iOS, install pods:**
    ```bash
    cd ios && pod install && cd ..
    ```
4.  **Run the application:**
    *   **For Android:**
        ```bash
        npm run android
        ```
    *   **For iOS:**
        ```bash
        npm run ios
        ```

## ↔️ API Endpoints

The backend exposes a RESTful API for the mobile application. Key endpoints include:

*   `POST /api/auth/register`: Register a new user.
*   `POST /api/auth/login`: Log in a user.
*   `GET /api/skills`: Get a list of all available skills.
*   `POST /api/skills`: Add a new skill.
*   `GET /api/swaps`: Get a list of skill swap proposals.
*   `POST /api/swaps`: Create a new skill swap proposal.

For a full list of endpoints, please refer to the backend route definitions in `backend/src/routes`.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a pull request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.