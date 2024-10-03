import AdminController from '@/services/admin';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Form, Image, Input, Radio, Upload } from 'antd';
import { useEffect } from 'react';

interface AdminFormProps {
  type: 'add' | 'edit';
  adminInfo: {
    loginId?: string;
    loginPwd?: string;
    nickname?: string;
    permission?: number;
    avatar?: string;
  };
  setAdminInfo: (info: any) => void;
  submitHandle: () => void;
}

function AdminForm({
  type,
  adminInfo,
  setAdminInfo,
  submitHandle,
}: AdminFormProps) {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(adminInfo);
  }, [adminInfo, form]);

  // 头像的容器
  let avatarPreview = null;
  if (type === 'edit') {
    avatarPreview = (
      <Form.Item label="当前头像" name="avatarPreview">
        <Image src={adminInfo?.avatar} width={100} />
      </Form.Item>
    );
  }

  function updateInfo(newContent: string, key: string) {
    const newAdminInfo: any = { ...adminInfo };
    newAdminInfo[key] = newContent;
    setAdminInfo(newAdminInfo);
  }

  async function checkLoginId() {
    if (adminInfo.loginId && type === 'add') {
      const { data } = await AdminController.adminIsExist(adminInfo.loginId);
      if (data) {
        return Promise.reject('该管理员已经注册过了');
      }
    }
  }

  return (
    <Form
      form={form}
      name="basic"
      initialValues={adminInfo}
      autoComplete="off"
      onFinish={submitHandle}
    >
      <Form.Item
        label="管理员账号"
        name="loginId"
        rules={[
          { required: true, message: '请输入管理员账号' },
          { validateTrigger: 'onBlur', validator: checkLoginId },
        ]}
      >
        <Input
          value={adminInfo?.loginId}
          onChange={(e) => updateInfo(e.target.value, 'loginId')}
          disabled={type === 'edit'}
        />
      </Form.Item>

      <Form.Item
        label="管理员密码"
        name="loginPwd"
        rules={
          type === 'edit' ? [{ required: true, message: '密码不能为空' }] : []
        }
      >
        <Input.Password
          placeholder={type === 'add' ? '密码可选，默认是123123' : ''}
          value={adminInfo?.loginPwd}
          onChange={(e) => updateInfo(e.target.value, 'loginPwd')}
        />
      </Form.Item>

      <Form.Item
        label="管理员昵称"
        name="nickname"
        rules={
          type === 'edit' ? [{ required: true, message: '昵称不能为空' }] : []
        }
      >
        <Input
          placeholder={type === 'add' ? '昵称可选，默认是新增管理员' : ''}
          value={adminInfo?.nickname}
          onChange={(e) => updateInfo(e.target.value, 'nickname')}
        />
      </Form.Item>

      <Form.Item
        label="权限选择"
        name="permission"
        rules={[{ required: true, message: '请选择管理员权限' }]}
      >
        <Radio.Group
          onChange={(e) => updateInfo(e.target.value, 'permission')}
          value={adminInfo?.permission}
        >
          <Radio value={2}> 普通管理员 </Radio>
          <Radio value={1}> 超级管理员 </Radio>
        </Radio.Group>
      </Form.Item>

      {/* 当前头像 */}
      {/* 新增管理员的时候不显示，修改的时候才显示 */}
      {avatarPreview}

      <Form.Item label="上传头像">
        <Upload
          listType="picture-card"
          maxCount={1}
          action="/api/upload"
          onChange={(e) => {
            if (e.file.status === 'done') {
              const url = e.file.response.data;
              updateInfo(url, 'avatar');
            }
          }}
        >
          <div>
            <PlusOutlined />
            <div style={{ marginTop: '8px' }}> 头像可选</div>
          </div>
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 5, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button
          type="link"
          onClick={() => form.resetFields()}
          className="resetBtn"
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AdminForm;
