"use client";

import { PaletteIcon, ThemePanelIcon, TuneIcon } from "@/components/icons";
import { useShellThemeContext } from "@/components/shell/contexts/theme-context";
import { useShellTweaks } from "@/components/shell/contexts/tweaks-context";
import { Btn, SectionLabel } from "@/components/ui";
import { ACCENT_PRESETS } from "@/config/theme-presets";

export function TweaksPanel() {
  const { theme, setTheme, accentIdx, setAccentIdx, mounted } =
    useShellThemeContext();
  const { closeTweaks } = useShellTweaks();

  // Return null or placeholder before mounting to avoid hydration mismatch
  if (!mounted) return null;

  return (
    <div className="animate-fade-in fixed bottom-[38px] right-3 bg-surface border border-border rounded-[3px] p-4 w-[220px] shadow-[0_12px_40px_rgba(0,0,0,0.4)] z-[1000]">
      <div className="flex items-center gap-2 mb-[14px] justify-between">
        <span className="text-[11px] font-semibold tracking-[1px] inline-flex items-center gap-1.5">
          <TuneIcon />
          Tweaks
        </span>
        <button
          type="button"
          onClick={closeTweaks}
          className="bg-none border-none cursor-pointer text-muted text-[18px] leading-none font-inherit"
        >
          &times;
        </button>
      </div>
      <div className="flex flex-col gap-3.5">
        <div className="flex flex-col gap-1.5">
          <SectionLabel>
            <span className="inline-flex items-center gap-1.5">
              <ThemePanelIcon />
              <span>theme</span>
            </span>
          </SectionLabel>
          <div className="flex items-center gap-1">
            {(["dark", "light"] as const).map((t) => (
              <Btn
                key={t}
                size="sm"
                variant={theme === t ? "accent" : "default"}
                onClick={() => setTheme(t)}
              >
                <span>{t === "dark" ? "☾" : "☀"}</span>
                <span>{t}</span>
              </Btn>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <SectionLabel>
            <span className="inline-flex items-center gap-1.5">
              <PaletteIcon />
              <span>accent color</span>
            </span>
          </SectionLabel>
          <div className="flex gap-1.5 flex-wrap">
            {ACCENT_PRESETS.map((p, i) => (
              <button
                type="button"
                key={p.name}
                title={p.name}
                aria-label={`set ${p.name} accent`}
                onClick={() => setAccentIdx(i)}
                className={`w-7 h-7 rounded-sm cursor-pointer transition-colors duration-100 border-2 ${
                  i === accentIdx ? "border-text" : "border-transparent"
                }`}
                style={{ background: theme === "dark" ? p.dark : p.light }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
