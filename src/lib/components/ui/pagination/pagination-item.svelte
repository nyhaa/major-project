<script lang="ts">
  import { cn } from "$lib/utilities";
  import type { HTMLAttributes } from "svelte/elements";

  type $$Props = HTMLAttributes<HTMLLIElement> & {
    isVisible?: boolean;
  };
  let className: $$Props["class"] = undefined;

  export { className as class };
</script>

<li class={cn("", className)} {...$$restProps}>
  <slot />
</li>
