<script lang="ts">
  import { cn } from "$lib/utilities";
  import { Command as CommandPrimitive } from "cmdk-sv";

  type $$Props = CommandPrimitive.ItemProps;

  export let asChild = false;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<CommandPrimitive.Item
  {asChild}
  class={cn(
    "relative flex cursor-pointer select-none items-center px-2 py-1 rounded-lg text-sm outline-none aria-selected:bg-primary aria-selected:text-primary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
    className
  )}
  {...$$restProps}
  let:action
  let:attrs>
  <slot {action} {attrs} />
</CommandPrimitive.Item>
