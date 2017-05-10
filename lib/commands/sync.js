const fs = require('fs')
const colors = require('colors')
const config = require('../config')

function runSync(data) {

  let msg = ""

  const dotfiles = fs.readdirSync(data.dotfiles_path)
  const homeFiles = fs.readdirSync(data.destination_path)

  const blacklist = ['.DS_Store']

  const installList = dotfiles
    .filter(df => homeFiles.indexOf(df) === -1)
    .filter(df => blacklist.indexOf(df) === -1)

  if(installList.length > 0) {

    msg += "\n"

    installList.forEach(file => {
      fs.symlinkSync(data.dotfiles_path + "/" + file, data.destination_path + "/" + file)
      msg += data.dotfiles_path + "/" + file + " => " + data.destination_path + "/" + file + " Linked".red + "\n"
    })

    let word = installList.length === 1 ? "item" : "items"

    msg += "\n" + installList.length + " new " + word + " synclinked 🔥\n"
    
  } else {
    msg += "\nNothing to sync. 👍🏻\n\n"
    msg += "Run `dfm status`\n".underline
  }

  msg += "\n"

  return Promise.resolve(msg)

}

module.exports = () => {

  console.log("\n\n~ DFM ~".red)
  
  config
    .then(data => runSync(data))
    .then(message => console.log(message))
    .catch(err => console.log(err))

}
