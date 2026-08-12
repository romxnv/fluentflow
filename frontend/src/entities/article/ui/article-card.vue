<script setup lang="ts">
import { RouterLink } from "vue-router";

import { Card } from "@/shared/ui/card";
import { truncate } from "@/shared/lib/truncate";
import type { Article } from "../model/types";

const props = withDefaults(
  defineProps<{
    article: Article;
    isPreview?: boolean;
  }>(),
  {
    isPreview: false,
  },
);
</script>

<template>
  <Card class="flex flex-col gap-3 p-4 transition-shadow hover:shadow-md">
    <div class="flex items-center justify-between gap-2">
      <h2 class="text-2xl font-bold text-gray-800 line-clamp-1">
        {{ article.title }}
      </h2>

      <div
        v-if="$slots.actions && !props.isPreview"
        class="flex shrink-0 items-center gap-1"
      >
        <slot name="actions" :article="article" />
      </div>
    </div>

    <p class="text-gray-600 text-base leading-relaxed">
      {{ isPreview ? truncate(article.content, 150) : article.content }}
    </p>

    <div class="mt-1 text-sm text-gray-400">
      🕒 {{ new Date(article.createdAt).toLocaleDateString() }}
    </div>

    <RouterLink
      v-if="isPreview"
      :to="`/articles/${article.id}`"
      class="mt-2 w-fit text-sm font-semibold text-blue-600 hover:underline"
    >
      Читать далее →
    </RouterLink>
  </Card>
</template>
