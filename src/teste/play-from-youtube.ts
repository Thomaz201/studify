// import { CommandInteraction, GuildMember, SlashCommandBuilder } from "discord.js";
// import ytdl from "ytdl-core";
// import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";

// // Ajuste a tipagem do comando para ser compatível com o SlashCommandBuilder
// const command = {
//   data: new SlashCommandBuilder()
//     .setName('play-from-youtube')
//     .setDescription('Toca o áudio de uma live ou vídeo do YouTube 🔊')
//     .addStringOption(option => 
//       option.setName('url')
//         .setDescription('Url do YouTube')
//         .setRequired(true)
//     ),
//   async execute(interaction: CommandInteraction) {
//     const url = interaction.options.get('url')?.value as string;

//     // Verifica se a URL é válida
//     if (!ytdl.validateURL(url)) {
//       await interaction.reply('A URL fornecida não é válida. Por favor, forneça uma URL válida do YouTube.');
//       return;
//     }

//     // Obtém informações sobre o vídeo
//     const videoInfo = await ytdl.getInfo(url);

//     // Verifica se o membro é um GuildMember e se está em um canal de voz
//     const member = interaction.member as GuildMember;
//     const voiceChannel = member?.voice?.channel;
//     if (!voiceChannel) {
//       await interaction.reply('Você precisa estar em um canal de voz para tocar música!');
//       return;
//     }

//     const connection = joinVoiceChannel({
//       channelId: voiceChannel.id,
//       guildId: voiceChannel.guild.id,
//       adapterCreator: voiceChannel.guild.voiceAdapterCreator,
//     });

//     // Cria o player de áudio
//     const player = createAudioPlayer();

//     // Verifica se o vídeo é uma live
//     if (videoInfo.videoDetails.isLiveContent) {
//       // Stream da live do YouTube
//       const stream = ytdl(url, { filter: 'audioonly', highWaterMark: 1 << 25, liveBuffer: 5000 });
//       const resource = createAudioResource(stream);
//       player.play(resource);
//       connection.subscribe(player);

//       // Responde no chat
//       await interaction.reply(`Tocando agora a live: ${videoInfo.videoDetails.title} 🎧`);
//     } else {
//       // Stream do vídeo do YouTube
//       const stream = ytdl(url, { filter: 'audioonly' });
//       const resource = createAudioResource(stream);
//       player.play(resource);
//       connection.subscribe(player);

//       // Responde no chat
//       await interaction.reply(`Tocando agora o vídeo: ${videoInfo.videoDetails.title} 🎧`);
//     }

//     // Monitora o status do player
//     player.on(AudioPlayerStatus.Idle, () => {
//       connection.destroy(); // Desconecta quando o vídeo ou live terminar
//     });
//   },
// };

// export default command;
