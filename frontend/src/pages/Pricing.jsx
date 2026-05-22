import { Link } from "react-router-dom"
import GuestHeader from "../layouts/GuestHeader.jsx"
import Footer from "../layouts/Footer.jsx"
import checkmarkIcon from "../assets/images/checkmark_icon.png"

const plans = [
    {
        name: "Bezmaksas",
        price: 0,
        description: "Pamata funkcijas privātpersonām, kas tikko sāk darbu.",
        features: [
            "Līdz 3 aktīvām aptaujām",
            "Līdz 100 atbildēm mēnesī",
            "Bāzes statistika",
            "Tikai publiskas aptaujas",
            "E-pasta atbalsts",
        ],
        cta: "Sākt bezmaksas",
        ctaLink: "/register",
        featured: false,
        outline: true,
    },
    {
        name: "Basic",
        price: 12,
        description: "Ideāls risinājums mazām komandām un augošiem projektiem.",
        badge: "Labākā vērtība",
        features: [
            "Viss no bezmaksas plāna",
            "Līdz 25 aktīvām aptaujām",
            "Līdz 2 000 atbildēm mēnesī",
            "Privātas un slēptas aptaujas",
            "Pielāgotas kategorijas",
            "E-pasta paziņojumi",
        ],
        cta: "Izvēlēties Basic",
        ctaLink: "/register",
        featured: true,
        outline: false,
    },
    {
        name: "Pro",
        price: 39,
        description: "Pilns rīku komplekts profesionāļiem un lielām komandām.",
        features: [
            "Viss no Basic plāna",
            "Neierobežotas aptaujas",
            "Neierobežotas atbildes",
            "Pilna analītika un CSV eksports",
            "API piekļuve",
            "Komandas sadarbība",
            "Prioritārs atbalsts",
        ],
        cta: "Izvēlēties Pro",
        ctaLink: "/register",
        featured: false,
        outline: false,
    },
]

function FeatureCheck({ featured }) {
    return (
        <div className={`w-5 h-5 shrink-0 rounded-full p-[3px] transition-colors
            ${featured ? "bg-primary" : "bg-gray-100"}`}>
            <img
                src={checkmarkIcon}
                alt=""
                className={`w-full h-full object-contain ${featured ? "brightness-0 invert" : ""}`}
            />
        </div>
    )
}

function Pricing() {
    return (
        <>
            <GuestHeader />

            <div className="w-full max-w-6xl mx-auto px-6 pb-5">
                <section className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                        Maksas plāni
                    </h1>
                    <p className="text-gray-500 text-lg max-w-lg mx-auto leading-relaxed">
                        Vienkārša un pārskatāma cenu noteikšana, kas aug kopā ar jums.
                        Izvēlieties plānu, kas vislabāk atbilst jūsu vajadzībām.
                    </p>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-2xl border p-8
                                ${plan.featured
                                    ? "border-primary shadow-xl shadow-primary/10"
                                    : "border-gray-200 shadow-sm"
                                }`}
                        >
                            {plan.badge && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                                    <span className="bg-primary-yellow text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full tracking-widest uppercase whitespace-nowrap">
                                        {plan.badge}
                                    </span>
                                </div>
                            )}

                            <div className="mb-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-1.5">{plan.name}</h2>
                                <p className="text-sm text-gray-400 leading-snug">{plan.description}</p>
                            </div>

                            <div className="mb-8">
                                <span className="text-5xl font-bold text-gray-900 tracking-tight">
                                    €{plan.price}
                                </span>
                                <span className="text-gray-400 text-sm ml-1.5">/mēn.</span>
                            </div>

                            <ul className="space-y-3 mb-10 flex-1">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-3 text-sm text-gray-700">
                                        <FeatureCheck featured={plan.featured} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                to={plan.ctaLink}
                                className={`w-full text-center py-3.5 rounded-lg font-semibold text-sm tracking-wide transition-all transform hover:-translate-y-0.5 shadow-lg
                                    ${plan.outline
                                        ? "border-2 border-primary/50 text-primary hover:bg-primary/5 shadow-transparent"
                                        : "bg-primary text-white hover:bg-primary/90 shadow-primary/20"
                                    }`}
                            >
                                {plan.cta}
                            </Link>
                        </div>
                    ))}
                </section>
            </div>

            <Footer />
        </>
    )
}

export default Pricing
