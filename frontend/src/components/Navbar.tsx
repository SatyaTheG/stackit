"use client"

import { useState } from "react"
import { Bell, Search, Menu, X, ArrowRight } from "lucide-react"
import NotificationDropdown from "./NotificationDropdown"
import ProfileDropdown from "./ProfileDropdown"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Mock login state
  const [searchQuery, setSearchQuery] = useState("")

  // Mock current user data for profile dropdown
  const currentUser = {
    name: "John Developer",
    email: "john.developer@example.com",
    avatar: "/placeholder.svg?height=40&width=40",
    reputation: 1250,
    badges: 12,
    questions: 25,
    answers: 67,
    joinDate: "January 2023",
    location: "San Francisco, CA",
    company: "Tech Solutions Inc.",
    bio: "Full-stack developer passionate about React, Node.js, and building scalable applications.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
    githubUrl: "https://github.com/johndeveloper",
    linkedinUrl: "https://linkedin.com/in/johndeveloper",
    websiteUrl: "https://johndeveloper.dev",
  }

  const handleLinkClick = (path: string) => {
    // In a real app, you'd use Next.js's useRouter here
    console.log(`Navigating to ${path}`)
    setIsMenuOpen(false) // Close mobile menu on navigation
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button type="button" onClick={() => handleLinkClick("/")} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">StackIt</span>
          </button>

          {/* Center - Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right side - Ask Question, Notifications, Avatar */}
          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={() => handleLinkClick("/ask")}
              className="hidden md:block text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Ask Question
            </button>

            {isLoggedIn ? (
              <>
                {/* Notification Bell */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNotifications(!showNotifications)
                      setShowProfile(false)
                    }}
                    className="relative p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                      3
                    </span>
                  </button>
                  {showNotifications && <NotificationDropdown onClose={() => setShowNotifications(false)} />}
                </div>

                {/* User Profile */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProfile(!showProfile)
                      setShowNotifications(false)
                    }}
                    className="p-1 rounded-full hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={currentUser.avatar || "/placeholder.svg"}
                        alt={currentUser.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="text-sm font-semibold text-gray-600">{currentUser.name[0]}</span>
                    </div>
                  </button>
                  {showProfile && <ProfileDropdown currentUser={currentUser} onClose={() => setShowProfile(false)} />}
                </div>
              </>
            ) : (
              <>
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-gray-300 px-6 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-transparent"
                >
                  Get Started
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 w-8 h-8 p-0 text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button type="button" className="md:hidden p-2 rounded-md" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top duration-200">
            <div className="flex flex-col space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  className="flex h-10 w-full rounded-md border border-gray-200 bg-background px-3 py-2 pl-10 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                type="button"
                onClick={() => handleLinkClick("/")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-left p-2 rounded-md hover:bg-gray-100"
              >
                Home
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick("/about")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-left p-2 rounded-md hover:bg-gray-100"
              >
                About
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick("/contact")}
                className="text-gray-700 hover:text-gray-900 transition-colors duration-200 text-left p-2 rounded-md hover:bg-gray-100"
              >
                Contact Us
              </button>
              <button
                type="button"
                onClick={() => handleLinkClick("/ask")}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 text-left p-2 rounded-md hover:bg-gray-100"
              >
                Ask Question
              </button>
              {!isLoggedIn && (
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-gray-300 px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:border-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1 bg-transparent"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm font-medium text-white ring-offset-background transition-colors hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 flex-1"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
