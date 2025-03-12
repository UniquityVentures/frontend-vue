<template>
    <v-card>
        <!-- Title and Subtitle (Conditional Rendering) -->
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>

        <v-card-text>
            <!-- Items List or Loading Skeleton -->
            <v-list :lines="config.lines || 'two'" density="compact"
                v-if="!loading && limitedItems.length">
                <v-list-item v-for="item in limitedItems" :key="item.id || index" class="border"
                :to="config.listItemRoute ? config.listItemRoute(item) : null"
                :disabled="!config.listItemRoute"
                :link="!!config.listItemRoute">
                    <!-- Primary Content -->
                    <v-list-item-title v-if="config.listItemTitle">
                        {{ keyHandler(item, config.listItemTitle) }}
                    </v-list-item-title>

                    <!-- Secondary Content -->
                    <v-list-item-subtitle v-if="config.listItemSubtitle">
                        {{ keyHandler(item, config.listItemSubtitle) }}
                    </v-list-item-subtitle>

                    <!-- Additional Content (Chips, etc.) -->
                    <div v-if="config.listItemChips && config.listItemChips.length">
                        <template v-for="(chipConfig, chipIndex) in config.listItemChips" :key="chipIndex">
                            <v-chip v-if="chipConfig.type === 'chip'" size="small" :color="chipConfig.color || 'primary'">
                                {{ `${chipConfig.label}: ${keyHandler(item, chipConfig)}` }}
                            </v-chip>
                            <TeacherChip v-if="chipConfig.type === 'teacher'" :teacher="keyHandler(item, chipConfig)" />
                            <v-chip v-if="chipConfig.type === 'datetime'" :color="chipConfig.color || 'primary'" size="small">
                                {{ `${chipConfig.label}: ${formatDateTime(keyHandler(item, chipConfig))}` }}
                            </v-chip>
                        </template>
                    </div>
                </v-list-item>
            </v-list>

            <!-- Loading Skeleton -->
            <v-skeleton-loader v-if="loading" type="list-item" :loading="loading" class="ma-2" />

            <!-- No Items Message -->
            <div v-if="!loading && !items.length" class="text-center pa-4">
                {{ config.emptyMessage || 'No items available' }}
            </div>
        </v-card-text>

        <!-- 'View All' Button -->
        <v-card-actions v-if="viewAllRoute" class="justify-center">
            <v-btn :to="{ name: viewAllRoute }">
                {{ 'View All' }}
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { keyHandler, formatDateTime } from "@/services/utils";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";

const props = defineProps({
    // Data and API function
    items: { type: Array, default: () => [] },
    fetchFunction: { type: Function },
    filter: { type: Object, default: () => ({}) },

    // UI configuration
    config: {
        type: Object,
        required: true,
        // Example structure:
        // {
        //   primaryField: { key: 'title', default: 'Untitled' },
        //   secondaryField: { key: 'description', default: 'No description' },
        //   chips: [
        //     { 
        //       label: 'Signed By',
        //       key: 'signed_by_details.user_details.full_name',
        //       color: 'primary'
        //     }
        //   ],
        //   detailRoute: 'Announcement',
        //   detailParamKey: 'announcementId',
        //   viewAllRoute: 'Announcements',
        // }
    },

    // Basic display properties
    title: String,
    subtitle: String,
    viewAllRoute: String,
    limit: { type: Number, default: 5 },    
});

const items = ref(props.items || []);
const loading = ref(!!props.fetchFunction);

// Limit items displayed
const limitedItems = computed(() => {
    const limit = props.limit;
    return items.value.slice(0, limit);
});

// Fetch data if a fetch function is provided
onMounted(async () => {
    if (props.fetchFunction) {
        try {
            loading.value = true;
            const response = await props.fetchFunction(props.filter);
            items.value = response?.results || [];
        } catch (error) {
            console.error("Failed to fetch items:", error);
        } finally {
            loading.value = false;
        }
    }
});
</script>
