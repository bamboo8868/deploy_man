const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')

class DepolyMan {


    constructor(servers) {
        this.ssh_map = {}
        this.group_name = 'all';
        this.servers = servers;
    }

    group(name) {
        this.group_name = name;
        return this;
    }

    async copy(src_file, dest_file) {
        await ssh.putFile('/home/steel/Lab/localPath/fileName', '/home/steel/Lab/remotePath/fileName')
    }

    async run(command) {
        await this.realRun(command);
        return this;
    }

    async realRun(command) {
        let servers = this.servers;
        for (let server of servers) {

            if (this.group === 'all' || this.group_name === server.group) {

                let ssh = await this.getConn(server);
                let res = await ssh.execCommand(command);
                console.log(`execute => '${command}' host:======>`, server.host, "res:", res);

            }

        }
    }

    async getConn(server) {
        let host = server.host;
        let port = server.port;
        let key = `${host}_${port}`;
        let sshConn  = this.ssh_map[key];
        if(sshConn ) {
            let isConnect = sshConn.isConnected();
            if(isConnect) {
                return sshConn;
            }
        }

        let ssh = new NodeSSH();
        await ssh.connect({
            host: server.host,
            username: server.username,
            password: server.password
        })
        this.ssh_map[key] = ssh;
        return ssh;
    }

}


module.exports = DepolyMan;