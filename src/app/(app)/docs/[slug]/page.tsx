import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocArticle } from "rbb/components/docs/DocArticle";
import { getAllDocs, getDoc, getSectionOf } from "rbb/content/docs";

type DocPageProps = { params: Promise<{ slug: string }> };

/** Every document is known at build time, so every URL is static. */
export function generateStaticParams() {
  return getAllDocs().map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) return {};
  return { title: doc.title, description: doc.summary };
}

export default async function DocPage({ params }: DocPageProps) {
  const { slug } = await params;
  const doc = getDoc(slug);
  if (!doc) notFound();

  return <DocArticle doc={doc} section={getSectionOf(slug)} />;
}
