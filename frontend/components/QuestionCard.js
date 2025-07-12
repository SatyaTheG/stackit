import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';

export default function QuestionCard({ question }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Stats */}
        <div className="flex flex-col items-center space-y-2 text-sm text-gray-500">
          <div className="text-center">
            <div className="font-semibold text-gray-900">{question.votes?.length || 0}</div>
            <div>votes</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{question.answers?.length || 0}</div>
            <div>answers</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-900">{question.views || 0}</div>
            <div>views</div>
          </div>
        </div>

        {/* Question content */}
        <div className="flex-1 min-w-0">
          <Link href={`/question/${question.id}`} className="block">
            <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 line-clamp-2">
              {question.title}
            </h3>
          </Link>
          
          <p className="mt-2 text-gray-600 line-clamp-3">
            {question.content}
          </p>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {question.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {/* Meta info */}
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <span>Asked {formatDistanceToNow(new Date(question.created_at), { addSuffix: true })}</span>
              {question.author && (
                <>
                  <span>by</span>
                  <Link href={`/users/${question.author.id}`} className="text-blue-600 hover:text-blue-800">
                    {question.author.username}
                  </Link>
                </>
              )}
            </div>
            
            {question.is_answered && (
              <div className="flex items-center space-x-1 text-green-600">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Answered</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 