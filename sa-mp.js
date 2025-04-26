const request = require('./samp/request');

async function listPlayer(ip, port) {
    try {
        const player = await request(ip, port, 'd');
        if (!player || player.length === 0) {
            return JSON.stringify({ status: "failed" });
        }
        return player;
    } catch (error) {
        throw error;
    }
}

async function serverInformation(ip, port) {
    try {
        return await request(ip, port, 'i');
    } catch (error) {
        throw error;
    }
}

async function sampServers(ip, port, method) {
    try {
        if (method === "player") {
            return await listPlayer(ip, port);
        } else if (method === "info") {
            return await serverInformation(ip, port);
        } else {
            throw new Error("Invalid method");
        }
    } catch (error) {
        throw error;
    }
}

module.exports = { sampServers };
