const express = require ('express')
require('./config/config.js')
const session = require('express-session')
const router = require('./router/userRouter')
const {isLoggedIn} = require('./middleware/session.js')
const passport = require ('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy


const port = process.env.port

const app=express()
app.use(express.json())

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge:1000 * 60 * 60  * 24 }
  }))
  // initialize passport
app.use(passport.initialize())
// integrate passport with our session auth
app.use(passport.session())

passport.use(new GoogleStrategy({
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: process.env.callbackURL,
  // passReqToCallback   : true
},
(request, accessToken, refreshToken, profile, done)=> {
  // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return done(err, profile);

}
));

passport.serializeUser((user,done)=>{
       return done(null, user)
})

passport.deserializeUser((user,done)=>{
  return done(null, user)
})

  app.use('/api', router)
  app.use('/home', isLoggedIn, (req, res)=>{
    res.send(`Welcome ${req.session.user.fullName} feel free to take a tour in our Application`)
  })




app.listen(port,()=>{
   console.log(`Server is listening on port:${port}`);
})