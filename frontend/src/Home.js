import React, { useEffect,  useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const Home = () => {
    const navigator = useNavigate();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const token = Cookies.get('token'); // Lấy token từ cookie
        console.log("token" + token);
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axios.defaults.headers.common['Authorization'];
            navigator('/login');
            return;
        }
        axios.get('http://localhost:8080/users')
            .then((response) => {
                setUsers(response.data); // response.data chứa danh sách người dùng
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }, [navigator]);
    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:8080/logout', { withCredentials: true });
            console.log(response.data);
            navigator("/login");
        } catch (error) {
            console.error("There was an error!", error);
        }
    };

    return (
        <div>
          <h1>List of Registered Users</h1>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <Link to={`/chat/${user.id}`}>{user.name}</Link>
              </li>
            ))}
          </ul>
          <h1> <button onClick={handleLogout}>Logout</button></h1>
        </div>
      );
};

export default Home;