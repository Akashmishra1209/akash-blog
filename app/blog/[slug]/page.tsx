import { fullBlog } from '@/lib/interface'
import { client, urlFor } from '@/lib/sanity'
import Image from 'next/image'
import { PortableText } from "@portabletext/react"

async function getData(slug: string) {
  try {
    const query = `
    *[_type == "blog" && slug.current == "${slug}"]{
      "currentSlug": slug.current,
      title,
      content,
      titleImage
    }[0]
    `;
    const data: fullBlog = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return null;
  }
}

export default async function Blog({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // Await and extract slug
  const data = await getData(slug);  // Fetch data based on slug

  if (!data) {
    return <div>Error fetching blog data.</div>;  // Return error message if data is null
  }

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary uppercase font-semibold tracking-wide">Akash Kumar - Blog</span>
        <span className="mt-2 block text-center leading-8 font-bold tracking-tight sm:text-4xl">{data.title}</span>
      </h1>
      <Image src={urlFor(data.titleImage).url()} width={800} height={800} alt="Title Image" priority className="rounded-lg mt-8 border" />
      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-li:marker:text-primary prose-a:text-primary">
        <PortableText value={data.content} />
      </div>
    </div>
  );
}