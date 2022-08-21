import {
  ChatInputApplicationCommandData,
  CommandInteractionOptionResolver,
  ClientOptions as Options,
  CommandInteraction,
  Message,
  ModalSubmitInteraction,
  PermissionResolvable,
  SlashCommandBuilder
} from "discord.js";
import { Cassia } from "../structures/base.js";

/** Data for the client and accessible to you as the developer */

export interface ClientData extends Options {
  commandDirectory: string;
  interactionDirectory: string;
  listenerDirectory: string;
  developers?: string[];
  prefix?: string;
}

export interface GenericCommandData {
  name: string;
  description: string;
  devOnly?: boolean;
}

/** Extends {GenericCommandData} by adding command specific properties. */

export interface DirectCommandData extends GenericCommandData {
  triggers?: string[];
  canIgnoreCooldown?: string[];
  clientPermissions?: PermissionResolvable[];
  userPermissions?: PermissionResolvable[];
  canIgnorePermissions?: string;
  exec: DirectCommandRunData;
}
export interface SkullboardData {
  channelID: string;
  starCount: number | string | boolean;
}

/** Methods used by each command type */

export interface GenericCommandRunData {
  cassia: Cassia;
  message?: Message;
  modal?: ModalSubmitInteraction;
  interaction?: CommandInteraction;
  args?: string[];
  interactionArgs: CommandInteractionOptionResolver;
}

/** Omited properities from {GenericCommandRunData} to prevent imcompatible types*/

type DirectCommandRunData = (
  options: Pick<GenericCommandRunData, "args" | "cassia" | "message">
) => any;
type ApplicationCommandRunData = (
  options: Pick<
    GenericCommandRunData,
    "cassia" | "interaction" | "modal" | "interactionArgs"
  >
) => any;

/** Extends {GenericCommandData} by adding interaction specific properties. If we combined these
 * two interfaces, we would have incompatibilities between the two.
 */

export interface ApplicationCommandData
  extends Pick<GenericCommandData, "name" | "devOnly">,
    ChatInputApplicationCommandData {
  global?: boolean | string[];
  exec: ApplicationCommandRunData;
}
