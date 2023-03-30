import { Row } from "antd";
import KeywordCard from "./KeywordCard"

function KeywordCardList() {
  return (
    <Row justify={"center"} style={{padding: "2%", borderRadius: "50px", backgroundColor: "white" }}>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
      <KeywordCard/>
    </Row>
  );
}
export default KeywordCardList;
