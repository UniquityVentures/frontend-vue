<template>
	<v-container>
		<v-card class="mb-2">
			<v-card-title>
				Teacher
			</v-card-title>
			<v-card-subtitle>
				Create Teacher
			</v-card-subtitle>
			<UserForm
				v-if="stage===1"
				:action="handleCreateUser"
				v-model="user"
				actionName="Create User"
				title="Teacher User"
				subtitle="Create a user account for the teacher"
			/>

			<TeacherForm
				v-if="stage===2"
				:user="user"
				:action="handleCreateTeacher"
				actionName="Create Teacher"
				title="Teacher Details"
				subtitle="Add teacher-specific information"
			/>
		</v-card>
	</v-container>
</template>

<script setup>
import { createUser } from "@/apps/users/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createTeacher } from "../api";
import TeacherForm from "../components/TeacherForm.vue";
import UserForm from "@/apps/users/components/UserForm.vue";

const router = useRouter();
const stage = ref(1);
const user = ref({});

const handleCreateUser = async (userData) => {
	try {
		user.value = await createUser(userData);
		stage.value = 2;
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};

const handleCreateTeacher = async (teacherData) => {
	try {
		const teacher = await createTeacher({
			...teacherData,
			user: user.value.id,
		});
		router.push({ name: "Teacher", params: { teacherId: teacher.id } });
		return { success: true };
	} catch (error) {
		console.error("Failed to create teacher:", error);
		return { success: false, error };
	}
};
</script>
