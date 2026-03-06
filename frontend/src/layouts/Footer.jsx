import Logo from "../components/Logo.jsx"

function Footer() {
    return (
        <footer className="w-full border-t border-gray-100 pt-10 pb-5 px-10">
            <div className="w-full">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="hidden lg:flex flex-col">
                        <Logo />
                        <p className="mt-4 text-gray-600 max-w-3xs">
                            Iepazīsti savu mērķauditoriju vieglāk un vienkāršāk.
                        </p>
                    </div>

                    <div className="lg:col-span-2 flex justify-center lg:justify-end lg:pr-12">
                        <div className="flex gap-16 md:gap-24 text-left">
                            <div className="flex flex-col">
                                <span className="font-semibold mb-3">Produkts</span>
                                <div className="flex flex-col space-y-2">
                                    <a href="/functions" className="text-gray-500 hover:text-black transition">Funkcijas</a>
                                    <a href="/pricing" className="text-gray-500 hover:text-black transition">Maksas plāni</a>
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-semibold mb-3">Uzņēmums</span>
                                <div className="flex flex-col space-y-2">
                                    <a href="/about" className="text-gray-500 hover:text-black transition">Par mums</a>
                                    <a href="/support" className="text-gray-500 hover:text-black transition">Kontakti</a>
                                    <a href="/business" className="text-gray-500 hover:text-black transition">Bizness</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-8 border-gray-200" />

                <div className="flex flex-col items-center gap-4 lg:flex-row lg:justify-between lg:pr-12">
                    <div className="flex gap-8 text-sm order-1 lg:order-2">
                        <a href="#" className="underline hover:text-gray-600">Privātuma politika</a>
                        <a href="#" className="underline hover:text-gray-600">Lietošanas noteikumi</a>
                    </div>
                    <p className="text-gray-500 text-sm order-2 lg:order-1">
                        &copy; 2026 Poller. Visas tiesības aizsargātas.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer