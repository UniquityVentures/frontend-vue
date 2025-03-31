/**
 * Shared field type definitions for FilterCard and FormCard components
 *
 * This ensures consistency across the application when using form and filter fields
 */

// Common field types that can be used in both filter and form cards
export const FIELD_TYPES = {
	// Basic types
	STRING: "string",
	LONGSTRING: "longstring",
	INTEGER: "integer",
	NUMBER: "number",
	BOOLEAN: "boolean",

	// Date types
	DATE: "date",
	DATETIME: "datetime",
	DATE_RANGE: "date_range",

	// Selection types
	SELECT: "select",
	MULTI_SELECT: "multi_select",

	// Entity types - singular
	BATCH: "batch",
	COURSE: "course",
	TEACHER: "teacher",
	STUDENT: "student",
	PAYEE: "payee",
	PAYMENT_PURPOSE: "payment_purpose",

	// Entity types - plural (multiple selection)
	BATCHES: "batches",
	COURSES: "courses",
	TEACHERS: "teachers",
	STUDENTS: "students",
	PAYEES: "payees",

	// File types
	FILE: "file",
	ATTACHMENT: "attachment",
	ATTACHMENT_LIST: "attachment_list",
	N_NARY: "n_nary",
};

// Field width patterns
export const getFieldWidth = (fieldType) => {
	// Full width fields
	if (
		[
			FIELD_TYPES.LONGSTRING,
			FIELD_TYPES.ATTACHMENT,
			FIELD_TYPES.ATTACHMENT_LIST,
			FIELD_TYPES.DATE_RANGE,
		].includes(fieldType)
	) {
		return { cols: 12, md: 12, lg: 12 };
	}

	// Quarter width fields
	if ([FIELD_TYPES.BOOLEAN].includes(fieldType)) {
		return { cols: 6, md: 4, lg: 3 };
	}

	// Default - half width fields
	return { cols: 12, md: 6, lg: 4 };
};

// Default value handlers
export const getDefaultEmptyValue = (fieldType) => {
	if ([FIELD_TYPES.STRING, FIELD_TYPES.LONGSTRING].includes(fieldType)) {
		return "";
	}

	if (
		[FIELD_TYPES.MULTI_SELECT, FIELD_TYPES.ATTACHMENT_LIST].includes(
			fieldType,
		) ||
		[
			FIELD_TYPES.BATCHES,
			FIELD_TYPES.COURSES,
			FIELD_TYPES.TEACHERS,
			FIELD_TYPES.STUDENTS,
			FIELD_TYPES.PAYEES,
		].includes(fieldType)
	) {
		return [];
	}

	if (fieldType === FIELD_TYPES.BOOLEAN) {
		return false;
	}

	return null;
};
