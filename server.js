const express = require('express');

const server = express();

server.all("/", (req,res) => {
  res.send("el bot eta ejecutandose!");
});

function mantenerVivo() {
  server.listen(3000,() => {
      console.log("Tamos listos!");
  })
}

module.exports = mantenerVivo;