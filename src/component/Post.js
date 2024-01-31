import React from "react";
import { Toaster, toast } from 'sonner'

export default function Post({ onSubmit }) {

const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Tiedosto' }), 2000));

const notify = () => toast.promise(promise, {
    loading: 'Lähetään...',
    success: (data) => {
      return `${data.name} lähetetty`;
    },
    error: 'Error',
  });

  return (
    <>
      <div className="Report-box">
        <Toaster />
        <button
          type="submit"
          className="Report-btn"
          value="Report"
          onClick={() =>{
          notify();
          onSubmit();
          }}>
          Lähetä
        </button>
      </div>
    </>
  );
}
