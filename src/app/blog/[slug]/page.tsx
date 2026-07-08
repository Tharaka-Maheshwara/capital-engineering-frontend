import React from "react";

export const metadata = {
  title: "Blog Post",
  description:
    "Construction stories and insights from Capital Engineering Ceylon.",
  robots: {
    index: false,
    follow: false,
  },
};

interface Props {
  params: { slug: string };
}

export default function BlogPost({ params }: Props) {
  return (
    <main>
      <h1>Blog: {params.slug}</h1>
    </main>
  );
}
