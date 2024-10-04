import UserForm from '@/pages/User/UserForm';
import UserController from '@/services/user';
import { PageContainer } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { message } from 'antd';
import React, { useState } from 'react';

const AddUser: React.FC = () => {
  const navigate = useNavigate();

  // 该状态用于存储用户输入的新用户信息
  const [newUserInfo, setNewUserInfo] = useState({
    loginId: '',
    loginPwd: '',
    avatar: '',
    nickname: '',
    mail: '',
    qq: '',
    wechat: '',
    intro: '',
  });

  /**
   * 提交新增用户
   */
  function submitHandle() {
    UserController.addUser(newUserInfo);
    // 跳转回首页
    navigate('/user/list');
    message.success('添加用户成功');
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: '800px' }}>
        <UserForm
          type="add"
          userInfo={newUserInfo}
          setUserInfo={setNewUserInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
};

export default AddUser;
