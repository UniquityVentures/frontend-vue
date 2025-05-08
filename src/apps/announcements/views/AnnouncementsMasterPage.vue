<template>
  <v-container>
		<AnnouncementsLookup
			:defaultFilters = "$route.query"
			title="Announcements Master"
			subtitle="Announcements Master List"
		/>
	</v-container>
</template>

<script setup>
import AnnouncementsLookup from "../components/AnnouncementsLookup.vue";
</script>
