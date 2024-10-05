import Guide from '@/components/Guide';
import { getAdminList } from '@/services/admin';
import { getTypeListApi } from '@/services/type';
import { getUserList } from '@/services/user';
import { trim } from '@/utils/format';
import { Bar, Line, Pie } from '@ant-design/charts';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import React, { useEffect, useState } from 'react';
import styles from './index.less';

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [userData, setUserData] = useState([]);
  const [adminData, setAdminData] = useState([]);
  const [typeData, setTypeData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await getUserList({});
      const { data: adminData } = await getAdminList();
      const { data: typeData } = await getTypeListApi();

      setUserData(userData.data);
      setAdminData(adminData);
      setTypeData(typeData);
    }

    fetchData();
  }, []);

  const dataForLineChart = userData.map((user: any, index: number) => ({
    date: `2023-0${index + 1}-01`,
    users: user.points,
    questions: user.enabled ? 1 : 0,
  }));

  const dataForPieChart = adminData.map((admin: any) => ({
    type: admin.nickname,
    value: admin.permission,
  }));

  const dataForBarChart = typeData.map((type: any) => ({
    category: type.name,
    count: type.count,
  }));

  const lineConfig = {
    data: dataForLineChart,
    xField: 'date',
    yField: 'users',
    seriesField: 'questions',
    yAxis: {
      label: {
        formatter: (v: any) => `${v}`,
      },
    },
    legend: { position: 'top' },
    smooth: true,
  };

  const pieConfig = {
    appendPadding: 10,
    data: dataForPieChart,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
  };

  const barConfig = {
    data: dataForBarChart,
    xField: 'count',
    yField: 'category',
    seriesField: 'category',
    legend: { position: 'top-left' },
  };

  return (
    <PageContainer ghost>
      <div className={styles.container}>
        <Guide name={trim(name)} />
        <h2>User and Question Count Line Chart</h2>
        <Line {...lineConfig} />
        <h2>Question Tag Distribution Pie Chart</h2>
        <Pie {...pieConfig} />
        <h2>Interview Question Category Bar Chart</h2>
        <Bar {...barConfig} />
      </div>
    </PageContainer>
  );
};

export default HomePage;
