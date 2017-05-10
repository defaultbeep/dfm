module.exports = new Promise((resolve, reject) => {
  
  let data = {}
  let eM = ""
  let ready = true

  if(process.env.DFM_DOTFILES_PATH) {
    data.dotfiles_path = process.env.DFM_DOTFILES_PATH
  } else {
    ready = false
    eM += "\nPlease set the exact path to your dotfiles\n\n"
    eM += "`export DFM_DOTFILES_PATH='/path/to/files'`"
  }

  if(process.env.HOME) {
    data.destination_path = process.env.HOME
  } else {
    ready = false
    eM += "\nPlease set the path to your home directory\n\n"
    eM += "`export DFM_DOTFILES_PATH='/path/to/home`"
  }

  eM += "\n\n"

  if(ready) {
    resolve(data)
  } else {
    reject(eM)
  }

})