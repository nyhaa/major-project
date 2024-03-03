<script lang="ts">
  import { cn } from "$lib/utilities";
  import { Command as CommandPrimitive } from "cmdk-sv";

  type $$Props = CommandPrimitive.CommandProps;

  export let value: $$Props["value"] = undefined;

  let className: string | undefined | null = undefined;
  export { className as class };
</script>

<CommandPrimitive.Root
  class={cn(
    "flex h-full w-full flex-col overflow-hidden rounded-md bg-background text-background-foreground",
    className
  )}
  bind:value
  {...$$restProps}>
  <slot />
</CommandPrimitive.Root>
