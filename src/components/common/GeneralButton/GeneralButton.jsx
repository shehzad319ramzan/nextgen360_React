import React from "react";
import { Button } from "@/components/ui/button";
import styles from "./GeneralButton.module.scss";

const GeneralButton = ({ label, onClick, type = 'default' }) => {
    return (
        <Button
            onClick={onClick}
            className={`${styles.generalButton} ${styles[type]}`}
        >
            {label}
            <span className={styles.customIcon}>
                <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                        <rect x="8" y="4" width="7" height="7" fill="currentColor" />
                        <rect x="15" y="11" width="7" height="7" fill="currentColor" />
                        <rect x="8" y="18" width="7" height="7" fill="currentColor" />
                    </g>
                </svg>
            </span>
        </Button>
    );
};

export default GeneralButton;