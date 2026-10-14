import type { SupabaseClient } from "@supabase/supabase-js";

/** Audit every important action — login, CRUD, assign, review, export, role change. */
export async function audit(
  sb: SupabaseClient | null,
  action: string,
  entity: string,
  entityId?: string,
  actor?: string
): Promise<void> {
  if (!sb) return;
  try {
    await sb.from("audit_logs").insert({ action, entity, entity_id: entityId ?? null, actor: actor ?? null });
  } catch { /* never break UX on audit fail */ }
}
