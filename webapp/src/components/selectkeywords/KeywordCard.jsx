import React, { useState } from "react";
import { Card, Checkbox, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import KeywordEditForm from "./KeywordEditForm";

const { Meta } = Card;

const cardStyle = { margin: "0.5%", textAlign: "center", height: 'auto' };

function KeywordCard(props) {

  // Chckboxes de selección ------------------------------------------------------
  const handleSelect = () => {
    const keywordSelected = {
      key: props.index,
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

  const showModal = () => {
    setVisible(true);
  }
  const handleCancel = () => {
    setVisible(false);
  }
  const handleModify = (values) => {
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
      style={cardStyle}
      actions={[
        <EditOutlined
          key="editKeyword"
          onClick={() => {
            showModal();
          }}
        />,
        <Checkbox
          onChange={handleSelect}
          key={props.index}
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
