"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Copy,
  Edit3,
  Upload,
  RefreshCw,
  Eye,
  Grid,
  List,
  Image as ImageIcon,
  Save,
  RotateCcw,
  Check,
  Layers,
  Sparkles,
  ArrowRight,
  X,
  Globe,
  Plus,
  Trash2,
  CloudUpload,
  FolderOpen,
  FilePlus2,
} from "lucide-react";
import type { MediaItem } from "@/lib/media-registry";
import { cloudinaryImage, cloudinaryVideo } from "@/lib/cloudinary";

export default function MediaPanelPage() {
  const [items, setItems] = useState<MediaItem[]>([]);
  const [originalItems, setOriginalItems] = useState<MediaItem[]>([]);
  const [availablePaths, setAvailablePaths] = useState<string[]>([]);
  const [unregisteredPaths, setUnregisteredPaths] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<string>("All");
  const [selectedSection, setSelectedSection] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Status check state (maps rawPath to verification object)
  const [verificationMap, setVerificationMap] = useState<
    Record<string, { status: number; ok: boolean; url: string; publicId: string }>
  >({});
  const [verifying, setVerifying] = useState(false);

  // Syncing to Cloudinary state
  const [syncingPath, setSyncingPath] = useState<string | null>(null);
  const [syncingAll, setSyncingAll] = useState(false);

  // Modals
  const [editingItem, setEditingItem] = useState<MediaItem | null>(null);
  const [previewModalItem, setPreviewModalItem] = useState<MediaItem | null>(null);
  const [isRegisteringSlot, setIsRegisteringSlot] = useState(false);
  const [registerSourceTab, setRegisterSourceTab] = useState<"unregistered" | "upload" | "manual">("unregistered");

  // New Slot State
  const [newSlot, setNewSlot] = useState<Partial<MediaItem>>({
    id: "",
    name: "",
    path: "",
    page: "About Us",
    section: "Research & Innovation",
    usage: "",
    component: "ResearchInnovation.tsx",
    alt: "",
    resourceType: "image",
  });

  // Copy feedback
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Fetch initial registry
  const fetchRegistry = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/panel/images");
      const data = await res.json();
      if (data.success) {
        setItems(data.items);
        setOriginalItems(JSON.parse(JSON.stringify(data.items)));
        setAvailablePaths(data.availableLocalPaths || []);
        setUnregisteredPaths(data.unregisteredPaths || []);
      }
    } catch (err) {
      console.error("Failed to load media registry:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistry();
  }, []);

  // Compute pages and sections
  const pages = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => set.add(i.page));
    return ["All", ...Array.from(set)];
  }, [items]);

  const sections = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => {
      if (selectedPage === "All" || i.page === selectedPage) {
        set.add(i.section);
      }
    });
    return ["All", ...Array.from(set)];
  }, [items, selectedPage]);

  // Check if there are unsaved changes
  const hasUnsavedChanges = useMemo(() => {
    return JSON.stringify(items) !== JSON.stringify(originalItems);
  }, [items, originalItems]);

  const changedCount = useMemo(() => {
    let count = 0;
    const origMap = new Map(originalItems.map((o) => [o.id, o]));
    items.forEach((it) => {
      const orig = origMap.get(it.id);
      if (!orig || JSON.stringify(orig) !== JSON.stringify(it)) {
        count++;
      }
    });
    if (items.length !== originalItems.length) {
      count += Math.abs(items.length - originalItems.length);
    }
    return count;
  }, [items, originalItems]);

  // Filter items
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      if (selectedPage !== "All" && item.page !== selectedPage) return false;
      if (selectedSection !== "All" && item.section !== selectedSection) return false;

      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        item.id.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.path.toLowerCase().includes(q) ||
        item.usage.toLowerCase().includes(q) ||
        item.section.toLowerCase().includes(q) ||
        item.component.toLowerCase().includes(q)
      );
    });
  }, [items, selectedPage, selectedSection, searchQuery]);

  // Helper to get delivery URL
  const getDeliveryUrl = (item: MediaItem | Partial<MediaItem>) => {
    if (!item.path) return "";
    if (item.resourceType === "video") {
      return cloudinaryVideo(item.path);
    }
    return cloudinaryImage(item.path);
  };

  // Helper to copy text to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Test Cloudinary Health for visible items
  const runHealthCheck = async () => {
    setVerifying(true);
    try {
      const pathsToVerify = Array.from(new Set(filteredItems.map((i) => i.path).filter(Boolean)));
      const res = await fetch("/api/panel/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: pathsToVerify }),
      });
      const data = await res.json();
      if (data.success) {
        setVerificationMap((prev) => ({ ...prev, ...data.results }));
      }
    } catch (err) {
      console.error("Health check error:", err);
    } finally {
      setVerifying(false);
    }
  };

  // Sync a single path or multiple paths to Cloudinary
  const syncToCloudinary = async (pathTarget: string) => {
    setSyncingPath(pathTarget);
    try {
      const res = await fetch("/api/panel/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathTarget }),
      });
      const data = await res.json();
      if (data.success && data.results[pathTarget]?.ok) {
        setVerificationMap((prev) => ({
          ...prev,
          [pathTarget]: {
            status: 200,
            ok: true,
            url: data.results[pathTarget].url,
            publicId: data.results[pathTarget].publicId,
          },
        }));
        setSaveMessage(`Synced "${pathTarget}" directly to Cloudinary CDN!`);
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        alert(`Failed to sync to Cloudinary: ${data.results?.[pathTarget]?.error || "Unknown error"}`);
      }
    } catch (err) {
      alert(`Sync error: ${(err as Error).message}`);
    } finally {
      setSyncingPath(null);
    }
  };

  // Sync all visible/missing paths to Cloudinary
  const syncAllVisible = async () => {
    const paths = Array.from(new Set(filteredItems.map((i) => i.path).filter(Boolean)));
    if (paths.length === 0) return;

    setSyncingAll(true);
    try {
      const res = await fetch("/api/panel/sync", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths }),
      });
      const data = await res.json();
      if (data.success) {
        const newMap: Record<string, { status: number; ok: boolean; url: string; publicId: string }> = {};
        Object.entries(data.results).forEach(([p, val]: [string, any]) => {
          if (val.ok) {
            newMap[p] = { status: 200, ok: true, url: val.url, publicId: val.publicId };
          }
        });
        setVerificationMap((prev) => ({ ...prev, ...newMap }));
        setSaveMessage(data.message);
        setTimeout(() => setSaveMessage(null), 4000);
      }
    } catch (err) {
      alert(`Sync error: ${(err as Error).message}`);
    } finally {
      setSyncingAll(false);
    }
  };

  // Save changes to API
  const handleSaveAll = async () => {
    setSaving(true);
    setSaveMessage(null);
    try {
      const res = await fetch("/api/panel/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.success) {
        setOriginalItems(JSON.parse(JSON.stringify(items)));
        setSaveMessage("All image slot configurations saved & synced with website!");
        setTimeout(() => setSaveMessage(null), 4000);
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (err) {
      alert(`Error saving: ${(err as Error).message}`);
    } finally {
      setSaving(false);
    }
  };

  // Discard changes
  const handleReset = () => {
    if (confirm("Discard all unsaved changes and reload original configurations?")) {
      setItems(JSON.parse(JSON.stringify(originalItems)));
    }
  };

  // Update a single item in state
  const handleUpdateItem = (updated: MediaItem) => {
    setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
    setEditingItem(null);
  };

  // Register New Slot
  const handleRegisterSlot = async () => {
    if (!newSlot.id || !newSlot.name || !newSlot.path) {
      alert("Please provide a Slot ID, Display Label, and select an Image Path.");
      return;
    }
    if (items.some((i) => i.id === newSlot.id)) {
      alert(`Slot ID "${newSlot.id}" already exists. Please pick a unique ID.`);
      return;
    }

    const fullItem: MediaItem = {
      id: newSlot.id,
      name: newSlot.name,
      path: newSlot.path,
      page: newSlot.page || "About Us",
      section: newSlot.section || "Research & Innovation",
      usage: newSlot.usage || "Newly registered image slot",
      component: newSlot.component || "ResearchInnovation.tsx",
      alt: newSlot.alt || newSlot.name,
      resourceType: newSlot.resourceType || "image",
    };

    // Auto-sync path to Cloudinary if it's a local file
    if (newSlot.path.startsWith("/images/") || newSlot.path.startsWith("/healthy-happy/")) {
      syncToCloudinary(newSlot.path);
    }

    setItems((prev) => [fullItem, ...prev]);
    setUnregisteredPaths((prev) => prev.filter((p) => p !== fullItem.path));
    setIsRegisteringSlot(false);
    setSaveMessage(`Registered new slot "${fullItem.id}"! Click "Save Changes" to persist.`);
  };

  // Delete slot
  const handleDeleteItem = (id: string) => {
    if (confirm(`Remove image slot "${id}"?`)) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  // File upload handler
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "edit" | "register"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/panel/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (target === "edit" && editingItem) {
          setEditingItem({
            ...editingItem,
            path: data.path,
          });
        } else {
          setNewSlot((prev) => ({
            ...prev,
            path: data.path,
            name: prev.name || file.name.replace(/\.[^/.]+$/, "").replace(/[^A-Za-z0-9 ]+/g, " "),
          }));
        }
        if (!availablePaths.includes(data.path)) {
          setAvailablePaths((prev) => [data.path, ...prev]);
        }
        // If Cloudinary returned secureUrl, mark it verified
        if (data.cloudinary?.secureUrl) {
          setVerificationMap((prev) => ({
            ...prev,
            [data.path]: {
              status: 200,
              ok: true,
              url: data.cloudinary.secureUrl,
              publicId: data.cloudinary.publicId,
            },
          }));
        }
      } else {
        setUploadError(data.error || "Upload failed");
      }
    } catch (err) {
      setUploadError((err as Error).message);
    } finally {
      setIsUploading(false);
    }
  };

  // Open Register Slot Modal with default template
  const openRegisterModal = (initialPath?: string) => {
    const nextIndex = items.filter((i) => i.id.startsWith("aboutus-")).length + 1;
    const defaultId = `aboutus-${String(nextIndex).padStart(2, "0")}`;
    const defaultName = initialPath
      ? initialPath.split("/").pop()?.replace(/\.[^/.]+$/, "").replace(/[^A-Za-z0-9 ]+/g, " ") || "New Image Slot"
      : "New Image Slot";

    setNewSlot({
      id: defaultId,
      name: defaultName,
      path: initialPath || (unregisteredPaths[0] || ""),
      page: selectedPage !== "All" ? selectedPage : "About Us",
      section: selectedSection !== "All" ? selectedSection : "Research & Innovation",
      usage: "Featured image slot",
      component: "ResearchInnovation.tsx",
      alt: defaultName,
      resourceType: "image",
    });
    setRegisterSourceTab(initialPath || unregisteredPaths.length > 0 ? "unregistered" : "upload");
    setUploadError(null);
    setIsRegisteringSlot(true);
  };

  // Get Page Link helper
  const getPageLink = (pageName: string) => {
    switch (pageName) {
      case "About Us":
        return "/en/about";
      case "Products":
        return "/en/products";
      case "Awards":
        return "/en/awards";
      case "Home":
      default:
        return "/en";
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f3] text-[#27303a] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-[#deded7] px-4 sm:px-8 py-3.5 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-[#3d4a2e] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              H&H
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold text-[#27303a]">Media Control Panel</h1>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#3d4a2e]/10 text-[#3d4a2e] font-semibold">
                  Cloudinary CDN
                </span>
              </div>
              <p className="text-xs text-[#65706c]">
                Live image slots, Cloudinary delivery sync, and site-wide placement mapping
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Register Slot Button */}
            <button
              onClick={() => openRegisterModal()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#3d4a2e] text-white hover:bg-[#2f3a23] shadow-xs transition cursor-pointer"
            >
              <FilePlus2 className="size-3.5" />
              <span>Register Slot</span>
              {unregisteredPaths.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-amber-400 text-gray-900 font-bold rounded-full text-[10px]">
                  {unregisteredPaths.length}
                </span>
              )}
            </button>

            <Link
              href="/en"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#65706c] hover:text-[#27303a] bg-[#f5f5f3] hover:bg-[#deded7]/50 rounded-lg transition"
            >
              <Globe className="size-3.5" />
              <span>Live Website</span>
              <ExternalLink className="size-3" />
            </Link>

            {hasUnsavedChanges && (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg transition cursor-pointer"
                title="Discard unsaved changes"
              >
                <RotateCcw className="size-3.5" />
                <span>Discard ({changedCount})</span>
              </button>
            )}

            <button
              onClick={handleSaveAll}
              disabled={saving || !hasUnsavedChanges}
              className={`inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg shadow-sm transition ${
                hasUnsavedChanges
                  ? "bg-[#3d4a2e] text-white hover:bg-[#2f3a23] cursor-pointer"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {saving ? <RefreshCw className="size-3.5 animate-spin" /> : <Save className="size-3.5" />}
              <span>{saving ? "Saving..." : hasUnsavedChanges ? `Save Changes (${changedCount})` : "Saved"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Save Success Banner */}
      {saveMessage && (
        <div className="bg-emerald-600 text-white text-xs font-medium text-center py-2 px-4 shadow-sm flex items-center justify-center gap-2 animate-fadeIn">
          <CheckCircle2 className="size-4" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Unregistered Images Detected Banner */}
      {unregisteredPaths.length > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 sm:px-8 py-2.5 text-xs text-amber-900 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FolderOpen className="size-4 text-amber-700" />
            <span>
              <strong>{unregisteredPaths.length} local images</strong> found in your code that are not registered as slots yet.
            </span>
          </div>
          <button
            onClick={() => openRegisterModal(unregisteredPaths[0])}
            className="px-3 py-1 bg-amber-700 text-white font-semibold rounded-md hover:bg-amber-800 transition cursor-pointer text-xs"
          >
            Register These Images
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-6">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white rounded-xl p-4 border border-[#deded7] shadow-2xs">
            <div className="flex items-center justify-between text-[#65706c] text-xs font-medium">
              <span>Registered Slots</span>
              <ImageIcon className="size-4 text-[#3d4a2e]" />
            </div>
            <div className="text-2xl font-bold text-[#27303a] mt-1">{items.length}</div>
            <div className="text-[11px] text-[#65706c] mt-0.5">Active across website</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#deded7] shadow-2xs">
            <div className="flex items-center justify-between text-[#65706c] text-xs font-medium">
              <span>About Us Slots</span>
              <Layers className="size-4 text-purple-600" />
            </div>
            <div className="text-2xl font-bold text-[#27303a] mt-1">
              {items.filter((i) => i.page === "About Us").length}
            </div>
            <div className="text-[11px] text-[#65706c] mt-0.5">Headline, R&D & Mill</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#deded7] shadow-2xs">
            <div className="flex items-center justify-between text-[#65706c] text-xs font-medium">
              <span>Products & Awards</span>
              <Sparkles className="size-4 text-amber-600" />
            </div>
            <div className="text-2xl font-bold text-[#27303a] mt-1">
              {items.filter((i) => i.page === "Products" || i.page === "Awards").length}
            </div>
            <div className="text-[11px] text-[#65706c] mt-0.5">Items & Certificates</div>
          </div>

          <div className="bg-white rounded-xl p-4 border border-[#deded7] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[#65706c] text-xs font-medium">
                <span>Cloudinary Sync</span>
                <Globe className="size-4 text-blue-600" />
              </div>
              <div className="text-xs text-[#27303a] font-semibold mt-1">
                {Object.keys(verificationMap).length > 0
                  ? `${Object.values(verificationMap).filter((v) => v.ok).length} / ${
                      Object.keys(verificationMap).length
                    } Verified`
                  : "All Slots Connected"}
              </div>
            </div>
            <div className="flex items-center gap-1.5 mt-2">
              <button
                onClick={runHealthCheck}
                disabled={verifying}
                className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition cursor-pointer"
                title="Verify Cloudinary HTTP status"
              >
                <RefreshCw className={`size-3 ${verifying ? "animate-spin" : ""}`} />
                <span>Test CDN</span>
              </button>
              <button
                onClick={syncAllVisible}
                disabled={syncingAll}
                className="flex-1 inline-flex items-center justify-center gap-1 px-2 py-1 text-xs font-medium rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition cursor-pointer"
                title="Push all visible local images directly to Cloudinary"
              >
                <CloudUpload className={`size-3 ${syncingAll ? "animate-pulse" : ""}`} />
                <span>{syncingAll ? "Syncing..." : "Sync All"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter Controls & Search */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-[#deded7] shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search slot ID, title, usage placement, or filename..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-[#f5f5f3] rounded-lg border border-transparent focus:border-[#3d4a2e] focus:bg-white transition outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#65706c] font-medium hidden sm:inline">View:</span>
              <div className="inline-flex rounded-lg border border-[#deded7] p-0.5 bg-[#f5f5f3]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition cursor-pointer ${
                    viewMode === "grid" ? "bg-white text-[#27303a] shadow-xs font-medium" : "text-[#65706c]"
                  }`}
                  title="Grid View"
                >
                  <Grid className="size-3.5" />
                  <span className="text-xs hidden md:inline">Grid</span>
                </button>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-1.5 rounded-md text-xs flex items-center gap-1 transition cursor-pointer ${
                    viewMode === "table" ? "bg-white text-[#27303a] shadow-xs font-medium" : "text-[#65706c]"
                  }`}
                  title="Table View"
                >
                  <List className="size-3.5" />
                  <span className="text-xs hidden md:inline">Table</span>
                </button>
              </div>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-2 pt-2 border-t border-[#deded7]">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#65706c]">Pages:</span>
              <div className="flex flex-wrap gap-1.5">
                {pages.map((p) => {
                  const count = p === "All" ? items.length : items.filter((i) => i.page === p).length;
                  const active = selectedPage === p;
                  return (
                    <button
                      key={p}
                      onClick={() => {
                        setSelectedPage(p);
                        setSelectedSection("All");
                      }}
                      className={`text-xs px-3 py-1 rounded-full font-medium transition cursor-pointer ${
                        active
                          ? "bg-[#3d4a2e] text-white shadow-xs"
                          : "bg-[#f5f5f3] text-[#65706c] hover:text-[#27303a] hover:bg-[#deded7]/60"
                      }`}
                    >
                      {p} <span className="text-[10px] opacity-75 font-normal">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {sections.length > 2 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#65706c]">Section:</span>
                <div className="flex flex-wrap gap-1.5">
                  {sections.map((s) => {
                    const count =
                      s === "All"
                        ? items.filter((i) => selectedPage === "All" || i.page === selectedPage).length
                        : items.filter((i) => i.section === s).length;
                    const active = selectedSection === s;
                    return (
                      <button
                        key={s}
                        onClick={() => setSelectedSection(s)}
                        className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                          active
                            ? "bg-[#b5908a] text-white font-medium shadow-xs"
                            : "bg-[#f5f5f3] text-[#65706c] hover:bg-[#deded7]/50"
                        }`}
                      >
                        {s} <span className="opacity-75">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Banner */}
        <div className="flex items-center justify-between text-xs text-[#65706c] px-1">
          <div>
            Showing <strong className="text-[#27303a]">{filteredItems.length}</strong> of {items.length} registered slots
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => openRegisterModal()}
              className="text-xs text-[#3d4a2e] font-semibold hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <Plus className="size-3" />
              <span>Register New Slot</span>
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl p-12 text-center text-[#65706c] border border-[#deded7]">
            <RefreshCw className="size-6 animate-spin mx-auto mb-2 text-[#3d4a2e]" />
            <p className="text-sm font-medium">Loading media slots...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="bg-white rounded-xl p-12 text-center text-[#65706c] border border-[#deded7]">
            <ImageIcon className="size-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm font-semibold text-[#27303a]">No slots found</p>
            <p className="text-xs text-[#65706c] mt-1">Try adjusting your search query or filters.</p>
          </div>
        ) : viewMode === "grid" ? (
          /* ========================================================================= */
          /* GRID VIEW */
          /* ========================================================================= */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const deliveryUrl = getDeliveryUrl(item);
              const verification = verificationMap[item.path];
              const isOrig = originalItems.find((o) => o.id === item.id);
              const isModified = isOrig && JSON.stringify(isOrig) !== JSON.stringify(item);
              const isSyncingThis = syncingPath === item.path;

              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden flex flex-col justify-between shadow-2xs hover:shadow-md ${
                    isModified ? "border-amber-400 ring-1 ring-amber-300" : "border-[#deded7]"
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-3.5 pb-2 border-b border-[#deded7]/50 bg-gray-50/50 flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 text-gray-800 font-mono">
                          {item.id}
                        </span>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            item.page === "About Us"
                              ? "bg-purple-100 text-purple-700"
                              : item.page === "Products"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.page === "Home"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-amber-100 text-amber-800"
                          }`}
                        >
                          {item.page}
                        </span>
                        {isModified && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                            Edited
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-[#27303a] truncate mt-1" title={item.name}>
                        {item.name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {/* One-click Sync to Cloudinary */}
                      <button
                        onClick={() => syncToCloudinary(item.path)}
                        disabled={isSyncingThis}
                        className="p-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 hover:bg-emerald-100 transition shadow-2xs cursor-pointer"
                        title="Sync this image to Cloudinary CDN"
                      >
                        <CloudUpload className={`size-3.5 ${isSyncingThis ? "animate-pulse" : ""}`} />
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-1.5 rounded-lg bg-white border border-[#deded7] hover:bg-[#f5f5f3] text-[#27303a] hover:text-[#3d4a2e] transition shadow-2xs cursor-pointer"
                        title="Edit slot details"
                      >
                        <Edit3 className="size-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-1.5 rounded-lg bg-white border border-[#deded7] hover:bg-red-50 text-gray-400 hover:text-red-600 transition shadow-2xs cursor-pointer"
                        title="Delete slot"
                      >
                        <Trash2 className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail & Preview */}
                  <div className="relative aspect-16/10 bg-[#e8e8e4] overflow-hidden group">
                    {item.resourceType === "video" ? (
                      <video
                        src={deliveryUrl}
                        className="w-full h-full object-cover"
                        muted
                        loop
                        onMouseEnter={(e) => (e.target as HTMLVideoElement).play()}
                        onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                      />
                    ) : (
                      <img
                        src={deliveryUrl}
                        alt={item.alt || item.name}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/600x400/f5f5f3/27303a?text=Image+Not+Found+On+CDN";
                        }}
                      />
                    )}

                    {/* Overlay Action Buttons */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={() => setPreviewModalItem(item)}
                        className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow transition cursor-pointer"
                        title="View Full Resolution"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        onClick={() => syncToCloudinary(item.path)}
                        className="p-2 rounded-full bg-white/90 text-emerald-800 hover:bg-white shadow transition cursor-pointer"
                        title="Push to Cloudinary"
                      >
                        <CloudUpload className="size-4" />
                      </button>
                      <button
                        onClick={() => setEditingItem(item)}
                        className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow transition cursor-pointer"
                        title="Edit Image Mapping"
                      >
                        <Edit3 className="size-4" />
                      </button>
                      <a
                        href={deliveryUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 rounded-full bg-white/90 text-gray-800 hover:bg-white shadow transition cursor-pointer"
                        title="Open Cloudinary URL in new tab"
                      >
                        <ExternalLink className="size-4" />
                      </a>
                    </div>

                    {/* Status Badge */}
                    <div className="absolute bottom-2 left-2">
                      {verification ? (
                        verification.ok ? (
                          <span className="text-[10px] font-medium bg-emerald-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur shadow-xs">
                            <Check className="size-3" /> Live (200)
                          </span>
                        ) : (
                          <span className="text-[10px] font-medium bg-red-600/90 text-white px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur shadow-xs">
                            <AlertTriangle className="size-3" /> Missing (404)
                          </span>
                        )
                      ) : (
                        <span className="text-[10px] font-medium bg-black/60 text-white px-2 py-0.5 rounded-full backdrop-blur">
                          Cloudinary
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Context Placement & Details */}
                  <div className="p-3.5 space-y-2 text-xs flex-1 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      {/* Placement */}
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#65706c] block">
                          Where It Appears:
                        </span>
                        <div className="font-medium text-[#27303a] text-xs line-clamp-2" title={item.usage}>
                          {item.usage}
                        </div>
                        <div className="text-[11px] text-[#65706c] flex items-center gap-1 mt-0.5">
                          <span>Section:</span>
                          <span className="font-semibold text-gray-700">{item.section}</span>
                          <span className="text-gray-300">•</span>
                          <span className="font-mono text-[10px] text-gray-500">{item.component}</span>
                        </div>
                      </div>

                      {/* File Path */}
                      <div className="pt-1.5 border-t border-[#deded7]/60">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#65706c] block">
                          Current Path:
                        </span>
                        <div
                          className="font-mono text-[11px] text-gray-600 truncate bg-gray-50 px-2 py-1 rounded border border-gray-100 flex items-center justify-between gap-1"
                          title={item.path}
                        >
                          <span className="truncate">{item.path}</span>
                          <button
                            onClick={() => copyToClipboard(item.path, `path-${item.id}`)}
                            className="text-gray-400 hover:text-gray-700 shrink-0 cursor-pointer"
                            title="Copy path"
                          >
                            {copiedId === `path-${item.id}` ? (
                              <Check className="size-3 text-emerald-600" />
                            ) : (
                              <Copy className="size-3" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-2 flex items-center justify-between border-t border-[#deded7]/60 text-[11px]">
                      <button
                        onClick={() => copyToClipboard(deliveryUrl, `url-${item.id}`)}
                        className="text-[#65706c] hover:text-[#27303a] font-medium inline-flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === `url-${item.id}` ? (
                          <>
                            <Check className="size-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied CDN</span>
                          </>
                        ) : (
                          <>
                            <Copy className="size-3" />
                            <span>Copy CDN Link</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={getPageLink(item.page)}
                        target="_blank"
                        className="text-[#3d4a2e] hover:underline font-medium inline-flex items-center gap-0.5"
                      >
                        <span>Preview Page</span>
                        <ArrowRight className="size-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* ========================================================================= */
          /* TABLE VIEW */
          /* ========================================================================= */
          <div className="bg-white rounded-xl border border-[#deded7] overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f5f5f3] text-[#65706c] font-semibold border-b border-[#deded7]">
                  <tr>
                    <th className="py-3 px-4">Preview</th>
                    <th className="py-3 px-4">Slot ID & Name</th>
                    <th className="py-3 px-4">Page & Section</th>
                    <th className="py-3 px-4">Where Used / UI Placement</th>
                    <th className="py-3 px-4">Current Path</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#deded7]/60">
                  {filteredItems.map((item) => {
                    const deliveryUrl = getDeliveryUrl(item);
                    const isOrig = originalItems.find((o) => o.id === item.id);
                    const isModified = isOrig && JSON.stringify(isOrig) !== JSON.stringify(item);

                    return (
                      <tr key={item.id} className={`hover:bg-gray-50/80 ${isModified ? "bg-amber-50/30" : ""}`}>
                        <td className="py-2.5 px-4">
                          <div
                            onClick={() => setPreviewModalItem(item)}
                            className="size-12 rounded-lg bg-gray-100 overflow-hidden cursor-pointer border border-[#deded7] shrink-0"
                          >
                            <img
                              src={deliveryUrl}
                              alt={item.name}
                              className="size-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src =
                                  "https://placehold.co/100x100/f5f5f3/27303a?text=!";
                              }}
                            />
                          </div>
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="font-mono text-[11px] font-bold text-gray-700">{item.id}</div>
                          <div className="font-semibold text-[#27303a] text-xs">{item.name}</div>
                          {isModified && (
                            <span className="text-[9px] font-bold px-1 rounded bg-amber-100 text-amber-800">
                              Edited
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="font-semibold text-gray-800">{item.page}</div>
                          <div className="text-[11px] text-[#65706c]">{item.section}</div>
                        </td>
                        <td className="py-2.5 px-4 max-w-xs">
                          <div className="text-[#27303a] truncate font-medium" title={item.usage}>
                            {item.usage}
                          </div>
                          <div className="text-[10px] text-gray-400 font-mono">{item.component}</div>
                        </td>
                        <td className="py-2.5 px-4 font-mono text-[11px] text-gray-600 max-w-xs">
                          <div className="truncate" title={item.path}>
                            {item.path}
                          </div>
                        </td>
                        <td className="py-2.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => syncToCloudinary(item.path)}
                              className="p-1 rounded text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                              title="Sync to Cloudinary"
                            >
                              <CloudUpload className="size-3.5" />
                            </button>
                            <button
                              onClick={() => setEditingItem(item)}
                              className="px-2 py-0.5 text-xs font-semibold rounded bg-[#3d4a2e]/10 text-[#3d4a2e] hover:bg-[#3d4a2e]/20 cursor-pointer"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteItem(item.id)}
                              className="p-1 text-gray-400 hover:text-red-600 cursor-pointer"
                              title="Delete slot"
                            >
                              <Trash2 className="size-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================================= */}
      {/* REGISTER NEW SLOT MODAL */}
      {/* ========================================================================= */}
      {isRegisteringSlot && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#deded7] overflow-hidden my-8">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#deded7] flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#3d4a2e]/10 text-[#3d4a2e] font-mono">
                  REGISTER SLOT
                </span>
                <h2 className="text-base font-bold text-[#27303a] mt-1">Register New Image Slot</h2>
              </div>
              <button
                onClick={() => setIsRegisteringSlot(false)}
                className="size-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Source Mode Tabs */}
            <div className="flex border-b border-[#deded7] bg-[#f5f5f3] px-4 pt-2 gap-2 text-xs">
              <button
                onClick={() => setRegisterSourceTab("unregistered")}
                className={`px-3 py-2 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  registerSourceTab === "unregistered"
                    ? "border-[#3d4a2e] text-[#3d4a2e] bg-white rounded-t-lg"
                    : "border-transparent text-[#65706c] hover:text-[#27303a]"
                }`}
              >
                <FolderOpen className="size-3.5" />
                <span>Detected Local Files ({unregisteredPaths.length})</span>
              </button>
              <button
                onClick={() => setRegisterSourceTab("upload")}
                className={`px-3 py-2 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  registerSourceTab === "upload"
                    ? "border-[#3d4a2e] text-[#3d4a2e] bg-white rounded-t-lg"
                    : "border-transparent text-[#65706c] hover:text-[#27303a]"
                }`}
              >
                <Upload className="size-3.5" />
                <span>Upload From Computer</span>
              </button>
              <button
                onClick={() => setRegisterSourceTab("manual")}
                className={`px-3 py-2 font-semibold border-b-2 transition cursor-pointer flex items-center gap-1.5 ${
                  registerSourceTab === "manual"
                    ? "border-[#3d4a2e] text-[#3d4a2e] bg-white rounded-t-lg"
                    : "border-transparent text-[#65706c] hover:text-[#27303a]"
                }`}
              >
                <Edit3 className="size-3.5" />
                <span>Manual Path / Cloudinary ID</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto text-xs">
              {/* Tab 1: Pick from Unregistered */}
              {registerSourceTab === "unregistered" && (
                <div className="space-y-2">
                  <span className="font-semibold text-gray-700 block">
                    Select an unmapped image from your project:
                  </span>
                  {unregisteredPaths.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-48 overflow-y-auto p-1 border border-[#deded7] rounded-xl bg-gray-50">
                      {unregisteredPaths.map((p) => {
                        const selected = newSlot.path === p;
                        return (
                          <div
                            key={p}
                            onClick={() => {
                              const autoName = p.split("/").pop()?.replace(/\.[^/.]+$/, "").replace(/[^A-Za-z0-9 ]+/g, " ") || "";
                              setNewSlot({
                                ...newSlot,
                                path: p,
                                name: newSlot.name || autoName,
                              });
                            }}
                            className={`p-2 rounded-lg border text-left cursor-pointer transition flex flex-col justify-between ${
                              selected
                                ? "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300"
                                : "bg-white border-[#deded7] hover:border-gray-400"
                            }`}
                          >
                            <span className="font-mono text-[10px] text-gray-800 truncate block font-bold">
                              {p.split("/").pop()}
                            </span>
                            <span className="text-[9px] text-[#65706c] truncate mt-1">{p}</span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-[#65706c] bg-gray-50 rounded-xl border border-[#deded7]">
                      All local files on disk are already registered into slots! You can upload a new file in the next tab.
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: Upload File */}
              {registerSourceTab === "upload" && (
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-300 space-y-2">
                  <span className="font-semibold text-[#3d4a2e] flex items-center gap-1.5 text-xs">
                    <Upload className="size-4" />
                    Select Image File from Computer
                  </span>
                  <p className="text-[11px] text-[#65706c]">
                    Automatically saves into `public/images/aboutusimg/` and syncs with Cloudinary CDN.
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "register")}
                    disabled={isUploading}
                    className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#3d4a2e] file:text-white hover:file:bg-[#2f3a23] cursor-pointer"
                  />
                  {isUploading && <p className="text-[11px] text-[#3d4a2e] animate-pulse">Uploading and syncing to Cloudinary...</p>}
                  {uploadError && <p className="text-[11px] text-red-600">{uploadError}</p>}
                </div>
              )}

              {/* Selected / Entered Path */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Target Image Path / Public ID</label>
                <input
                  type="text"
                  value={newSlot.path || ""}
                  onChange={(e) => setNewSlot({ ...newSlot, path: e.target.value })}
                  placeholder="/images/aboutusimg/photo_name.jpg"
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none font-mono text-xs"
                />
              </div>

              {/* Slot ID & Label */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Unique Slot ID</label>
                  <input
                    type="text"
                    value={newSlot.id || ""}
                    onChange={(e) => setNewSlot({ ...newSlot, id: e.target.value })}
                    placeholder="e.g. aboutus-38"
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Display Label</label>
                  <input
                    type="text"
                    value={newSlot.name || ""}
                    onChange={(e) => setNewSlot({ ...newSlot, name: e.target.value })}
                    placeholder="e.g. Organic Millet Harvest"
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none text-xs"
                  />
                </div>
              </div>

              {/* Where Used */}
              <div>
                <label className="font-semibold text-gray-700 block mb-1">Where will this image appear? (Usage description)</label>
                <textarea
                  rows={2}
                  value={newSlot.usage || ""}
                  onChange={(e) => setNewSlot({ ...newSlot, usage: e.target.value })}
                  placeholder="e.g. About Us > Research & Innovation > Section 2 Feature Card 5"
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none text-xs"
                />
              </div>

              {/* Page & Section */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Page</label>
                  <select
                    value={newSlot.page || "About Us"}
                    onChange={(e) => setNewSlot({ ...newSlot, page: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] text-xs outline-none"
                  >
                    <option value="About Us">About Us</option>
                    <option value="Products">Products</option>
                    <option value="Home">Home</option>
                    <option value="Awards">Awards</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Section</label>
                  <input
                    type="text"
                    value={newSlot.section || ""}
                    onChange={(e) => setNewSlot({ ...newSlot, section: e.target.value })}
                    placeholder="e.g. Research & Innovation"
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none text-xs"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-[#deded7] flex items-center justify-end gap-2.5 bg-gray-50">
              <button
                onClick={() => setIsRegisteringSlot(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-[#deded7] rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleRegisterSlot}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3d4a2e] hover:bg-[#2f3a23] rounded-lg shadow-sm transition cursor-pointer inline-flex items-center gap-1.5"
              >
                <Check className="size-3.5" />
                <span>Register &amp; Sync Slot</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* EDIT MODAL */}
      {/* ========================================================================= */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#deded7] overflow-hidden my-8">
            <div className="p-4 sm:p-5 border-b border-[#deded7] flex items-center justify-between bg-gray-50">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-gray-200 text-gray-700 font-mono">
                  {editingItem.id}
                </span>
                <h2 className="text-base font-bold text-[#27303a] mt-1">Edit Image Configuration</h2>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="size-8 rounded-full bg-gray-200/70 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="p-4 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs">
              <div className="bg-[#f5f5f3] rounded-xl p-4 border border-[#deded7] flex flex-col sm:flex-row items-center gap-4">
                <div className="size-28 sm:size-32 rounded-lg bg-white overflow-hidden border border-[#deded7] shrink-0 flex items-center justify-center">
                  <img
                    src={getDeliveryUrl(editingItem)}
                    alt={editingItem.name}
                    className="size-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/300x300/f5f5f3/27303a?text=Preview+Error";
                    }}
                  />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#65706c]">
                    Cloudinary Delivery Preview
                  </span>
                  <div className="font-semibold text-sm text-[#27303a] truncate">{editingItem.name}</div>
                  <div className="text-[#65706c]">
                    Target page: <strong>{editingItem.page}</strong> ({editingItem.section})
                  </div>
                  <div className="text-[11px] font-mono text-gray-500 truncate" title={getDeliveryUrl(editingItem)}>
                    {getDeliveryUrl(editingItem)}
                  </div>
                  <button
                    onClick={() => syncToCloudinary(editingItem.path)}
                    className="mt-1 px-2.5 py-1 rounded bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition inline-flex items-center gap-1 cursor-pointer"
                  >
                    <CloudUpload className="size-3" />
                    <span>Push to Cloudinary Now</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Display Label / Title</label>
                <input
                  type="text"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Image Source Path / Cloudinary Public ID</label>
                <input
                  type="text"
                  value={editingItem.path}
                  onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none font-mono"
                />

                {availablePaths.length > 0 && (
                  <div className="mt-1.5">
                    <span className="text-[10px] text-gray-500 block mb-1">
                      Or select from existing images in repository:
                    </span>
                    <select
                      value={editingItem.path}
                      onChange={(e) => setEditingItem({ ...editingItem, path: e.target.value })}
                      className="w-full px-2.5 py-1.5 bg-[#f5f5f3] rounded-lg border border-[#deded7] text-xs font-mono text-gray-700 outline-none"
                    >
                      <option value="">-- Choose from available images --</option>
                      {availablePaths.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Direct Upload Section */}
              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-dashed border-emerald-300 space-y-2">
                <span className="font-semibold text-[#3d4a2e] flex items-center gap-1.5">
                  <Upload className="size-3.5 text-[#3d4a2e]" />
                  Upload Replacement Image (Direct Cloudinary CDN Sync)
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "edit")}
                  disabled={isUploading}
                  className="text-xs text-gray-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#3d4a2e] file:text-white hover:file:bg-[#2f3a23] cursor-pointer"
                />
                {isUploading && <p className="text-[11px] text-[#3d4a2e] animate-pulse">Uploading and syncing...</p>}
                {uploadError && <p className="text-[11px] text-red-600 font-medium">{uploadError}</p>}
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Where It Appears (Usage Location)</label>
                <textarea
                  rows={2}
                  value={editingItem.usage}
                  onChange={(e) => setEditingItem({ ...editingItem, usage: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Page</label>
                  <input
                    type="text"
                    value={editingItem.page}
                    onChange={(e) => setEditingItem({ ...editingItem, page: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-gray-700 block mb-1">Section</label>
                  <input
                    type="text"
                    value={editingItem.section}
                    onChange={(e) => setEditingItem({ ...editingItem, section: e.target.value })}
                    className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-gray-700 block mb-1">Alt Text</label>
                <input
                  type="text"
                  value={editingItem.alt}
                  onChange={(e) => setEditingItem({ ...editingItem, alt: e.target.value })}
                  className="w-full px-3 py-2 bg-[#f5f5f3] rounded-lg border border-[#deded7] focus:bg-white focus:border-[#3d4a2e] outline-none"
                />
              </div>
            </div>

            <div className="p-4 sm:p-5 border-t border-[#deded7] flex items-center justify-end gap-2.5 bg-gray-50">
              <button
                onClick={() => setEditingItem(null)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-900 bg-white border border-[#deded7] rounded-lg transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => handleUpdateItem(editingItem)}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#3d4a2e] hover:bg-[#2f3a23] rounded-lg shadow-sm transition cursor-pointer"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LIGHTBOX PREVIEW MODAL */}
      {/* ========================================================================= */}
      {previewModalItem && (
        <div
          onClick={() => setPreviewModalItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-gray-700 relative"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                  {previewModalItem.id}
                </span>
                <h3 className="font-bold text-sm text-[#27303a] mt-0.5">{previewModalItem.name}</h3>
              </div>
              <button
                onClick={() => setPreviewModalItem(null)}
                className="size-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="max-h-[65vh] bg-black/5 flex items-center justify-center p-4">
              {previewModalItem.resourceType === "video" ? (
                <video src={getDeliveryUrl(previewModalItem)} controls autoPlay className="max-h-[60vh] max-w-full rounded-lg" />
              ) : (
                <img
                  src={getDeliveryUrl(previewModalItem)}
                  alt={previewModalItem.name}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg"
                />
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="space-y-0.5">
                <div className="font-medium text-gray-700">
                  Used in: <strong>{previewModalItem.usage}</strong>
                </div>
                <div className="text-[11px] font-mono text-gray-500 truncate max-w-md">
                  {getDeliveryUrl(previewModalItem)}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setEditingItem(previewModalItem);
                    setPreviewModalItem(null);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-xs font-semibold text-gray-800 transition cursor-pointer"
                >
                  Edit Slot
                </button>
                <a
                  href={getDeliveryUrl(previewModalItem)}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#3d4a2e] text-white text-xs font-semibold hover:bg-[#2f3a23] transition inline-flex items-center gap-1"
                >
                  <span>Open CDN</span>
                  <ExternalLink className="size-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
