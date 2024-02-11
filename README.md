# Google Calendar Integration with Google Meet
### This project provides an API for integrating Google Calendar functionality into your applications, allowing you to schedule events and meetings easily, complete with Google Meet links.

## Features
- **Event Management**: Schedule events on Google Calendar.
- **Meeting Creation**: Generate Google Meet links and add them to scheduled events.
-** OAuth2 Authentication**: Secure authentication for accessing Google Calendar and Google Meet APIs.

  ### Prerequisites
Before using this API, make sure you have the following:

Google API Credentials: Obtain the credentials.json file by creating a project in the Google Developer Console. Enable the Google Calendar API and Google Meet API for your project.
 ### Installation
Clone the repository:
```
git clone <repository-url>
```
Install dependencies:

```
npm install
```
Set up environment variables:

Create a .env file in the root directory of your project and add the following variables:
```
GOOGLE_CLIENT_ID=<your-client-id>
GOOGLE_CLIENT_SECRET=<your-client-secret>
REDIRECT_URI=<your-redirect-uri>
Replace <your-client-id>, <your-client-secret>, and <your-redirect-uri> with your Google OAuth2 credentials.
```
Usage
Start the server:
```
npm start
```

**Access the following endpoints:**
- GET /google: Redirects to Google authentication page.
- GET /google/redirect: Handles OAuth2 callback and retrieves access token.
- GET /schedule_calendar_event: Creates an event on Google Calendar with a Google Meet link.
**API Endpoints**
- GET /schedule_calendar_event: Creates a new event on Google Calendar, complete with a Google Meet link.
- GET /: Welcomes users to the Google Calendar API.
## Dependencies

- cors: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js.
- dayjs: Library for parsing, validating, manipulating, and formatting dates.
- dotenv: Loads environment variables from a .env file.
- express: Web framework for Node.js.
- googleapis: Official Node.js client library for Google APIs.
- uuid: Library for generating UUIDs.
**License**
This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing
Contributions are welcome! Please feel free to open issues or pull requests for any improvements or bug fixes.

