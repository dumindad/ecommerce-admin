"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "@/components/Spinner";
import { ReactSortable } from "react-sortablejs";
// import { generateSignature } from '../backend/utils/generateSignature';
// import { uploads } from "@/backend/utils/cloudinary";
// import { UploadImg } from "@/controllers/productControllers";


export default function ProductForm({
  _id,
  title: existingTitle,
  description: existingDescription,
  price: existingPrice,
  images: existingImages,
  category: assignedCategory,
  properties: assignedProperties,
}) {
  const [title, setTitle] = useState(existingTitle || '');
  const [description, setDescription] = useState(existingDescription || '');
  const [category, setCategory] = useState(assignedCategory || '');
  const [productProperties, setProductProperties] = useState(assignedProperties || {});
  const [price, setPrice] = useState(existingPrice || '');
  const [images, setImages] = useState(existingImages || []);
  const [imagesPreview, setImagesPreview] = useState(existingImages || []);
  const [goToProducts, setGoToProducts] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploadSignature, setUploadSignature] = useState('');
  const [imgs, setImgs] = useState([]);
  const [imgsPreview, setImgsPreview] = useState([]);
  const [url, setUrl] = useState("");
  const [fileName, setFileName] = useState([""]);
  const [imgFile, setImgFile] = useState(null);

  useEffect(() => {
    axios.get('/api/categories').then(result => {
      setCategories(result.data);
    })
  }, []);

  
  async function saveProduct(ev) {
    ev.preventDefault();
    const formData = new FormData()
    // images.forEach((image)=> {
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("price", price);
      // formData.append("category", category);
      // formData.set("image", image);

    
      images.forEach((imgFile) => {
        formData.append('image', imgFile);
       
      })
      
      //       try{
        // const res = await axios.post(baseUrl + '/api/products/pro', file)
        //       }catch(error){
          //         return getValue(error, ["response", "data"]);
          //       }
          
          // })
          const data = {
            title, description, price, category,
            properties: productProperties, imgFile
            
          };
          if (_id) {
            //update
            await axios.put('/api/products/products', { ...data, _id });
            // await axios.put('/api/upload', { ...formData, _id });
          } else {
            //create
            console.log("formData", data)
      await axios.post('/api/products/create', data, {
          headers:{
            "Content-Type": "multipart/form-data",
          },
        });
      // await axios.post('/api/products/products', data);
      // await axios.post(`${process.env.API_URL}/api/upload/${id}`, formData,
      // {
      //   headers:{
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
    }
    setGoToProducts(true);
  }
  if (goToProducts) {
    router.push('/products');
  }
  async function uploadImages(e) {
    // ---------------test upload------------------

console.log(e.target.value)
console.log(e.target.files[0])
const file = e.target.files[0];
const base64 = await convertBase64(file);
setFileName(file.name)
setImgFile(file)
// const formData = new FormData()
//     images.forEach((image)=> {
//       formData.append("image", image);
//       formData.append("image", base64);
//     })
//     console.log("formData", base64)
// setLoading(true);
// await axios.post('/api/uploadImage',
// // formData,
// formData ,
// {
//   headers:{
//         "Content-Type": "multipart/form-data",
//       },
// }).then((res)=> {
//   setUrl(res.data);
//   alert("Image uploaded Succesfully")
// }).then(()=> setLoading(false))
// .catch(console.log)
    // ---------------end upload-------------------

    // const files = ev.target?.files;
    // if (files?.length > 0) {
    //   setIsUploading(true);
    //   const data = new FormData();
    //   for (const file of files) {
    //     data.append('file', file);
    //   }
    //   data.append({
    //     uploadPreset:'upload_preset', 
    //     cloudName: 'ml_ecomm',
    //     apiKey: process.env.CLOUDINARY_API_KEY,
    //     uploadSignature: await generateSignature
    //   })
    //   console.log("data",data)
    //   // const res = await axios.post('/api/upload', data);
    //   // const res = await axios.post(process.env.CLOUDINARY_URI, data);
    //   const res = await fetch('/api/upload', {
    //     method: 'POST',
    //     body: data 
    //   }).then(r => r.json()) ;
    //   console.log('data post', data)
    // ----------------------------------------
    // const  uploadSignature = await generateSignature
    //     setUploadSignature(uploadSignature)
    //     console.log('uploadSignature', uploadSignature)

    //   const widget = window.cloudinary.createUploadWidget(
    //     {
    //       cloudName: 'ds5zhj9f2',
    //       uploadPreset: 'ml_ecomm',
    //       resourceType: "image",
    //       // apiKey: process.env.CLOUDINARY_API_KEY,
    //       apiKey: '615917694752293',
    //       uploadSignature: uploadSignature
    //     },
    //     // console.log('ab1111'),
    //     // console.log('ab2222', error),
    //     (error, result) => {
    //       if (!error && result && result.event === "success") {
    //         setIsImageUploaded(true);

    //       } else if (error) {
    //         console.log(error);
    //       }
    //     }
    //     )
    //     console.log("Uploaded", result?.info),
    //   widget.open();
    // -----------------------------------------
    //   setImages(oldImages => {
    //     return [...oldImages, ...res.data.links];
    //   });
    //   setIsUploading(false);
    // }
// ================ Abas ---------------------
    // const files = Array.from(e.target.files)

    // setImages([])
    // setImgsPreview([])

    // files.forEach((file) => {

    //   const reader = new FileReader();

    //   reader.onload = () => {
    //     if (reader.readyState === 2) {
    //       setImgsPreview((oldArray) => [...oldArray, reader.result])
    //     }
    //   }
    //   setImages((oldArray) => [...oldArray, reader.file])
    //   reader.readAsDataURL(file);

    // })
    // -------------------------end--------------------
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) =>{
      const fileReader = new FileReader();
      if(file){

        
        fileReader.onload = () => {
          // if(fileReader.readyState === 2 ){

            resolve(fileReader.result);
            setImages([fileReader.result])
            // setImagesPreview((oldArray) => [...oldArray, fileReader.result])
          // }
        };
        // setImages((oldArray) => [...oldArray, file])
        fileReader.readAsDataURL(file);
      }else{
        setImages(existingImages || [])
      }
      fileReader.onerror = (error) =>{
        reject(error);
      }
    })
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

  return (
    <form onSubmit={saveProduct}>
      <label>Product name</label>
      <input
        type="text"
        placeholder="product name"
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <label>Category</label>
      <select value={category}
        onChange={ev => setCategory(ev.target.value)}>
        <option value="">Uncategorized</option>
        {categories.length > 0 && categories.map(c => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>
      {propertiesToFill.length > 0 && propertiesToFill.map(p => (
        <div key={p.name} className="">
          <label>{p.name[0].toUpperCase() + p.name.substring(1)}</label>
          <div>
            <select value={productProperties[p.name]}
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
          list={images}
          className="flex flex-wrap gap-1"
          setList={updateImagesOrder}
          >
          {!!images?.length && images.map(link => (
            <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
              <img src={link} alt="" className="rounded-lg" />
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
          <input type="file" multiple onChange={uploadImages} className="hidden" />
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
        type="number" placeholder="price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}
      />
      <button
        type="submit"
        className="btn-primary">
          {!loading ? 'Save': 'Save....'}
        
      </button>
    </form>
  );
}
