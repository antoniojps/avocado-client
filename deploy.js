const Deployer = require('ssh-deploy-release');
const options = require('./sftp')

const client = 'http://avocado.pt'
const deployer = new Deployer(options);
deployer.deployRelease(() => {
  console.log(`
  You can now view avocado-client in the browser.
  Production:       ${client}
  `)
});
