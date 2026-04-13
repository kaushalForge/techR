"use client";

import { useMemo, useState, useRef } from "react";
import { useRouter } from "next/navigation";

/* ─────────────────────────── constants ─────────────────────────── */
const EMPTY = {
  name: "",
  productType: "laptop",
  item_categorie: "budget",
  targetaudience: [],
  popularity: "popular",
  latest: "false",
  mostsold: "false",
  mostpopular: "false",
  recommended: "false",
  blog: "",
  images: [],
  dtype: "",
  size: "",
  resolution: "",
  os: "",
  dimension: "",
  build: "",
  weight: "",
  wifi: "",
  bluetooth: "",
  typec: "",
  usba: "",
  ethernet: "",
  hdmi: "",
  audiojack: "",
  maincamera: "",
  frontcamera: "",
  video: "",
  processor: [],
  graphic: [],
  ram: [],
  storage: [],
  price: [],
};

const VARIANT_KEYS = ["processor", "graphic", "ram", "storage", "price"];

/* ─────────────────────────── helpers ─────────────────────────── */
function asMatrix(values) {
  return [values.filter(Boolean)];
}

function moveItem(list, from, to) {
  const copy = [...list];
  const [item] = copy.splice(from, 1);
  copy.splice(to, 0, item);
  return copy;
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export default function ProductForm({
  mode = "create",
  initialData = null,
  initialType = "",
  lockType = false,
}) {
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ text: "", ok: true });

  const [form, setForm] = useState(
    initialData
      ? { ...EMPTY, ...initialData }
      : initialType
      ? { ...EMPTY, productType: initialType }
      : EMPTY
  );

  /* ── image state — mirrors EditProduct pattern ── */
  const [existingImages, setExistingImages] = useState(
    (initialData?.images || []).map((img) =>
      typeof img === "string" ? { url: img } : img
    )
  );
  const [newFiles, setNewFiles] = useState([]); // { file, preview, name }[]

  /* drag state */
  const [dragFrom, setDragFrom] = useState(-1);
  const [dragZone, setDragZone] = useState(""); // "new" | "existing"

  /* ── variants ── */
  const variantsCount = useMemo(
    () => Math.max(...VARIANT_KEYS.map((k) => form[k]?.length || 0), 1),
    [form]
  );

  function setField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateArrayField(key, index, value) {
    setForm((prev) => {
      const list = Array.isArray(prev[key]) ? [...prev[key]] : [];
      list[index] = value;
      return { ...prev, [key]: list };
    });
  }

  function addVariantRow() {
    VARIANT_KEYS.forEach((key) => updateArrayField(key, variantsCount, ""));
  }

  function removeVariantRow(index) {
    setForm((prev) => {
      const copy = { ...prev };
      VARIANT_KEYS.forEach((key) => {
        const list = Array.isArray(copy[key]) ? [...copy[key]] : [];
        list.splice(index, 1);
        copy[key] = list;
      });
      return copy;
    });
  }

  /* ── image handlers — same logic as EditProduct ── */
  function onFileSelect(e) {
    const files = Array.from(e.target.files || []);
    const remaining = 6 - existingImages.length - newFiles.length;
    const picked = files.slice(0, Math.max(0, remaining));
    setNewFiles((prev) => [
      ...prev,
      ...picked.map((file) => ({
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
      })),
    ]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removeNewFile(index) {
    setNewFiles((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(index, 1);
      if (removed?.preview) URL.revokeObjectURL(removed.preview);
      return copy;
    });
  }

  function removeExistingImage(index) {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  }

  function onDragStartNew(index) {
    setDragFrom(index);
    setDragZone("new");
  }
  function onDropNew(index) {
    if (dragZone !== "new" || dragFrom < 0 || dragFrom === index) return;
    setNewFiles((prev) => moveItem(prev, dragFrom, index));
    setDragFrom(-1);
  }

  function onDragStartExisting(index) {
    setDragFrom(index);
    setDragZone("existing");
  }
  function onDropExisting(index) {
    if (dragZone !== "existing" || dragFrom < 0 || dragFrom === index) return;
    setExistingImages((prev) => moveItem(prev, dragFrom, index));
    setDragFrom(-1);
  }

  const totalImages = existingImages.length + newFiles.length;

  /* ── submit ── */
  async function submit(e) {
    e.preventDefault();
    setSaving(true);
    setToast({ text: "", ok: true });

    try {
      const payload = {
        ...form,
        processor: asMatrix(form.processor),
        graphic: asMatrix(form.graphic),
        ram: asMatrix(form.ram),
        storage: asMatrix(form.storage),
        price: asMatrix(form.price),
      };

      const hasNewFiles = newFiles.some((f) => f.file instanceof File);
      const url =
        mode === "edit" ? `/api/products/${initialData._id}` : "/api/products";
      const method = mode === "edit" ? "PUT" : "POST";

      if (hasNewFiles) {
        const body = new FormData();
        Object.entries(payload).forEach(([key, value]) =>
          body.append(
            key,
            Array.isArray(value) || typeof value === "object"
              ? JSON.stringify(value)
              : value
          )
        );
        existingImages.forEach((img) =>
          body.append("existingImages[]", img.url)
        );
        newFiles.forEach((item) => {
          if (item.file instanceof File) body.append("images", item.file);
        });
        const res = await fetch(url, { method, body });
        if (!res.ok) throw new Error("Unable to save product");
      } else {
        const res = await fetch(url, {
          method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            existingImages: existingImages.map((img) => img.url),
          }),
        });
        if (!res.ok) throw new Error("Unable to save product");
      }

      setToast({
        text: mode === "edit" ? "Product updated." : "Product created.",
        ok: true,
      });
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      setToast({ text: err.message, ok: false });
    } finally {
      setSaving(false);
    }
  }

  /* ═══════════════════════════════ RENDER ═══════════════════════════════ */
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ── Page Header ── */}
      <div className="sticky top-0 z-30 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur-md px-6 md:px-10 py-4 flex items-center justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-0.5">
            Admin / Products / {mode === "edit" ? "Edit" : "New"}
          </p>
          <h1 className="text-xl font-semibold tracking-tight leading-none">
            {mode === "edit" ? "Edit Product" : "Add Product"}
          </h1>
        </div>

        {toast.text && (
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded-full border ${
              toast.ok
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-red-500/10 text-red-400 border-red-500/20"
            }`}
          >
            {toast.text}
          </span>
        )}
      </div>

      {/* ── Form ── */}
      <form
        onSubmit={submit}
        className="max-w-5xl mx-auto px-4 md:px-10 py-8 pb-28 flex flex-col gap-5"
      >

        {/* ━━━━ CORE INFO ━━━━ */}
        <Card title="Core Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Field
              label="Product Name"
              value={form.name}
              onChange={(v) => setField("name", v)}
              required
            />
            {lockType ? (
              <Field
                label="Product Type"
                value={form.productType}
                onChange={() => {}}
                disabled
              />
            ) : (
              <SelectField
                label="Product Type"
                value={form.productType}
                onChange={(v) => setField("productType", v)}
                options={["laptop", "phone", "tablet", "other"]}
              />
            )}
            <SelectField
              label="Category"
              value={form.item_categorie}
              onChange={(v) => setField("item_categorie", v)}
              options={["budget", "midrange", "flagship"]}
            />
            <Field
              label="Operating System"
              value={form.os}
              onChange={(v) => setField("os", v)}
            />
            <Field
              label="Blog URL"
              value={form.blog}
              onChange={(v) => setField("blog", v)}
              className="sm:col-span-2"
            />
          </div>
        </Card>

        {/* ━━━━ VARIANTS ━━━━ */}
        <Card title="Variants">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs text-zinc-500">
              Each row = one configuration option
            </p>
            <button
              type="button"
              onClick={addVariantRow}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-blue-600/15 text-blue-400 hover:bg-blue-600/25 border border-blue-500/20 transition-colors"
            >
              + Add Row
            </button>
          </div>

          {/* Column headers */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_1fr_1fr_36px] gap-2 mb-1.5 px-1">
            {["CPU", "GPU", "RAM", "Storage", "Price", ""].map((h, i) => (
              <span
                key={i}
                className="text-[10px] font-mono uppercase tracking-widest text-zinc-600"
              >
                {h}
              </span>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {Array.from({ length: variantsCount }).map((_, i) => (
              <div
                key={i}
                className="grid grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1fr_1fr_36px] gap-2 items-center p-3 rounded-xl bg-zinc-900/80 border border-zinc-800"
              >
                {VARIANT_KEYS.map((key) => (
                  <input
                    key={key}
                    className="bg-zinc-950 border border-zinc-700/60 rounded-lg px-3 py-1.5 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/15 transition w-full"
                    value={form[key]?.[i] || ""}
                    onChange={(e) => updateArrayField(key, i, e.target.value)}
                    placeholder="—"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => removeVariantRow(i)}
                  className="col-span-2 md:col-span-1 flex items-center justify-center h-9 w-full md:w-9 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs transition-colors border border-red-500/15"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* ━━━━ IMAGES ━━━━ */}
        <Card title="Images">
          {/* Hidden real file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={onFileSelect}
          />

          {/* Top bar */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-xs text-zinc-500">
              {totalImages} / 6 &nbsp;·&nbsp; Drag cards to reorder
            </p>
            <button
              type="button"
              disabled={totalImages >= 6}
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-medium px-3 py-1.5 rounded-lg bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              + Upload
            </button>
          </div>

          {/* Empty state dropzone */}
          {totalImages === 0 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-2 py-14 rounded-2xl border-2 border-dashed border-zinc-700 hover:border-zinc-500 text-zinc-500 hover:text-zinc-400 transition-colors bg-zinc-900/40"
            >
              <span className="text-4xl leading-none">☁︎</span>
              <span className="text-sm font-medium">Click to upload images</span>
              <span className="text-xs text-zinc-600">
                PNG, JPG, WEBP · max 6 files
              </span>
            </button>
          )}

          {/* Existing DB / Cloudinary images */}
          {existingImages.length > 0 && (
            <div className="mb-5">
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
                Saved images
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {existingImages.map((img, i) => (
                  <ImageCard
                    key={`ex-${i}-${img.url}`}
                    src={img.url}
                    label={`#${i + 1}`}
                    onDragStart={() => onDragStartExisting(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDropExisting(i)}
                    onRemove={() => removeExistingImage(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* New file previews */}
          {newFiles.length > 0 && (
            <div>
              <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-2">
                New uploads
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {newFiles.map((item, i) => (
                  <ImageCard
                    key={`new-${i}-${item.name}`}
                    src={item.preview}
                    label={`#${existingImages.length + i + 1}`}
                    isNew
                    onDragStart={() => onDragStartNew(i)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDropNew(i)}
                    onRemove={() => removeNewFile(i)}
                  />
                ))}
              </div>
            </div>
          )}
        </Card>

        {/* ━━━━ DISPLAY ━━━━ */}
        <Card title="Display">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Field
              label="Display Type"
              value={form.dtype}
              onChange={(v) => setField("dtype", v)}
            />
            <Field
              label="Display Size"
              value={form.size}
              onChange={(v) => setField("size", v)}
            />
            <Field
              label="Resolution"
              value={form.resolution}
              onChange={(v) => setField("resolution", v)}
            />
            <Field
              label="Dimension"
              value={form.dimension}
              onChange={(v) => setField("dimension", v)}
            />
          </div>
        </Card>

        {/* ━━━━ BUILD & CONNECTIVITY ━━━━ */}
        <Card title="Build & Connectivity">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <Field
              label="Build"
              value={form.build}
              onChange={(v) => setField("build", v)}
            />
            <Field
              label="Weight"
              value={form.weight}
              onChange={(v) => setField("weight", v)}
            />
            <Field
              label="WiFi"
              value={form.wifi}
              onChange={(v) => setField("wifi", v)}
            />
            <Field
              label="Bluetooth"
              value={form.bluetooth}
              onChange={(v) => setField("bluetooth", v)}
            />
            <Field
              label="Type-C"
              value={form.typec}
              onChange={(v) => setField("typec", v)}
            />
            <Field
              label="USB-A"
              value={form.usba}
              onChange={(v) => setField("usba", v)}
            />
            <Field
              label="Ethernet"
              value={form.ethernet}
              onChange={(v) => setField("ethernet", v)}
            />
            <Field
              label="HDMI"
              value={form.hdmi}
              onChange={(v) => setField("hdmi", v)}
            />
            <Field
              label="Audio Jack"
              value={form.audiojack}
              onChange={(v) => setField("audiojack", v)}
            />
          </div>
        </Card>

        {/* ━━━━ CAMERA & VIDEO ━━━━ */}
        <Card title="Camera & Video">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Field
              label="Main Camera"
              value={form.maincamera}
              onChange={(v) => setField("maincamera", v)}
            />
            <Field
              label="Front Camera"
              value={form.frontcamera}
              onChange={(v) => setField("frontcamera", v)}
            />
            <Field
              label="Video"
              value={form.video}
              onChange={(v) => setField("video", v)}
            />
          </div>
        </Card>

        {/* ━━━━ VISIBILITY FLAGS ━━━━ */}
        <Card title="Visibility Flags">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: "latest", label: "Latest" },
              { key: "mostpopular", label: "Most Popular" },
              { key: "mostsold", label: "Most Sold" },
              { key: "recommended", label: "Recommended" },
            ].map(({ key, label }) => (
              <ToggleChip
                key={key}
                label={label}
                checked={form[key] === "true"}
                onChange={(v) => setField(key, v ? "true" : "false")}
              />
            ))}
          </div>
        </Card>

        {/* ━━━━ STICKY FOOTER ━━━━ */}
        <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 md:px-10 py-3.5 flex items-center justify-between gap-4">
            <p className="hidden sm:block text-sm text-zinc-500">
              {mode === "edit"
                ? "Review your changes before updating"
                : "Fill required fields before creating"}
            </p>
            <button
              type="submit"
              disabled={saving}
              className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold text-white transition-colors shadow-lg shadow-blue-900/30"
            >
              {saving && (
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              )}
              {saving
                ? "Saving…"
                : mode === "edit"
                ? "Update Product"
                : "Create Product"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════════════════════════════ */

function Card({ title, children }) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 overflow-hidden">
      <div className="px-5 py-3 border-b border-zinc-800 bg-zinc-900">
        <p className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500">
          {title}
        </p>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, disabled, required, className = "" }) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide">
        {label}
        {required && <span className="text-blue-400 ml-0.5">*</span>}
      </span>
      <input
        className="bg-zinc-950 border border-zinc-700/70 rounded-xl px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition disabled:opacity-40 disabled:cursor-not-allowed w-full"
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        required={required}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-zinc-400 uppercase tracking-wide">
        {label}
      </span>
      <select
        className="bg-zinc-950 border border-zinc-700/70 rounded-xl px-3 py-2 text-sm text-zinc-100 outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/10 transition appearance-none w-full cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-zinc-900">
            {o.charAt(0).toUpperCase() + o.slice(1)}
          </option>
        ))}
      </select>
    </label>
  );
}

function ToggleChip({ label, checked, onChange }) {
  return (
    <label
      className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border cursor-pointer select-none transition-all ${
        checked
          ? "bg-blue-600/10 border-blue-500/30 text-blue-300"
          : "bg-zinc-950 border-zinc-700/70 text-zinc-400 hover:border-zinc-600"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="hidden"
      />
      <span
        className={`h-2 w-2 rounded-full flex-shrink-0 transition-colors ${
          checked ? "bg-blue-400" : "bg-zinc-600"
        }`}
      />
      <span className="text-sm font-medium">{label}</span>
    </label>
  );
}

function ImageCard({
  src,
  label,
  isNew,
  onDragStart,
  onDragOver,
  onDrop,
  onRemove,
}) {
  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="relative group rounded-xl overflow-hidden border border-zinc-700/80 bg-zinc-900 cursor-grab active:cursor-grabbing aspect-square"
    >
      <img src={src} alt={label} className="w-full h-full object-cover" />

      {/* Hover overlay with remove button */}
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <button
          type="button"
          onClick={onRemove}
          className="h-9 w-9 rounded-full bg-red-500 hover:bg-red-400 text-white text-xs font-bold flex items-center justify-center transition-colors shadow-lg"
        >
          ✕
        </button>
      </div>

      {/* Bottom label strip */}
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1.5 flex items-center justify-between bg-gradient-to-t from-black/70 to-transparent">
        <span className="text-[10px] font-mono text-white/70">{label}</span>
        {isNew && (
          <span className="text-[9px] font-semibold uppercase tracking-wider text-blue-300 bg-blue-500/20 border border-blue-500/30 px-1.5 py-0.5 rounded-full">
            New
          </span>
        )}
      </div>

      {/* Drag handle indicator */}
      <div className="absolute top-2 right-2 text-white/25 group-hover:text-white/60 text-sm transition-colors select-none pointer-events-none">
        ⠿
      </div>
    </div>
  );
}