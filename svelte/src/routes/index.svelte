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
    
    .link {
        font-weight: 400;
        font-family: 'Lora', serif;
        font-size: 18px;
        line-height: 45px;
        word-spacing: 3px;
        color: #406ba3;
        text-decoration: black wavy underline;
        background-color: #f7f7f7;
        cursor: pointer;
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
    <div style= "height: 4.5em; z-index: 1000; padding-top: 3em" class="shadow-lg w-full bg-white flex flex-row justify-center items-center fixed">
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
        <button on:click={() => animateScroll.scrollTo({element: '#conclusion', offset: -100})} class="h-10 mt-4 mr-4 px-2 bg-blue-100 hover:bg-gray-200 text-bold rounded border shadow border-black fontfam ">
            Conclusion
        </button>
    </div>
</div>
</header>
<div class="h-full w-full bg-blue-100 pt-20">
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
    <!-- Writing -->
    <div class="flex flex-col w-full items-center mt-[620px] ">
        <div class="rounded-2xl  px-6 name-box bg-blue-200 mx-4 mt-4">
            <p id="intro" class="special">A report by Lindsey Parungo, Cameron Chevre, Matthew Yu, and Oliver Melgrove</p>
        </div>
    <div class="flex flex-col w-11/12 sm:w-4/5 items-center bg-white shadow mt-10 pt-20 pb-20 mb-20">
        <p class="header relative  w-2/3 border-b-4 border-[#406ba3]">Introduction</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google has looked pretty much the same since it was created in 1998. Even when playing Google.com on a timelapse, the changes are hardly noticeable. Throughout this article, we track aspects of Google.com's change in design from February 29, 2000 until February 29, 2020. This range was selected as Google was in a beta form in 1998 and 1999, and the first 2000s entry was on February 29th. A 20 year range was chosen because Google has not gone through any major design changes. The static nature implies that any changes made during this era were likely part of a general shift or growth in tendencies rather than versioning. Further, while Google’s services and identity as a corporation have grown immensely throughout these 20 years, many of these changes occurred under the user interface and the depth of these changes is limited by the surface level view provided by the Wayback Machine necessitating a longer time period in order to detect changes. Through careful examination of Google.com’s history, small changes such as the development of the Doodle, adding widgets to search, increasing sponsored content in searches, and an increase in links to other services on Google’s homepage, were detected. Each of these changes hints at extensive developments in Google’s webpage inline with shifts in internet culture. The changes in design visible through the Wayback Machine hint at a growth in the Web as a platform, and an increase in personalized dynamic content, as well as a reliance on user input and interaction that cannot be fully appreciated in its archived form. Throughout Google’s history, the design of the page has gradually changed in terms of it’s doodle, search format, search results, and platform access hinting at shifts in internet culture towards dynamic interactive content and platformization that happened over time rather than in versions. 
        </div>
        <p id = "doodles" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Doodles</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            <figure style = "float: left; width:50%; margin-bottom: -10px" >
                <img  src = "./images/Bastille_Day.gif">
                <p class = "caption">The first serious Google Doodle was produced for Bastille day. It served as a Beta to test popular reactions to the new idea.</p>
            </figure>
            The frequent change of Google’s logo on google.com, known as the Google Doodle, seemingly exemplifies the principles of Web 2.0, however it’s rise in 1988 indicates that it was an extension of Web 1.0 rather than a shift in internet culture. Google has a tradition of commemorating special events, messages, and anniversaries with “Google Doodles” , a temporary change in Google’s logo to match a theme. The first Google doodle was released in 1988 as a joke. In 2000, Google asked an intern to create a Google doodle for Bastille Day as a test case. The doodle was positively received and so Google kept creating them eventually developing a team of Doodlers to the cause. This reception of user feedback is an element of the constant Beta principle of Web 2.0. Google tested the idea of the Doodle on users and tracked their feedback, rather than testing on an internal committee.
            <figure>
                <img src = "./images/Doodle4Google.png">
                <p class = "caption">This doodle was user submitted in the Doodle4Google competition, an annual event in which users submit doodle art to be displayed on Google.com</p>
            </figure>
            As time moved forward, Google started to take requests for days to celebrate, and even doodle art from the general public. This willingness to incorporate user content exemplifies the “bottom-up” development of Web 2.0 pages. Thus, it seems as though Google’s growth within the Doodle follows principles of the 2.0 timeline as the Web 2.0 era rose. However, this was a gradual growth of technology, not a drastic change in culture implied by the use of versions. Allen argues that versions create a narrative that may not actually exist. Versions imply that there is something new developed, while maintaining some sense of continuity (Allen pp. 264). The Google Doodle has evolved over time, not suddenly released with new technology or brand new ideas. This gradual change displays the shifts in internet culture towards user generated content and the perpetual Beta, but rejects the language of versioning inherent in Web 2.0.
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Even if Google does not fit with the language of versions, the design of the Google Doodle represents growth in internet culture. Google Doodles are interactive, personalized, and constantly changing. The dynamic nature of the Doodle  represents a tendency to continually change content which O’Reilly terms the “End of the Software Release Cycle” (pp. 4).  Instead of releasing major changes, Google is making small changes to it’s site nearly daily.
            </div>
            <figure class = "items-center">
                <div style = "margin-left: 7%">
                    <img style= "width:45%;" src = "./images/Nov10Sesame.png">
                    <img style= "width:45%;" src = "./images/Nov11_VeteransDay.png">
                </div>
                <img style= "width:45%; margin-left:25%; margin-right:auto; display: block" src = "./images/Nov12_Std.png">
                <p class = "caption">These doodles were selected on 3 consecutive days and display Google's ability to make small daily changes for dynamic content.</p>
            </figure>
            <div class="body w-5/6 sm:w-3/5 mt-8">
            Additionally, the Doodle changes based on a user’s location indicating a kind of personalization that would not be possible on the static page that is most prevalent in the Web 1.0 era. The interactivity and dynamic pages were a natural progression from the early days of linked content(Burnett and Marshal pp 84-87). As one moves forward in time, the Google Doodles increase in their level of interactivity including games and other multimedia. As an example for Valentine’s Day in 2017, Google released a Doodle game where the user helps a pangolin reach their valentine. Unfortunately the Wayback Machine does not seem to be able to load these features and instead displays a still image of the Doodle.
            <figure>
                <img src = "./images/Feb1417.png">
                <p class = "caption">This doodle was released for Valentine's day and was originally displayed as an interactive game. Unfortunately that functionality is lost on the Wayback Machine.</p>
            </figure>
            However, Google archives their own Doodles, so these games can be found. The rise of Doodle’s that encourage user interaction, such as games or multimedia, represent the shift away from the animated yet passive Flash technology. This Flash technology became a subject of scorn due to its passive and inaccessible nature (Ankerson pp. 393). While Doodle’s were never made using Flash, a fact that is illuminated by the Wayback Machine’s ability to load them, they are still a representation of the increasing value placed on interactivity over passive Flash in the more modern days of the internet. The key characteristics of the development and rise of the Doodle display the development of the design of the modern internet.
        </div>
        <p id = "user-experience" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">User Experience</p>
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
        <p id = "empire" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">The Google Empire</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Over the first two decades of the millennium, Google has evolved from a simple database based on a clever algorithm, to an indispensable empire that is almost synonymous with the internet itself. This is clear even when looking at the homepage of google, which has hardly changed at all over this incredible transformative period. At <span class="link" on:click={() => setTimeline(19990428)}>its inception</span>, the only thing on the website was a search box. <span class="link" on:click={() => setTimeline(20210827)}>Now</span>, although subtle, Google has added a top bar with links to an entire platform of other services which are simultaneously completely separate, and intimately connected to Search.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google's expansion of external services is an embodiment of Web 2.0 as O'Reilly proposed it in 2005.  Unlike Netscape, Google truly realized that "the value of the software is proportional to the scale and dynamism of the data it helps to manage" (O'Reilly pp 1). A perfect example of this, which is <span class="link" on:click={() => setTimeline(20080306)}>meekly shown</span> in the header of Google Search, is Gmail. Google didn't generate revenue from licensing the software to the end user or demanding a cost to use it, instead they allowed use of it and instead generated revenue from the data of the massive amount of people who used it.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another piece of the puzzle, which has propelled GSuite, Gmail, Maps, and others into what they are today, is O'Reilly's idea of Rich User Experiences. Previously, complex and interactive experiences could only be found on PCs, and inflexible applets and flash applications. Consequently, "the potential of the web to deliver full scale applications didn't hit the mainstream till Google introduced Gmail" (O'Reilly pp 5). The technological breakthrough which allowed web applications with rich user experiences was the extended use of JavaScript, and subsequently AJAX in the browser. Instead of sites being unchangeable pages similar to physical pieces of paper, websites can now load external data after they have been served and change the format of the site completely by manipulating the DOM with JavaScript. A new era began, where "web developers are finally able to build web applications as rich as local PC-based applications" (O'Reilly pp 5).
        </div>
        <p id = "search-ads" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Search & Ads</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The transition from Web 1.0 to Web 2.0 marked the birth of a participative social web on the internet and significant modifications in the way web pages were designed and used. Core features of Web 2.0 companies include the ability to harness collective intelligence and leverage the “long-tail” through customer self-service. The long tail is a business strategy coined by Chris Anderson that allows companies to realize significant profits by selling low volumes of hard-to-find items to many customers, instead of only selling large volumes of a reduced number of popular items. At its core, Google’s success as a search engine and advertising partner stems from its advertising technique that has the ability to do these two things efficiently. 
        </div>
        <p class="break relative w-2/3 text-center mt-8 -mb-2">***</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;While Web 2.0 marked a large shift in the way websites were designed and utilized, Google as a page has stayed relatively the same throughout the years. The core services the site provides have not changed drastically, but have rather been continually modified with slight updates and changes to its indices over time. For example, PageRank, a defining Web 2.0 feature of Google, is an algorithm used by Google Search to rank web pages in their search engine results. According to Google, PageRank works by counting the number and quality of links to a page to determine a rough estimate of how important the website is. Tim O’Reilly highlights this as a “breakthrough in search which quickly made Google the undisputed search market leader.” Nowadays, there is much more that influences a website’s ranking in search, but PageRank marked a new method of providing better search results.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Google’s PageRank, an application of harnessing collective intelligence, has gone hand in hand with other Google services such as Google Ads and Adsense to leverage the long-tail and match customers with retailers. Google Ads is a service in which users and advertisers can pay to appear in Google search results pertaining to specific keywords, while Google AdSense is a program in which clients can pay to advertise their products on other related user channels and websites. As Tim O’Reilly puts it, “Google figured out how to enable ad placement on virtually any webpage.” In terms of search ads, rather than utilizing pop up or banner ads, Google favored the use of minimally intrusive, consumer-friendly text advertising. 
        </div>
        <figure class = "items-center">
            <img style= "width:45%; margin-left:25%; margin-right:auto; margin-bottom: 5px; display: block" src = "./images/shoeswayback.png">
            <div style = "margin-left: 5%">
                <img style= "width:45%" src = "./images/shoes1.png">
                <img style= "width:49%" src = "./images/shoes2.png">
            </div>
            <p class = "caption">The first of these images was taken on the wayback machine to show what a search used to look like, using the example search of shoes. The second to images show what a modern day search of the same keyword "shoes" brings up</p>
        </figure>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Take the search phrase “shoes” for example. When on the Wayback Machine, a search of the term shoes on Google will bring up an older looking version of Google that looks archaic compared to what we have now. However, upon further examination, we can see that although the page looks much different, its functions are more or less the same when it comes to advertising and search results. In the Wayback Machine version, there is text-advertising for shoe retailers at the top of the search results (Google Ads), and we can see that there are over 1,420,000,000 results for shoes. Following the ads placed at the top, we can see more links to shoe retailers which have been ranked by PageRank. In contrast to the Wayback Machine version, a current search of the term “shoes” will bring up a similar page with more contemporary features. In addition to the ads filtered towards the top of the search page, the current version of Google provides results for shoe stores near your physical location as well as a map of all of the retailers in your area. There is also a tab labeled “Popular Products” which provides pictures of different shoes that link to different websites. We can also see that there are now over 5,400,000,000 results for “shoes” in the current day, which is not only a testament to the passage of time, but the Web 2.0 feature of increased user generated content and interactivity as well.
        </div>
        <p id = "wayback" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Wayback Machine Retrospection</p>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Despite its best efforts to accurately document large portions of web history, the Wayback Machine has its fair share of limitations. The biggest advantage of the Wayback Machine is the wide range of sites crawled: by 2010, over 150 million pages were archived. However, this breadth comes at a price of depth, consistency, and accuracy.. The entire contents of a site are rarely preserved while the snapshots are often incomplete containing missing images and broken links. In the case of Google, the Wayback Machine is able to provide snapshots of the Google homepage and its respective search results layout throughout time. However, if you attempt to click on a link after completing a search or try to utilize any search tools such as images, videos, or news, the links are broken and will take you back to the Wayback Machine homepage.
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;In addition to incomplete information within the snapshots, the Wayback Machine can only archive web pages that existed at a certain date and time, thus its content represents only a small fraction of the Internet at any particular time. Not to mention these archived snapshots of web pages are taken through the perspective of the archiver, so the Wayback Machine is unable to give insight into how a web page is utilized by users on a broader scale. In Google’s case, we are unable to see how search results and ads can vary between users because we are only given one point of reference for a particular moment in time. 
        </div>
        <div class="body w-5/6 sm:w-3/5 mt-8">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Another limitation is that we only see dynamic and personalized content that is loaded by the archiver. Looking at one Wayback result for the Google search of `“google”`, the top result is “google.ca”. We can assume the archivist is Canadian. However, if someone wanted to view a website in a less common language or from the perspective of a small country, it’s much less likely for that to happen. 
        </div>
        <p id = "conclusion" class="header relative mt-12 w-2/3 border-b-4 border-[#406ba3]">Conclusion</p>
    </div>
    <p on:click={() => animateScroll.scrollToTop()} class="text-center date hover:underline cursor-pointer pb-20">back to top</p>
    </div>
</div>
