import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import moment from 'moment';
import Input from '../Input/index.jsx';
import TextArea from '../TextArea/index.jsx';
import Button from '../Button/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-toastify/dist/ReactToastify.css';
const BlogCardTable = ({ refreshTrigger }) => {
  const [blogCards, setblogCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const getblogCards = async () => {
    const response = await axios.get('/blogcard');
    if (response.status === 200) {
      setblogCards(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getblogCards();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/blogcard/${id}`);
      if (response.status === 204) {
        toast.success('Blog Card deleted', {
          autoClose: 1500,
          onClose: () => {
            getblogCards();
          },
        });
      }
    } catch (e) {
      toast.error(e.response.data, {
        autoClose: 1500,
      });
    }
  };
  // console.log(blogCards);
  // ----------------edit function-----------------
  const [openeditWindow, setOpeneditWindow] = useState(false);
  const [blogCard, setBlogCard] = useState({ description: '' });
  const [upadteblogCard, setUpdateBlogCard] = useState({ description: '' });
  const trigger = () => {
    setOpeneditWindow(!openeditWindow);
  };
  const editBlogCard = async id => {
    setOpeneditWindow(!openeditWindow);
    const result = await axios.get(`/blogcard/detail/${id}`);
    // setBlogCard(result.data);
    const { description = '', ...rest } = result.data;
    setBlogCard({ description, ...rest });
    setUpdateBlogCard({ description, ...rest });
  };
  const onChange = (e, key) => {
    setUpdateBlogCard({ ...upadteblogCard, [key]: e.target.value });
  };
  const onDescriptionChange = value => {
    setUpdateBlogCard({
      ...upadteblogCard,
      description: value,
    });
  };

  const updateBlogCard = async id => {
    try {
      const response = await axios.post(
        `/blogcard/detail/${id}`,
        upadteblogCard
      );
      if (response.status === 201) {
        toast.success('Blogcard updated', {
          autoClose: 1500,
          onClose: () => {
            trigger();
            getblogCards();
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

  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default relative theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Blog Cards</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Blog Images</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">Card Name</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Date</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Heading</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {blogCards.map((data, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-2 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center flex-wrap">
                  {data.images.map((image, i) => {
                    return (
                      <div className="h-8 w-12 rounded-md" key={i}>
                        <img
                          src={image}
                          alt={data?.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data.name}</p>
              </div>
              <div className="col-span-1 hidden items-center sm:flex">
                <p className="text-sm">
                  {moment(data?.date).format('MMM Do YY')}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm line-clamp-2">{data?.heading}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <i
                  className="fa-regular fa-pen-to-square"
                  onClick={() => editBlogCard(data._id)}
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
              <h1 className="text-primary text-2xl">EDIT BLOGCARD</h1>
              <i class="fa-solid fa-xmark text-2xl" onClick={trigger}></i>
            </div>
            <div className="mt-6">
              <label>Blog Card Name</label>
              <Input
                placeHolder={blogCard.name}
                onChange={e => {
                  onChange(e, 'name');
                }}
              />
              <label>Date</label>
              <Input
                placeHolder={blogCard.date}
                type="date"
                onChange={e => {
                  onChange(e, 'date');
                }}
              />
              <label>Heading</label>

              <Input
                placeHolder={blogCard.heading}
                onChange={e => {
                  onChange(e, 'heading');
                }}
              />
              <label>Description</label>
              <ReactQuill
                theme="snow"
                value={upadteblogCard.description}
                onChange={onDescriptionChange}
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    updateBlogCard(blogCard._id);
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

export default BlogCardTable;
