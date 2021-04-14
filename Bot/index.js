const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const { randomBytes } = require("crypto");
const prefix = "!"
var nazwabota = "Bot"

const bot = new Discord.Client({disableEveryone: true})

bot.on("ready", async () => {
    console.log(`${nazwabota} jest online`)
});

bot.on("message", async message => {
    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return;
    var args = message.content.slice(prefix.length).trim().split(/ +/g);
    var command = args.shift().toLowerCase()

    if(command == "help"){
        const embed = new Discord.MessageEmbed()
        .setDescription("```==================  MusicBot  ===================\n 🔷 !avatar - Will show your default avatar.\n 🔷 !help - See all the commands.\n 🔷 !invite - Give you a invite link.\n 🔷 !leave - MusicBot will disconnect.\n 🔷 !join - Connect the MusicBot to the channel.\n 🔷 !purge - Clears the last 5 text messages.\n 🔷 !sad - Say and delete your message.\n 🔷 !swd - Say without deleting your message.\n 🔷 !tosscoin - Virtual toss coin.\n==================================================```")
        .setColor(0x3333ff)
        message.channel.send(embed);
    } else if(command == "avatar"){
        message.channel.send("Twój domyślny avatar: ");
        let user = message.mentions.users.first() || message.author
        const embed = new Discord.MessageEmbed()
            .setImage(user.defaultAvatarURL)
            .setColor(0x00A2E8)
        message.channel.send(embed);
    } else if(command == "leave"){
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(!message.guild.me.voice.channel){
                return message.reply("MusicBot nie jest połączony z kanałem głosowym!");
            }
            if(message.guild.me.voiceChannelID !== message.member.voiceChannelID){
                return message.reply("MusicBot znajduje się na innym kanale. Przejdź na odpowiedni kanał głosowy!");
            }
            if(!message.member.voice.channel){
                return message.reply('połącz się z kanałem głosowym, na którym jest MusicBot!');
            } else {
                const connection = await message.member.voice.channel.leave();
                message.reply('MusicBot opuścił twój kanał głosowy.');
            }
        } else {
            return message.reply("nie masz permisji!! Wpisz !help");
        }
    } else if(command == "invite"){
        return message.channel.send("https://discord.com/invite/YA6bB82");
    } else if(command == "join"){
        if(message.member.hasPermission("MANAGE_MESSAGES")){
            if(message.member.voice.channel){
                const connection = await message.member.voice.channel.join();
                return message.reply("MusicBot połączył się z twoim kanałem głosowym.");
            } else {
                return message.reply('dolacz najpierw na wybrany kanał głosowy!');
            }
        } else {
            return message.reply("nie masz permisji! Wpisz !help");
        }
    } else if(command == "purge"){
        if(message.member.hasPermission("MANAGE_MESSAGES")) {
            if(message.deletable){
                message.delete();
                message.channel.bulkDelete(10, true);
            }
        } else {
            return message.channel.send("nie masz permisji!! Wpisz !help");
        }
    } else if(command == "sad"){
        message.delete();
        return message.channel.send(message.content.slice(prefix.length+3));
    } else if(command == "swd"){
        return message.channel.send(message.content.slice(prefix.length+3));
    } else if(command == "tosscoin"){
        return message.reply(Math.floor(Math.random()*2) === 0 ? 'Orzeł!':'Reszka!');
    } else{
        return message.reply("komenda nie istnieje. Wpisz !help");
    }
});

bot.login(botconfig.token)