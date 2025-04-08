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

export const toApiDate = (unparsedDate) => {
	const date = new Date(unparsedDate);
	return date.toISOString().slice(0, 10)
}

export const toApiDateTime = (unparsedDate) => {
	const date = new Date(unparsedDate);
	return date.toISOString()
}

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
	if (typeof error === 'string') {
		return error
	}
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
	return [...m.values()];
};

