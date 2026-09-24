export type Tone = "purple" | "amber";

export const TONES: Record<
  Tone,
  {
    solid: string;
    bannerBg: string;
    blob: string;
    inputFocus: string;
    otpFocus: string;
    link: string;
    iconBox: string;
  }
> = {
  purple: {
    solid: "bg-brand hover:bg-brand-dark",
    bannerBg: "bg-brand",
    blob: "bg-brand2/40",
    inputFocus: "focus:border-brand focus:ring-brand/15",
    otpFocus: "focus:border-brand focus:ring-brand/25",
    link: "text-brand",
    iconBox: "bg-brand-light text-brand",
  },
  amber: {
    solid: "bg-accent hover:bg-accent-dark",
    bannerBg: "bg-accent",
    blob: "bg-amber-400/40",
    inputFocus: "focus:border-accent focus:ring-accent/15",
    otpFocus: "focus:border-accent focus:ring-accent/25",
    link: "text-accent",
    iconBox: "bg-accent-light text-accent",
  },
};
