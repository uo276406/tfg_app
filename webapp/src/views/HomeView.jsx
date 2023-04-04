import { Row, Col, Carousel } from "antd";

const contentStyle = {
    color: '#fff',
    lineHeight: '30em',
    textAlign: 'center',
    background: '#001529',
  };

function HomeView() {
  return (
    <Row gutter={[32,32]}>
      <Col span={16} xs={24} sm={24} md={24} lg={16} xl={16} xxl={16}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>1</h3>
          </div>
          <div>
            <h3 style={contentStyle}>2</h3>
          </div>
          <div>
            <h3 style={contentStyle}>3</h3>
          </div>
        </Carousel>
      </Col >

      <Col span={8} xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>
      </Col>
    </Row>
  );
}

export default HomeView;
