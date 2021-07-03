module.exports = {
    name: 'message',
    async execute(bot, message, PREFIX, Discord) {

        //create arguments
        let args = message.content.substring(PREFIX.length).split(" ");

        //check if starts with prefix
        if (message.content.startsWith(PREFIX)) {

            //Check if any of the cases is the first args => which means the command
            switch (args[0].toLowerCase()) {

                case "kick":
                    //execute the command
                    bot.commands.get('kick').execute(bot, message, PREFIX, Discord, args);
                    break;

                case "ban":
                    bot.commands.get('ban').execute(bot, message, PREFIX, Discord, args);
                    break;
                    
                case "unban":
                    bot.commands.get('unban').execute(bot, message, PREFIX, Discord, args);
                    break;

                case "addrole":
                    bot.commands.get('addrole').execute(bot, message, PREFIX, Discord, args);
                    break;

                case "removerole":
                    bot.commands.get('removerole').execute(bot, message, PREFIX, Discord, args);
                    break;

                case "mute":
                    bot.commands.get('mute').execute(bot, message, PREFIX, Discord, args);
                    break;

                case "purge":
                    bot.commands.get('purge').execute(bot, message, PREFIX, Discord, args);
                    break;

            }
        }
    }
}
