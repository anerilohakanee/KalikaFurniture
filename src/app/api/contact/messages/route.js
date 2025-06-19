import { NextResponse } from 'next/server';
import { getMessages, updateMessageStatus, deleteMessage } from '@/lib/contactUtils';

// GET - Fetch all messages (with pagination)
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status'); // 'read', 'unread', 'all'

    const result = getMessages(page, limit, status);

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    );
  }
}

// POST - Mark message as read/unread
export async function POST(request) {
  try {
    const body = await request.json();
    const { messageId, status } = body;

    if (!messageId || !status) {
      return NextResponse.json(
        { error: 'Message ID and status are required' },
        { status: 400 }
      );
    }

    const updatedMessage = updateMessageStatus(messageId, status);
    if (!updatedMessage) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: updatedMessage },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

// DELETE - Delete message
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const messageId = searchParams.get('id');

    if (!messageId) {
      return NextResponse.json(
        { error: 'Message ID is required' },
        { status: 400 }
      );
    }

    const deleted = deleteMessage(messageId);
    if (!deleted) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Message deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete message' },
      { status: 500 }
    );
  }
}

// Function to add new message (called from contact route)
export function addMessage(messageData) {
  const newMessage = {
    id: Date.now().toString(),
    ...messageData,
    status: 'unread',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  contactMessages.unshift(newMessage);
  return newMessage;
} 