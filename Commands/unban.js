module.exports = {
    name: "unban",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        //check for perms
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        let id = args[1]

        //if no id supplied
        if (!id) return message.channel.send(`No id supplied`)

        //Fetch all guild bans
        let bans = await message.guild.fetchBans()

        try {

            //find the user by id by bans
            let bannedUser = bans.find(b => b.user.id == id)

            //unban user
            message.guild.members.unban(bannedUser.user)
            message.channel.send(`\`${bannedUser.user.username}\` has been unbanned`)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't unban the user with the id \`${id}\` make sure I have the right roles`)

        }
    }
}