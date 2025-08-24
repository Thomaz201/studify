import axios from "axios";
import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

interface lolDataProps {
  nickname: string;
  tag: string;
  eloSQ?: string;
  eloFlex?: string;
}

const createEmbed = (interaction: CommandInteraction, lolData: lolDataProps) => new EmbedBuilder()
  .setColor("#9580FF")
	.setTitle("Criador de NPCs")
  .setAuthor({ name: 'Thomaz', iconURL: 'https://avatars.githubusercontent.com/u/60111139?v=4', url: 'https://github.com/Thomaz201' })
	.setDescription('Stats do lol')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Nick:', value: `${lolData.nickname}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: 'Tag:', value: `${lolData.tag}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: 'Elo Solo Queue:', value: `${lolData.eloSQ}`, inline: true },
    { name: '\u200B', value: '\u200B' },
		{ name: 'Elo Flex:', value: `${lolData.eloFlex}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
	)
  .addFields({  name: '\u200B', value: '\u200B' })
	.setTimestamp()


const command = {
  data: new SlashCommandBuilder()
    .setName('lol-stats')
    .setDescription('Busque o elo de qualquer jogador')
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('Nick no lol sem a tag (#)')
        .setRequired(true)
        )
    .addStringOption(option =>
      option.setName('tag')
        .setDescription('Tag no lol sem o #')
        .setRequired(true)
        ),

  async execute(interaction: CommandInteraction) {
    console.log(interaction.options.get('nickname'))
    console.log(interaction.options.get('tag'))
    
    const nickname = interaction.options.get('nickname')?.value
    const tag = interaction.options.get('tag')?.value
    
    const { data: account_data } = await axios.get(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nickname}/${tag}`, {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY
      }
    })

    const { data: summoner_data } = await axios.get(`https://br1.api.riotgames.com/lol/league/v4/entries/by-puuid/${account_data.puuid}`, {
      headers: {
        "X-Riot-Token": process.env.RIOT_API_KEY
      }
    })

    const lolPlayerData: lolDataProps = {
      nickname,
      tag,
      eloFlex: `${summoner_data[1].tier} - ${summoner_data[1].rank}`,
      eloSQ: `${summoner_data[0].tier} - ${summoner_data[0].rank}`,
    }

    await interaction.reply({ embeds: [createEmbed(interaction, lolPlayerData)]});
  },
}

export default command;
