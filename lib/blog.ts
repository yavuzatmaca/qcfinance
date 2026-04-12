import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: string
  categoryColor: string
  date: string
  readTime: string
  author: string
  featured: boolean
  seoKeywords?: string
  content?: string
}

export function getAllPosts(): BlogPost[] {
  // Check if directory exists
  if (!fs.existsSync(postsDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(postsDirectory)
  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.mdx'))
    .map(fileName => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        excerpt: data.excerpt,
        category: data.category,
        categoryColor: data.categoryColor,
        date: data.date,
        readTime: data.readTime,
        author: data.author,
        featured: data.featured || false,
        seoKeywords: data.seoKeywords,
      }
    })

  // Sort posts by date (newest first)
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      categoryColor: data.categoryColor,
      date: data.date,
      readTime: data.readTime,
      author: data.author,
      featured: data.featured || false,
      seoKeywords: data.seoKeywords,
      content,
    }
  } catch (error) {
    return null
  }
}

export function getFeaturedPosts(): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.featured)
}

export function getPostsByCategory(category: string): BlogPost[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.category === category)
}
