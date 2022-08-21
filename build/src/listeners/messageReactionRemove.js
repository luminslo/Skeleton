import { cassia } from "../../index.js";
import { Listener } from "../structures/datatypes.js";
import { EmbedBuilder } from "discord.js";
export default new Listener("messageReactionRemove", false, async (reaction, user) => {
    if (reaction.message.author.bot || user.bot)
        return;
    if (reaction.emoji.name === "💀") {
        const skullboard = cassia.skullboards.get(reaction.message.guildId);
        const channel = cassia.channels.cache.get(skullboard.channelID);
        const messages = await channel.messages.fetch({ limit: 100 });
        let shouldDelete;
        console.log(`Fetched messages in ${channel.id}`);
        const alreadyExistingEmbed = messages.find((msg) => {
            if (msg.embeds.length === 1) {
                if (msg.embeds[0].footer.text.startsWith(reaction.message.id)) {
                    return true;
                }
                return false;
            }
            return false;
        });
        if (reaction.count === 0 && alreadyExistingEmbed) {
            alreadyExistingEmbed.delete();
        }
        else {
            const embed = new EmbedBuilder()
                .setTitle("Skullboard")
                .setAuthor({
                name: `💀 ${reaction.count}`,
                iconURL: reaction.message.author.avatarURL()
            })
                .setColor(0x5865f2)
                .setThumbnail(reaction.message.author.displayAvatarURL({ forceStatic: false }))
                .setDescription(reaction.message.content.length <= 0 &&
                reaction.message.attachments.first()
                ? "⠀"
                : reaction.message.content)
                .setFooter({ text: reaction.message.id })
                .addFields({
                name: "Original content:",
                value: `[Jump to original](https://discord.com/channels/${reaction.message.guildId}/${reaction.message.channel.id}/${reaction.message.id})`
            });
            if (reaction.message.attachments.size >= 1)
                embed.setImage(reaction.message.attachments.first().proxyURL);
            if (alreadyExistingEmbed)
                alreadyExistingEmbed.edit({ embeds: [embed] });
        }
    }
});
