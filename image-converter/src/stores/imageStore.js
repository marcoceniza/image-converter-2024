import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

export const useImageStore = defineStore('image', () => {
    const files = ref([]);
    const format = ref('png');
    const previews = ref([]);
    const convertedImages = ref([]);
    const isLoading = ref(false);
    const isDragging = ref(false);
    const isConvertAgain = ref(false);
    const adjustSizes = reactive({
        width: '',
        height: ''
    });

    const onDragOver = () => isDragging.value = true;
    const onDragLeave = () => isDragging.value = false;
    
    const onDrop = (event) => {
        isDragging.value = false;
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles.length > 0) {
            onFileChange({ target: { files: droppedFiles } });
        }
    };

    const onFileChange = (event) => {
        files.value = Array.from(event.target.files);
        previews.value = [];
        
        files.value.forEach((file) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                previews.value.push(e.target.result);
            };
            reader.readAsDataURL(file);
        });
    };
        
    const convertImages = async () => {
        isLoading.value = true;
        
        const formData = new FormData();
        files.value.forEach((file) => formData.append('images[]', file));
        formData.append('format', format.value);
        formData.append('height', adjustSizes.height);
        formData.append('width', adjustSizes.width);

        console.log('height: ', adjustSizes.height);
        console.log('Width: ', adjustSizes.width);
        
        const res = await axios.post('/api/convert-image', formData);
        convertedImages.value = [];
        
        if (res.data.file_url) {
            convertedImages.value.push({ url: res.data.file_url, isZip: true });
            isLoading.value = false;
        }
        
        isLoading.value = false;
    };

    return {
        // variables
        files, format, convertedImages, previews, isLoading,
        isDragging, isConvertAgain, adjustSizes,

        // functions
        onFileChange, convertImages, onDragOver, onDragLeave, onDrop
    }
})
