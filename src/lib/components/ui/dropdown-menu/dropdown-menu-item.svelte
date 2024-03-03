<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";
  import { cn } from "$lib/utilities";

  type $$Props = DropdownMenuPrimitive.ItemProps & {
    inset?: boolean;
  };
  type $$Events = DropdownMenuPrimitive.ItemEvents;

  let className: $$Props["class"] = undefined;
  export { className as class };

  export let inset: $$Props["inset"] = undefined;
</script>

<DropdownMenuPrimitive.Item
  class={cn(
    "relative flex select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none cursor-pointer data-[disabled]:pointer-events-none data-[highlighted]:bg-muted data-[highlighted]:text-muted-foreground data-[disabled]:opacity-50",
    inset && "pl-8",
    className
  )}
  on:click
  on:keydown
  on:focusin
  on:focusout
  on:pointerdown
  on:pointerleave
  on:pointermove
  {...$$restProps}>
  <slot />
</DropdownMenuPrimitive.Item>
