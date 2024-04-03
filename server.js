const express = require('express')
const path = require('path')
const { mergepdfs } = require('./mergepdfs.js')
const app = express()
// Serve static files from the 'public' directory
app.use(express.static('public'));
app.use('/static', express.static('public'));

const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const port = 3000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"))
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    // console.log(req.files)
    await mergepdfs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path))
    res.redirect("http://localhost:3000/static/merged.pdf")
    // res.send({ data: req.files })
})