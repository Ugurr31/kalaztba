const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return message.reply({ content: "Yeterli yetkiye sahip değilsin." })

    const row = new Discord.ActionRowBuilder()
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("1")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("one")
        )
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("2")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("two")
        )
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("3")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("three")
        )
        .addComponents(
            new Discord.ButtonBuilder()
                .setLabel("4")
                .setStyle(Discord.ButtonStyle.Primary)
                .setCustomId("four")
        )

    client.channels.cache.get(config.MENU_MESSAGE_CHANNELID).send({ content: "Aşağıdaki menüden kendinize bir işlem seçip sunucu içi depolanan verilerinizi sorgulayabilirsiniz. Verileriniz sadece sizin görebileceğiniz şekilde gönderilir.\n・1: Sunucuya giriş tarihinizi öğrenin.\n・2: Kayıt olmuş olduğunuz isimleri öğrenin.\n・3: Üzerinizdeki rolleri sıralayın.\n・4: Hesabınızın açılış tarihini öğrenin.", components: [row] })
};
exports.conf = {
    aliases: ["menu"]
};

exports.help = {
    name: "menü"
};