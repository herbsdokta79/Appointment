import { google } from "googleapis";

export async function GET() {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    undefined,
    process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    ["https://www.googleapis.com/auth/calendar.readonly"]
  );

  const calendar = google.calendar({ version: "v3", auth: jwtClient });
  const now = new Date().toISOString();
  const maxTime = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();

  const res = await calendar.freebusy.query({
    requestBody: {
      timeMin: now,
      timeMax: maxTime,
      timeZone: "UTC",
      items: [{ id: "YOUR_CLINIC_CALENDAR_ID" }],
    }
  });

  const busy = res.data.calendars?.[Object.keys(res.data.calendars)[0]].busy || [];
  return Response.json({ busy });
}
