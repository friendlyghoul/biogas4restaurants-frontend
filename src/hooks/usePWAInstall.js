import { useState, useEffect } from "react";

export function usePWAInstall() {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
      return;
    }
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(ios);

    const handler = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
      setTimeout(() => setShowBanner(true), 4000);
    };
    window.addEventListener("beforeinstallprompt", handler);

    if (ios && !localStorage.getItem("pwa-ios-dismissed")) {
      setTimeout(() => setShowBanner(true), 6000);
    }

    const onUpdate = () => setUpdateAvailable(true);
    const onOffline = () => setOfflineReady(true);
    window.addEventListener("pwa-update-available", onUpdate);
    window.addEventListener("pwa-offline-ready", onOffline);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
      window.removeEventListener("pwa-update-available", onUpdate);
      window.removeEventListener("pwa-offline-ready", onOffline);
    };
  }, []);

  const install = async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === "accepted") { setIsInstalled(true); setShowBanner(false); }
    setInstallPrompt(null);
  };

  const dismissBanner = () => {
    setShowBanner(false);
    if (isIOS) localStorage.setItem("pwa-ios-dismissed", "1");
  };

  const applyUpdate = () => { if (window.__pwaUpdateSW) window.__pwaUpdateSW(true); };

  return { installPrompt, isInstalled, isIOS, showBanner, updateAvailable, offlineReady, install, dismissBanner, applyUpdate };
}
