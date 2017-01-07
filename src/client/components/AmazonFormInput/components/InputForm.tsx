import * as React from 'react';
import { Button, Form, Input, Row, Col, Modal } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ImageSelector } from './ImageSelector';
import sampleImage from '../../../../assets/img/products/sample_image_u105.jpg';

const FormItem = Form.Item;

export interface IInputForm {
  brand?: string;
  manufacturerModelNumber: string;
  supplierPartNumber: string;
  upcCode?: string;
  asin?: string;
  productName: string;
  wholesalePrice: number;
  mapPrice?: number;
  retailPrice?: number;
  minOrderQuantity: number;
  forceMultiples: boolean;
  displaySetQuantity: boolean;
  actualProductWeight: number;
  productMaxHeight: number;
  productMaxWidth: number;
  productMaxDepth: number;
  option1Category?: string;
  option1Value?: string;
  option2Category?: string;
  option2Value?: string;
  option3Category?: string;
  option3Value?: string;
  collectionName?: string;
  marketingCopy: string;
  featureBullet1: string;
  featureBullet2: string;
  featureBullet3: string;
  featureBullet4?: string;
  featureBullet5?: string;
  featureBullet6?: string;
  featureBullet7?: string;
  countryOfManufacturer: string;
  californiaProposition65WarningRequired: boolean;
  harmonizedCode?: string;
  canadaCode?: string;
  shipType: 'Small Parcel' | 'LTL';
  freightClass?: string;
  supplierLeadTime: number;
  supplierLeadTimeParts: number;
  nmfcCode?: string;
  flatPack?: boolean;
  shipsPelletized?: boolean;
  numberOfBoxes: number;
  shipping1Weight: number;
  carton1Height: number;
  carton1Width: number;
  carton1Depth: number;

  shipping2Weight?: number;
  carton2Height?: number;
  carton2Width?: number;
  carton2Depth?: number;

  shipping3Weight?: number;
  carton3Height?: number;
  carton3Width?: number;
  carton3Depth?: number;

  manufacturerProductUrl?: string;
  image1File: string;
  image2File?: string;
  image3File?: string;
  pdf1FileName?: string;
  pdf2FileName?: string;
}

export interface IFormModal {
  form: WrappedFormUtils;
  onAdd: (row: any) => void;
  done: () => void;
}

class WrappedComponent extends React.Component<IFormModal & RouteComponentProps<any>, any> {
  state = {
    showModal: false,
    imageSelected: false,
    imgUrl: '',
    selectedKeys: [],
    expandedKeys: [],
    imageUrlChosen: '',
  };

  onChange = (a: any, b: any) => {
    console.log(a, b);
  };
  handleSubmit = (e: any) => {
    e.preventDefault();
  };

  imageSelected = () => {
    this.setState({
      imageSelected: true,
      imgUrl: sampleImage,
    });
  };

  onExpand = (expandedKeys: any) => {
    this.setState({ expandedKeys });
  };

  getData = (code: string) => {
    const newData = {
      supplierPartNumber: code,
      upcCode: (Math.random() * 100 + 1250).toFixed(0),
      wholesalePrice: (Math.random() * 100 + 300).toFixed(0),
      mapPrice: (Math.random() * 100 + 400).toFixed(0),
      retailPrice: (Math.random() * 100 + 500).toFixed(0),
      actualProductWeight: (Math.random() * 100 + 100).toFixed(0),
      productMaxHeight: (Math.random() * 100).toFixed(0),
      productMaxWidth: (Math.random() * 100).toFixed(0),
      productMaxDepth: (Math.random() * 100).toFixed(0),
      option1Category: 'Style',
      option1Value: (Math.random() * 100).toFixed(0),
    };
    this.props.form.setFieldsValue(newData);
  };

  onSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values: any) => {
      if (!err) {
        this.props.onAdd(values);
        this.props.form.resetFields();
        this.setState({
          showModal: false,
          imageSelected: false,
          imgUrl: '',
          selectedKeys: [],
          expandedKeys: [],
          imageUrlChosen: '',
        });
      } else {
        console.log('err', err);
      }
    });
  };

  handleOk = () => {
    this.setState({
      showModal: false,
      imgUrl: '',
      imageSelected: false,
      selectedKeys: [],
      expandedKeys: [],
      imageUrlChosen: 'https://www.mylibertyfurniture.com/globalassets/product-images/large/689-br-vn.jpg',
    });
    this.props.form.setFieldsValue({
      image1File: 'https://www.mylibertyfurniture.com/globalassets/product-images/large/689-br-vn.jpg',
    });
  };

  handleCancel = () => {
    this.setState({
      showModal: false,
      imageSelected: false,
      imgUrl: '',
      selectedKeys: [],
      expandedKeys: [],
      imageUrlChosen: '',
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="header-area">
        <div className="container">
          <div className="modalContentWrapper">
            <Form layout="vertical" onSubmit={e => this.onSubmit(e)}>
              {/* <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <FormItem hasFeedback label="Wayfair SKU to Join">
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Wayfair SKU to Join',
                        },
                      ],
                    })(<Input placeholder="Enter Wayfair SKU to Join" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem hasFeedback label="Supplier Part Number to Join">
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Supplier Part Number to Join',
                        },
                      ],
                    })(
                      <Input placeholder="Enter Supplier Part Number to Join" />
                    )}
                  </FormItem>
                </Col>
              </Row> */}

              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Manufacturer Model Number">
                    {getFieldDecorator('manufacturerModelNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Manufacturer Model Number',
                        },
                      ],
                    })(<Input placeholder="Enter Manufacturer Model Number" onBlur={(e: any) => this.getData(e.target.value)} />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Supplier Part Number">
                    {getFieldDecorator('supplierPartNumber', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Supplier Part Number',
                        },
                      ],
                    })(<Input placeholder="Enter Supplier Part Number" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="UPC Code">
                    {getFieldDecorator('upcCode', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter UPC Code',
                        },
                      ],
                    })(<Input placeholder="Enter UPC Code" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Wholesale Price">
                    {getFieldDecorator('wholesalePrice', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Wholesale Price',
                        },
                      ],
                    })(<Input placeholder="Enter Wholesale Price" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="MAP Price">
                    {getFieldDecorator('mapPrice', {
                      rules: [{ required: true, message: 'Please enter MAP Price' }],
                    })(<Input placeholder="Enter MAP Price" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Retail Price">
                    {getFieldDecorator('retailPrice', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Retail Price',
                        },
                      ],
                    })(<Input placeholder="Enter Retail Price" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Actual Product Weight">
                    {getFieldDecorator('actualProductWeight', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Actual Product Weight',
                        },
                      ],
                    })(<Input placeholder="Enter Actual Product Weight" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Product Max Height">
                    {getFieldDecorator('productMaxHeight', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Product Max Height',
                        },
                      ],
                    })(<Input placeholder="Enter Product Max Height" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={8}>
                  <FormItem hasFeedback label="Product Max Depth">
                    {getFieldDecorator('productMaxDepth', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Product Max Depth',
                        },
                      ],
                    })(<Input placeholder="Enter Product Max Depth" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col xs={24} sm={12}>
                  <FormItem hasFeedback label="Option 1 Category">
                    {getFieldDecorator('option1Category', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Option 1 Category',
                        },
                      ],
                    })(<Input placeholder="Enter Option 1 Category" />)}
                  </FormItem>
                </Col>
                <Col xs={24} sm={12}>
                  <FormItem hasFeedback label="Option 1 Value">
                    {getFieldDecorator('option1Value', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter Option 1 Value',
                        },
                      ],
                    })(<Input placeholder="Enter Option 1 Value" />)}
                  </FormItem>
                </Col>
              </Row>
              <Row type="flex" gutter={16} align="middle">
                <Col>
                  <Button type="primary" className="getStartedButton" size="large" onClick={() => this.setState({ showModal: true })}>
                    Select an Image
                  </Button>
                </Col>
                {this.state.imageUrlChosen && (
                  <>
                    <Col>
                      <img src={sampleImage} style={{ width: 40 }} />
                    </Col>
                  </>
                )}
                <Col>
                  <FormItem hasFeedback label="Image">
                    {getFieldDecorator('image1File', {
                      rules: [
                        {
                          required: true,
                          message: 'Please select an Image',
                        },
                      ],
                    })(<Input placeholder="Select an Image" readOnly style={{ width: 350 }} />)}
                  </FormItem>
                </Col>
              </Row>

              <Row type="flex" justify="end">
                <Col>
                  <Button type="danger" className="getStartedButton" size="large" onClick={() => this.props.done()}>
                    Cancel
                  </Button>
                  <Button className="getStartedButton" size="large" onClick={() => this.props.done()} style={{ marginLeft: 16 }}>
                    Done
                  </Button>
                  <Button type="primary" className="getStartedButton" size="large" htmlType="submit" style={{ marginLeft: 16 }}>
                    Save and Add Another
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
        <Modal
          title="Image Selector"
          visible={this.state.showModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={600}
          okText="Select Image"
          okButtonProps={{ disabled: !this.state.imageSelected }}
          // cancelButtonProps={{ disabled: true }}
        >
          <ImageSelector
            imageSelected={this.imageSelected}
            imgUrl={this.state.imgUrl}
            selectedKeys={this.state.selectedKeys}
            expandedKeys={this.state.expandedKeys}
            setExpandedKeys={this.onExpand}
          />
        </Modal>
      </div>
    );
  }
}

export default Form.create<IFormModal>()(withRouter(WrappedComponent as any));
