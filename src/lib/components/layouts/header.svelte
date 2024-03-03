<script lang="ts">
  import { mode, setMode } from "mode-watcher";
  import { commandMenuOpened } from "$lib/stores";
  import CarIcon from "$lib/components/car-icon.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { Button, buttonVariants } from "$lib/components/ui/button";

  import MoonIcon from "lucide-svelte/icons/moon";
  import SearchIcon from "lucide-svelte/icons/search";
  import LaptopIcon from "lucide-svelte/icons/laptop-2";
  import SunMediumIcon from "lucide-svelte/icons/sun-medium";

  const openCommandMenu = () => commandMenuOpened.set(true);
</script>

<header class="py-2 md:py-4 border-b sticky top-0 bg-background z-10">
  <div class="container flex">
    <a href="/" class="outline-none">
      <CarIcon class="w-10 h-10" />
    </a>

    <div class="ml-auto inline-flex items-center space-x-2 md:space-x-4">
      <div class="relative inline-flex items-center h-full group">
        <div class="hidden md:contents">
          <input
            readonly
            placeholder="Search city..."
            class=" border rounded-lg h-full pl-4 text-sm font-semibold focus:outline-none cursor-pointer bg-background"
            on:click={openCommandMenu} />

          <button
            class="absolute right-2 text-sm font-semibold text-muted-foreground border px-1 rounded-md group-hover:bg-muted pointer-events-none">
            ⌘ K
          </button>
        </div>

        <Button size="icon" variant="outline" class="md:hidden" on:click={openCommandMenu}>
          <SearchIcon class="w-5 h-5" />
        </Button>
      </div>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger class={buttonVariants({ variant: "outline", size: "icon" })}>
          {#if $mode === "light"}
            <SunMediumIcon class="w-5 h-5" />
          {:else}
            <MoonIcon class="w-5 h-5" />
          {/if}
        </DropdownMenu.Trigger>

        <DropdownMenu.Content align="end">
          <DropdownMenu.Item on:click={() => setMode("light")}>
            <SunMediumIcon class="w-5 h-5 me-3" />
            <span class="md:font-medium">Light</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item on:click={() => setMode("dark")}>
            <MoonIcon class="w-5 h-5 me-3" />
            <span class="md:font-medium">Dark</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item on:click={() => setMode("system")}>
            <LaptopIcon class="w-5 h-5 me-3" />
            <span class="md:font-medium">System</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </div>
</header>
