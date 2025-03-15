<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-list>
                <v-list-item v-for="(course, index) in courses" :key="index"
                link :to="{ name: 'Course', params: { courseId: course.id } }" class="border">
					<v-list-item-title>{{ course.name }}</v-list-item-title>
					<v-list-item-subtitle>
						{{ course.code }}
					</v-list-item-subtitle>
                    <v-list-item-text>
                        <TeacherChip :teacher="course.main_teacher_details" :label="`Teacher`"/>                           
                    </v-list-item-text>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCourses } from "../api";
import TeacherChip from "../../teachers/components/TeacherChip.vue";

// Props
const props = defineProps({
	filter: Object,
	title: {
		type: String,
		default: "Courses",
	},
});

const courses = ref([]);
const fetchCourses = async () => {
	courses.value = (await getCourses(props.filter)).results;
};
onMounted(fetchCourses);
</script>
