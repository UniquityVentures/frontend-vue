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
	if (!fieldConfig || !fieldConfig.key) return "";

	if (typeof fieldConfig === "function") {
		return fieldConfig(item);
	}

	// Handle nested properties using dot notation (e.g. "course_details.name")
	if (fieldConfig.key?.includes(".")) {
		const keys = fieldConfig.key.split(".");
		let value = item;
		for (const key of keys) {
			value = value?.[key];
			if (value === undefined) break;
		}
		return value || fieldConfig.default || "";
	}

	return item?.[fieldConfig.key] || fieldConfig.default || "";
};

export const toHeaderCase = (str) => {
	let shouldCapitalize = true;
	let outputString = "";
	for (const c of str) {
		if (!isAlphabet(c)) {
			shouldCapitalize = true;
			if (c === "_") {
				outputString = `${outputString} `;
			} else {
				outputString = `${outputString}${c}`;
			}
		} else if (shouldCapitalize) {
			outputString = `${outputString}${c.toUpperCase()}`;
			shouldCapitalize = false;
		} else {
			outputString = `${outputString}${c}`;
		}
	}
	return outputString;
};

export const formatErrorMessage = (error) => {
	if (error.response) {
		const { status, data } = error.response;
		// Handle 400 Bad Request
		if (status === 400) {
			const errors = objToString(data);
			return errors;
		}
		// Handle other status codes
		return data.detail || `Server returned ${status}`;
	}
	return error.message;
};

export const objToString = (data) => {
	if (Array.isArray(data)) {
		return data.map(objToString).join(", ");
	}
	if (typeof data === "string") {
		return data;
	}
	if (typeof data === "object") {
		return Object.entries(data).map(
			([field, message]) => `${field}: ${objToString(message)}`,
		);
	}
	return data;
};

const isAlphabet = (str) =>
	(str.codePointAt(0) > 64 && str.codePointAt(0) < 91) ||
	(str.codePointAt(0) > 96 && str.codePointAt(0) < 123);

export const fieldsToFilters = (fields) => {
	return fields.reduce((acc, field) => {
		if (Array.isArray(field.key)) {
			field.key.forEach((k, i) => {
				acc[k] = field.value?.[i] ?? null;
			});
		} else {
			acc[field.key] = field.value;
		}
		return acc;
	}, {});
};

export const dedup = (arr, keyFn) => {
	const m = new Map()
	for (const e of arr) {
		m.set(keyFn(e), e)
	}
	return m.values();
};

// Convert YYYY-MM-DD string to Date object
export const stringToDate = (dateString) => {
	if (!dateString) return null;
	
	// Make sure dateString is actually a string
	if (typeof dateString !== 'string') {
		console.warn('Expected string date format YYYY-MM-DD but got:', dateString);
		return null;
	}
	
	try {
		// Parse YYYY-MM-DD string to Date object
		const [year, month, day] = dateString.split('-').map(Number);
		return new Date(year, month - 1, day); // Month is 0-indexed in JS Date
	} catch (error) {
		console.error('Error parsing date string:', error);
		return null;
	}
};

// Convert Date to YYYY-MM-DD string
export const dateToString = (date) => {
	if (!date) return '';
	
	try {
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
		const day = String(date.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
	} catch (error) {
		console.error('Error formatting date:', error);
		return '';
	}
};
