import React from "react";
import { Modal, Input, Form } from "antd";
import { useTranslation } from "react-i18next";


function KeywordEditForm(props) {

  const { t } = useTranslation();


  return (
    <Modal
      open={props.visible}
      title={t("editFormTitle")}
      okText={t("modifyEditForm")}
      cancelText={t("cancelEditForm")}
      onCancel={props.onCancel}
      onOk={() => {
        props.form
          .validateFields()
          .then(values => {
            props.onModify(values)
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form fields={props.fields} layout="vertical" form={props.form}>
      <Form.Item
        name="keyword"
        rules={[
          {
            required: true,
            message: t("noEmptyEditForm"),
          },
        ]}
      >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default KeywordEditForm;
