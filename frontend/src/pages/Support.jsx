import Header from "../layouts/Header.jsx"
import search_icon from "../assets/images/search_icon.png"
import user_settings_icon from "../assets/images/user_settings_icon.png"
import bar_chart_icon from "../assets/images/bar_chart_icon.png"
import admin_icon from "../assets/images/admin_icon.png"
import mail_icon from "../assets/images/mail_icon.png"
import {Link} from "react-router-dom"
import WithBackgroundBtn from "../components/WithBackgroundBtn.jsx"
import FAQItem from "../components/FAQItem.jsx"

function Support() {
    return (
        <>
        {/*<Header />*/}
        <div className="flex-1 mx-auto w-full px-6 py-12">
            <section className="text-center mb-16">
                <h1 className="font-bold text-4xl leading-tight mb-6">Kā mēs Jums varam palīdzēt?</h1>
                <div className="max-w-2xl mx-auto">
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <img src={search_icon} alt="Search"
                                className="w-6 h-6 transition-all duration-300" />
                        </div>
                        <input className="w-full h-16 pl-12 pr-4 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg transition-all"
                               placeholder="Meklē rakstus, pamācības un vairāk..."
                               type="text"
                        />
                    </div>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 lg:px-60">
                <Link to={'/settings'}>
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-100 p-6 hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center text-primary group-hover:bg-primary transition-all">
                        <img src={user_settings_icon} className="w-8 h-8 transition-all group-hover:brightness-0 group-hover:invert" />
                    </div>
                    <h3 className="text-2xl font-bold">Konta pārvaldība</h3>
                    <p className="text-gray-500 text-sm">Pārvaldi profilu, abonomentu, un vispārīgos iestatījumus.</p>
                </div>
                </Link>
                <Link to={'/dashboard'}>
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-100 p-6 hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center text-primary group-hover:bg-primary transition-all">
                        <img src={bar_chart_icon} className="w-8 h-8 transition-all group-hover:brightness-0 group-hover:invert" />
                    </div>
                    <h3 className="text-2xl font-bold">Aptaujas & Rezultāti</h3>
                    <p className="text-gray-500 text-sm">Veido pilnveidotas aptaujas un eksportē to reāllaika datus.</p>
                </div>
                </Link>
                <Link to={'/docs'}>
                <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-gray-100 p-6 hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="size-12 rounded-lg bg-gray-200 flex items-center justify-center text-primary group-hover:bg-primary transition-all ">
                        <img src={admin_icon} className="w-10 h-10 transition-all group-hover:brightness-0 group-hover:invert" />
                    </div>
                    <h3 className="text-2xl font-bold">Privātums & Drošība</h3>
                    <p className="text-gray-500 text-sm">Viss par datu šifrēšanu un datu aizsardzību mūsu sistēmā.</p>
                </div>
                </Link>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 mt-40 px-4 lg:px-28">
                <div className="flex flex-col justify-center">
                    <h2 className="text-4xl font-bold mb-6">Sazināties ar mums</h2>
                    <p className="text-gray-600 text-lg mb-8 leading-relaxed">Vai tev ir specifisks jautājums?</p>
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-gray-700">
                                <img src={mail_icon} className="w-6 h-6 transition-all group-hover:brightness-0 group-hover:invert" />
                                <span>support@poller.lv</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-100 p-8 rounded-2xl border border-gray-300 group hover:border-primary/80 duration-300 transition-all shadow-md">
                    <form className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">Vārds</label>
                                <input className="w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none h-11 p-2" placeholder="Jānis Bērziņš" type="text" autoComplete="off" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold">E-pasts</label>
                                <input className="w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none h-11 p-2" placeholder="janis@epasts.com" type="email" />
                            </div>
                        </div>
                        <label className="text-sm font-semibold">Tēma:</label>
                        <select className="w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-primary h-11 p-2 text-gray-600">
                            <option>Tehniskā problēma</option>
                            <option>Apmaksa & Rēķins</option>
                            <option>Funkcijas ieteikums</option>
                            <option>Cits</option>
                        </select>
                        <label className="text-sm font-semibold">Ziņa</label>
                        <textarea className="w-full rounded-lg border border-gray-300 focus:border-primary focus:ring-primary focus:outline-none min-h-30 p-2 text-gray-600" placeholder="Ziņa"></textarea>
                        <WithBackgroundBtn
                            text="Sūtīt"
                            type="submit"
                        />
                    </form>
                </div>

            </section>
            <section id="faq-section" className="max-w-3xl mx-auto mb-24">
                <h1 className="text-center text-3xl font-bold mb-12">Biežāk uzdotie jautājumi</h1>
                <div className="space-y-4">
                    <FAQItem
                        question="Kā eksportēt aptauju datus uz Excel?"
                        answer='Jūs varat eksportēt rezultātus "Rezultāti" sadaļā savai aptaujai, nospiežot "Eksportēt" pogu labajā augšējā stūrī. Mēs atbalstām CSV un XLSX formātus.'
                    />
                    <FAQItem
                        question="Vai ir maksimālais iesniegto balšu un atbilžu skaits?"
                        answer="Nē. Jūs varat gūt bezgalīgi daudz rezultātus uz Jūsu aptaujām. Iestatījumos ir iespējams ierobežot kāda veida lietotājiem ir piekļuve pie aptaujām."
                    />
                    <FAQItem
                        question="Vai var aptaujām pievienot savu logo?"
                        answer="Diemžēl šī opcija vēl nav pieejama. Vienīgais alternatīvs šim ir pievienot Jūsu logo kā aptaujas ilustratīvo attēlu."
                    />
                    <FAQItem
                        question="Kas notiek ar maniem un aptauju datiem, kad es atceļu abonomentu?"
                        answer="Nekas ar Jūsu datiem nenotiek, taču Jūs pazaudējat papildus funkcijas un privilēģijas, kuras nāk kopā ar abonomentu."
                    />
                    <FAQItem
                        question="Vai atbildes ir anonīmas noklusējumā?"
                        answer="Jā. Noklusējumā visas iesniegtās atbildes ir anonīmas, taču aptaujas veidotāji un administrācija var izslēgt anonimitāti atbildēm — par to arī tiek rakstīts aptaujas aprakstā."
                    />
                </div>
            </section>
        </div>
        </>
)
}

export default Support