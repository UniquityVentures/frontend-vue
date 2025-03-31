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
import { createAnnouncement } from "@/apps/announcements/api";
import AnnouncementForm from "../components/AnnouncementForm.vue";
</script>
