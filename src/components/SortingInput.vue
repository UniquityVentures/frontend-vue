<template>
	<v-row>
		<v-col>
			<v-select
				label="Sorting By" 
				v-model="field"
				:items="[{value: null, title: 'Default'},...fields]"
			/>
		</v-col>
		<v-col v-if="field">
			<v-select
				label="Sorting Order" 
				v-model="order"
				:items="sorting_order_options"
			/>
		</v-col>
	</v-row>
</template>

<script setup>
import { ref, watch } from "vue";
import { toHeaderCase } from "@/services/utils";
const sorting_order_options = [
	{
		value: null,
		title: "Ascending",
		props: {
			prependIcon: "mdi-sort-ascending",
		},
	},
	{
		value: "desc",
		title: "Descending",
		props: {
			prependIcon: "mdi-sort-descending",
		},
	},
];

const props = defineProps({
	getSortableFields: {
		type: Function,
		required: true,
	},
});

const fields = ref([]);

const order = defineModel("order");
const field = defineModel("field");

watch(
	props,
	async () => {
		if (props.getSortableFields) {
			fields.value = (await props.getSortableFields()).map((e) => ({
				title: toHeaderCase(e),
				value: e,
			}));
		}
	},
	{ deep: true, immediate: true },
);
</script>
