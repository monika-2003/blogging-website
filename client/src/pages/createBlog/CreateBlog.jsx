import React, { useContext, useEffect, useState } from 'react';
import {IoMdAddCircle} from 'react-icons/io';
import './createblog.css';
import { API } from '../../service/api';
import { LoginContext } from '../../context/LoginData';
import { useLocation, useNavigate } from 'react-router-dom';


function CreateBlog() {

  // additional imports

  const {account} = useContext(LoginContext)
  const location = useLocation();
  const navigate = useNavigate();

  // useState hooks

  const [post, setPost] = useState({
    title: '',
    description: '',
    picture: '',
    name: '',
    createdDate: new Date(),
    category: location.search.split('=')[1],
  })

  const [file, setFile] = useState('');

  const [url, setUrl] = useState('https://media.istockphoto.com/id/1198931639/photo/writing-a-blog-blogger-influencer-reading-text-on-screen.jpg?s=612x612&w=0&k=20&c=4FJ_fzzZYqBoGG-RY8fcohpaOKKwnnI-ik58cPy6t-g=');



  // useEffect hooks

  useEffect(()=> {
    const getImage = async() => {
      if(file) {
        const data = new FormData();
        data.append("name", file.name)
        data.append("file", file)

        let response = await API.uploadImage(data);

        if(response.isSuccess) {
          post.picture = response.data.imageUrl;
          setUrl(response.data.imageUrl)
        }
      }
    }

    post.name = account.name;
    post.category = location.search.split('=')[1];

    getImage()
  },[file, post])



  // Functions defined

  const handlePostValue = (e) => {
    setPost({...post, [e.target.name]: e.target.value})
  }

  const handlePublish = async() => {
    let response = await API.uploadPost(post);

    if(response.isSuccess) {
      navigate('/')
    }
  }



  return (
    <div className='create-blog-page'>
        <img className='blog-image' src = {url} alt = 'blog'/>
        <div className='blog-title'>
          <label htmlFor='fileInput'>
              <IoMdAddCircle style={{height: '45px', width: '45px', color: 'grey', cursor: 'pointer'}} />
          </label>
          <input id='fileInput' type='file' style = {{display: 'none'}} onChange={(e)=> {setFile(e.target.files[0])}} />
          <input className='title' type='text' name='title' placeholder='Title of your blog' onChange={handlePostValue} />
          <button className='publish-btn' onClick={handlePublish}>Publish</button>
        </div>
        <textarea className='blog-content' rows={7} placeholder='Write your views' name='description' onChange={handlePostValue}></textarea>
    </div>
  )
}

export default CreateBlog