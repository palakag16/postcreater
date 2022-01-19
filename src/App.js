import React, { useEffect, useState } from 'react';
import img from './user.png';

const App = () => {
  const [imagesrc, setImg] = useState([]);
  const [query, Setquery] = useState('');
  const [searchquery, setSeachquery] = useState('hello');
  const [ShowGifs, setShowGifs] = useState(false);
  const [postData, setPostData] = useState({ src: '', message: '' });
  const [post, UpdatePost] = useState([]);


  useEffect(async () => {
    const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=x29gHGuHI1RUYKfKvNvHWLBL6se4fbp9&q=${searchquery}&limit=6&offset=0&rating=pg&lang=en`);
    const data = await res.json();
    setImg(data.data)
  }, [searchquery]);

  const getSource = (e) => {
    const gifsrc = e.target.src
    setPostData({ ...postData, src: gifsrc })
  }

  const getText = (e) => {
    const msg = e.target.value;
    setPostData({ ...postData, message: msg })
  }

  const getQuery = (e) => {
    const query = e.target.value;
    Setquery(query);
  }

  const getInputval = () => {
    setSeachquery(query);
  }

  const showgifs = () => {
    setShowGifs(!ShowGifs)
  }
  const createPost = () => {
    setPostData({ ...postData, src: '', message: '' })
    setShowGifs(false);
    post.push(postData);
  }


  return (
    <>
      <div className='heading'>Compose a Post</div>
      <div className='main_container'>
        <div className='postbox'>
          <div className='section1'>
            <img src={img} className='imgclass' alt="alt"></img>
            <textarea rows={5} cols={80} className='textareastyles' value={postData.message} placeholder="what's in your mind" onChange={getText}>
            </textarea>
          </div>
          <div className='section2'>
            {postData.src !== '' ? <img src={postData.src} height="150px" width="150px" alt="alt"></img> : <div></div>}
          </div>
          <div className='section3'>
            <div className='Getgif' onClick={showgifs}>
              Get GIF
            </div>
            {ShowGifs == true ? <div className='Gifdialogbox'>
              <div className='inputbox'><input className='searchgif' placeholder='search GIF' onChange={getQuery}></input> <span onClick={getInputval}>GO</span></div>
              <div className='searchedgifs'>
                {imagesrc.map((el) => {
                  return <img src={el.images.original.url} height="125px" width="100%" alt="image" onClick={getSource}></img>
                })}
              </div>

            </div> : <div></div>}
            <div className='postbtn' onClick={createPost}>POST</div>
          </div>
        </div>
      </div>
      <div className='newsfeed'>NEWS FEEDS</div>
      <div className='postsec'>
        {post.map((el) => {
          return <div className='post'>
            <div className="postmsg">{el.message} </div>
            <img src={el.src} height="150px" width="150px" alt="alt"></img>
          </div>
        })}
      </div>
    </>
  )
}

export default App;