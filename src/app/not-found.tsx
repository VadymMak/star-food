import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  return (
    <section
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "8rem",
          fontWeight: 700,
          color: "var(--gold)",
          lineHeight: 1,
          marginBottom: "16px",
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "2rem",
          marginBottom: "12px",
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: "var(--text-muted)",
          fontSize: "1.05rem",
          marginBottom: "30px",
          maxWidth: "400px",
        }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link href="/" className="btn btn-primary">
        <FaHome /> Back to Home
      </Link>
    </section>
  );
}