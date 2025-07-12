"use client"

import { MessageCircle, ThumbsUp, Eye, Clock } from "lucide-react"

interface QuestionsListProps {
  setCurrentPage: (page: string) => void
}

export default function QuestionsList({ setCurrentPage }: QuestionsListProps) {
  const questions = [
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
    {
      id: 2,
      title: "React useEffect dependency array best practices",
      excerpt: "What are the best practices for managing dependencies in useEffect hooks?",
      author: {
        name: "Sarah Expert",
        avatar: "/placeholder.svg?height=32&width=32",
        reputation: 3420,
      },
      tags: ["react", "hooks", "useeffect"],
      votes: 28,
      answers: 7,
      views: 456,
      createdAt: "4 hours ago",
    },
    {
      id: 3,
      title: "TypeScript generic constraints with conditional types",
      excerpt: "How can I use conditional types with generic constraints in TypeScript?",
      author: {
        name: "Mike Coder",
        avatar: "/placeholder.svg?height=32&width=32",
        reputation: 890,
      },
      tags: ["typescript", "generics", "conditional-types"],
      votes: 12,
      answers: 2,
      views: 189,
      createdAt: "6 hours ago",
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-4 gap-8">
        {/* Questions List */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Questions</h2>
            <button
              type="button"
              onClick={() => setCurrentPage("ask")}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              Ask Question
            </button>
          </div>

          <div className="space-y-4">
            {questions.map((question) => (
              <div
                key={question.id}
                className="rounded-xl border bg-white shadow-sm hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02] cursor-pointer"
                onClick={() => setCurrentPage("question")}
              >
                <div className="p-6">
                  <div className="flex space-x-4">
                    {/* Vote/Answer Stats */}
                    <div className="flex flex-col items-center space-y-2 text-sm text-gray-600 min-w-[80px]">
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span className="font-medium">{question.votes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-4 h-4" />
                        <span className="font-medium">{question.answers}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span className="font-medium">{question.views}</span>
                      </div>
                    </div>

                    {/* Question Content */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200 mb-2">
                        {question.title}
                      </h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">{question.excerpt}</p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full border border-transparent bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                            <img
                              src={question.author.avatar || "/placeholder.svg"}
                              alt={question.author.name}
                              className="w-full h-full object-cover"
                            />
                            <span className="text-xs font-semibold text-gray-600">{question.author.name[0]}</span>
                          </div>
                          <span className="text-sm text-gray-600">{question.author.name}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{question.author.reputation} rep</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{question.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              type="button"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-6 py-3 text-base font-medium ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
            >
              Load More Questions
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Popular Tags */}
          <div className="rounded-xl border bg-white shadow-md">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {["react", "javascript", "typescript", "nextjs", "nodejs", "python", "css", "html"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-md border border-gray-300 bg-background px-2.5 py-0.5 text-xs font-semibold transition-colors hover:bg-blue-50 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Community Guidelines */}
          <div className="rounded-xl border border-blue-200 bg-blue-50">
            <div className="p-6">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">Community Guidelines</h2>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>• Be respectful and constructive</li>
                <li>• Search before asking</li>
                <li>• Provide clear examples</li>
                <li>• Accept helpful answers</li>
                <li>• Help others when you can</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
