"use client";

import { useEffect, useRef, useState } from "react";

const AUDIO_SRC = "/audio/aynur-giris-sarki.mp3";
const STORAGE_KEY = "aynur-giris-sarki-heard";

type PlayState = "idle" | "muted" | "playing" | "paused" | "ended";

export function EntranceSong() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<PlayState>("idle");
  const [showPrompt, setShowPrompt] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.preload = "auto";
    audio.loop = false;
    audioRef.current = audio;

    const onEnded = () => {
      setState("ended");
      try {
        sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
    };
    const onPause = () => {
      if (!audio.ended) setState((s) => (s === "ended" ? s : "paused"));
    };
    const onPlay = () => {
      setState(audio.muted ? "muted" : "playing");
    };

    audio.addEventListener("ended", onEnded);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("play", onPlay);

    let alreadyHeard = false;
    try {
      alreadyHeard = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      alreadyHeard = false;
    }

    setReady(true);
    setShowPrompt(!alreadyHeard);

    if (!alreadyHeard) {
      audio.muted = true;
      audio
        .play()
        .then(() => {
          setState("muted");
          setShowPrompt(true);
        })
        .catch(() => {
          setState("idle");
          setShowPrompt(true);
        });
    }

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("play", onPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playWithSound = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = false;
    audio.volume = 1;
    if (audio.ended) {
      audio.currentTime = 0;
    }
    try {
      await audio.play();
      setState("playing");
      setShowPrompt(false);
    } catch {
      setShowPrompt(true);
      setState("idle");
    }
  };

  const togglePause = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.muted = false;
      try {
        await audio.play();
        setState("playing");
      } catch {
        setShowPrompt(true);
      }
    } else {
      audio.pause();
      setState("paused");
    }
  };

  const dismiss = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = true;
    }
    setShowPrompt(false);
    setState("idle");
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  if (!ready) return null;

  const isAudible = state === "playing" || state === "paused";

  return (
    <>
      {showPrompt && state !== "playing" && (
        <div className="song-prompt" role="dialog" aria-label="Giriş şarkısı">
          <div className="song-prompt-inner">
            <p className="song-prompt-title">Giriş şarkısı</p>
            <p className="song-prompt-text">
              Aynur’un mahallesine hoş geldin — kısa bir karşılama dinlemek
              ister misin?
            </p>
            <div className="song-prompt-actions">
              <button
                type="button"
                className="btn btn-primary song-btn"
                onClick={playWithSound}
              >
                Şarkıyı çal
              </button>
              <button
                type="button"
                className="btn btn-ghost song-btn song-btn-dismiss"
                onClick={dismiss}
              >
                Şimdilik geç
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="song-bar" aria-live="polite">
        {state === "muted" && (
          <button
            type="button"
            className="song-chip"
            onClick={playWithSound}
            aria-label="Şarkıyı sesli çal"
          >
            <span className="song-chip-icon" aria-hidden="true">
              ♪
            </span>
            Şarkıyı çal
          </button>
        )}

        {isAudible && (
          <button
            type="button"
            className="song-chip is-active"
            onClick={togglePause}
            aria-label={state === "playing" ? "Duraklat" : "Devam et"}
          >
            <span className="song-chip-icon" aria-hidden="true">
              {state === "playing" ? "❚❚" : "▶"}
            </span>
            {state === "playing" ? "Çalıyor" : "Duraklatıldı"}
          </button>
        )}

        {(state === "ended" || state === "idle") && !showPrompt && (
          <button
            type="button"
            className="song-chip"
            onClick={playWithSound}
            aria-label="Şarkıyı yeniden çal"
          >
            <span className="song-chip-icon" aria-hidden="true">
              ♪
            </span>
            Şarkıyı çal
          </button>
        )}
      </div>
    </>
  );
}
