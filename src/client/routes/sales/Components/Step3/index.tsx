import * as React from 'react';
import { Row, Col, Button, Collapse, Select, Anchor, Card, message } from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import Form, { WrappedFormUtils } from 'antd/lib/form/Form';
import { RouteComponentProps, withRouter } from 'react-router';
import { findIndex, some } from 'lodash';
import './index.scss';
import { ProductData, PresentationAndProductData, useSaveItemClassImagesMutation } from 'graphql';
import GetPhotos from './Components/GetPhotos';
import { useState } from 'react';
import omitDeep from 'omit-deep-lodash';
import Sticky from 'react-stickynode';
import { SalesPresentationContext } from '../../SalesPresentationContext';

export interface PhotoProps extends RouteComponentProps<any> {
  currentData?: PresentationAndProductData;
  form: WrappedFormUtils;
}

const Step3 = (props: PhotoProps & FormComponentProps<PhotoProps>) => {
  const { form, currentData } = props;
  // const presentationContext = React.useContext(SalesPresentationContext);
  const { presentation, itemClass, itemClassIndex, productData, presentationImages } = currentData!;
  const [selectedImages, setSelectedImages] = useState<{ itemNumber: string; imageIndex: number; imageUrl: string }[]>(presentationImages.length > 0 ? omitDeep(presentationImages, ['__typename']) : []);
  const [savingImages, setSavingImages] = useState(false);
  let currentIndex = itemClassIndex;
  const [saveImages] = useSaveItemClassImagesMutation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent<any>) => {
    e.preventDefault();
    await processSubmit();
  };

  const processSubmit = async (redirect?: string, index: number = 0) => {
    form.validateFieldsAndScroll(async (err: any, values: any) => {
      setSavingImages(true);
      const { searchKitItem, searchItemNumber, searchMasterGroupNumber, ...rest } = values;
      const data = {
        salesPresentationId: presentation!.id!,
        salesPresentationItemClassId: itemClass.id,
        itemClass: itemClass.itemClass,
        itemClassIndex,
        images: [...selectedImages],
      };

      const result = await saveImages({
        variables: {
          data,
        },
      }).catch(ex => {
        console.log('error:', ex.message);
        setSavingImages(false);
      });

      if (result && result.data) {
        form.resetFields();
        setSavingImages(false);
        if (result.data.saveItemClassImages) {
          localStorage.setItem('spid', result.data.saveItemClassImages.presentation.id!.toString());
          if (redirect) {
            let itemClass: string = '';
            switch (redirect) {
              case 'Details':
                props.history.push(`/sales-presentations/wizard/step-1`);
                break;

              case 'Preview':
                props.history.push(`/sales-presentations/wizard/step-4`);
                break;

              case 'Pricing':
                itemClass = presentation.itemClasses[0].itemClass;
                localStorage.setItem('idx', '0');
                props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, { index: 0 });
                break;

              case 'Photo-Direct':
                itemClass = presentation.itemClasses[index].itemClass;
                localStorage.setItem('idx', index.toString());
                props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index: index });
                break;
            }
          } else {
            currentIndex++;
            if (currentIndex + 1 > presentation!.itemClasses.length) {
              props.history.push(`/sales-presentations/wizard/step-4`, { index: itemClassIndex });
            } else {
              localStorage.setItem('idx', `${result.data.saveItemClassImages.itemClassIndex}`);
              const itemClass = presentation!.itemClasses[result.data.saveItemClassImages.itemClassIndex].itemClass;
              props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, { index: currentIndex });
            }
          }
        }
        // props.history.push('/sales-presentations/wizard/step-2');
      }
      setSavingImages(false);
    });
  };

  const navigateBack = () => {
    if (currentIndex - 1 < 0) {
      localStorage.setItem('idx', '0');
      const itemClass = presentation!.itemClasses[0].itemClass;
      localStorage.setItem('spic', itemClass);
      props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, {
        index: 0,
        next: presentation!.itemClasses[0].itemClass,
      });
    } else {
      const index = currentIndex - 1;
      localStorage.setItem('idx', `${index}`);
      const itemClass = presentation.itemClasses[index].itemClass;
      localStorage.setItem('spic', itemClass);
      props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, {
        index: currentIndex + 1,
        previous: itemClass,
      });
    }
  };

  const navigateForward = () => {
    if (currentIndex + 1 >= presentation!.itemClasses.length) {
      props.history.push(`/sales-presentations/wizard/step-3/${presentation!.itemClasses[0].itemClass}`, { index: 0, previous: itemClass.itemClass });
    } else {
      localStorage.setItem('idx', `${currentIndex + 1}`);
      const itemClass = presentation!.itemClasses[currentIndex + 1].itemClass;
      localStorage.setItem('spic', itemClass);
      props.history.push(`/sales-presentations/wizard/step-2/${itemClass}`, {
        index: currentIndex + 1,
        previous: presentation!.itemClasses[currentIndex].itemClass,
        next: presentation!.itemClasses[currentIndex + 1].itemClass,
      });
    }
  };

  const getNextUrlText = () => {
    if (currentIndex + 1 >= presentation!.itemClasses.length) {
      return 'Preview';
    } else {
      return presentation!.itemClasses[currentIndex + 1].itemClass;
    }
  };

  const getPreviousUrlText = () => {
    if (currentIndex - 1 < 0) {
      return 'Pricing';
    } else {
      return presentation!.itemClasses[currentIndex - 1].itemClass;
    }
  };

  const isSelected = (itemNumber: string, imageIndex: number) => {
    return some(selectedImages, image => image.itemNumber === itemNumber && image.imageIndex === imageIndex);
  };

  const selectImage = (photo: any, imageIndex: number) => {
    console.log('photo, imageIndex', photo, imageIndex);
    const alreadyExists = findIndex(selectedImages, image => (image.itemNumber === photo.Item_Number || image.itemNumber === photo.itemNumber) && image.imageIndex === imageIndex);
    if (alreadyExists >= 0) {
      // remove(selectedImages, image => image.itemNumber === photo.Item_Number && image.imageIndex === imageIndex)
      selectedImages.splice(alreadyExists, 1);
      setSelectedImages([...selectedImages]);
    } else {
      if (selectedImages.length === 4) {
        message.error('Already Have Maximum Selected Images');
        return false;
      }
      setSelectedImages([
        ...selectedImages,
        {
          itemNumber: photo.Item_Number!,
          imageIndex,
          imageUrl: photo[`Image_${imageIndex}`]!,
        },
      ]);
    }
  };

  const renderImages = (photo: Partial<ProductData>) => {
    const numbers = Array.from({ length: 20 }, (v, i) => i);
    return (
      <Row
        style={{
          border: 'solid 1px #ccc',
          backgroundColor: '#efefef',
          marginBottom: 20,
          width: '100%',
        }}
      >
        <Col>
          <Row type="flex">
            <Col style={{ flex: 1, display: 'flex', flexWrap: 'wrap' }}>
              {numbers.map(imageIndex => {
                if (!photo[`Image_${imageIndex}`] || photo[`Image_${imageIndex}`] === 'No Image Available') return null;
                return (
                  <div style={{ marginBottom: '-7px' }}>
                    <img
                      key={imageIndex}
                      src={photo[`Image_${imageIndex}`]}
                      onClick={() => selectImage(photo, imageIndex)}
                      style={{
                        maxWidth: '150px',
                        cursor: 'pointer',
                        margin: 10,
                        borderTopLeftRadius: 5,
                        borderTopRightRadius: 5,
                        border: 'solid 1px #383c4f',
                      }}
                    />
                    {isSelected(photo!.Item_Number!, imageIndex) ? (
                      <div
                        style={{
                          position: 'relative',
                          top: '-10px',
                          backgroundColor: '#6b8d04',
                          margin: '0 10px 10px',
                          borderBottomLeftRadius: '4px',
                          borderBottomRightRadius: '4px',
                          fontWeight: 700,
                          padding: '2px 5px',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        Remove Image
                      </div>
                    ) : (
                      <div
                        style={{
                          position: 'relative',
                          top: '-10px',
                          margin: '0 10px 10px',
                          backgroundColor: 'transparent',
                          borderBottomLeftRadius: '4px',
                          borderBottomRightRadius: '4px',
                          fontWeight: 700,
                          padding: '2px 5px',
                          color: '#999',
                          textAlign: 'center',
                        }}
                      >
                        Not Selected
                      </div>
                    )}
                  </div>
                );
              })}
            </Col>
          </Row>
          <Row
            style={{
              backgroundColor: '#383c4f',
              color: 'white',
              padding: '10px',
              fontWeight: 700,
            }}
          >
            <Col>
              {photo.Item_Number}: {photo.Item_Description}
            </Col>
          </Row>
        </Col>
      </Row>
    );
  };

  const jumpTo = async (id: number) => {
    if (id === -1) {
      await processSubmit('Details');
    } else if (id === -2) {
      await processSubmit('Pricing', 0);
    } else if (id === -3) {
      await processSubmit('Preview');
    } else {
      let index = findIndex(presentation.itemClasses, ic => ic.id === id);
      if (index < 0) index = 0;
      if (index > presentation.itemClasses.length) index = presentation.itemClasses.length - 1;
      console.log('index', index);
      await processSubmit('Photo-Direct', index);
    }

    // console.log('id', id);
    // if (id < 0) {
    //   localStorage.setItem('idx', `${0}`);
    //   const itemClass = presentation!.itemClasses[0].itemClass;
    //   localStorage.setItem('spic', itemClass);
    //   props.history.push(`/sales-presentations/wizard/step-4`, {
    //     index: 0,
    //     previous: 'Photos',
    //     next: '',
    //   });
    // } else {
    //   const index = findIndex(presentation.itemClasses, ic => ic.id === id);
    //   localStorage.setItem('idx', `${index}`);
    //   const itemClass = presentation!.itemClasses[index].itemClass;
    //   localStorage.setItem('spic', itemClass);
    //   props.history.push(`/sales-presentations/wizard/step-3/${itemClass}`, {
    //     index: index,
    //     previous: index - 1 >= 0 ? presentation!.itemClasses[index - 1].itemClass : 'Details',
    //     next: index + 1 < presentation!.itemClasses.length ? presentation!.itemClasses[index + 1].itemClass : 'Photos',
    //   });
    // }
  };

  // const options = data && data!.findItemClass ? <Option key={data.findItemClass!.itemClass}>{data.findItemClass!.itemClass}</Option> : null;
  return (
    <Form className="login-form" onSubmit={handleSubmit}>
      <Anchor style={{ borderBottom: 'solid 1px #383c4f' }}>
        <Row>
          <Col
            style={{
              fontSize: '24px',
              padding: 10,
              backgroundColor: '#383c4f',
              color: 'white',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            Photo Selection for Item Class: {itemClass.itemClass}
          </Col>
        </Row>
        <Row
          type="flex"
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '10px 20px 20px 20px',
          }}
        >
          <Col style={{ flex: 1 }}>
            <Row type="flex" gutter={12}>
              <Col style={{ flex: 10, paddingTop: 15, textAlign: 'right' }}>
                <Button className="header-button" icon="caret-left" onClick={navigateBack}>
                  Go To {getPreviousUrlText()}
                </Button>
                <Select defaultValue={presentation.itemClasses[currentIndex].id} onChange={e => jumpTo(e)} style={{ maxWidth: 150 }}>
                  <Select.Option key="Details" value={-1}>
                    Jump To Details
                  </Select.Option>
                  <Select.Option key="Pricing" value={-2}>
                    Jump To Pricing
                  </Select.Option>
                  {presentation.itemClasses.map(ic => (
                    <Select.Option key={ic.id} value={ic.id}>
                      Jump To {ic.itemClass}
                    </Select.Option>
                  ))}
                  <Select.Option key="Preview" value={-3}>
                    Jump To Preview
                  </Select.Option>
                </Select>
                <Button htmlType="submit" disabled={selectedImages.length === 0} loading={savingImages} type="primary" className="header-button" icon="caret-right">
                  <span>
                    {savingImages ? (
                      <>&nbsp;Saving {itemClass.itemClass}...</>
                    ) : (
                      <>
                        Go To <>{getNextUrlText()}</>
                      </>
                    )}
                  </span>
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Anchor>
      <div style={{ margin: 20 }}>
        <Row type="flex" gutter={12}>
          <Col style={{ flex: 4 }}>
            {productData &&
              productData!.map(photo => (
                <Row type="flex" style={{ marginBottom: 20 }}>
                  <Col style={{ display: 'flex', flexDirection: 'row', flex: 1 }}>{renderImages(photo)}</Col>
                </Row>
              ))}
          </Col>
          <Col
            style={{
              flex: 1,
              minWidth: '190px',
              maxWidth: '210px',
              width: '100%',
            }}
          >
            <Sticky enabled={true} top={150}>
              <Row>
                <Col
                  style={{
                    fontWeight: 700,
                    textAlign: 'center',
                    backgroundColor: '#383c4f',
                    color: 'white',
                    padding: 10,
                    borderRadius: 4,
                    marginBottom: 5,
                  }}
                >
                  Selected Images: {selectedImages.length} of 4
                </Col>
              </Row>
              <Row>
                <Col>
                  {selectedImages.map((img: any, index: number) => (
                    <div onClick={() => selectImage(img, img.imageIndex)} style={{ cursor: 'pointer' }}>
                      <img
                        key={index}
                        src={img.imageUrl}
                        style={{
                          maxWidth: '150px',
                          margin: '10px 25px 0 25px',
                          borderRadius: 5,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                          border: 'solid 1px #383c4f',
                        }}
                      />
                      <div
                        style={{
                          position: 'relative',
                          top: '0',
                          backgroundColor: '#6b8d04',
                          margin: '0 23px 0 25px',
                          borderBottomLeftRadius: '4px',
                          borderBottomRightRadius: '4px',
                          fontWeight: 700,
                          padding: '2px 5px',
                          color: 'white',
                          textAlign: 'center',
                        }}
                      >
                        Remove Image
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        {img.itemNumber} #{img.imageIndex}
                      </div>
                    </div>
                  ))}
                  {/* <Button
                    htmlType="submit"
                    type="primary"
                    disabled={selectedImages.length === 0}
                    style={{ width: '100%', margin: '10px 0' }}
                    loading={savingImages}
                  >
                    Save and Next
                  </Button> */}
                </Col>
              </Row>
            </Sticky>
          </Col>
        </Row>
      </div>
    </Form>
  );
};

export default Form.create<PhotoProps>()(GetPhotos<PhotoProps>(withRouter<PhotoProps, any>(Step3)));
