import { createViewset } from "@/services/viewset";

const preferencesViewset = createViewset("api/preferences/preferences");

const getPreferences = preferencesViewset.list;
const getPreference = preferencesViewset.retrieve;
const updatePreference = preferencesViewset.update;
const createPreference = preferencesViewset.create;
const deletePreference = preferencesViewset.delete;

const replacementsViewset = createViewset("api/preferences/replacements");

const getReplacements = replacementsViewset.list;
const getReplacement = replacementsViewset.retrieve;
const updateReplacement = replacementsViewset.update;
const createReplacement = replacementsViewset.create;
const deleteReplacement = replacementsViewset.delete;

export {
	getPreferences,
	getPreference,
	updatePreference,
	createPreference,
	deletePreference,
	
	getReplacements,
	getReplacement,
	updateReplacement,
	createReplacement,
	deleteReplacement,
};
