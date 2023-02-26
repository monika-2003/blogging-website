import React, { useState } from 'react';
import Blogs from '../../components/blogs/Blogs';
import './home.css';
import {data} from '../../constants/categoryData';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';



function Home() {

  const navigate = useNavigate();

  const[choose, setChoose] = useState(false);

  const handleCategory = () => {
    setChoose(true)
  }

  const handleCreateBlog = () => {
    navigate('/create-blog')
  }

  const [searchParams] = useSearchParams();
  const Category = searchParams.get('category');

  return (
    <div>
      <div className='home-header'>
        <h1 className='heading'>Publish your passions, your way</h1>
        <h2 className='subheading'>Create a unique and beautiful blog easily.</h2>

        {
          choose ? 
          <div className='categories'>
            <div>
          {
            data.map((ele)=> {
              return(
              <Link to={`/?category=${ele.type}`} className='category-type' key = {ele.id}>{ele.type}</Link>
              )
            })
          }
          </div>

          <Link to={`/create-blog/?category=${Category}`} style={{border:'none'}}><button className='blog-btn' style={{marginTop: '30px'}} onClick={handleCreateBlog}>Create your Blog</button></Link>
            
          </div> 
          
          : 
          <button className='blog-btn' onClick={handleCategory}>Choose Category</button>
        }

      </div>

      <div>
        <Blogs />
      </div>
    </div>
  )
}

export default Home