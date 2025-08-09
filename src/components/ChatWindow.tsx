import { OttosChatbot } from "./OttosChatbot";

interface ChatWindowProps {
  onClose: () => void;
}

export default function ChatWindow({ onClose }: ChatWindowProps) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "90px",
        right: "20px",
        width: "380px",
        height: "500px",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#6b46c1",
          color: "#fff",
          padding: "12px",
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        OttoBot 🍫
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
      </div>

      <div style={{ flex: 1 }}>
        <OttosChatbot />
      </div>
    </div>
  );
}
