// forca, destreza, inteligencia, contituicao, aparencia, poder, educacao, (tamanho e sorte) -> 10 base em cada um ->

import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

interface npcDataProps {
  name: string;
  size?: number;
  luck?: number;
  strength: number;
  dexterety: number;
  intelligence: number;
  constitution: number;
  appearence: number;
  power: number;
  education: number;
}

interface IUserInputs {
  name: string;
  size?: number;
  luck?: number;
  totalPoints: number;
}

const createEmbed = (interaction: CommandInteraction, npcData: npcDataProps) => new EmbedBuilder()
  .setColor("#9580FF")
	.setTitle("Criador de NPCs")
  .setAuthor({ name: 'Thomaz', iconURL: 'https://avatars.githubusercontent.com/u/60111139?v=4', url: 'https://github.com/Thomaz201' })
	.setDescription('Crie um NPC com status aleatórios para um RPG')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Nome:', value: `${npcData.name}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Força:', value: `${npcData.strength}`, inline: true },
		{ name: 'Destreza:', value: `${npcData.dexterety}`, inline: true },
		{ name: 'Inteligência:', value: `${npcData.intelligence}`, inline: true },
		{ name: 'Contituição:', value: `${npcData.constitution}`, inline: true },
		{ name: 'Aparência:', value: `${npcData.appearence}`, inline: true },
		{ name: 'Poder:', value: `${npcData.power}`, inline: true },
		{ name: 'Educação:', value: `${npcData.education}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Tamanho:', value: `${npcData.size ? npcData.size : 1.5}`, inline: true },
    { name: 'Sorte:', value: `${npcData.luck ? npcData.luck : 10}`, inline: true }
    ,
	)
  .addFields({  name: '\u200B', value: '\u200B' })
	.setTimestamp()
  .setFooter({ text: `O ${npcData.name} já está pronto pra participar do seu RPG 😁`});


const command = {
  data: new SlashCommandBuilder()
    .setName('create-npc')
    .setDescription('Crie um NPC com status aleatórios para um RPG')
    .addStringOption(option =>
      option.setName('nome')
        .setDescription('Nome do seu NPC')
        .setRequired(true)
        )
    .addNumberOption(option =>
      option.setName('pontos')
        .setDescription('Pontos para distribuir entre os status do npc')
        .setRequired(true)
        .setMinValue(7)
    )
    .addNumberOption(option =>
      option.setName('sorte')
        .setDescription('Sorte do seu NPC')
        .setRequired(false)
    )
    .addNumberOption(option =>
      option.setName('tamanho')
        .setDescription('Tamanho do seu NPC')
        .setRequired(false)
    ),
  async execute(interaction: CommandInteraction) {
    console.log(interaction.options.get('nome'))
    console.log(interaction.options.get('sorte'))
    console.log(interaction.options.get('tamanho'))
    console.log(interaction.options.get('pontos'))
    
    const name = interaction.options.get('nome')?.value
    const luck = interaction.options.get('sorte')?.value
    const size = interaction.options.get('tamanho')?.value
    const points = interaction.options.get('pontos')?.value


    const userInputs: IUserInputs = {
      name: String(name),
      luck: Number(luck),
      size: Number(size),
      totalPoints: Number(points)
    }

    const npcData = splitPoints(userInputs)

    await interaction.reply({ embeds: [createEmbed(interaction, npcData)]});
  },
}

function getRandomValue(minValue: number, maxValue: number) {
  return Math.floor(Math.random() * (maxValue - minValue) + minValue);
}

function splitPoints(userInputs: IUserInputs): npcDataProps {
  const totalPoints = userInputs.totalPoints;
  const averageSize = Math.floor(totalPoints / 7);
  const standardDeviation = 0.9;
  const minValue = averageSize - Math.floor(averageSize * standardDeviation);
  const maxValue = averageSize + Math.floor(averageSize * standardDeviation);
  let values = [];
  
  let sumParts = 0;

  console.log(minValue, maxValue)
  for(var i = 0; i < 6; i++) {
    const value = getRandomValue(minValue, maxValue);
    values.push(value + 10);
    sumParts += value;
  }

  values.push((totalPoints - sumParts) + 10);
  const soma = values.reduce((accumulator=0, valorAtual: number) => {
    return accumulator + valorAtual
  });

  console.log(values, soma)

  const npcData: npcDataProps = {
    name: userInputs.name,
    luck: userInputs.luck && userInputs.luck,
    size: userInputs.size && userInputs.size,
    appearence: values[6],
    constitution: values[1],
    dexterety: values[2],
    education: values[3],
    intelligence: values[4],
    power: values[5],
    strength: values[0]
  }

  return npcData;
}


export default command;
