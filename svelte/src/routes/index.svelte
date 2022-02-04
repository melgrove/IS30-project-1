<script>
    import * as animateScroll from "svelte-scrollto";
    import {tick} from 'svelte';

    let range = 0;
    let obj = {};
    let keys = null;
    let isErr = false;
    let orderedKeys = [];
    let playing = false;
    let isLoading = true;

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
</style> 

<header style="z-index: 1000" class="w-full h-14 shadow-lg bg-white flex flex-row justify-center items-center fixed">
    <p class="title">History of Google</p>
</header>
<div class="h-full w-full bg-blue-100 pt-14">
    <!-- slider -->
    <div class=" h-14 flex flex-row justify-center px-4">
        <button on:click={() => animateScroll.scrollTo({element: 'intro', offset: 900})} class="h-10 mt-4 mr-4 px-2 bg-white hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Writing
        </button>
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
    <!-- Writing -->
    <div id="intro" class="flex flex-col w-full items-center mt-[620px] ">
        <div class="rounded-2xl  px-6 name-box bg-blue-200 mx-4 mt-4">
            <p class="special">A report by Lindsey Parungo, Cameron Chevre, Matthew Yu, and Oliver Melgrove</p>
        </div>
    <div class="flex flex-col w-11/12 sm:w-4/5 items-center bg-white shadow mt-10 pt-20 pb-20 mb-20">
        <p class="header relative  w-2/3 border-b-4 border-[#406ba3]">Introduction</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google has looked pretty much the same since it was created in 1998. Even when playing Google.com on a timelapse, the changes are hardly noticeable. Throughout this article, we track aspects of Google.com's change in design from February 29, 2000 until February 29, 2020. This range was selected as Google was in a beta form in 1998 and 1999, and the first 2000s entry was on February 29th. A 20 year range was chosen because Google has not gone through any major design changes. The static nature implies that any changes made during this era were likely part of a general shift or growth in tendencies rather than versioning. Further, while Google’s services and identity as a corporation have grown immensely throughout these 20 years, many of these changes occurred under the user interface and the depth of these changes is limited by the surface level view provided by the Wayback Machine necessitating a longer time period in order to detect changes. Through careful examination of Google.com’s history, small changes such as the development of the Doodle, adding widgets to search, increasing sponsored content in searches, and an increase in links to other services on Google’s homepage, were detected. Each of these changes hints at extensive developments in Google’s webpage inline with shifts in internet culture. The changes in design visible through the Wayback Machine hint at a growth in the Web as a platform, and an increase in personalized dynamic content, as well as a reliance on user input and interaction that cannot be fully appreciated in its archived form. Throughout Google’s history, the design of the page has gradually changed in terms of it’s doodle, search format, search results, and platform access hinting at shifts in internet culture towards dynamic interactive content and platformization that happened over time rather than in versions. 
        </div>
        <p class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Doodles</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The frequent change of Google’s logo on google.com, known as the Google Doodle, seemingly exemplifies the principles of Web 2.0, however it’s rise in 1988 indicates that it was an extension of Web 1.0 rather than a shift in internet culture. Google has a tradition of commemorating special events, messages, and anniversaries with “Google Doodles” , a temporary change in Google’s logo to match a theme. The first Google doodle was released in 1988 as a joke. In 2000, Google asked an intern to create a Google doodle for Bastille Day as a test case. The doodle was positively received and so Google kept creating them eventually developing a team of Doodlers to the cause. This reception of user feedback is an element of the constant Beta principle of Web 2.0. Google tested the idea of the Doodle on users and tracked their feedback, rather than testing on an internal committee. Eventually, Google started to take requests for days to celebrate, and even doodle art from the general public. This willingness to incorporate user content exemplifies the “bottom-up” development of Web 2.0 pages. Thus, it seems as though Google’s growth within the Doodle follows principles of the 2.0 timeline as the Web 2.0 era rose. However, this was a gradual growth of technology, not a drastic change in culture implied by the use of versions. Allen argues that versions create a narrative that may not actually exist. Versions imply that there is something new developed, while maintaining some sense of continuity (Allen 264). The Google Doodle has evolved over time, not suddenly released with new technology or brand new ideas. This gradual change displays the shifts in internet culture towards user generated content and the perpetual Beta, but rejects the language of versioning inherent in Web 2.0.
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Even if Google does not fit with the language of versions, the design of the Google Doodle represents growth in internet culture. Google Doodles are interactive, personalized, and constantly changing. This dynamic content represents a tendency to continually change content, that O’Reilly terms the “End of the Software Release Cycle” (PP).  Instead of releasing major changes, Google is making small changes to it’s site nearly daily. Additionally, the Doodle changes based on a user’s location indicating a kind of personalization that would not be possible on the static page that is most prevalent in the Web 1.0 era. The interactivity and dynamic pages were a natural progression from the early days of linked content(Burnett and Marshal PP). Finally, the rise of Doodle’s that encourage user interaction, such as games or multimedia, represent the shift away from the animated yet passive Flash technology (Ankerson PP). While Doodle’s were never made using Flash, a fact that is illuminated by the Wayback Machine’s ability to load them, they are still a representation of the increasing value placed on interactivity over passive Flash in the more modern days of the internet. The key characteristics of the development and rise of the Doodle display the development of the design of the modern internet.
        </div>
        <p class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Widgets</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Although the visual design of Search has only changed slightly in the past two decades, there have been many quality-of-life improvements, fulfilling O’Reilly’s 7th Principle of Web 2.0: a rich user experience. It has evolved from a bare-bones list of results to a search engine containing new widgets, advanced search options, and voice recognition.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;One impactful design change to Google Search are the widgets.They serve to provide users with certain information immediately, saving valuable time that adds up over billions of searches. Although it only saves one click, it almost halves the time required for a user to find their results. Some examples of these widgets include the weather forecast, sports scores and standings, the definition of a word, and the calculator.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Through these past two decades, Google Search has become more personalized. If someone in London, Canada searches up “London weather”, Google correctly reports the forecast for them instead of the more famous London, UK. If Google’s content was still static like most webpages during Web 1.0, it would likely only serve results for forecasts for London, UK. Another example would be searching up an arbitrary animal. If a marine biologist searched up “dolphins”, academic articles and news about dolphins would appear, whereas a Miami Dolphins fan would be served a sports widget with the team’s schedule and scores.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another improvement is the advanced search customization. For example, if someone was writing a paper and needed credible information, they could append “:.edu OR :.gov” to the end of their query to only get websites that end in .edu or .gov. Like the widgets, this helps to save valuable time if someone is looking for more credible information.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In 2011, Google added Voice Search, allowing users to search simply by speaking. This not only helps to save time but also helps those who cannot easily type.  Additionally, for Voice Search results that include widgets, Google reads the info aloud, which helps the visually impaired. This exemplifies how websites have been becoming more accessible over time.
        </div>
        <p class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Personalization</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The transition from Web 1.0 to Web 2.0 marked the birth of a participative social web on the internet and significant modifications in the way web pages were designed and used. Core features of Web 2.0 companies include the ability to harness collective intelligence and leverage the “long-tail” through customer self-service. The long tail is a business strategy coined by Chris Anderson that allows companies to realize significant profits by selling low volumes of hard-to-find items to many customers, instead of only selling large volumes of a reduced number of popular items. At its core, Google’s success as a search engine and advertising partner stems from its advertising technique that has the ability to do these two things efficiently.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While Web 2.0 marked a large shift in the way websites were designed and utilized, Google as a page has stayed relatively the same throughout the years. The core services the site provides have not changed drastically, but have rather been continually modified with slight updates and changes to its indices over time. For example, PageRank, a defining Web 2.0 feature of Google, is an algorithm used by Google Search to rank web pages in their search engine results. According to Google, PageRank works by counting the number and quality of links to a page to determine a rough estimate of how important the website is. Tim O’Reilly highlights this as a “breakthrough in search which quickly made Google the undisputed search market leader.” Nowadays, there is much more that influences a website’s ranking in search, but PageRank marked a new method of providing better search results.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google’s PageRank, an application of harnessing collective intelligence, has gone hand in hand with other Google services such as Google Ads and Adsense to leverage the long-tail and match customers with retailers. Google Ads is a service in which users and advertisers can pay to appear in Google search results pertaining to specific keywords, while Google AdSense is a program in which clients can pay to advertise their products on other related user channels and websites. As Tim O’Reilly puts it, “Google figured out how to enable ad placement on virtually any webpage.” In terms of search ads, rather than utilizing pop up or banner ads, Google favored the use of minimally intrusive, consumer-friendly text advertising.
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take the search phrase “shoes” for example. When on the Wayback Machine, a search of the term shoes on Google will bring up an older looking version of Google that looks archaic compared to what we have now. However, upon further examination, we can see that although the page looks much different, its functions are more or less the same when it comes to advertising and search results. In the Wayback Machine version, there is text-advertising for shoe retailers at the top of the search results (Google Ads), and we can see that there are over 1,420,000,000 results for shoes. Following the ads placed at the top, we can see more links to shoe retailers which have been ranked by PageRank. In contrast to the Wayback Machine version, a current search of the term “shoes” will bring up a similar page with more contemporary features. In addition to the ads filtered towards the top of the search page, the current version of Google provides results for shoe stores near your physical location as well as a map of all of the retailers in your area. There is also a tab labeled “Popular Products” which provides pictures of different shoes that link to different websites. We can also see that there are now over 5,400,000,000 results for “shoes” in the current day, which is not only a testament to the passage of time, but the Web 2.0 feature of increased user generated content and interactivity as well.
        </div>
        <p class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Wayback Machine Retrospection</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;One drawback of the Wayback Machine is the snapshots for personalized websites are from the perspective of who took the snapshot. Looking at one Wayback result for the Google search of `“google”`, the top result is “google.ca”. We can assume the archivist is Canadian. However, if someone wanted to view a website in a less common language or from the perspective of a small country, it’s much less likely for that to happen. The ability to find more obscure perspectives on the Wayback Machine is inversely related to the level of personalization of a website.
        </div>
    </div>
    <p on:click={() => animateScroll.scrollToTop()} class="text-center date hover:underline cursor-pointer pb-20">back to top</p>
    </div>
</div>
