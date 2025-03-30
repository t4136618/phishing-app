import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
      <div>
        <Head>
          <title>Phishing Tracker</title>
        </Head>
        <main>
          <h1>Email Tracking System</h1>
            <Link href="/phishing-sender">Send phishing emails</Link>
        </main>
      </div>
  );
}
