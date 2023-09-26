"use client"
import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import FormField from './FormField';
import Button from './Button';
import CustomMenu from './CustomMenu';
import { categoryFilters } from '../../../constant';
import { updateProject, createNewProject, fetchToken } from '../../../lib/actions';
import { FormState, ProjectInterface, SessionInterface } from '../../../common.types';

type Props = {
  type: string,
  session: SessionInterface,
  project?: ProjectInterface
}

const ProjectForm = ({ type, session, project }: Props) => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<FormState>({
    title: project?.title || "",
    description: project?.description || "",
    image: project?.image || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || ""
  });

  const handleStateChange = (fieldName: keyof FormState, value: string) => {
    setForm((prevForm) => ({ ...prevForm, [fieldName]: value }));
  };

  const handleChangeImage = (event: ChangeEvent<HTMLInputElement>) => {
    // Your existing image change handling logic
  };

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    // Your existing form submission logic

    setSubmitting(false);
  }

  return (
    <form onSubmit={handleFormSubmit} className="bg-white rounded-lg shadow p-8">
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-grey-darkest">Project Image</label>
     
       <input
       title={form.image}
          type="file"
          className="border py-2 px-3 text-grey-darkest"
          onChange={handleChangeImage}
        />
      </div>
      
      <FormField 
        title="Title" 
        state={form.title} 
        placeholder="Your Project Title" 
        setState={(value) => handleStateChange('title', value)} 
      />

      <FormField 
        title="Description" 
        state={form.description} 
        placeholder="Your Project Description" 
        isTextArea 
        setState={(value) => handleStateChange('description', value)} 
      />

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-grey-darkest">Website URL</label>
        <input
          type="url"
          className="border py-2 px-3 text-grey-darkest"
          placeholder="https://yourwebsite.com"
          value={form.liveSiteUrl}
          onChange={(event) => handleStateChange('liveSiteUrl', event.target.value)}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-grey-darkest">GitHub URL</label>
        <input
          type="url"
          className="border py-2 px-3 text-grey-darkest"
          placeholder="https://github.com/yourusername"
          value={form.githubUrl}
          onChange={(event) => handleStateChange('githubUrl', event.target.value)}
        />
      </div>

      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-grey-darkest">Category</label>
        <select
          className="border py-2 px-3 text-grey-darkest"
          value={form.category}
          title={form.category}
          onChange={(event) => handleStateChange('category', event.target.value)}
        >
          {/* Map over your category options here */}
        </select>
      </div>

      <button
        type="submit"
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${submitting && 'opacity-50 cursor-not-allowed'}`}
        disabled={submitting}
      >
        {submitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default ProjectForm;
