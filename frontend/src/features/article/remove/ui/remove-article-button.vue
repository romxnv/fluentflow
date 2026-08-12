<script setup lang="ts">
import { Trash2 } from "@lucide/vue";
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  articleId: string;
}>();

const emit = defineEmits<{
  (e: "deleted"): void;
  (e: "error", error: string): void;
}>();

const store = useStore();
const isDeleting = ref(false);

const handleDelete = async () => {
  if (isDeleting.value) return;
  if (!confirm("Удалить статью?")) return;

  isDeleting.value = true;
  try {
    await store.dispatch("article/remove", props.articleId);
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
    class="rounded-lg p-2 transition-colors hover:bg-red-50 disabled:opacity-50"
    :disabled="isDeleting"
    @click="handleDelete"
  >
    <Trash2 class="h-4 w-4 stroke-red-600" />
  </button>
</template>