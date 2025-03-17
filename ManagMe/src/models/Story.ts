export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
  }
  
  export enum StoryStatus {
    TODO = 'TODO',
    DOING = 'DOING',
    DONE = 'DONE'
  }
  
  export interface Story {
    id: string;
    title: string;
    description: string;
    priority: Priority;
    projectId: string;
    createdAt: Date;
    status: StoryStatus;
    ownerId: string;
  }