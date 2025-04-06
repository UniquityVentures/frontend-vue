<template>
  <v-container>
		<AnnouncementsLookup
			:defaultFilters = "$route.query"
		/>
	</v-container>
</template>

<script setup>
import AnnouncementsLookup from "../components/AnnouncementsLookup.vue";
</script>
