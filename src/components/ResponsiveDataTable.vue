<template>
	<!-- List template -->
	<v-data-table-server
		v-if="template === 'list'"
		:items-length="itemsLen"
		:headers="[]"
		:items="items"
		@update:options="fetchData"
		:search="JSON.stringify(filters)"
		:loading="loading"
	>
		<template #headers={}></template>
		<template #item={item}>
			<v-list density="compact" v-if="template === 'list'">
				<v-list-item 
					v-for="item in items" 
					:key="item.id" 
					class="ma-1 pa-2 border" 
					:to="getToFunction(item)" 
					link
				>
					<v-list-item-title>
						{{ keyHandler(item, title) }}
					</v-list-item-title>
					<v-list-item-subtitle>
						{{ `${subtitle.label}: ${keyHandler(item, subtitle)}` }}
					</v-list-item-subtitle>
					<!-- Chips -->
					<div v-for="header in data_headers">
						<!-- Date type -->
						<v-chip v-if="header.type === 'date'">
							{{ `${header.label}: ${formatDate(item[header.key])}` }}
						</v-chip>
						<!-- Teacher type -->
						<TeacherChip v-if="header.type === 'teacher'" :teacher="item[header.key]" :label="header.label"/>
						<!-- Status type -->
						<v-chip v-if="header.type === 'status'" :color="getStatusColor(item[header.key])">
							{{ `${header.label}: ${keyHandler(item, header)}` }}
						</v-chip>
						<!-- Custom format function -->
						<v-chip v-if="header.formatFunc">
							{{ `${header.label}: ${header.formatFunc(item[header.key])}` }}
						</v-chip>
					</div>
				</v-list-item>
			</v-list>
		</template>
	</v-data-table-server>

	<!-- Card template -->
	<v-data-table-server
		v-if="template === 'card'"
		:items-length="itemsLen"
		:headers="[]"
		:items="items"
		@update:options="fetchData"
		:search="JSON.stringify(filters)"
		:loading="loading"
		class="body-container"
	>
		<template #default>
			<div class="body-grid-container">
				<v-row no-gutters class="ma-1 pa-0">
					<v-col v-for="item in items" :key="item.id" cols="12" sm="6" md="3" class="pa-2">
						<v-card height="100%" link :to="getToFunction(item)" variant="flat" class="border">
							<v-card-title>
								{{ keyHandler(item, title) }}
							</v-card-title>
							<v-card-subtitle>
								{{ `${subtitle.label}: ${keyHandler(item, subtitle)}` }}
							</v-card-subtitle>
							<v-card-text>
								<div v-for="header in data_headers">
									<TeacherChip v-if="header.type === 'teacher'" :teacher="item[header.key]" :label="header.label" />
									<v-chip v-if="header.type === 'status'" :color="getStatusColor(item[header.key])">
										{{ `${header.label}: ${keyHandler(item, header)}` }}
									</v-chip>
									<v-chip v-if="header.formatFunc">
										<strong class="mr-2">{{ header.label }}: </strong>
										{{ header.formatFunc(item[header.key]) }}
									</v-chip>
								</div>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</div>
		</template>
	</v-data-table-server>
	<!-- Table template -->
	<v-data-table-server
		v-if="template === 'table'"
		:items-length="itemsLen"
		:headers="table_headers"
		:items="items"
		@update:options="fetchData"
		:search="JSON.stringify(filters)"
		:loading="loading"
	>
		<template #item="{ item }">
			<tr :to="getToFunction(item)">
				<td v-for="header in headers">
					<!-- Date type -->
					<span v-if="header.type === 'date'">
						{{ formatDate(item[header.key]) }}
					</span>
					<!-- Teacher type -->
					<span v-else-if="header.type === 'teacher'" class="d-flex align-center">
						<TeacherChip :teacher="item[header.key]"/>
					</span>
					<!-- Status type with colored chip -->
					<span v-else-if="header.type === 'status'">
						<v-chip
							:color="getStatusColor(item[header.key])"
							size="small"
							variant="outlined"
						>
							{{ keyHandler(item, header) }}
						</v-chip>
					</span>
					<!-- Custom format function (existing logic) -->
					<span v-else-if="header.formatFunc">
						{{ header.formatFunc(item[header.key]) }}
					</span>
					<!-- Default (existing logic) -->
					<span v-else>
						{{ keyHandler(item, header) }}
					</span>
				</td>
			</tr>
		</template>
	</v-data-table-server>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useDisplay } from "vuetify";
const { mobile } = useDisplay();
import { formatDate, keyHandler } from "@/services/utils";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";

const props = defineProps({
	headers: {
		type: Array,
		required: true,
	},
	fetch: {
		type: Function,
		required: true,
	},
	getToFunction: {
		type: Function,
	},
	template: {
		type: String,
		default: 'table',
	},
});

const filters = defineModel();

// first header is the title and the second header is the subtitle
const title = ref(props.headers[0]);
const subtitle = ref(props.headers[1]);
// data headers are all headers except the title and subtitle
const data_headers = computed(() => props.headers.slice(2, props.headers.length));
// table headers are all headers for now
const table_headers = computed(() => props.headers);

const loading = ref(false);
const itemsLen = ref(10);
const items = ref([]);

const convertFiltersForBackend = (filters) => {
	return Object.fromEntries(
		Object.entries(filters)
			.filter(([_, value]) => (typeof value === "boolean" ? true : value))
			.map(([key, value]) => {
				if (typeof value === "boolean") {
					return [key, value ? "True" : "False"];
				}
				return [key, value];
			}),
	);
};

const fetchData = async ({ page, itemsPerPage, search }) => {
	loading.value = true;

	try {
		const filterParams = {
			...convertFiltersForBackend(JSON.parse(search)),
			page_size: itemsPerPage || 10,
			page: page || 1,
		};

		const { results, total_records } = await props.fetch(filterParams);
		items.value = results;
		itemsLen.value = total_records;
	} catch (error) {
		console.error("Error fetching items:", error);
		items.value = [];
		itemsLen.value = 0;
	} finally {
		loading.value = false;
	}
};

onMounted(() => fetchData({ search: filters }));

const getStatusColor = (status) => {
	const statusColors = {
		active: 'success',
		inactive: 'error',
	};
	return statusColors[status?.toLowerCase()] || 'default';
};
</script>

<style scoped>
.body-grid-container {
	width: 100%;
	overflow: hidden;
}

.body-container :deep(.v-table__wrapper) {
	overflow: visible;
}
</style>
