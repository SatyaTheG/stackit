import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '../components/Header';
import QuestionCard from '../components/QuestionCard';
import { api } from '../utils/api';

export default function Questions() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, [filter, page]);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/questions?skip=${(page - 1) * 20}&limit=20`);
      if (page === 1) {
        setQuestions(response.data);
      } else {
        setQuestions(prev => [...prev, ...response.data]);
      }
      setHasMore(response.data.length === 20);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setPage(1);
    setQuestions([]);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Questions - StackIt</title>
      </Head>

      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">All Questions</h1>
            <p className="text-gray-600 mt-2">
              Browse through questions from the StackIt community
            </p>
          </div>
          <Link
            href="/questions/ask"
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Ask Question
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-6">
            <span className="text-sm font-medium text-gray-700">Sort by:</span>
            <button
              onClick={() => handleFilterChange('newest')}
              className={`text-sm px-3 py-1 rounded-md ${
                filter === 'newest'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Newest
            </button>
            <button
              onClick={() => handleFilterChange('votes')}
              className={`text-sm px-3 py-1 rounded-md ${
                filter === 'votes'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Most Voted
            </button>
            <button
              onClick={() => handleFilterChange('unanswered')}
              className={`text-sm px-3 py-1 rounded-md ${
                filter === 'unanswered'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Unanswered
            </button>
            <button
              onClick={() => handleFilterChange('answered')}
              className={`text-sm px-3 py-1 rounded-md ${
                filter === 'answered'
                  ? 'bg-blue-100 text-blue-800'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Answered
            </button>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-lg p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Load More Questions
            </button>
          </div>
        )}

        {/* No More Questions */}
        {!hasMore && questions.length > 0 && (
          <div className="text-center mt-8">
            <p className="text-gray-500">No more questions to load.</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && questions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
            <p className="text-gray-600 mb-6">
              {filter === 'unanswered' 
                ? 'All questions have been answered!'
                : 'Be the first to ask a question.'
              }
            </p>
            <Link
              href="/questions/ask"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Ask the First Question
            </Link>
          </div>
        )}
      </main>
    </div>
  );
} 