const fs = require('fs')
const colors = require('colors')
const config = require('../config')

function checkStatus(data) {

  let sM = "\nFrom: ".red + data.dotfiles_path + "\n";
  sM += "To: ".red + data.destination_path + "\n\n";

  const dotfiles = fs.readdirSync(data.dotfiles_path)
  const homeFiles = fs.readdirSync(data.destination_path)

  const blacklist = ['.DS_Store']

  const installList = dotfiles
    .filter(df => homeFiles.indexOf(df) === -1)
    .filter(df => blacklist.indexOf(df) === -1)

  if(installList.length > 0) {
    sM += "To Sync:\n\n"
    sM += installList.join("\n") + "\n\n"
    sM += "Run `dfm sync`".underline + " 🚀\n\n"
  } else {
    sM += "You're in good shape 👍🏻\n\n"
  }

  return Promise.resolve(sM);

}

module.exports = () => {

  console.log("\n\n~ DFM ~".red)
  
  config
    .then(data => checkStatus(data))
    .then(status => console.log(status))
    .catch(err => console.log(err))

}