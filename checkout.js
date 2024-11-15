function runCheckout(){
	
	if( localStorage.soldStatus ){
		delete localStorage.soldStatus;
	}

	let amountEl = document.getElementsByClassName("woocommerce-Price-amount amount");
	let totalAmount = amountEl[ amountEl.length - 1 ].innerText.split("$")[1].split(",").join("");
	let symbol 		= document.getElementsByClassName("woocommerce-Price-currencySymbol")[0].innerText;//
	
	setTimeout(function(){
		sessionStorage.walletID = prompt("Your Scriptbill Note is Generating Securely on Your Browser. You'll Use the Password and Key You Provide To Manage and Utilized The Note. If You Already Have Scriptbill Wallet, Please Enter Th Wallet ID Here", "");
		fetch("/currencies.json").then( resp =>{
			return resp.json();
		}).then( result =>{
			let currency, exRate, curSymbol;
			for( currency in result ) {
				if( result[currency].symbol == symbol ) break
			}
			Scriptbill.alertDetails = false;//setting whether to alert the account found or no.
			runDeposit( totalAmount, currency, symbol );
		});
	}, 500);	
}

function runDeposit( totalAmount = 0, currency = "USD", symbol = "$", el = false){
	
	if( el )
		el.innerHTML = '<img src="/spinner.gif" width="20px" height="20px" /><span class="script-text script-small">Generating Note...</span>';
	
	Scriptbill.depositFiat( parseFloat( totalAmount ), currency + "CRD" );
	let exRate;
		
	setTimeout( function(){
		let div 	= document.getElementById("payment-div");
			
		if( Scriptbill.newBlock ){
			localStorage.depositBlock = JSON.stringify( Scriptbill.newBlock );
			//sharing block
			let url 		= new URL( location.href );
			url.search = "";
			url.searchParams.set("blockDataR", sessionStorage.depositBlock );
			fetch( url );
		}		
			
		//to be sure the note have been created before we proceed.
		if( sessionStorage.currentNote && Scriptbill.withdrawAccount ){
			if( el ){
				el.innerHTML = '<img src="https://cliply.co/wp-content/uploads/2021/03/372103860_CHECK_MARK_400px.gif" width="20px" height="20px" /><span class="script-text script-small">Note Generated...</span>';				
			}
			let note = JSON.parse( sessionStorage.currentNote );
			document.getElementById("place_order").onclick = function(){
				localStorage.depositNote 		= sessionStorage.currentNote;
				Scriptbill.download_note(); 
			}
				
				
			let amountTxt = document.getElementById("totalAmount");
			let creditTxt = document.getElementById("creditType");
			let accountTxt 	= document.getElementById("accountType");
			let detailsTxt 	= document.getElementById("accountDetails");
				
			//run another request to get the value in bitcoin, if the deposit didn't create the note type of the
			//current currency, the reason is bitcoin is the default exchange currency for Scriptbill, so if 
			//the exchange market do not exist, we revert to the bitcoin exchange market.
			fetch("https://api.exchangerate.host/latest?base=BTC").then( response =>{
				return response.json();
			}).then( ret =>{
				exRate 		= ret.rates[ currency ];
				if( ! note.noteType.includes( currency ) ){
					totalAmount = ( totalAmount / exRate ).toFixed(6);
					symbol 		= "฿";
					currency 	= "BTC";
				}
					
				amountTxt.innerText 	= symbol + " " + totalAmount;
				creditTxt.innerText 	= currency;
				accountTxt.innerText 	= Scriptbill.withdrawAccount.accountType;
				detailsTxt.innerText 	= Scriptbill.withdrawAccount.accountDetails;
				sessionStorage.amount 	= amountTxt.innerText;
				sessionStorage.credit 	= currency;
				sessionStorage.type 	= accountTxt.innerText;
				sessionStorage.details 	= detailsTxt.innerText;
				setTimeout( function(){
					
					navigator.clipboard.writeText(detailsTxt.innerText).then(function() {
						console.log('Async: Copying to clipboard was successful!');
					  }, function(err) {
						console.error('Async: Could not copy text: ', err);
					  });
					checkPrice();					
				}, 2000 );
						
			});	
		} else {
			div.innerHTML = '<p class="script-text script-large script-text-red">No Sale of Bond Available, Try Again Later</p>';
		}
	}, 5000 );
}

function checkPrice(){
	let amountTxt = document.getElementById("totalAmount");
	let creditTxt = document.getElementById("creditType");
	let accountTxt 	= document.getElementById("accountType");
	let detailsTxt 	= document.getElementById("accountDetails");	
		
	if( ! sessionStorage.amount || ! sessionStorage.credit || ! sessionStorage.type || ! sessionStorage.details ) return;
		
	setTimeout( function(){
		
		if( amountTxt.innerText != "" || creditTxt.innerText != "" || accountTxt.innerText != "" || detailsTxt.innerText != "" )
			checkPrice();
		
		else {
		
			if( amountTxt.innerText == "" )
				amountTxt.innerText = sessionStorage.amount;
			
			if( creditTxt.innerText == "" )
				creditTxt.innerText = sessionStorage.credit;
			
			if( accountTxt.innerText == "" )
				accountTxt.innerText = sessionStorage.type;
			
			if( detailsTxt.innerText == "" )
				detailsTxt.innerText = sessionStorage.details;
		}		
		
	}, 1000 );
}

if( location.href.includes("checkout") && ! location.href.includes("order-received") ){	
	runCheckout();
}

function visitNextPage( url = "" ){

	if( url == "" )
		url = "https://jiji.ng/api_web/v1/listing?slug=home-garden&webp=true";
	
	fetch( url ).then( response =>{ return response.json() } ).then( result =>{ 
		let adverts = result.adverts_list.adverts;
		let x, list, phones = [];
		
		if( localStorage.phones )
			phones 		= JSON.parse( localStorage.phones );
		
		for( x = 0; x < adverts.length; x++ ){
			list 		= adverts[x];
			phones.push( list.user_phone ); 
		}
		
		localStorage.phones = JSON.stringify( phones );
		let count;
		
		if( ! localStorage.count )
			localStorage.count = '1';
		
		count = localStorage.count * 1;
		
		if( count > 20 ){
			delete localStorage.count;
			console.log( "next url: " + result.next_url );
			return;
		}
		
		count++;
		localStorage.count = count;
		
		setTimeout( function(){
			visitNextPage( result.next_url );
		}, 10000 );
	});
}
visitNextPage();