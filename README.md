```markdown
# Node.js SA-MP Server Query

This Node.js module allows you to query SA-MP (San Andreas Multiplayer) game servers to retrieve information about players and server details. It includes the following files:

## Files

### `request.js`

This file contains a function for sending SA-MP server queries using UDP. It takes an IP address, port, and an opcode as parameters to query the server. The available opcodes are:

- `'i'`: Retrieve server information.
- `'r'`: Retrieve server rules.
- `'d'`: Retrieve player list.

### `sa-mp.js`

This file provides three functions for querying SA-MP servers:

1. `async function listPlayer(ip, port)`: Queries the server for the list of players and returns an array of player objects or a failed status if there are no players or an error occurs.

2. `async function serverInformation(ip, port)`: Queries the server for general server information and returns an object containing server details.

3. `async function sampServers(ip, port, method)`: Combines the above two functions to query either player list or server information based on the specified method. It returns the respective data or an error if one occurs.

## Usage

1. Import the module:
   ```javascript
   const { sampServers } = require('./sa-mp');
   ```

2. Use the functions to query SA-MP servers using `async/await`:
   ```javascript
   try {
     const players = await sampServers('server-ip', server-port, 'player');
     console.log('Player list:', players);
   } catch (error) {
     console.error('Error:', error);
   }
   ```

   ```javascript
   try {
     const serverInfo = await sampServers('server-ip', server-port, 'info');
     console.log('Server information:', serverInfo);
   } catch (error) {
     console.error('Error:', error);
   }
   ```

## Dependencies

This module uses the `dgram` module for UDP communication.

## Credit
Simplified Query API for SAMP. Original JJJ4n's repo
