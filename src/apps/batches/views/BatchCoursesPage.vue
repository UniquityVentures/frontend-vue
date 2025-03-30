<template>
    <v-container v-if="batch" class="columns-container">
        <ResponsiveDataTable :fetch="getCourses" v-model:filters="filters"
        title="Courses" :subtitle="`Courses for ${batch.name}`" class="column-item" 
        :templates="{ desktop: 'list', mobile: 'list' }" hideFilters >
            <template #filters-slot>
                <v-text-field label="Search" v-model="filters.name" />
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" v-for="item in items" :key="item.id">
                        <v-card link :to="{ name: 'Course', params: { courseId: item.id }}" variant="flat" class="border">
                            <v-card-title class="text-subtitle-1">{{ item.name }}</v-card-title>
                            <v-card-subtitle>{{ item.code }}</v-card-subtitle>
                            <v-card-text>
                                <TeacherChip :teacherId="item.main_teacher" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list lines="three">
                    <v-list-item v-for="item in items" :key="item.id" class="border">
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle class="text-wrap">{{ item.code }}</v-list-item-subtitle>
						<TeacherChip label="Main Teacher" :teacher="item.main_teacher_details" v-if="item.main_teacher_details" />
                    </v-list-item>
                </v-list>
            </template>
        </ResponsiveDataTable>
        <v-card class="column-item">
            <v-card-title>Add Courses to Batch</v-card-title>
            <v-card-subtitle color="error">Select courses to add to this batch</v-card-subtitle>
            <v-card-text>
				<ServerAutocomplete
					v-model="newCourses"
					:fetch="getCourses"
					:getInfo="getCourseInfoFromObj"
					searchField="name"
					:multiple="true"
					:rules="[]"
					label="Select Course"
				/>
            </v-card-text>
            <v-card-actions>
                <SubmitButton submitText="Add Selected Courses to Batch" :onSubmit="addCourses" color="primary" />
            </v-card-actions>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Remove Courses from Batch</v-card-title>
            <v-card-subtitle color="error">Select courses to remove from this batch</v-card-subtitle>
            <v-card-text>
				<ServerAutocomplete
					v-model="victimCourses"
					:fetch="getBatchCourses"
					:getInfo="getCourseInfoFromObj"
					searchField="name"
					:multiple="true"
					:rules="[]"
					label="Select Course"
				/>
            </v-card-text>
            <v-card-actions>
                <SubmitButton submitText="Remove Selected Courses from Batch" :onSubmit="removeCourses" color="error" />
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourseInfoFromObj, getCourses } from "@/apps/courses/api";
import { getBatch, updateBatch } from "@/apps/batches/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";

const props = defineProps({
	batchId: {
		type: String,
		required: true,
	},
});

const newCourses = ref([]);
const victimCourses = ref([]);
const batch = ref(null);

const addCourses = async () => {
	batch.value.courses = [...batch.value.courses, ...newCourses.value];
	const response = await updateBatch(batch.value);
	newCourses.value = [];
	filters.value = props.batchId;
	return response;
};

// So stupid
const removeCourses = async () => {
	batch.value.courses = batch.value.courses.filter(
		(course) => !victimCourses.value.includes(course),
	);
	const response = await updateBatch(batch.value);
	victimCourses.value = [];
	filters.value = props.batchId;
	return response;
};

const filters = ref({ batches: props.batchId });

const getBatchCourses = async (filter) => {
	return getCourses({ ...filter, batches: props.batchId });
}

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>
