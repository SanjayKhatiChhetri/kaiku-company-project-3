import React, { useEffect } from "react";
import Utility from "../component/Utility";

export default function TotalPostCounter({ count }) {
  useEffect(() => {}, [count]);
  return <p> Taustatehtävien määrä: {count}</p>;
}
