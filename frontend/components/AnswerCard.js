import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';

export default function AnswerCard({ answer }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-start space-x-4">
        {/* Vote buttons */}
        <div className="flex flex-col items-center space-y-2">
          <button className="text-gray-400 hover:text-blue-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          
          <div className="text-lg font-semibold text-gray-900">
            {answer.votes?.reduce((sum, vote) => sum + (vote.is_upvote ? 1 : -1), 0) || 0}
          </div>
          
          <button className="text-gray-400 hover:text-blue-600">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Answer content */}
        <div className="flex-1 min-w-0">
          <div className="prose max-w-none">
            <p className="text-gray-800 leading-relaxed">
              {answer.content}
            </p>
          </div>

          {/* Meta info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>Answered {formatDistanceToNow(new Date(answer.created_at), { addSuffix: true })}</span>
              {answer.author && (
                <>
                  <span>by</span>
                  <Link href={`/users/${answer.author.id}`} className="text-blue-600 hover:text-blue-800">
                    {answer.author.username}
                  </Link>
                </>
              )}
            </div>
            
            {answer.is_accepted && (
              <div className="flex items-center space-x-1 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Accepted</span>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center space-x-4">
            <button className="text-gray-500 hover:text-blue-600 text-sm">
              Comment
            </button>
            <button className="text-gray-500 hover:text-blue-600 text-sm">
              Share
            </button>
            <button className="text-gray-500 hover:text-blue-600 text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 