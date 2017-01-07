import * as React from 'react';
import { Row, Col, Card, InputNumber, Input, Button, Form, message, Checkbox, Select, Modal, Icon } from 'antd';
import { useFindTruckItemsMutation, InTransitWithCubes, TruckItems, TruckItemOrderItem, useAddTruckItemsMutation, useUpdateQuantityStockItemsTruckMutation, useTransferItemsMutation, TransferItemArgs, TransferOrderItemArgs } from 'graphql';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import FormItem from 'antd/lib/form/FormItem';
import { useState } from 'react';
import moment from 'moment';
import _, { findIndex, remove } from 'lodash';

export interface IOrderTransferProps {
  form: WrappedFormUtils;
}

const OrderTransfer: React.FunctionComponent<IOrderTransferProps> = ({ form }) => {
  const [fromTruckItems, setFromTruckItems] = useState<Partial<TruckItems> | null>(null);
  const [addTruckItems, setAddTruckItems] = useState<Partial<TruckItems> | null>(null);
  const [selectedItemsFromTruck, setSelectedItemsFromTruck] = useState<any>({});
  const [selectedOrderItemsFromAddTruck, setSelectedOrderItemsFromAddTruck] = useState({});
  const [selectedStockItemsFromAddTruck, setSelectedStockItemsFromAddTruck] = useState({});
  const [selectedStockItemsFromTruck, setSelectedStockItemsFromTruck] = useState<any>({});
  const [toTruckItems, setToTruckItems] = useState<Partial<TruckItems> | null>(null);
  const [selectedItemsToTruck, setSelectedItemsToTruck] = useState<InTransitWithCubes[]>([]);
  const [selectedStockItemsToTruck, setSelectedStockItemsToTruck] = useState<any>({});
  const [fromOrderRowStatus, setFromOrderRowStatus] = useState<any>({});
  const [toOrderRowStatus, setToOrderRowStatus] = useState<any>({});
  const [addOrderRowStatus, setAddOrderRowStatus] = useState<any>({});
  const [findTruckItems] = useFindTruckItemsMutation();
  const [findAddTruckItems] = useAddTruckItemsMutation();
  const [updateQuantityStockItem] = useUpdateQuantityStockItemsTruckMutation();
  const [transferItems] = useTransferItemsMutation();
  const [showFromModal, setShowFromModal] = useState(false);
  const [showToModal, setShowToModal] = useState(false);
  const [fromAction, setFromAction] = useState('');
  const [toAction, setToAction] = useState('');
  const [showAddFromModal, setShowAddFromModal] = useState(false);
  const [updatedQuantityStockItems, setUpdatedQuantityStockItems] = useState({});
  const [transferredItemsToFromTruck, setTransferredItemsToFromTruck] = useState({});
  const [transferredItemsToToTruck, setTruansferredItemsToToTruck] = useState({});
  const [checkValuesFromTruck, setCheckValuesFromTruck] = useState({});
  const [checkValuesToTruck, setCheckValuesToTruck] = useState({});

  const searchFrom = async () => {
    const from = form.getFieldValue('fromTruck');
    const fromTruckItems = await findTruckItems({ variables: { data: { searchText: from, searchWhere: 'from', transferLocation: '', locationCode: '' } }, fetchPolicy: 'no-cache' }).catch(err => {
      message.error(err.message);
    });
    if (fromTruckItems && fromTruckItems.data) {
      const { findTruckItems } = fromTruckItems.data;
      console.log('fromTruckItems-----------', fromTruckItems);
      setFromTruckItems(findTruckItems);
    }
  };

  const searchTo = async () => {
    const to = form.getFieldValue('toTruck');
    const toTruckItems = await findTruckItems({ variables: { data: { searchText: to, searchWhere: 'to', transferLocation: fromTruckItems!.transferLocation!, locationCode: fromTruckItems!.locationCode! } }, fetchPolicy: 'no-cache' }).catch(err => {
      message.error(err.message);
    });
    if (toTruckItems && toTruckItems.data) {
      const { findTruckItems } = toTruckItems.data;
      console.log('toTruckItems------------', toTruckItems);
      setToTruckItems(findTruckItems);
    }
  };

  const searchAdd = async () => {
    const to = form.getFieldValue('addFromTruck');
    const addItems = await findAddTruckItems({ variables: { data: { searchText: to, transferLocation: fromTruckItems!.transferLocation!, locationCode: fromTruckItems!.locationCode! } } }).catch(err => {
      message.error(err.message);
    });
    if (addItems && addItems.data) {
      const { addTruckItems } = addItems.data;
      setAddTruckItems(addTruckItems);
    }
  };

  const getTotalCubesFromTruck = () => {
    let totalCubes = 0;
    if (fromTruckItems) {
      if (fromTruckItems.stockItems) {
        totalCubes = fromTruckItems.stockItems.reduce((p, c) => (p += c.CubesExtended ? c.CubesExtended : 0), 0);
      }
      if (fromTruckItems.orderItems) {
        fromTruckItems.orderItems.forEach((orderItem: TruckItemOrderItem) => {
          totalCubes += orderItem.orderItems.reduce((p, c) => (p += c.CubesExtended ? c.CubesExtended : 0), 0);
        });
      }
      return totalCubes.toFixed(2);
    }
    return totalCubes.toFixed(2);
  };
  const getSelectedCubesFromTruck = () => {
    // console.log('getSelectedCubesFromTruck', selectedItemsFromTruck);
    return Number(Object.keys(selectedItemsFromTruck).reduce((p, c) => (p += selectedItemsFromTruck[c].CubesExtended ? selectedItemsFromTruck[c].CubesExtended : 0), 0)).toFixed(2);
  };

  const getTotalCubesToTruck = (): string => {
    let totalCubes = 0;
    if (toTruckItems) {
      if (toTruckItems.stockItems) {
        totalCubes = toTruckItems.stockItems.reduce((p, c) => (p += c.CubesExtended ? c.CubesExtended : 0), 0);
      }
      if (toTruckItems.orderItems) {
        toTruckItems.orderItems.forEach((orderItem: TruckItemOrderItem) => {
          totalCubes += orderItem.orderItems.reduce((p, c) => (p += c.CubesExtended ? c.CubesExtended : 0), 0);
        });
      }
      return totalCubes.toFixed(2);
    }
    return totalCubes.toFixed(2);
  };
  const getSelectedCubesToTruck = () => {
    return Number(selectedItemsToTruck.reduce((p, c) => (p += c.CubesExtended ? c.CubesExtended : 0), 0)).toFixed(2);
  };

  const selectedFromTruck = (item: InTransitWithCubes) => {};
  const onToChange = (checked: boolean, sopIndex: number, sopNumber: string) => {
    if (checked) {
      const orderItems = fromTruckItems!.orderItems![sopIndex].orderItems.map(item => item);
      setSelectedItemsToTruck({ ...selectedItemsFromTruck, [sopNumber]: orderItems });
    } else {
      const items = selectedItemsToTruck;
      delete items[sopNumber];
      setSelectedItemsToTruck({ ...items });
    }
  };

  const onFromChange = (checked: boolean, sopIndex: number, sopNumber: string) => {
    if (checked) {
      setCheckValuesToTruck({ ...checkValuesToTruck, [`${sopIndex}`]: checkValuesToTruck[`${sopIndex}`] ? !checkValuesToTruck[`${sopIndex}`] : true });
      const orderItems = fromTruckItems!.orderItems![sopIndex].orderItems.map(item => item);
      setSelectedItemsFromTruck({ ...selectedItemsFromTruck, [sopNumber]: orderItems });
    } else {
      setCheckValuesToTruck({ ...checkValuesToTruck, [`${sopIndex}`]: checkValuesToTruck[`${sopIndex}`] ? !checkValuesToTruck[`${sopIndex}`] : false });

      const items = Object.assign({}, selectedItemsFromTruck);
      delete items[sopNumber];
      setSelectedItemsFromTruck({ ...items });
    }
  };

  const onFromSearchAddStockChange = (item: InTransitWithCubes) => {
    const index = findIndex(Object.keys(selectedStockItemsFromAddTruck), key => key === item.ItemNumber);
    console.log('[onFromStockChange] > item = ', index, item, selectedStockItemsFromTruck);
    if (index < 0) {
      setSelectedStockItemsFromAddTruck({
        ...selectedStockItemsFromAddTruck,
        [item.ItemNumber]: item,
      });
    } else {
      const items = Object.assign({}, selectedStockItemsFromAddTruck);
      delete items[item.ItemNumber];
      setSelectedStockItemsFromAddTruck({ ...items });
    }
  };

  const onFromSearchAddChange = (checked: boolean, sopIndex: number, orderItemIndex: number, sopNumber: string) => {
    if (checked) {
      const index = findIndex(Object.keys(selectedOrderItemsFromAddTruck), key => key === sopNumber);
      if (index < 0) {
        const orderItems: any = [];
        orderItems.push(addTruckItems!.orderItems![sopIndex].orderItems[orderItemIndex]);
        setSelectedOrderItemsFromAddTruck({ ...selectedOrderItemsFromAddTruck, [sopNumber]: orderItems });
      } else {
        const selectedOrderItems = Object.assign({}, selectedOrderItemsFromAddTruck);
        selectedOrderItems[sopNumber].push(addTruckItems!.orderItems![sopIndex].orderItems[orderItemIndex]);
        setSelectedOrderItemsFromAddTruck({ ...selectedOrderItemsFromAddTruck, ...selectedOrderItems });
      }
    } else {
      const items = Object.assign({}, selectedOrderItemsFromAddTruck);
      _.remove(items[sopNumber], (n: InTransitWithCubes) => n.ItemNumber === addTruckItems!.orderItems![sopIndex].orderItems[orderItemIndex].ItemNumber);
      if (items[sopNumber].length === 0) {
        delete items[sopNumber];
      }
      setSelectedOrderItemsFromAddTruck({ ...items });
    }
  };

  const onAddSelectionClick = () => {
    //To Add Selected Stock Items From Search Add
    _.forEach(Object.keys(selectedStockItemsFromAddTruck), key => {
      const index = _.findIndex(fromTruckItems!.stockItems, el => el.ItemNumber === key);
      if (index < 0) {
        const items = Object.assign({}, fromTruckItems!);
        items.stockItems!.push(selectedStockItemsFromAddTruck[key]);
        setFromTruckItems({ ...fromTruckItems, ...items });
      } else {
        let items = Object.assign({}, fromTruckItems!);
        items.stockItems![index].TransferQuantity = items.stockItems![index].TransferQuantity + selectedStockItemsFromAddTruck[key].TransferQuantity;
        setFromTruckItems({ ...fromTruckItems, ...items });
      }
    });

    //To Add Selected Order Items From Search Add
    _.forEach(Object.keys(selectedOrderItemsFromAddTruck), key => {
      const index = _.findIndex(fromTruckItems!.orderItems!, el => el.SopNumber === key);
      if (index < 0) {
        const newOrderItems = {
          SopNumber: key,
          orderItems: Object.assign({}, selectedOrderItemsFromAddTruck[key]),
        };
        const addedFromTruckItems = Object.assign({}, fromTruckItems);
        addedFromTruckItems!.orderItems!.push(newOrderItems);
        setFromTruckItems({ ...fromTruckItems, ...addedFromTruckItems });
      } else {
        let items = Object.assign({}, fromTruckItems);
        _.forEach(selectedOrderItemsFromAddTruck[key], item => {
          const quantityAddedOrderItems = fromTruckItems!.orderItems![index].orderItems.map(i => {
            if (i.ItemNumber === item.ItemNumber) {
              return Object.assign({}, i, { TransferQuantity: i.TransferQuantity + item.TransferQuantity });
            }
            return i;
          });
          items!.orderItems![index].orderItems = quantityAddedOrderItems;
          setFromTruckItems({ ...fromTruckItems, ...items });
        });
      }
    });

    //Hide Modal
    setShowAddFromModal(false);
    setAddTruckItems(null);
    setSelectedOrderItemsFromAddTruck({});
    setSelectedStockItemsFromAddTruck({});
  };

  const onFromStockChange = (checked: boolean, index: number) => {
    const item = Object.assign({}, fromTruckItems!.stockItems![index]);
    if (checked) {
      setCheckValuesFromTruck({ ...checkValuesFromTruck, [`${index}`]: checkValuesFromTruck[`${index}`] ? !checkValuesFromTruck[`${index}`] : true });
      setSelectedStockItemsFromTruck({
        ...selectedStockItemsFromTruck,
        [item.ItemNumber]: item,
      });
    } else {
      setCheckValuesFromTruck({ ...checkValuesFromTruck, [`${index}`]: checkValuesFromTruck[`${index}`] ? !checkValuesFromTruck[`${index}`] : false });

      const items = selectedStockItemsFromTruck;
      delete items[item.ItemNumber];
      setSelectedStockItemsFromTruck({ ...items });
    }
  };

  const onToStockChange = (item: InTransitWithCubes) => {
    const index = findIndex(Object.keys(selectedStockItemsToTruck), key => key === item.ItemNumber);
    console.log('[onToStockChange] > item = ', index, item, selectedStockItemsToTruck);
    if (index < 0) {
      setSelectedStockItemsToTruck({
        ...selectedStockItemsToTruck,
        [item.ItemNumber]: item,
      });
    } else {
      const items = selectedStockItemsToTruck;
      delete items[item.ItemNumber];
      setSelectedStockItemsToTruck({ ...items });
    }
  };

  const fromGo = () => {
    _.forEach(Object.keys(selectedStockItemsFromTruck), (key, index) => {
      if (key in updatedQuantityStockItems) {
        const items = Object.assign({}, selectedStockItemsFromTruck);
        items[key].TransferQuantity = updatedQuantityStockItems[key].TransferQuantity;
        setSelectedStockItemsFromTruck({ ...items });
      }
    });
    setShowFromModal(true);
  };

  const toGo = () => {};

  const fromOrderRowStatusChange = (index: number) => {
    setFromOrderRowStatus({ ...fromOrderRowStatus, [index]: fromOrderRowStatus[index] ? !fromOrderRowStatus[index] : true });
  };

  const toOrderRowStatusChange = (index: number) => {
    setToOrderRowStatus({ ...toOrderRowStatus, [index]: toOrderRowStatus[index] ? !toOrderRowStatus[index] : true });
  };

  const addOrderRowStatusChange = (index: number) => {
    setAddOrderRowStatus({ ...addOrderRowStatus, [index]: addOrderRowStatus[index] ? !addOrderRowStatus[index] : true });
  };

  const getTruckStatus = status => {
    switch (status) {
      case 0:
        return 'Open';
      case 1:
        return 'Picked';
    }
  };

  const handleActionClick = async (fromAction: string) => {
    setShowFromModal(false);

    switch (fromAction) {
      case 'Remove':
        //Remove Stock Items From FromTruckItems
        _.forEach(Object.keys(selectedStockItemsFromTruck), key => {
          const items = fromTruckItems!;
          _.remove(items.stockItems!, el => (el.ItemNumber = key));
          setFromTruckItems({ ...fromTruckItems, ...items });
        });

        //Remove Order Items From FromTruckItems
        _.forEach(Object.keys(selectedItemsFromTruck), key => {
          const items = fromTruckItems!;
          const index = _.findIndex(items.orderItems, el => el.SopNumber === key);
          if (index > 0) {
            _.forEach(selectedItemsFromTruck[key], eachOrderItem => {
              _.remove(items.orderItems![index].orderItems, el => el.ItemNumber === eachOrderItem.ItemNumber);
              if (items.orderItems![index].orderItems.length === 0) {
                items.orderItems!.splice(index, 1);
              }
            });
            setFromTruckItems({ ...fromTruckItems, ...items });
          }
        });

        //Initiate Selected Order Items and Stocked Items
        setSelectedItemsFromTruck({});
        setSelectedStockItemsFromAddTruck({});

        //Make All Order Items Close
        const closeFromOrderRowStatus = Object.keys(fromOrderRowStatus).map(item => {
          if (fromOrderRowStatus[item]) return false;
          return fromOrderRowStatus[item];
        });
        setFromOrderRowStatus(closeFromOrderRowStatus);
        break;

      case 'Transfer':
        break;
    }
  };

  const handleSaveClick = async () => {
    const variableData = Object.keys(updatedQuantityStockItems).map(item => {
      return { orderDocumentId: updatedQuantityStockItems[item].OrderDocumentId, itemNumber: updatedQuantityStockItems[item].ItemNumber, quantity: updatedQuantityStockItems[item].TransferQuantity };
    });
    const updateQuantityItems = await updateQuantityStockItem({
      variables: {
        args: {
          data: variableData,
        },
      },
    }).catch(err => {
      message.error(err.message);
    });
    if (updateQuantityItems && updateQuantityItems.data) {
      console.log('updatedQuantityResponse-----------', updateQuantityItems.data);
      // const from = form.getFieldValue('fromTruck');
      // const fromTruckItems = await findTruckItems({ variables: { searchText: from } }).catch(err => {
      //   message.error(err.message);
      // });
      // if (fromTruckItems && fromTruckItems.data) {
      //   const { findTruckItems } = fromTruckItems.data;
      //   setFromTruckItems(findTruckItems);
      // }

      searchFrom();
    }
  };

  const handleStockItemQuantityChanged = (value, index) => {
    const ind = findIndex(Object.keys(updatedQuantityStockItems), key => fromTruckItems!.stockItems![index].ItemNumber === key);
    if (ind < 0) {
      if (value !== fromTruckItems!.stockItems![index].TransferQuantity) {
        let item = Object.assign({}, fromTruckItems!.stockItems![index], { TransferQuantity: value });

        setUpdatedQuantityStockItems({
          ...updatedQuantityStockItems,
          [fromTruckItems!.stockItems![index].ItemNumber]: item,
        });
      }
    } else {
      const items = Object.assign({}, updatedQuantityStockItems);

      if (value === fromTruckItems!.stockItems![index].TransferQuantity) {
        delete items[fromTruckItems!.stockItems![index].ItemNumber];
        setUpdatedQuantityStockItems({ ...items });
      } else {
        items[fromTruckItems!.stockItems![index].ItemNumber].TransferQuantity = value;
        setUpdatedQuantityStockItems({ ...updatedQuantityStockItems, ...items });
      }
    }
  };

  const handleTransferClick = async (whereFrom: string) => {
    const to = form.getFieldValue('toTruck');
    const from = form.getFieldValue('fromTruck');

    const stockItems: TransferItemArgs[] = [];
    const orderItems: TransferOrderItemArgs[] = [];

    if (whereFrom === 'fromLeft') {
      _.forEach(Object.keys(selectedStockItemsFromTruck), key => {
        const { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ } = selectedStockItemsFromTruck[key];
        stockItems.push({ OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ });
      });
      _.forEach(Object.keys(selectedItemsFromTruck), key => {
        const items = selectedItemsFromTruck[key].map(item => {
          const { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ } = item;
          return { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ };
        });
        const item = { sopNumber: key, orderItems: items };
        orderItems.push(item);
      });
    } else {
      _.forEach(Object.keys(selectedStockItemsToTruck), key => {
        const { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ } = selectedStockItemsToTruck[key];
        stockItems.push({ OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ });
      });
      _.forEach(Object.keys(selectedItemsToTruck), key => {
        const items = selectedItemsToTruck[key].map(item => {
          const { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ } = item;
          return { OrderDocumentId, ItemNumber, TransferQuantity, LNITMSEQ };
        });
        const item = { sopNumber: key, orderItems: items };
        orderItems.push(item);
      });
    }

    console.log('selected StockItems', stockItems);
    console.log('selected OrderItems', orderItems);

    const transferItemsResponse = await transferItems({
      variables: {
        args: {
          toTruckItem: whereFrom === 'fromLeft' ? to : from,
          stockItems,
          orderItems,
        },
      },
    }).catch(err => {
      const alertMsg = err.message ? err.message.replace('GraphQL error: ', '') : '';
      message.error(alertMsg);
    });

    if (transferItemsResponse && transferItemsResponse.data) {
      console.log('transferItemsResponse', transferItemsResponse.data);
      if (whereFrom === 'fromLeft') message.success(`The Selected Items are transferred successfully from ${from} to ${to}.`);
      else message.success(`The Selected Items are transferred successfully from ${to} from ${from}`);

      //Refetch the fromTruckItems and toTruckItems
      searchFrom();
      searchTo();

      //Initialize the selected stock items and order items
      setSelectedStockItemsFromTruck({});
      setSelectedItemsFromTruck({});

      setSelectedItemsToTruck([]);
      setSelectedStockItemsToTruck({});

      //Close the expanded order items
      // const closeFromOrderRowStatus = Object.keys(fromOrderRowStatus).map(item => {
      //   if (fromOrderRowStatus[item]) return false;
      //   return fromOrderRowStatus[item];
      // });
      // setFromOrderRowStatus(closeFromOrderRowStatus);
      setFromOrderRowStatus({});

      // const closeToOrderRowStatus = Object.keys(toOrderRowStatus).map(item => {
      //   if (toOrderRowStatus[item]) return false;
      //   return toOrderRowStatus[item];
      // });
      // setToOrderRowStatus(closeToOrderRowStatus);
      setToOrderRowStatus({});
    }
  };

  return (
    <Row type="flex" gutter={20}>
      <Col style={{ flex: 1 }}>
        <Modal title={`Confirm Your ${fromAction} Selection`} okText={`Yes, ${fromAction} Selection`} visible={showFromModal} onOk={() => handleActionClick(fromAction)} onCancel={() => setShowFromModal(false)} width={750}>
          <div style={{ fontSize: '12px' }}>
            {Object.keys(selectedStockItemsFromTruck).length > 0 ? (
              <>
                <Row>
                  <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Stock Items</Col>
                </Row>
                <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                  <Col style={{ flex: 1 }}>Source</Col>
                  <Col style={{ flex: 1 }}>Destination</Col>
                  <Col style={{ flex: 1 }}>Item Number</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                </Row>
              </>
            ) : null}
            {Object.keys(selectedStockItemsFromTruck).map((row, id) => {
              const item = selectedStockItemsFromTruck[row];
              return (
                <Row key={id} type="flex" gutter={5}>
                  <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                  <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                  <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                </Row>
              );
            })}
            {Object.keys(selectedItemsFromTruck).length > 0 ? (
              <>
                <Row>
                  <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Orders</Col>
                </Row>
                <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                  <Col style={{ flex: 1 }}>ORDER Number</Col>
                  <Col style={{ flex: 1 }}>SOP Doc Date</Col>
                  <Col style={{ flex: 1 }}>Source</Col>
                  <Col style={{ flex: 1 }}>Destination</Col>
                  <Col style={{ flex: 1 }}>Item Number</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                </Row>
              </>
            ) : null}
            {Object.keys(selectedItemsFromTruck).map(row =>
              selectedItemsFromTruck[row].map((item, index) => (
                <Row key={index} type="flex" gutter={5}>
                  <Col style={{ flex: 1 }}>{row}</Col>
                  <Col style={{ flex: 1 }}>{item.SopDocDate ? moment(item.SopDocDate).format('MM/DD/YYYY') : 'Empty'}</Col>
                  <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                  <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                  <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                </Row>
              ))
            )}
            <Row type="flex">
              <Col style={{ flex: 6, textAlign: 'right', fontSize: 14, fontWeight: 700, paddingTop: 10 }}>Total Cubes {getSelectedCubesFromTruck()}</Col>
            </Row>
          </div>
        </Modal>

        <Modal
          title={`Add Stock/Order Item`}
          okText={`Yes, Add Selection`}
          visible={showAddFromModal}
          onOk={() => onAddSelectionClick()}
          onCancel={() => setShowAddFromModal(false)}
          width={850}
          okButtonProps={{ disabled: Object.keys(selectedOrderItemsFromAddTruck).length === 0 && Object.keys(selectedStockItemsFromAddTruck).length === 0 ? true : false }}
        >
          <div style={{ fontSize: '12px' }}>
            <Row type="flex" gutter={10} style={{ marginBottom: 10 }}>
              <Col style={{ flex: 1 }}>
                <FormItem style={{ margin: 0 }}>
                  {form.getFieldDecorator(`addFromTruck`, {
                    initialValue: '',
                  })(<Input placeholder="Search For Stock or SOP Number" />)}
                </FormItem>
              </Col>
              <Col>
                <Button type="primary" onClick={searchAdd}>
                  Search
                </Button>
              </Col>
            </Row>
            {addTruckItems && (
              <Row>
                <Col>Truck Status: {getTruckStatus(addTruckItems!.status)} </Col>
              </Row>
            )}
            {addTruckItems && addTruckItems.stockItems && addTruckItems.stockItems.length > 0 && (
              <div style={{ fontSize: '10px' }}>
                <Row>
                  <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Stock Items</Col>
                </Row>
                <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                  <Col style={{ flex: 1, maxWidth: 30 }}></Col>
                  <Col style={{ flex: 1 }}>Source</Col>
                  <Col style={{ flex: 1 }}>Destination</Col>
                  <Col style={{ flex: 1 }}>Item Number</Col>
                  <Col style={{ flex: 1, textAlign: 'center' }}>Quantity</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
                </Row>
                {addTruckItems.stockItems.map((item: InTransitWithCubes, index: number) => (
                  <Row key={`add|${index}`} type="flex" gutter={5}>
                    <Col style={{ flex: 1, maxWidth: 30 }}>
                      <Checkbox key={index} onChange={() => onFromSearchAddStockChange(item)}></Checkbox>
                    </Col>
                    <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                    <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                    <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                    <Col style={{ flex: 1, textAlign: 'right' }}>
                      <InputNumber size="small" style={{ margin: '2px 0' }} defaultValue={item.TransferQuantity} />
                    </Col>
                    <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                    <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                    <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                  </Row>
                ))}
              </div>
            )}
            {addTruckItems && addTruckItems.orderItems && addTruckItems.orderItems.length > 0 && (
              <>
                <div style={{ fontSize: '10px' }}>
                  <Row>
                    <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Orders</Col>
                  </Row>
                  {addTruckItems.orderItems.map((order, orderIndex: number) => (
                    <>
                      <Row key={orderIndex} type="flex" gutter={12} style={{ fontSize: '14px' }}>
                        <Col onClick={() => addOrderRowStatusChange(orderIndex)}>{addOrderRowStatus[`${orderIndex}`] ? <Icon type="minus-circle" theme="twoTone" /> : <Icon type="plus-circle" theme="twoTone" />}</Col>
                        <Col style={{ fontWeight: 700 }}>{order.SopNumber}</Col>
                      </Row>
                      {addOrderRowStatus[`${orderIndex}`] && (
                        <div style={{ margin: '0 0 0 30px' }}>
                          <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                            <Col style={{ flex: 1, maxWidth: 30 }}></Col>
                            <Col style={{ flex: 1 }}>SOP Doc Date</Col>
                            <Col style={{ flex: 1 }}>Source</Col>
                            <Col style={{ flex: 1 }}>Destination</Col>
                            <Col style={{ flex: 1 }}>Item Number</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
                          </Row>
                          {/* <Checkbox.Group style={{ width: '100%' }}> */}
                          {order.orderItems.map((item: InTransitWithCubes, index: number) => (
                            <Row key={`add|${index}`} type="flex" gutter={5}>
                              <Col style={{ flex: 1, maxWidth: 30 }}>
                                <Checkbox value={index} onChange={e => onFromSearchAddChange(e.target.checked, orderIndex, index, item.SopNumber)}></Checkbox>
                              </Col>
                              <Col style={{ flex: 1 }}>{item.SopDocDate ? moment(item.SopDocDate).format('MM/DD/YYYY') : 'Empty'}</Col>
                              <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                              <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                              <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                              <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                              <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                              <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                              <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                            </Row>
                          ))}
                          {/* </Checkbox.Group> */}
                        </div>
                      )}
                    </>
                  ))}
                </div>
              </>
            )}
          </div>
        </Modal>

        <Card title="From Truck">
          <Row type="flex" gutter={10} style={{ marginBottom: 10 }}>
            <Col style={{ flex: 1 }}>
              <FormItem style={{ margin: 0 }}>
                {form.getFieldDecorator(`fromTruck`, {
                  initialValue: '',
                })(<Input placeholder="Search For Truck or SOP Number" />)}
              </FormItem>
            </Col>
            <Col>
              <Button type="primary" onClick={searchFrom}>
                Search
              </Button>
            </Col>
            <Col>
              <Button type="primary" disabled={!fromTruckItems} onClick={() => setShowAddFromModal(true)}>
                Add Stock/Order
              </Button>
            </Col>
          </Row>
          {fromTruckItems && (
            <>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Truck Status: {getTruckStatus(fromTruckItems!.status)}</Col>
              </Row>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Truck Source: {fromTruckItems!.transferLocation}</Col>
              </Row>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Truck Destination: {fromTruckItems!.locationCode}</Col>
              </Row>
            </>
          )}
          {Object.keys(transferredItemsToFromTruck).length > 0 && (
            <div style={{ fontSize: '10px' }}>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Added Items</Col>
              </Row>
              <Row type="flex" gutter={5} style={{ fontWeight: 700 }}></Row>
            </div>
          )}
          {fromTruckItems && fromTruckItems.stockItems && fromTruckItems.stockItems.length > 0 && (
            <div style={{ fontSize: '10px' }}>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Stock Items</Col>
              </Row>
              <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                <Col style={{ flex: 1, maxWidth: 30 }}></Col>
                <Col style={{ flex: 1 }}>Source</Col>
                <Col style={{ flex: 1 }}>Destination</Col>
                <Col style={{ flex: 1 }}>Item Number</Col>
                <Col style={{ flex: 1, textAlign: 'center' }}>Quantity</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
              </Row>
              {fromTruckItems.stockItems.map((item: InTransitWithCubes, index: number) => (
                <Row key={`from|${index}`} type="flex" gutter={5}>
                  <Col style={{ flex: 1, maxWidth: 30 }}>
                    <Checkbox checked={checkValuesFromTruck[`${index}`] ? checkValuesFromTruck[`${index}`] : false} onChange={e => onFromStockChange(e.target.checked, index)}></Checkbox>
                  </Col>
                  <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                  <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                  <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>
                    <InputNumber size="small" style={{ margin: '2px 0' }} defaultValue={item.TransferQuantity} onChange={value => handleStockItemQuantityChanged(value, index)} />
                  </Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                </Row>
              ))}
            </div>
          )}
          {fromTruckItems && fromTruckItems.orderItems && fromTruckItems.orderItems.length > 0 && (
            <div style={{ fontSize: '10px' }}>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Orders</Col>
              </Row>
              {fromTruckItems.orderItems.map((order, orderIndex: number) => (
                <div key={orderIndex}>
                  <Row type="flex" gutter={12} style={{ fontSize: '14px' }}>
                    <Col style={{ flex: 1, maxWidth: 30 }}>
                      <Checkbox checked={checkValuesToTruck[`${orderIndex}`] ? checkValuesToTruck[`${orderIndex}`] : false} onChange={e => onFromChange(e.target.checked, orderIndex, order.SopNumber)}></Checkbox>
                    </Col>
                    <Col onClick={() => fromOrderRowStatusChange(orderIndex)}>{fromOrderRowStatus[`${orderIndex}`] ? <Icon type="minus-circle" theme="twoTone" /> : <Icon type="plus-circle" theme="twoTone" />}</Col>
                    <Col style={{ fontWeight: 700 }}>{order.SopNumber}</Col>
                  </Row>
                  {fromOrderRowStatus[`${orderIndex}`] && (
                    <div style={{ margin: '0 0 0 30px' }}>
                      <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                        <Col style={{ flex: 1 }}>SOP Doc Date</Col>
                        <Col style={{ flex: 1 }}>Source</Col>
                        <Col style={{ flex: 1 }}>Destination</Col>
                        <Col style={{ flex: 1 }}>Item Number</Col>
                        <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
                        <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                        <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                        <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
                      </Row>
                      {order.orderItems.map((item: InTransitWithCubes, index: number) => (
                        <Row key={`from|${index}`} type="flex" gutter={5}>
                          <Col style={{ flex: 1 }}>{item.SopDocDate ? moment(item.SopDocDate).format('MM/DD/YYYY') : 'Empty'}</Col>
                          <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                          <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                          <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                        </Row>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          {((fromTruckItems && fromTruckItems.stockItems && fromTruckItems.stockItems.length > 0) || (fromTruckItems && fromTruckItems.orderItems && fromTruckItems.orderItems.length > 0)) && (
            <Row type="flex" gutter={5} style={{ fontWeight: 700, justifyContent: 'flex-end', alignItems: 'center', padding: '10px 0' }}>
              <Col style={{ flex: 2 }}>
                <Row type="flex" style={{ alignItems: 'center' }}>
                  <Col style={{ fontSize: 14 }}>Action</Col>
                  <Col style={{ flex: 4, paddingLeft: 10 }}>
                    <FormItem style={{ margin: 0 }}>
                      {form.getFieldDecorator(`fromActions`, {
                        initialValue: '',
                      })(
                        <Select onChange={e => setFromAction(e.toString())} style={{ width: '100%' }}>
                          <Select.Option value="Transfer">Transfer</Select.Option>
                          <Select.Option value="Remove">Remove</Select.Option>
                        </Select>
                      )}
                    </FormItem>
                  </Col>
                  <Col style={{ paddingLeft: 5 }}>
                    <Button onClick={() => fromGo()} disabled={!((Object.keys(selectedItemsFromTruck).length > 0 || Object.keys(selectedStockItemsFromTruck).length > 0) && form.getFieldValue('toTruck'))}>
                      GO
                    </Button>
                  </Col>
                  <Col style={{ paddingLeft: 5 }}>
                    <Button disabled={Object.keys(updatedQuantityStockItems).length > 0 ? false : true} type="primary" onClick={() => handleSaveClick()}>
                      Save
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col style={{ flex: 1, textAlign: 'right', fontSize: 14 }}>Total Cubes {getTotalCubesFromTruck()}</Col>
            </Row>
          )}
        </Card>
      </Col>
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Button type="primary" disabled={!(Object.keys(selectedItemsFromTruck).length > 0 || Object.keys(selectedStockItemsFromTruck).length > 0)} style={{ marginBottom: 30, width: 50, padding: 0, textAlign: 'center' }} onClick={() => handleTransferClick('fromLeft')}>
          >>
        </Button>
        <Button type="primary" disabled={!(Object.keys(selectedItemsToTruck).length > 0 || Object.keys(selectedStockItemsToTruck).length > 0)} style={{ marginBottom: 30, width: 50, padding: 0, textAlign: 'center' }} onClick={() => handleTransferClick('fromRight')}>
          {'<<'}
        </Button>
        <Button type="primary" disabled={!(Object.keys(updatedQuantityStockItems).length > 0)} style={{ marginBottom: 30, width: 50, padding: 0, textAlign: 'center' }} onClick={() => handleSaveClick()}>
          Save
        </Button>
      </Col>
      <Col style={{ flex: 1 }}>
        <Modal title={`Confirm Your ${toAction} Selection`} okText={`Yes, ${toAction} Selection`} visible={showToModal} onOk={() => setShowToModal(false)} onCancel={() => setShowToModal(false)} width={650}>
          <div style={{ fontSize: '12px' }}>
            <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
              <Col style={{ flex: 1 }}>SOP Doc Date</Col>
              <Col style={{ flex: 1 }}>Source</Col>
              <Col style={{ flex: 1 }}>Destination</Col>
              <Col style={{ flex: 1 }}>Item Number</Col>
              <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
              <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
              <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
              <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
            </Row>
            {selectedItemsToTruck.map(item => (
              <Row type="flex">
                <Col style={{ flex: 1 }}>{item.SopDocDate ? moment(item.SopDocDate).format('MM/DD/YYYY') : 'Empty'}</Col>
                <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
              </Row>
            ))}
            <Row>
              <Col style={{ flex: 6, textAlign: 'right', fontSize: 14, fontWeight: 700, paddingTop: 10 }}>Total Cubes {getSelectedCubesToTruck()}</Col>
            </Row>
          </div>
        </Modal>
        <Card title="To Truck">
          <Row type="flex" gutter={10} style={{ marginBottom: 10 }}>
            <Col style={{ flex: 1 }}>
              <FormItem style={{ margin: 0 }}>
                {form.getFieldDecorator(`toTruck`, {
                  initialValue: '',
                })(<Input placeholder="Search For Truck or SOP Number" />)}
              </FormItem>
            </Col>
            <Col>
              <Button type="primary" onClick={searchTo} disabled={!fromTruckItems}>
                Search
              </Button>
            </Col>
            <Col>
              <Button type="primary" onClick={() => setShowAddFromModal(true)}>
                Create New Truck
              </Button>
            </Col>
          </Row>
          {toTruckItems && (
            <Row>
              <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Truck Status: {getTruckStatus(toTruckItems!.status)}</Col>
            </Row>
          )}
          {toTruckItems && toTruckItems.stockItems && toTruckItems.stockItems.length > 0 && (
            <div style={{ fontSize: '10px' }}>
              <Row>
                <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Stock Items</Col>
              </Row>
              <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                <Col style={{ flex: 1, maxWidth: 30 }}></Col>
                <Col style={{ flex: 1 }}>Source</Col>
                <Col style={{ flex: 1 }}>Destination</Col>
                <Col style={{ flex: 1 }}>Item Number</Col>
                <Col style={{ flex: 1, textAlign: 'center' }}>Quantity</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
              </Row>
              {toTruckItems.stockItems.map((item: InTransitWithCubes, index: number) => (
                <Row key={`to|${index}`} type="flex" gutter={5}>
                  <Col style={{ flex: 1, maxWidth: 30 }}>
                    <Checkbox key={index} onChange={() => onToStockChange(item)}></Checkbox>
                  </Col>
                  <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                  <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                  <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>
                    <InputNumber size="small" style={{ margin: '2px 0' }} value={item.TransferQuantity} />
                  </Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                  <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                </Row>
              ))}
            </div>
          )}
          {toTruckItems && toTruckItems.orderItems && toTruckItems.orderItems.length > 0 && (
            <>
              <div style={{ fontSize: '10px' }}>
                <Row>
                  <Col style={{ fontSize: 18, fontWeight: 700, margin: '10px 0' }}>Orders</Col>
                </Row>
                {toTruckItems.orderItems.map((order, orderIndex: number) => (
                  <>
                    <Row type="flex" gutter={12} style={{ fontSize: '14px' }}>
                      <Col style={{ flex: 1, maxWidth: 30 }}>
                        <Checkbox onChange={e => onToChange(e.target.checked, orderIndex, order.SopNumber)}></Checkbox>
                      </Col>
                      <Col onClick={() => toOrderRowStatusChange(orderIndex)}>{toOrderRowStatus[`${orderIndex}`] ? <Icon type="minus-circle" theme="twoTone" /> : <Icon type="plus-circle" theme="twoTone" />}</Col>
                      <Col style={{ fontWeight: 700 }}>{order.SopNumber}</Col>
                    </Row>
                    {toOrderRowStatus[`${orderIndex}`] && (
                      <div style={{ margin: '0 0 0 30px' }}>
                        <Row type="flex" gutter={5} style={{ fontWeight: 700 }}>
                          <Col style={{ flex: 1 }}>SOP Doc Date</Col>
                          <Col style={{ flex: 1 }}>Source</Col>
                          <Col style={{ flex: 1 }}>Destination</Col>
                          <Col style={{ flex: 1 }}>Item Number</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>Quantity</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>Cubes</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>Extended</Col>
                          <Col style={{ flex: 1, textAlign: 'right' }}>Customer ID</Col>
                        </Row>
                        {/* <Checkbox.Group style={{ width: '100%' }}> */}
                        {order.orderItems.map((item: InTransitWithCubes, index: number) => (
                          <Row key={`to|${index}`} type="flex" gutter={5}>
                            <Col style={{ flex: 1 }}>{item.SopDocDate ? moment(item.SopDocDate).format('MM/DD/YYYY') : 'Empty'}</Col>
                            <Col style={{ flex: 1 }}>{item.TransferLocation}</Col>
                            <Col style={{ flex: 1 }}>{item.LocationCode}</Col>
                            <Col style={{ flex: 1 }}>{item.ItemNumber}</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>{item.TransferQuantity}</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>{item.EpCubes}</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>{item.CubesExtended}</Col>
                            <Col style={{ flex: 1, textAlign: 'right' }}>{item.CustomerName}</Col>
                          </Row>
                        ))}
                        {/* </Checkbox.Group> */}
                      </div>
                    )}
                  </>
                ))}
              </div>
              <Row type="flex" gutter={5} style={{ fontWeight: 700, justifyContent: 'flex-end', alignItems: 'center', padding: '10px 0' }}>
                <Col style={{ flex: 2 }}>
                  <Row type="flex" style={{ alignItems: 'center' }}>
                    <Col style={{ fontSize: 14 }}>Action</Col>
                    <Col style={{ flex: 4, paddingLeft: 10 }}>
                      <FormItem style={{ margin: 0 }}>
                        {form.getFieldDecorator(`toActions`, {
                          initialValue: '',
                        })(
                          <Select onChange={e => setToAction(e.toString())} style={{ width: '100%' }}>
                            <Select.Option value="Transfer">Transfer</Select.Option>
                            <Select.Option value="Remove">Remove</Select.Option>
                          </Select>
                        )}
                      </FormItem>
                    </Col>
                    <Col style={{ paddingLeft: 5 }}>
                      <Button onClick={() => setShowToModal(true)}>GO</Button>
                    </Col>
                  </Row>
                </Col>
                <Col style={{ flex: 1, textAlign: 'right', fontSize: 14 }}>Total Cubes {getTotalCubesToTruck()}</Col>
              </Row>
            </>
          )}
        </Card>
      </Col>
    </Row>
  );
};
export default Form.create()(OrderTransfer);
