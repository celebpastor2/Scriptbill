//zoopla scrapping
function zooplaCrawler(){
	let lz = document.getElementsByClassName("_1rsduz00");
	let x;
	for( x = 0; x < lz.length; x++ ){
		lz[x].onclick = function(){
			setTimeout( () =>{
				let num 	= this.innerText;
				let prog = localStorage.numbers;
				
				if( typeof prog == "undefined" ){
					prog = [];
				} else {
					prog = JSON.parse( prog );
				}
				if( ! prog.includes( num ) ){
					prog.push( num );
				}
				
				localStorage.numbers = JSON.stringify( prog );
			}, 5000);
		}
		lz[x].click();
		
	}
}

function crawlConnect(){
	if( ! location.href.includes("connectnigeria") ) return;
	let nums = document.getElementsByClassName("text-mainBlack-80 break-all font-medium");
	let x, num, data = [], email = [], number;
	
	if( localStorage.numbers ){
		data 		= JSON.parse( localStorage.numbers );
	}
	
	if( localStorage.emails ){
		email 		= JSON.parse( localStorage.emails );
	}
	
	for( x = 0; x < nums.length; x++ ){
		num 		= nums[x];
		number 		= num.innerText;		
		
		if( ! data.includes( number ) && ! isNaN( number * 1 ) ){
			data.push( number );
		}
		else if( ! email.includes( number ) && number.includes( "@" ) ){
			email.push( number );
		}
	}
	
	localStorage.numbers = JSON.stringify( data );
	localStorage.emails  = JSON.stringify( email );
	let next = document.getElementsByClassName("ant-pagination-next");
	let page  = 1;
	
	if( localStorage.page )
		page = localStorage.page * 1;
	
	
	setTimeout(()=>{
		next[0].click();
		setTimeout( ()=>{
			page++;
			console.log( "Crawling Page " + page );
			localStorage.page = page;
			crawlConnect();
		}, 15000 );
	},10000);
}

crawlConnect();

function crawlYellowPageUSA(){
	if( ! location.href.includes("yellowpages") ) return;
	let nums = document.getElementsByClassName("phones phone primary");
	let x, num, data = [], email = [], number;
	
	if( localStorage.numbers ){
		data 		= JSON.parse( localStorage.numbers );
	}	
	
	for( x = 0; x < nums.length; x++ ){
		num 		= nums[x];
		number 		= num.innerText;		
		
		if( ! data.includes( number ) ){
			data.push( number );
		}
		
	}
	
	localStorage.numbers = JSON.stringify( data );
	let next = document.getElementsByClassName("next ajax-page");
	let page  = 1;
	
	if( localStorage.page )
		page = localStorage.page * 1;
	
	
	setTimeout(()=>{
		next[0].click();
		setTimeout( ()=>{
			page++;
			console.log( "Crawling Page " + page );
			localStorage.page = page;
			crawlYellowPageUSA();
		}, 15000 );
	},10000);
}
crawlYellowPageUSA();

//phones phone primary
//next ajax-page

function crawlJiji(){
	if( ! location.href.includes("jiji") ) return;
	//jiji crawler
	let url;
	let slugs = ['furniture', 'garden', 'decor-accessories', 'home-appliances', 'kitchen-appliances', 'kitchen-and-dining', 'household-chemicals'];
	let x, y, z;
	
	if( ! localStorage.next_url ) {
		url = new URL("https://jiji.ng/api_web/v1/listing?slug=furniture&init_page=true&page=1&webp=true");
		x = localStorage;
	
		if( ! x.slug )
			x.slug = 0;
		
		if( x.cSlug != slugs[ x.slug * 1 ] )
			x.cSlug = slugs[ x.slug * 1 ];
		
		url.searchParams.set( "slug", x.cSlug );
	} else {
		url = new URL( localStorage.next_url );
	}
	
	
	fetch( url ).then( response =>{
		return response.json();
	}).then( result =>{
		let numbers = [];
		let user_data = {};
		
		if( localStorage.numbers ){
			numbers = JSON.parse( localStorage.numbers );
		}
		
		if( localStorage.user_data ){
			user_data = JSON.parse( localStorage.user_data );
		}
		
		//console.log( result );
		
		let adverts = result.adverts_list.adverts, ads, data;
		
		for( y = 0; y < adverts.length; y++ ){
			ads = adverts[y];
						
			if( ! user_data[ ads.user_phone ] )
					user_data[ ads.user_phone ] = {};
				
			if( ! user_data[ ads.user_phone ].store )
					user_data[ ads.user_phone ].store = [];

			if( ! user_data[ ads.user_phone ].store.includes( ads.url ) )
				user_data[ ads.user_phone ].store.push( ads.url );
			
			if( numbers.includes( ads.user_phone ) ) continue
			
			user_data[ ads.user_phone ].messages = ads.messages_url;
			
			numbers.push( ads.user_phone );
			
			localStorage.numbers = JSON.stringify( numbers );
			localStorage.user_data = JSON.stringify( user_data );			
		}
		
		if( ! result.next_url || result.next_url == "" || ( localStorage.increment * 1 ) >= 60 ){
			localStorage.increment = 10;
			delete localStorage.next_url;
			let slug = localStorage.slug;
			slug++;
			localStorage.slug = slug;
			
		} else {		
			localStorage.next_url  = result.next_url;
		}		
		
		if( ! localStorage.increment )
			localStorage.increment = 10;
		
		z =  localStorage.increment * 1;
		
		setTimeout( ()=>{
			console.log( "Next Crawl will Happen in " + z + " Seconds, url to crawl: " + localStorage.next_url );
			z++;
			localStorage.increment = z;
			crawlJiji();
		}, z * 1000 );
	});
}
crawlJiji();


function download( data, filename, dataType ){
		console.log("download running");
		if( ! dataType ) dataType = 'text/csv';
		
		var a = document.createElement('a');
		var blob = new Blob( [data, { 'type': dataType }] );
		a.href = window.URL.createObjectURL( blob );
		a.download = filename;
		a.click();
}