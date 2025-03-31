<template>
    <v-container class="columns-container" v-if="batch">
        <v-card class="column-item">
            <v-card-title>Teachers List</v-card-title>
            <v-card-text>
                <div class="text-subtitle-1">Head Teacher</div>
                <TeacherListItem :teacher="batch.main_teacher_details" />
            </v-card-text>
            <v-card-text v-if="other_teachers.length > 0">
                <div class="text-subtitle-1">Assistant Teachers</div>
                <TeacherListItem v-for="teacher in other_teachers" :key="teacher.id" :teacher="teacher" />
            </v-card-text>
            <v-card-text>
                <div class="text-subtitle-1">Course Teachers</div>
                <v-list>
                    <v-list-item 
                    class="border"
                    rounded="lg"
                    v-for="(teacher, index) in course_teachers" :key="index"
                    :title="teacher.teacher?.user_details?.full_name"
                    :subtitle="`Leading Course: ${teacher.course.name} (${teacher.course.code})`"
                    :to="{ name: 'Teacher', params: { teacherId: teacher?.teacher.user_details?.id } }">
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Add Teachers to Batch</v-card-title>
            <v-card-subtitle color="error">Select teachers to add to this batch</v-card-subtitle>
            <v-card-text>
				<ServerAutocomplete
					v-model="newTeachers"
					:fetch="getTeachers"
					:getInfo="getTeacherInfoFromObj"
					searchField="name"
					:multiple="true"
					:rules="[]"
					label="Select Teachers"
				/>
            </v-card-text>
            <v-card-actions>
                <SubmitButton submitText="Add Selected Teachers to Batch" :onSubmit="addTeachers" color="primary" />
            </v-card-actions>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Remove Teachers from Batch</v-card-title>
            <v-card-subtitle color="error">Select teachers to remove from this batch</v-card-subtitle>
            <v-card-text>
				<ServerAutocomplete
					v-model="victimTeachers"
					:fetch="getBatchTeachers"
					:getInfo="getTeacherInfoFromObj"
					searchField="name"
					:multiple="true"
					:rules="[]"
					label="Select Teachers"
				/>
            </v-card-text>
            <v-card-actions>
                <SubmitButton submitText="Remove Selected Teachers from Batch" :onSubmit="removeTeachers" color="error" />
            </v-card-actions>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Teacher Join Requests</v-card-title>
            <v-card-subtitle>Teachers who have requested to join this batch</v-card-subtitle>
            <v-card-text>
                <v-list>
                    <v-list-item class="border">
                        <v-list-item-title>Teacher Name</v-list-item-title>
                        <v-list-item-subtitle>Teacher - Teacher Number</v-list-item-subtitle>
                        <template #append>
                            <v-btn color="green" size="small">Approve</v-btn>
                            <v-btn color="error" size="small">Reject</v-btn>
                        </template>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { getBatch, updateBatch } from "@/apps/batches/api";
import { getCourse } from "@/apps/courses/api";
import {
	getTeacher,
	getTeacherInfoFromObj,
	getTeachers,
} from "@/apps/teachers/api";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
	batchId: String,
});

const batch = ref({});
const loading = ref(true);

const newTeachers = ref([]);
const victimTeachers = ref([]);

const other_teachers = ref([]);
const course_teachers = ref([]);

const addTeachers = async () => {
	batch.value.other_teachers = [
		...batch.value.other_teachers,
		...newTeachers.value,
	];
	const response = await updateBatch(batch.value);
	newTeachers.value = [];
	batch.value = response;
	await fetchOtherTeachers();
	await fetchCourseTeachers();
	return response;
};

// So stupid
const removeTeachers = async () => {
	batch.value.other_teachers = batch.value.other_teachers.filter(
		(teacher) => !victimTeachers.value.includes(teacher),
	);
	const response = await updateBatch(batch.value);
	victimTeachers.value = [];
	batch.value = response;
	await fetchOtherTeachers();
	await fetchCourseTeachers();
	return response;
};

const fetchOtherTeachers = async () => {
	for (const teacherId of batch.value.other_teachers) {
		const teacher = await getTeacher(teacherId);
		other_teachers.value.push(teacher);
	}
};

const fetchCourseTeachers = async () => {
	for (const courseId of batch.value.courses) {
		const course = await getCourse(courseId);
		const teachers = await getTeachers({ courses_leading: courseId });
		course_teachers.value.push({
			course: course,
			teacher: teachers.results[0],
		});
	}
};

const getBatchTeachers = async (filter) => {
	return getTeachers({ ...filter, batches: props.batchId });
};

// Ensure proper data fetching sequence
onMounted(async () => {
	batch.value = await getBatch(props.batchId);
	await fetchOtherTeachers();
	await fetchCourseTeachers();
});
</script>
