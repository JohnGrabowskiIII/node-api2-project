// require your server and launch it here

const server = require('./api/server');

const port = 7777

server.listen(7777, () => {
    console.log(`server online at ${port}`)
})
