"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { companies as seed } from "@/lib/data";
import { buildCompany, createCompany, listCompanies, type NewCompanyInput } from "@/lib/companies-store";
import type { Company } from "@/lib/types";

export const COMPANIES_KEY = ["companies"] as const;

export function useCompaniesQuery() {
  return useQuery({
    queryKey: COMPANIES_KEY,
    queryFn: listCompanies,
    initialData: seed,
    staleTime: Infinity,
  });
}

export function useCreateCompany() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: NewCompanyInput }) => createCompany(id, input),

    // optimistic: the row shows up immediately, no refresh
    onMutate: async ({ id, input }) => {
      await qc.cancelQueries({ queryKey: COMPANIES_KEY });
      const previous = qc.getQueryData<Company[]>(COMPANIES_KEY);
      qc.setQueryData<Company[]>(COMPANIES_KEY, (old = []) => [buildCompany(input, id), ...old]);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) qc.setQueryData(COMPANIES_KEY, ctx.previous);
      toast.error("Couldn't add the company. Try again.");
    },
    onSuccess: (company) => {
      qc.setQueryData<Company[]>(COMPANIES_KEY, (old = []) =>
        old.map((c) => (c.id === company.id ? company : c)),
      );
      toast.success(`${company.name} added`);
    },
  });
}
