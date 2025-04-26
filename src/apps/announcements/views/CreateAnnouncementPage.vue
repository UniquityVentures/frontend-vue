<template>
	<v-container>
		<AnnouncementForm
			:announcement = "$route.query"
			actionName="Create"
			:action="handleCreate"
		/>
	</v-container>
</template>

<script setup>
import { createAnnouncement } from "@/apps/announcements/api";
import AnnouncementForm from "../components/AnnouncementForm.vue";
import { useRouter } from "vue-router";
import {accountRoute} from "@/services/api";

const router = useRouter();

const handleCreate = async (data) => {
	const resp = await createAnnouncement(data);
	router.push(
		accountRoute("Announcement", { params: { announcementId: resp.id } }),
	);
	return resp;
};
</script>
