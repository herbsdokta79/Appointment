import { google } from "googleapis";

export async function POST(req: Request) {
  const { name, email, subject, message, start, end } = await req.json();

  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    ["https://www.googleapis.com/auth/calendar"]
  );

  const calendar = google.calendar({ version: "v3", auth: jwtClient });

  const event = {
    summary: subject,
    description: `From: ${name} (${email})\n\n${message}`,
    start: { dateTime: start, timeZone: "UTC" },
    end: { dateTime: end, timeZone: "UTC" },
    attendees: [{ email }],
  };

  await calendar.events.insert({
    calendarId: "YOUR_CLINIC_CALENDAR_ID",
    requestBody: event,
  });

  return Response.json({ success: true });
}
