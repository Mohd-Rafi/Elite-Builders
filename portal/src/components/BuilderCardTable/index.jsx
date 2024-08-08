import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../Input';
import Select from '../Select';
import Button from '../Button/index.jsx';
import TextArea from '../TextArea/index.jsx';
import { Image, Upload, Checkbox, Space, TimePicker } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const BuilderCardTable = ({ refreshTrigger }) => {
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const getSliders = async () => {
    const response = await axios.get('/buildercard');
    if (response.status === 200) {
      setSliders(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getSliders();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/buildercard/${id}`);
      if (response.status === 204) {
        toast.success('Home slider deleted', {
          autoClose: 1500,
          onClose: () => {
            getSliders();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };

  // ----------------edit function-----------------
  const [openeditWindow, setOpeneditWindow] = useState(false);
  const [builderCard, setBuilderCard] = useState({});
  const [UpdateBuilderCard, setUpdateBuilderCard] = useState({
    statusgallery: [],
    amenitiesgallery: [],
  });

  const trigger = () => {
    setOpeneditWindow(!openeditWindow);
  };
  const editNewsAndEvent = async id => {
    setOpeneditWindow(!openeditWindow);
    const result = await axios.get(`/buildercard/${id}`);
    console.log(result.data);
    setBuilderCard(result.data);
  };
  // console.log(builderCard);
  const onChange = (e, key) => {
    setUpdateBuilderCard({ ...UpdateBuilderCard, [key]: e.target.value });
  };
  const onReactQuillChange = (e, key) => {
    setUpdateBuilderCard({ ...UpdateBuilderCard, [key]: e });
  };

  const updateBuilderCard = async id => {
    try {
      const response = await axios.post(
        `/buildercard/update/${id}`,
        UpdateBuilderCard
      );
      if (response.status === 201) {
        toast.success('BuilderCard updated', {
          autoClose: 1500,
          onClose: () => {
            trigger();
            getNewsAndEvents();
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
    console.log('hi', response.data);
    if (response.status === 200) {
      setstatusGallery(response.data);
    }
  };
  // --------------get STATUS GALLERY-------------------------

  const [statusGalleryDate, setStatusGalleryDate] = useState('');
  const [statusGalleryFileList, setStatusGalleryFileList] = useState([]);
  const handleAddStatusGallery = () => {
    if (statusGalleryFileList.length > 0 && statusGalleryDate) {
      const newStatusGalleryItem = {
        image: statusGalleryFileList[0].response.url,
        date: statusGalleryDate,
      };
      const newStatusGallery = [
        ...UpdateBuilderCard.statusgallery,
        newStatusGalleryItem,
      ];
      setUpdateBuilderCard({
        ...UpdateBuilderCard,
        statusgallery: newStatusGallery,
      });
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
      const newAmnetiesGalleryItem = {
        image: amenitiesGalleryFileList[0].response.url,
        description: amenitiesGalleryDesc,
      };
      const newAmnetisGallery = [
        ...UpdateBuilderCard.amenitiesgallery,
        newAmnetiesGalleryItem,
      ];
      setUpdateBuilderCard({
        ...UpdateBuilderCard,
        amenitiesgallery: newAmnetisGallery,
      });
      setAmenitiesGalleryFileList([]);
      setAmenitiesGalleryDesc('');
    }
  };
  const handleAmenitiesGalleryChange = ({ fileList }) => {
    setAmenitiesGalleryFileList(fileList);
  };
  /////////handle brochure---------------------

  const handleChangeBrochure = info => {
    try {
      if (info.file.status == 'done') {
        setUpdateBuilderCard({
          ...UpdateBuilderCard,
          brochure: info.file.response.url,
        });
      }
    } catch (e) {
      console.log(e.message, `${info.file.name} file upload failed.`);
    }
  };

  useEffect(() => {
    // getDistricts();
    getLogos();
    getqrcodes();
    getgallery();
    getsitePlan();
    getstatusGallery();
  }, []);
  // --------------get calls-------------------------

  console.log(UpdateBuilderCard);

  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Builder Cards</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Slider Image</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Card Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Location</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Type</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {sliders.map((data, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="h-12 w-15 rounded-md">
                    <img
                      src={data?.images[0]}
                      alt="Product"
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* <p className="text-sm">{data?.name}</p> */}
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.name}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm">{data.location}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm">{data?.apartmenttype}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => {
                    editNewsAndEvent(data?._id);
                  }}
                ></i>
              </div>
              <div className="col-span-1 flex items-center">
                <i
                  onClick={() => {
                    deleteFn(data._id);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </div>
            </div>
          ))}
          <div
            className={`absolute bg-white w-full top-0 p-12  ${
              !openeditWindow && 'hidden'
            }`}
          >
            <div className="flex justify-between">
              <h1 className="text-primary text-2xl">EDIT BUILDERCARD</h1>
              <i class="fa-solid fa-xmark text-2xl" onClick={trigger}></i>
            </div>
            <div className="mt-6">
              <label>Buildercard Name</label>
              <Input
                placeHolder={builderCard.name}
                onChange={e => {
                  onChange(e, 'name');
                }}
              />
              <label>Description</label>
              <TextArea
                placeHolder={builderCard.description}
                type="description"
                onChange={e => {
                  onChange(e, 'description');
                }}
              />
              <label>Area Range</label>

              <Input
                placeHolder={builderCard.areaRange}
                onChange={e => {
                  onChange(e, 'areaRange');
                }}
              />
              <label>Apartment type</label>
              <Input
                placeHolder={builderCard.apartmenttype}
                onChange={e => {
                  onChange(e, 'apartmenttype');
                }}
              />
              <label>Select State</label>
              <Select
                options={stateOptions}
                placeHolder="Select a state"
                onChange={e => onChange(e, 'state')}
                value={UpdateBuilderCard.state}
                group="state"
              />
              <label>Select District</label>
              <Select
                options={
                  UpdateBuilderCard.state === 'Kerala'
                    ? districtsData.Kerala
                    : UpdateBuilderCard.state === 'Tamil Nadu'
                    ? districtsData.Tamil_Nadu
                    : []
                }
                placeHolder={builderCard.district}
                onChange={e => onChange(e, 'district')}
                value={UpdateBuilderCard.district}
                group="district"
                style={{ marginTop: 10 }}
              />
              <label>krera number</label>
              <Input
                type="text"
                placeHolder={builderCard.kreranumber}
                onChange={e => onChange(e, 'kreranumber')}
              />
              <label>location</label>
              <Input
                type="text"
                placeHolder={builderCard.location}
                onChange={e => onChange(e, 'location')}
              />
              <label>Location url</label>
              <Input
                type="text"
                placeHolder={builderCard.locationurl}
                onChange={e => onChange(e, 'locationurl')}
              />
              <label>Permit no</label>
              <Input
                type="text"
                placeHolder={builderCard.permitno}
                onChange={e => onChange(e, 'permitno')}
              />
              <label>Telephone no</label>
              <Input
                type="number"
                placeHolder={builderCard.telephoneno}
                onChange={e => onChange(e, 'telephoneno')}
              />
              <label>Whatsapp no</label>
              <Input
                type="number"
                placeHolder={builderCard.whatsappno}
                onChange={e => onChange(e, 'whatsappno')}
              />
              <label>Youtube</label>
              <Input
                type="text"
                placeHolder={builderCard.youtube}
                onChange={e => onChange(e, 'youtube')}
              />
              <div className="right-inputs mb-5 mt-5">
                <label>Upload Brochure</label>
                <Upload
                  action="https://backend.testing4.xyz/upload/image"
                  onChange={handleChangeBrochure}
                  className="image-container mx-5"
                >
                  <button
                    className="border border-blue-800 p-2 rounded-md "
                    icon={<UploadOutlined />}
                  >
                    Click to Upload
                  </button>
                </Upload>
              </div>
              <label>Status</label>
              <Select
                options={[
                  { _id: 'StartingStage', name: 'Starting Stage' },
                  { _id: 'Ongoing', name: 'Ongoing' },
                  { _id: 'Completed', name: 'Completed' },
                ]}
                placeHolder={builderCard.status}
                value={UpdateBuilderCard.status}
                onChange={e => onChange(e, 'status')}
              />
              <label>Select Logo</label>
              <Select
                options={logos}
                placeHolder={builderCard?.logo?.name}
                value={UpdateBuilderCard.logo}
                onChange={e => onChange(e, 'logo')}
              />
              <label>Select QR Code</label>
              <Select
                options={qrcodes}
                placeHolder={builderCard?.qrcode?.name}
                value={UpdateBuilderCard.qrcode}
                onChange={e => onChange(e, 'qrcode')}
              />
              <label>Gallery</label>
              <Select
                options={gallery}
                placeHolder={builderCard?.gallery?.name}
                value={UpdateBuilderCard.gallery}
                onChange={e => onChange(e, 'gallery')}
              />
              <label>Select Site Plan</label>
              <Select
                options={sitePlan}
                placeHolder={builderCard?.siteplan?.name}
                value={UpdateBuilderCard.siteplan}
                onChange={e => onChange(e, 'siteplan')}
              />
              <div className="border border-blue-900 p-6 rounded-md my-3">
                <div className="flex gap-4">
                  {UpdateBuilderCard.statusgallery &&
                    UpdateBuilderCard.statusgallery.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item.image}
                          alt={`status-gallery-${index}`}
                          className="w-[120px] h-[80px] object-cover"
                        />
                        <p className="my-4 text-xs text-center">
                          Date: {item.date}
                        </p>
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
              <div className="border border-blue-900 p-6 rounded-md my-3">
                <div className="flex gap-4">
                  {UpdateBuilderCard.amenitiesgallery &&
                    UpdateBuilderCard.amenitiesgallery.map((item, index) => (
                      <div key={index}>
                        <img
                          src={item.image}
                          alt={`status-gallery-${index}`}
                          className="w-[120px] h-[80px] object-cover"
                        />
                        <p className="my-4 text-xs text-center">
                          Date: {item.description}
                        </p>
                      </div>
                    ))}
                </div>
                <label>Amneties Gallery Image</label>
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

                <label>Amneties Gallery Description</label>
                <Input
                  type="text"
                  placeHolder="Decription"
                  value={amenitiesGalleryDesc}
                  onChange={e => setAmenitiesGalleryDesc(e.target.value)}
                />

                <button
                  className="bg-blue-600 text-white flex items-center px-3 py-2 rounded-md my-5 mx-auto"
                  onClick={handleAddAmenitiesGallery}
                >
                  Add to Amneties Gallery
                </button>
              </div>
              <label>Institutions</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.institutions}
                value={UpdateBuilderCard.institutions}
                onChange={e => onReactQuillChange(e, 'institutions')}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.institutions}
                onChange={e => onChange(e, 'institutions')}
              /> */}
              <label>Offices</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.offices}
                onChange={e => onReactQuillChange(e, 'offices')}
                value={UpdateBuilderCard.offices}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.offices}
                onChange={e => onChange(e, 'offices')}
              /> */}
              <label>Facilities</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.facilities}
                onChange={e => onReactQuillChange(e, 'facilities')}
                value={UpdateBuilderCard.facilities}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.facilities}
                onChange={e => onChange(e, 'facilities')}
              /> */}
              <label>Worship</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.worship}
                onChange={e => onReactQuillChange(e, 'worship')}
                value={UpdateBuilderCard.worship}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.worship}
                onChange={e => onChange(e, 'worship')}
              /> */}
              <label>Transportation</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.transportation}
                onChange={e => onReactQuillChange(e, 'transportation')}
                value={UpdateBuilderCard.transportation}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.transportation}
                onChange={e => onChange(e, 'transportation')}
              /> */}
              <label>Shopping</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.shopping}
                onChange={e => onReactQuillChange(e, 'shopping')}
                value={UpdateBuilderCard.shopping}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.shopping}
                onChange={e => onChange(e, 'shopping')}
              /> */}
              <label>Landmarks</label>
              <ReactQuill
                theme="snow"
                // placeHolder={builderCard.landmarks}
                onChange={e => onReactQuillChange(e, 'landmarks')}
                value={UpdateBuilderCard.landmarks}
                className="my-5"
              />
              {/* <Input
                type="text"
                placeHolder={builderCard.landmarks}
                onChange={e => onChange(e, 'landmarks')}
              /> */}

              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    updateBuilderCard(builderCard._id);
                  }}
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuilderCardTable;
