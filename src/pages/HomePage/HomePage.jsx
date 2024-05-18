import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage() {
    const navigateTo = useNavigate();
    useEffect(() => {
        navigateTo("/groups");
        return () => {};
    });
    return <div>Welcome to iBudget</div>;
}
