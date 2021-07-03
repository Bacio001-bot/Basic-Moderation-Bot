module.exports = {
    name: "unmute",
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

            //check if user has muted role
            if (!user.roles.cache.has(muteRole.id)) return message.channel.send(`This user is not muted`)

            //remove mute role
            await user.roles.remove(muteRole)
            message.channel.send(`\`${member.username}\` has been unmuted`)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't unmute \`${member.username}\` make sure I have the right roles`)

        }

    }
}