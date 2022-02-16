import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from './Button';

export default function BasicTExtFields({ title, setPassword, setEmail, handleAction }) {
  return (
    <div>
      <div className="headin-container">
        <h3>
          {title} Form
        </h3>
      </div>
      <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
        noValidate
        autoComplete="off">
        <TextField id="user" label="Enter you UserName" variant="outlined" onChange={(e) => setEmail(e.target.value)} />
        <TextField id="password" label="Enter you Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
      </Box>
      <Button title={title} handleAction={handleAction} />
    </div>
  );
}
