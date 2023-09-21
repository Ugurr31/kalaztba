const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.js")
let prefix = config.prefix
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.member.roles.cache.has(config.KAYİT_SORUMLUSU_ROLE_ID)) return message.reply({ content: "Bunu yapabilmek için kayıt sorumlusu olmalısın." })

    if (!member) return message.reply({ content: "Lütfen bir kullanıcı belirtin." })

    await member.setNickname(`${member.user.username}`).catch(e => { console.log(e) })
    member.roles.remove(config.KAYİTLİ_ROL_ID).catch(e => { console.log(e) })

    const kayitsiz_embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`${member} adlı üyenin kaydı **başarıyla** silindi!`)
        .setFooter({ text: `Kaydı silen yetkili: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })

    return message.reply({ embeds: [kayitsiz_embed] })
};
exports.conf = {
    aliases: ["unk"]
};

exports.help = {
    name: "kayıtsız"
};