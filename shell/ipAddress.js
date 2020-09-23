const exec = require('child_process').exec;
const address = require('ip').address;

exec(`mkcert -cert-file ./certs/cert.pem -key-file ./certs/key.pem ${address()}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
