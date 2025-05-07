<template>
	<v-container>
		<Masonry v-if="announcements"
			title="Notice Board"
			subtitle="Notice Board"
			v-model="announcements"
		>
			<template #content="{item}">
				<v-card v-if="item" :to="{ name: 'Announcement', params: { announcementId: item.id }}" variant="flat" class="border mb-2">
					<v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
					<v-card-text class="text-wrap">
						<TeacherChip label="Signed by" :teacher="item.signed_by_details" v-if="item.signed_by_details" />
					</v-card-text>
					<v-card-text>
						{{ item.description }}
					</v-card-text>
				</v-card>
			</template>
		</Masonry>
	</v-container>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import Masonry from "@/components/Masonry.vue";

const props = defineProps({
	title: {
		type: String,
		default: "Notice Board",
	},
	subtitle: {
		type: String,
		required: false,
	},
	filters: {
		type: Object,
		default: {},
	},
});

const announcements = ref([]);

onMounted(async () => {
	const temp = (await getAnnouncements(props.filters)).results;
	announcements.value = temp;
});
</script>
