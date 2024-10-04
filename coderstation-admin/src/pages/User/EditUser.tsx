import UserForm from '@/pages/User/UserForm';
import UserController from '@/services/user';
import { useParams } from '@@/exports';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

interface UserInfo {
  loginId: string;
  loginPwd: string;
  avatar: string;
  nickname: string;
  mail: string;
  qq: string;
  wechat: string;
  intro: string;
}

const EditUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const fetchUserInfo = async (userId: string) => {
    try {
      const response = await UserController.getUserById(userId);
      if (response && response.data) {
        setUserInfo(response.data);
      } else {
        throw new Error('未能获取到用户信息');
      }
    } catch (error: any) {
      message.error(` 加载用户信息失败: ${error.message}`);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserInfo(id).then((r) => console.log(r));
    }
  }, [id]);

  const submitHandle = async () => {
    try {
      if (!id || !userInfo) {
        throw new Error('缺少必要参数');
      }
      const response = await UserController.updateUser(id, userInfo);
      if (response && response.data) {
        console.log(response.data);
        message.success('修改信息成功');
        navigate('/user/list');
      } else {
        throw new Error('服务器未返回预期数据');
      }
    } catch (error: any) {
      message.error(` 修改用户信息失败: ${error.message}`);
    }
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <PageContainer>
      <UserForm
        type="edit"
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        submitHandle={submitHandle}
      />
    </PageContainer>
  );
};

export default EditUser;
