<script setup lang="ts">
import { PencilIcon } from "@lucide/vue";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{
  articleId: string;
  commentId: string;
  initialMessage: string;
}>();

const emit = defineEmits<{
  (e: "cancel"): void;
  (e: "updated"): void;
  (e: "error", error: string): void;
}>();

const store = useStore();
const message = ref("");
const isSubmitting = ref(false);

const submit = async () => {
  if (!message.value.trim()) return;
  isSubmitting.value = true;
  try {
    await store.dispatch("article/updateComment", {
      articleId: props.articleId,
      commentId: props.commentId,
      dto: { message: message.value },
    });
    emit("updated");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    emit("error", msg);
  } finally {
    isSubmitting.value = false;
  }
};

const cancel = () => emit("cancel");

onMounted(() => {
  message.value = props.initialMessage || "";
});
</script>

<template>
  <form class="w-full flex gap-2" @submit.prevent="submit">
    <input
      v-model="message"
      :disabled="isSubmitting"
      placeholder="Редактировать комментарий..."
      class="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 text-sm"
    />
    <button
      type="submit"
      class="bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors px-3.5 h-fill"
      :disabled="isSubmitting"
    >
      <PencilIcon class="h-4 w-4 stroke-white" />
    </button>
    <button
      type="button"
      class="bg-gray-300 hover:bg-gray-400 rounded-lg transition-colors px-3.5 h-fill"
      @click="cancel"
    >
      Отмена
    </button>
  </form>
</template>