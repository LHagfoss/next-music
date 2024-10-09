"use client"

import { useState, useRef, useEffect } from "react";
import { songs } from "@/songs/songs";
import Image from "next/image";

const MusicPlayer = () => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.src = songs[currentSongIndex].url;
      audio.load();
      audio.volume = volume;
      const updateTime = () => setCurrentTime(audio.currentTime);
      audio.addEventListener("timeupdate", updateTime);
      return () => audio.removeEventListener("timeupdate", updateTime);
    }
  }, [currentSongIndex, volume]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        togglePlayPause();
      }
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(prevState => !prevState);
  };

  const nextSong = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = parseFloat(e.target.value);
    }
  };

  return (
    <div className="absolute translate-x-[-50%] left-[50%] bottom-5 music-player w-[120vh] h-[10vh] rounded-3xl flex justify-between gap-5">
      <div className="bg-secondary p-3 rounded-3xl">
        <Image src={songs[currentSongIndex].cover} alt="Cover" width={100} height={100} className="bg-white rounded-xl aspect-square w-full h-full" />
      </div>
      <div className="bg-secondary w-full p-3 flex justify-between items-enter rounded-3xl">
        <div className="flex-[2] flex flex-col">
          <h2>{songs[currentSongIndex].title}</h2>
          <h3>{songs[currentSongIndex].artist}</h3>
        </div>
        <div className="flex-1 flex justify-center items-center gap-3 ">
          <audio ref={audioRef} src={songs[currentSongIndex].url} />
          <button onClick={prevSong}className="flex-1">Previous</button>
          <button onClick={togglePlayPause} className="flex-1 flex justify-center">{isPlaying ? 'Pause' : 'Play'}</button>
          <button onClick={nextSong} className="flex-1 flex">Next</button>

          <input
            type="range"
            min="0"
            max={audioRef.current?.duration || 0}
            value={currentTime}
            onChange={handleTimeChange}
            className="w-[50vh] absolute bottom-3"
          />
        </div>
        <div className="flex-[2] flex justify-end items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;