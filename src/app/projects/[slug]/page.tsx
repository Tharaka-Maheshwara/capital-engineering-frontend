import React from "react";

interface Props {
  params: { slug: string };
}

export default function ProjectPage({ params }: Props) {
  return (
    <main>
      <h1>Project: {params.slug}</h1>
    </main>
  );
}
