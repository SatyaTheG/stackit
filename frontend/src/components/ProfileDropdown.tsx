"use client"

import { useEffect, useRef } from "react"
import { User, Settings, LogOut, Award, BookOpen } from "lucide-react"

interface ProfileDropdownProps {
  currentUser: {
    name: string
    email: string
    avatar: string
    reputation: number
    badges: number
    questions: number
    answers: number
    joinDate: string
    location: string
    company: string
    bio: string
    skills: string[]
    githubUrl: string
    linkedinUrl: string
    websiteUrl: string
  }
  onClose: () => void
}

export default function ProfileDropdown({ currentUser, onClose }: ProfileDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [onClose])

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-2xl border border-gray-100 animate-in slide-in-from-top-2 duration-200 z-50"
    >
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
            <img
              src={currentUser.avatar || "/placeholder.svg"}
              alt={currentUser.name}
              className="w-full h-full object-cover"
            />
            <span className="text-lg font-semibold text-gray-600">{currentUser.name[0]}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900">{currentUser.name}</h3>
            <p className="text-sm text-gray-500">{currentUser.email}</p>
            <p className="text-sm text-gray-600 mt-1">{currentUser.company}</p>
            <p className="text-sm text-gray-500">{currentUser.location}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{currentUser.reputation} reputation</span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm text-gray-600">{currentUser.bio}</p>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{currentUser.questions}</div>
            <div className="text-xs text-gray-500">Questions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{currentUser.answers}</div>
            <div className="text-xs text-gray-500">Answers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{currentUser.badges}</div>
            <div className="text-xs text-gray-500">Badges</div>
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Top Skills</h4>
          <div className="flex flex-wrap gap-1">
            {currentUser.skills.map((skill) => (
              <span key={skill} className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <button type="button" className="w-full flex justify-start items-center p-3 rounded-md hover:bg-gray-50">
            <User className="w-4 h-4 mr-3" />
            View Profile
          </button>
          <button type="button" className="w-full flex justify-start items-center p-3 rounded-md hover:bg-gray-50">
            <Settings className="w-4 h-4 mr-3" />
            Settings
          </button>
          <button type="button" className="w-full flex justify-start items-center p-3 rounded-md hover:bg-gray-50">
            <BookOpen className="w-4 h-4 mr-3" />
            My Questions
          </button>
          <div className="border-t border-gray-100 pt-2">
            <button
              type="button"
              className="w-full flex justify-start items-center p-3 rounded-md hover:bg-red-50 text-red-600"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
