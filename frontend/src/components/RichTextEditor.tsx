"use client"

import { useState } from "react"
import { Bold, Italic, Underline, List, Link, ImageIcon, Code } from "lucide-react"

interface RichTextEditorProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  className?: string
}

export default function RichTextEditor({
  placeholder = "Write your content here...",
  value = "",
  onChange,
  className = "",
}: RichTextEditorProps) {
  const [content, setContent] = useState(value)
  const [activeFormats, setActiveFormats] = useState<string[]>([])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    onChange?.(newContent)
  }

  const formatButtons = [
    { icon: Bold, format: "bold", label: "Bold" },
    { icon: Italic, format: "italic", label: "Italic" },
    { icon: Underline, format: "underline", label: "Underline" },
    { icon: List, format: "list", label: "List" },
    { icon: Link, format: "link", label: "Link" },
    { icon: ImageIcon, format: "image", label: "Image" },
    { icon: Code, format: "code", label: "Code" },
  ]

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all duration-200 ${className}`}
    >
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
        {formatButtons.map(({ icon: Icon, format, label }) => (
          <button
            key={format}
            type="button"
            className={`p-2 h-8 w-8 rounded-md hover:bg-gray-200 transition-all duration-200 ${
              activeFormats.includes(format) ? "bg-blue-100 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => {
              // Toggle format
              setActiveFormats((prev) => (prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]))
            }}
            title={label}
          >
            <Icon className="w-4 h-4" />
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[200px] resize-none border-none outline-none text-gray-900 placeholder-gray-500"
          style={{ fontFamily: "inherit" }}
        />
      </div>
    </div>
  )
}
