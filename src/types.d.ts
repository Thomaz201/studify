import { SlashCommandBuilder, CommandInteraction, Collection, PermissionResolvable, Message, AutocompleteInteraction } from "discord.js"

export interface SlashCommand {
  data: SlashCommandBuilder,
  execute: (interaction : CommandInteraction) => Promise<void>,
  autocomplete?: (interaction: AutocompleteInteraction) => void,
  cooldown?: number // in seconds
}

export interface Command {
  name: string,
  execute: (message: Message, args: Array<string>) => void,
  permissions: Array<PermissionResolvable>,
  aliases: Array<string>,
  cooldown?: number,
}

declare module "discord.js" {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>
    commands: Collection<string, Command>,
    cooldowns: Collection<string, number>
  }
}
