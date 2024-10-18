import axios from 'axios';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const getAIResponse = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: 'mixtral-8x7b-32768',
        messages: messages,
      },
      {
        headers: {
          'Authorization': `Bearer ${GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    if (axios.isAxiosError(error) && !error.response) {
      throw new Error('Network error. Please check your internet connection.');
    }
    throw error;
  }
};