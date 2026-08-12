<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArticleCard } from "@/entities/article";
import { RemoveArticleButton } from "@/features/article/remove";
import { useArticle } from "@/shared/lib/use-article";
import { EditArticleForm } from "@/features/article/edit";
import { CommentList } from "@/widgets/comment-list";
import { Button } from "@/shared/ui/button"; 

const route = useRoute();
const router = useRouter();
const articleId = route.params.id as string;

const { article, loading, error, fetch: fetchArticle } = useArticle(articleId);
const isEditing = ref(false);

const handleDeleted = () => router.push("/");
const handleUpdated = () => {
  isEditing.value = false;
  fetchArticle();
};

onMounted(fetchArticle);
</script>

<template>
  <main>
    <div class="max-w-5xl mx-auto px-6 py-16">
      <RouterLink to="/" class="text-blue-700 hover:underline mb-4 block">
        ← Назад к списку статей
      </RouterLink>

      <div v-if="loading">Загрузка...</div>
      <div v-else-if="error">Ошибка: {{ error }}</div>

      <div v-else-if="article" class="flex flex-col gap-6">
        <ArticleCard :article="article" :is-preview="false">
          <template #actions="{ article }">
            <Button variant="ghost" @click="isEditing = !isEditing">
              {{ isEditing ? "Скрыть форму" : "Редактировать" }}
            </Button>
            <RemoveArticleButton
              :articleId="article.id"
              @deleted="handleDeleted"
              @error="console.error"
            />
          </template>
        </ArticleCard>

        <EditArticleForm
          v-if="isEditing"
          :article="article"
          @updated="handleUpdated"
          @cancelled="isEditing = false"
          @error="console.error"
        />

        <CommentList v-if="article" :articleId="article.id" />
      </div>
      <div v-else>Статья не найдена</div>
    </div>
  </main>
</template>
