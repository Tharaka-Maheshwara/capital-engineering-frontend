import React from 'react'

interface Props { params: { slug: string } }

export default function BlogPost({ params }: Props) {
  return (
    <main>
      <h1>Blog: {params.slug}</h1>
    </main>
  )
}
