let express = require("express");
let app = express();

let mongoose = require("mongoose");
let BodyParser = require("body-parser");

let CurrentTimeZoon = require(__dirname + "/date.js"); //Anywhere we can access this file in my project.

//If you click the button like 'submit' button, the browser will URL encode the input before it is sent to the server. A page at the server will display the received input.
app.use(BodyParser.urlencoded({ extended: true }));

app.use(express.static("public")); //Express serve all the files in your project by 'public' folder as a static resource.

app.set("view engine", "ejs");

//-----------------------------------------------------------------------------mongoDB----------------------------------------------------------------------------------//
mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
});
const iteamsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});
const ItemsModel = mongoose.model("item", iteamsSchema);

const i1 = new ItemsModel({
  name: "Welcome to your todoList!",
});
const i2 = new ItemsModel({
  name: "Hit the + button to add a new item.",
});
const i3 = new ItemsModel({
  name: "<-- Hit this to delete an item.",
});

const defaultItems = [i1, i2, i3];
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------//

app.get("/", function (req, res) {
  ItemsModel.find({}, (err, documents) => {
    //console.log(documents); //print all documents data inside collection

    if (documents.length === 0) {
      ItemsModel.insertMany(defaultItems, (err) => {
        if (err) {
          console.log("Error" + err);
        } else {
          console.log("Successfully added in collection");
        }
      });
      //So what this will do, it'll check firstly any document present in our collection and if there are none, then it's going to create 3 documents
      //and add it into collection. And then finally it's going to redirect back into this root route but now this time it's not going to fall into the IF block.
      //Instead it's going to go into the ELSE block because now we actually do have documents in our collection and we are able to res.render()
      //those new items over to our list.ejs file.
      res.redirect("/"); //redirect back onto the root route.
    } else {
      res.render("list", {
        titleDMY: DMY,
        titleWd: Wd,

        newListItems: documents,
      });
    }
  });

  let DMY = CurrentTimeZoon.getDMY();
  let Wd = CurrentTimeZoon.getWd();
});

app.post("/", function (req, res) {
  var InputItem = req.body.newItem; //grab the value of new item using this line
  console.log("----home route----");
  console.log(req.body);
  console.log(InputItem); //Now data are in server which are passed from a web page but now need to pass the data back into our web page.

  //create a new document inside the collection for a new input item-:
  const newItem = new ItemsModel({
    name: InputItem,
  });
  newItem.save();

  //It will redirect to the home route or Re-enter from root/home route-:
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  console.log("----delete route----");
  console.log(req.body);
  const checkItemID = req.body.checkBoxItem;
  console.log(req.body.checkBoxItem);

  ItemsModel.findByIdAndRemove(checkItemID, (err) => {
    if (err) {
      console.log("I got an error when i delete an item");
    } else {
      console.log("Successfully deleted item from the collection");
      res.redirect("/");
    }
  });
});

//server-:
app.listen(3000, function () {
  console.log("server is running in port number 3000");
});
