import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command = {
  data: new SlashCommandBuilder()
    .setName('play-from-youtube')
    .setDescription('Toca o áudio de uma live do YouTube 🔊')
    .addStringOption(option =>
        option.setName('url')
          .setDescription('Url do YouTube')
          .setRequired(true)
      ),
  async execute(interaction: CommandInteraction) {
    console.log(interaction.options.get('url'))
    
    await interaction.reply(`Tocando agora: ${interaction.options.get('url')?.value} 🎧`);
  },
}

export default command;
