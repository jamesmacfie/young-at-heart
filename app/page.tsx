"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [age, setAge] = useState("just a wee bit older");
  const [agingQuality, setAgingQuality] = useState("normal, just your average old person");
  const [lifeEvents, setLifeEvents] = useState("nothing, it was smooth sailing");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);
    setError(null);
    setResult(null);

    const prompt = `make the person in this image ${age}. They have aged ${agingQuality}. In terms of life events: ${lifeEvents}. Photorealistic, high quality.`;

    try {
      const response = await fetch("/api/age", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image, prompt }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      if (Array.isArray(data.output)) {
          setResult(data.output[0]);
      } else {
          setResult(data.output);
      }
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-zinc-950 text-zinc-50 font-sans">
      <div className="w-full max-w-2xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl bg-gradient-to-r from-amber-200 to-yellow-500 bg-clip-text text-transparent">
            Young at Heart
          </h1>
          <p className="text-zinc-400">See what time has in store for you.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-sm">
          {/* Image Upload */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-zinc-300">
              Upload your photo
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-zinc-700 border-dashed rounded-xl cursor-pointer hover:bg-zinc-800/50 transition-colors">
                {image ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={image}
                      alt="Preview"
                      fill
                      className="object-contain rounded-xl p-2"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-zinc-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-zinc-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-zinc-500">PNG, JPG or GIF</p>
                  </div>
                )}
                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
              </label>
            </div>
          </div>

          {/* Options */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">How old?</label>
              <select
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="just a wee bit older">Just a wee bit older</option>
                <option value="much older">Much older</option>
                <option value="super old, like older than anyone else. Ever">Super old (Ancient)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">Aging Quality</label>
              <select
                value={agingQuality}
                onChange={(e) => setAgingQuality(e.target.value)}
                className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="excellent, they look amazing for their age">Excellent (Amazing)</option>
                <option value="normal, just your average old person">Normal (Average)</option>
                <option value="terribly. Skin sagging, droopy eyes, the works">Terribly (Rough)</option>
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-zinc-300">Life Events</label>
              <select
                value={lifeEvents}
                onChange={(e) => setLifeEvents(e.target.value)}
                className="w-full bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-zinc-200 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              >
                <option value="nothing, it was smooth sailing">Smooth sailing</option>
                <option value="had a rebellion stage. Tattoos and piercings">Rebellion stage</option>
                <option value="really messed up and went to jail and got face tatoos and got beat up to. Broken nose, missing teeth etc.">Hard life (Jail, scars, etc)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!image || loading}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-lg hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-900/20"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Aging in progress...
              </span>
            ) : (
              "Make me old!"
            )}
          </button>
        </form>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-800 text-red-200 rounded-xl text-center">
            {error}
          </div>
        )}

        {result && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-2xl font-bold text-center text-zinc-200">Your Future Self</h2>
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-zinc-700 shadow-2xl">
              <Image
                src={result}
                alt="Aged version"
                fill
                className="object-cover"
              />
            </div>
            <a
              href={result}
              download="aged-photo.png"
              className="block w-full py-3 text-center text-amber-500 hover:text-amber-400 font-medium transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download Image
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
