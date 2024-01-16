const DepolyMan = require('./src/DepolyMan');





async function main() {
	let man = new DepolyMan();

	man.group('web');
	await man.run("cd /home/leo/test/newer && git log");
	await man.run("ls -a");
}


main();


