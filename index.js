const Discord = require('discord.js');

//Custom prefix
const PREFIX = "m$";

//For command handler
const fs = require('fs');

//Your bot token
const { token } = require('./config.json')

//Define your bot some people use client
const bot = new Discord.Client({
    partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

//Commands Handler
const commandFiles = fs.readdirSync('./Commands/').filter(file => file.endsWith('.js'));
bot.commands = new Discord.Collection();
for (const file of commandFiles) {
    const command = require(`./Commands/${file}`);

    bot.commands.set(command.name, command)
}

//Events Handler
const eventFiles = fs.readdirSync('./Events/').filter(file => file.endsWith('.js'));
bot.events = new Discord.Collection();
for (const file of eventFiles) {
    const event = require(`./Events/${file}`);

    bot.events.set(event.name, event)
}

//When the bot gets put online
bot.on('ready', () => {
    bot.events.get('ready').execute(bot, PREFIX);
});

//When the bot recieves a message
bot.on('message', async (message) => {
    bot.events.get('message').execute(bot, message, PREFIX, Discord);
})

//Bot login
bot.login(token);