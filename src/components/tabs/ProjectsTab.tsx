
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const ProjectsTab = () => {
  const projects = [
    {
      id: 1,
      title: 'Sonic Fan Game',
      description: 'Building a 2D platformer with classic Sonic mechanics',
      status: 'In Progress',
      members: ['Alex', 'Sam', 'Jordan'],
      progress: 65
    },
    {
      id: 2,
      title: 'Sonic Music Remix',
      description: 'Remixing Green Hill Zone theme with modern beats',
      status: 'Completed',
      members: ['Riley', 'Casey'],
      progress: 100
    },
    {
      id: 3,
      title: 'Sonic Comic Series',
      description: 'Creating original Sonic adventures in comic format',
      status: 'Planning',
      members: ['Taylor', 'Morgan', 'Avery', 'Blake'],
      progress: 20
    },
    {
      id: 4,
      title: 'Speed Run Tournament',
      description: 'Organizing school Sonic speed run competition',
      status: 'In Progress',
      members: ['Jamie', 'Quinn'],
      progress: 45
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-500';
      case 'In Progress': return 'bg-sonic-blue';
      case 'Planning': return 'bg-sonic-gold';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div>
      <h2 className="sonic-text-gradient text-3xl font-bold mb-6 text-center">📋 Project Central</h2>
      
      <div className="mb-6 text-center">
        <Button className="sonic-gradient text-white mr-4 mb-2">
          ➕ Start New Project
        </Button>
        <Button variant="outline" className="border-sonic-blue text-sonic-blue mb-2">
          🤝 Join Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="tab-hover border-sonic-blue/30 hover:border-sonic-blue">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-sonic-blue">{project.title}</CardTitle>
                <Badge className={getStatusColor(project.status) + ' text-white'}>
                  {project.status}
                </Badge>
              </div>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-sonic-blue to-sonic-electric h-2 rounded-full transition-all duration-300"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Team Members:</p>
                <div className="flex flex-wrap gap-1">
                  {project.members.map((member, index) => (
                    <span key={index} className="text-xs bg-sonic-lightblue/20 px-2 py-1 rounded">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="sonic-gradient text-white flex-1">
                  View Details
                </Button>
                <Button size="sm" variant="outline" className="border-sonic-blue text-sonic-blue">
                  💬 Chat
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card className="bg-gradient-to-r from-sonic-blue/10 to-sonic-electric/10">
          <CardHeader>
            <CardTitle className="text-sonic-blue text-center">🏆 Project Showcase</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-4">
              Share your completed projects with the community!
            </p>
            <Button className="sonic-gradient text-white">
              Submit to Showcase ⚡
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
