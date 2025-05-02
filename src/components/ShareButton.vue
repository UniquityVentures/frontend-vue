<template>
    <div>
      <v-btn 
        color="primary" 
        @click="dialog = true"
        icon="mdi-share"
      >
      </v-btn>
  
      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title>Share</v-card-title>
          <v-card-subtitle>Share this: "{{ title }}"</v-card-subtitle>
          <v-card-text>
            <v-list>
              <v-list-item 
                v-for="option in shareOptions" 
                :key="option.id"
                @click="handleShare(option.id)"
                :ripple="true"
              >
                <template v-slot:prepend>
                  <v-icon :color="option.color">{{ option.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ option.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey" text @click="dialog = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <v-snackbar v-model="snackbar.show" :color="snackbar.color">
        {{ snackbar.text }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
        </template>
      </v-snackbar>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      default: 'Share',
    },
    icon: {
      type: String,
      default: 'mdi-share',
    },
    hideText: {
      type: Boolean,
      default: false,
    },
  });
  
  const dialog = ref(false);
  const snackbar = ref({
    show: false,
    text: '',
    color: 'success',
  });
  
  // Default share options
  const defaultOptions = [
    { 
      id: 'copy', 
      title: 'Copy Link', 
      icon: 'mdi-content-copy', 
      color: 'primary' 
    },
    { 
      id: 'whatsapp', 
      title: 'Share via WhatsApp', 
      icon: 'mdi-whatsapp', 
      color: '#25D366' 
    },
  ];
  
  // Combine default and custom options
  const shareOptions = [...defaultOptions];
  
  const handleShare = async (optionId) => {
    const shareData = {
      title: props.title,
      text: props.text || `Check out this: ${props.title}`,
      url: props.url,
    };
  
    try {
      switch (optionId) {
        case 'copy':
          await navigator.clipboard.writeText(props.url);
          showSnackbar('Link copied to clipboard!', 'success');
          break;
        case 'whatsapp':
          const shareText = `${props.title} - ${props.url}`;
          const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
          window.open(whatsappUrl, '_blank');
          break;
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            showSnackbar('Native sharing not supported', 'error');
          }
          break;
      }
      dialog.value = false;
    } catch (error) {
      console.error('Error sharing:', error);
      showSnackbar('Failed to share', 'error');
    }
  };
  
  const showSnackbar = (text, color = 'success') => {
    snackbar.value = {
      show: true,
      text,
      color,
    };
  };
  </script>