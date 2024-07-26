'use client';
import { PlusIcon } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import SubmitButton from '../ui/submit-button';
// import { wait } from '@/lib/utils';
import { addProject } from '@/actions/project';
import { Input } from '../ui/input';
import { MAX_CHAR_COUNT } from '@/lib/constants';
import { useCharCount } from '@/hooks/useCharCount';

type ProjectType = 'Refinish' | 'Remodel' | 'Other';

export default function NewProject() {
  const [projectType, setProjectType] = useState<ProjectType>('Refinish');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { charCount, handleCharCountChange } = useCharCount(MAX_CHAR_COUNT);

  const action = async (formData: FormData) => {
    setError('');
    if (!title.trim()) {
      setError('Project must contain title');
      return;
    }
    formData.append('projectType', projectType as string);
    await addProject(formData);
    // await wait(2000);
    setIsDialogOpen(false);
  };

  const handleDescriptionChange = (input: string) => {
    setDescription(input);
    handleCharCountChange(input);
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="p-6 sm:p-4" onClick={() => setIsDialogOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
          <DialogDescription>
            Describe the project by the fields below. Once created, you will be
            able to add images to the specific project.
          </DialogDescription>
        </DialogHeader>
        <form action={action} className="flex flex-col space-y-8">
          <div className="space-y-2">
            <Label htmlFor="projectType">Project Type</Label>
            <Select
              onValueChange={v => setProjectType(v as ProjectType)}
              value={projectType}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select project type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Project Type</SelectLabel>
                  <SelectItem value="Refinish">Refinish</SelectItem>
                  <SelectItem value="Remodel">Remodel</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>

            <Input
              id="title"
              name="title"
              placeholder="Project 1"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">
              Project Description{' '}
              <span className="text-muted-foreground"> (Optional)</span>
            </Label>
            <div className="relative">
              <Textarea
                id="description"
                value={description}
                onChange={e => handleDescriptionChange(e.target.value)}
                name="description"
                placeholder="Give a description of the project..."
                maxLength={150}
              />
              <div className="absolute bottom-2 right-2 text-muted-foreground text-xs">
                {charCount}
              </div>
            </div>
          </div>
          <SubmitButton>Add Project</SubmitButton>
        </form>
      </DialogContent>
    </Dialog>
  );
}
