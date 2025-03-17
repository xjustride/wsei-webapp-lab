import { Story, StoryStatus } from '../models/Story';

class StoryService {
  private stories: Story[] = [];

  getAll(projectId: string): Story[] {
    return this.stories.filter(story => story.projectId === projectId);
  }

  getByStatus(projectId: string, status: StoryStatus): Story[] {
    return this.getAll(projectId).filter(story => story.status === status);
  }

  add(story: Story): Story {
    this.stories.push(story);
    return story;
  }

  update(story: Story): Story {
    const index = this.stories.findIndex(s => s.id === story.id);
    if (index !== -1) {
      this.stories[index] = story;
    }
    return story;
  }

  delete(id: string): void {
    this.stories = this.stories.filter(story => story.id !== id);
  }
}

export default new StoryService();