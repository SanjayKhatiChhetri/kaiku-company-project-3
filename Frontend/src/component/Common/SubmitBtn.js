import React from "react";
import { Toaster, toast } from 'sonner'

export default function SubmitBtn({ onSubmit }) {

const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Tiedosto'}), 1000));

const notify = () => toast.promise(promise, {
    loading: 'Lähetään...',
    success: (data) => {
      return `${data.name} lähetetty`;
    },
    error: 'Error',
  });

  return (
    <>
      <div
        className="Report-box"
        onClick={() => {
          notify();
          onSubmit();
        }}
      >
        <Toaster />
        <button type="submit" className="Report-btn" value="Report">
          Lähetä
        </button>
      </div>
    </>
  );
}
