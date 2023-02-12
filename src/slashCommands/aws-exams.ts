import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from "discord.js";
import { SlashCommand } from "../types";

const row = new ActionRowBuilder<StringSelectMenuBuilder>()
  .addComponents(new StringSelectMenuBuilder()
    .setCustomId("aws-menu")
    .setPlaceholder("Nenhuma certificação selecionada")
    .addOptions({
        label: "Cloud Practicioner Foundational",
        description: "Links úteis para a prova Practicioner Foundational",
        value: "practicioner"
      },
      {
        label: "Developer Associate",
        description: "Links úteis para a prova Developer Associate",
        value: "developer-associate"
      },
      {
        label: "Solutions Architect Associate",
        description: "Links úteis para a prova Solutions Architect Associate",
        value: "solutions-architect-associate"
      },
      {
        label: "Solutions Architect Professional",
        description: "Links úteis para a prova Solutions Architect Professional",
        value: "solutions-architect-professional"
      }
    )
  )

const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('aws-exams')
    .setDescription('Acesse links úteis para qualquer uma das provas de certificação da AWS 🔮'),
  async execute(interaction) {
    await interaction.reply({ content: "Selecione uma das certificações abaixo:", components: [row] });
  },
}

export default command;
