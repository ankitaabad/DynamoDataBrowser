import { useState } from 'react';
import { IconClipboard, IconEdit, IconEye, IconPlus, IconTrash } from '@tabler/icons-react';
import { useContextMenu } from 'mantine-contextmenu';
import { DataTable } from 'mantine-datatable';
import ReactJson from 'react-json-view';
// import companies from './companies.json';
import { isNonNullish, omit } from 'remeda';
import { Chip, Container, keys } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { showNotification } from '@mantine/notifications';

//todo: copy on right click
//todo: copy multiple items
//todo: filter
//todo: sort items
//todo: Dynamic items
const companies = [
  {
    id: '1323addd-a4ac-4dd2-8de2-6f934969a0f1',
    streetAddress: '21716 Ratke Drive',
    city: 'Stromanport',
    state: 'WY',
    missionStatement: 'Innovate bricks-and-clicks metrics.',
    new: {
      city: 'name',
    },
  },
  {
    id: '0cf96f1c-62c9-4e3f-97b0-4a2e8fa2bf6b',
    name: 'Cummerata - Kuhlman',
    streetAddress: '6389 Dicki Stream',
    city: 'South Gate',
    state: 'NH',
    missionStatement: 'Harness real-time channels.',
  },
  {
    id: 'bba53ee9-385f-4b3d-a9a4-613ced38ff2c',
    name: 'Goyette Inc',
    streetAddress: '8873 Mertz Rapid',
    city: 'Dorthyside',
    state: 'ID',
    missionStatement: 'Productize front-end web services.',
  },
  {
    id: '3d80d34a-4aff-468a-b4e5-e17658f7635e',
    name: 'Runte Inc',
    streetAddress: '2996 Ronny Mount',
    city: 'McAllen',
    state: 'MA',
    missionStatement: 'Engage synergistic infrastructures.',
  },
  {
    id: '3ae22e52-335e-4e49-9e26-f5e0089edb76',
    name: 'Goldner, Rohan and Lehner',
    streetAddress: '632 Broadway Avenue',
    city: 'North Louie',
    state: 'WY',
    missionStatement: 'Incubate cross-platform metrics.',
  },
  {
    id: '6e9372ad-6b30-40c1-bd05-30211cd00ed2',
    name: "Doyle, Hodkiewicz and O'Connell",
    streetAddress: '576 Joyce Ways',
    city: 'Tyraburgh',
    state: 'KS',
    missionStatement: 'Scale web-enabled e-business.',
  },
  {
    id: '2d0ddea1-ee92-477e-8d63-6d0508749ae6',
    name: "Rau - O'Hara",
    streetAddress: '7508 Lansdowne Road',
    city: 'Shieldsborough',
    state: 'MI',
    missionStatement: 'Innovate real-time applications.',
  },
  {
    id: '1c509c99-109e-4f2c-bc76-03c23b839222',
    name: 'Tillman - Jacobi',
    streetAddress: '57918 Gwendolyn Circles',
    city: 'Sheridanport',
    state: 'MI',
    missionStatement: 'Matrix viral synergies.',
  },
  {
    id: '74207e6f-91a7-49a3-8eb4-b0c95cda3105',
    name: 'Connelly, Feest and Hodkiewicz',
    streetAddress: '7057 Stanley Road',
    city: 'Kearaburgh',
    state: 'CA',
    missionStatement: 'Maximize dynamic e-commerce.',
  },
  {
    id: '3fdba2fc-2347-464b-b29a-3ef8f03ccf56',
    name: 'Shanahan, Robel and Beier',
    streetAddress: '378 Berta Crescent',
    city: 'West Gerry',
    state: 'KS',
    missionStatement: 'Synthesize customized portals.',
  },
  {
    id: 'a9c0b7f0-3a1b-4b0c-8f3d-6a6a7b7b7b7q2',
    name: 'Kling - McLaughlin',
    streetAddress: '8346 Kertzmann Square',
    city: 'South Joesph',
    state: 'ID',
    missionStatement: 'Reinvent cross-platform channels.',
  },
  {
    id: 'a9c0b7f0-3a1b-4b0c-8f3d-6a6a7b7b7b72b',
    name: 'Jogi - McLaughlin',
    streetAddress: '83462 Shazam Street',
    city: 'North Joesph',
    state: 'ID',
    missionStatement: 'Eliminate best-of-breed e-markets.',
  },
  {
    id: 'a9c0b7f0-3a1b-4b0c-8f3d-6a6af7b7b7b7b',
    name: 'Jogi - McLaughlin',
    streetAddress: '83462 Shazam Street',
    city: 'North Joesph',
    state: 'ID',
    missionStatement: 'Eliminate best-of-breed e-markets.',
  },
];
function getColumns(data) {
  let result = {};
  data
    .map((x) => omit(x, ['id', 'missionStatement']))
    .forEach((item) => {
      keys(item).forEach((key) => {
        if (isNonNullish(item[key])) {
          result[key] = typeof item[key];
        }
      });
    });
  return keys(result).map((key) => {
    return {
      accessor: key,
      render: (obj) => {
        // if (result[key] === 'object') {
        //   return (
        //     <ReactJson src={item} name={false} displayDataTypes={false} enableClipboard={false} />
        //   );
        // }
        if (result[key] === 'object') {
          if (obj[key]) {
            return <Chip>ets</Chip>;
          }
          return obj[key];
        }
        console.log({ obj });
        return obj[key];
      },
    };
  });
}
export function HomePage() {
  const [selectedRecords, setSelectedRecords] = useState([]);
  const { showContextMenu } = useContextMenu();
  // const isTouch = useMediaQuery('(pointer: coarse)');
  return (
    <Container mt={10} size="lg">
      <DataTable
        withTableBorder
        withColumnBorders
        striped
        selectedRecords={selectedRecords}
        onSelectedRecordsChange={setSelectedRecords}
        rowExpansion={{
          content: ({ record }) => {
            return (
              <ReactJson
                src={record}
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
              icon: <IconClipboard size={16} />,
              onClick: () =>
                showNotification({
                  message: `todo: copy the item`,
                  withBorder: true,
                }),
            },
            {
              key: 'copy without metadata',
              icon: <IconClipboard size={16} />,
              onClick: () =>
                showNotification({
                  message: `todo: copy the item without metada`,
                  withBorder: true,
                }),
            },
            { key: 'divider' },
            // {
            //   key: 'delete-company',
            //   icon: <IconTrash size={16} />,
            //   color: 'red',
            //   onClick: () =>
            //     showNotification({
            //       color: 'red',
            //       message: `Clicked on delete context-menu action for ${record.name} company`,
            //       withBorder: true,
            //     }),
            // },
          ])(event)
        }
        highlightOnHover
        columns={getColumns(companies)}
        records={companies}
      />
    </Container>
  );
}
