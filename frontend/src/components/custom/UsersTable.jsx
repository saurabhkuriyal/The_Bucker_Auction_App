"use client";

import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

/**
 * Props:
 * - initialUsers: Array of user objects [{ _id, username, role, phone, email, ... }]
 * - apiBase (optional): e.g. "http://localhost:5000"
 */
export default function UsersTable({ initialUsers = [], apiBase = "http://localhost:5000" }) {
  const [users, setUsers] = useState(Array.isArray(initialUsers) ? initialUsers : []);
  const [busyId, setBusyId] = useState(null);
  const [query, setQuery] = useState("");

  // Edit modal state
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ username: "", role: "", phone: "", email: "" });
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    if (!query) return users;
    const q = query.toLowerCase();
    return users.filter(
      (u) =>
        (u.username || "").toLowerCase().includes(q) ||
        (u.email || "").toLowerCase().includes(q) ||
        (u.phone || "").toLowerCase().includes(q) ||
        (u.role || "").toLowerCase().includes(q)
    );
  }, [users, query]);

  // -------- Actions --------
  const openEdit = (u) => {
    setEditingUser(u);
    setEditForm({
      username: u.username || "",
      role: u.role || "USER",
      phone: u.phone || "",
      email: u.email || "",
    });
  };

  const closeEdit = () => {
    setEditingUser(null);
    setSaving(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((f) => ({ ...f, [name]: value }));
  };

  const saveEdit = async () => {
    if (!editingUser?._id) return;
    setSaving(true);
    const id = editingUser._id;
    const prev = [...users];
    try {
      // optimistic: patch local list
      const nextUsers = prev.map((u) => (u._id === id ? { ...u, ...editForm } : u));
      setUsers(nextUsers);

      await axios.put(`${apiBase}/api/users/${id}`, editForm, { withCredentials: true });
      closeEdit();
    } catch (e) {
      // rollback
      setUsers(prev);
      setSaving(false);
      alert(e?.response?.data?.message || "Failed to save changes");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this user?")) return;
    setBusyId(id);
    const prev = users;
    try {
      setUsers((u) => u.filter((x) => x._id !== id)); // optimistic
      await axios.delete(`${apiBase}/api/users/${id}`, { withCredentials: true });
    } catch (e) {
      setUsers(prev); // rollback
      alert(e?.response?.data?.message || "Failed to delete user");
    } finally {
      setBusyId(null);
    }
  };

  // -------- UI --------
  return (
    <div className="w-full">
      {/* Header row with title + search; full width and plays nicely with sidebar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Users</h1>
        <div className="relative w-full sm:w-80">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, phone, role…"
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm outline-none ring-0 focus:border-indigo-500"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-gray-400 hover:text-gray-600"
              aria-label="Clear"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Table container: full width, subtle shadow, rounded; scrolls horizontally on narrow widths */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full min-w-[980px] text-sm">
          {/* Sticky header + zebra rows for readability */}
          <thead className="sticky top-0 z-10 bg-gray-50/95 backdrop-blur">
            <tr className="text-left text-gray-600">
              <th className="px-4 py-3 font-semibold">S/N</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Phone</th>
              <th className="px-4 py-3 font-semibold">Email</th>
              <th className="px-4 py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((u, idx) => (
              <tr key={u._id || idx} className="odd:bg-white even:bg-gray-50 hover:bg-indigo-50/40 transition-colors">
                <td className="px-4 py-3 text-gray-700">{idx + 1}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{u.username || "-"}</div>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide
                      ${String(u.role || "USER").toUpperCase() === "ADMIN"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-emerald-100 text-emerald-700"
                      }`}
                  >
                    {u.role || "USER"}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-800">{u.phone || "-"}</td>
                <td className="px-4 py-3 text-gray-800">{u.email || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => openEdit(u)}
                      className="inline-flex items-center gap-1 rounded-md border border-indigo-200 bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-100 active:translate-y-[1px]"
                      title="Edit user"
                    >
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      disabled={busyId === u._id}
                      className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-50 active:translate-y-[1px]"
                      title="Delete user"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Lightweight Modal for Edit (pure Tailwind / no external UI lib) */}
      {editingUser && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4"
          onClick={closeEdit}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-gray-200 bg-white p-5 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button onClick={closeEdit} className="rounded p-1 text-gray-500 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-600">Name</label>
                <input
                  name="username"
                  value={editForm.username}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Role</label>
                <select
                  name="role"
                  value={editForm.role}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="SELLER">SELLER</option>
                  <option value="BUYER">BUYER</option>
                  <option value="USER">USER</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-gray-600">Phone</label>
                <input
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-medium text-gray-600">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                onClick={closeEdit}
                className="rounded-md border px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={saving}
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
