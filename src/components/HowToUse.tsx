

// src/components/HowToUse.tsx
import React from 'react';
import Image from 'next/image';

interface Step {
    title: string;
    description: string;
    image: string;
}

const steps: Step[] = [
    {
        title: 'Upload Your Code',
        description: 'Easily upload your code snippets in various programming languages.',
        image: '/upload_illustration.png',
    },
    {
        title: 'Collaborate with Team',
        description: 'Comment on specific lines of code with your team',
        image: '/comment_illustration.png',
    },
    {
        title: 'Implement Suggestions',
        description: 'Review feedback and implement suggested changes seamlessly.',
        image: '/suggestion_illustration.png',
    },
];

const HowToUse: React.FC = () => {
    return (
        <section id="how-to-use" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-100 mb-4">How It Works</h2>
                <p className="text-center text-gray-400 mb-12">
                    Follow these simple steps to enhance your code review process.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-lg shadow-lg">
                            <div className="w-full h-48 relative mb-6">
                                <Image
                                    src={step.image}
                                    alt={`${step.title} illustration`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-md"
                                />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">{step.title}</h3>
                            <p className="text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToUse;