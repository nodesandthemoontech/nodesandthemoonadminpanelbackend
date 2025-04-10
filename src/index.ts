import { httpServer } from './app';
import chalk from 'chalk';
import ENV_CONFIG from './envConfig';

httpServer.listen(ENV_CONFIG.PORT, () => {
  console.log(chalk.blueBright(`⚙︎ Server Running On PORT`, ENV_CONFIG.PORT));
});
// nodesandthemoontech
// Ss@19930901
