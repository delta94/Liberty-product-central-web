import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Input, InputNumber, Icon } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { KitItemsResult, SalesPresentationItemClass, KitItemInput } from 'graphql';
import { Droppable, DroppableProvided, DroppableStateSnapshot, Draggable, DraggableProvided, DraggableStateSnapshot } from 'react-beautiful-dnd';
import KitNumberInput from '../../../../../components/NumberInputs/KitNumberInput';
import { some } from 'lodash';

export interface IKitItemGroupProps {
  kitItems: KitItemsResult[];
  hasPriceLevel: (priceLevel: string) => boolean;
  form: WrappedFormUtils;
  removeKit: (e: any, kitItem: string) => void;
  priceAdjustPercent: number;
  priceAdjustPercentTo: string;
  cubeAdjust: number;
  cubeAdjustTo: string;
  priceLevels: string[];
  itemClass: SalesPresentationItemClass;
}

const adjustablePriceLevels = ['DROPSHIP', 'DROPSHIP_M', 'DROPSHIP_X', 'FOB', 'FOB_M', 'LEVEL0', 'LEVEL1', 'LEVEL2', 'LEVEL3'];

const KitItemGroup: React.FunctionComponent<IKitItemGroupProps> = ({
  kitItems,
  hasPriceLevel,
  form,
  removeKit,
  priceAdjustPercent,
  priceAdjustPercentTo,
  cubeAdjust,
  cubeAdjustTo,
  priceLevels,
  itemClass,
}) => {
  const [priceAdjustment, setPriceAdjustment] = useState(0);
  const [priceAdjustmentTo, setPriceAdjustmentTo] = useState('All');

  const [cubeAdjustment, setCubeAdjustment] = useState(0);
  const [cubeAdjustmentTo, setCubeAdjustmentTo] = useState('All');

  useEffect(() => {
    if (
      priceAdjustPercent !== priceAdjustment ||
      priceAdjustPercentTo !== priceAdjustmentTo ||
      cubeAdjust !== cubeAdjustment ||
      cubeAdjustTo !== cubeAdjustmentTo
    ) {
      if (priceAdjustPercent !== priceAdjustment || priceAdjustPercentTo !== priceAdjustmentTo) {
        kitItems.map((kitItem, kitItemIndex: number) => {
          kitItem.kitItems.map((item, itemIndex) => {
            priceLevels.map(priceLevel => {
              if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
                const customPriceFieldValue = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`);
                const fieldValue = Number(item[`${priceLevel}_Original`] ? item[`${priceLevel}_Original`]! : 0);
                const fieldName = `kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}`;
                let adjustedPrice = fieldValue;

                if (!customPriceFieldValue) {
                  let cubes = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].cubes`);
                  let cubeAdjustedPrice = cubeAdjust * Number(cubes);

                  if (priceLevel === priceAdjustPercentTo || priceAdjustPercentTo === 'All') {
                    if (priceLevel === cubeAdjustTo || cubeAdjustTo === 'All') {
                      adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustPercent / 100) * fieldValue + cubeAdjustedPrice);
                    } else {
                      adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustPercent / 100) * fieldValue);
                    }
                    form.setFieldsValue({ [fieldName]: adjustedPrice === 0 ? fieldValue : adjustedPrice });
                  } else {
                    if (priceLevel === cubeAdjustTo || cubeAdjustTo === 'All') {
                      adjustedPrice = Math.ceil(adjustedPrice + cubeAdjustedPrice);
                    } else {
                      adjustedPrice = Math.ceil(adjustedPrice);
                    }
                    form.setFieldsValue({ [fieldName]: adjustedPrice });
                  }
                }
              }
            });
          });
        });
        setPriceAdjustment(priceAdjustPercent);
        setPriceAdjustmentTo(priceAdjustPercentTo);
      } else if (cubeAdjust !== cubeAdjustment || cubeAdjustTo !== cubeAdjustmentTo) {
        kitItems.map((kitItem, kitItemIndex: number) => {
          kitItem.kitItems.map((item, itemIndex) => {
            priceLevels.map(priceLevel => {
              if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
                const fieldValue = Number(item[`${priceLevel}_Original`] ? item[`${priceLevel}_Original`]! : 0);
                const fieldName = `kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}`;
                const customPriceFieldValue = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`);

                if (!customPriceFieldValue) {
                  let adjustedPrice = fieldValue;
                  let cubes = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].cubes`);
                  let cubeAdjustedPrice = cubeAdjust * Number(cubes);
                  if (priceLevel === cubeAdjustTo || cubeAdjustTo === 'All') {
                    if (priceLevel === priceAdjustPercentTo || priceAdjustPercentTo === 'All') {
                      adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustPercent / 100) * fieldValue + cubeAdjustedPrice);
                    } else {
                      adjustedPrice = Math.ceil(adjustedPrice + cubeAdjustedPrice);
                    }

                    form.setFieldsValue({ [fieldName]: adjustedPrice === 0 ? fieldValue : adjustedPrice });
                  } else {
                    if (priceLevel === priceAdjustPercentTo || priceAdjustPercentTo === 'All') {
                      adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustPercent / 100) * fieldValue);
                    } else {
                      adjustedPrice = Math.ceil(adjustedPrice);
                    }

                    form.setFieldsValue({ [fieldName]: adjustedPrice });
                  }
                }
              }
            });
          });
        });
        setCubeAdjustment(cubeAdjust);
        setCubeAdjustmentTo(cubeAdjustTo);
      }
    }
  }, [priceAdjustPercent, priceAdjustPercentTo, cubeAdjust, cubeAdjustTo, kitItems, form]);

  const getTotalFor = (priceLevel: string, index: number): string => {
    const items = kitItems[index].kitItems.map((item, itemIndex) => {
      const fieldName = `kits[${index}].kitItems[${itemIndex}].${priceLevel}`;
      const quantity = kitItems[index].kitItems[itemIndex].kitQuantity;
      const value = form.getFieldValue(fieldName);
      return Number(value) * quantity;
    });
    return Number(items.reduce((prev, curr) => (prev = prev + curr), 0)).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const grid: number = 8;
  const getListStyle = (isDraggingOver: boolean): {} => ({
    background: isDraggingOver ? '#f6f6f6' : 'white',
    padding: `0 ${grid}`,
    width: '100%',
    minHeight: (35 + 25) * kitItems.length + kitItems.map(p => p.kitItems.length).reduce((p, c) => p + c, 0) * 34.5,
  });

  const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
    userSelect: 'none',
    background: isDragging ? 'white' : 'white',
    ...draggableStyle,
  });

  const getAdjustedPrice = (priceLevel: string, kitItemIndex: number, itemIndex: number): number => {
    const fieldValue = Number(kitItems[kitItemIndex].kitItems[itemIndex][`${priceLevel}_Original`]);
    if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
      // const fieldName = `kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}`;
      // const customPriceFieldValue = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`);

      let adjustedPrice = fieldValue;
      let cubes = form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].cubes`);
      let cubeAdjustedPrice = cubeAdjustment * Number(cubes);

      if (priceLevel === priceAdjustmentTo || priceAdjustmentTo === 'All') {
        if (priceLevel === cubeAdjustmentTo || cubeAdjustmentTo === 'All') {
          adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustment / 100) * fieldValue + cubeAdjustedPrice);
        } else {
          adjustedPrice = Math.ceil(adjustedPrice + (priceAdjustment / 100) * fieldValue);
        }
      } else {
        if (priceLevel === cubeAdjustmentTo || cubeAdjustmentTo === 'All') {
          adjustedPrice = Math.ceil(adjustedPrice + cubeAdjustedPrice);
        } else {
          adjustedPrice = Math.ceil(adjustedPrice);
        }
      }

      return adjustedPrice;
    }
    return fieldValue;
  };

  const resetPrice = (priceLevel: string, kitItemIndex: number, itemIndex: number): void => {
    form.setFieldsValue({ [`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`]: 0 });
    form.setFieldsValue({ [`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}`]: getAdjustedPrice(priceLevel, kitItemIndex, itemIndex) });
  };

  const getKitPrice = (kitItem: KitItemInput, priceLevel: string): number => {
    const kitItemPrice = kitItem[priceLevel];
    // const qty = kitItem.kitQuantity;
    // console.log('kitItemPrice, qty', kitItemPrice, qty, kitItemPrice * qty);
    return kitItemPrice; // * qty;
  };

  return (
    <>
      <Droppable droppableId="0">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
            {kitItems.map((item, kitItemIndex: number) => (
              <Draggable key={`Drag-${item.kitItem}|${kitItemIndex}`} draggableId={item.kitItem} index={kitItemIndex}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                    >
                      <Row key={`${item.kitItem}|${kitItemIndex}`} style={{ marginBottom: 25, border: 'solid 1px #ccc' }}>
                        <Col style={{ backgroundColor: '#efefef' }}>
                          {form.getFieldDecorator(`kits[${kitItemIndex}].kitItem`, {
                            initialValue: item.kitItem,
                          })(<Input type="hidden" />)}
                          {form.getFieldDecorator(`kits[${kitItemIndex}].displayOrder`, {
                            initialValue: item.displayOrder ? item.displayOrder : kitItemIndex,
                          })(<Input type="hidden" />)}

                          {/* <Row type="flex" gutter={10} style={{ alignItems: 'center', padding: '10px 0', margin: 0 }}>
                            <Col style={{ flex: 2, fontWeight: 700 }}>Item Number</Col>
                            <Col style={{ flex: 4, fontWeight: 700 }}>Item Description</Col>
                            {hasPriceLevel('DROPSHIP') && <Col style={{ flex: 1 }}>{form.getFieldValue('DROPSHIP')}</Col>}
                            {hasPriceLevel('DROPSHIP_M') && <Col style={{ flex: 1 }}>{form.getFieldValue('DROPSHIP_M')}</Col>}
                            {hasPriceLevel('DROPSHIP_X') && <Col style={{ flex: 1 }}>{form.getFieldValue('DROPSHIP_X')}</Col>}
                            {hasPriceLevel('FOB') && <Col style={{ flex: 1 }}>{form.getFieldValue('FOB')}</Col>}
                            {hasPriceLevel('FOB_M') && <Col style={{ flex: 1 }}>{form.getFieldValue('FOB_M')}</Col>}
                            {hasPriceLevel('LEVEL0') && <Col style={{ flex: 1 }}>{form.getFieldValue('LEVEL0')}</Col>}
                            {hasPriceLevel('LEVEL1') && <Col style={{ flex: 1 }}>{form.getFieldValue('LEVEL1')}</Col>}
                            {hasPriceLevel('LEVEL2') && <Col style={{ flex: 1 }}>{form.getFieldValue('LEVEL2')}</Col>}
                            {hasPriceLevel('LEVEL3') && <Col style={{ flex: 1 }}>{form.getFieldValue('LEVEL3')}</Col>}
                            {hasPriceLevel('MIX_FULL') && <Col style={{ flex: 1 }}>{form.getFieldValue('MIX_FULL')}</Col>}
                            {hasPriceLevel('MIX_HALF') && <Col style={{ flex: 1 }}>{form.getFieldValue('MIX_HALF')}</Col>}
                            {hasPriceLevel('MIX_QTR') && (
                              <Col style={{ flex: 1 }}>
                                {form.getFieldValue('MIX_QTR')}
                              </Col>
                            )}
                          </Row> */}
                          {item.kitItems.map((kitItem, itemIndex: number) => (
                            <Row
                              key={`${kitItem.itemNumber}|${kitItemIndex}|${itemIndex}`}
                              type="flex"
                              gutter={10}
                              style={{ margin: 0, padding: '0', alignItems: 'center' }}
                            >
                              <Col style={{ flex: 2, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemNumber}</Col>
                              <Col style={{ flex: 4, margin: '0', fontSize: 14, fontWeight: 300 }}>{kitItem.itemDescription}</Col>
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].itemDescription`, {
                                initialValue: kitItem.itemDescription,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].itemNumber`, {
                                initialValue: kitItem.itemNumber,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].kitItem`, {
                                initialValue: kitItem.kitItem,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].kitName`, {
                                initialValue: kitItem.kitName,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].kitQuantity`, {
                                initialValue: kitItem.kitQuantity,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].cubes`, {
                                initialValue: kitItem.cubes,
                              })(<Input type="hidden" />)}
                              {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].dimensions`, {
                                initialValue: kitItem.dimensions,
                              })(<Input type="hidden" />)}
                              {hasPriceLevel('DROPSHIP') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_Original`, {
                                    initialValue: kitItem[`DROPSHIP_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_CustomPricing`, {
                                    initialValue: kitItem[`DROPSHIP_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['DROPSHIP'] : getKitPrice(kitItem, 'DROPSHIP'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        // formatter={value => {
                                        //   console.log('formatter value', value);
                                        //   return `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',').replace(/(\$ \$)/g, '$');
                                        // }}
                                        // parser={value => {
                                        //   console.log('parser', value, value!.replace(/\$\s?|(,*)/g, ''));
                                        //   return value!.replace(/\$\s?|(,*)/g, '');
                                        // }}
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('DROPSHIP', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('DROPSHIP_M') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_M_Original`, {
                                    initialValue: kitItem[`DROPSHIP_M_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_M_CustomPricing`, {
                                    initialValue: kitItem[`DROPSHIP_M_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_M`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['DROPSHIP_M'] : getKitPrice(kitItem, 'DROPSHIP_M'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_M_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_M_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('DROPSHIP_M', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('DROPSHIP_X') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_X_Original`, {
                                    initialValue: kitItem[`DROPSHIP_X_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_X_CustomPricing`, {
                                    initialValue: kitItem[`DROPSHIP_X_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_X`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['DROPSHIP_X'] : getKitPrice(kitItem, 'DROPSHIP_X'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_X_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].DROPSHIP_X_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('DROPSHIP_X', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('FOB') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_Original`, {
                                    initialValue: kitItem[`FOB_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_CustomPricing`, {
                                    initialValue: kitItem[`FOB_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['FOB'] : getKitPrice(kitItem, 'FOB'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('FOB', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('FOB_M') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_M_Original`, {
                                    initialValue: kitItem[`FOB_M_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_M_CustomPricing`, {
                                    initialValue: kitItem[`FOB_M_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_M`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['FOB_M'] : getKitPrice(kitItem, 'FOB_M'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_M_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].FOB_M_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('FOB_M', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('LEVEL0') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL0_Original`, {
                                    initialValue: kitItem[`LEVEL0_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL0_CustomPricing`, {
                                    initialValue: kitItem[`LEVEL0_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL0`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['LEVEL0'] : getKitPrice(kitItem, 'LEVEL0'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL0_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL0_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('LEVEL0', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('LEVEL1') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL1_Original`, {
                                    initialValue: kitItem[`LEVEL1_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL1_CustomPricing`, {
                                    initialValue: kitItem[`LEVEL1_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL1`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['LEVEL1'] : getKitPrice(kitItem, 'LEVEL1'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL1_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL1_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('LEVEL1', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('LEVEL2') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL2_Original`, {
                                    initialValue: kitItem[`LEVEL2_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL2_CustomPricing`, {
                                    initialValue: kitItem[`LEVEL2_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL2`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['LEVEL2'] : getKitPrice(kitItem, 'LEVEL2'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL2_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL2_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('LEVEL2', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('LEVEL3') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL3_Original`, {
                                    initialValue: kitItem[`LEVEL3_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL3_CustomPricing`, {
                                    initialValue: kitItem[`LEVEL3_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL3`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['LEVEL3'] : getKitPrice(kitItem, 'LEVEL3'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL3_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].LEVEL3_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('LEVEL3', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('MIX_FULL') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_FULL_Original`, {
                                    initialValue: kitItem[`MIX_FULL_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_FULL_CustomPricing`, {
                                    initialValue: kitItem[`MIX_FULL_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_FULL`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['MIX_FULL'] : getKitPrice(kitItem, 'MIX_FULL'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_FULL_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_FULL_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('MIX_FULL', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('MIX_HALF') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_HALF_Original`, {
                                    initialValue: kitItem[`MIX_HALF_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_HALF_CustomPricing`, {
                                    initialValue: kitItem[`MIX_HALF_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_HALF`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['MIX_HALF'] : getKitPrice(kitItem, 'MIX_HALF'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_HALF_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_HALF_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('MIX_HALF', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                              {hasPriceLevel('MIX_QTR') && (
                                <Col style={{ flex: 1, display: 'flex' }}>
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_QTR_Original`, {
                                    initialValue: kitItem[`MIX_QTR_Original`],
                                  })(<Input type="hidden" />)}
                                  {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_QTR_CustomPricing`, {
                                    initialValue: kitItem[`MIX_QTR_CustomPricing`],
                                  })(<Input type="hidden" />)}
                                  <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                                    {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_QTR`, {
                                      initialValue: itemClass.hasBeenSaved ? kitItem['MIX_QTR'] : getKitPrice(kitItem, 'MIX_QTR'),
                                      trigger: 'onBlur',
                                      valuePropName: 'value',
                                      rules: [{ required: true, message: 'Required' }],
                                    })(
                                      <InputNumber
                                        size="small"
                                        min={0}
                                        step={1}
                                        style={{ width: '100%' }}
                                        onBlur={e => {
                                          e.preventDefault();
                                          e.currentTarget.blur();
                                          form.setFieldsValue({
                                            [`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_QTR_CustomPricing`]: 1,
                                          });
                                        }}
                                        onPressEnter={e => {
                                          e.preventDefault();
                                        }}
                                      />
                                    )}
                                  </FormItem>
                                  {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].MIX_QTR_CustomPricing`) > 0 && (
                                    <Icon
                                      type="close-square"
                                      theme="filled"
                                      style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                      onClick={() => {
                                        resetPrice('MIX_QTR', kitItemIndex, itemIndex);
                                      }}
                                    />
                                  )}
                                </Col>
                              )}
                            </Row>
                          ))}
                          <Row
                            type="flex"
                            gutter={10}
                            style={{ alignItems: 'center', backgroundColor: '#383c4f', color: 'white', padding: '5px', margin: 0, borderTop: 'solid 1px #ccc' }}
                          >
                            <Col style={{ display: 'flex', flex: 6 }}>
                              <Button
                                icon="delete"
                                type="danger"
                                size="small"
                                style={{ marginRight: 7 }}
                                onClick={e => removeKit(e, item.kitItem)}
                                title="Remove"
                              ></Button>
                              <div style={{ fontWeight: 700, fontSize: '16px' }}>
                                {item.kitItems[0].kitItem} : {item.kitItems[0].kitName}
                              </div>
                            </Col>
                            {hasPriceLevel('DROPSHIP') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('DROPSHIP', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('DROPSHIP_M') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('DROPSHIP_M', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('DROPSHIP_X') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('DROPSHIP_X', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('FOB') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('FOB', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('FOB_M') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('FOB_M', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('LEVEL0') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL0', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('LEVEL1') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL1', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('LEVEL2') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL2', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('LEVEL3') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('LEVEL3', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('MIX_FULL') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('MIX_FULL', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('MIX_HALF') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('MIX_HALF', kitItemIndex)}</Col>
                            )}
                            {hasPriceLevel('MIX_QTR') && (
                              <Col style={{ flex: 1, textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{getTotalFor('MIX_QTR', kitItemIndex)}</Col>
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default KitItemGroup;
