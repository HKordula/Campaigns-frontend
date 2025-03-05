# Campaign Management Frontend

This is the **React frontend** for the Campaign Management System.

## Setup and Installation

### 1️. Clone the repository
```sh
git clone https://github.com/HKordula/Campaigns-frontend
cd campaign-frontend
```

### 2. Install dependencies
```sh
npm install
```

### 3. Configure API URL
Modify `src/services/CampaignService.js` if needed:

```js
const API_URL = "http://localhost:8080/api/campaigns";
const USERS_API_URL = "http://localhost:8080/api/users";
```

### 4. Start the Application
```sh
npm start
```
The app will be available at:
```
http://localhost:3000
```

### 5️. Features
- Add and update campaigns
- View available campaigns
- Track **Emerald Funds** balance

## Deploying on Render
```
https://campaigns-mvur.onrender.com/
```

## 🎯 Summary
| Project | Tech Stack | Start Command |
|---------|-----------|---------------|
| **Backend** | Spring Boot, H2 Database | `./mvnw spring-boot:run` |
| **Frontend** | React, Axios, React-Router | `npm start` |


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
