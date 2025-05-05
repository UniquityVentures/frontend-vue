<template>
	<v-container>
		<!-- Add stepper for progress tracking -->
		<v-stepper :value="stage" class="mb-4">
			<v-stepper-header>
				<v-divider></v-divider>
				<v-stepper-item step="1" :complete="stage > 1">
					Create Student User
				</v-stepper-item>
				<v-divider></v-divider>
				<v-stepper-item step="2" :complete="stage > 2">
					Add Student Details
				</v-stepper-item>
				<v-divider></v-divider>
			</v-stepper-header>
		</v-stepper>
		
		<v-card class="mb-2">
			<UserForm
				v-if="stage===1"
				:action="handleCreateUser"
				v-model="user"
				actionName="Create User"
				title="Student User"
				subtitle="Create a user account for the student"
			/>

			<StudentForm
				v-if="stage===2"
				:user="user"
				:action="handleCreateStudent"
				actionName="Create Student"
				title="Student Details"
				subtitle="Add student-specific information"
				:hideDelete="true"
			/>
		</v-card>
	</v-container>
</template>

<script setup>
import { createUser } from "@/apps/users/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { createStudent } from "../api";
import StudentForm from "../components/StudentForm.vue";
import UserForm from "@/apps/users/components/UserForm.vue";

const router = useRouter();
const stage = ref(1);
const user = ref({});

const handleCreateUser = async (formData) => {
	try {
		user.value = await createUser(formData);
		stage.value = 2;
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};

const handleCreateStudent = async (formData) => {
	try {
		const student = await createStudent({
			...formData,
			user: user.value.id,
		});
		router.push({ name: "Student", params: { studentId: student.id } });
		return { success: true };
	} catch (error) {
		console.error("Failed to create student:", error);
		return { success: false, error };
	}
};
</script>
