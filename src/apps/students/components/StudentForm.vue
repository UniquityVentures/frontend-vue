<template>
	<v-card>
		<v-card-title>
			{{ title }}
		</v-card-title>
		<v-card-subtitle v-if="subtitle">
			{{ subtitle }}
		</v-card-subtitle>
		<v-card-text>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field 
						label="Identifier" 
						v-model="formData.student.student_no"
						hint="Student ID or registration number"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<BatchSelect 
						v-model="formData.student.batch" 
						label="Batch"
					/>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6">
					<v-text-field 
						label="Username" 
						v-model="formData.user.username"
						hint="Student's username"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field 
						label="E-Mail" 
						v-model="formData.user.email"
						hint="Student's email"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6">
					<v-text-field 
						label="First Name" 
						v-model="formData.user.first_name"
						hint="Student's First Name"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field 
						label="E-Mail" 
						v-model="formData.user.last_name"
						hint="Student's last name"
					></v-text-field>
				</v-col>
			</v-row>


			<v-row>

				<v-col>
					<v-card class="ma-2" variant="flat">
						<v-card-title>
							Guardian 1 Details
						</v-card-title>
						<v-card-text>
							<v-text-field 
								label="Name" 
								v-model="formData.student.guardian1_name "
							></v-text-field>
							<v-text-field 
								label="E-Mail" 
								v-model="formData.student.guardian1_email"
							></v-text-field>
							<v-text-field 
								label="Phone" 
								v-model="formData.student.guardian1_phone"
							></v-text-field>
							<v-text-field 
								label="Whatsapp" 
								v-model="formData.student.guardian1_whatsapp"
							></v-text-field>
						</v-card-text>
					</v-card>

				</v-col>
				<v-col>
					<v-card class="ma-2" variant="flat">
						<v-card-title>
							Guardian 2 Details
						</v-card-title>
						<v-card-text>
							<v-text-field 
								label="Name" 
								v-model="formData.student.guardian2_name "
							></v-text-field>
							<v-text-field 
								label="E-Mail" 
								v-model="formData.student.guardian2_email"
							></v-text-field>
							<v-text-field 
								label="Phone" 
								v-model="formData.student.guardian2_phone"
							></v-text-field>
							<v-text-field 
								label="Whatsapp" 
								v-model="formData.student.guardian2_whatsapp"
							></v-text-field>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
			<SubmitButton :onSubmit="submitForm" :submitText="actionName" />
			<DeleteButton :action="() => deleteStudent(student?.id)" :name="'Student ' + student?.user_details?.full_name" />
		</v-card-text>
	</v-card>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import SubmitButton from "@/components/SubmitButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import { computed, onMounted, ref } from "vue";
import { deleteStudent } from "../api";

const props = defineProps({
	student: {
		type: Object,
		default: null,
	},
	user: {
		type: Object,
		default: null,
	},
	action: {
		type: Function,
		required: true,
	},
	actionName: {
		type: String,
		default: "Save",
	},
	title: {
		type: String,
		default: "Student",
	},
	subtitle: {
		type: String,
		default: "",
	},
});

// Initialize form data with default values
const formData = ref({
	// Student-specific fields
	user: {},
	student: {},
});

const submitForm = async () => {
	try {
		// Call the action passed from parent
		console.log(formData.value);
		return await props.action(formData.value);
	} catch (error) {
		console.error("Error submitting form:", error);
		return { success: false, error };
	}
};

onMounted(() => {
	if (props.student) {
		// Copy student data to form data
		formData.value = {
			...formData.value,
			student: props.student,
		};
	}
	if (props.user) {
		// Copy user data to form data
		formData.value = {
			...formData.value,
			user: props.user,
		};
	}
});
</script> 
