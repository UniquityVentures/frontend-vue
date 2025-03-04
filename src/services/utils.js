
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