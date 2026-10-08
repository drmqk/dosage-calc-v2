import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Smartphone, Download, X, CheckCircle, ExternalLink, ShieldCheck, WifiOff, FileCheck, ArrowDownToLine } from 'lucide-react';
import { AppIcon } from './AppIcon';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [appUrl, setAppUrl] = useState<string>('');
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://ais-pre-xmnmqid7joxexqdgzcpoap-565632373285.europe-west3.run.app';
    setAppUrl(currentUrl);

    QRCode.toDataURL(currentUrl, {
      width: 240,
      margin: 2,
      color: {
        dark: '#00474b',
        light: '#ffffff'
      }
    })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error('Failed to generate QR code', err));
  }, []);

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    setIsInstalling(true);
    try {
      const outcome = await install();
      if (outcome) {
        onClose();
      }
    } finally {
      setIsInstalling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#111827] text-slate-100 rounded-2xl border border-slate-800 max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1a]">
          <div className="flex items-center gap-3">
            <AppIcon size={38} />
            <div>
              <h3 className="text-base font-bold text-white font-display flex items-center gap-2">
                Download Dosage Calc Android APK
              </h3>
              <p className="text-xs text-slate-400">
                Official signed Android package (.apk) for phones & tablets
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
          {/* PRIMARY DOWNLOAD CARD */}
          <div className="p-5 rounded-xl bg-gradient-to-br from-teal-950/70 via-slate-900 to-slate-900 border-2 border-teal-500/70 shadow-lg space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-white text-base font-display">
                    dosage-calc.apk
                  </span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-teal-500 text-slate-950 rounded-md">
                    READY TO DOWNLOAD
                  </span>
                </div>
                <div className="text-[11px] text-teal-300 font-mono">
                  Package: com.radcontrast.dosagecalc · Size: ~93 KB · v1.0.0
                </div>
              </div>

              <a
                href="/dosage-calc.apk"
                download="dosage-calc.apk"
                className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 shrink-0"
              >
                <ArrowDownToLine className="w-4 h-4 stroke-[2.5]" />
                <span>Download APK File</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-slate-400">
              <span className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Signature (v1, v2, v3 Schemes)
              </span>
              <span>·</span>
              <span>Compatible with Android 5.0+ to Android 15</span>
              <span>·</span>
              <span>Offline-ready</span>
            </div>
          </div>

          {/* Quick Steps to Install on Android */}
          <div className="p-4 bg-[#0a0f1a] rounded-xl border border-slate-800 space-y-2">
            <span className="font-bold text-white font-display text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-teal-400" />
              How to Install the APK on Your Android Device
            </span>
            <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
              <li>
                Click <strong>"Download APK File"</strong> above (or download on your phone).
              </li>
              <li>
                Open the downloaded <code className="text-teal-400 font-mono">dosage-calc.apk</code> file from your notification bar or <strong>Downloads</strong> folder.
              </li>
              <li>
                If Android shows <em>"For your security, your phone is not allowed to install unknown apps"</em>, tap <strong>Settings</strong> and switch on <strong>"Allow from this source"</strong>.
              </li>
              <li>
                Tap <strong>"Install"</strong>. The app will install with the Dosage Calc icon into your app drawer!
              </li>
            </ol>
          </div>

          {/* Option 2: QR Code Scan for Testing directly on Phone */}
          <div className="p-4 bg-[#0a0f1a] rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-white font-display text-sm flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-teal-400" />
                Scan to Download or Test from Mobile Phone
              </span>
              <span className="font-mono text-[10px] text-teal-400 bg-teal-950/80 px-2 py-0.5 rounded border border-teal-800/40">
                Camera QR Scan
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
              <div className="p-2.5 bg-white rounded-xl shadow-inner shrink-0">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Scan with phone camera"
                    className="w-32 h-32 rounded-lg object-contain"
                  />
                ) : (
                  <div className="w-32 h-32 bg-slate-200 animate-pulse rounded-lg flex items-center justify-center text-slate-400">
                    Generating...
                  </div>
                )}
              </div>

              <div className="space-y-2 leading-relaxed">
                <p className="text-slate-200 font-medium text-[11px]">
                  Point your phone's camera at this QR code to open the app on your mobile browser.
                </p>
                <p className="text-slate-400 text-[11px]">
                  From your phone, you can either tap the <strong>"Download APK"</strong> button to get the <code className="text-teal-400 font-mono">dosage-calc.apk</code> directly, or use Chrome's instant 1-tap <strong>WebAPK</strong> installer.
                </p>
                {isInstallable && (
                  <button
                    onClick={handleInstallClick}
                    disabled={isInstalling}
                    className="mt-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 font-bold text-white text-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{isInstalling ? 'Installing...' : 'Direct WebAPK 1-Tap Install'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-800 bg-[#0a0f1a] flex items-center justify-between">
          <span className="text-[11px] text-slate-500 font-mono">
            SHA256 Signed · Target SDK 33
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
