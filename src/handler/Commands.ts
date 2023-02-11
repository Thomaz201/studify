import * as dotenv from "dotenv";
import { Client, Collection, REST, Routes, SlashCommandBuilder } from "discord.js";
import fs from "fs";
import path from "path";
import { SlashCommand } from "../types";
import { color } from "../functions/colors";

dotenv.config();

export default (client: Client) => {
  const slashCommands: SlashCommandBuilder[] = [];

  client.slashCommands = new Collection<string, SlashCommand>();

  const slashCommandsDir = path.join(__dirname, "../slashCommands");
  const slashCommandFiles = fs.readdirSync(slashCommandsDir).filter(file => file.endsWith(".ts"));

  for (const file of slashCommandFiles) {
    const command: SlashCommand = require(`${slashCommandsDir}/${file}`).default;
    slashCommands.push(command.data);
    client.slashCommands.set(command.data.name, command);
  }

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN!);
 
  console.log(`Resetando ${slashCommands.length} comandos...`);

  rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID!, process.env.GUILD_ID!), {
    body: slashCommands.map(command => command.toJSON())
  }).then((data: any) => {
    console.log(`Show! ${color("info", data.length)} comandos foram carregados com ${color("success", "sucesso")}!`);
  }).catch(error => {
    console.log("Iih falhou!", error);
  });
}
