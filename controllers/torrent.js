const Telegram = require('telegram-node-bot');
const TorrentSearchApi = require('torrent-search-api');

require('dotenv').load();

class TorrentController extends Telegram.TelegramBaseController {

	torrentSearchHandler($){

		let recherche = $.message.text.split(' ').slice(1).join(' ');

		const torrentSearch = new TorrentSearchApi();

		// Disable all enabled providers
		torrentSearch.disableAllProviders();
		// Enable public provider
		//torrentSearch.enablePublicProviders();
		//torrentSearch.enableProvider('Torrent9');
		torrentSearch.enableProvider('Yggtorrent',process.env.yggTorrentUsername, process.env.yggTorrentPassword);

		console.log("Searching in :")
		torrentSearch.getActiveProviders().forEach(function(provider) {
		  console.log(provider.name);
		});

	  console.log("Searching for " + recherche);
	  torrentSearch.search(recherche, '', 20)
	      .then(torrents => {
					if(torrents.length > 0){
						let resp = "*Voici ce que j'ai trouvé pour votre recherche :* \n"
						let preparingMenu = {message: 'Quel torrent voulez vous télécharger ?', layout: 4};
						torrents.forEach(function(torrent, index) {
							let strToAdd = "*"+index.toString() + "*: " + torrent.title + "---" + torrent.size + "---" + torrent.seeds+ "\n\n";
							strToAdd = strToAdd.replace("'", "");
		          resp += strToAdd;
							preparingMenu[index] = () => {torrentSearch.downloadTorrent(torrents[index], './torrent/'+recherche+'.torrent').then(
							    $.sendMessage("J'ai DL le fichier torrent, reste à voir ce qu'on en fait maintenant ...."))
                            }//console.log(torrents[index].link); $.sendDocument({url : torrents[index].link, filename:'test.torrent'}).then()}; //IL FAUT METTRE ICI LA FONCTION DE DL
		        });
						$.sendMessage(resp,{parse_mode: "Markdown"});
						$.runMenu(preparingMenu);
					} else {
						$.sendMessage("Il semblerait qu'il n'existe aucun torrent pour votre recherche");
					}
	      })
				.catch(err => {
	          console.log(err);
	     	});

	}

	get routes(){
		return{ 'torrentCommand': "torrentSearchHandler"};
	}

}

module.exports = TorrentController;
