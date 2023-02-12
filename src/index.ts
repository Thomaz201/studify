import * as dotenv from "dotenv";
import { ActivityType, ChannelType, Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import { joinVoiceChannel, VoiceConnectionStatus  } from "@discordjs/voice";
import ytdl from "ytdl-core";

import { isURLFromLiveVideo, liveMusicPlayer, playLiveMusic } from "./handler/MusicPlayer";

import loadCommands from "./handler/Commands";
import { createAWSCertificationsEmbed, selectMenusResponses } from "./data/selectInterationData";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// const playMusic = (url: string) => {
//   const musicStream = ytdl(url, { filter: 'audioonly', highWaterMark: 1 << 25 });

//   const resource = createAudioResource(musicStream, { inputType: undefined });

//   musicPlayer.play(resource);
//   return;
// }

client.once(Events.ClientReady, c => {
  loadCommands(client);
	console.log(`Pronto! Logado como ${c.user.tag} 🍕`);
});

client.on(VoiceConnectionStatus.Ready, () => {
	console.log('The connection has entered the Ready state - ready to play audio!');
});

client.on(Events.ClientReady, async () => {
  client.user?.setActivity("Radio Codefi", { type: ActivityType.Listening });
  const codefyChannel = client.channels.cache.get(process.env.CODEFY_CHANNEL_ID!) || await client.channels.fetch(process.env.CHANNEL_ID!);

  if (!codefyChannel || codefyChannel.type !== ChannelType.GuildVoice) return console.error("canal de voz não existe")
  
  const codefyConnection = joinVoiceChannel({
    channelId: codefyChannel.id,
    guildId: codefyChannel.guild.id,
    adapterCreator: codefyChannel.guild.voiceAdapterCreator,
  });

  codefyConnection.subscribe(liveMusicPlayer);

  await playLiveMusic(process.env.DEFAULT_LIVE_YOUTUBE_MUSIC!);

  codefyConnection.on('debug', (message) => {
    console.log('message connection', message)
  });

  // setInterval(async () => {
  //   if (codefyChannel.members.size <= 1) {
  //     liveMusicPlayer.stop();
  //   } else if (liveMusicPlayer.state.status == AudioPlayerStatus.Idle) {
  //     await playLiveMusic(process.env.DEFAULT_LIVE_YOUTUBE_MUSIC!);
  //   } else {
  //     liveMusicPlayer.unpause();
  //   }
  // }, 15000);

});

client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  console.log(interaction)
  if (interaction.isStringSelectMenu()) {
    if (interaction.customId === 'docs') {
      interaction.values.map(value => {
        interaction.reply(`${selectMenusResponses[(interaction.customId)][value]}`)
      })
    } else if (interaction.customId === 'aws-menu') {
      interaction.values[0]
      await interaction.reply({ embeds: [createAWSCertificationsEmbed(interaction.values[0])] })
    }
  }
  
  if (interaction.isChatInputCommand()) {
    const command = interaction.client.slashCommands.get(interaction.commandName);
    
    if(command === client.slashCommands.get('play-from-youtube')) { 
      try {
        const url = String(interaction.options.get('url')?.value);

        if (!ytdl.validateURL(url)) {
          interaction.reply('Tive um problema para entender a sua url, tem certeza que ela é válida e é do YouTube?');
      
          return;
        }
      
        const isLiveVideoUrl = await isURLFromLiveVideo(url);
      
        if (!isLiveVideoUrl) {
          interaction.reply('Oops! Parece que a url que você me enviou não é de uma live... Tente enviar essa url para o meu irmão Music Bot no comando "/play-youtube-music"');
      
          return;
        }

        playLiveMusic(url);

      } catch (error) {
        console.error('Iih, deu ruim com esse comando!', error);
        interaction.reply('Iih, deu ruim com esse comando 😔');
      }; 
    }
    
    if (!command) {
      console.error("Comando não encontrado 😔");
  
      return;
    }
  
    try {
      await command.execute(interaction);
    } catch (error) {
      console.error('Iih, deu ruim com esse comando!', error);
      interaction.reply('Iih, deu ruim com esse comando 😔');
    }; 
  }

});

client.login(process.env.TOKEN);
