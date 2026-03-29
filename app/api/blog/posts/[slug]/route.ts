import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/blog')

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const fullPath = path.join(postsDirectory, `${params.slug}.mdx`)
    
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return NextResponse.json({
      slug: params.slug,
      ...data,
      content,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const data = await request.json()
    const fullPath = path.join(postsDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    // Create frontmatter
    const frontmatter = {
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      categoryColor: data.categoryColor,
      date: data.date,
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
    fs.writeFileSync(fullPath, mdxContent, 'utf8')

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const fullPath = path.join(postsDirectory, `${params.slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }

    fs.unlinkSync(fullPath)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
