import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Javohir Sadullayev · Software Engineer & .NET Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#FFFDF8",
          backgroundImage:
            "radial-gradient(#1A1A1A 0.75px, transparent 0.75px), radial-gradient(#1A1A1A 0.75px, #FFFDF8 0.75px)",
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0, 15px 15px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#1A1A1A",
          border: "12px solid #1A1A1A",
          boxSizing: "border-box",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#FF6B5A",
                border: "3px solid #1A1A1A",
                borderRadius: "10px",
                boxShadow: "4px 4px 0 #1A1A1A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
                fontWeight: 900,
                color: "#1A1A1A",
              }}
            >
              JS
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 800,
                  letterSpacing: "-0.5px",
                }}
              >
                javohir<span style={{ color: "#FF6B5A" }}>.engineer</span>
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "1.5px",
                  textTransform: "uppercase",
                  color: "#666",
                }}
              >
                Tashkent, Uzbekistan
              </span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              padding: "8px 18px",
              backgroundColor: "#7BE0AD",
              border: "3px solid #1A1A1A",
              borderRadius: "999px",
              boxShadow: "3px 3px 0 #1A1A1A",
              fontSize: "14px",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            ● Available for Roles & Contracts
          </div>
        </div>

        {/* Main Center Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            marginTop: "10px",
          }}
        >
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-1.5px",
              lineHeight: 1.05,
              color: "#1A1A1A",
            }}
          >
            Javohir Sadullayev
          </div>
          <div
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#FF6B5A",
              lineHeight: 1.2,
            }}
          >
            Software Engineer & .NET Backend Developer
          </div>
          <div
            style={{
              fontSize: "20px",
              color: "#4A4A4A",
              maxWidth: "900px",
              lineHeight: 1.4,
            }}
          >
            Engineering high-throughput systems with C# / .NET 8, PostgreSQL, Redis,
            SignalR & Azure AI. PDP University CS Student.
          </div>
        </div>

        {/* Bottom Tags */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            borderTop: "3px solid #1A1A1A",
            paddingTop: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {[".NET 8", "C#", "ASP.NET Core", "PostgreSQL", "Redis", "SignalR", "AI Systems"].map(
              (tag) => (
                <div
                  key={tag}
                  style={{
                    padding: "6px 14px",
                    backgroundColor: "#FFE57F",
                    border: "2px solid #1A1A1A",
                    borderRadius: "6px",
                    boxShadow: "2px 2px 0 #1A1A1A",
                    fontSize: "14px",
                    fontWeight: 700,
                  }}
                >
                  {tag}
                </div>
              )
            )}
          </div>

          <div
            style={{
              fontSize: "15px",
              fontWeight: 800,
              color: "#1A1A1A",
            }}
          >
            Telegram: @dotnetda · GitHub: Sadullayev-Javohir
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
