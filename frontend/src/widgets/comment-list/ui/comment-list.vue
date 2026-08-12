<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PencilIcon } from "@lucide/vue";
import { Card } from "@/shared/ui/card";
import { AddCommentForm } from "@/features/comment/add";
import { EditCommentForm } from "@/features/comment/edit";
import RemoveCommentButton from "@/features/comment/remove/ui/remove-comment-button.vue";

import { findArticleComments } from "@/entities/article/api";
import type { Comment } from "@/entities/article/model/types";

const props = defineProps<{ articleId: string }>();

const comments = ref<Comment[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);
const editingCommentId = ref<string | null>(null);

const fetchComments = async () => {
  if (loading.value) return; 
  loading.value = true;
  error.value = null;
  try {
    const response = await findArticleComments(props.articleId);
    comments.value = response.data;
  } catch (err) {
    error.value = err instanceof Error ? err.message : String(err);
  } finally {
    loading.value = false;
  }
};

const refresh = fetchComments;

const handleUpdated = () => {
  editingCommentId.value = null;
  refresh();
};

const handleCancel = () => {
  editingCommentId.value = null;
};

onMounted(fetchComments);

defineExpose({ refresh });
</script>

<template>
  <Card class="flex flex-col gap-y-4 mt-12 p-4">
    <div class="text-sm font-semibold text-gray-800">💬 Комментарии</div>

    <div v-if="loading" class="text-center py-4 text-gray-500">
      Загрузка комментариев...
    </div>

    <div v-else-if="error" class="text-center py-4 text-red-600">
      Ошибка: {{ error }}
    </div>

    <div
      v-else-if="!comments || comments.length === 0"
      class="text-center py-4 text-gray-400"
    >
      Пока нет комментариев. Будьте первым!
    </div>

    <div v-else class="flex flex-col gap-2.5">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="flex flex-col gap-2 p-3 bg-gray-50 rounded-lg border border-gray-100"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="font-semibold text-sm text-gray-800">Пользователь</span>
            <span class="text-xs text-gray-400">
              {{ new Date(comment.createdAt).toLocaleDateString() }}
            </span>
          </div>

          <div v-if="editingCommentId !== comment.id" class="flex gap-1">
            <button
              class="rounded-lg p-2 transition-colors hover:bg-blue-50"
              @click="editingCommentId = comment.id"
            >
              <PencilIcon class="h-4 w-4 stroke-blue-600" />
            </button>
            <RemoveCommentButton
              :commentId="comment.id"
              :articleId="articleId"
              @deleted="refresh"
              @error="console.error"
            />
          </div>
        </div>

        <p
          v-if="editingCommentId !== comment.id"
          class="text-sm text-gray-600 leading-relaxed"
        >
          {{ comment.message }}
        </p>

        <EditCommentForm
          v-if="editingCommentId === comment.id"
          :articleId="articleId"
          :commentId="comment.id"
          :initialMessage="comment.message"
          @cancel="handleCancel"
          @updated="handleUpdated"
          @error="console.error"
        />
      </div>
    </div>

    <AddCommentForm
      :articleId="articleId"
      @created="refresh"
      @error="console.error"
    />
  </Card>
</template>