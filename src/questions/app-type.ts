import inquirer from "inquirer";

export async function selectAppType(): Promise<inquirer.Answers> {
  const types: inquirer.ChoiceOptions[] = [
    { name: "Application", value: "web-app" },
    { name: "Api", value: "api" },
  ];

  return await inquirer.prompt([
    {
      type: "list",
      name: "app-type",
      message: "What are you going to build?",
      choices: types,
    },
  ]);
}
