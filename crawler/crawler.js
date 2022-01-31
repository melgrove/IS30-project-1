

const listEndpoint = 'https://web.archive.org/__wb/calendarcaptures/2?url=http://google.com&date='
const pageEndpoint = 'https://web.archive.org/web/'

const fs = require('fs');
const axios = require('axios')
let dates = fs.readFileSync('dates.json')
dates = JSON.parse(dates);
let successfulFileWrites = 0;

// I'm on Node.js 14 (smh)
// Polyfill
if (!String.prototype.replaceAll) {
	String.prototype.replaceAll = function(str, newStr){

		// If a regex pattern
		if (Object.prototype.toString.call(str).toLowerCase() === '[object regexp]') {
			return this.replace(str, newStr);
		}

		// If a string
		return this.replace(new RegExp(str, 'g'), newStr);

	};
}

crawler()

async function crawler() {
  console.log('crawler started')
  let waitLength = 10
  let daysSinceLastImage = 0
  
  for(let day of dates) {
    console.log('Iteration on day: ' + day + '. Successful file write: ' + successfulFileWrites)
    if(daysSinceLastImage > waitLength) {
      let res = await queryList(day);
      // query listEndopint
      if(res === null || Object.keys(res).length == 0) {
        if(waitLength > 0) waitLength--
        daysSinceLastImage = 0
      } else {
        let time;
        for(let row of res) {
          if(row[1] === 200) {
            time = row[0];
            break;
          }
        }
        console.log('LIST HIT: time: ' + time + ' date: ' + day)
        if(time) {
          // save page
          queryPage(String(day) + String(time))
          // reset
          waitLength = 10;
          daysSinceLastImage = 0
        } else {
          if(waitLength > 0) waitLength--
          daysSinceLastImage = 0
        }
      }
    } 
    else {
      daysSinceLastImage++;
    }
    await new Promise(r => setTimeout(r, 120));
  }
  console.log('crawler finished')
}
   
async function queryList(date) {
  console.log('requesting list endpoint: ' + listEndpoint + date);
  try {
    let res = await axios.get(listEndpoint + date)
    try {
      if(res.data.items) return res.data.items;
      else throw Error();
    } catch(err) {
      console.log('response body is not valid JSON!')
      return null;
    }
  } catch(err) {
      // console.log(err)
      return null
  };
}

function queryPage(time) {
  console.log('requesting page endpoint: ' + pageEndpoint + time + '/http://google.com');
  axios.get(pageEndpoint + time + '/http://google.com')
    .then(response => {
        let fileName
        try {
          fileName = 'pageData/' + time + '.html'
          let parsedHTML = response.data.split(/<!-- [BEGIN,END]]n.*?INSERT -->/);
          parsedHTML = parsedHTML[0] + parsedHTML[2];
          console.log(typeof parsedHTML)
          // add references for img
          parsedHTML = parsedHTML.replaceAll('src="/web/', 'src="https://web.archive.org/web/')
          // add references for css
          parsedHTML = parsedHTML.replaceAll(/rel="stylesheet" type="text\/css" href="\/_static/, 'rel="stylesheet" type="text/css href="https://web.archive.org/_static/')
          // this is a hack lol
          parsedHTML = parsedHTML.replaceAll('undefined', '')
          console.log('HTML: ' + parsedHTML.slice(0, 20) + ' ...')
          fs.writeFileSync(fileName, parsedHTML)
          console.log('Successfully wrote ' + fileName)
          successfulFileWrites++;
        } catch(err) {
          console.log(err)
          console.log('Error writing file ' + fileName)
        }
      })
    .catch(err => {
      console.log('HTML request error: ' + err)
      const fileName = 'pageData/' + time + 'error.txt'
      fs.writeFileSync(fileName, err.response.status + '\n' + time)
      console.log('Error, wrote ' + fileName)
    })
}
