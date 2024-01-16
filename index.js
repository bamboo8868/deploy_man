const DepolyMan = require('./src/DeployMan');





async function main() {
	const servers = require('./config/config.json');
	let man = new DepolyMan(servers);

	man.group('web');
	await man.run("ls -a");
	await man.run("ls -a");
}


main();


