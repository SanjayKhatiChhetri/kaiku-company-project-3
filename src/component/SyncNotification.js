import React from "react";
import Utility from "../component/Utility";

export default function SyncNotification({ count }) {
  useEffect(() => {}, [count]);
  return (
    <div>
      <h1>{count} Posts in offline are synced successfully</h1>
    </div>
  );
}
