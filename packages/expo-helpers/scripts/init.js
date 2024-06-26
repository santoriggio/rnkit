#!/usr/bin/env node

const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  blue: "\x1b[34m",
};
async function init() {
  const project = await readProjectPackageJson();
  const package = await readPackageJson();

  let toInstall = [];
  Object.keys(package.dependencies).forEach(async (dep) => {
    const version = package.dependencies[dep];

    if (typeof project.dependencies[dep] === "undefined") {
      toInstall.push(`${dep}@${version}`);
      print(`Need to install: ${dep}@${version}`, 'blue')
    } else {
      const currentVersion = project.dependencies[dep];
      if (version === currentVersion) {
        print(`${dep} is ok`, 'green')
      } else {
        print(`Current version of ${dep}: ${currentVersion}, need ${version}`, 'red')
        toInstall.push(`${dep}@${version}`);
      }
    }
  });

  if (toInstall.length > 0) {
    const wantInstall = await askQuestion("Want to install? (Y/n)");
    if (wantInstall.toLowerCase() === "yes" || wantInstall === "") {
      await installDeps(toInstall);
    }
  }

  process.exit();
}

init();

async function readPackageJson() {
  const libraryName = "expo-helpers";
  const libraryPackagePath = path.join(
    process.cwd(),
    "node_modules",
    libraryName,
    "package.json"
  );

  return new Promise((resolve, reject) => {
    fs.readFile(libraryPackagePath, "utf8", (err, json) => {
      if (err) reject(err);

      resolve(JSON.parse(json));
    });
  });
}

async function readProjectPackageJson() {
  return new Promise((resolve, reject) => {
    fs.readFile("./package.json", "utf8", (err, json) => {
      if (err) reject(err);

      resolve(JSON.parse(json));
    });
  });
}


async function readJson(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, json) => {
      if (err) reject(err);

      resolve(JSON.parse(json))
    })
  })
}

function print(str, color) {
  if (color && typeof colors[color] !== 'undefined') {
    console.log(colors[color])
  }

  console.log(str);
  console.log(colors.reset)
}

async function installDeps(deps) {
  if (Array.isArray(deps) === false) return;

  return new Promise((resolve, reject) => {
    exec(`npx expo install ${deps.join(' ')}`, (stdout, stderr) => {
      if (stderr) reject(stderr);

      resolve(stdout)
    })
  })
}
