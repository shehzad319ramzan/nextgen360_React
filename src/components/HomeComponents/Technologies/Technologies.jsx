import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { technologies, technologiesHeader } from '@/data/homeData';

const Technologies = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const firstRowVariants = {
        hidden: { x: '100%', opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 10,
                bounce: 0.7
            }
        })
    };

    const secondRowVariants = {
        hidden: { x: '-100%', opacity: 0 },
        visible: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 10,
                bounce: 0.7
            }
        })
    };

    return (
        <div className="text-center p-[30px] md:p-10 overflow-x-hidden">
            <div className="max-w-[1540px] mx-auto">
                <h2 className="text-[#0F4C8F] text-[24px] md:text-[28px] lg:text-[32px] font-[700] mb-3">
                    {technologiesHeader.title}
                </h2>
                <p className="text-[16px] lg:text-[18px] font-[600] mb-10">
                    {technologiesHeader.description}
                </p>
                <motion.div
                    ref={ref}
                    className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 w-full"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {technologies.slice(0, 5).map((tech, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={firstRowVariants}
                            className="w-[45%] md:w-[30%] lg:w-[25%] xl:w-[18%] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[4px_4px_8px_-1px_rgba(0,0,0,0.25)] p-4 hover:shadow-[6px_6px_8px_-8px_rgba(0,0,0,0.25)] hover:scale-105 duration-100"
                        >
                            <div className="flex items-center justify-center mb-2">
                                <img
                                    src={tech.image}
                                    alt={`${tech.name} icon`}
                                    className="w-[40px] h-auto sm:w-[60px] md:w-[80px]"
                                />
                            </div>
                            <span className="text-[16px] lg:text-[18px] font-[500]">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    ref={ref}
                    className="flex flex-wrap justify-center gap-5 sm:gap-6 md:gap-8 w-full mt-8"
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {technologies.slice(5).map((tech, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={secondRowVariants}
                            className="w-[45%] md:w-[30%] lg:w-[25%] xl:w-[18%] flex flex-col items-center justify-center bg-white rounded-[20px] shadow-[4px_4px_8px_-1px_rgba(0,0,0,0.25)] p-4 hover:shadow-[6px_6px_8px_-8px_rgba(0,0,0,0.25)] hover:scale-105 duration-100"
                        >
                            <div className="flex items-center justify-center mb-2">
                                <img
                                    src={tech.image}
                                    alt={`${tech.name} icon`}
                                    className="w-[40px] h-auto sm:w-[60px] md:w-[80px]"
                                />
                            </div>
                            <span className="text-[16px] lg:text-[18px] font-[500]">
                                {tech.name}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Technologies;