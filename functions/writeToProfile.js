const PROFILE_TEMPLATE = {
  name: "",
  lore: "",
  class: "",
  subclass: "",
  level: "",
  soulDrive: "",
  soulTier: "",
  classEssence: "",
  soulEssence: "",
  hp: "",
  maxHp: "",
  ac: "",
  speed: "",
  str: "",
  dex: "",
  con: "",
  int: "",
  wis: "",
  cha: "",
  fullPortraitUrl: "",
  teamPortraitUrl: "",
};

async function writeToProfile(characterId, fieldName, value) {
  if (typeof characterId !== "string" || characterId.trim() === "") {
    throw new TypeError("characterId must be a non-empty string");
  }

  if (
    typeof fieldName !== "string" ||
    !Object.prototype.hasOwnProperty.call(PROFILE_TEMPLATE, fieldName)
  ) {
    throw new TypeError("fieldName must match a field in the character profile");
  }

  const profileField = {
    [fieldName]: value == null ? "" : String(value),
  };

  const response = await fetch(
    `/api/characters/${encodeURIComponent(characterId)}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profileField),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to write character profile (${response.status} ${response.statusText})`
    );
  }

  return profileField;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = writeToProfile;
}

if (typeof globalThis !== "undefined") {
  globalThis.writeToProfile = writeToProfile;
}