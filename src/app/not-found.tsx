import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        color: "#e8e8e8",
        fontFamily: "var(--font-body)",
      }}
    >
      <h1 style={{ fontSize: "3rem", color: "#d4a843", marginBottom: "16px" }}>
        404
      </h1>
      <p style={{ marginBottom: "24px" }}>Page Not Found</p>
      <Link
        href="/en"
        style={{ color: "#d4a843", textDecoration: "underline" }}
      >
        Back to Home
      </Link>
    </div>
  );
}
