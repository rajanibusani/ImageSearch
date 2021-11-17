import React, { useState, useEffect } from "react";
import ImageCard from './components/ImageCard';
import ImageSearch from './components/ImageSearch';

function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // eslint-disable-next-line
  const [searchValue, setSearchValue] = useState('');

  useEffect(()=>{
    const api_key="20625986-3bf4a883abd11958c7c56abac";
    // fetch(`https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${searchValue}&image_type=photo&pretty=true`)

    fetch(`https://pixabay.com/api/?key=${api_key}&q=${searchValue}&image_type=photo&pretty=true`)
    .then((res=>{
      return res.json()
    })).then(data=>{
      setImages(data.hits);
      setIsLoading(false)
    })
    .catch(err=>console.log(err))
  },[searchValue])

  return (
    <div className="container mx-auto">
      <ImageSearch searchText= {(text)=>setSearchValue(text)}/>
      {
        !isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>
      }
      {
        isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        :
        <div className="grid grid-cols-3 gap-4">
        {
          images.map(image=>(
            <ImageCard key={image.id} image={image}/>
          ))
        }

      </div>
      }
      

    </div>
   
  );
}

export default App;
