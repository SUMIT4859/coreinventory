import "./globals.css";
import LogoutButton from "./components/LogoutButton";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("loggedIn");
      window.location.href = "/";
    }
  };

  return (
    <html lang="en">
      <body>

        <div style={{ display: "flex" }}>

          {/* SIDEBAR */}

          <div
            style={{
              width: 220,
              background: "#111",
              color: "white",
              padding: 20,
              height: "100vh",
              position: "fixed",
              left: 0,
              top: 0
            }}
          >
            <h2 style={{ marginBottom: 30 }}>CoreInventory</h2>

            <a href="/dashboard" style={link}>Dashboard</a>
            <a href="/products" style={link}>Products</a>
            <a href="/receipts" style={link}>Receipts</a>
            <a href="/deliveries" style={link}>Delivery Orders</a>
            <a href="/adjustments" style={link}>Adjustments</a>
            <a href="/transfers" style={link}>Transfers</a>
            <a href="/history" style={link}>Stock History</a>

            {/* LOGOUT BUTTON */}

            <LogoutButton />

          </div>


          {/* MAIN CONTENT */}

          <div
            style={{
              marginLeft: 220,
              width: "100%",
              minHeight: "100vh",
              background: "#f5f7fb",
              padding: 40,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}
          >

            <div
              style={{
                width: "100%",
                maxWidth: 1100
              }}
            >
              {children}
            </div>

            <footer
              style={{
                marginTop: 40,
                padding: 20,
                textAlign: "center",
                width: "100%",
                maxWidth: 1100,
                color: "#666"
              }}
            >
              CoreInventory © 2026
            </footer>

          </div>

        </div>

      </body>
    </html>
  );
}

const link = {
  display: "block",
  padding: "10px 0",
  color: "white",
  textDecoration: "none"
};