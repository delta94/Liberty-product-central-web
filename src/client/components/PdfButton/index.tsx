import { Icon } from 'antd';
import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Button } from 'antd';

interface IProps {
  document: any;
  fileName: string;
}

export const PdfButton = (props: IProps) => {
  const [state, setState] = React.useState({ showPDF: false, firstClick: true });

  const btnText = (
    <>
      <Icon type="setting" /> <span>Create PDF</span>
    </>
  );

  const onClick = () => {
    setState({ ...state, showPDF: true });
  };

  return (
    <>
      {!state.showPDF && (
        <Button type="primary" style={{ width: '160px', fontWeight: 700 }} onClick={onClick}>
          {btnText}
        </Button>
      )}

      {state.showPDF && (
        <PDFDownloadLink className="ant-btn ant-btn-primary" style={{ width: '160px', fontWeight: 700 }} document={props.document} fileName={props.fileName}>
          {({ blob, url, loading: pdfLoading, error }) =>
            pdfLoading ? (
              <>
                <Icon type="setting" spin /> Creating PDF...
              </>
            ) : (
              <>
                <Icon type="cloud-download" style={{ fontSize: 18, position: 'relative', top: 3 }} /> <span>Download PDF</span>
              </>
            )
          }
        </PDFDownloadLink>
      )}
    </>
  );
};

export default PdfButton;
