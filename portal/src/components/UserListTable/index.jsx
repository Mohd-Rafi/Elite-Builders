import { useState, useEffect } from 'react';
import axios from '../../utilities/customAxios.js';
import Loader from '../Loader/index.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Input from '../Input/index.jsx';
import Button from '../Button/index.jsx';
const UserListTable = ({ refreshTrigger, userRole }) => {
  const [users, setusers] = useState([]);
  const [loading, setLoading] = useState(true);
  const getusers = async () => {
    const response = await axios.get('/user');
    if (response.status === 200) {
      setusers(response.data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getusers();
  }, [refreshTrigger]);
  const deleteFn = async id => {
    try {
      const response = await axios.delete(`/user/${id}`);
      if (response.status === 204) {
        toast.success('User deleted', {
          autoClose: 1500,
          onClose: () => {
            getusers();
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
  const [user, setuser] = useState({});
  const [upadteuser, setUpdateuser] = useState({});
  const trigger = () => {
    setOpeneditWindow(!openeditWindow);
  };

  const editUser = async id => {
    setOpeneditWindow(!openeditWindow);
    const result = await axios.get(`/user/profile/${id}`);
    setuser(result.data);
  };
  const onChange = (e, key) => {
    setUpdateuser({ ...upadteuser, [key]: e.target.value });
  };
  const updateUser = async id => {
    try {
      const response = await axios.post(`/user/profile/${id}`, upadteuser);
      if (response.status === 201) {
        toast.success('User updated', {
          autoClose: 1500,
          onClose: () => {
            trigger();
            getusers();
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
  console.log(upadteuser);
  return (
    <div>
      <ToastContainer position="top-center" />
      {loading ? (
        <Loader />
      ) : (
        <div className="rounded-sm border border-stroke bg-white shadow-default relative theme">
          <div className="py-6 px-4 md:px-6 xl:px-7">
            <h4 className="text-xl font-semibol">Users</h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7">
            <div className="col-span-3 flex items-center">
              <p className="font-medium">User Name</p>
            </div>
            <div className="col-span-2 hidden items-center sm:flex">
              <p className="font-medium">email</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Role</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Edit</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Delete</p>
            </div>
          </div>

          {users.map((data, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke py-4 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7"
              key={key}
            >
              <div className="col-span-3 flex items-center">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-sm">{data?.name}</p>
                </div>
              </div>
              <div className="col-span-2 hidden items-center sm:flex">
                <p className="text-sm">{data?.email}</p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-sm">{data?.role}</p>
              </div>
              <div className="col-span-1 flex items-center">
                {userRole === 'admin' ? (
                  <i
                    className="fa-regular fa-pen-to-square"
                    onClick={() => editUser(data._id)}
                  ></i>
                ) : (
                  <i className="fa-regular fa-pen-to-square"></i>
                )}
              </div>
              <div className="col-span-1 flex items-center">
                {userRole === 'admin' ? (
                  <i
                    onClick={() => {
                      deleteFn(data?._id);
                    }}
                    className="fa-solid fa-trash"
                  ></i>
                ) : (
                  <i className="fa-solid fa-trash"></i>
                )}
              </div>
            </div>
          ))}
          <div
            className={`absolute bg-white w-full top-0 p-12  ${
              !openeditWindow && 'hidden'
            }`}
          >
            <div className="flex justify-between">
              <h1 className="text-primary text-2xl">EDIT USER</h1>
              <i class="fa-solid fa-xmark text-2xl" onClick={trigger}></i>
            </div>
            <div className="mt-6">
              <label>User Name</label>
              <Input
                placeHolder={user.name}
                onChange={e => {
                  onChange(e, 'name');
                }}
              />
              <label>User email</label>
              <Input
                placeHolder={user.email}
                onChange={e => {
                  onChange(e, 'email');
                }}
              />
              <label>User Role</label>

              <Input
                placeHolder={user.role}
                onChange={e => {
                  onChange(e, 'role');
                }}
              />
              <label>New Password</label>
              <Input
                placeHolder="Password"
                onChange={e => {
                  onChange(e, 'password');
                }}
              />
              <label>Confirm New Password</label>
              <Input
                placeHolder="Password"
                onChange={e => {
                  onChange(e, 'confirmPassword');
                }}
              />
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    updateUser(user._id);
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

export default UserListTable;
