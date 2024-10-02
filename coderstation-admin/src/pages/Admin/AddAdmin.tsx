import UserController from '@/services/admin';
import { ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from '@umijs/max';

const AdminAdd: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const addClickHandle = async (values: any) => {
    console.log('Add Admin:', values);
    setLoading(true);
    const { data } = await UserController.addAdmin(values);
    if (data) {
      message.success('添加成功');
      navigate('/admin/list');
    } else {
      message.error('添加失败');
    }
    setLoading(false);
  };
  return (
    <ProForm
      loading={loading}
      onFinish={async (values) => addClickHandle(values)}
    >
      <ProForm.Group>
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
        {/*<ProFormText*/}
        {/*  placeholder={'请输入昵称'}*/}
        {/*  name="email" label="昵称" />*/}
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
  );
};

export default AdminAdd;
