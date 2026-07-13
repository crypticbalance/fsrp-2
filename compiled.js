// AUTO GENERATED FILE
// Compiled: 2026-07-09T01:22:35.846Z



function getFiles(dir) {
    let files = [];

    for (const file of fs.readdirSync(dir)) {
        if (file === "node_modules" || file === ".git") continue;

        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            files.push(...getFiles(fullPath));
        } else {
            files.push(fullPath);
        }
    }

    return files;
}

function countLines(file) {
    return fs.readFileSync(file, "utf8").split("\n").length;
}

function dropTable(db, table) {
    db.prepare(`
        DROP TABLE IF EXISTS ${table}
    `).run();
}