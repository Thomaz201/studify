import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { SlashCommand } from "../types";

const row = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(new StringSelectMenuBuilder()
    .setCustomId("select")
    .setPlaceholder("Nenhuma linguagem selecionada")
    .addOptions({
        label: "javascript",
        description: "Veja a documentação de Javascript",
        value: "javascript"
      },
      {
        label: "python",
        description: "Veja a documentação de Python",
        value: "python"
      },
      {
        label: "java",
        description: "Veja a documentação do Java",
        value: "java"
      },
      {
        label: "discord.js",
        description: "Veja a documentação de Discord.js",
        value: "discordjs"
      }
    )
  )

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('docs')
    .setDescription('Acesse a documentação da tecnoologia que quiser 📗'),
  async execute(interaction) {
    await interaction.reply({ content: "Selecione uma das techs abaixo:", components: [row] });
  },
}

export default command;
