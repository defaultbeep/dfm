const fs = require('fs')
const colors = require('colors')
const config = require('../config')

function checkStatus(data) {

  let sM = "\n"

  const dotfiles = fs.readdirSync(data.dotfiles_path)
  const homeFiles = fs.readdirSync(data.destination_path)

  const blacklist = ['.DS_Store']

  const missingList = homeFiles
    .filter(hf => dotfiles.indexOf(hf) === -1)
    .filter(hf => blacklist.indexOf(hf) === -1)

  if(missingList.length > 0) {
    sM += "Not in dotfiles:\n\n"
    sM += missingList.join("\n") + "\n\n"
  } else {
    sM += "All files in version control 👍🏻\n\n"
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
