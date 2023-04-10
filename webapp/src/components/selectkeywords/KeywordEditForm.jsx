import React from "react";
import { Modal, Input, Form } from "antd";
import { useTranslation } from "react-i18next";


/**
 * A form component for editing a keyword. Displays a modal with a form that allows the user to modify the keyword.
 * @param {{object}} props - The props object containing the following properties:
 *  - visible: a boolean indicating whether the modal is visible or not
 *  - onCancel: a function to be called when the user cancels the form
 *  - onModify: a function to be called when the user modifies the keyword
 *  - fields: an array of objects representing the fields in the form
 *  - form: the antd form object used to manage the form state
 * @returns A modal containing a form for editing a keyword.
 */
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
