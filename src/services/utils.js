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
