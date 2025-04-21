import { useState } from 'react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    whatsappNumber: '',
    complaint: '',
    actionsTaken: '',
    conditions: [],
    allergies: '',
    medications: '',
    familyHistory: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        conditions: [...formData.conditions, name],
      });
    } else {
      setFormData({
        ...formData,
        conditions: formData.conditions.filter((condition) => condition !== name),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/calendar', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (response.ok) {
      alert('Appointment successfully booked!');
    } else {
      alert('Error booking the appointment');
    }
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name*</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email Address*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone*</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age*</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>WhatsApp Number*</label>
          <input
            type="text"
            name="whatsappNumber"
            value={formData.whatsappNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>What’s your complaint and how long has this lasted?*</label>
          <textarea
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>What have you done about this situation so far?*</label>
          <textarea
            name="actionsTaken"
            value={formData.actionsTaken}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Kindly check if you have any of the following conditions:</label>
          <div>
            {['Hypertension', 'Diabetes', 'HIV', 'Hepatitis', 'Asthma', 'Sickle Cell', 'Tuberculosis', 'None'].map((condition) => (
              <div key={condition}>
                <input
                  type="checkbox"
                  name={condition}
                  onChange={handleCheckboxChange}
                />
                <label>{condition}</label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label>Are you allergic to any drug or food? e.g groundnut, egg, penicillin, etc*</label>
          <input
            type="text"
            name="allergies"
            value={formData.allergies}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Medications or products currently being used. Add images if available*</label>
          <input
            type="text"
            name="medications"
            value={formData.medications}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Give a brief family history with regards to your condition, if yes, who?*</label>
          <textarea
            name="familyHistory"
            value={formData.familyHistory}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default AppointmentForm;
