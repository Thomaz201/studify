import { SlashCommandBuilder } from "discord.js";
import { color } from "../functions/colors";
import { SlashCommand } from "../types";

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Responde com pong 🏓'),
  async execute(interaction) {
    await interaction.reply(` ${color("info", "Pong!")} 🏓`);
  },
}

export default command;
