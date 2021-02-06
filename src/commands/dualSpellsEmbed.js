const Discord = require('discord.js');

const dualSpellsEmbed = {
    "title": "@user1 casted spellName on @user2",
    "description": "Description here",
    "url": "https:/d/discordapp.com",
    "color": 16148517,
    "timestamp": "2021-02-06T09:26:20.160Z",
    "footer": {
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png",
      "text": "footer text"
    },
    "thumbnail": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "image": {
      "url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "author": {
      "name": "author name",
      "url": "https://discordapp.com",
      "icon_url": "https://cdn.discordapp.com/embed/avatars/0.png"
    },
    "fields": [
      {
        "name": "POWER",
        "value": "value",
        "inline": true
      },
      {
        "name": "DAMAGE GIVEN",
        "value": "value",
        "inline": true
      },
      {
        "name": "XP GAINED",
        "value": "value",
        "inline": true
      },
      {
        "name": "HEALING",
        "value": "value",
        "inline": true
      }
    ]
  };
  channel.send("Serious Black", { dualSpellsEmbed });