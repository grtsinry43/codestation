import AdminForm from '@/pages/Admin/AdminForm';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { useDispatch, useModel, useSelector } from '@umijs/max';
import { Button, Image, message, Modal, Switch, Tag } from 'antd';
import React, { useEffect, useState } from 'react';

const Admin: React.FC = () => {
  const dispatch = useDispatch();
  const { adminList } = useSelector((state: any) => state.admin);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [tableLoading, setTableLoading] = useState<boolean>(true);
  const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
  const [currentAdmin, setCurrentAdmin] = useState<any>({});

  const { initialState } = useModel('@@initialState');

  const openEditModal = (record: any) => {
    // 信息清空并回填
    setCurrentAdmin(record);
    setEditModalVisible(true);
  };

  const fetchAdminList = () => {
    setTableLoading(true);
    dispatch({
      type: 'admin/_initAdminList',
      callback: () => {
        setTableLoading(false);
      },
    });
  };

  useEffect(() => {
    if (!Object.values(loading).some((v) => v)) {
      fetchAdminList();
    }
  }, [loading]);

  const handleBatchAction = () => {
    console.log('Selected Row Keys:', selectedRowKeys);
  };

  const handleStatusChange = async (record: any, checked: boolean) => {
    console.log('Status Change:', record, checked);
    setLoading((prev) => ({ ...prev, [record._id]: true }));
    dispatch({
      type: 'admin/_updateAdmin',
      payload: {
        adminInfo: record,
        newAdminInfo: { enabled: checked },
      },
      callback: () => {
        if (checked) {
          message.success('帐号已启用');
        } else {
          message.success('帐号已禁用');
        }
        setLoading((prev) => ({ ...prev, [record._id]: false }));
      },
    });
  };

  const handleDelete = async (_id: string) => {
    setLoading((prev) => ({ ...prev, [_id]: true }));
    dispatch({
      type: 'admin/_deleteAdmin',
      payload: {
        _id,
      },
      callback: () => {
        message.success('管理员已删除');
        setLoading((prev) => ({ ...prev, [_id]: false }));
      },
    });
  };

  const confirmDelete = (_id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个管理员吗？删除后将无法恢复',
      onOk: () => handleDelete(_id),
      okButtonProps: { danger: true },
    });
  };

  const columns: any = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      render: (_: any, __: any, index: number) => index + 1,
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
      render: (text: string) => (
        <Image
          src={text}
          key={text}
          width={40}
          height={40}
          style={{
            borderRadius: '20%',
          }}
        />
      ),
    },
    {
      title: '角色',
      dataIndex: 'permission',
      key: 'permission',
      align: 'center',
      render: (value: number) =>
        value === 1 ? (
          <Tag color="red"> 超级管理员 </Tag>
        ) : (
          <Tag color="blue"> 普通管理员 </Tag>
        ),
    },
    {
      title: '帐号状态',
      dataIndex: 'enabled',
      key: 'enabled',
      align: 'center',
      render: (value: boolean, record: any) => {
        if (record._id === initialState?.adminInfo._id) {
          return <Tag color="blue"> 当前用户 </Tag>;
        } else {
          return (
            <Switch
              size={'small'}
              checked={value}
              onChange={(checked) => handleStatusChange(record, checked)}
              loading={loading[record._id]}
            />
          );
        }
      },
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
            onClick={() => openEditModal(record)}
            key={`edit-${record._id}`}
          >
            编辑
          </Button>
          <Button
            type="link"
            key={`delete-${record._id}`}
            onClick={() => confirmDelete(record._id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys: React.Key[]) => {
      setSelectedRowKeys(keys);
    },
  };

  return (
    <PageContainer>
      <ProTable
        loading={tableLoading}
        search={false}
        pagination={{
          pageSize: 5,
        }}
        headerTitle={'管理员列表'}
        rowKey={'_id'}
        dataSource={adminList}
        columns={columns}
        rowSelection={rowSelection}
        toolbar={{
          title: '管理员列表',
          actions: [
            <Button
              key="batchAction"
              type="primary"
              onClick={handleBatchAction}
              disabled={selectedRowKeys.length === 0}
              style={{ marginRight: 16 }}
            >
              批量操作
            </Button>,
          ],
        }}
        options={{
          reload: fetchAdminList,
        }}
      ></ProTable>
      <Modal
        title={'编辑管理员'}
        open={editModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <AdminForm
          type={'edit'}
          adminInfo={currentAdmin}
          setAdminInfo={setCurrentAdmin}
          submitHandle={() => {
            dispatch({
              type: 'admin/_updateAdmin',
              payload: {
                adminInfo: currentAdmin,
                newAdminInfo: currentAdmin,
              },
              callback: () => {
                message.success('管理员信息已更新');
                setEditModalVisible(false);
                fetchAdminList();
              },
            });
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default Admin;
