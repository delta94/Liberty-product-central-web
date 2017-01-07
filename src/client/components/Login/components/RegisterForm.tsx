import * as React from 'react';
import { Button, Form, Input } from 'antd';
import { Mutation } from 'react-apollo';
import { WrappedFormUtils } from 'antd/lib/form/Form';

const FormItem = Form.Item;
export interface IFormModal {
  form: WrappedFormUtils;
}

interface IFormState {
  showModal: boolean;
  exitIntent: number;
}

class WrappedComponent extends React.Component<IFormModal, any> {
  state = {
    showModal: true,
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="header-area">
        <div className="container">
          <div className="modalContentWrapper">
            <Form layout="vertical">
              <div className="row">
                <div className="col-xl-6">
                  <FormItem hasFeedback label="First Name">
                    {getFieldDecorator('firstName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your First Name',
                        },
                      ],
                    })(<Input placeholder="Enter First Name Here" />)}
                  </FormItem>
                </div>

                {/* <div className="col-xl-6">
                        {getFieldDecorator('firstName', {
                          initialValue:this.state.aid,
                          rules: [{ required: true, message: 'Please enter your First Name' }],
                        })(<Input placeholder="Enter First Name Here" type="hidden" />)}
                    </div> */}

                <div className="col-xl-6">
                  <FormItem hasFeedback label="Last Name">
                    {getFieldDecorator('lastName', {
                      rules: [
                        {
                          required: true,
                          message: 'Please enter your Last Name',
                        },
                      ],
                    })(<Input placeholder="Enter Last Name Here" />)}
                  </FormItem>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-6">
                  <FormItem hasFeedback label="Email">
                    {getFieldDecorator('email', {
                      rules: [
                        {
                          type: 'email',
                          message: 'The input is not valid E-mail!',
                        },
                        { required: true, message: 'Please enter your Email' },
                      ],
                    })(<Input placeholder="Enter Email Address Here" />)}
                  </FormItem>
                </div>
                <div className="col-xl-6">
                  <FormItem hasFeedback label="Phone">
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: 'Please enter your Phone' }],
                    })(<Input placeholder="Enter Phone Here" />)}
                  </FormItem>
                </div>
              </div>
              <Button className="getStartedButton" size="large">
                ENTER NOW
              </Button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

export default Form.create<IFormModal>()(WrappedComponent as any);
