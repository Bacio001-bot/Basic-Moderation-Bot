//Converts 1s/m/hd/w/m/y to milseconds
const ms = require('ms');

module.exports = {
    name: "mute",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        //check for perms
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        //get first mentioned member
        const member = message.mentions.users.first()
        if (!member) return message.channel.send(`No member mentioned`)

        //Convert member to a user so we can use it
        const user = message.guild.member(member)
        
        //Get mute role by name mute
        const muteRole = message.guild.roles.cache.find(c => c.name == `mute`)

        //Check if role exists
        if (!muteRole) return message.channel.send(`No \`mute\` role found please proceed to create one`)

        try {

            //check if user already has the mute role
            if (user.roles.cache.has(muteRole.id)) return message.channel.send(`This user is already muted`)

            //Add the role to the user to mute him/her
            await user.roles.add(muteRole)
            message.channel.send(`\`${member.username}\` has been muted`)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't mute \`${member.username}\` make sure I have the right roles`)

        }

        try {

            //Set timer for unmute
            setTimeout(async() => {

                //Remove mute role
                await user.roles.remove(muteRole); 
                user.send(`You have been unmuted in \`${message.guild.name}\` after a mute time of \`${args[2]}\` `)

            }, ms(args[2]))

        } catch (err) {

            console.log(err)
            user.send(`Your mute timer has expired but I can't unmute you`)
            return message.channel.send(`Couldn't unmute \`${member.username}\` but his mute has expired make sure I have the right roles`)

        }
    }
}