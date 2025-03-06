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

export const keyHandler = (item, fieldConfig) => {
    if (!fieldConfig || !fieldConfig.key) return '';

    if (typeof fieldConfig === 'function') {
        return fieldConfig(item);
    }

    // Handle nested properties using dot notation (e.g. "subject_details.name")
    if (fieldConfig.key && fieldConfig.key.includes('.')) {
        const keys = fieldConfig.key.split('.');
        let value = item;
        for (const key of keys) {
            value = value?.[key];
            if (value === undefined) break;
        }
        return value || fieldConfig.default || '';
    }

    return item?.[fieldConfig.key] || fieldConfig.default || '';
};