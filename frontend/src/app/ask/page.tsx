"use client"

import { useState } from "react"
import RichTextEditor from "../components/RichTextEditor"
import TagInput from "../components/TagInput"

export default function AskQuestion() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Reset form
    setTitle("")
    setDescription("")
    setTags([])
    setIsSubmitting(false)

    alert("Question posted successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Question</h1>
        <p className="text-gray-600">Get help from the community by asking a clear, detailed question.</p>
      </div>

      <div className="rounded-xl shadow-lg border-0 bg-white">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl text-gray-900 font-semibold">Question Details</h2>
        </div>
        <div className="p-6 space-y-6">
          {/* Title Field */}
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium text-gray-700">
              Question Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your programming question? Be specific."
              className="flex h-12 w-full rounded-lg border-2 border-gray-200 bg-background px-4 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 hover:border-gray-300"
            />
            <p className="text-sm text-gray-500">Be specific and imagine you're asking a question to another person.</p>
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question Description *</label>
            <RichTextEditor
              placeholder="Provide more details about your question. Include what you've tried, what you expected to happen, and what actually happened."
              value={description}
              onChange={setDescription}
              className="min-h-[300px]"
            />
            <p className="text-sm text-gray-500">
              Include all the information someone would need to answer your question.
            </p>
          </div>

          {/* Tags Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Tags</label>
            <TagInput
              tags={tags}
              onTagsChange={setTags}
              placeholder="Add up to 5 tags to describe what your question is about"
              maxTags={5}
            />
            <p className="text-sm text-gray-500">Add tags to help others find and answer your question.</p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim() || !description.trim()}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-medium text-white ring-offset-background transition-all duration-200 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Posting...</span>
                </div>
              ) : (
                "Post Your Question"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 shadow-sm">
        <div className="p-6 border-b border-blue-200">
          <h2 className="text-lg text-blue-900 font-semibold">Tips for a Great Question</h2>
        </div>
        <div className="p-6">
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Make your title specific and descriptive</li>
            <li>• Include relevant code, error messages, or examples</li>
            <li>• Explain what you've already tried</li>
            <li>• Use proper formatting and grammar</li>
            <li>• Add relevant tags to help others find your question</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
