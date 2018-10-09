const Telegram = require('telegram-node-bot');
const DAO = require('./db');
const request = require('request');

class StatusController extends Telegram.TelegramBaseController {

    getStatus($){
        const id = $.message.from.id;

        DAO.getUserInfo(id).then(rows => {
            let ip = rows[0].ip;
            if(!!ip){
		
		request('http://'+ip+':49152/torrents', function (error, response, body) {
  			$.sendMessage(body, {parse_mode:"Markdown"});
		});
	    } else {
	     	$.sendMessage("J'ai pas ton IP, je peux pas DL");            
	    }

        })
    }

	get routes(){
		return{ 'statusCommand': "getStatus"};
	}

}

module.exports = StatusController;
