```markdown
# Node.js SA-MP Server Query

This Node.js module allows you to query SA-MP (San Andreas Multiplayer) game servers to retrieve information about players and server details. It includes the following files:

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
