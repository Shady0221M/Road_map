"use client";

import Link from "next/link";
import { useState } from "react";

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  const goToSlide = (dir: number) => {
    let newCurrent = current + dir;

    if (newCurrent < 0) newCurrent = 0;
    if (newCurrent > 2) newCurrent = 2;

    setCurrent(newCurrent);
  };

  return (
    <section className="bg-[#111111] text-white">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-6 py-20 lg:flex-row lg:items-start">

        {/* LEFT */}
        <div className="w-full lg:w-1/2">
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            Master JEE with a{" "}
            <span className="text-[#ff6b00]">structured roadmap</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 md:text-xl">
            Follow a step-by-step learning path that breaks down concepts.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/learn"
              className="rounded-full bg-[#ff6b00] px-8 py-3 font-semibold text-black"
            >
              Start Learning
            </Link>

            <Link
              href="/learn"
              className="rounded-full border border-gray-600 px-8 py-3 text-gray-200"
            >
              Explore Subjects
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div className="w-full lg:w-1/2">
          <div className="relative mx-auto h-80 w-full max-w-lg sm:h-96 lg:h-[480px]">
            {/* IMAGE 1 */}
            <img
              src="/img1.png"
              className={`absolute inset-0 h-full w-full object-contain rounded-3xl border border-gray-800 shadow-2xl transition-opacity duration-500 ${
                current === 0 ? 'opacity-100' : 'opacity-0'
              }`}
              alt="JEE Learning Roadmap - Study Plan"
            />

            {/* IMAGE 2 */}
            <img
              src="/img2.png"
              className={`absolute inset-0 h-full w-full object-contain rounded-3xl border border-gray-800 shadow-2xl transition-opacity duration-500 ${
                current === 1 ? 'opacity-100' : 'opacity-0'
              }`}
              alt="JEE Learning Roadmap - Progress Tracking"
            />

            {/* IMAGE 3 */}
            <img
              src="/img3.png"
              className={`absolute inset-0 h-full w-full object-contain rounded-3xl border border-gray-800 shadow-2xl transition-opacity duration-500 ${
                current === 2 ? 'opacity-100' : 'opacity-0'
              }`}
              alt="JEE Learning Roadmap - Achievement System"
            />

            {/* LEFT BUTTON */}
            <button
              onClick={() => goToSlide(-1)}
              disabled={current === 0}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-white shadow-lg transition-all hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ←
            </button>

            {/* RIGHT BUTTON */}
            <button
              onClick={() => goToSlide(1)}
              disabled={current === 2}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/80 px-4 py-3 text-white shadow-lg transition-all hover:bg-black/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              →
            </button>

            {/* INDICATOR DOTS */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  onClick={() => setCurrent(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    current === index
                      ? 'bg-[#ff6b00] scale-110'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}