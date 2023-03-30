import React from "react";
import { Card, Checkbox } from "antd";
import { EditOutlined } from "@ant-design/icons";

const { Meta } = Card;


function KeywordCard() {
  return (
    <Card
      style={{margin: "0.5%", textAlign: 'center'}}
      actions={[
        <EditOutlined key="edit" />,
        <Checkbox />,
      ]}
    >
      <Meta title="Keyword1" />
    </Card>
  );
}

export default KeywordCard;
