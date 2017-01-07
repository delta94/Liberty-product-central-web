import React from 'react';
import { Row, Col } from 'antd';
import { SalesPresentationPdfData, SalesPresentationPdfKitRows, SalesPresentationPdfRows } from 'graphql';
import { some } from 'lodash';

interface Props {
  salesPresentationData: Partial<SalesPresentationPdfData>;
}

export default (props: Props) => {
  const { presentation, items } = props.salesPresentationData;
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
  };

  const getCubeTotal = (priceLevel: string, items: SalesPresentationPdfRows[]): string => {
    const itemPrices = items.map((item, itemIndex) => {
      const fieldValue = item[priceLevel];
      const quantity = item.kitQuantity;
      return Number(fieldValue) * quantity;
    });
    return Number(itemPrices.reduce((prev, curr) => (prev = prev + curr), 0)).toLocaleString('en-US');
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
                <Col key={imageIndex} xs={12} sm={8}>
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
      {items &&
        items.map(itemClass => (
          <Row key={itemClass.itemClass.itemClass} style={{ margin: '20px' }}>
            <Col>
              <Row>
                <Col style={{ fontSize: '32px', fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.itemClassDescription}</Col>
              </Row>
              <Row type="flex" gutter={10}>
                <Col style={{ flex: 1, maxWidth: 270 }}>
                  {itemClass.itemClassImages &&
                    itemClass.itemClassImages.map((image, index: number) => (
                      <div key={index}>
                        <img style={{ maxWidth: 250, border: 'solid 1px #333', borderRadius: '7px', margin: '0 5px 10px 5px' }} src={image.imageUrl} />
                      </div>
                    ))}
                </Col>
                <Col style={{ flex: 1 }}>
                  <Row>
                    <Col>
                      {itemClass.itemClass && (
                        <Row>
                          <Col>
                            <Row style={{ marginBottom: 0 }}>
                              <Col>
                                <Row type="flex" gutter={10} style={{ alignItems: 'center', padding: '10px 0', margin: 0 }}>
                                  <Col style={{ flex: 2, fontWeight: 700 }}>Item Number</Col>
                                  <Col style={{ flex: 2, fontWeight: 700 }}>Item Description</Col>
                                  <Col style={{ flex: 1, fontWeight: 700 }}>Dimensions</Col>
                                  <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>Cubes</Col>
                                  {hasPriceLevel('DROPSHIP') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.DROPSHIP}</Col>
                                  )}
                                  {hasPriceLevel('DROPSHIP_M') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.DROPSHIP_M}</Col>
                                  )}
                                  {hasPriceLevel('DROPSHIP_X') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.DROPSHIP_X}</Col>
                                  )}
                                  {hasPriceLevel('FOB') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.FOB}</Col>}
                                  {hasPriceLevel('FOB_M') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.FOB_M}</Col>}
                                  {hasPriceLevel('LEVEL0') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.LEVEL0}</Col>}
                                  {hasPriceLevel('LEVEL1') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.LEVEL1}</Col>}
                                  {hasPriceLevel('LEVEL2') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.LEVEL2}</Col>}
                                  {hasPriceLevel('LEVEL3') && <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.LEVEL3}</Col>}
                                  {hasPriceLevel('MIX_FULL') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.MIX_FULL}</Col>
                                  )}
                                  {hasPriceLevel('MIX_HALF') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.MIX_HALF}</Col>
                                  )}
                                  {hasPriceLevel('MIX_QTR') && (
                                    <Col style={{ flex: 1, fontWeight: 700, textAlign: 'center' }}>{itemClass.itemClass.MIX_QTR}</Col>
                                  )}
                                </Row>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {itemClass.itemClassKits &&
                        itemClass.itemClassKits.map((kit: SalesPresentationPdfKitRows, kitItemIndex: number) => (
                          <Row key={kitItemIndex}>
                            <Col>
                              <Row key={`${kit.itemNumber}`} style={{ marginBottom: 0 }}>
                                <Col>
                                  {kit.items &&
                                    kit.items.map((kitItem: SalesPresentationPdfRows, itemIndex: number) => (
                                      <Row
                                        key={`${kitItem.itemNumber}|${kitItemIndex}|${itemIndex}`}
                                        type="flex"
                                        gutter={10}
                                        style={{ margin: 0, padding: '0' }}
                                      >
                                        <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemNumber}</Col>
                                        <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemDescription}</Col>
                                        <Col style={{ flex: 1, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.dimensions}</Col>
                                        <Col style={{ flex: 1, textAlign: 'center', margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.cubes}</Col>

                                        {hasPriceLevel('DROPSHIP') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.DROPSHIP!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('DROPSHIP_M') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.DROPSHIP_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('DROPSHIP_X') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.DROPSHIP_X!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('FOB') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.FOB!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('FOB_M') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.FOB_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('LEVEL0') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.LEVEL0!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('LEVEL1') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.LEVEL1!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('LEVEL2') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.LEVEL2!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('LEVEL3') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.LEVEL3!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('MIX_FULL') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.MIX_FULL!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('MIX_HALF') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.MIX_HALF!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                        {hasPriceLevel('MIX_QTR') && (
                                          <Col style={{ flex: 1, textAlign: 'center' }}>
                                            {Number(kitItem.MIX_QTR!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                          </Col>
                                        )}
                                      </Row>
                                    ))}
                                  <Row
                                    type="flex"
                                    gutter={10}
                                    style={{
                                      alignItems: 'center',
                                      backgroundColor: '#efefef',
                                      color: '#383c4f',
                                      padding: '2px',
                                      margin: 0,
                                    }}
                                  >
                                    <Col style={{ display: 'flex', flex: 5 }}>
                                      <div style={{ fontWeight: 700, fontSize: '16px' }}>
                                        {kit.itemNumber} : {kit.itemDescription}
                                      </div>
                                    </Col>
                                    <Col style={{ flex: 1, textAlign: 'center', margin: '0', fontSize: 14, fontWeight: 300 }}>
                                      {getCubeTotal('cubes', kit.items!)}
                                    </Col>
                                    {hasPriceLevel('DROPSHIP') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('DROPSHIP', kit.items!)}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('DROPSHIP_M', kit.items!)}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_X') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('DROPSHIP_X', kit.items!)}
                                      </Col>
                                    )}
                                    {hasPriceLevel('FOB') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('FOB', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('FOB_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('FOB_M', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('LEVEL0') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL0', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('LEVEL1') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL1', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('LEVEL2') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL2', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('LEVEL3') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL3', kit.items!)}</Col>
                                    )}
                                    {hasPriceLevel('MIX_FULL') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('MIX_FULL', kit.items!)}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_HALF') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('MIX_HALF', kit.items!)}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_QTR') && (
                                      <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>
                                        {getTotalFor('MIX_QTR', kit.items!)}
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {itemClass.itemClassItemNumbers &&
                        itemClass.itemClassItemNumbers.map((kitItem: SalesPresentationPdfRows, kitItemIndex: number) => (
                          <Row key={kitItemIndex}>
                            <Col>
                              <Row key={`${kitItem.itemNumber}`} style={{ marginBottom: 0 }}>
                                <Col>
                                  {/* {kit.items &&
                                    kit.items.map((kitItem: SalesPresentationPdfRows, itemIndex: number) => ( */}
                                  <Row key={`${kitItem.itemNumber}|${kitItemIndex}`} type="flex" gutter={10} style={{ margin: 0, padding: '0' }}>
                                    <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemNumber}</Col>
                                    <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemDescription}</Col>
                                    <Col style={{ flex: 1, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.dimensions}</Col>
                                    <Col style={{ flex: 1, textAlign: 'center', margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.cubes}</Col>
                                    {hasPriceLevel('DROPSHIP') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.DROPSHIP!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.DROPSHIP_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_X') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.DROPSHIP_X!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('FOB') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.FOB!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('FOB_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.FOB_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL0') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.LEVEL0!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL1') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.LEVEL1!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL2') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.LEVEL2!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL3') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.LEVEL3!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_FULL') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.MIX_FULL!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_HALF') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.MIX_HALF!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_QTR') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kitItem.MIX_QTR!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {itemClass.itemClassGroups && itemClass.itemClassGroups.length > 0 && (
                        <h3 style={{ fontWeight: 700, fontSize: '20px', margin: '5px 0 0 0' }}>Group Pricing</h3>
                      )}
                      {itemClass.itemClassGroups &&
                        itemClass.itemClassGroups.map((kit: SalesPresentationPdfRows, kitItemIndex: number) => (
                          <Row key={kitItemIndex}>
                            <Col>
                              <Row key={`${kit.itemNumber}`} style={{ marginBottom: 0 }}>
                                <Col>
                                  <Row key={`${kit.itemNumber}|${kitItemIndex}`} type="flex" gutter={10} style={{ margin: 0, padding: '0' }}>
                                    <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 700 }}>{kit.itemNumber}</Col>
                                    <Col style={{ flex: 3, margin: '0', fontSize: 14, fontWeight: 700 }}>{kit.itemDescription}</Col>
                                    <Col style={{ flex: 1, textAlign: 'center', margin: '0', fontSize: 14, fontWeight: 300 }}>{kit.cubes}</Col>
                                    {hasPriceLevel('DROPSHIP') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.DROPSHIP!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.DROPSHIP_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('DROPSHIP_X') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.DROPSHIP_X!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('FOB') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.FOB!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('FOB_M') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.FOB_M!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL0') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.LEVEL0!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL1') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.LEVEL1!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL2') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.LEVEL2!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('LEVEL3') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.LEVEL3!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_FULL') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.MIX_FULL!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_HALF') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.MIX_HALF!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                    {hasPriceLevel('MIX_QTR') && (
                                      <Col style={{ flex: 1, textAlign: 'center' }}>
                                        {Number(kit.MIX_QTR!).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                                      </Col>
                                    )}
                                  </Row>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        ))}
                    </Col>
                  </Row>
                  <Row>
                    <Col>{renderFeatures(itemClass.itemClassFeatures)}</Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        ))}
    </>
  );
};
