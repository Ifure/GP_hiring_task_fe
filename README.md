## Frontend GP Hiring Task

## Tech Stack

- **Frontend Framework** : NextJs
- **Styling** : TailwinndCss
- **State Management**: Context API
- **MetaMask**: Ethers.js for wallet integration
- **Testing**: Jest

## Prerequisites

Before starting, make sure you have the following installed:

- MetaMask Browser Extension (required for wallet connection)
- VSCode (recommended IDE)
- Node.js (version 20 or higher)
- MySQL (for database requirements)
- Additionally, clone the backend code from the repository (https://github.com/Ifure/GP_hiring_backend).

## Modifications

The backend code was modified for enhanced error handling. Previously, errors were returning null, leading to occasional communication issues. These errors are now handled properly to ensure smooth functionalit, get the backend source code from here (https://github.com/Ifure/GP_hiring_backend).

## Getting Started

Clone the repository:

git clone <repository-url>

## Install dependencies:

- yarn install

## Run the development server:

- yarn dev

## Run test

- yarn test

Open http://localhost:3000 in your browser to view the application.

## Project Overview

- Homepage: The landing page can be accessed at the root URL.
- Navigation: Use the navigation bar to access "Sign In" and "Sign Up" options.
- Login Page
  To log in, enter the email address associated with your account. If you don’t have an account or prefer not to register, you may use the following demo credentials:

      Email: email@gmail.com
      Password: Password1

- Register Page
  To register, provide your name, email, and password. This will create a new user account.

- Dashboard
  The dashboard allows you to create and delete titles, but requires a connected MetaMask wallet.

Note: If you don’t have MetaMask installed, you’ll need to install the browser extension. Visit MetaMask Download and follow the setup instructions. Make sure to keep your secret recovery phrase safe, as it’s essential for account recovery.

- https://metamask.io/download/

## Deployment

This project is deployed on Vercel. You can access the live application here: [Vercel Deployment Link].
