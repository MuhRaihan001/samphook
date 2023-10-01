const request = require('./samp/request')

async function listPlayer(ip, port){
    const player = await request(ip, port, 'd')
    return new Promise((resolve, reject) =>{
        try{
            if(player === undefined){
                resolve(JSON.stringify({ status: "failed" }));
            } else if(player.length === 0){
                resolve(JSON.stringify({ status: "failed" }));
            } else {
                resolve(player);
            }
        } catch(error){
            reject(error);
        }
    });
}
async function serverInformation(ip, port){
    const server = await request(ip, port, 'i')
    return new Promise((resolve, reject) =>{
        try{
            resolve(server)
        }catch(error){
            reject(error);
        }
    })
}

async function sampServers(ip, port, method){
    const players = await listPlayer(ip, port);
    const information = await serverInformation(ip, port);
    return new Promise((resolve, reject) =>{
        try{
            switch(method){
                case "player":{
                    resolve(players)
                    break
                }
                case "info":{
                    resolve(information)
                    break
                }
            }
        }catch(error){
            reject(error);
        }
    })
}

module.exports = { sampServers }