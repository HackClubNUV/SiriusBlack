let user1 = {"health": 400, "id": dualists[0]};
                    let user2 = {"health": 400, "id": dualists[1]};
                    for(let i =0; (user1["health"]>0 || user2["health"]>0) ; i++){
                        // console.log(args_[0]);
                        client.on('message', async (message_fight) => {
                               
                        if(message_fight.content.startsWith(PREFIX)){
                                const [CMD_NAME, ...args_] = message_fight.content // = hp!spells sectumsempra @nimit
                                    .trim().
                                    substring(PREFIX.length)
                                    .split(/\s+/);
                                //if(!CMD_NAME === 'castspell') return message_fight.channel.send('you lost your chance with the wrong command');
                                //if(!spells.includes("args_[0]")) return message_fight.channel.send('you lost your chance with the wrong spell');
                                message_fight.channel.send(`Attack on ${dualists[1]}`)
                                if(i%2 === 0){
                                    for(let i=0; i<Number(duel_spells.length); i++){
                                        if(duel_spells[i].SpellName === args_[0]){
                                            Number(user2['health']) = Number(user2['health']) - Number(duel_spells[i].Damage);
                                            console.log(`user1: ${user['health']}`);
                                        }
                                    }
                                }else{
                                    for(let i=0; i<Number(duel_spells.length); i++){
                                        if(duel_spells[i].SpellName === args_[0]){
                                            Number(user1['health']) = Number(user1['health']); - Number(duel_spells[i].Damage);
                                            console.log(`user1: ${user1['health']}`);
                                        }
                                    }
                                }
                                  
                            }
                        })
                    }
                        //})