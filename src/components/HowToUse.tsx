

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
        image: '/placeholder.png',
    },
    {
        title: 'Collaborate with Team',
        description: 'Invite your team members to review and comment on specific lines.',
        image: '/placeholder.png',
    },
    {
        title: 'Implement Suggestions',
        description: 'Review feedback and implement suggested changes seamlessly.',
        image: '/placeholder.png',
    },
];

const HowToUse: React.FC = () => {
    return (
        <section id="how-to-use" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-semibold text-center text-gray-100">How It Works</h2>
                <p className="mt-4 text-center text-gray-400">
                    Follow these simple steps to enhance your code review process.
                </p>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center bg-gray-800 p-6 rounded-md shadow-md">
                            <div className="w-24 h-24 relative">
                                <Image
                                    src={step.image}
                                    alt={`${step.title} Image`}
                                    layout="fill"
                                    objectFit="contain"
                                    className="rounded-md"
                                />
                            </div>
                            <h3 className="mt-6 text-xl font-semibold text-gray-100">{step.title}</h3>
                            <p className="mt-2 text-gray-400">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowToUse;