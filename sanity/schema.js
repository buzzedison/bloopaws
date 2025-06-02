import blockContent from './schemas/blockContent'
import category from './schemas/category'
import post from './schemas/post'
import author from './schemas/author'
import career from './schemas/career'
import caseStudy from './schemas/caseStudy'

export const schema = {
  types: [post, author, category, blockContent, career, caseStudy],
}
