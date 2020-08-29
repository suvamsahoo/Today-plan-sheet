let express = require('express');
let app = express();

let BodyParser = require('body-parser');

let CurrentTimeZoon = require(__dirname + "/date.js");//Anywhere we can access this file in my project.

//If you click the button like 'submit' button, the browser will URL encode the input before it is sent to the server. A page at the server will display the received input.
app.use(BodyParser.urlencoded({extended: true}));

app.use(express.static("public"));//Express serve all the files in your project by 'public' folder as a static resource.

app.set('view engine', 'ejs');

var Items =["Cook Food", "Eat Food",];//global array

app.get("/", function(req,res){
    /*
    var today = new Date();
    var options ={
       weekday: "long", //Friday
       day: "numeric", //28
       month: "long", //Auguest
       year: 'numeric',//2020
    };
    var day = today.toLocaleDateString("en-US", options)//Date#toLocaleDateString can be used to create standard locale-specific renderings. 
    */
   let DMY = CurrentTimeZoon.getDMY();
   let Wd = CurrentTimeZoon.getWd();
   
    res.render("list",{
        titleDMY: DMY,
        titleWd: Wd,

        newListItems: Items,

    })
});

//When that request is received, it gets caught inside this app.post section.
app.post("/", function(req,res){
    var item = req.body.newItem//grab the value of new item using this line
    console.log(req.body);
    console.log(item);//Now data are in server which are passed from a web page but now need to pass the data back into our web page.

    /* So we now know that every single time you try to render a 'list' we have to provide both variables that we want to render.(in one render)
       res.render("list", {newListItems : item});
    */

   Items.push(item);//new item get pushed onto the end of the array.

    res.redirect("/");/*When a post request is triggered on our home route, we'll save the value of new item in that text box to a variable
    and it will redirect to the home route which then gets us over here and triggers the 'app.get' for our home route. 
    And it will res.render the 'list' template passing in both the "Today" as well as the "newListItems".
    */


})

app.listen(3000, function(){
    console.log("server is running in port number 3000")
})