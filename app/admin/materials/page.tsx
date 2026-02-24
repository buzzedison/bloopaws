'use client';

import { useState, useEffect, useTransition, useRef } from 'react';
import {
  getMaterials,
  createMaterial,
  toggleMaterialActive,
  deleteMaterial,
  type Material,
} from './actions';
import {
  FolderOpen,
  Plus,
  Link2,
  Trash2,
  Eye,
  EyeOff,
  ExternalLink,
  X,
  Loader2,
  BookOpen,
  Megaphone,
} from 'lucide-react';

const CATEGORY_META = {
  marketing: {
    label: 'Marketing Arsenal',
    icon: Megaphone,
    color: 'bg-red-100 text-red-700',
    dot: 'bg-red-500',
  },
  knowledge: {
    label: 'Knowledge Base',
    icon: BookOpen,
    color: 'bg-blue-100 text-blue-700',
    dot: 'bg-blue-500',
  },
} as const;

function MaterialCard({
  material,
  onToggle,
  onDelete,
}: {
  material: Material;
  onToggle: (id: string, val: boolean) => void;
  onDelete: (id: string) => void;
}) {
  const meta = CATEGORY_META[material.category];
  const Icon = meta.icon;

  return (
    <div
      className={`bg-white border rounded-xl p-5 flex items-start gap-4 transition-all ${
        material.is_active ? 'border-gray-200' : 'border-gray-200 opacity-50'
      }`}
    >
      {/* Category icon */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${meta.color}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <p className="font-semibold text-gray-900 truncate">{material.title}</p>
          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${meta.dot}`} />
          <span className="text-xs text-gray-400">{meta.label}</span>
        </div>
        {material.description && (
          <p className="text-sm text-gray-500 line-clamp-2 mb-2">{material.description}</p>
        )}
        <a
          href={material.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-mono truncate max-w-xs"
        >
          <Link2 className="w-3 h-3 flex-shrink-0" />
          {material.file_url.length > 60
            ? material.file_url.slice(0, 57) + '…'
            : material.file_url}
          <ExternalLink className="w-3 h-3 flex-shrink-0" />
        </a>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-1 flex-shrink-0">
        <button
          onClick={() => onToggle(material.id, !material.is_active)}
          title={material.is_active ? 'Hide from partners' : 'Show to partners'}
          className="p-2 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
        >
          {material.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </button>
        <button
          onClick={() => onDelete(material.id)}
          title="Delete permanently"
          className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function AddMaterialModal({
  open,
  onClose,
  onAdded,
}: {
  open: boolean;
  onClose: () => void;
  onAdded: () => void;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const fd = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        await createMaterial(fd);
        formRef.current?.reset();
        onAdded();
        onClose();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900">Add New Material</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
            <input
              name="title"
              required
              placeholder="e.g. Official Kazi Brochure (PDF)"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Description <span className="font-normal text-gray-400">(optional)</span>
            </label>
            <textarea
              name="description"
              rows={2}
              placeholder="Short description partners will see"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          {/* File URL */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              File URL *
            </label>
            <input
              name="file_url"
              required
              type="url"
              placeholder="https://drive.google.com/... or Supabase storage URL"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono"
            />
            <p className="mt-1 text-xs text-gray-400">
              Paste a direct download or view link (Google Drive, Dropbox, Notion, Supabase Storage, etc.)
            </p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
            <div className="grid grid-cols-2 gap-3">
              {(Object.keys(CATEGORY_META) as Array<keyof typeof CATEGORY_META>).map((key) => {
                const meta = CATEGORY_META[key];
                const Icon = meta.icon;
                return (
                  <label
                    key={key}
                    className="relative flex items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer has-[:checked]:border-red-500 has-[:checked]:bg-red-50 transition-all"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={key}
                      required
                      className="sr-only"
                    />
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${meta.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-semibold text-gray-700">{meta.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 rounded-lg px-4 py-2">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 disabled:opacity-60 transition-colors"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
              {isPending ? 'Adding…' : 'Add Material'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminMaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading]     = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [, startTransition]       = useTransition();

  const load = async () => {
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (err) {
      console.error('Error loading materials:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleToggle = (id: string, val: boolean) => {
    startTransition(async () => {
      await toggleMaterialActive(id, val);
      setMaterials(prev => prev.map(m => m.id === id ? { ...m, is_active: val } : m));
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('Permanently delete this material? This cannot be undone.')) return;
    startTransition(async () => {
      await deleteMaterial(id);
      setMaterials(prev => prev.filter(m => m.id !== id));
    });
  };

  const marketing = materials.filter(m => m.category === 'marketing');
  const knowledge = materials.filter(m => m.category === 'knowledge');

  return (
    <div className="p-6 sm:p-8 max-w-5xl mx-auto">
      {/* ── Page Header ─────────────────────────────────── */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
            <FolderOpen className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Partner Materials</h1>
            <p className="text-sm text-gray-500">
              Upload links / files that partners can download from their dashboard
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          Add Material
        </button>
      </div>

      {/* ── Stats Bar ───────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total',    value: materials.length },
          { label: 'Visible',  value: materials.filter(m => m.is_active).length },
          { label: 'Hidden',   value: materials.filter(m => !m.is_active).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-red-500" />
        </div>
      ) : materials.length === 0 ? (
        <div className="bg-white border border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center py-20 text-center">
          <FolderOpen className="w-12 h-12 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-1">No materials yet</h3>
          <p className="text-sm text-gray-400 max-w-sm mb-6">
            Add links to PDFs, brochures, email templates, or any file partners should have access to.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add First Material
          </button>
        </div>
      ) : (
        <div className="space-y-10">
          {/* Marketing Arsenal */}
          {(marketing.length > 0 || true) && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Megaphone className="w-4 h-4 text-red-500" />
                <h2 className="text-base font-bold text-gray-800">Marketing Arsenal</h2>
                <span className="text-xs bg-red-100 text-red-700 font-semibold px-2 py-0.5 rounded-full">
                  {marketing.filter(m => m.is_active).length} visible
                </span>
              </div>
              {marketing.length === 0 ? (
                <p className="text-sm text-gray-400 pl-6">No marketing materials yet.</p>
              ) : (
                <div className="space-y-3">
                  {marketing.map(m => (
                    <MaterialCard
                      key={m.id}
                      material={m}
                      onToggle={handleToggle}
                      onDelete={handleDelete}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Knowledge Base */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <h2 className="text-base font-bold text-gray-800">Knowledge Base</h2>
              <span className="text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">
                {knowledge.filter(m => m.is_active).length} visible
              </span>
            </div>
            {knowledge.length === 0 ? (
              <p className="text-sm text-gray-400 pl-6">No knowledge base materials yet.</p>
            ) : (
              <div className="space-y-3">
                {knowledge.map(m => (
                  <MaterialCard
                    key={m.id}
                    material={m}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      )}

      {/* Add modal */}
      <AddMaterialModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onAdded={load}
      />
    </div>
  );
}
