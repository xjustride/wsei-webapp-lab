import React from 'react';
import ProjectItem from './ProjectItem';
import { Project } from '../models/Project';
import { List, Paper, Typography } from '@mui/material'; // Usuń Box z importu

interface Props {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}

const ProjectList: React.FC<Props> = ({ projects, onEdit, onDelete }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
    >
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold', color: 'primary.main' }}>
        Lista projektów
      </Typography>
      {projects.length === 0 ? (
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Brak projektów do wyświetlenia. Dodaj nowy projekt!
        </Typography>
      ) : (
        <List sx={{ width: '100%' }}>
          {projects.map((project) => (
            <ProjectItem
              key={project.id}
              project={project}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </List>
      )}
    </Paper>
  );
};

export default ProjectList;