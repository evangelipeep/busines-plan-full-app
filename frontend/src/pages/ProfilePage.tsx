import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material'
import { styled } from '@mui/system'

const CenteredContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  marginTop: '10vh',
  borderRadius: '8px',
  border: '1px solid #ccc',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
})

const ProfilePage: React.FC = () => {
  const [status, setStatus] = useState('')
  const [avatar, setAvatar] = useState('')
  const [users, setUsers] = useState([
    {
      id: 1,
      login: 'user1',
      email: 'user1@example.com',
      review: 'Great system!',
    },
    {
      id: 2,
      login: 'user2',
      email: 'user2@example.com',
      review: 'Awesome platform!',
    },
    {
      id: 3,
      login: 'user3',
      email: 'user3@example.com',
      review: 'Very helpful!',
    },
  ])

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatus(event.target.value)
  }

  const handleSaveStatus = () => {
    // Save the status using your preferred method (e.g., API call, local storage, etc.)
    console.log('Status saved:', status)
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <CenteredContainer>
      <Avatar
        alt="User Avatar"
        src={avatar || '/path/to/default-avatar.png'}
        sx={{ width: 100, height: 100 }}
      />
      <Typography variant="h5" component="div" sx={{ marginTop: 10 }}>
        Your Name
      </Typography>
      <div>
        <input type="file" accept="image/*" onChange={handleAvatarUpload} />
      </div>
      {/* <div>
        <TextField
          label="Status"
          variant="outlined"
          value={status}
          onChange={handleStatusChange}
          sx={{ marginTop: 10 }}
        />
        <Button
          variant="contained"
          onClick={handleSaveStatus}
          sx={{ marginTop: 10 }}
        >
          Save
        </Button>
      </div>
      <div>
        <h2>Login: Your Login</h2>
        <h2>Email: Your Email</h2>
        <List>
          {users.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.login} secondary={user.review} />
            </ListItem>
          ))}
        </List>
      </div> */}
      <Link className="text-my-green hover:text-black mt-3" to="/calculator">
        Анкета для отправки в Телеграм
      </Link>
    </CenteredContainer>
  )
}

export default ProfilePage
