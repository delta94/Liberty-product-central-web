import * as React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { InputNumber, Icon, Col, Input } from 'antd';
import { SalesPresentationItemClassKit } from 'graphql';
import FormItem from 'antd/lib/form/FormItem';

export interface IKitNumberInputProps {
  form: WrappedFormUtils;
  kitItemIndex: number;
  itemIndex: number;
  kitItem: SalesPresentationItemClassKit;
  resetPrice: (priceLevel: string, kitItemIndex: number, itemIndex: number) => void;
  priceLevel: string;
}

export default (props: IKitNumberInputProps) => {
  const { form, kitItemIndex, itemIndex, kitItem, resetPrice, priceLevel } = props;
  return (
    <Col style={{ flex: 1, display: 'flex' }}>
      {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_Original`, {
        initialValue: kitItem[`${priceLevel}_Original`],
      })(<Input type="hidden" />)}
      {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`, {
        initialValue: kitItem[`${priceLevel}_CustomPricing`],
      })(<Input type="hidden" />)}
      <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
        {form.getFieldDecorator(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}`, {
          initialValue: kitItem[`${priceLevel}`],
          trigger: 'onBlur',
          valuePropName: 'defaultValue',
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
                [`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`]: 1,
              });
            }}
            // // onChange={e => {
            // //   console.log('onChange e', e);
            // //   // e.preventDefault();
            // //   // e.currentTarget.blur();
            // //   // form.setFieldsValue({
            // //   //   [`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`]: e,
            // //   // });
            // // }}
            onPressEnter={e => {
              e.preventDefault();
            }}
          />
        )}
      </FormItem>
      {form.getFieldValue(`kits[${kitItemIndex}].kitItems[${itemIndex}].${priceLevel}_CustomPricing`) > 0 && (
        <Icon
          type="close-square"
          theme="filled"
          style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
          onClick={() => {
            resetPrice(priceLevel, kitItemIndex, itemIndex);
          }}
        />
      )}
    </Col>
  );
};
