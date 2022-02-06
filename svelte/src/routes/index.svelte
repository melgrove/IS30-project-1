<script>
    import * as animateScroll from "svelte-scrollto";
    import {tick} from 'svelte';
import A from "./web/[...slug].svelte";

    let range = 0;
    let obj = {};
    let keys = null;
    let isErr = false;
    let orderedKeys = [];
    let playing = false;
    let isLoading = true;
    
    function setTimeline(yyyymmdd) {
        let index = orderedKeys.map(key => key.toString().slice(0,8)).indexOf(yyyymmdd.toString());
        if(index != -1) {
            range = index;
            animateScroll.scrollToTop();
        } else {
            console.log('invalid date');
        }
    }
    
    async function start(preload) {
        playing = true;
        while(playing) {
            if(preload) await tick();
            else await new Promise(r => setTimeout(r, 350));
            if(range == 315) stop();
            range = range == 315 ? 0 : range + 1
        }

    }

    function stop() {
        playing = false;
    }

    $: correctDate = isLoading ? 'Loading...' : (new Date(orderedKeys[range].toString().slice(0, 4), orderedKeys[range].toString().slice(4, 6) - 1, orderedKeys[range].toString().slice(6,8))).toDateString().slice(4)
    $: correctKey = String(orderedKeys[range]) + '.html'

    fetch('https://history-of-google.netlify.app/snapshots.json').then(async (res) => {
        const json = await res.json();
        Object.keys(json).forEach(key => {
            const data = json[key].replaceAll(/url\(\//g, 'url(https://web.archive.org/');
            obj[key] = data;
        })
        keys = Object.keys(json).map(key => parseInt(key.slice(0, -5)))
        orderedKeys = keys.sort((a, b) => Date(a) - Date(b));
        //await start(true)
        isLoading = false;
    }).catch((err) => {
        isErr = true;
    })
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400;1,700&display=swap');
    .title {
        font-weight: 700;
        font-family: 'Lora', serif;
        font-size: 24px;
    }

    .date {
        font-weight: 700;
        font-family: 'Lora', serif;
        font-size: 20px;
        color: #406ba3;
        font-style: italic;
    }

    .header {
        font-weight: 700;
        font-family: 'Lora', serif;
        font-size: 45px;
        color: #406ba3;
        font-style: italic;
        border-bottom: solid 2px;
        border-color: #406ba3;
    }
    
    a, .link {
        font-weight: 400;
        font-family: 'Lora', serif;
        font-size: 18px;
        line-height: 45px;
        word-spacing: 3px;
        color:#406ba3;
        cursor: pointer;
        font-style: italic;
    }

    .break {
        font-weight: 700;
        font-family: 'Lora', serif;
        font-size: 35px;
        color: #406ba3;
    }

    .body {
        font-weight: 400;
        font-family: 'Lora', serif;
        font-size: 18px;
        line-height: 45px;
        word-spacing: 3px;
    }

    .special {
        font-weight: 400;
        font-family: 'Lora', serif;
        font-size: 20px;
        color: #406ba3;
        font-style: italic;
    }

    .fontfam {
        font-weight: 700;
        font-family: 'Lora', serif;
    }

    .load {
        font-weight: 700;
        font-family: 'Lora', serif;
        font-size: 34px;
    }

    .name-box {
        box-shadow: inset 0 2px 4px 0 rgb(0 0 0 / 0.2);
    }

    .caption {
        text-align: center;
        font-size: 10px;
        line-height: 2em;
    }
    img {
        border: #406ba3 2px solid;
    }
</style> 

<header style="z-index: 1001" class="w-full h-8 bg-white flex flex-row justify-center items-center fixed">
    <p style="z-index: 1002" class="title h-8 justify-center items center fixed">History of Google</p>
<div style= "height: 6em" class=" flex flex-row justify-center px-4">
    <div style= "height: 4.5em; z-index: 1000; padding-top: 4em" class="shadow-lg w-full bg-white flex flex-row justify-center items-center fixed">
        <button on:click={() => animateScroll.scrollTo({element: '#intro', offset: -150})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Introduction
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#doodles', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Doodles
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#user-experience', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            User Experience
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#search-ads', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Search & Ads
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#empire', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            The Google Empire
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#wayback', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Wayback Machine Retrospection
        </button>
        <button on:click={() => animateScroll.scrollTo({element: '#works-cited', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Works Cited
        </button>
    </div>
</div>
</header>
<div style = "padding-top: 7rem" class="h-full w-full bg-blue-100">
    <!-- slider -->
    <div class=" h-14 flex flex-row justify-center px-4">
        {#if !playing}
        <button on:click={() => start(false)} class="h-10 mt-4 mr-4 px-2 bg-green-300 hover:bg-green-400 text-bold rounded border shadow border-black fontfam ">
            Play
        </button>
        {:else}
        <button on:click={stop} class="h-10 mt-4 mr-4 px-2 bg-red-300 hover:bg-red-400 text-bold rounded border shadow border-black fontfam ">
            Stop
        </button>
        {/if}
    </div>
    <div class="bg-white m-4  h-10 shadow flex flex-row justify-center px-4">
        <input type="range" bind:value={range} min=0 max=315 class="w-full">
    </div>
    <p class="date text-center">
        {correctDate}
    </p>
    <!-- pages -->
    <div class="h-[560px] my-4 bg-white absolute w-full shadow">
        {#if isLoading}
            <div class="w-screen justify-center flex mt-24 load text-gray-300">Loading...</div>
        {:else}
            {@html obj[correctKey]}
        {/if}
    </div>
    <p class = "caption">Although this project only analyzes Google from 2000 to 2020, the animation has a longer timeframe for illustrative effect.</p>
    <!-- Writing -->
    <div class="flex flex-col w-full items-center mt-[620px] ">
        <div class="rounded-2xl  px-6 name-box bg-blue-200 mx-4 mt-4">
            <p id="intro" class="special">A report by Lindsey Parungo, Cameron Chevre, Matthew Yu, and Oliver Melgrove</p>
        </div>
    <div class="flex flex-col w-11/12 sm:w-4/5 items-center bg-white shadow mt-10 pt-20 pb-20 mb-20">
        <p class="header relative  w-2/3 border-b-4 border-[#406ba3]">Introduction</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google’s design has only undergone minimal changes since it was created in 1998. Throughout this article, we track aspects of Google.com's change in design and intended use from February 29, 2000 until February 29, 2020. This range was selected as Google was in a beta form in 1998 and 1999, and the first 2000s entry was on February 29th. A 20-year range was chosen because Google’s design as displayed by the Wayback Machine are extremely limited, necessitating a larger range to pick up on hints of Google’s immense development over these two decades. The static nature implies that any changes made during this era were likely part of a general shift or growth in tendencies rather than versioning. Through careful examination of Google.com’s history, small design changes such as the development of the Doodle, adding widgets to search, increasing sponsored content in searches, and an increase in links to other services, were detected. Each of these changes, visible through the Wayback Machine, hints at extensive developments in Google’s design and intended use, that match shifts in internet culture including the growth in the Web as a platform, an increase in personalized dynamic content, a reliance on user input and interaction that cannot be fully appreciated in its archived form. Throughout Google’s history, the design of the page has gradually changed in terms of its doodle, search format, search results, and platform access hinting at shifts in internet culture towards dynamic interactive content and platformization that happened over time rather than in versions. 
        </div>
        <p id = "doodles" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Doodles</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The frequent change of Google’s logo, to commemorate special events, messages or anniversaries, on google.com, known as the Google Doodle, has developed in design and intended use. At first glance it seemingly exemplifies the principles of Web 2.0, however its slow development since conception, as a joke, in 1988 indicates that it was an extension of Web 1.0 rather than a shift in internet culture.
            <figure style = "float: left; width:50%; margin-bottom: -10px" >
                <img src = "./images/Bastille_Day.gif" alt = "Google Doodle from Bastille Day 2000">
                <p class = "caption">The first serious Google Doodle was produced for Bastille day. It served as a Beta to test popular reactions to the new idea.</p>
            </figure>
            A principle represented by the Google Doodle is a reliance on user input and collective intelligence. In 2000, for Bastille Day, Google made its first serious attempt at a Doodle as test case. The doodle was positively received, so Google continued the practice, developing a team of Doodlers. This reception of user feedback is an element of the constant Beta principle of Web 2.0. Google tested the idea of the Doodle on users and tracked their feedback, rather than testing on an internal committee. 
            <figure>
                <img src = "./images/Doodle4Google.png" alt = "A doodle for goodle example to show unity">
                <p class = "caption">This doodle was user submitted in the Doodle4Google competition, an annual event in which users submit doodle art to be displayed on Google.com</p>
            </figure>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This reliance on users is further display as Google began to take requests for days to celebrate and accept doodle art from the general public. This willingness to incorporate user content exemplifies the “bottom-up” development of Web 2.0 pages. Thus, it seems as though Google’s growth within the Doodle follows principles of the 2.0 timeline as the Web 2.0 era rose. However, this was a gradual growth of technology, not a drastic change in culture implied by versions. Allen argues that versions create a narrative of something new developing at one moment, even as it implies continuity (Allen p. 264) that may not actually exist. The Google Doodle has evolved over time, since before Web 2.0, without sudden releases of technology or ideas. This gradual change displays the shifts in internet culture towards user generated content and the perpetual Beta, but rejects the language of versioning inherent in Web 2.0.  
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        
        <figure class = "items-center">
            <div style = "margin-left: 7%">
                <img style= "width:45%;" src = "./images/Nov10Sesame.png" alt = "Doodle for Google on the aniversary of Sesame Street">
                <img style= "width:45%;" src = "./images/Nov11_VeteransDay.png" alt = "Doodle for Veterans day">
            </div>
            <img style= "width:45%; margin-left:25%; margin-right:auto; display: block" src = "./images/Nov12_Std.png" alt = "Google page with no doodle">
            <p class = "caption">These doodles were selected on 3 consecutive days and display Google's ability to make small daily changes for dynamic content.</p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The growth in intended use of the Google Doodle represents shift in internet culture towards interactivity and dynamism. The first use of the doodle as a commemoration of a special event display a dynamic nature that fits with what O’Reilly terms the “End of the Software Release Cycle” <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=4" target="_blank">(p.4)</a>.  Instead of releasing major changes, Google is making small changes to its site nearly daily. Additionally, the Doodle changes based on a user’s location indicating personalization that would not be possible on the static page that is most prevalent in the Web 1.0 era. As discussed later, this is a fact that is largely lost on the Wayback Machine. The personalized and dynamic pages were a natural progression from the early days of linked content (Burnett and Marshal pp 84-87). 
            <figure>
                <img src = "./images/Feb1417.png" alt = "Doodle from Valentine's Day 2017 with pangolins.">
                <p class = "caption">This Doodle was released for Valentine's day and was originally displayed as an interactive game. Unfortunately that functionality is lost on the Wayback Machine.</p>
            </figure>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Through time, Google Doodles increased their interactivity by including games and other multimedia. As an example, for Valentine’s Day in 2017, Google released a <a href = "https://www.google.com/doodles/valentines-day-2017-day-4" target = "_blank">Doodle</a> game where the user helps a pangolin reach their valentine. Unfortunately, the Wayback Machine cannot load these features and instead displays a still image of the Doodle. Interaction in internet trends rose as a counter to Flash which was criticized for being passive and inaccessible (Ankerson p. 393). The gradual shift from a passive, yet dynamic, way to commemorate events to a more interactive design illustrate developments in the internet from static pages to the rich modern web.
        </div>
        <p id = "user-experience" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">User Experience</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Although the visual design and function of Google has only changed slightly in the past two decades, it has added many improvements for user experience, fulfilling both the trend described by Burnett and Marshall in the increased graphics of the modern web and O’Reilly’s 7th Principle of Web 2.0: a rich user experience. It has evolved from a bare-bones list of results to a search engine containing new widgets, advanced search options, voice recognition, and more as a gradual shift towards a rich user experience.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
             &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Through these past two decades, one impactful design change to Google Search is the widgets. They provide users with information immediately, almost halving the time required for users to find their results. Widgets include weather forecast, sports scores, and the calculator. The rise of widgets indicates how Google Search has become considerably more personalized. Google collects data about each user to produce better recommendations and results. As O’Reilly predicted, “companies that succeed will create applications that learn from their users” <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=2" target="_blank">(pp.2-3)</a>. Thus, O’Reilly’s 3rd principle of Web 2.0 “Data is the Next Intel Inside” sums up Google’s pathway to success. Instead of serving the same information to everyone, Google leverages machine learning models to recommend improved results. If a frequent traveler searches for “Barcelona”, Barcelona’s top attractions and sites appear, whereas a soccer fan sees a sports widget with the team’s schedule and scores. This personalization is a continuation of internet trends that are described by Burnett and Marshall. While the use of data specifically is heralded as a creation of Web 2.0 in O’Reilly<a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=3" target="_blank">(p.3)</a>, the driving force behind it, the desire for personalization, is a factor of internet culture that has existed for far longer than the Web 2.0 era.   
        </div>
        <figure class = "items-center">
            <div style = "margin-left: 13%">
                <img style= "width:41%" src = "./images/barcelonaTourism.PNG" alt = "Barcelona search result that show tourism">
                <img style= "width:47%" src = "./images/barcelonaSoccer.PNG" alt = "Barcelona search result that shows sport scores">
            </div>
            <p class = "caption">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Image of a modern-day search of "barcelona" from a tourist's perspective. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Image taken on the Wayback Machine in 2020, showing "barcelona" results with the sports widget. </p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another improvement is the advanced search customization. For example, if someone was writing a paper and needed credible information, they could append “:.edu OR :.gov” to the end of their query to only get websites that end in .edu or .gov. Like the widgets, the search options save valuable time by allowing users to easily narrow down their results.
        </div>
        <figure class = "items-center">
            <div style = "margin-left: 15%">
                <img style= "width:80%" src = "./images/advancedSearch.PNG" alt = "Search result using advanced search">
            </div>
            <p class = "caption">Image shows a modern-day search of "vaccines :.edu OR :.gov" to obtain results ending in these top level domains.</p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In 2011, Google added Voice Search, allowing users to search simply by speaking, a change that can be seen through the addition of a microphone in the design of Google’s search bar. It not only helps to save time but also helps those who cannot easily type. Additionally, for Voice Search results that include widgets, Google reads the info inside each widget aloud, which aids the visually impaired. Thus, Voice Search illustrates how websites have become more accessible over time. This increase in accessibility is a trend Ankerson illuminates while describing that one of the reasons Flash failed was its lack of accessibility. The internet has trended more towards accessible features and Google has followed this trend.   
        </div>
        <p id = "search-ads" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Search & Ads</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google has harnessed collective intelligence and leveraged long-tail economics, aspects ascribed to Web 2.0, in order to improve the function of its search engine.   While Web 2.0 claims to mark a large shift in the way websites were designed and utilized, Google as a page has stayed relatively the same throughout the years. The core services the site provides have not changed drastically. Instead the services have been continually modified with slight updates and changes to its indices.
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;For example, PageRank, an algorithm used by Google Search to rank web pages in their search engine works by counting the number and quality of links to a page to determine a rough estimate of how important the website is, according to Google. O'Reilly highlights this as a “breakthrough in search,” that harnesses collective intelligence <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=2" target="_blank">(p.2)</a>. Despite O’Reilly exhibiting PageRank as a pinnacle of Web 2.0, PageRank has existed since 1988, long before the era of Web 2.0 began. This implies that the technology we now associate with Web 2.0 developed over time from Web 1.0 principles rather than being released as part of a new version.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google’s PageRank, an application of harnessing collective intelligence, has developed with Google Ads, another Google service, to leverage the long-tail and match customers with retailers. Google Ads is a service in which users and advertisers can pay to appear in Google search results pertaining to specific keywords. In terms of design, Google Ads favored the use of minimally intrusive, consumer-friendly text advertising rather than banners or pop-ups.
        </div>
        <figure class = "items-center">
            <img style= "width:45%; margin-left:25%; margin-right:auto; margin-bottom: 5px; display: block" src = "./images/shoeswayback.png" alt = "Search result for shoes on the Wayback Machine">
            <div style = "margin-left: 5%">
                <img style= "width:45%" src = "./images/shoes1.png" alt = "Search result for shoes using modern google">
                <img style= "width:49%" src = "./images/shoes2.png" alt = "Search result for shoes using modern google">
            </div>
            <p class = "caption">The first of these images was taken on the Wayback Machine to show what a search used to look like, using the search of shoes. The latter two images show what a modern day search of the same keyword "shoes" brings up</p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take the search phrase “shoes” for example. When on the Wayback Machine, a search of the term shoes on Google will bring up an archaic looking version of Google. However, upon further examination, we can see that although the page looks different, its functions are more or less the same when it comes to advertising and search results. In the Wayback Machine version, there is text-advertising for shoe retailers at the top of the search results (Google Ads), and we can see that there are over 1,420,000,000 results for shoes. Following the ads placed at the top, we can see more links to shoe retailers which have been ranked by PageRank. The current version of Google provides results for shoe stores near your physical location as well as a map of retailers in your area. There is also a tab labeled “Popular Products” which provides pictures of different shoes which link to retail websites. This more modern look builds in graphics and multimedia, a trend that was identified by Burnett and Marshall. We can also see that there are now over 5,400,000,000 results for “shoes” in the current day, which is not only a testament to the passage of time, but the Web 2.0 feature of increased user generated content and interactivity as well.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Though the changes to Google’s page are minimal in regard to ads and search, Google has adjusted over time to fit with principles of a modern web with increased graphics, interactivity, and personalization. 
        </div>
        <p id = "empire" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">The Google Empire</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In <span class="link" on:click={() => setTimeline(20000512)}>2000</span>, Google’ homepage had hardly more than a search box. Through subtle changes, Google has added a <span class="link" on:click={() => setTimeline(20190721)}>top bar</span> with links to an entire platform of other services. Google's expansion of external services is an embodiment of Web 2.0 as O'Reilly proposed it in 2005.  Unlike Netscape, Google realized that "the value of the software is proportional to the scale and dynamism of the data it helps to manage" <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=1" target="_blank">(O'Reilly p. 1)</a>. A perfect example of this, which is <span class="link" on:click={() => setTimeline(20080306)}>meekly shown</span> in the header of Google Search, is Gmail, an application released in 2004. Google didn't generate revenue from licensing the software to the end user or demanding a cost to use it, instead they generated revenue from the data of the massive amount of people who used it. As time moves forward, Google also released Maps in 2005, and the GSuite in 2006, which also added to the header on google search.
        </div>
        <figure class = "items-center">
            <div style = "margin-left: 5%">
                <img style= "width:45%" src = "./images/googlehome1.png" alt = "Google page in 2000. There is minimal links to other pages">
                <img style= "width:45%" src = "./images/googlehome2.png" alt = "Google page in 2016. There are several links out to other parts of the platform.">
            </div>
            <p class = "caption">The first of these images is used to show the bare homepage of Google in 2000. The second image shows what Google's homepage looked like in 2016 with it's added top bar.</p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another piece of the puzzle, which has propelled GSuite, Gmail, Maps, and others into what they are today, is O'Reilly's idea of Rich User Experiences. Previously, complex and interactive experiences could only be found on PCs, and inflexible applets and flash applications. Consequently, "the potential of the web to deliver full scale applications didn't hit the mainstream till Google introduced Gmail" <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=5" target="_blank">(O'Reilly p. 5)</a>. The technological breakthrough which allowed web applications with rich user experiences was the extended use of JavaScript, and subsequently AJAX in the browser. Instead of sites being unchangeable similar to physical pieces of paper, websites could load external data after they have been served and change the format of the site completely. A new era began, where "web developers are finally able to build web applications as rich as local PC-based applications" <a href="https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=5" target="_blank">(O'Reilly p. 5)</a>. 
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The shift towards Google’s platformization is perhaps the most in line with the language of versioning. Most of Google’s main platform applications were released between 2004 and 2006, prime time for the rise of the Web 2.0 era. However, the idea of platforms and central landing pages predate Google and Web 2.0. The fact that Web 2.0 ideals existed long before the era, is evidence that Allen uses to discredit the language of versioning. The release of products for the web may seem like a new version of the PC platform, but using that language enforces an understanding of the internet as something that is released at certain periods, a fact that is not represented other aspects of Google’s design.
        </div>
        <p id = "wayback" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Wayback Machine Retrospection</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Despite its success at accurately documenting the surface level display of web history, the Wayback Machine has limitations. The biggest advantage of the Wayback Machine is the wide range of sites crawled: by 2010, over 150 million pages were archived. However, this breadth comes at a price of depth, consistency, and accuracy. Snapshots often fail to preserve the complete site and contain missing images and broken links. In the case of Google, the Wayback Machine provides snapshots of the Google homepage and a limited number of search results layout throughout time. However, the snapshots fail to include the interactive and multimedia elements of the Doodles. Also, if you attempt to click on a link after completing a search or try to utilize any search tools such as images, videos, or news, the links are broken and will take you back to the Wayback Machine homepage. Additionally, different search results are collected at different times making it difficult to compare across history.
        </div>
        <figure class = "items-center">
            <div style = "margin-left: 15%">
                <img style= "width:46%" src = "./images/WaybackMachineBroken.png" alt = "Wayback Machine failing to display a link">
                <img style= "width:34.2%" src = "./images/CanadianGoogle.PNG" alt = "Search result for 'google' from a Canadian perspective">
            </div>
            <p class = "caption">&nbsp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;What appears when Wayback Machine fails to load a page. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Search result for 'google' from a Canadian perspective &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
            </p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In addition to incomplete information within the snapshots, the Wayback Machine content represents only a small fraction of the Internet at any particular time. The choice of what to archive is left to the archivist and thus may miss webpages important to underrepresented groups. This can also apply to being unable to see certain personalization. Looking at one Wayback result for “google”, the top result is “google.ca”, indicating a Canadian archivist. However, if someone wanted to view a website in a less common language or from the perspective of a small country, it’s much less likely to be available. Also, how search results and ads vary between users is lost because each moment only has one reference.
        </div>
        <p id = "works-cited" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Works Cited</p>
        <div class="body w-5/6 sm:w-3/5 mt-8 items-center">
            <div style = "margin-left: 42%; margin-right: auto" class = "items-center justify-center">Works Cited:</div>
            <br>Allen, Matthew. “What Was Web 2.0? Versions as the Dominant Mode of &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Internet History.” New Media & Society, vol. 15, no. 2, Mar. 2013, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pp. 260–275, <a href = "https://journals.sagepub.com/doi/10.1177/1461444812451567" target="_blank">doi:10.1177/1461444812451567</a>.
            <br>Ankerson, Megan Sapnar. “Writing Web Histories with an Eye on the Analog &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Past.” New Media & Society, vol. 14, no. 3, May 2012, pp. 384–400, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href = "https://journals.sagepub.com/doi/full/10.1177/1461444811414834" target="_blank">doi:10.1177/1461444811414834</a>.
            <br>Burnett, Robert and Marshall, P. David. Web Theory. Routledge, 2003, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;pp. 81-104. <a href = "https://bruinlearn.ucla.edu/courses/76661/pages/mon-1-slash-10-readings-and-reading-questions?module_item_id=4110787" target = "_blank">link</a>
            <br>O'Reilly, Time. “What Is Web 2.0.” O'Reilly, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href = "https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html?page=1" target = "_blank">https://www.oreilly.com/pub/a/web2/archive/what-is-web-20.html</a>. 
        </div>
        <p id = "conclusion" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Appendix</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;A core part of our project is to see how google.com has changed over time. To aid our efforts in doing so, we created the visual timeline at the top of the site. We created this by writing a program to web scrape Wayback Machine snapshots over time at a reasonably high density. We then downloaded the HTML from these snapshots and formatted it so that images and CSS displays correctly. The resulting HTML pages are displayed on this website. The code for the scaper and this website is available <a class="link" href="https://github.com/melgrove/IS30-project-1/">here</a>.
        </div>
    </div>
    <p on:click={() => animateScroll.scrollToTop()} class="text-center date hover:underline cursor-pointer pb-20">back to top</p>
    </div>
</div>
