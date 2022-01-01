import { CLI } from "./cli";
import PackageJsonGenerator from "./core/packageJsonGenerator";

const app = new CLI();

async function run() {
  //   console.log(await app.prepare());
  await app.run();
}

run();
