const router = require('express').Router()

const {signUp, signIn, getAll, signOut, socialAuth, callback} = require('../controller/userController.js')
const {isLoggedIn} = require('../middleware/session.js')

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/sociallogin', async(req, res)=>{
    res.redirect('http://localhost:9999/api/auth/google/callback')
})

router.get('/auth/google/callback', socialAuth)
router.get("/auth/google/success", (req, res)=>{
    req.session.user=req.user
})

router.post('/sign-out', signOut)

router.get('/all-user', isLoggedIn,getAll)


module.exports = router