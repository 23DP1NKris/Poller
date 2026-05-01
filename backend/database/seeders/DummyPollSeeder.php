<?php

namespace Database\Seeders;

use App\Models\Poll;
use App\Models\PollOption;
use App\Models\PollQuestion;
use App\Models\PollResponse;
use App\Models\PollResponseAnswer;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DummyPollSeeder extends Seeder
{
    public function run(): void
    {
        $demo = User::firstOrCreate(
            ['email' => 'demo@poller.lv'],
            [
                'username' => 'PollerDemo',
                'password' => Hash::make('password'),
                'role'     => 'user',
            ]
        );

        $polls = [
            [
                'title'       => 'Kāds ir tavs iecienītākais gadalaiks?',
                'description' => 'Pastāsti, kurā gadalaikā jūties visenerģiskāk un kāpēc.',
                'categories'  => ['Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Kurš gadalaiks ir tavs mīļākais?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Pavasaris', 'Vasara', 'Rudens', 'Ziema'],
                    ],
                    [
                        'text'     => 'Ko tu parasti dari šajā gadalaikā?',
                        'multiple' => true,
                        'required' => false,
                        'options'  => ['Esmu ārā dabā', 'Lasu grāmatas', 'Ceļoju', 'Sporto', 'Pavadu laiku ar ģimeni'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādu transportu izmanto, dodoties uz darbu?',
                'description' => 'Palīdzi mums saprast Latvijas iedzīvotāju ikdienas pārvietošanās paradumus.',
                'categories'  => ['Transports', 'Ikdiena'],
                'questions'   => [
                    [
                        'text'     => 'Kādu transportlīdzekli izmanto biežāk?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Automašīna', 'Sabiedriskais transports', 'Velosipēds', 'Skrejritenis', 'Eju kājām'],
                    ],
                    [
                        'text'     => 'Cik ilgi ilgst tavs ceļš uz darbu?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Līdz 15 minūtēm', '15–30 minūtes', '30–60 minūtes', 'Vairāk nekā stundu'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāda mūzika tev patīk visvairāk?',
                'description' => 'Mūzikas gaumes aptauja Latvijas iedzīvotājiem.',
                'categories'  => ['Mūzika', 'Kultūra'],
                'questions'   => [
                    [
                        'text'     => 'Kāds ir tavs iecienītākais mūzikas žanrs?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Pop', 'Roks', 'Elektroniskā mūzika', 'Klasiskā mūzika', 'Hip-hop', 'Latviešu tautas mūzika'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāds sports tev patīk?',
                'description' => 'Noskaidrosim, kādi sporta veidi ir populārākie Latvijā.',
                'categories'  => ['Sports', 'Veselība'],
                'questions'   => [
                    [
                        'text'     => 'Kādus sporta veidus tu praktizē?',
                        'multiple' => true,
                        'required' => true,
                        'options'  => ['Skriešana', 'Peldēšana', 'Riteņbraukšana', 'Futbols', 'Basketbols', 'Volejbols', 'Vingrošana'],
                    ],
                    [
                        'text'     => 'Cik bieži tu sporto?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Katru dienu', 'Vairākas reizes nedēļā', 'Reizi nedēļā', 'Retāk'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādas ir tavas iecienītākās filmas?',
                'description' => 'Pastāsti par savām kinematogrāfijas izlasēm.',
                'categories'  => ['Kultūra', 'Izklaide'],
                'questions'   => [
                    [
                        'text'     => 'Kāds ir tavs iecienītākais filmas žanrs?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Komēdija', 'Drāma', 'Trileris', 'Darbības filma', 'Fantastika', 'Dokumentāla filma'],
                    ],
                    [
                        'text'     => 'Kur tu parasti skaties filmas?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Kinoteātrī', 'Mājās uz televizora', 'Straumēšanas servisā', 'Datora ekrānā'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāds ir tavs iecienītākais ēdiens?',
                'description' => 'Latvijas kulinārijas gaumes pētījums.',
                'categories'  => ['Ēdiens', 'Kultūra'],
                'questions'   => [
                    [
                        'text'     => 'Ko tu ēd biežāk?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Gaļas ēdieni', 'Zivju ēdieni', 'Veģetārie ēdieni', 'Vegāniskie ēdieni'],
                    ],
                    [
                        'text'     => 'Kāda ir tava iecienītākā latviešu ēdiena sastāvdaļa?',
                        'multiple' => true,
                        'required' => false,
                        'options'  => ['Kartupeļi', 'Maize', 'Skābie kāposti', 'Zirņi', 'Speķis', 'Bietes'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādus sociālos tīklus tu izmanto?',
                'description' => 'Noskaidrosim, kādi sociālie tīkli ir populārākie Latvijā.',
                'categories'  => ['Tehnoloģijas', 'Ikdiena'],
                'questions'   => [
                    [
                        'text'     => 'Kurus sociālos tīklus tu izmanto regulāri?',
                        'multiple' => true,
                        'required' => true,
                        'options'  => ['Facebook', 'Instagram', 'TikTok', 'X (Twitter)', 'LinkedIn', 'YouTube', 'Draugiem.lv'],
                    ],
                    [
                        'text'     => 'Cik stundu dienā tu pavadi sociālajos tīklos?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Līdz 30 minūtēm', '30 min – 1 stunda', '1–3 stundas', 'Vairāk nekā 3 stundas'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāds ir tavs iecienītākais ceļojuma galamērķis?',
                'description' => 'Pastāsti, kur tu vēlētos doties ceļojumā.',
                'categories'  => ['Ceļojumi', 'Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Kādu ceļojuma veidu tu dod priekšroku?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Pludmales atpūta', 'Kalnu tūrisms', 'Pilsētu tūrisms', 'Ekotūrisms', 'Kruīzs'],
                    ],
                    [
                        'text'     => 'Kāds ir tavs sapņu galamērķis?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Āzija', 'Dienvidamerika', 'Āfrika', 'Ziemeļamerika', 'Eiropa', 'Austrālija'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāda ir tava darba vide?',
                'description' => 'Pētījums par darba vietām un attālinātā darba paradumiem Latvijā.',
                'categories'  => ['Darbs', 'Ikdiena'],
                'questions'   => [
                    [
                        'text'     => 'Kur tu galvenokārt strādā?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Birojā', 'Mājās pilnīgi attālināti', 'Hibrīdā режīmā', 'Mainīgā vietā (kafejnīcas u.c.)'],
                    ],
                    [
                        'text'     => 'Vai esi apmierināts ar savu darba vidi?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Jā, pilnībā', 'Lielākoties jā', 'Daļēji', 'Nē'],
                    ],
                ],
            ],
            [
                'title'       => 'Vai tev ir mājdzīvnieks?',
                'description' => 'Aptauja par mājdzīvniekiem Latvijā.',
                'categories'  => ['Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Kāds mājdzīvnieks tev ir vai būtu vēlams?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Suns', 'Kaķis', 'Putns', 'Zivtiņas', 'Grauzējs', 'Nav un nevēlos'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādas grāmatas tu lasi?',
                'description' => 'Lasīšanas paradumu aptauja.',
                'categories'  => ['Kultūra', 'Izglītība'],
                'questions'   => [
                    [
                        'text'     => 'Kādu grāmatu žanru tu dod priekšroku?',
                        'multiple' => true,
                        'required' => true,
                        'options'  => ['Daiļliteratūra', 'Detektīvi', 'Fantastika', 'Vēsture', 'Pašattīstība', 'Zinātne'],
                    ],
                    [
                        'text'     => 'Cik grāmatas tu lasi gadā?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Nevienu', '1–5', '6–12', 'Vairāk nekā 12'],
                    ],
                ],
            ],
            [
                'title'       => 'Kā tu rūpējies par vidi?',
                'description' => 'Uzzināsim par videi draudzīgiem paradumiem Latvijā.',
                'categories'  => ['Vide', 'Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Ko tu dari, lai saudzētu vidi?',
                        'multiple' => true,
                        'required' => true,
                        'options'  => ['Šķiroju atkritumus', 'Izmantoju maisiņu alternatīvas', 'Dodu priekšroku sabiedriskajam transportam', 'Ietaupu ūdeni un elektroenerģiju', 'Iegādājos no vietējiem ražotājiem'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāda veselīga paraduma ievērošana tev ir vissvarīgākā?',
                'description' => 'Veselīga dzīvesveida aptauja.',
                'categories'  => ['Veselība', 'Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Kāds veselīgais paradums tev ir vissvarīgākais?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Pietiekams miegs', 'Regulāra fiziskā aktivitāte', 'Sabalansēts uzturs', 'Stresa pārvaldīšana', 'Regulāras veselības pārbaudes'],
                    ],
                    [
                        'text'     => 'Vai esi apmierināts ar savu veselību?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Jā', 'Lielākoties jā', 'Daļēji', 'Nē'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādu tehnoloģiju produktu tu izmanto visvairāk?',
                'description' => 'Noskaidrosim tehnoloģisko paradumu Latvijā.',
                'categories'  => ['Tehnoloģijas'],
                'questions'   => [
                    [
                        'text'     => 'Kādu ierīci tu izmanto visvairāk?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Viedtālrunis', 'Klēpjdators', 'Galddators', 'Planšetdators'],
                    ],
                    [
                        'text'     => 'Kādu operētājsistēmu dod priekšroku?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Windows', 'macOS', 'Linux', 'Android', 'iOS'],
                    ],
                ],
            ],
            [
                'title'       => 'Kāda ir tava izglītība un karjeras izvēle?',
                'description' => 'Pētījums par izglītību un karjeru Latvijā.',
                'categories'  => ['Izglītība', 'Darbs'],
                'questions'   => [
                    [
                        'text'     => 'Kāds ir tavs augstākais izglītības līmenis?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Pamatizglītība', 'Vidējā izglītība', 'Profesionālā izglītība', 'Bakalaura grāds', 'Maģistra grāds', 'Doktora grāds'],
                    ],
                    [
                        'text'     => 'Vai strādā savā specialitātē?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Jā', 'Daļēji', 'Nē', 'Vēl mācos'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādas ir tavas vasaras aktivitātes?',
                'description' => 'Uzzināsim, kā latvieši pavada vasaru.',
                'categories'  => ['Izklaide', 'Dzīvesveids'],
                'questions'   => [
                    [
                        'text'     => 'Ko tu parasti dari vasarā?',
                        'multiple' => true,
                        'required' => true,
                        'options'  => ['Eju uz pludmali', 'Braucu uz laukiem', 'Ceļoju ārzemēs', 'Dārzkopu darbos', 'Apmeklēju festivālus', 'Sporto ārā'],
                    ],
                ],
            ],
            [
                'title'       => 'Kur iepērkies visbiežāk?',
                'description' => 'Iepirkšanās paradumu aptauja.',
                'categories'  => ['Ikdiena'],
                'questions'   => [
                    [
                        'text'     => 'Kur tu biežāk iepērkies?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Lielveikalā', 'Tirgū', 'Interneta veikalā', 'Mazos vietējos veikalos'],
                    ],
                    [
                        'text'     => 'Ko ņem vērā, izvēloties produktu?',
                        'multiple' => true,
                        'required' => false,
                        'options'  => ['Cena', 'Kvalitāte', 'Vietējais ražojums', 'Zīmols', 'Iepakojums', 'Akcija'],
                    ],
                ],
            ],
            [
                'title'       => 'Kā tu svin Ziemassvētkus?',
                'description' => 'Latvijas Ziemassvētku tradīciju aptauja.',
                'categories'  => ['Kultūra', 'Tradīcijas'],
                'questions'   => [
                    [
                        'text'     => 'Kur tu parasti svin Ziemassvētkus?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Mājās ar ģimeni', 'Pie radiem laukos', 'Ārzemēs', 'Restorānā vai viesnīcā'],
                    ],
                    [
                        'text'     => 'Kādas tradīcijas ievēro?',
                        'multiple' => true,
                        'required' => false,
                        'options'  => ['Eglītes rotāšana', 'Dāvanu pasniegšana', 'Baznīcas apmeklēšana', 'Tradicionālie ēdieni', 'Ziemassvētku tirgu apmeklēšana'],
                    ],
                ],
            ],
            [
                'title'       => 'Latvija vai ārzemēs — kur dzīvot?',
                'description' => 'Aptauja par latvieši dzīvesvietas izvēli.',
                'categories'  => ['Dzīvesveids', 'Sabiedrība'],
                'questions'   => [
                    [
                        'text'     => 'Vai domā par dzīvi ārzemēs?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Jā, plānoju pārcelties', 'Esmu domājis, bet ne nopietni', 'Nē, gribu palikt Latvijā', 'Jau dzīvoju ārzemēs'],
                    ],
                    [
                        'text'     => 'Kas tev ir vissvarīgākais, izvēloties dzīvesvietu?',
                        'multiple' => true,
                        'required' => false,
                        'options'  => ['Darba iespējas', 'Drošība', 'Daba un vide', 'Kultūra un valoda', 'Ģimene tuvumā', 'Veselības aprūpe'],
                    ],
                ],
            ],
            [
                'title'       => 'Kādas ir tavas kafijas vai tējas preferences?',
                'description' => 'Noskaidrosim, ko latvieši dzer no rīta.',
                'categories'  => ['Ēdiens', 'Ikdiena'],
                'questions'   => [
                    [
                        'text'     => 'Ko tu parasti dzer no rīta?',
                        'multiple' => false,
                        'required' => true,
                        'options'  => ['Melno kafiju', 'Kafiju ar pienu', 'Zaļo tēju', 'Melno tēju', 'Augļu tēju', 'Ūdeni'],
                    ],
                    [
                        'text'     => 'Cik tases tu iedzeri dienā?',
                        'multiple' => false,
                        'required' => false,
                        'options'  => ['Nevienu', '1–2', '3–4', '5 vai vairāk'],
                    ],
                ],
            ],
        ];

        foreach ($polls as $pollData) {
            $poll = Poll::create([
                'user_id'             => $demo->id,
                'title'               => $pollData['title'],
                'description'         => $pollData['description'],
                'status'              => 'active',
                'is_anonymous'        => (bool) rand(0, 1),
                'show_stats'          => true,
                'allow_multiple_votes' => false,
                'is_public'           => true,
                'requires_auth'       => false,
                'categories'          => $pollData['categories'],
            ]);

            $questionModels = [];
            foreach ($pollData['questions'] as $order => $qData) {
                $question = PollQuestion::create([
                    'poll_id'           => $poll->id,
                    'text'              => $qData['text'],
                    'is_multiple_choice' => $qData['multiple'],
                    'is_required'       => $qData['required'],
                    'order'             => $order,
                ]);

                $optionModels = [];
                foreach ($qData['options'] as $optOrder => $optText) {
                    $optionModels[] = PollOption::create([
                        'question_id' => $question->id,
                        'text'        => $optText,
                        'order'       => $optOrder,
                    ]);
                }

                $questionModels[] = ['question' => $question, 'options' => $optionModels];
            }

            $responseCount = rand(8, 80);
            for ($i = 0; $i < $responseCount; $i++) {
                $response = PollResponse::create([
                    'poll_id'      => $poll->id,
                    'user_id'      => null,
                    'session_token' => \Illuminate\Support\Str::random(40),
                ]);

                foreach ($questionModels as $qm) {
                    $question = $qm['question'];
                    $options  = $qm['options'];

                    if ($question->is_multiple_choice) {
                        $count   = rand(1, min(3, count($options)));
                        $picked  = array_rand(array_keys($options), $count);
                        $picked  = is_array($picked) ? $picked : [$picked];
                    } else {
                        $picked = [array_rand($options)];
                    }

                    foreach ($picked as $idx) {
                        PollResponseAnswer::create([
                            'response_id' => $response->id,
                            'question_id' => $question->id,
                            'option_id'   => $options[$idx]->id,
                        ]);
                    }
                }
            }
        }

        $this->command->info('Izveidoti 20 aptauju piemēri ar atbildēm.');
    }
}
