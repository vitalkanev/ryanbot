// Calling Packages
const Discord = require('discord.js');
const client = new Discord.Client();

// Global Settings
const prefix = '-'; // This is the prefix, you can change it to whatever you want.

// Listener Event: Runs whenever a message is received.
client.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }


    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
});

// Listener Event: Runs whenever the bot sends a ready event (when it first starts for example)
client.on('ready', () => {

    // We can post into the console that the bot launched.
    console.log('Bot started.');

});

client.login("MzQ3OTM2NDgwNzc5NDM2MDMz.DYLEXg.FvyQLCispXNN5leLpumYEOYwk5Q")
