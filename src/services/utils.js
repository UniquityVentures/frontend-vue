export const formatDate = (dateString) =>
	Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	}).format(Date.parse(dateString));
