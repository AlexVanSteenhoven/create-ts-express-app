import { exec } from "child_process";
import { writeFileSync } from "fs";
import { cwd, chdir, exit } from "process";
import { CLI } from "../cli";
import deps from "../dependencies";
import checkIfDirExists from "../utils/directory_exists";
import DS from "../utils/directory_seperator";
import IConfig from "./models/config.model";

export default class PackageJsonGenerator {
  private config: IConfig = {
    projectName: "",
    projectType: "",
  };

  constructor(config: CLI["config"]) {
    this.config.projectName = config.project_name;
    this.config.projectType = config.project_type;
  }

  public generateBaseFile(): Object {
    return {
      name: this.config.projectName,
      version: "1.0.0",
      description: "",
      main: "build/index.js",
      keywords: [],
      scripts: {
        start: "npm run build && node build/index.js",
        build: "tsc -p .",
        dev: "nodemon --config nodemon.json -r tsconfig-paths/register src/index.ts",
        test: 'mocha --check-leaks -r ts-node/register -r tsconfig-paths/register "tests/**/*.spec.ts"',
      },
      license: "ISC",
    };
  }

  public createFile(): void {
    const data = JSON.stringify(this.generateBaseFile());
    const dir = `${cwd()}${DS}${this.config.projectName}`;

    try {
      checkIfDirExists(dir, () => {
        chdir(dir);
        writeFileSync("package.json.test", data);
      });
    } catch (error) {
      console.log(error);
      exit(1);
    }
  }

  public installDependencies(): void {
    try {
      chdir(`${cwd()}${DS}${this.config.projectName}`);

      if (this.config.projectType === "api") {
        const dependencies: string = deps.api.dependencies.join(" ");
        const devDependencies: string = deps.api.devDependencies.join(" ");

        exec(`npm install --save ${dependencies}`);
        exec(`npm install --save-dev ${devDependencies}`);
      }

      if (this.config.projectType === "web-app") {
        const dependencies: string = deps.webApp.dependencies.join(" ");
        const devDependencies: string = deps.webApp.devDependencies.join(" ");

        exec(`npm install --save ${dependencies}`);
        exec(`npm install --save-dev ${devDependencies}`);
      }
    } catch (error) {
      console.log(error);
      exit(1);
    }
  }

  public generate(): void {
    this.generateBaseFile();
    this.createFile();
    this.installDependencies();
  }
}
