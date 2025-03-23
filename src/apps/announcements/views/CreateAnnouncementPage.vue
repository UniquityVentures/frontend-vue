<template>
	<v-container>
		<AnnouncementForm
			actionName="Create"
			:action="createAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import AnnouncementForm from "../components/AnnouncementForm.vue";
import { createAnnouncement } from "@/apps/announcements/api";
</script>
