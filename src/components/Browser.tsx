import { useEffect, useState } from 'react';
import {
  IconClipboard,
  IconRefresh,
  IconSearch,
  IconSelectAll,
  IconTrash,
} from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { DataTable, DataTableColumn } from 'mantine-datatable';
import ReactJson from 'react-json-view';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
// import companies from './companies.json';
import { intersection, isEmpty, isNonNullish, omit } from 'remeda';
import { Button, Center, Container, Group, Image, keys, MultiSelect, Stack } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

import '@mantine/core/styles.layer.css';
// 👇 Import the mantine-datatable layer CSS file;
//    this will automatically place it in a `mantine-datatable` layer
import 'mantine-datatable/styles.layer.css';
import './layout.css';

import { useAtom } from 'jotai';
import { isPrimitive } from 'radash';
import { useClipboard, useDocumentVisibility, usePrevious } from '@mantine/hooks';
import { columnsAtom, columnsFilterAtom, tableData } from '@/state';

const animatedComponents = makeAnimated();

function getColumns(data, columnFilters): DataTableColumn[] {
  let result = {};
  data.forEach((item) => {
    keys(item).forEach((key) => {
      if (isNonNullish(item[key])) {
        result[key] = typeof item[key];
      }
    });
  });
  return keys(result).map((key) => {
    return {
      accessor: key,
      ellipsis: true,
      filter: (
        <MultiSelect
          label={key}
          data={columnFilters[key]}
          leftSection={<IconSearch size={16} />}
          clearable
          searchable
        />
      ),
      render: (obj) => {
        if (result[key] === 'object') {
          if (obj[key]) {
            return JSON.stringify(obj[key], null, 2);
          }
          return obj[key];
        }
        return obj[key];
      },
    };
  });
}

export function BrowserPage() {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const documentState = useDocumentVisibility();
  const previousDocumentState = usePrevious(documentState);
  const [records, refreshRecords] = useAtom(tableData);
  const [allColumns] = useAtom(columnsAtom);
  const [columns, setColumns] = useState(allColumns);
  const [filteredData, setFilteredData] = useState(records?.data || []);
  const [columnFilters] = useAtom(columnsFilterAtom);
  const [selectedFilters, setSelectedFilters] = useState({});
  console.log({ selectedFilters });

  const clipboard = useClipboard({ timeout: 500 });
  const { showContextMenu } = useContextMenu();
  useEffect(() => {
    if (previousDocumentState !== documentState && documentState === 'visible') {
      refreshRecords();
    }
  }, [documentState]);
  useEffect(() => {
    // change filtered Data
    // change columns
    if (!records.data) {
      return;
    }
    const filteredRecords = records?.data.filter((item, index) => {
      for (const filter in selectedFilters) {
        if (
          selectedFilters[filter].length > 0 &&
          intersection(selectedFilters[filter], [item[filter]]).length === 0
        ) {
          return false;
        }
      }
      return true;
    });

    setColumns(Array.from(new Set(filteredRecords.map((x) => keys(x)).flat())));

    setFilteredData(filteredRecords);
  }, [records?.data, selectedFilters]);
  // const isTouch = useMediaQuery('(pointer: coarse)');
  if (records.state === 'loading' || records.state === 'hasError') {
    return (
      <Center h="200px">
        <Image src="./nothing.gif" h="200px" w="auto" />
      </Center>
    );
  }
  return (
    <Container fluid mt={10} mx={100}>
      <Stack>
        {/* <Accordion chevronPosition="right" variant="contained">
          <Accordion.Item value="Omit Filters">
            <Accordion.Control>Omit Filters</Accordion.Control>
            <Accordion.Panel>
              <MultiSelect
                label="Omit in Table"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
              />{' '}
              <MultiSelect
                label="Omit in Json"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
              />{' '}
              <MultiSelect
                label="Omit in Copy"
                placeholder="Pick value"
                data={['React', 'Angular', 'Vue', 'Svelte']}
              />
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion> */}
        {/* <Select options={columns} isSearchable isClearable isMulti styles={selectStyles}/> */}
        <Group>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedFilters({});
            }}
          >
            Clear Filters
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              refreshRecords();
            }}
          >
            Refresh Data
          </Button>
        </Group>
        <DataTable
          withTableBorder
          withColumnBorders
          striped
          highlightOnHover
          selectedRecords={selectedRecords}
          onSelectedRecordsChange={setSelectedRecords}
          rowExpansion={{
            content: ({ record }) => {
              return (
                <ReactJson
                  src={omit(record, ['__internalId__'])}
                  name={false}
                  displayDataTypes={false}
                  // enableClipboard={false}
                />
              );
            },
          }}
          onRowContextMenu={({ record, event }) =>
            showContextMenu([
              {
                key: 'copy',
                icon: <IconClipboard />,
                onClick: () => {
                  const toCopy = selectedRecords?.length ? selectedRecords : record;
                  clipboard.copy(JSON.stringify(toCopy));
                  showNotification({
                    message: `Copied to Clipborad`,
                    withBorder: true,
                  });
                },
              },
              {
                key: 'copy without metadata',
                icon: <IconClipboard />,
                onClick: () =>
                  showNotification({
                    message: `Copied to Clipborad`,
                    withBorder: true,
                  }),
              },
              { key: 'divider' },
              {
                key: 'Clear All Filters',
                icon: <IconTrash />,
                onClick: () => {
                  setSelectedFilters({});
                },
              },
              {
                key: 'Refresh Data',
                icon: <IconRefresh />,
                onClick: () => {
                  refreshRecords();
                },
              },
              {
                key: 'Unselect All',
                icon: <IconSelectAll />,
                onClick: () => {
                  setSelectedRecords([]);
                },
              },
            ])(event)
          }
          columns={columns
            .filter((x) => x !== '__internalId__')
            .map((key) => {
              const columnProps = {
                accessor: key,
                title: key,

                noWrap: true,
              };
              //todo: any better way to do this
              if (isPrimitive(columnFilters[key]?.[0])) {
                console.log({ primitiveFilter: columnFilters[key] });
                columnProps['filter'] = (
                  <Select
                    closeMenuOnSelect={false}
                    isMulti
                    isSearchable
                    isClearable
                    components={animatedComponents}
                    //   value={selectedFilters[key]}
                    onChange={(data) => {
                      setSelectedFilters((prev) => {
                        prev[key] = data.map((x) => x.value);
                        return { ...prev };
                      });
                    }}
                    value={selectedFilters[key]?.map((x) => ({ label: x, value: x }))}
                    options={columnFilters[key]?.map((x) => ({ label: x, value: x }))}
                  />
                );
                columnProps['filtering'] = selectedFilters[key]?.length > 0;
              }
              console.log({ columnProps });

              return columnProps;
            })}
          minHeight={150}
          records={filteredData}
          idAccessor="__internalId__"
          defaultColumnRender={(row, _, accessor) => {
            const data = row[accessor as keyof typeof row];
            return isPrimitive(data) ? data : JSON.stringify(data);
          }}
        />
      </Stack>
    </Container>
  );
}
