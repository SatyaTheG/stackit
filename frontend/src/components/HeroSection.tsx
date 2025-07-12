"use client"

import { useState } from "react"
import { Search, HelpCircle, MessageCircle, Users, TrendingUp } from "lucide-react"

interface HeroSectionProps {
  setCurrentPage: (page: string) => void
}

export default function HeroSection({ setCurrentPage }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")

  const stats = [
    { icon: HelpCircle, label: "Questions", value: "12,847", color: "text-blue-600" },
    { icon: MessageCircle, label: "Answers", value: "34,256", color: "text-green-600" },
    { icon: Users, label: "Developers", value: "8,943", color: "text-purple-600" },
    { icon: TrendingUp, label: "Solutions", value: "25,180", color: "text-orange-600" },
  ]

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
      {/* Decorative star element */}
      <div className="absolute top-32 left-16 text-orange-400 text-4xl">✱</div>

      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8 relative">
        <div className="text-center space-y-8 mb-16">
          {/* Main Headlines */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl mx-auto">
              Knowledge starts with a <span className="underline decoration-4 decoration-gray-300">question</span>
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              A community-powered platform to ask questions, share solutions, and build expertise.
            </p>
          </div>

          {/* Search Component */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full shadow-lg border border-gray-200 p-2 flex items-center">
              <div className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="etc: Search Your Questions"
                  className="flex h-10 w-full rounded-md border-0 bg-transparent px-3 py-2 pl-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center space-x-2">
                <select className="border-0 bg-transparent text-gray-700 focus:ring-0 pr-8">
                  <option>Web Development</option>
                  <option>Mobile Development</option>
                  <option>Data Science</option>
                  <option>DevOps</option>
                </select>
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-orange-500 hover:bg-orange-600 text-white w-12 h-12 p-0 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6 text-gray-600">
              <span className="font-medium">Tech Stack:</span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                React
              </span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                C++
              </span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                Java
              </span>
              <span className="inline-flex items-center rounded-full border border-transparent bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer">
                MongoDB
              </span>
            </div>
          </div>
        </div>

        {/* Main Illustration Section - Clean with only the image */}
        <div className="relative max-w-5xl mx-auto">
          {/* Central Character Image - Clean and focused */}
          <div className="flex justify-center relative">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/couch.jpg-LltL7wMt5IZhv4eRDRVZ39e9J1yCOq.jpeg"
              alt="Developer on couch with laptop"
              className="max-w-4xl w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="rounded-xl border bg-white/80 backdrop-blur-sm text-center shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="p-6">
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
