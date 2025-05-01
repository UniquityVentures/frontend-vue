<template>
			<v-row>
				<v-col cols="12" md="6">
					<v-text-field 
						label="Identifier Number" 
						v-model="formData.identifier"
						type="number"
					></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6">
					<v-text-field 
						label="Phone" 
						v-model="formData.phone"
					></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field 
						label="Whatsapp" 
						v-model="formData.whatsapp"
					></v-text-field>
				</v-col>
			</v-row>

		<v-card-text>
			<SubmitButton :onSubmit="submitForm" :submitText="actionName" />
			<DeleteButton :action="() => deleteTeacher(teacher?.id)" :name="'Teacher ' + teacher?.user_details?.full_name" />
		</v-card-text>
</template>

<script setup>
import SubmitButton from "@/components/SubmitButton.vue";
import DeleteButton from "@/components/DeleteButton.vue";
import { onMounted, ref } from "vue";
import { deleteTeacher } from "../api";

const props = defineProps({
	teacher: {
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
		default: "Teacher",
	},
	subtitle: {
		type: String,
		default: "",
	},
});

// Initialize form data with default values
const formData = ref({
	user: {},
	teacher: {},
});

const submitForm = async () => {
	try {
		// Call the action passed from parent
		return await props.action(formData.value);
	} catch (error) {
		console.error("Error submitting form:", error);
		return { success: false, error };
	}
};

onMounted(() => {
	if (props.teacher) {
		// Copy teacher data to form data
		formData.value = {
			...formData.value,
			teacher: props.teacher,
		};
	}
});
</script> 
