<template>
	<v-card variant="text">
		<v-card-title>
			{{title}}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{subtitle}}
		</v-card-subtitle>
		<v-card-text>
			<v-row>
				<v-col sm="12" :lg="12 / columns.length" v-for="column in columns" :key='column'>
					<template v-for="item in column" :key="item.id">
						<slot name="content" :item="item">
						</slot>
					</template>
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
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
	columnsNumber : {
		type: Number,
		default: 3
	}
});

const items = defineModel();

const columns = computed(() => {
	const c = [];
	for (let i = 0; i < props.columnsNumber; i++) {
		c.push(items.value.filter((item, index) => index % props.columnsNumber === i))
	}
	return c;
})
</script>
