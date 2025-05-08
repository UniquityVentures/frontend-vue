<template>
	<v-container>
		<ResponsiveDataTable :fetch="getReplacements" v-model:filters="filters"
			title="Replacements" subtitle="Global Replacements"
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
							v-model="item.source"
							label="Source"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="item.target"
							label="Target"
							required
						></v-text-field>
					</v-col>
					<!--- Actions ---->
					<v-col cols="6" lg="3">
						<SubmitButton :onSubmit="() => updateReplacement(item)" submitText="Update" />
						<DeleteButton :action="() => deleteReplacement(item.id)"
							:name="'Replacement ' + item.key"  
							@deleted="filters = {...filters}"
						/>
					</v-col>
				</v-row>
			</template>
			<template #actions-slot>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="newReplacement.app_name"
							label="App Name"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3"  >
						<v-text-field
							v-model="newReplacement.source"
							label="Source"
							required
						></v-text-field>
					</v-col>
					<v-col cols="12" lg="3">
						<v-text-field
							v-model="newReplacement.target"
							label="Target"
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
import { getReplacements, updateReplacement, deleteReplacement, createReplacement  } from "../api";
import { ref } from "vue";
import SubmitButton from "@/components/SubmitButton.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import DeleteButton from "@/components/DeleteButton.vue";

const filters = ref({});

const newReplacement = ref({});

const handleCreate = () => {
	const result = createReplacement(newReplacement.value)
	filters.value = {...filters.value};
	return result
}

</script>
