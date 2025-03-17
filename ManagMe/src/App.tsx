import React, { useState, useEffect } from 'react';
import ProjectForm from './components/ProjectForm';
import ProjectList from './components/ProjectList';
import StoryList from './components/StoryList';
import Layout from './layout/Layout';
import { Project } from './models/Project';
import { Story } from './models/Story';
import ProjectService from './services/projectService';
import userService from './services/userService';
import storyService from './services/storyService';
import { Container, Typography, Modal, Box, Button, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { motion } from 'framer-motion';
import './index.css';
import StoryForm from './components/StoryForm';


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
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [editingProject, setEditingProject] = useState<Project | undefined>(undefined);
  const [stories, setStories] = useState<Story[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<Story | undefined>(undefined);
  const currentUser = userService.getCurrentUser();

  useEffect(() => {
    setProjects(ProjectService.getAll());
  }, []);

  useEffect(() => {
    if (activeProject) {
      const projectStories = storyService.getAll(activeProject.id);
      setStories(projectStories);
    }
  }, [activeProject]);

  // Project handlers
  const handleProjectSave = (project: Project) => {
    if (editingProject) {
      setProjects(projects.map(p => p.id === project.id ? project : p));
    } else {
      setProjects([...projects, project]);
    }
    setEditingProject(undefined);
    setIsModalOpen(false);
  };

  const handleSetActiveProject = (project: Project) => {
    setActiveProject(project);
  };

  // Story handlers
  const handleStorySave = (story: Story) => {
    if (editingStory) {
      const updatedStory = storyService.update(story);
      setStories(stories.map(s => s.id === story.id ? updatedStory : s));
    } else {
      const newStory = storyService.add(story);
      setStories([...stories, newStory]);
    }
    setEditingStory(undefined);
    setIsStoryModalOpen(false);
  };

  const handleStoryEdit = (story: Story) => {
    setEditingStory(story);
    setIsStoryModalOpen(true);
  };

  const handleStoryDelete = (id: string) => {
    storyService.delete(id);
    setStories(stories.filter(s => s.id !== id));
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                ManagMe
              </Typography>
              <Typography variant="h6">
                {currentUser.firstName} {currentUser.lastName}
              </Typography>
            </Box>

            <Box sx={{ mb: 4, display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsModalOpen(true)}
              >
                ➕ Dodaj nowy projekt
              </Button>
              {activeProject && (
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setIsStoryModalOpen(true)}
                >
                  ➕ Dodaj historyjkę
                </Button>
              )}
            </Box>

            <ProjectList 
              projects={projects} 
              activeProject={activeProject}
              onEdit={handleEdit} 
              onDelete={handleDelete}
              onSetActive={handleSetActiveProject} 
            />

            {activeProject && (
              <Box sx={{ mt: 4 }}>
                <Typography variant="h5" gutterBottom>
                  Historyjki projektu: {activeProject.name}
                </Typography>
                <StoryList 
                  stories={stories}
                  onEdit={handleStoryEdit}
                  onDelete={handleStoryDelete}
                />
              </Box>
            )}
          </motion.div>
        </Container>

        {/* Project Modal */}
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box sx={{
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
          }}>
            <ProjectForm project={editingProject} onSave={handleProjectSave} />
          </Box>
        </Modal>

        {/* Story Modal */}
        <Modal open={isStoryModalOpen} onClose={() => setIsStoryModalOpen(false)}>
          <Box sx={{
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
          }}>
            <StoryForm 
              story={editingStory} 
              projectId={activeProject?.id || ''} 
              onSave={handleStorySave} 
            />
          </Box>
        </Modal>
      </Layout>
    </ThemeProvider>
  );
};

export default App;