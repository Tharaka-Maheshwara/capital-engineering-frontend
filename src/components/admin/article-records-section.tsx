import type { ArticleRecord } from "@/components/admin/article-manager-types";

type ArticleRecordsSectionProps = {
  articles: ArticleRecord[];
  onEdit: (article: ArticleRecord) => void;
  onDelete: (articleId: number) => void;
};

export default function ArticleRecordsSection({
  articles,
  onEdit,
  onDelete,
}: ArticleRecordsSectionProps) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Article records
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-[-0.03em] text-slate-900">
            Saved articles
          </h2>
        </div>
        <span className="text-sm font-medium text-slate-500">
          {articles.length} items
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {articles.map((article) => {
          const mainImage =
            article.imageUrls && article.imageUrls.length > 0
              ? article.imageUrls[0]
              : null;

          return (
            <article
              key={article.id}
              className="rounded-[18px] border border-slate-200 bg-slate-50/80 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <div className="flex h-24 w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={article.title}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <span className="text-sm font-semibold text-slate-400">
                        No image
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {article.title}
                    </h3>
                    {article.description && (
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 line-clamp-3">
                        {article.description}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {article.youtubeLink && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-600">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
                            <path d="M21.8 8.001a2.75 2.75 0 0 0-1.94-1.95C18.16 5.6 12 5.6 12 5.6s-6.16 0-7.86.451A2.75 2.75 0 0 0 2.2 8.001 28.6 28.6 0 0 0 1.75 12a28.6 28.6 0 0 0 .45 3.999 2.75 2.75 0 0 0 1.94 1.95C5.84 18.4 12 18.4 12 18.4s6.16 0 7.86-.451a2.75 2.75 0 0 0 1.94-1.95 28.6 28.6 0 0 0 .45-4 28.6 28.6 0 0 0-.45-3.998zM10 15V9l5.196 3L10 15z" />
                          </svg>
                          YouTube
                        </span>
                      )}
                      <p className="text-xs uppercase tracking-[0.12em] text-slate-500">
                        Images: {article.imageUrls?.length || 0}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:flex-col sm:items-end">
                  <button
                    type="button"
                    onClick={() => onEdit(article)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 transition-colors hover:bg-slate-100 sm:w-auto"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(article.id)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-rose-700 transition-colors hover:bg-rose-100 sm:w-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {articles.length === 0 && (
          <div className="rounded-[18px] border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
            No articles yet. Click &ldquo;Add New Article&rdquo; to create the first one.
          </div>
        )}
      </div>
    </section>
  );
}
