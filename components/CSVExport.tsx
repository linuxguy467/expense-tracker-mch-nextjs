'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import generateCsv from '@/app/actions/generateCsv';

const CSVExport = () => {
  const handleCSVExport = async () => {
    const { csvStr, timestamp, error } = await generateCsv();

    if (!error) {
      const blob = new Blob([csvStr ?? ''], {
        type: 'text/csv;charset=utf-8',
      });
      const csvUrl = URL.createObjectURL(blob);

      const link: HTMLAnchorElement = document.createElement('a');
      link.href = csvUrl;
      link.download = `transactions_${timestamp}.csv`;
      link.click();

      toast.success(`transactions_${timestamp}.csv downloaded successfully`);

      URL.revokeObjectURL(csvUrl);
    } else {
      toast.error(error);
    }
  };

  return (
    <button className='export-btn' onClick={() => handleCSVExport()}>
      <FontAwesomeIcon icon={faFileExport} />
    </button>
  );
};

export default CSVExport;
