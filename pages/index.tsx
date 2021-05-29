import Head from 'next/head'
import React, { useState } from "react";
import { values } from 'sequelize/types/lib/operators';
import { Button, Card, Container, FormControl, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = (props: any) => {
  const [post, setPost] = React.useState("");
  const [prefectures, setPrefectures] = React.useState("");
  const [municipalities, setMunicipalities] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [count, setCount] = useState(0);
  const blue = '#0000FF'

  React.useEffect(() => {
    fetch('/api/prefec?prefectures=' + prefectures + '&municipalities=' + municipalities + '&address=' + address)
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          setPost(data.post)
        } else {
          setPost(null)
        }
      });
    // 一文字が変わったらifが実行される
  }, [prefectures, municipalities, address])

  return (
    <Container>
      <Row>
        <Col md={6} lg={6} className="mt-3">
          <Card>
            {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
            <Card.Header>都道府県から住所を入力して下さい</Card.Header>
            <Card.Body>


              <FormControl
                placeholder="都道府県"
                value={prefectures}
                onChange={event => setPrefectures(event.target.value)}
              />
              {/* 見つかったら表示に変える */}
              {prefectures != "" &&
                <FormControl
                  className="mt-3"
                  placeholder="市区郡"
                  value={municipalities}
                  onChange={event => setMunicipalities(event.target.value)}
                />}
              {municipalities != "" &&
                <FormControl
                  className="mt-3"
                  placeholder="市区町村"
                  value={address}
                  onChange={event => setAddress(event.target.value)}
                />}

            </Card.Body>
          </Card>
        </Col>
        {post &&
          <Col md={6} lg={6} className="mt-3" >
            <Card>
              {/* 入力されたら表示になっている */}
              <Card.Header>あなたの調べた郵便番号はこちらです</Card.Header>
              <Card.Body>
                <FormControl
                  value={post}
                  onChange={event => setPost(event.target.value.replace("-", ""))
                  } />
              </Card.Body>
            </Card>
          </Col>}
      </Row>
    </Container>
  )
}
// データがマッチされたときだけラストの項目を表示
export default Home;
