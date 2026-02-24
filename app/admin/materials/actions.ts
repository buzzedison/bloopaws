'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export interface Material {
  id: string;
  title: string;
  description: string | null;
  file_url: string;
  category: 'marketing' | 'knowledge';
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

async function assertAdmin() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not authenticated');
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  if (!profile?.is_admin) throw new Error('Unauthorized: admin only');
  return supabase;
}

/** Read all materials (admin: all; partners: active only) */
export async function getMaterials(): Promise<Material[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('partner_materials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Material[];
}

/** Read only active materials — for the partner-facing dashboard */
export async function getActiveMaterials(): Promise<Material[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from('partner_materials')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []) as Material[];
}

/** Create a new material entry */
export async function createMaterial(formData: FormData) {
  const supabase = await assertAdmin();

  const title       = (formData.get('title')       as string)?.trim();
  const description = (formData.get('description') as string)?.trim() || null;
  const file_url    = (formData.get('file_url')    as string)?.trim();
  const category    = formData.get('category') as 'marketing' | 'knowledge';

  if (!title || !file_url || !category) {
    throw new Error('Title, URL and category are required.');
  }

  const { error } = await supabase.from('partner_materials').insert({
    title,
    description,
    file_url,
    category,
  });

  if (error) throw error;
  revalidatePath('/admin/materials');
}

/** Toggle visible / hidden */
export async function toggleMaterialActive(id: string, is_active: boolean) {
  const supabase = await assertAdmin();
  const { error } = await supabase
    .from('partner_materials')
    .update({ is_active })
    .eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/materials');
}

/** Permanently delete a material */
export async function deleteMaterial(id: string) {
  const supabase = await assertAdmin();
  const { error } = await supabase
    .from('partner_materials')
    .delete()
    .eq('id', id);
  if (error) throw error;
  revalidatePath('/admin/materials');
}

/** Update sort order (drag-reorder) */
export async function updateSortOrder(updates: { id: string; sort_order: number }[]) {
  const supabase = await assertAdmin();
  await Promise.all(
    updates.map(({ id, sort_order }) =>
      supabase.from('partner_materials').update({ sort_order }).eq('id', id)
    )
  );
  revalidatePath('/admin/materials');
}
