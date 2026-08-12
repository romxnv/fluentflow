<script setup lang="ts">
import { onMounted } from "vue";
import { ArticleCard } from "@/entities/article";
import { useArticles } from "@/shared/lib/use-articles";
import { CreateArticleForm } from "@/features/article/add";

const { articles, loading, error, fetchAll } = useArticles();

onMounted(() => {
  fetchAll();
});
</script>

<template>
  <main>
    <div class="max-w-5xl mx-auto px-6 py-16">
      <CreateArticleForm @created="fetchAll" />

      <div v-if="loading" class="flex justify-center py-8">
        <div class="text-gray-500">Загрузка статей...</div>
      </div>

      <div v-else-if="error" class="text-red-600 text-center py-8">
        Ошибка: {{ error }}
      </div>

      <div
        v-else-if="articles.length === 0"
        class="text-center py-8 text-gray-500"
      >
        Пока нет статей. Создайте первую!
      </div>

      <div v-else class="flex flex-col gap-4">
        <ArticleCard
          v-for="article in articles"
          :key="article.id"
          :article="article"
          :is-preview="true"
        />
      </div>
    </div>
  </main>
</template>
