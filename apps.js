const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");

const app = express();
const profileDirectory = path.join(__dirname,"character-profiles");
const profileFields = new Set([
  "name",
  "lore",
  "class",
  "subclass",
  "level",
  "soulDrive",
  "soulTier",
  "classEssence",
  "soulEssence",
  "hp",
  "maxHp",
  "ac",
  "speed",
  "str",
  "dex",
  "con",
  "int",
  "wis",
  "cha",
  "fullPortraitUrl",
  "teamPortraitUrl",
]);
const port = Number(process.env.PORT) || 3000;

app.use(express.json({ limit: "16kb" }));

app.get("/", (request, response) => {
  response.sendFile(path.join(__dirname, "index.html"));
});

app.get("/characterProfileSelect.js", (request, response) => {
  response.sendFile(path.join(__dirname, "characterProfileSelect.js"));
});

app.get("/javascript.js", (request, response) => {
  response.sendFile(path.join(__dirname, "javascript.js"));
});

function getProfilePath(characterId) {
  if (
    !/^[A-Za-z0-9_-]+$/.test(characterId) ||
    characterId === "character-profile.template"
  ) {
    return null;
  }

  return path.join(profileDirectory, `${characterId}.json`);
}

app.get("/api/characters/:characterId", async (request, response, next) => {
  const filePath = getProfilePath(request.params.characterId);
  if (!filePath) {
    return response.status(400).json({ error: "Invalid character ID" });
  }

  try {
    const profile = await fs.readFile(filePath, "utf8");
    response.json(JSON.parse(profile));
  } catch (error) {
    if (error.code === "ENOENT") {
      return response.status(404).json({ error: "Character not found" });
    }
    next(error);
  }
});

app.patch("/api/characters/:characterId", async (request, response, next) => {
  const filePath = getProfilePath(request.params.characterId);
  if (!filePath) {
    return response.status(400).json({ error: "Invalid character ID" });
  }

  const updates = request.body;
  if (
    !updates ||
    typeof updates !== "object" ||
    Array.isArray(updates) ||
    Object.keys(updates).length === 0 ||
    Object.entries(updates).some(
      ([field, value]) => !profileFields.has(field) || typeof value !== "string"
    )
  ) {
    return response.status(400).json({ error: "Invalid profile update" });
  }

  try {
    const profile = JSON.parse(await fs.readFile(filePath, "utf8"));
    const updatedProfile = { ...profile, ...updates };
    await fs.writeFile(filePath, `${JSON.stringify(updatedProfile, null, 2)}\n`);
    response.json(updatedProfile);
  } catch (error) {
    if (error.code === "ENOENT") {
      return response.status(404).json({ error: "Character not found" });
    }
    next(error);
  }
});

app.use((error, request, response, next) => {
  console.error(error);
  if (response.headersSent) {
    return next(error);
  }
  response.status(500).json({ error: "Internal server error" });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Character profile app listening on port ${port}`);
  });
}

module.exports = app;
