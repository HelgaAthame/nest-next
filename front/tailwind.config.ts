import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      current: "currentColor",
      transparent: "transparent",
      white: "#FFFFFF",
      black: "#1C2434",
      red: "#FB5454",
      "black-2": "#010101",
      body: "#64748B",
      bodydark: "#AEB7C0",
      bodydark1: "#DEE4EE",
      bodydark2: "#8A99AF",
      primary: "#3C50E0",
      secondary: "#80CAEE",
      stroke: "#E2E8F0",
      gray: "#EFF4FB",
      graydark: "#333A48",
      "gray-2": "#F7F9FC",
      "gray-3": "#FAFAFA",
      whiten: "#F1F5F9",
      whiter: "#F5F7FD",
      boxdark: "#24303F",
      "boxdark-2": "#1A222C",
      strokedark: "#2E3A47",
      "form-strokedark": "#3d4d60",
      "form-input": "#1d2a39",
      "meta-1": "#DC3545",
      "meta-2": "#EFF2F7",
      "meta-3": "#10B981",
      "meta-4": "#313D4A",
      "meta-5": "#259AE6",
      "meta-6": "#FFBA00",
      "meta-7": "#FF6766",
      "meta-8": "#F0950C",
      "meta-9": "#E5E7EB",
      "meta-10": "#0FADCF",
      success: "#219653",
      danger: "#D34053",
      warning: "#FFA70B",
      darkviolet: "#9400D3",
      indigo: "#4b0082",
      darkmagenta: "#8B008B",
      purple: "#800080",
      rebeccapurple: "#663399",
      purpletext: "#7C27A0",
    },
  },
};
export default config;
