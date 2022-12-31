# LOGS

## Setup

1. init empty github file  *optional*
2. install discord.js
3. *optional* - add node_modules to .gitignore
4. make bot on discord website 
5. Making discord application
	- turn on developer mode
	- go to discord dev portal and make new app
	- add a bot & save its token
	- make a new server and make a channel called whale in it which should be private
	- make a new role called whale
6. Adding the bot to your server
	- go to ouath2 link generator
	- choose bot and applications.commands
		(+) choose the permissions that are needed by the bot
	- make invite link and add the bot to server
7. make a wallet verification channel
8. Add another user which would initially be unable to view the whale channel
9. **optional for security** -  add the token to a config file and add config file in .gitignore
10.
	- make channel read only for everyone
	- give the bot all permissions inside the channel

## Start Coding the bot

1. import the keys and required objects
2. on client ready, send a hello world to stdout, then iterate through all the guilds the bot is in
3. check for channel wallet_verification and send a message if not already sent

## Ideally be part 2 of the tutorial 

Assuming addresses to be shelley since stakeAddress  is used to identify unique addresses.
One Wallet can have any number of discord accounts associated with it but one discord can only have one wallet associated with it.
Delinking of wallets is not allowed.

1. install nedb and instantiate it
2. make a new directory, add file for button interaction handling there
3. after button interaction, maker a personal thread with the person who pressed button.
4. Database needs to be instantiated and passed to this button handler
5. If person is already present in database , then exit thread
