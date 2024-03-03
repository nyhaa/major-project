<script lang="ts">
  import { cn } from "$lib/utilities";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLDivElement>;

  let className: $$Props["class"] = undefined;
  export { className as class };
</script>

<div class={cn("px-6 pb-6 pt-0", className)} {...$$restProps}>
  <slot />
</div>
