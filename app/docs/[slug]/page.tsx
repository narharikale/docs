import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function DocPage({ params }: PageProps) {
  const { slug } = await params;
  
  try {
    // TODO: Replace with your new content loading logic
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Documentation</h1>
        <p>Content for {slug} will be loaded here.</p>
      </div>
    );
  } catch (error) {
    console.error(`Error loading content for slug "${slug}":`, error);
    notFound();
  }
} 