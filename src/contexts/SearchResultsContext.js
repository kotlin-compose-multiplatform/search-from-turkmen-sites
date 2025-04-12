import React, { createContext, useContext, useState } from 'react';
// import data from '../data/mockData.json';

const SearchResultsContext = createContext();
const baseUrl = 'https://www.googleapis.com/customsearch/v1';
const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const contextKey = process.env.REACT_APP_GOOGLE_CONTEXT_KEY;
const allowedSites = [
  '100haryt.com',
  'salamnews.tm',
  'ynamdar.com',
  'gerekli.tm',
  'bazar.com.tm',
  'saray.tm',
  'tmcars.info',
  // Added government sites
  'mineco.gov.tm',        // Türkmenistanyň Daşky gurşawy goramak ministrligi
  'mia.gov.tm',           // Türkmenistanyň Içeri işler ministrligi Aragatnaşyk müdirligi
  'docslibrary.gov.tm',   // Türkmenistanyň Daşary işler ministrligi
  'infotrade.gov.tm',     // Türkmenistanyň Söwda we daşary ykdysady aragatnaşyk ministrligi
  'minagri.gov.tm',       // Türkmenistanyň Oba hojalyk ministrligi
  'education.gov.tm',     // Türkmenistanyň Bilim Ministrligi
  'asuda.gov.tm',         // Türkmenistanyň Içeri işler ministrligi
  'mintradefer.gov.tm',   // Türkmenistanyň Söwda we daşary ykdysadyýet aragatnaşyklar ministrligi
  'milligosun.gov.tm',    // Türkmenistanyň Goranmak ministrliginiň “Milli goşun” žurnalynyň redaksiýasy
  'minenergo.gov.tm',     // Türkmenistanyň Energetika ministrligi
  'neutrality.gov.tm',    // Türkmenistanyň Daşary işler ministrligi
  'mission.gov.tm',       // Türkmenistanyň Daşary işler ministrligi
  'tmconsulate.gov.tm',   // Türkmenistanyň Daşary işler ministrligi
  'tmembassy.gov.tm',     // Türkmenistanyň Daşary işler ministrligi
  'mfa.gov.tm',           // Türkmenistanyň Daşary işler ministrligi
  'construction.gov.tm',  // Türkmenistanyň Gurluşyk we binagärlik ministrligi
  'fineconomic.gov.tm',   // Türkmenistanyň Maliýe we ykdysadyýet ministrligi
  'medeniyet.gov.tm',     // Türkmenistanyň Medeniýet Ministrligi
  'saglykhm.gov.tm',      // Saglygy goraýyş we derman senagaty ministrligi
  'minjust.gov.tm',        // Türkmenistanyň Adalat ministrligi
  // Original sites
  'arkadag-shaheri.gov.tm', // Arkadag şäheriniň häkimligi
  'kopetdag.gov.tm',        // Aşgabat şäheriniň Köpetdag etrap häkimligi
  'bagtyyarlyk.gov.tm',     // Aşgabat şäheriniň Bagtyýarlyk etrap häkimligi
  'balkan.gov.tm',          // Balkan welaýat häkimligi
  'ashgabat.gov.tm',        // Aşgabat şäher häkimligi
  'lebap.gov.tm',           // Lebap welaýat häkimligi
  'ahalhakimlik.gov.tm',    // Ahal welaýatynyň häkimligi
  'dashoguz.gov.tm',         // Daşoguz welaýat häkimligi
  'gsa-t5.gov.tm',                 // Howa gatnawlarynyň Baş gullugy
  'livestock.gov.tm',              // Türkmenistanyň Maldarçylyk we guşçulyk senagaty döwlet birleşigi
  'obahyzmat.gov.tm',              // "Türkmenobahyzmat" döwlet birleşigi
  'turkmendasharysowda.gov.tm',    // "Türkmendaşarysöwda" Döwlet kärhanasy
  'balkanbakaleya.com.tm',         // Balkan welaýat "Türkmenbakaleýa" Döwlet lomaý-bölek söwda bazasy
  'ekspertiza.gov.tm',             // Baş döwlet seljeriş müdirligi
  'ast.com.tm',                    // Arkadag şäheriniň söwda müdirligi
  'jemagat.gov.tm',                // Jemagat hojalygy müdirligi
  'bahai.com.tm',                  // Türkmenistanyň Bahai Dini Guramasy
  'tds.gov.tm',                    // Türkmen standartlar maglumat merkezi
  'advokat-ashgabat.gov.tm',       // Aşgabat şäher adwokatlar kollegiýasy
  'hazar.com.tm',                  // "Hazar ätiýaçlandyryş" AGPJ
  'unesco.gov.tm',                 // Birleşen milletler guramasynyň bilim, ylym we medeniýet boýunça guramasynyň (UNESCO)işleri barada Türkmenistanyň Milli toparynyň Sekretariaty
  'liftgurlusykwebejeris.gov.tm',  // "Lift gurluşyk we bejeriş" tresti
  'arassachylyk.gov.tm',           // Aşgabat şäher Arassalaýyş, abadanlaşdyryş birleşigi
  'ashgabatyylylyk.gov.tm',        // "Aşgabatýylylyk" tresti
  'ryny.gov.tm',                   // Aşgabat şäher RÝNÝ bölümi (Raýat Ýagdaýynyň Namalarynyň Ýazgysy)
  'muftulik.gov.tm',               // Türkmenistanyň Müftüsiniň müdiriýeti
  'balykgorag.gov.tm',             // Döwlet balyk goraýyş we suwuň bioserişdelerine gözegçilik müdirligi
  'atte.gov.tm',                   // Aşgabadyň tehniki tükelleýiş edarasy
  'msm.com.tm',                    // Milli söwda merkezi
  'sowdamudirligi.com.tm',         // Aşgabat şäheriniň söwda müdirligi
  'karende.gov.tm',                // Aşgabat şäher häkimliginiň Jemagat hojalygy müdirliginiň Kärende müdirligi
  'dwtte.gov.tm',                  // Daşoguz welaýat Tehniki tükelleýiş edarasy
  'gozgalmayanemlakgullugy.gov.tm',// Adalat ministrliginiň ýanyndaky Gozgalmaýan emläge bolan hukuklaryň we onuň bilen bagly geleşikleriň döwlet tarapyndan bellige alynmagy baradaky gullugynyň Aşgabat şäher müdirligi
  'dtyb.gov.tm',                   // Dünýä türkmenleriniň ynsanperwer birleşigi
  'dsgg.com.tm',                   // Döwlet söwda gözegçiligi gullugy
  'mejlis.gov.tm',                 // Türkmenistanyň Mejlisi
  'tpg.gov.tm',                    // Türkmenistanyň Parahatçylyk Gaznasy
  'archive.gov.tm',                // Türkmenistanyň Ministrler Kabinetiniň ýanyndaky Baş arhiw müdirligi
  'sic-icsd.com.tm',               // Araly halas etmek boýunça Halkara gaznasyny Durnukly ösüş baradaky döwletara toparynyň Ylmy-maglumat merkezi
  'agb.com.tm',                    // “Aşgabat Gazna Biržasy” ÝGPJ-ti
  'tap.gov.tm',                    // Agrar partiýasynyň Merkezi geňeşi
  'stat.gov.tm',                   // Türkmenistanyň statistika baradaky Döwlet komiteti
  'scct.gov.tm',                   // Türkmenistanyň Ýokary gözegçilik edarasy
  'tgymj.gov.tm',                  // Türkmenistanyň Gyzyl ýarymaý milli jemgyýeti
  'exchange.gov.tm',               // Döwlet haryt-çig mal biržasy
  'saylav.gov.tm',                 // Türkmenistanda saýlawlary we sala salşyklary geçirmek boýunça merkezi saýlaw topary
  'insurance.gov.tm',              // Döwlet ätiýaçlandyryş guramasy
  'tkamm.gov.tm',                  // Türkmenistanyň Kärdeşler arkalaşyklarynyň Milli merkezi
  'tstb.gov.tm',                   // Senagatçylar we telekeçiler birleşmesi
  'notariat.gov.tm',               // Aşgabat şäher döwlet notarial edarasy
  'tstp.gov.tm',                   // Senagatçylar we telekeçiler partiýasynyň merkezi geneşi
  'etalon.gov.tm',                 // Döwlet etalon merkezi
  'tdp.gov.tm',                    // Demokratik partiýasynyň syýasy geňeşi
  'yashlar.gov.tm',                // Magtymguly adyndaky Ýaşlar guramasynyň Merkezi Geňeşi
  'zenan.gov.tm',                   // Zenanlar birleşiginiň Merkezi geňeşi
];


export const SearchResultsProvider = ({ children }) => {
  //# states
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');

  //# FUNCTIONS
  // resultType -> /images, /videos
  const fetchResults = async (searchTerm) => {
    setIsLoading(true);

    const siteFilters = allowedSites.map(site => `site:${site}`).join(' OR ');
    const fullQuery = `${searchTerm} ${siteFilters}`;

    const res = await fetch(
        `${baseUrl}?key=${apiKey}&cx=${contextKey}&q=${encodeURIComponent(fullQuery)}`
    );
    if (res.status === 429) {
      setIsLoading(false);
      setResults([]);
      return alert(
        "API only allows 100 requests per day and we have reached the limit. Please try again tomorrow. If you're the developer, you know the pain of free APIs :)"
      );
    }
    const data = await res.json();
    setResults(data);
    setIsLoading(false);
  };

  // # RETURN
  return (
    <SearchResultsContext.Provider
      value={{ fetchResults, results, isLoading, searchItem, setSearchItem }}
    >
      {children}
    </SearchResultsContext.Provider>
  );
};

// create custom global hook
export const useSearchResultsContext = () => useContext(SearchResultsContext);
