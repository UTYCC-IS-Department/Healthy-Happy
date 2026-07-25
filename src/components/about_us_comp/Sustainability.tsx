import { useTranslations } from "next-intl";

const Sustainability = () => {
    const t = useTranslations("AboutUs.sustainability");

    const buttons = [
        t("buttons.farm"),
        t("buttons.farmer"),
        t("buttons.esg"),
        t("buttons.sdgs"),
    ];

    return (
        <section id="sustainability1" className="bg-[#F8F5EC] py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Title */}
                <h2 className="text-4xl font-bold text-center mb-16">
                    {t("title")}
                </h2>
                <div className="grid lg:grid-cols-[320px_1fr] gap-16">
                    {/* LEFT */}
                    <div className="flex flex-col justify-between">

                        <div className="space-y-5">
                            {buttons.map((item) => (
                                <button
                                    key={item}
                                    className="
                                        w-full
                                        rounded-full
                                        bg-lime-500
                                        py-4
                                        font-bold
                                        text-black
                                        shadow-lg
                                        transition-all
                                        duration-300
                                        ease-in-out
                                        hover:translate-x-8
                                        hover:shadow-2xl
                                        hover:bg-lime-400
                                        active:translate-x-2
                                    "
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                        <div className="mt-16 bg-gray-300 p-8 rounded-md min-h-[120px] flex items-center justify-center">
                            <p className="font-semibold">
                                {t("description")}
                            </p>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="relative min-h-[520px]">
                        <div className="flex justify-center gap-10">
                            <div className="w-56 h-72 bg-pink-100 rounded-2xl"></div>
                            <div className="w-60 h-40 mt-16 bg-pink-100 rounded-2xl"></div>
                        </div>
                        <div className="mt-6">
                            <div className="mx-auto w-[75%] h-52 bg-pink-100 rounded-2xl"></div>
                        </div>
                        {/* SVG stays the same */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            viewBox="0 0 700 500"
                            preserveAspectRatio="none"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>
                                {/* Top Arrow Head */}
                                <marker
                                    id="topCurvedArrowHead"
                                    viewBox="0 0 10 10"
                                    refX="8"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto"
                                >
                                    <path
                                        d="M 1 1 L 8 5 L 1 9"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </marker>
                                {/* Left Arrow Head */}
                                <marker
                                    id="leftCurvedArrowHead"
                                    viewBox="0 0 10 10"
                                    refX="8"
                                    refY="5"
                                    markerWidth="6"
                                    markerHeight="6"
                                    orient="auto-start-reverse"
                                >
                                    <path
                                        d="M 1 1 L 9 5 L 1 9"
                                        fill="none"
                                        stroke="black"
                                        strokeWidth="1.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </marker>
                            </defs>
                            {/* TOP CURVED ARROW */}
                            <path
                                d="
                                    M 350 20
                                    L 360 20
                                    C 430 20 470 50 470 50
                                "
                                stroke="black"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                markerEnd="url(#topCurvedArrowHead)"
                            />
                            {/* LEFT CURVED ARROW */}
                            <path
                                d="
                                    M 100 120
                                    C 10 180 20 250 75 320
                                    C 90 335 105 345 125 350
                                    "
                                stroke="black"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                markerEnd="url(#leftCurvedArrowHead)"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Sustainability;