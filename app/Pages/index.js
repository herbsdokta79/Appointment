import { useState } from 'react';
import styles from '../styles/Form.module.css';

export default function Home() {
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientAge, setPatientAge] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [complaint, setComplaint] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medications, setMedications] = useState('');
  const [status, setStatus] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [medicalConditions, setMedicalConditions] = useState([]);

  const medicalOptions = [
    'Hypertension',
    'Diabetes',
    'HIV',
    'Hepatitis',
    'Asthma',
    'Sickle Cell',
    'Tuberculosis',
    'None',
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/calendar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        patientName,
        patientEmail,
        patientPhone,
        patientAge,
        whatsappNumber,
        complaint,
        medicalHistory,
        allergies,
        medications,
        medicalConditions,
        appointmentDate,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setStatus('Appointment booked successfully');
    } else {
      setStatus(`Error: ${result.message}`);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setMedicalConditions((prevConditions) => {
      if (checked) {
        return [...prevConditions, value];
      } else {
        return prevConditions.filter((condition) => condition !== value);
      }
    });
  };

  return (
    <div className={styles.form-container}>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Full Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={patientEmail}
          onChange={(e) => setPatientEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Your Phone"
          value={patientPhone}
          onChange={(e) => setPatientPhone(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Your Age"
          value={patientAge}
          onChange={(e) => setPatientAge(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Your WhatsApp Number"
          value={whatsappNumber}
          onChange={(e) => setWhatsappNumber(e.target.value)}
          required
        />
        <textarea
          placeholder="Your Complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          required
        />
        <textarea
          placeholder="What have you done about this situation so far?"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          required
        />
        <textarea
          placeholder="Are you allergic to any drug or food?"
          value={allergies}
          onChange={(e) => setAllergies(e.target.value)}
          required
        />
        <textarea
          placeholder="Medications or products you are currently using"
          value={medications}
          onChange={(e) => setMedications(e.target.value)}
        />
        <div>
          <h4>Medical Conditions (select all that apply):</h4>
          {medicalOptions.map((condition) => (
            <label key={condition}>
              <input
                type="checkbox"
                value={condition}
                onChange={handleCheckboxChange}
              />
              {condition}
            </label>
          ))}
        </div>
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>

      {status && <p className={status.includes('Error') ? styles.statusError : styles.statusMessage}>{status}</p>}
    </div>
  );
}
