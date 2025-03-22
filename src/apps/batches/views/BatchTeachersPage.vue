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
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import { getBatch } from "@/apps/batches/api";
import { getTeachers, getTeacher } from "@/apps/teachers/api";
import { getCourse } from "@/apps/courses/api";

const props = defineProps({
	batchId: Number,
});

const batch = ref({});
const loading = ref(true);

const other_teachers = ref([]);
const course_teachers = ref([]);

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

// Ensure proper data fetching sequence
onMounted(async () => {
	batch.value = await getBatch(props.batchId);
	await fetchOtherTeachers();
	await fetchCourseTeachers();
});
</script>
