import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styles from "./GoogleRating.module.scss";
import GoogleIcon from "../../../../assets/images/HomeImgs/GoogleIcon.svg";
import { FcGoogle } from "react-icons/fc";

const GoogleRating = ({ footer = false, rating }) => {
    rating = rating ?? 4.5;
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars > 0 && rating - filledStars < 1;
    const emptyStars = totalStars - filledStars - (hasHalfStar ? 1 : 0);

    return (
        <div className={styles.googleRating}>
            {footer ? (
                <FcGoogle size={60} />
            ) : (
                <img
                    src={GoogleIcon}
                    alt='Google Rating'
                    className={styles.googleLogo}
                />
            )}

            <div className={styles.ratingInfo}>
                <div className={styles.ratingText}>Google Rating</div>
                <div className={styles.starRow}>
                    <span className={styles.ratingNumber}>
                        {rating?.toFixed(1)}
                    </span>
                    {[...Array(filledStars)].map((_, i) => (
                        <FaStar
                            key={`full-${i}`}
                            className={styles.starIcon}
                        />
                    ))}
                    {hasHalfStar && (
                        <FaStarHalfAlt className={styles.starIcon} />
                    )}
                    {[...Array(emptyStars)].map((_, i) => (
                        <FaRegStar
                            key={`empty-${i}`}
                            className={styles.starIcon}
                        />
                    ))}
                </div>
                <a href="https://share.google/oggp725jGfFTccHbk" className={styles.viewReviews} target="_blank">See all our reviews</a>
            </div>
        </div>
    );
};

export default GoogleRating;
