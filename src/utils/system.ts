import os from "os";
import { exec } from "child_process";

interface ShellInfo {
  name: string;
  exe: string;
}

const platform = os.platform();

class SystemUtils {
  static getShell(): ShellInfo {
    if (platform === "win32") {
      if (process.env.PSModulePath) {
        return { name: "powershell", exe: "powershell.exe" };
      }

      const comspec = process.env.COMSPEC || "C:\\Windows\\System32\\cmd.exe";
      return { name: "cmd", exe: comspec };
    }

    const shellPath = process.env.SHELL || "/bin/bash";
    const name = shellPath.split("/").pop() || "bash";

    return {
      name,
      exe: shellPath,
    };
  }

  static runCommand(command: string, cwd: string) {
    const { exe: shell } = this.getShell();
    return new Promise<{ stdout: string; stderr: string }>(
      (resolve, reject) => {
        exec(command, { cwd, shell }, (error, stdout, stderr) => {
          if (error) return reject({ error, stdout, stderr });
          resolve({ stdout, stderr });
        });
      }
    );
  }
}

export default SystemUtils;
