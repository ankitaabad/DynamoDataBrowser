import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Button, Card, Container, Group, Stack, TagsInput, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useLocalStorage, useTimeout } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { settingsAtom } from '@/state';

export function SettingsPage() {
  const [saving, setSaving] = useState(false);

  const { start, clear } = useTimeout(() => done(), 500);
  const done = () => {
    setSaving(false); 
    clear();
  };
  // const [settings, setSettings] = useLocalStorage({
  //   key: 'ddbSettings',
  //   defaultValue: {
  //     serverAddress: '',
  //     tableName: '',
  //     entityTagFieldName: '',
  //     pk: '',
  //     sk: '',
  //     omitFilters: [],
  //   },
  //   getInitialValueInEffect: false,
  // });
  const [settings, setSettings] = useAtom(settingsAtom);
  const form = useForm({
    initialValues: settings,
  });
  useEffect(() => {
    console.log('inside use effect');
    console.log({ settings });
    form.setValues(settings);
  }, []);
  const handleSubmit = (values) => {
    setSaving(true);
    console.log('settings called');
    setSettings(values);
    start();
    console.log('Form submitted:', values);
    notifications.show({ title: 'Settings Saved' });
    // Handle form submission (e.g., send data to your API)
  };
  const [inputs, setInputs] = useState([{ key: '', value: '' }]);

  const handleAddInput = () => {
    setInputs([...inputs, { key: '', value: '' }]);
  };

  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  return (
    <Container mt="sm" size="xs">
      <Card shadow="sm" withBorder>
        <form onSubmit={form.onSubmit(handleSubmit)} defaultValue={settings}>
          <Stack>
            <TextInput
              label="Server Address"
              placeholder="http://localhost:8000"
              {...form.getInputProps('serverAddress')}
            />

            <TextInput
              label="Table Name"
              placeholder="Enter table name"
              {...form.getInputProps('tableName')}
            />

            <TextInput
              label="Entity Tag Field Name"
              placeholder="Enter entity tag field name"
              {...form.getInputProps('entityTagFieldName')}
            />

            <Group>
              <TextInput
                label="Partition Key (PK)"
                placeholder="Enter Partition key"
                {...form.getInputProps('pk')}
                style={{ flex: 1, marginRight: 10 }}
              />
              <TextInput
                label="Sort Key (SK)"
                placeholder="Enter sort key"
                {...form.getInputProps('sk')}
                style={{ flex: 1 }} 
              />
            </Group>

            {/* <TextInput
              label="Preferred Order of Fields"
              placeholder="Preferred Order of Fields"
              {...form.getInputProps('preferredOrder')}
            /> */}
            {/* <TagsInput
              label="Custom Omit Filters"
              placeholder="Enter Omit Filters"
              defaultValue={[]}
              splitChars={[]}
              clearable
              {...form.getInputProps('omitFilters')}
            /> */}

            <Button type="submit"  color={saving ? 'green' : 'primary.8'}>
              {saving ? 'Saved' : 'Save'}
            </Button>
          </Stack>
        </form>
      </Card>
    </Container>
  );
}
