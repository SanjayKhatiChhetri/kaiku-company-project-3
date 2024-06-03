import React from "react";

export default function SyncedPost({ count }) {
  return (
    <div
      style={{
        width: "fit-content",
        border: " 1px #1fe700 solid",
        background: "#1fe700",
        padding: "5px 10px",
        borderRadius: "10px",
        marginBottom: "30px",
      }}
    >
      <p style={{ color: "white", fontSize: "20px", fontWeight: "normal" }}>
        Number of Post Synced after online: {count}
      </p>
    </div>
  );
}
