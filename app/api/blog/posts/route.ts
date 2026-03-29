import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

// Ensure directory exists
if (!fs.existsSync(postsDirectory)) {
  fs.mkdirSync(postsDirectory, { recursive: true })
}

export async function GET() {
  try {
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
          tags: data.tags || [],
          calculatorLink: data.calculatorLink || '',
        }
      })

    // Sort by date (newest first)
    allPosts.sort((a, b) => {
      if (a.date < b.date) return 1
      return -1
    })

    return NextResponse.json(allPosts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Generate slug from title
    const slug = data.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // Remove accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Create frontmatter
    const frontmatter = {
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      categoryColor: data.categoryColor,
      date: new Date().toISOString().split('T')[0],
      readTime: data.readTime,
      author: data.author,
      featured: data.featured,
      tags: data.tags,
      calculatorLink: data.calculatorLink,
    }

    // Create MDX content
    const mdxContent = `---
${Object.entries(frontmatter)
  .map(([key, value]) => {
    if (Array.isArray(value)) {
      return `${key}: [${value.map(v => `"${v}"`).join(', ')}]`
    }
    if (typeof value === 'boolean') {
      return `${key}: ${value}`
    }
    return `${key}: "${value}"`
  })
  .join('\n')}
---

${data.content}
`

    // Write file
    const filePath = path.join(postsDirectory, `${slug}.mdx`)
    fs.writeFileSync(filePath, mdxContent, 'utf8')

    return NextResponse.json({ success: true, slug })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }
}
