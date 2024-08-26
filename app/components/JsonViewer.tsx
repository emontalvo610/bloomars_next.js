'use client';

import { FC, useCallback, useEffect, useState } from 'react';
import ReactJson, { InteractionProps } from 'react-json-view';
import SaveCancel from '@/components/SaveCancel';
import { updateMenus } from '@/lib/services';
import { MenuItem } from '@/types/menu';

interface JsonViewerProps {
  initialJson: Object;
  onUpdate: (newMenuItems: MenuItem[]) => void;
}

const JsonViewer: FC<JsonViewerProps> = ({ initialJson, onUpdate }) => {
  const [json, setJson] = useState(initialJson);

  const handleEdit = (edit: InteractionProps) => {
    setJson(edit.updated_src);
  };

  const handleSave = useCallback(async () => {
    try {
      const updatedMenus = await updateMenus(json as MenuItem[]);
      onUpdate(updatedMenus);
    } catch (error) {
      console.error('Failed to update menus:', error);
    }
  }, [json]);

  const handleCancel = useCallback(() => {
    setJson(initialJson);
  }, [initialJson]);

  useEffect(() => {
    setJson(initialJson);
  }, [initialJson]);

  return (
    <>
      <ReactJson
        src={json}
        onEdit={handleEdit}
        onAdd={handleEdit}
        onDelete={handleEdit}
        theme="google"
        iconStyle="circle"
        collapsed={false}
        displayDataTypes={false}
        displayObjectSize={false}
      />
      <SaveCancel handleSave={handleSave} handleCancel={handleCancel} />
    </>
  );
};

export default JsonViewer;
