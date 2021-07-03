module.exports = {
    name: "purge",
    async execute(bot, message, PREFIX, Discord, settings, args) {

        //check if user has perms
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`You do not have the right permissions`)

        try {

            //get delete amount
            deleteAmounts = parseInt(args[1]);

            //check if amount is a number
            if (isNaN(deleteAmounts) || deleteAmounts >= 100) return message.channel.send(`Please give a valid number below a 100`)

            //delete amount of messages
            message.channel.bulkDelete(deleteAmounts + 1, true)
            message.author.send(`${deleteAmounts} messages deleted`)

        } catch (err) {

            console.log(err)
            return message.channel.send(`Couldn't purge make sure it's a valid amount and that I have the right role`)

        }
    }
}