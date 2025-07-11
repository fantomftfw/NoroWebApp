import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// IMPORTANT: Move this to a .env.local file in a real application
const GEMINI_API_KEY = 'AIzaSyB2TUPrXR8qQNcLselSNq8twBklnCU40a4';

if (!GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY in environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { task } = await req.json();

    if (!task) {
      return NextResponse.json({ error: 'Task is required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `Break down the following task into exactly THREE simple, actionable sub-tasks: "${task}".
    Provide a realistic time estimate for each sub-task (e.g., "5 mins", "1 hour", "25 mins").
    Return the result as a JSON array of objects, where each object has a "task" and a "time" key.
    Example: [{"task": "Sub-task 1", "time": "15 mins"}, {"task": "Sub-task 2", "time": "30 mins"}, {"task": "Sub-task 3", "time": "1 hour"}].
    Do not include any other text or markdown formatting in your response.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    // Clean the response to ensure it's valid JSON
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let subTasks = JSON.parse(jsonString);

    if (!Array.isArray(subTasks) || subTasks.length === 0 || !subTasks[0].task || !subTasks[0].time) {
        throw new Error('Invalid response format from AI');
    }

    // Prepend the guaranteed low-effort task
    subTasks.unshift({ task: "Take a deep breath", time: "1 min" });

    return NextResponse.json({ subTasks });

  } catch (error) {
    console.error('Error generating sub-tasks:', error);
    return NextResponse.json({ error: 'Failed to generate sub-tasks' }, { status: 500 });
  }
} 