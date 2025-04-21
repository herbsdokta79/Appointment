import { google } from 'googleapis';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const SERVICE_ACCOUNT_KEY_PATH = path.resolve(process.env.SERVICE_ACCOUNT_KEY_PATH);

async function getAuthenticatedClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_KEY_PATH,
    scopes: SCOPES,
  });

  const authClient = await auth.getClient();
  return authClient;
}

async function createEvent(authClient, startDate, endDate, eventTitle, eventDescription) {
  const calendar = google.calendar({ version: 'v3', auth: authClient });

  const event = {
    summary: eventTitle,
    description: eventDescription,
    start: {
      dateTime: startDate,
      timeZone: 'America/Los_Angeles', // Adjust for your clinic's timezone
    },
    end: {
      dateTime: endDate,
      timeZone: 'America/Los_Angeles',
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary', // Replace with clinic's calendar ID if necessary
      requestBody: event,
    });

    return response.data;
  } catch (error) {
    throw new Error('Error creating event: ' + error.message);
  }
}

export { getAuthenticatedClient, createEvent };
