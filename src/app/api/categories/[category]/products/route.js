import { NextResponse } from 'next/server';

// This would typically come from your database
const products = {
  'living-room': [
    {
      id: 1,
      name: 'Modern Sofa Set',
      price: 49999,
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      rating: 4.5,
      material: 'Fabric',
      color: 'Gray',
    },
    {
      id: 2,
      name: 'Recliner Chair',
      price: 24999,
      image: 'https://i.pinimg.com/736x/94/8c/2a/948c2a6e661c042c7cf3e67a5ad138de.jpg',
      rating: 4.2,
      material: 'Leather',
      color: 'Brown',
    },
    {
      id: 9,
      name: 'Coffee Table',
      price: 15999,
      image: 'https://i.pinimg.com/736x/d6/c5/46/d6c546ef6f537534b621cdac3dbb3f43.jpg',
      rating: 4.0,
      material: 'Wood',
      color: 'Oak',
    },
    {
      id: 10,
      name: 'TV Unit',
      price: 29999,
      image: 'https://i.pinimg.com/736x/f8/4f/e6/f84fe61aac7c1376c84c641e6b9d4399.jpg',
      rating: 4.3,
      material: 'Engineered Wood',
      color: 'White',
    },
  ],
  'bedroom': [
    {
      id: 3,
      name: 'Queen Size Bed',
      price: 34999,
      image: 'https://i.pinimg.com/736x/50/60/c5/5060c544a6608fe3ff245d34a3d3c8bb.jpg',
      rating: 4.7,
      material: 'Wood',
      color: 'Walnut',
    },
    {
      id: 4,
      name: 'Wardrobe',
      price: 29999,
      image: 'https://i.pinimg.com/736x/b4/8c/cc/b48ccc3d08f1cf31f01578582ccac4a9.jpg',
      rating: 4.4,
      material: 'Engineered Wood',
      color: 'White',
    },
    {
      id: 11,
      name: 'Dressing Table',
      price: 19999,
      image: 'https://i.pinimg.com/736x/10/a6/dc/10a6dccee6ccea78ef0dd93f42c99657.jpg',
      rating: 4.1,
      material: 'Wood',
      color: 'Mahogany',
    },
    {
      id: 12,
      name: 'Night Stand',
      price: 8999,
      image: 'https://i.pinimg.com/736x/0c/36/11/0c361100e0d8d930fcbf4d779be4a5df.jpg',
      rating: 4.0,
      material: 'Wood',
      color: 'Oak',
    },
  ],
  'dining-room': [
    {
      id: 5,
      name: 'Dining Table Set',
      price: 39999,
      image: 'https://i.pinimg.com/736x/74/38/12/743812632ffc0beb75e38e179e612e7a.jpg',
      rating: 4.6,
      material: 'Wood',
      color: 'Teak',
    },
    {
      id: 6,
      name: 'Bar Stools',
      price: 14999,
      image: 'https://i.pinimg.com/736x/73/c6/88/73c6881f5a03ddae83d94e873e08bc10.jpg',
      rating: 4.3,
      material: 'Metal',
      color: 'Black',
    },
    {
      id: 13,
      name: 'Buffet Cabinet',
      price: 24999,
      image: 'https://i.pinimg.com/736x/fc/03/b4/fc03b445fbb140d3009ca97fb34ca81e.jpg',
      rating: 4.2,
      material: 'Wood',
      color: 'Cherry',
    },
    {
      id: 14,
      name: 'Sideboard',
      price: 19999,
      image: 'https://i.pinimg.com/736x/0c/16/b4/0c16b461c251dade6e03bb05dff22e87.jpg',
      rating: 4.1,
      material: 'Engineered Wood',
      color: 'Gray',
    },
  ],
  'office': [
    {
      id: 7,
      name: 'Office Chair',
      price: 5999,
      image: 'https://i.pinimg.com/736x/75/9a/05/759a05213df7a001e8812105f26b0204.jpg',
      rating: 4.4,
      material: 'Mesh',
      color: 'Black',
    },
    {
      id: 8,
      name: 'Work Desk',
      price: 19999,
      image: 'https://i.pinimg.com/736x/1d/36/2e/1d362eb5834b7fea8df1f8e1dd5843d9.jpg',
      rating: 4.5,
      material: 'Wood',
      color: 'Oak',
    },
    {
      id: 15,
      name: 'Bookshelf',
      price: 17999,
      image: 'https://i.pinimg.com/736x/d3/7e/e5/d37ee5afdf662ac27cc6c2bdcd2576ee.jpg',
      rating: 4.2,
      material: 'Engineered Wood',
      color: 'White',
    },
    {
      id: 16,
      name: 'Filing Cabinet',
      price: 14999,
      image: 'https://i.pinimg.com/736x/14/86/c9/1486c97f34c71091c9966dee0aba2afe.jpg',
      rating: 4.0,
      material: 'Metal',
      color: 'Gray',
    },
  ],
};

export async function GET(request, { params }) {
  try {
    const categoryProducts = products[params.category];
    
    if (!categoryProducts) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(categoryProducts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 