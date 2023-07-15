"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
import { useForm } from "react-hook-form";

export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
   category: assignedCategory,
  properties: assignedProperties,
}) {
  // console.log("existingImages", existingImages)
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categories, setCategories] = useState([]);
  // const [selectedImage, setSelectedImage] = useState([]);
  // const [selectedFile, setSelectedFile] = useState([]);
  const [exImages, setExImages] = useState([]);
  const router = useRouter();
  const [imagesPreview, setImagesPreview] = useState([]);
  // const [imgDeletOnUpdate, setImgDeletOnUpdate] = useState();

  // const { register, handleSubmit, watch, formState: { errors } } = useForm();

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);
  useEffect(() => {
    setExImages([])
    existingImagesUrlExtract()
    console.log("newColImages", exImages)
    // setImagesPreview(exImages)
  }, [imagesPreview])


  const existingImagesUrlExtract = () => {
    console.log("newes EX", existingImages)
    console.log("newes PR", imagesPreview)
    if(existingImages?.length >0 && imagesPreview?.length >0){
      // const newArrayColImages = []
      // const exImagesArr = existingImages?.map( x =>  ({url: x?.url}))
      // const newColImages = imagesPreview.map( x => ({url: x}))
      console.log("newes", imagesPreview)

      // newArrayColImages.push(exImagesArr, newColImages)
      const newColImages = imagesPreview.map( x => ({url: x}))
      // const newColImages = imagesPreview.map( x =>  x)
      setExImages(newColImages)
    }
    else
    if (existingImages?.length > 0) {
      setExImages(existingImages)
      // const exImagesArr = existingImages?.map(x => ({ url: x?.url }))
      // // newColImages.push(exImages)
      // setExImages(exImagesArr)
    }
    else
    if(!existingImages?.length >0 && imagesPreview?.length >0 ){

          // setExImages(imagesPreview)

      const newColImages = imagesPreview.map( x => ({url: x}))
      console.log("newes", imagesPreview)
        setExImages(newColImages)
      // newColImages.push(exImagesPreview)
    }

  }

  // async function uploadImages(ev) {
  //   const files = Array.from(ev.target.files);

  //     const file = ev.target.files[0];
  //     setSelectedImage(URL.createObjectURL(file));
  //     setSelectedFile(file);
  //     setImagesPreview([]);

  //     setImages([]);
  //     console.log(files)
  //     setExImages([]);
  //     if (!selectedFile) return;
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);
  //     SetFormData(formData)
  //     let fileResults = [];
  //     files.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onload = async () => {
  //         if (reader.readyState === 2) {
  //           console.log("selected newes1",  reader?.result)
  //           fileResults.push( reader?.result)
  //           setImagesPreview(fileResults);
            
  //           // setImagesPreview((oldArray) => [...oldArray, reader?.result]);
  //           // const result = []
  //           // result.push(reader?.result)
  //           // console.log("emty1", result )
  //           //   console.log("emty2", reader?.result )
  //           // console.log("newes2", imagesPreview)


  //           // console.log("newColImages", imagesPreview)
  //         }
  //       };


  //       reader.readAsDataURL(file);
  //       setImages((oldArray) => [...oldArray, file]);
  //   //     const newColImages =  imagesPreview?.map( x => ({url: x}))
  //   //     console.log("newColImages 3", newColImages)
  //   //     setExImages(imagesPreview)
  //   // console.log("Images 123", exImages)
      
  //       // console.log("imag64", imagesPreview)
  //     });

  //   setIsUploading(false);

  // }

  const reader = (file) =>
    new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr);
      fr.onerror = (err) => reject(err);
      fr.readAsDataURL(file);
    });

  async function logImagesData(evt) {
   
    setIsUploading(true);
    const fileList = [...evt.target.files]
    let fileResults = [];
    const frPromises = fileList.map(reader);
    setExImages([])
    try {
      fileResults = await Promise.all(frPromises);
    } catch (err) {
      // In this specific case, Promise.all() might be preferred
      // over Promise.allSettled(), since it isn't trivial to modify
      // a FileList to a subset of files of what the user initially
      // selected. Therefore, let's just stash the entire operation.
      console.error(err);
      return;
    }

    let result = []
    fileResults.forEach((fr) => {
      
      result.push(fr.result)
      console.log("abbbb", fr.result); // Base64 `data:image/...` String result.
      setImagesPreview(result)
      // setImages(result)
    });
    
    console.log("setImagesPreview", imagesPreview); // Base64 `data:image/...` String result.
    setIsUploading(false);
  }


  async function saveProduct(ev) {
    ev.preventDefault();
    const data = {
      title, description, price, images, imagesPreview, exImages, existingImages, category,
      properties: productProperties
    };
    // console.log(imagesPreview)
    console.log("payload data images" ,images)
    if (_id) {
      //update
      
      await axios.put('/api/products', { ...data, _id });
    } else {
      //create
      
      await axios.post('/api/products', data, {
        
      })
        .then(response => {
          console.log(response?.data)
          setImages([response?.data?.url])
        })
     
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }



  function updateImagesOrder(images) {
    setImages(images);
  }
  function setProductProp(propName, value) {
    setProductProperties(prev => {
      const newProductProps = { ...prev };
      newProductProps[propName] = value;
      return newProductProps;
    });
  }

  const propertiesToFill = [];
  if (categories.length > 0 && category) {
    let catInfo = categories.find(({ _id }) => _id === category);
    propertiesToFill.push(...catInfo.properties);
    while (catInfo?.parent?._id) {
      const parentCat = categories.find(({ _id }) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;
    }
  }
  
  console.log("image", exImages)

  return (
    // <form onSubmit={handleSubmit(saveProduct)}>
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        name="title"
        type="text"
        placeholder="product name"
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <label>Category</label>
      <select value={category}
        name="category"
        onChange={ev => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div key={p.name} className="">
          <label>propertiesToFill -{p.name[0].toUpperCase() + p.name.substring(1)}</label>
          <div>
            <select value={productProperties[p.name]}
              name="productProperties"
              onChange={ev =>
                setProductProp(p.name, ev.target.value)
              }
            >
              {p.values.map(v => (
                <option key={v} value={v}>{v}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <label>
        Photos
      </label>
      <div className="mb-2 flex flex-wrap gap-1">
        
        <ReactSortable
          list={exImages}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}>
          {!!exImages?.length && exImages.map(link => (
            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link?.url} alt="" className="rounded-lg" />
            </div>
          ))}
        </ReactSortable>
      
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
        <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
            Add image
          </div>
          <input
            id="images"
            // name="image" 
            type="file"
            // multiple onChange={uploadImages}
            multiple onChange={logImagesData}
            // {...register("image")}
            className="hidden"
          />
        </label>
      </div>
      <label>Description</label>
      <textarea
        placeholder="description"
        value={description}
        onChange={ev => setDescription(ev.target.value)}
      />
      <label>Price (in USD)</label>
      <input
        name="price"
        type="number" placeholder="price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <button
        type="submit"
        className="btn-primary">
        Save
      </button>
    </form>
  );
}
