// Executes the CDS build depending on whether we have a top-level package.json.
// Package.json is not available when we are called by CF/XSA buildpack.  In this case we don't do anything
// and just assume our model was already built and is available as part of this DB app.
//
// This is a workaround that will be replaced by a solution where CDS generates the DB module along with package.json.

const fs = require('fs');
const childproc = require('child_process');

if (fs.existsSync('../package.json')) { // true at build-time, false at CF staging time
	var npmInstallCmd = 'npm install';
	if (process.env.npm_config__sap_registry) {
		npmInstallCmd = 'npm install --registry ' + process.env.npm_config__sap_registry + ' --scope=@sap';
	}
	childproc.execSync(npmInstallCmd + '  && npm run build', {
		cwd: '..',
		shell: true,
		stdio: 'inherit'
	})

}