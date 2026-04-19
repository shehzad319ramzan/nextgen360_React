import React, { useState } from "react";
import { motion } from "framer-motion";
import styles from "./HoverGrid.module.scss";

const HoverGrid = () => {
    const [hoveredBox, setHoveredBox] = useState(null);

    const boxes = [
        { id: 1, defaultSize: "medium", className: styles.box1 },
        { id: 2, defaultSize: "small", className: styles.box2 },
        { id: 3, defaultSize: "large", className: styles.box3 },
        { id: 4, defaultSize: "medium", className: styles.box4 },
    ];

    const getSize = (boxId) => {
        if (hoveredBox === 2 && boxId === 2) return "large";
        if (hoveredBox === 2 && boxId === 3) return "small";

        if (hoveredBox === 1 && boxId === 1) return "large";
        if (hoveredBox === 1 && boxId === 3) return "medium";

        if (hoveredBox === 4 && boxId === 4) return "large";
        if (hoveredBox === 4 && boxId === 3) return "medium";

        return boxes.find((box) => box.id === boxId).defaultSize;
    };

    return (
        <div className={styles.container}>
            {boxes.map((box) => (
                <motion.div
                    key={box.id}
                    className={`${styles.box} ${styles[getSize(box.id)]} ${box.className}`}
                    onMouseEnter={() => setHoveredBox(box.id)}
                    onMouseLeave={() => setHoveredBox(null)}
                    layout
                />
            ))}
        </div>
    );
};

export default HoverGrid;