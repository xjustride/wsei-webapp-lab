import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import Layout from './layout/Layout';
import { Project } from './models/Project';
import ProjectService from './services/projectService';
import { Container, Typography, Modal, Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import './index.css';

// Tworzymy niestandardowy motyw MUI
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Kolor główny
    },
    secondary: {
      main: '#dc004e', // Kolor akcentu
    },
    background: {
      default: '#f5f5f5', // Tło aplikacji
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProjects(ProjectService.getAll());
  }, []);

  const handleSave = (project: Project) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      setProjects([...projects, project]);
    }
    setEditingProject(undefined);
    setIsModalOpen(false);
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    ProjectService.delete(id);
    setProjects(projects.filter(p => p.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Container maxWidth="md" sx={{ py: 4 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
              ManagMe
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mb: 4 }}
              onClick={() => setIsModalOpen(true)}
            >
              ➕ Dodaj nowy projekt
            </Button>
            <ProjectList projects={projects} onEdit={handleEdit} onDelete={handleDelete} />
          </motion.div>
        </Container>

        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 600,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProjectForm project={editingProject} onSave={handleSave} />
            </motion.div>
          </Box>
        </Modal>
      </Layout>
    </ThemeProvider>
  );
};

export default App;