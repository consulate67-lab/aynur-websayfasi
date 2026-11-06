import storiesData from "@/content/stories.json";

export type Story = {
  id: string;
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  body: string[];
  image: string;
  imageAlt: string;
  date: string;
};

export function getStories(): Story[] {
  return [...storiesData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export function getStoryBySlug(slug: string): Story | undefined {
  return getStories().find((story) => story.slug === slug);
}
