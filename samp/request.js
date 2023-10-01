const dgram = require('dgram');

const request = (ip, port, opcode) => {
  return new Promise(async (resolve, reject) => {
    const socket = dgram.createSocket('udp4');
    const packet = Buffer.alloc(10 + opcode.length);

    packet.write('SAMP');

    options ={
        host: ip,
        port: port,
        timeout: 1000
    }

    for (let i = 0; i < 4; ++i) packet[i + 4] = options.host.split('.')[i];

    packet[8] = options.port & 0xFF;
    packet[9] = options.port >> 8 & 0xFF;
    packet[10] = opcode.charCodeAt(0);

    try {
        socket.send(packet, 0, packet.length, options.port, options.host);

        const controller = setTimeout(() => {
            socket.close();
            reject({ status: "failed" });
        },options.timeout);      

        socket.on('message', (message) => {
        clearTimeout(controller);

        if (message.length < 11) {
          reject(true);
        }else {
          socket.close();

          message = message.slice(11);

          const object = {};
          const array = [];
          let strlen = 0;
          let offset = 0;

          try {
            switch (opcode) {
              case 'i': {
                object.passworded = message.readUInt8(offset);
                offset += 1;

                object.players = message.readUInt16LE(offset);
                offset += 2;

                object.maxplayers = message.readUInt16LE(offset);
                offset += 2;

                strlen = message.readUInt16LE(offset);
                offset += 4;

                object.hostname = decode(message.slice(offset, (offset += strlen)));

                strlen = message.readUInt16LE(offset);
                offset += 4;

                object.gamemode = decode(message.slice(offset, (offset += strlen)));

                strlen = message.readUInt16LE(offset);
                offset += 4;

                object.mapname = decode(message.slice(offset, (offset += strlen)));

                resolve(object);
                break;
              }
              case 'r': {
                let rulecount = message.readUInt16LE(offset);
                offset += 2;

                let property,
                  value = undefined;

                while (rulecount) {
                  strlen = message.readUInt8(offset);
                  ++offset;

                  property = decode(message.slice(offset, (offset += strlen)));

                  strlen = message.readUInt8(offset);
                  ++offset;

                  value = decode(message.slice(offset, (offset += strlen)));

                  object[property] = value;

                  --rulecount;
                }

                resolve(object);
                break;
              }
              case 'd': {
                let playercount = message.readUInt16LE(offset);
                offset += 2;

                let player = undefined;

                while (playercount) {
                    player = {};

                    player.id = message.readUInt8(offset);
                    ++offset;

                    strlen = message.readUInt8(offset);
                    ++offset;

                    player.name = decode(message.slice(offset, (offset += strlen)));

                    player.score = message.readUInt16LE(offset);
                    offset += 4;

                    player.ping = message.readUInt16LE(offset);
                    offset += 4;

                    array.push(player);

                    --playercount;
                }
                resolve(array);
                    break;
                }
            }
            }catch(exception){
                reject(exception);
            }
        }
    });
    }catch(error){
      reject(error);
    }
    }).catch((error) => {
        console.error(error);
    });
};

let decode = function(buffer) {
    var charset = ''
    for (var i = 0; i < 128; i++) charset += String.fromCharCode(i)
    charset += '€�‚ƒ„…†‡�‰�‹�����‘’“”•–—�™�›���� ΅Ά£¤¥¦§¨©�«¬­®―°±²³΄µ¶·ΈΉΊ»Ό½ΎΏΐΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡ�ΣΤΥΦΧΨΩΪΫάέήίΰαβγδεζηθικλμνξοπρςστυφχψωϊϋόύώ�'
    var charsetBuffer = Buffer.from(charset, 'ucs2')
    var decodeBuffer = Buffer.alloc(buffer.length * 2)
    for(var i = 0; i < buffer.length; i++) {
        decodeBuffer[i * 2] = charsetBuffer[buffer[i] * 2]
        decodeBuffer[i * 2 + 1] = charsetBuffer[buffer[i] * 2 + 1]
    }
    return decodeBuffer.toString('ucs2')
}

module.exports = request