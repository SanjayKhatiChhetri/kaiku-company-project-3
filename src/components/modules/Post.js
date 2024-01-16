import React from "react";

export default function Post({ onSubmit }) {
  return (
    <>
      <div className="Report-box">
        <button
          type="submit"
          className="Report-btn"
          value="Report"
          onClick={onSubmit}
        >
          Lähetä
        </button>
      </div>
    </>
  );
}
