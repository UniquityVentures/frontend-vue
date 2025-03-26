<template>
	<v-autocomplete
		v-model="model"
		chips
		closable-chips
		:items="results"
		:loading="loading"
		:search-input.sync="query"
		:label="label"
		:item-props="getInfo"
		:multiple="multiple"
		@update:search="onSearchUpdate"
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
import { ref, onMounted } from "vue";

const model = defineModel();

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
});

// Query and filter setup
const query = ref("");
const filters = ref({ page_size: 10, page: 1 });

// Results and loading state
const results = ref([]);
const loading = ref(false);
const hasMore = ref(true);

// Search handling with debounce
let debounceTimeout = null;
const onSearchUpdate = () => {
	if (debounceTimeout) clearTimeout(debounceTimeout);
	hasMore.value = true;
	filters.value.page = 1;
	debounceTimeout = setTimeout(() => {
		results.value = []; // Clear results only after debounce
		fetchResults();
	}, 300);
};

// Fetch results
const fetchResults = async () => {

	if (loading.value || !hasMore.value) return;
	filters.value[props.searchField] = query.value;
	loading.value = true;

	try {
		const listing = await props.fetch(filters.value);
		const newItems = listing.results.filter(item => !results.value.some(r => r.id === item.id));
		results.value = [...results.value, ...newItems];
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
const fetchMoreResults = () => {
	if (!loading.value && hasMore.value) {
		fetchResults();
	}
};

onMounted(async () => {
  // Load initial dropdown data
  await fetchResults();

  // Ensure selected model values (if any) are in results
  if (model.value) {
	if (Array.isArray(model.value)) {
		for (const id of model.value) {
			const selectedItems = await props.fetch({ id: id });
			results.value = [...selectedItems.results, ...results.value];
		}
	} else {
		const selectedItems = await props.fetch({ id: model.value });
		results.value = [...selectedItems.results, ...results.value];
	}
  }
});

</script>
