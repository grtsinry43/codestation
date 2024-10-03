import AdminForm from '@/pages/Admin/AdminForm';
import { PageContainer } from '@ant-design/pro-components';
import { useDispatch, useNavigate, useSelector } from '@umijs/max';
import { message } from 'antd';
import React, { useEffect, useState } from 'react';

const AddAdmin: React.FC = () => {
  const [newAdminInfo, setNewAdminInfo] = useState({
    loginId: '',
    loginPwd: '',
    nickname: '',
    avatar: '',
    permission: 2, // 默认是普通管理员
  });

  const { adminList } = useSelector((state: any) => state.admin);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!adminList.length) {
      dispatch({
        type: 'admin/_initAdminList',
      });
    }
  }, [adminList]);

  function submitHandle() {
    console.log('newAdminInfo:', newAdminInfo);
    // 用户点击表单的确认时，要做的事儿
    // 接下来我们就需要进行新增操作
    dispatch({
      type: 'admin/_addAdmin',
      payload: newAdminInfo,
      callback: () => {
        message.success('添加管理员成功');
        navigate('/admin/list');
      },
    });
  }

  return (
    <PageContainer>
      <div className="container" style={{ width: '500px' }}>
        <AdminForm
          type="add"
          adminInfo={newAdminInfo}
          setAdminInfo={setNewAdminInfo}
          submitHandle={submitHandle}
        />
      </div>
    </PageContainer>
  );
};

export default AddAdmin;
