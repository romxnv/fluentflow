<script setup lang="ts">
import { ref } from "vue";
import { useStore } from "vuex";

import { Button } from "@/shared/ui/button";
import type { CreateArticleDto } from "@/entities/article/model/types";

const store = useStore();

const dto = ref<CreateArticleDto>({
  title: "",
  content: "",
});

const isSubmitting = ref(false);
const error = ref<string | null>(null);

const emit = defineEmits<{
  (e: "created"): void;
}>();

const submit = async () => {
  error.value = null;
  isSubmitting.value = true;

  try {
    await store.dispatch("article/create", dto.value);
    dto.value = { title: "", content: "" };
    emit("created");
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Неизвестная ошибка";
  } finally {
    isSubmitting.value = false;
  }
};

const reset = () => {
  dto.value = { title: "", content: "" };
  error.value = null;
};
</script>

<template>
  <form
    class="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-12"
    @submit.prevent="submit"
  >
    <h2
      class="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-3"
    >
      ✏️ Новая статья
    </h2>

    <div class="space-y-4 mt-4">
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
        <label for="content" class="block text-sm font-medium text-gray-700">
          Текст статьи
        </label>
        <textarea
          id="content"
          v-model="dto.content"
          rows="6"
          placeholder="Опишите вашу идею или историю..."
          class="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 text-sm resize-y"
          required
        />
      </div>

      <div v-if="error" class="text-sm text-red-600">
        {{ error }}
      </div>

      <div class="flex items-center gap-3 pt-2">
        <Button type="submit" :disabled="isSubmitting">
          {{ isSubmitting ? "Публикация..." : "Опубликовать" }}
        </Button>
        <Button type="button" variant="ghost" @click="reset"> Очистить </Button>
      </div>
    </div>
  </form>
</template>
