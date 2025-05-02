import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

// Custom Quill configuration
const quillOptions = {
  theme: 'snow',
  modules: {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'script': 'sub'}, { 'script': 'super' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  }
};

export default {
  install: (app) => {
    app.component('QuillEditor', QuillEditor);
    app.provide('quillOptions', quillOptions);
  }
};
