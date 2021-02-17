const express=require('express');
const app=express();
const ejs=require('ejs');
let passport=require('passport');
let FacebookStrategy=require('passport-facebook').Strategy;
const path=require('path');
const session=require('express-session')
const PORT=process.env.PORT || 2021;
app.set('views','view');
app.set('view engine','ejs');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
app.use(express.static(path.join(__dirname,'/public')));

app.get('/',(req,res)=>{
    res.render('test',{node:'abcxyz'})
});
app.use(passport.initialize());
app.use(passport.session())
passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
passport.use(new FacebookStrategy({
    clientID: '264464465040986',
    clientSecret: '80fa2f9f877328634e24662b4b71b7b4',
    callbackURL: "https://passport-fb.herokuapp.com/auth/facebook/callback"
   
  },
  function(accessToken, refreshToken, profile, cb) {
      console.log(profile)
    return cb(null, profile);
  }
));
app.get('/auth/facebook',passport.authenticate('facebook'))
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/home');
});
app.get('/home',(req,res,next)=>{
    res.json(req.user);
})
app.listen(PORT,(req,res)=>{
    console.log(`server runing at ${PORT} `)
})