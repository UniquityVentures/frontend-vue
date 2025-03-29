<template>
  <v-card>
    <v-card-title>
      {{ title }}
    </v-card-title>
    <v-card-subtitle v-if="subtitle">
      {{ subtitle }}
    </v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field 
            label="First Name" 
            v-model="formData.first_name"
            :rules="[v => !!v || 'First name is required']" 
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-text-field 
            label="Last Name" 
            v-model="formData.last_name"
            :rules="[v => !!v || 'Last name is required']" 
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="isUserForm ? 6 : 12">
          <v-text-field 
            label="E-Mail" 
            v-model="formData.email"
            :rules="[v => !!v || 'Email is required']"
            type="email" 
            required
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6" v-if="isUserForm">
          <v-text-field 
            label="Username" 
            v-model="formData.username"
            :rules="[v => !!v || 'Username is required']" 
            required
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isUserForm">
        <v-col cols="12" md="6">
          <v-text-field 
            label="Identifier Number" 
            v-model="formData.identifier"
            type="number"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row v-if="!isUserForm">
        <v-col cols="12" md="6">
          <v-text-field 
            label="Phone" 
            v-model="formData.phone"
          ></v-text-field>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-text-field 
            label="Whatsapp" 
            v-model="formData.whatsapp"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" md="6">
          <v-checkbox 
            label="Is Active" 
            v-model="formData.is_active"
          ></v-checkbox>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-checkbox 
            label="Is Approved" 
            v-model="formData.is_approved"
          ></v-checkbox>
        </v-col>
      </v-row>
      
      <SubmitButton :onSubmit="submitForm" :submitText="actionName" />
    </v-card-text>
  </v-card>
</template>

<script setup>
import SubmitButton from "@/components/SubmitButton.vue";
import { ref, onMounted } from "vue";

const props = defineProps({
  teacher: {
    type: Object,
    default: null,
  },
  user: {
    type: Object,
    default: null,
  },
  isUserForm: {
    type: Boolean,
    default: false,
  },
  action: {
    type: Function,
    required: true,
  },
  actionName: {
    type: String,
    default: "Save",
  },
  title: {
    type: String,
    default: "Teacher",
  },
  subtitle: {
    type: String,
    default: "",
  },
});

// Initialize form data with default values
const formData = ref({
  first_name: "",
  last_name: "",
  email: "",
  username: "",
  is_active: true,
  is_approved: false,
  // Teacher-specific fields
  identifier: "",
  phone: "",
  whatsapp: "",
});

const submitForm = async () => {
  try {
    // Call the action passed from parent
    return await props.action(formData.value);
  } catch (error) {
    console.error("Error submitting form:", error);
    return { success: false, error };
  }
};

onMounted(() => {
  if (props.user) {
    // Copy user data to form data
    formData.value = { 
      ...formData.value,
      first_name: props.user.first_name || "",
      last_name: props.user.last_name || "",
      email: props.user.email || "",
      username: props.user.username || "",
      is_active: props.user.is_active !== undefined ? props.user.is_active : true,
      is_approved: props.user.is_approved !== undefined ? props.user.is_approved : false,
    };
  }
  
  if (props.teacher) {
    // Copy teacher data to form data
    formData.value = {
      ...formData.value,
      identifier: props.teacher.identifier || "",
      phone: props.teacher.phone || "",
      whatsapp: props.teacher.whatsapp || "",
    };
  }
});
</script> 