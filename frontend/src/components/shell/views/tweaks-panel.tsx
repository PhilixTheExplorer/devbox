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
    <div className="animate-fade-in fixed bottom-panel-offset-y right-panel-offset-x z-popover w-tweaks-panel rounded-sm border border-border bg-surface p-4 shadow-xl">
      <div className="flex items-center gap-2 mb-3.5 justify-between">
        <span className="text-ui-xs font-semibold tracking-widest inline-flex items-center gap-1.5">
          <TuneIcon />
          Tweaks
        </span>
        <button
          type="button"
          onClick={closeTweaks}
          className="bg-transparent border-none cursor-pointer text-muted text-lg leading-none font-inherit"
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
                className={`w-color-swatch h-color-swatch rounded-sm cursor-pointer transition-colors duration-100 border-2 ${
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
