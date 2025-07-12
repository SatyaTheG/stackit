"use client"

import { useEffect, useRef } from "react"
import { Bell, MessageCircle, ThumbsUp, Check } from "lucide-react"

interface NotificationDropdownProps {
  onClose: () => void
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
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

  const notifications = [
    {
      id: 1,
      type: "answer",
      message: "Sarah Expert answered your question about React hooks",
      time: "2 minutes ago",
      icon: MessageCircle,
      unread: true,
    },
    {
      id: 2,
      type: "upvote",
      message: "Your answer received 5 upvotes",
      time: "1 hour ago",
      icon: ThumbsUp,
      unread: true,
    },
    {
      id: 3,
      type: "accepted",
      message: "Your answer was accepted",
      time: "3 hours ago",
      icon: Check,
      unread: false,
    },
  ]

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 animate-in slide-in-from-top-2 duration-200 z-50"
    >
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Bell className="w-5 h-5 mr-2" />
          Notifications
        </h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => {
          const IconComponent = notification.icon
          return (
            <div
              key={notification.id}
              className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                notification.unread ? "bg-blue-50" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`p-2 rounded-full ${notification.unread ? "bg-blue-100" : "bg-gray-100"}`}>
                  <IconComponent className={`w-4 h-4 ${notification.unread ? "text-blue-600" : "text-gray-600"}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                </div>
                {notification.unread && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
              </div>
            </div>
          )
        })}
      </div>
      <div className="p-4 border-t border-gray-100">
        <button type="button" className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
          View all notifications
        </button>
      </div>
    </div>
  )
}
