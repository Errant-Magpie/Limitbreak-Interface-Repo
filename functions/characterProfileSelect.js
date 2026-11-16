let activeRequest;

async function selectCharacter(characterId){
    //Cancel the previous request if the user switches quickly.
    activeRequest?.abort();
    const controller = new AbortController();
    activeRequest = controller;

    try {
        const response = await fetch(
            `/api/characters/${characterId}`,
            { signal: controller.signal }
        );

        if (!response.ok) throw new Error("Failed to load selectCharacter");

        const character = await response.json();

        // Update the existing page without reloading it.
        document.querySelector("#name").textContent = character.name;
        document.querySelector("#lore").textContent = character.lore;
        document.querySelector("#class").textContent = character.class;
        document.querySelector("#subclass").textContent = character.subclass;
        document.querySelector("#level").textContent = character.level;
        document.querySelector("#soulDrive").textContent = character.soulDrive;
        document.querySelector("#soulTier").textContent = character.soulTier;
        document.querySelector("#classEssence").textContent = character.classEssence;
        document.querySelector("#soulEssence").textContent = character.soulEssence;
        document.querySelector("#hp").textContent = character.hp;
        document.querySelector("#maxHp").textContent = character.maxHp;
        document.querySelector("#ac").textContent = character.ac;
        document.querySelector("#speed").textContent = character.speed;
        document.querySelector("#str").textContent = character.str;
        document.querySelector("#dex").textContent = character.dex;
        document.querySelector("#con").textContent = character.con;
        document.querySelector("#int").textContent = character.int;
        document.querySelector("#wis").textContent = character.wis;
        document.querySelector("#cha").textContent = character.cha;
        document.querySelector("#fullPortrait").src = character.fullPortraitUrl;
        document.querySelector("#teamPortrait").src = character.teamPortraitUrl;

    } catch (error) {
        if (error.name !== "AbortError") {
            console.error(error);
        }
    }
}