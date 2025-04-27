<template>
  <v-container>
    <v-row v-if="announcement">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-card>
              <v-card-title>{{ announcement?.title }}</v-card-title>

              <v-card-text>
                <p>{{ announcement?.description }}</p>
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Signed by:</h4>
                <TeacherListItem :teacher="announcement?.signed_by_details" />
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Dates:</h4>
                <DateChip color="primary" label="Release" :date="announcement.release_at" />
                <DateChip color="red" label="Expiry" :date="announcement.expriy_at" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-skeleton-loader v-else type="card, card-heading, card-text" />
  </v-container>
</template>

<script setup>
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import DateChip from "@/components/DateChip.vue";
import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";

const announcement = ref({});
const props = defineProps({
  announcementId: [Number, String],
});

const fetchDetails = async () => {
  announcement.value = await getAnnouncement(props.announcementId);
};

onMounted(fetchDetails);
</script>
