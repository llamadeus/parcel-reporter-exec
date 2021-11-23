import { Reporter } from '@parcel/plugin';
import { ChildProcess, spawn } from 'child_process';
import { parse } from 'shell-quote';
import { isStringArray } from './utils';


let spawnedProcess: ChildProcess | null = null;

function killSpawnedProcess() {
  if (spawnedProcess) {
    spawnedProcess.kill();
    spawnedProcess = null;
  }
}

export default new Reporter({
  report({ event, options }) {
    if (event.type === 'buildSuccess') {
      killSpawnedProcess();

      if (typeof options.env.PARCEL_EXEC != 'undefined') {
        const [command, ...args] = parse(options.env.PARCEL_EXEC);

        if (! isStringArray(args)) {
          throw new Error('Sorry, but your command is not supported yet');
        }

        if (typeof command == 'string' && isStringArray(args)) {
          spawnedProcess = spawn(command, args);

          spawnedProcess.stdout?.pipe(process.stdout);
          spawnedProcess.stderr?.pipe(process.stderr);

          spawnedProcess.on('exit', () => {
            spawnedProcess = null;
          });
        }
      }
    }
  },
});

process.on('uncaughtException', killSpawnedProcess);
process.on('SIGINT', killSpawnedProcess);
process.on('SIGTERM', killSpawnedProcess);
process.on('beforeExit', killSpawnedProcess);
