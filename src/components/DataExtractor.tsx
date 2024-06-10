import React from 'react';

interface Props {
  data: {
    release: string;
    build: string;
    "mgs-version": string[];
  } | null;
}

const DataExtractor: React.FC<Props> = ({ data }) => {
  // Add a check for null data
  if (!data) {
    return null; // Or you can return a message or placeholder JSX here
  }

  const { release, build, "mgs-version": mgsVersion } = data;

  const extractedData = {
    release,
    build,
    "mgs-version": mgsVersion
  };

  return (
    <div>
      <pre>{JSON.stringify(extractedData, null, 2)}</pre>
    </div>
  );
};

export default DataExtractor;
