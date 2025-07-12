"use client"

import HeroSection from "@/components/HeroSection"
import QuestionsList from "@/components/QuestionsList"
import { useState } from "react"


export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("home")

  // Mock data for question and answers (for ask and question pages)
  const questionsData = [
    {
      id: 1,
      title: "How to implement authentication in Next.js with JWT tokens?",
      excerpt: "I'm building a Next.js application and need to implement user authentication using JWT tokens...",
      author: {
        name: "John Developer",
        avatar: "/placeholder.svg?height=32&width=32",
        reputation: 1250,
      },
      tags: ["nextjs", "jwt", "authentication", "react"],
      votes: 15,
      answers: 3,
      views: 234,
      createdAt: "2 hours ago",
    },
  ]

  const answersData = [
    {
      id: 1,
      content:
        "You can implement JWT authentication in Next.js using several approaches. Here's a comprehensive solution using NextAuth.js...",
      author: {
        name: "Sarah Expert",
        avatar: "/placeholder.svg",
        reputation: 3420,
      },
      votes: 12,
      isAccepted: true,
      createdAt: "1 hour ago",
    },
  ]

  return (
  
    <div className="min-h-screen bg-gray-50">
      {currentPage === "home" && (
        <>
          <HeroSection setCurrentPage={setCurrentPage} />
          <QuestionsList setCurrentPage={setCurrentPage} />
          {/* Footer moved to bottom */}
          <div className="bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center">
                <h3 className="text-white text-lg font-semibold mb-8">Trusted By 1M+ Business</h3>
                <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
                  {["Luminous", "Lightbox", "FocalPoint", "Polymath", "Alt+Shift", "Nietzsche"].map((company) => (
                    <div key={company} className="text-gray-400 font-medium text-lg">
                      {company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {currentPage === "ask" && (
        <div className="pt-20">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
              <p className="text-gray-600">Get help from the community by asking a clear, detailed question.</p>
            </div>
            <div className="rounded-xl shadow-lg border-0 bg-white">
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Question Title *</label>
                    <input
                      type="text"
                      placeholder="What's your programming question? Be specific."
                      className="flex h-12 w-full rounded-lg border-2 border-gray-200 bg-background px-4 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-2">Question Description *</label>
                    <textarea
                      placeholder="Provide more details about your question..."
                      rows={8}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-medium text-white ring-offset-background transition-all duration-200 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Post Your Question
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {currentPage === "question" && (
        <div className="pt-20">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="rounded-xl shadow-lg border-0 bg-white mb-8">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{questionsData[0].title}</h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  {questionsData[0].tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border border-transparent bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6">{questionsData[0].excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-600">{questionsData[0].author.name[0]}</span>
                    </div>
                    <span className="text-sm text-gray-600">{questionsData[0].author.name}</span>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Answer Question
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
  // return ( <div className = "heading-test">testtttt </div>)

}

