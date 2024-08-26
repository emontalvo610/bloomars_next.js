import { FC } from 'react';

type SaveCancelProps = {
  handleSave: () => void;
  handleCancel: () => void;
};

const SaveCancel: FC<SaveCancelProps> = ({ handleSave, handleCancel }) => {
  return (
    <div className="flex justify-end gap-4 mt-4">
      <button
        className="hover:bg-indigo-100 text-indigo-600 px-6 py-2 border border-indigo-100 rounded-md"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="hover:bg-red-100 text-red-600 px-6 py-2 border border-red-100 rounded-md"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </div>
  );
};

export default SaveCancel;
