require('dotenv').load();
const Telegram = require('telegram-node-bot'),
tg = new Telegram.Telegram(process.env.TelegramAPIToken, {workers : 1});

const StartController = require("./controllers/start"),
    OtherwiseController = require("./controllers/otherwise"),
    TorrentController = require("./controllers/torrent"),
    IpController = require("./controllers/ip"),
    StatusController = require("./controllers/status");

tg.router
    .when(new Telegram.TextCommand('/torrent','torrentCommand'), new TorrentController())
    .when(new Telegram.TextCommand("/start", 'startCommand'), new StartController())
    .when(new Telegram.TextCommand("/ip", 'ipCommand'), new IpController())
    .when(new Telegram.TextCommand("/status", 'statusCommand'), new StatusController())
    .otherwise(new OtherwiseController());



