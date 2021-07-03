module.exports = {
    name: "ban",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        //check for perms
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        //get first mentioned member
        const member = message.mentions.users.first()
        if (!member) return message.channel.send(`No member mentioned`)

        //Convert member to a user so we can use it
        const user = message.guild.member(member)

        try {

            //Ban user
            user.ban()
            message.channel.send(`\`${member.username}\` has been banned`)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't ban \`${member.username}\` make sure I have the right roles`)

        }
    }
}