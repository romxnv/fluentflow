<template>
  <div class="max-w-7xl mx-auto px-6 py-16">
    <div class="text-3xl font-bold text-gray-800 mb-8">📊 Аналитика</div>

    <Card class="div-6 mb-8">
      <div class="flex flex-wrap items-end gap-4">
        <div class="flex-1 min-w-[200px]">
          <label
            for="dateFrom"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Дата с:
          </label>
          <input
            id="dateFrom"
            type="date"
            v-model="dateFrom"
            :max="dateTo || undefined"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="flex-1 min-w-[200px]">
          <label
            for="dateTo"
            class="block text-sm font-medium text-gray-700 mb-1"
          >
            Дата по:
          </label>
          <input
            id="dateTo"
            type="date"
            v-model="dateTo"
            :min="dateFrom || undefined"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div class="flex gap-3 flex-wrap">
          <Button
            @click="fetchAnalytics"
            :disabled="!isValidRange || loading"
            variant="primary"
            class="min-w-40"
          >
            {{ loading ? "Загрузка..." : "Показать аналитику" }}
          </Button>
        </div>
      </div>
    </Card>

    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="text-center">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"
        ></div>
        <div class="mt-4 text-gray-600">Загрузка данных...</div>
      </div>
    </div>

    <div
      v-if="error"
      class="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6"
    >
      <div class="font-medium">Ошибка</div>
      <div>{{ error }}</div>
    </div>

    <template v-if="analyticsData && !loading">
      <div v-if="analyticsData.groups.length > 0">
        <div class="space-y-6">
          <Card
            v-for="group in analyticsData.groups"
            :key="group.article.id"
            class="div-0 overflow-hidden"
          >
            <div class="px-6 py-4 bg-gray-50 border-b border-gray-200">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="text-xl font-semibold text-gray-800 flex-1">
                  {{ group.article.title }}
                </div>
                <div class="flex items-center gap-4 text-sm">
                  <span class="text-gray-500">
                    🕒 {{ formatDate(group.article.createdAt) }}
                  </span>
                  <span
                    class="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                  >
                    {{ group.comments.length }} комментариев
                  </span>
                </div>
              </div>
            </div>

            <div class="divide-y divide-gray-100">
              <div
                v-for="comment in group.comments"
                :key="comment.id"
                class="px-6 py-4 hover:bg-gray-50 transition-colors"
              >
                <div class="text-gray-700 mb-1">{{ comment.message }}</div>
                <span class="text-sm text-gray-400">
                  {{ formatDate(comment.createdAt) }}
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div v-else class="text-center py-20">
        <div class="text-2xl font-semibold text-gray-700 mb-2">
          Нет комментариев
        </div>
        <div class="text-gray-500">
          За выбранный период комментариев не найдено
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useStore } from "vuex";

import { Card } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";

const store = useStore();

const dateFrom = ref("");
const dateTo = ref("");

const loading = computed(() => store.state.analytic.loading);
const error = computed(() => store.state.analytic.error);
const analyticsData = computed(() => store.state.analytic.data);

const isValidRange = computed(() => {
  if (!dateFrom.value || !dateTo.value) return false;
  return new Date(dateFrom.value) <= new Date(dateTo.value);
});

const fetchAnalytics = async () => {
  if (!isValidRange.value) {
    return;
  }

  try {
    await store.dispatch("analytic/getCommentsAnalytics", {
      dateFrom: new Date(dateFrom.value).toISOString(),
      dateTo: new Date(dateTo.value).toISOString(),
    });
  } catch (err) {
    console.error("Error fetching analytics:", err);
  }
};

const formatDate = (dateString: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
</script>
