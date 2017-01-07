import * as React from 'react';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { InputNumber, Icon, Col, Input } from 'antd';
import { SalesPresentationItemClassItemNumber } from 'graphql';
import FormItem from 'antd/lib/form/FormItem';

export interface IKitNumberInputProps {
  form: WrappedFormUtils;
  groupIndex: number;
  group: Partial<SalesPresentationItemClassItemNumber>;
  resetPrice: (priceLevel: string, groupIndex: number) => void;
  priceLevel: string;
}

export default (props: IKitNumberInputProps) => {
  const { form, groupIndex, group, resetPrice, priceLevel } = props;
  return (
    <Col style={{ flex: 1, display: 'flex' }}>
      {form.getFieldDecorator(`groups[${groupIndex}].${priceLevel}_Original`, {
        initialValue: group[`${priceLevel}_Original`],
      })(<Input type="hidden" />)}
      {form.getFieldDecorator(`groups[${groupIndex}].${priceLevel}_CustomPricing`, {
        initialValue: group[`${priceLevel}_CustomPricing`],
      })(<Input type="hidden" />)}
      <FormItem hasFeedback style={{ margin: '5px 0', flex: 1 }}>
        {form.getFieldDecorator(`groups[${groupIndex}].${priceLevel}`, {
          initialValue: group[`${priceLevel}`],
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
                [`groups[${groupIndex}].${priceLevel}_CustomPricing`]: 1,
              });
            }}
            onChange={e => {
              console.log('onChange e', e);
            }}
            onPressEnter={e => {
              e.preventDefault();
            }}
          />
        )}
      </FormItem>
      {form.getFieldValue(`groups[${groupIndex}].${priceLevel}_CustomPricing`) > 0 && (
        <Icon
          type="close-square"
          theme="filled"
          style={{ fontSize: '24px', position: 'relative', top: '5px', color: 'red', marginLeft: '1px' }}
          onClick={() => {
            resetPrice(priceLevel, groupIndex);
          }}
        />
      )}
    </Col>
  );
};

{
  /* <Col style={{ flex: 1 }}>
{form.getFieldDecorator(`groups[${index}.MIX_QTR_Original`, {
  initialValue: item.MIX_QTR_Original,
})(<Input type="hidden" />)}
<FormItem hasFeedback style={{ margin: '5px 0' }}>
  {form.getFieldDecorator(`groups[${index}].MIX_QTR`, {
    initialValue: item.MIX_QTR,
    rules: [{ required: true, message: 'Required' }],
  })(
    <InputNumber
      size="small"
      formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      parser={value => value!.replace(/\$\s?|(,*)/g, '')}
      min={0}
      step={1}
      style={{ width: '100%' }}
    />
  )}
</FormItem>
</Col> */
}
