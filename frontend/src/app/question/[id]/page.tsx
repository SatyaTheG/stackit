"use client"

import { useState } from "react"

import { MessageCircle, Share2, Bookmark, Clock } from "lucide-react"
import VotingButtons from "../../components/VotingButtons"
import RichTextEditor from "../../components/RichTextEditor"

export default function QuestionDetail() {
  const [newAnswer, setNewAnswer] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state

  // Mock question data
  const question = {
    id: 1,
    title: "How to implement authentication in Next.js with JWT tokens?",
    description:
      "I'm building a Next.js application and need to implement user authentication using JWT tokens. I've tried several approaches but I'm running into issues with token storage and validation. Here's what I've tried so far...",
    author: {
      name: "John Developer",
      avatar: "/placeholder.svg",
      reputation: 1250,
    },
    tags: ["nextjs", "jwt", "authentication", "react"],
    votes: 15,
    answers: 3,
    views: 234,
    createdAt: "2 hours ago",
  }

  // Mock answers data
  const answers = [
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
    {
      id: 2,
      content:
        "Another approach is to use a custom implementation with cookies and middleware. This gives you more control...",
      author: {
        name: "Mike Coder",
        avatar: "/placeholder.svg",
        reputation: 890,
      },
      votes: 5,
      isAccepted: false,
      createdAt: "30 minutes ago",
    },
  ]

  const handleSubmitAnswer = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true)
      return
    }

    if (!newAnswer.trim()) {
      alert("Please write an answer before submitting")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setNewAnswer("")
    setIsSubmitting(false)
    alert("Answer posted successfully!")
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Question Section */}
      <div className="rounded-xl shadow-lg border-0 bg-white mb-8">
        <div className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">{question.title}</h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>Asked {question.createdAt}</span>
                </div>
                <span>•</span>
                <span>{question.views} views</span>
                <span>•</span>
                <span>{question.answers} answers</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full border border-transparent bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 transition-colors hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2 ml-4">
              <button
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
              >
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
              >
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </button>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex space-x-6">
            <VotingButtons initialVotes={question.votes} canAccept={false} />

            <div className="flex-1">
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700 leading-relaxed">{question.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                    <img
                      src={question.author.avatar || "/placeholder.svg"}
                      alt={question.author.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="text-sm font-semibold text-gray-600">{question.author.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{question.author.name}</p>
                    <p className="text-xs text-gray-500">{question.author.reputation} reputation</p>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Add Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Answers Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {answers.length} Answer{answers.length !== 1 ? "s" : ""}
        </h2>

        <div className="space-y-6">
          {answers.map((answer) => (
            <div
              key={answer.id}
              className={`rounded-xl shadow-md border-0 ${answer.isAccepted ? "bg-green-50 border-l-4 border-l-green-500" : "bg-white"}`}
            >
              <div className="p-6">
                <div className="flex space-x-6">
                  <VotingButtons initialVotes={answer.votes} canAccept={true} isAccepted={answer.isAccepted} />

                  <div className="flex-1">
                    {answer.isAccepted && (
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="inline-flex items-center rounded-full border border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-800 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                          ✓ Accepted Answer
                        </span>
                      </div>
                    )}

                    <div className="prose max-w-none mb-6">
                      <p className="text-gray-700 leading-relaxed">{answer.content}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                          <img
                            src={answer.author.avatar || "/placeholder.svg"}
                            alt={answer.author.name}
                            className="w-full h-full object-cover"
                          />
                          <span className="text-sm font-semibold text-gray-600">{answer.author.name[0]}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{answer.author.name}</p>
                          <p className="text-xs text-gray-500">
                            {answer.author.reputation} reputation • {answer.createdAt}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-3 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Add Comment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Answer Form */}
      <div className="rounded-xl shadow-lg border-0 bg-white">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900">Your Answer</h3>
        </div>
        <div className="p-6 space-y-4">
          <RichTextEditor
            placeholder="Write your answer here. Be clear and provide examples if possible."
            value={newAnswer}
            onChange={setNewAnswer}
            className="min-h-[250px]"
          />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleSubmitAnswer}
              disabled={isSubmitting}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-medium text-white ring-offset-background transition-all duration-200 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                "Post Your Answer"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-in fade-in duration-200">
          <div className="w-full max-w-md mx-4 rounded-xl shadow-lg border bg-white animate-in slide-in-from-bottom duration-300">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Login Required</h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-600">You need to be logged in to post an answer.</p>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 bg-transparent"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false)
                    // Redirect to login
                  }}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
