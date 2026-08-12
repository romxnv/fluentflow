<script setup lang="ts">
import { XIcon } from "@lucide/vue";
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  articleId: string;
  commentId: string;
}>();

const emit = defineEmits<{
  (e: "deleted"): void;
  (e: "error", error: string): void;
}>();

const store = useStore();
const isDeleting = ref(false);

const handleDelete = async () => {
  if (isDeleting.value) return;
  if (!confirm("Удалить комментарий?")) return;
  
  isDeleting.value = true;
  try {
    await store.dispatch("article/removeComment", {
      articleId: props.articleId,
      commentId: props.commentId,
    });
    emit("deleted");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    emit("error", msg);
  } finally {
    isDeleting.value = false;
  }
};
</script>

<template>
  <button
    class="bg-red-600 hover:bg-red-700 rounded-lg transition-colors p-2.5 disabled:opacity-50"
    :disabled="isDeleting"
    @click="handleDelete"
  >
    <XIcon class="h-4 w-4 stroke-white" />
  </button>
</template>