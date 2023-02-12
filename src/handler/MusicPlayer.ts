import { createAudioPlayer, NoSubscriberBehavior, createAudioResource  } from "@discordjs/voice";
import { ChatInputCommandInteraction } from "discord.js";
import ytdl from "ytdl-core";

export const liveMusicPlayer = createAudioPlayer({
  behaviors: {
    noSubscriber: NoSubscriberBehavior.Pause,
  },
});

const getInfoFromRawURL = async (url: string) => {
  const info = await ytdl.getInfo(url);

  return info;
}

export const isURLFromLiveVideo = async (url: string) => {
  const info = await getInfoFromRawURL(url);
  
  if (!info.player_response.videoDetails.isLiveContent) {
    return false;
  }

  return true;
}

const getURLForDownloadFromVideoInfo = (info: ytdl.videoInfo) => {
  const format = ytdl.chooseFormat(info.formats, { quality: [128,127,120,96,95,94,93] });

  return format.url
}

export const playLiveMusic = async (url: string) => {
  const info = await getInfoFromRawURL(url);
  
  const downloadUrl = getURLForDownloadFromVideoInfo(info);
  const resource = createAudioResource(downloadUrl);

  liveMusicPlayer.play(resource);
  return;
}
