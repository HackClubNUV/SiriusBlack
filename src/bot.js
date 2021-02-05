'use strict'
require('dotenv').config();
const colors = require('colors');
const axios = require('axios');
const { Client } = require('discord.js');
const spells = require('./commands/spells');

// Commands
const spell = require('./commands/spells')

const client = new Client({
    //partials: ['MESSAGE', 'REACTION']
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
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
        
        switch(CMD_NAME){
            case "spell" : {
                spells();
            }
            break;
        }
    }
})




client.login(process.env.DJSTOKEN);