import Image from "next/image";
import { SiteHeader } from "@/components/SiteHeader";
import { Reveal } from "@/components/Reveal";
import { StoryCard } from "@/components/StoryCard";
import { EntranceSong } from "@/components/EntranceSong";
import { getStories } from "@/lib/stories";

export default function HomePage() {
  const stories = getStories();

  return (
    <>
      <a className="skip" href="#hikaye">
        İçeriğe geç
      </a>
      <SiteHeader />
      <EntranceSong />

      <main>
        <section className="hero" id="ust" aria-label="Karşılama">
          <div className="hero-media" aria-hidden="true">
            <Image
              src="/photos/hero-aynur-ai.jpg"
              alt=""
              fill
              priority
              className="hero-photo"
              sizes="100vw"
            />
            <div className="hero-veil" />
          </div>
          <div className="hero-copy">
            <p className="brand">Aynur</p>
            <h1>Mahallenin sıcak gülüşü</h1>
            <p className="lede">
              Çay bardağında sohbet, dükkân kapısında günaydın — Aynur Alişan
              Azer.
            </p>
            <div className="cta-row">
              <a className="btn btn-primary" href="#hikaye">
                Hikayeyi oku
              </a>
              <a className="btn btn-ghost" href="#hikayeler">
                Hikâyelere bak
              </a>
            </div>
          </div>
        </section>

        <section className="story" id="hikaye">
          <div className="story-grid">
            <Reveal className="story-photo">
              <figure className="story-photo">
                <Image
                  src="/photos/portrait.jpg"
                  alt="Aynur Alişan Azer’in yakından portresi"
                  width={821}
                  height={1288}
                  sizes="(max-width: 780px) 100vw, 45vw"
                />
              </figure>
            </Reveal>
            <Reveal className="story-text">
              <p className="eyebrow">Hikaye</p>
              <h2>Günlük hayatın içinde, samimi bir duruş</h2>
              <p>
                Aynur Alişan Azer; komşulukla, küçük sohbetlerle ve herkese açık
                bir gülümsemeyle tanınır. Bakkal önünde tuttuğu çay bardağı gibi
                — sade, sıcak, tanıdık.
              </p>
              <p>
                Bu site bir vitrin değil; onun mahalledeki yerini, dostça
                enerjisini ve günlük ritmini yansıtan küçük bir pencere.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="stories" id="hikayeler" aria-labelledby="hikayeler-baslik">
          <Reveal className="stories-head">
            <p className="eyebrow">Hikâyeler</p>
            <h2 id="hikayeler-baslik">Anlatılan anlar, canlanan kareler</h2>
            <p>
              Her hikâye bir sahne — mutfak buharı, mahalle yürüyüşü. Zamanla
              yeni anlatılar buraya eklenir.
            </p>
          </Reveal>
          <div className="stories-list">
            {stories.map((story, index) => (
              <StoryCard
                key={story.id}
                story={story}
                reverse={index % 2 === 1}
              />
            ))}
          </div>
        </section>

        <section className="moments" id="anlar">
          <Reveal className="moments-head">
            <p className="eyebrow">Anlar</p>
            <h2>Birkaç kare, aynı sıcaklık</h2>
            <p>Sokak, sohbet, kış günü — Aynur’un dünyasından üç an.</p>
          </Reveal>
          <div className="gallery">
            <Reveal className="shot shot-a">
              <figure className="shot shot-a">
                <Image
                  src="/photos/hero-bakkal.jpg"
                  alt="Bakkal önünde çay tutan Aynur"
                  width={921}
                  height={1228}
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
                <figcaption>Bakkal önü, çay molası</figcaption>
              </figure>
            </Reveal>
            <Reveal className="shot shot-b">
              <figure className="shot shot-b">
                <Image
                  src="/photos/portrait.jpg"
                  alt="İç mekânda gülümseyen Aynur"
                  width={821}
                  height={1026}
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
                <figcaption>Yakından bir gülümseme</figcaption>
              </figure>
            </Reveal>
            <Reveal className="shot shot-c">
              <figure className="shot shot-c">
                <Image
                  src="/photos/winter.jpg"
                  alt="Kışlık montuyla Aynur"
                  width={800}
                  height={800}
                  sizes="(max-width: 780px) 100vw, 33vw"
                />
                <figcaption>Kış günü, aynı sevinç</figcaption>
              </figure>
            </Reveal>
          </div>
        </section>

        <section className="visit" id="ziyaret">
          <Reveal className="visit-inner">
            <p className="eyebrow">Ziyaret</p>
            <h2>Selam vermek isterseniz</h2>
            <p>
              Bu sayfa kişisel bir tanıtım alanıdır. Mahallede karşılaştığınızda
              bir “merhaba” yeter — kapı her zaman gülümseyerek açılır.
            </p>
            <p className="visit-note">Aynur Alişan Azer · Türkiye</p>
          </Reveal>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          <span className="footer-brand">Aynur</span> · Alişan Azer
        </p>
        <p className="footer-meta">Kişisel site · Türkçe</p>
      </footer>
    </>
  );
}
