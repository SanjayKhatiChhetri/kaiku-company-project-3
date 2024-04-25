import React, { useEffect } from 'react'
import Utility from "../component/Utility";


export default function TotalPostCounter({count}) {
  useEffect(() => {
  }, [count])
  return (
    <h1>Total post in offline are: {count}</h1>
  )
}
