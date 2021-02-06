'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client } = require('discord.js');
const spells = require('./commands/spells');

// Commands
const spell = require('./commands/spells');
const prespective  = require('../api/perspective');


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

    //This will display "Playing in <servers> servers!"
    // client.user.setActivity(`in ${servers} servers and serving ${users} Users`, {
    //     type: 'PLAYING',
    // });
    client.user.setActivity(`casting spells!`, {
        type: 'PLAYING'
    });
})

client.on('message', async (message) => {
    if(message.author.bot === true) return;
    const data_ = [];
    prespective(message.content).then(data => {
        // const p = data[0];
        const t = data[0];
        // const f = data[2];
        // const s = data[3];
         if(Number(t)>Number(0.89)){
            console.log(t);
            message.delete({time: 2000})
                .then(message => {
                    message.channel.send(`${message.id} from ${message.author} was deleted because it was against COC!`)
                });
         }
            // console.log(p, t, f, s);
    })
    .catch(error => {
        console.log(`ERROR: ${error}`);
    });
    // if(data[1]>Number(0.89))
    //     message.delete();
})

client.on('message', async (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        
        switch(CMD_NAME){
            case "spells" : {
                spells();
                message.reply('you were fucked')
            }
            // spells @veer
            // dual @user__ @nimit
            // gamble @krish
            // embeds // xp ++ // leaderboard @krish
            // toxicity [perspective api] 89 with spells @karandev
            case "tellmep": {
                console.log(args);
                //prespective().then(data => console.log(data));s
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
                
                message.channel.send(`Do you except the challenge? ${dualists[1]} react with 👌 to accept`);
                const filter = (reaction, user) => reaction.emoji.name === '👌' && (user.id === 'p');
                message.awaitReactions(filter, { time: 15000 })
                    .then(collected => {
                        message.channel.send(`Lets play start dual ${message.author} vs ${args[0]}`);
                        message.channel.send(`${message.author} you chance first.`)
                        console.log(collected);
                        console.log(`Collected ${collected.size} reactions`)
                        
                    })
                    .catch(console.error);
            } 
            
            break;
        }
    }
})




client.login(process.env.DJSTOKEN);