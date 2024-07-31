'use client';
import React, { useEffect, useState } from 'react';
import { Project, ProjectImage } from '@prisma/client';
import { GroupedArray } from '@/lib/types';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { PencilIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Input } from '../ui/input';
import SubmitButton from '../ui/submit-button';
import { Textarea } from '../ui/textarea';
import { useCharCount } from '@/hooks/useCharCount';
import { MAX_CHAR_COUNT } from '@/lib/constants';
import { wait } from '@/lib/utils';
import { updateProject } from '@/actions/project';
import { Label } from '../ui/label';

type EditedFormFields = {
  title: string;
  description: string;
  imageData: {
    id: string;
    key: string;
    pairId: string | null;
  }[];
};

const EditProject = ({
  project,
  groupedImagesArray,
}: {
  project: Project;
  groupedImagesArray: GroupedArray<ProjectImage>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [formFields, setFormFields] = useState<EditedFormFields>({
    title: project.title,
    description: project.description ?? '',
    imageData: [],
  });
  const [selectedPairs, setSelectedPairs] = useState<Set<string>>(new Set());
  const { charCount, handleCharCountChange } = useCharCount(MAX_CHAR_COUNT);
  useEffect(() => {
    console.log('Selected Pairs: ', selectedPairs);
    console.log('Image Data: ', formFields.imageData);
  }, [selectedPairs, formFields?.imageData]);

  if (!pathname.includes('/admin')) return null;

  const handleEditProject = async (formData: FormData) => {
    console.log('handleEditProj called');
    await wait(2000);
    formData.append('imageData', JSON.stringify(formFields?.imageData));
    formData.append('projectId', project.id);
    await updateProject(formData);
  };

  const handleFormFieldsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    if (name === 'description') {
      handleCharCountChange(value);
    }
    setFormFields(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSelectedImagePair = (pairId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedPairs(prevSelectedPairs => {
      const newSelectedPairs = new Set(prevSelectedPairs);
      let newImageData = new Set(formFields?.imageData || []);

      if (newSelectedPairs.has(pairId)) {
        newSelectedPairs.delete(pairId);
        const selectedImages = groupedImagesArray.find(
          img => img.pairId === pairId,
        );
        if (selectedImages) {
          selectedImages.items.forEach(img => {
            newImageData = new Set(
              Array.from(newImageData).filter(item => item.id !== img.id),
            );
          });
        }
      } else {
        newSelectedPairs.add(pairId);
        const selectedImages = groupedImagesArray.find(
          img => img.pairId === pairId,
        );
        if (selectedImages) {
          selectedImages.items.forEach(img => {
            newImageData.add({
              id: img.id,
              key: img.imageKey,
              pairId: img.pairId,
            });
          });
        }
      }

      setFormFields(prevValues => ({
        ...prevValues,
        imageData: Array.from(newImageData),
      }));

      return newSelectedPairs;
    });
  };

  const handleDeselectAll = (e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedPairs(new Set());
    setFormFields(prevValues => ({
      ...prevValues,
      imageData: [],
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="absolute top-2 right-2" variant="outline">
          <PencilIcon className="mr-2 w-4 h-4" /> Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>{project.title}</DialogTitle>
        <DialogDescription></DialogDescription>
        <div className="space-y-6">
          <form className="space-y-4" action={handleEditProject}>
            <div className="space-y-2">
              <Label htmlFor="Title">Title</Label>
              <Input
                name="title"
                value={formFields?.title || ''}
                onChange={handleFormFieldsChange}
                placeholder="Project Title"
              />
            </div>
            <div className="relative">
              <div className="space-y-2">
                <Label htmlFor="description">
                  Project Description{' '}
                  <span className="text-muted-foreground"> (Optional)</span>
                </Label>
                <Textarea
                  id="description"
                  value={formFields.description}
                  onChange={e => handleFormFieldsChange(e)}
                  name="description"
                  placeholder="Give a description of the project..."
                  maxLength={150}
                />
              </div>
              <div className="absolute bottom-2 right-2 text-muted-foreground text-xs">
                {charCount}
              </div>
            </div>
            <div className="flex flex-col items-center sm:flex-row gap-2">
              <Button type="button" onClick={e => handleDeselectAll(e)}>
                Deselect All
              </Button>
              <p className="text-xs text-muted-foreground">
                Select images to delete.
              </p>
              <span className="text-xs text-muted-foreground">
                {selectedPairs.size} / {groupedImagesArray.length}
              </span>
            </div>
            <div>
              <ul className=" flex flex-col items-center justify-center w-full">
                {groupedImagesArray.map(({ pairId, items }) => (
                  <li
                    key={pairId}
                    onClick={e => handleSelectedImagePair(pairId, e)}
                    className={`cursor-pointer ${
                      selectedPairs.has(pairId)
                        ? 'border-2 border-blue-500'
                        : ''
                    }`}
                  >
                    <div className="flex flex-col gap-2 overflow-y-scroll max-h-64">
                      {items.map(item => (
                        <div key={item.id}>
                          <h3 className="text-muted-foreground">
                            {item.imageType}
                          </h3>
                          <img src={item.imageUrl} alt={item.imageType} />
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 sm:self-end w-full">
              <DialogClose asChild>
                <Button type="button">Close</Button>
              </DialogClose>
              <SubmitButton>Save</SubmitButton>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProject;
