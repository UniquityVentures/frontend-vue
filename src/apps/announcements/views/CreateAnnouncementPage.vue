<template>
	<v-container>
		<AnnouncementForm
			:announcement = "$route.query"
			actionName="Create"
			:action="createAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import AnnouncementForm from "../components/AnnouncementForm.vue";
import { createAnnouncement } from "@/apps/announcements/api";
</script>
