const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')

class DepolyMan {


	constructor(servers) {
		this.ssh = new NodeSSH();
		this.group_name = 'all';
		this.servers =  servers;
	}

	group(name) {
		this.group_name = name;
		return this;
	}

	async run(command) {
		await this.realRun(command);
		return this;
	}

	async realRun(command) {
		let servers = this.servers;
		for(let server of servers) {

			if(this.group =='all' || this.group_name === server.group) {

				await this.ssh.connect({
  					host: server.host,
  					username: server.username,
  					password:server.password,
  					// privateKeyPath: '/home/steel/.ssh/id_rsa'
  					// tryKeyboard: true,

				})


				let res = await this.ssh.execCommand(command);
				console.log("execute host:======>",server.host,"res:",res);

			}

		}
	}

}


module.exports = DepolyMan;