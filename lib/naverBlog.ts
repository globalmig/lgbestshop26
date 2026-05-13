export interface NaverBlogPost {
  title: string;
  href: string;
  src: string;
}

export async function getNaverBlogPosts(blogId: string, count = 10): Promise<NaverBlogPost[]> {
  try {
    const res = await fetch(`https://rss.blog.naver.com/${blogId}.xml`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const xml = await res.text();
    const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];

    return items.slice(0, count).map((match) => {
      const item = match[1];
      const title = item.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] ?? "";
      const href = item.match(/<link>(.*?)<\/link>/)?.[1]?.trim() ?? "#";
      const desc = item.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/)?.[1] ?? "";
      const src = desc.match(/<img[^>]+src="([^"]+)"/)?.[1] ?? "";
      return { title, href, src };
    });
  } catch {
    return [];
  }
}
