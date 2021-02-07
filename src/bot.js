'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client, ReactionCollector, MessageEmbed } = require('discord.js');
const obliviate = require('./commands/obliviate');

// calling json files
 const dualSpells = require('../DB/duel_spells.json');
// const senddata = require('./commands/dualSpellsEmbed');
//senddata(dualSpells);
//console.log(dualSpells);

// Commands
const prespective  = require('../api/perspective');
const duel_spells = require('../DB/duel_spells.json');


const client = new Client({
    partials: ['MESSAGE', 'REACTION']
});

const PREFIX = "hp!";

client.on('ready', () => {
    console.log(`${client.user.username} has logged in!`);
})

client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size;
    const users = client.users.cache.size;
    
    console.log(`Bot is now online and serving in ${servers} Server and ${users} users`);
    client.user.setActivity(`casting spells!`, {
        type: 'PLAYING'
    });
})

// Perspective API Toxicity
client.on('message', async (message) => {
    if(message.content.startsWith(PREFIX)) return;
    if(message.author.bot === true) return;
    const data_ = [];
    prespective(message.content).then(data => {
        const t = data[0];
         if(Number(t)>Number(0.89)){
            console.log(t);
            message.delete({time: 2000})
                .then(message => {
                    message.channel.send(`${message.id} from ${message.author} was Obliviated because it was against TOC of Server! `)
                    message.channel.send('https://tenor.com/uXN3.gif');
                });
         }
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
})

client.on('message', async (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        
        switch(CMD_NAME){
            case "hello" : {
                message.channel.send('https://giphy.com/gifs/sirius-black-TzJxDdJckPQ9q ')
            }
            break;
            case "help": {
                const helpEmbedd = new MessageEmbed()
                .setTitle('List of Commands' )
                .addField('hello','Say hi to serious black' )
                .addField('spellname','Gets the list of all spells' )
                .addField('dual <@user>','Challenge someone for a dual' )
                .addField('obliviate <number>','Deletes last <number> messages from that channel' )
                .addField('Crucio <@user>','Kick a user' )
                .addField('Avadacadavra <@user>','Bans a user' )
                .addField('Stupefy <@user>','Warns the user' );
                message.channel.send(helpEmbedd);                
            }
            break;
            case "spellname" : {
                let spellnames = [];
                let spelldescription = [];
                for(let i=0; i<dualSpells.length; i++){
                    spellnames[i] = dualSpells[i].SpellName;
                    spelldescription[i] = dualSpells[i].Description;
                }


                console.log(spellnames[0], spelldescription[0]);
                console.log(spellnames.length);
                const spellsEmbed = new MessageEmbed()
                    .setTitle('Dual Spells')
                    .addField(spellnames[0], spelldescription[0])
                    .addField(spellnames[1], spelldescription[1])
                    .addField(spellnames[2], spelldescription[2])
                    .addField(spellnames[3], spelldescription[3])
                    .addField(spellnames[4], spelldescription[4])
                    .addField(spellnames[5], spelldescription[5])
                    .addField(spellnames[6], spelldescription[6])
                    .addField(spellnames[7], spelldescription[7])
                message.channel.send(spellsEmbed);  
            }
            break;
            // spells @veer
            // dual @user__ @nimit
            // gamble @krish
            // embeds // xp ++ // leaderboard @krish
            // toxicity [perspective api] 89 with spells @karandev
            case "tellmep": {
                obliviate();
                //prespective().then(data => console.log(data));s
            }
            break;
            case "obliviate" : {
                message.channel.bulkDelete(args[0])
                    .then( messages => {
                        message.channel.send(`${messages.size} Messages were deleted by the magical spell of Obliviate from ${message.author}!`);
                        message.channel.send('https://tenor.com/uXN3.gif');
                    })
                    .catch(Error => {
                        console.log(Error);
                        message.channel.send('Enter number to delete messages')
                    });
            }
            break;
            case "dual" : {
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
                        client.on('message', function toBeClosed (message_fight) {
                            if(message_fight.author.id === message.author.id || message_fight.author.id === p){
                                const [CMD_NAME, ...args_] = message_fight.content // = hp!spells sectumsempra @nimit
                                    .trim().
                                    substring(PREFIX.length)
                                    .split(/\s+/);
                                    if(i%2 === 0){
                                        for(let i=0; i<Number(duel_spells.length); i++){
                                            if(duel_spells[i].SpellName === args_[0]){
                                                user2['health'] = Number(user2['health']) - Number(duel_spells[i].Damage);
                                                message_fight.channel.send(`user2: ${user2['health']}`);
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
                                if(user1["health"] <= 0) {
                                     message_fight.channel.send(`${message.author} lost the Dual!`);
                                     client.removeListener('message', toBeClosed);
                                     return;
                                }
                                if(user2["health"] <= 0) { 
                                     client.removeListener('message', toBeClosed);
                                     message_fight.channel.send(`${args[0]} lost the Dual!`);
                                    return;
                                }
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
            break;
        }
    }
})


client.login(process.env.DJSTOKEN); 
