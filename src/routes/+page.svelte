<script lang="ts">
  import { onMount } from "svelte";
  import { parseDate } from "@internationalized/date";

  import Table from "./table.svelte";
  import * as Card from "$lib/components/ui/card";
  import { Button } from "$lib/components/ui/button";
  import * as Command from "$lib/components/ui/command";
  import Header from "$lib/components/layouts/header.svelte";
  import { DatePicker } from "$lib/components/ui/date-picker";
  import DownloadIcon from "lucide-svelte/icons/download";

  import { cities, city, commandMenuOpened } from "$lib/stores";

  onMount(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        commandMenuOpened.update((v) => !v);
      }
    }

    document.addEventListener("keydown", handleKeydown);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<svelte:head>
  <title>Vehicle Violation</title>
  <meta name="description" content="" />
</svelte:head>

<Header />

<Command.Dialog bind:open={$commandMenuOpened}>
  <div>
    <Command.Input placeholder="Search city..." />
    <button
      tabindex="-1"
      class="focus:ring-none focus:outline-none absolute right-2 top-2.5 text-xs border rounded-md px-2 py-1 text-muted-foreground hover:bg-muted hover:text-foreground"
      on:click={() => commandMenuOpened.set(false)}>
      ESC
    </button>
  </div>
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      {#each cities as c}
        <Command.Item
          class="capitalize"
          onSelect={() => {
            city.set(c);
            commandMenuOpened.set(false);
          }}>{c}</Command.Item>
      {/each}
    </Command.Group>
  </Command.List>
</Command.Dialog>

<div class="h-screen flex flex-col">
  <section class="container py-4">
    <div class="flex flex-col md:flex-row space-y-2 md:space-x-2 md:space-y-0">
      <h2 class="text-2xl md:text-3xl font-bold tracking-tight mr-auto">Dashboard</h2>

      <DatePicker value={parseDate(new Date().toISOString().slice(0, 10))} />

      <Button size="default">
        <DownloadIcon class="hidden md:inline mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  </section>

  <main class="container py-4 flex flex-col flex-1">
    <div class="grid md:grid-cols-3 gap-4">
      <Card.Root>
        <Card.Content class="pt-7 flex flex-col items-center justify-center">
          <h1 class="font-medium tex-lg">Total Vehicles Passed</h1>
          <h2 class="py-4 text-5xl font-semibold text-primary">100</h2>
        </Card.Content>
      </Card.Root>

      <Card.Root>
        <Card.Content class="pt-7 flex flex-col items-center justify-center">
          <h1 class="font-medium tex-lg">Total Violations Detected</h1>
          <h2 class="py-4 text-5xl font-semibold text-red-500">10</h2>
        </Card.Content>
      </Card.Root>
    </div>

    <Table />
  </main>
</div>
