import React from 'react'

export default function FontTestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Dubai Font Test</h1>

        <div className="space-y-8">
          {/* Headings using Dubai Bold */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Headings (Dubai Bold)</h2>
            <h1 className="text-5xl font-bold mb-2">Heading 1 - Dubai Bold</h1>
            <h2 className="text-4xl font-bold mb-2">Heading 2 - Dubai Bold</h2>
            <h3 className="text-3xl font-bold mb-2">Heading 3 - Dubai Bold</h3>
            <h4 className="text-2xl font-bold mb-2">Heading 4 - Dubai Bold</h4>
            <h5 className="text-xl font-bold mb-2">Heading 5 - Dubai Bold</h5>
            <h6 className="text-lg font-bold mb-2">Heading 6 - Dubai Bold</h6>
          </section>

          {/* Body text using Dubai Regular */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Body Text (Dubai Regular)</h2>
            <p className="text-base mb-4">
              This is body text using Dubai Regular font. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p className="text-lg mb-4">
              This is larger body text using Dubai Regular font. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
            <p className="text-sm mb-4">
              This is smaller body text using Dubai Regular font. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </section>

          {/* Font weight variations */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Font Weight Variations</h2>
            <div className="space-y-2">
              <p className="font-dubai-light text-lg">Dubai Light (300) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-dubai-regular text-lg">Dubai Regular (400) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-dubai-medium text-lg">Dubai Medium (500) - The quick brown fox jumps over the lazy dog</p>
              <p className="font-dubai-bold text-lg">Dubai Bold (700) - The quick brown fox jumps over the lazy dog</p>
            </div>
          </section>

          {/* Using Tailwind font utilities */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Tailwind Font Utilities</h2>
            <div className="space-y-2">
              <p className="font-light text-lg">Tailwind font-light - The quick brown fox jumps over the lazy dog</p>
              <p className="font-normal text-lg">Tailwind font-normal - The quick brown fox jumps over the lazy dog</p>
              <p className="font-medium text-lg">Tailwind font-medium - The quick brown fox jumps over the lazy dog</p>
              <p className="font-bold text-lg">Tailwind font-bold - The quick brown fox jumps over the lazy dog</p>
            </div>
          </section>

          {/* Sample content */}
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Sample Content</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3 text-[#d5b15f]">Welcome to Hotelna</h3>
              <p className="text-base leading-relaxed mb-4">
                Hotelna is a boutique hospitality consultancy specializing in elevating hospitality experiences
                through innovative solutions and expert guidance. Our team brings years of industry expertise
                to help hotels and hospitality businesses reach their full potential.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#d5b15f] text-black px-6 py-2 rounded font-medium hover:bg-[#c19f4f] transition-colors">
                  Learn More
                </button>
                <button className="border border-[#d5b15f] text-[#d5b15f] px-6 py-2 rounded font-medium hover:bg-[#d5b15f] hover:text-black transition-colors">
                  Contact Us
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
