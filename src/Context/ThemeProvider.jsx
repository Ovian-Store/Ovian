// src/Context/ThemeProvider.jsx
import React from "react";

export function ThemeProvider({ children }) {
  // No global opaque background here — only provide theme context if needed
  return <div className="min-h-screen">{children}</div>;
}
