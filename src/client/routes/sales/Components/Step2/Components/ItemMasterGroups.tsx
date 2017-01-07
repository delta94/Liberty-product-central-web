import * as React from 'react';
import { Row, Col, Button, InputNumber, Input, Icon } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import { SalesPresentationItemClass, SalesPresentationItemClassGroup } from 'graphql';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import { Draggable, DraggableProvided, DraggableStateSnapshot, Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';
import { some } from 'lodash';

export interface IIndividualItemsProps {
  hasPriceLevel: (priceLevel: string) => boolean;
  groups: SalesPresentationItemClassGroup[];
  form: WrappedFormUtils;
  removeItem: (e: any, itemNumber: string) => void;
  priceAdjustPercent: number;
  priceAdjustPercentTo: string;
  cubeAdjust: number;
  cubeAdjustTo: string;
  priceLevels: string[];
  itemClass: SalesPresentationItemClass;
}

const adjustablePriceLevels = ['DROPSHIP', 'DROPSHIP_M', 'DROPSHIP_X', 'FOB', 'FOB_M', 'LEVEL0', 'LEVEL1', 'LEVEL2', 'LEVEL3'];

const ItemMasterGroups: React.FunctionComponent<IIndividualItemsProps> = ({
  hasPriceLevel,
  groups,
  form,
  removeItem,
  priceAdjustPercentTo,
  priceAdjustPercent,
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
        groups.map((item, index: number) => {
          priceLevels.map(priceLevel => {
            if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
              const customPriceFieldValue = form.getFieldValue(`groups[${index}].${priceLevel}_CustomPricing`);
              if (!customPriceFieldValue) {
                const fieldValue = Number(item[`${priceLevel}_Original`] ? item[`${priceLevel}_Original`]! : 0);
                const fieldName = `groups[${index}].${priceLevel}`;

                let adjustedPrice = fieldValue;
                let cubes = form.getFieldValue(`groups[${index}].cubes`);
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
        setPriceAdjustment(priceAdjustPercent);
        setPriceAdjustmentTo(priceAdjustPercentTo);
      } else if (cubeAdjust !== cubeAdjustment || cubeAdjustTo !== cubeAdjustmentTo) {
        groups.map((item, index: number) => {
          priceLevels.map(priceLevel => {
            if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
              const customPriceFieldValue = form.getFieldValue(`groups[${index}].${priceLevel}_CustomPricing`);
              if (!customPriceFieldValue) {
                const fieldValue = Number(item[`${priceLevel}_Original`] ? item[`${priceLevel}_Original`]! : 0);
                const fieldName = `groups[${index}].${priceLevel}`;
                let adjustedPrice = fieldValue;
                let cubes = form.getFieldValue(`groups[${index}].cubes`);
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
        setCubeAdjustment(cubeAdjust);
        setCubeAdjustmentTo(cubeAdjustTo);
      }
    }
  }, [priceAdjustPercent, priceAdjustPercentTo, cubeAdjust, cubeAdjustTo, groups, form]);

  const grid: number = 8;
  const getListStyle = (isDraggingOver: boolean): {} => ({
    background: isDraggingOver ? '#f6f6f6' : 'white',
    padding: `0 ${grid}`,
    width: '100%',
    minHeight: groups.length * 35,
  });

  const getItemStyle = (draggableStyle: any, isDragging: boolean): {} => ({
    userSelect: 'none',
    background: isDragging ? 'white' : 'white',
    ...draggableStyle,
  });

  const getAdjustedPrice = (priceLevel: string, index: number): number => {
    const fieldValue = Number(groups[index][`${priceLevel}_Original`]);
    if (some(adjustablePriceLevels, apl => apl === priceLevel)) {
      let adjustedPrice = fieldValue;
      let cubes = form.getFieldValue(`groups[${index}].cubes`);
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

  const resetPrice = (priceLevel: string, index: number): void => {
    form.setFieldsValue({ [`groups[${index}].${priceLevel}_CustomPricing`]: 0 });
    form.setFieldsValue({ [`groups[${index}].${priceLevel}`]: getAdjustedPrice(priceLevel, index) });
  };

  return (
    <div>
      {/* <Row type="flex" gutter={10} style={{ alignItems: 'center' }}>
        <Col style={{ flex: 2, fontWeight: 700 }}>Kit Item</Col>
        <Col style={{ flex: 4, fontWeight: 700 }}>Kit Description</Col>
        {hasPriceLevel('DROPSHIP') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`DROPSHIP`, {
                initialValue: itemClass.DROPSHIP ? itemClass.DROPSHIP : 'DROPSHIP',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('DROPSHIP_M') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`DROPSHIP_M`, {
                initialValue: itemClass.DROPSHIP_M ? itemClass.DROPSHIP_M : 'DROPSHIP_M',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('DROPSHIP_X') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`DROPSHIP_X`, {
                initialValue: itemClass.DROPSHIP_X ? itemClass.DROPSHIP_X : 'DROPSHIP_X',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('FOB') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`FOB`, {
                initialValue: itemClass.FOB ? itemClass.FOB : 'FOB',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('FOB_M') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`FOB_M`, {
                initialValue: itemClass.FOB_M ? itemClass.FOB_M : 'FOB_M',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('LEVEL0') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`LEVEL0`, {
                initialValue: itemClass.LEVEL0 ? itemClass.LEVEL0 : 'LEVEL0',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('LEVEL1') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`LEVEL1`, {
                initialValue: itemClass.LEVEL1 ? itemClass.LEVEL1 : 'LEVEL1',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('LEVEL2') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`LEVEL2`, {
                initialValue: itemClass.LEVEL2 ? itemClass.LEVEL2 : 'LEVEL2',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('LEVEL3') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`LEVEL3`, {
                initialValue: itemClass.LEVEL3 ? itemClass.LEVEL3 : 'LEVEL3',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('MIX_FULL') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`MIX_FULL`, {
                initialValue: itemClass.MIX_FULL ? itemClass.MIX_FULL : 'MIX_FULL',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('MIX_HALF') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`MIX_HALF`, {
                initialValue: itemClass.MIX_HALF ? itemClass.MIX_HALF : 'MIX_HALF',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
        {hasPriceLevel('MIX_QTR') && (
          <Col style={{ flex: 1 }}>
            <FormItem hasFeedback style={{ margin: 0 }}>
              {form.getFieldDecorator(`MIX_QTR`, {
                initialValue: itemClass.MIX_QTR ? itemClass.MIX_QTR : 'MIX_QTR',
                rules: [{ required: true, message: 'Required' }],
              })(<Input size="small" style={{ fontWeight: 700 }} />)}
            </FormItem>
          </Col>
        )}
      </Row> */}
      <Droppable droppableId="2">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps} style={getListStyle(snapshot.isDraggingOver)}>
            {groups.map((item, index) => (
              <Draggable key={`Drag-${item.kitItem}|${index}`} draggableId={item.kitItem} index={index}>
                {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(provided.draggableProps.style, snapshot.isDragging)}
                    >
                      <Row key={`${item.kitItem}|${index}`} type="flex" gutter={10} style={{ alignItems: 'center' }}>
                        <Col style={{ flex: 2, margin: 0, fontSize: 14 }}>
                          <Button icon="delete" type="danger" size="small" style={{ marginRight: 7 }} onClick={e => removeItem(e, item.kitItem)}></Button>
                          {item.kitItem}
                        </Col>
                        <Col style={{ flex: 4, margin: '0', fontSize: 14 }}>{item.kitDescription}</Col>
                        {form.getFieldDecorator(`groups[${index}].kitDescription`, {
                          initialValue: item.kitDescription,
                        })(<Input type="hidden" />)}
                        {form.getFieldDecorator(`groups[${index}].kitItem`, {
                          initialValue: item.kitItem,
                        })(<Input type="hidden" />)}
                        {form.getFieldDecorator(`groups[${index}].cubes`, {
                          initialValue: item.cubes,
                        })(<Input type="hidden" />)}
                        {form.getFieldDecorator(`groups[${index}.displayOrder`, {
                          initialValue: item.displayOrder ? item.displayOrder : index,
                        })(<Input type="hidden" />)}
                        {hasPriceLevel('DROPSHIP') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_Original`, {
                              initialValue: item[`DROPSHIP_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_CustomPricing`, {
                              initialValue: item[`DROPSHIP_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].DROPSHIP`, {
                                initialValue: item[`DROPSHIP`],
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
                                      [`groups[${index}].DROPSHIP_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].DROPSHIP_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('DROPSHIP', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('DROPSHIP_M') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_M_Original`, {
                              initialValue: item[`DROPSHIP_M_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_M_CustomPricing`, {
                              initialValue: item[`DROPSHIP_M_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].DROPSHIP_M`, {
                                initialValue: item[`DROPSHIP_M`],
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
                                      [`groups[${index}].DROPSHIP_M_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].DROPSHIP_M_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('DROPSHIP_M', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('DROPSHIP_X') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_X_Original`, {
                              initialValue: item[`DROPSHIP_X_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].DROPSHIP_X_CustomPricing`, {
                              initialValue: item[`DROPSHIP_X_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].DROPSHIP_X`, {
                                initialValue: item[`DROPSHIP_X`],
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
                                      [`groups[${index}].DROPSHIP_X_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].DROPSHIP_X_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('DROPSHIP_X', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('FOB') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].FOB_Original`, {
                              initialValue: item[`FOB_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].FOB_CustomPricing`, {
                              initialValue: item[`FOB_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].FOB`, {
                                initialValue: item[`FOB`],
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
                                      [`groups[${index}].FOB_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].FOB_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('FOB', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('FOB_M') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].FOB_M_Original`, {
                              initialValue: item[`FOB_M_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].FOB_M_CustomPricing`, {
                              initialValue: item[`FOB_M_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].FOB_M`, {
                                initialValue: item[`FOB_M`],
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
                                      [`groups[${index}].FOB_M_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].FOB_M_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('FOB_M', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('LEVEL0') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].LEVEL0_Original`, {
                              initialValue: item[`LEVEL0_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].LEVEL0_CustomPricing`, {
                              initialValue: item[`LEVEL0_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].LEVEL0`, {
                                initialValue: item[`LEVEL0`],
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
                                      [`groups[${index}].LEVEL0_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].LEVEL0_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('LEVEL0', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('LEVEL1') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].LEVEL1_Original`, {
                              initialValue: item[`LEVEL1_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].LEVEL1_CustomPricing`, {
                              initialValue: item[`LEVEL1_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].LEVEL1`, {
                                initialValue: item[`LEVEL1`],
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
                                      [`groups[${index}].LEVEL1_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].LEVEL1_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('LEVEL1', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('LEVEL2') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].LEVEL2_Original`, {
                              initialValue: item[`LEVEL2_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].LEVEL2_CustomPricing`, {
                              initialValue: item[`LEVEL2_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].LEVEL2`, {
                                initialValue: item[`LEVEL2`],
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
                                      [`groups[${index}].LEVEL2_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].LEVEL2_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('LEVEL2', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('LEVEL3') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].LEVEL3_Original`, {
                              initialValue: item[`LEVEL3_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].LEVEL3_CustomPricing`, {
                              initialValue: item[`LEVEL3_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].LEVEL3`, {
                                initialValue: item[`LEVEL3`],
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
                                      [`groups[${index}].LEVEL3_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].LEVEL3_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('LEVEL3', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('MIX_FULL') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].MIX_FULL_Original`, {
                              initialValue: item[`MIX_FULL_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].MIX_FULL_CustomPricing`, {
                              initialValue: item[`MIX_FULL_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].MIX_FULL`, {
                                initialValue: item[`MIX_FULL`],
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
                                      [`groups[${index}].MIX_FULL_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].MIX_FULL_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('MIX_FULL', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('MIX_HALF') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].MIX_HALF_Original`, {
                              initialValue: item[`MIX_HALF_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].MIX_HALF_CustomPricing`, {
                              initialValue: item[`MIX_HALF_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].MIX_HALF`, {
                                initialValue: item[`MIX_HALF`],
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
                                      [`groups[${index}].MIX_HALF_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].MIX_HALF_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('MIX_HALF', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
                        {hasPriceLevel('MIX_QTR') && (
                          <Col style={{ flex: 1, display: 'flex' }}>
                            {form.getFieldDecorator(`groups[${index}].MIX_QTR_Original`, {
                              initialValue: item[`MIX_QTR_Original`],
                            })(<Input type="hidden" />)}
                            {form.getFieldDecorator(`groups[${index}].MIX_QTR_CustomPricing`, {
                              initialValue: item[`MIX_QTR_CustomPricing`],
                            })(<Input type="hidden" />)}
                            <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
                              {form.getFieldDecorator(`groups[${index}].MIX_QTR`, {
                                initialValue: item[`MIX_QTR`],
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
                                      [`groups[${index}].MIX_QTR_CustomPricing`]: 1,
                                    });
                                  }}
                                  onPressEnter={e => {
                                    e.preventDefault();
                                  }}
                                />
                              )}
                            </FormItem>
                            {form.getFieldValue(`groups[${index}].MIX_QTR_CustomPricing`) > 0 && (
                              <Icon
                                type="close-square"
                                theme="filled"
                                style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
                                onClick={() => {
                                  resetPrice('MIX_QTR', index);
                                }}
                              />
                            )}
                          </Col>
                        )}
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
    </div>
  );
};

export default ItemMasterGroups;
