<script lang="ts">
  import { readable } from "svelte/store";
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import { addPagination, addTableFilter } from "svelte-headless-table/plugins";
  import { createTable, Render, Subscribe } from "svelte-headless-table";
  import Button from "$lib/components/ui/button/button.svelte";

  type Data = {
    id: string;
    date: Date;
    description: string;
    vehicleNumber: string;
  };

  const data: Data[] = [
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    },
    {
      id: crypto.randomUUID(),
      date: new Date(),
      vehicleNumber: "316",
      description: "Did something serious"
    }
  ];

  const table = createTable(readable(data), {
    page: addPagination(),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
    })
  });

  const columns = table.createColumns([
    table.column({
      accessor: "vehicleNumber",
      header: "Vehicle no."
    }),
    table.column({
      accessor: "description",
      header: "Description",
      plugins: { filter: { exclude: true } }
    }),
    table.column({
      accessor: "date",
      header: "Date",
      plugins: { filter: { exclude: true } },
      cell: ({ value }) => {
        const date = new Date(value);
        return date.toLocaleString("en-US");
      }
    })
  ]);

  const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates } =
    table.createViewModel(columns);
  const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
  const { filterValue } = pluginStates.filter;
</script>

<Card.Root class="flex flex-col w-full h-full mt-4">
  <Card.Header>
    <Card.Title>Violation Details</Card.Title>
    <div class="py-2 md:w-1/3">
      <input
        bind:value={$filterValue}
        class="bg-background border rounded-lg px-3 py-2 text-sm font-medium w-full"
        placeholder="Search by number plate..." />
    </div>
  </Card.Header>
  <Card.Content class="flex-1">
    <div class="rounded-md h-full border overflow-auto">
      <Table.Root {...$tableAttrs}>
        <Table.Header>
          {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
              <Table.Row>
                {#each headerRow.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
                    <Table.Head {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Head>
                  </Subscribe>
                {/each}
              </Table.Row>
            </Subscribe>
          {/each}
        </Table.Header>
        <Table.Body {...$tableBodyAttrs}>
          {#each $pageRows as row (row.id)}
            <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
              <Table.Row {...rowAttrs}>
                {#each row.cells as cell (cell.id)}
                  <Subscribe attrs={cell.attrs()} let:attrs>
                    <Table.Cell {...attrs}>
                      <Render of={cell.render()} />
                    </Table.Cell>
                  </Subscribe>
                {/each}
              </Table.Row>
            </Subscribe>
          {/each}
        </Table.Body>
      </Table.Root>
    </div>
  </Card.Content>
  <Card.Footer>
    <div class="flex items-center justify-end space-x-4 py-4 ml-auto">
      <Button
        variant="outline"
        size="sm"
        on:click={() => ($pageIndex = $pageIndex - 1)}
        disabled={!$hasPreviousPage}>Previous</Button>
      <Button
        variant="outline"
        size="sm"
        disabled={!$hasNextPage}
        on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button>
    </div>
  </Card.Footer>
</Card.Root>
