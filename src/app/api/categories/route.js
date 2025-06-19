import { NextResponse } from 'next/server';

// This would typically come from your database
const categories = [
  {
    id: 1,
    name: 'Living Room',
    description: 'Transform your living space with our premium collection of sofas, recliners, and entertainment units.',
    image: 'https://i.pinimg.com/736x/b5/57/db/b557dbebd3293a12d6f47a6faa70108c.jpg',
    featuredProducts: [
      {
        id: 1,
        name: 'Modern Sofa Set',
        price: 49999,
        image: 'https://i.pinimg.com/736x/b5/57/db/b557dbebd3293a12d6f47a6faa70108c.jpg',
      },
      {
        id: 2,
        name: 'Recliner Chair',
        price: 24999,
        image: 'https://i.pinimg.com/736x/e3/e7/15/e3e715bb9f38bf17c997903c7264e073.jpg',
      },
    ],
  },
  {
    id: 2,
    name: 'Bedroom',
    description: 'Create your perfect sanctuary with our range of beds, wardrobes, and dressing tables.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    featuredProducts: [
      {
        id: 3,
        name: 'Queen Size Bed',
        price: 34999,
        image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      },
      {
        id: 4,
        name: 'Wardrobe',
        price: 29999,
        image: 'https://i.pinimg.com/736x/1c/4e/a0/1c4ea0a15f5731e5dc2066e79762ea67.jpg',
      },
    ],
  },
  {
    id: 3,
    name: 'Dining Room',
    description: 'Elevate your dining experience with our elegant dining sets and chairs.',
    image: 'https://i.pinimg.com/736x/87/bb/32/87bb327308c6bc42e8e08dbeaed61a24.jpg',
    featuredProducts: [
      {
        id: 5,
        name: 'Dining Table Set',
        price: 39999,
        image: 'https://i.pinimg.com/736x/87/bb/32/87bb327308c6bc42e8e08dbeaed61a24.jpg',
      },
      {
        id: 6,
        name: 'Bar Stools',
        price: 14999,
        image: 'https://i.pinimg.com/736x/e0/07/a0/e007a0fcb1f31cdd72f5a8d4bf5749eb.jpg',
      },
    ],
  },
  {
    id: 4,
    name: 'Office',
    description: 'Boost productivity with our ergonomic office furniture and storage solutions.',
    image: 'https://i.pinimg.com/736x/ed/f5/3e/edf53eba5c433b0bdadd56ca7bf0f19e.jpg',
    featuredProducts: [
      {
        id: 7,
        name: 'Office Chair',
        price: 12999,
        image: 'https://i.pinimg.com/736x/7a/6c/f4/7a6cf4b3af299fc65ad73a6accd0567d.jpg'
      },
      {
        id: 8,
        name: 'Work Desk',
        price: 19999,
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      },
    ],
  },
];

export async function GET() {
  try {
    // In a real application, you would fetch this data from your database
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 