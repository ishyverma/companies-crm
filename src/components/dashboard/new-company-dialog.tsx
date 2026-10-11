"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { normalizeDomain, type NewCompanyInput } from "@/lib/companies-store";
import { CATEGORIES, CONNECTIONS, type Category, type Connection } from "@/lib/types";
import { PRESS } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { CONNECTION_META } from "./connection-badge";

const DOMAIN_RE = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/;

interface FormState {
  name: string;
  domain: string;
  connection: Connection;
  category: Category;
  interaction: string;
  description: string;
}

const EMPTY: FormState = { name: "", domain: "", connection: "good", category: "B2B", interaction: "", description: "" };
type Errors = { name?: string; domain?: string };

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (input: NewCompanyInput) => void;
}

export function NewCompanyDialog({ open, onOpenChange, onSubmit }: Props) {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key === "name" || key === "domain") setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function handleOpenChange(next: boolean) {
    if (!next) {
      setForm(EMPTY);
      setErrors({});
    }
    onOpenChange(next);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = form.name.trim();
    const domain = normalizeDomain(form.domain);
    const next: Errors = {};
    if (name.length < 2) next.name = "Enter the company name";
    if (!DOMAIN_RE.test(domain)) next.domain = "Enter a valid domain, like acme.com";
    if (next.name || next.domain) {
      setErrors(next);
      return;
    }
    onSubmit({
      name,
      domain,
      connection: form.connection,
      category: form.category,
      interaction: form.interaction || null,
      description: form.description.trim(),
    });
    handleOpenChange(false);
  }

  const field = "grid gap-1.5";
  const input = "h-8 text-[13px] md:text-[13px]";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="gap-5 sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle className="text-[15px]">New company</DialogTitle>
          <DialogDescription className="text-[13px]">Add a company to your records.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className={field}>
            <Label htmlFor="nc-name" className="text-[13px]">Company name</Label>
            <Input
              id="nc-name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Acme Inc."
              autoComplete="off"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "nc-name-err" : undefined}
              className={input}
            />
            {errors.name && <p id="nc-name-err" className="text-xs text-destructive">{errors.name}</p>}
          </div>

          <div className={field}>
            <Label htmlFor="nc-domain" className="text-[13px]">Domain</Label>
            <Input
              id="nc-domain"
              value={form.domain}
              onChange={(e) => set("domain", e.target.value)}
              placeholder="acme.com"
              autoComplete="off"
              inputMode="url"
              aria-invalid={!!errors.domain}
              aria-describedby={errors.domain ? "nc-domain-err" : undefined}
              className={input}
            />
            {errors.domain && <p id="nc-domain-err" className="text-xs text-destructive">{errors.domain}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className={field}>
              <Label className="text-[13px]">Connection</Label>
              <Select value={form.connection} onValueChange={(v) => set("connection", v as Connection)}>
                <SelectTrigger className="h-8 w-full text-[13px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CONNECTIONS.map((c) => (
                    <SelectItem key={c} value={c} className="text-[13px]">{CONNECTION_META[c].label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className={field}>
              <Label className="text-[13px]">Category</Label>
              <Select value={form.category} onValueChange={(v) => set("category", v as Category)}>
                <SelectTrigger className="h-8 w-full text-[13px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c} className="text-[13px]">{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className={field}>
            <Label htmlFor="nc-interaction" className="text-[13px]">Last interaction <span className="text-[var(--fg-4)]">(optional)</span></Label>
            <Input
              id="nc-interaction"
              type="date"
              value={form.interaction}
              onChange={(e) => set("interaction", e.target.value)}
              className={input}
            />
          </div>

          <div className={field}>
            <Label htmlFor="nc-desc" className="text-[13px]">Description <span className="text-[var(--fg-4)]">(optional)</span></Label>
            <Textarea
              id="nc-desc"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              className="resize-none text-[13px] md:text-[13px]"
            />
          </div>

          <DialogFooter className="gap-2 sm:gap-2">
            <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className={cn(PRESS, "h-8 text-[13px]")}>
              Cancel
            </Button>
            <Button type="submit" className={cn(PRESS, "h-8 text-[13px]")}>Add company</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
