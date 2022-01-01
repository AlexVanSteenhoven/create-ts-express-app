import PackageJsonGenerator from "./core/packageJsonGenerator";
import { selectAppName, selectAppType } from "./questions";

export class CLI {
  public config = {
    project_type: "",
    project_name: "",
  };

  private fileGenerator = new PackageJsonGenerator(this.config);

  public async prepare(): Promise<Object> {
    let appType = await selectAppType();
    let appName = await selectAppName();

    this.config.project_name = Object.values(appName)[0];
    this.config.project_type = Object.values(appType)[0];

    return this.config;
  }

  public async run() {
    // TODO: Show header

    // Run all commands
    await this.prepare();
    this.fileGenerator.generate();

    // TODO: Show shutdown message and exit gracefully
  }
}
