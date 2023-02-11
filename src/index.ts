import * as dotenv from "dotenv";
import { Client, Events, GatewayIntentBits, Interaction } from "discord.js";
import loadCommands from "./handler/Commands";
import { selectMenusResponses } from "./data/stringSelectMenuInteractionData";

dotenv.config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, c => {
  loadCommands(client);
	console.log(`Pronto! Logado como ${c.user.tag} 🍕`);
});

client.login(process.env.TOKEN);


client.on(Events.InteractionCreate, async (interaction: Interaction) => {
  console.log(interaction)
  if (interaction.isStringSelectMenu()) {
    interaction.values.map(value => {
      interaction.reply(`${selectMenusResponses[(interaction.message.interaction?.commandName!)][value]}`)
    })
  }
  
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.slashCommands.get(interaction.commandName);

  if (!command) {
    console.error("Comando não encontrado 😔");

    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error('Iih, deu ruim com esse comando!', error);
    interaction.reply('Iih, deu ruim com esse comando 😔');
  }
});
