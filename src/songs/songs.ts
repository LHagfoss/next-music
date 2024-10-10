import song1Cover from "@/songs/song1.jpg";
import song1 from "@/songs/song1.wav";

import song2Cover from "@/songs/song2.jpg";
import song2 from "@/songs/song2.wav";

import song3Cover from "@/songs/song3.jpg";
import song3 from "@/songs/song3.wav";


async function checkDuration(songUrl: string) {
  return new Promise((resolve) => {
    const audio = new Audio(songUrl);
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
  });
}

export async function getSongs() {

  return await Promise.all([
    {
      id: 1,
      title: "Song 1",
      artist: "Random Artist 1",
      duration: await checkDuration(song1),
      url: `${song1}`,
      cover: `${song1Cover}`,
    },
    {
      id: 2,
      title: "Song 2",
      artist: "Random Artist 2",
      duration: await checkDuration(song2),
      url: `${song2}`,
      cover: `${song2Cover}`,
    },
    {
      id: 3,
      title: "Song 3",
      artist: "Random Artist 3",
      duration: await checkDuration(song3),
      url: `${song3}`,
      cover: `${song3Cover}`,
    },
  ]);
}