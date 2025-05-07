import { createViewset } from "@/services/viewset";

const preferencesViewset = createViewset("api/preferences");

const getPreferences = preferencesViewset.list;
const getPreference = preferencesViewset.retrieve;
const updatePreference = preferencesViewset.update;
const createPreference = preferencesViewset.create;
const deletePreference = preferencesViewset.delete;

export {
	getPreferences,
	getPreference,
	updatePreference,
	createPreference,
	deletePreference,
};
