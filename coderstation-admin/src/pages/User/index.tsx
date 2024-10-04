import UserController from '@/services/user';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useNavigate } from '@umijs/max';
import { Button, Image, message, Modal, Switch } from 'antd';
import React, { useRef, useState } from 'react';

const User: React.FC = () => {
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
            onClick={() => navigate(`/user/edit/${record._id}`)}
            key={`edit-${record._id}`}
          >
            编辑
          </Button>
          <Button
            type="link"
            onClick={() => deleteHandle(record._id)}
            key={`delete-${record._id}`}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
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
            current: params.current,
            pageSize: params.pageSize,
            loginId: params.loginId,
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
  );
};

export default User;
