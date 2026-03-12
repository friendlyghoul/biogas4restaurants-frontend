const S = {
  wrap: {
    position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
    zIndex: 9999, width: "min(480px, calc(100vw - 32px))",
    background: "linear-gradient(135deg, #0d2b15, #1a3d22)",
    border: "1px solid rgba(82,183,136,0.35)", borderRadius: 20,
    padding: "20px 24px", boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
    display: "flex", alignItems: "flex-start", gap: 16,
    animation: "slideUp 0.4s cubic-bezier(0.34,1.56,0.64,1)",
  },
  icon: {
    width: 48, height: 48, borderRadius: 12, flexShrink: 0,
    background: "rgba(82,183,136,0.15)", border: "1px solid rgba(82,183,136,0.25)",
    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24,
  },
  title: { fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 16, color: "#e8f5e9", marginBottom: 4 },
  sub: { fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "rgba(232,245,233,0.65)", lineHeight: 1.5, marginBottom: 14 },
  btnPrimary: { background: "#2d6a4f", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnGhost: { background: "transparent", color: "rgba(232,245,233,0.45)", border: "1px solid rgba(232,245,233,0.12)", borderRadius: 10, padding: "9px 18px", fontFamily: "'DM Sans', sans-serif", fontSize: 13, cursor: "pointer" },
  close: { background: "transparent", border: "none", color: "rgba(232,245,233,0.35)", cursor: "pointer", fontSize: 18, padding: 4, flexShrink: 0 },
};

export function PWAInstallBanner({ isIOS, onInstall, onDismiss }) {
  return (
    <div style={S.wrap}>
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(40px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
      <div style={S.icon}>🌿</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={S.title}>Install Biogas4Restaurants</div>
        {isIOS ? (
          <div style={{ ...S.sub, marginBottom: 0 }}>
            Tap <strong style={{ color: "#52b788" }}>Share</strong> then{" "}
            <strong style={{ color: "#52b788" }}>"Add to Home Screen"</strong> to install and use offline.
          </div>
        ) : (
          <>
            <div style={S.sub}>Add to home screen for offline access, faster loading, and instant language switching.</div>
            <div style={{ display: "flex", gap: 10 }}>
              <button style={S.btnPrimary} onClick={onInstall}>↓ Install App</button>
              <button style={S.btnGhost} onClick={onDismiss}>Not now</button>
            </div>
          </>
        )}
      </div>
      <button style={S.close} onClick={onDismiss}>✕</button>
    </div>
  );
}

export function PWAUpdateBanner({ onUpdate, onDismiss }) {
  return (
    <div style={{ position: "fixed", top: 80, right: 24, zIndex: 9999, background: "#1a3d22", border: "1px solid rgba(82,183,136,0.3)", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12, maxWidth: 300, boxShadow: "0 12px 40px rgba(0,0,0,0.5)", animation: "fadeIn 0.3s ease" }}>
      <style>{`@keyframes fadeIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <span style={{ fontSize: 20 }}>🔄</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, color: "#e8f5e9", marginBottom: 2 }}>Update available</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "rgba(232,245,233,0.5)" }}>New content ready</div>
      </div>
      <button onClick={onUpdate} style={{ background: "#2d6a4f", color: "#fff", border: "none", borderRadius: 8, padding: "6px 14px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, cursor: "pointer" }}>Reload</button>
      <button onClick={onDismiss} style={{ background: "transparent", border: "none", color: "rgba(232,245,233,0.3)", cursor: "pointer", fontSize: 16 }}>✕</button>
    </div>
  );
}

export function OfflineToast({ onDismiss }) {
  return (
    <div style={{ position: "fixed", bottom: 24, left: 24, zIndex: 9999, background: "#1a3d22", border: "1px solid rgba(82,183,136,0.2)", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 24px rgba(0,0,0,0.4)", animation: "fadeIn 0.3s ease" }}>
      <span>✅</span>
      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: "#b7e4c7" }}>Ready to work offline</span>
      <button onClick={onDismiss} style={{ background: "none", border: "none", color: "rgba(232,245,233,0.4)", cursor: "pointer", fontSize: 14, marginLeft: 4 }}>✕</button>
    </div>
  );
}
