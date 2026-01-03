import React from "react";
import MainMenu from "./MainMenu";
import GRCBackground from "./GRCBackground";

const GRCView: React.FC = () => {
    return (
        <div className="relative min-h-screen bg-transparent">
            {/* Background */}
            <GRCBackground />

            {/* Top Menu */}
            <MainMenu />

            {/* GRC Content */}
            <div className="relative z-10 p-8 text-center text-white">
                <h1 className="text-4xl font-bold">GRC Governance</h1>
                <p className="mt-4 text-lg text-slate-300">
                    Welcome to the GRC Governance section. Here you can find information
                    about governance, risk, and compliance.
                </p>
            </div>
        </div>
    );
};

export default GRCView;
