<template>
	<v-container>
	<v-card>
		<v-card-title>
			Students
		</v-card-title>
		<v-card-text>
			<v-data-table density="comfortable" 
			:search="search" 
			:items="students" 
			:headers="student_headers"
			:items-per-page="10">
				<template v-slot:top>
					<v-text-field
						v-model="search"
						label="Search"
						density="compact"
					/>
				</template>
				<template #[`item.id`]="{ item }">
					<v-btn 
						icon="mdi-arrow-right"
						size="x-small"
						variant="outlined"
						:to="{ name: 'Dashboard', params: { id: item} }"
					></v-btn>
				</template>
			</v-data-table>
		</v-card-text>
	</v-card>
</v-container>
</template>

<script setup>
import { getStudents } from "@/apps/students/api";
import { onMounted, ref } from "vue";

const props = defineProps({
	filter: Object,
});

const students = ref([]);
const search = ref("");
const student_headers = ref([
	{ title: "Name", value: "user.full_name", key: "name" },
	{
		title: "",
		key: "id",
		align: "end",
		sortable: false,
		value: (student) => `app/students/${student.id}`,
	},
]);

const fetchStudents = async () => {
	students.value = (await getStudents(props.filter || {})).results;
};

onMounted(fetchStudents);
</script>
