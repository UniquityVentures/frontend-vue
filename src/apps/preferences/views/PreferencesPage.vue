<template>
	<v-container>
		<ResponsiveDataTable :fetch="getPreferences" v-model:filters="filters"
			title="Preferences" subtitle="Global Preferences"
			:templates="{ desktop: 'list', mobile: 'list' }"
		>
			<template #list-slot="{ items }">
				<v-row v-for="item in items" :key="item.id">
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="item.app_name"
							label="App Name"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3"  >
						<v-text-field
							v-model="item.key"
							label="Key"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="item.value"
							label="Value"
							required
						></v-text-field>
					</v-col>
					<!--- Actions ---->
					<v-col cols="6" lg="3">
						<SubmitButton :onSubmit="() => updatePreference(item)" submitText="Update" />
						<DeleteButton :action="() => deletePreference(item.id)"
							:name="'Preference ' + item.key"  
							@deleted="filters = {...filters}"
						/>
					</v-col>
				</v-row>
			</template>
			<template #actions-slot>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="newPreference.app_name"
							label="App Name"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3"  >
						<v-text-field
							v-model="newPreference.key"
							label="Key"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="newPreference.value"
							label="Value"
							required
						></v-text-field>
					</v-col>
					<v-col cols="6" lg="3">
						<SubmitButton :onSubmit="handleCreate" submitText="Create" />
					</v-col>
			</template>
		</ResponsiveDataTable>
	</v-container>
</template>

<script setup>
import { getPreferences, updatePreference, deletePreference,createPreference  } from "../api";
import { ref } from "vue";
import SubmitButton from "@/components/SubmitButton.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import DeleteButton from "@/components/DeleteButton.vue";

const filters = ref({});

const newPreference = ref({});

const handleCreate = () => {
	const result = createPreference(newPreference.value)
	filters.value = {...filters.value};
	return result
}

</script>
