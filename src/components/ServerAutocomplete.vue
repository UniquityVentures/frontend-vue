<template>
	<v-autocomplete
		v-model="model"
		chips
		closable-chips
		:items="results"
		:loading="loading"
		:label="label"
		:item-props="getInfo"
		:multiple="multiple"
		@update:search="onSearchUpdate"
		@update:menu="menuOpen = $event"
		:clearable="true"
		:density="density"
	>
		<!-- Infinite Scrolling Slot -->
		<template v-slot:append-item>
			<div v-if="hasMore" v-intersect="fetchMoreResults" class="pa-4">
				<i>Loading more items ...</i>
			</div>
			<div v-else class="pa-4">
				<i>No more items to load</i>
			</div>
		</template>
	</v-autocomplete>
</template>

<script setup>
import { dedup } from "@/services/utils.js";
import { onMounted, ref, watch } from "vue";

const model = defineModel({ required: true });

const props = defineProps({
	getInfo: {
		type: Function,
		required: true,
	},
	fetch: {
		type: Function,
		required: true,
	},
	searchField: {
		type: String,
		required: true,
	},
	label: {
		type: String,
		required: true,
	},
	multiple: {
		type: Boolean,
		default: false,
	},
	density: {
		type: String,
		default: "compact",
	},
	filters: {
		type: Object,
		default: () => {},
	},
});

// Query and filter setup
const query = ref("");
const filters = ref({ page_size: 10, page: 1, ...props.filters });

// Results and loading state
const results = ref([]);
const loading = ref(false);
const hasMore = ref(true);

// Search handling with debounce
let debounceTimeout = null;
const onSearchUpdate = (searchValue) => {
	if (debounceTimeout) clearTimeout(debounceTimeout);
	hasMore.value = true;
	filters.value.page = 1;
	filters.value[props.searchField] = searchValue;
	// Clear existing results when search query changes
	results.value = [];
	debounceTimeout = setTimeout(() => {
		fetchResults(searchValue);
	}, 300);
};

const fetchSelected = async () => {
	if (props.multiple) {
		// Prevent Unnecessary network requests
		if (!model.value.length) {
			return
		}
		// Don't request the data which is already present
		const missingEntries = model.value.filter((e) => results.value.includes(e));
		if (!missingEntries.length) {
			return
		}
		const newResults = await Promise.all(
			missingEntries.map(async (v) => (await props.fetch({ id: v })).results[0]),
		);
		if (newResults?.[0]?.id && typeof model.value[0] !== typeof newResults[0]?.id) {
			const converter = newResults[0].id.constructor;
			model.value = model.value.map(converter);
		} else {
			const temp = model.value;
			model.value = temp; 
		}
		results.value = newResults.concat(results.value);
	} else {
		if (!model.value) {
			return
		}

		// Same thing as above, just for single element
		if (results.value.includes(model.value)) {
			return
		}
		const newResults = (await props.fetch({ id: model.value })).results[0];
		if (typeof model.value !== typeof newResults.id) {
			const converter = newResults.id.constructor;
			model.value = converter(model.value);
		} else {
			const temp = model.value;
			model.value = temp; 
		}
		results.value.unshift(newResults);
	}
};

watch(model, fetchSelected);

// Fetch results
const fetchResults = async () => {
	if (loading.value || !hasMore.value) return;
	loading.value = true;

	try {
		const listing = await props.fetch(filters.value);
		results.value = dedup([...results.value, ...listing.results], (e) => e.id);
		// Update pagination state
		hasMore.value = filters.value.page < listing.total_pages;
		if (hasMore.value) {
			filters.value.page++;
		}
	} catch (error) {
		hasMore.value = false;
		console.error("ServerAutocomplete fetch function failed:", error);
	} finally {
		loading.value = false;
	}
};

// Fetch more results when scrolling
const isAtBottom = ref(false)

const menuOpen = ref(false)

const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
};

setInterval(() => {
	if (menuOpen.value && isAtBottom.value && !loading.value && hasMore.value) {
		fetchResults();
	}
}, 1000);

const fetchMoreResults = (isIntersecting, entries, observer) => {
	isAtBottom.value = isIntersecting;
};

onMounted(async () => {
	await fetchSelected();
	await fetchResults();
});
</script>
