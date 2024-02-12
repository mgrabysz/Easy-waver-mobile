import React from "react";

interface SamplesMetadataContextType {
  samplesMetadata: SampleMetadata[];
  setSamplesMetadata: (samples: SampleMetadata[]) => void;
}

const SamplesMetadataContext = React.createContext<SamplesMetadataContextType>({
  samplesMetadata: [],
  setSamplesMetadata: () => {},
});

export default SamplesMetadataContext;
