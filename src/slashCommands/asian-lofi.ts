import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('asian-lofi')
    .setDescription('Ouça a melhor playlist asiática de estudos 🧧'),
  async execute(interaction) {
    await interaction.reply("https://open.spotify.com/playlist/2B5slq6j1h0rpNwotjwHoi?si=70fc6154ace649f1");
  },
}

export default command;
