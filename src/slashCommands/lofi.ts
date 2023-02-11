import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('lofi')
    .setDescription('Ouça a melhor playlist de estudos 🎵'),
  async execute(interaction) {
    await interaction.reply("https://open.spotify.com/playlist/0vvXsWCC9xrXsKd4FyS8kM?si=68ad8fb3463a4f38");
  },
}

export default command;
