import inquirer from "inquirer";

const input = async ({
  type = "input",
  name,
  message,
}: {
  name: string;
  message: string;
  type?: string;
}) => {
  const answers = await inquirer.prompt([
    {
      type,
      name,
      message,
    },
  ]);
  return answers.userInput;
};
export default input;
