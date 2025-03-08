import { api } from "@/services/api";

export const createViewset = (baseUrl, filename = "export") => ({
	// List all records with optional filtering
	list: async (filter = {}) =>
		(
			await api.get(`${baseUrl}/all`, {
				params: { ...filter },
			})
		).data,

	// Get single record by ID
	retrieve: async (id) => (await api.get(`${baseUrl}/${id}`)).data,

	// Create new record
	create: async (data) => (await api.post(`${baseUrl}/create/`, data)).data,

	// Update existing record
	update: async (data) => (await api.put(`${baseUrl}/${data.id}/`, data)).data,

	// Export records (if supported)
	export: async (filter = {}) => {
		const response = await api.get(`${baseUrl}/export/`, {
			params: filter,
			responseType: "blob",
		});

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `${filename}.csv`);
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);
	},

	// Import records (if supported)
	import: {
		dryRun: async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			return (
				await api.post(`${baseUrl}/import/dry_run/`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
			).data;
		},

		finalize: async (file) => {
			const formData = new FormData();
			formData.append("file", file);
			return (
				await api.post(`${baseUrl}/import/final/`, formData, {
					headers: { "Content-Type": "multipart/form-data" },
				})
			).data;
		},
	},

	// Get stats (if supported)
	stats: async () => (await api.get(`${baseUrl}/stats/`)).data,
});
