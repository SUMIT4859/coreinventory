import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body>

        <div style={{display:"flex",height:"100vh"}}>

          {/* SIDEBAR */}

          <div style={{
            width:220,
            background:"#111",
            color:"white",
            padding:20
          }}>

            <h2 style={{marginBottom:30}}>CoreInventory</h2>

            <a
              href="/dashboard"
              style={{
                display:"block",
                padding:"10px 0",
                color:"white",
                textDecoration:"none"
              }}
            >
              Dashboard
            </a>

            <a
              href="/products"
              style={{
                display:"block",
                padding:"10px 0",
                color:"white",
                textDecoration:"none"
              }}
            >
              Products
            </a>

          </div>


          {/* MAIN CONTENT */}

          <div style={{
            flex:1,
            padding:30,
            background:"#f5f7fb"
          }}>

            {children}

          </div>

        </div>

      </body>
    </html>
  );
}