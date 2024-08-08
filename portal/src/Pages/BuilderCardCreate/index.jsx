import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/index.jsx';
import Select from '../../components/Select/index.jsx';
import TextArea from '../../components/TextArea';
import axios from '../../utilities/customAxios.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload, Checkbox, Space, TimePicker, Button } from 'antd';
import Cookies from 'js-cookie';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//dor antd
const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

const BuilderCardCreate = ({
  openAddBuilderCard,
  setopenAddBuilderCard,
  onBuilderCardCreated,
}) => {
  // --------------get calls-------------------------

  // --------------get districts-------------------------

  // const [districts, setDistricts] = useState([]);
  // const getDistricts = async () => {
  //   const response = await axios.get('/location/district');
  //   if (response.status === 200) {
  //     setDistricts(response.data);
  //   }
  // };
  // --------------get districts-------------------------
  const stateOptions = [
    { _id: 'Kerala', stateName: 'Kerala' },
    { _id: 'Tamil Nadu', stateName: 'Tamil Nadu' },
  ];

  const districtsData = {
    Kerala: [
      { _id: 'Trivandrum', name: 'Trivandrum' },
      { _id: 'Kollam', name: 'Kollam' },
      { _id: 'Pathanamthitta', name: 'Pathanamthitta' },
      { _id: 'Alappuzha', name: 'Alappuzha' },
      { _id: 'Kottayam', name: 'Kottayam' },
      { _id: 'Idukki', name: 'Idukki' },
      { _id: 'Ernakulam', name: 'Ernakulam' },
      { _id: 'Thrissur', name: 'Thrissur' },
      { _id: 'Palakkad', name: 'Palakkad' },
      { _id: 'Malappuram', name: 'Malappuram' },
      { _id: 'Kozhikode', name: 'Kozhikode' },
      { _id: 'Wayanad', name: 'Wayanad' },
      { _id: 'Kannur', name: 'Kannur' },
      { _id: 'Kasaragod', name: 'Kasaragod' },
    ],
    Tamil_Nadu: [
      { _id: 'Chennai', name: 'Chennai' },
      { _id: 'Coimbatore', name: 'Coimbatore' },
      { _id: 'Ariyalur', name: 'Ariyalur' },
      { _id: 'Chengalpattu', name: 'Chengalpattu' },
      { _id: 'Cuddalore', name: 'Cuddalore' },
      { _id: 'Dharmapuri', name: 'Dharmapuri' },
      { _id: 'Dindigul', name: 'Dindigul' },
      { _id: 'Erode', name: 'Erode' },
      { _id: 'Kallakurichi', name: 'Kallakurichi' },
      { _id: 'Kancheepuram', name: 'Kancheepuram' },
      { _id: 'Kanyakumari', name: 'Kanyakumari' },
      { _id: 'Karur', name: 'Karur' },
      { _id: 'Krishnagiri', name: 'Krishnagiri' },
      { _id: 'Madurai', name: 'Madurai' },
      { _id: 'Mayiladuthurai', name: 'Mayiladuthurai' },
      { _id: 'Nagapattinam', name: 'Nagapattinam' },
      { _id: 'Namakkal', name: 'Namakkal' },
      { _id: 'Nilgiris', name: 'Nilgiris' },
      { _id: 'Perambalur', name: 'Perambalur' },
      { _id: 'Pudukkottai', name: 'Pudukkottai' },
      { _id: 'Ramanathapuram', name: 'Ramanathapuram' },
      { _id: 'Ranipet', name: 'Ranipet' },
      { _id: 'Salem', name: 'Salem' },
      { _id: 'Sivagangai', name: 'Sivagangai' },
      { _id: 'Tenkasi', name: 'Tenkasi' },
      { _id: 'Thanjavur', name: 'Thanjavur' },
      { _id: 'Theni', name: 'Theni' },
      { _id: 'Thoothukudi', name: 'Thoothukudi' },
      { _id: 'Tiruchirappalli', name: 'Tiruchirappalli' },
      { _id: 'Tirunelveli', name: 'Tirunelveli' },
      { _id: 'Tirupattur', name: 'Tirupattur' },
      { _id: 'Tiruppur', name: 'Tiruppur' },
      { _id: 'Tiruvallur', name: 'Tiruvallur' },
      { _id: 'Tiruvannamalai', name: 'Tiruvannamalai' },
      { _id: 'Tiruvarur', name: 'Tiruvarur' },
      { _id: 'Vellore', name: 'Vellore' },
      { _id: 'Viluppuram', name: 'Viluppuram' },
      { _id: 'Virudhunagar', name: 'Virudhunagar' },
    ],
  };

  // --------------get calls-------------------------

  const [items, setItems] = useState({
    name: '',
    description: '',
    district: '',
    images: [],
    logo: '',
    qrcode: '',
    gallery: '',
    siteplan: '',
    statusgallery: [],
    amenitiesgallery: [],
    location: '',
    areaRange: '',
    apartmenttype: '',
    permitno: '',
    kreranumber: '',
    whatsappno: '',
    telephoneno: '',
    locationurl: '',
    youtube: '',
    status: '',
    brochure: '',
    institutions: '',
    offices: '',
    facilities: '',
    worship: '',
    transportation: '',
    shopping: '',
    landmarks: '',
  });
  // --------------get logo-------------------------
  const [logos, setLogos] = useState([]);
  const getLogos = async () => {
    const response = await axios.get('/logo');
    if (response.status === 200) {
      setLogos(response.data);
    }
  };
  // --------------get logo-------------------------

  // --------------get QRCODE-------------------------
  const [qrcodes, setQRcodes] = useState([]);
  const getqrcodes = async () => {
    const response = await axios.get('/qrcode');
    if (response.status === 200) {
      setQRcodes(response.data);
    }
  };
  // --------------get QRCODE-------------------------

  // --------------get gallery-------------------------
  const [gallery, setGallery] = useState([]);

  const getgallery = async () => {
    const response = await axios.get('/image/gallery');
    if (response.status === 200) {
      setGallery(response.data);
      // setLoading(false);
    }
  };
  // --------------get gallery-------------------------

  // --------------get SITEPLAN-------------------------
  const [sitePlan, setSitePlan] = useState([]);
  const getsitePlan = async () => {
    const response = await axios.get('/image/siteplan');
    if (response.status === 200) {
      setSitePlan(response.data);
    }
  };
  // --------------get SITEPLAN-------------------------

  // --------------get STATUS GALLERY-------------------------

  const [statusGallery, setstatusGallery] = useState([]);
  const getstatusGallery = async () => {
    const response = await axios.get('/statusadding');
    if (response.status === 200) {
      setstatusGallery(response.data);
    }
  };
  // --------------get STATUS GALLERY-------------------------

  const [statusGalleryDate, setStatusGalleryDate] = useState('');
  const [statusGalleryFileList, setStatusGalleryFileList] = useState([]);
  const handleAddStatusGallery = () => {
    if (statusGalleryFileList.length > 0 && statusGalleryDate) {
      const newStatusGallery = [
        ...items.statusgallery,
        {
          image: statusGalleryFileList[0].response.url,
          date: statusGalleryDate,
        },
      ];
      setItems({ ...items, statusgallery: newStatusGallery });
      setStatusGalleryFileList([]);
      setStatusGalleryDate('');
    }
  };
  const handleStatusGalleryChange = ({ fileList }) => {
    setStatusGalleryFileList(fileList);
  };
  // --------------get amenities GALLERY-------------------------
  const [amenitiesGalleryDesc, setAmenitiesGalleryDesc] = useState('');
  const [amenitiesGalleryFileList, setAmenitiesGalleryFileList] = useState([]);
  const handleAddAmenitiesGallery = () => {
    if (amenitiesGalleryFileList.length > 0 && amenitiesGalleryDesc) {
      const newAmenitiesGallery = [
        ...items.amenitiesgallery,
        {
          image: amenitiesGalleryFileList[0].response.url,
          description: amenitiesGalleryDesc,
        },
      ];
      setItems({ ...items, amenitiesgallery: newAmenitiesGallery });
      setAmenitiesGalleryFileList([]);
      setAmenitiesGalleryDesc('');
    }
  };
  const handleAmenitiesGalleryChange = ({ fileList }) => {
    setAmenitiesGalleryFileList(fileList);
  };

  useEffect(() => {
    // getDistricts();
    getLogos();
    getqrcodes();
    getgallery();
    getsitePlan();
    getstatusGallery();
  }, []);

  // -----------image upload------------------
  //antd
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);

  //handle preview
  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }, key) => {
    setFileList(newFileList);
    // console.log(newFileList);
    let updatedImages = [];
    newFileList.forEach((file, index) => {
      if (file.response && file.response.url) {
        updatedImages[index] = file.response.url;
      }
      // else if (file.url) {
      //   updatedImages[index] = file.url;
      // }
    });
    setItems({ ...items, images: updatedImages });
  };
  const handleChangeBrochure = info => {
    try {
      if (info.file.status == 'done') {
        setItems({ ...items, brochure: info.file.response.url });
      }
    } catch (e) {
      console.log(e.message, `${info.file.name} file upload failed.`);
    }
  };

  const handleRemove = async () => {
    const name = items.images[0].split('3000/')[1];
    const response = await axios.post('/upload/delete', { image: name });
    items.images = [];
  };

  // handle file change for PDF upload
  const handleFileChange = e => {
    const file = e.target.files[0];
    setItems({ ...items, brochure: file });
  };

  // -----------stop image upload------------------

  const onChange = (e, key) => {
    const { value } = e.target;
    setItems(prevItems => ({
      ...prevItems,
      [key]: value,
    }));
  };
  const onReactQuillChange = (e, key) => {
    setItems(prevItems => ({
      ...prevItems,
      [key]: e,
    }));
  };

  const onClick = async () => {
    try {
      const response = await axios.post('/buildercard', items);
      if (response.status === 201) {
        toast.success('buildercard Added', {
          autoClose: 1500,
          onClose: () => {
            // Cookies.remove('stateName');
            // Cookies.remove('status');
            // setItems({ stateName: '', status: '' });
            onBuilderCardCreated(); // Trigger the refresh
            setopenAddBuilderCard(!openAddBuilderCard);
            window.location.reload();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };

  // console.log(items);

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="p-4">
        <div className="">
          <label>Project Name</label>
          <Input
            type="text"
            placeHolder="Name"
            onChange={e => onChange(e, 'name')}
          />
          <label>Project Description</label>
          <TextArea
            type="text"
            placeHolder="Description"
            onChange={e => onChange(e, 'description')}
          />
          <label>Select State</label>
          <Select
            options={stateOptions}
            placeHolder="Select a state"
            onChange={e => onChange(e, 'state')}
            value={items.state}
            group="state"
          />
          <label>Select District</label>
          <Select
            options={
              items.state === 'Kerala'
                ? districtsData.Kerala
                : items.state === 'Tamil Nadu'
                ? districtsData.Tamil_Nadu
                : []
            }
            placeHolder="Select a district"
            onChange={e => onChange(e, 'district')}
            value={items.district}
            group="district"
            style={{ marginTop: 10 }}
          />
          {/* <Input
            type="text"
            placeHolder="Districts"
            onChange={e => onChange(e, 'district')}
          /> */}
          <div className="right-inputs">
            <label>Project Slider Image</label>

            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              onRemove={handleRemove}
              className="image-container my-3"
              value={items.images}
            >
              {fileList.length >= 3 ? null : (
                <button
                  style={{
                    border: 0,
                    background: 'none',
                  }}
                  type="button"
                >
                  <PlusOutlined />
                  <div
                    style={{
                      marginTop: 8,
                    }}
                  >
                    Upload
                  </div>
                </button>
              )}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{
                  display: 'none',
                }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: visible => setPreviewOpen(visible),
                  afterOpenChange: visible => !visible && setPreviewImage(''),
                }}
                src={previewImage}
              />
            )}
          </div>
          <label>Select Logo</label>
          <Select
            options={logos}
            placeHolder="Logos"
            value={items.logo}
            onChange={e => onChange(e, 'logo')}
          />
          <label>Select QR Code</label>
          <Select
            options={qrcodes}
            placeHolder=" QR Codes"
            value={items.qrcode}
            onChange={e => onChange(e, 'qrcode')}
          />
          <label>Gallery</label>
          <Select
            options={gallery}
            placeHolder="Gallery"
            value={items.gallery}
            onChange={e => onChange(e, 'gallery')}
          />
          <label>Select Site Plan</label>
          <Select
            options={sitePlan}
            placeHolder="Site Plans"
            value={items.siteplan}
            onChange={e => onChange(e, 'siteplan')}
          />
          {/* /    here see added status galler images and dates   / */}
          <div className="border border-blue-900 p-6 rounded-md my-3">
            <div className="flex gap-4">
              {items.statusgallery.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt={`status-gallery-${index}`}
                    className="w-[120px] h-[80px] object-cover"
                  />
                  <p className="my-4 text-xs text-center">Date: {item.date}</p>
                </div>
              ))}
            </div>
            <label>Status Gallery Image</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={statusGalleryFileList}
              onChange={handleStatusGalleryChange}
              className="image-container my-3"
            >
              {statusGalleryFileList.length === 0 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : null}
            </Upload>

            <label>Status Gallery Date</label>
            <Input
              type="date"
              placeHolder="Date"
              value={statusGalleryDate}
              onChange={e => setStatusGalleryDate(e.target.value)}
            />

            <button
              className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md my-5 mx-auto"
              onClick={handleAddStatusGallery}
            >
              Add to Status Gallery
            </button>
          </div>

          {/* /    here see added Amenities  / */}
          <div className="border border-blue-900 p-6 rounded-md my-3">
            <div className="flex gap-4">
              {items.amenitiesgallery.map((item, index) => (
                <div key={index}>
                  <img
                    src={item.image}
                    alt={`amenities-gallery-${index}`}
                    className="w-[120px] h-[80px] object-cover"
                  />
                  <p className="my-4 text-xs text-center">{item.description}</p>
                </div>
              ))}
            </div>
            <label>Amenities Gallery Image</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              listType="picture-card"
              fileList={amenitiesGalleryFileList}
              onChange={handleAmenitiesGalleryChange}
              className="image-container my-3"
            >
              {amenitiesGalleryFileList.length === 0 ? (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              ) : null}
            </Upload>

            <label>Amenities Gallery Description</label>
            <Input
              placeHolder="Desc"
              value={amenitiesGalleryDesc}
              onChange={e => setAmenitiesGalleryDesc(e.target.value)}
            />

            <button
              className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md my-5 mx-auto"
              onClick={handleAddAmenitiesGallery}
            >
              Add to Amenities Gallery
            </button>
          </div>
          <label>Location</label>
          <Input
            type="text"
            placeHolder="Location Name"
            onChange={e => onChange(e, 'location')}
          />
          <label>Area Range</label>
          <Input
            type="text"
            placeHolder="Range"
            onChange={e => onChange(e, 'areaRange')}
          />
          <label>Apartment Number</label>
          <Input
            type="text"
            placeHolder="Type"
            onChange={e => onChange(e, 'apartmenttype')}
          />
          <label>Permit Number</label>
          <Input
            type="text"
            placeHolder="Number"
            onChange={e => onChange(e, 'permitno')}
          />
          <label>K-RERA Number</label>
          <Input
            type="text"
            placeHolder="Number"
            onChange={e => onChange(e, 'kreranumber')}
          />
          <label>WhatsApp Number</label>
          <Input
            type="number"
            placeHolder="WhatsApp Number"
            onChange={e => onChange(e, 'whatsappno')}
          />
          <label>Telephone Number</label>
          <Input
            type="number"
            placeHolder="Telephone Number"
            onChange={e => onChange(e, 'telephoneno')}
          />
          <label>Location Url</label>
          <Input
            type="text"
            placeHolder="Location Url"
            onChange={e => onChange(e, 'locationurl')}
          />
          <label>Youtube Url</label>
          <Input
            type="text"
            placeHolder="Youtube Url"
            onChange={e => onChange(e, 'youtube')}
          />
          <div className="right-inputs mb-5 mt-5">
            <label>Upload Brochure</label>
            <Upload
              action="https://backend.testing4.xyz/upload/image"
              onChange={handleChangeBrochure}
              className="image-container mx-5"
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <label>Status</label>
          <Select
            options={[
              { _id: 'StartingStage', name: 'Starting Stage' },
              { _id: 'Ongoing', name: 'Ongoing' },
              { _id: 'Completed', name: 'Completed' },
            ]}
            placeHolder="status"
            value={items.status}
            onChange={e => onChange(e, 'status')}
          />
          <label>EDUCATIONAL INSTITUTIONS</label>
          <ReactQuill
            theme="snow"
            placeholder="INSTITUTIONS"
            onChange={e => onReactQuillChange(e, 'institutions')}
            value={items.institutions}
            className="my-5"
          />
          {/* <Input
            type="text"
            placeHolder="INSTITUTIONS"
            onChange={e => onChange(e, 'institutions')}
          /> */}
          <label>PUBLIC OFFICES</label>
          <ReactQuill
            theme="snow"
            className="my-5"
            placeholder="OFFICES"
            onChange={e => onReactQuillChange(e, 'offices')}
            value={items.offices}
          />
          {/* <Input
            type="text"
            placeHolder="OFFICES"
            onChange={e => onChange(e, 'offices')}
          /> */}
          <label>HEALTHCARE FACILITIES</label>
          <ReactQuill
            className="my-5"
            theme="snow"
            placeholder="FACILITIES"
            onChange={e => onReactQuillChange(e, 'facilities')}
            value={items.facilities}
          />
          {/* <Input
            type="text"
            placeHolder="FACILITIES"
            onChange={e => onChange(e, 'facilities')}
          /> */}
          <label>PLACES OF WORSHIP</label>
          <ReactQuill
            theme="snow"
            className="my-5"
            placeholder="WORSHIP"
            onChange={e => onReactQuillChange(e, 'worship')}
            value={items.worship}
          />
          {/* <Input
            type="text"
            placeHolder="WORSHIP"
            onChange={e => onChange(e, 'worship')}
          /> */}
          <label>TRANSPORTATION</label>
          <ReactQuill
            theme="snow"
            className="my-5"
            placeholder="TRANSPORTATION"
            onChange={e => onReactQuillChange(e, 'transportation')}
            value={items.transportation}
          />
          {/* <Input
            type="text"
            placeHolder="TRANSPORTATION"
            onChange={e => onChange(e, 'transportation')}
          /> */}
          <label>SHOPPING ENTERTAINMENT</label>
          <ReactQuill
            theme="snow"
            className="my-5"
            placeholder="SHOPPING  ENTERTAINMENT"
            onChange={e => onReactQuillChange(e, 'shopping')}
            value={items.shopping}
          />
          {/* <Input
            type="text"
            placeHolder="SHOPPING  ENTERTAINMENT"
            onChange={e => onChange(e, 'shopping')}
          /> */}
          <label>OTHER LANDMARKS</label>
          <ReactQuill
            theme="snow"
            className="my-5"
            placeholder="LANDMARKS"
            onChange={e => onReactQuillChange(e, 'landmarks')}
            value={items.landmarks}
          />
          {/* <Input
            type="text"
            placeHolder="LANDMARKS"
            onChange={e => onChange(e, 'landmarks')}
          /> */}
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md"
            onClick={onClick}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default BuilderCardCreate;
