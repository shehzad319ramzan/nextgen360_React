import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DynamicHero from "@/components/Solutions/DynamicHero";
import FeaturesComponent from "@/components/Solutions/Features";
import SolutionMiddleSection from "@/components/Solutions/SolutionMiddleSection";
import PageSEO from "@/components/common/PageSEO/PageSEO";

const Solutions = () => {
    const { solution } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!solution) return;
        setLoading(true);
        fetch(`${import.meta.env.VITE_BACKEND_URL_API}/solutions/${solution}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                setItem(data && !data.error ? data : null);
                setLoading(false);
                window.scrollTo(0, 0);
            })
            .catch(() => {
                setItem(null);
                setLoading(false);
            });
    }, [solution]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div
                    className="w-8 h-8 border-2 rounded-full animate-spin"
                    style={{ borderColor: "#388ECA30", borderTopColor: "#388ECA" }}
                />
            </div>
        );
    }

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-5">
                <h2 className="text-2xl font-bold mb-2 text-[#0F4C8F]">Solution Not Found</h2>
                <p className="text-gray-500 text-sm">This solution doesn't exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div>
            <PageSEO
                page={`solution-${item.slug?.toLowerCase()}`}
                fallback={{ path: `/solutions/${item.slug}`, title: item.title }}
            />

            <DynamicHero
                title={item.hero_title || item.title}
                description={item.hero_description || item.tagline}
                image={item.hero_image}
            />

            <FeaturesComponent
                title={item.features_title}
                description={item.features_description}
                image={[{ images: { url: item.features_image } }]}
                why={(item.features_points || []).map((p) => ({ title: p }))}
            />

            <SolutionMiddleSection
                name={item.title}
                title={item.key_features_title}
                blocks={item.key_features || []}
                websiteLink={item.website_link}
                image={[{ images: { url: item.key_features_image } }]}
            />
        </div>
    );
};

export default Solutions;
