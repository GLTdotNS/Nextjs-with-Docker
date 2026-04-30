"use client";

import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);

    const res = await fetch("/api/hello");
    const data = await res.json();

    setMessage(data.message);
    setLoading(false);
  };

  return (
    <main style={styles.container}>
      <button style={styles.button} onClick={fetchData}>
        {loading ? "Loading..." : "Fetch Hello"}
      </button>

      {message && <div style={styles.popup}>{message}</div>}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    fontFamily: "sans-serif",
  },
  button: {
    padding: "12px 20px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  popup: {
    marginTop: "20px",
    padding: "10px 15px",
    background: "black",
    color: "white",
    borderRadius: "8px",
  },
};