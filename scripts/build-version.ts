import { versions } from "@yx1126/version";
import path from "node:path";
import fs from "node:fs";
import consola from "consola";
import chalk from "chalk";
import { findWorkspacePackages } from "@pnpm/workspace.find-packages";
import { maxSatisfying } from "semver";

const workspaceRoot = path.resolve(__dirname, "..");

const mainPath = path.join(workspaceRoot, "package.json");

(async () => {
    consola.log(chalk.cyan("Start updating version"));

    const main = JSON.parse(fs.readFileSync(mainPath).toString());
    main.version = maxSatisfying(versions.map(v => v.version), "*");

    const workspaces = await findWorkspacePackages(workspaceRoot);

    for(let i = 0; i < workspaces.length; i++) {
        const item = workspaces[i];
        const { name } = path.parse(item.dir);
        const v = versions.find(v => v.file.test(name));
        if(!item.manifest.private && item.manifest.version && v) {
            item.manifest.version = v.version;
            await item.writeProjectManifest(item.manifest);
            consola.success(chalk.green(`package(${name}) version update to ${v.version}`));
        }
    }

    fs.writeFileSync(mainPath, JSON.stringify(main, null, 4));

    consola.success(chalk.green(`package(main) version update to ${main.version}`));
})();
