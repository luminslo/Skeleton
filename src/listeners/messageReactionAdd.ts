//@ts-nocheck

import { cassia } from "../../index.js";
import { Listener } from "../structures/datatypes.js";
import { interactions } from "../handlers/interactionHandler.js";
import messageCreate from "./messageCreate.js";
import { EmbedBuilder } from "@discordjs/builders";
import {
  DiscordAPIError,
  GuildTextBasedChannel,
  TextChannel
} from "discord.js";
export default new Listener(
  "messageReactionAdd",
  false,
  async (reaction, user) => {
    if (reaction.emoji.name === "💀") {
      if (reaction.message.partial) {
        if (reaction.message.author.bot || user.bot) return;
        const fetchedMessage = await reaction.message.fetch();
        const skullboard = cassia.skullboards.get(reaction.message.guildId);
        const channel = cassia.channels.cache.find(
          (channel) => (channel.id = skullboard.channelID)
        ) as TextChannel;
        const messages = await channel.messages.fetch({ limit: 100 });
        const alreadyExistingEmbed = messages.find((msg) => {
          if (msg.embeds.length === 1) {
            if (msg.embeds[0].footer.text.startsWith(fetchedMessage.id)) {
              console.log("starred message found");
              return true;
            }
            return false;
          }
          return false;
        });
        if (alreadyExistingEmbed) {
          alreadyExistingEmbed.edit("Test");
        } else {
          const embed = new EmbedBuilder()
            .setTitle("Skullboard")
            .setAuthor({
              name: `💀 ${reaction.count}`,
              iconURL: reaction.message.author.avatarURL()
            })
            .setColor(0x5865f2)
            .setThumbnail(
              reaction.message.author.displayAvatarURL({ forceStatic: false })
            )
            .setFooter(fetchedMessage.id)
            .setDescription(
              reaction.message.content.length <= 0 &&
                reaction.message.attachments.first()
                ? "⠀"
                : reaction.message.content
            )
            .addFields({
              name: "Original content:",
              value: `[Jump to original](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channel.id}/${reaction.message.id})`
            });
          if (skullboard) channel.send({ embeds: [embed] });
        }
      } else {
        if (reaction.message.author.bot || user.bot) return;
        const fetchedMessage = await reaction.message.fetch();
        const skullboard = cassia.skullboards.get(reaction.message.guildId);
        const channel = cassia.channels.cache.get(
          skullboard.channelID
        ) as GuildTextBasedChannel;
        const messages = await channel.messages.fetch({ limit: 100 });
        const alreadyExistingEmbed = messages.find((msg) => {
          if (msg.embeds.length === 1) {
            if (msg.embeds[0].footer.text.startsWith(reaction.message.id)) {
              console.log("starred message found");
              return true;
            }
            return false;
          }
          return false;
        });
        if (alreadyExistingEmbed) {
          const embed = new EmbedBuilder()
            .setTitle("Skullboard")
            .setAuthor({
              name: `💀 ${reaction.count}`,
              iconURL: reaction.message.author.avatarURL()
            })
            .setColor(0x5865f2)
            .setThumbnail(
              reaction.message.author.displayAvatarURL({ forceStatic: false })
            )
            .setDescription(
              reaction.message.content.length <= 0 &&
                reaction.message.attachments.first()
                ? "⠀"
                : reaction.message.content
            )
            .setFooter({ text: reaction.message.id })
            .addFields({
              name: "Original content:",
              value: `[Jump to original](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channel.id}/${reaction.message.id})`
            });
          if (reaction.message.attachments.size >= 1)
            embed.setImage(reaction.message.attachments.first().proxyURL);
          alreadyExistingEmbed.edit({ embeds: [embed] });
        } else {
          const skullboard = cassia.skullboards.get(reaction.message.guildId);
          const embed = new EmbedBuilder()
            .setTitle("Skullboard")
            .setAuthor({
              name: `💀 ${reaction.count}`,
              iconURL: reaction.message.author.avatarURL()
            })
            .setColor(0x5865f2)
            .setThumbnail(
              reaction.message.author.displayAvatarURL({ forceStatic: false })
            )
            .setDescription(
              reaction.message.content.length <= 0 &&
                reaction.message.attachments.first()
                ? "⠀"
                : reaction.message.content
            )
            .setFooter({ text: reaction.message.id })
            .addFields({
              name: "Original content:",
              value: `[Jump to original](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channel.id}/${reaction.message.id})`
            });
          if (reaction.message.attachments.size >= 1)
            embed.setImage(reaction.message.attachments.first().proxyURL);
          if (reaction.count >= skullboard.starCount)
            channel.send({ embeds: [embed] });
        }
      }
    }
  }
);
