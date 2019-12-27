const Disocrd = require("discord.js");
const Client = new Disocrd.Client();
const prefix = "!"

Client.on('ready', ()=>{
    console.log("Bot is online.");
})

Client.on("message", (message)=>{

    if(!message.content.startsWith(prefix)) return;

    if(message.content.startsWith(prefix + "hello")){
        message.channel.send("Hello.");
    }

    if(message.content.startsWith(prefix + "helpo")) {
        message.channel.send("Check your DM")
        message.author.send("This is a test")
    }

    if(message.content.startsWith(prefix + "pmie")){
        let author = message.member;
        let role = message.guild.roles.find('name', "Founder");
        if(author.roles.has(role.id)){
            message.reply("You have Permission.");
            return
        }else{
            message.reply("You don't have permission");
        }

    }

    if(message.content.startsWith(prefix + "prune")){
        let args = message.content.split(" ").slice(1);
        let author = message.member;
        let role = message.guild.roles.find('name', 'Founder');
        if(author.roles.has(role.id)){
            if(!args[0]){
                message.delete();
                message.author.send("No arguments given.");
                return;
            }
            if(args[0] > 100){
                message.delete();
                message.author.send("maximum is 100 messeges at once.");
                return;
            }

            message.delete();
            message.channel.bulkDelete(args[0]);
            message.author.send("Done! I have deleted " + args[0] + " messeges");
            return;
        }
    }

    if(message.content.startsWith(prefix + "ban")){
        let memberToBan = message.mentions.members.first();
        let banReason = message.content.split(" ").slice(1);


        if(!banReason[1]){
            message.reply("You have not specified a ban reason.");
            return;
        }

        if(!memberToBan){
            message.reply("You have not mentioned anyone to ban.");
            return;
        }

        if(message.guild.members.find('id', memberToBan.id)){
            memberToBan.ban(banReason);
            message.reply("Banned the user.");
            return;
        }else{
            message.reply("Error.");
            return;
        }

    }


})

Client.login(proccess.env.BOT_TOKEN)
