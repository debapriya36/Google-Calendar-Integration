const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const port = process.env.PORT || 8080;

// i want to create calendar events and schedule meetings 
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// generate a url that asks permissions for Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/meetings.space.readonly',
    'https://www.googleapis.com/auth/meetings.space.created',
];

let url = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',

    // If you only need one scope you can pass it as a string
    scope: scopes
});

app.get('/google', (_, res) => {
    res.redirect(url);
});


app.get('/google/redirect', async (req, res) => {
    const token = req.query.code;
    const { tokens } = await oauth2Client.getToken(token);
    oauth2Client.setCredentials(tokens);
    res.json({
        msg: "You have successfully authenticated with google",
        tokens
    });
});

// calendar api
const calendar = google.calendar(
    {
        version: "v3",
        auth: oauth2Client
    }
);

const dayjs = require('dayjs');
const { v4: uuidv4 } = require('uuid');

app.get('/schedule_calendar_event', async (req, res) => {
    try {
        // Create a dummy event in ISO timezone
        let event = {
            summary: "Hug Day Celebration!",
            description: "Let's celebrate Hug Day together! 🤗",
            start: {
                dateTime: dayjs().add(1, 'day').toISOString(),
                timeZone: "Asia/Kolkata"
            },
            end: {
                dateTime: dayjs().add(1, 'day').add(5, 'hour').toISOString(),
                timeZone: "Asia/Kolkata"
            },
            attendees: [
                // { 'email': 'debapriya@levitation.co.in' },
            ],
            conferenceData: {
                createRequest: {
                    requestId: uuidv4(),
                }
            },
        };

        // Insert the event into the calendar
        const response = await calendar.events.insert({
            auth: oauth2Client, // You need to authenticate this request using OAuth2
            calendarId: "primary",
            resource: event,
            conferenceDataVersion: 1, // Include this to generate Google Meet link
        });

        // Get the Google Meet link from the response
        const meetLink = response.data.conferenceData.entryPoints.find(entry => entry.entryPointType === 'video').uri;

        console.log("Event created successfully with Google Meet link:", meetLink);

        res.json({
            msg: "Successfully created an event in the calendar with Google Meet link",
            meetLink: meetLink
        });
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({ error: "Failed to create event" });
    }
});

app.get('/getEvents', async (req , res) => {
    try {
        const response = await calendar.events.list({
            calendarId: 'primary', // Replace 'primary' with the calendar ID you want to fetch events from
            timeMin: (new Date()).toISOString(), // Fetch events starting from current time
            maxResults: 10, // Maximum number of events to fetch
            singleEvents: true,
            orderBy: 'startTime',
        });
        const events = response.data.items;
        res.json({ events });
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ error: 'Failed to fetch events' });
    }
});


app.get('/', (_, res) => {
    res.json({
        msg: "Welcome to the google calendar api"
    })
})

app.listen(port, () => console.log(`Server is running on port ${port}`)); 
