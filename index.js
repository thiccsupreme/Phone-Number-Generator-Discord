const Discord = require('discord.js');
const client = new Discord.Client();
const random = require("random");
const prefix = '?';


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

function generatePhone(code) {
    const areaCode = code
    const num = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    let middleNums = "";
    let finalFour = "";

    for (let j = 0; j <= 2; j++) {
        middleNums += num[random.int(0, num.length - 1)];
    }

    for (let i = 0; i <= 3; i++) {
        finalFour += num[random.int(0, num.length - 1)];
    }

    var fullPhone = `(${areaCode})-${middleNums}-${finalFour}\n`
    return fullPhone
}

client.on('message', message => {

    let args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;

    switch (args[0]) {
        case "phone":
            const areaCode = args[1];
            if (isNaN(Number(areaCode)) || areaCode.toString().length !== 3) {
                message.channel.send("Please provide a valid area code!")
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Your area code: ${areaCode}`)
                    .setColor(0x5126c7)
                    .setFooter("Made by @FootlockerRU")
                    .setTimestamp()
                    .setDescription(`**Below will be a list of 12 phone numbers with your area code (${areaCode}):**`)
                for (let i = 1; i < 13; i++) {
                    embed.addField(`${i}.`, generatePhone(areaCode), true)
                }
                message.channel.send("Please check your DMs!").then(m => {
                    message.author.send(embed)
                })
                break;
            }
    }
})

client.login('NzE4NDgzMzQ4MTk2MTYzNzE2.Xt5tew.PYRsT9wTTSMts9ZPC2MJCtJ2yAA');
