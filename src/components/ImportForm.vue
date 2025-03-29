<template>
    <v-form @submit.prevent="handleSubmit">
        <v-row>
            <v-col cols="12">
                <!-- Step 1: File Upload -->
                <div v-if="step === 1" class="my-4">
                    <v-file-input v-model="file" :label="`Select ${entityName} file (CSV or Excel)`"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        outlined :error-messages="fileError" @update:model-value="fileError = ''"></v-file-input>

                    <v-btn color="primary" @click="downloadTemplate" class="mt-4">
                        <v-icon left>mdi-download</v-icon>
                        Download Template
                    </v-btn>

                    <v-btn type="submit" color="primary" class="mt-4 ml-4" :loading="loading" :disabled="!file">
                        Validate File
                    </v-btn>
                </div>

				<v-alert type="error" v-if="error?.length">
					<p>Validation failed with the following errors:</p>

					<ul v-if="Array.isArray(error)">
						<li v-for="(e, index) in error" :key="index">
							{{ e }}
						</li>
					</ul>
					<span v-else>
						{{error}}
					</span>
				</v-alert>

                <!-- Step 2: Validation Results -->
                <div v-if="step === 2" class="my-4">
                    <v-alert type="success" v-if="!error">
                        Validation successful! {{ validationResults?.row_count || 0 }} {{ entityName.toLowerCase() }} ready
                        to import.
                    </v-alert>

                    <v-alert type="error" v-if="error?.length">
                        <p>Validation failed with the following errors:</p>
                        <ul v-if="Array.isArray(error)">
                            <li v-for="(e, index) in error" :key="index">
                                {{ e }}
                            </li>
                        </ul>
						<span v-else>
							{{error}}
						</span>
                    </v-alert>

                    <v-data-table v-if="preview" 
                        :items="preview" class="my-4" dense></v-data-table>

                    <v-btn @click="step = 1" class="mt-4">
                        <v-icon left>mdi-arrow-left</v-icon>
                        Back
                    </v-btn>

                    <v-btn v-if="!error" color="success" @click="finalizeImport" :loading="loading"
                        class="mt-4 ml-4">
                        <v-icon left>mdi-check</v-icon>
                        Finalize Import
                    </v-btn>
                </div>

                <!-- Step 3: Import Results -->
                <div v-if="step === 3" class="my-4">
                    <v-alert type="success" v-if="importResults?.success">
                        Successfully imported {{ importResults?.count || 0 }} {{ entityName.toLowerCase() }}!
                    </v-alert>

                    <v-alert type="error" v-if="importResults?.errors?.length">
                        <p>Import completed with the following errors:</p>
                        <ul>
                            <li v-for="(error, index) in importResults.errors" :key="index">
                                {{ error }}
                            </li>
                        </ul>
                    </v-alert>

                    <v-btn @click="resetForm" color="primary" class="mt-4">
                        Start New Import
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </v-form>
</template>

<script setup>
import { ref } from "vue";
import { formatErrorMessage } from "@/services/utils";

const props = defineProps({
	entityName: {
		type: String,
		required: true,
	},
	import: {
		type: { dryRun: Function, finalize: Function },
		required: true,
	},
	templateFields: {
		type: Array,
		required: true,
	},
});

const preview = ref(null);

// Form state
const step = ref(1);
const file = ref(null);
const fileError = ref("");
const loading = ref(false);
const error = ref("");
const validationResults = ref(null);
const importResults = ref(null);

// Handle form submission (validation step)
const handleSubmit = async () => {
	if (!file.value) {
		fileError.value = "Please select a file to import";
		return;
	}

	try {
		loading.value = true;
		error.value = "";

		// Call dry run API function
		const response = await props.import.dryRun(file.value);
		validationResults.value = response;
		preview.value = validationResults.value?.preview?.map((row) => {
			return Object.fromEntries(
				row.map((value, index) => [validationResults.value.headers[index], value]),
			);
		});
		step.value = 2;
		error.value = null;
	} catch (err) {
		error.value = formatErrorMessage(err);
		console.error("Validation error:", err);
	} finally {
		loading.value = false;
	}
};

// Finalize the import
const finalizeImport = async () => {
	try {
		loading.value = true;
		error.value = "";

		// Call finalize API function
		console.log(file.value);
		const response = await props.import.finalize(file.value);

		importResults.value = response;
		step.value = 3;
	} catch (err) {
		error.value = formatErrorMessage(err);
		console.error("Import error:", err);
	} finally {
		loading.value = false;
	}
};

// Reset the form to start over
const resetForm = () => {
	step.value = 1;
	file.value = null;
	fileError.value = "";
	validationResults.value = null;
	importResults.value = null;
	error.value = "";
};

// Download a template CSV file
const downloadTemplate = () => {
	// Create CSV header row
	const header = props.templateFields.join(",");

	// Create an empty CSV with just the header
	const csvContent = `${header}\n`;

	// Create a Blob containing the CSV data
	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

	// Create a temporary URL for the Blob
	const url = URL.createObjectURL(blob);

	// Create a temporary link element
	const link = document.createElement("a");
	link.href = url;
	link.setAttribute(
		"download",
		`${props.entityName.toLowerCase()}_template.csv`,
	);

	// Append the link to the document body
	document.body.appendChild(link);

	// Trigger the download
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(url);
};
</script>
