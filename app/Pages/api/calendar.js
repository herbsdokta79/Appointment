import { getAuthenticatedClient, createEvent } from '../../lib/googleCalendar';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, phone, age, whatsappNumber, complaint, actionsTaken, conditions, allergies, medications, familyHistory } = req.body;

    const eventTitle = `Appointment with ${fullName}`;
    const eventDescription = `
      Full Name: ${fullName}
      Email: ${email}
      Phone: ${phone}
      Age: ${age}
      WhatsApp: ${whatsappNumber}
      Complaint: ${complaint}
      Actions Taken: ${actionsTaken}
      Conditions: ${conditions.join(', ')}
      Allergies: ${allergies}
      Medications: ${medications}
      Family History: ${familyHistory}
    `;

    // Default appointment time
    const startDate = new Date();
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1 hour duration

    try {
      const authClient = await getAuthenticatedClient();
      const createdEvent = await createEvent(authClient, startDate.toISOString(), endDate.toISOString(), eventTitle, eventDescription);
      
      res.status(200).json({ message: 'Appointment booked successfully!', event: createdEvent });
    } catch (error) {
      res.status(500).json({ error: 'Error booking the appointment', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
