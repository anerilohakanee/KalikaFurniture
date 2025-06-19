import { NextResponse } from 'next/server';

// This would typically come from your database
const categories = {
  'living-room': {
    id: 1,
    name: 'Living Room',
    description: 'Transform your living space with our premium collection of sofas, recliners, and entertainment units.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  'bedroom': {
    id: 2,
    name: 'Bedroom',
    description: 'Create your perfect sanctuary with our range of beds, wardrobes, and dressing tables.',
    image: 'https://images.unsplash.com/photo-1505693314120-0d443867891c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  'dining-room': {
    id: 3,
    name: 'Dining Room',
    description: 'Elevate your dining experience with our elegant dining sets and chairs.',
    image: 'https://i.pinimg.com/736x/22/e9/22/22e922640c7450433cb3a61d41e8655c.jpg',
  },
  'office': {
    id: 4,
    name: 'Office',
    description: 'Boost productivity with our ergonomic office furniture and storage solutions.',
    image: 'https://i.pinimg.com/736x/34/29/4e/34294e20555f2523fd50e6f12a301527.jpg',
  },
};

export async function GET(request, { params }) {
  try {
    const category = categories[params.category];
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
} 