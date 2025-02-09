import React from 'react';
import { BlogPost as BlogPostType } from '../types';
import { Calendar, Clock, User } from 'lucide-react';
import { marked } from 'marked';

interface BlogPostProps {
  post: BlogPostType;
  isPreview?: boolean;
}

export function BlogPost({ post, isPreview }: BlogPostProps) {
  const formattedDate = new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const [showFullContent, setShowFullContent] = React.useState(false);

  // Convert markdown content to HTML
  const renderContent = () => {
    try {
      return { __html: marked(post.content) };
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return { __html: post.content };
    }
  };

  return (
    <article className="bg-white rounded-lg shadow-md p-8">
      {post.featured_image && (
        <img
          src={post.featured_image}
          alt={post.title}
          className="w-full h-[400px] object-cover rounded-lg mb-8"
        />
      )}
      
      <h1 className="text-3xl font-bold text-amber-900 mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-6 text-amber-700 mb-8">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{formattedDate}</span>
        </div>
        {!post.is_published && (
          <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
            Draft
          </span>
        )}
      </div>

      {isPreview && !showFullContent ? (
        <div className="mb-6">
          <p className="text-amber-800">{post.excerpt}</p>
          <button
            onClick={() => setShowFullContent(true)}
            className="inline-block mt-4 text-amber-600 hover:text-amber-700"
          >
            Read more →
          </button>
        </div>
      ) : (
        <div
          className="prose prose-amber lg:prose-lg max-w-none"
          dangerouslySetInnerHTML={renderContent()}
        />
      )}
    </article>
  );
}