import React, { memo } from 'react';
import { Row, Col } from 'antd';
import { SalesPresentationPdfData, SalesPresentationPdfKitRows, SalesPresentationPdfRows, SalesPresentationItemClass } from 'graphql';
import { some } from 'lodash';
import { Image, Page, Text, View, Document, StyleSheet, Link } from '@react-pdf/renderer';
import logo from '@/images/logo/LibertyLogo_BigBell_Horizontal_Vector.png';

interface Props {
  salesPresentationData: Partial<SalesPresentationPdfData>;
}

export default memo((props: Props) => {
  const { presentation, items } = props.salesPresentationData;

  const styles = StyleSheet.create({
    header: {
      marginBottom: '5%',
      textAlign: 'left',
    },
    row: {
      display: 'flex',
    },
    column: {
      flex: 1,
    },
    left: {
      textAlign: 'left',
    },
    right: {
      textAlign: 'right',
    },

    table: {
      // display: 'table',
      width: 'auto',
      borderStyle: 'solid',
      borderWidth: 1,
      borderRightWidth: 0,
      borderBottomWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },

    tableNoBorder: {
      // display: 'table',
      width: 'auto',
      marginBottom: 10,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '50%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
      textAlign: 'left',
    },
    tableCol1: {
      width: '100%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },
    tableCol4: {
      width: '25%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      borderTopColor: '#edf1f2',
      borderLeftColor: '#edf1f2',
      borderRightColor: '#edf1f2',
      borderBottomColor: '#edf1f2',
    },

    tableColNoBorder: {
      width: '50%',
      fontSize: 9,
    },
    tableCell: {
      margin: 'auto',
      marginLeft: 5,
      marginRight: 2,
      marginTop: 5,
      marginBottom: 5,
      fontSize: 10,
      color: 'black',
    },

    textSizeBig: {
      fontSize: 14,
    },

    backgroundGrey: {
      backgroundColor: '#f6f7f7',
    },
    image: { backgroundColor: 'white', padding: 5, paddingLeft: 0, marginBottom: 10, width: 150, height: 150, borderRadius: 70 },
    paddingLeft: { paddingLeft: 20 },
    paddingTop: { paddingTop: 10 },
    paddingRight: { paddingRight: 20 },
    paddingBottom: { paddingBottom: 10 },
    marginLeft: { marginLeft: 20 },
    marginRight: { marginRight: 20 },
    lineBreak: { height: 20 },
    pageNumber: {
      position: 'absolute',
      fontSize: 9,
      bottom: 25,
      fontStyle: 'italic',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'red',
      fontFamily: 'Helvetica-Oblique',
    },
    headerRow: {
      position: 'absolute',
      fontSize: 12,
      top: 20,
      left: 20,
      right: 20,
      height: 30,
      color: 'black',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    logo: {
      width: 125,
    },
  });

  const hasPriceLevel = (priceLevel: string) => {
    return some(presentation!.priceLevels, { priceLevel });
  };

  const getTotalFor = (priceLevel: string, items: SalesPresentationPdfRows[]): string => {
    const itemPrices = items.map((item, itemIndex) => {
      const fieldValue = item[priceLevel];
      const quantity = item.kitQuantity;
      return Number(fieldValue) * quantity;
    });
    return Number(itemPrices.reduce((prev, curr) => (prev = prev + curr), 0)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    // return Number(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const getCubeTotal = (priceLevel: string, items: SalesPresentationPdfRows[]): string => {
    const itemPrices = items.map((item, itemIndex) => {
      const fieldValue = item[priceLevel];
      const quantity = item.kitQuantity;
      return Number(fieldValue) * quantity;
    });
    return Number(itemPrices.reduce((prev, curr) => (prev = prev + curr), 0)).toLocaleString('en-US');
    // return Number(0).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const renderFeatures = (features: any) => {
    const numbers = Array.from({ length: 20 }, (v, i) => i);
    return (
      <View style={{ display: 'flex', marginTop: 25 }}>
        <Text style={{ fontSize: 8, height: 10, marginTop: 4, marginBottom: 2, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' }}>Features</Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            margin: 0,
            padding: 0,
            fontSize: 6,
            height: 8,
            width: 600,
          }}
        >
          {numbers.map(imageIndex => {
            if (features[`Feature_${imageIndex}`]) {
              const feature = features[`Feature_${imageIndex}`];
              return (
                <Text key={`${features}|${imageIndex}`} style={{ fontSize: 6, height: 8, flexGrow: 1, maxWidth: 200, width: 200 }}>
                  {feature}
                </Text>
              );
            }
          })}
        </View>
      </View>
    );
  };

  const renderHeaderRow = (itemClass: SalesPresentationItemClass) => {
    return (
      <View style={{ marginBottom: 0 }}>
        <View style={{ alignItems: 'center', height: 12, fontSize: 8, left: 0, right: 20, width: 630, margin: 0, display: 'flex', flexDirection: 'row' }}>
          <Text style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>Item Number</Text>
          <Text style={{ flex: 2, textAlign: 'left', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>Description</Text>
          <Text style={{ flex: 1, textAlign: 'left', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>Dimensions</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>Cubes</Text>
          {hasPriceLevel('DROPSHIP') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.DROPSHIP}</Text>
          )}
          {hasPriceLevel('DROPSHIP_M') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.DROPSHIP_M}</Text>
          )}
          {hasPriceLevel('DROPSHIP_X') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.DROPSHIP_X}</Text>
          )}
          {hasPriceLevel('FOB') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.FOB}</Text>}
          {hasPriceLevel('FOB_M') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.FOB_M}</Text>}
          {hasPriceLevel('LEVEL0') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.LEVEL0}</Text>}
          {hasPriceLevel('LEVEL1') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.LEVEL1}</Text>}
          {hasPriceLevel('LEVEL2') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.LEVEL2}</Text>}
          {hasPriceLevel('LEVEL3') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.LEVEL3}</Text>}
          {hasPriceLevel('MIX_FULL') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.MIX_FULL}</Text>
          )}
          {hasPriceLevel('MIX_HALF') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.MIX_HALF}</Text>
          )}
          {hasPriceLevel('MIX_QTR') && <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica-Bold' }}>{itemClass.MIX_QTR}</Text>}
        </View>
      </View>
    );
  };

  const renderKitItem = (kit: SalesPresentationPdfKitRows, kitItemIndex: number, itemIndex: number) => {
    return (
      <View key={`${kitItemIndex}|${kit.itemNumber}`}>
        {kit.items &&
          kit.items.map((kitItem: SalesPresentationPdfRows, itemIndex: number) => (
            <View
              key={`${kitItem.itemNumber}|${kitItemIndex}|${itemIndex}`}
              style={{
                alignItems: 'center',
                height: 8,
                fontSize: 6,
                left: 0,
                right: 20,
                width: 630,
                margin: 0,
                padding: '0 2px',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.itemNumber}</Text>
              <Text style={{ flex: 2, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.itemDescription}</Text>
              <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.dimensions}</Text>
              <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300, textAlign: 'center' }}>{kitItem.cubes}</Text>
              {hasPriceLevel('DROPSHIP') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {Number(kitItem.DROPSHIP!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
              )}
              {hasPriceLevel('DROPSHIP_M') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {Number(kitItem.DROPSHIP_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
              )}
              {hasPriceLevel('DROPSHIP_X') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {Number(kitItem.DROPSHIP_X!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
              )}
              {hasPriceLevel('FOB') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.FOB!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('FOB_M') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.FOB_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('LEVEL0') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL0!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('LEVEL1') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL1!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('LEVEL2') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL2!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('LEVEL3') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL3!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
              {hasPriceLevel('MIX_FULL') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {Number(kitItem.MIX_FULL!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
              )}
              {hasPriceLevel('MIX_HALF') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>
                  {Number(kitItem.MIX_HALF!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                </Text>
              )}
              {hasPriceLevel('MIX_QTR') && (
                <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.MIX_QTR!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
              )}
            </View>
          ))}
        <View
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#efefef',
            color: '#383c4f',
            padding: '6px 2px',
            margin: 0,
            marginBottom: 3,
            height: 8,

            fontSize: 6,
            left: 0,
            right: 20,
            width: 630,
            flexDirection: 'row',
          }}
        >
          <Text style={{ flex: 4, fontSize: 8, fontWeight: 'black', height: 10, fontFamily: 'Helvetica-Bold', marginTop: 1 }}>
            {kit.itemNumber} : {kit.itemDescription}
          </Text>
          <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
            {getCubeTotal('cubes', kit.items!)}
          </Text>
          {hasPriceLevel('DROPSHIP') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('DROPSHIP', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('DROPSHIP_M') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('DROPSHIP_M', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('DROPSHIP_X') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('DROPSHIP_X', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('FOB') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('FOB', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('FOB_M') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('FOB_M', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('LEVEL0') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('LEVEL0', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('LEVEL1') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('LEVEL1', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('LEVEL2') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('LEVEL2', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('LEVEL3') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('LEVEL3', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('MIX_FULL') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('MIX_FULL', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('MIX_HALF') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('MIX_HALF', kit.items!)}
            </Text>
          )}
          {hasPriceLevel('MIX_QTR') && (
            <Text style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: 8, height: 10, fontFamily: 'Helvetica-Bold' }}>
              {getTotalFor('MIX_QTR', kit.items!)}
            </Text>
          )}
        </View>
      </View>
    );
  };

  const renderIndividualRow = (kitItem, rowIndex) => {
    return (
      <View
        key={`${kitItem.itemNumber}|${rowIndex}`}
        style={{ alignItems: 'center', height: 8, fontSize: 6, left: 0, right: 20, width: 630, margin: 0, display: 'flex', flexDirection: 'row' }}
      >
        <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.itemNumber}</Text>
        <Text style={{ flex: 2, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.itemDescription}</Text>
        <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300 }}>{kitItem.dimensions}</Text>
        <Text style={{ flex: 1, margin: 0, fontSize: 6, fontWeight: 300, textAlign: 'center' }}>{kitItem.cubes}</Text>
        {hasPriceLevel('DROPSHIP') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.DROPSHIP!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('DROPSHIP_M') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.DROPSHIP_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('DROPSHIP_X') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.DROPSHIP_X!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('FOB') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.FOB!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('FOB_M') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.FOB_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('LEVEL0') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL0!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('LEVEL1') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL1!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('LEVEL2') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL2!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('LEVEL3') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.LEVEL3!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('MIX_FULL') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.MIX_FULL!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('MIX_HALF') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.MIX_HALF!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
        {hasPriceLevel('MIX_QTR') && (
          <Text style={{ flex: 1, textAlign: 'center' }}>{Number(kitItem.MIX_QTR!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</Text>
        )}
      </View>
    );
  };

  const renderImages = (images: any) => {
    return (
      <View wrap={false}>
        {images.map((image, index) => {
          return (
            <Image
              key={`${image.imageUrl}|${index}`}
              style={{ marginBottom: 10, width: 125, height: 125, borderRadius: 7, padding: 0, borderStyle: 'solid', borderWidth: 1, borderColor: '#000000' }}
              src={image.imageUrl}
            />
          );
        })}
      </View>
    );
  };

  return (
    <Document>
      {items &&
        items.map((data, index) => (
          <Page key={`Page-${index}`} size="LETTER" orientation="landscape" wrap={false} debug={false}>
            <View style={styles.headerRow}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 30, fontFamily: 'Helvetica-Bold' }}>{data.itemClass.itemClass}</Text>
              <Text style={{ fontWeight: 'bold', fontSize: 16, fontFamily: 'Helvetica-Bold' }}>{data.itemClass.itemClassDescription}</Text>
              <Image style={styles.logo} src={logo} />
            </View>
            <View style={{ top: 50, left: 20, right: 170, height: '1vh' }}>{renderImages(data.itemClassImages)}</View>
            <View style={{ top: 50, left: 155, height: '1vh', right: 0 }} wrap={false}>
              {renderHeaderRow(data.itemClass)}
              {data.itemClassKits &&
                data.itemClassKits.length > 0 &&
                data.itemClassKits.map((kit: SalesPresentationPdfKitRows, kitItemIndex: number) => <>{renderKitItem(kit, kitItemIndex, index)}</>)}
              {data.itemClassItemNumbers && data.itemClassItemNumbers.length > 0 && (
                <View>
                  <Text style={{ fontSize: 8, height: 10, marginTop: 4, marginBottom: 2, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' }}>
                    Individual Items
                  </Text>
                  {data.itemClassItemNumbers.map((row: SalesPresentationPdfRows, spRowIndex) => (
                    <>{renderIndividualRow(row, spRowIndex)}</>
                  ))}
                </View>
              )}
              {data.itemClassGroups && data.itemClassGroups.length > 0 && (
                <View>
                  <Text style={{ fontSize: 8, height: 10, marginTop: 4, marginBottom: 2, fontWeight: 'bold', fontFamily: 'Helvetica-Bold' }}>
                    Group Pricing
                  </Text>
                  {data.itemClassGroups.map((row: SalesPresentationPdfRows, spRowIndex) => (
                    <>{renderIndividualRow(row, spRowIndex)}</>
                  ))}
                </View>
              )}
              {renderFeatures(data.itemClassFeatures)}
            </View>
            <Text
              style={styles.pageNumber}
              render={({ pageNumber, totalPages }) => `LIBERTY FURNITURE CONFIDENTIAL - PAGE ${pageNumber} / ${totalPages}`}
              fixed
            />
          </Page>
        ))}
    </Document>
  );
});
