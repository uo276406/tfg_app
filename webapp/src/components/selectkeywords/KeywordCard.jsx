import React, { useState } from "react";
import { Card, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import KeywordEditForm from "./KeywordEditForm";

const { Meta } = Card;

const cardStyleNotSelected = { margin: "0.5%", textAlign: "center", height: 'auto' };
const cardStyleSelected = { margin: "0.5%", textAlign: "center", height: 'auto', backgroundColor: '#e6f7ff' };

/**
 * A component that displays a keyword card with options to edit and select the keyword.
 * @param {{object}} props - The props object containing the keyword information and functions to update the selected keywords.
 * @returns A card component displaying the keyword and options to edit and select it.
 */
function KeywordCard(props) {

  // Selección ------------------------------------------------------
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
      style={props.selected ? cardStyleSelected : cardStyleNotSelected}
      actions={[
        <EditOutlined
          key="editKeyword"
          onClick={() => {
            showModal();
          }}
        />,
      ]}
      onClick={() => {handleSelect()}}
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
