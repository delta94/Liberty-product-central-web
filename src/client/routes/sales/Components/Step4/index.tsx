import * as React from 'react';
import { usePresentationPdfDataQuery } from 'graphql';
import GraphQLError from '@/components/GraphQLError';
import { Row, Col, Anchor, Button, Icon } from 'antd';
import { some } from 'lodash';
import PresentationPdf from './PresentationPdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfPage from './PdfPage';
import omitDeep from 'omit-deep-lodash';
import ExportPdf from './ExportPdf';
import PdfButton from '@/components/PdfButton';
import { RouteComponentProps, withRouter } from 'react-router';
import moment from 'moment';

export interface IStep4Props extends RouteComponentProps<any> {}

export default withRouter((props: IStep4Props) => {
  const { data, loading, error } = usePresentationPdfDataQuery({ variables: { id: +localStorage.getItem('spid')! }, fetchPolicy: 'network-only' });
  if (loading) return null;
  if (error) return <GraphQLError error={error} />;
  const { presentation, items } = data!.presentationPdfData;

  const navigateBack = () => {
    props.history.push(`/sales-presentations/wizard/step-1`);
  };

  const getPreviousUrlText = () => {
    return 'Details';
  };

  const renderFeatures = (features: any) => {
    const numbers = Array.from({ length: 20 }, (v, i) => i);
    return (
      <Row>
        <Col>
          <h3 style={{ fontWeight: 700, fontSize: '20px', margin: '5px 0 0 0' }}>Features</h3>
          <Row type="flex" gutter={10}>
            {numbers.map(imageIndex => {
              if (!features[`Feature_${imageIndex}`] || features[`Feature_${imageIndex}`] === '') return null;
              return (
                <Col xs={12} sm={8}>
                  {features[`Feature_${imageIndex}`]}
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    );
  };
  return (
    <>
      <Anchor style={{ borderBottom: 'solid 1px #383c4f' }}>
        <Row>
          <Col style={{ fontSize: '24px', padding: 10, backgroundColor: '#383c4f', color: 'white', fontWeight: 700, textAlign: 'center' }}>
            Step 4 - PDF Preview
          </Col>
        </Row>
        <Row type="flex" style={{ alignItems: 'center', justifyContent: 'space-between', margin: '10px 20px 20px 20px' }}>
          <Col style={{ flex: 1 }}>
            <Row type="flex" gutter={12}>
              <Col style={{ flex: 10, paddingTop: 15, textAlign: 'right' }}>
                <Button className="header-button" icon="caret-left" onClick={navigateBack}>
                  Go To {getPreviousUrlText()}
                </Button>
                <PdfButton
                  key="PDFButton1"
                  document={<ExportPdf salesPresentationData={omitDeep(data!.presentationPdfData, ['__typename'])} />}
                  fileName={`${presentation.customerName}-${presentation.id}--${moment().format('MM-DD-YYYY')}.pdf`}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Anchor>
      <PdfPage salesPresentationData={omitDeep(data!.presentationPdfData, ['__typename'])} />
    </>
  );
});
