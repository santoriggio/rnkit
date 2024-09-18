#!/usr/bin/env node

import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import inquirer from 'inquirer';
import libJson from '../package.json' assert { type: "json" }
import chalk from 'chalk';
import ora from 'ora'

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function test() {
  try {
    await getCwdDeps();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit();
  }
}

test();

async function getCwdDeps() {
  const cwdPath = path.join(process.cwd());
  const res = await inquirer.prompt([
    { name: "path", message: "Cwd path", type: "input", default: cwdPath, },
    {
      name: "invalid_path",
      message: "Invalid path",
      when: (res) => {
        const packageJsonPath = path.join(res.path, "package.json");
        return !fs.existsSync(packageJsonPath);
      },
    },
  ]);

  if (res.path) {
    const projectPath = path.join(res.path, "package.json");
    const project = await readJson(projectPath);
    const libDeps = libJson.dependencies
    let toInstall = [];

    console.log('')
    Object.keys(libDeps).forEach(async (dep) => {
      const version = libDeps[dep].replace('~', '').replace('^', '')
      if (typeof project.dependencies[dep] === "undefined") {
        toInstall.push(`${dep}@${version}`);
        console.log(chalk.cyan(`\u2139 Need to install: ${dep}@${version}`))
      } else {
        const currentVersion = project.dependencies[dep];
        if (version === currentVersion) {
          console.log(chalk.green(`\u2714 ${dep}`))
        } else {
          console.log(chalk.yellow(`\u2139 Need to update ${dep} from ${currentVersion} to ${version}`))
          toInstall.push(`${dep}@${version}`);
        }
      }
    });
    console.log('')

    if (toInstall.length > 0) {
      const wantInstall = await inquirer.prompt([
        {
          name: "wantInstall",
          message: "Want to update?",
          type: "confirm",
          default: "Yes",
        },
      ]);

      if (wantInstall.wantInstall === true) {
        const spinner = ora('Updating...')
        spinner.start();
        await installDeps(toInstall);
        return spinner.stop();
      }
    }
  }
}

async function readJson(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf8", async (err, json) => {
      if (err && err.code && err.code === "ENOENT") {
        console.error(
          "Non è stato trovato il json, a questo path, puoi fornirlo tu?",
          path
        );
        const newPath = await askQuestion("Puoi fornire un path?");
        const newRes = await readJson(newPath);

        resolve(newRes);
      }

      resolve(JSON.parse(json));
    });
  });
}


async function installDeps(deps) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(deps) === false) reject('invalid_deps')
    exec(`npx expo install ${deps.join(" ")}`, (stdout, stderr) => {
      console.log(stderr)
      if (stderr) reject(stderr);

      resolve(stdout);
    });
  });
}
