import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { simpleBlogCard } from '@/lib/interface';
import { client, urlFor } from '@/lib/sanity';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export async function getData() {
  const query = `*[_type=="blog"] |order(_createdAt desc){
  title,
  smallDescription,
  "currentSlug":slug.current,
  titleImage
  
}`
  const data = await client.fetch(query)
  return data
}
export default async function Home() {
  const data: simpleBlogCard[] = await getData()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((post) => (
        <Card key={post.currentSlug}>
          <Image src={urlFor(post.titleImage).url()} alt="Image" width={500} height={500} className="rounded-t-lg h-[200px] object-cover"/>
          <CardContent className="mt-5">
        <h2 className="text-lg line-clamp-2 font-bold">{post.title}</h2>
        <p className='line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300'>{post.smallDescription}</p>
        <Button className="w-full mt-7" asChild>
          <Link href={`/blog/${post.currentSlug}`}>Read More</Link>
        </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
