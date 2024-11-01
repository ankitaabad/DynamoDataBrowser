import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { atom } from 'jotai';
import { atomWithRefresh, atomWithStorage, loadable } from 'jotai/utils';
import { memo } from 'radash';
import { isNonNullish, keys } from 'remeda';

export const settingsAtom = atomWithStorage(
  'ddbSettings',
  {
    serverAddress: '',
    tableName: '',
    entityTagFieldName: '',
    pk: '',
    sk: '',
    preferredOrder: "",
    omitFilters: [],
  },
  undefined,
  { getOnInit: true }
);

const getClient = memo((serverAddress) => {
  console.log('Creating new client');

  const client = new DynamoDBClient({
    endpoint: serverAddress,
    region: 'local',
    credentials: {
      accessKeyId: 'yourAccessKeyId',
      secretAccessKey: 'yourSecretAccessKey',
    },
  });
  return DynamoDBDocumentClient.from(client);
});

const scanTable = async (docClient: DynamoDBDocumentClient, tableName: string) => {
  try {
    let data;
    let items = [];
    const params = {
      TableName: tableName,
    };
    do {
      data = await docClient.send(new ScanCommand(params));
      items = items.concat(data.Items);
      params.ExclusiveStartKey = data.LastEvaluatedKey; // Check for more items
    } while (data.LastEvaluatedKey);

    return items.map((item) => {
      return { pk: item.pk, sk: item.sk, ...item, __internalId__: `${item['pk']}_${item['sk']}` };
    });
  } catch (error) {
    console.error('Unable to scan the table:', error);
  }
};
let checkPoint = undefined;

// async atom ddb fetch
const tableDataRefreshAtom = atomWithRefresh(async (get) => {
  const settings = get(settingsAtom);
  if (!settings.serverAddress) {
    throw new Error('No settings');
  }
  if (settings.serverAddress) {
    const data = await scanTable(getClient(settings.serverAddress), settings.tableName);
    if (!checkPoint) {
      checkPoint = data;
    }
    return data.sort((a, b) => `${a.pk}_${a.sk}`.localeCompare(`${b.pk}_${b.sk}`));
  }
});
export const tableDataLodable = loadable(tableDataRefreshAtom);
export const tableData = atom(
  (get) => get(tableDataLodable),
  (_get, set) => set(tableDataRefreshAtom)
);
export const columnsAtom = atom((get) => {
  const data = get(tableData);

  if (data.state === 'hasData') {
    const columns = Array.from(new Set(data?.data?.map((x) => keys(x)).flat()));
    return columns;
  }
  return [];
});

export const columnsFilterAtom = atom((get) => {
  const data = get(tableData);
  const columns = get(columnsAtom);

  const filters = {};
  if (data.state === 'hasData') {
    columns.forEach((c) => {
      console.log({ column: c });
      console.log({ cv: data.data.map((x) => x[c]) });
      const values = data.data.map((x) => x[c]).filter((x) => isNonNullish(x));
      console.log({ values });
      filters[c] = Array.from(new Set(values));
    });
  }
  console.log({ filters });
  return filters;
});
