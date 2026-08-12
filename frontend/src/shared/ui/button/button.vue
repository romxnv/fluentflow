<script setup lang="ts">
import clsx from "clsx";

type Props = {
  variant?: "primary" | "ghost";
  fullWidth?: boolean;
  isLoading?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
  fullWidth: false,
  isLoading: false,
});

const variantClasses = {
  primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow",
  ghost: "text-gray-600 hover:text-gray-800 hover:bg-gray-100",
};

const buttonClasses = clsx(
  "font-medium py-2.5 px-5 rounded-lg transition-colors text-sm",
  variantClasses[props.variant],
  props.fullWidth && "w-full",
  props.isLoading && "opacity-50 pointer-events-none",
);
</script>

<template>
  <button type="submit" :class="buttonClasses" :disabled="isLoading">
    <span v-if="isLoading" class="mr-2 inline-block animate-spin">⏳</span>
    <slot />
  </button>
</template>
