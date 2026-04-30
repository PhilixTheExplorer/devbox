"use client";

import { createContext, useContext, useEffect, useState } from "react";

function useShellTweaksState() {
  const [tweaks, setTweaks] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent<{ type?: string }>) => {
      if (event.data?.type === "__activate_edit_mode") {
        setTweaks(true);
      }
      if (event.data?.type === "__deactivate_edit_mode") {
        setTweaks(false);
      }
    };

    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const toggleTweaks = () => setTweaks((value) => !value);
  const closeTweaks = () => {
    setTweaks(false);
    window.parent.postMessage({ type: "__edit_mode_dismissed" }, "*");
  };

  return {
    tweaks,
    toggleTweaks,
    closeTweaks,
  };
}

type ShellTweaksContextType = ReturnType<typeof useShellTweaksState>;

const ShellTweaksContext = createContext<ShellTweaksContextType | null>(null);

export function ShellTweaksProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const tweaksState = useShellTweaksState();

  return (
    <ShellTweaksContext.Provider value={tweaksState}>
      {children}
    </ShellTweaksContext.Provider>
  );
}

export function useShellTweaks() {
  const context = useContext(ShellTweaksContext);
  if (!context) {
    throw new Error("useShellTweaks must be used within ShellTweaksProvider");
  }

  return context;
}
