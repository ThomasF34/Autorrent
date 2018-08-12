 const Telegram = require('telegram-node-bot');

class PingController extends Telegram.TelegramBaseController {
	handle($){
		$.sendMessage("Mdr j'ai pas compris je parle pas la langue de la plèbe");
	}
}

module.exports = PingController;
