import React from 'react';
import { Book, Download, Lock } from 'lucide-react';

interface Ebook {
  title: string;
  description: string;
  author: string;
  coverUrl: string;
  downloadUrl: string;
  pages: number;
  format: string;
  requiresSignup: boolean;
}

const ebooks: Ebook[] = [
  {
    title: "Beginner's Guide to Mushroom Cultivation",
    description: "A comprehensive guide covering the basics of mushroom cultivation, from spore to harvest.",
    author: "MushRoomService Team",
    coverUrl: "https://i.ibb.co/6Hw8Q2H/mushroom-guide-cover.jpg",
    downloadUrl: "/ebooks/beginners-guide.pdf",
    pages: 45,
    format: "PDF",
    requiresSignup: false
  },
  {
    title: "Advanced Agar Techniques",
    description: "Master the art of agar work with this detailed guide to isolation and culture preservation.",
    author: "Dr. Myco",
    coverUrl: "https://i.ibb.co/6Hw8Q2H/agar-techniques-cover.jpg",
    downloadUrl: "/ebooks/agar-techniques.pdf",
    pages: 30,
    format: "PDF",
    requiresSignup: true
  },
  {
    title: "Medicinal Mushrooms Handbook",
    description: "Learn about the healing properties of various mushroom species and their cultivation.",
    author: "Health Mycology Institute",
    coverUrl: "https://i.ibb.co/6Hw8Q2H/medicinal-mushrooms-cover.jpg",
    downloadUrl: "/ebooks/medicinal-mushrooms.pdf",
    pages: 60,
    format: "PDF",
    requiresSignup: true
  }
];

export function EbooksSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-amber-900">Free Educational Resources</h2>
          <div className="flex items-center gap-2 text-sm text-amber-700">
            <Lock className="w-4 h-4" />
            <span>Some resources require free signup</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ebooks.map((ebook, index) => (
            <div key={index} className="bg-amber-50/50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] relative">
                <img
                  src={ebook.coverUrl}
                  alt={ebook.title}
                  className="w-full h-full object-cover"
                />
                {ebook.requiresSignup && (
                  <div className="absolute top-2 right-2 bg-amber-600 text-white text-xs px-2 py-1 rounded-full flex items-center">
                    <Lock className="w-3 h-3 mr-1" />
                    Member Access
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-amber-900 mb-2">{ebook.title}</h3>
                <p className="text-amber-700 text-sm mb-4">{ebook.description}</p>
                
                <div className="space-y-2 text-sm text-amber-800 mb-4">
                  <p>Author: {ebook.author}</p>
                  <p>Pages: {ebook.pages}</p>
                  <p>Format: {ebook.format}</p>
                </div>

                <button
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md ${
                    ebook.requiresSignup
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-amber-600 text-white hover:bg-amber-700'
                  } transition-colors`}
                >
                  {ebook.requiresSignup ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Sign up to Download
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      Download Free
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}