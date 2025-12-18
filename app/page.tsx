"use client";

import { useEffect, useState } from "react";
import { fetchExampleMessage } from "../services/example/example.service";

export default function Home() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchExampleMessage()
      .then((data) => setMessage(data.message))
      .catch((err) => setMessage("Error: " + err.message));
  }, []);

  return <div>Welcome - {message} </div>;
}
