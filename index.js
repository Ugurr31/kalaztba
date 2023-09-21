const { PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const Discord = require("discord.js")
const db = require("croxydb")

const client = new Client({
  partials: [
    Partials.Message,
    Partials.Channel,
    Partials.GuildMember,
    Partials.Reaction,
    Partials.GuildScheduledEvent,
    Partials.User,
    Partials.ThreadMember,
  ],
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.MessageContent,
  ],
});


module.exports = client;

require("./events/message.js")
require("./events/ready.js")

client.login(config.token || process.env.TOKEN)


client.on("guildMemberAdd", async (member) => {
  client.channels.cache.get(config.HOSGELDİN_CHANNELID).send({ content: `:tada: :flag_tr: **OwO TR** sunucumuza hoş geldin ${member}\n\n:flag_tr: Seninle beraber **${member.guild.memberCount}** üyeye ulaşmış bulunmaktayız. :tada:\n\n:star: Sunucu kurallarımız <#${config.KURALLAR_CHANNEL_ID}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecektir.\n\n:star: Sunucumuza kayıt olmak için \`owo profile\` yazman gerekiyor. Eğer **5 Level** altındaysan seni kayıt edemeyiz.\n\nHesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}:F> tarihinde oluşturulmuş! | <@&${config.KAYİT_SORUMLUSU_ROLE_ID}>` })
})

client.on("interactionCreate", async (interaction) => {
  if (interaction.customId === "one") {
    const serverJoined = `<t:${Math.floor(interaction.member.joinedTimestamp / 1000)}:F>`;

    const embed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .addFields(
        { name: "Sunucuya Giriş Tarihiniz:", value: `${serverJoined}` }
      )
      .setThumbnail(interaction.user.displayAvatarURL())

    interaction.reply({ embeds: [embed], ephemeral: true })
  }


  if (interaction.customId === "two") {
    const memberNames = db.get(`registerNames_${interaction.user.id}`)

    if (!memberNames) return interaction.reply({ content: "Hiç kayıtlı isminiz yoktur.", ephemeral: true })
    const memberNamesMap = memberNames.map((veri, index) => { `#${index + 1}: ${veri}` })

    const embed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .addFields(
        { name: "Kaydedilmiş Tüm İsimleriniz:", value: `${memberNamesMap.join("\n") || "hiç kayıt edilmiş isminiz yok"}` }
      )
      .setThumbnail(interaction.user.displayAvatarURL())

    interaction.reply({ embeds: [embed], ephemeral: true })
  }


  if (interaction.customId === "three") {
    const memberRoleCount = interaction.member.roles.cache.size;
    const memberRoles = interaction.member.roles.cache.map(lourity => lourity).join(", ");

    const embed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .addFields(
        { name: "Toplam Rol Sayınız:", value: `${memberRoleCount || "0"}`, inline: true },
        { name: "Rolleriniz:", value: `${memberRoles || "yok"}`, inline: true }
      )
      .setThumbnail(interaction.user.displayAvatarURL())

    interaction.reply({ embeds: [embed], ephemeral: true })
  }


  if (interaction.customId === "four") {
    const memberJoined = `<t:${Math.floor(interaction.user.createdTimestamp / 1000)}:F>`;

    const embed = new EmbedBuilder()
      .setColor("DarkButNotBlack")
      .setAuthor({ name: `${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL() })
      .addFields(
        { name: "Hesabınızın Açılış Tarihi:", value: `${memberJoined}` }
      )
      .setThumbnail(interaction.user.displayAvatarURL())

    interaction.reply({ embeds: [embed], ephemeral: true })
  }
})