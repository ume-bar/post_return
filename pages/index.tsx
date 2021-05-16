import Head from 'next/head'
import React, { Props } from "react";
import { values } from 'sequelize/types/lib/operators';

const Home = (props: Props) => {
  const [post, setPost] = React.useState("");
  const [prefectures, setPrefectures] = React.useState("");
  const [municipalities, setMunicipalities] = React.useState("");
  const [address, setAddress] = React.useState("");
  
  React.useEffect(()=>{
    console.log(post)
  fetch('/api/prefec?prefectures='+ prefectures+ '&municipalities=' + municipalities+'&address=' + address)
    .then(response => response.json())
    
    .then(data => {
      if(data !== null){ 
        setPrefectures(data.prefectures)
        setMunicipalities(data.municipalities)
        setAddress(data.address)
        setPost(data.post)
      }
    });
  },[prefectures, municipalities, address])

  return (
    <div>
      <h3>都道府県から住所を入力して下さい</h3>
        <div>
          <label style={{ display: "block" }}> 
          <input type='text'
          value={prefectures}
          onChange={event => setPrefectures(event.target.value)} /><br/>
          </label>
          <label style={{ display: "block" }}> 
          <input type='text'
          value={municipalities}
          onChange={event => setMunicipalities(event.target.value)} /><br/>
          </label>
          <label style={{ display: "block" }}> 
          <input type='text'
          value={address}
          onChange={event => setAddress(event.target.value)} /><br/>
          </label>
        </div>
      {prefectures!=""&&<h3>あなたの調べた郵便番号はこちらです</h3>}
      {prefectures!=""&&<div><label style={{ display: "block" }}>  
          <input type='text'
          value={post}
          onChange={event => setPost(event.target.value.replace("-",""))} />
          </label></div>}   
    </div>
  )
}

export default Home;