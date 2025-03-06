# Components

How components are handled in the project.

## Responsive Data Table

### Props

- Data to populate the table (fetch function)
- Headers
- Filter (v-model) 

### Handling

- The fetch function is defined in the `api.js` file.
- The headers - there is a `defaultAnnouncementHeaders` array defined in the `config.js` file, and it is used mostly, however, for custom requirements, you should either define a new array or use use the old one and override some fields.

## Filter Card

### Props

- Fields
- Export function

### Handling

- The fields - there is a `defaultAnnouncementFields` array defined in the `config.js` file, and it is used mostly, however, for custom requirements, you should either define a new array or use use the old one and override some fields.

## Form

### Props

- model: this has an array of fields, each field has a name, label, type, and value.
- action: this is the function to call when the form is submitted.


