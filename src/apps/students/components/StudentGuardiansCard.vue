<template>
  <v-card v-if="student && (student.guardian1_name || student.guardian2_name)">
    <v-card-title>Guardians</v-card-title>
    
    <v-card-text>
      <v-list-item v-if="student.guardian1_name" class="border mb-2">
        <template v-slot:prepend>
          <v-avatar color="primary" variant="tonal">
            <v-icon>mdi-account-child</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{ student.guardian1_name }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-icon size="small" class="me-1">mdi-email</v-icon>
          {{ student.guardian1_email }}
        </v-list-item-subtitle>

				<v-chip color="primary" size="small" :href="`tel:${student.guardian1_phone}`">
					<v-icon start size="small">mdi-phone</v-icon>
					{{ student.guardian1_phone }}
				</v-chip>
				<v-chip color="success" size="small" :href="`https://wa.me/${student.guardian1_whatsapp}`">
					<v-icon start size="small">mdi-whatsapp</v-icon>
					{{ student.guardian1_whatsapp }}
				</v-chip>

      </v-list-item>

      <v-list-item v-if="student.guardian2_name" class="border">
        <template v-slot:prepend>
          <v-avatar color="primary" variant="tonal">
            <v-icon>mdi-account-child</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title>{{ student.guardian2_name }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-icon size="small" class="me-1">mdi-email</v-icon>
          {{ student.guardian2_email }}
        </v-list-item-subtitle>

				<v-chip color="primary" size="small" :href="`tel:${student.guardian2_phone}`">
					<v-icon start size="small">mdi-phone</v-icon>
					{{ student.guardian2_phone }}
				</v-chip>
				<v-chip color="success" size="small" :href="`https://wa.me/${student.guardian2_whatsapp}`">
					<v-icon start size="small">mdi-whatsapp</v-icon>
					{{ student.guardian2_whatsapp }}
				</v-chip>

      </v-list-item>
    </v-card-text>
  </v-card>
</template>

<script setup>
const props = defineProps({
	student: {
		type: Object,
		required: true,
	},
});
</script>
