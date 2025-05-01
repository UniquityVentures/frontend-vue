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
					<v-text-field label="First Name" v-model="formData.first_name"
						:rules="[v => !!v || 'First name is required']" required></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field label="Last Name" v-model="formData.last_name"
						:rules="[v => !!v || 'Last name is required']" required></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="12" md="6">
					<v-text-field label="E-Mail" v-model="formData.email" :rules="[v => !!v || 'Email is required']"
						type="email" required></v-text-field>
				</v-col>

				<v-col cols="12" md="6">
					<v-text-field label="Username" v-model="formData.username" :rules="[v => !!v || 'Username is required']"
						required></v-text-field>
				</v-col>
			</v-row>
			<v-row>
				<v-col cols="12" md="6">
					<v-checkbox label="Is Active" v-model="formData.is_active"></v-checkbox>
				</v-col>

				<v-col cols="12" md="6">
					<v-checkbox label="Is Approved" v-model="formData.is_approved"></v-checkbox>
				</v-col>
			</v-row>
		</v-card-text>
		<v-card-text>
			<SubmitButton :onSubmit="() => action(formData)" :submitText="actionName" />
		</v-card-text>
	</v-card>
</template>

<script setup>
import { ref, watch } from "vue";
import SubmitButton from "@/components/SubmitButton.vue";
const props = defineProps({
	action: {
		type: Function,
		required: true,
	},
	actionName: {
		type: String,
		default: "Create User",
	},
	title: {
		type: String,
		default: "User",
	},
	subtitle: {
		type: String,
		default: "",
	},
});

const formData = ref({
	is_active: true,
	is_approved: false,
});

const model = defineModel();

watch(
	model,
	(v) => {
		if (v) {
			formData.value = {
				...v,
			};
		}
	},
	{ deep: true, immediate: true },
);
</script>
