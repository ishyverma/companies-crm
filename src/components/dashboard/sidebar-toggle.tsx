import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CTL } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function SidebarToggle({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={cn(CTL, "size-6 rounded-lg text-[var(--fg-2)] hover:text-[var(--fg)]")}
    >
      <PanelLeft className="size-3.5" strokeWidth={1.5} />
    </Button>
  );
}
