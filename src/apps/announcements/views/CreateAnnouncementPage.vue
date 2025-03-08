<template>
	<v-container>
		<FormCard
			title="Announcement"
			actionName="Create"
			:model="announcementDefaultFormFields"
			:action="createAnnouncement"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { createAnnouncement } from "../api";
import { announcementDefaultFormFields } from "../config";
</script>
