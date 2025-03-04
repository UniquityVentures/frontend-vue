export const formatDate = (dateString) =>
    Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(Date.parse(dateString));

export const formatDateTime = (dateString) => {
	return new Date(dateString).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
	});
};

// Convert API datetime string to HTML datetime-local input format
export const apiToFormDateTime = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().slice(0, 16);
};

// Convert HTML datetime-local input value to API format
export const formToApiDateTime = (dateString) => {
    if (!dateString) return null;
    return new Date(dateString).toISOString();
};