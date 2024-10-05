import { PlusOutlined } from '@ant-design/icons';
import { Editor } from '@toast-ui/react-editor';
import { useDispatch, useSelector } from '@umijs/max';
import { Button, Form, Image, Input, Select, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useRef, useState } from 'react';

// toastui-editor 的样式
import '@toast-ui/editor/dist/i18n/zh-cn';
import '@toast-ui/editor/dist/toastui-editor.css';

// 定义 props 的类型
interface BookFormProps {
  type: string;
  bookInfo: any;
  setBookInfo: (info: any) => void;
  submitHandle: (content: string) => void;
}

// 定义 typeList 的类型
interface TypeState {
  typeList: Array<{ _id: number; typeName: string }>;
}

const BookForm: React.FC<BookFormProps> = ({
  type,
  bookInfo,
  setBookInfo,
  submitHandle,
}) => {
  const formRef = useRef<any>(null); // 使用 any 或者 antd 提供的 FormInstance 类型
  const editorRef = useRef<any>(null); // 使用 any 或者 toast-ui 提供的类型

  const [firstIn, setFirstIn] = useState(true); // 用于标记是否为第一次渲染

  const dispatch = useDispatch();
  const { typeList } = useSelector((state: { type: TypeState }) => state.type);
  console.log(typeList);

  useEffect(() => {
    if (formRef.current && firstIn && bookInfo) {
      formRef.current.setFieldsValue(bookInfo);
      // 回填 markdown 编辑器内容
      editorRef.current.getInstance().setHTML(bookInfo?.bookIntro);
      setFirstIn(false);
    }
  }, [bookInfo, firstIn]);

  let bookPicPreview = null;
  if (type === 'edit') {
    bookPicPreview = (
      <Form.Item label="当前封面" name="bookPicPreview">
        <Image src={bookInfo?.bookPic} width={100} />
      </Form.Item>
    );
  }

  useEffect(() => {
    if (!typeList.length) {
      dispatch({
        type: 'type/_initTypeList',
      });
    }
  }, [dispatch, typeList.length]);

  function addHandle() {
    const content = editorRef.current.getInstance().getHTML();
    submitHandle(content);
  }

  function updateInfo(newContent: any, key: string) {
    const newBookInfo = { ...bookInfo };
    newBookInfo[key] = newContent;
    setBookInfo(newBookInfo);
  }

  function handlePointChange(value: number) {
    updateInfo(value, 'requirePoints');
  }

  function handleTypeChange(value: number) {
    updateInfo(value, 'typeId');
  }

  return (
    <Form
      name="basic"
      initialValues={bookInfo}
      autoComplete="off"
      ref={formRef}
      onFinish={addHandle}
    >
      <Form.Item
        label="书籍标题"
        name="bookTitle"
        rules={[{ required: true, message: '请输入书名' }]}
      >
        <Input
          value={bookInfo?.bookTitle}
          onChange={(e) => updateInfo(e.target.value, 'bookTitle')}
        />
      </Form.Item>

      <Form.Item
        label="书籍介绍"
        name="bookIntro"
        rules={[{ required: true, message: '请输入书本相关的介绍' }]}
      >
        <Editor
          initialValue=""
          previewStyle="vertical"
          height="600px"
          initialEditType="markdown"
          useCommandShortcut={true}
          language="zh-CN"
          ref={editorRef}
        />
      </Form.Item>

      <Form.Item
        label="下载链接"
        name="downloadLink"
        rules={[{ required: true, message: '请输入书籍链接' }]}
      >
        <Input
          value={bookInfo?.downloadLink}
          onChange={(e) => updateInfo(e.target.value, 'downloadLink')}
        />
      </Form.Item>

      <Form.Item
        label="所需积分"
        name="requirePoints"
        rules={[{ required: true, message: '请选择下载所需积分' }]}
      >
        <Select style={{ width: 200 }} onChange={handlePointChange}>
          <Select.Option value={20} key={20}>
            20
          </Select.Option>
          <Select.Option value={30} key={30}>
            30
          </Select.Option>
          <Select.Option value={40} key={40}>
            40
          </Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="书籍分类"
        name="typeId"
        rules={[{ required: true, message: '请选择书籍分类' }]}
      >
        <Select style={{ width: 200 }} onChange={handleTypeChange}>
          {typeList.map((type) => (
            <Select.Option value={type._id} key={type._id}>
              {type.typeName}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      {bookPicPreview}

      <Form.Item label="书籍封面" valuePropName="fileList">
        <Upload
          action="/api/upload"
          listType="picture-card"
          maxCount={1}
          onChange={(e: UploadChangeParam<UploadFile>) => {
            if (e.file.status === 'done') {
              const url = e.file.response.data;
              updateInfo(url, 'bookPic');
            }
          }}
        >
          <PlusOutlined />
        </Upload>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 3, span: 16 }}>
        <Button type="primary" htmlType="submit">
          {type === 'add' ? '确认新增' : '修改'}
        </Button>

        <Button type="link" htmlType="reset" className="resetBtn">
          重置
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookForm;
