import { NextResponse } from 'next/server';
import { getStores, addStore, updateStore, deleteStore } from '@/lib/contactUtils';

// GET - Fetch all stores
export async function GET() {
  try {
    const activeStores = getStores();
    return NextResponse.json(activeStores, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stores' },
      { status: 500 }
    );
  }
}

// POST - Add new store
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, phone, email, hours, image, coordinates } = body;

    // Validate required fields
    if (!name || !address || !phone) {
      return NextResponse.json(
        { error: 'Name, address, and phone are required' },
        { status: 400 }
      );
    }

    const newStore = addStore({
      name,
      address,
      phone,
      email: email || 'mumbai@kalikafurniture.com',
      hours: hours || '9:30 AM - 9:00 PM',
      image: image || 'https://i.pinimg.com/736x/56/f6/bf/56f6bfb93086524f9cf4bd031e492237.jpg',
      coordinates: coordinates || { lat: 0, lng: 0 }
    });

    return NextResponse.json(
      { success: true, store: newStore },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create store' },
      { status: 500 }
    );
  }
}

// PUT - Update store
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'Store ID is required' },
        { status: 400 }
      );
    }

    const updatedStore = updateStore(id, updateData);
    if (!updatedStore) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, store: updatedStore },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update store' },
      { status: 500 }
    );
  }
}

// DELETE - Delete store (soft delete)
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));

    if (!id) {
      return NextResponse.json(
        { error: 'Store ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteStore(id);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Store not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Store deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete store' },
      { status: 500 }
    );
  }
} 