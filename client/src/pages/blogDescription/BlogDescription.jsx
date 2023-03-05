import React, { useEffect, useState, useContext } from 'react';
import { API } from '../../service/api';
import { useNavigate, useParams } from 'react-router-dom';
import './description.css';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { MdModeEditOutline } from 'react-icons/md';
import { LoginContext } from '../../context/LoginData';



function BlogDescription() {

  // variables declarations

  const { id } = useParams();
  const {account} = useContext(LoginContext);
  const navigate = useNavigate();



  // useState hooks

  const [post, setPost] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  


  // useEffect hooks

  useEffect(()=> {
    async function fetchBlog() {
      let response = await API.getSelectedBlog(id);

      if(response.isSuccess) {
        setPost(response.data)
      }
    }

    fetchBlog()
  },[])


  // function declarations

  const handleDelete = async() => {
    const response = await API.deletePost(post._id)

    if(response.isSuccess) {
      console.log("DELETED")
      navigate('/')
    }
  }

  const handleModify = () => {
    navigate(`/update-blog/${post._id}`)
  }


  return (
    <div className='blog-page'>
      <img className='description-img' src={post.picture} />
      {
        post.name === account.name ?
      <div className='icons'>
        <button className='icon-btn' onClick={()=>setShowPopup(true)}><RiDeleteBin6Fill className='icon' /></button>
        <button className='icon-btn' onClick={handleModify}><MdModeEditOutline className='icon' /></button>
      </div>
      : 
      null
      }

      <div className='information'>
        <span>{new Date(post.createdDate).toDateString()}</span>
        <span>{post.name}</span>
      </div>
      <h1 className='description-title'>{post.title}</h1>
      <p className='description'>{post.description}</p>

      {
          showPopup ?
          <div className='popup'>
            <h3>Are you sure you want to delete ?</h3>
            <div className='popup-btns'>
              <button onClick={handleDelete}>Yes</button>
              <button onClick={()=>setShowPopup(false)}>No</button>
            </div>
          </div>
          : null
        }

    </div>
  )
}

export default BlogDescription