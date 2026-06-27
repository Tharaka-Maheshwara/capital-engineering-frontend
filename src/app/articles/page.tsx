import Link from 'next/link';

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

type PaginatedArticles = {
    data: Article[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        path: string;
        per_page: number;
        to: number;
        total: number;
    }
}

async function getArticles(): Promise<PaginatedArticles | null> {
  try {
    const res = await fetch(`${API_URL}/articles`, {
      // Revalidate every hour
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      // Log the error for debugging on the server
      console.error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
      return null;
    }

    return res.json();
  } catch (error) {
    console.error('An error occurred while fetching articles:', error);
    return null;
  }
}

export default async function ArticlesPage() {
  const articlesResponse = await getArticles();

  if (!articlesResponse || !articlesResponse.data || articlesResponse.data.length === 0) {
    return (
      <main className="bg-slate-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Articles</h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            No articles found at the moment. Please check back later.
          </p>
        </div>
      </main>
    );
  }

  const articles = articlesResponse.data;

  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Our Articles
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg leading-8 text-slate-300">
            Explore insights, trends, and stories from the world of engineering and construction.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link href={`/articles/${article.id}`} key={article.id}>
                <div className="flex flex-col overflow-hidden rounded-lg shadow-lg bg-slate-800/60 hover:bg-slate-800/90 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                    <div className="flex-shrink-0">
                        <img 
                            className="h-48 w-full object-cover" 
                            src={article.image_urls[0] || 'https://via.placeholder.com/400x200?text=Capital+Engineering'} 
                            alt={article.title} 
                        />
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-6">
                        <div className="flex-1">
                            <p className="text-sm font-medium text-indigo-400">
                                Article
                            </p>
                            <div className="mt-2 block">
                                <p className="text-xl font-semibold text-slate-50">
                                    {article.title}
                                </p>
                                <p className="mt-3 text-base text-slate-300 line-clamp-3" dangerouslySetInnerHTML={{ __html: article.description }}>
                                </p>
                            </div>
                        </div>
                        <div className="mt-6 flex items-center">
                            <div className="text-sm text-slate-400">
                                <time dateTime={article.created_at}>
                                    {new Date(article.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </time>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
