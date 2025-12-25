const express = require('express');
let app = express();  // here we have the express
const path = require('path');
var methodOverride = require('method-override')
 
// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));

app.set('view engine' , 'ejs');  // here we have ejs 
 app.set('views' , path.join(__dirname , 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
const Model = require('./models/schema');  // here we required
const mongoose = require('mongoose');
 
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/telegram');
}
main()
.then(() => console.log('Successfully connected'))
.catch(err => console.log(err));










// here we used roughting;

app.get('/chats' , async (req , res) =>{
   let chats =  await Model.find();
      res.render('index.ejs' , {chats});
      console.log(chats);
});

// here we create a new chat

app.get('/chats/new' , (req , res) =>{
     res.render('new.ejs');
});
// mere request ja rahe hai

// yaha mai post request used karunga 
app.post('/chats' , (req , res) =>{
        let { from , msg , to} = req.body;
        let newchat = new Model({
            from : from,
            msg : msg,
            to : to,
            date : new Date(),
        });
newchat.save().then((res)=>{
    console.log(`Saved successfully`);
}).catch((err) =>{
     console.log(`Error is here`);
});
res.redirect('/chats');
});


// here we study about the update rought buddy

app.get('/chats/:id/edit' , async (req , res) =>{
  let { id } = req.params;
 let chat = await Model.findById(id);
       res.render('edit.ejs' , {chat});
})

// here we update the chat 
app.put('/chats/:id', async (req, res) => {
  let { id } = req.params;
  let newmsg = req.body.msg;  // take textarea value directly

  console.log(newmsg);

  let updatedchat = await Model.findByIdAndUpdate(
    id,
    { msg: newmsg },
    { runValidators: true, new: true } // merge options into one object
  );

  console.log(updatedchat);

  res.redirect('/chats');
});

// here we have to delete something 

app.delete('/chats/:id' , async(req ,res) =>{
        let { id } = req.params;
     let deleteval = await Model.findByIdAndDelete(id);
     res.redirect('/chats');

});








let port = 8080;
app.listen(port , ()=>{
          console.log('We are listning to you buddy');
})