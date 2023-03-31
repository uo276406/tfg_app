import React from "react";
import { Modal, Input, Form } from "antd";

function KeywordEditForm(props) {

  return (
    <Modal
      open={props.visible}
      title="Edite la palabra clave"
      okText="Modificar"
      cancelText="Cancelar"
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
        label="Nueva palabra:"
        rules={[
          {
            required: true,
            message: 'No puede ser vacío',
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
