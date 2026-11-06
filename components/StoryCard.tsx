import Image from "next/image";
import type { Story } from "@/lib/stories";
import { Reveal } from "./Reveal";

export function StoryCard({
  story,
  reverse = false,
}: {
  story: Story;
  reverse?: boolean;
}) {
  return (
    <article
      id={story.slug}
      className={`story-feature${reverse ? " is-reverse" : ""}`}
    >
      <Reveal className="story-feature-photo">
        <figure>
          <Image
            src={story.image}
            alt={story.imageAlt}
            width={1152}
            height={864}
            className="story-feature-img"
            sizes="(max-width: 780px) 100vw, 50vw"
          />
        </figure>
      </Reveal>
      <Reveal className="story-feature-text">
        <p className="eyebrow">{story.eyebrow}</p>
        <h3>{story.title}</h3>
        <p className="story-summary">{story.summary}</p>
        {story.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </Reveal>
    </article>
  );
}
