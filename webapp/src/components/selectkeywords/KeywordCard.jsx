import React, { useState } from "react";
import { Card, Checkbox, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import KeywordEditForm from "./KeywordEditForm";


const { Meta } = Card;

function KeywordCard(props) {

  // Chckboxes de selección ------------------------------------------------------
  function handleSelect() {
    const keywordSelected = {
      key: props.key,
      value: props.value,
      selected: !props.selected,
    };
    props.updateSelectedKeywords(keywordSelected);
  }

  // Formulario de editar ---------------------------------------------------------
  const [keyword, setKeyword] = useState([
    {
      name: "keyword",
      value: props.value,
    },
  ]);
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);

  function showModal() {
    setVisible(true);
  }
  function handleCancel() {
    setVisible(false);
  }
  function handleModify(values) {
    setKeyword([
      {
        name: "keyword",
        value: values.keyword,
      },
    ]);
    setVisible(false);
  }

  return (
    <Card
      style={{ margin: "0.5%", textAlign: "center" }}
      actions={[
        <EditOutlined
          key="editKeyword"
          onClick={() => {
            showModal();
          }}
        />,
        <Checkbox
          onChange={handleSelect}
          key={props.key}
          checked={props.selected}
        />,
      ]}
    >
      <Meta title={keyword[0]["value"]} />

      <KeywordEditForm
        form={form}
        visible={visible}
        onCancel={handleCancel}
        onModify={handleModify}
        fields={keyword}
      />
    </Card>
  );
}

export default KeywordCard;
