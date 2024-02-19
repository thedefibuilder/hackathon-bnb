import React, { useState } from 'react';

import type { TVulnerability } from '@genezio-sdk/ai-builder_us-east-1';

import { pdf } from '@react-pdf/renderer';
import { Loader2 } from 'lucide-react';

import downloadContent from '@/lib/download';

import DownloadButton from '../../download-button';
import AuditPdfRenderer from './audit-pdf-renderer';

type TDownloadAuditButtonProperties = {
  audit: TVulnerability[];
};

export default function DownloadAuditButton({ audit }: TDownloadAuditButtonProperties) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  return (
    <DownloadButton
      className='w-full md:w-auto'
      onButtonClick={async () => {
        setIsGeneratingPdf(true);

        const blobPdf = await pdf(<AuditPdfRenderer audit={audit} />).toBlob();
        downloadContent(blobPdf, 'DeFi Builder - Smart contract audit.pdf');

        setIsGeneratingPdf(false);
      }}
    >
      {isGeneratingPdf ? (
        <div className='flex items-center gap-x-2.5'>
          <Loader2 className='animate-spin' />
          <span>Generating PDF</span>
        </div>
      ) : (
        <span>Download Audit</span>
      )}
    </DownloadButton>
  );
}
