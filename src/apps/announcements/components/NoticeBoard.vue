<template>
	<v-container>
		<ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters"
			title="Notice Board" subtitle="Announcements shown here" :templates="{ desktop: 'card', mobile: 'card' }"
			hideFilters>
			<template #cards-slot="{ items }">
				<Masonry v-if="items"
					title="Notice Board"
					subtitle="Notice Board"
					:items="items"
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
			</template>
		</ResponsiveDataTable>
	</v-container>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import Masonry from "@/components/Masonry.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

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

const filters = props.filters;


</script>
