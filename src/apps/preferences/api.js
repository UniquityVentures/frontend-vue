import { createViewset } from "@/services/viewset";
import { defineStore } from "pinia";
import { ref , computed} from "vue";

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

const useLocalisationStore = defineStore("localisation", () => {
	const localisations = ref(new Map());
	const localise = computed(() => (text) => {
		const cachedValue = localisations.value.get(text);
		if (cachedValue) {
			return cachedValue;
		} 
		getReplacements({ source: text }).then((result) => {
			if ( result?.results?.length ) {
				localisations.value.set(text, result.results[0].target);
			}
		});
		return text
	});
	return {
		localisations,
		localise,
	};
});

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
	useLocalisationStore,
};
