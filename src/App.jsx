import { useState } from "react";
import LandingPage from "./components/LandingPage.jsx";
import { PWAInstallBanner, PWAUpdateBanner, OfflineToast } from "./components/PWABanners.jsx";
import { usePWAInstall } from "./hooks/usePWAInstall.js";

export default function App() {
  const { isInstalled, isIOS, showBanner, updateAvailable, offlineReady, install, dismissBanner, applyUpdate } = usePWAInstall();
  const [updateDismissed, setUpdateDismissed] = useState(false);
  const [offlineDismissed, setOfflineDismissed] = useState(false);

  return (
    <>
      <LandingPage />
      {showBanner && !isInstalled && <PWAInstallBanner isIOS={isIOS} onInstall={install} onDismiss={dismissBanner} />}
      {updateAvailable && !updateDismissed && <PWAUpdateBanner onUpdate={applyUpdate} onDismiss={() => setUpdateDismissed(true)} />}
      {offlineReady && !offlineDismissed && <OfflineToast onDismiss={() => setOfflineDismissed(true)} />}
    </>
  );
}
