export type ArticleRecord = {
  id: number;
  title: string;
  description: string;
  youtubeLink?: string;
  imageUrls: string[];
  createdAt: string;
};

export type ArticleFormState = {
  title: string;
  description: string;
  youtubeLink: string;
};
