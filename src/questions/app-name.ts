import inquirer from "inquirer";

export async function selectAppName(): Promise<inquirer.Answers> {
  return await inquirer.prompt([
    {
      type: "input",
      name: "app-name",
      message: "Specify a name for your project:",
    },
  ]);
}
