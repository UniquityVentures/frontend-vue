<template>
	<v-container>
		<v-card v-if="authStore.getRole === 'Student'">
			<v-card-title>
				Join Course
			</v-card-title>
			<v-card-text>
				<v-row>
					<v-col lg="10" sm="12">
						<v-text-field
							v-model="joinCode"
							label="Join Code"
							required
						></v-text-field>
					</v-col>
					<v-col lg="2" sm="12">
						<SubmitButton :onSubmit="handleJoin" submitText="Join" />
					</v-col>
				</v-row>
			</v-card-text>
		</v-card>
		<CoursesLookup title="Courses" subtitle="All Courses" v-model="defaultFilters" hide-filters />
	</v-container>
</template>

<script setup>
import CoursesLookup from "@/apps/courses/components/CoursesLookup.vue";
import { joinCourse } from "../api";
import { ref, onMounted } from "vue";
import SubmitButton from "@/components/SubmitButton.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const defaultFilters = ref({ is_active: true, sort_by: "name" });

const joinCode = ref(null);

const handleJoin = () => {
	const resp = joinCourse(joinCode.value);
	console.log(resp)
	joinCode.value = null;
	return resp
}
</script>
