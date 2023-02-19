import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [startupInput, setStartupInput] = useState("");
  // const [openaiApiKey, setOpenaiApiKey] = useState("");
  const [result, setResult] = useState();
  const [desc, setDesc] = useState("");

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startup: startupInput,
        desc: desc,
      }),
    });
    const data = await response.json();
    setResult(data.result);
    setStartupInput("");
  }

  return (
    <div>
      <Head>
        <title>Startup Name Generator | OpenAI</title>
        <link rel="icon" href="/shuttle.png" />
      </Head>

      <main className={styles.main}>
        <img src="/shuttle.png" className={styles.icon} />
        <h3>Name my Genz startup</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="startup"
            placeholder="Enter a startup domain"
            value={startupInput}
            onChange={(e) => setStartupInput(e.target.value)}
          />
          <input
            type="text"
            name="description"
            placeholder="Enter a description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
      <footer className={styles.footer}>
        Made with 💘 by{" "}
        <a href="https://twitter.com/RoyDevelops">Snehendu Roy</a>
      </footer>
    </div>
  );
}
