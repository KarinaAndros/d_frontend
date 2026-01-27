<script setup>
import { onMounted, ref } from 'vue'

const news = ref([])
const loading = ref(true)
const error = ref(null)

function parseRSS(xmlText) {
  const parser = new DOMParser()
  const xml = parser.parseFromString(xmlText, 'text/xml')
  const items = xml.querySelectorAll('item')
  return Array.from(items).map(item => ({
    title: item.querySelector('title')?.textContent,
    description: item.querySelector('description')?.textContent,
    link: item.querySelector('link')?.textContent,
    pubDate: new Date(item.querySelector('pubDate')?.textContent).toLocaleString('ru-RU'),
    image: item.querySelector('enclosure')?.getAttribute('url'),
  }))
}

async function getNews() {
  const response = await fetch('/api/rss')
  const xmlText = await response.text()
  news.value = parseRSS(xmlText)
}

onMounted(async () => {
  try {
    getNews()
  }
  catch (e) {
    error.value = 'Ошибка загрузки новостей'
  }
  finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="home container">
    <div v-if="loading">
      Загрузка...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div
      v-else
      class="news"
    >
      <button @click="getNews">
        Обновить новости
      </button>
      <article
        v-for="(item, index) in news"
        :key="index"
      >
        <img
          v-if="item.image"
          :src="item.image"
          :width="100"
          height="100"
        >
        <div class="news_content">
          <h3>{{ item.title }}</h3>
          <p v-html="item.description" />
          <span>{{ item.pubDate }}</span>
          <a
            :href="item.link"
            target="_blank"
          >Читать далее</a>
        </div>
      </article>
    </div>
  </div>
</template>
