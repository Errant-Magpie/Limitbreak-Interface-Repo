# Limitbreak-Interface-Repo
repository for the LIMITBREAK ttrpg character interface. this repo functions uses Node.js, Express, and Supabase to create a live dashboard, ttrpg character/party manager, dice roller, and interactive web experience
for the TTRPG campaign "Limit Break!: One Way Out!" run by myself.

This is a personal project for me and my friends. It will receive updates as I see fit.

## Running locally

Run `npm start` and open `http://localhost:3000`. Character profile IDs are the JSON
filenames in `character-profiles` without the `.json` extension. The server provides
GET and PATCH endpoints at `/api/characters/:characterId`; PATCH updates the profile
file. The write endpoint has no authentication, so do not expose this server publicly.
