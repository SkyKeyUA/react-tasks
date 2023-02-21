/** @format */

import React from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users

function App() {
  const [users, setUsers] = React.useState([]);
  const [invites, setInvites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch('https://reqres.in/api/users')
          .then((res) => res.json())
          .then((json) => setUsers(json.data));
        setIsLoading(false);
      } catch (error) {
        alert('error when requesting data');
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  const onClickInvite = (id) => {
    if (invites.includes(id)) {
      setInvites((prev) => prev.filter((_id) => _id !== id));
    } else {
      setInvites((prev) => [...prev, id]);
    }
  };
  const onClickSendInvites = () => {
    setSuccess(!success);
  };
  return (
    <div className="App">
      {success ? (
        <Success onClickSendInvites={onClickSendInvites} count={invites.length} />
      ) : (
        <Users
          onChangeSearchInput={onChangeSearchInput}
          searchValue={searchValue}
          isLoading={isLoading}
          items={users}
          invites={invites}
          onClickInvite={onClickInvite}
          onClickSendInvites={onClickSendInvites}
        />
      )}
    </div>
  );
}

export default App;
