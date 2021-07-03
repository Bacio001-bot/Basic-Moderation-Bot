module.exports = {
    name: "removerole",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        //check for perms
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        //get first mentioned member
        const member = message.mentions.users.first()
        if (!member) return message.channel.send(`No member mentioned`)

        //Convert member to a user so we can use it
        const user = message.guild.member(member)

        //get the second argument which should be or a role mentioned or a role id
        let roleid = args[2]

        //convert if mention to id
        roleid = roleid.replace("<@&","")
        roleid = roleid.replace(">","")

        //Get role by id
        const role = message.guild.roles.cache.find(c => c.id == roleid)

        //Check if role exists
        if (!role) return message.channel.send(`No role found with the id \`${roleid}\``)

        try {

            //remove the role from the user
            await user.roles.remove(role)
            message.channel.send(`\`${member.username}\` has lost the role \`${role.name}\``)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't take the role\`${role.name}\` from \`${member.username}\` make sure my role is higher`)

        }
    }
}