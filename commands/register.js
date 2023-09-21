const { EmbedBuilder } = require("discord.js");
const Discord = require('discord.js');
const config = require("../config.js")
const db = require("croxydb");
let prefix = config.prefix
exports.run = async (client, message, args) => {
  const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  const name = args.slice(1).join(" ");

  if (!message.member.roles.cache.has(config.KAYİT_SORUMLUSU_ROLE_ID)) return message.reply({ content: "Bunu yapabilmek için kayıt sorumlusu olmalısın." })

  if (!member) return message.reply({ content: "Lütfen bir kullanıcı belirtin." })
  if (!name) return message.reply({ content: "Lütfen bir isim belirtin." })

  await member.setNickname(`${name}`).catch(e => { console.log(e) })
  member.roles.add(config.KAYİTLİ_ROL_ID).catch(e => { console.log(e) })

  const kayit_embed = new EmbedBuilder()
    .setColor("Green")
    .setDescription(`${member} adlı üyenin kaydı **başarıyla** yapıldı!`)
    .setFooter({ text: `Kayıt eden yetkili: ${message.author.username}`, iconURL: message.author.avatarURL({ dynamic: true }) })

  db.set(`yetkiliİnfo_${message.author.id}`, { sonKayit: member.id, sonKayitTarih: Date.now() })
  db.add(`yetkiliKayitİnfo_${message.author.id}`, 1)
  db.push(`registerNames_${member.id}`, name)
  return message.reply({ embeds: [kayit_embed] })
};
exports.conf = {
  aliases: ["kayit", "k", "e", "erkek", "kız", "kadın"]
};

exports.help = {
  name: "kayıt"
};