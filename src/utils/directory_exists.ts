import { existsSync } from "fs";
import { exit } from "process";

export default function checkIfDirExists(dir: string, callback: Function): void {
  if (!existsSync(dir)) {
    callback();
  } else {
    console.log("Directory already exists");
    exit(1);
  }
}
