const { Client,ReactionCollector } = require('discord.js');
const duals = require('./dualSpellsEmbed');

const PREFIX = "hp!";
module.exports = async (message, client, channel) =>{
    const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
    console.log(message.author.id);
    let p = args[0];
    p = p.replace('>', '');
    p = p.replace('<@!', '');
    let dualists = [message.author, args[0]];

    if(message.author.id === p) {
        message.reply('You cannot battle with yourself');
        return;
    }

    message.channel.send(`Do you accept the challenge? ${dualists[1]} react with 👌 to accept`)
    .then( bot_message => {
        bot_message.react("👌");
        const filter = (reaction, user) => reaction.emoji.name === '👌' && user.id === p;
        let collector = bot_message.createReactionCollector(filter, { time: 10000 })
        collector.on('collect', (reaction, collector) => {
            console.log('got a reaction');
            let i =0;
            let user1 = {"health": 100, "id": dualists[0]};
            let user2 = {"health": 100, "id": dualists[1]};
            console.log(message.author.id, p);
            client.on('message', (message_fight) => {
                if(user1["health"] <= 0) return message_fight.channel.send(`${message.authour} lost the Dual!`);
                if(user2["health"] <= 0) return message_fight.channel.send(`${args[0]} lost the Dual!`);
                if(message_fight.author.id === message.author.id || message_fight.author.id === p){
                    const [CMD_NAME, ...args_] = message_fight.content // = hp!spells sectumsempra @nimit
                        .trim().
                        substring(PREFIX.length)
                        .split(/\s+/);
                        if(i%2 === 0){
                            for(let i=0; i<Number(duel_spells.length); i++){
                                if(duel_spells[i].SpellName === args_[0]){
                                    user2['health'] = Number(user2['health']) - Number(duel_spells[i].Damage);
                                    console.log(`user2: ${user2['health']}`);
                                }
                            }
                        }else{
                            for(let i=0; i<Number(duel_spells.length); i++){
                                if(duel_spells[i].SpellName === args_[0]){
                                    user1['health'] = Number(user1['health']) - Number(duel_spells[i].Damage);
                                    console.log(`user1: ${user1['health']}`);
                                }
                            }
                        }
                    
                    console.log(args_, i);
                    i = i+1;
                }
            })
        })
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    })
    .catch(error => {
        console.log(error);
    })
}