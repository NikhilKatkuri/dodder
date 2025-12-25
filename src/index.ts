#!/usr/bin/env node

import { Command } from "commander";
import pkg from "../package.json";
import ollamaRun from "./ollama";
import input from "./utils/input";

const program = new Command();

const ollama = new ollamaRun();

/**
 * commands
 *
 * --------------------------------------------------------------------------
 *  [list of model names] for specific model usage
 *  eg: dodder list
 *      - list all available models installed by user from ollama
 * --------------------------------------------------------------------------
 *
 * run [modelname] for basic usage
 *  eg: dodder run llama3.1
 *  then manually give input for what user wants to do
 *
 * --------------------------------------------------------------------------
 *                                  or
 * --------------------------------------------------------------------------
 *
 * options:
 *      --dir <path>          specify project directory (default: current working directory)
 *      --instructions <file> specify instructions file (.txt or .md) (default: none)
 *
 *   The following options map directly to Ollama generation parameters:
 *      --temperature <value> specify model temperature (default: 0.7)
 *      --max-tokens <number> specify maximum tokens for response (default: 1500)
 *      --top-p <value>        specify nucleus sampling value (default: 1.0)
 *      --frequency-penalty <value> specify frequency penalty (default: 0.0)
 *      --presence-penalty <value> specify presence penalty (default: 0.0)
 *
 * --------------------------------------------------------------------------
 *   eg: dodder run llama3.1 --dir cmd/path/to/project "create a react app with typescript" --instructions cmd/path/to/instructions.md
 **/

program
  .name(pkg.name.charAt(0).toUpperCase() + pkg.name.slice(1))
  .description(pkg.description)
  .version(
    pkg.version,
    "-v, --version",
    "Output the current version of Dodder."
  );

program
  .command("list")
  .description("List all available models installed by the user from Ollama.")
  .action(async () => {
    console.log("Listing all available models from Ollama...\n");
    const models = await ollama.listModels();
    if (models.length === 0) {
      console.log("No models found.");
      return;
    }
    models.forEach((model) => {
      console.log(`- ${model}`);
    });
  });

program
  .command("run")
  .description("Run Dodder with the specified model.")
  .argument("<modelname>", "Name of the model to use")
  .argument("[projectDescription]", "Description of what you want to do")
  .option("--dir <path>", "Specify project directory", process.cwd())
  .option(
    "--instructions <file>",
    "Specify instructions file (.txt or .md)",
    ""
  )
  .option("--instr <text>", "Specify instructions text", "")
  .option("--temperature <value>", "Specify model temperature", "0.7")
  .option(
    "--max-tokens <number>",
    "Specify maximum tokens for response",
    "1500"
  )
  .option("--top-p <value>", "Specify nucleus sampling value", "1.0")
  .option("--frequency-penalty <value>", "Specify frequency penalty", "0.0")
  .option("--presence-penalty <value>", "Specify presence penalty", "0.0")
  .action(async (modelname, projectDescription, options) => {
    if (!modelname) {
      console.error("Error: Model name is required.");
      process.exit(1);
    }
    if (!projectDescription) {
      projectDescription = await input({
        name: "projectDescription",
        message: "Please describe what you want to do: ",
      });
    }
    ollama.setOllama(modelname);
    await ollama.runDodder();
  });

program.parse(process.argv);

export {};
