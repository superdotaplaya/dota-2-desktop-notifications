
var opn = require('opn');
var fs = require('fs');
const open = require('open');
var request = require('request');
const toast = require('powertoast');

// String


var Spotify = require('spotify-web-api-js');
var s = new Spotify();
var last_title = null
var app_list = JSON.parse(fs.readFileSync('app_list.json', 'utf8'));
var settings = JSON.parse(fs.readFileSync('settings.json'))
var custom_start = settings[1].ShowAll
console.log(custom_start)
if (custom_start == "true") {
	var first_run = false
} else {
	var first_run = true
}
var custom_time = settings[0].refresh
// Determines if the user wants all notifications to appear on bootup or no

console.log(app_list)
console.log("Notifying about news for " + app_list.length + " games on steam! To add more open the Add_Games.bat and follow the instructions in the Read me!")



// Get the title and link for each of the users game choices
var i;
var title = []
var news = []
var last_title = []
var last_title2 = []
var notification = []
var link = []
var notification = []




const notifier = require('node-notifier');

setInterval(function(){
var i = 0
get_news()
function get_news(){

if (i <= app_list.length-1) {

  request("http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=" + app_list[i].ID + "&count=3&maxlength=300&format=json", function (error, response, body) {
  	if (body.startsWith("<") == false && body != undefined) {
  news[i] = JSON.parse(body)
  title[i] = news[i].appnews.newsitems[0].title
  link[i] = news[i].appnews.newsitems[0].url.toString()
  console.log((i + 1) +".)" + "   " + title[i]) 
  if (first_run == false) {
  	// if the title does not match the old title this handles sending out the notification
  if (last_title[i] != title[i] && last_title2[i] != title[i]) {
  last_title2[i] = last_title[i]
  last_title[i] = title[i]
  console.log(i)
  toast({
  title: title[i],
  message: "Click to read more!",
  onClick: link[i],
  icon: "/bell.png"
}).catch((err) => { 
  console.error(err);
});
}
  
} else {
	//Updates the saved title to the most recent one for checking to ensure no duplicate notifications are sent
	  last_title[i] = title[i]
}
// Checks if it has run through all given games, if it has it will start sending notifications for new news when available (only if the user opts out of notifications on bootup!)
if (i >= app_list.length-1 && first_run == true) {
	first_run = false
	console.log("-------------------------------------------------------------------First run done!---------------------------------------------------------------")
}
if (i >= app_list.length-1) {
var now = new Date();
console.log("-------------------------------------- Check complete at: " + now.getHours() + ":" + now.getMinutes() + " -------------------------------------------------")
}
i++


get_news()



} else {
	//Handles what happens when the app fails to find news for any of the apps
	console.log((i + 1) +".)" + "   " + "UNABLE TO GET NEWS! IF THIS KEEPS HAPPENING PLEASE CHECK THE READ ME FOR MORE INFORMATION") 
	i++


get_news()
}

});

}


}
//Resets i to 0 and restarts the entire function to continue grabbing news from all apps
}, custom_time * 1000);



