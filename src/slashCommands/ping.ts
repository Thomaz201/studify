import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com pong 🏓'),
  async execute(interaction) {
    await interaction.reply("Pong! 🏓");
  },
}

export default command;
