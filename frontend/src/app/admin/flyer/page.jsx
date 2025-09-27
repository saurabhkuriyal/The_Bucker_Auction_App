"use client";

import axios from 'axios';
import parse from 'html-react-parser';
import dynamic from "next/dynamic";

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });
//import JoditEditor from 'jodit-react';
import {
    FileText,
    Image as ImageIcon,
    Loader2,
    Type,
    UploadCloud,
    X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";


export default function Page() {
    const editor = useRef(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); // paragraph-like text
    const [image, setImage] = useState(null);           // File
    const [preview, setPreview] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const fileRef = useRef(null);

    // revoke object URL on unmount / image change
    useEffect(() => {
        return () => preview && URL.revokeObjectURL(preview);
    }, [preview]);

    const onSelectFile = (file) => {
        if (!file) return;
        setImage(file);
        const url = URL.createObjectURL(file);
        setPreview((old) => {
            if (old) URL.revokeObjectURL(old);
            return url;
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        onSelectFile(file);
    };

    const removeImage = () => {
        setImage(null);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(null);
        if (fileRef.current) fileRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const fd = new FormData();
            if (image) fd.append("image", image);
            fd.append("title", title);
            fd.append("description", description);

            // TODO: replace with your API endpoint
            // await fetch("/api/your-endpoint", { method: "POST", body: fd });

            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/flyer/createflyer`, fd, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Here is for the flyer------", response);

            if (response.status === 200) {
                alert("Flyer created successfully!");
            } else {
                alert("Failed to create flyer. Please try again.");
            }

            console.log("there is the descritpion----", description);


            // reset
            setTitle("");
            setDescription("");
            removeImage();

        } catch (err) {
            
            console.error(err);
            alert("Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <div className="min-h-[calc(100vh-3.5rem)] w-full bg-gradient-to-b from-white to-gray-50">
            {/* Container scales up to very large screens */}
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 xl:py-14">
                {/* Header */}
                <div className="mb-6 max-w-3xl sm:mb-8">
                    <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
                        Manage Flyer Here...
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 sm:text-base">
                        Upload an image, add a title, and write a description. Fully responsive for mobile, laptop, and large monitors.
                    </p>
                </div>

                {/* Card */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-2xl border border-gray-200 bg-white shadow-sm"
                >
                    {/* Grid that adapts on large screens */}
                    <div className="grid grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-2 lg:gap-10 lg:p-8">
                        {/* LEFT: inputs */}
                        <div className="space-y-6">
                            {/* Image input */}
                            <div>
                                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800 lg:text-base">
                                    <ImageIcon className="h-4 w-4 lg:h-5 lg:w-5" />
                                    Image
                                </label>

                                {!preview ? (
                                    <div className="mt-2 flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/60 p-6 text-center hover:bg-gray-50 sm:p-8">
                                        <UploadCloud className="h-8 w-8 text-gray-400 sm:h-10 sm:w-10" />
                                        <div className="text-sm text-gray-600 sm:text-base">
                                            Drag & drop an image here, or{" "}
                                            <button
                                                type="button"
                                                onClick={() => fileRef.current?.click()}
                                                className="font-medium text-indigo-600 hover:underline"
                                            >
                                                browse
                                            </button>
                                        </div>
                                        <input
                                            ref={fileRef}
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <p className="text-xs text-gray-500 sm:text-sm">
                                            PNG, JPG up to ~5MB
                                        </p>
                                    </div>
                                ) : (
                                    <div className="mt-3">
                                        <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={preview}
                                                alt="Selected"
                                                className="h-full w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute right-2 top-2 inline-flex items-center rounded-full bg-white/90 p-1 text-gray-700 shadow hover:bg-white"
                                                aria-label="Remove image"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Title (simple text) */}
                            <div>
                                <label
                                    htmlFor="title"
                                    className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800 lg:text-base"
                                >
                                    <Type className="h-4 w-4 lg:h-5 lg:w-5" />
                                    Flyer Title
                                </label>
                                <div className="relative">
                                    <input
                                        id="title"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Enter a clear, concise title"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 pr-10 text-sm text-gray-900 shadow-sm outline-none transition focus:border-indigo-500 sm:text-base"
                                        required
                                    />
                                    {title && (
                                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                                            {title.length}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Description (paragraph-like) */}
                            <div>
                                <label
                                    htmlFor="description"
                                    className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-800 lg:text-base"
                                >
                                    <FileText className="h-4 w-4 lg:h-5 lg:w-5" />
                                    Description
                                </label>
                                {/* <textarea
                                    id="description"
                                    name="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Write a brief description…"
                                    rows={6}
                                    className="w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 shadow-sm outline-none focus:border-indigo-500 sm:text-base"
                                /> */}

                                <JoditEditor
                                    ref={editor}
                                    value={description}
                                    onChange={newContent => setDescription(newContent)}
                                    name="description"
                                    placeholder="Write a brief description…"
                                />

                                <div className="mt-1 flex justify-end text-xs text-gray-500 sm:text-sm">
                                    {description.length} characters
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: live preview panel (sticks on xl for large monitors) */}
                        <div className="space-y-6 xl:sticky xl:top-8">
                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                                <h3 className="mb-3 text-base font-semibold text-gray-900 sm:text-lg">
                                    Live Preview
                                </h3>

                                <div className="overflow-hidden rounded-lg border bg-white">
                                    {/* Image preview */}
                                    <div className="relative aspect-video w-full bg-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        {preview ? (
                                            <img
                                                src={preview}
                                                alt="Preview"
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-gray-400">
                                                No image selected
                                            </div>
                                        )}
                                    </div>

                                    {/* Text preview */}
                                    <div className="space-y-2 p-4 flex flex-col items-center text-center">
                                        <div className="text-lg font-semibold text-gray-900">
                                            {title || "Your title will appear here"}
                                        </div>
                                        <div className="text-sm leading-6 text-gray-700 whitespace-pre-wrap">
                                            {parse(String(description)) || "Your description will appear here."}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 sm:text-sm">
                                Tip: On large screens the preview stays visible while you edit.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col-reverse items-stretch justify-between gap-3 border-t border-gray-100 p-4 sm:flex-row sm:items-center sm:p-6 lg:p-8">
                        <button
                            type="button"
                            onClick={() => {
                                setTitle("");
                                setDescription("");
                                removeImage();
                            }}
                            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 sm:text-base"
                        >
                            Reset
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70 sm:text-base"
                        >
                            {submitting && <Loader2 className="h-4 w-4 animate-spin sm:h-5 sm:w-5" />}
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
