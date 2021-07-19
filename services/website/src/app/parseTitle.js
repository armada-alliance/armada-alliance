import React from "react";

export default ({ title, highlight }) => {
    if (!highlight || !highlight.length) {
        return title;
    }

    const ex = title.split(highlight);
    const [ex1, ex2] = ex;

    let parts = [];

    if (ex1.length) {
        parts.push(<span>{ex1}</span>);
    }

    parts.push(<span className="text-primary-600">{highlight}</span>);

    if (ex2.length) {
        parts.push(<span>{ex2}</span>);
    }

    return <>{parts}</>;
};