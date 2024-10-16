[![Node CI](https://github.com/opifexM/FitFriends/actions/workflows/check.yml/badge.svg)](https://github.com/opifexM/FitFriends/actions/workflows/check.yml)

# Fit Friends

Fit Friends is an online platform for discovering and selecting workouts with the option to individually choose and purchase sessions. The platform offers profile creation for users and trainers, workout purchases, personal account management, and progress tracking.

## Description

Fit Friends is a web application for fitness enthusiasts, providing access to a workout catalog for people of varying fitness levels. The app supports personal accounts for both users and trainers, allowing flexible selection and purchase of workouts, leaving feedback, and tracking personal progress. Users can fill out questionnaires to personalize recommendations, invite friends for joint sessions, and review sessions, while trainers can create and edit workouts. The platform also supports notifications, map pop-ups for location visualization, and flexible filters for searching sessions. The project is built with Node.js and React, with deployment options in Docker containers.

## Features

- **Registration and Authorization**: Two roles—user and trainer, with role selection upon registration.
- **Personal Account**: Users can edit profile data, manage purchases, and view workout balances.
- **Questionnaires**: Personalized workout recommendations based on preferences, fitness level, and other factors.
- **Workout Catalog**: Detailed workout descriptions with filters for price, calories, and duration.
- **Purchasing and Tracking Workouts**: Users can purchase workouts and monitor their progress; trainers view their sales stats.
- **Reviews and Ratings**: Users leave reviews and ratings, contributing to workout scores.
- **Notifications and Alerts**: Notifications for workout invitations, friend requests, and other events.
- **Trainer Features**: Trainers can create, edit, apply discounts, and upload certifications for workouts.
- **Joint and Personal Workouts**: Support for personal training sessions and group workout invitations.
- **Deployment and Containerization**: Deployable in Docker containers for seamless deployment.

## Usage

FitFriends is built using a modern technology stack in a monorepo structure for unified frontend and backend development. Key technologies include:

- **Backend**: Built on Node.js with Nest.js, MongoDB for data storage, and RabbitMQ for queue processing.
- **Frontend**: Developed with React and TypeScript, utilizing React Router and optionally Redux Toolkit for state management. Frontend build and bundling are handled by Vite.
- **Containerization**: Docker support with `docker-compose` for deploying the application alongside databases and other components.
- **Authentication and Authorization**: Secure JWT-based authentication (Access and Refresh tokens).
- **Testing**: Jest and React Testing Library ensure code quality.
- **Notifications and Queues**: Email notifications for workout subscriptions via Nodemailer with SMTP setup in Docker.
- **API Documentation**: OpenAPI documentation with Swagger for convenient API reference.


## Technologies Used

### Backend

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine, used for the server-side logic of the application.
- **NestJS**: A progressive framework for building efficient, reliable, and scalable server-side applications in Node.js.
- **Express.js**: A lightweight web framework for Node.js, used to handle HTTP requests in the application.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript, providing type safety.
- **MongoDB**: NoSQL and relational databases supported in the project, offering flexible data storage options.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **Passport**: Middleware for managing user authentication with strategies like JWT and local strategies.
- **bcrypt**: A library for password hashing, enhancing secure user authentication.
- **RxJS**: A library for reactive programming with observables, used to handle asynchronous data streams.
- **Swagger**: Tool for generating API documentation with OpenAPI, simplifying integration and usage.

### Frontend

- **React 18**: A library for building fast, responsive UIs with a component-based architecture.
- **Vite**: A build tool providing a fast development environment with optimized builds for frontend projects.
- **TypeScript**: Enforced across the frontend to maintain type safety and improve code quality.
- **Redux Toolkit**: A set of tools for efficient state management in large applications, ensuring a consistent application state.
- **React Router Dom**: A library for managing and implementing routing in React applications.
- **axios**: A promise-based HTTP client for the browser and Node.js, used to make API requests.
- **React Toastify**: A library for creating customizable toast notifications, enhancing user feedback.
- **Formik and Yup**: Libraries for building and validating forms within the application, simplifying form management.

## Key Commands

### Development

- **Start Backend**:
  ```bash
  npm run start:backend
  ```
  
- **Start Frontend**:
  ```bash
  npm run start:frontend
  ```  

- **Build Project**:
  ```bash
  npm run build
  ```
  
- **Docker Compose Up**:
  ```bash
  npm run server:docker-up
  ```
  
- **Docker Compose Down**:
  ```bash
  npm run server:docker-down
  ```
  
- **Generate Data for Backend**:
  ```bash
  npm run cli:backend-generate
  ```

## Complexity

Fit Friends combines a range of technologies to support robust functionality and a seamless user experience:

- **Monorepo Structure**: Unified frontend and backend development in a single repository.
- **Email and Notification System**: Dynamic notifications for users and trainers, utilizing a Docker-integrated SMTP server.
- **Advanced Authentication**: Secure JWT-based authentication with access control for multiple user roles.

## License

Fit Friends is licensed under the ISC license.