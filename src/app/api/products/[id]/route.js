import { NextResponse } from 'next/server';

// This would typically come from your database
const products = {
  1: {
    id: 1,
    name: 'Modern Sofa Set',
    price: 49999,
    rating: 4.5,
    description: 'Transform your living space with this elegant modern sofa set. Crafted with premium materials and designed for comfort, this sofa set features clean lines, plush cushions, and a contemporary aesthetic that will elevate any room.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1583845112203-4541f58c26ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1532372320572-cda25653a26f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1615873968403-89e068629265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    specifications: [
      { name: 'Material', value: 'Premium Fabric' },
      { name: 'Color', value: 'Gray' },
      { name: 'Dimensions', value: '240 x 90 x 85 cm' },
      { name: 'Weight', value: '85 kg' },
      { name: 'Assembly', value: 'Required' },
      { name: 'Warranty', value: '2 Years' },
    ],
    reviews: [
      {
        user: { name: 'John Doe' },
        rating: 5,
        date: '2024-02-15',
        comment: 'Excellent quality and very comfortable. The delivery was prompt and the assembly service was professional.',
      },
      {
        user: { name: 'Jane Smith' },
        rating: 4,
        date: '2024-02-10',
        comment: 'Beautiful sofa set, exactly as shown in the pictures. The only reason for 4 stars is that the assembly took longer than expected.',
      },
      {
        user: { name: 'Mike Johnson' },
        rating: 5,
        date: '2024-02-05',
        comment: 'Absolutely love this sofa set! The quality is outstanding and it looks even better in person.',
      },
    ],
  },
  // Add more products as needed
};

export async function GET(request, { params }) {
  try {
    const product = products[params.id];
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 