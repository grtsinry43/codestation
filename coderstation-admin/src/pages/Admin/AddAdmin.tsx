import {
  PageContainer,
  ProForm,
  ProFormRadio,
  ProFormText,
} from '@ant-design/pro-components';
import { useDispatch, useNavigate } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

const AdminAdd: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addClickHandle = async (values: any) => {
    dispatch({
      type: 'user/_addAdmin',
      payload: values,
      callback: () => {
        message.success('添加成功');
        navigate('/admin/list');
        setLoading(false);
      },
    });
  };
  return (
    <PageContainer title={'添加管理员'}>
      <ProForm
        loading={loading}
        onFinish={async (values) => addClickHandle(values)}
      >
        <ProForm.Group direction={'vertical'}>
          <ProFormText
            width={'md'}
            placeholder={'请输入登录帐号'}
            name="loginId"
            label="登录帐号"
            rules={[
              {
                required: true,
                message: '请输入登录帐号',
              },
            ]}
          />
          <ProFormText
            placeholder={'请输入昵称（可选）'}
            width={'md'}
            name="nickname"
            label="昵称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText.Password
            width={'md'}
            name="loginPwd"
            label="密码"
            placeholder={'请输入密码，留空默认为 123456'}
            rules={[
              {
                message: '请输入密码',
              },
              () => ({
                validator(_, value) {
                  if (!value || value.length >= 6) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('密码长度至少为 6 位'));
                },
              }),
            ]}
          />
          <ProFormText.Password
            width={'md'}
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            placeholder={'请确认密码'}
            rules={[
              {
                message: '请确认密码',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('loginPwd') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormRadio.Group
            name="permission"
            label="角色"
            options={[
              { label: '普通管理员', value: 2 },
              { label: '超级管理员', value: 1 },
            ]}
          />
        </ProForm.Group>
      </ProForm>
    </PageContainer>
  );
};

export default AdminAdd;
