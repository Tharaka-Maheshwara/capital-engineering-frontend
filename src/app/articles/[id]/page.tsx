import Link from 'next/link';
import { notFound } from 'next/navigation';

// It's a good practice to have this URL in an environment variable
const API_URL = 'http://localhost:8000/api/v1';

// Based on the ArticleResource from the backend
type Article = {
  id: number;
  title: string;
  description: string;
  youtube_link: string | null;
  image_urls: string[];
  created_at: string;
};

type SingleArticleResponse = {
    data: Article;
}

async function getArticle(id: string): Promise<SingleArticleResponse | null> {
  try {
    const res = await fetch(`${API_URL}/articles/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!res.ok) {
      // If the article is not found, the API might return a 404
      if (res.status === 404) {
        return null;
      }
      // For other errors, log them
      console.error(`Failed to fetch article ${id}: ${res.status} ${res.statusText}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error(`An error occurred while fetching article ${id}:`, error);
    return null;
  }
}

// This tells Next.js which dynamic routes to pre-render at build time.
// It's optional but good for performance.
export async function generateStaticParams() {
    try {
        const res = await fetch(`${API_URL}/articles?per_page=20`); // Fetch first 20 articles
        if (!res.ok) return [];

        const articlesResponse: { data: Article[] } = await res.json();
        
        return articlesResponse.data.map((article) => ({
            id: article.id.toString(),
        }));
    } catch (error) {
        console.error('Could not generate static params for articles:', error);
        return [];
    }
}


export default async function SingleArticlePage({ params }: { params: { id: string } }) {
  const articleResponse = await getArticle(params.id);

  if (!articleResponse || !articleResponse.data) {
    notFound(); // Triggers the not-found.tsx page
  }

  const article = articleResponse.data;

  return (
    <main className="bg-slate-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <Link href="/articles" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              &larr; Back to Articles
            </Link>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg text-slate-400">
              Published on {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          {/* Featured Image */}
          {article.image_urls[0] && (
            <div className="mb-12">
              <img 
                src={article.image_urls[0]} 
                alt={article.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Article Content */}
          <div 
            className="prose prose-invert prose-lg max-w-none mx-auto text-slate-300
                       prose-p:leading-relaxed
                       prose-a:text-indigo-400 hover:prose-a:text-indigo-300
                       prose-headings:text-white"
            dangerouslySetInnerHTML={{ __html: article.description }} 
          />

          {/* YouTube Video */}
          {article.youtube_link && (
            <div className="mt-16">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Watch Video</h2>
                <div className="aspect-w-16 aspect-h-9">
                    <iframe 
                        src={`https://www.youtube.com/embed/${new URL(article.youtube_link).searchParams.get('v')}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                        className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                </div>
            </div>
          )}

        </div>
      </div>
    </main>
  );
}
