<template>
	<v-row>
		<v-col sm="12" :lg="12 / columns.length" v-for="column in columns" :key='column'>
			<template v-for="item in column" :key="item.id">
				<slot name="content" :item="item">
				</slot>
			</template>
		</v-col>
	</v-row>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const props = defineProps({
	title: {
		type: String,
		default: "Notice Board",
	},
	subtitle: {
		type: String,
		required: false,
	},
	columnsNumber: {
		type: Number,
		default: 3,
	},
	items: {
		type: Array,
		required: true,
	},
});

const columns = computed(() => {
	const c = [];
	for (let i = 0; i < props.columnsNumber; i++) {
		c.push(
			props.items.filter((item, index) => index % props.columnsNumber === i),
		);
	}
	return c;
});
</script>
