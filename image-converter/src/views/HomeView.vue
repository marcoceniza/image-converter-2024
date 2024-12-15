<template>
	<div 
		:style="{ width: previews.length > 8 ? '1070px' : '700px' }"
		class="text-center bg-[#f0f0f0] mx-auto min-h-[300px] rounded-md shadow-[0_0_12px_#b0b0b0] flex flex-col justify-center p-[12px] py-[20px] absolute left-0 right-0 top-[50%] translate-y-[-50%]"
		@dragover.prevent="onDragOver"
		@dragleave="onDragLeave"
		@drop.prevent="onDrop"
		:class="{ dragging: isDragging }"
	>
		<div v-if="!previews.length" class="file-upload flex mb-2" :class="{ separator: previews.length }">
			<div class="relative text-center mx-auto">
				<section class="bg-[#00abff] py-[12px] px-[18px] text-white cursor-pointer rounded-[5px] border-none hover:opacity-[0.5] flex hover:cursor-pointer w-[200px] max-w-full relative">
					<ArrowDownTrayIcon class="size-6 text-white mr-2" />
					<label for="fileInput" class="absolute h-full w-full left-0 top-0 pt-[10px] pl-[30px] cursor-pointer">Upload your image</label>
				</section>
				<section class="mt-4">
					<p class="text-center text-gray-500">or drop it here</p>
				</section>
			</div>
			<input type="file" id="fileInput" @change="onFileChange" accept="image/*" multiple class="hidden" />
		</div>

		<div v-else class="separator">
			<section class="flex justify-between">
				<p>Total Image{{ previews.length > 1 ? 's' : '' }}: {{ previews.length }}</p>
				<PencilSquareIcon @click="modifySizes" class="size-6 text-gray-500 mr-2 cursor-pointer hover:text-gray-800" />
			</section>
			<section v-show="isSizes" class="flex justify-center gap-4 mt-4 mb-2">
				<p>Width: <input type="number" v-model="adjustSizes.width" class="pl-1"></p>
				<p>Height: <input type="number" v-model="adjustSizes.height" class="pl-1"></p>
			</section>
		</div>

		<div>
			<div v-if="previews.length" class="mt-3">
				<div class="flex justify-between">
					<h3>Selected Images:</h3>
					<div class="flex">
						<p class="mr-2">Convert to:</p>
						<select v-model="format" class="bg-[#d0d0d0] px-[4px] rounded-[3px]">
							<option value="png">PNG</option>
							<option value="jpg">JPG</option>
							<option value="webp">WEBP</option>
						</select>
					</div>
				</div>
				<ul class="flex flex-wrap justify-center mt-4">
					<li v-for="(preview, idx) in previews" :key="idx" class="w-[100px] m-[2px] text-center">
						<img :src="preview" alt="Selected Image" class="max-w-[100px] p-[5px] rounded-[4px] border border-gray-300 border-solid h-[100px] object-cover mx-auto w-full" />
					</li>
					<li v-if="previews.length >= 29" class="w-[100px] m-[2px] text-center"><a href="" class="p-[5px] rounded-[4px] border border-gray-300 border-solid h-full mx-auto w-full block">View more &raquo;</a></li>
				</ul>
				<div v-if="convertedImages.length" class="flex justify-center gap-4">
					<a @click="isConvertAgain = true" v-for="(img, idx) in convertedImages" :key="idx" :href="img.url" download target="_blank" class="block bg-red-500 text-white w-[200px] leading-[40px] rounded-[4px] mt-5">Download ZIP</a>
					<a v-show="isConvertAgain" class="block bg-gray-500 text-white w-[200px] leading-[40px] rounded-[4px] mt-5">Convert Again</a>
				</div>
				<div v-else>
					<button @click="convertImages" type="submit" class="block bg-blue-500 text-white w-[200px] leading-[40px] rounded-[4px] mx-auto mt-5 h-[40px]">
						<p v-if="isLoading" class="loading-spinner"></p>
						<p v-else>Convert</p>
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { useImageStore } from '@/stores/imageStore';
import { storeToRefs } from 'pinia';
import { ArrowDownTrayIcon, PencilSquareIcon } from '@heroicons/vue/24/solid'
import { ref } from 'vue';

const { files, format, convertedImages, previews, isLoading, isDragging, isConvertAgain, adjustSizes } = storeToRefs(useImageStore());
const { onFileChange, convertImages, onDragOver, onDragLeave, onDrop } = useImageStore();
const isSizes = ref(false);
const modifySizes = () => isSizes.value = !isSizes.value;
</script>