<template>
	<v-card variant="flat">
		<v-card-title>
			{{title}}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{subtitle}}
		</v-card-subtitle>
		<v-card-text>
			<v-row>
				<v-col sm="12" lg="4">
					<template v-for="item in items1" :key="item.id">
						<slot name="content" :item="item">
						</slot>
					</template>
				</v-col>
				<v-col sm="12" lg="4">
					<template v-for="item in items2" :key="item.id">
						<slot name="content" :item="item">
						</slot>
					</template>
				</v-col>
				<v-col sm="12" lg="4">
					<template v-for="item in items3" :key="item.id">
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
});

const items = defineModel();

const items1 = computed(() =>
	items.value.filter((item, index) => index % 3 === 0),
);

const items2 = computed(() =>
	items.value.filter((item, index) => index % 3 === 1),
);
const items3 = computed(() =>
	items.value.filter((item, index) => index % 3 === 2),
);
</script>
