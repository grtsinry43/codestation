import UserController from '@/services/user';
import { formatDate } from '@/utils/tool';
import { Access, useAccess } from '@@/exports';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Image, message, Modal, Switch, Tag } from 'antd';
import React, { useRef, useState } from 'react';

const User: React.FC = () => {
  const access = useAccess();
  const tableRef = useRef<any>();
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [switchLoading, setSwitchLoading] = useState<{
    [key: string]: boolean;
  }>({});

  const [pageInfo, setPageInfo] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const [detailVisible, setDetailVisible] = useState(false);

  const [detailInfo, setDetailInfo] = useState<any>({});

  const showModal = (record: any) => {
    setDetailVisible(true);
    setDetailInfo(record);
  };

  const handleCancel = () => {
    setDetailVisible(false);
  };

  const deleteHandle = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确认要删除这个用户吗？删除后将无法恢复',
      okButtonProps: {
        color: 'danger',
      },
      onOk: async () => {
        const { data } = await UserController.deleteUser(id);
        if (data.deletedCount === 1) {
          message.success('删除成功');
          tableRef.current.reload();
        }
      },
    });
  };

  const columns: any = [
    {
      title: '序号',
      align: 'center',
      width: 50,
      search: false,
      render: (text: string, record: any, index: number) => {
        return (pageInfo.current - 1) * pageInfo.pageSize + index + 1;
      },
    },
    {
      title: '登录帐号',
      dataIndex: 'loginId',
      key: 'loginId',
      align: 'center',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      align: 'center',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      search: false,
      key: 'avatar',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Image
            src={record.avatar}
            key={record.avatar}
            width={30}
            height={30}
            style={{
              borderRadius: '20%',
            }}
          />
        );
      },
    },
    {
      title: '帐号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      search: false,
      align: 'center',
      render: (value: boolean, record: any) => (
        <Switch
          size={'small'}
          loading={switchLoading[record._id] ?? false}
          onClick={async (value) => {
            setSwitchLoading((prev) => ({
              ...prev,
              [record._id]: true,
            }));
            try {
              const { data } = await UserController.updateUser(record._id, {
                enabled: value,
              });
              if (data.modifiedCount === 1) {
                message.success(value ? '用户已启用' : '用户已禁用');
                // 重新请求用户列表数据
                tableRef.current.reload();
              }
            } finally {
              setSwitchLoading((prev) => ({
                ...prev,
                [record._id]: false,
              }));
            }
          }}
          checked={value}
        />
      ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      key: 'option',
      align: 'center',
      render: (_: any, record: any) => (
        <div className="action-container">
          <Button
            type="link"
            onClick={() => showModal(record)}
            key={`detail-${record._id}`}
          >
            详情
          </Button>
          <Button
            type="link"
            onClick={() => navigate(`/user/edit/${record._id}`)}
            key={`edit-${record._id}`}
          >
            编辑
          </Button>
          <Access accessible={access.SuperAdmin}>
            <Button
              type="link"
              onClick={() => deleteHandle(record._id)}
              key={`delete-${record._id}`}
            >
              删除
            </Button>
          </Access>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageContainer title={'用户列表'}>
        <ProTable
          headerTitle={'用户列表'}
          dataSource={userList}
          rowKey={'_id'}
          actionRef={tableRef}
          columns={columns}
          pagination={{
            ...pageInfo,
            onChange: (current, pageSize) => {
              setPageInfo({
                current,
                pageSize,
                total: pageInfo.total,
              });
            },
          }}
          request={async (params: any) => {
            const { data } = await UserController.getUserList({
              ...params,
            });
            setUserList(data.data);
            return {
              data: data.data,
              success: true,
              total: data.count,
            };
          }}
        ></ProTable>
      </PageContainer>
      {/* 用户详情信息 */}
      <Modal
        title={detailInfo?.nickname}
        open={detailVisible}
        onCancel={handleCancel}
        style={{ top: 60 }}
        footer={false}
      >
        <h3> 登录账号 </h3>
        <p>
          <Tag color="red">{detailInfo?.loginId}</Tag>
        </p>
        <h3> 登录密码 </h3>
        <p>
          <Tag color="magenta">{detailInfo?.loginPwd}</Tag>
        </p>
        <h3> 当前头像 </h3>
        <Image src={detailInfo?.avatar} width={60} />

        <h3> 联系方式 </h3>
        <div
          style={{
            display: 'flex',
            width: '350px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4>QQ</h4>
            <p>{detailInfo?.qq ? detailInfo.qq : '未填写'}</p>
          </div>
          <div>
            <h4> 微信 </h4>
            <p>{detailInfo?.wechat ? detailInfo.weichat : '未填写'}</p>
          </div>
          <div>
            <h4> 邮箱 </h4>
            <p>{detailInfo?.mail ? detailInfo.mail : '未填写'}</p>
          </div>
        </div>
        <h3> 个人简介 </h3>
        <p>{detailInfo?.intro ? detailInfo.intro : '未填写'}</p>
        <h3> 时间信息 </h3>
        <div
          style={{
            display: 'flex',
            width: '450px',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h4> 注册时间 </h4>
            <p>{formatDate(detailInfo?.registerDate)}</p>
          </div>
          <div>
            <h4> 上次登录 </h4>
            <p>{formatDate(detailInfo?.lastLoginDate)}</p>
          </div>
        </div>
        <h3> 当前积分 </h3>
        <p>{detailInfo?.points} 分 </p>
      </Modal>
    </>
  );
};

export default User;
