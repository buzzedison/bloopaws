import { GraphQLClient } from "graphql-request";
import { createProjectMutation, createUserMutation, deleteProjectMutation, updateProjectMutation, getProjectByIdQuery, getProjectsOfUserQuery, getUserQuery, projectsQuery } from "../graphql";
import { ProjectForm } from "../common.types";

// Check for essential environment variables
if (!process.env.NEXT_PUBLIC_GRAFBASE_API_URL || !process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || !process.env.NEXT_PUBLIC_SERVER_URL) {
  throw new Error("Essential environment variables are not set.");
}

const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL : 'http://127.0.0.1:4000/graphql';
const apiKey = isProduction ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY : 'letmein';
const serverUrl = isProduction ? process.env.NEXT_PUBLIC_SERVER_URL : 'http://localhost:3000';

const client = new GraphQLClient(apiUrl);

export const fetchToken = async () => {
  try {
    const response = await fetch(`${serverUrl}/api/auth/token`);
    return response.json();
  } catch (err) {
    console.error("An error occurred in fetchToken:", err);
    throw err;
  }
};

export const uploadImage = async (imagePath: string) => {
  try {
    const response = await fetch(`${serverUrl}/api/upload`, {
      method: "POST",
      body: JSON.stringify({
        path: imagePath,
      }),
    });
    return response.json();
  } catch (err) {
    console.error("An error occurred in uploadImage:", err);
    throw err;
  }
};

const makeGraphQLRequest = async (query: string, variables: Record<string, any> = {}) => {
  try {
    return await client.request(query, variables);
  } catch (err) {
    console.error("An error occurred in makeGraphQLRequest:", err);
    throw err;
  }
};

export const fetchAllProjects = async (category?: string | null, endcursor?: string | null): Promise<any> => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(projectsQuery, { category, endcursor });
};

export const createNewProject = async (form: ProjectForm, creatorId: string, token: string): Promise<any> => {
  const imageUrl = await uploadImage(form.image);
  if (imageUrl.url) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageUrl.url,
        createdBy: {
          link: creatorId
        }
      }
    };
    return makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const updateProject = async (form: ProjectForm, projectId: string, token: string): Promise<any> => {
  function isBase64DataURL(value: string) {
    const base64Regex = /^data:image\/[a-z]+;base64,/;
    return base64Regex.test(value);
  }
  let updatedForm = { ...form };
  const isUploadingNewImage = isBase64DataURL(form.image);
  if (isUploadingNewImage) {
    const imageUrl = await uploadImage(form.image);
    if (imageUrl.url) {
      updatedForm = { ...updatedForm, image: imageUrl.url };
    }
  }
  client.setHeader("Authorization", `Bearer ${token}`);
  const variables = {
    id: projectId,
    input: updatedForm,
  };
  return makeGraphQLRequest(updateProjectMutation, variables);
};

export const deleteProject = async (id: string, token: string): Promise<any> => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return makeGraphQLRequest(deleteProjectMutation, { id });
};

export const getProjectDetails = async (id: string): Promise<any> => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectByIdQuery, { id });
};

export const createUser = async (name: string, email: string, avatarUrl: string): Promise<any> => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    input: {
      name: name,
      email: email,
      avatarUrl: avatarUrl
    },
  };
  return makeGraphQLRequest(createUserMutation, variables);
};

export const getUserProjects = async (id: string, last?: number): Promise<any> => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};

export const getUser = async (email: string): Promise<any> => {
  client.setHeader("x-api-key", apiKey);
  return makeGraphQLRequest(getUserQuery, { email });
};
