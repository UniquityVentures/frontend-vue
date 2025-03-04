# Components

How components are handled in the project.

## Responsive Data Table

### Requirements

- Data to populate the table
- Headers
- Filter (v-model) 

### Handling

- The function to get the data - `getModels` is defined in the `api.js` file and called and used in the `ResponsiveDataTable` component.
- The headers - there is a `defaultAnnouncementHeaders` array defined in the `config.js` file, and it is used mostly, however, for custom requirements, you should either define a new array or use use the old one and override some fields.

## Filter Card

### Requirements

- Fields
- Export function

### Handling

- The fields - there is a `defaultAnnouncementFields` array defined in the `config.js` file, and it is used mostly, however, for custom requirements, you should either define a new array or use use the old one and override some fields.

## Form

### Requirements

- fields
- submit function

