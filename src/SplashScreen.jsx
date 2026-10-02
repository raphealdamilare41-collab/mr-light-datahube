import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home");
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        textAlign: "center",
        background: "rgba(255,255,255,0.95)",
        borderRadius: "24px",
        padding: "30px 20px",
        boxShadow: "0 15px 35px rgba(0,0,0,0.25)"
      }}>
        <img src="/mr light logo.jpeg" alt="mr light logo" style={{ width: "42vw", maxWidth: "220px", marginBottom: "12px" }} />
        <h1 style={{ margin: "0 0 8px", color: "#111827", fontSize: "1.7rem" }}>Mr Light DataHub</h1>
        <p style={{ margin: "0 0 16px", color: "#4b5563", fontSize: "0.95rem" }}>
          Fast data, best rates, and instant delivery for all networks.
        </p>

        <div style={{ height: "8px", background: "#e5e7eb", borderRadius: "999px", overflow: "hidden", margin: "0 auto 12px", width: "90%" }}>
          <div style={{ height: "100%", width: "70%", background: "linear-gradient(90deg, #f59e0b, #2563eb)", borderRadius: "999px" }} />
        </div>

        <p style={{ margin: 0, color: "#2563eb", fontWeight: 700 }}>Loading your experience...</p>
      </div>
    </div>
  );
}

export default SplashScreen;