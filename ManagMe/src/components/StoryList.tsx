import React from 'react';
import { Story, StoryStatus } from '../models/Story';
import { Grid, Card, CardContent, Typography, Button, Chip, Box } from '@mui/material';

interface StoryListProps {
  stories: Story[];
  onEdit: (story: Story) => void;
  onDelete: (id: string) => void;
}

const StoryList: React.FC<StoryListProps> = ({ stories, onEdit, onDelete }) => {
  const getStatusColor = (status: StoryStatus) => {
    switch (status) {
      case StoryStatus.TODO: return 'error';
      case StoryStatus.DOING: return 'warning';
      case StoryStatus.DONE: return 'success';
      default: return 'default';
    }
  };

  return (
    <Grid container spacing={2}>
      {stories.map((story) => (
        <Grid item xs={12} key={story.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{story.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {story.description}
              </Typography>
              <Chip 
                label={story.status} 
                color={getStatusColor(story.status)} 
                size="small" 
                sx={{ mt: 1 }}
              />
              <Box sx={{ mt: 2 }}>
                <Button size="small" onClick={() => onEdit(story)}>Edit</Button>
                <Button size="small" color="error" onClick={() => onDelete(story.id)}>Delete</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StoryList;