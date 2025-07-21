import React from 'react';
import { PurpleDropdown } from 'components/common/PurpleDropdown';
import { aiWorkers } from 'constants/workers';
import { useForm } from 'contexts/FormContext';

interface WorkerSelectorProps {
  handleWorkerChange: (value: string) => void;
}
const WorkerSelector: React.FC<WorkerSelectorProps> = ({ handleWorkerChange }) => {
  const { form } = useForm();

  return (
    <PurpleDropdown 
      options={aiWorkers.map((worker) => ({
        name: worker.key,
        label: worker.name.slice(0, 1).toUpperCase() + worker.name.slice(1),
      }))}
      value={form.worker}
      label={form.worker.slice(0, 1).toUpperCase() + form.worker.slice(1)}
      onChange={handleWorkerChange}
      isClickToOpen={false}
    />
  );
};

export default WorkerSelector;