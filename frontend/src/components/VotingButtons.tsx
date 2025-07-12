"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown, Check } from "lucide-react"

interface VotingButtonsProps {
  initialVotes?: number
  initialUserVote?: "up" | "down" | null
  canAccept?: boolean
  isAccepted?: boolean
  onVote?: (vote: "up" | "down" | null) => void
  onAccept?: () => void
}

export default function VotingButtons({
  initialVotes = 0,
  initialUserVote = null,
  canAccept = false,
  isAccepted = false,
  onVote,
  onAccept,
}: VotingButtonsProps) {
  const [votes, setVotes] = useState(initialVotes)
  const [userVote, setUserVote] = useState(initialUserVote)
  const [accepted, setAccepted] = useState(isAccepted)

  const handleVote = (voteType: "up" | "down") => {
    let newVotes = votes
    let newUserVote: "up" | "down" | null = voteType

    // Remove previous vote
    if (userVote === "up") newVotes--
    if (userVote === "down") newVotes++

    // Add new vote or remove if same
    if (userVote === voteType) {
      newUserVote = null
    } else {
      if (voteType === "up") newVotes++
      if (voteType === "down") newVotes--
    }

    setVotes(newVotes)
    setUserVote(newUserVote)
    onVote?.(newUserVote)
  }

  const handleAccept = () => {
    setAccepted(!accepted)
    onAccept?.()
  }

  return (
    <div className="flex flex-col items-center space-y-2">
      {/* Upvote Button */}
      <button
        type="button"
        onClick={() => handleVote("up")}
        className={`p-2 rounded-full hover:bg-green-100 transition-all duration-200 transform hover:scale-110 ${
          userVote === "up" ? "bg-green-100 text-green-600" : "text-gray-600 hover:text-green-600"
        }`}
      >
        <ChevronUp className="w-6 h-6" />
      </button>

      {/* Vote Count */}
      <span
        className={`text-lg font-semibold ${
          votes > 0 ? "text-green-600" : votes < 0 ? "text-red-600" : "text-gray-600"
        }`}
      >
        {votes}
      </span>

      {/* Downvote Button */}
      <button
        type="button"
        onClick={() => handleVote("down")}
        className={`p-2 rounded-full hover:bg-red-100 transition-all duration-200 transform hover:scale-110 ${
          userVote === "down" ? "bg-red-100 text-red-600" : "text-gray-600 hover:text-red-600"
        }`}
      >
        <ChevronDown className="w-6 h-6" />
      </button>

      {/* Accept Answer Button */}
      {canAccept && (
        <button
          type="button"
          onClick={handleAccept}
          className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
            accepted ? "bg-green-100 text-green-600" : "text-gray-600 hover:text-green-600 hover:bg-green-100"
          }`}
        >
          <Check className="w-6 h-6" />
        </button>
      )}
    </div>
  )
}
