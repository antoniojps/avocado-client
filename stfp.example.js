const options = {
  host: 'avocado.pt',
  username: 'root',
  privateKeyFile: '/Users/user/.ssh/id_rsa', // path from root to your private ssh key
  passphrase: 'XXX', // ssh pass if you have
  localPath: 'build', // local folder of build
  deployPath: '/var/www/avocado-client',
  currentReleaseLink: 'build', // remote folder of build
}

module.exports = options
