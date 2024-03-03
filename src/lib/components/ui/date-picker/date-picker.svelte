<script lang="ts">
  import CalendarIcon from "lucide-svelte/icons/calendar";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
    parseDate
  } from "@internationalized/date";

  import { cn } from "$lib/utilities";
  import { Button } from "$lib/components/ui/button";
  import { Calendar } from "$lib/components/ui/calendar";
  import * as Popover from "$lib/components/ui/popover";

  const df = new DateFormatter("en-US", {
    dateStyle: "long"
  });

  export let value: DateValue | undefined = undefined;
</script>

<Popover.Root>
  <Popover.Trigger asChild let:builder>
    <Button
      variant="outline"
      class={cn(
        "w-[240px] justify-start text-left text-sm font-senibold",
        !value && "text-muted-foreground"
      )}
      builders={[builder]}>
      <CalendarIcon class="mr-2 h-4 w-4" />
      {value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date"}
    </Button>
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0" align="start">
    <Calendar bind:value maxValue={parseDate(new Date().toISOString().slice(0, 10))} />
  </Popover.Content>
</Popover.Root>
