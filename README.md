# Welcome to Open-CES mobile 👋

This project is an [Expo](https://expo.dev) project for a mobile app compatible with Open-CES.

For more information about the project, look at our web site http://open-ces.org/

Git Hub for the back-end system is : https://github.com/jsomville/open-CES

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```
## Features

 - Login
 - Logout
 - Link to Register new user
 - Main account information
 - Transfer using a QR code
 - Transfer using email
 - Transfer using phone number
 - Show my QR code
 - Pay by scanning a QR code
 - Display user informations
 - Diplay past transactions

## Build Android app

### Pre-requisite
   Have a valid expo account

   Install the eas cli
   ```bash
   npm install -g eas-cli
   ```
### Build
   Login to expo
   ```bash
   eas login
   ```
   
   Build configure if required
   ```bash
   eas build:configure
   ```

   Build production (default)
   ```bash
   eas build --platform android
   ```

   Build production (preview)
   ```bash
   eas build --platform android -- profile preview
   ```

## DEV Help to resolve dependencies
   To check dependency
   ```bash
   npx depcheck
   ```

   Delete line in package.json

   Repackages-install 

   ```bash
   npm install
   ```

