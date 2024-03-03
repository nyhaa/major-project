<script lang="ts">
  import { cn } from "$lib/utilities";
  import type { HTMLAttributes } from "svelte/elements";
  import DotsHorizontal from "lucide-svelte/icons/more-horizontal";

  type $$Props = HTMLAttributes<HTMLSpanElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<span
  aria-hidden
  class={cn("flex h-9 w-9 items-center justify-center", className)}
  {...$$restProps}>
  <DotsHorizontal class="h-4 w-4" />
  <span class="sr-only">More pages</span>
</span>
