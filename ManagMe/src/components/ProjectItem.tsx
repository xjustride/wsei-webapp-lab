import React from 'react';
import { Project } from '../models/Project';
import { ListItem, ListItemText, ListItemSecondaryAction, IconButton, Chip, Avatar, Typography, Box } from '@mui/material'; // Dodaj Box do importu
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { motion } from 'framer-motion';

interface Props {
  project: Project;
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectItem: React.FC<Props> = ({ project, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <ListItem
        sx={{
          bgcolor: 'background.paper',
          mb: 2,
          borderRadius: 2,
          boxShadow: 1,
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 3,
          },
        }}
      >
        <Avatar sx={{ bgcolor: project.status === 'completed' ? 'success.main' : 'primary.main', mr: 2 }}>
          {project.name[0]}
        </Avatar>
        <ListItemText
          primary={
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {project.name}
            </Typography>
          }
          secondary={
            <>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {project.description}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                  🕒 Utworzono: {new Date(project.createdAt || '').toLocaleString()}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled', display: 'block' }}>
                  🔄 Ostatnia edycja: {project.updatedAt ? new Date(project.updatedAt).toLocaleString() : 'Nie edytowane'}
                </Typography>
              </Box>
            </>
          }
        />
        <ListItemSecondaryAction>
          <Chip
            label={project.status === 'completed' ? 'Zakończony' : 'Aktywny'}
            color={project.status === 'completed' ? 'success' : 'primary'}
            sx={{ mr: 2 }}
          />
          <IconButton onClick={() => onEdit(project)} color="primary">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(project.id)} color="error">
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </motion.div>
  );
};

export default ProjectItem;