import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Input, Icon, Button, message, Spin, Modal } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import Logo from '../elements/logo'
import history from '../../history'
import * as creators from '../../state/actionCreators'
import image from '../../images/register.png'

const SetNewPassword = props => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector(state => state.user)

  const [confirmDirty, setConfirmDirty] = useState(false)
  const token = window.location.href.split('=')[1]
  const URL = `https://shopping-cart-eu3.herokuapp.com/api/auth/reset/${token}`
  const handleSubmit = e => {
    e.preventDefault()
    props.form.validateFieldsAndScroll((err, values) => {
      const payload = {
        password: values.password
      }
      if (!err) {
        dispatch(creators.setLoading(true))
        axios
          .post(URL, payload)
          .then(res => {
            dispatch(creators.setLoading(false))
            dispatch(creators.clearErrors())
            Modal.info({
              title: 'Success',
              content: 'Your password has been reset successfully.',
              centered: true,
              onOk () {
                history.push('/')
              }
            })
          })
          .catch(error => {
            dispatch(creators.setLoading(false))
            dispatch(creators.setErrors(error.response.data))
            message.error(Object.values(error.response.data)[0])
          })
      } else {
        message.error('Password validation failed.')
      }
    })
  }
  const handleConfirmBlur = e => {
    const { value } = e.target
    setConfirmDirty(!!value)
  }
  const compareToFirstPassword = (rule, value, callback) => {
    const { form } = props
    if (value && value !== form.getFieldValue('password')) {
      callback('The two passwords that you entered do not match!')
    } else {
      callback()
    }
  }
  const validateToNextPassword = (rule, value, callback) => {
    const { form } = props
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true })
    }
    callback()
  }

  const { getFieldDecorator } = props.form

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 }
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 }
    }
  }
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0
      },
      sm: {
        span: 16,
        offset: 8
      }
    }
  }

  const setNewPasswordForm = (
    <Spin spinning={isLoading}>
      <div className='cover'>
        <div className='desktop-logo'>
          <h2 className='register-text'>Set new password</h2>
          <div className='desktop-logo-large'>
            <img src={image} alt='PureRetail Logo' width='300' height='300' />
          </div>
        </div>
        <Logo />
        <div className='desktop-form'>
          <Form {...formItemLayout} onSubmit={handleSubmit}>
            <div id='header'>
              <h2>Set new password</h2>
            </div>
            <Form.Item hasFeedback>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: 'Please input your new password!'
                  },
                  {
                    validator: validateToNextPassword
                  }
                ]
              })(
                <Input.Password
                  placeholder='New Password'
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item hasFeedback>
              {getFieldDecorator('confirm', {
                rules: [
                  {
                    required: true,
                    message: 'Please confirm your new password!'
                  },
                  {
                    validator: compareToFirstPassword
                  }
                ]
              })(
                <Input.Password
                  onBlur={handleConfirmBlur}
                  placeholder='Confirm New Password'
                  prefix={
                    <Icon type='lock' style={{ color: 'rgba(0,0,0,.70)' }} />
                  }
                />
              )}
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type='primary' htmlType='submit'>
                Reset
              </Button>
            </Form.Item>
          </Form>
          <div id='or_login'>
            <p>
              or <Link to='/'>login</Link> instead
            </p>
          </div>
        </div>
      </div>
    </Spin>
  )

  return setNewPasswordForm
}

const SetNewPasswordForm = Form.create({ name: 'setNewPassword' })(
  SetNewPassword
)

export default SetNewPasswordForm
