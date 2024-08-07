# Find My Pet

![Find My Pet Logo](https://github.com/WhitelightningDev/findmypet/blob/main/src/assets/FIND%20MY%20PET.png)

Find My Pet is a web application designed to help pet owners manage their pets' by creating a digital bar code that they can attach to the pets collar, this will allow people to identify the pet as well as being able to see the owners details in the event that the pet wonders astray.Users can manage their information and subscription plans efficiently. This application allows users to register their pets, upload photos, view their subscription status, and choose from available subscription plans.

At this Point the is only one subscription which is R350.00 once off and the a recuring R75 a month with added support.

## Home Screen

![Home Screen](https://github.com/WhitelightningDev/findmypet/blob/main/src/assets/Home-Screen.png)

## Services

![Services](https://github.com/WhitelightningDev/findmypet/blob/main/src/assets/Services.png)

## Features

- **User Authentication**: Secure login and registration system.
- **Pet Management**: Add, update, and view pets. Upload pet photos.
- **Qr Code genaration**: Generate a QR code that gets attached to your pets collar with all your information, incase your pet goes on walk-about.
- **Subscription Management**: View current subscription status and available plans. Subscribe to a new plan.
- **Error Handling**: User-friendly error messages for failed actions like data fetch and image uploads.

## Tech Stack

- **Frontend**: React.js, Bootstrap
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API Requests**: Axios

## Installation

To run this project locally, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/find-my-pet.git
   cd find-my-pet
   ```

2. **Install dependencies**:
   - For the backend:
     ```bash
     cd backend
     npm install
     ```
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

3. **Setup Environment Variables**:
   Create a `.env` file in the `backend` directory and add the following:
   ```plaintext
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the application**:
   - Start the backend server:
     ```bash
     cd backend
     npm start
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     npm start
     ```

5. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

### User

- `POST /api/user/register`: Register a new user
- `POST /api/user/login`: User login
- `GET /api/user/profile`: Get user profile

### Pet

- `GET /api/pet`: Get all pets for the logged-in user
- `POST /api/pet/add`: Add a new pet
- `PUT /api/pet/:id/image`: Update pet image

### Subscription

- `GET /api/subscription`: Get current subscription status
- `GET /api/subscription/plans`: Get available subscription plans
- `POST /api/subscription/subscribe`: Subscribe to a new plan

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.
Please also notify me if youd like to controbute to this project so i am aware.

**Please note this project and its contents are paitented, any purgury will result in a fine or jail time.**

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- Thanks to the developers and contributors of React, Node.js, Express, and MongoDB for their excellent tools and frameworks.
- Special thanks to the Bootstrap team for their awesome CSS framework.

## Contact

If you have any questions or feedback, feel free to reach out:

- **Email**: danielmommsen2@gmail.com
- **GitHub**: [WhitelightningDev](https://github.com/WhitelightningDev)
