import React from 'react';
import { Page, Document } from '@react-pdf/renderer';
import ExportPdf from './ExportPdf';

interface IProps {
  salesPresentationData: any;
}

export const PresentationPdf = (props: IProps) => {
  const { salesPresentationData } = props;
  return (
    <Document>
      <Page size="A4" orientation="landscape" wrap>
        {salesPresentationData && <ExportPdf salesPresentationData={salesPresentationData!} />}
      </Page>
    </Document>
  );
};

export default PresentationPdf;
