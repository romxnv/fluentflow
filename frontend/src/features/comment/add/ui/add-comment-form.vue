<script setup lang="ts">
import { PlusIcon } from "@lucide/vue";
import { ref } from "vue";
import { useStore } from "vuex";

const props = defineProps<{ articleId: string }>();
const store = useStore();
const message = ref("");
const isSubmitting = ref(false);

const emit = defineEmits<{
  (e: "created"): void;
  (e: "error", error: string): void;
}>();

const submit = async () => {
  if (!message.value.trim()) return;
  isSubmitting.value = true;
  try {
    await store.dispatch("article/createComment", {
      articleId: props.articleId,
      dto: { message: message.value },
    });
    message.value = "";
    emit("created");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    emit("error", msg);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form class="flex gap-2" @submit.prevent="submit">
    <input
      v-model="message"
      :disabled="isSubmitting"
      placeholder="Напишите комментарий..."
      class="w-full px-4 py-2.5 text-gray-800 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition placeholder:text-gray-400 text-sm"
    />
    <button
      type="submit"
      class="bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors px-3.5 h-fill"
      :disabled="isSubmitting"
    >
      <PlusIcon class="h-4 w-4 stroke-white" />
    </button>
  </form>
</template>
