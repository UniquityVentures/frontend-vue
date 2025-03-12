<template>
	<v-container>
		<FormCard
			title="Announcement"
			actionName="Create"
			:formFields="announcementDefaultFormFields"
			:action="createAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { createAnnouncement } from "@/apps/announcements/api";
import { announcementDefaultFormFields } from "@/apps/announcements/config";
</script>
