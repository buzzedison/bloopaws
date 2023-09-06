import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User',{
  name: g.string().length({ min:2, max:20 }),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({ min:20, max:400 }),
  githubUrl: g.url().optional(),
  linkedInUrl: g.url().optional(),
  projects: g.relation(),

})

const Project = g.model('Project',{ 
title: g.string().length({min:5, max:10})
}


export default config({
  schema: g
  
})
