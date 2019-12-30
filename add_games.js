var fs = require('fs');
const readline = require('readline-sync');

var app_list = JSON.parse(fs.readFileSync('app_list.json', 'utf8'));
Add_Game()
function Add_Game() {
let app_id = readline.question("Which game would you like to add? (ONLY INPUT THE GAMES APP ID! Check the read me for more information!!");
app_list.push({
	ID: app_id

})
 fs.writeFile("app_list.json", JSON.stringify(app_list), function(err) {
    if(err) {
        return console.log(err);
    }
    Add_Game()
})
console.log("added")
}

