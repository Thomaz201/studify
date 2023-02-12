import { ColorResolvable, EmbedBuilder } from "discord.js"

interface SelectedMenusInterface {
  [key: string]: {
    [key: string]: any
  }
}

export const selectMenusResponses: SelectedMenusInterface = {
  docs: {
    javascript: "Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    python: "Documentação do Python: https://www.python.org",
    java: "Documentação do Java: https://docs.oracle.com/en/java/",
    discordjs: "Documentação do Discord.js: https://discordjs.guide/#before-you-begin"
  }
}

export const createAWSCertificationsEmbed = (value: string) => {
  const data: SelectedMenusInterface = {
    practicioner: {
      title: "AWS Clod Practicioner Foundational",
      subscription: "https://aws.amazon.com/pt/certification/certified-cloud-practitioner/",
      udemyCourse: "https://www.udemy.com/course/aws-certified-cloud-practitioner-new/",
      examSample: "https://www.udemy.com/course/aws-certified-cloud-practitioner-training-course/",
      cheatSheet: "https://digitalcloud.training/category/aws-cheat-sheets/aws-cloud-practitioner/",
      color: "#80FFEA"
    },
    'developer-associate': {
      title: "AWS Developer Associate",
      subscription: "https://aws.amazon.com/pt/certification/certified-developer-associate/",
      udemyCourse: "https://www.udemy.com/course/aws-certified-developer-associate-dva-c01/",
      examSample: "https://www.udemy.com/course/aws-certified-developer-associate-practice-tests-dva-c01/",
      cheatSheet: "https://digitalcloud.training/category/aws-cheat-sheets/aws-developer-associate/",
      color: "#8AFF80"
    },
    'solutions-architect-associate': {
      title: "AWS Solutions Architect Associate",
      subscription: "https://aws.amazon.com/pt/certification/certified-solutions-architect-associate/",
      udemyCourse: "https://www.udemy.com/course/aws-certified-solutions-architect-associate-saa-c03/",
      examSample: "https://www.udemy.com/course/aws-solutions-architect-associate-simulados-portugues/",
      cheatSheet: "https://digitalcloud.training/category/aws-cheat-sheets/aws-solutions-architect-associate/",
      color: "#FFFF80"
    },
    'solutions-architect-professional': {
      title: "AWS Solutions Architect Professional",
      subscription: "https://aws.amazon.com/pt/certification/certified-solutions-architect-professional/",
      udemyCourse: "https://www.udemy.com/course/aws-solutions-architect-professional/",
      examSample: "https://www.udemy.com/course/aws-solutions-architect-professional-practice-exams-sap-c02/",
      cheatSheet: "https://digitalcloud.training/category/aws-cheat-sheets/aws-solutions-architect-professional/",
      moreQuestions: "",
      color: "#9580FF"
    }
  }

  return new EmbedBuilder()
  .setColor(`${data[value].color}` as ColorResolvable)
	.setTitle(`${data[value].title}`)
  .setAuthor({ name: 'Thomaz', iconURL: 'https://avatars.githubusercontent.com/u/60111139?v=4', url: 'https://github.com/Thomaz201' })
	.setDescription('principais links para a certificação da sua escolha:')
	.setThumbnail('https://a0.awsstatic.com/libra-css/images/logos/aws_logo_smile_1200x630.png')
	.addFields(
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Inscrição', value: `${data[value].subscription}`, inline: true },
		{ name: 'Curso da Udemy', value: `${data[value].udemyCourse}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Questões do exame', value: `${data[value].examSample}`, inline: true },
		{ name: 'Cheat Sheet', value: `${data[value].cheatSheet}`, inline: true },
		{ name: '\u200B', value: '\u200B' },
	)
  .addFields({  name: '\u200B', value: '\u200B' })
	.setTimestamp()
  .setFooter({ text: `Agora você já tem em mãos os links mais importantes pra certificação ${data[value].title} 😁`});
}
