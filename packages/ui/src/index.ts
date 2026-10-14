/**
 * IEI Portal design tokens — ported from
 * "IEI Kuwait Community Portal.html" <style> + iei-kuwait-web site.css
 * Navy/brass drafting-sheet theme. Single source for web (Tailwind) + mobile (NativeWind).
 */
export const tokens = {
  color: {
    paper: "#F1F2F5",
    surface: "#FFFFFF",
    sunk: "#E6E8EE",
    line: "#D3D7E2",
    ink: "#0F1A3B",
    ink2: "#3A4566",
    ink3: "#66708C",
    seal: "#2233A6",
    brass: "#A87A1E",
    brassHi: "#D6AE55",
    navy: "#0B1533",
    navy2: "#13204A",
    onNavy: "#EEF0F7",
    ok: "#1E7A4E",
    warn: "#A35C0A",
    bad: "#B42335",
  },
  font: {
    display: '"Gloock","Iowan Old Style",Georgia,serif',
    body: '"Figtree","Segoe UI",system-ui,sans-serif',
    mono: '"JetBrains Mono",ui-monospace,Menlo,Consolas,monospace',
    black: '"Cloister","Old English Text MT",Georgia,serif',
  },
  radius: { sm: 8, md: 10, lg: 18, pill: 999 },
  wrap: 1180,
} as const;

export const routes24 = [
  "home","about","committee","events","archive","gallery","wings",
  "membership","apply","track","renew","amie","sponsor","corporate",
  "community","contact","desk","search","jobs","employers","my",
  "news","library","verify",
] as const;
