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
