"use client"

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import cover from "@/songs/song1.jpg"

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false)

  const song = {
    title: "Title Name 1",
    artist: "Artist Name 1"
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="absolute translate-x-[-50%] left-[50%] bottom-5 music-player w-[120vh] h-[10vh] rounded-3xl flex justify-between gap-5">
      <div className="bg-secondary p-3 rounded-3xl">
        <Image src={cover} alt="Cover" className="bg-white rounded-xl object-cover aspect-square w-full h-full" />
      </div>
      <div className="bg-secondary w-full p-5 flex justify-between items-enter rounded-3xl">
        <div className="flex-[2] flex flex-col justify-center items-start">
          <div className="text-[2vh]">{song.title}</div>
          <div className="text-[1.5vh] text-[#333]">{song.artist}</div>
        </div>
        <div className="flex-1 flex justify-center items-center gap-3 ">
          
          <button className="flex-1">Previous</button>
          <button className="flex-1 flex justify-center" onClick={togglePlayPause}>{isPlaying ? 'Pause' : 'Play'}</button>
          <button className="flex-1 flex">Next</button>

          <div className="flex justify-center items-center gap-5 absolute bottom-5">
            <div className="relative mb-5">
              <label htmlFor="labels-range-input" className="sr-only">Labels range</label>
              <input id="labels-range-input" type="range" defaultValue={0} min="0" max="100" className="w-[60vh] h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute start-0 -bottom-6">0.00</span>
              <span className="text-sm text-gray-500 dark:text-gray-400 absolute end-0 -bottom-6">3.24</span>
            </div>
          </div>
        </div>
        <div className="flex-[2] flex justify-end items-center">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            className=""
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;