const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.member.roles.cache.has(config.KAYİT_SORUMLUSU_ROLE_ID)) return message.reply({ content: "Bunu yapabilmek için kayıt sorumlusu olmalısın." })

    if (member) {
        const info = db.get(`yetkiliİnfo_${member.id}`)
        const mInfo = db.get(`yetkiliKayitİnfo_${member.id}`)

        if (!mInfo) return message.reply({ content: "Belirtilen kişinin kayıt verisi yoktur." })

        const info_embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setAuthor({ name: `${member.user.username}`, iconURL: member.displayAvatarURL() })
            .setDescription(`${member} yapmış olduğu kayıt bilgileri aşağıdadır.`)
            .addFields(
                { name: "Toplam Kayıt:", value: `${mInfo || "0"}`, inline: true },
                { name: "En Son Kaydettiği:", value: `<@${info.sonKayit || "yok"}>`, inline: true },
                { name: "En Son Kayıt Tarihi:", value: `${info ? `<t:${Math.floor(info.sonKayitTarih / 1000)}:R>` : "yok"}`, inline: true },
            )
            .setThumbnail(member.displayAvatarURL())

        return message.reply({ embeds: [info_embed] })
    } else {
        const meinfo = db.get(`yetkiliİnfo_${message.author.id}`)
        const memInfo = db.get(`yetkiliKayitİnfo_${message.author.id}`) || "0"

        if (!meinfo) return message.reply({ content: "Hiç kayıt veriniz yoktur." })

        const info_embed = new EmbedBuilder()
            .setColor("DarkButNotBlack")
            .setAuthor({ name: `${message.author.username}`, iconURL: message.author.displayAvatarURL() })
            // .setDescription(`Yapmış olduğunuz kayıt bilgileri aşağıdadır.`)
            .addFields(
                { name: "Toplam Kayıt:", value: `${memInfo}`, inline: true },
                { name: "En Son Kaydedilen:", value: `<@${meinfo.sonKayit}>`, inline: true },
                { name: "En Son Kayıt Tarihi:", value: `<t:${Math.floor(meinfo.sonKayitTarih / 1000)}:R>`, inline: true },
            )
            .setThumbnail(message.author.displayAvatarURL())

        return message.reply({ embeds: [info_embed] })
    }
};
exports.conf = {
    aliases: ["topkayit", "topkayıt", "kb", "kayitbilgi", "kayıtbilgi", "kayıtistatistik", "kayıtstat", "kayıtst"]
};

exports.help = {
    name: "kayıt-bilgi"
};