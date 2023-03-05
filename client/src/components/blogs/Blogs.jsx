import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { API } from '../../service/api';
import './blogs.css';
import { elipse } from '../../utils/common';


function Blogs() {

  // other imports
  const [searchParams] = useSearchParams();
  const Category = searchParams.get('category');

  // useState hooks

    const [fetchedPost, setFetchedPost] = useState([])

  // useEffect hooks

  useEffect(()=> {
    console.log("INSIDE USEEFFECT")
    async function fetechingPost() {
      let response = await API.getAllPost({category: Category || ''});

      if(response.isSuccess) {
        console.log(response)
        setFetchedPost(response.data);
      }
    }

    fetechingPost()
  },[Category])


  // for debugging





  return (
    <div className='post-container'>
      {
        fetchedPost ?
        fetchedPost.map((ele)=> {
          return(
            <Link to={`/blog-description/${ele._id}`} key={ele._id}>
                <img className='post-img' src={ele.picture} alt='...' />
              <div className='post'>
                <h1 className='post-title'>{elipse(ele.title, 26)}</h1>
                <p className='post-description'>{elipse(ele.description, 110)}</p>
              </div>
            </Link>
          )
        })

        :
        <h1>No posts to show</h1>
      }
    </div>
  )
}

export default Blogs