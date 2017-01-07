import * as React from 'react';
import styles from './index.module.scss';

import { Form, Button, Table } from 'antd';
import { WrappedFormUtils } from 'antd/lib/form/Form';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

// const sampleData = {
//   brand: 'Testing',
//   supplierPartNumberToJoin: '505-BR31',
//   manufacturerModelNumber: '505-BR31',
//   supplierPartNumber: '505-BR31',
//   upcCode: '',
//   asin: '',
//   productName: 'string',
//   wholesalePrice: 'number',
//   mapPrice: '',
//   retailPrice: '',
//   minOrderQuantity: 'number',
//   forceMultiples: 'boolean',
//   displaySetQuantity: 'boolean',
//   actualProductWeight: 'number',
//   productMaxHeight: 'number',
//   productMaxWidth: 'number',
//   productMaxDepth: 'number',
//   option1Category: '',
//   option1Value: '',
//   option2Category: '',
//   option2Value: '',
//   option3Category: '',
//   option3Value: '',
//   collectionName: '',
//   marketingCopy: 'string',
//   featureBullet1: 'string',
//   featureBullet2: 'string',
//   featureBullet3: 'string',
//   featureBullet4: '',
//   featureBullet5: '',
//   featureBullet6: '',
//   featureBullet7: '',
//   countryOfManufacturer: 'string',
//   californiaProposition65WarningRequired: 'boolean',
//   harmonizedCode: '',
//   canadaCode: '',
//   shipType: 'Small Parcel',
//   freightClass: '',
//   supplierLeadTime: 'number',
//   supplierLeadTimeParts: 'number',
//   nmfcCode: '',
//   flatPack: '',
//   shipsPelletized: '',
//   numberOfBoxes: 'number',
//   shipping1Weight: 'number',
//   carton1Height: 'number',
//   carton1Width: 'number',
//   carton1Depth: 'number',
//   shipping2Weight: '',
//   carton2Height: '',
//   carton2Width: '',
//   carton2Depth: '',
//   shipping3Weight: '',
//   carton3Height: '',
//   carton3Width: '',
//   carton3Depth: '',
//   manufacturerProductUrl: '',
//   image1File: 'string',
//   image2File: '',
//   image3File: '',
//   pdf1FileName: '',
//   pdf2FileName: '',
// };
// const formData = [
//   {
//     // brand: 'Testing',
//     // supplierPartNumberToJoin: '505-BR31',
//     manufacturerModelNumber: '505-BR31',
//     supplierPartNumber: '505-BR31',
//     upcCode: '',
//     asin: '',
//     productName: 'string',
//     wholesalePrice: 'number',
//     mapPrice: '',
//     retailPrice: '',
//     minOrderQuantity: 'number',
//     forceMultiples: 'boolean',
//     displaySetQuantity: 'boolean',
//     actualProductWeight: 'number',
//     productMaxHeight: 'number',
//     productMaxWidth: 'number',
//     productMaxDepth: 'number',
//     option1Category: '',
//     option1Value: '',
//     option2Category: '',
//     option2Value: '',
//     option3Category: '',
//     option3Value: '',
//     collectionName: '',
//     marketingCopy: 'string',
//     featureBullet1: 'string',
//     featureBullet2: 'string',
//     featureBullet3: 'string',
//     featureBullet4: '',
//     featureBullet5: '',
//     featureBullet6: '',
//     featureBullet7: '',
//     countryOfManufacturer: 'string',
//     californiaProposition65WarningRequired: 'boolean',
//     harmonizedCode: '',
//     canadaCode: '',
//     shipType: 'Small Parcel',
//     freightClass: '',
//     supplierLeadTime: 'number',
//     supplierLeadTimeParts: 'number',
//     nmfcCode: '',
//     flatPack: '',
//     shipsPelletized: '',
//     numberOfBoxes: 'number',
//     shipping1Weight: 'number',
//     carton1Height: 'number',
//     carton1Width: 'number',
//     carton1Depth: 'number',
//     shipping2Weight: '',
//     carton2Height: '',
//     carton2Width: '',
//     carton2Depth: '',
//     shipping3Weight: '',
//     carton3Height: '',
//     carton3Width: '',
//     carton3Depth: '',
//     manufacturerProductUrl: '',
//     image1File: 'string',
//     image2File: '',
//     image3File: '',
//     pdf1FileName: '',
//     pdf2FileName: '',
//   },
// ];
const demoColumns = [
  {
    title: 'Brand',
    dataIndex: 'brand',
    key: 'brand',
    width: 'auto',
    required: false,
    fixed: true,
  },
  // {
  //   title: 'Supplier Part Number to Join',
  //   dataIndex: 'supplierPartNumberToJoin',
  //   key: 'supplierPartNumberToJoin',
  //   width: 'auto',
  //   required: true,
  //   fixed: true,
  // },
  {
    title: <div className={styles.requiredHeader}>Manufacturer Model Number</div>,
    dataIndex: 'manufacturerModelNumber',
    key: 'manufacturerModelNumber',
    width: 230,
    required: true,
    fixed: true,
  },
  {
    title: <div className={styles.requiredHeader}>Supplier Part Number</div>,
    dataIndex: 'supplierPartNumber',
    key: 'supplierPartNumber',
    required: true,
    fixed: false,
  },
  {
    title: <div className={styles.optionalHeader}>UPC Code</div>,
    dataIndex: 'upcCode',
    key: 'upcCode',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>ASIN</div>,
    dataIndex: 'asin',
    key: 'asin',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Product Name</div>,
    dataIndex: 'productName',
    key: 'productName',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Wholesale Price</div>,
    dataIndex: 'wholesalePrice',
    key: 'wholesalePrice',
    required: true,
  },
  {
    title: <div className={styles.optionalHeader}>MAP Price</div>,
    dataIndex: 'mapPrice',
    key: 'mapPrice',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Full Retail Price (MSRP)</div>,
    dataIndex: 'retailPrice',
    key: 'retailPrice',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Minimum Order Quantity (Per Part #)</div>,
    dataIndex: 'minimumOrderQuantity',
    key: 'minimumOrderQuantity',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Force Multiples</div>,
    dataIndex: 'forceMultiples',
    key: 'forceMultiples',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Display Set Quantity</div>,
    dataIndex: 'displaySetQuantity',
    key: 'displaySetQuantity',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Actual Product Weight</div>,
    dataIndex: 'actualProductWeigh',
    key: 'actualProductWeigh',
    width: 'auto',
    required: true,
  },
  {
    title: <div className={styles.optionalHeader}>Product Max Height (Top to Bottom)</div>,
    dataIndex: 'productMaxHeight',
    key: 'productMaxHeight',
    width: 'auto',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Product Max Width (Side to Side)</div>,
    dataIndex: 'productMaxWidth',
    key: 'productMaxWidth',
    width: 'auto',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Product Max Depth (Font to Back)</div>,
    dataIndex: 'productMaxDepth',
    key: 'productMaxDepth',
    width: 'auto',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 1 Category</div>,
    dataIndex: 'option1Category',
    key: 'option1Category',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 1 Value</div>,
    dataIndex: 'option1Value',
    key: 'option1Value',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 2 Category</div>,
    dataIndex: 'option2Category',
    key: 'option2Category',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 2 Value</div>,
    dataIndex: 'option2Value',
    key: 'option2Value',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 3 Category</div>,
    dataIndex: 'option3Category',
    key: 'option3Category',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Option 3 Value</div>,
    dataIndex: 'option3Value',
    key: 'option3Value',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Marketing Copy</div>,
    dataIndex: 'marketingCopy',
    key: 'marketingCopy',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Feature Bullet 1</div>,
    dataIndex: 'featureBullet1',
    key: 'featureBullet1',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Feature Bullet 2</div>,
    dataIndex: 'featureBullet2',
    key: 'featureBullet2',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Feature Bullet 3</div>,
    dataIndex: 'featureBullet3',
    key: 'featureBullet3',
    required: true,
  },
  {
    title: <div className={styles.optionalHeader}>Feature Bullet 4</div>,
    dataIndex: 'featureBullet4',
    key: 'featureBullet4',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Feature Bullet 5</div>,
    dataIndex: 'featureBullet5',
    key: 'featureBullet5',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Feature Bullet 6</div>,
    dataIndex: 'featureBullet6',
    key: 'featureBullet6',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Feature Bullet 7</div>,
    dataIndex: 'featureBullet7',
    key: 'featureBullet7',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Country of Manufacturer</div>,
    dataIndex: 'countryOfManufacturer',
    key: 'countryOfManufacturer',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>California Proposition 65 Warning Required</div>,
    dataIndex: 'californiaProposition65',
    key: 'californiaProposition65',
    required: true,
  },
  {
    title: <div className={styles.optionalHeader}>Harmonized Code</div>,
    dataIndex: 'harmonizedCode',
    key: 'harmonizedCode',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Canada Code (for Import)</div>,
    dataIndex: 'canadaCode',
    key: 'canadaCode',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Ship Type (Small Parcel, LTL)</div>,
    dataIndex: 'shipType',
    key: 'shipType',
    required: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Freight Class</div>,
    dataIndex: 'freightClass',
    key: 'freightClass',
    conditional: true,
  },
  {
    title: <div className={styles.requiredHeader}>Supplier Lead Time in Business Day Hours</div>,
    dataIndex: 'supplierLeadTime',
    key: 'supplierLeadTime',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Supplier Lead Time in Business Day Hours for Replacement Parts</div>,
    dataIndex: 'supplierLeadTimeReplacementParts',
    key: 'supplierLeadTimeReplacementParts',
    required: true,
  },
  {
    title: <div className={styles.optionalHeader}>NMFC Code</div>,
    dataIndex: 'nmfcCode',
    key: 'nmfcCode',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Flat Pack (Y/N)</div>,
    dataIndex: 'flatPack',
    key: 'flatPack',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>Ships Palletized (Y/N)</div>,
    dataIndex: 'shipsPalletized',
    key: 'shipsPalletized',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Number of Boxes</div>,
    dataIndex: 'numberOfBoxes',
    key: 'numberOfBoxes',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Shipping Weight (Box 1)</div>,
    dataIndex: 'shippingWeightBox1',
    key: 'shippingWeightBox1',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Carton Height (Box 1)</div>,
    dataIndex: 'cartonHeightBox1',
    key: 'cartonHeightBox1',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Carton Width (Box 1)</div>,
    dataIndex: 'cartonWidthBox1',
    key: 'cartonWidthBox1',
    required: true,
  },
  {
    title: <div className={styles.requiredHeader}>Carton Depth (Box 1)</div>,
    dataIndex: 'cartonDepthBox1',
    key: 'cartonDepthBox1',
    required: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Shipping Weight (Box 2)</div>,
    dataIndex: 'shippingWeightBox2',
    key: 'shippingWeightBox2',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Height (Box 2)</div>,
    dataIndex: 'cartonHeightBox2',
    key: 'cartonHeightBox2',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Width (Box 2)</div>,
    dataIndex: 'cartonWidthBox2',
    key: 'cartonWidthBox2',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Depth (Box 2)</div>,
    dataIndex: 'cartonDepthBox2',
    key: 'cartonDepthBox2',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Shipping Weight (Box 3)</div>,
    dataIndex: 'shippingWeightBox3',
    key: 'shippingWeightBox3',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Height (Box 3)</div>,
    dataIndex: 'cartonHeightBox3',
    key: 'cartonHeightBox3',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Width (Box 3)</div>,
    dataIndex: 'cartonWidthBox3',
    key: 'cartonWidthBox3',
    conditional: true,
  },
  {
    title: <div className={styles.conditionalHeader}>Carton Depth (Box 3)</div>,
    dataIndex: 'cartonDepthBox3',
    key: 'cartonDepthBox3',
    conditional: true,
  },
  {
    title: <div className={styles.optionalHeader}>Manufacturer Product URL</div>,
    dataIndex: 'manufacturerProductUrl',
    key: 'manufacturerProductUrl',
    required: false,
  },
  {
    title: <div className={styles.requiredHeader}>Image 1 File</div>,
    dataIndex: 'image1File',
    key: 'image1File',
    width: 'auto',
    required: true,
    render: (image1File: string, row: any) => {
      return (
        <a href={image1File} target="_blank" rel="noopener noreferrer">
          Image 1
        </a>
      );
    },
  },
  {
    title: <div className={styles.optionalHeader}>Image 2 File</div>,
    dataIndex: 'image2File',
    key: 'image2File',
    width: 'auto',
    required: false,
    render: (image2File: string, row: any) => {
      return (
        <a href={image2File} target="_blank" rel="noopener noreferrer">
          Image 2
        </a>
      );
    },
  },
  {
    title: <div className={styles.optionalHeader}>Image 3 File</div>,
    dataIndex: 'image3File',
    key: 'image3File',
    width: 'auto',
    required: false,
    render: (image3File: string, row: any) => {
      return (
        <a href={image3File} target="_blank" rel="noopener noreferrer">
          Image 3
        </a>
      );
    },
  },
  {
    title: <div className={styles.optionalHeader}>PDF 1 File Name</div>,
    dataIndex: 'pdf1FileName',
    key: 'pdf1FileName',
    width: 'auto',
    required: false,
  },
  {
    title: <div className={styles.optionalHeader}>PDF 2 File Name</div>,
    dataIndex: 'pdf2FileName',
    key: 'pdf2FileName',
    width: 'auto',
    required: false,
  },
];

interface IBoomerangProps extends RouteComponentProps<any> {
  form: WrappedFormUtils;
  shouldHideWizardNav: any;
  setProducts: any;
  products: any[];
}
interface IState {
  showModal: boolean;
  addingProduct: boolean;
  rows: any[];
}

class Login extends React.Component<IBoomerangProps, IState> {
  state = {
    addingProduct: false,
    showModal: false,
    isSubmitForm: false,
    rows: [],
  };

  componentWillReceiveProps(newProps: any) {
    this.setState({ rows: newProps.products });
  }

  onSubmit = (e: any) => {
    e.preventDefault();
    if (this.props.form.getFieldValue('email') === 'external@libertyfurn.com') {
      this.props.history.push('/partners/wizard');
    } else {
      this.props.history.push('/corporate');
    }
  };

  addProduct = () => {
    this.setState({ addingProduct: true });
    this.props.history.push('/corporate/input');
  };

  onAdd = (row: any) => {
    const rows = [row].concat(this.state.rows);
    this.setState({ rows });
    this.props.setProducts(rows);
  };

  done = () => {
    this.setState({ addingProduct: false });
    this.props.shouldHideWizardNav(false);
  };

  render() {
    // const { form } = this.props;
    const { addingProduct } = this.state;

    return (
      <div className={styles.wrapper}>
        {!addingProduct && (
          <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                style={{ marginBottom: 20 }}
                onClick={() => {
                  this.props.history.push('/corporate/products/add');
                }}
              >
                Add Product
              </Button>
            </div>
            <Table dataSource={this.props.products} columns={demoColumns} bordered scroll={{ x: 2100 }} showHeader={true} size="default" />
          </div>
        )}
        {/* {addingProduct && <RegisterForm onAdd={this.onAdd} done={this.done} />} */}
      </div>
    );
  }
}

export default Form.create()(withRouter(Login as any));
