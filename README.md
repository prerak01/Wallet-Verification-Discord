# Instructions

## Setup

1. init empty github file  *optional*
2. install discord.js
3. *optional* - add node_modules to .gitignore
4. make bot on discord website 
5. Making discord application
	- turn on developer mode
	- go to discord dev portal and make new app
	- add a bot & save its token
	- make a new server and make a channel called whale in it
	- make a new role called whale
6. Adding the bot to your server
	- go to ouath2 link generator
	- choose bot and applications.commands
		(+) choose the permissions that are needed by the bot
	- make invite link and add the bot to server
7. make a wallet verification channel
8. **optional for security** -  add the token to a config file and add config file in .gitignore
9. Design decision - will be using a file based database - neDB

## Start Coding the bot

### Initial
1. Boilerplate code to get it started
2. Important to choose which intents the bot needs - need to be added when authorizing the bot. Intents determine which events will be sent to the bot
3. show users that the bot is online when node is running
4. as soon as client logs in , it checks if the **verify message** option is already present in the channel.