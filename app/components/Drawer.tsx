// components/Drawer.tsx
'use client';

import { useState, useEffect } from 'react';

interface DrawerProps {
  isOpen: boolean;
  toggleDrawer: () => void;
}

interface Prompt {
  question: string;
  answer: string;
  isGenerating: boolean;
}

export default function Drawer({ isOpen, toggleDrawer }: DrawerProps) {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [sampleAnswer, setSampleAnswer] = useState('');

  useEffect(() => {
    const fetchSampleAnswer = async () => {
      const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
      const host = process.env.VERCEL_URL || 'localhost:3000';
      const res = await fetch(`${protocol}://${host}/api/settings/answer`, {
        cache: 'no-store'
      });
      const data = await res.json();

      console.log('answer', data);
      setSampleAnswer(data);
    };
    fetchSampleAnswer();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newPrompt: Prompt = {
      question: inputValue,
      answer: '',
      isGenerating: true
    };

    setPrompts([newPrompt, ...prompts]);
    setInputValue('');

    let generatedAnswer = '';
    for (let i = 0; i < sampleAnswer.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 50));
      generatedAnswer += sampleAnswer[i];
      setPrompts((prevPrompts) => [
        {
          ...prevPrompts[0],
          answer: generatedAnswer,
          isGenerating: i < sampleAnswer.length - 1
        },
        ...prevPrompts.slice(1)
      ]);
    }
  };

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white shadow-lg transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300 ease-in-out`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Drawer</h2>
          <button
            onClick={toggleDrawer}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {prompts.map((prompt, index) => (
            <div key={index} className="mb-4">
              <p className="font-semibold">{prompt.question}</p>
              <p className="mt-1">
                {prompt.answer}
                {prompt.isGenerating && (
                  <span className="animate-pulse">|</span>
                )}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="p-4 border-t">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter your prompt"
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
