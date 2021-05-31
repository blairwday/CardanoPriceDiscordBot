	// Load Libraries
	const Discord = require("discord.js");
	const fetch = require('sync-fetch');
	const client = new Discord.Client();
	
	var InvestmentPrice = 0;
	var InvestmentValue = 0;
	var discordKey = "xxx";
	var coinAPIKey = "xxx";

	// Discord Login
	client.login(discordKey);
	client.on("ready", () => {
	  console.log(`Logged in as ${client.user.tag}!`)
	});

	// Message Response
	client.on("message", msg => {
	  if(msg.content === "?ada") {
		const metadata = fetch('https://rest.coinapi.io/v1/exchangerate/ADA/CAD', { headers:{'X-CoinAPI-Key': coinAPIKey} }).json();
		msg.channel.send("The Current Cardano Price is: $" + metadata['rate'].toFixed(2) + " CAD");
	  }
	  if(msg.content === "?roi") {
		const metadata = fetch('https://rest.coinapi.io/v1/exchangerate/ADA/CAD', { headers:{'X-CoinAPI-Key': coinAPIKey} }).json();
		msg.channel.send("Return on Cardano is: " + (((metadata['rate']-InvestmentPrice)/InvestmentPrice)*100).toFixed(2) + "%");
	  }
	  if(msg.content === "?earn") {
		const metadata = fetch('https://rest.coinapi.io/v1/exchangerate/ADA/CAD', { headers:{'X-CoinAPI-Key': coinAPIKey} }).json();
		var earnings = ((InvestmentValue * metadata['rate'])-(InvestmentValue * InvestmentPrice)).toFixed(2);
		msg.channel.send("Investment Growth: $" + earnings);
	  }
	});
