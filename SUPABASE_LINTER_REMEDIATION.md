# Supabase Database Linter — Remediation

**Use:** Fix Security Definer View and RLS Disabled errors reported by Supabase Database Linter.  
**Where:** Run the SQL below in **Supabase Dashboard → SQL Editor → New query**.  
**Ref:** [Supabase Database Linter](https://supabase.com/docs/guides/database/database-linter)

---

## 1. Security Definer Views (ERROR)

**Issue:** Views with `SECURITY DEFINER` run with the view owner’s permissions instead of the caller’s. Linter flags: `veto_log`, `seed_and_edge_submissions`, `active_authorizations`, `pipeline_trace`, `tsrc_health_check`.

**Remediation:** Prefer `SECURITY INVOKER` so the view runs with the caller’s permissions. Only keep `SECURITY DEFINER` if you explicitly need elevated access and accept the risk.

**Option A — Change to INVOKER (recommended unless you need definer):**

```sql
-- Replace each view with same definition but SECURITY INVOKER (or drop and recreate).
-- Example for one view (repeat for each; get current definition from Supabase Dashboard → Database → Views):
ALTER VIEW public.veto_log SET (security_invoker = on);
ALTER VIEW public.seed_and_edge_submissions SET (security_invoker = on);
ALTER VIEW public.active_authorizations SET (security_invoker = on);
ALTER VIEW public.pipeline_trace SET (security_invoker = on);
ALTER VIEW public.tsrc_health_check SET (security_invoker = on);
```

*(If your Postgres version doesn’t support `SET (security_invoker = on)` on existing views, recreate each view without `SECURITY DEFINER` in the definition.)*

**Option B — Keep DEFINER and acknowledge:** If you need definer for a specific reason, document it and accept the linter finding. See [Supabase lint 0010](https://supabase.com/docs/guides/database/database-linter?lint=0010_security_definer_view).

---

## 2. RLS Disabled on Public Tables (ERROR)

**Issue:** Tables exposed to PostgREST should have Row Level Security (RLS) enabled. Linter flags: `public.sandboxes`, `public.users`, `public.thalet_migration_status`, `public.wallets`.

**Remediation:** Enable RLS and add policies so access is explicit.

```sql
-- Enable RLS on each table
ALTER TABLE public.sandboxes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.thalet_migration_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallets ENABLE ROW LEVEL SECURITY;
```

After enabling RLS, **no rows are visible** until you add policies. Add policies that match your app (e.g. users see own row, service role sees all). Example pattern:

```sql
-- Example: allow authenticated users to read/update own row in public.users
-- (adjust table and columns to your schema)
CREATE POLICY "Users can read own row"
  ON public.users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own row"
  ON public.users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

Add similar policies for `sandboxes`, `thalet_migration_status`, and `wallets` (and for `service_role` if your backend needs full access). See [Supabase RLS](https://supabase.com/docs/guides/auth/row-level-security) and [lint 0013](https://supabase.com/docs/guides/database/database-linter?lint=0013_rls_disabled_in_public).

---

## Summary

| Lint | Object | Action |
|------|--------|--------|
| security_definer_view | veto_log, seed_and_edge_submissions, active_authorizations, pipeline_trace, tsrc_health_check | Set `security_invoker = on` or recreate view without SECURITY DEFINER |
| rls_disabled_in_public | sandboxes, users, thalet_migration_status, wallets | Enable RLS; add policies for authenticated/service_role as needed |

Run the SQL in **Supabase Dashboard → SQL Editor**. If views/tables are managed by another repo or migration tool, apply the same changes there.
