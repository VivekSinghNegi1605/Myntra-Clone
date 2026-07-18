const fs = require("node:fs/promises");
const path = require("path");

const filePath = path.join(__dirname, "items.json");

async function getStoredItems() {
  const rawFileContent = await fs.readFile(filePath, { encoding: "utf-8" });
  const data = JSON.parse(rawFileContent);
  const storedItems = data.items ?? [];
  return storedItems;
}

function storeItems(items) {
  return fs.writeFile(filePath, JSON.stringify({ items: items || [] }));
}

exports.getStoredItems = getStoredItems;
exports.storeItems = storeItems;
