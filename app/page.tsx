'use client';
import { useState } from "react";
import ContactForm from "../components/ContactForm";
import SlotPicker from "../components/SlotPicker";

export default function Page() {
  const [formData, setFormData] = useState<any>(null);

  return (
    <div className="p-8">
      {!formData ? (
        <ContactForm onSuccess={setFormData} />
      ) : (
        <SlotPicker formData={formData} />
      )}
    </div>
  );
}
