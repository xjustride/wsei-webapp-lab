import React, { useState, useEffect } from 'react';
import ProjectService from '../services/projectService';
import { Project } from '../models/Project';
import { TextField, Button, Box, Alert, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { motion } from 'framer-motion';

interface Props {
  project?: Project;
  onSave: (project: Project) => void;
}

const ProjectForm: React.FC<Props> = ({ project, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'active' | 'completed'>('active');
  const [error, setError] = useState('');

  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
      setStatus(project.status || 'active');
    }
  }, [project]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description) {
      setError('Nazwa i opis są wymagane.');
      return;
    }
    setError('');

    const newProject: Project = {
      id: project?.id || Date.now().toString(),
      name,
      description,
      status,
      createdAt: project?.createdAt || new Date().toISOString(),
      updatedAt: project ? new Date().toISOString() : null,
    };

    if (project) {
      ProjectService.update(newProject);
    } else {
      ProjectService.create(newProject);
    }
    onSave(newProject);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Nazwa projektu"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          variant="outlined"
        />
        <TextField
          label="Opis projektu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          variant="outlined"
          multiline
          rows={4}
        />
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value as 'active' | 'completed')}
            label="Status"
          >
            <MenuItem value="active">Aktywny</MenuItem>
            <MenuItem value="completed">Zakończony</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          🚀 Zapisz projekt
        </Button>
      </Box>
    </motion.div>
  );
};

export default ProjectForm;