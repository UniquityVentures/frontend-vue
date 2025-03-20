# Lookup Components

## Table of Contents

- [Overview](#overview)
- [Component Structure](#component-structure)
  - [Template](#template)
  - [Script Setup](#script-setup)
- [Props](#props)
- [Field Definitions](#field-definitions)
  - [Available Field Types](#available-field-types)
  - [Date Range Naming Convention](#date-range-naming-convention)
- [Header Definitions](#header-definitions)
- [API Integration](#api-integration)
- [Customization Options](#customization-options)
  - [Desktop and Mobile Templates](#desktop-and-mobile-templates)
  - [Custom Item Templates](#custom-item-templates)
- [Best Practices](#best-practices)
- [Example Implementation](#example-implementation)

## Overview

Lookup components are standardized, reusable Vue components designed to display filterable, searchable data tables across the application. They provide a consistent user interface for listing, filtering, and navigating to detail views of various data types.

## Component Structure

### Template

```vue
<template>
    <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportFunction" v-model:filters="filters" />
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable
                :getToFunction="getToFunction"
                :headers="defaultHeaders"
                :fetch="fetchFunction"
                v-model:filters="filters"
                desktopTemplate="table|card|list"
                mobileTemplate="list|card"
            />
        </v-card-text>
    </v-card>
</template>
```

### Script Setup

```javascript
<script setup>
import { ref, onMounted } from "vue";
import { getFunctionName, exportFunctionName } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
});

// Define default headers
const defaultHeaders = [
    { label: "Label1", key: "field1" },
    { label: "Label2", key: "field2", type: "type" },
    // Additional headers as needed
];

// Define default filter fields
const defaultFilterFields = [
    { label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
    // Additional filter fields as needed
];

// Initialize fields with proper reactivity handling
const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});

// Make sure to update fields when overrideFields changes
onMounted(() => {
    // Force reactivity update for fields if coming from props
    if (props.overrideFields) {
        fields.value = JSON.parse(JSON.stringify(props.overrideFields));
    }
});
</script>
```

## Props

| Prop             | Type    | Default | Description                                   |
|------------------|---------|---------|-----------------------------------------------|
| `overrideFields` | Array   | null    | Custom fields to override defaultFilterFields |
| `title`          | String  | null    | Component title                               |
| `subtitle`       | String  | null    | Component subtitle                            |

## Field Definitions

Fields define the filters available in the FilterCard. The standard structure is:

```javascript
{
    label: "Human readable label",
    type: FIELD_TYPES.TYPE_CONSTANT,
    key: "backend_field_name", // or ["start_field", "end_field"] for ranges
    value: initialValue,
    defaultValue: resetValue,
    // Optional properties based on field type
    fetchOptions: () => [{title: "Option 1", value: "value1"}, ...]
}
```

### Available Field Types

- `FIELD_TYPES.STRING` - Text search
- `FIELD_TYPES.NUMBER` - Numeric filter
- `FIELD_TYPES.DATE` - Single date filter
- `FIELD_TYPES.DATE_RANGE` - Date range filter
- `FIELD_TYPES.BOOLEAN` - Boolean/checkbox filter
- `FIELD_TYPES.N_NARY` - Dropdown selection
- `FIELD_TYPES.TEACHER` - Teacher selector
- `FIELD_TYPES.STUDENT` - Student selector
- `FIELD_TYPES.COURSE` - Course selector
- `FIELD_TYPES.BATCH` - Batch selector

### Date Range Naming Convention

For date range fields, use the following naming convention:
```javascript
{ 
    label: "Date Range", 
    type: FIELD_TYPES.DATE_RANGE, 
    key: ["field_name_start", "field_name_end"], 
    value: null 
}
```

## Header Definitions

Headers define the columns displayed in the ResponsiveDataTable. The standard structure is:

```javascript
{
    label: "Human readable label",
    key: "data_field", // Can use dot notation for nested objects
    type: "data_type" // Optional, defaults to string
}
```

## API Integration

Each Lookup component should import two key functions from its associated API file:

1. A fetch function (e.g., `getStudents`) - Used to retrieve the data
2. An export function (e.g., `exportStudents`) - Used for exporting filtered data

Example API file structure:

```javascript
import { createViewset } from "@/services/viewset";

const viewset = createViewset("api/path/to/resource");

// Extract specific functions
const getResources = viewset.list;
const getResource = viewset.retrieve;
const updateResource = viewset.update;
const createResource = viewset.create;
const exportResources = viewset.export;
const importResources = {
    dryRun: viewset.import.dryRun,
    finalize: viewset.import.finalize,
};

// Optional helper function for constructing object representations
const getResourceInfoFromObj = (item) => ({
    title: item.name,
    subtitle: item.identifier,
    value: item.id,
});

export {
    getResources,
    getResource,
    updateResource,
    createResource,
    exportResources,
    importResources,
    getResourceInfoFromObj,
};
```

## Customization Options

### Desktop and Mobile Templates

The ResponsiveDataTable component supports different display modes:

- `table` - Traditional table layout (default for desktop)
- `card` - Card-based grid layout
- `list` - List-based layout (default for mobile)

Set these via the `desktopTemplate` and `mobileTemplate` props.

### Custom Item Templates

For specialized rendering, provide named slots to the ResponsiveDataTable:

```vue
<ResponsiveDataTable :headers="defaultHeaders" :fetch="getItems" v-model:filters="filters">
    <template #card-item-slot="{ item }">
        <!-- Custom card template -->
    </template>
    <template #list-item-slot="{ item }">
        <!-- Custom list template -->
    </template>
</ResponsiveDataTable>
```

## Best Practices

1. **Consistent Naming**: Always use `defaultFilterFields` for filter definitions
2. **Field Structure**: Follow the standard field structure with all required properties
3. **onMounted Hook**: Always include the onMounted hook to handle prop changes
4. **Date Range Keys**: Follow the naming pattern `[field_name + "_start", field_name + "_end"]`
5. **v-card Element**: Don't use `variant="flat"` on the v-card component
6. **Defaults**: Set default title and subtitle to `null`
7. **Function Imports**: Import specific functions from API files, not entire viewsets
8. **Filter Keys**: Ensure filter keys match the backend field names exactly

## Example Implementation

```vue
<template>
    <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportStudents" v-model:filters="filters" />
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable 
                :getToFunction="(item) => ({ name: 'Student', params: { studentId: item.id } })"
                :headers="defaultHeaders"
                :fetch="getStudents"
                v-model:filters="filters" 
            />
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getStudents, exportStudents } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: null,
    },
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
});

const defaultHeaders = [
    { label: "Name", key: "user_details.full_name" },
    { label: "Student No", key: "student_no" },
    { label: "Batch", key: "batch_details", type: "batch" },
    { label: "Roll Number", key: "roll_no" },
];

const defaultFilterFields = [
    { label: "Search by name", type: FIELD_TYPES.STRING, key: "name", value: "", defaultValue: "" },
    { label: "Filter by batch", type: FIELD_TYPES.BATCH, key: "batch", value: null },
    { label: "Enrollment Date Range", type: FIELD_TYPES.DATE_RANGE, key: ["enrolled_start", "enrolled_end"], value: null },
];

const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});

onMounted(() => {
    if (props.overrideFields) {
        fields.value = JSON.parse(JSON.stringify(props.overrideFields));
    }
});
</script>
