<template>
    <v-card>
        <!-- Title and Subtitle (Conditional Rendering) -->
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>

        <v-card-text>
            <!-- Items List or Loading Skeleton -->
            <v-list :lines="config.lines || 'two'" :density="config.density || 'default'"
                v-if="!loading && limitedItems.length">
                <v-list-item v-for="item in limitedItems" :key="item.id || index" class="ma-1 pa-2 border">
                    <v-list-item-content>
                        <!-- Primary Content -->
                        <v-list-item-title>
                            {{ getFormattedValue(item, config.primaryField) }}
                        </v-list-item-title>

                        <!-- Secondary Content -->
                        <v-list-item-subtitle v-if="config.secondaryField" class="mb-2">
                            {{ getFormattedValue(item, config.secondaryField) }}
                        </v-list-item-subtitle>

                        <!-- Additional Content (Chips, etc.) -->
                        <v-list-item-text v-if="config.chips && config.chips.length"
                            :class="config.chipAlignment || ''">
                            <template v-for="(chipConfig, chipIndex) in config.chips" :key="chipIndex">
                                <v-chip size="small" :color="getChipColor(item, chipConfig)"
                                    :class="chipConfig.class || 'mr-2'">
                                    {{ getChipText(item, chipConfig) }}
                                </v-chip>
                            </template>
                        </v-list-item-text>
                    </v-list-item-content>

                    <!-- Action Button -->
                    <template v-slot:append>
                        <v-btn v-if="config.detailRoute" :icon="config.detailIcon || 'mdi-arrow-right'"
                            :variant="config.buttonVariant || 'flat'" border
                            :density="config.buttonDensity || 'comfortable'" :to="getDetailRoute(item)"
                            :aria-label="config.detailAriaLabel || 'View details'"></v-btn>
                    </template>
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
        <v-card-actions v-if="config.viewAllRoute" class="justify-center">
            <v-btn :to="{ name: viewAllRoute || config.viewAllRoute }" variant="outlined"
                :aria-label="config.viewAllAriaLabel || 'View All Items'">
                {{ config.viewAllText || 'View All' }}
                <v-icon v-if="config.viewAllIcon" end :icon="config.viewAllIcon"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

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
        //       text: (item) => `Signed by: ${item.signed_by_details?.user_details?.full_name || 'Unknown'}`,
        //       color: 'primary'
        //     }
        //   ],
        //   detailRoute: 'Announcement',
        //   detailParamKey: 'announcementId',
        //   viewAllRoute: 'Announcements',
        //   limit: 3
        // }
    },

    // Basic display properties
    title: String,
    subtitle: String,
    viewAllRoute: String,
});

const items = ref(props.items || []);
const loading = ref(!!props.fetchFunction);

// Limit items displayed
const limitedItems = computed(() => {
    const limit = props.config.limit || 3;
    return items.value.slice(0, limit);
});

// Helper functions for rendering data
const getFormattedValue = (item, fieldConfig) => {
    if (!fieldConfig) return '';

    if (typeof fieldConfig === 'function') {
        return fieldConfig(item);
    }

    // Handle nested properties using dot notation (e.g. "subject_details.name")
    if (fieldConfig.key && fieldConfig.key.includes('.')) {
        const keys = fieldConfig.key.split('.');
        let value = item;
        for (const key of keys) {
            value = value?.[key];
            if (value === undefined) break;
        }
        return value || fieldConfig.default || '';
    }

    return item?.[fieldConfig.key] || fieldConfig.default || '';
};

const getChipColor = (item, chipConfig) => {
    if (typeof chipConfig.color === 'function') {
        return chipConfig.color(item);
    }
    return chipConfig.color || 'primary';
};

const getChipText = (item, chipConfig) => {
    if (typeof chipConfig.text === 'function') {
        return chipConfig.text(item);
    }

    if (chipConfig.key) {
        return getFormattedValue(item, { key: chipConfig.key, default: chipConfig.default });
    }

    return chipConfig.text || '';
};

const getDetailRoute = (item) => {
    const routeName = props.config.detailRoute;
    const paramKey = props.config.detailParamKey || 'id';

    if (!routeName) return {};

    const params = {};
    params[paramKey] = item.id;

    return { name: routeName, params };
};

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
