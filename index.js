const express=require('express');
const app=express();
const ejs=require('ejs');
let passport=require('passport');
let FacebookStrategy=require('passport-facebook').Strategy;
const path=require('path');
const { session } = require('passport');
const PORT=process.env.PORT || 2021;
app.set('views','view');
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('test',{node:'abcxyz'})
});
app.use(passport.initialize());
passport.use(new FacebookStrategy({
    clientID: '264464465040986',
    clientSecret: '80fa2f9f877328634e24662b4b71b7b4',
    callbackURL: "https://passport-fb.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
  function(accessToken, refreshToken, profile, cb) {
    return cb(null, profile);
  }
));
app.get('/auth/facebook',passport.authenticate('facebook', { scope: ['user_friends'] }))
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/');
});
app.listen(PORT,(req,res)=>{
    console.log(`server runing at ${PORT} `)
})