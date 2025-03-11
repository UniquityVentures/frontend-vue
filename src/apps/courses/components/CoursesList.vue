<template>
    <v-card>
        <v-card-title>{{ title }}</v-card-title>
        <v-card-text>
            <v-list density="compact">
                <v-list-item 
                    v-for="(course, index) in courses" 
                    :key="index"
                    class="ma-1 pa-2 border"
                >
					<v-list-item-title>{{ course.name }}</v-list-item-title>
					<v-list-item-subtitle>
						{{ course.teacher_details?.user_details?.full_name }}
					</v-list-item-subtitle>
                    <template v-slot:append>
                        <v-btn 
                        :to="{ name: 'Course', params: { courseId: course.id } }"
                        icon="mdi-arrow-right"
                        size="small"
                        variant="text"
                        class="ma-1 pa-2 border"
                        ></v-btn>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getCourses } from "../api";

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
