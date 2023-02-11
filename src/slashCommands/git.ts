import { SlashCommandBuilder, EmbedBuilder, CommandInteraction } from "discord.js";
import { SlashCommand } from "../types";

const createEmbed = (interaction: CommandInteraction) => new EmbedBuilder()
  .setColor("#9580FF")
	.setTitle("Comandos do git")
	.setURL('https://education.github.com/git-cheat-sheet-education.pdf')
  .setAuthor({ name: 'Thomaz', iconURL: 'https://avatars.githubusercontent.com/u/60111139?v=4', url: 'https://github.com/Thomaz201' })
	.setDescription('Aprenda sobre os principais comandos do Git')
	.setThumbnail('https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git init [nome-do-projeto]', value: 'Cria um novo repositório local com um nome especificado', inline: true },
		{ name: '$ git clone [url]', value: 'Baixa um projeto e seu histórico de versão inteiro', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git stash', value: 'Armazena temporariamente todos os arquivos monitorados modificados', inline: true },
		{ name: '$ git status', value: 'Revise edições e crie uma transação de commit', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git add [arquivo]', value: 'Faz o snapshot de um arquivo na preparação para versionamento', inline: true },
		{ name: '$ git commit -m "[mensagem]"', value: 'Grava o snapshot permanentemente do arquivo no histórico de versão', inline: true },
		{ name: '\u200B', value: '\u200B' },
    { name: '$ git branch', value: 'Lista todos os branches locais no repositório atual', inline: true },
		{ name: '$ git checkout -b [nome-branch]', value: 'Cria uma nova branch e muda para a branch criada', inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: '$ git checkout [nome-branch]', value: 'Muda para a branch especificada', inline: true },
		{ name: '$ git merge [nome-branch]', value: 'Combina o histórico da branch especificada a branch atual', inline: true },
		{ name: '\u200B', value: '\u200B' },
    { name: '$ git push', value: 'Envia todos os commits do branch local para o GitHub', inline: true },
		{ name: '$ git pull', value: 'Baixa o histórico e incorpora as mudanças', inline: true },
	)
  .addFields({  name: '\u200B', value: '\u200B' })
	.setTimestamp()
  .setFooter({ text: `Agora você já conhece os comandos do git ${interaction.member?.user.username} 😁`});


const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('git')
    .setDescription('Relembre os comandos do git'),
  async execute(interaction) {
    interaction.reply({ embeds: [createEmbed(interaction)] });
  },
}

export default command;
