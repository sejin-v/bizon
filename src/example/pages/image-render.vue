<script setup lang='ts'>
import { ref } from 'vue'

const imageUrlRef = ref('')
const imageEncodeRef = ref('')

const imgToBase64ByBlob = (blob) => {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
};

const getImageUrlAndBlob = async () => {
  try {
    const response = await fetch('/images/jjanggu.jpg');
    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    const imageEncode = await imgToBase64ByBlob(blob);
    return new Promise((resolve, reject) => {
      resolve({
        imageUrl,
        imageEncode
      });
    });
  } catch (error) {
    console.error(error);
    return null;
  }
}

const createUrlImageElement = (url) => {
  const img = document.createElement('img');
  img.src = url;
  return img;
}

const createBase64ImageElement = (base64String) => {
  const img = document.createElement('img');
  img.src = base64String;
  return img;
}

const checkImageInfo = async () => {
  const result = await getImageUrlAndBlob();
  imageUrlRef.value = result.imageUrl
  imageEncodeRef.value = result.imageEncode
}

const imageList = ref([])

const createImageByUrl = () => {
  imageList.value.push(createUrlImageElement(imageUrlRef.value))
}

const createImageByBase64 = () => {
  imageList.value.push(createBase64ImageElement(imageEncodeRef.value))
}


</script>

<template>
  <div class="page-wrapper">
    <div class="image-info-area">
      <button class="create-info-btn" @click="checkImageInfo"> Check image Url & base64String </button>
      <span>imageUrl : {{ imageUrlRef }} </span>
      <span>imageEncode : {{ imageEncodeRef }} </span>
    </div>
    <div class="result-area">
      <button class="result-btn" @click="createImageByUrl">url 결과 화인</button>
      <button class="result-btn" @click="createImageByBase64">base64 결과 확인</button>
    </div>
    <div>
      <div v-for="(image, index) in imageList" :key="index">
        <img :src="image.src" alt="Image">
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
}

.image-info-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.create-info-btn {
  border: solid;
  width: 300px;
}

.result-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
}

.result-btn {
  border: solid;
  width: 300px;
  margin-top: 5px;
}
</style>
