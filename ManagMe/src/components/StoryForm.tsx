import React, { useState, useEffect } from 'react';
import { Story } from '../models/Story';
import { TextField, Button, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

interface Props {
  story?: Story;
  projectId: string;
  onSave: (story: Story) => void;
}

const StoryForm: React.FC<Props> = ({ story, projectId, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'inProgress' | 'done'>('todo');
  const [error, setError] = useState('');

  useEffect(() => {
    if (story) {
      setTitle(story.title);
      setDescription(story.description);
      setStatus(story.status);
    }
  }, [story]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) {
      setError('Tytuł i opis są wymagane.');
      return;
    }
    setError('');

    const newStory: Story = {
      id: story?.id || Date.now().toString(),
      title,
      description,
      status,
      projectId,
      createdAt: story?.createdAt || new Date().toISOString(),
      updatedAt: story ? new Date().toISOString() : null,
    };

    onSave(newStory);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="space-y-4">
      {error && <Alert severity="error" className="mb-4">{error}</Alert>}
      <TextField
        label="Tytuł historyjki"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        variant="outlined"
        className="bg-gray-700 text-white"
      />
      <TextField
        label="Opis historyjki"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        variant="outlined"
        multiline
        rows={4}
        className="bg-gray-700 text-white"
      />
      <FormControl fullWidth className="bg-gray-700 text-white">
        <InputLabel>Status</InputLabel>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as 'todo' | 'inProgress' | 'done')}
          label="Status"
          className="bg-gray-700 text-white"
        >
          <MenuItem value="todo">Do zrobienia</MenuItem>
          <MenuItem value="inProgress">W trakcie</MenuItem>
          <MenuItem value="done">Zakończone</MenuItem>
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg w-full"
      >
        🚀 Zapisz historyjkę
      </Button>
    </Box>
  );
};

export default StoryForm;