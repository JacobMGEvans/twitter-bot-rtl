"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _a, _b;
exports.__esModule = true;
var koa_1 = require("koa");
var koa_router_1 = require("koa-router");
var twit_1 = require("twit");
var dotenv_1 = require("dotenv");
var got_1 = require("got");
dotenv_1["default"].config();
var Twitter = new twit_1["default"]({
    consumer_key: (_a = process.env.KEY) !== null && _a !== void 0 ? _a : "",
    consumer_secret: (_b = process.env.CONSUMER_SECRET) !== null && _b !== void 0 ? _b : "",
    access_token: process.env.TOKEN,
    access_token_secret: process.env.TOKEN_SECRET
});
var app = new koa_1["default"]();
var router = new koa_router_1["default"]();
var PORT = process.env.PORT || 3000;
var QUERY_STRING_LIST = "#100DaysOfCode OR #CodeNewbie OR #DEVCommunity OR #helpmecode";
console.log("HELLO I AM THE TWITTER BOT");
router.get("/", function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        ctx.body = "HOME ROUTE FOR TWITTER BOT";
        return [2 /*return*/];
    });
}); });
router.get("/retweet", function (ctx) {
    var foundIdArray = [];
    var searchTweets = Twitter.get("search/tweets", {
        q: QUERY_STRING_LIST,
        count: 10,
        lang: "en"
    }, function (err, data, response) {
        data.statuses.map(function (status) {
            console.log(status);
            var id_str = status.id_str;
            foundIdArray.push(id_str);
        });
        foundIdArray.forEach(function (idElement) {
            console.log(idElement, "ELEMENT ID ");
            if (idElement) {
                var retweetId = Twitter.post("statuses/retweet/:id", { id: idElement }, function (err, data, response) {
                    console.log(data, "RETWEET SUCCESSFUL");
                    err ? console.log("#*#*#ERROR*#*#*", err) : response;
                });
                return retweetId;
            }
            else {
                throw new Error("ERROR IN RETWEET MISSING ERROR");
            }
        });
        err ? console.error("#*#*#ERROR*#*#*", err) : response;
    });
    console.log(searchTweets);
    ctx.body(searchTweets);
    return searchTweets;
});
router.get("/tweet", function (ctx, _) { return __awaiter(void 0, void 0, void 0, function () {
    var hashesAndStuff, dataQuotes, data, _a, title, content, postTweet;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                hashesAndStuff = "#javascript #react #node #startup #coding";
                return [4 /*yield*/, (0, got_1["default"])("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1").json()];
            case 1:
                dataQuotes = (_b.sent()).data;
                data = dataQuotes.data;
                _a = data[0], title = _a.title, content = _a.content;
                postTweet = Twitter.post("statuses/update", {
                    status: "\n      \" ".concat(content.replace(/<\/?p[^>]*>/g, ""), "\"\n      ~").concat(title, "\n      ").concat(hashesAndStuff)
                }, function (err, dataTweet, response) {
                    console.log("*******####DATA####*******", dataTweet);
                    err ? console.log("*****######ERROR!!!!", err) : response;
                });
                ctx.body = postTweet;
                return [2 /*return*/, postTweet];
        }
    });
}); });
router.get("/follow", function () { return __awaiter(void 0, void 0, void 0, function () {
    var searchUser;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, got_1["default"])("https://api.twitter.com/1.1/users/search.json?q=reactjs", {}).json()];
            case 1:
                searchUser = (_a.sent()).data;
                console.log(searchUser);
                return [2 /*return*/, searchUser];
        }
    });
}); });
app.use(router.routes()).use(router.allowedMethods());
app.listen(PORT, function () { return console.log("App listening on port ".concat(PORT, "!")); });
