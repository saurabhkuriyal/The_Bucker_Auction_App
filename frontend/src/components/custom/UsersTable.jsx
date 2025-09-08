"use client";

import axios from "axios";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function UsersTable({ initialUsers = [] }) {
    const [users, setUsers] = useState(initialUsers);
    const [busyId, setBusyId] = useState(null);

    const handleDelete = async (id) => {
        if (!confirm("Delete this user?")) return;
        setBusyId(id);
        const prev = users;
        try {
            // Optimistic remove
            setUsers((u) => u.filter((x) => x._id !== id));
            // Hit your API (adjust URL to your backend)
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                withCredentials: true,
            });
        } catch (e) {
            // Rollback on error
            setUsers(prev);
            alert(e?.response?.data?.message || "Failed to delete user");
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="w-full">
            {/* TABLE (md and up) */}
            <div className="hidden md:block">
                <div className="w-full overflow-x-auto rounded-lg border bg-white">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-3 text-left font-semibold">S/N</th>
                                <th className="px-4 py-3 text-left font-semibold">Name</th>
                                <th className="px-4 py-3 text-left font-semibold">Role</th>
                                <th className="px-4 py-3 text-left font-semibold">Phone</th>
                                <th className="px-4 py-3 text-left font-semibold">Email</th>
                                <th className="px-4 py-3 text-right font-semibold">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {users.map((u, idx) => (
                                <tr key={u._id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">{idx + 1}</td>
                                    <td className="px-4 py-3">{u.username || "-"}</td>
                                    <td className="px-4 py-3">
                                        <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium uppercase tracking-wide">
                                            {u.role || "USER"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">{u.phone || "-"}</td>
                                    <td className="px-4 py-3">{u.email || "-"}</td>
                                    <td className="px-4 py-3 text-right">
                                        <button
                                            onClick={() => handleDelete(u._id)}
                                            disabled={busyId === u._id}
                                            className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                                            title="Delete user"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {users.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CARD LIST (mobile) */}
            <div className="md:hidden space-y-3">
                {users.map((u, idx) => (
                    <div
                        key={u._id}
                        className="rounded-lg border bg-white p-3 shadow-sm"
                    >
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500">#{idx + 1}</div>
                            <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                                {u.role || "USER"}
                            </span>
                        </div>
                        <div className="mt-2 text-sm font-medium">{u.username || "-"}</div>
                        <div className="mt-1 text-xs text-gray-600">
                            <div>📞 {u.phone || "-"}</div>
                            <div>✉️ {u.email || "-"}</div>
                        </div>
                        <div className="mt-3 flex justify-end">
                            <button
                                onClick={() => handleDelete(u._id)}
                                disabled={busyId === u._id}
                                className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                                title="Delete user"
                            >
                                <Trash2 className="h-4 w-4" />
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
                {users.length === 0 && (
                    <div className="rounded-lg border bg-white p-4 text-center text-gray-500">
                        No users found.
                    </div>
                )}
            </div>
        </div>
    );
}
