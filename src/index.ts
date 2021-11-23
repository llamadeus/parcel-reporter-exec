import { Reporter } from '@parcel/plugin';
import { ChildProcess, spawn } from 'child_process';
import { parse } from 'shell-quote';
import { isStringArray } from './utils';


let spawnedProcess: ChildProcess | null = null;

export default new Reporter({
  report({ event, options }) {
    if (event.type === 'buildSuccess') {
      if (spawnedProcess) {
        spawnedProcess.kill();
        spawnedProcess = null;
      }

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

process.on('exit', () => {
  spawnedProcess?.kill();
});
