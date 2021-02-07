## Description

<details>
<summary>Requirements</summary>
<br>
  <ul>
    <li> NodeJs > 12.XX </li>
    <li> NPM >= 6.0.0</li>
    <li> Nodemon</li>
  </ul>
</details>

<details>
<summary>Installation</summary>
<br>
<ul>
  <li> Save A Copy Of The Repository On Your Local System</li>
  <li> Add a .env file in the folder</li>
  <li> Declare A Token In Your .env file by referring .env_sample</li>
  <li> Open Terminal In The Repository Folder</li>
  <li> npm -i</li>
  <li> npm run dev</li>
 </ul>
</details>
  
<details>
<summary>Features</summary>
<br>
<ul>
  <li> Toxicity Monitoring With Perspective API</li>
  <li> Modertaion Commands Using Harry Potter Spells</li>
  <li> Harry Potter Themed Mini Game - Duel With Spells</li>
  </ul>
</details>

<details>
<summary>Explanation</summary>
<br>
<ul>
  <li>Defines Status Of Bot</li>
    
 ```js
 client.on('ready', () => {
    //This will get the amount of servers and then return it.
    const servers = client.guilds.cache.size;
    const users = client.users.cache.size;

    console.log(Bot is now online and serving in ${servers} Server and ${users} users);
    client.user.setActivity(casting spells!, {
        type: 'PLAYING'
    });
})
 ```
 
 <li>Defines Toxicity Monitoring Implementation</li>
 
 ```js
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
                    message.channel.send(${message.id} from ${message.author} was Obliviated because it was against TOC of Server! )
                    message.channel.send('https://tenor.com/uXN3.gif');
                });
         }
    })
 ```
 
 <li>Defines Perspective API Call</li>
  
 ```js
 'use-strict'
const { google } = require('googleapis');
require('dotenv').config();

API_KEY = process.env.GOOGLEAPIKEY;
//console.log(process.env.GOOGLEAPIKEY);

DISCOVERY_URL =
    'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

    module.exports  = async (comment) => {
      const client = await google.discoverAPI(DISCOVERY_URL);
      const analyzeRequest = {
        comment: {
          text: comment,
        },
        requestedAttributes: {
          // PROFANITY: {},
          TOXICITY: {},
          // FLIRTATION: {},
          // SPAM: {}
        },
      };
      const response = await client.comments.analyze( {
        key: API_KEY,
        resource: analyzeRequest,
      });
      let data = response.data.attributeScores;
      let a;
      return Object.values(data).map(level => level.summaryScore.value);
 ```
 
 <li>Prefix Declaration For The Bot Commands</li>
  
 ```js
 client.on('message', async (message) => {
    if(message.author.bot === true) return;
    if(message.content.startsWith(PREFIX)){
        const [CMD_NAME, ...args] = message.content // = hp!spells sectumsempra @nimit
        .trim().
        substring(PREFIX.length)
        .split(/\s+/);
 ```
 
 <li>Hello & Help Command Implementation</li>
  
 ```js
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
 ```
 
 <li>Duel Spells Commands Implementation</li>
  
 ```js
 case "spellname" : {
                let spellnames = [];
                for(let i=0; i<dualSpells.length; i++){
                    spellnames[i] = dualSpells[i].SpellName;
                }
                console.log(spellnames);
                const spellsEmbed = new MessageEmbed()
                    .setTitle('Dual Spells')
                    .addFields[spellnames];
                message.channel.send(spellsEmbed);
            }
            break;
 ```
 
 <li>Obliviate [Bulk Deltion] Implemantaion</li>
  
 ```js
 case "obliviate" : {
                message.channel.bulkDelete(args[0])
                    .then( messages => {
                        message.channel.send(${messages.size} Messages were deleted by the magical spell of Obliviate from ${message.author}!);
                        message.channel.send('https://tenor.com/uXN3.gif');
                    })
                    .catch(Error => console.log(Error));
            }
            break;
 ```
 
 <li>Harry Potter Mini Game Part</li>
  
 ```js
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
 ```
 
 <li>Token Declaration</li>
  
 ```js
 client.login(process.env.DJSTOKEN);
 ```
 
</details>
