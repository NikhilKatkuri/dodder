# Dodder 🪰

Dodder is a local AI software development agent that runs from your terminal on top of Ollama.  
It collects your project requirements, filters out unsafe/malicious ideas, plans the tech stack, writes a step‑by‑step `dodder_guide.txt`, and then uses tools (filesystem + shell) to scaffold and iteratively refine your project from the CLI.

---

## Features

- **CLI‑first DX**  
  Start Dodder with command‑line arguments or interactive mode, choose an Ollama model, and let the agent drive the workflow.

- **Safety & intent filter**  
  Dodder analyzes your project description to detect malware / clearly harmful use cases and stops early instead of generating dangerous code.

- **Planning before coding**  
  Generates a structured context and a step‑by‑step plan in `dodder_guide.txt` before touching your filesystem, so you can inspect the approach.

- **Tool‑calling agent**  
  Uses a toolbox of functions (create/read/update files, run shell commands, inspect directories) to actually build and modify your codebase.

- **Assistant mode loop**  
  After scaffolding, Dodder can fix bugs and make changes by following your feedback until you are satisfied or choose to exit.

---

## How it works

High‑level workflow (v1):

1. **Start from CLI**

   - `dodder` with flags (model, project name, description, etc.).
   - Or manual mode: Dodder asks for missing information interactively.

2. **Collect requirements**

   - Project name (optional)
   - Short description (required)
   - Optional path to `instructions.txt` with detailed specs

3. **Safety & classification**

   - AI agent call analyzes the idea.
   - If clearly malicious (keylogger, stealer, ransomware, etc.), Dodder stops and warns you.
   - Otherwise it builds a structured context for the project.

4. **Plan generation**

   - Creates a step‑by‑step process and writes `dodder_guide.txt` at the project root.
   - Plan includes tech stack, directory structure, main components, and tasks.

5. **Assistant mode**

   - Follows `dodder_guide.txt` and uses tools to create folders, write code files, update README, and run basic commands (like `npm init`, `npm test`).

6. **Feedback loop**
   - When done, Dodder asks for your satisfaction (y/n).
   - On “n”, it collects change requests and applies further edits; on “y”, it exits.

---
