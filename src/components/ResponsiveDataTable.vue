<template>
	<v-card>
		<v-card-title v-if="title">{{ title }}</v-card-title>
		<v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
		<v-card-text>
			<v-card variant="flat" v-if="!hideFilters">
				<v-card-text class="mt-2">
					<slot name="filters-slot" :filters="filters">
						<!-- filters slot -->
					</slot>
				</v-card-text>
			</v-card>
			<v-data-table-server :items-length="itemsLen" :items="items"
				v-model:items-per-page="pageSize"
				@update:options="fetchData" :loading="loading" 
				:items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
				<template #default>
					<slot name="list-slot" :items="items" v-if="template === 'list'" >
						<!-- list slot -->
					</slot>
					<slot name="cards-slot" :items="items" v-if="template === 'card'">
						<!-- cards slot -->
					</slot>
					<slot name="table-slot" :items="items" v-if="template === 'table'">
						<!-- table slot -->
					</slot>
				</template>
			</v-data-table-server>
		</v-card-text>
		<v-card-actions> 
			<slot name="actions-slot">
				<!-- actions slot -->
			</slot>
		</v-card-actions>
	</v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	subtitle: {
		type: String,
		default: "",
	},
	fetch: {
		type: Function,
		required: true,
	},
	templates: {
		type: Object,
		default: () => ({
			desktop: "card",
			mobile: "list",
		}),
	},
	page_size: {
		type: [Number, String],
		default: 12,
	},
	hideFooter: {
		type: Boolean,
		default: false,
	},
	hideFilters: {
		type: Boolean,
		default: false,
	},
});

const filters = defineModel("filters");

// Template Handling
const { mobile } = useDisplay();
const template = ref(
	mobile.value ? props.templates.mobile : props.templates.desktop,
);

// Watch for changes in mobile state and update template accordingly
watch(mobile, (newValue) => {
	template.value = newValue ? props.templates.mobile : props.templates.desktop;
});

// Removed 'all' from items per page options
const itemsPerPageOptions = [
	{ value: 6, title: "6" },
	{ value: 12, title: "12" },
	{ value: 24, title: "24" },
	{ value: 48, title: "48" },
];

const loading = ref(false);
const itemsLen = ref(10);
const items = ref([]);

const pageSize = ref(props.page_size);

// Fetch Data
const fetchData = async ({ page, itemsPerPage }) => {
	loading.value = true;
	const filterParams = {
		...filters.value,
		page_size: itemsPerPage,
		page: page,
	};
	const { results, total_records } = await props.fetch(filterParams);
	items.value = results;
	itemsLen.value = total_records;
	loading.value = false;
};

watch(
	filters,
	() => {
		fetchData({ page: 1, itemsPerPage: props.page_size });
	},
	{ deep: true, immediate: true },
);
</script>
