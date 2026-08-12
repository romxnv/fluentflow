<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";
import { Button } from "@/shared/ui/button";
import type { Article, UpdateArticleDto } from "@/entities/article/model/types";

const props = defineProps<{
  article: Article;
}>();

const emit = defineEmits<{
  (e: "updated"): void;
  (e: "cancelled"): void;
  (e: "error", error: string): void;
}>();

const store = useStore();

const dto = ref<UpdateArticleDto>({
  title: props.article.title,
  content: props.article.content,
});

const isSubmitting = ref(false);

const submit = async () => {
  if (!dto.value.title?.trim() || !dto.value.content?.trim()) {
    emit("error", "Заполните все поля");
    return;
  }

  isSubmitting.value = true;
  try {
    await store.dispatch("article/update", {
      id: props.article.id,
      dto: dto.value,
    });
    emit("updated");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    emit("error", msg);
  } finally {
    isSubmitting.value = false;
  }
};

const cancel = () => {
  emit("cancelled");
};
</script>

<template>
  <form class="flex flex-col gap-4" @submit.prevent="submit">
    <div class="flex flex-col gap-2.5 w-full">
      <label for="title" class="block text-sm font-medium text-gray-700">
        Название статьи
      </label>
      <input
        v-model="dto.title"
        type="text"
        placeholder="Введите заголовок статьи..."
        class="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 text-sm"
      />
    </div>

    <div class="space-y-1.5">
      <label for="edit-content" class="block text-sm font-medium text-gray-700">
        Текст статьи
      </label>
      <textarea
        id="edit-content"
        v-model="dto.content"
        rows="6"
        placeholder="Опишите вашу идею или историю..."
        class="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 text-sm resize-y"
        required
      />
    </div>

    <div class="flex items-center gap-3 pt-2">
      <Button type="submit" :disabled="isSubmitting">
        {{ isSubmitting ? "Сохранение..." : "Сохранить" }}
      </Button>
      <Button type="button" variant="ghost" @click="cancel"> Отмена </Button>
    </div>
  </form>
</template>
