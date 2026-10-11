"use client";

import { CircleCheck, Info, Loader2, OctagonX, TriangleAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheck className="size-4 text-[var(--tag-saas)]" strokeWidth={1.75} />,
        info: <Info className="size-4 text-[var(--brand)]" strokeWidth={1.75} />,
        warning: <TriangleAlert className="size-4 text-[var(--tag-software)]" strokeWidth={1.75} />,
        error: <OctagonX className="size-4 text-[var(--tag-collaboration)]" strokeWidth={1.75} />,
        loading: <Loader2 className="size-4 animate-spin" strokeWidth={1.75} />,
      }}
      toastOptions={{
        classNames: {
          toast: "font-[450] text-[13px] shadow-[0_8px_30px_rgb(0_0_0/0.12)]",
        },
      }}
      style={
        {
          "--normal-bg": "var(--surface)",
          "--normal-text": "var(--fg)",
          "--normal-border": "var(--ring-line)",
          "--border-radius": "12px",
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
