//check login modified for extension.  refer to the other check login file for plugin


const exchangeFee 	= 0.03;
const EXCHANGEKEY   = "niBWZ4PXNw1-GqQN8xu-AXI8e1JHeYeLk5M9HsYU__djtWOU9Ck20fjApW5aOU4-5ms6jjpttK4nHfYqzirQ39Aj0SjkpEwoJ5stWq3T9eQWXGeSOIq4NeB428fVJBXov1lFYU56ogLaoj41zqOcBHl3GkEtKfHxshOfDxQ0SP0";
const SERVER 		= Scriptbill.getDefaultServer();
let loginUrl 		= window.location.origin + '/HTML/login.html';
let qrcodeUrl 		= window.location.origin + '/HTML/scan-qrcode.html';
let signupUrl 		= window.location.origin + '/HTML/signup.html';
let dashboardUrl 	= window.location.origin + '/HTML/dashboard.html';
let profileUrl 		= window.location.origin + '/HTML/profile.html';
let bankUrl 		= window.location.origin + '/HTML/profile-cards-and-bank-accounts.html';
let depositUrl 		= window.location.origin + '/HTML/deposit-money.html';
let depositConfirm	= window.location.origin + '/HTML/deposit-money-confirm.html';
let depositSuccess	= window.location.origin + '/HTML/deposit-money-success.html';
let loanUrl 			= window.location.origin + '/HTML/loan.html';
let loanConfirm		= window.location.origin + '/HTML/loan-confirm.html';
let loanSuccess		= window.location.origin + '/HTML/loan-success.html';
let withdrawUrl 	= window.location.origin + '/HTML/withdraw-money.html';
let sendUrl 		= window.location.origin + '/HTML/send-money.html';
let requestUrl 		= window.location.origin + '/HTML/request-money.html';
let transUrl 		= window.location.origin + '/HTML/transactions.html';
let sendConfirm		= window.location.origin + '/HTML/send-money-confirm.html';
let requestConfirm		= window.location.origin + '/HTML/request-money-confirm.html';
let sendSuccess		= window.location.origin + '/HTML/send-money-success.html';
let requestSuccess		= window.location.origin + '/HTML/request-money-success.html';
let withdrawConfirm	= window.location.origin + '/HTML/withdraw-money-confirm.html';
let withdrawSuccess	= window.location.origin + '/HTML/withdraw-money-success.html';
let notificationUrl	= window.location.origin + '/HTML/profile-notifications.html';
let buyProduct		= window.location.origin + '/HTML/buyProduct.html';
let buyWebsite		= window.location.origin + '/HTML/buyWebsite.html';
let buyStocks		= window.location.origin + '/HTML/buyStocks.html';
let sellWebsite		= window.location.origin + '/HTML/sellWebsite.html';
let sellStocks		= window.location.origin + '/HTML/sellStocks.html';
let createAds		= window.location.origin + '/HTML/create-advert.html';
let createItem		= window.location.origin + '/HTML/create-item.html';
let sellProduct		= window.location.origin + '/HTML/sell-product.html';
let conUrl   		= new URL( window.location.href );
let spaceID 		= document.querySelector("#spaceID");
var socialShareHTML = `<div class="share-button">
  <div class="lid">Share</div>
  <div class="share-items-wrapper">
      <div class="share-items">
        <a href="#" class="share-item">      
          <span class="fa fa-copy"></span>      
        </a>
        <a href="#" class="share-item">
          <span class="fa fa-email"></span>
        </a>
        <a href="#" class="share-item">
          <span class="fa fa-whatsapp"></span>
        </a>
        <a href="#" class="share-item">
          <span class="fa fa-sms"></span>
        </a>        
      </div>
    </div>
  <div class="thank-you">
    Thank you
  </div>
</div>`;

const preloader = document.getElementById('preloader');
preloader.style.display = "block";

const transKEEY 		= Scriptbill.transactionKey;
Scriptbill.referee 		= Scriptbill.l.referee ? Scriptbill.l.referee : "";

setTimeout( async function(){
	let data = await Scriptbill.getData( 'referee', 'true', SERVER );
	
	if( data && data.length <= 24 ){
		Scriptbill.l.referee = data;
	}
}, 200 );

function formatCurrency(num)
{
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
    {
        num = "0";
    }

    sign 	= (num == (num = Math.abs(num)));
    num 	= Math.floor(num * 100 + 0.50000000001);
    cents 	= num % 100;
    num 	= Math.floor(num / 100).toString();

    if (cents < 10)
    {
        cents = "0" + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }

    return (((sign) ? '' : '-') + num + '.' + cents);
}

//defining constants that will be used through out the application.

const bankCodes ={
		"000001"	: "Sterling Bank",
		"000002"	: "Keystone Bank",							
		"000003"	: "FCMB",							
		"000004"	: "United Bank for Africa",						
		"000005"	: "Diamond Bank",							
		"000006"	: "JAIZ Bank",							
		"000007"	: "Fidelity Bank",							
		"000008"	: "Polaris Bank",							
		"000009"	: "Citi Bank",							
		"000010"	: "Ecobank Bank",							
		"000011"	: "Unity Bank",							
		"000012"	: "StanbicIBTC Bank",							
		"000013"	: "GTBank Plc",							
		"000014"	: "Access Bank",							
		"000015"	: "Zenith Bank Plc",							
		"000016"	: "First Bank of Nigeria",						
		"000017"	: "Wema Bank",							
		"000018"	: "Union Bank",							
		"000019"	: "Enterprise Bank",							
		"000020"	: "Heritage",							
		"000021"	: "Standard Chartered",							
		"000022"	: "Suntrust Bank",							
		"000023"	: "Providus Bank",							
		"000024"	: "Rand Merchant Bank",							
		"000025"	: "Titan Trust Bank",							
		"000026"	: "Taj Bank",							
		"000027"	: "Globus Bank",							
		"000028"	: "Central Bank of Nigeria",					
		"000029"	: "Lotus Bank",							
		"000031"	: "Premium Trust Bank",							
		"000033"	: "eNaira",							
		"000034"	: "Signature Bank",							
		"000036"	: "Optimus Bank",							
		"050002"	: "FEWCHORE FINANCE COMPANY LIMITED",			
		"050003"	: "SageGrey Finance Limited",					
		"050005"	: "AAA Finance",					
		"050006"	: "Branch International Financial Services",	
		"050007"	: "Tekla Finance Limited",					
		"050009"	: "Fast Credit",					
		"0500010"	: "Fundquest Financial Services Limited",		
		"0500012"	: "Enco Finance",		
		"0500013"	: "Dignity Finance",				
		"400001"	: "FSDH Merchant Bank",					
		"600001"	: "Coronation Merchant Bank",					
		"600002"	: "FBNQUEST Merchant Bank",					
		"600003"	: "Nova Merchant Bank",					
		"600004"	: "Greenwich Merchant Bank",					
		"700007"	: "Omoluabi savings and loans",					
		"090001"	: "ASOSavings and loans",					
		"090005"	: "Trustbond Mortgage bank",					
		"090006"	: "SafeTrust",					
		"090107"	: "FBN Mortgages Limited",					
		"100024"	: "Imperial Homes Mortgage",					
		"100028"	: "AG Mortgage Bank",					
		"070019"	: "MayFresh Mortgage Bank",					
		"090003"	: "Jubilee-Life Mortgage Bank",					
		"070017"	: "Haggai Mortgage Bank",					
		"070021"	: "Coop Mortgage Bank",					
		"070023"	: "Delta Trust Microfinance Bank",				
		"070024"	: "Homebase Mortgage Bank",					
		"070025"	: "Akwa Savings & Loans Limited",				
		"070026"	: "FHA Mortgage Bank",				
		"090108"	: "New Prudential Bank",				
		"070001"	: "NPF Microfinance Bank",				
		"070002"	: "Fortis Microfinance Bank",				
		"070006"	: "Covenant MFB",				
		"070008"	: "Page Financials",				
		"090004"	: "Parallex Microfinance Bank"				
	};

const URLE 		= new URL( location.href );
const CURRENTNOTE = URLE.searchParams.get( 'currentNote' );

if( CURRENTNOTE ){
	let note = atob( CURRENTNOTE );
	
	if( Scriptbill.isJsonable( note ) )
		sessionStorage.currentNote = note;

}

let req = new URL( SERVER );



if( spaceID ){
	spaceID.style.width = "40%";
}



Scriptbill.motherKeysURL = chrome.runtime.getURL('motherKeys.json');
function chunk_data( data, limit = 50 ){
	
	let remaining = data;
	let chunked   = [];
	
	for( let x = 0; x < remaining.length; x++ ){
		chunked.push( remaining.slice(0, limit ) );
		remaining = remaining.slice(limit, remaining.length );
	}
	
	if( remaining.length > limit ){
		let rechunked = chunk_data( remaining, limit );
		chunked = chunked.concat( rechunked );
	} else if( remaining.length ){
		chunked.push( remaining );
	}
		
	return chunked;
}

let profitID = setInterval( async function(){
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ){
		clearInterval( profitID );
		return;
	}
	
	let note = JSON.parse( Scriptbill.s.currentNote );	
	
	if( ! Scriptbill.l.profitSharingData ){
		clearInterval( profitID );
		return;
	}
	let time = Date.now();
	let twoWeeks 		= time - 1209600000;
	let sharingData 	= JSON.parse( Scriptbill.l.profitSharingData );
	let url 			= new URL( SERVER );
	
	for( let x = 0; x < sharingData.length; x++ ){
		if( sharingData[x].transTime <= twoWeeks ){
			sharingData.splice(x,1);
			continue;
		}
		/* url.searchParams.set("product_block", sharingData[x].server);
		url.searchParams.set("product_ID", sharingData[x].blockID);		
		url.searchParams.set("purchase_time", sharingData[x].lastTime ? sharingData[x].lastTime : sharingData[x].transTime );
		url.searchParams.set("profit_sharing", "true"); */
		let redata = await Scriptbill.getData( ["product_block", "product_ID", "purchase_time", "profit_sharing"],[sharingData[x].server, sharingData[x].blockID(sharingData[x].lastTime ? sharingData[x].lastTime : sharingData[x].transTime), "true"], url.href );
		
		if( redata ){
			
			if( ! redata.length ) continue;
			
			for( let y = 0; y < redata.length; y++ ){
				let data 		= redata[y];
				
				if( ! data.blockID )
					continue;
				
				if( data.blockID && sharingData.profitBlocks && sharingData.profitBlocks.includes( data.blockID ) )
					continue;
				
				let value 			= 0;
				let profit_value 	= parseFloat( data.profitValue );
				
				if( ! profit_value )
					continue;
				
				if( profit_value < 0.1 ){
					value 	= profit_value;
					profit_value = 0;
				} else {
					value 	= profit_value * 0.2;
					profit_value = profit_value - value;
				}
				
				data.profitValue = profit_value;
				Scriptbill.details = JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
				Scriptbill.details.transType = "PROFITSHARING";
				Scriptbill.details.transValue = value;
				Scriptbill.details.recipient = note.noteAddress;
				let newBlock = await Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details );
				
				if( ! sharingData.profitBlocks )
					sharingData.profitBlocks = [];
				
				sharingData.profitBlocks.push( data.blockID );
				
				let chunked 	= chunk_data( JSON.stringify( data ), 50 );
				let chunked2 	= chunk_data( JSON.stringify( newBlock ), 50 );
				for( let z = 0, r = 0; z < chunked.length || r < chunked2.length; y++, r++ ){
					url.search = "";
					/* url.searchParams.set( 'product_block', config.recipient );
					url.searchParams.set( 'product_save', chunked[z] );
					url.searchParams.set( 'product_key', note.noteAddress ); */
					
					if( chunked[z] )
						await Scriptbill.getData(['product_block', 'product_save', 'product_key'], [config.recipient, chunked[z], note.noteAddress], url.href );
					
					url.search = "";
					/* url.searchParams.set( 'product_block', config.recipient );
					url.searchParams.set( 'product_save', chunked2[r] );				
					url.searchParams.set( 'product_key', Scriptbill.hashed() ); */
					Scriptbill.string 	= note.noteAddress;
					if( chunked2[r] )
						await Scriptbill.getData(['product_block', 'product_save', 'product_key'], [config.recipient, chunked2[r], Scriptbill.hashed()], url.href );
				}
								
				url.search = "";
				/* url.searchParams.set( 'product_block', config.recipient );
				url.searchParams.set( 'product_save', 'STOPPED' );
				url.searchParams.set( 'product_key', note.noteAddress ); */
				await Scriptbill.getData(['product_block', 'product_save', 'product_key'], [config.recipient, 'STOPPED', note.noteAddress], url.href );
				//await fetch( url.href );
				url.search = "";
				/* url.searchParams.set( 'product_block', config.recipient );
				url.searchParams.set( 'product_save', 'STOPPED' );				
				url.searchParams.set( 'product_key', Scriptbill.hashed() ); */
				Scriptbill.string 	= note.noteAddress;
				await Scriptbill.getData(['product_block', 'product_save', 'product_key'], [config.recipient, 'STOPPED', Scriptbill.hashed()], url.href );
				sharingData[x].lastTime 		=  data.transTime;		
				Scriptbill.l.profitSharingData 	= JSON.stringify( sharingData );
			}
		}		
	}
	
}, 30000 );



/* setTimeout( async ()=>{
	if( Scriptbill.s.currentNote ){
		Scriptbill.response 		= Scriptbill.s.currentNote;
		await Scriptbill.savePersistently('ScriptNotes', 'currentNote');
	}
	else if( await Scriptbill.getDataPersistently('ScriptNotes', 'currentNote') ){
		Scriptbill.s.currentNote = await Scriptbill.getDataPersistently('ScriptNotes', 'currentNote');
	}
}, 500 ); */

function loadingDiv(){
	let div = document.getElementById("data-loading");
	
	if( ! div ){
		div = document.createElement("div");
		div.setAttribute("id", "data-loading");
		div.setAttribute("style", "position:fixed;top:0;left:0; background-color:#5555;background-image:url('images/loading.gif');background-size:20% 20%; background-position: center center; background-repeat: no-repeat;z-index:" + Date.now() + "; width:100%; height:100%;");
		document.body.appendChild( div );
	}
}

function removeLoadingDiv(){
	let div = document.getElementById("data-loading");
	
	if( div ){
		div.remove();
	}
}

var checkClick = function(el){
	
	if( ! el || ! el.tagName ) return false;
	
	let input = el.parentElement.querySelector("input");
	
	if( ! input ) return false;
		
	if( input.getAttribute("type") == "password" ){
		input.setAttribute("type", "text");
		el.querySelector("i").setAttribute("class", "fa fa-eye-slash");
	}
	else {
		input.setAttribute("type", "password");
		el.querySelector("i").setAttribute("class", "fa fa-eye");
	}
}

if( document.querySelector("#clickReveal") ){
	let click = document.querySelector("#clickReveal");	
	let click2 = document.querySelector("#clickReveal2");	
	click.onclick = function(){
		checkClick( this );
	}
	if( click2 ){
		click2.onclick = function(){
			checkClick( this );
		}
	}
}

//here we can take our time to check what the user uploaded and try to instantiate Scriptbills
if(  ( Scriptbill.s.uploadedNote || Scriptbill.l.uploadedNote ) && ! Scriptbill.s.currentNote ){
	
	let upload = (Scriptbill.s.uploadedNote ? Scriptbill.s.uploadedNote.toString() : (Scriptbill.l.uploadedNote ? Scriptbill.l.uploadedNote.toString():""));
	upload     = upload.replace('[object Object]', '');
	
	//console.log("upload: " + upload);
	
	if( upload && ( upload.match(/[a-z]/gi) || upload.match( /[2-9]/g ) ) != null ){
		//await Scriptbill.createAlert( "Uploaded Note Will Soon Be Deleted, Even Though Found!!!" );		
		delete Scriptbill.s.uploadedNote;
		location.href 	= loginUrl;
	} 
	else if( location.href.includes( dashboardUrl ) || ! location.href.includes( signupUrl ) || ! location.href.includes( loginUrl ) ){
		
		 if( ! Scriptbill.s.uploadedNote && Scriptbill.l.uploadedNote ){
			Scriptbill.s.uploadedNote = Scriptbill.l.uploadedNote;
		}
					
		let pass = "";
			
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) && ( location.href.includes( signupUrl ) && location.href.includes( loginUrl ) ) ){
			Scriptbill.pass = pass;
			Scriptbill.user_input = false;
			
			if( Scriptbill.s.user_input ){
				Scriptbill.user_input 	= true;
				pass					= Scriptbill.s.user_input;			
			}
			//console.log("constructing Scriptbills, Password:  " + pass, "The Upload " + upload );
			if( pass && upload )
				var scriptBill = Scriptbill.constructor("","", pass, upload);
		}

		let timeOut = setTimeout(function(){
			if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && Scriptbill.s.currentNote.includes("walletID") ) {
				try {
					let note = JSON.parse( Scriptbill.s.currentNote );
					//this is where the dashboard programing lies
				} catch(e){					
					delete Scriptbill.l.uploadedNote;
					delete Scriptbill.s.uploadedNote;
					location.href = loginUrl;
				}			
			}
			else if( location.href != signupUrl ){
				
				delete Scriptbill.l.uploadedNote;
				delete Scriptbill.s.uploadedNote;
				location.href = loginUrl;
				
			}
		}, 5000);			
		
	}
	
}
else if( ( Scriptbill.s.uploadedNote || Scriptbill.l.uploadedNote ) && Scriptbill.s.currentNote ){	
	delete Scriptbill.l.uploadedNote;
	delete Scriptbill.s.uploadedNote;	
}
else if( ! location.href.includes( loginUrl ) && ! location.href.includes( signupUrl ) &&  ! Scriptbill.s.currentNote && ! Scriptbill.l.currentNote ) {
	
		setTimeout(async function(){
			//await Scriptbill.createAlert( "Scriptbill.s.currentNote" );
			let currentNote = await chrome.storage.session.get("currentNote");
			
			if( currentNote.currentNote && Scriptbill.isJsonable( currentNote.currentNote ) ){
				Scriptbill.s.currentNote = currentNote.currentNote;
				Scriptbill.l.currentNote = currentNote.currentNote;
			} else {
				let conf 	= await Scriptbill.createConfirm("You've Not Uploaded Any Scriptbill Note To This Scriptbill Dashboard! To Make Best Use Of This App You'll Need A Scriptbill Note Active Even Though It Is On A Zero Balance.  Click Ok To Create A New Scriptbill Note or Cancel To Log Out Now!");
				
				
				delete Scriptbill.l.uploadedNote;
				delete Scriptbill.s.uploadedNote;
				
				if( ! conf ) {		
					window.location.href = loginUrl;
				} else {
					location.href = signupUrl;						
				}
			}
		}, 500);
		
		
	
} 

if( ( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) && Scriptbill.l.currentNote )
	Scriptbill.s.currentNote = Scriptbill.l.currentNote;

if( ! Scriptbill.l.user_pass && Scriptbill.s.user_pass )
	Scriptbill.l.user_pass 		= Scriptbill.s.user_pass;

if(  Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
	Scriptbill.l.currentNote = Scriptbill.s.currentNote;

if( ! Scriptbill.s.user_pass && Scriptbill.l.user_pass )
	Scriptbill.s.user_pass 		= Scriptbill.l.user_pass;


setInterval( async ()=>{
	if( ( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) && Scriptbill.l.currentNote && Scriptbill.isJsonable( Scriptbill.l.currentNote ) )
		Scriptbill.s.currentNote = Scriptbill.l.currentNote;
	
	if( ! Scriptbill.l.user_pass && Scriptbill.s.user_pass )
		Scriptbill.l.user_pass 		= Scriptbill.s.user_pass;
	
	if( Scriptbill.isJsonable( Scriptbill.l.currentNote ) && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && Scriptbill.Base64.encode( Scriptbill.l.currentNote ) != Scriptbill.Base64.encode( Scriptbill.s.currentNote ) && ! Scriptbill.s.isWaitingTransBlock ){
		let note1 		= JSON.parse( Scriptbill.l.currentNote );
		let note2 		= JSON.parse( Scriptbill.s.currentNote );
		Scriptbill.s.isWaitingTransBlock = "TRUE";
		let block1 		= await Scriptbill.getTransBlock( 1, {blockID: note1.blockID});
		let block2 		= await Scriptbill.getTransBlock( 1, {blockID: note2.blockID});
		
		if( block1[0].blockID == block2[0].nextBlockID || block1[0].formerBlockID == block2[0].blockID ){
			Scriptbill.s.currentNote 	= Scriptbill.l.currentNote;
		}
		delete Scriptbill.s.isWaitingTransBlock;
	}
	
	if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		Scriptbill.l.currentNote = Scriptbill.s.currentNote;
	
	if( ! Scriptbill.s.user_pass && Scriptbill.l.user_pass )
		Scriptbill.s.user_pass 		= Scriptbill.l.user_pass;
	
	if( ! Scriptbill.s.user_pass && ! Scriptbill.l.user_pass && ! ( location.href.includes( loginUrl ) || location.href.includes( signupUrl ) ) ){
		if( Scriptbill.l.currentNote && ! Scriptbill.s.isWaitingPassword ){
			Scriptbill.s.isWaitingPassword = "true";
			Scriptbill.s.user_pass = await Scriptbill.createPrompt("Please enter your current note password to continue using this note", "");
			delete Scriptbill.s.isWaitingPassword;
			
			if( Scriptbill.s.user_pass.length ){
				Scriptbill.l.user_pass = Scriptbill.s.user_pass;
				location.reload();
			}
		} 
		else if( ! Scriptbill.s.isWaitingPassword ){
			//alert("going to login ");
			location.href = loginUrl;
		}
	}
	
	//console.log( Scriptbill.s.currentNote, Scriptbill.currentTime() );
}, 1000 );

//last public key: rBCnns4pVux6ynf
if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && location.href.includes( loginUrl ) ) {
	let logUrl 		= new URL( location.href );
	let logOut 		= logUrl.searchParams.get("loggout");
	
	if( logOut == null )
		location.href = dashboardUrl;
	
	//console.log("downloading note!!!");
	let welcome 	= document.getElementById("welcomeMes");
	let desc 		= document.getElementById("welcomeDesc");
	
	welcome.innerHTML	=	'Your Scriptbill Note is Downloading...';
	desc.innerHTML		=	'please do not close this browser window until your Scriptbill Note has finish downloading. Thanks...';
	
	let note = JSON.parse( Scriptbill.s.currentNote );
	if( Scriptbill.s.user_pass != "" ){
		let pass = CryptoJS.MD5( Scriptbill.s.user_pass ).toString( CryptoJS.enc.Base64 );
		Scriptbill.pass = pass;
		Scriptbill.donotDownload = true;	
		Scriptbill.download_note( note.noteAddress ).then( async bool =>{
			
				if( bool ){
					welcome.innerHTML 	= "Log Out Successful...";
					desc.innerHTML 		= "The Scriptbill Network Misses Your Presence...Login Your Note Again to Manage Your Scriptbill Account By Simply Uploading the Scriptbill Note File Securely Downloaded To Your Device Each Time You Log Out with Your Account Password. Your Scriptbill Account is Securely Wired With Your Scriptbill Note File and No one Else, Not Even Scriptbank can Control Your Account Until You Log In Again. We are Expecting Your Return...";
					delete Scriptbill.s.currentNote;
					
					delete Scriptbill.s.uploadedNote;
					
					delete Scriptbill.s.user_pass;
					delete Scriptbill.s.uploaded;
					delete Scriptbill.l.uploaded;
					
					delete Scriptbill.l.currentNote;			
					delete Scriptbill.l.uploadedNote;
					chrome.storage.session.remove("currentNote");
				}
				else {
					welcome.innerHTML 	= "Error Downloading Note...";
					desc.innerHTML		= Scriptbill.error['download_note'];
				}
			});
		
	}
}

if( location.href.includes( notificationUrl ) ){
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note = JSON.parse( Scriptbill.s.currentNote );
	setTimeout( async ()=>{
		let accountData 	= await getAccountData();			
						
		let accID 		= note.noteAddress;
		let emailPrev 		= document.getElementsByClassName("col-lg-9")[0].querySelector(".text-body");
		
		if( accountData && accountData[accID] && accountData[accID].emails && accountData[accID].emails.length > 0 )
			emailPrev.innerHTML = accountData[accID].emails[0];
		
		//getting other form elements.
		let announcement 		= document.getElementById("announcements");
		let sendPayment 		= document.getElementById("sendPayment");
		let receiveApayment 	= document.getElementById("receiveApayment");
		let requestPayment 		= document.getElementById("requestPayment");
		let problemWithPayment 	= document.getElementById("problemWithPayment");
		let specialOffers 		= document.getElementById("specialOffers");
		let reviewSurveys 		= document.getElementById("reviewSurveys");
		let paymentBtn 			= document.getElementById("paymentBtn");
		let mine 	 			= document.getElementById("mineScriptbill");
		
		mine.addEventListener('click', function(e){
			let details = localStorage[accID.slice(0,12) + "_mining_set" ];
			if( this.checked ){
				localStorage[accID.slice(0,12) + "_mining_set" ] = "TRUE";
			} else {
				localStorage[accID.slice(0,12) + "_mining_set" ] = "FALSE";
			}
		}, false);
		
		if( ! accountData[accID].notificationSettings )
			accountData[accID].notificationSettings = {};
		
		else {
			if( accountData[accID].notificationSettings.announcement ){
				if( ! announcement.checked ){
					announcement.click();
				}
			}
			if( accountData[accID].notificationSettings.sendPayment ){
				if( ! sendPayment.checked ){
					sendPayment.click();
				}
			}
			if( accountData[accID].notificationSettings.receiveApayment ){
				if( ! receiveApayment.checked ){
					receiveApayment.click();
				}
			}
			if( accountData[accID].notificationSettings.requestPayment ){
				if( ! requestPayment.checked ){
					requestPayment.click();
				}
			}
			if( accountData[accID].notificationSettings.problemWithPayment ){
				if( ! problemWithPayment.checked ){
					problemWithPayment.click();
				}
			}
			if( accountData[accID].notificationSettings.reviewSurveys ){
				if( ! reviewSurveys.checked ){
					reviewSurveys.click();
				}
			}
			if( accountData[accID].notificationSettings.specialOffers ){
				if( ! specialOffers.checked ){
					specialOffers.click();
				}
			}			
						
		}
		
		paymentBtn.onclick = function(e){
			e.preventDefault();
			
			accountData[accID].notificationSettings.announcement = announcement.checked;
			accountData[accID].notificationSettings.sendPayment = sendPayment.checked;
			accountData[accID].notificationSettings.receiveApayment = receiveApayment.checked;
			accountData[accID].notificationSettings.problemWithPayment = problemWithPayment.checked;
			accountData[accID].notificationSettings.specialOffers = specialOffers.checked;
			accountData[accID].notificationSettings.reviewSurveys = reviewSurveys.checked;
			accountData[accID].notificationSettings.requestPayment = requestPayment.checked;
			Scriptbill.l[trivKey]  = JSON.stringify( accountData );
			location.reload();
		}
	}, 500);
	setAccountRank();
	
	
}



let isForm 		= document.getElementById('loginForm');
let user_pass	= document.getElementById('loginPassword');
let upload_note = document.getElementById('scriptUpload');
let submitBtn   = document.getElementById('signinBtn');
let noteAddress   = document.getElementById('noteAddress');
let passButton  	= document.getElementById('passwordRetrieve');
let noteAddTxt	  	= document.getElementById('noteAddID');
let userNameTxt  	= document.getElementById('userTextID');
let rtForm 		  	= document.getElementById('retrieveForm');




if( isForm != undefined ) {
	//window.showDirectoryPicker({mode:"readwrite"});
	submitBtn.setAttribute("disabled", "disabled");
	
	passButton.onclick = async function(){
		if( noteAddTxt.value == "" ){
			await Scriptbill.createAlert( "Note Address Field Can't Be Empty");
			return;
		}
		
		if( userNameTxt.value == "" ){
			await Scriptbill.createAlert("User Name Can't Be Empty");
			return;
		}
		
		if( ! Scriptbill.l[ noteAddTxt.value.toLowerCase().replace('-', '_' ) + '_user_pass' ] ) {
			await Scriptbill.createAlert("Can't Find Your Note's Password On This Device ");
			return;
		}
		
		let pass 	= Scriptbill.decrypt( Scriptbill.l[ noteAddTxt.value.toLowerCase().replace('-', '_' ) + '_user_pass' ], userNameTxt.value );
		
		if( pass ){
			await Scriptbill.createAlert( "Retrieved Password for this note " + noteAddTxt.value + " is: " + pass + " You Can Use it Now For Your Login" );
		} else {
			await Scriptbill.createAlert("Couldn't Retrieve Password!");
		}
			
	}
	
	clickUpload.onclick = async function(){
		
		try {
			if( ! noteAddress.value ){
				scriptUpload.click();
				return;
			}
			//await Scriptbill.createAlert("select the directory where your Scriptbill files are kept. This will help in auto saving files to your disk instead of downloading them.");	
			const dirHandle = await window.showDirectoryPicker({mode:"readwrite"});
			let password 	= user_pass.value;
			let isFound = false;
			
			for await( const entry of dirHandle.values() ){
				if( entry.kind == "file" ){
					if( noteAddress.value && entry.name.includes( noteAddress.value ) ){
						let file 		= await entry.getFile();
						
						if( file ){
							let text 	= await file.text();
							Scriptbill.s.uploadedNote 	= text;
							Scriptbill.s.user_input 	= password;
							Scriptbill.l.uploadedNote   = text;
							Scriptbill.s.noteAddress 	= noteAddress.value;
							isFound 					= true;
							submitBtn.removeAttribute("disabled");
						}
					}
				}
			}
			//Scriptbill.s.currentDirectory = JSON.stringify( dirHandle );
			
			if( ! isFound ){
				upload_note.click();
			} else {
				this.innerText = "File Found";
			}
			
			
		} catch(e){
			//console.log( e.toString() );
			upload_note.click();
		}
		
	}
	
	if( upload_note ) {
		upload_note.addEventListener('change', function(){			
			let files = this.files;
			if( checkfile(this) ) { 
				submitBtn.removeAttribute('disabled');
			}
			//clean up
			delete Scriptbill.s.user_input;
			delete Scriptbill.s.uploadedNote;
			delete Scriptbill.l.uploadedNote;
			delete Scriptbill.l.user_pass;
			delete Scriptbill.s.user_pass;
			delete Scriptbill.s.uploaded;
			const reader = new FileReader();
			 reader.readAsText( files[0] );
			reader.addEventListener('load', async function(){
				let result 		= reader.result;
				let password 	= user_pass.value;
				
				//trim the result to replace unneccessary strings
				result = result.replace('object', '').replace('[', '').replace(']','').replace('Object', '');
				
				try {
					//make an ajax request to ensure
					Scriptbill.s.uploadedNote = result;
					Scriptbill.s.user_input 	= password;
					Scriptbill.l.uploadedNote   = result;
					Scriptbill.s.noteAddress 	= noteAddress.value;
				} catch( e ){
					//console.log( e );
					Scriptbill.s.clear();
					
					if( result.length > 3000000 ){	
						Scriptbill.binary = result;
						delete Scriptbill.s.uploadedNote;
						let directory 		= await window.navigator.storage.getDirectory("scriptStorage", {create: true}).catch(error =>{/*console.log( error);*/  return false;});
						
						if( directory ){
							try {							
								let binaries 	= await directory.getDirectoryHandle("binaries", {create: true}).catch(error =>{/*console.log( error);*/  return false;});
								let temp 			= await Scriptbill.generateKey(20);
								//await Scriptbill.createAlert( "temp before: " + temp );
								var regex 			= /^[!@#\$%\^\&*\)\(+=._-]+$/g
								temp 				= temp.replaceAll('/', '').replaceAll('+', '').replaceAll('=', '').replaceAll('-', '').replaceAll('_', '').replaceAll('&', '').replaceAll('*', '').replaceAll('%', '').replaceAll('$', '').replaceAll('#', '').replaceAll('@', '').replaceAll('^', '');
								//await Scriptbill.createAlert( "temp: " + temp );
								let uploads 		= await binaries.getFileHandle(temp + ".txt", {create:true}).catch(error =>{/*console.log( error);*/  return false;});
								let write 				= await uploads.createWritable();
								await write.write( result );
								await write.close();
								Scriptbill.s.uploaded = temp;
							} catch( e ){
								//console.log("Upload Note Fail: " + e );
								this.innerText		= "Login";
								this.setAttribute("disabled", "disabled");
							}
						}
						Scriptbill.s.noteAddress 	= noteAddress.value;
						Scriptbill.s.user_input 	= password;
					} else {
						Scriptbill.s.uploadedNote = result;
						Scriptbill.s.user_input 	= password;
						Scriptbill.l.uploadedNote   = result;
						Scriptbill.s.noteAddress 	= noteAddress.value;
					}
				}
			});
		});
		
		noteAddress.oninput = async function(e){
			if( ! this.value.includes("@") && ! this.value.indexOf("+") == 0 ){
				let currentNote = Scriptbill.s.checkCurrentNote;
				
				if( ! currentNote )
					currentNote = await Scriptbill.getDataPersistently( "currentNote", "userNotes", false );
				
				if( currentNote && Scriptbill.isJsonable( currentNote ) ){
					Scriptbill.s.checkCurrentNote = currentNote;
					currentNote 		= JSON.parse( currentNote );
					
					if( currentNote.noteAddress.includes( this.value ) ){
						submitBtn.innerText 	= "Current Note Found!";
						
						if( currentNote.noteAddress == this.value ){
							submitBtn.removeAttribute("disabled");
							submitBtn.innerText = "Login Now";
							submitBtn.setAttribute("currentNote", Scriptbill.Base64.encode( JSON.stringify( currentNote )));
						}
					}
				}
				let binary = await Scriptbill.getDataPersistently( this.value, 'userNotes', false );//juV9iw43qMWkGv3i2bGxBAE8tWrbDVSBcgahmNLD73tx9j9WBDwWiRo1yEGIgbMBgxVK2hKcAyn8c4O6j09nNo3twr3Bp7c_J9bLCBhuDIKkOGAUDEg9RvmI-CciA0l8R818NkqDeCC4NORUfr9Q5F_DDbbtQpAcroNDs0jPRvc
				
				if( binary ){
					submitBtn.removeAttribute("disabled");
					clickUpload.setAttribute("disabled", "disabled");
					clickUpload.innerText 	= "Binary Found";
					Scriptbill.binary 		= binary;
				} else {
					var errors 	= JSON.parse(  Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
					var keys 	= Object.keys( errors );
					keys 		= keys.reverse();
					document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
				}
			}
		}
		
		submitBtn.addEventListener("click", async function(e){
			e.preventDefault();
			Scriptbill.password 		= user_pass.value;
			Scriptbill.noteAddress 		= noteAddress.value;
			/* Scriptbill.loginUserDetails().then( currentNote =>{
				//console.log( currentNote );
				if( currentNote ){
					//location.href = "/HTML/dashboard.html";
				
				}else {
					this.innerText = "Login Failed";
					setTimeout(function(){
						location.reload();
					}, 20000);//BESTgiverDON44@$
				}
				
				//console.log("current note: " + currentNote );
			}); */
			this.innerText = "Processing...";
			//console.log(user_pass.value);
			//await Scriptbill.createAlert(" check noteAddress " +  noteAddress.value );
			
			//this indicate that the user is trying to login a splitted note
			if( noteAddress.value.includes("@") || noteAddress.value.indexOf("+") == 0 ){
				var string 				= noteAddress.value + user_pass.value;
				let pass 				= Scriptbill.hashed( string );
				console.log("rep: ", noteAddress.value, "key: ", user_pass.value, "result: ", pass );
				//await Scriptbill.createAlert(" Inside " +  user_pass.value );
				Scriptbill.set_pass 	= pass;
				noteAddress.value 		= "";
				let decrypted = Scriptbill.decrypt( Scriptbill.s.uploadedNote, pass );
				//rep:  +2349079179547 key:  ThisisDkey result:  Zsr9iw/SW3g1SUi7Y7sqmq0Wlg5XPMHQKrG5Eu8qbOw=
				if( decrypted && Scriptbill.isJsonable( decrypted )){
					let block = JSON.parse( decrypted );
					
					if( block && block.transType == "SPLIT" ){
						Scriptbill.defaultScriptbill.noteType = block.noteType;
						let agreement, newBlock;
						if( block.recipient ){
							agreement 		= Scriptbill.decrypt( block.recipient, pass );
							
							if( agreement && Scriptbill.isJsonable( agreement )){
								agreement 		= JSON.parse( agreement );
							} else {
								agreement 		= false;
							}
							
						}
						
						if( ! agreement || ! agreement.note || ! agreement.note.noteAddress || ! agreement.note.noteValue == block.transValue ){

							Scriptbill.password 	= await Scriptbill.createPrompt("Create A Password for Your New Note:", "");
							Scriptbill.key 			= await Scriptbill.createPrompt("Add a Note Key to your Note!");
							this.innerText 			= "Creating Note...";
							newBlock 				= await Scriptbill.createNewScriptbillWallet();
						} else {
							newBlock 		= JSON.parse( JSON.stringify( block ));
							Scriptbill.returnNote = JSON.parse
						}
						
						if( ( newBlock && newBlock.transType == "CREATE" ) || ( agreement && agreement.note ) ){
							this.innerText 					= "Note Created...";
							Scriptbill.formerBlock = JSON.parse( JSON.stringify( newBlock ));
							if( Scriptbill.returnNote ){
								await Scriptbill.setCurrentNote( Scriptbill.returnNote );
							}
							setTimeout( async ()=>{
								if( sessionStorage.currentNote )
									this.innerText 			= "Current Note Detected...";
								
								else 
									this.innerText			= "No Current Note...";
								setTimeout( async ()=>{
									this.innerText 				= "Merging Note...";
									Scriptbill.mergeNote  		= JSON.parse( JSON.stringify( Scriptbill.defaultScriptbill ) );
									Scriptbill.mergeNote.noteValue 		= block.transValue;
									Scriptbill.details.transType 	= "MERGE";
									Scriptbill.details.transValue 	= block.transValue;
									Scriptbill.set_pass 			= pass;
									Scriptbill.details.recipient 	= Scriptbill.set_pass;
									Scriptbill.mergeNote.block 		= JSON.parse( JSON.stringify( block ));
									
									let note 		= false;
									
									if( Scriptbill.returnNote )
										note 			= JSON.parse( JSON.stringify( Scriptbill.returnNote ) );
									
									if( ! note || ! note.noteAddress || ! note.blockID ){
										//await Scriptbill.createAlert( "Note Falsed" );
										note = false;
									} else {
										//await Scriptbill.createAlert("Note Correct!");
									}
									
									Scriptbill.generateScriptbillTransactionBlock(Scriptbill.details, note).then( async newBlock =>{
										//console.log("newBlock ", newBlock, JSON.stringify( newBlock ));
										//console.log( "return block: ", Scriptbill.returnBlock, JSON.stringify( Scriptbill.returnBlock ) );
										//await Scriptbill.createAlert("check new block");
										if( Scriptbill.returnNote ){
											await Scriptbill.setCurrentNote( Scriptbill.returnNote );
										}
										if( newBlock && newBlock.transType == "MERGE" ){
											this.innerText 					= "Note Merged Successfully";
											setTimeout(()=>{
												location.href = dashboardUrl;
											}, 2000);
										} else {
											if( document.querySelector("#error") ){
												var errors = JSON.parse(  Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
												var keys 	= Object.keys( errors );
												keys 		= keys.reverse();
												document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
											}
											this.innerText 					= "Transaction Unsuccessful";
											delete Scriptbill.s.currentNote;
											delete Scriptbill.s.uploadedNote;
											delete Scriptbill.l.uploadedNote;
											setTimeout(()=>{
												location.reload();
											}, 10000);
										}
									});
								}, 2000);								
							},500 );
							
						}
					}
				} else {
					if( document.querySelector("#error") ){
						var message 		= "Error Decrypting File. This May Be as a Result of incorrect password or the Supplied Recipient does not match the Sender's Recipient.";
						document.querySelector("#error").innerHTML = message;
					}
					this.innerText = "Error Logging in Note...";
					delete Scriptbill.s.currentNote;
					delete Scriptbill.s.uploadedNote;
					delete Scriptbill.l.uploadedNote;
					setTimeout( ()=>{
						location.reload();
					}, 10000 );
				}
			} else {
				let checkNote = this.getAttribute("currentNote");
				
				if( checkNote ){
					Scriptbill.s.currentNote = Scriptbill.Base64.decode( checkNote );
					
					if( ! isJsonable( Scriptbill.s.currentNote ) || ! Scriptbill.s.currentNote.includes( noteAddress.value ) ){
						this.innerText 	= "Login Invalid";
						delete Scriptbill.s.currentNote;
						setTimeout( ()=>{
							location.reload();
						}, 5000 );
						return;
					}
					
					Scriptbill.l.user_pass = user_pass.value;
					Scriptbill.s.user_pass = user_pass.value;
					Scriptbill.donotDownload = true;
					this.innerText 			= "Saving Binary...";
					
					Scriptbill.download_note().then( async isDownload =>{
						if( ! isDownload ){
							this.innerText = "Wrong Password Entered!";
						}
						else {
							this.innerText = "Login Successful...";
							setTimeout( ()=>{
								location.href = dashboardUrl;
							}, 5000 );
						}
					});
					return;
				}
				Scriptbill.constructor( "", noteAddress.value, user_pass.value, Scriptbill.s.uploadedNote ? Scriptbill.s.uploadedNote: Scriptbill.binary ).then( currentNote =>{
					
									
					if( currentNote && currentNote.noteAddress /*&& Scriptbill.s.currentNote.includes("walletID") */ ){
						//await Scriptbill.createAlert( currentNote.blockID );
						try {
							if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
								Scriptbill.s.currentNote 	= JSON.stringify( currentNote );
							
							Scriptbill.l.currentNote 		= JSON.stringify( currentNote );
							localStorage.checkNote 			= JSON.stringify( currentNote );
						} catch(e){
							Scriptbill.s.clear();
							Scriptbill.l.clear();
							
							if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
								Scriptbill.s.currentNote 	= JSON.stringify( currentNote );
							
							Scriptbill.l.currentNote 		= JSON.stringify( currentNote );
							localStorage.checkNote 			= JSON.stringify( currentNote );
							
						}
						
						
						if( currentNote.accountData && currentNote.accountData.userName ){
							Scriptbill.l[ currentNote.noteAddress.toLowerCase().replace('-', '_' ) + '_user_pass' ] = Scriptbill.encrypt( user_pass.value, currentNote.accountData.userName );
						}
						
						
						this.innerText = "Login Successful";
						setTimeout(()=>{
							location.href = dashboardUrl;						
						}, 1000);
					} else {
						if( document.querySelector("#error") ){
							var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
							var keys 	= Object.keys( errors );
							keys 		= keys.reverse();
							document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
						}
						this.innerText = "Login Unsuccessful";
						delete Scriptbill.l.uploadedNote;
						delete Scriptbill.s.uploadedNote;
						delete Scriptbill.s.user_input;
						delete Scriptbill.s.noteAddress;
						setTimeout(()=>{					
							location.reload();
						}, 60000);
					}
				});
			}
		});		
	}
	
	/* setTimeout( ()=>{
		if( Scriptbill.s.currentNote && Scriptbill.s.user_pass ){
			alert("yeah yeah");
			location.href = dashboardUrl;
		}		
	}, 2000 ); */
	//alert("ron ron");
}


function handle_mergers(){
	//elements
	let user_name 	= document.getElementById("userTextID");
	let pass_word 	= document.getElementById("passwordID");
	let uploader 	= document.getElementById("scriptUploadID");
	let clicker 	= document.getElementById("clickUploadID");
	let merger 		= document.getElementById("noteMerger");
	
	user_name.oninput = function(){
		Scriptbill.s.userNameID  = this.value;
	}
	pass_word.oninput = function(){
		Scriptbill.s.passWordID  = this.value;
	}
	
	clicker.onclick = function(){
		uploader.click();
	}
	
	uploader.onchange = function(){
		let files = this.files;
		let reader = new FileReader();
		let text 	= reader.readAsText( files[0] );
		reader.addEventListener("load", function(){
			let noteData 	= reader.result;
			Scriptbill.s.noteDataID = noteData;
		});
	}
	
	//to use the merge note function, we'll first log in the note. but we must wait till the user creates 
	//the indication.
	merger.onclick = async function(){
		
		if( ! Scriptbill.s.noteDataID && ! Scriptbill.s.passWordID && ! Scriptbill.s.userNameID ){
			await Scriptbill.createAlert("Merge Note Failed. Please enter all required values");
			return false;			
		}
		
		Scriptbill.string 			= Scriptbill.s.userNameID + Scriptbill.s.passWordID;
		Scriptbill.set_pass		 	= Scriptbill.hashed();
		
		let decrypted = Scriptbill.decrypt( Scriptbill.s.noteDataID, Scriptbill.set_pass );
		
		if( ! decrypted || ! Scriptbill.isJsonable( decrypted )){
			await Scriptbill.createAlert("Couldn't Decrypt Block. Seem You Entered the Wrong Password");
			return false;
		}
		
		let block 					= JSON.parse( decrypted );
		
		this.innerText 				= "Merging Note...";
		Scriptbill.mergeNote  		= JSON.parse( JSON.stringify( Scriptbill.defaultScriptbill ) );
		Scriptbill.mergeNote.noteValue 		= block.transValue;
		Scriptbill.details.transType 	= "MERGE";
		Scriptbill.details.transValue 	= block.transValue;
		Scriptbill.details.recipient 	= Scriptbill.set_pass;
		Scriptbill.mergeNote.block 		= JSON.parse( JSON.stringify( block ));
		newBlock = await Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details );
		//console.log("newBlock ", newBlock, JSON.stringify( newBlock ));
		//await Scriptbill.createAlert("check new block");
		if( newBlock && newBlock.transType == "MERGE" ){
			this.innerText 					= "Note Merged Successfully";
			setTimeout(()=>{
				location.href = dashboardUrl;
			}, 2000);
		} else {
			this.innerText 					= "Transaction Unsuccessful";			
			delete Scriptbill.s.uploadedNote;
			delete Scriptbill.l.uploadedNote;
			setTimeout(()=>{
				location.reload();
			}, 3000);
		}
		
		/* this.innerText 	= "Merging Notes...";
		this.style.color = "white";
		Scriptbill.string 			= Scriptbill.s.userNameID + Scriptbill.s.passWordID;
		Scriptbill.mergePassword 	= Scriptbill.hashed();
		Scriptbill.mergeNoteBinary	= Scriptbill.s.noteDataID;
		Scriptbill.mergeNote().then( block =>{
			if( block && block.transType == "MERGE" ){
				this.innerText = "Merge Note Successful";
			} else {
				this.innerText = "Merge Note Failed";
			}
			
			setTimeout(function(){
				location.reload();
			}, 2000);
		}); */
	}
}

if( location.href.includes( signupUrl ) ){
	let form 		= document.getElementById('signupForm');
	let wallet 		= document.getElementById('walletID');
	let pass		= document.getElementById('loginPassword');
	let key			= document.getElementById('loginKey');
	let address		= document.getElementById('address');
	let country		= document.getElementById('country');
	let button   	= document.getElementById('signupBtn');
	let email   	= document.getElementById('emailAddress');
	let seedChar  	= document.getElementById('seedChar');
	let prefCur		= document.getElementById('prefCurrency');
	let userName	= document.getElementById('userName');
	let phoneNum	= document.getElementById('phoneNum');
	let fullName	= document.getElementById('fullName');
	let urlte 		= new URL( location.href );
	let redirect 	= urlte.searchParams.get("noteIN");
	
	if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && ! redirect ) {
		location.href = dashboardUrl;
	}
	
	if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && Scriptbill.s.currentNote.includes("walletID") ) {
		seedChar.removeAttribute("required");
		key.removeAttribute("required");
		pass.removeAttribute("required");
		prefCur.removeAttribute("required");		
		
		seedChar.parentElement.style.display = "none";		
		key.parentElement.style.display = "none";
		pass.parentElement.style.display = "none";
		prefCur.parentElement.style.display = "none";
		walletID.parentElement.style.display = "none";
	}
	//clean up	

	delete Scriptbill.l.uploadedNote;
	delete Scriptbill.s.uploadedNote;
	
	button.onclick = async function(e){
		e.preventDefault();
		
		/* 	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) {
			chrome.storage.sync.remove("user_pass", function(){
				delete Scriptbill.l.user_pass;
			});
			chrome.storage.session.remove("user_pass", function(){
				delete Scriptbill.s.user_pass;
			});
			chrome.storage.session.remove("user_input", function(){
				delete Scriptbill.s.user_input;
			});
		} */
		
		if( ! address.value || ! email.value || ! email.value.includes("@") || ! phoneNum.value || phoneNum.value.length < 10 || phoneNum.value.indexOf('+') != 0 || ! fullName.value || ! userName.value || ! pass.value || ! key.value || key.value.match(/[a-z]/g) || key.value.length < 4 ){
			if( ! address.value ) await Scriptbill.createAlert("address empty");
			else if( ! email.value || ! email.value.includes("@") ) await Scriptbill.createAlert("Email empty or Invalid!");			
			else if( ! phoneNum.value || phoneNum.value.length < 10  ) await Scriptbill.createAlert("Phone Number empty or Invalid!");
			else if( ! fullName.value ) await Scriptbill.createAlert(" Enter Name!");
			else if( ! userName.value ) await Scriptbill.createAlert(" Enter User Name!");
			else if( ! pass.value && ! Scriptbill.s.currentNote ) await Scriptbill.createAlert(" Enter Your Note's Password!");
			else if( ( ! key.value || key.value.match(/[a-z]/g) || key.value.length < 4 ) && ! Scriptbill.s.currentNote ) await Scriptbill.createAlert(" Enter Your Numeric Note's Key!");
			else if( phoneNum.value.indexOf('+') != 0 ) await Scriptbill.createAlert("Please International number format accepted with the (+) Sign");
			
			if( ( ! email.value || ! email.value.includes("@") || ! phoneNum.value || phoneNum.value.length < 10 || ! fullName.value || ! userName.value ) && Scriptbill.s.currentNote )			
				return;
			
				if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
				return;
		}		
		
		this.innerText 				= " Please Wait...";
		Scriptbill.string 			= address.value + email.value  + Scriptbill.currentTime();
		let privKey 				= btoa( await Scriptbill.hashed() );
		let note 					= Scriptbill.defaultScriptbill;
		Scriptbill.seedin 			= privKey;
		note.noteType 				= prefCur.value + "CRD";
		note.creditType 			= "fiat";
		Scriptbill.string 			= email.value + userName.value;
		
		if( Scriptbill.l.personal ) {
			let personal 	= JSON.parse( Scriptbill.l.personal );
			
			if( personal.walletID && ! walletID.value ){
				note.walletID 		= personal.walletID;
			} else {
				note.walletID 		= walletID.value;
			}
		} else {
			note.walletID				= walletID.value ? walletID.value : btoa( await Scriptbill.hashed() ).slice( 0, 40 );
		}
		
		
		if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && Scriptbill.s.currentNote.includes("walletID") ){
			setAccountData( this, fullName.value, userName.value, email.value, phoneNum.value, address.value );
		} else {	
			
			Scriptbill.password 	 	= pass.value;
			Scriptbill.key 				= key.value;
			
			if( seedChar.value ){
				Scriptbill.defaultScriptbill.referee	= seedChar.value;
			}
			
			setTimeout(()=>{
				this.innerText = "Creating Wallet...";
				let intervel = setInterval( ()=>{
					if( ! Scriptbill.s.stopMessaging ){
						this.innerText = "Creating Wallet Still...";					
						setTimeout(()=>{
							if( ! Scriptbill.s.stopMessaging )
								this.innerText = "Please Wait...";
						}, 2000);
					} else {
						clearInterval( intervel );
					}
					
				}, 5000 );
				Scriptbill.createNewScriptbillWallet().then( async block =>{			
					//console.log( "new note block: " + JSON.stringify( block ) );
					Scriptbill.s.stopMessaging = 'TRUE';
					clearInterval( intervel );
					console.log(block);
					if( block && block.transType == "CREATE" ){
						this.innerText = "Wallet Created Successfully...";
						
						setTimeout( async ()=>{
							Scriptbill.setCurrentNote().then( async currentNote =>{
								
								if( Scriptbill.s.currentNote || currentNote ){
									let note 		= false;
									
									if( Scriptbill.s.currentNote )
										note = JSON.parse( Scriptbill.s.currentNote );
									else
										note = currentNote;
									
									Scriptbill.l[ note.noteAddress.toLowerCase().replace('-', '_' ) + '_user_pass' ] = Scriptbill.encrypt( pass.value, userName.value );
									if( seedChar.value	&& seedChar.value == "SCRIPTBANKBUSINESSMANAGEMENT4CMBF" && ! Scriptbill.l.isBusinessManagerWallet ){
										this.innerText = "Creating Bond...";
										setTimeout( async ()=>{
											this.innerText = " Please Wait...";
											sellBond(5000000, prefCur.value + "BND", note.noteAddress, "6 months").then( note =>{
												if( note ){
													Scriptbill.l.isBusinessManagerWallet = "TRUE";
													this.innerText = "Created Bond Successfully";
													setTimeout( ()=>{
														this.innerText = "Downloading Bond File...";
														Scriptbill.download_note();
														setTimeout(()=>{
															this.innerText = "Logging In...";
															Scriptbill.s.currentNote = currentNote;
															setAccountData( this, fullName.value, userName.value, email.value, phoneNum.value, address.value );
														}, 1000);
													}, 1000 );
												} else {
													if( document.querySelector("#error") ){
														var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
														var keys 	= Object.keys( errors );
														keys 		= keys.reverse();
														document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
													}
													this.innerText = "Bond Creation Fail..";
												}
											} );
										}, 1000 );
										
									} else {
										let url 	= new URL(SERVER);
										url.searchParams.set("noteID", note.noteAddress.slice(0, 12 ));
										url.searchParams.set("fullname", fullName.value);
										url.searchParams.set("username", note.walletID);
										url.searchParams.set("email", email.value);
										url.searchParams.set("phone", phoneNum.value);
										url.searchParams.set("address", address.value);	
										url.searchParams.set("country", country.value);	
										url.searchParams.set( "walletID", note.walletID );	
										url.searchParams.set("password", Scriptbill.l.scriptbankPASS ? Scriptbill.l.scriptbankPASS : pass.value);
										url.searchParams.set("user_reg", "true");
										
										if( seedChar.value )
											url.searchParams.set("ref_code", seedChar.value);
										
										let password  	   = await Scriptbill.getData(["noteID","fullname","username","email","phone","address","walletID","password","user_reg",(seedChar.value ? "ref_code": "")],[ note.noteAddress.slice(0, 12 ), fullName.value, note.walletID, email.value, phoneNum.value, address.value, note.walletID, (Scriptbill.l.scriptbankPASS ? Scriptbill.l.scriptbankPASS : pass.value),  "true",  (seedChar.value ? seedChar.value: "")], url.href );/* .then( result =>{
											return result.text();
										}).then( data =>{
											
											return data;
										}).catch( error =>{
											this.innerText = "Scriptbank Registeration Failed!";
											return false;
										}); */
										
										if( ! password ){
											this.innerText = "Scriptbank Registeration Failed!";
											
										} else {
											if( ! Scriptbill.l.scriptbankPASS )
												Scriptbill.l.scriptbankPASS = pass.value;
										}
										
										if( password && password.group_value ){
											Scriptbill.l.groupVALUE = password.group_value;
										}
										
										setTimeout( ()=>{
											this.innerText = "Logging In...";
											setAccountData( this, fullName.value, userName.value, email.value, phoneNum.value, address.value, country.value ).then( run =>{
												if(run){							
													setTimeout( ()=>{
														location.href = dashboardUrl;
													}, 10000 );
												}
											});										
										}, 2000 );									
									}								
								} else {
									if( document.querySelector("#error") ){
										var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
										var keys 	= Object.keys( errors );
										keys 		= keys.reverse();
										document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
									}
									this.innerText = "Login Failed...";
									setTimeout( ()=>{
										location.reload();
									}, 10000 );
								}
							});
						}, 10000);
					} else {
						if( document.querySelector("#error") ){
							var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
							var keys 	= Object.keys( errors );
							keys 		= keys.reverse();
							document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
						}
						this.innerText = "Creating Wallet Failed...";
						setTimeout( ()=>{
							location.reload();
						}, 15000 );
					}
				});
			}, 1000);			
		}
	}
	
	
}

async function setAccountData( el, fullName, userName, email, phoneNum, address, country ){
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) {
		el.innerText = "Login Failed";
		return false;
	}
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let accountData 	= await getAccountData();
							
	if( ! accountData ){
		accountData = {};
		accountData.rank = "IFVSSKJBHKSBUD";
	} 
	let accID 			= note.noteAddress;
	
	if( Scriptbill.l.groupVALUE ){
		if( accountData.value && accountData.value < Scriptbill.l.groupVALUE )
			accountData.value = Scriptbill.l.groupVALUE;
	}
							
	accountData[accID] 	= {};
	accountData[accID].fullName = fullName;
							
	if( ! accountData[accID].emails )
		accountData[accID].emails  = [];
							
	if( ! accountData[accID].phones )
		accountData[accID].phones = [];
							
	fullName 	= fullName.split( " " );
								
	accountData[accID].firstName 	= fullName[0];
	accountData[accID].lastName 	= fullName[1];					
	accountData[accID].userName 	= userName;				
	accountData[accID].address 		= address;				
	accountData[accID].country 		= country;				
								
	accountData[accID].emails.push( email );
	accountData[accID].phones.push( phoneNum );
								
	//Scriptbill.l[trivKey] = JSON.stringify( accountData );
	return await Scriptbill.setAccountData( accountData ).then( data =>{
		el.innerText = "Signup Successful";
		return true;
	});
}

if( location.href.includes( dashboardUrl ) ){
loadingDiv();	
setAccountRank();                                                                      //await Scriptbill.createAlert('running start');
	let noteAdd			= document.getElementById("noteAddress");
	let walletEl		= document.getElementById("walletID");
	let addCard			= document.getElementById("cardAdd");
	let addBank			= document.getElementById("bankAdd");
	let comp			= document.getElementById("completeness");
	let withdraw		= document.getElementById("withdrawalStance");
	let mobile 			= document.querySelector(".profile-completeness > div:first-child");
	let email 			= document.querySelector(".profile-completeness > div:nth-child(2)");
	
	
	setTimeout(async ()=>{
		
		if( Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) && Scriptbill.s.currentNote.includes("walletID") ){
			let note 	= JSON.parse( Scriptbill.s.currentNote );
			let accountData = await Scriptbill.getAccountData();
			
			if( note.withdrawalStance && typeof note.withdrawalStance == "object" ){
				let stance =  note.withdrawalStance;
				if( stance.rate && typeof stance.rate == "string" )
					withdraw.innerText 	= stance.rate;
			}

			if( ! accountData ){
				accountData	= {};
			}
						
			let accID 		= note.noteAddress;			
			let account		= JSON.parse( JSON.stringify( accountData ) );
			
			if( ! account[accID] ){
				account[accID] = {};
			}
			//console.log( account );
			let accounts 	= account[accID].savedAccounts;
			let cards 		= account[accID].savedCards;
			let emails 		= account[accID].emails;
			let phones 		= account[accID].phones;
			accounts 		= typeof accounts == "string" ? JSON.parse( accounts ): [];
			cards 			= typeof cards == "string" ? JSON.parse( cards ): [];
			
			let i, p, classes;
			
			/* if( ! emails || ! emails.length || ! phones || ! phones.length ){
				await Scriptbill.createAlert("Your account do not have an email or phone....Redirecting you to profile page to add your personal details.");
				location.href = profileUrl;
				return;
			} */
			let rate = 0;
			if( ! emails || ! emails.length ){
				i = email.querySelector("i.fas.fa-check-circle");
				p = i.parentElement;
				classes = i.getAttribute("class");
				classes = classes.replace("fas fa-check-circle", "far fa-circle");
				i.setAttribute("class", classes);
				classes = p.getAttribute("class");
				classes = classes.replace("text-success", "text-light");
				p.setAttribute("class", classes);
				email.querySelector("p.mb-0").innerHTML = '<a class="btn-link stretched-link" href="'+profileUrl+'" >Add Email</a>';
				//comp.innerHTML = rate+"%";
			} else {
				rate += 25;
			}
			
			if( ! phones || ! phones.length ){
				i = mobile.querySelector("i.fas.fa-check-circle");
				p = i.parentElement;
				classes = i.getAttribute("class");
				classes = classes.replace("fas fa-check-circle", "far fa-circle");
				i.setAttribute("class", classes);
				classes = p.getAttribute("class");
				classes = classes.replace("text-success", "text-light");
				p.setAttribute("class", classes);
				mobile.querySelector("p.mb-0").innerHTML = '<a class="btn-link stretched-link" href="'+profileUrl+'" >Add Phone</a>';
				//comp.innerHTML = rate+"%";
			} else {
				rate += 25;
			}
						
			if( cards.length > 0 ){
				rate 		+= 25;
				i = addCard.querySelector("i.far.fa-circle.icon");
				p = i.parentElement;
				classes = i.getAttribute("class");
				classes = classes.replace("far fa-circle", "fas fa-check-circle");
				i.setAttribute("class", classes);
				classes = p.getAttribute("class");
				classes = classes.replace("text-light", "text-success");
				p.setAttribute("class", classes);
				addCard.querySelector("p.mb-0.addCard").innerHTML = "Card Added";
				//comp.innerHTML = rate+"%";				
			} 
				
			if( accounts.length > 0 ){
				rate 	+= 25;
				i = addBank.querySelector("i.far.fa-circle.icon");
				p = i.parentElement;
				classes = i.getAttribute("class");
				classes = classes.replace("far fa-circle", "fas fa-check-circle");
				i.setAttribute("class", classes);
				classes = p.getAttribute("class");
				classes = classes.replace("text-light", "text-success");
				p.setAttribute("class", classes);
				addBank.querySelector("p.mb-0.addBank").innerHTML = "Bank Added";
				
			}
			
			comp.innerHTML = rate+"%";
			noteAdd.innerHTML = '' + note.noteAddress.toString().slice( 0, 10 ) + '...<a class="text-success text-4" href="javascript:void(0)"><i class="fas fa-copy"></i></a>';			
			walletEl.innerHTML = note.walletID.toString().slice( 0, 10 ) + '...<a class="text-success text-4" href="javascript:void(0)"><i class="fas fa-copy"></i></a>';
			noteAdd.setAttribute("data-original-title", note.noteAddress );
			noteAdd.querySelector("a").onclick = function(){
				//await Scriptbill.createAlert("button clicked");
				 let text = noteAdd.getAttribute("data-original-title");

			   // Copy the text inside the text field
			  navigator.clipboard.writeText(text);
			}
			walletEl.querySelector("a").onclick = function(){  
			  let text = walletEl.getAttribute("data-original-title");

			   // Copy the text inside the text field
			  navigator.clipboard.writeText(text);


			  // Alert the copied text
			  //await Scriptbill.createAlert("Copied the text Wallet ID" );
			}
			walletEl.setAttribute("data-original-title", note.walletID );
			
			await saveNotesCard();
			await saveBankDetails();
			await checkBudgets();
			await checkSubscriptions();
			await checkAgreements();
			await checkTransactions();
			
			handle_mergers();
			removeLoadingDiv();
			//await Scriptbill.createAlert('running end');
		} else {
			/* delete Scriptbill.s.currentNote;
			delete Scriptbill.s.uploadedNote;
			delete Scriptbill.l.uploadedNote;
			location.href = "/HTML/login.html"; */			
		}
		//preloader.style.display = "none";
	}, 500);
	
}

function setAccountRank(){
	
		
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) return;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	console.log('before fetch ' , Scriptbill.currentTime() );
	fetch( "/currencies.json" ).then(resp=>{return resp.json()}).then( async currencies =>{
		console.log('fetched ' , Scriptbill.currentTime() );
		//getting the template variables
		let salute 			= document.getElementById("salutation");
		let walletRank 		= document.getElementById("rankImage");
		let rankSalute 		= document.getElementById("rankSalute");
		let noteValue 		= document.getElementById("noteValue");
		let bondValue 		= document.getElementById("bondValue");
		let bondBtn 		= document.getElementById("buyBondBtn");
		let clientName 		= document.getElementById("clientName");
	
		let accountData 	= await getAccountData();
		console.log('accountdata gotten ', Scriptbill.currentTime());		
		/* if( accountData && await Scriptbill.isJsonable( accountData )){
			accountData 	= JSON.parse( accountData );
		} else {
			accountData = {};
		} */
		
		if( note.budgetID && note.budgetID.length == 171 ){
			let Item 	= document.createElement("div");
			Item.setAttribute("style", "position:absolute;width:fit-content; left:3%; top:0;pointer:cursor;");
			Item.setAttribute("class", "text-5 my-3");
			Item.setAttribute("data-toggle", "tooltip");
			Item.setAttribute("data-original-title", "Create Budget Item");
			Item.innerHTML			= `<i class="fas fa-briefcase"></i>`;
			Item.addEventListener("click", function(){
				location.href 		= createItem;
			});
			noteValue.parentElement.appendChild( Item );
		}
					
		let accID 		= note.noteAddress;	
		let img 			= location.origin  + '/scriptbill/images/ranks/rank1.png';
		let rank 			= "CMBF Beginner";		
		let ranks 			= Scriptbill.getRanks();			
		let rankCodes 		= Object.keys( ranks );
		let rankPref 		= note.rankPref;
		if( accountData && accountData.rank ){
			if( ranks[ accountData.rank ] ){
				let no 		=  rankCodes.indexOf( accountData.rank ) + 1;
				img 		=  location.origin  + '/scriptbill/images/ranks/rank' + no + '.png';
			} else {
				let x;
				for( x = 1; x <= rankCodes; x++ ){
					rank 	= ranks[rankCodes[x]][ rankPref ];
					
					if( rank == accountData.rank ){
						img 		= location.origin  + '/scriptbill/images/ranks/rank' + x + '.png';
						break;
					} 
				}
			}
		}
		if( ! accountData ){
			accountData = {};
			accountData.rank = "IFVSSKJBHKSBUD";
		} 
		
		if( ! accountData.rank ){
			accountData.rank 		= "IFVSSKJBHKSBUD";
		}
		
		//console.log("account: " + JSON.stringify( accountData ) );
		
		if( ! accountData[accID] ){
			accountData[accID] = {};
		}
		
		if( accountData[accID].fullName ){
			salute.innerHTML 	= 'Hello ' + accountData[accID].fullName;
			if( clientName )
				clientName.innerHTML = accountData[accID].fullName;
		} else {
			salute.innerHTML 	= 'Hello User';
		}
		
		
		walletRank.src 			= img;
		walletRank.width 		= 120;
		walletRank.height 		= 120;
		if( rankSalute ) {
			if( ! ranks[ accountData.rank ] )
				rankSalute.innerHTML 	= accountData.rank;
			
			else 
				rankSalute.innerHTML 	= ranks[ accountData.rank ][ rankPref ];
		}
		let noteType 			= note.noteType;
		let credit 				= noteType.slice(0, noteType.lastIndexOf("CRD"));
		let symbol 				= credit;
		
		if( currencies[credit] )
			symbol 			= currencies[ credit ].symbol;
		
		noteValue.innerHTML 	= symbol + ' ' + formatCurrency( parseFloat( note.noteValue ).toFixed(2) );
		
		console.log('accountdata added ', Scriptbill.currentTime());
		
		if( bondBtn && bondValue ) {
			bondBtn.onclick = async function(){
				if( bondValue.value > 100 ){
					let url 		= new URL("https://buy.chainbits.com");
					url.searchParams.set("buyType", "bond");
					url.searchParams.set("buyCur", credit );
					url.searchParams.set("buyAmount", bondValue.value );
					url.searchParams.set("account", await Scriptbill.getScriptbankAccounts() );				
					this.innerText = "Processing...";
					setTimeout( async ()=>{
						
						if( note.noteValue < bondValue.value ){
							let a = document.createElement("a");
							a.setAttribute("href", url );
							a.setAttribute( "target", "_blank" );
							a.click();
						} else {
							try {
								Scriptbill.buyScriptbillBonds( bondValue.value ).then( async block =>{
									//console.log( " bond block ", block, JSON.stringify( block ));
									await Scriptbill.createAlert("check block");
									if( ( block && block.transType == "SOLDBOND" ) || (Scriptbill.returnBlock && Scriptbill.returnBlock.transType == "BUYBOND" ) ){
										this.innerText = "Bond Purchase Successful...";
										setTimeout( ()=>{
											let config = {};
											config.recipient = Scriptbill.set_pass;
											config.value 	= block.transValue;
											config.block 	= JSON.stringify( block );
											Scriptbill.s.sendMoneyConfig = JSON.stringify( config );
											Scriptbill.s.sendMoneyProcessing = "TRUE";
											Scriptbill.s.splittedNote = Scriptbill.encrypt( JSON.stringify( block ), config.recipient );
											let urle = new URL( sendSuccess );
											let errors 	= JSON.parse( Scriptbill.s.sMessages );
											let times 	= Object.keys( errors ).sort();
											urle.searchParams.set("message", errors[times[0]]);
											location.href = urle.href;
										}, 5000);
									} else {
										this.innerText = "Bond Purchase UnSuccessful...";
										setTimeout( ()=>{
											location.reload();
										}, 5000);
									}
								});
							} catch( e ){
								this.innerText = "Error Buying Bonds";
								//console.log( "Bond Purchase Error", e );
								setTimeout( ()=>{
									location.reload();
								}, 3000 );
							}
						}
					}, 2000 );
				} else {
					this.innerText = "Value too Low";
					setTimeout( ()=>{
						this.innerText 	= "Buy Bond";
					}, 1000 );
				}
			}
		}
	});
}

if( location.href.includes( profileUrl ) ) {
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note = JSON.parse( Scriptbill.s.currentNote );
	
	//catch the template variables
	loadingDiv();
	
	let dob	 			= document.getElementById("dateofbirth");
	let address 		= document.getElementById("addText");
	let firstName 		= document.getElementById("firstName");
	let fullName 		= document.getElementById("fullName");
	let birthDate 		= document.getElementById("birthDate");
	let addressEdit		= document.getElementById("address");
	let city	 		= document.getElementById("city");
	let state 			= document.getElementById("input-zone");
	let zipCode 		= document.getElementById("zipCode");
	let country 		= document.getElementById("inputCountry");
	let profileBtn 		= document.getElementById("profileSave");
	let langEl	 		= document.getElementById("languageEL");
	let timeZone 		= document.getElementById("timeZone");
	let status	 		= document.getElementById("noteStatus");
	let langSel	 		= document.getElementById("language");
	let timeSel	 		= document.getElementById("input-timezone");
	let statusSel 		= document.getElementById("accountStatus");
	let accBtn	 		= document.getElementById("accountSave");
	let emailRow 		= document.getElementById("emailEl");
	let emailRow2 		= document.getElementById("emailRow");
	let addEmail 		= document.getElementById("addEmail");
	let emailSave 		= document.getElementById("emailSave");
	let phoneRow 		= document.getElementById("phoneEl");
	let phoneRow2 		= document.getElementById("phoneRow");
	let addPhone 		= document.getElementById("addPhone");
	let phoneSave 		= document.getElementById("phoneSave");
	let password 		= document.getElementById("password");
	let curPass 		= document.getElementById("existingPassword");
	let newPass 		= document.getElementById("newPassword");
	let confirmPass		= document.getElementById("confirmPassword");
	let savePass		= document.getElementById("savePassword");
	let noteKey			= document.getElementById("noteKey");
	let curKey			= document.getElementById("existingKey");
	let newKey			= document.getElementById("newKey");
	let confirmKey		= document.getElementById("confirmKey");
	let saveKey			= document.getElementById("saveKey");
	setTimeout( ()=>{
		fetch( "/countries.json" ).then(resp=>{return resp.json()}).then( async countries =>{
			let accountData 	= await getAccountData();
					
			/* if( ! accountData ){
				accountData = {};				
			} else {
				accountData 	= JSON.parse( accountData );
			} */	
							
			let accID 		= note.noteAddress;
			
			if( ! accountData[accID] )
				accountData[accID] = {};
			
				
			setAccountRank();
			
			if( accountData[accID].dateofbirth ){
				dob.innerHTML 		= accountData[accID].dateofbirth;
				birthDate.value 	= accountData[accID].dateofbirth;
			}
			
				
			if( accountData[accID].address ){
				address.innerHTML 	= accountData[accID].address;
				addressEdit.value 	= accountData[accID].address;
				
				if( accountData[accID].city ){
					address.innerHTML 	+= ' <br> ' + accountData[accID].city;
					city.value 			= accountData[accID].city;
					
					if( accountData[accID].state ){
						address.innerHTML += ' <br> ' + accountData[accID].state;
						state.value 		= accountData[accID].state;
						
						if( accountData[accID].zipCode ){
							address.innerHTML += ' - ' + accountData[accID].zipCode;
							zipCode.value 		= accountData[accID].zipCode;
						}			
						
					}
				}
			}
			
			let dx, count, no = 0;
			country.innerHTML = '<option value=""> ---  Select --- </option>';
				
			for( dx = 0; dx < countries.length; dx++ ){
				count 				= countries[dx];
				if( accountData[accID].country && count.iso == accountData[accID].country){
					no = dx;
					country.innerHTML 	+= '<option value="'+count.iso+'" selected="selected">'+count.country+'</option>';
				} else {
					country.innerHTML 	+= '<option value="'+count.iso+'">'+count.country+'</option>';
				}				
			}
				
			if( accountData[accID].country ){
				address.innerHTML += ' <br> ' + countries[no].country;
			}
			
			
			
			
			if(  accountData[accID].firstName ){
				firstName.value = accountData[accID].firstName;
			}
				
			if( accountData[accID].lastName ){
				fullName.value 	= accountData[accID].lastName;
			}
			
			profileBtn.onclick = function(e){
				e.preventDefault();
				this.innerText = "Saving Details...";
				if( firstName.value != "" ){
					accountData[accID].firstName = firstName.value;
					accountData[accID].fullName  = firstName.value;
				}
				
				if( fullName.value != "" ){
					accountData[accID].lastName = fullName.value;
					accountData[accID].fullName  += ' ' + fullName.value;
				}
				
				if( birthDate.value != "" ){
					accountData[accID].dateofbirth 	= birthDate.value;
				}
				
				if( addressEdit.value != "" ){
					accountData[accID].address 		= addressEdit.value;
				}
				
				if( city.value != "" ){
					accountData[accID].city 		= city.value;
				}
				
				if( zipCode.value != "" ){
					accountData[accID].zipCode 		= zipCode.value;
				}
				
				if( state.value != "" ){
					accountData[accID].state 		= state.value;
				}
				
				if( country.value != "" ){
					accountData[accID].country 		= country.value;
				}
				
				Scriptbill.setAccountData( accountData ).then( block =>{
					
					if( block && block.transType == "UPDATE" ){
						this.innerText = "Profile Details Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 1000);
						}, 3000 );
					} else {
						this.innerText = "Profile Details Not Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 100000 );
						}, 3000 );
					}
				});			
					
			}
			
			if( accountData[accID].language ){
				langEL.innerHTML 	= accountData[accID].language;
			}
			
			if( accountData[accID].timeZone ){
				timeZone.innerHTML		= accountData[accID].timeZone;
			}
			
			if( accountData[accID].status ){
				
				if( accountData[accID].status == "Active" )
					status.innerHTML		= '<i class="fas fa-check-circle"></i>' + accountData[accID].status;
				
				else 
					status.innerHTML		= '<i class="fas fa-times"></i>' + accountData[accID].status;
			}
			
			//getting the timezones.
			fetch("/timezones.json").then( response =>{ return response.json() } ).then( times =>{
				timeSel.innerHTML = "";
				let ex, tim;
				for( ex = 0; ex < times.length; ex++ ){
					tim 		= times[ex];
					timeSel.innerHTML 	+= '<option value="'+ tim.abbr +'">'+ tim.text +'</option>';
				}
				fetch("/languages.json").then( resp =>{ return resp.json() } ).then( lang =>{
					let ed, lan;
					langSel.innerHTML = "";
					for( ed in lang ){
						lan 			= lang[ed];
						langSel.innerHTML += '<option value="'+ ed +'">'+ lan +'</option>';
					}
				
					accBtn.onclick = function(){
						this.innerText = "Saving Details...";
						if( langSel.value != "" ){
							accountData[accID].language 		= lang[langSel.value];
						}
						
						if( statusSel.value != "" ){
							accountData[accID].status 			= statusSel.value;
						}
						
						if( timeSel.value != "" ){
							
							for( ex = 0; ex < times.length; ex++ ){
								tim 		= times[ex];
								if( timeSel.value == tim.abbr ) break;
							}
							accountData[accID].timeZone		= tim.text;
						}
						
						Scriptbill.setAccountData( accountData ).then( block =>{
					
							if( block.transType == "UPDATE" ){
								this.innerText = "Profile Details Saved";
								setTimeout( ()=>{
									this.innerText 	= "Save Changes";
									setTimeout(()=>{
										location.reload();
									}, 1000);
								}, 3000 );
							} else {
								this.innerText = "Profile Details Not Saved";
								setTimeout( ()=>{
									this.innerText 	= "Save Changes";
									setTimeout(()=>{
										location.reload();
									}, 1000);
								}, 3000 );
							}
						});					
					}
				});
			});
			
			if( accountData[accID].emails && accountData[accID].emails.length > 0 ){
				let em, row, head, a;
				
				for( em = 0; em < accountData[accID].emails.length; em++ ){
					if( em === 0 ){
						emailRow.querySelector(".col-sm-9").innerText = accountData[accID].emails[em];
						emailRow2.querySelector("#emailID").value = accountData[accID].emails[em];
					}
					else {
						row 		= emailRow.cloneNode(true);
						head 		= emailRow.parentElement;
						row.querySelector(".col-sm-9").innerText = accountData[accID].emails[em];
						row.querySelector(".text-muted.font-weight-500").innerText = "(Secondary)";
						head.appendChild( row );
						row 		= emailRow2.cloneNode( true );
						row.querySelector("label").setAttribute("for", "emailID"+em);
						row.querySelector("input").setAttribute("id", "emailID"+em);
						row.querySelector("input").value = accountData[accID].emails[em];
						row.querySelector("label").innerHTML = 'Mobile <span class="text-muted font-weight-500">(Secondary)</span>';
						head 		= emailRow2.parentElement;
						a 			= head.querySelector("a");
						emailRow2.setAttribute("cloned", em);
						head.insertBefore( row, a );
						
					}
				}
			}
			
			addEmail.onclick = function(){
				this.innerText = "Saving Details...";
				let head 		= emailRow2.parentElement;
				let row 		= emailRow2.cloneNode(true);
				let em 			= emailRow2.getAttribute("cloned");
				
				if( ! em ){
					em 		= 0;
				} else {
					em 		= em * 1;
				}
				
				em++;
				
				row.querySelector("label").setAttribute("for", "emailID"+em);
				row.querySelector("label").innerHTML 	= 'Email ID <span class="text-muted font-weight-500">(Secondary)</span>';
				row.querySelector("input").setAttribute("id", "emailID"+em);
				row.querySelector("input").value 		= '';
				row.querySelector("input").placeholder	= 'emaple@example.com';
				let a 			= head.querySelector("a");
				emailRow2.setAttribute("cloned", em);
				head.insertBefore( row, a );
			}
			
			emailSave.onclick 	= function(e){
				e.preventDefault();
				this.innerText = "Saving Details...";
				let form 		= emailRow2.parentElement;
				let emails 		= form.getElementsByTagName("input");
				
				let mem, el;
				
				for( mem = 0; mem < emails.length; mem++ ){
					el 			= emails[mem];
					
					if( el ){
						if( ! accountData[accID].emails )
							accountData[accID].emails 		= [];
						if( ! accountData[accID].emails.includes( el.value ) )
							accountData[accID].emails.push( el.value );
					}
				}
				
				Scriptbill.setAccountData( accountData ).then( block =>{
					if( block.transType == "UPDATE" ){
						this.innerText = "Email Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 1000);
						}, 3000 );
					} else {
						this.innerText = "Email Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 1000);
						}, 3000 );
					}
				});								
			}
			
			if( accountData[accID].phones && accountData[accID].phones.length > 0 ){
				let em, row, head, a;
				
				for( em = 0; em < accountData[accID].phones.length; em++ ){
					if( em === 0 ){
						phoneRow.querySelector(".col-sm-9").innerText = accountData[accID].phones[em];
						phoneRow2.querySelector("#mobileNumber").value = accountData[accID].phones[em];
					}
					else {
						row 		= phoneRow.cloneNode(true);
						head 		= phoneRow.parentElement;
						row.querySelector(".col-sm-9").innerText = accountData[accID].phones[em];
						row.querySelector(".text-muted.font-weight-500").innerText = "(Secondary)";
						head.appendChild( row );
						row 		= phoneRow2.cloneNode( true );
						row.querySelector("label").setAttribute("for", "emailID"+em);
						row.querySelector("input").setAttribute("id", "emailID"+em);
						row.querySelector("input").value = accountData[accID].phones[em];
						row.querySelector("label").innerHTML = 'Mobile <span class="text-muted font-weight-500">(Secondary)</span>';
						head 		= phoneRow2.parentElement;
						a 			= head.querySelector("a");
						phoneRow2.setAttribute("cloned", em);
						head.insertBefore( row, a );
						
					}
				}
			}
			
			addPhone.onclick = function(){
				let head 		= phoneRow2.parentElement;
				let row 		= phoneRow2.cloneNode( true );
				let em 			= phoneRow2.getAttribute("cloned");
				
				if( ! em ){
					em 		= 0;
				} else {
					em 		= em * 1;
				}
				
				em++;
				
				row.querySelector("label").setAttribute("for", "emailID"+em);
				row.querySelector("label").innerHTML 		= 'Mobile <span class="text-muted font-weight-500">(Secondary)</span>';
				row.querySelector("input").setAttribute("id", "emailID"+em);
				row.querySelector("input").value 		= '';
				row.querySelector("input").placeholder 	= 'phone number';		
				let a 			= head.querySelector("a");
				phoneRow2.setAttribute("cloned", em);
				head.insertBefore( row, a );
			}
			
			phoneSave.onclick 	= async function(){
				this.innerText = "Saving Details...";
				let form 		= phoneRow2.parentElement;
				let emails 		= form.getElementsByTagName("input");
							
				let mem, el, mes = [];
				
				for( mem = 0; mem < emails.length; mem++ ){
					el 			= emails[mem];
					
					if( el && el.value && el.value.indexOf('+') == 0 ){
						if( ! accountData[accID].phones )
							accountData[accID].phones 		= [];
						
						if( ! accountData[accID].phones.includes( el.value ) )
							accountData[accID].phones.push( el.value );
					} else {
						
						if( el && el.value )
							mes.push("This Phone Number Was not Properly Formated " + el.value + " an international format is required with the (+) plus sign!");
					} 
				}
				
				for( mem = 0; mem < mes.length; mem++ )
					await Scriptbill.createAlert(mes[mem]);
				
				if( mes.length ) return;
				
				Scriptbill.setAccountData( accountData ).then( block =>{
					let text 				= this.innerText;
					if( block.transType == "UPDATE" ){
						this.innerText = "Phone Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 1000);
						}, 3000 );
					} else {
						this.innerText = "Phone Saved";
						setTimeout( ()=>{
							this.innerText 	= "Save Changes";
							setTimeout(()=>{
								location.reload();
							}, 1000);
						}, 3000 );
					}
				});
				
			}
			
			
			savePass.onclick 	= async function(e){
				e.preventDefault();
				if( curPass.value != "" && newPass.value != "" ){
					if( newPass.value !== confirmPass.value ) {
						await Scriptbill.createAlert("Password Not Match, Check and Try Again!");
						return;
					}
					
					Scriptbill.changeLoginPassword( newPass.value, curPass.value  ).then( isSaved =>{
						if( isSaved ){
							this.innerText 	= "Password Saved!";
							setTimeout(()=>{
								this.innerText	= "Save Password";
								location.reload();
							}, 3000);
						} else {
							this.innerText  = "Password Not Saved!!!";
							setTimeout( ()=>{
								this.innerText 		= "Save Password";
							}, 1000 );
						}
					});
				} else {
					await Scriptbill.createAlert("Password Not Set Yet!!!");
				}
			}
			
			saveKey.onclick 		= async function(e){
				e.preventDefault();
				if( curKey.value != "" && newKey.value != "" ){
					if( newKey.value !== confirmKey.value ) {
						await Scriptbill.createAlert("Note Key Do Not Match, Check and Try Again!");
						return;
					}
					
					Scriptbill.changeTransKey( curKey.value, newKey.value ).then( isSaved =>{
						if( isSaved ){
							this.innerText 	= "Key Saved!";
							setTimeout( ()=>{
								this.innerText 	= "Save Key";
								location.reload();
							}, 3000 );
						} else {
							this.innerText  = "Key Not Saved!!!";
							setTimeout( ()=>{
								this.innerText 		= "Save Key";
							}, 1000 );
						}
					});
				} else {
					await Scriptbill.createAlert("Note's Key Not Set Yet!!!");
				}
			}
			
		});
	}, 500 );
	handle_mergers();
	removeLoadingDiv();
	$(function() {
		'use strict';
		 // Birth Date
		$('#birthDate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			maxDate: moment().add(0, 'days'),
			}, function(chosen_date) {
		  $('#birthDate').val(chosen_date.format('MM-DD-YYYY'));
		});
	});
	
}

if( location.href.includes( qrcodeUrl ) ){
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	
	  var lastResult, countResults = 0, transBlock;
        async function onScanSuccess(decodedText, decodedResult) {
			
            if (decodedText !== lastResult) {
				
                ++countResults;
                lastResult = decodedText;
                // Handle on success condition with the decoded message.
                //console.log(`Scan result ${decodedText}`, decodedResult);
				try {
					//await Scriptbill.createAlert('las ' + lastResult);
					//await Scriptbill.createAlert('ded ' + decodedText);
					//await Scriptbill.createAlert(url.href);
					let data = decodedText.split("data=");
					//await Scriptbill.createAlert(data);
					if( data.length ){
						lastResult	= Scriptbill.Base64.decode( data[1] ).replace(/[^\x20-\x7E]/g,"");
						if( Scriptbill.isJsonable( lastResult ) ){
							lastResult = JSON.parse( lastResult );			 
						} 
					}
				} catch(e){
					if( Scriptbill.isJsonable( lastResult ) ){
						lastResult = JSON.parse( lastResult );					 
					}
				} finally {
					if( lastResult && lastResult.blockID ){
						if( lastResult.rep && lastResult.rep != note.noteAddress && lastResult.type != "CREDIT" ){
							await Scriptbill.createAlert("Sorry You Are Not A Recipient to This Transaction");
							return;
						}
						//Scriptbill.blockID = lastResult.blockID;
							
						if( lastResult.server )
							Scriptbill.server 	= lastResult.server;
						
						transBlock 			= await Scriptbill.getTransBlock(1, {blockID: lastResult.blockID});
						
							
						if( ! transBlock || ! transBlock.length ){
							await Scriptbill.createAlert("No Valid Transaction Was Connected To This Request!");
							return;
						}
						
						transBlock 			= transBlock[0];
												
						let verify 			= Scriptbill.storeBlock( transBlock );
							
						if( ! verify ){
							await Scriptbill.createAlert("Transaction Invalid");
							return;
						}
							
						if( lastResult.transKey ){
							Scriptbill.recieveKey = lastResult.transKey;
						}
							
						if( ['SEND','BUYPRODUCT', 'STOCKPAY', 'INVEST', 'CREDIT'].includes( transBlock.transType ) ){
							console.log( transBlock );
							if( transBlock.transType == "CREDIT" && typeof transBlock.agreement == "object" && transBlock.agreement.agreeType == "PRODUCT" ){
								let buyConfig = JSON.parse( JSON.stringify( transBlock.agreement ) );
								buyConfig.block = JSON.parse( JSON.stringify( transBlock ));
								if( lastResult.referer )
									buyConfig.referer 		= lastResult.referer;
								
								if( lastResult.bankAccount )
									buyConfig.bank 	= JSON.parse( JSON.stringify( lastResult.bankAccount ));
								
								Scriptbill.s.buyConfig = JSON.stringify( buyConfig );
								
								let gen 		= await Scriptbill.createConfirm( "Do you want to share this product to your friends to earn from all their purchases from this store? Click ok to generate a QR Code you can share with this product " );
								
								if( ! gen )								
									location.href = buyProduct;
								
								else {
									let data = JSON.parse( JSON.stringify( lastResult ));
									data.referer = note.noteAddress;
									await Scriptbill.createAlert( "QR Code Generating, Please Download QR Codes as soon as it is generated" );
									let qrurl 	= chrome.runtime.getURL("qrcode.min.js");
									let script = document.createElement('script');
									script.src = qrurl;
									document.head.appendChild( script );
									let cssurl 	= chrome.runtime.getURL("scriptbill/css/css.css");
									let css = document.createElement('link');
									css.setAttribute('href', cssurl );
									css.setAttribute('type', "text/css" );
									css.setAttribute('rel', "stylesheet" );
									document.head.appendChild( css );
									setTimeout( ()=>{
										generateQRCode( JSON.stringify( data ), data.referer );
										setTimeout( ()=>{
											location.href 	= buyProduct;
										}, 15000 );
									}, 2000);								
								}
							} else {
								Scriptbill.recieveNewBlock().then( async block =>{
									if( block ){
										await Scriptbill.createAlert("Transaction Successfully Recieved. You've Recieved " + parseFloat( transBlock.transValue ).toFixed(2) );
									}
								});
							}
						} else if( transBlock.transType == "WITHDRAW" ){
							if( transBlock.noteType != note.noteType ){
								await Scriptbill.createAlert("Can't Withdraw From a Different Credit Type");
								return;
							}
							let amount = await Scriptbill.createPrompt(" how much do you want to deposit from this request.", transBlock.transValue);
							
							if( amount > transBlock.transValue ){
								await Scriptbill.createAlert("You can't deposit higher than " + transBlock.transValue + " From This Block");
								return;
							}
							else if( amount == 0 ){
								await Scriptbill.createAlert("You can't deposit a zero amount");
								return;
							}
							let test 	= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
							let config = {
								value : amount,
								withdrawBlock : JSON.parse( JSON.stringify( transBlock ) ),
								currency: test,
								paymentMethod: "bank"
							};
							Scriptbill.s.sendConfig 	= JSON.stringify( config );
							location.href 				= depositConfirm;							
						}
					}
				}
			}
        }
		
		function onScanError(error){
			console.log(error);
		}

        var html5QrcodeScanner = new Html5QrcodeScanner(
            "qrdiv", { fps: 10, qrbox: 250 });
        html5QrcodeScanner.render(onScanSuccess, onScanError);
}

if( location.href.includes( bankUrl ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	loadingDiv();
	
	//getting all the elements
	let cardRow 	= document.getElementById("cardRow");
	let cardImg 	= cardRow.querySelector("img");
	let cardEdit 	= cardRow.querySelectorAll("a.text-light.btn-link.mx-2.cardEdit");
	let cardDel 	= cardRow.querySelectorAll("a.text-light.btn-link.mx-2.cardDel");
	let cardPar 	= cardRow.parentElement;
	let noteBal 	= document.getElementById("balance");
	let BondBtn 	= document.getElementById("buyBondBtn");
	let BondVal 	= document.getElementById("bondValue");
	let rankSal 	= document.getElementById("rankSalute");
	let salute	 	= document.getElementById("salute");
	let walletRank 	= document.getElementById("walletRank");
	let bankRow 	= document.getElementById("bankRow");
	let bankEdit 	= document.getElementById("bankEdit");
	
	for( let x = 0; x < cardDel.length; x++ ){
		cardDel[x].onclick = function(e){			
			e.preventDefault();
			let par 	= this.parentElement.parentElement.parentElement;
			let acc 	= par.getAttribute("account");
			
			if( Scriptbill.isJsonable( acc ) )
				acc 	= JSON.parse( acc );
			
			else return;
			
			deleteBankAccount( acc, false );
						
		}
	}
	
	
	fetch( "/currencies.json" ).then(resp=>{return resp.json()}).then( async currencies =>{
		let accountData 	= await getAccountData();
					
		/* if( ! accountData ){
			accountData 	= {};
		} else {
			accountData 	= JSON.parse( accountData );
		} */
		
		let accID 			= note.noteAddress;
		
		if( ! accountData[accID] )
			accountData[accID] 	= {};
				
				
		setAccountRank();
		let notesCard 		= accountData[accID].savedCards;//Scriptbill.getNoteDetails("savedCards");
		if( notesCard && Scriptbill.isJsonable( notesCard ) )
			notesCard 			= JSON.parse( notesCard );
		else 
			notesCard 			= false;	
		
		let notesAcc 		= accountData[accID].savedAccounts;//Scriptbill.getNoteDetails("savedAccounts");
		if( notesAcc && Scriptbill.isJsonable( notesAcc ) )
			notesAcc			= JSON.parse( notesAcc ); 
		else 
			notesAcc 			= false;
			
		let children 		= cardRow.children;
		let accChildren 	= bankRow.children;
		//console.log("notes: " + notesCard.length );
		if( ! notesCard || ! notesCard.length ){
			
			children[0].remove();
			children[0].remove();
		} else {
			let card, child;
			if( notesCard.length >= 3 ){
				let grandsec 	= cardPar.cloneNode( true );
				children[2].remove();
				card 			= notesCard[2];
				child 			= children[1].cloneNode(true);
				setCardChild( card, child );
				cardRow.appendChild( child );
				
				let sechildren 	= grandsec.querySelector("#cardRow").children;
				let middlePanel = cardPar.parentElement;
				
				if( notesCard.length == 3 ){
					sechildren[0].remove();
					sechildren[0].remove();
				} else {
					let sec, chd;
					for( sec = 3, chd = 0; sec <= 5; sec++, chd++ ){
						card 		= notesCard[sec];
						child 		= sechildren[chd];
						setCardChild( card, child );						
					}
				}
				middlePanel.insertBefore( grandsec, document.getElementById("edit-card-details") );
			}
				
			let sec;
			
				
			if( notesCard.length == 1 ){
				children[1].remove();
				setCardChild( notesCard[0], children[0] );
			} else {
				for( sec = 0; sec <= 2; sec++ ){
					card 		= notesCard[sec];
					child 		= children[sec];
					if( card == undefined ) continue;
					
					setCardChild( card, child );						
				}
			}
			
		}
		//console.log( "notesAcc" + notesAcc );
		if( ! notesAcc || ! notesAcc.length ){
			accChildren[0].remove();			
		} else {
			let card, child;
			if( notesAcc.length >= 2 ){
				let grandsec 	= bankRow.parentElement.cloneNode( true );
				accChildren[1].remove();
				card 			= notesAcc[1];
				child 			= accChildren[0].cloneNode(true);
				setAccChild( card, child );
				setAccChild( notesAcc[0], accChildren[0] );
				bankRow.appendChild( child );
				
				let sechildren 	= grandsec.querySelector(".row").children;
				let middlePanel = bankRow.parentElement.parentElement;
				
				if( notesAcc.length == 2 ){
					sechildren[0].remove();
				} else {
					let sec, chd;
					/* for( sec = 2, chd = 0; sec < 4; sec++, chd++ ){
						card 		= notesAcc[sec];
						child 		= sechildren[chd];
						if( card )
							setAccChild( card, child );						
					} */
				}
				middlePanel.insertBefore( grandsec, document.getElementById("bank-account-details") );
			} else{
				setAccChild( notesAcc[0], accChildren[0] );	
			} 
			
		}
		saveNotesCard();
		saveBankDetails();
		handle_mergers();
		removeLoadingDiv();
	});
}

if( location.href.includes( loanUrl ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 			= JSON.parse( Scriptbill.s.currentNote );
	
	if( note.noteType.lastIndexOf("BND") == 3 || note.noteType.lastIndexOf("STK") == 3 ){
		setTimeout( async ()=>{
			await Scriptbill.createAlert("Sorry Can't Get Loan With A Bond or Stock File.  Login a Credit File to Access Loan");
			location.href = dashboardUrl;
		},1 );	
	}
	
	let sendMoney 		= document.getElementById("youSend");
	let currency 		= document.getElementById("youSendCurrency");
	let summary 		= document.getElementById("yourEligibility");
	let interest 		= document.getElementById("interestFees");
	let button 	 		= document.getElementById("continue");
	let symbol 	 		= document.getElementById("symbol");
	let test 			= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
	
	if( currency.querySelector('option[value="'+test+'"]') ){
		currency.querySelector('option[value="'+test+'"]').setAttribute("selected", "selected");
	}
	summary.innerHTML = '0.00 ' + currency.value;
	interest.innerHTML = '0.00 ' + currency.value;
	sendMoney.oninput 		= function(){
		let intr 		= this.value * 0.01;
		let repay 		= intr * 30;
		let value 		= parseFloat( this.value ) + parseFloat( repay );
		summary.innerHTML = value + ' ' + currency.value;
		interest.innerHTML = intr + ' ' + currency.value;
	}
	fetch("/currencies.json").then( resp=>{ return resp.json(); }).then( result=>{
		if( symbol ){
			symbol.innerText = result[ test ].symbol_native;
		}
	});
	button.removeAttribute("disabled");
	button.onclick = function(e){
		e.preventDefault();
		let loanReq = {};
		loanReq.value = sendMoney.value;
		loanReq.currency = currency.value;
		Scriptbill.s.loanRequest = JSON.stringify( loanReq );
		setTimeout( ()=>{
			location.href = loanConfirm;
		}, 500 );
	}
}

if( location.href.includes( loanConfirm ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	if( ! Scriptbill.s.loanRequest )
		location.href = loanUrl;
	
	let request = JSON.parse( Scriptbill.s.loanRequest );
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	
	let loanAmount 		= document.getElementById("loanAmount");
	let fees	 		= document.getElementById("feesID");
	let totalAmont 		= document.getElementById("total");
	let contBtn 		= document.getElementById("confirmBtn");
	let fullAmnt 		= document.getElementById("fullAmount");
	let availBal 		= document.getElementById("availBalance");
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async currencies =>{
		//get the total transaction created by the current note.
		//with loan, we calculate per note note per wallet as in rank.
		//alert("checks");
		let trans			= await Scriptbill.getNoteTransactions();
		
		//console.log( trans );
		let test 			= note.noteType.slice(0, note.noteType.lastIndexOf("CRD") );
		let symbol 			= currencies[ test ] ? currencies[ test ].symbol : test;
		
		//to get the truth about the users eligibility, we check his recent transactions.
		//setting the trans time.
		/* let transTime 		= parseInt( Scriptbill.currentTime() ) - parseInt( Scriptbill.calculateTime( "2 weeks" ) ); 
		let limit 			= 1000;
		let eligibility 	= 1;
		let loanVal			= 0;
       // let transTypes      = Scriptbill.getTransTypes();
		let block, no;
		
		
		//looping through the transaction, the limit is 1000 transactions and the transTime limit is last week.
		let processedIDs = [];
		for( no = ( trans.length - 1); no >= 0; no-- ){
			block 				= trans[no];
			if( typeof block == "string" ){
				try {
					block = JSON.parse( block );
				} catch(e){
					console.error( "could not parse a transaction block, the error " + e, "the block: " + block );
				}
			}
					
			if( /* ! block || ! block.blockID || *//* ['RECIEVE', 'PROFITRECIEVE', 'INVESTRECIEVE', 'STOCKRECIEVE', 'DEPOSIT'].includes( block.transType ) || parseInt( block.transTime ) < transTime ) {
			
				if( block.transType == 'PROFITRECIEVE' && block.budgetID && ! processedIDs.includes( block.budgetID ) ){
					 processedIDs.push( block.budgetID );
					 eligibility     += parseFloat( block.transValue ) * 3.5;
				} else {
					eligibility 	+= parseFloat( block.transValue );
				}
			} else if( block && block.blockID ){
				if( block.transType == "WITHDRAW" ){
					eligibility 		-= 		parseFloat( block.transValue );
				}
			}
		}

		alert( eligibility );
		
		let accountData   		= await getAccountData();
		let url 				= new URL( SERVER );
		//url.searchParams.set('paypal-acc', note.walletID );

		let ret = await Scriptbill.getData('paypal-acc', note.walletID, url.href );


        if( ( ! accountData[ note.noteAddress ] || ! accountData[ note.noteAddress ].savedCards ) && ( ! ret || ( ! ret.userName && ! ret.isVerified)) ){
          await Scriptbill.createAlert('A Card or PayPal Account Must Be Associated with This note to access loans. Redirecting you to your Profile Page to add an Account!');
          location.href = bankUrl;
        }
		
		let noteValue 			= note.noteValue;
		let testType 			= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
		if( accountData.loanValue )
			loanVal 		+= parseFloat( accountData.loanValue );

        let ranks 			= Scriptbill.getRanks(); */
		/*
		if( ! accountData.rank || ( ranks[accountData.rank] && ranks[accountData.rank].credit_level < 10000))
			accountData.rank = "SJUSGRFIDUGVDISCSI";
		
		if( accountData.rank ){
			
			if( ranks[accountData.rank] ){
				let creditLevel 	= ranks[accountData.rank].credit_level;
				
				let rates 	= await fetch( "/exRate.json" ).then( resp =>{ return resp.json() }).then( result =>{ return result.rates; }).catch( error =>{ console.error( error ); return {}; } );
				
				creditLevel 	= creditLevel * rates[ testType ];
				if( accountData.value )
					eligibility 	+= parseFloat( accountData.value ) / rates[ testType ];
				
				eligibility 	+= creditLevel * 0.5;
				
				eligibility		-= loanVal; 
			}
		} */
		let eligibility 			= await Scriptbill.calculateLoanEligibility();
		console.log( eligibility, "eli");
		
		availBal.innerHTML 		= symbol + " " + formatCurrency( eligibility.toFixed(2) );
		let fee;
		if( request.value <= eligibility ){
			//fullAmnt.setAttribute("disabled", "disabled");
			loanAmount.innerHTML 	= symbol + " " + request.value;
			fee						= ( request.value * 0.01 );
			fees.innerHTML			= symbol + " " + fee;
			totalAmount.innerHTML 	= parseFloat( request.value ) + ( fee * 30 );
		} else {
			loanAmount.innerHTML 	= symbol + " " + eligibility.toFixed(2);
			fee						= ( eligibility * 0.01 ).toFixed(2);
			fees.innerHTML			= symbol + " " + fee;
			totalAmount.innerHTML 	= (parseFloat( eligibility ) + ( fee * 30 )).toFixed(2);
		}
		
		contBtn.onclick = async function(e){
			e.preventDefault();
			//create a loan transaction to the users. a loan transaction is like an 
			//update transaction. However, it must contain the ranl code of the user as 
			//a reference to other blocks who will like to inspect the credibility of 
			//the loan using this same calculation. If the user is eligible from here, 
			//then he will be eligible on other nodes. But if not, and probably 
			//inserted the transaction block to make people believe he got a loan, his 
			//credits will not transact.
			Scriptbill.details 			= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ) );
			Scriptbill.details.transType 	= "LOAN";
			Scriptbill.details.transValue 	= eligibility < request.value ? eligibility : parseFloat( request.value );
			
			Scriptbill.details.agreement 	= await Scriptbill.createAgreement();
			Scriptbill.details.agreement.agreeType = "LOAN";
			Scriptbill.details.agreement.value  = eligibility + (fee * 365);//a year billing set
			//this can however be cut short if the transBlock expires
			Scriptbill.details.agreement.isPeriodic = true;
			Scriptbill.details.agreement.times 		= 365;
			Scriptbill.details.agreement.payPeriod 	= "1 Days";
			Scriptbill.details.agreement.payTime 	= parseInt( Scriptbill.currentTime() ) + parseInt( Scriptbill.calculateTime("1 Days"));
			Scriptbill.details.agreement.ExecTime 	= parseInt( await Scriptbill.currentTime() ) + parseInt( await Scriptbill.calculateTime("3 Days"));
			this.innerText = "Loan Processing...";
			Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details ).then( block =>{
				Scriptbill.s.loanProcessing 	= "TRUE";
				request.symbol 					= symbol;
				request.value 					= eligibility > request.value ? request.value : eligibility;
				Scriptbill.s.loanRequest		= JSON.stringify( request );
				//console.log( "trans Block: " + JSON.stringify( block ), typeof block );
				
				setTimeout(()=>{
					
					if( block && block.transType == "LOAN" ){
						accountData.loanValue += parseFloat( block.transValue );
						Scriptbill.setAccountData( accountData );
						location.href = loanSuccess;
					} else {
						let urlt 		= new URL( loanSuccess );
						urlt.searchParams.set("error", "true");
						if( document.querySelector("#error") ){
							var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
							var keys 	= Object.keys( errors );
							keys 		= keys.reverse();
							document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`
						}
						setTimeout( function(){
							location.href 	= urlt.href;
						}, 20000 );
						
					}
				}, 3000);
				
			});
			
		}
	});
}

if( location.href.includes( loanSuccess ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	if( ! Scriptbill.s.loanRequest )
		location.href = loanUrl;
	
	if( ! Scriptbill.s.loanProcessing )
		location.href = loanUrl;
	
	let request = JSON.parse( Scriptbill.s.loanRequest );
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	let success	= document.getElementById("transaction-success");
	let notice 	= success.querySelector("p.text-center.text-success.text-8.line-height-07.success");
	let trans 		= success.querySelector("p.text-center.text-4.successSlog");
	let transVal 	= success.querySelector("span.text-4.font-weight-500.transValue");
	let desc 		= success.querySelector("p.text-center.text-3.mb-4.transDesc");
	let button 		= success.querySelector("button.btn.btn-primary.btn-block.rerunButton");
	let print 		= success.querySelector("button.btn.btn-link.btn-block.printButton");
	
	let urlt 		= new URL(location.href);
	let error 		= urlt.searchParams.get("error");
	if( transVal && ! error )
		transVal.innerHTML = request.symbol + " " + parseFloat(request.value).toFixed(2);
	
	if( error ) {
		trans.innerHTML 	= "Transaction Incomplete";
		desc.innerHTML 		= "Sorry An Error Occured While Processing Your Transaction.  Try Again Later";
		notice.innerHTML 	= "Error!";
	}
	delete Scriptbill.s.loanProcessing;
	delete Scriptbill.s.loanRequest;
	button.onclick = function(e){
		e.preventDefault();
		
		setTimeout( ()=>{
			location.href = loanUrl;
		}, 500);		
	}
	
	print.onclick = function(e){
		e.preventDefault();
		window.print();		
	}
	
	
}

if( location.href.includes( depositUrl ) ) {
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 			= JSON.parse( Scriptbill.s.currentNote );
	let sendMoney 		= document.getElementById("youSend");
	let currency 		= document.getElementById("youSendCurrency");
	let payment 		= document.getElementById("paymentMethod");		
	let summary	 		= document.getElementById("yourDeposit");
	let button		 	= document.getElementById("continue");
	let withdraw	 	= document.getElementById("uploadWithdraw");
	let withdrawFile 	= document.getElementById("uploadWithdrawFile");
	let sym 			= document.getElementsByClassName("input-group-prepend");
	let test 			= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));

	withdraw.setAttribute( "disabled", "disabled" );
	
	withdraw.onclick 	= function(e){
		e.preventDefault();
		withdrawFile.click();
	}
	
	withdrawFile.onchange = function(){
		let files = this.files;
		let reader = new FileReader();
		let text 	= reader.readAsText( files[0] );
		reader.addEventListener("load", function(){
			let blockData 	= reader.result;
			
			if( ! Scriptbill.isJsonable( blockData ) ) {
				button.setAttribute("disabled", "disabled");
				button.innerText = "Invalid Block Selected";
			} else {
				let block 	= JSON.parse( blockData );
				
				if( ! block.blockID || block.transType != "WITHDRAW" || ! block.transValue || ( sendMoney.value && sendMoney.value > block.transValue ) || note.noteType != block.noteType ){
					button.setAttribute("disabled", "disabled");
					if( sendMoney.value && sendMoney.value > block.transValue && block.transType == "WITHDRAW" ) {					
						button.innerText = "Value Larger Than " + parseFloat( block.transValue ).toFixed(2) + " " + test;
						Scriptbill.s.withdrawBlock = JSON.stringify( block );
					} else if( note.noteType != block.noteType ){
						button.innerText 	= "Unequal Credit Type";
					} else {
						button.innerText = "Invalid Block Selected";
					}
				} else {
					Scriptbill.s.withdrawBlock = JSON.stringify( block );
					button.removeAttribute("disabled");
					button.innerText = "Continue";
				}
			}
		});
	}
	
	
	fetch("/currencies.json").then( resp =>{return resp.json();}).then( currencies =>{
		if( currencies[ test ] ){
			
			sym[0].innerHTML 		= '<span class="input-group-text symbol">'+currencies[ test ].symbol+'</span>';
		}
	}); 
	if( currency.querySelector('option[value="'+test+'"]') ){
		currency.querySelector('option[value="'+test+'"]').setAttribute("selected", "selected");
		currency.setAttribute('disabled', 'disabled');
	}
	sendMoney.value="";
	
	sendMoney.oninput 		= function(){
		summary.innerHTML = sendMoney.value + ' ' + currency.value;
		if( Scriptbill.s.withdrawBlock ){
			try {
				let block = JSON.parse( Scriptbill.s.withdrawBlock );
				
				if( block && parseFloat( block.transValue ) <= sendMoney.value ){
					button.removeAttribute("disabled");
					button.innerText 	= "Continue";
				}
			} catch(e){
				//console.log("withdraw block error: " + e);
			}
		}
	}
	
	payment.onchange = function(){
		if( this.value == "bank" ){
			withdraw.removeAttribute("disabled");
			button.setAttribute("disabled", "disabled");
		} else if( this.value == "credit" ) {
			button.removeAttribute("disabled");
			withdraw.setAttribute("disabled", "disabled");
		}
	}
	
	button.onclick = async function(e){
		e.preventDefault();
		let sendConfig 	= {};
		if( sendMoney.value != "" && sendMoney.value.match(/[a-z]/g) == null ){
			sendConfig.value = parseFloat(sendMoney.value.replaceAll(',', '')).toFixed(2);
		} else {
			await Scriptbill.createAlert("Money Can't be Empty");
			return;
		}
		
		if( currency.value ){
			sendConfig.currency 	= currency.value;
		}
		
		if( payment.value ){
			sendConfig.paymentMethod = payment.value;
		} else {
			await Scriptbill.createAlert(" select a Payment Method");
			return;
		}
		
		if( Scriptbill.s.withdrawBlock ){
			sendConfig.withdrawBlock 	= JSON.parse( Scriptbill.s.withdrawBlock );
			delete Scriptbill.s.withdrawBlock;
		}
		
		if( payment.value == "credit" ){
			let creditVal = 10;
			let exRate 	 = await fetch("/exRate.json").then( response =>{ return response.json(); }).then( result =>{ return result; });
			creditVal	= creditVal * exRate.rates[ test ];
			
			/* if( sendMoney.value < creditVal ){
				await Scriptbill.createAlert("To Pay Using Credit Card, You Need to Demand Up to " + creditVal.toFixed(2) + " " + test + ". You Can Revert to Using Bank to Demand Any Value of Credit at 0.00 " + test + " Fees.");
				return;
			} */
		}
		
		Scriptbill.s.sendConfig 		= JSON.stringify( sendConfig );
		location.href 					= depositConfirm;
	}
}

if( location.href.includes( depositConfirm ) ){
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href 		= loginUrl;
	
	if( ! Scriptbill.s.sendConfig )
		location.href 	= depositUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let sendConfig 	= JSON.parse( Scriptbill.s.sendConfig );
	
	//getting all the variables.
	let cardType 	= document.getElementById("paymentMethod");
	let alertInfo 	= document.getElementById("alertInfo");	
	let depAmount 	= document.getElementById("depositAmount");
	let feesID  	= document.getElementById("feesID");	
	let totalAmnt  	= document.getElementById("totalAmount");	
	let confirmBtn 	= document.getElementById("confirmBtn");
	let agreeInfo 	= document.getElementById("agreeInfo");
	setTimeout(async ()=>{
		let accountData = await getAccountData();
		let accID 		= note.noteAddress;
		let test;
		if( note.noteType.lastIndexOf("CRD") == 3 )
			test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD") );
		else if( note.noteType.lastIndexOf("BND") )
			test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("BND") );
			
		
		if( ! Object.keys( accountData ) ) {
			await Scriptbill.createAlert("Your Account Do not Seems To Be registered on This Note,  Register Your Account Before Continuing!");
			location.href = signupUrl;
			return;
		}
		let accounts 	= accountData[accID].savedAccounts;
		let cards 		= accountData[accID].savedCards;
		accounts 		= typeof accounts == "string" ? JSON.parse( accounts ): [];
		cards 			= typeof cards == "string" ? JSON.parse( cards ): [];
		
		//console.log( "send: " + sendConfig );

		if( sendConfig.paymentMethod == "credit" ){
			cardType.parentElement.querySelector("label").innerText = "Cards";
			setTimeout( async ()=>{			
				if( cards && cards.length ){
					let x, card;
					cardType.innerHTML = "";
					for( x = 0; x < cards.length; x++ ){
						card 				= cards[x];
						cardType.innerHTML 	= ' <option value="'+card.cardNumber+'">XXXX-XXXX-'+card.cardNumber.slice( ( card.cardNumber.length - 4 ), card.cardNumber.length )+'</option>';
						cardType.setAttribute("data-" + card.cardNumber, JSON.stringify( card ) );
					}
				} else {
					await Scriptbill.createAlert("No Cards is set on your account.  return to Profile Page to add a Card to your Account!");
					location.href = bankUrl;
				}
				changeAccountName(cardType, alertInfo );
			}, 200 );
		} else if( sendConfig.paymentMethod == "bank" ) {
			cardType.parentElement.querySelector("label").innerText = "Banks";
			setTimeout( async ()=>{			
				if( accounts && accounts.length ){
					let x, account;
					cardType.innerHTML = "";
					if( ! sendConfig.withdrawBlock ){
						await Scriptbill.createAlert("Upload A Withdrawal Block to Pay with your bank account!");
						location.href = depositUrl;
					}
					for( x = 0; x < accounts.length; x++ ){
						account 				= accounts[x];
						cardType.innerHTML 	= ' <option value="'+account.accountNumber+'">XXXX-XXXX-'+account.accountNumber.slice( ( account.accountNumber.length - 4 ), account.accountNumber.length )+'</option>';
						cardType.setAttribute("data-" + account.accountNumber, JSON.stringify( account ) );
					}
				} else {
					await Scriptbill.createAlert("No Bank Details is set on your account.  return to Profile Page to add a Bank Account Details to your Account!");
					location.href = bankUrl;
				}
				changeAccountName(cardType, alertInfo );
			}, 200 );
		}
		
		cardType.onchange 		= function(){
			changeAccountName( this, alertInfo );
		}		
		
		if( sendConfig.value && sendConfig.currency){
			depAmount.innerHTML 	= sendConfig.value + ' ' + sendConfig.currency;
			feesID.innerHTML		= '0.00 ' + sendConfig.currency;
			totalAmnt.innerHTML		= sendConfig.value + ' ' + sendConfig.currency;
		}

		confirmBtn.onclick = async function(e){
			e.preventDefault();
			this.innerText = " Please Wait...";
			let data 		= cardType.getAttribute("data-" + cardType.value );
			
			if( ! data ){
				await Scriptbill.createAlert(" select a payment data");
				return;
			}
			if( sendConfig.paymentMethod == "credit" ){/*******/
				let email 			= accountData[accID].emails;
				
				if( email && email.length > 0 )
					email			= email[0];
				
				else
					email 			= await Scriptbill.createPrompt("Email not found in your account, please enter an email to continue payment", "info@scriptbank.com");
				
				if( ! email.includes("@") ){
					await Scriptbill.createAlert( "Invalid Email Entered" );
					return;
				}
				
				let payData 		= await billCard( sendConfig.value * 100, email, sendConfig.currency );
				
				//console.log( "Payment Data", payData, JSON.stringify( payData ));
				
				if( ! payData || ! payData.status || payData.status != 200 || ! payData.data || ! payData.data.checkout_url ){
					await Scriptbill.createAlert( "Unsuccessful Request to Payment Processing Server " );
					this.innerText = "Confirm";
					return;
				}
				let payUrl 			= payData.data.checkout_url;
				let iframe 			= document.createElement("iframe");
				let url 			= new URL( payUrl );
				let regex 			= /\W/g;
				let ref 			= payData.data.transaction_ref;
				let TransCode       = await Scriptbill.generateKey();
				url.searchParams.set("buyDashboard", "TRUE");
				url.searchParams.set("buyValue", sendConfig.value);
				url.searchParams.set("buyCard", data);
				url.searchParams.set("buyCur", sendConfig.currency);
				url.searchParams.set("buyNote", note.noteAddress);
				url.searchParams.set("checkout", "true");
				url.searchParams.set("checkout_type", "SQUAD");
				url.searchParams.set("checkout_cur", sendConfig.currency);
				url.searchParams.set("checkout_amount", sendConfig.value);
				url.searchParams.set("checkout_email", (accountData[accID].emails[0] ? accountData[accID].emails[0]:"admin@scriptbank.ng"));
				url.searchParams.set("checkout_transcode", TransCode);
				url.searchParams.set("checkout_ref", ref);
				iframe.src 			= url.href;
				iframe.width 		= "100%";
				iframe.height 		= "500px";
				let head 			= cardType.parentElement.parentElement.parentElement;
				head.innerHTML 		= "";
				iframe.style.display = "none";
				let img 			= document.createElement("img");
				img.src 			= "/images/wait.gif";
				img.width 			= "300px";
				img.height 			= "300px";				
				head.appendChild( iframe );
				head.appendChild( img );
				let inter = window.setInterval( ()=>{
					let check = checkIframeLoaded(iframe);
					
					if( check ){
						iframe.style.display = "block";
						img.remove();
						window.clearInterval( inter );
					}
				}, 100 );			
				
				let refInterval = setInterval( async ()=>{
					 let refed = false;					
					let request = await Scriptbill.getData(['verify', 'reference'], ['true', ref], SERVER );
					
					//console.log( request.status );
					
					if( request && request.data && Object.keys( request.data ).length > 0 ){
						if( ! this.seconds )
							this.seconds = 1;
						let data = JSON.parse( JSON.stringify( request ));
						//console.log( "verify data", data, JSON.stringify( data ));
						refed 	  = data.data.transaction_status == "success";
						
						
						if( refed && sendConfig.value ){
							clearInterval( refInterval );
							//await Scriptbill.createAlert("Deposit Received Successfully...Deposit Transaction Starting!!!");
							Scriptbill.isExchangeDeposit 		= true;
							Scriptbill.exchangeKey 				= EXCHANGEKEY;
							let nonce 							= await Scriptbill.getData('getTransNonce', 'TRUE', SERVER );
							
							if( nonce && nonce.length == 24 ){
								Scriptbill.depositInstance 	= nonce;
							}
							
							Scriptbill.depositInstanceKey 	= ref;
							Scriptbill.depositServer 		= "https://api-d.squadco.com/transaction/verify/";
							Scriptbill.depositType 			= "AUTO";
							Scriptbill.depositRequestType 	= "GET";
							Scriptbill.depositBody 			= false;
							Scriptbill.depositFiat( parseFloat( sendConfig.value ), note.noteType ).then( async transBlock =>{
								
								if( transBlock ){
								//console.log( JSON.stringify( transBlock ));			
								Scriptbill.s.depositConfirmBlock = JSON.stringify( transBlock );
								sendConfig.block 	= transBlock;
								sendConfig.agreeBlock = transBlock;
								Scriptbill.s.sendConfig = JSON.stringify( sendConfig );
								await Scriptbill.createAlert("Deposit Successful");
								Scriptbill.s.confirmDocumentUpload = "TRUE";
								location.href 			= depositSuccess;
								} else {
									await Scriptbill.createAlert("Deposit Unsuccessful, Please send a mail to admin@scriptbank.ng with this transaction reference code to manually credit your account: " + ref );
									delete Scriptbill.s.sendConfig;
									location.href = depositUrl;
								}
							});													
						} else {
							if( this.seconds >= 300 ){
								let unverified 	= Scriptbill.l.unverified;
								
								if( ! unverified )
									unverified = [];
								
								else
									unverified 	= JSON.parse( Scriptbill.isJsonable( unverified ) ? JSON.parse( unverified ) : '[]' );
								
								unverified.push( ref );
								let deposit = await Scriptbill.createConfirm( "Deposit Unsuccessful. For some reasons we couldn't verify this transaction to create your deposit. Do you need more time? click ok if you need more time and cancel to cancel the transaction" );
								
								if( ! deposit ){
									clearInterval( refInterval );
									let urlte = new URL( depositSuccess );
									urlte.searchParams.set("message", "deposit transaction cancelled, you can try again using this reference key: " + ref );
									urlte.searchParams.set("error", "TRUE");
									setTimeout(()=>{
										location.href = urlte.href;
									}, 2000);
								} else {
									//restart the timer
									this.seconds = 1;
								}
							} else {
								this.innerText = "Confirming Deposit...";
							}
						}
						this.seconds++;
					} else {
						//console.log( "not verify data" );
						clearInterval( refInterval );
					}			
					
				}, 1000);
								
	
			} else if( sendConfig.paymentMethod == "bank" ){
				Scriptbill.alertDetails 		= false;
				try {
					
					if( sendConfig.withdrawBlock )
						Scriptbill.withdrawBlock = JSON.parse( JSON.stringify( sendConfig.withdrawBlock));
					
					Scriptbill.depositFiat( sendConfig.value, note.noteType ).then( async withdraw =>{			
						//console.log( withdraw, JSON.stringify( withdraw));
						//await Scriptbill.createAlert("check withdrawal");
						if( ! withdraw || ! withdraw.transBlock ) {
							await Scriptbill.createAlert("Deposit Transaction Unsuccessful");
							location.href = depositUrl;
							return;
						}
						
						let upload 		= cardType.parentElement.cloneNode(true);
						let head 		= cardType.parentElement.parentElement;
						cardType.parentElement.style.display 		= "none";
						//console.log( "upload: " + upload.children[0]  );
						agreeInfo.style.display 					= "none";
						alertInfo.querySelector("p.col-sm-5.opacity-7.text-sm-right.mb-0.mb-sm-3.accName").innerText = "Account Type";
						alertInfo.querySelector("p.col-sm-7.accName").innerText = withdraw.accountType
						alertInfo.querySelector("p.col-sm-5.opacity-7.text-sm-right.mb-0.mb-sm-3.accNumber").innerText = "Account Details";
						alertInfo.querySelector("p.col-sm-7.accNumber").innerHTML = withdraw.accountDetails.replaceAll(" ", "<br>");
						alertInfo.querySelector("p.col-sm-5.opacity-7.text-sm-right.mb-0.accBank").innerText = "Amount";
						let value = parseFloat( sendConfig.value );
						/* if( withdraw.accountType != test ){
							let curs = await Scriptbill.getData("","", 'https://openexchangerates.org/api/currencies.json');
							let exRates, rate;
							if( curs && Object.keys( curs ).includes( withdraw.accountType ) ) {
								exRates 	= await Scriptbill.getData('base', withdraw.accountType, 'https://api.exchangerate.host/latest?');
								rate 	= exRates[test];
								value 	= (value * rate).toFixed(2);
								
							} else {
								exRates = await Scriptbill.getData(['vs_currency', 'ids'], [test, 'bitcoin'], 'https://api.coingecko.com/api/v3/coins/markets');
								rate = exRates[0].current_price;
								value = (value * rate).toFixed(2);
							}
						} */
						alertInfo.querySelector("p.col-sm-7.mb-0.accBank").innerText = value;
						upload.removeChild( upload.children[1] );
						let child 		= document.createElement("input");
						child.setAttribute("type", "file");	
						child.setAttribute("class", "form-control");
						upload.children[0].innerHTML 	= "Upload a Verification Document";
						child.onchange = ()=>{			
							let files = child.files;
								
							const reader = new FileReader();
							 reader.readAsDataURL( files[0] );
							reader.onloadend = ()=>{
								let result 		= reader.result;
								//console.log("result: " + result);
								Scriptbill.s.confirmDocumentUpload =  result;
							}
						}
						upload.appendChild( child );
						let info 	= document.createElement("i");
						info.setAttribute("class", "text-3 text-muted");
						let transType = withdraw.transBlock.transType;
						if( transType == "BUYBOND" ){
							info.innerText = " Understand that By Clicking Confirm Deposit, You Will Be Buying A Bond File That Earns You Daily Interest of At Least";
							if( withdraw.budgetBlock && withdraw.budgetBlock.agreement && withdraw.budgetBlock.agreement.interestRate )
								info.innerText += " " + ( withdraw.budgetBlock.agreement.interestRate * 100 ) + "% For " + withdraw.budgetBlock.agreement.interestSpread;
							
							else 
								info.innerText += " 1% For 1 Month";
						} else {
							info.innerText = " Note That Your Note Value Will Only Be Transactable If The Withdrawer Confirms Your Deposit. However The Withdrawer's Credit Remains on your note till confirmed .";
						}
						upload.appendChild( info );
						head.insertBefore( upload, this );
						this.innerText 			= "Confirm Deposit";
						this.onclick 	= async (e)=>{
							e.preventDefault();
							
							if( ! Scriptbill.s.confirmDocumentUpload ){
								await Scriptbill.createAlert(" Upload a Confirmation Document To Continue!");
								return;
							}
							Scriptbill.details 		= JSON.parse( JSON.stringify( withdraw.transBlock ) );
							Scriptbill.details.transType = "AGREEMENTREQUEST";
							Scriptbill.details.transValue = 0;
							
							if( ! Scriptbill.details.agreement ){
								Scriptbill.details.agreement = await Scriptbill.createAgreement();
							}
							
							Scriptbill.details.agreement.depositDocument  = Scriptbill.s.confirmDocumentUpload;
							//await Scriptbill.createAlert( Scriptbill.details.agreement.agreeID );
							Scriptbill.details.recipient  = transType == "DEPOSIT" ? Scriptbill.details.agreement.agreeKey : Scriptbill.details.agreement.budgetID;
							//await Scriptbill.createAlert( Scriptbill.details.recipient );
							Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details ).then( transBlock =>{
								//console.log( "transBlock: " + transBlock );
								if( transBlock && transBlock.transType == "AGREEMENTREQUEST") {
									this.innerText = "Deposit Successful";
									setTimeout(()=>{
										Scriptbill.s.depositConfirmBlock = JSON.stringify( transBlock );
										sendConfig.block 	= withdraw.transBlock;
										sendConfig.agreeBlock = transBlock;
										Scriptbill.s.sendConfig = JSON.stringify( sendConfig );
										location.href 			= depositSuccess;
									}, 2000);
									
								} else {
									this.innerText 	= "Deposit Unsuccessful";
									let urlte = new URL( depositSuccess );
									urlte.searchParams.set("error", "TRUE");
									if( document.querySelector("#error") ){
										var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
										var keys 	= Object.keys( errors );
										keys 		= keys.reverse();
										document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
									}
									setTimeout(()=>{
										location.href = urlte.href;
									}, 7000);
								}
									
							});
							
						}
					});
				} catch(e){
					//console.log(e);
				}
			}
			//
		}
	}, 1000);
	
}

function checkIframeLoaded(iframe) {
	
	if( ! iframe || ! iframe.tagName || iframe.tagName != "IFRAME" ) return false;
	
    var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    // Check if loading is complete
    if (  iframeDoc.readyState  == 'complete' ) {
        //iframe.contentWindow.await Scriptbill.createAlert("Hello");
        iframe.contentWindow.onload = function(){
            iframe.style.display = "block";
        };        
        return true;
    } else {
		return false;
	}
}

function changeAccountName( el, alertInfo ){
	let data 		= el.getAttribute("data-" + el.value);
	//console.log("data: " + data );
			
	if( data ){
		data 		= JSON.parse( data );
				
		if( data.accountName || data.holderName )
			alertInfo.querySelector("p.col-sm-7.accName").innerText 	= data.accountName || data.holderName;
				
		if( data.accountNumber || data.cardNumber ){
			let number 			= ( data.accountNumber || data.cardNumber ).toString();
			alertInfo.querySelector("p.col-sm-7.accNumber").innerText 	= "XXXXXXXX-" + number.slice( ( number.length - 4 ), number.length );
		}
				
		if( data.bankName ){
			alertInfo.querySelector("p.col-sm-7.accName").innerText 	= data.bankName;
					
		} else if( data.type ){
			let head 		= alertInfo.querySelector("p.col-sm-7.accNumber").parentElement;
			if( data.type == "credit" || data.type == "credit"  )
				head.querySelector("p.col-sm-5.opacity-7.text-sm-right.mb-0.accBank").innerText = "Card Type";
			
			alertInfo.querySelector("p.col-sm-7.accBank").innerText 	= data.type;
		}
	}
}

if( location.href.includes( depositSuccess ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	if( ! Scriptbill.s.sendConfig )
		location.href = depositUrl;
	
	if( ! Scriptbill.s.confirmDocumentUpload )
		location.href 	= depositConfirm;
	
	let sendConfig 		= JSON.parse( Scriptbill.s.sendConfig );
	let note 			= JSON.parse( Scriptbill.s.currentNote );
	
	delete Scriptbill.s.confirmDocumentUpload;
	delete Scriptbill.s.sendConfig;
	
	//getting the elements.
	let successel 		= document.getElementById("transaction-success");
	let deposit 		= successel.querySelector("button.btn.btn-primary.btn-block.rerunButton");
	let print 	 		= successel.querySelector("button.btn.btn-link.btn-block.printButton");
	let transVal 		= successel.querySelector("span.text-4.font-weight-500.transValue");
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( result =>{
		let type 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD") );
		let symbol 		= type;
		
		if( result[type] ){
			symbol 		= result[type].symbol;
		}
		
		transVal.innerHTML 	= symbol + ' ' + sendConfig.value;
		
	});
	
	deposit.onclick = ()=>{
		location.href	= depositUrl;
	}
	
	print.onclick = ()=>{
		let config = {"blockID": sendConfig.block.blockID,"type":"DEPOSIT", "agreeID": sendConfig.agreeBlock.blockID, server: note.noteServer };
		generateQRCode( JSON.stringify( config ), sendConfig.block.blockID );
	}
}

if( location.href.includes( withdrawUrl ) ) {
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href 	= loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	//getting the variables.
	let withdrawel 	= document.getElementById("withdrawForm");
	let amount 		= document.getElementById("youSend");
	let balance 	= withdrawel.querySelector("h3.text-10.text-white.font-weight-400.balance");
	let total	 	= withdrawel.querySelector("span.text-3.float-right.totalAmount");
	let trans	 	= withdrawel.querySelector("span.float-right.d-flex.align-items-center.transFee");
	let transBtn 	= withdrawel.querySelector("button.btn.btn-primary.btn-block.continueBtn");
	let fullAmount	= withdrawel.querySelector("a.btn.btn-outline-light.btn-sm.shadow-none.text-uppercase.rounded-pill.text-1.fullAmount");
	let accounts 	= withdrawel.querySelector("#withdrawto");
	let sym = document.getElementsByClassName("input-group-prepend");
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async currencies =>{
		let accountData 		= await getAccountData();
		let accID 				= note.noteAddress;
		
		if( ! accountData[accID] )
			location.href = profileUrl;
		
		let bankAcc 			=  accountData[accID].savedAccounts;
		let transFees 			= 0.01;
		
		if( ! bankAcc &&  ! note.motherKey ){
			await Scriptbill.createAlert(" set a Withdrawal Account for this note First before Withdrawing!!!");
			location.href = bankUrl;
			return;
		}
		if( note.motherKey ){
			bankAcc = [ { bankName: "Scriptbank", accountNumber: note.motherKey } ];
		} else if( typeof accountData[accID].savedAccounts == "string" && Scriptbill.isJsonable( accountData[accID].savedAccounts ) ){
		
			bankAcc 			= JSON.parse( accountData[accID].savedAccounts );
		}
		
		let x, bank;
		accounts.innerHTML 		= "";
		let type 				= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD") );
		let symbol 				= type;
		
		if( currencies[ type ] ){
			symbol 				= currencies[type].symbol;
			sym[0].innerHTML 		= '<span class="input-group-text symbol">'+symbol+'</span>';
		}
		
		balance.innerHTML 		= symbol + ' ' + formatCurrency( note.noteValue.toFixed(2) );
		
		for( x = 0; x < bankAcc.length; x++ ){
			bank 				= bankAcc[x];
			accounts.innerHTML	+= '<option value="'+ btoa( JSON.stringify( bank ) ) +'" data-toggle="tooltip" data-original-title="'+bank.accountNumber+'">'+ bank.bankName + ' - ' + bank.accountNumber.slice(0,8) + '</option>';	
		}
		
		fullAmount.onclick 		= async (e)=>{
			e.preventDefault();
			
			if( ! accounts.value ){
				await Scriptbill.createAlert(" set a Withdrawal Account");
				return;
			}
			else {
				try {
					bank = JSON.parse( atob( accounts.value ));
					if( ! bank.approved ){
						await Scriptbill.createAlert( "Account not approved, you need to link your account with Scriptbank to enjoy automatic withdraw. Visit your bank website to get an online access on this browser to begin the verification process" );
					}
				} catch(e){
					console.error(e);
				}
			}
			
			
			this.innerText 	= " Please Wait...";
			if( note.noteValue <= 0 ){
				await Scriptbill.createAlert("Note Value is Zero or Negative");
				return;
			}
			
			if( ! accountData.loanValue )
				accountData.loanValue = 0;
			
			let value = note.noteValue - accountData.loanValue;

			if( value <= 0 ){
				await Scriptbill.createAlert(" You have outstanding loan in your account,  make a purchase instead of withdrawing ");
				return;
			}
				let config 		= {};
				config.bank 	= atob( accounts.value );
				config.total 	= value;
				config.fees 	= value * transFees;				
				config.amount 	= config.total - config.fees;
				Scriptbill.s.withdrawConfig 	= JSON.stringify( config );
				
				
			 let isWithdrawable = await Scriptbill.getData(['value','checkWithdrawal', 'walletID'],[value, 'true', note.walletID], SERVER);

			if( ! isWithdrawable || ! isWithdrawable.amount || isWithdrawable.amount < value ){
				 let withDraw = await Scriptbill.createConfirm("Automatic Withdrawal not possible at the moment. Do you want to continue and wait for a deposit request in the network?");

				if( withDraw ){
					location.href 	= withdrawConfirm;
				} else {
					location.reload();
				}
			}else {
				setTimeout( ()=>{
					location.href 	= withdrawConfirm;
				}, 2000 );		
			}	
		}
		total.innerText 		= "";
		trans.innerText 		= "";
		amount.value 			= "";
		amount.type 			= "number";
		total.innerText 		= symbol + ' 0';
		trans.innerText			= symbol + ' 0';
		amount.oninput 			= function(){
			let value 			= this.value;
			//console.log(value, typeof value );
			let fees 			= value * transFees;
			let rem 			= value - fees;
			total.innerText 	= symbol + ' ' + parseFloat( rem ).toFixed(2);
			trans.innerText		= symbol + ' ' + parseFloat(fees).toFixed(2);
		}
		
		transBtn.onclick 		= async function(e){
			e.preventDefault();
			if( amount.value == "" ){
				await Scriptbill.createAlert( " Set An Amount First" );
				return;
			}
			
			if( accounts.value == "" ){
				await Scriptbill.createAlert(" Select an Account First");
				return;
			}
			
			if( amount.value.match(/[a-z]/g) ){
				await Scriptbill.createAlert( "enter a valid withdrawal amount" );
				return;
			}
			
			if( note.noteValue < amount.value ){
				await Scriptbill.createAlert("Balance too Low for Withdrawal,  Withdraw a lower Amount");
				return;
			}		
			
			
			

			let valueCheck  = amount.value + accountData.loanValue;

			if( note.noteValue < valueCheck ){
				await Scriptbill.createAlert("Balance too Low for Withdrawal,  Withdraw a lower Amount");
				return;
			}
			
			if( note.motherKey ) await Scriptbill.createAlert( "Withdrawal goes only to this address: " + note.motherKey );
			
			let value 			= amount.value;
			let fees 			= value * transFees;
			let rem 			= value - fees;
			let block 			= await Scriptbill.getTransBlock(1, {blockID: note.blockID});
			
			if( ! block ){
				await Scriptbill.createAlert("Logged In Note Seems to Be Invalid!!!");
			} else {
				//checking if the note is a bond note so that we check the agreeement i the note could withdraw a value.
				if( note.noteType.lastIndexOf("BND") == 3 ){
					let agree = block.agreements;
					for( agreeID in agree ){
						agree = agree[agreeID];
						if( agree.agreeType != "BOND" ) continue;
						
						if( agree.value == note.noteValue && agree.ExecTime > Scriptbill.currentTime()  ){
							await Scriptbill.createAlert("Sorry, Can't Withdraw The Principal Of a Bond Note Until Expired.");
							return false;
						} else if( agree.value == note.noteValue && note.rankPref == "businessManager" ){
							await Scriptbill.createAlert("Sorry, Can't Withdraw The Principal Of as a Business Manager. You Can Only Withdraw Interest.");
							return false;
						} else if( agree.value < note.noteValue && (note.noteValue -amount.value ) < agree.value ){
							await Scriptbill.createAlert( " Amount Larger Than Interest!" );
							return false;
						}
					}
				}
				this.innerText		= "Paying Fees...";
				let exNote		= await Scriptbill.getCurrentExchangeNote( note.noteType );
				
				Scriptbill.sendConfig.recipients.push( exNote.exchangeID );
				Scriptbill.sendConfig.amount 	= fees;
				Scriptbill.sendConfig.note 		= "Exchange Market Fees";
				Scriptbill.sendMoney().then( async block =>{
					console.log( block, "that block" );
					//alert("Check that block");
					if( block && block[0] && block[0].transType == "RECIEVE" ){
						let config 	  = {};
						config.bank   = accounts.value;
						config.amount = rem;
						config.fees   = fees;
						config.total   = amount.value;
						let isWithdrawable = await Scriptbill.getData(['value','checkWithdrawal', 'walletID'],[rem, 'true', note.walletID], SERVER);
			
						if( ! isWithdrawable || ! isWithdrawable.amount || isWithdrawable.amount < rem ){
							 let withDraw = await Scriptbill.createConfirm("Automatic Withdrawal not possible at the moment. Do you want to continue and wait for a deposit request in the network?");

							if( withDraw ){
								Scriptbill.s.withdrawConfig 	= JSON.stringify( config );
								location.href = withdrawConfirm;
							} else {
								location.reload();
							}
						} else {
							setTimeout( ()=>{
								Scriptbill.s.withdrawConfig 	= JSON.stringify( config );
								location.href = withdrawConfirm;
							}, 2000 );		
						}						
					} else {
						let error = JSON.parse( Scriptbill.s.eMessages );
						let keys 	= Object.keys( error );
						keys 		= keys.reverse();
						//document.getElementById("error").innerHTML = error[keys[0]];
						await Scriptbill.createAlert("Couldn't Withdraw Fees,  Try Again: <br>"+ error[keys[0]]);
						location.reload();
					}
				});
			}		
		}
		
	});
}

if( location.href.includes( withdrawConfirm ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href 		= loginUrl;
	
	if( ! Scriptbill.s.withdrawConfig )
		location.href 		= withdrawUrl;
	
	let config 		= JSON.parse( Scriptbill.s.withdrawConfig );
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	//getting elements
	let confirmel 	= document.getElementById("confirm");
	let bankAcc 	= confirmel.querySelector("span.font-weight-500.bankAcc");
	let total 		= confirmel.querySelector("span.text-3.float-right.total");
	let fees 		= confirmel.querySelector("span.float-right.d-flex.align-items-center.transFee");
	let remaining	= confirmel.querySelector("span.text-3.float-right.remaining");
	let button 		= confirmel.querySelector("button.btn.btn-primary.btn-block.withdrawBtn");
	let testType 	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	if( config.bank ){
		console.log( "bank: ", typeof config.bank, JSON.stringify( config.bank ));
		config.bank 			= JSON.parse( Scriptbill.Base64.decode( config.bank ) );
		bankAcc.innerHTML 		= config.bank.bankName   + '  XXXX-XXXX-XXXX-' + config.bank.accountNumber.slice( config.bank.accountNumber.length - 4, config.bank.accountNumber.length )
	}
	if( config.total ){
		remaining.innerHTML 		= config.total + ' ' + testType;
	}
	
	if( config.fees ){
		fees.innerHTML 			= config.fees + ' ' + testType;
	}
	
	if( config.amount ){
		total.innerHTML		= config.amount + ' ' + testType;
	}
	
	button.onclick 				= async function(e){
		e.preventDefault();
		this.innerText 			= "Withdrawing Fees...";
		if( note.motherKey ){
			Scriptbill.sendConfig.recipients.push( note.motherKey );
			Scriptbill.sendConfig.amount 	= config.amount;
			Scriptbill.sendMoney().then( block =>{ 
				if( block && block.transType == "SEND" ){
					config.block = block;
					Scriptbill.s.withdrawConfig = JSON.stringify( config );
					location.href 	= withdrawSuccess;
				} else {
					let urle 		= new URL( withdrawSuccess );
					urle.searchParams.set( "error", "true" );
					location.href 	= urle.href;
				}
			});
		} else {
			Scriptbill.withdrawAccount 	= config.bank;
			Scriptbill.withdrawCredit( config.amount ).then( async block =>{
				Scriptbill.s.withdrawProcessing = 'TRUE';
				if( block.transType == "WITHDRAW" ){
					this.innerText 	= "Credit Withdrawn";
					config.block = block;
					Scriptbill.s.withdrawConfig = JSON.stringify( config );
					let stance 			= {};
					
					if( note.withdrawalStance && typeof note.withdrawalStance == "object" )
						stance 			= note.withdrawalStance;
					
					if( ( config.bank.approved || stance.amount || stance.rate ) && ! block.isExchangeMarketMining ){
						this.innerText = "Running Automatic Withdrawal...";			
						if( Object.values( bankCodes ).includes( config.bank.bankName ) ){
							let bankcode = Object.keys( bankCodes )[ Object.values( bankCodes ).indexOf( config.bank.bankName ) ];
							let sendReq 	= {
								bank_code : bankcode.toString(),
								account_number : config.bank.accountNumber
							};
							
							let request = await Scriptbill.getData(['account_lookup', 'account_data', 'user_agent'], ['true', Scriptbill.Base64.encode( JSON.stringify( sendReq ) ), navigator.userAgent], SERVER);
							
							if( request && request.data && Object.keys( request.data ).length > 0 ){
								let data = JSON.parse( JSON.stringify( request ));
								let account_name = data.data.account_name;
								
								let tried = await Scriptbill.createConfirm("Please Confirm the account name of your account based on our lookup: " + account_name + " Press ok to continue the transfer transaction");
								
								if( tried ){
									let reference = await Scriptbill.generateKey(10);
									let merchantID = "";
									reference 		= merchantID + "_" + reference;
									let transfer_obj = {};
									transfer_obj["transaction_reference"] = reference;
									if( ! config.bank.approved && stance.amount && config.amount > stance.amount )
										config.amount = stance.amount;
									
									if( stance.rate ){
										let amount = parseFloat( note.noteValue ) * parseFloat( stance.rate );
										
										if( config.amount > amount )
											config.amount 	= amount;
									}
									transfer_obj["amount"] = config.amount;
									transfer_obj["bank_code"] = bankcode.toString();
									transfer_obj["account_number"] = config.bank.accountNumber;
									transfer_obj["account_name"] = account_name;
									transfer_obj["currency_id"] = "NGN";
									transfer_obj["remark"] = "Transfer From Scriptbank Account Via Note Address: " + note.noteAddress;
									Scriptbill.string = JSON.stringify( transfer_obj );
									request 	= await Scriptbill.getData(['transfer', 'object', 'integrity', 'nonce', 'user_agent'], ['true', Scriptbill.Base64.encode( Scriptbill.string ), CryptoJS.MD5( Scriptbill.string ).toString( CryptoJS.enc.Hex ), data.nonce, navigator.userAgent ], Scriptbill.getDefaultServer());
									
									//refed = request.status >= 200 && request.status < 300;
									
									if( request && request.data && Object.keys( request.data ).length > 0 ){
										data = JSON.parse( JSON.stringify( request ));
										this.innerText = "Transfer Successful";
										await Scriptbill.createAlert( "Fund Of this Amount: " + config.amount + " Was Transfered To Bank Account, You Should Wait A Little Minute to Recieve Funds To Bank Account: Your Transaction Reference: " + data.data.transaction_reference );
										Scriptbill.s.automaticData = JSON.stringify( data );
										location.href 	= withdrawSuccess;
									} else {
										let query = {
											"transaction_reference": reference
										};
										let intervel = setInterval( async ()=>{
											
											Scriptbill.string = JSON.stringify( query );
											request 	= await Scriptbill.getData(['requery', 'object', 'integrity', 'nonce', 'user_agent'], ['true', Scriptbill.Base64.encode( Scriptbill.string ), CryptoJS.MD5( Scriptbill.string ).toString( CryptoJS.enc.Hex ), data.nonce, navigator.userAgent ], Scriptbill.getDefaultServer());
											
											if( ! this.checkSec )
												this.checkSec = 0;
											
											this.checkSec++;
											
											if( request && request.data && Object.keys( request.data ).length > 0 ){
												clearInterval( intervel );
												data = JSON.parse( JSON.stringify( request ));
												this.innerText = "Transfer Successful";
												await Scriptbill.createAlert( "Fund Transfered To Bank Account, You Should Wait A Little Minute to Recieve Funds To Bank Account: Your Transaction Reference: " + data.data.transaction_reference );
												Scriptbill.s.automaticData = JSON.stringify( data );
												location.href 	= withdrawSuccess;
											} else if( this.checkSec == 300 ){
												await Scriptbill.createAlert( "We Couldn't Verify The Transfer, You can contact us To Manually Verify This is need be with this transaction reference: " + reference );
												clearInterval( intervel );
												Scriptbill.s.automaticData = JSON.stringify( data );
												location.href 	= withdrawSuccess;
											}
										}, 1000);									
									}
								} else {
									location.href = dashboardUrl;
								}
							}
						} else {
							this.innerText = "Can't Automatically Withdraw...";
							await Scriptbill.createAlert("Your Bank Wasn't Found Among Banks That We are Liable to Transfer to Automatically. You Can Solve This By Entering the Exact Bank Name or Seeking Assistant From Scriptbank" );
						}
					} else {
					
						location.href 	= withdrawSuccess;
					}
				} else {
					this.innerText 	= "Withdrawal Error!";
					if( document.querySelector("#error") ){
						var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
						var keys 	= Object.keys( errors );
						keys 		= keys.reverse();
						document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
					}
					setTimeout( function(){
						let urle 		= new URL( withdrawSuccess );
						urle.searchParams.set( "error", "true" );
						location.href 	= urle.href;
					},7000 );
					
				}
			});		
		}
	}
}

if( location.href.includes( withdrawSuccess ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href 		= loginUrl;
	
	if( ! Scriptbill.s.withdrawConfig )
		location.href 		= withdrawUrl;
	
	if( ! Scriptbill.s.withdrawProcessing )
		location.href 		= withdrawUrl;
	
	let note 				= JSON.parse( Scriptbill.s.currentNote );
	let config 				= JSON.parse( Scriptbill.s.withdrawConfig );
	
	delete Scriptbill.s.withdrawProcessing;	
	delete Scriptbill.s.withdrawConfig;
	
	//get error
	let urle 		= new URL( location.href );
	let error 		= urle.searchParams.get("error");
	let testType 	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	//getting the elements.
	let success 	= document.getElementById("success");
	let icon 		= success.querySelector("i.fas.fa-check-circle.icon");
	let successTxt	= success.querySelector("p.text-center.text-success.text-8.line-height-07.success");
	let status		= success.querySelector("p.text-center.text-4.status");
	let statusTxt	= success.querySelector("p.text-center.text-3.mb-4.successText");
	let amount		= success.querySelector("span.text-4.font-weight-500.amount");
	let button		= success.querySelector("button.btn.btn-primary.btn-block.withdraw");
	let print		= success.querySelector("button.btn.btn-link.btn-block.print");
	let classes, head;
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		if( error ){
			classes 	= icon.getAttribute("class");
			classes 	= classes.replace("fa-check-circle", "fa-times-circle");
			icon.setAttribute("class", classes);
			head 		= icon.parentElement;
			classes		= head.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			head.setAttribute("class", classes);
			successTxt.innerHTML 	= "Error";
			classes		= successTxt.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			status.innerHTML = "Transaction Incomplete";
			statusTxt.innerHTML = 'For Some Reason we Couldn\'t Successfully Process Your Withdraw Transaction. You Can  Try Again or <a href="https://t.me/companymatrix">Contact Scriptbank</a> for Assistance.';
			print.style.display = "none";
		} else {
			let symbol = testType;
			
			if( result[ testType ] ){
				symbol 		= result[ testType ].symbol;
			}
			amount.innerHTML 	= symbol + ' ' + config.amount;
		}
		
		print.onclick = function(){
			generateQRCode(JSON.stringify({"blockID": config.block.blockID, "type": "WITHDRAW", "server": note.noteServer}), config.block.blockID );
		}
		
		button.onclick = function(){
			location.href = withdrawUrl;
		}
	});
	
	
}

if( location.href.includes( sendUrl ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let config	 	= document.getElementById("agreeConfig");
		let periodic	= document.getElementById("periodic");
		let somer	 		= document.getElementById("somer");
		let enddate	 		= document.getElementById("enddate");
		let sendRow 	= document.getElementById("sendMoney");
		let recipient	= document.getElementById("emailID");
		let send		= document.getElementById("youSend");
		let recieve		= document.getElementById("recipientGets");
		let sendCur		= document.getElementById("youSendCurrency");		
		let repCur		= document.getElementById("recipientCurrency");		
		let inner		= document.getElementsByClassName("input-group-append");		
		let symbol 		= sendRow.querySelector("span.input-group-text.symbol");
		let repSymbol	= sendRow.querySelector("span.input-group-text.repSymbol");
		let exchange	= sendRow.querySelector("span.font-weight-500.exchange");
		let fees		= sendRow.querySelector("span.text-3.float-right.fees");
		let total		= sendRow.querySelector("span.text-3.float-right.total");
		let button		= sendRow.querySelector("button.btn.btn-primary.btn-block.continue");
		let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 	= test;
		
				
		if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		repSymbol.innerHTML = symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}
		
		if( repCur.querySelector("option[value='"+test+"']") ){
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
			repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}
		
		let toPay 	= 0.00;
		
		send.value = "";
		recieve.value = "";
		fees.innerHTML = "";
		total.innerHTML = "";
		exchange.innerHTML = "";
		
		config.onchange 	= function(){
			if( this.value == 'returnPeriodic' ){
				periodic.parentElement.style.display = "block";
				somer.parentElement.style.display = "none";
			} else if( this.value == 'returnSome' ){
				periodic.parentElement.style.display = "none";
				somer.parentElement.style.display = "block";
			} else {
				periodic.parentElement.style.display = "none";
				somer.parentElement.style.display = "none";
			}
		}
		
		repCur.onchange = async function(){
			if( result[ this.value ] ){
				symbole 	= result[ this.value ].symbol;
			}
			let value 		= send.value;
			if( this.value != test ){			
						
				repSymbol.innerHTML = symbole;
				let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
				
				if( rates ){
					rates = rates.rates;
				}				
				
				if( rates && rates[ this.value ] ){
					let rate = 1;
					if( sendCur.value != "USD" ){
						rate 		= 1/parseFloat(rates[sendCur.value]);
					} 
					if( this.value != "USD" ){
						rate 		= rate / ( 1/parseFloat(rates[this.value]) );
					}
					exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
					toPay 			= 0.05;
					Scriptbill.s.toPay = toPay;
					Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
					
				} else {
					exchange.innerHTML = "exchange rate not available";
				}
			} else {
				repSymbol.innerHTML = symbole;
				Scriptbill.s.toPay = 0.00;
				toPay = 0.00;
				exchange.innerHTML = "";
			}
			
			fees.innerHTML 	= ( value * toPay ).toFixed(4) + " " + test;
		}
		
		send.oninput   = function(){
			let rates = 1;
			if( repCur.value != sendCur.value ){
				if( Scriptbill.s.rates )
					rates 	= parseFloat(Scriptbill.s.rates);
			}
			let value = this.value.replaceAll(',','').split('.');		
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 		= parseFloat( this.value.replaceAll(',','') );
			recieve.value = formatCurrency( this.value * rates );
			total.innerHTML 	= formatCurrency( this.value ) + " " + test;
			fees.innerHTML 	= formatCurrency( ( this.value * toPay ) ) + " " + test;
			this.value = formatCurrency( this.value );
			//this.value 		= formatCurrency( this.value );
		}
		
		recieve.oninput = function(){
			let rates = 1;
			if( repCur.value != sendCur.value ){
				if( Scriptbill.s.rates )
					rates 	= Scriptbill.s.rates * 1;
			}
			let value = this.value.replaceAll(',','').split('.');			
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			
			this.value 		= parseFloat( this.value.replaceAll(',','') );
			send.value = formatCurrency( ( this.value / rates ));
			total.innerHTML 	= send.value + " " + test;
			fees.innerHTML 	= formatCurrency( ( parseFloat( send.value.replaceAll(',','') ) * toPay ) ) + " " + test;
			this.value 		= formatCurrency( this.value );
			//this.value 		= formatCurrency( this.value );
		}
		
		button.onclick 		= async function(e){
			e.preventDefault();
			let sendConfig = {};
			
			if( periodic.value ){
				sendConfig.periodicTime 	= periodic.value;
			}
			
			if( send.value ){
				sendConfig.value 	= parseFloat( send.value.replaceAll(',',''));
				sendConfig.fees 	= parseFloat( send.value.replaceAll(',','')) * toPay;
			} else {
				await Scriptbill.createAlert("send value can't be empty!");
				return;
			}			
			
			if( config.value ){
				sendConfig.agreeConfigType = config.value;
			}	
				
			if( somer.value ){
				sendConfig.returnAmount 	= somer.value;
			}
				
			if( enddate.value ){
				sendConfig.agreementExpiry 	= enddate.value;
			}
			
			if( recieve.value ){
				sendConfig.repValue = parseFloat( recieve.value.replaceAll(',','.'));
			}
			
			if( sendCur.value ){
				sendConfig.currency 	= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
			if( repCur.value ){
				sendConfig.repCurrency 	= repCur.value;
			}
			
			if( recipient.value ){
				sendConfig.recipient 	= recipient.value;
				
				if( recipient.value.includes("@") )
					sendConfig.recipientType 	= "email";
				
				else if( recipient.value.lastIndexOf("+") == 0 ){
					sendConfig.recipientType = "phone";
				}
				
				else 
					sendConfig.recipientType 	= "scriptbill";
			} else {
				await Scriptbill.createAlert(" enter a recipient!");
				return;
			}
			
			Scriptbill.s.sendMoneyConfig 	= JSON.stringify( sendConfig );
			location.href = sendConfirm;
		}
		
		sendCur.setAttribute("disabled", "disabled");		
		
	});
	$(function() {
		 'use strict';
		  // Birth Date
		  $('#enddate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			minDate: moment().add(7, 'days'),
			}, function(chosen_date) {
		  $('#enddate').val(chosen_date.format('MM-DD-YYYY'));
		  });
	});
}

if( location.href.includes( requestUrl ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let enddate	 	= document.getElementById("paymentDue");
		let recipient	= document.getElementById("emailID");
		let desc		= document.getElementById("description");
		let amount		= document.getElementById("amount");			
		let sendCur		= document.getElementById("recipientCurrency");			
		let inner		= document.getElementsByClassName("input-group-append");		
		let symbol 		= document.querySelector("#symbol");
		let button		= document.querySelector("#continue");
		let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 	= test;
		
		let tests 		= Object.keys( result );
		let options		= sendCur.querySelectorAll("option"), index;
		for( let x = 0; x < options.length; x++ ){
			if( tests.indexOf( options[x].innerText ) < 0 ) continue;
			index 				= tests.indexOf( options[x].innerText );
			options[x].value 	= tests[index];
		}
				
		 if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){			
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}		
		
		
		let toPay 	= 0.00;
		
		desc.value = "";	
		amount.value = "";	
		
		amount.oninput = function(){
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value = formatCurrency( parseFloat( this.value.replaceAll(',','') ) );
		}
			
		
		button.onclick 		= async function(e){
			e.preventDefault();
			 let sendConfig = {};
			
							
			if( enddate.value ){
				sendConfig.agreementExpiry 	= enddate.value;
			}
			
			if( desc.value ){
				sendConfig.description = desc.value;
			}
			
			if( sendCur.value ){
				sendConfig.currency 	= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
			if( amount.value )
				sendConfig.value = parseFloat( amount.value );
			
			if( recipient.value ){
				sendConfig.recipient 	= recipient.value;
				
				if( recipient.value.includes("@") )
					sendConfig.recipientType 	= "email";
				
				else if( recipient.value.lastIndexOf("+") == 0 ){
					sendConfig.recipientType = "phone";
				}
				
				else 
					sendConfig.recipientType 	= "scriptbill";
			} else {
				await Scriptbill.createAlert(" enter a recipient!");
				return;
			}
			
			Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
			location.href = requestConfirm;
		} 
		
		//sendCur.setAttribute("disabled", "disabled");		
		
	});
	$(function() {
	 'use strict';
	  // Payment due by
	  $('#paymentDue').daterangepicker({
		singleDatePicker: true,
		minDate: moment(),
		autoUpdateInput: false,
		}, function(chosen_date) {
	  $('#paymentDue').val(chosen_date.format('MM-DD-YYYY'));
	  });
	  }); 
}


if( location.href.includes( requestConfirm )){
	
	if( ! Scriptbill.s.requestMoneyConfig )
		location.href = requestUrl;
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let config 		= JSON.parse( Scriptbill.s.requestMoneyConfig  );
	let recipient 	= document.getElementById("recipient");
	let recipientID	= document.getElementById("recipientID");
	let currency 	= document.getElementById("currency");
	let date 		= document.getElementById("dateID");
	let desc 		= document.getElementById("description");
	let amount 		= document.getElementById("amount");
	let button 		= document.getElementById("requestMoney");
	//console.log( config.description );
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		recipient.innerText 	= config.recipient;
		recipientID.innerText 	= config.recipient;
		let cur 				= result[ config.currency ].name;
		let value 				= ( config.value ? config.value : 0.00 );
		currency.innerText 		= cur;
		date.innerText 			= config.agreementExpiry;
		amount.innerText 		=  value + " " +config.currency;
		desc.innerText			= config.description;
		
		button.onclick 			= async function(e){
			e.preventDefault();
			this.innerText 		= "Requesting Money";
			Scriptbill.s.requestProcessing = "TRUE";
			Scriptbill.details 				= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));			
			Scriptbill.details.transType 	= "CREDIT";
			Scriptbill.details.transValue 	= value;
			Scriptbill.string 				= config.recipient;
			Scriptbill.details.recipient 	= Scriptbill.hashed();
			let date 						= new Date( config.agreementExpiry );
			Scriptbill.details.agreement 	= await Scriptbill.createAgreement();
			Scriptbill.details.agreement.ExecTime = date.getTime();
			Scriptbill.details.agreement.value = value;
			Scriptbill.details.note 		= config.description;
			Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details ).then( block =>{
				if( block && block.transType == "CREDIT" ){
					config.block 	= JSON.parse( JSON.stringify( block ));
					Scriptbill.s.requestMoneyConfig = JSON.stringify( config );
					location.href 	= requestSuccess;
				} else {
					if( document.querySelector("#error") ){
						var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
						var keys 	= Object.keys( errors );
						keys 		= keys.reverse();
						document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
					}
					
					setTimeout(function(){
						let url 	= new URL( requestSuccess );
						url.searchParams.set( "error", "true");
						location.href = url.href;
					},10000);
					
				}
			});
			
		}
	});	
}


if( location.href.includes( requestSuccess ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ){
		location.href = loginUrl;
	}
	
	if( ! Scriptbill.s.requestMoneyConfig ){
		location.href = requestUrl;
	}
	
	if( ! Scriptbill.s.requestProcessing ){
		location.href = requestConfirm;
	}
	
	let urle = new URL(location.href);
	let webSale = urle.searchParams.get("sellWeb");
	let ads = urle.searchParams.get("ads");
	let stockSale = urle.searchParams.get("stockSale");
	let addItem = urle.searchParams.get("addItem");
	let error 	= urle.searchParams.get("error");
	let message		= urle.searchParams.get("message");
	
	//getting the data
	let note = JSON.parse( Scriptbill.s.currentNote );
	let config = JSON.parse( Scriptbill.s.requestMoneyConfig );

	//deleting the money config.
	delete Scriptbill.s.requestMoneyConfig;
	
	
	
	//getting the success elements.
	let success 		= document.getElementById("success");
	let icon 			= success.querySelector("i.fas.fa-check-circle.icon");
	let successTxt		= success.querySelector("p.text-center.text-success.text-8.line-height-07.success");
	let status			= success.querySelector("p.text-center.text-4.details");
	let statusTxt		= success.querySelector("p.text-center.text-3.mb-4.successText");
	let amount			= success.querySelector("span.text-4.font-weight-500.amount");
	let recipient		= success.querySelector("span.font-weight-500.recipient");
	let button			= success.querySelector("button.btn.btn-primary.btn-block.repeat");
	let print			= success.querySelector("button.btn.btn-link.btn-block.print");
	let testType    	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	if( config.storeName )
		button.innerText 	= "Sell Another Product";
	
	let classes, head;
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		if( error ){
			classes 	= icon.getAttribute("class");
			classes 	= classes.replace("fa-check-circle", "fa-times-circle");
			icon.setAttribute("class", classes);
			head 		= icon.parentElement;
			classes		= head.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			head.setAttribute("class", classes);
			successTxt.innerHTML 	= "Error";
			classes		= successTxt.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			status.innerHTML = "Transaction Incomplete";
			statusTxt.innerHTML = 'For Some Reason we Couldn\'t Successfully Process Your Request Transaction. You Can Try Again or <a href="https://scriptbank.ng/contact-us">Contact Scriptbank</a> for Assistance.';
			print.style.display = "none";
		} else {
			let symbol = testType;
			
			if( result[ testType ] ){
				symbol 		= result[ testType ].symbol;
			}
			
			let html 	= statusTxt.innerHTML;
			statusTxt.innerHTML	= "";
			
			if( webSale ){
				statusTxt.innerHTML = `You've Succesfully Sold <span class="script-text-green">${config.storeUrl}</span>, at ${formatCurrency( config.value )} ${config.currency}. You have ${config.stake} left on this website. Funds will be coming from any prospective users of Scriptbills Cryptonote. Scriptbank will also assist in the sale. You should note that website purchasers will be able to manage your business through the decentralized budget created by this business.`;
				
				if( config.stake )
					button.innerText 	= "Sell Website Again";
				
				else {
					button.setAttribute("disabled", "disabled");
					button.innerText 	= "Can't Sell Website";
				}
				
				button.onclick = function(){
					location.href = sellWebsite;
				}
			} else if(ads){
				statusTxt.innerHTML = `Ads had been successfully created with a budget amount of ${formatCurrency( config.value )}. Your ads will have ${ config.viewers } of viewers, who will be paid ${config.viewersShare} percent from the budget, and ${config.clickers} of clickers who will also share ${config.clickersShare} from the budget. You will also have ${config.publishers} possible publishers from this advert who will share ${config.publishersShare} from the budget`;
				if( note.noteValue > 0 || ( config.block && config.block.productNote && config.block.productNote.exchangeValue > 0 ) )
					button.innerText 	= "Buy Ads Again";
				
				else {
					button.setAttribute("disabled", "disabled");
					button.innerText 	= "Can't buy ads";
				}
				
				button.onclick = function(){
					location.href = createAds;
				}
			} else if( stockSale ){
				statusTxt.innerHTML = `You have successfully sold ${formatCurrency( parseFloat( config.recipientValue / config.value ) )} number of stock from your stock. You should be able to get funds into this note with address of ${ note.motherKey } as soon as a prospect purchase the stock. Value to be expected currently is ${formatCurrency( config.recipientValue )} ${config.currency}, and may depend on the time the stock ends up being purchased.`;
				if( note.noteValue > 0 )
					button.innerText 	= "Sell Stocks Again";
				
				else {
					button.setAttribute("disabled", "disabled");
					button.innerText 	= "Can't sell stocks";
				}
				button.onclick = function(){
					location.href = sellStocks;
				}
			} else if(addItem){
				statusTxt.innerHTML = `Budget Item has been successfully added to your budget with ID of ${config.recipient} and would be executed automatically in ${config.budgetExecutionTime}.`;
				button.innerText 		= "Add More Items";
				button.onclick = function(){
					location.href = createItem;
				}
			} else {
				statusTxt.innerHTML = html;
				amount 		= statusTxt.querySelector(".amount");
				recipient 	= statusTxt.querySelector(".recipient");//recipient
				amount.innerText = testType + " " + config.value;
				
				if( config.storeName ){
					recipient.innerText = config.storeName;
					statusTxt.innerHTML = statusTxt.innerHTML.replace("You've successfully", "You've successfully Added Product of " );
					statusTxt.innerHTML = statusTxt.innerHTML.replace("Request Money to", " as a direct product to the Scriptbill Database System, your Store ID is: " );
					
				}
				else {
					recipient.innerText = config.recipient;
				}
				
			}
			
			if( message ) {
				statusTxt.innerHTML += message + socialShareHTML;
				/* navigator.clipboard.writeText( message );
				await Scriptbill.createAlert( "Message Copied to clipboard, You can share this transaction with the recipient by sharing the QRCode or attaching downloaded file through any communication medium. Remember to paste the message on your clipboard as it will stand as a guide to your recipient, you can also edit as desired." ); */
				let inter = setInterval( ()=>{
					let share = document.querySelector(".share-button");
					
					if( ! share )
						return;
					
					clearInterval( inter );
					let items 	= share.querySelectorAll(".share-item"), item;
					for( let x = 0; x < items.length; x++ ){
						item 	= items[x];
						let check = false;
							
						if( item.querySelector(".fa-copy") ){
							check = "Copy";
						} else if( item.querySelector(".fa-email")){
							check = "Email";
							let subject = "I've Sent You Money".replace(" ", "%20");
							message 	= message.replace(" ","%20");
							item.setAttribute("href", "mailto:" + config.recipient + "?subject=" + subject + "body=" + message );
						}else if( item.querySelector(".fa-whatsapp")){
							check = "WhatsApp";
							message 	= message.replace(" ","%20");
							item.setAttribute("href", "https://wa.me/" + config.recipient + "?text=" + message );
						}else if( item.querySelector(".fa-sms")){
							check = "SMS";
							message 	= message.replace(" ","%20");
							item.setAttribute("href", "sms:" + config.recipient + "?&body=" + message );
						}
						item.onclick = function(){
							navigator.clipboard.writeText( message );							
						}
					}
				}, 1000 );
			}
			
			amount.innerHTML 		= symbol + '' + config.value;
			recipient.innerHTML 	= config.recipient;
		}
		
		print.onclick = async function(){
			let qrContent = "";
			
			let block = false;
				
			if( typeof( config.block.length ) == "number" ){
				block 		= JSON.parse( JSON.stringify( config.block[0] ) );
			} else {
				block 		= JSON.parse( JSON.stringify( config.block ) );
			}
			if( config.transKey && Scriptbill.s.splitted ) {
				let a 		= document.createElement("a");
				let blob 	= new Blob([Scriptbill.s.splitted, {'type': 'application/octet-stream'}])
				a.href 		= window.URL.createObjectURL( blob );
				a.download 	= "splittedNote.txt";
				a.click();

				let url 	= new URL("https://t.me/companymatrix/41/80");
				url.searchParams.set("data", Scriptbill.Base64.encode( JSON.stringify({"blockID": block.blockID, "type":"SPLIT", "rep":config.recipient, "server": note.noteServer} ) ) );
				
				qrContent 	= url.href;
			} else if( config.block ){
				let url 	= new URL("https://t.me/companymatrix/41/80");
				url.searchParams.set("data",Scriptbill.Base64.encode( JSON.stringify( {"blockID": config.block.blockID, "type":"CREDIT", "rep":config.recipient, "server": note.noteServer } ) ));
				qrContent = url.href;
				
			} else await Scriptbill.createAlert('no Transaction block set');
			
			if( block && block.blockID )
				generateQRCode( JSON.stringify( qrContent ), block.blockID );
			
			else 
				generateQRCode( JSON.stringify( qrContent ));
		}
		
		button.onclick = function(){
			location.href = config.storeName ? sellProduct : requestUrl;
		}
		
		//removing temp data
		delete Scriptbill.s.requestMoneyConfig;
		delete Scriptbill.s.requestProcessing;
	});
}


if( location.href.includes( buyProduct ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let url 		= new URL( location.href );
	let productID 	= url.searchParams.get("location");
	let amount	 	= url.searchParams.get("amount");
	let cur 	 	= url.searchParams.get("currency");
	
	if( ! productID && ! Scriptbill.s.buyConfig )
		location.href 	= dashboardUrl;
	
	let product 	= "";
	
	try {
		product 	= new URL( productID );
		
		if( ! product )
			product 	= productID;
		
		else 
			product 	= product.origin;
	} catch(e){
		product 		= productID;
	}
	
	let buyConfig = false;
	if( Scriptbill.s.buyConfig ){
		buyConfig 		= JSON.parse( Scriptbill.s.buyConfig );
	}
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let config	 		= document.getElementById("agreeConfig");
		let periodic		= document.getElementById("periodic");
		let somer	 		= document.getElementById("somer");
		let enddate	 		= document.getElementById("enddate");
		let sendRow 		= document.getElementById("buyProduct");
		let recipient		= document.getElementById("emailID");
		let productImg		= document.getElementById("productIMG");
		let productDiv		= document.getElementById("productDiv");
		let send			= document.getElementById("youSend");
		let recieve			= document.getElementById("recipientGets");
		let sendCur			= document.getElementById("youSendCurrency");		
		let repCur			= document.getElementById("recipientCurrency");		
		let inner			= document.getElementsByClassName("input-group-append");		
		let symbol 			= sendRow.querySelector("span.input-group-text.symbol");
		let repSymbol		= sendRow.querySelector("span.input-group-text.repSymbol");
		let exchange		= sendRow.querySelector("span.font-weight-500.exchange");
		let fees			= sendRow.querySelector("span.text-3.float-right.fees");
		let total			= sendRow.querySelector("span.text-3.float-right.total");
		let button			= sendRow.querySelector("button.btn.btn-primary.btn-block.continue");
		let share 			= sendRow.querySelector("#share-buttons");
		let test 			= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 		= test;
		let toPay 			= 0.25;
		
	
		
		recipient.value = product;
		recipient.setAttribute("disabled", "disabled" );
				
		if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		repSymbol.innerHTML = symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}
		
		if( repCur.querySelector("option[value='"+test+"']") ){
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
			repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}
	
		if( cur && repCur.querySelector("option[value='"+cur+"']") ){
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ cur.toLowerCase() +' mr-1"></i>&nbsp;' + cur.toUpperCase();
			repCur.querySelector("option[value='"+cur+"']").setAttribute("selected", "selected");
		}
		
		if( ( buyConfig && buyConfig.block && buyConfig.block.transValue == 0 )){
			recieve.focus();
			send.setAttribute('disabled','disabled');
			sendCur.setAttribute('disabled', 'diasabled');
		} else {				
			recieve.parentElement.parentElement.style.display 	= "none";
		}
		
		
		send.value = "";		
		recieve.value = "";
		fees.innerHTML = "";
		total.innerHTML = "";
		exchange.innerHTML = "";
		
		if( buyConfig ){
			
			if( buyConfig.productIMG ){
				productImg.style.display = "block";
				productImg.querySelector("#rankImage").src = buyConfig.productIMG;
				productImg.querySelector("#productNameView").innerText = buyConfig.name;
				productImg.querySelector("#storeNameView").innerText = buyConfig.units + " Units";
				productImg.querySelector("#productDesc").innerText = buyConfig.description;
			}
			
			productDiv.style.display = "block";
			productDiv.querySelector("#productName").value = buyConfig.name;
			productDiv.querySelector("#productName").setAttribute("disabled", "disabled");
			
			let rates = 1;
			if( repCur.value != sendCur.value ){
				if( Scriptbill.s.rates )
					rates 	= parseFloat(Scriptbill.s.rates);
			}
			
			recipient.value 		= buyConfig.storeName;
			recipient.setAttribute("disabled", "disabled");
			if( buyConfig.toPay )			
				send.value 				= buyConfig.block.transValue;
			
			else {
				let value 				= parseFloat( buyConfig.block.transValue );
				send.value 				= value;
			}
			
			if( buyConfig.canSubscribe != "Yes" )
				send.setAttribute("disabled", "disabled");
			else {
				//show the periodic agreement div
				biddersTerm.click();
			}
			recieve.value = 	( send.value * rates ) - ( ( send.value * rates ) * toPay );
			recieve.setAttribute("disabled", "disabled");
			total.innerHTML 	= send.value + " " + test;
			fees.innerHTML 	= ( send.value * toPay ) + " " + test;
		}
		
		let noagree = document.querySelector(".nogree");
		
		noagree.addEventListener("click", async function(){
			let con = await Scriptbill.createConfirm("You've disagreed with our bidder's term, If you want to continue to purchase this product, then you won't participate in the product bid anymore. If you want to change your mind and participate in the product bid, you'll have to rescan the product image one more time. Do you want to continue purchasing the product with the full amount without participating in the bid?");
			
			if( ! con )
				location.href = dashboardUrl;
			
			else if( buyConfig.block ){
				send.value = parseFloat( buyConfig.block.transValue );
				send.setAttribute("disabled", "disabled");
			}
		});
		
		
		let shares = share.querySelectorAll('a'), urls;
		
		for( let x = 0; x < shares.length; x++ ){
			
			if( x == 0 ){
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("text", "Get Scriptbank on your browser and enjoy loans without limit and good Profit on every purchase you make on the web. You can click here https://t.me/companymatrix/41/80 to get started now. Use this referral code to signup for a higher loan experience " + note.noteAddress.slice(0, 12));
				shares[x].href = urls.href;
			} else {
				//https://web.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&display=popup&ref=plugin&src=like&kid_directed_site=0
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("u", "https://t.me/companymatrix/41/80");
				urls.searchParams.set("display", "popup");
				urls.searchParams.set("ref", "plugin");
				shares[x].href = urls.href;
			}
		}	
		
		
		if( amount ) {
			send.value = formatCurrency( parseFloat( amount ));
			let rates = 1;
			
			if( cur && result[cur] )
				symbole 	= result[cur].symbol;
			
			if( cur && cur != test ){
				if( Scriptbill.s.rates )
					rates 	= parseFloat(Scriptbill.s.rates);
				
				else {				
					
					rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
					
					if( rates ){
						rates = rates.rates;
					}
				}
				repSymbol.innerHTML = symbole;				
					
				if( rates && rates[ cur ] ){
					let rate = 1;
					if( test != "USD" ){
						rate 		= 1/parseFloat(rates[cur]);
					} 
					if( cur != "USD" ){
						rate 		= rate / ( 1/parseFloat(rates[cur]) );
					}
					exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ cur ] * rate ).toFixed(4) + " " + cur;
					Scriptbill.s.toPay = toPay;
					Scriptbill.s.rates = parseFloat(rates[ cur ]) * rate;
					
				} else {
					exchange.innerHTML = "exchange rate not available";
				}
			}
			
			recieve.value = formatCurrency( ( amount * rates ) - ( value * toPay ) );
		}
		
		config.onchange 	= function(){
			if( this.value == 'returnPeriodic' ){
				periodic.parentElement.style.display = "block";
				somer.parentElement.style.display = "none";
			} else if( this.value == 'returnSome' ){
				periodic.parentElement.style.display = "none";
				somer.parentElement.style.display = "block";
			} else {
				periodic.parentElement.style.display = "none";
				somer.parentElement.style.display = "none";
			}
		}
		
		repCur.onchange = async function(){
			if( result[ this.value ] ){
				symbole 	= result[ this.value ].symbol;
			}
			let value 		= send.value;
			if( this.value != test ){			
						
				repSymbol.innerHTML = symbole;
				let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
				
				if( rates ){
					rates = rates.rates;
				}				
				
				if( rates && rates[ this.value ] ){
					let rate = 1;
					if( sendCur.value != "USD" ){
						rate 		= 1/parseFloat(rates[sendCur.value]);
					} 
					if( this.value != "USD" ){
						rate 		= rate / ( 1/parseFloat(rates[this.value]) );
					}
					exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
					Scriptbill.s.toPay = toPay;
					Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
					
				} else {
					exchange.innerHTML = "exchange rate not available";
				}
			} else {
				repSymbol.innerHTML = symbole;
				exchange.innerHTML = "";
			}
			
			fees.innerHTML 	= formatCurrency( ( value * toPay ).toFixed(2) ) + " " + test;
		}
		
		send.oninput   = function(){
			let rates = 1;
			if( repCur.value != sendCur.value ){
				if( Scriptbill.s.rates )
					rates 	= parseFloat(Scriptbill.s.rates);
			}
			
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 		= parseFloat( this.value.replaceAll(',','') );		
			recieve.value = 	formatCurrency( parseFloat( this.value * rates ) - parseFloat( this.value * toPay ) );
			total.innerHTML 	= formatCurrency( this.value ) + " " + test;
			fees.innerHTML 	= formatCurrency( this.value * toPay ) + " " + test;
			
			this.value = formatCurrency( this.value );
		}
		
		recieve.oninput = function(){
			let rates = 1;
			if( repCur.value != sendCur.value ){
				if( Scriptbill.s.rates )
					rates 	= parseFloat(Scriptbill.s.rates);
			}
			
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 		= parseFloat( this.value.replaceAll(',','') );
			let sendValue   = parseFloat( ( this.value / rates ).toFixed(2) ) + parseFloat( this.value * toPay );
			send.value 		= formatCurrency( sendValue );
			total.innerHTML 	= formatCurrency( sendValue ) + " " + test;
			fees.innerHTML 	= formatCurrency( sendValue * toPay ) + " " + test;
			this.value = formatCurrency( this.value );
		}
		
		button.onclick 		= async function(e){
			e.preventDefault();
			let sendConfig = {};
			
			if( periodic.value ){
				sendConfig.periodicTime 	= periodic.value;
			}
			
			if( send.value ){
				sendConfig.value 	= parseFloat( send.value.replaceAll(',','') );
				sendConfig.fees 	= 0;
			} else {
				await Scriptbill.createAlert("send value can't be empty!");
				return;
			}			
			
			if( config.value ){
				sendConfig.agreeConfigType = config.value;
			}	
				
			if( somer.value ){
				sendConfig.returnAmount 	= somer.value;
			}
				
			if( enddate.value ){
				sendConfig.agreementExpiry 	= enddate.value;
				
			}
			
			if( recieve.value ){
				sendConfig.repValue			= parseFloat( recieve.value.replaceAll(',','') );
			}
			
			if( sendCur.value ){
				sendConfig.currency 		= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
			if( repCur.value ){
				sendConfig.repCurrency 		= repCur.value;
			}
			
			if( recipient.value ){
				sendConfig.recipient 		= recipient.value;
				sendConfig.recipientType 	= "product";
			} else {
				await Scriptbill.createAlert(" enter a recipient!");
				return;
			}
			
			Scriptbill.s.sendMoneyConfig 	= JSON.stringify( sendConfig );
			location.href = sendConfirm;
		}
		
		sendCur.setAttribute("disabled", "disabled");		
		
	});
	
	$(function() {
		'use strict';
		  // Birth Date
		  $('#enddate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			minDate: moment().add(7, 'days'),
			}, function(chosen_date) {
		  $('#enddate').val(chosen_date.format('MM-DD-YYYY'));
		});
	});

}

if( location.href.includes( buyWebsite ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let url 		= new URL( location.href );
	let website 	= url.searchParams.get("url");
	
	if( ! website  )
		location.href 	= dashboardUrl;
	
	try {
		website 		= new URL( website );
		website 		= website.origin;
	} catch(e){
		location.href 	= dashboardUrl;
	}	
	
	
	let buyConfig = false;
	if( Scriptbill.s.buyConfig ){
		buyConfig 		= JSON.parse( Scriptbill.s.buyConfig );
	}
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let bought 			= await Scriptbill.getData(["getBudget", "webUrl"], ["TRUE", website], Scriptbill.getDefaultServer());
		
		if( bought && bought.isSelling == "false" ){
			url 				= new URL( buyStocks );
			url.searchParams.set("url", website);
			location.href 		= url.href;
			return;
		}			
		
		let sleep	 			= document.getElementById("sleepInvestor");
		let active	 			= document.getElementById("activeInvestor");
		let fraction			= document.getElementById("fractionMoney");
		let fractionActive		= document.getElementById("fractionMoneyActive");
		let fracDividend		= document.getElementById("fractionDividend");
		let fracDividendActive	= document.getElementById("fractionDividendActive");
		let highMoneyActive		= document.getElementById("highMoneyActive");
		let highDivActive		= document.getElementById("HighDividendActive");
		let enddate	 			= document.getElementById("stockdate");
		let sendRow 			= document.getElementById("buyProduct");
		let profitSharing		= document.getElementById("profitSharing");
		let recipient			= document.getElementById("emailID");
		//let productImg			= document.getElementById("productIMG");
		let webName				= document.getElementById("webName");
		let budgetValue			= document.getElementById("youSend");
		let investShare			= document.getElementById("recipientGets");
		let sendCur				= document.getElementById("youSendCurrency");		
		let repCur				= document.getElementById("recipientCurrency");		
		let profit				= document.getElementById("profitSharing");		
		let server				= document.getElementById("budgetServer");		
		let inner				= document.getElementsByClassName("input-group-append");	
		let symbol 				= sendRow.querySelector("span.input-group-text.symbol");
		let repSymbol			= sendRow.querySelector("span.input-group-text.repSymbol");
		let exchange			= sendRow.querySelector("span.font-weight-500.exchange");
		let fees				= sendRow.querySelector("span.text-3.float-right.fees");
		//let total				= sendRow.querySelector("span.text-3.float-right.total");
		let button				= sendRow.querySelector("button.btn.btn-primary.btn-block.continue");
		//let share 				= sendRow.querySelector("#share-buttons");
		let test 				= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 			= test;
		let toPay 				= 0.10;
		let budgetCurrency	 	= test;
	
		
		recipient.value 		= website;
		recipient.setAttribute("disabled", "disabled" );
		
		if( bought && bought["_storeName"] ){
			webName.value = bought["_storeName"];
		}
		
		if( bought && bought.value ){
			budgetValue.value = bought.value;
			
			if( bought.salesValue && ! isNaN( parseFloat( bought.salesValue ))){
				budgetValue.value = parseFloat( bought.value ) + parseFloat( bought.salesValue );
			}
			budgetValue.setAttribute("disabled", "disabled");
			
			if( bought.budgetCredit ){
				budgetCurrency 		= bought.budgetCredit.slice( 0, bought.budgetCredit.lastIndexOf("CRD"));
				if( sendCur.querySelector("option[value='"+budgetCurrency+"']") ){
					inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+budgetCurrency.toLowerCase()+' mr-1"></i>&nbsp;' + budgetCurrency.toUpperCase();
					sendCur.querySelector("option[value='"+budgetCurrency+"']").setAttribute("selected", "selected");
					sendCur.setAttribute("disabled", "disabled");
				}
				
				if( repCur.querySelector("option[value='"+budgetCurrency+"']") ){
					inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+budgetCurrency.toLowerCase()+' mr-1"></i>&nbsp;' + budgetCurrency.toUpperCase();
					repCur.querySelector("option[value='"+budgetCurrency+"']").setAttribute("selected", "selected");
					repCur.setAttribute("disabled", "disabled");
				}
			}
		}
				
		if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		repSymbol.innerHTML = symbole;
		
		if( ! sendCur.getAttribute("disabled") && sendCur.querySelector("option[value='"+test+"']") ){
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			sendCur.setAttribute("disabled", "disabled");
		}
		
		if( ! repCur.getAttribute("disabled") && repCur.querySelector("option[value='"+test+"']") ){
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
			repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			repCur.setAttribute("disabled", "disabled");
		}
	
				
		budgetValue.value = "";		
		investShare.value = "";
		fees.innerHTML = "";
		exchange.innerHTML = "";

		const minimum		= 50;//in dollars
		
		
		/* let shares = share.querySelectorAll('a'), urls;
		
		for( let x = 0; x < shares.length; x++ ){
			
			if( x == 0 ){
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("text", "Get Scriptbank on your browser and enjoy loans without limit and good Profit on every purchase you make on the web. You can click here https://t.me/companymatrix/41/80 to get started now. Use this referral code to signup for a higher loan experience " + note.noteAddress.slice(0, 12));
				shares[x].href = urls.href;
			} else {
				//https://web.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&display=popup&ref=plugin&src=like&kid_directed_site=0
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("u", "https://t.me/companymatrix/41/80");
				urls.searchParams.set("display", "popup");
				urls.searchParams.set("ref", "plugin");
				shares[x].href = urls.href;
			}
		}	 */		
		
		sleep.onchange 	= function(){
			if( this.value == 'fractionMoney' || this.value == 'fracFullDividend'  ){
				fraction.parentElement.style.display = "block";
				fracDividend.parentElement.style.display = "none";
			} else if( this.value == 'fractionDividend' ){
				fraction.parentElement.style.display = "none";
				fracDividend.parentElement.style.display = "block";
			} else {
				fraction.parentElement.style.display = "none";
				fracDividend.parentElement.style.display = "none";
			}
		}
		active.onchange 	= function(){
			if( this.value == 'fractionMoney' || this.value == 'fracFullDividend' ){
				fractionActive.parentElement.style.display = "block";
				fracDividendActive.parentElement.style.display = "none";
				highMoneyActive.parentElement.style.display = "none";
				highDivActive.parentElement.style.display = "none";
			} else if( this.value == 'fractionDividend' ){
				fractionActive.parentElement.style.display = "none";
				fracDividendActive.parentElement.style.display = "block";
				highMoneyActive.parentElement.style.display = "none";
				highDivActive.parentElement.style.display = "none";
			} else if( this.value == 'fullHighDividend' ){
				fractionActive.parentElement.style.display = "none";
				fracDividendActive.parentElement.style.display = "none";
				highMoneyActive.parentElement.style.display = "none";
				highDivActive.parentElement.style.display = "block";
			} else if( this.value == 'fracHighDividend' ){
				fractionActive.parentElement.style.display = "block";
				fracDividendActive.parentElement.style.display = "none";
				highMoneyActive.parentElement.style.display = "none";
				highDivActive.parentElement.style.display = "block";
			}else if( this.value == 'HighHighDividend' ){
				fractionActive.parentElement.style.display = "none";
				fracDividendActive.parentElement.style.display = "none";
				highMoneyActive.parentElement.style.display = "block";
				highDivActive.parentElement.style.display = "block";
			} else {
				fractionActive.parentElement.style.display = "none";
				fracDividendActive.parentElement.style.display = "none";
				highMoneyActive.parentElement.style.display = "none";
				highDivActive.parentElement.style.display = "none";
			}
		}
		
		
		
		budgetValue.oninput   = async function(){
			let rates = 1;
						
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 		= parseFloat( this.value.replaceAll(',','') );
			fees.innerHTML 	= formatCurrency( this.value ) + " " + test;
			
			if( sendCur.value != test ){
				let rates 		= await Scriptbill.getExchangeValue( sendCur.value, test );
				fees.innerHTML 	= formatCurrency( this.value * rates[1] ) + " " + test;
				Scriptbill.s.sessionRate = rates[1];
			}
			
			this.value = formatCurrency( this.value );
		}
		
		investShare.oninput = async function(){
			let rates = 1;
						
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 		= parseFloat( this.value.replaceAll(',','') );
			let sendValue   = parseFloat( ( this.value / rates ).toFixed(2) );
			//budgetValue.value 		= formatCurrency( sendValue );
			let budget 			= parseFloat( budgetValue.value.replaceAll(',','') );
			toPay 				= 1 - ( sendValue / budget );
			exchange.innerHTML 	= formatCurrency( budget * toPay ) + " " + test;
			this.value = formatCurrency( this.value );
			Scriptbill.s.toPay 	= toPay;
			
			if( sendCur.value != test ){
				let rates 		= await Scriptbill.getExchangeValue( sendCur.value, test );
				exchange.innerHTML 	= formatCurrency( this.value * rates[1] * toPay ) + " " + test;
				Scriptbill.s.sessionRate = rates[1];
			}
		}
		
		button.onclick 		= async function(e){
			e.preventDefault();
			let sendConfig = {};
			let budgetConfig	= JSON.parse( JSON.stringify( Scriptbill.budgetConfig ) );
			
			if( bought && bought.budgetID ){
				budgetConfig 	= JSON.parse( JSON.stringify( bought ));
			}
			if( budgetValue.value ){
				sendConfig.value 	= parseFloat( budgetValue.value.replaceAll(',','') );
				sendConfig.fees 	= 0;
				budgetConfig.value 	= sendConfig.value;
			} else {
				await Scriptbill.createAlert("budget value can't be empty!");
				return;
			}
			
			if( sendCur.value ){
				sendConfig.currency 		= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
			budgetConfig.budgetCredit 		= sendCur.value + "CRD";
			let maxVal 		= 500;//in dollars
			
			if( sendConfig.currency != "USD" ){
				//checking the budget value in usd
				let ex 		= await Scriptbill.getExchangeValue("USDCRD", sendConfig.currency + "CRD" );
				let minVal 	= maxVal * ex[1];
				
				if( sendConfig.value < minVal ){
					minVal 		= formatCurrency( minVal );
					await Scriptbill.createAlert("Budget Value Can't be lesser than " + minVal + " " + sendConfig.currency );
					return;
				} else {
					maxVal 		= sendConfig.value / ex[1];
				}
			}else {
				let minVal 	= maxVal;
				if( sendConfig.value < minVal ){
					minVal 		= formatCurrency( minVal );
					await Scriptbill.createAlert("Budget Value Can't be lesser than " + minVal + " " + sendConfig.currency );
					return;
				} 
			}
			
			let salesValue 				= 0;
			if( investShare.value ){
				sendConfig.investorShare			= parseFloat( investShare.value.replaceAll(',','') );
				
			}			
			
			
			if( repCur.value ){
				sendConfig.repCurrency 		= repCur.value;
			}
			
			if( ! sendConfig.repCurrency )
				sendConfig.repCurrency = sendConfig.currency;
			
			let min 	= maxVal - 50;
			
			
			if( test != sendConfig.currency ){
				let ex 			= await Scriptbill.getExchangeValue( sendConfig.currency+ "CRD", note.noteType );
				sendConfig.value = parseFloat( sendConfig.value ) * ex[1];
				sendConfig.investorShare = parseFloat( sendConfig.investorShare ) * ex[1];
				salesValue		= sendConfig.value - sendConfig.investorShare;		
			} else {
				salesValue 		=  parseFloat( sendConfig.value ) - parseFloat( sendConfig.investorShare );
			}
			if( salesValue > note.noteValue ){
				let expected = formatCurrency( salesValue - note.noteValue );
				await Scriptbill.createAlert("Note Value too Low to Purchase Website. Please deposit more to purchase this website. You need " + expected + " " + test );
				location.href 	= depositUrl;
				return;
			}
			
			if( sendConfig.repCurrency != "USD" ){
				//checking the budget value in usd 
				
				let ex 		= await Scriptbill.getExchangeValue("USDCRD", sendConfig.repCurrency + "CRD" );
				let minVal 	= min * ex[1];
				
				if( sendConfig.investorShare > minVal ){
					minVal 		= formatCurrency( minVal );
					await Scriptbill.createAlert("Investor Share Value Can't be higher than " + minVal + " " + sendConfig.repCurrency );
					return;
				} else {
					budgetConfig.investorShare = sendConfig.investorShare;
				}
			} else {
				if( sendConfig.investorShare > min ){
					min 		= formatCurrency( min );
					await Scriptbill.createAlert("Investor Share Value Can't be higher than " + min + " " + sendConfig.repCurrency );
					return;
				} else {
					budgetConfig.investorShare = sendConfig.investorShare;
				}
			}
			
			if( sleep.value ){
				sendConfig.sleepInvestorAgreement = sleep.value;
				
				let value = sleep.value;
				
				if( value == 'fractionMoney' || value == 'fracFullDividend' ){
					if( ! fraction.value ){
						await Scriptbill.createAlert("Please enter the frantion less you want.");
						return;
					}
					
					budgetConfig.sleepingPartner = "percent-low";
					
					if( value ==  'fracFullDividend' )
						budgetConfig.sleepingPartnerDiv = "percent-equal";
					
					else 
						budgetConfig.sleepingPartnerDiv = "none";
					
					budgetConfig.sleepingPartnerShare = parseInt( fraction.value.split("%")[0] ) / 100;
				}
				else if( value == "fractionDividend" ){
					if( ! fracDividend.value ){
						await Scriptbill.createAlert("Please enter the dividend fraction less you want.");
						return;
					}
					
					budgetConfig.sleepingPartner = "percent-equal";
					budgetConfig.sleepingPartnerDiv = "percent-low";
					budgetConfig.sleepingPartnerPay = parseInt( fracDividend.value.split("%")[0] ) / 100;
				}
				
			}
			
			if( active.value ){
				sendConfig.activeInvestorAgreement = active.value;
				
				let value = active.value;
				
				if( value == 'fractionMoney' || value == 'fracFullDividend' ){
					if( ! fractionActive.value ){
						await Scriptbill.createAlert("Please enter the frantion less you want.");
						return;
					}
					
					budgetConfig.workingPartner = "percent-low";
					budgetConfig.workingPartnerShare = parseInt( fractionActive.value.split("%")[0] ) / 100;
				}
				else if( value == "fractionDividend" ){
					if( ! fracDividendActive.value ){
						await Scriptbill.createAlert("Please enter the dividend fraction less you want.");
						return;
					}
					
					budgetConfig.workingPartner = "percent-equal";
					budgetConfig.workingPartnerDiv = "percent-low";
					budgetConfig.workingPartnerPay = parseInt( fracDividendActive.value.split("%")[0] ) / 100;
				}
				else if( value == "fullHighDividend" ){
					if( ! highDivActive.value ){
						await Scriptbill.createAlert("Please enter the dividend fraction less you want.");
						return;
					}
					
					budgetConfig.workingPartner = "percent-equal";
					budgetConfig.workingPartnerDiv = "percent-high";
					budgetConfig.workingPartnerPay = parseInt( highDivActive.value.split("%")[0] ) / 100;
				}
				else if( value == "fracHighDividend" ){
					if( ! highDivActive.value || ! fractionActive.value ){
						await Scriptbill.createAlert("Please enter the dividend fraction more or the stock fraction less you want.");
						return;
					}
					
					budgetConfig.workingPartner = "percent-low";
					budgetConfig.workingPartnerDiv = "percent-high";
					budgetConfig.workingPartnerPay = parseInt( highDivActive.value.split("%")[0] ) / 100;
					budgetConfig.workingPartnerShare = parseInt( fractionActive.value.split("%")[0] ) / 100;
				}
				else if( value == "HighHighDividend" ){
					if( ! highDivActive.value || ! highMoneyActive.value ){
						await Scriptbill.createAlert("Please enter the dividend or the stock fraction more you want.");
						return;
					}
					
					budgetConfig.workingPartner = "percent-high";
					budgetConfig.workingPartnerDiv = "percent-high";
					budgetConfig.workingPartnerPay = parseInt( highDivActive.value.split("%")[0] ) / 100;
					budgetConfig.workingPartnerShare = parseInt( highMoneyActive.value.split("%")[0] ) / 100;
				}
				else {					
					budgetConfig.workingPartner = "percent-equal";
					budgetConfig.workingPartnerDiv = "percent-equal";
				}
				
			}
				
				
			if( webName.value ){
				sendConfig.budgetName 	= webName.value;
				budgetConfig.name 		= webName.value;
				budgetConfig['_storeName'] 		= webName.value;
			} else {
				await Scriptbill.createAlert("Please enter a unique budget name");
				return;
			}
				
			if( enddate.value ){
				sendConfig.agreementExpiry 	= enddate.value;
				budgetConfig.agreement 		= await Scriptbill.createAgreement();
				let exDate 		= new Date( enddate.value );
				let now 		= Date.now();
				let time 		= exDate.getTime() - now;
				let timeString 	= Scriptbill.timeToString( time );
				budgetConfig.agreement.payPeriod 	= timeString;
				budgetConfig.agreement.payTime 		= exDate.getTime();
				budgetConfig.agreement.isPeriodic 		= true;
				budgetConfig.agreement.value 		= budgetValue.value;
			}
			
			if( profit.value )
				budgetConfig.profitSharing 	= parseInt( profit.value.split("%")[0] )/ 100;
			
			else 
				budgetConfig.profitSharing	= 0.2;
			
			if( server.value )
				budgetConfig.budgetServer = server.value;
			
			else
				budgetConfig.budgetServer = Scriptbill.getDefaultServer();
			
			if( ! budgetConfig.budgetType || budgetConfig.budgetType != "business" )
				budgetConfig.budgetType = "business";
			
			
			
			if( recipient.value ){
				sendConfig.recipient 		= recipient.value;
				budgetConfig['_storeUrl']	= recipient.value;
			} else {
				await Scriptbill.createAlert(" enter a website url");
				return;
			}
			
			if( ! profitSharing.value ){
				sendConfig.profitSharing 	= 0.1;
			} else {
				profitSharing 				= profitSharing.value;
				sendConfig.profitSharing 	= parseInt( profitSharing.split("%")[0] ) / 100;
				
				if( sendConfig.profitSharing < 0.1 )
					sendConfig.profitSharing 	= 0.1;
			}
			this.innerText 	= "Please Wait...";
			
			//let waitInterval = setInterval();
			
			if( bought && bought.isSelling == "true" ){
				let addresses 	= bought.sellerAddress.split(","), sendAmount = 0;
				
				Scriptbill.sendConfig.recipient = addresses;
				
				for( let y = 0; y < addresses.length; y++ ){
					if( ! bought[ addresses[y] ] || ! bought[ addresses[y] ].oldStake ) {
						Scriptbill.sendConfig.recipient.splice( Scriptbill.sendConfig.recipient.indexOf( addresses[y] ), 1 );
						continue;
					}
					delete bought[ addresses[y] ].oldStake;
					sendAmount 		= budgetConfig.salesValue * bought[ addresses[y] ].oldStake;
					
					if( ! typeof Scriptbill.sendConfig.amount == "object" )
							Scriptbill.sendConfig.amount = [];
						
					Scriptbill.sendConfig.amount.push( sendAmount );
				}
				
				let blocks = await Scriptbill.sendMoney();
				
				if( blocks.length ){
					this.innerText 	= "Website Purchased Successfully";
					await Scriptbill.createAlert( "Successfully Bought Website From " + blocks.length + " recipients. ");
					bought.isSelling	= "false";
					budgetConfig 	= JSON.parse( JSON.stringify( bought ));
					budgetConfig[ note.noteAddress ] = {};
					budgetConfig[ note.noteAddress ].stake 	= salesValue / budgetConfig.value;
					sendConfig.stake 				= budgetConfig[ note.noteAddress ].stake;
					sendConfig.recipientNo 			= blocks.length;
					sendConfig.budgetID 			= bought.budgetID;
					Scriptbill.s.sendMoneyConfig 	= JSON.stringify( sendConfig );
					Scriptbill.s.sendMoneyProcessing = "TRUE";
					url 			= new URL( sendSuccess );
					url.searchParams.set( "webSale", "true" );					
					await Scriptbill.getData("budgetConfig", Scriptbill.Base64.encode( JSON.stringify( bought ) ), SERVER );
					
					let accountData 	= await getAccountData();
					
					if( ! typeof accountData == "object" )
						accountData 	= {};
					
					accountData.owner 	= sendConfig.recipient;
					
					await Scriptbill.setAccountData( accountData );
						
					location.href = url.href;
				} else {
					this.innerText 	= "Website not Purchased";
					let error = JSON.parse( Scriptbill.s.eMessages );
					let keys 	= Object.keys( error );
					keys 		= keys.reverse();
					document.getElementById("error").innerHTML = error[keys[0]];
					setTimeout( function(){
						location.reload();
					}, 10000 );
				}
					
			} else {
				console.log(budgetConfig);
				//alert("check budget config");
				let budget = await Scriptbill.createScriptbillBudget( budgetConfig, false );
				
				if( budget && budget.blockID ){
					this.innerText 	= "Budget Created Succesfully";
					
					
					Scriptbill.details 				= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ) );
					Scriptbill.details.transType 	= "INTERESTPAY";
					Scriptbill.details.transValue 	= salesValue;
					Scriptbill.details.recipient 	= budget.exchangeNote.exchangeID;
					let interest = await Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details, false );
					
					if( interest && interest.blockID && interest.transType == "INTERESTPAY" ){

						this.innerText 	= "Website Purchased Successfully";
						
						//creating the first Scriptbill product
						let productConfig 				= JSON.parse( JSON.stringify( Scriptbill.productConfig ) );
						productConfig.name				= budgetConfig.name;
						productConfig.value 			= 1;
						productConfig.units 			= Infinity;
						productConfig.description 		= "Default Product for " + budgetConfig.name + " Hosted at " + budgetConfig['_storeUrl'] + ".";
						productConfig.budgetID 			= budgetConfig.budgetID;
						productConfig.sharingRate 		= profitSharing * 2;
						
						let productBlock 				= await Scriptbill.create_product();
						
						if( productBlock && productBlock.transType == "CREATEPRODUCT" ){
							this.innerText 	= "Default Product Created";
							budgetConfig.productID 	= productBlock.productID;
							await Scriptbill.getData(["webProduct", "webUrl"], [Scriptbill.Base64.encode( JSON.stringify( productBlock.productNote ) ), sendConfig.recipient ] , SERVER );
						}
						else{							
							this.innerText 	= "Couldn't Create Default Product";
							var error = JSON.parse( Scriptbill.s.eMessages );
							var keys 	= Object.keys( error );
							keys 		= keys.reverse();
							document.getElementById("error").innerHTML = error[keys[0]];
						}
							
						try {
							sendConfig.productBlock 		= JSON.parse( JSON.stringify( productBlock ));
						} catch(e){
							
						}
						budgetConfig 	= JSON.parse( JSON.stringify( budget.agreement ));
						budgetConfig[ note.noteAddress ] = {};
						budgetConfig[ note.noteAddress ].stake 	= salesValue / budgetConfig.value;
						sendConfig.stake 				= budgetConfig[ note.noteAddress ].stake;
						sendConfig.recipientNo			= 1;
						sendConfig.budgetID 			= budgetConfig.budgetID;
						Scriptbill.s.sendMoneyConfig 	= JSON.stringify( sendConfig );
						Scriptbill.s.sendMoneyProcessing = "TRUE";
						url 			= new URL( sendSuccess );
						url.searchParams.set( "webSale", "true" );
						
						await Scriptbill.getData("budgetConfig", Scriptbill.Base64.encode( JSON.stringify( budgetConfig ) ), SERVER );
						
						let accountData 	= await getAccountData();
					
						if( ! typeof accountData == "object" )
							accountData 	= {};
						
						accountData.owner 	= sendConfig.recipient;
						
						await Scriptbill.setAccountData( accountData );
						
						location.href = url.href;
					} else {
						this.innerText 	= "Website not Purchased";
						let error = JSON.parse( Scriptbill.s.eMessages );
						let keys 	= Object.keys( error );
						keys 		= keys.reverse();
						document.getElementById("error").innerHTML = error[keys[0]];
						setTimeout( function(){
							location.reload();
						}, 10000 );
					}
				} else {
					this.innerText = "Error Selling Website";
					console.log(budget);
					let error = JSON.parse( Scriptbill.s.eMessages );
					let keys 	= Object.keys( error );
					keys 		= keys.reverse();
					document.getElementById("error").innerHTML = error[keys[0]];
					setTimeout( function(){
						location.reload();
					}, 100000 );
				}
			}
		}
		
		sendCur.setAttribute("disabled", "disabled");		
		
	});
	
	$(function() {
		'use strict';
		  // Birth Date
		  $('#stockdate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			minDate: moment().add(14, 'days'),
			}, function(chosen_date) {
		  $('#stockdate').val(chosen_date.format('MM-DD-YYYY'));
		});
	});
	
	$(function() {
		'use strict';
		  // Birth Date
		  $('#divdate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			minDate: moment().add(1, 'days'),
			}, function(chosen_date) {
		  $('#divdate').val(chosen_date.format('MM-DD-YYYY'));
		});
	});

}

if( location.href.includes( buyStocks ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let url 		= new URL( location.href );
	let productID 	= url.searchParams.get("url");
	
	if( ! productID )
		location.href 	= dashboardUrl;
	
	let product 	= "";
	
	try {
		product 	= new URL( productID );
		
	} catch(e){
		location.href 	= dashboardUrl;
	}
	
		
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let config	 		= document.getElementById("stockAgree");
		let periodic		= document.querySelector(".period");
		let somer	 		= document.getElementById("somer");
		let enddate	 		= document.getElementById("enddate");
		let sendRow 		= document.getElementById("buyProduct");
		let recipient		= document.getElementById("emailID");
		let budgetName		= document.getElementById("productName");
		let productImg		= document.getElementById("productIMG");
		let productDiv		= document.getElementById("productDiv");
		let send			= document.getElementById("youSend");
		let sendCur			= document.getElementById("youSendCurrency");		
		let repCur			= document.getElementById("recipientCurrency");		
		let inner			= document.getElementsByClassName("input-group-append");		
		let symbol 			= sendRow.querySelector("span.input-group-text.symbol");
		let exchange		= sendRow.querySelector("span.font-weight-500.exchange");
		let fees			= sendRow.querySelector("span.text-3.float-right.fees");
		let total			= sendRow.querySelector("span.text-3.float-right.total");
		let button			= sendRow.querySelector("button.btn.btn-primary.btn-block.continue");
		let share 			= sendRow.querySelector("#share-buttons");
		let test 			= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 		= test;
		let toPay 			= 1;
		
	
		let budget 			= await Scriptbill.getData(["getBudget", "webUrl"],["TRUE", product.origin ], Scriptbill.getDefaultServer());
		
		if( ! budget ||  ! budget.budgetID ){
			await Scriptbill.createAlert("Budget on this website does not exist");
			location.href = dashboardUrl;
		}
		recipient.value = budget.budgetID;
		recipient.setAttribute("disabled", "disabled" );
		
		budgetName.value = budget.name;
		budgetName.setAttribute("disabled", "disabled" );
				
		if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}
				
		send.value = "";
		
		if( budget.sleepingPartnerDiv )
			toPay 			= parseFloat( budget.sleepingPartnerDiv );
		
		let productNote 	= await Scriptbill.getCurrentExchangeNote( budget.stockID );
		
		if( productNote && productNote.exchangeValue )		
			fees.innerHTML 	= formatCurrency( ( productNote.exchangeValue - budget.value ) * toPay ) + " " + test;
		
		else 
			fees.innerHTML 	= formatCurrency( 0 ) + " " + test;
		
		total.innerHTML = "";
		//this means the exchange rate value can puchase 1% stock.
		let exchangeRate 	= parseFloat( budget.value ) / 100;
		//to get the amount of stock 1 of the budget credit can acquire
		let exRate 			= 1 / exchangeRate;
		let budgetCurrency = budget.budgetCredit.slice( 0, budget.budgetCredit.lastIndexOf("CRD"));
		if( budgetCurrency == test )
			exchange.innerHTML = "1 " + test + " = " + exRate + " " + budget.stockID;
		
		else {
			let exRates 		= await Scriptbill.getExchangeValue(budget.budgetCredit, note.noteType );
			exRate 				= exRate * exRates[ 1 ];
			exchange.innerHTML 	= "1 " + test + " = " + exRate + " " + budget.stockID;
		}
		
			
		let shares = share.querySelectorAll('a'), urls;
		
		for( let x = 0; x < shares.length; x++ ){
			
			if( x == 0 ){
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("text", "Buy e-Stocks from this website " + product.origin + " on the Scriptbill block web system and earn dividend automatically. You can click here https://t.me/companymatrix/41/80 to connect to the Scriptbill system now. Use this referral code to signup. " + note.referer );
				shares[x].href = urls.href;
			} else {
				//https://web.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&display=popup&ref=plugin&src=like&kid_directed_site=0
				urls	= new URL(shares[x].href);
				urls.search = "";
				urls.searchParams.set("u", "https://t.me/companymatrix/41/80");
				urls.searchParams.set("display", "popup");
				urls.searchParams.set("ref", "plugin");
				shares[x].href = urls.href;
			}
		}	
		
		
	
		
		config.onchange 	= function(){
			if( this.value == 'activeInvestor' ){
				periodic.style.display = "block";
			} else {
				periodic.style.display = "none";
			}
		}
		
				
		send.oninput   = function(){
						
			let value = this.value.replaceAll(',','').split('.');
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				value[1] += values[ values.length - 1 ];
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			}
			this.value 			= parseFloat( this.value.replaceAll(',','') );	
			total.innerHTML 	= formatCurrency( this.value * exRate ) + " " + budget.stockID;
			
			
			this.value = formatCurrency( this.value );
		}
		
				
		button.onclick 		= async function(e){
			e.preventDefault();
			let sendConfig = {};
			
			if( periodic.querySelector("#role").value ){
				sendConfig.role 	= periodic.querySelector("#role").value;
			}
			
			if( send.value ){
				sendConfig.value 	= parseFloat( send.value.replaceAll(',','') );
				sendConfig.fees 	= 0;
			} else {
				await Scriptbill.createAlert("send value can't be empty!");
				return;
			}			
			
			if( config.value ){
				sendConfig.investType = config.value;
			}	
			
		
			
			if( sendCur.value ){
				sendConfig.currency 		= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}			
			
			if( recipient.value ){
				sendConfig.recipient 		= recipient.value;
			} else {
				await Scriptbill.createAlert(" enter a recipient!");
				return;
			}
			
			let block 		= await Scriptbill.buyScriptbillStocks( recipient.value, send.value );
			
			Scriptbill.s.sendMoneyConfig 		= JSON.stringify( sendConfig );
			Scriptbill.s.sendMoneyProcessing 	= "TRUE";
			
			if( block && block.transType == "BUYSTOCK" ){
				url 			= new URL( sendSuccess );
				url.searchParams.set("buyStocks", "true" );
				location.href 	= url.href;
			} else {
				await Scriptbill.createAlert("Error Selling Stocks. Please contact Scriptbank with this email info@ssic.ng to sell the stock to you directly. If issue persist");
				location.reload()
			}
		}
		
		sendCur.setAttribute("disabled", "disabled");		
		
	});
	
	$(function() {
		'use strict';
		  // Birth Date
		  $('#enddate').daterangepicker({
			singleDatePicker: true,
			"showDropdowns": true,
			autoUpdateInput: false,
			minDate: moment().add(7, 'days'),
			}, function(chosen_date) {
		  $('#enddate').val(chosen_date.format('MM-DD-YYYY'));
		});
	});

}


if( location.href.includes( sellProduct )){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let url, productUrl;
	
	try {
		url 		= new URL( location.href );
		productUrl 	= url.searchParams.get("url");
	} catch(e){
		productUrl 	= null;
	} finally {
	
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		
		fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
			let enddate	 	= document.getElementById("paymentDue");
			let recipient	= document.getElementById("productName");
			let storeName	= document.getElementById("storeName");
			let storeUrl	= document.getElementById("storeUrl");
			let storeAdd	= document.getElementById("storeAddress");
			let uploadImg	= document.getElementById("customFile");
			let imageShow	= document.getElementById("rankImage");
			let productShow	= document.getElementById("productNameView");
			let storeShow	= document.getElementById("storeNameView");
			let desc		= document.getElementById("description");
			let periodic	= document.getElementById("periodic");
			let periodSpan 	= document.getElementById("PeriodSpan");
			let somer		= document.getElementById("somer");
			let amount		= document.getElementById("amount");			
			let units		= document.getElementById("units");			
			let agree		= document.getElementById("agreeConfig");			
			let recieve			= document.getElementById("recipientGets");
			let sendCur			= document.getElementById("sellerCurrency");		
			let repCur			= document.getElementById("recipientCurrency");
			let isPeriodic		= document.getElementById("canAcceptPeriodic");
			
			let inner		= document.getElementsByClassName("input-group-append");		
			let symbol 		= document.querySelector("#symbol");
			let repSymbol 		= document.querySelector(".repSymbol");
			let button		= document.querySelector("#continue");
			let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
			let symbole 	= test;
			
			if( Scriptbill.l[note.noteAddress + '_storeName' ] ){
				storeName.value			= Scriptbill.l[note.noteAddress + '_storeName' ];
				storeName.setAttribute("disabled", "disabled" );
				storeShow.innerText		= storeName.value;
			}
			if( Scriptbill.l[note.noteAddress + '_storeAddress' ] ){
				storeAdd.value			= Scriptbill.l[note.noteAddress + '_storeAddress' ];
				storeAdd.setAttribute("disabled", "disabled" );
			}
			if( Scriptbill.l[note.noteAddress + '_storeUrl' ] ){
				if( productUrl )
					storeUrl.value			= productUrl;
				else
					storeUrl.value			= Scriptbill.l[note.noteAddress + '_storeUrl' ];
				
				storeUrl.setAttribute("disabled", "disabled" );
			} else if( productUrl ){
				storeUrl.value			= productUrl;
				storeUrl.setAttribute("disabled", "disabled" );
			}
			
			
			
			uploadImg.onchange = function(){
				let files = this.files;
				let reader = new FileReader();
				let text 	= reader.readAsDataURL( files[0] );
				reader.addEventListener("load", function(){
					let noteData 	= reader.result;
					Scriptbill.s.productImgURL = noteData;
					imageShow.src 		= Scriptbill.s.productImgURL;
					if( recipient.value ){
						productShow.innerText = recipient.value;
					}
					
					if( storeName.value ){
						storeShow.innerText 	= storeName.value;
					}
				});
			}
			
			let toPay 		= 0.25;
			let rates 		= 1;
			
			
			repCur.onchange = async function(){
				if( result[ this.value ] ){
					symbole 	= result[ this.value ].symbol;
				}
				let value 		= amount.value;
				if( this.value != test ){			
							
					repSymbol.innerHTML = symbole;
					let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
					
					if( rates ){
						rates = rates.rates;
					}				
					
					if( rates && rates[ this.value ] ){
						let rate = 1;
						if( sendCur.value != "USD" ){
							rate 		= 1/parseFloat(rates[sendCur.value]);
						} 
						if( this.value != "USD" ){
							rate 		= rate / ( 1/parseFloat(rates[this.value]) );
						}
						//exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
						Scriptbill.s.toPay = toPay;
						Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
						
					} else {
						//exchange.innerHTML = "exchange rate not available";
					}
				} else {
					repSymbol.innerHTML = symbole;
					//exchange.innerHTML = "";
				}
				
				//fees.innerHTML 	= ( value * toPay ).toFixed(4) + " " + test;
			}

			if( repCur.querySelector("option[value='"+test+"']") ){0
				inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
				repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
				repCur.setAttribute("disabled", "disabled");
			}
			
			amount.oninput = function(){
				
				let value = this.value.replaceAll(',','').split('.');
	/* await Scriptbill.createAlert( value[1] );			
	await Scriptbill.createAlert( value[0] ); */			
							
				if( typeof value == "object" && value[1] && value[1].length == 1 ){			
					let values = value[0].split('');
					let val = values[ values.length - 1 ];
					val 	+= value[1];
					//await Scriptbill.createAlert( val );
					value[1] = val;
					values.pop();
					value[0] = values.join('');
					this.value 		= value[0] + '.' + value[1];
				} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
					let values = value[1].split('');
					value[0] += values[0];
					values.splice(0,1);
					value[1] = values.join('');
					this.value 		= value[0] + '.' + value[1];
					//await Scriptbill.createAlert( this.value );
				}
				else if( ! value[1] ){
					this.value = "0.0" + value[0];
				}
				
				this.value 	= parseFloat( this.value.replaceAll(',','') );
				recieve.value = 	formatCurrency( parseFloat( ( this.value * rates ) - ( ( this.value * rates ) * toPay ) ) );
				this.value = formatCurrency( this.value );
				
			}
			recieve.value 		= "";
			//recieve.setAttribute("disabled", "disabled");
			
			recieve.oninput = function(){
				let value = this.value.replaceAll(',','').split('.');
						
				if( typeof value == "object" && value[1] && value[1].length == 1 ){			
					let values = value[0].split('');
					let val = values[ values.length - 1 ];
					val 	+= value[1];
					//await Scriptbill.createAlert( val );
					value[1] = val;
					values.pop();
					value[0] = values.join('');
					this.value 		= value[0] + '.' + value[1];
				} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
					let values = value[1].split('');
					value[0] += values[0];
					values.splice(0,1);
					value[1] = values.join('');
					this.value 		= value[0] + '.' + value[1];
					//await Scriptbill.createAlert( this.value );
				}
				else if( ! value[1] ){
					this.value = "0.0" + value[0];
				}
				
				this.value 	= parseFloat( this.value.replaceAll(',','') );
				amount.value = 	formatCurrency( parseFloat( ( ( this.value * rates ) / ( 1 - toPay ) ) ) );
				this.value = formatCurrency( this.value );
			}

			
			recipient.oninput = function(){
				let text = productShow.innerText;
				
				if( Scriptbill.s.productImgURL ){
					productShow.innerText = this.value;
				} else {
					if( ! productShow.innerText.includes( "for" ) )
						productShow.innerText = text + " for " + this.value;
					else{
						text = productShow.innerText.split(" for " );
						productShow.innerText 	= text[0] + " for " + this.value;
					}
				}
			}
			storeName.oninput = function(){
				let text = storeShow.innerText;
				
				if( Scriptbill.s.productImgURL ){
					storeShow.innerText = this.value;
				} else {
					if( ! storeShow.innerText.includes( "for" ) )
						storeShow.innerText = text + " for " + this.value;
					else{
						text = storeShow.innerText.split(" for " );
						storeShow.innerText 	= text[0] + " for " + this.value;
					}
				}
			}
			
			
			let tests 		= Object.keys( result );
			let options		= sendCur.querySelectorAll("option"), index;
			for( let x = 0; x < options.length; x++ ){
				if( tests.indexOf( options[x].innerText ) < 0 ) continue;
				index 				= tests.indexOf( options[x].innerText );
				options[x].value 	= tests[index];
			}
					
			 if( result[test] ){
				symbole 		= result[test].symbol;
			}
			symbol.innerHTML 	= symbole;
			repSymbol.innerHTML = symbole;
			
			if( sendCur.querySelector("option[value='"+test+"']") ){			
				inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
				sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			}

			agree.onchange = function(e){
				e.preventDefault();
				if( this.value == 'returnPeriodic' ){
					periodic.parentElement.parentElement.style.display 	= "block";
					somer.parentElement.style.display 		= "none";
				}
				else if( this.value == 'returnSome' ){
					periodic.parentElement.parentElement.style.display 	= "none";
					somer.parentElement.style.display 		= "block";
				}
			}
					
			desc.value = "";	
			amount.value = "";

			periodic.style.width = "60%";
			periodSpan.parentElement.style.width = "30%";
			periodic.parentElement.style.display = "flex";
			periodic.parentElement.style.justifyContent = "space-between";
			
				
			
			button.onclick 		= async function(e){
				e.preventDefault();			
				 let sendConfig = {};
				
				if( ! agree.value ){
					await Scriptbill.createAlert( "You'll Need to Configure the agreement for your product" );
					return;
				}
				
				if( ! storeName.value ){
					await Scriptbill.createAlert("You need a store name for your product");
					return;
				} else {
					sendConfig.storeName = storeName.value;
					Scriptbill.l[note.noteAddress + '_storeName' ] = sendConfig.storeName;
				}
				
				if( ! storeAdd.value ){
					await Scriptbill.createAlert("You need a store address for your product, used to uniquify your store ID.");
					return;
				} else {
					sendConfig.storeAddress = storeAdd.value;
					Scriptbill.l[note.noteAddress + '_storeAddress' ] = sendConfig.storeAddress;
				}
				
				sendConfig.agreementType 		= agree.value;
								
				if( enddate.value ){
					sendConfig.agreementExpiry 	= enddate.value;
				}
				
				if( desc.value ){
					sendConfig.description 		= desc.value;
				}
				
				if( periodic.value ){
					sendConfig.periodic 		= periodic.value;
					
					if( ! periodSpan.value ){
						await Scriptbill.createAlert("please set a periodic span for your periodic value");
						return;
					}
					
					else
						sendConfig.periodicSpan = periodSpan.value;
				}
				
				if( somer.value ){
					sendConfig.returnSome 		= somer.value;
				}
				
				if( sendCur.value ){
					sendConfig.currency 		= sendCur.value;
				} else {
					await Scriptbill.createAlert("send currency can't be empty!");
					return;
				}
				
				if( amount.value )
					sendConfig.value = parseFloat( amount.value.replaceAll(',','') );
				
				else {
					await Scriptbill.createAlert("Enter a valid amount");
					return false;
				}
				
				if( recipient.value ){
					sendConfig.recipient 	= recipient.value;
					
					sendConfig.recipientType 	= "product";
				} else {
					await Scriptbill.createAlert(" enter a Product Name!");
					return;
				}
				
				if( isPeriodic.value ){
					sendConfig.canSubscribe 	= isPeriodic.value;
				}
				
				if( storeUrl.value ){
					sendConfig.storeUrl 		= storeUrl.value;
					
					if( ! productUrl )
						Scriptbill.l[note.noteAddress + '_storeUrl' ] = storeUrl.value;
				}
				this.innerText 					= "Please Wait...";
				if( Scriptbill.s.productImgURL ){
					sendConfig.productImgURL 	= Scriptbill.s.productImgURL;
				}			
				Scriptbill.blockId 					= note.blockID;
				let block 							= await Scriptbill.getTransBlock();
				block 								= block[0];
						
				
				Scriptbill.details 					= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
				
				if( ! productUrl ){
					Scriptbill.details.transType 		= "CREDIT";
					Scriptbill.details.transValue 		= sendConfig.value;
					Scriptbill.details.recipient 		= sendConfig.recipient;
					Scriptbill.details.agreement 		= await Scriptbill.createAgreement("", block);
					Scriptbill.details.agreement.agreeType 		= "PRODUCT";
					Scriptbill.details.agreement.name 		= sendConfig.recipient;
					Scriptbill.details.agreement.isPeriodic		= sendConfig.periodic ? true : false;
					let date 							= new Date( sendConfig.agreementExpiry );
					Scriptbill.details.agreement.ExecTime		=	date.getTime();
					
					if( Scriptbill.details.agreement.isPeriodic ){
						let calc 		= Scriptbill.calculateTime( Scriptbill.details.agreement.payPeriod  );
						let times 		= Math.round( Scriptbill.details.agreement.ExecTime / calc );
						Scriptbill.details.agreement.times 	= times;
						Scriptbill.details.agreement.payPeriod 		= sendConfig.periodic + " " + sendConfig.periodicSpan;
					}		
					
					Scriptbill.details.agreement.value 			= sendConfig.returnSome ? sendConfig.returnSome : sendConfig.value;
					Scriptbill.details.agreement.productValue 	= sendConfig.value;
					Scriptbill.details.agreement.units 			= units.value;
					Scriptbill.string 					= sendConfig.storeName + sendConfig.storeAddress;
					Scriptbill.details.agreement.storeID 	= Scriptbill.hashed();
					
					if( sendConfig.productImgURL )
						Scriptbill.details.agreement.productIMG = sendConfig.productImgURL;
					
					if( sendConfig.storeUrl )
						Scriptbill.details.agreement.storeUrl = sendConfig.storeUrl;
					
					Scriptbill.details.note 			= sendConfig.description;
					Scriptbill.details.agreement.description = sendConfig.description;
					Scriptbill.details.agreement.storeName  = sendConfig.storeName;
					Scriptbill.details.agreement.storeAddress = sendConfig.storeAddress;
					Scriptbill.details.agreement.canSubscribe = sendConfig.canSubscribe;
					Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details, false ).then( block =>{
						console.log(block , "found" );
						if( block && block.transType == "CREDIT" ){
							sendConfig.block 			=		JSON.parse( JSON.stringify( block ));
							Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
							Scriptbill.s.requestProcessing		= 'TRUE';
							this.innerText 	= "Successful";
							setTimeout(()=>{
								location.href = requestSuccess;
							}, 5000);
							
						} else {
							this.innerText 	= "Unsuccessful";
							let url = new URL( requestSuccess );
							url.searchParams.set("error", "true");
							var error = JSON.parse( Scriptbill.s.eMessages );
							var keys 	= Object.keys( error );
							keys 		= keys.reverse();
							document.getElementById("error").innerHTML = error[keys[0]];
							setTimeout(()=>{
								location.reload();
							}, 15000);
						}
					});
				}
				else {
					Scriptbill.productConfig.value 	= amount.value;
					Scriptbill.productConfig.name 	= recipient.value;
					Scriptbill.productConfig.description 	= description.value;
					Scriptbill.productConfig.units 	= units.value;
					Scriptbill.defaultAgree.description = sendConfig.description;
					Scriptbill.defaultAgree.storeName  = sendConfig.storeName;
					Scriptbill.defaultAgree.storeAddress = sendConfig.storeAddress;
					Scriptbill.defaultAgree.canSubscribe = sendConfig.canSubscribe;
					Scriptbill.defaultAgree.recipient 		= sendConfig.recipient;
					Scriptbill.defaultAgree.agreeType 		= "PRODUCT";
					Scriptbill.defaultAgree.name 		= sendConfig.recipient;
					Scriptbill.defaultAgree.isPeriodic		= sendConfig.periodic ? true : false;
					let date 							= new Date( sendConfig.agreementExpiry );
					Scriptbill.defaultAgree.ExecTime		=	date.getTime();
					
					if( Scriptbill.defaultAgree.isPeriodic ){
						Scriptbill.defaultAgree.payPeriod 		= sendConfig.periodic + " " + sendConfig.periodicSpan;
						let calc 		= Scriptbill.calculateTime( Scriptbill.details.agreement.payPeriod  );
						let times 		= Math.round( Scriptbill.details.agreement.ExecTime / calc );
						Scriptbill.defaultAgree.times 	= times;
						
					}		
					
					Scriptbill.defaultAgree.value 			= sendConfig.returnSome ? sendConfig.returnSome : sendConfig.value;
					Scriptbill.create_product().then( async product =>{
						if( product && product.transType == "CREATEPRODUCT" ){
							sendConfig.block 			=		JSON.parse( JSON.stringify( product ));
							Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
							Scriptbill.s.requestProcessing		= 'TRUE';
							this.innerText 	= "Successful";
							setTimeout(async ()=>{
								url 			= new URL( createAds );
								url.searchParams.set("productID", product.productID );
								await Scriptbill.createAlert("You can now continue to create ads for this product. You can always do this whenever you like.");
								location.href = url.href;
							}, 5000);
							
						} else {
							this.innerText 	= "Unsuccessful";
							let url = new URL( requestSuccess );
							url.searchParams.set("error", "true");
							setTimeout(()=>{
								location.reload();
							}, 5000);
						}
					});
				}
				
			} 		
			//sendCur.setAttribute("disabled", "disabled");		
			
		});
		$(function() {
			'use strict';
			// Payment due by
			$('#paymentDue').daterangepicker({
				singleDatePicker: true,
				minDate: moment(),
				autoUpdateInput: false,
				}, function(chosen_date) {
			  $('#paymentDue').val(chosen_date.format('MM-DD-YYYY'));
			  });
		  });
	}	  
}

if( location.href.includes( createItem )){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let url, productUrl;
	
	loadingDiv();
	try {
		url 		= new URL( location.href );
		productUrl 	= url.searchParams.get("url");
	} catch(e){
		productUrl 	= null;
	} finally {
	
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		
		fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
			let enddate	 	= document.getElementById("paymentDue");
			let execDate 	= document.getElementById("executionDate");
			let recipient	= document.getElementById("productName");
			let storeName	= document.getElementById("storeName");
			let storeUrl	= document.getElementById("storeUrl");
			let storeAdd	= document.getElementById("storeAddress");
			let phone		= document.getElementById("merchantPhone");
			let email		= document.getElementById("merchantEmail");
			let address		= document.getElementById("merchantAdd");
			let country		= document.getElementById("businessCountry");
			//let uploadImg	= document.getElementById("customFile");
			let imageShow	= document.getElementById("rankImage");/* 
			let productShow	= document.getElementById("productNameView");
			let storeShow	= document.getElementById("storeNameView"); */
			let desc		= document.getElementById("description");
			let periodic	= document.getElementById("periodic");
			let periodicItem	= document.getElementById("periodicItem");
			let periodSpan 	= document.getElementById("PeriodSpan");
			let periodItemSpan 	= document.getElementById("PeriodItemSpan");
			let somer		= document.getElementById("somer");
			let amount		= document.getElementById("amount");			
			let units		= document.getElementById("units");			
			let agree		= document.getElementById("agreeConfig");			
			let recieve			= document.getElementById("recipientGets");
			let sendCur			= document.getElementById("sellerCurrency");		
			let repCur			= document.getElementById("recipientCurrency");
			let isPeriodic		= document.getElementById("canAcceptPeriodic");
			
			let inner		= document.getElementsByClassName("input-group-append");		
			let symbol 		= document.querySelector("#symbol");
			let repSymbol 		= document.querySelector(".repSymbol");
			let button		= document.querySelector("#continue");
			let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
			let symbole 	= test;
			
			if( ! note.budgetID ){
				removeLoadingDiv();
				await Scriptbill.createAlert("Your note is not eligible to create items for a budget.");
				location.href 		= dashboardUrl;
				return;
			}
			
			
			let budgetBlock 			= await Scriptbill.getCurrentBudgetBlock( note.budgetID );
			
			if( ! budgetBlock || ! budgetBlock.agreement || ! budgetBlock.agreement.budgetID ){
				removeLoadingDiv();
				await Scriptbill.createAlert("Your note's doesn't point to an eligible budget. Please log in a valid budget note and try again.");
				location.href = dashboardUrl;
				return;
			}
			
			removeLoadingDiv();
			
			let budget 		= JSON.parse( JSON.stringify( budgetBlock.agreement ));
			
			 if( productUrl ){
				storeUrl.value			= productUrl;
			}
			
			if( budget.budgetCredit  && ! result[ test ] ){
				test 		= budget.budgetCredit.slice( 0, budget.budgetCredit.lastIndexOf("CRD"));
			}
			
			if( budget.budgetID ){
				recipient.value = budget.budgetID;
				recipient.setAttribute("disabled", "disabled");
			}
			
			
			let toPay 		= 0.25;
			let rates 		= 1;
			
			
			repCur.onchange = async function(){
				if( result[ this.value ] ){
					symbole 	= result[ this.value ].symbol;
				}
				let value 		= amount.value;
				if( this.value != test ){			
							
					repSymbol.innerHTML = symbole;
					let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
					
					if( rates ){
						rates = rates.rates;
					}				
					
					if( rates && rates[ this.value ] ){
						let rate = 1;
						if( sendCur.value != "USD" ){
							rate 		= 1/parseFloat(rates[sendCur.value]);
						} 
						if( this.value != "USD" ){
							rate 		= rate / ( 1/parseFloat(rates[this.value]) );
						}
						//exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
						Scriptbill.s.toPay = toPay;
						Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
						
					} else {
						//exchange.innerHTML = "exchange rate not available";
					}
				} else {
					repSymbol.innerHTML = symbole;
					//exchange.innerHTML = "";
				}
				
				//fees.innerHTML 	= ( value * toPay ).toFixed(4) + " " + test;
			}

			if( repCur.querySelector("option[value='"+test+"']") ){
				inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
				repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
				repCur.setAttribute("disabled", "disabled");
			}
			
			amount.oninput = function(){
				
				let value = this.value.replaceAll(',','').split('.');
	/* await Scriptbill.createAlert( value[1] );			
	await Scriptbill.createAlert( value[0] ); */			
							
				if( typeof value == "object" && value[1] && value[1].length == 1 ){			
					let values = value[0].split('');
					let val = values[ values.length - 1 ];
					val 	+= value[1];
					//await Scriptbill.createAlert( val );
					value[1] = val;
					values.pop();
					value[0] = values.join('');
					this.value 		= value[0] + '.' + value[1];
				} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
					let values = value[1].split('');
					value[0] += values[0];
					values.splice(0,1);
					value[1] = values.join('');
					this.value 		= value[0] + '.' + value[1];
					//await Scriptbill.createAlert( this.value );
				}
				else if( ! value[1] ){
					this.value = "0.0" + value[0];
				}
				
				this.value 	= parseFloat( this.value.replaceAll(',','') );
				recieve.value = 	formatCurrency( parseFloat( ( this.value * rates ) - ( ( this.value * rates ) * toPay ) ) );
				this.value = formatCurrency( this.value );
				
			}
			recieve.value 		= "";
			let productNote 	= await Scriptbill.getCurrentExchangeNote( budget.stockID );
			
			if( productNote && productNote.exchangeValue ){
				recieve.value 		= formatCurrency( parseFloat( productNote.exchangeValue ));
				recieve.setAttribute("disabled", "disabled");
			}
			//			
			
			let tests 		= Object.keys( result );
			let options		= sendCur.querySelectorAll("option"), index;
			for( let x = 0; x < options.length; x++ ){
				if( tests.indexOf( options[x].innerText ) < 0 ) continue;
				index 				= tests.indexOf( options[x].innerText );
				options[x].value 	= tests[index];
			}
					
			 if( result[test] ){
				symbole 		= result[test].symbol;
			}
			symbol.innerHTML 	= symbole;
			repSymbol.innerHTML = symbole;
			
			if( sendCur.querySelector("option[value='"+test+"']") ){			
				inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
				sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			}

			agree.onchange = function(e){
				e.preventDefault();
				if( this.value == 'returnPeriodic' ){
					periodic.parentElement.parentElement.style.display 	= "block";
					somer.parentElement.style.display 		= "none";
				}
				else if( this.value == 'returnSome' ){
					periodic.parentElement.parentElement.style.display 	= "none";
					somer.parentElement.style.display 		= "block";
				}
			}
			
			isPeriodic.onchange = function(e){
				e.preventDefault();
				if( this.value == 'yes' ){
					units.parentElement.style.display 		= "block";
					periodicItem.parentElement.parentElement.style.display 	= "block";
				}
				else{
					units.parentElement.style.display 		= "none";
					periodicItem.parentElement.parentElement.style.display 	= "none";
				}
			}
					
			desc.value = "";	
			amount.value = "";

			periodic.style.width = "60%";
			periodicItem.style.width = "60%";
			periodSpan.parentElement.style.width = "30%";
			periodItemSpan.parentElement.style.width = "30%";
			periodic.parentElement.style.display = "flex";
			periodicItem.parentElement.style.display = "flex";
			periodic.parentElement.style.justifyContent = "space-between";
			periodicItem.parentElement.style.justifyContent = "space-between";
			
				
			
			button.onclick 		= async function(e){
				e.preventDefault();			
				 let sendConfig = {};
				 let itemConfig 	= JSON.parse( JSON.stringify( Scriptbill.defaultItem ));
				 itemConfig.agreement = JSON.parse( JSON.stringify( Scriptbill.defaultAgree ));
				
				if( ! agree.value ){
					await Scriptbill.createAlert( "You'll Need to Configure the agreement for your item" );
					return;
				}
				
				if( ! storeName.value ){
					await Scriptbill.createAlert("You need a unique name for your budget item");
					return;
				} else {
					sendConfig.storeName 	= storeName.value;
					itemConfig.itemName 	= storeName.value;
				}
				
				if( ! storeAdd.value ){
					await Scriptbill.createAlert("You need a note address for your budget item, used to direct the execution of your item to a particular note. This must be a credit note or a product note.");
					return;
				} else {
					sendConfig.sendAddress = storeAdd.value;
					itemConfig.scriptbillAddress = storeAdd.value;
				}
				
				sendConfig.agreementType 		= agree.value;
				let currentTime 	= Date.now();
				let newdate			= new Date( Date.now());
				let date 			= new Date( Date.now());
				
				if( enddate.value ){
					sendConfig.agreementExpiry 	= enddate.value;
					date 		= new Date( enddate.value );
				}
				
				if( execDate.value ){
					sendConfig.budgetExecutionTime = execDate.value;
					newdate		= new Date( execDate.value );
				}
				
				if( newdate.getTime() > date.getTime() ){
					await Scriptbill.createAlert("Budget Execution Date can't be greater than the agreement expiry date.");
					return;
				}
				
				itemConfig.execTime 		= Scriptbill.timeToString(currentTime - newdate.getTime());
				itemConfig.agreement.ExecTime 	= date.getTime();
				
				if( desc.value ){
					sendConfig.description 		= desc.value;
				}
				
				if( periodic.value ){
					sendConfig.periodic 		= periodic.value;
					
					if( ! periodSpan.value ){
						await Scriptbill.createAlert("please set a periodic span for your period.");
						return;
					}
					
					else
						sendConfig.periodicSpan = periodSpan.value;
				}
				
				if( periodicItem.value ){
					sendConfig.periodicItem 		= periodicItem.value;
					
					if( ! periodItemSpan.value ){
						await Scriptbill.createAlert("please set a periodic span for your next execution period.");
						return;
					}
					
					else
						sendConfig.periodItemSpan = periodItemSpan.value;
					
					
				}
				
				if( somer.value ){
					sendConfig.returnSome 		= somer.value;
					itemConfig.agreement.value  = somer.value;
				}
				
				if( sendCur.value ){
					sendConfig.currency 		= sendCur.value;
				} else {
					await Scriptbill.createAlert("send currency can't be empty!");
					return;
				}
				
				if( amount.value ){
					sendConfig.value = parseFloat( amount.value.replaceAll(',','') );
					itemConfig.itemValue = sendConfig.value;
					
					if( agree.value == "returnMoney" || agree.value == "returnPeriodic" ){
						itemConfig.agreement.value = sendConfig.value;
						
						if( agree.value == "returnPeriodic" ){
							itemConfig.agreement.isPeriodic	= true;
							itemConfig.agreement.payPeriod 		= sendConfig.periodic + " " + sendConfig.periodicSpan;
							let calc 		= Scriptbill.calculateTime( itemConfig.agreement.payPeriod  );
							let times 		= Math.round( itemConfig.agreement.ExecTime / calc );
							itemConfig.agreement.times 	= times;
							
						}
					} else if( ! somer.value ){
						await Scriptbill.createAlert("You need to configure the amount you want to be returned when agreement fails");
						return;
					} else {
						itemConfig.agreement.value = parseFloat( somer.value.replaceAll(',','') );
					}
				}
				
				else {
					await Scriptbill.createAlert("Enter a valid amount");
					return;
				}
				
				if( recipient.value ){
					sendConfig.recipient 	= recipient.value;
					itemConfig.budgetID 	= recipient.value;
					
					sendConfig.recipientType 	= "product";
				} else {
					await Scriptbill.createAlert(" enter a Product Name!");
					return;
				}
				
				if( isPeriodic.value == "yes" ){
					sendConfig.isPeriodicItem 	= isPeriodic.value;
					itemConfig.isPeriodic	 	= true;
					
					if( ! units.value ){
						await Scriptbill.createAlert(" enter a How many times your budget item will run!");
						return;
					}
					else if( units.value == "0" ){
						itemConfig.times 		= Infinity;
					} else {
						itemConfig.times 		= parseInt( units.value );
					}
					
					if( ! sendConfig.periodicItem ){
						await Scriptbill.createAlert("Set a periodic time for your budget");
						return;
					}
					
					itemConfig.waitPeriod 		= sendConfig.periodicItem + " " + sendConfig.periodItemSpan;
				} else {
					itemConfig.isPeriodic	 	= false;
				}
				
				if( storeUrl.value ){
					sendConfig.storeUrl 		= storeUrl.value;					
					itemConfig.storeUrl 			= storeUrl.value;
				}
				
				if( email.value ){
					sendConfig.businessEmail 	= email.value;
					itemConfig.businessEmail	= email.value;
				}
				
				if( phone.value ){
					sendConfig.businessPhone 	= phone.value;
					itemConfig.businessPhone	= phone.value;					
				}
				
				if( address.value ){
					sendConfig.businessAddress 	= address.value;
					itemConfig.businessAddress	= address.value;					
				}
				
				if( country.value ){
					sendConfig.businessCountry 	= country.value;
					itemConfig.businessCountry	= country.value;					
				}
				
				this.innerText 					= "Please Wait...";
										
				
				Scriptbill.defaultItem 					= JSON.parse( JSON.stringify( itemConfig ));
				
				Scriptbill.createScriptbillBudgetItem( sendConfig.recipient ).then( async block =>{
					if( block && block.transType == "ADDITEM" && block.agreement && block.agreement.item ){
						sendConfig.block 			=		JSON.parse( JSON.stringify( block ));
						Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
						Scriptbill.s.requestProcessing		= 'TRUE';
						this.innerText 						= "Successful";
						block.agreement.blockID 			= block.blockID;
						await Scriptbill.getData("itemConfig", Scriptbill.Base64.encode(JSON.stringify( block.agreement ) ), SERVER );
						setTimeout(()=>{
							let url 	= new URL( requestSuccess );
							url.searchParams.set("addItem", "true" );
							location.href = url.href;
						}, 5000);
						
					} else {
						this.innerText 	= "Unsuccessful";
						let url = new URL( requestSuccess );
						url.searchParams.set("error", "true");
						var error = JSON.parse( Scriptbill.s.eMessages );
						var keys 	= Object.keys( error );
						keys 		= keys.reverse();
						document.getElementById("error").innerHTML = error[keys[0]];
						setTimeout(()=>{
							location.reload();
						}, 10000);
					}
				});			
			} 		
			//sendCur.setAttribute("disabled", "disabled");		
			
		});
		$(function() {
			'use strict';
			// Payment due by
			$('#paymentDue').daterangepicker({
				singleDatePicker: true,
				minDate: moment(),
				autoUpdateInput: false,
				}, function(chosen_date) {
			  $('#paymentDue').val(chosen_date.format('MM-DD-YYYY'));
			  });
		  });
		  $(function() {
			'use strict';
			// Payment due by
			$('#executionDate').daterangepicker({
				singleDatePicker: true,
				minDate: moment(),
				autoUpdateInput: false,
				}, function(chosen_date) {
			  $('#executionDate').val(chosen_date.format('MM-DD-YYYY'));
			  });
		  });
	}	  
}

if( location.href.includes( createAds )){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	let url, productID, budgetUrl;
	try {
		url 			= new URL( location.href );
		productID 		= url.searchParams.get("productID");
		budgetUrl 		=   url.searchParams.get("url");
		
		if( ! productID ){	
			location.href = dashboardUrl;
		}
		
	} catch(e){
		location.href = dashboardUrl;
	}
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		let enddate	 	= document.getElementById("paymentDue");
		let recipient	= document.getElementById("productName");
		let adsHead		= document.getElementById("storeName");
		let storeUrl	= document.getElementById("storeUrl");
		let postUrl		= document.getElementById("postUrl");
		let storeAdd	= document.getElementById("storeAddress");
		let uploadImg	= document.getElementById("customFile");
		let imageShow	= document.getElementById("rankImage");
		let productShow	= document.getElementById("productNameView");
		let storeShow	= document.getElementById("storeNameView");
		let desc		= document.getElementById("description");
		let videoUrl	= document.getElementById("videoUrl");
		let amount		= document.getElementById("amount");			
		let viewNumber		= document.getElementById("viewNumber");			
		let viewShare		= document.getElementById("viewShare");			
		let pubNumber		= document.getElementById("pubNumber");			
		let pubShare		= document.getElementById("pubShare");			
		let adsScope		= document.getElementById("agreeConfig");	
		let adsScopeHld		= document.getElementById("avert-scope-placeholder");	
		let IntScope		= document.getElementById("interestScope");	
		let IScopeHld		= document.getElementById("interest-placeholder");	
		let sendCur			= document.getElementById("sellerCurrency");
		
		let inner		= document.getElementsByClassName("input-group-append");		
		let symbol 		= document.querySelector("#symbol");
		let button		= document.querySelector("#continue");
		let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 	= test;
		let budgetConfig = null;
		if( ! productID && budgetUrl ){
			let budgetConfig 	= await Scriptbill.getData(["getBudget", "webUrl"], ["true", budgetUrl], Scriptbill.getDefaultServer());
			
			//the default product is used as the product id.
			if( budgetConfig && budgetConfig.productID )			
				recipient.value 	= budgetConfig.productID;
			
			else if( budgetConfig && budgetConfig.budgetID )
				recipient.value 	= budgetConfig.budgetID;
			
			else 
				location.href 		= dashboardUrl;
		} else {		
			recipient.value = productID;
		}
		
		recipient.setAttribute("disabled", "disabled");
		var event = new Event('input', {
			bubbles: true,
			cancelable: true,
		});
		recipient.dispatchEvent(event);
		
		if( Scriptbill.l[note.noteAddress + '_storeAddress' ] ){
			storeAdd.value			= Scriptbill.l[note.noteAddress + '_storeAddress' ];
			storeAdd.setAttribute("disabled", "disabled" );
		}
		
		let accountData 		= await getAccountData();
		if( accountData && accountData.owner ){
			storeUrl.value			= accountData.owner;
			storeUrl.setAttribute("disabled", "disabled" );
		}
		else if( ! accountData || ! accountData.owner || ! budgetUrl || accountData.owner != budgetUrl ){
			if( ! budgetUrl )
				location.href 	= dashboardUrl;
			
			await Scriptbill.createAlert( "You Don't Appear to Be the Owner of this Website, this shows you are creating this ads on behalf of the owner" );
			
			storeUrl.value			= budgetUrl;
			storeUrl.setAttribute("disabled", "disabled" );
			
		}
		
		uploadImg.onchange = function(){
			let files = this.files;
			let reader = new FileReader();
			let text 	= reader.readAsDataURL( files[0] );
			reader.addEventListener("load", function(){
				let noteData 	= reader.result;
				Scriptbill.s.productImgURL = noteData;
				imageShow.src 		= Scriptbill.s.productImgURL;
				if( recipient.value ){
					productShow.innerText = recipient.value;
				}
				
				if( adsHead.value ){
					storeShow.innerText 	= adsHead.value;
				}
			});
		}
		
		let toPay 		= 0.25;
		let rates 		= 1;	
				
		amount.oninput = function(){
			
			let value = this.value.replaceAll(',','').split('.');
/* await Scriptbill.createAlert( value[1] );			
await Scriptbill.createAlert( value[0] ); */			
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				let val = values[ values.length - 1 ];
				val 	+= value[1];
				//await Scriptbill.createAlert( val );
				value[1] = val;
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
				//await Scriptbill.createAlert( this.value );
			}
			else if( ! value[1] ){
				this.value = "0.0" + value[0];
			}
			
			this.value 	= parseFloat( this.value.replaceAll(',','') );
			
			this.value = formatCurrency( this.value );
			
		}
		//recieve.setAttribute("disabled", "disabled");	
		recipient.oninput = function(){
			let text = productShow.innerText;
			
			if( Scriptbill.s.productImgURL ){
				productShow.innerText = this.value;
			} else {
				if( ! productShow.innerText.includes( "for" ) )
					productShow.innerText = text + " for " + this.value;
				else{
					text = productShow.innerText.split(" for " );
					productShow.innerText 	= text[0] + " for " + this.value;
				}
			}
		}
		adsHead.oninput = function(){
			let text = storeShow.innerText;
			
			if( Scriptbill.s.productImgURL ){
				storeShow.innerText = this.value;
			} else {
				if( ! storeShow.innerText.includes( "for" ) )
					storeShow.innerText = text + " for " + this.value;
				else{
					text = storeShow.innerText.split(" for " );
					storeShow.innerText 	= text[0] + " for " + this.value;
				}
			}
		}
		
		
		let tests 		= Object.keys( result );
		let options		= sendCur.querySelectorAll("option"), index;
		for( let x = 0; x < options.length; x++ ){
			if( tests.indexOf( options[x].innerText ) < 0 ) continue;
			index 				= tests.indexOf( options[x].innerText );
			options[x].value 	= tests[index];
		}
				
		 if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){			
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
		}

		adsScope.onchange = function(e){
			e.preventDefault();
			let value = this.value;
			let span  = document.createElement("span");
			span.innerText = value;
			span.setAttribute("style", "color:black; padding:5px; background-color:grey;position:relative; border-radius:8px;");
			let close = document.createElement("i");
			close.setAttribute("class", "fas fa-times");
			let values = adsScopeHld.getAttribute("data-values");
			
			if( ! values )
				values 		= "";
			
			values 		= values.split(",");
			
			close.addEventListener("click", function(){
				span.remove();
				values.splice( values.indexOf( this.getAttribute("data-text") ), 1 );
				adsScopeHld.setAttribute("data-values", values.toString() );
			}, false);
			close.setAttribute("style", "font-size:5px; position:absolute; right:1px; top:1px;");
			span.appendChild( close );
			adsScopeHld.setAttribute("style", "display:flex; flex-wrap:wrap; gap:3px; width:70%; height:auto;");
			
			
			if( ! values.includes( value ) ){
				adsScopeHld.appendChild( span );
				values.push( value );
				adsScopeHld.setAttribute("data-values", values.toString() );
			}
		}
		
		IntScope.onchange = function(e){
			e.preventDefault();
			let value = this.value;
			let span  = document.createElement("span");
			span.innerText = value;
			span.setAttribute("style", "color:black; padding:5px; background-color:grey;position:relative; border-radius:8px;");
			let close = document.createElement("i");
			close.setAttribute("class", "fas fa-times");
			let values = IScopeHld.getAttribute("data-values");
			
			if( ! values )
				values 		= "";
			
			values 		= values.split(",");
			
			close.addEventListener("click", function(){
				span.remove();
				values.splice( values.indexOf( this.getAttribute("data-text") ), 1 );
				IScopeHld.setAttribute("data-values", values.toString() );
			}, false);
			close.setAttribute("style", "font-size:5px; position:absolute; right:1px; top:1px;");
			span.appendChild( close );
			IScopeHld.setAttribute("style", "display:flex; flex-wrap:wrap; gap:3px; width:70%; height:auto;");
			
			
			if( ! values.includes( value ) ){
				IScopeHld.appendChild( span );
				values.push( value );
				IScopeHld.setAttribute("data-values", values.toString() );
			}
		}
				
		desc.value = "";	
		amount.value = "";
	
		
		button.onclick 		= async function(e){
			e.preventDefault();			
			 let sendConfig = {};
			
			if( IScopeHld.getAttribute("data-values") ){
				Scriptbill.adsConfig.interest = IScopeHld.getAttribute("data-values").split(",");
			}
			
			if( adsScopeHld.getAttribute("data-values") ){
				Scriptbill.adsConfig.scope = adsScopeHld.getAttribute("data-values").split(",");
			}
			
			if( ! recipient.value ){
				await Scriptbill.createAlert("We need a product ID of the product on the Scriptbill database you are trying to promote. You can find this product on the transactional information when you create the product.");
				return;
			} else {
				Scriptbill.adsConfig.productID 	= recipient.value;
				sendConfig.productID 			= recipient.value;
			}
			
			if( ! viewNumber.value ){
				await Scriptbill.createAlert("Please enter how much viewers you are expecting from your advert. This will help us calculate how much we will share with your viewers.");
				return;
			} else {
				if( ! viewShare.value ){
					await Scriptbill.createAlert("Please enter the share you want to give to your viewers");
					return;
				} else {
					if( ! amount.value ){
						await Scriptbill.createAlert("Please enter an advert budget amount");
						return;
					} else {
						amount 	= amount.value;
						let minimum = 0.001;//in dollars
						if( sendCur.value != "USD" ){
							let exValue 	= await Scriptbill.getExchangeValue(sendCur.value + "CRD", "USDCRD");
							minimum 		= minimum * exValue[0];
						}
						let share 			= parseInt( viewShare.split("%")[0] ) / 100;
						let shareAmount 	= amount * share;
						
						if( shareAmount < minimum ){
							shareAmount 		= minimum;
							share 				= shareAmount / amount;
						}
						
						Scriptbill.adsConfig.viewers 	= Math.floor( amount / shareAmount );
						Scriptbill.adsConfig.viewersShare = share;
						sendConfig.viewers 	= Math.floor( amount / shareAmount );
						sendConfig.viewersShare = share;
						
					}
				}
			}
			
			if( ! pubNumber.value ){
				await Scriptbill.createAlert("Please enter how much publishers you are expecting from your advert. This will help us calculate how much we will share with your publishers.");
				return;
			} else {
				if( ! pubShare.value ){
					await Scriptbill.createAlert("Please enter the share you want to give to your publishers");
					return;
				} else {
					if( ! amount.value ){
						await Scriptbill.createAlert("Please enter an advert budget amount");
						return;
					} else {
						amount 	= amount.value;
						let minimum = 0.001;//in dollars
						if( sendCur.value != "USD" ){
							let exValue 	= await Scriptbill.getExchangeValue(sendCur.value + "CRD", "USDCRD");
							minimum 		= minimum * exValue[0];
						}
						let share 			= parseInt( viewShare.split("%")[0] ) / 100;
						let shareAmount 	= amount * share;
						
						if( shareAmount < minimum ){
							shareAmount 		= minimum;
							share 				= shareAmount / amount;
						}
						
						Scriptbill.adsConfig.publishers 	= Math.floor( amount / shareAmount );
						Scriptbill.adsConfig.publishersShare = share;
						sendConfig.publishers 	= Math.floor( amount / shareAmount );
						sendConfig.publishersShare = share;
					}
				}
			}
			
			if( ! clickNumber.value ){
				await Scriptbill.createAlert("Please enter how much Clickeers you are expecting from your advert. This will help us calculate how much we will share with your clickers.");
				return;
			} else {
				if( ! clickShare.value ){
					await Scriptbill.createAlert("Please enter the share you want to give to your Clickers");
					return;
				} else {
					if( ! amount.value ){
						await Scriptbill.createAlert("Please enter an advert budget amount");
						return;
					} else {
						amount 	= amount.value;
						let minimum = 0.001;//in dollars
						if( sendCur.value != "USD" ){
							let exValue 	= await Scriptbill.getExchangeValue(sendCur.value + "CRD", "USDCRD");
							minimum 		= minimum * exValue[0];
						}
						let share 			= parseInt( viewShare.split("%")[0] ) / 100;
						let shareAmount 	= amount * share;
						
						if( shareAmount < minimum ){
							shareAmount 		= minimum;
							share 				= shareAmount / amount;
						}
						
						Scriptbill.adsConfig.clickers 	= Math.floor( amount / shareAmount );
						Scriptbill.adsConfig.clickersShare = share;
						sendConfig.clickers 	= Math.floor( amount / shareAmount );
						sendConfig.clickersShare = share;
					}
				}
			}
			
			if( adsHead.value ){				
				Scriptbill.adsConfig.header = adsHead.value;
			}
			
			if( videoUrl.value ){				
				Scriptbill.adsConfig.videoUrl = videoUrl.value;
			}
						
			if( storeAdd.value ){
				Scriptbill.adsConfig.storeAddress = storeAdd.value;
			}
			
			if( storeUrl.value ){
				Scriptbill.adsConfig.storeUrl = storeUrl.value;
			}
			
			if( postUrl.value ){
				Scriptbill.adsConfig.postUrl = postUrl.value;
			}
			
							
			if( enddate.value ){
				Scriptbill.adsConfig.adsExpiry 	= enddate.value;
			}
			
			if( desc.value ){
				Scriptbill.adsConfig.description 		= desc.value;
				sendConfig.description 					= desc.value;
			}
			
			Scriptbill.details 		= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
						
			if( amount.value )
				Scriptbill.details.transValue = parseFloat( amount.value.replaceAll(',','') );
			
			else {
				await Scriptbill.createAlert("Enter a valid amount");
				return false;
			}
			
			Scriptbill.details.transType 		= "ADVERT";
			
			this.innerText 					= "Please Wait...";
			if( Scriptbill.s.productImgURL ){
				sendConfig.productImgURL 		= Scriptbill.s.productImgURL;
				Scriptbill.adsConfig.bannerUrl 	= Scriptbill.s.productImgURL;
			}
			Scriptbill.createAdvert( Scriptbill.details.transValue ).then( block =>{
				if( block && block.transType == "ADVERT" ){
					sendConfig.block 			=		JSON.parse( JSON.stringify( block ));
					Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
					Scriptbill.s.requestProcessing		= 'TRUE';
					this.innerText 	= "Successful";
					setTimeout(()=>{
						url 			= new URL( requestSuccess );
						url.searchParams.set("ads", "true");
						location.href = url.href;
					}, 5000);
					
				} else {
					this.innerText 	= "Unsuccessful";
					if( document.querySelector("#error") ){
						var errors = JSON.parse(Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
						var keys 	= Object.keys( errors );
						keys 		= keys.reverse();
						document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
					}
					setTimeout(()=>{
						location.reload();
					}, 15000);
				}
			});
			
		} 
		
		//sendCur.setAttribute("disabled", "disabled");		
		
	});
	$(function() {
		'use strict';
		// Payment due by
		$('#paymentDue').daterangepicker({
			singleDatePicker: true,
			minDate: moment(),
			autoUpdateInput: false,
			}, function(chosen_date) {
		  $('#paymentDue').val(chosen_date.format('MM-DD-YYYY'));
		  });
	  }); 
}
if( location.href.includes( sellWebsite )){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	let url, websiteUrl;
	try {
		url 	= new URL( location.href );
		websiteUrl 	= url.searchParams.get("url");
		
		if( ! websiteUrl )
			location.href = dashboardUrl;
		
		else {//coming back
			websiteUrl 	= new URL( websiteUrl );
			websiteUrl 	= websiteUrl.origin;
		}
		
	} catch(e){
		location.href = dashboardUrl;
	}
	
	if( ! navigator.onLine ){
		setTimeout( async ()=>{
			await Scriptbill.createAlert("Internet connection required to sell website");
			location.href = dashboardUrl;
		}, 1 );		
	}
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		// let enddate	 	= document.getElementById("paymentDue");
		// let recipient	= document.getElementById("productName");
		let storeName	= document.getElementById("storeName");
		let storeUrl	= document.getElementById("storeUrl");
		/* //let storeAdd	= document.getElementById("storeAddress");
		let uploadImg	= document.getElementById("customFile");
		let imageShow	= document.getElementById("rankImage");
		let productShow	= document.getElementById("productNameView");
		let storeShow	= document.getElementById("storeNameView");
		let desc		= document.getElementById("description");
		let periodic	= document.getElementById("periodic");
		let periodSpan 	= document.getElementById("PeriodSpan");
		let somer		= document.getElementById("somer") */;
		let amount		= document.getElementById("amount");			
		//let units		= document.getElementById("units");			
		//let agree		= document.getElementById("agreeConfig");			
		let recieve			= document.getElementById("recipientGets");
		let sendCur			= document.getElementById("sellerCurrency");		
		let repCur			= document.getElementById("recipientCurrency");
		//let isPeriodic		= document.getElementById("canAcceptPeriodic");
		
		let inner		= document.getElementsByClassName("input-group-append");		
		let symbol 		= document.querySelector("#symbol");
		let repSymbol 		= document.querySelector(".repSymbol");
		let button		= document.querySelector("#continue");
		let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 	= test;
		
		let budgetConfig = await Scriptbill.getData(["getBudget", "webUrl"], ["true", websiteUrl], Scriptbill.getDefaultServer());
		
		if( ! budgetConfig || ! budgetConfig[ note.noteAddress ] ){
			await Scriptbill.createAlert("This current note is not recognized as the owner of this website. Please login the note address used in purchasing this website to sell the website.");
			location.href = dashboardUrl;
			return;
		}
		
		if( budgetConfig['_storeName' ] ){
			storeName.value			= budgetConfig['_storeName' ];
			storeName.setAttribute("disabled", "disabled" );
			storeShow.innerText		= storeName.value;
		}
		if( budgetConfig[ '_storeAddress' ] ){
			storeAdd.value			= budgetConfig[ '_storeAddress' ];
			storeAdd.setAttribute("disabled", "disabled" );
		}
		if( budgetConfig[ '_storeUrl' ] ){
			storeUrl.value			= budgetConfig[ '_storeUrl' ] ;
			storeUrl.setAttribute("disabled", "disabled" );
		}
		if( budgetConfig[ 'value' ] ){
			amount.value			= budgetConfig[ 'value' ] ;
			amount.setAttribute("disabled", "disabled" );
		}		
				
		let toPay 		= 0.25;
		let rates 		= 1;
		
		
		repCur.onchange = async function(){
			if( result[ this.value ] ){
				symbole 	= result[ this.value ].symbol;
			}
			let value 		= amount.value;
			if( this.value != test ){			
						
				repSymbol.innerHTML = symbole;
				let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
				
				if( rates ){
					rates = rates.rates;
				}				
				
				if( rates && rates[ this.value ] ){
					let rate = 1;
					if( sendCur.value != "USD" ){
						rate 		= 1/parseFloat(rates[sendCur.value]);
					} 
					if( this.value != "USD" ){
						rate 		= rate / ( 1/parseFloat(rates[this.value]) );
					}
					//exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
					Scriptbill.s.toPay = toPay;
					Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
					
				} else {
					//exchange.innerHTML = "exchange rate not available";
				}
			} else {
				repSymbol.innerHTML = symbole;
				//exchange.innerHTML = "";
			}
			
			//fees.innerHTML 	= ( value * toPay ).toFixed(4) + " " + test;
		}
		let testCredit = budgetConfig.budgetCredit ? budgetConfig.budgetCredit.slice( 0, budgetConfig.budgetCredit.lastIndexOf("CRD")) : false;
		if( testCredit && repCur.querySelector("option[value='"+testCredit+"']") ){
			
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ testCredit.toLowerCase() +' mr-1"></i>&nbsp;' + testCredit.toUpperCase();
			repCur.querySelector("option[value='"+testCredit+"']").setAttribute("selected", "selected");
			repCur.setAttribute("disabled", "disabled");		
			
		} 
		else if( repCur.querySelector("option[value='"+test+"']") ){0
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
			repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			repCur.setAttribute("disabled", "disabled");
		}
		
	
		
		let tests 		= Object.keys( result );
		let options		= sendCur.querySelectorAll("option"), index;
		for( let x = 0; x < options.length; x++ ){
			if( tests.indexOf( options[x].innerText ) < 0 ) continue;
			index 				= tests.indexOf( options[x].innerText );
			options[x].value 	= tests[index];
		}
				
		 if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		repSymbol.innerHTML = symbole;
		
		
		if( testCredit && sendCur.querySelector("option[value='"+testCredit+"']") ){			
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+testCredit.toLowerCase()+' mr-1"></i>&nbsp;' + testCredit.toUpperCase();
			sendCur.querySelector("option[value='"+testCredit+"']").setAttribute("selected", "selected");
			sendCur.setAttribute("disabled", "disabled");
		}
		
		else if( sendCur.querySelector("option[value='"+test+"']") ){			
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			sendCur.setAttribute("disabled", "disabled");
		}

		
				
		desc.value = "";
		
			
		
		button.onclick 		= async function(e){
			e.preventDefault();			
			 let sendConfig = {};
			
			
			if( ! storeName.value ){
				await Scriptbill.createAlert("You need a store name for your product");
				return;
			} else {
				sendConfig.storeName = storeName.value;
			}
			
			if( ! storeAdd.value ){
				await Scriptbill.createAlert("You need a store address for your product, used to uniquify your store ID.");
				return;
			} else {
				sendConfig.storeAddress = storeAdd.value;
			}
			
			
			
			if( sendCur.value ){
				sendConfig.currency 		= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
					
			if( storeUrl.value ){
				sendConfig.storeUrl 		= storeUrl.value;
			}
			
			if( ! recieve.value ){
				await Scriptbill.createAlert("Enter the amount you want to sell the website.");
				return;
			} 
			let stake 	= budgetConfig[note.noteAddress].stake;
			let value 	= parseFloat( budgetConfig.value ) * parseFloat( stake );
				
			if( recieve.value > value ){
				value 		= formatCurrency( value );
				await Scriptbill.createAlert( "You can only sell according to your stake in the company. Your current stake is: " + value + " " + ( testCredit ? testCredit : test ) );
				return;
			}
			
			sendConfig.value = parseFloat( recieve.value.replaceAll(',','') );
			this.innerText 					= "Please Wait...";
			budgetConfig.value 				= parseFloat( budgetConfig.value ) - parseFloat( recieve.value );			
			
			Scriptbill.createScriptbillBudget( budgetConfig, false ).then( async block =>{
				if( block && block.transType == "UPDATEBUDGET" ){
					sendConfig.block 			=		JSON.parse( JSON.stringify( block ));
					Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
					Scriptbill.s.requestProcessing		= 'TRUE';
					let staked 							= value - parseFloat( recieve.value );					
					stake 								= staked / parseFloat( budgetConfig.value );
					budgetConfig[ note.noteAddress ].stake = stake;
					budgetConfig.isSelling 				= "true";
					config.stake 						= stake;
					
					if( ! budgetConfig.salesValue || isNaN( parseFloat( budgetConfig.salesValue ) ) )
						budgetConfig.salesValue 			= parseFloat( recieve.value );
					
					else 
						budgetConfig.salesValue 			= parseFloat( budgetConfig.salesValue ) + parseFloat( recieve.value );
					
					budgetConfig[ note.noteAddress ].oldStake = parseFloat( recieve.value ) / parseFloat( value );//until bought before updated.
					
					if( ! budgetConfig.sellerAddress )
						budgetConfig.sellerAddress = note.noteAddress;
					
					else 
						budgetConfig.sellerAddress  = budgetConfig.sellerAddress.split(",").push( note.noteAddress ).toString();
					
					
					await Scriptbill.getData("budgetConfig", Scriptbill.Base64.encode( JSON.stringify( budgetConfig ) ), SERVER);
					this.innerText 	= "Successful";
					setTimeout(()=>{
						url 			= new URL( requestSuccess );
						url.searchParams.set("sellWeb", "true");
						location.href = url.href;
					}, 5000);
					
				} else {
					this.innerText 	= "Unsuccessful";
					
					if( document.querySelector("#error") ){
						var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
						var keys 	= Object.keys( errors );
						keys 		= keys.reverse();
						document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
					}
					
					setTimeout(()=>{
						location.reload();
					}, 10000);
				}
			});
			
		} 
		
		//sendCur.setAttribute("disabled", "disabled");		
		
	});
	 
}

if( location.href.includes( sellStocks )){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
	if( ( note.noteType.length - note.noteType.lastIndexOf("STK") ) != 3 ) 
		location.href 	= dashboardUrl;
	
	if( ! navigator.onLine ){		
		setTimeout( async ()=>{
			await Scriptbill.createAlert("can't sell stocks without being online. Switch on your internet and try again");
			location.href 	= dashboardUrl;
		}, 1 );
	}
	
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		
		let storeName	= document.getElementById("storeName");
		let storeAdd	= document.getElementById("storeAddress");
		let amount		= document.getElementById("amount");				
		let recieve			= document.getElementById("recipientGets");
		let sendCur			= document.getElementById("sellerCurrency");		
		let repCur			= document.getElementById("recipientCurrency");
		
		let inner		= document.getElementsByClassName("input-group-append");		
		let symbol 		= document.querySelector("#symbol");
		let repSymbol 		= document.querySelector(".repSymbol");
		let button		= document.querySelector("#continue");
		let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD"));
		let symbole 	= test;
		let budgetBlock	= await Scriptbill.getCurrentBudgetBlock( note.budgetID );
	
		
		if( ! budgetBlock || ! budgetBlock.agreement || ! budgetBlock.agreement.stockID ){
			await Scriptbill.createAlert("We couldn't find a budget block associated with your stock note. Please login a valid stock note and try again.");
			location.href 		= dashboardUrl;
			return;
		}
		
		if( budgetBlock.agreement.stockID != note.noteType ){
			await Scriptbill.createAlert("Your note type doesn't match the stock ID on this budget, budget stock ID is: " + budgetBlock.agreement.stockID + " Your own Stock ID is: " + note.noteType);
			location.href 		= dashboardUrl;
			return;
		}
		
		let budget 				= JSON.parse( JSON.stringify( budgetBlock.agreement ));
		let productNote 		= await Scriptbill.getCurrentExchangeNote( budget.stockID );
		
		
		if( ! productNote || ! productNote.noteValue ){
			await Scriptbill.createAlert("We couldn't get the current product note for this budget. Stock value can't be calculated. Logging in a valid stock note may solve this problem");
			location.href 		= dashboardUrl;
			return;
			
		}
		
		if( budget.budgetCredit ){
			test 		= budget.budgetCredit.slice( 0, budget.budgetCredit.lastIndexOf("CRD"));
		}
		
		if( budget.name ){
			storeName.value			= budget.name;
			storeName.setAttribute("disabled", "disabled" );
		}
		if( budget.budgetID ){
			storeAdd.value			= budget.budgetID;
			storeAdd.setAttribute("disabled", "disabled" );
		}
				
		let toPay 			= 0.25;
		let rates 			= 1;
		let currentValue 	= parseFloat( productNote.noteValue ) * note.noteValue;
		
				
		repCur.onchange = async function(){
			if( result[ this.value ] ){
				symbole 	= result[ this.value ].symbol;
			}
			let value 		= amount.value;
			if( this.value != test ){			
						
				repSymbol.innerHTML = symbole;
				let rates 		= await fetch("/exRate.json").then( resp =>{ return resp.json(); }).then( result =>{ return result; });
				
				if( rates ){
					rates = rates.rates;
				}				
				
				if( rates && rates[ this.value ] ){
					let rate = 1;
					if( sendCur.value != "USD" ){
						rate 		= 1/parseFloat(rates[sendCur.value]);
					} 
					if( this.value != "USD" ){
						rate 		= rate / ( 1/parseFloat(rates[this.value]) );
					}
					//exchange.innerHTML = "1 " + test + " = " + parseFloat( rates[ this.value ] * rate ).toFixed(4) + " " + this.value;
					Scriptbill.s.toPay = toPay;
					Scriptbill.s.rates = parseFloat(rates[ this.value ]) * rate;
					
				} else {
					//exchange.innerHTML = "exchange rate not available";
				}
			} else {
				repSymbol.innerHTML = symbole;
				//exchange.innerHTML = "";
			}
			
			//fees.innerHTML 	= ( value * toPay ).toFixed(4) + " " + test;
		}

		if( repCur.querySelector("option[value='"+test+"']") ){0
			inner[1].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+ test.toLowerCase() +' mr-1"></i>&nbsp;' + test.toUpperCase();
			repCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			repCur.setAttribute("disabled", "disabled");
		}
		
		amount.oninput = function(){
			
			let value = this.value.replaceAll(',','').split('.');
/* await Scriptbill.createAlert( value[1] );			
await Scriptbill.createAlert( value[0] ); */			
						
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				let val = values[ values.length - 1 ];
				val 	+= value[1];
				//await Scriptbill.createAlert( val );
				value[1] = val;
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
				//await Scriptbill.createAlert( this.value );
			}
			else if( ! value[1] ){
				this.value = "0.0" + value[0];
			}
			
			this.value 	= parseFloat( this.value.replaceAll(',','') );
			recieve.value = 	formatCurrency( parseFloat( ( this.value * rates ) - ( ( this.value * rates ) * toPay ) ) );
			this.value = formatCurrency( this.value );
			
		}
		
		amount.value 		= formatCurrency( currentValue );
		amount.setAttribute("disabled", "disabled" );
		
		var event 			= new Event('input', {
			bubbles: true,
			cancelable: true,
		});
		amount.dispatchEvent(event);
		
		recieve.value 		= "";
		//recieve.setAttribute("disabled", "disabled");
		
		recieve.oninput = function(){
			let value = this.value.replaceAll(',','').split('.');
					
			if( typeof value == "object" && value[1] && value[1].length == 1 ){			
				let values = value[0].split('');
				let val = values[ values.length - 1 ];
				val 	+= value[1];
				//await Scriptbill.createAlert( val );
				value[1] = val;
				values.pop();
				value[0] = values.join('');
				this.value 		= value[0] + '.' + value[1];
			} else if( typeof value == "object" && value[1] && value[1].length == 3 ){
				let values = value[1].split('');
				value[0] += values[0];
				values.splice(0,1);
				value[1] = values.join('');
				this.value 		= value[0] + '.' + value[1];
				//await Scriptbill.createAlert( this.value );
			}
			else if( ! value[1] ){
				this.value = "0.0" + value[0];
			}
			
			this.value 	= parseFloat( this.value.replaceAll(',','') );
			//amount.value = 	formatCurrency( parseFloat( ( ( this.value * rates ) / ( 1 - toPay ) ) ) );
			this.value = formatCurrency( this.value );
		}
		
		let tests 		= Object.keys( result );
		let options		= sendCur.querySelectorAll("option"), index;
		for( let x = 0; x < options.length; x++ ){
			if( tests.indexOf( options[x].innerText ) < 0 ) continue;
			index 				= tests.indexOf( options[x].innerText );
			options[x].value 	= tests[index];
		}
				
		 if( result[test] ){
			symbole 		= result[test].symbol;
		}
		symbol.innerHTML 	= symbole;
		repSymbol.innerHTML = symbole;
		
		if( sendCur.querySelector("option[value='"+test+"']") ){			
			inner[0].children[0].children[0].children[1].children[0].children[0].children[0].innerHTML = '<i class=" currency-flag currency-flag-'+test.toLowerCase()+' mr-1"></i>&nbsp;' + test.toUpperCase();
			sendCur.querySelector("option[value='"+test+"']").setAttribute("selected", "selected");
			sendCur.setAttribute("disabled", "disabled");
		}
		
			
		
		button.onclick 		= async function(e){
			e.preventDefault();			
			 let sendConfig = {};
			
			
			
			if( ! storeName.value ){
				await Scriptbill.createAlert("Budget name not set. This may signify an invalid budget");
				return;
			} else {
				sendConfig.storeName = storeName.value;
			}
			
			if( ! storeAdd.value ){
				await Scriptbill.createAlert("No budget ID set. Budget ID is useful to trace this budget in the Scriptbill Database sytem.");
				return;
			} else {
				sendConfig.storeAddress = storeAdd.value;
			}		
			
			if( sendCur.value ){
				sendConfig.currency 		= sendCur.value;
			} else {
				await Scriptbill.createAlert("send currency can't be empty!");
				return;
			}
			
			if( amount.value )
				sendConfig.value = parseFloat( amount.value.replaceAll(',','') );
			
			else {
				await Scriptbill.createAlert("Total amount for your stock hasn't been determined. This may signify a dead or invalid stock. Please report to a Scriptbank Official if this persist.");
				return false;
			}
			
			if( recieve.value )
				sendConfig.recipientValue = parseFloat( recieve.value.replaceAll(',','') );
			
			else {
				await Scriptbill.createAlert("Please enter a valid amount to sell your stock");
				return false;
			}
		
			this.innerText 					= "Please Wait...";
			
			let stockRate 					= parseFloat( recieve.value ) / parseFloat( amount.value );
						
			
			Scriptbill.sellScriptbillStocks( stockRate ).then( block =>{
				if( block && ( block.transType == "SELLSTOCK" || block.transType == "SOLDSTOCK" ) ){
					sendConfig.block 			=		JSON.parse( JSON.stringify( block ));
					Scriptbill.s.requestMoneyConfig 	= JSON.stringify( sendConfig );
					Scriptbill.s.requestProcessing		= 'TRUE';
					this.innerText 	= "Successful";
					setTimeout(()=>{
						let url 	= new URL( requestSuccess );
						url.searchParams.set( "stockSale", "true" );
						location.href = url.href;
					}, 5000);
					
				} else {
					this.innerText 	= "Unsuccessful";
					if( document.querySelector("#error") ){
						var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
						var keys 	= Object.keys( errors );
						keys 		= keys.reverse();
						document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
					}
					
					setTimeout(()=>{
						location.reload();
					}, 15000);
				}
			});
			
		} 
		
		//sendCur.setAttribute("disabled", "disabled");		
		
	}); 
}



if( location.href.includes( sendConfirm ) ){
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	
	if( ! Scriptbill.s.sendMoneyConfig )
		location.href 	= sendUrl;
	
	let config 		= JSON.parse( Scriptbill.s.sendMoneyConfig );
	let agreeInfo 	= document.getElementById("agreeInfo");
	let description	= document.getElementById("description");
	let form		= document.getElementById("form-send-money");
	let content		= document.getElementById("content");
	let sendAmount 	= form.querySelector("span.text-3.float-right.sendAmount");
	let feeAmount 	= form.querySelector("span.text-3.float-right.feeAmount");
	let totalAmount	= form.querySelector("span.text-3.float-right.totalAmount");
	let button		= form.querySelector("button.btn.btn-primary.btn-block.sendBtn");
	let test 		= note.noteType.slice( 0, note.noteType.lastIndexOf("CRD") );
	
	if( config.agreeConfigType )
		agreeInfo.querySelector("p.col-sm-7.agreeType").innerText 	= config.agreeConfigType;

	if( config.agreementExpiry )
		agreeInfo.querySelector("p.col-sm-7.expiryDate").innerText 	= config.agreementExpiry;
	
	if( config.value )
		sendAmount.innerHTML = formatCurrency( config.value ) + " " + test;
	
	if( config.fees )
		feeAmount.innerHTML = formatCurrency( config.fees ) + " " + test;
	
	else
		feeAmount.innerHTML = "0.00 " + test;
	
	totalAmount.innerHTML 	= ( parseFloat(config.value) + parseFloat(config.fees) ) + " " + test;
	
	if( config.recipient )
		content.querySelector("span.font-weight-500.email").innerText = config.recipient.slice(0, 24 ) + ( config.recipient.length > 24 ? "..." : "" );
	
	button.onclick 		= async function(e){
		e.preventDefault();
		config.description = description.value;	
		
		//configuring the payment
		Scriptbill.sendConfig.amount = [];
		if( parseFloat( config.fees ) > 0 ){
			this.innerText = "Paying Fees...";
			//to get the recipient of the fees, we have to get the budget block for the 
			//note type first.
			Scriptbill.blockID 		= note.blockID;			
			let budget 				= await Scriptbill.getTransBlock(10);
			
			
			
			Scriptbill.sendConfig.amount.push( config.fees );
			Scriptbill.sendConfig.recipient.push( budget[0].exchangeNote.exchangeID );
		}
		Scriptbill.s.sendMoneyProcessing = "true";
		if( config.recipientType == "product" ) {
			this.innerText = "Purchasing Product...";
			if( ! Scriptbill.s.buyConfig ){
				let created = false;
				let url 	= new URL( SERVER );
				//url.searchParams.set("product_block", config.recipient);
				budget 		= await Scriptbill.getData( "product_block", config.recipient, url.href );
				
				if( ! budget || ! budget.blockID ){
					this.innerText = "Creating Product...";
					//create a new product.
					//get the product note. if note found the backend 
					//server will create the note.
					url 		= new URL( SERVER /*"https://dev-scriptbanking.pantheonsite.io"*/ );
					let details = await Scriptbill.getData( "product_note", config.recipient, url.href );
					
					if( details ){
						this.innerText 			= "Product Host Gotten...";
						let productNote 		= JSON.parse( JSON.stringify( details ) );
						//save the current user password,
						Scriptbill.l.currentPassword = Scriptbill.l.user_pass;
						Scriptbill.s.currentPassword = Scriptbill.s.user_pass;
						Scriptbill.l.user_pass 		 = productNote.password;
						Scriptbill.s.user_pass 	 = productNote.password;
						delete productNote.password;
						
						if( ! productNote.noteAddress ){
							Scriptbill.password 		= Scriptbill.l.user_pass;
							Scriptbill.defaultScriptbill = JSON.parse( JSON.stringify( productNote ) );
							Scriptbill.returnNote 	= true;
							Scriptbill.s.noteProcessing = Scriptbill.s.currentNote;
							delete Scriptbill.s.currentNote;
							delete Scriptbill.l.currentNote;
							await Scriptbill.createNewScriptbillWallet().then( async ( block )=>{
								
									if( ! block || ! block.note ) return;
								
								this.innerText 			= "Product Host Created Successfully...";
								
								let note 				= JSON.parse( JSON.stringify( block.note ) );
								let bconfig 				= JSON.parse( JSON.stringify( Scriptbill.budgetConfig ));
								bconfig.name 			= config.recipient;
								bconfig.value 			= 99999999999;
								bconfig.max_exec 		= "1 Years";
								bconfig.budgetType 		= "business";			
								bconfig.budgetCredit	= note.noteType;		
								bconfig.budgetDesc		= "This Company has Been Adopted into the Scriptbill Network Through Their Website " + config.recipient + " Owners of the Website Can Only Lay Claim onto this Budget if they Invest on it as the Largest Shareholder, Else they will remain the Working ShareHolder to this Business. Investors Funds on this Business is safe";
								bconfig.stockID 		= config.recipient.replace("https://", "").split(".");
								bconfig.stockID 		= bconfig.stockID[ bconfig.stockID.length - 2 ].toUpperCase()
								budget 					= await Scriptbill.createScriptbillBudget(bconfig);

								if( budget && budget.blockID ){
									this.innerText 			= "Product Budget Created Successfully...";
									budget = Scriptbill.Base64.encode( JSON.stringify( budget ));
									budget 			= Scriptbill.chunk_data( budget );					
									let key = await Scriptbill.generateKey(15), num, y = false;
									for( let x = 0; x < budget.length; x++ ){
										num = await Scriptbill.getData(["product_block", "product_save", "product_key", "product_num"], [ config.recipient, budget[x], key,x ], url.href );
										
										if( ! num ){
											//to avoid creating an endless loop, we 
											//test how many times the reuest is not being completed.
											if( ! y )
												y = 1;
											
											else if( y == 10 ) break;
											x--;
											y++;
										}										
										else if( ! num.success ){
											y=false;
											num = await Scriptbill.getData(["product_block", "product_save", "product_key", "product_num"], [ config.recipient, budget[num.num], key, num.num], url.href );
											x = num.num;
										} else {
											y = false;
										}
										//console.log( "note saved " + x + " result: " + note );
									}
									
									if( num ){
										num = await Scriptbill.getData(["product_block", "product_save", "product_key"], [ config.recipient, "STOPPED", key ], url.href );
									}
								} else {
									if( document.querySelector("#error") ){
										var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
										var keys 	= Object.keys( errors );
										keys 		= keys.reverse();
										document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`
									}
								}
																
								url.search 				= "";
								productNote 			= JSON.parse( JSON.stringify( block.note ));
								productNote.password 	= Scriptbill.l.user_pass;
								productNote 			= Scriptbill.Base64.encode( JSON.stringify( block.note ) );
								productNote 			= Scriptbill.chunk_data( productNote );
								let y, key = await Scriptbill.generateKey(15);							
								
								for( let x = 0; x < productNote.length; x++ ){
									this.innerText = "Sending Note to Server...";
									note = await Scriptbill.getData(["product_note_save", "product_note", "product_num", "product_key"], [productNote[x], config.recipient, x, key], url.href );
									//console.log( "note saved " + x + " result: " + note );
									if( ! note ){
										//to avoid creating an endless loop, we 
										//test how many times the reuest is not being completed.
										this.innerText = "Error Sending Note to Server";
										if( ! y )
											y = 1;
										
										else if( y == 10 ) break;
										x--;
										y++;
									}										
									else if( ! note.success ){
										y = false;
										note = await Scriptbill.getData(["product_note", "product_note_save", "product_key", "product_num"], [ config.recipient, productNote[note.num], key, note.num], url.href );
										x = note.num;
									} else {
										y = false;
									}
								}
								if( note )
									note = await Scriptbill.getData(["product_note_save", "product_note"], ["STOP", config.recipient], url.href );
								this.innerText 		= "Creating Product...";
								//console.log( "note saved last result: " + note );
								Scriptbill.productConfig.name = config.recipient;
								//we can't actually evaluate a product virtually
								//we just have to add a default value, the Product
								//owner will have to edit this later.
								//by default the value of the product is in 9 figures						
								
								Scriptbill.productConfig.value = 1;
								Scriptbill.productConfig.unit = Infinity;
								Scriptbill.productConfig.description = "This product is owned by this website " + config.recipient + " The owners should claim or company will be sold out to anyone who claims it in the Scriptbill Network";
								Scriptbill.isScriptbankProduct 	= true;
								created = await Scriptbill.create_product();
								
								if( created ){
									this.innerText = "Product Created..";
									budget = chunk_data( Scriptbill.Base64.encode( JSON.stringify( created  )));
									//await Scriptbill.shareData( false, budget );
									let key = await Scriptbill.generateKey(15), num, y;
									for( let x = 0; x < budget.length; x++ ){
										this.innerText 	= "Communicating Block to Server...";
										num = await Scriptbill.getData(["product_block", "product_save", "product_key", "product_num"], [ config.recipient, budget[x], key,x ], url.href );
										
										if( ! num ){
											//to avoid creating an endless loop, we 
											//test how many times the reuest is not being completed.
											if( ! y )
												y = 1;
											
											else if( y == 10 ) break;
											x--;
											y++;
										}										
										else if( ! num.success ){
											y = false;
											num = await Scriptbill.getData(["product_block", "product_save", "product_key", "product_num"], [ config.recipient, budget[num.num], key, num.num], url.href );
											x = num.num;
										} else {
											y = false;
										}
										//console.log( "note saved " + x + " result: " + note );
									}
									if( num )
										num = await Scriptbill.getData(["product_block", "product_save", "product_key"], [ config.recipient, "STOPPED", key ], url.href );
									
									Scriptbill.s.currentNote = Scriptbill.s.noteProcessing;
									Scriptbill.l.currentNote = Scriptbill.s.noteProcessing;
									Scriptbill.s.user_pass = Scriptbill.s.currentPassword;
									Scriptbill.l.user_pass = Scriptbill.s.currentPassword;
									
									setTimeout( async ()=>{
										if( num )
											await Scriptbill.createAlert("Product Creation Complete, Please Retry the Purchase Process to Buy This Product. Thanks!");
										else 
											await Scriptbill.createAlert("Product Creation Incomplete, Please Ensure you Have a Good Internet Connection to Buy This Product. Thanks!");
										location.reload();
									}, 2000 );
								} else {
									Scriptbill.s.currentNote = Scriptbill.s.noteProcessing;
									Scriptbill.l.currentNote = Scriptbill.s.noteProcessing;
									Scriptbill.s.user_pass = Scriptbill.s.currentPassword;
									Scriptbill.l.user_pass = Scriptbill.s.currentPassword;
									this.innerText 	= "Error Creating Product...";
									if( document.querySelector("#error") ){
										var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
										var keys 	= Object.keys( errors );
										keys 		= keys.reverse();
										document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
									}
									setTimeout(()=>{
										this.innerText = "Transaction Aborted...";
										setTimeout( ()=>{
											let urle  = new URL( sendSuccess );
											urle.searchParams.set("error", "true");
											location.href = urle.href;
										}, 3000 );
									}, 3000);
								}
							});						
						} /* else {						
							//save the current Note of the user
							Scriptbill.s.noteProcessing = Scriptbill.s.currentNote;
							Scriptbill.s.currentNote = JSON.stringify( productNote );
							Scriptbill.l.currentNote = JSON.stringify( productNote );
						} */						
						
					} else {
						this.innerText 	= "No Product Host Existed...";
						
						setTimeout(()=>{
							this.innerText = "Transaction Aborted...";
							setTimeout( ()=>{
								let urle  = new URL( sendSuccess );
								urle.searchParams.set("error", "true");
								location.href = urle.href;
							}, 3000 );
						}, 3000);
					}
				}
				
				else if( budget.blockID ){
					this.innerText = "Purchasing Product...";
					//first of all return the user data to its place
					if( Scriptbill.l.currentPassword ){
						Scriptbill.l.user_pass = Scriptbill.l.currentPassword;
						Scriptbill.s.user_pass = Scriptbill.s.currentPassword;
						delete Scriptbill.l.currentPassword;
						delete Scriptbill.s.currentPassword;
					}
					
					if( Scriptbill.l.currentNote ){
						Scriptbill.s.currentNote = Scriptbill.l.currentNote;
						delete Scriptbill.l.currentNote;
					}
					
					if( created ){
						budget 	= JSON.parse( JSON.stringify( created ));
					}
					
					//next configure the product purchase function.
					let purchased = await Scriptbill.buy_product( budget.productID, parseFloat( config.value ));
					
					if( purchased && ( purchased.transType == "BUYPRODUCT"||purchased.transType == "PRODUCTSUB" ) ){
						this.innerText = "Product Purchased...";
						let chunked = chunk_data( Scriptbill.Base64.encode( JSON.stringify( purchased ) ), 50 );
						for( let x = 0; x < chunked.length; x++ ){
							url.search = "";
							/* url.searchParams.set( 'product_block', config.recipient );
							url.searchParams.set( 'product_save', chunked[x] );
							url.searchParams.set( 'product_key', note.noteAddress ); */
							await Scriptbill.getData(["product_block", "product_save", "product_key"], [config.recipient, chunked[x], note.noteAddress], url.href );
						}
						url.search = "";
						/* url.searchParams.set( 'product_block', config.recipient );
						url.searchParams.set( 'product_save', 'STOPPED' );
						url.searchParams.set( 'product_key', note.noteAddress ); */
						await Scriptbill.getData(["product_block", "product_save", "product_key"], [config.recipient, "STOPPED", note.noteAddress], url.href );
						this.innerText 	= "Product Purchased";
						let profitSharingData = Scriptbill.l.profitSharingData;
						
						if( ! profitSharingData ){
							profitSharingData = [];
						} else {
							profitSharingData	= JSON.parse( Scriptbill.l.profitSharingData );
						}
						
						let sharingData = {
							server:config.recipient,
							blockID:purchased.blockID,
							transTime: purchased.transTime
						};
						
						profitSharingData.push( sharingData );
						
						Scriptbill.l.profitSharingData = JSON.stringify( profitSharingData );
						setTimeout( function(){
							location.href = sendSuccess;
						}, 3500 );
						
					} else {
						this.innerText 	= "Purchase Unsuccessful";
						if( document.querySelector("#error") ){
							var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
							var keys 	= Object.keys( errors );
							keys 		= keys.reverse();
							document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
						}
						setTimeout( function(){
							let urle 	= new URL( sendSuccess );
							var errors 	= JSON.parse( Scriptbill.s.eMessages );
							let times 	= Object.keys( errors ).sort();
							urle.searchParams.set("message", errors[times[0]]);
							urle.searchParams.set("error", "TRUE");
							location.href 	= urle.href;
						}, 15500 );
					}
				}
			} else {
				let prodConfig = JSON.parse( Scriptbill.s.buyConfig );
				let response 	= prodConfig.block;
				
				if( ! response || ! response.blockID || response.transType != "CREDIT" ){
					this.innerText = "Invalid Product Selected!";
					this.setAttribute("disabled", "disabled" );
					return;				
				}  else {
					let checkInt = setInterval( async ()=>{
						
						if( ! this.response )
							this.response 			= JSON.parse( JSON.stringify( response ));
						
						else 
							response 				= JSON.parse( JSON.stringify( ( this.realBlock ? this.realBlock: this.response ) ));
						
						let block 				= await Scriptbill.getTransBlock(1, {blockID: this.response.nextBlockID});
						
						if( block.length && block[0].blockID ){
							this.response 		=  JSON.parse( JSON.stringify( block[0] ));
							
							if( this.response.transType != "CREDIT" ){
								this.realBlock 		= JSON.parse( JSON.stringify( response ));
							} else if( this.realBlock ){
								delete this.realBlock;
							}
						}
						else{
							clearInterval( checkInt );
							response 				= JSON.parse( JSON.stringify( ( this.realBlock ? this.realBlock: this.response )  ));
							Scriptbill.response 	= JSON.parse( JSON.stringify( response ));
							
							if( ! response.agreement || response.agreement.units < 1 ){
								await Scriptbill.createAlert("Product Purchased Already");
								
								if( response.agreement && response.agreement.storeUrl ){
									let con = await Scriptbill.createConfirm("Do you want to Buy Other Products From This Store");
									
									if( con ){
										try {
											let url 	= new URL( response.agreement.storeUrl );
											
											let resp = await Scriptbill.getData('scriptbillPing', 'yes', response.agreement.storeUrl );
											
											if( ! resp || ! resp.isScriptbillServer && resp.isScriptbillServer != 'TRUE' ){
												await Scriptbill.createAlert( "Couldn't Visit Store Url. Store Url is an Invalid Scriptbill Store.");
											} else {
																						
												if( prodConfig.referer ){
													url.searchParams.set( 'referer', prodConfig.referer );
												}
												let win = await chrome.windows.create({url: url.href, focused: true, state: "normal", type: "popup" });
											}
										} catch(e){
											await Scriptbill.createAlert( "Couldn't Visit Store Url");
										}
									}
								}
								//if visiting the store url to pick other Products
								//the store url must be a Scriptbill enabled website.
								//and all the logics will continue from there.
								return false;
							}
							let profit 						= parseFloat( prodConfig.value ) - parseFloat( prodConfig.repValue );
							Scriptbill.details		= JSON.parse( JSON.stringify( response ));
							Scriptbill.details.transType = "GETCREDIT";
							Scriptbill.details.transValue = parseFloat( prodConfig.repValue );
							Scriptbill.details.recipient = prodConfig.motherKey;
							Scriptbill.passwordKey 			= await Scriptbill.createPrompt("Please enter your Scriptbill Note Key To Run Your Product Purchase Transaction", "1234");
							let key 					= Scriptbill.passwordKey;
							
							let newBlock 		= await Scriptbill.generateScriptbillTransactionBlock(Scriptbill.details);
							
							if( newBlock && newBlock.transType == "GETCREDIT" ){
								Scriptbill.s.profitKey 			= key;
								this.innerText = "Product Purchase Successful";
								Scriptbill.s.sendMoneyConfig 	= JSON.stringify( buyConfig );
								Scriptbill.s.sendMoneyProcessing	= "TRUE";
								let users = await Scriptbill.getData(['storeID', 'profitBlock'], [prodConfig.storeID, 'TRUE'], SERVER);

								if( prodConfig.referer ){
									Scriptbill.sendConfig.recipients.push( prodConfig.referer );
									Scriptbill.sendConfig.amount = profit * 0.1;
									profit = profit - Scriptbill.sendConfig.amount;
									await Scriptbill.sendMoney();
									 
								}
								
								let exchangeNote = await Scriptbill.getCurrentExchangeNote( newBlock.noteType );
								
								if( exchangeNote && exchangeNote.exchangeID ){
									Scriptbill.sendConfig.recipients.push( exchangeNote.exchangeID );
									Scriptbill.sendConfig.amount = profit;
									await Scriptbill.sendMoney();
								}
								
								let stores 						= {};
								if( Scriptbill.s.profitBlockData )
									stores 						= JSON.parse( Scriptbill.s.profitBlockData );
								
								if( prodConfig.referer && users.length && typeof users == "object" )
									users.splice( 1, 0,  {id:prodConfig.referer, blockID: newBlock.blockID} );
								
								else {
									if( ! users || ! users.length || typeof users == "object" )
										users = [];
									
									if( prodConfig.referer )
										users.push( {id:prodConfig.referer, blockID: newBlock.blockID} );
								}
								
								stores[ storeID ] = users;
								Scriptbill.s[storeID + "_profit"] = profit;
								let referers 					= JSON.parse(Scriptbill.s[storeID + "_referers"] ? Scriptbill.s[storeID + "_referers"] : '[]');
								referers.push({id: prodConfig.referer, prodID: prodConfig.block.blockID });
								Scriptbill.s[storeID + "_referers"] = JSON.stringify( referers );
								
								let currentStores 					= Scriptbill.s.currentStores;
								
								if( currentStores )
									currentStores 					= JSON.parse( currentStores );
								
								else 
									currentStores 					= [];
								
								currentStores.push( storeID );
								
								Scriptbill.s.currentStores 			= JSON.stringify( currentStores );					
								Scriptbill.s.profitBlockData 	= JSON.stringify( stores );
								//this shows it's an automatic withdrawal Scheme
								if( prodConfig.bankAccount ){
									if( Object.values( bankCodes ).includes( prodConfig.bankAccount.bankName ) ){
										let bankcode = Object.keys( bankCodes )[ Object.values( bankCodes ).indexOf( prodConfig.bankAccount.bankName ) ];
										let sendReq 	= {
											bank_code : bankcode.toString(),
											account_number : prodConfig.bankAccount.accountNumber
										};
									
										let request = await Scriptbill.getData(['account_lookup', 'account_data', 'user_agent'], ['true', Scriptbill.Base64.encode( JSON.stringify( sendReq ) ), navigator.userAgent], Scriptbill.getDefaultServer());
										
										if( request && request.data && Object.keys( request.data ).length > 0 ){
											let data = JSON.parse( JSON.stringify( request ));
											let account_name = data.data.account_name;
											
											let tried = await Scriptbill.createConfirm("Please Confirm the account name of your account based on our lookup: " + account_name + " Press ok to continue the transfer transaction");
											
											if( tried ){
												let reference = await Scriptbill.generateKey(10);
												let merchantID = "";
												reference 		= merchantID + "_" + reference;
												let transfer_obj = {};
												transfer_obj["transaction_reference"] = reference;
												if( ! config.bank.approved && stance.amount && config.amount > stance.amount )
													config.amount = stance.amount;
												
												if( stance.rate ){
													let amount = parseFloat( note.noteValue ) * parseFloat( stance.rate );
													
													if( config.amount > amount )
														config.amount 	= amount;
												}
												transfer_obj["amount"] = config.amount;
												transfer_obj["bank_code"] = bankcode.toString();
												transfer_obj["account_number"] = config.bank.accountNumber;
												transfer_obj["account_name"] = account_name;
												transfer_obj["currency_id"] = "NGN";
												transfer_obj["remark"] = "Transfer From Scriptbank Account Via Note Address: " + note.noteAddress;
												
												Scriptbill.string = JSON.stringify( transfer_obj );
												request 	= await Scriptbill.getData(['transfer', 'object', 'integrity', 'nonce', 'user_agent'], ['true', Scriptbill.Base64.encode( Scriptbill.string ), CryptoJS.MD5( Scriptbill.string ).toString( CryptoJS.enc.Hex ), data.nonce, navigator.userAgent ], Scriptbill.getDefaultServer());
												
												//refed = request.status >= 200 && request.status < 300;
												
												if( request && request.data && Object.keys( request.data ).length > 0 ){
													data = JSON.parse( JSON.stringify( request ));
													this.innerText = "Transfer Successful";
													await Scriptbill.createAlert( "Fund Of this Amount: " + config.amount + " Was Transfered To Bank Account, You Should Wait A Little Minute to Recieve Funds To Bank Account: Your Transaction Reference: " + data.data.transaction_reference );
													Scriptbill.s.automaticData = JSON.stringify( data );
													location.href 	= withdrawSuccess;
												} else {
													let query = {
														"transaction_reference": reference
													};
													let intervel = setInterval( async ()=>{
														
														Scriptbill.string = JSON.stringify( query )
														request 	= await Scriptbill.getData(['requery', 'object', 'integrity', 'nonce', 'user_agent'], ['true', Scriptbill.Base64.encode( Scriptbill.string ), CryptoJS.MD5( Scriptbill.string ).toString( CryptoJS.enc.Hex ), data.nonce, navigator.userAgent ], Scriptbill.getDefaultServer());
														
														if( ! this.checkSec )
															this.checkSec = 0;
														
														this.checkSec++;
														
														if( request && request.data && Object.keys( request.data ).length > 0 ){
															clearInterval( intervel );
															data = JSON.parse( JSON.stringify( request ));
															this.innerText = "Transfer Successful";
															await Scriptbill.createAlert( "Fund Transfered To Bank Account, You Should Wait A Little Minute to Recieve Funds To Bank Account: Your Transaction Reference: " + data.data.transaction_reference );
															Scriptbill.s.automaticData = JSON.stringify( data );
															location.href 	= withdrawSuccess;
														} else if( this.checkSec == 300 ){
															await Scriptbill.createAlert( "We Couldn't Verify The Transfer, You can contact us To Manually Verify This is need be with this transaction reference: " + reference );
															clearInterval( intervel );
															Scriptbill.s.automaticData = JSON.stringify( data );
															location.href 	= withdrawSuccess;
														}
													}, 1000);									
												}
											}
										}
									} else {
										this.innerText = "Can't Automatically Withdraw...";
										await Scriptbill.createAlert("Your Bank Wasn't Found Among Banks That We are Liable to Transfer to Automatically. You Can Solve This By Entering the Exact Bank Name or Seeking Assistant From Scriptbank" );
									}
								} else {
									setTimeout( function(){
										location.href = sendSuccess;
									}, 3500 );
								}
							}
						}
							
					}, 1000, response );
				}
				
			}	
				
		} else {
			Scriptbill.details 		= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ) );
			Scriptbill.details.recipient = config.recipient;
			Scriptbill.details.transValue = config.value - config.fees;
			Scriptbill.details.repCurrency = config.repCurrency;
			Scriptbill.details.repValue 	= config.repValue;
				
			//calculating the agreement
			let date 	= new Date( config.agreementExpiry );
			Scriptbill.defaultAgree.ExecTime =  date.getTime();
			Scriptbill.defaultAgree.value 		= Scriptbill.details.transValue;
				
			if( config.returnAmount ){
				Scriptbill.defaultAgree.value    = config.returnAmount;
			}
				
			if( config.returnPeriodic ){
				Scriptbill.defaultAgree.isPeriodic = true;
				Scriptbill.defaultAgree.times 		= Math.round( parseFloat( Scriptbill.defaultAgree.value ) / parseFloat( config.returnPeriodic ) );
			}
			if( config.repCurrency != config.currency ){
				Scriptbill.details.transType = "EXCHANGE";
				
				Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details ).then( block =>{
					if( block && block.transType == "EXCHANGE" ){
						Scriptbill.sendMoney().then( block =>{
							if( block && block.transType == "SEND" ){
								location.href = sendSuccess;
							} else {
								if( document.querySelector("#error") ){
									var errors = JSON.parse( Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
									var keys 	= Object.keys( errors );
									keys 		= keys.reverse();
									document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`
								}
								setTimeout( function(){
									let urle 	= new URL( sendSuccess );
									urle.searchParams.set("error", "true" );
									location.href 	= urle.href;
								},10000 );
								
							}
						});
					}
				});
			} else if( config.recipientType == "phone" || config.recipientType == "email" ){
				this.innerText = "Generating Note...";
				let transKey = await Scriptbill.createPrompt("Protect This Transaction With a Key. You Will Share this Key With Your Recipient in Email or Sms or any social channel to " + config.recipient, "");
				
				var string 						= config.recipient + transKey;
				config.transKey 				= transKey;
				let recipient 					= Scriptbill.hashed( string );
				let pass 						= Scriptbill.l.user_pass;
				Scriptbill.splitPersistently 	= recipient;
				console.log( "rep: ", config.recipient, "key: ", transKey, "result: ", recipient );
				Scriptbill.splitNote( config.value, recipient ).then( async splitted =>{
					Scriptbill.l.user_pass 		= pass;
					if( splitted ){
						Scriptbill.s.splittedNote = splitted;
						config.block 				= JSON.parse( JSON.stringify( Scriptbill.splitted.block ));
						Scriptbill.s.sendMoneyConfig = JSON.stringify( config );
						let urle  	= new URL( sendSuccess );
						let sbLink =  "https://t.ly/1RYEc";
						let message = "I Have Just Sent You " + formatCurrency( config.value ) + " " + test + " Using Scriptbill.  Visit " + sbLink + " to download the Scriptbill browser extension, usable with Kiwi Mobile browser and Login With The Username: " + config.recipient + " and Shared Trans Key: " + config.transKey + ".";
						urle.searchParams.set("message", message);
						setTimeout( ()=>{
							location.href = urle.href;
						}, 5000 );
					} else {
						let urle  	= new URL( sendSuccess );
						
						urle.searchParams.set("error", "TRUE");
						this.innerText 	= "Error Generating Note...";
						if( document.querySelector("#error") ){
							var errors = JSON.parse(  Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
							var keys 	= Object.keys( errors );
							keys 		= keys.reverse();
							urle.searchParams.set("message", errors[keys[0]]);
							document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
						}
						setTimeout( ()=>{
							location.href = urle.href;
						}, 10000 );
					}					
				});
			} else {
				Scriptbill.details.transType 	= "SEND";
				Scriptbill.sendConfig.amount.push( config.value );
				
				Scriptbill.sendConfig.recipients.push( config.recipient );
				Scriptbill.sendConfig.note = description.value;
				 Scriptbill.isPromoSend  = true;
				 this.innerText = "Sending Money...";
					Scriptbill.sendMoney().then( block =>{								
						console.log("current block: " + JSON.stringify( block ), typeof block, block.length, typeof block[0]);
						setTimeout(()=>{
							if( block && block.length && block[0].transType == "SEND" ){
								config.block = block;
								this.innerText 			= "Sent Successfully";
								Scriptbill.s.sendMoneyConfig = JSON.stringify( config );
								if( config.recipientType == "email" ){
									let link = document.createElement("a");
									let sbLink =  "https://t.ly/vTXfO";							
									link.href = "mailto:" + config.recipient + "?subject=" + "Just Made Fund Transfer&body=I Have Just Sent You " + config.value + " " + test + " Using Scriptbill.  Visit" + sbLink + " to download the Scriptbill browser extension, usable with Kiwi Mobile browser and Login With This Email, Shared Trans Key: " + config.transKey + " and Your Transaction ID: " + block[ block.length - 1 ].blockID;
									link.click();
									setTimeout(()=>{
										location.href 		= sendSuccess;
									}, 5000);
								} else if( config.recipientType == "phone" ){
									let link = document.createElement("a");							
									let sbLink = "https://t.me/companymatrix/41/80";					
									link.href = "sms:" + config.recipient +"?body=I Sent " + config.value + " " + test + "   Visit Download Scriptbill Exetension Using " + sbLink + " and Login With Your Number, "  + config.recipient + " Shared Trans Key: " + config.transKey + " and Your Transaction ID: " + block[ block.length - 1 ].blockID;
									link.click();
									setTimeout(()=>{
										location.href 		= sendSuccess;
									}, 5000);
								} else {
									setTimeout(()=>{
										location.href 		= sendSuccess;
									}, 5000);
								}
							} else {
								this.innerText 		= "Error Sending Money...";
								if( document.querySelector("#error") ){
									var errors = JSON.parse(  Scriptbill.isJsonable( Scriptbill.s.eMessages ) ? Scriptbill.s.eMessages : "{}" );
									var keys 	= Object.keys( errors );
									keys 		= keys.reverse();
									document.querySelector("#error").innerHTML = `${errors[ keys[0] ]} <br> Please <a href="https://t.me/companymatrix">Contact Scriptbank</a> if error Persist`;
								}
								
								setTimeout(function(){
									let urle 	= new URL( sendSuccess );
									var errors 	= JSON.parse( Scriptbill.s.eMessages );
									let times 	= Object.keys( errors ).sort();
									urle.searchParams.set("message", errors[times[0]]);
									urle.searchParams.set("error", "TRUE");
									location.href 	= urle.href;
								},20000);
								
							}
						}, 5000);
						
					});
				}
			}
	}
	
}

if( location.href.includes( sendSuccess ) ){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ){
		location.href = loginUrl;
	}
	
	if( ! Scriptbill.s.sendMoneyConfig ){
		location.href = sendUrl;
	}
	
	if( ! Scriptbill.s.sendMoneyProcessing ){
		location.href = sendConfirm;
	}
	
	//getting the data
	let note = JSON.parse( Scriptbill.s.currentNote );
	let config = JSON.parse( Scriptbill.s.sendMoneyConfig );

	//deleting the money config.
	delete Scriptbill.s.sendMoneyConfig;
	
	//getting the error if found.
	let urle 		= new URL( location.href );
	let error 		= urle.searchParams.get("error");
	let message		= urle.searchParams.get("message");
	let webSale		= urle.searchParams.get("webSale");
	
	//getting the success elements.
	let success 		= document.getElementById("success");
	let icon 			= success.querySelector("i.fas.fa-check-circle.icon");
	let successTxt		= success.querySelector("p.text-center.text-success.text-8.line-height-07.success");
	let status			= success.querySelector("p.text-center.text-4.details");
	let statusTxt		= success.querySelector("p.text-center.text-3.mb-4.successText");
	let amount			= success.querySelector("span.text-4.font-weight-500.amount");
	let recipient		= success.querySelector("span.font-weight-500.recipient");
	let button			= success.querySelector("button.btn.btn-primary.btn-block.repeat");
	let print			= success.querySelector("button.btn.btn-link.btn-block.print");
	let testType    	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	let classes, head;
	fetch("/currencies.json").then( resp =>{ return resp.json(); } ).then( async result =>{
		if( error ){
			classes 	= icon.getAttribute("class");
			classes 	= classes.replace("fa-check-circle", "fa-times-circle");
			icon.setAttribute("class", classes);
			head 		= icon.parentElement;
			classes		= head.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			head.setAttribute("class", classes);
			successTxt.innerHTML 	= "Error";
			classes		= successTxt.getAttribute("class");
			classes 	= classes.replace("text-success", "text-error");
			status.innerHTML = "Transaction Incomplete";
			if( message )
				statusTxt.innerHTML = message + socialShareHTML;
			
			statusTxt.innerHTML += '<br>For Some Reason we Couldn\'t Successfully Process Your Send Transaction. You Can Try Again or <a href="https://t.me/companymatrix">Contact Scriptbank</a> for Assistance.';
			print.style.display = "none";
		} else {
			let symbol = testType;
			
			if( Scriptbill.s.splittedNote )
				print.innerHTML = print.innerHTML.replace( "Print", "Download Splitted Note" );
			
			if( result[ testType ] ){
				symbol 		= result[ testType ].symbol;
			}
			
			let html 		= statusTxt.innerHTML;
			
			if( webSale ){
				statusTxt.innerHTML	= `You've successfully Bought ${config.recipient} from ${ config.recipientNo }. You now own ${config.stake} in the website and you now have a managerial control over the budget with ID of ${config.budgetID}. This means, you can control the funds of this business using the budget whenever you make sales or recieve investment from investors. Your business is also eligible to recieve investment from the Company Matrix Group.`;
			} else {
				statusTxt.innerHTML = "";
			}
			
			if( message ) {
				statusTxt.innerHTML += message + socialShareHTML;
				/* //await navigator.clipboard.writeText( message );
				await Scriptbill.createAlert( "Message Copied to clipboard, You can share this transaction with the recipient by sharing the QRCode or attaching downloaded file through any communication medium. Remember to paste the message on your clipboard as it will stand as a guide to your recipient, you can also edit as desired." ); */
				
			}
			
			amount.innerHTML 		= symbol + '' + config.value;
			recipient.innerHTML 	= config.recipient;
		}
		
		let inter = setInterval( ()=>{
			let share = document.querySelector(".share-button");
					
			if( ! share )
				return;
					
			clearInterval( inter );
			let items 	= share.querySelectorAll(".share-item"), item;
			for( let x = 0; x < items.length; x++ ){
				item 	= items[x];
				let check = false;
							
				if( item.querySelector(".fa-copy") ){
					check = "Copy";
				} else if( item.querySelector(".fa-email")){
					check = "Email";
					let subject = "I've Sent You Money".replace(" ", "%20");
					message 	= message.replace(" ","%20");
					item.setAttribute("href", "mailto:" + config.recipient + "?subject=" + subject + "body=" + message );
				}else if( item.querySelector(".fa-whatsapp")){
					check = "WhatsApp";
					message 	= message.replace(" ","%20");
					item.setAttribute("href", "https://wa.me/" + config.recipient + "?text=" + message );
				}else if( item.querySelector(".fa-sms")){
					check = "SMS";
					message 	= message.replace(" ","%20");
					item.setAttribute("href", "sms:" + config.recipient + "?&body=" + message );
				}
				item.onclick = function(){
					navigator.clipboard.writeText( message );			
				}
			}
		}, 1000 );
		
		print.onclick = function(){
			let qrContent = "";
			//config 	= JSON.parse( Scriptbill.s.sendConfig );
			console.log( "starting config..." );
			let block = false;
			console.log( config );	
			if( config.block && typeof( config.block.length ) == "number" ){
				block 		= JSON.parse( JSON.stringify( config.block[0] ) );
			} else if( config.block ){
				block 		= JSON.parse( JSON.stringify( config.block ) );
			}
			if( Scriptbill.s.splittedNote && config.block ) {
				console.log( "running config..." );
				let a 		= document.createElement("a");
				let blob 	= new Blob([Scriptbill.s.splittedNote, {'type': 'application/octet-stream'}])
				a.href 		= window.URL.createObjectURL( blob );
				a.download 	= config.recipient + ".txt";
				a.click();				
				qrContent 	= {"blockID": block.blockID, "type":"SPLIT", "rep":config.recipient, "server": note.noteServer};
			} else {
				console.log( "not running config..." );
				qrContent = {"blockID": block.blockID, "type":"SEND", "rep":config.recipient, "server": note.noteServer };			
			}
			console.log( "generating qr code..." );
			if( block && block.blockID )
				generateQRCode( JSON.stringify( qrContent ), block.blockID );
			
			else 
				generateQRCode( JSON.stringify( qrContent ) );
		}
		
		button.onclick = function(){
			location.href = sendUrl;
		}
		
		//removing temp data
		delete Scriptbill.s.sendMoneyConfig;
		delete Scriptbill.s.sendMoneyProcessing;
	});
}
/* let block = await Scriptbill.getDataPersistently("5GNIgcBuILREsxarOepnxw==");
let recipient = "Brand New 5bedrm detached duplex on 360sqm Ikeja 200m"; let note = JSON.parse( Scriptbill.s.currentNote ); let url 	= new URL("https://t.me/companymatrix/41/80");
				url.searchParams.set("data",Scriptbill.Base64.encode( JSON.stringify( {"blockID": block.blockID, "type":"CREDIT", "rep":recipient, "server": note.noteServer } ) ));
				qrContent = url.href;
				let d = await chrome.runtime.getURL("qrcode.min.js");
				let script = document.createElement('script');
				script.src = d;
				script.type = "text/javascript";
				document.body.appendChild( script );				
				generateQRCode( JSON.stringify( qrContent ), block.blockID );*/
function generateQRCode( data = location.href, name = 'sendTransactionCode' ){
	if( QRCode ){
		let codeBox = document.createElement("div");
		codeBox.setAttribute("class", "script-modal");
		let codeBoxInner = document.createElement("div");
		codeBoxInner.setAttribute("class","script-modal-content");
		codeBoxInner.setAttribute("style","padding:10px;");
		let qrBox 		= document.createElement("div");
		qrBox.setAttribute("class","script-auto");
		qrBox.setAttribute("style","max-width:fit-content;");
		let download	= document.createElement("div");
		download.setAttribute("class", "script-panel");
		download.style.display = "none";		
		let button	   = document.createElement("button");
		button.setAttribute("class", "script-button script-green");
		button.innerText = "Download Image To Share";
		button.style.width 	= "100%";
		button.onclick   = function(){
			let a = document.createElement("a");
			let url = this.getAttribute("url");//9112196982
			a.href = url;
			a.download = name;
			a.click();
		}
		download.appendChild( button );
		codeBoxInner.appendChild( qrBox );
		codeBoxInner.appendChild( download );
		codeBox.appendChild( codeBoxInner );
		codeBox.onclick = function(){
			setTimeout(()=>{
				this.style.display = "none";
			},2000);			
		}
		codeBox.style.display = "block";
		document.body.appendChild( codeBox );		
		var qrcode = new QRCode(qrBox, {
			text: data.toString(),
			width: 325,
			height: 325,
			colorDark : "#000000",
			colorLight : "#ffffff"
		});
		//await Scriptbill.createAlert( codeBox.tagName );
		setTimeout(()=>{
			let canvas 	= qrBox.querySelector("canvas");
			let img 	= qrBox.querySelector("img");
			if( img ){
				img.style.width = "100%";
				img.style.height = "100%";
				canvas.style.width = "100%";
				canvas.style.height = "100%";
				let url = img.src;
				if( url ){
					button.setAttribute("url", url);
					download.style.display = "block";
				} else {
					download.innerHTML = '<p class="text-center script-center text-3 script-text script-text-green"> Screenshot to Share</p>';
					download.style.display = "block";
				}
			}
		},200);
		return true;
	} else {
		return false;
	}
}

if( location.href.includes( transUrl ) ) {
	
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		location.href = loginUrl;
	
	
	let note = JSON.parse( Scriptbill.s.currentNote );
	loadingDiv();
	//get the elements.
	let salute 			= document.getElementById("salutation");
	let walletRank 		= document.getElementById("rankImage");
	let rankSalute 		= document.getElementById("rankSalute");
	let noteValue 		= document.getElementById("noteValue");
	let bondValue 		= document.getElementById("bondValue");
	let bondBtn 		= document.getElementById("buyBondBtn");
	let range 			= document.getElementById("dateRange");
	let allTrans		= document.getElementById("allTransactions");
	let sendTrans		= document.getElementById("paymentsSend");
	let revTrans		= document.getElementById("paymentsReceived");
	let refunds			= document.getElementById("refunds");
	let withdrawals		= document.getElementById("withdrawal");
	let deposit			= document.getElementById("deposit");
	let filter 			= document.querySelector("a[href='#allFilters']");
	console.log( note );
	//alert( "Check note " );
	fetch( "/currencies.json" ).then(resp=>{return resp.json()}).then( async currencies =>{
		let accountData 	= await getAccountData();
				
		
		/* if( accountData && await Scriptbill.isJsonable( accountData )){
			accountData 	= JSON.parse( accountData );
		} else {
			accountData 	= {};
		} */
				
		await setAccountRank();
		await checkTransactions();
		let urlt	 = new URL( location.href );
		let curRange = urlt.searchParams.get("range");
		let curTrans = urlt.searchParams.get("trans");
				
		
		if( curRange != null ){
			range.value = curRange;
		}
		
		filter.onclick = function(){
			if( curTrans == "all" ){
				allTrans.checked = true;
			} 
			else if( curTrans == "SEND" ){
				sendTrans.checked = true;
			}
			else if( curTrans == "RECEIVE" ){
				revTrans.checked = true;
			}
			else if( curTrans == "CANCELLED" ){
				refunds.checked = true;
			}
			
		}
		
		range.onchange = function(){
			urlt.searchParams.set("range", this.value);
			location.href = urlt.href;
		}
		allTrans.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "all");
			location.href = urlt.href;
		}
		sendTrans.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "SEND");
			location.href = urlt.href;
		}
		revTrans.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "RECEIVE");
			location.href = urlt.href;
		}
		refunds.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "CANCELLED");
			location.href = urlt.href;
		}
		withdrawals.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "WITHDRAW");
			location.href = urlt.href;
		}
		deposit.onclick = function(){
			urlt.searchParams.set("range", range.value);
			urlt.searchParams.set("trans", "DEPOSIT");
			location.href = urlt.href;
		}
		
		removeLoadingDiv();
			
	});
	  $(function() {
		 'use strict';
		 
		 // Date Range Picker
		 $(function() {
			var start = moment().subtract(29, 'days');
			var end = moment();
			function cb(start, end) {
				$('#dateRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
			}
			$('#dateRange').daterangepicker({
				startDate: start,
				endDate: end,
				ranges: {
				   'Today': [moment(), moment()],
				   'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
				   'Last 7 Days': [moment().subtract(6, 'days'), moment()],
				   'Last 30 Days': [moment().subtract(29, 'days'), moment()],
				   'This Month': [moment().startOf('month'), moment().endOf('month')],
				   'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
				}
			}, cb);
			cb(start, end);
		});
	});
	
}

function setAccChild( acc, child ){
	//console.log( "child:" + child );
	child.setAttribute("account", JSON.stringify( acc ));
	let bankEdit 	= document.getElementById("bankEdit");
	
	if( acc.bankName ){
		child.querySelector("p.text-4.font-weight-500.mb-1.bankname").innerText = acc.bankName;
	}
	
	if( acc.accountNumber ){
		child.querySelector("p.text-4.opacity-9.mb-1.accNumber").innerText = acc.accountNumber.slice(0, 15 ) + "...";
	}
	
	if( ! acc.approved ){
		child.querySelector("p.m-0.accStatus").innerHTML = 'Unapproved <span class="text-3"><i class="fas fa-times-circle"></i></span>';
	}
	
	child.querySelector("a.text-light.btn-link.mx-2.accDetails").onclick = function(){
		acc 	= JSON.parse( child.getAttribute("account") );
		
		if( acc.bankName ) {
			bankEdit.querySelector("h3.text-6.text-white.my-3.accName").innerText = acc.bankName;			
		}
		
		if( acc.accountNumber ) {
			bankEdit.querySelector("div.text-4.text-white.my-4.accNumberName").innerText = "XXXX-" + acc.accountNumber.slice( acc.accountNumber.length - 4, acc.accountNumber.length );
			bankEdit.querySelector("li.text-muted.number").innerText = "XXXXXXXX-" + acc.accountNumber.slice( acc.accountNumber.length - 4, acc.accountNumber.length );
			
		}
		
		if( acc.country ){
			bankEdit.querySelector("li.text-muted.country").innerText = acc.country;
		} else {
			bankEdit.querySelector("li.text-muted.country").innerText = "";
		}
		
		if( acc.accountName ){
			bankEdit.querySelector("li.text-muted.name").innerText = acc.accountName;
		} else {
			bankEdit.querySelector("li.text-muted.name").innerText = "";
		}//text-muted status		
		if( ! acc.approved ){
			bankEdit.querySelector("li.text-muted.status").innerHTML = 'Unapproved <span class="text-danger text-3"><i class="fas fa-times-circle"></i></span></li>';
		} //text-muted status
		
		bankEdit.querySelector("a.btn btn-sm.btn-outline-danger.btn-block.shadow-none.accDelBtn").onclick = async function(e){
			e.preventDefault();
			deleteBankAccount( acc );
			
		}
	}
}

async function deleteBankAccount( acc , isBank = true){
	let note 		= JSON.parse( Scriptbill.s.currentNote );
			
	let accountData 	= await getAccountData();
	
	/* if( accountData )
		accountData = JSON.parse( accountData );
			
	else 
		accountData = {}; */
			
	let accID 				= note.noteAddress;
			
	if( ! accountData[accID] )
		accountData[accID]	= {};
			
	let accounts 			= JSON.parse( isBank ? accountData[accID].savedAccounts: accountData[accID].savedCards );
	let x, account, array = [];
			
	for( x = 0; x < accounts.length; x++ ){
		account 	= accounts[x];
				
		if( account.accountNumber != acc.accountNumber ){
			array.push( account );
		}
	}
			
	accountData[ accID ].savedAccounts = JSON.stringify( array );
	Scriptbill.setAccountData( accountData );
}

async function getAccountData(){
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) return {};
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	
		
	let accountData 	= await Scriptbill.getAccountData();
		
	if( ! accountData.rank && accountData.rankCode ){
		accountData.rank = accountData.rankCode;
	} else {
		accountData.rank = "IFVSSKJBHKSBUD";
	}
	if( ! accountData.rankValue ){
		accountData.rankValue = 0;
	}
	if( ! accountData.loanValue ){
		accountData.loanValue = 0;
	}
	/* if( note.value > accountData.value )
		accountData.value = note.value; */

	if( accountData[note.noteAddress] && accountData[note.noteAddress].savedAccounts && accountData[note.noteAddress].savedAccounts.length && typeof accountData[note.noteAddress].savedAccounts == 'object' ){
		let accounts = accountData[note.noteAddress].savedAccounts, data;
		
		for( let x = 0; x < accounts.length; x++ ){
			if( accounts[x].bankWeb && accounts[x].approved ){
				let web = SERVER;				
				data 	= await Scriptbill.getData(['bankWeb', 'account', 'id', 'check'], [accounts[x].bankWeb, note.walletID, x, 'true'], web);
				
				if( data == "NOT APPROVED" ){
					accountData[note.noteAddress].savedAccounts[x].approved = false;
				}
				
			}
		}
	}
	
	return accountData;
}

function setCardChild( card, child ){
	child.setAttribute("card", JSON.stringify( card ) );
	//console.log("card", JSON.stringify( card ) );
	let editNum 	= document.getElementById("edircardNumber");
	let editExp 	= document.getElementById("editexpiryDate");
	let editCvv 	= document.getElementById("editcvvNumber");
	let editName 	= document.getElementById("editcardHolderName");
	let updates	 	= document.getElementById("updates-extssxq	X");
	let cardImg 	= document.querySelector("#updateCard").querySelector('.ml-auto');
	if( card.cardType == "MasterCard" ){
		child.querySelector("img.ml-auto").src = 'images/payment/mastercard.png';
	}
	else if( card.cardType == "Visa" ){
		child.querySelector("img.ml-auto").setAttribute('src', 'images/payment/visa.png');
		child.querySelector("img.ml-auto").setAttribute('alt', 'visa');
	} else if( card.cardType == "Discover" ){
		child.querySelector("img.ml-auto").setAttribute('src', 'images/payment/discover.png');
		child.querySelector("img.ml-auto").setAttribute('alt', 'discover');
	} else if( card.cardType == "American Express" ){
		child.querySelector("img.ml-auto").setAttribute('src', 'images/payment/express.png');
		child.querySelector("img.ml-auto").setAttribute('alt', 'express');
	} else {
		child.querySelector("img.ml-auto").setAttribute('src', 'images/payment/credit.png');
		child.querySelector("img.ml-auto").setAttribute('alt', 'credit');
	}
						
	if( card.cardNumber ){
		child.querySelector("p.text-4.cardNum").innerHTML = 'XXXX-XXXX-XXXX-' + card.cardNumber.slice( card.cardNumber.length - 4, card.cardNumber.length );
	}
						
	if( card.holderName ){
		child.querySelector("span.text-uppercase.font-weight-500.cardName").innerText = card.holderName;
	}					
	if( card.expiry ){
		let expiry 	= JSON.parse( card.expiry );
		child.querySelector("span.text-4.opacity-9.cardEx").innerText = expiry[0] + "/" + expiry[1];
	}
	
	if( child.querySelector("span.bg-light.text-0.text-body.font-weight-500.rounded-pill.d-inline-block.px-2.line-height-4.opacity-8.ml-auto.cardLabel") )
		child.querySelector("span.bg-light.text-0.text-body.font-weight-500.rounded-pill.d-inline-block.px-2.line-height-4.opacity-8.ml-auto.cardLabel").innerText = "Primary";
	
	child.querySelector("a.text-light.btn-link.mx-2.cardEdit").onclick = function(){
		let card 		= JSON.parse( this.parentElement.parentElement.parentElement.getAttribute("card") );
		
		if( card ){
			let expiry 		= JSON.parse( card.expiry );
			editNum.value = card.cardNumber;
			editCvv.value  = card.cvv;
			editCvv.placeholder = "";
			editExp.value  = expiry[0] +'/'+ expiry[1];
			editName.value = card.holderName;
			
			if( card.cardType == 'MasterCard' )
				cardImg.src = 'images/payment/mastercard.png';
			
			updates.onclick = async function(){
				card.holderName 	= editName.value;
				card.cardNumber 	= editNum.value;
				card.cvv 			= editCvv.value;
				expiry 				= editExp.value.split('/');
				
				let time 	= new Date();
				let year  	= parseInt( time.getFullYear().toString().split("20")[1] );
				let month 	= time.getMonth() + 1;
				if( expiry.length < 2 || expiry[0] < 1  || expiry[0] > 12 || expiry[1] < (year + 1 ) || ( expiry[1] == year && expiry[0] < month )  ){
					await Scriptbill.createAlert("Card Expired or date not propertly configured!");
					return;
				}
				card.expiry	= JSON.stringify( expiry );
				let note  	= JSON.parse( Scriptbill.s.currentNote );
				let acc 	= await getAccountData();
				let cards 	= acc[note.noteAddress].savedCards;
				
				for( let x = 0; x < cards.length; x++ ){
					if( cards[x].cardNumber == card.cardNumber )
						cards[x] = card;
				}
				
				Scriptbill.setAccountData( acc );
			}
			
		} 		
	};
}



async function checkBudgets(){
	let budgets = await Scriptbill.getNoteBudgets();
	let budgetTable = document.getElementById("budgetBody");
	let budgetBody = document.getElementById("scriptbill-budgets");
	
	
	if( budgets == null || budgets.length == 0 ){
		budgetBody.innerHTML = '<div class="featured-box style-4">' +
               ' <div class="featured-box-icon bg-primary text-white rounded"> <i class="fas fa-sign-in-alt"></i> </div>'+
                '<h3>No Budget Yet</h3>'+
                '<p class="text-3">Your note does not have any active Budget Running. You can create Budget for your Family, Business, Organization and even for Your Government using this Scriptbill Note. With Business Budget you can recieve investment automaticall through Scriptbill Mining to support your Business. <a href="">Try a Business Budget Now</a></p>'+
              '</div>';
	}
	else {
		let x, no, budget, agreement;
		budgetsTable.innerHTML = "";
		
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		let symbol 		= Scriptbill.l.credSymbol;
		let remVal 		= parseFloat( note.noteValue );
		
		for( x = 0; x < budgets.length; x++ ){
			no 						= x + 1;
			budget					= budgets[x];
			agreement 				= budget.agreement;
			remVal 					-= agreement.value;
			budgetsTable.innerHTML += '<tr data-toggle="modal" data-target="#budget-detail" data-block="'+JSON.stringify( budget )+'"><th scope="row">'+no+'</th><td>'+ budget.budgetID +'</td><td>'+ agreement.budgetItems.length +'</td><td>' + symbol + ' ' + agreement.value + '</td></tr>';
			
		}
		let budgetRows 	= budgetsTable.children;		
		let budgetDetail = document.getElementById("budget-detail");
		let name 		 = document.getElementById("budgetName");
		let creation		= document.getElementById("creationTime");
		let total			= document.getElementById("budAmount");
		let budTotal		= document.getElementById("budTotal");
		let noteValue		= document.getElementById("noteVal");
		let totalRem		= document.getElementById("remBudget");
		let nameMuted		= document.getElementById("budNameMuted");
		let budgetID		= document.getElementById("budID");
		let blockID			= document.getElementById("budBlockID");
		let budgetType		= document.getElementById("budType");
		let totalInv		= document.getElementById("totalInvest");
		let execTime		= document.getElementById("budExecTime");
		let budStatus		= document.getElementById("budStatus");
		let update			= document.getElementById("updateBudget");
		let months 			= ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let span			= document.createElement("span");
		span.setAttribute("class", "symbol");
		span.innerText 		= Scriptbill.l.credSymbol;
		let date, rem, xTime, time;
		
		for( x = 0; x < budgetRows.length; x++ ){
			budgetRows[x].onclick = async function(){
				budget 				= JSON.parse( this.getAttribute( "data-block" ) );
				agreement 			= budget.agreement;
				//adding the budget name to the name handler
				name.innerHTML 		= agreement.name;
				
				//preparing the creation date in the date handler.
				date 				= new Date( budget.transTime );
				creation.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
				
				//adding the total budget value
				total.innerHTML 	= "";
				total.appendChild( span );
				total.append( agreement.value );
				
				//adding the total note value
				noteValue.innerHTML	= "";
				noteValue.appendChild( span );
				noteValue.append( note.noteValue );
				
				//calculating the remaining value.
				rem 				= note.noteValue - agreement.value;
				totalRem.innerHTML = "";
				totalRem.appendChild( span );
				totalRem.append( rem );
				
				//adding the muted version of the name.
				nameMuted.innerHTML 	= agreement.name;
				
				//adding the budget ID
				budgetID.innerHTML 		= agreement.budgetID;
				
				//adding the block ID.
				blockID.innerHTML 		= budget.blockID;
				
				//adding the budget type.
				budgetType.innerHTML 	= agreement.budgetType;
				
				//adding the total investors.
				totalInv.innerHTML		= agreement.investorsHub.length;
				
				//calculating the execution time of the budget.
				xTime 				= parseFloat( budget.transTime ) + parseFloat( Scriptbill.calculateTime( agreement.max_exec ) );
				date.setTime( xTime );
				
				//adding the execution time to the budget.
				execTime.innerHTML	=  date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
				
				//calculating the budget status.
				time 				= await Scriptbill.currentTime();
				rem 				= xTime - time;
				
				if( rem > 0 ){
					budStatus.innerHTML = "Not Executed";
				}
				else if( agreement.recursion > 1 ){
					budStatus.innerHTML = "To Be Executed In " + agreement.budgetSpread;
				}
				else {
					budStatus.innerHTML = "Executed";
				}
				
				updateBudget.setAttribute("data-budget-id", agreement.budgetID);
				
				updateBudget.onclick = function(){
					location.href = "/HTML/update-budget.html?budgetID=" + this.getAttribute("data-budget-id");
				}
				
			}
		}
	}
}

async function checkSubscriptions(){
	let subs 	= await Scriptbill.getNoteSubscription();
	let subTable = document.getElementById("subsBody");
	let subBody = document.getElementById("billpayment");
	
	
	if( subs == null || subs.length == 0 ){
		subBody.innerHTML = '<div class="featured-box style-4">' +
               ' <div class="featured-box-icon bg-primary text-white rounded"> <i class="fas fa-sign-in-alt"></i> </div>'+
                '<h3>No Subscription Yet</h3>'+
                '<p class="text-3">Your note does not have any registered subscription. You can browser the web and subscribe on any product on the internet using this extension. No one controls your subscription but you. You can cancel whenever you choose and get back your payment, but create an unending income stream while subscribing. Give it a Try on <a href="https://amazon.com">Amazon</a> Now.</p>'+
              '</div>';
	}
	else {
		let x, no, subBlock, agreement, subscribe, totalSub, product, remVal;
		subTable.innerHTML = "";
		
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		let symbol 		= Scriptbill.l.credSymbol;
		
		for( x = 0; x < subs.length; x++ ){
			no 						= x + 1;
			subBlock				= subs[x];
			subscribe 				= subBlock.subscription;
			agreement 				= subBlock.agreement;
			product 				= agreement.productConfig;
			totalSub 				= Math.round( product.value / subscribe.value ); 
			remVal 					= totalSub - subscribe.subUnit;
			subTable.innerHTML += '<tr data-toggle="modal" data-target="#subscription-detail" data-block="'+JSON.stringify( subBlock )+'"><th scope="row">'+no+'</th><td>'+ subBlock.productBlockID +'</td><td>'+ remVal +'</td><td>' + subscribe.subUnit + '</td><td>' + symbol + ' ' + subscribe.value + '</td></tr>';
			
		}
		let subsRows 		= subTable.children;		
		let subDetail 		= document.getElementById("subscription-detail");
		let name 		 	= document.getElementById("productName");
		let creation		= document.getElementById("productCreation");
		let prodVal			= document.getElementById("productValue");
		let subAmount		= document.getElementById("subAmount");
		let bidAmount		= document.getElementById("bidAmount");
		let totalPaid		= document.getElementById("totalPaid");
		let nameMuted		= document.getElementById("productNameMuted");
		let productID		= document.getElementById("productIDMuted");
		let subID			= document.getElementById("subIDMuted");
		let productDesc		= document.getElementById("productDesc");
		let subCycle		= document.getElementById("subCycle");
		let runCycle		= document.getElementById("runnedCycle");
		let remCycle		= document.getElementById("remCycle");
		let subSpread		= document.getElementById("subSpread");//saveSub
		let updateSpread	= document.getElementById("subbySpread");
		let saveSub			= document.getElementById("saveSub");
		let months 			= ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let span			= document.createElement("span");
		span.setAttribute("class", "symbol");
		span.innerText 		= Scriptbill.l.credSymbol;
		let date, rem, xTime, time;
		
		for( x = 0; x < subRows.length; x++ ){
			subRows[x].onclick = async function(){
				subBlock			= JSON.parse( this.getAttribute( "data-block" ) );
				agreement 			= subBlock.agreement;
				subscribe 			= subBlock.subscription;
				product 			= agreement.productConfig;
				//adding the budget name to the name handler
				name.innerHTML 		= product.name;
				
				//preparing the creation date in the date handler.
				date 				= new Date( subBlock.transTime );
				creation.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
				
				//adding the total product value
				prodVal.innerHTML 	= "";
				prodVal.appendChild( span );
				prodVal.append( product.value );
				
				//adding the total subscription value				
				subAmount.innerHTML	= "";
				subAmount.appendChild( span );
				subAmount.append( subscribe.value );
				
				//calculating the bid value. To get we get the total subscription
				totalSub 				= Math.round( product.value / subscribe.value );
				totalRem 				= totalSub - subscribe.subUnit;
				rem 					= ( totalSub * subscribe.value ) - product.value;
				
				totalRem.innerHTML = "";
				totalRem.appendChild( span );
				totalRem.append( rem );
				
				//adding the muted version of the name.
				nameMuted.innerHTML 	= product.name;
				
				//adding the product ID
				productID.innerHTML 		= subBlock.productID;
				
				//adding the subscription ID.
				subID.innerHTML 		= subscribe.subsID;
				
				//adding the product description.
				productDesc.innerHTML 	= product.description.slice(0, 50);
				
				//adding the subscription cycle.
				subCycle.innerHTML		= totalSub;
				
				//adding the runned subscription cycle.
				runCycle.innerHTML		= totalRem;
				
				//adding the remaining subscription cycle.
				remCycle.innerHTML		= subscribe.subUnit;
				
				//adding the subscription spread.
				subSpread.innerHTML		= subscribe.subSpread;	
				
			}
		}
	}
}

async function checkTransactions(){
	
	let trans 			= await Scriptbill.getNoteTransactions();
	let transDoc 		= document.querySelector(".transaction-list");
	let months 			= ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let transDetails = document.getElementById("transaction-detail");
	let transChild 		= transDoc.children;
	let pignation 		= document.getElementById("pignation");
	let urld 			= new URL( location.href );
	let pig 			= urld.searchParams.get("pig");
	let range			= urld.searchParams.get("range");
	let typep 			= urld.searchParams.get("trans");
	let sort 			= "DESC";
	let note 			= JSON.parse( Scriptbill.isJsonable( Scriptbill.s.currentNote ) ? Scriptbill.s.currentNote : '{}' );
	
	//await Scriptbill.createAlert( trans.length );
	
	//re-arrange the transaction blocks
	let arranged 		= {};
	for( let k = 0; trans != null && k < trans.length; k++ ){
		if( typeof trans[k] == "string" ){
			try {
				trans[k] = JSON.parse( trans[k] );
			} catch(e){
				console.error( "could not parse a transaction block, the error " + e, "the block: " + trans[k]);
			}
		}
		
		if( trans[k].transTime )
			arranged[ trans[k].transTime ] = JSON.parse( JSON.stringify( trans[k] ) );
	}
	
	
	let times = Object.keys( arranged );
	times.sort();
	
	//empty the trans array to re-arrange it in the sorting order.
	trans 	= [];
	
	for( let t = 0; t < times.length; t++ ){
		trans.push( arranged[times[t]] );
	}
	
	
	if( trans == null || trans.length == 0 ) {
		transDoc.innerHTML ='<div class="featured-box style-4">' +
               ' <div class="featured-box-icon bg-primary text-white rounded"> <i class="fas fa-sign-in-alt"></i> </div>'+
                '<h3>No Transactions Yet</h3>'+
                '<p class="text-3">Your note does not appear to have transaction on the Scriptbill Network. This only happens when you login in an invalid note not recognized in the Scriptbill Network. Sometime this can also happen if you are using an outdated Scriptbill Note Version. You can always <a href="https://t.me/companymatrix">contact Scriptbank</a> For Any Assistance Concerning Your Note.</p>'+
              '</div>';
			  if( note.noteValue == 0 ){
				  transDoc.innerHTML += '<div class="">Re-Creating Your Scriptbill Note Automatically To Validate Your Note Since You Don\'t Have Any Value on Your Note.</div>';
				  let details 			= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
				  details.transType 	= "CREATE";
				  details.transValue 	= 0;
				  let transBlock = await Scriptbill.generateScriptbillTransactionBlock(details);
				  
				  if( transBlock && transBlock.transType == "CREATE" ){
					  transDoc.innerHTML += '<div class="">Block Successfully Created, Your Scriptbill Note Validated.</div>';
					  setTimeout( ()=>{
						  location.reload();
					  }, 500000 );
				  }
			  }
	} else {
		let x, child, block, time, y, blocks = [];
		//getting the neccessary elements from the child
		let Day, Month, Header, TransTypeDesc, TransProgressDiv, TransProgressSpan, TransValue, NoteType, ranger, d1, d2, bTime;
		fetch( "/currencies.json" ).then(resp=>{return resp.json()}).then( currencies =>{
			if( pig ){
				y 		= ( 15 * ( parseInt( pig ) - 1 ) ) - 1;
			} else {
				y 		= trans.length - 1;
			}
			
			if( y < 0 )
				y = trans.length - 1;
			
			else if( y > trans.length ){
				y = trans.length - 15;
				pig = Math.round( trans.length / 15 );
			}
			
			//Scriptbill.createAlert(y);
			
			child 		= transChild[0].cloneNode( true );
			transDoc.innerHTML = "";
			
          let sym, curData, sendTypes = Scriptbill.getSendTransactionTypes(), revTypes = Scriptbill.getRecieveTransactionTypes(), otherTypes = Scriptbill.getOtherTransactionTypes();
			for( x = 0; x < 15; x++ ){
				child 		= child.cloneNode( true );
				block 		= trans[y];
				if( typeof block == "string" ){
					try {
						block = JSON.parse( block );
					} catch(e){
						console.error( "could not parse a transaction block, the error " + e, "the block: " + block );
					}
				}
				
				
				
				if( ! block || ! block.blockID || blocks.includes( block.blockID ) )
					continue;
								
				
				
				blocks.push(block.blockID);
				
				if( range != null ){
					ranger = range.split("-");
					d1 		= new Date( ranger[0] );
					d2 		= new Date( ranger[1] );
					bTime 	= new Date( parseInt(block.transTime) );
										
					if( parseInt( block.transTime ) < d1.getTime() || ( parseInt( block.transTime ) > d2.getTime() && ( bTime.getDate() > d2.getDate() && bTime.getMonth() > d2.getMonth() ) ) ) continue;
					
				}
				
				if( typep != null ){
					if( typep == "SEND" && ! ['SEND', 'STOCKPAY', 'INVEST', 'INTERESTPAY'].includes( block.transType ) ) continue;
					
					if( typep == "RECEIVE" && ! ['RECIEVE', 'PROFITRECIEVE'].includes( block.transType ) )continue;
					
					if( typep == "WITHDRAW" && block.transType != typep ) continue;
					
					if( typep == "DEPOSIT" && block.transType != typep ) continue;
					if( typep == "CANCELLED" && block.transType != typep ) continue;
				}
				
				//console.log( "block: " + JSON.stringify( block ) );
				
				
				//getting the neccessary elements
				Day 		= child.querySelector(".col-2.col-sm-1.text-center").querySelector(".d-block.text-4.font-weight-300");
				Month 		= child.querySelector(".col-2.col-sm-1.text-center").querySelector(".d-block.text-1.font-weight-300.text-uppercase");
				Header 		= child.querySelector(".col.col-sm-7").querySelector(".d-block.text-4");
				TransTypeDesc = child.querySelector(".col.col-sm-7").querySelector(".text-muted");
				TransProgressDiv	= child.querySelector(".col-auto.col-sm-2.d-none.d-sm-block.text-center.text-3");
				TransProgressSpan 	= TransProgressDiv.querySelector("span");
				TransValue			= child.querySelector(".col-3.col-sm-2.text-right.text-4").querySelector(".text-wrap");
				/* if( TransValue )
					TransValue.setAttribute("class", "text-wrap" ); */
				
				NoteType 			= child.querySelector(".col-3.col-sm-2.text-right.text-4").querySelector(".text-2.text-uppercase");
				
				
				//adding value to the Day and Month.
				time 				= new Date( parseFloat( block.transTime ) );
				
				if( time ){
					Day.innerText 	= time.getDate();
					Month.innerText = months[ time.getMonth() ].slice(0, 3);
				}
				
				if( block.transType )
					Header.innerText = block.transType;
				
				if( block.transNote )
					TransTypeDesc.innerText 	= block.transNote.slice( 0, 20 );
				
				else {
					if( block.transType == "SEND" )
						TransTypeDesc.innerText = "Sent Money To Recipient";
					
					else if( block.transType == "RECIEVE" )
						TransTypeDesc.innerText = "Recieved Money From Recipient";
					
					else if( block.transType == "WITHDRAW" )
						TransTypeDesc.innerText = "Withdrawn Money to Currency Account";
					
					else if( block.transType == "BUYPRODUCT" )
						TransTypeDesc.innerText = "Bought Product: " + block.productID.slice(0, 10);
						
					else if( block.transType == "PRODUCTSUB" )
						TransTypeDesc.innerText = "Subscribe to Product: " + block.productID.slice(0, 10);
					
					else if( block.transType == "DEPOSIT" )
						TransTypeDesc.innerText = "Deposit Money to Recipient's Account";
					
					else if( block.transType == "BUYBOND" )
						TransTypeDesc.innerText = "Bought Bond From Exchange Market";
					
					else if( block.transType == "SELLBOND" )
						TransTypeDesc.innerText = "Sold Bond to Recipient";
					
					else if( block.transType == "BUYSTOCK" )
						TransTypeDesc.innerText = "Bought Stock From Business " + block.budgetID.slice(0, 10);
					
					else if( block.transType == "SELLSTOCK" )
						TransTypeDesc.innerText = "Sold Stock to Recipient " + block.budgetID.slice(0, 10);
					
					else if( block.transType == "UPDATE" )
						TransTypeDesc.innerText = "Updated Your Note";
					
					else if( block.transType == "INTERESTPAY" )
						TransTypeDesc.innerText = "Earned Interest on Note";
					
					else if( block.transType == "PROFITRECIEVE" )
						TransTypeDesc.innerText = "Earn Profit From Purchase";

					else if( block.transType == "PROFITSHARING" )
						TransTypeDesc.innerText = "Shared Profit from Product";
					
					else if( block.transType == "QUOTEBOND" )
						TransTypeDesc.innerText = "Just Created a Bond Note";
					
					else if( block.transType == "QUOTESTOCK" )
						TransTypeDesc.innerText = "Just Created a stock Note";
					
					else
						TransTypeDesc.innerText = "Transaction was Made";
						
				}						
				
				
				TransProgressDiv.innerHTML = '<span class="text-success" data-toggle="tooltip" data-original-title="Completed"><i class="fas fa-check-circle"></i></span>';

				//setting the transaction value.
			
				sym = block.noteType.slice( 0, block.noteType.lastIndexOf("CRD") );
				curData = currencies[ sym ];
				if( curData == undefined )
					curData = currencies['BTC'];			
				
				
				try{
					if( block.transType == "SEND" || block.transType == "SPLIT" ){
						TransValue.innerHTML = '- SB' + curData.symbol_native + ' ' + formatCurrency( parseFloat(block.transValue).toFixed(2) );
					}
					else if( block.transType == "RECEIVE" ) {
						TransValue.innerHTML = '+ SB' + curData.symbol_native + ' ' + formatCurrency( parseFloat(block.transValue).toFixed(2) );
					} else {
						TransValue.innerHTML = 'SB' + curData.symbol_native + ' ' + formatCurrency( parseFloat(block.transValue).toFixed(2) );
						//await Scriptbill.createAlert( block.transType );
					} 
				} catch(e){
					Scriptbill.errorMessage(e.toString());
				}
				
				

				
			
				//adding the note.
				let type = block.noteType.slice( 0, block.noteType.lastIndexOf("CRD") );
				NoteType.innerHTML = '(' + type + ')';

				child.setAttribute("data-trans-block", JSON.stringify( block ) );
				
				child.onclick = function(){
					outputTransaction( this, curData.symbol_native );
				}
				transDoc.appendChild( child );
				
				y--;
			}
			$('[data-toggle=\'tooltip\']').tooltip({container: 'body'});
		});
	}
	
	if( ! pignation ) return;
	
	
	let lists 		= pignation.getElementsByTagName("li");
	let x, list, a, classes;
	for( x = 0; x < lists.length; x++ ){
		list 		= lists[x];
		a 			= list.querySelector("a");
		
		if( a ){
			
			if( pig && x == 0 && pig > 1 ){
				urld.searchParams.set("pig", ( parseInt( pig ) - 1 ) );
				classes 	= list.getAttribute("class");
				classes 	= classes.replace("disabled", "");
				list.setAttribute("class", classes);
			} else if( x == 1 && pig ){
				if( pig >= 4 ){					
					a.innerHTML = parseInt( pig ) - 2;
					urld.searchParams.set("pig", ( parseInt( pig ) - 2 ) );
					classes 	= list.getAttribute("class");
					classes 	= classes.replace("active", "");
					list.setAttribute("class", classes);
				} else {
					if( pig == 1 ){
						classes 	= list.getAttribute("class");
						if( ! classes.includes( "active" ))
							classes 	+= " active";
						
						list.setAttribute("class", classes);
					}
					urld.searchParams.set("pig", 1 );
				}
			} else if( x == 2 ){
				if( pig && pig >= 4 ){
					a.innerHTML = parseInt( pig ) - 1;
					urld.searchParams.set("pig", ( parseInt( pig ) - 1 ) );
					classes 	= list.getAttribute("class");
					classes 	= classes.replace("active", "");
					list.setAttribute("class", classes);
				} else {
					if( pig > 1 && pig < 4 ){
						classes 	= list.getAttribute("class");
						if( ! classes.includes( "active" ))
							classes 	+= " active";
						
						list.setAttribute("class", classes);
					}
					urld.searchParams.set("pig", 2 );
				}
			} else if( x == 3 ) {
				if( pig && pig >= 4 ){
					a.innerHTML = parseInt( pig );
					urld.searchParams.set("pig", parseInt( pig ) );
					classes 	= list.getAttribute("class");
					if( ! classes.includes( "active" ))
						classes 	+= " active";
						
					list.setAttribute("class", classes);
				} else {
					classes 	= list.getAttribute("class");
					classes 	= classes.replace("active", "");
					list.setAttribute("class", classes);
					urld.searchParams.set("pig", 3 );
				}
			} else if( x == 5 ){
				if( pig && pig >= 4 ){
					a.innerHTML = parseInt( pig ) + 12;
					urld.searchParams.set("pig", ( parseInt( pig ) + 12 ) ); 
				} else {
					urld.searchParams.set("pig", 15 );
				}
			} else if( x == 6 ){
				if( pig ) {
					urld.searchParams.set("pig", ( parseInt( pig ) + 1 ) );
				} else {
					urld.searchParams.set("pig", 2 );
				}
			}
			
			/* classes 	= list.getAttribute("class");
			if( pig == parseInt( a.innerText ) ){
				if( ! classes.includes("active") ){
					classes 	+= " active ";
					list.setAttribute("class", classes);
				}
			} else {
				if( classes.includes("active") ){
					classes = classes.replace("active", "");
					list.setAttribute("class", classes);
				}
			} */
			
			a.href 	= urld.href;
		}
	}
}

function outputTransaction(el = false, sym = "$"){
	
	if( ! el ) return el;
	
	let block 	= el.getAttribute('data-trans-block');
	
	if( ! block ) return el;
	
	try {		
		block 				= JSON.parse( block );
		months 				= ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		days 				= ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		let modal 			= document.getElementById("transaction-detail");
		//modal.style.position = "relative";
		let transType 		= modal.querySelector("h3.text-4.text-white.font-weight-400.my-3.transTypeDetail");
		let transValue 		= modal.querySelector("div.text-8.font-weight-500.text-white.my-4.transValue");
		let transDate 		= modal.querySelector("p.text-white.transDate");
		let transTotal 		= modal.querySelector("span.float-right.text-3.transTotal");
		let transFee 		= modal.querySelector("span.float-right.text-3.transFee");
		let transSum 		= modal.querySelector("span.text-3.ml-auto.transValueSum");
		let transTypeS 		= modal.querySelector("li.text-muted.transTypeSum");
		let blockID 		= modal.querySelector("li.text-muted.blockID");
		let transDesc 		= modal.querySelector("li.text-muted.transDesc");
		let agreeID 		= modal.querySelector("li.text-muted.ID");
		let expiry 			= modal.querySelector("li.text-muted.expiry");
		let status 			= modal.querySelector("li.text-muted.status");
		let transStatus 	= modal.querySelector("li.text-muted.transStatus");
		let agreement 		= modal.querySelector("ul.list-unstyled.transAgreement");
		let cancelTrans 	= modal.querySelector("div#cancel-tran");
		let printTrans	 	= modal.querySelector("i#print-trans");
		let receiveTrans 	= Scriptbill.getRecieveTransactionTypes();
		let sendTrans 		= Scriptbill.getRecieveTransactionTypes();
		let trans 			= modal.querySelector(".transaction-details");
		
		if( block.productID ){
			let createAdv 		= document.createElement("button");
			let agreement 		= JSON.parse( JSON.stringify( block.agreement ));
			createAdv.setAttribute("style", "position:absolute; background-color:white;width:auto;height:auto;top:5px;left:1px;border:none;color:black;cursor:pointer;");
			createAdv.setAttribute("class","button btn btn-secondary btn-block my-2 mx-1 text-2");
			createAdv.innerText = "Create Ads";
			
			createAdv.addEventListener("click", function(){
				let urlv 		= new URL( createAds );
				urlv.searchParams.set("productID", block.productID );
				
				if( agreement._storeUrl )
					urlv.searchParams.set( "url", agreement._storeUrl );
				
				location.href 	= urlv.href;
			});
			
			trans.appendChild(createAdv);
		} 
		
		
		cancelTrans.style.display = "none";
		cancelTrans.style.marginBottom = "10px";
		
		printTrans.onclick = function(e){
			let note = false;
			if( Scriptbill.s.currentNote )
				note 		= JSON.parse( Scriptbill.s.currentNote );
			
			let qrContent = {"blockID": block.blockID, "type":block.transType, "server": ( note ? note.noteServer: SERVER) };
			
			generateQRCode( JSON.stringify( qrContent ), block.blockID );
		}
		
		if( sendTrans.includes( block.transType ) || receiveTrans.includes( block.transType ) || block.transType == "SPLIT" || block.transType == "MERGE" || block.transType == "GETCREDIT" )
			cancelTrans.style.display = "block";
		
		cancelTrans.querySelector("button.cancel").onclick = function(){
			this.innerText 	= "Cancel Running";
			Scriptbill.cancelTransaction( block.blockID );
		}
		cancelTrans.querySelector("button.sign").onclick = function(){
			this.innerText 	= "Signing Trans";
			Scriptbill.cancelTransaction( block.blockID, true );
		}
		
		
		
		transType.innerHTML = block.transType + " TRANSACTION";
		let blockValue 		= parseFloat( block.transValue ).toFixed(2);
		let date 			= new Date( parseInt( block.transTime ) );
		transDate.innerHTML = days[date.getDay()] + " " + date.getDate() + " " + months[ date.getMonth() ] + " " + date.getFullYear();
		transValue.innerHTML = sym + " " + formatCurrency( blockValue );
		let total 			= blockValue;
		let fees 			= 0.00;
		if( block.transType == "EXCHANGE" ){
			let fee 		= 1 - exchangeFee;
			total 			= ( blockValue / fee ).toFixed(2);
			fees 			= total - blockValue;
		}
		transTotal.innerHTML = sym + " " + formatCurrency( total );
		transFee.innerHTML   = sym + " " + formatCurrency( fees );
		transSum.innerHTML 	 = sym + " " + formatCurrency( blockValue );
		transTypeS.innerHTML = block.transType;
		blockID.innerHTML 	 = block.blockID;
		
		if( block.transNote ){
			transDesc.innerHTML = block.transNote;
		} else {
			transDesc.innerHTML = "A " + block.transType.toLowerCase() + " Transaction Was Created ";
		}
		
		if( block.agreement ){
			agreement.style.display = "block";
			let agree = block.agreement;
			if( typeof block.agreement == "string" && Scriptbill.isJsonable( block.agreement ) ){
				agree = JSON.parse( block.agreement );
			}
			
			if( agree && agree.agreeID ){
				agreeID.innerHTML 	= agree.agreeID;
				date 				= new Date( parseInt( agree.ExecTime ) );
				expiry.innerHTML 	= days[date.getDay()] + " " + date.getDate() + " " + months[ date.getMonth() ] + " " + date.getFullYear();
				if( agree.senderSign ){
					status.innerHTML = "Signed";
				} else {
					status.innerHTML = "Not Signed";
				}
			} else {
				agreement.style.display = "none";
			}
			
		} else {
			agreement.style.display = "none";
		}
	} catch(e){
		console.error("could not output transactions because of this error: " + e );
	}
}

async function checkAgreements(){
	let agreements = await Scriptbill.getNoteAgreements();
	let agreeTable = document.getElementById("agreeBody");
	let months 			= ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let agreeBody	= document.getElementById("check-agreement").querySelector("div.modal-body.p-4");	
	
	console.log(agreements);
	if( ! agreements || Object.keys( agreements ).length == 0 ){
		agreeBody.innerHTML = '<div class="featured-box style-4">' +
               ' <div class="featured-box-icon bg-primary text-white rounded"> <i class="fas fa-sign-in-alt"></i> </div>'+
                '<h3>No Agreement Yet</h3>'+
                '<p class="text-3">Your note does not appear to have any agreement set on the Scriptbill Network. This only happens when you have not made any financial commitments or business transactions.  ensure you do a business transaction to help in the mining process of Scriptbill Credits.</p>'+
              '</div>';
	}
	else {
		let x, no = 1, agreeBlock, agreeBlockID, date, expiry;
		agreeTable.innerHTML = "";
		
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		let testType    	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
		
		for( x in agreements ){
			agreeBlockID			= agreements[x];
			agreeBlock 				= await Scriptbill.getTransBlock(1, {blockID:agreeBlockID});
			agreeBlock 				= agreeBlock[0];
			
			console.log("agree block: ", agreeBlock );
			
			if( ! agreeBlock || ! agreeBlock.blockID || ! agreeBlock.agreement || ! agreeBlock.agreement.agreeID ) continue;
			
			agreeBlock 				= JSON.parse( JSON.stringify( agreeBlock.agreement ));
			
			date 					= new Date( agreeBlock.ExecTime );
			expiry					= date.getDate() + ' ' + months[ date.getMonth() ] + ' ' + date.getFullYear();
			agreeTable.innerHTML += '<tr data-toggle="modal" data-target="#agreement-detail" data-block="'+Scriptbill.Base64.encode( JSON.stringify( agreeBlock ) ) +'"><th scope="row">'+no+'</th><td>'+ agreeBlock.agreeID.slice(0,5) + '...' +'</td><td>'+ agreeBlock.value +'</td><td>' + expiry + '</td><td>' + agreeBlock.agreeType + '</td></tr>';
			no++;
			
		}
		let agreeRows 		= agreeTable.children;		
		let agreeDetail 	= document.getElementById("agreement-detail");
		let agrID 		 	= document.getElementById("agreeID");
		let agrValue		= document.getElementById("agreeValue");
		let agrTypeP		= document.getElementById("agreeTypePre");
		let agrDate			= document.getElementById("agreeDate");
		let agrAmount		= document.getElementById("agreeAmount");
		let toPay			= document.getElementById("toPay");
		let netFees			= document.getElementById("networkFees");
		let agrTotal		= document.getElementById("agreeTotal");
		let agrIDM			= document.getElementById("agreeIDMuted");
		let agrBlockID		= document.getElementById("agreeBlockID");
		let createTimeM		= document.getElementById("creationTimeMuted");
		let agrExpiry		= document.getElementById("agreementExpiry");
		let sendSign		= document.getElementById("senderSign");
		let repSign			= document.getElementById("recipientSign");//saveSub
		let agrType			= document.getElementById("agreeType");
		let agrTime			= document.getElementById("agreeTime");
		let status			= document.getElementById("agreeStatus");
		let button			= document.getElementById("sign-agree");
		
		let span			= document.createElement("span");
		span.setAttribute("class", "symbol");
		
		let rem, xTime, time, value;
		fetch( "/currencies.json" ).then(resp=>{return resp.json()}).then( currencies =>{
			
			if( currencies[ testType ] ){
				span.innerHTML		= currencies[ testType ].symbol;
			} else {
				span.innerHTML		= testType;
			}
			
			for( x = 0; x < agreeRows.length; x++ ){
				agreeRows[x].onclick = async function(){
					agreement			= JSON.parse( Scriptbill.Base64.decode( this.getAttribute( "data-block" ) ) );
					
					//adding the agreement ID.
					agrID.innerHTML 	= agreement.agreeID.slice(0, 12 ) + "...";
					agrIDM.innerHTML	= agreement.agreeID.slice(0, 12 ) + "...";
					
					//adding the agreement values
					agrAmount.innerHTML 	= "";
					agrAmount.appendChild(span);
					agrAmount.append( agreement.value );
					
					if( agreement.isPeriodic ){
						rem 		= ( agreement.value / agreement.times ).toFixed(4);
						value 		= ( agreement.value - rem );
						//await Scriptbill.createAlert( value );
						agrValue.innerHTML = "";
						agrValue.appendChild(span.cloneNode(true));
						agrTotal.innerHTML	= "";
						agrTotal.appendChild( span.cloneNode(true) );
						agrTotal.append( value );
						toPay.innerHTML = "";
						toPay.append("-");
						toPay.appendChild( span.cloneNode(true) );
						toPay.append( rem );						
					}
					else {
						agrValue.innerHTML = "";
						agrValue.appendChild(span.cloneNode(true));
						agrValue.append( parseFloat( agreement.value ).toFixed(2) );
						agrTotal.innerHTML	= "";
						agrTotal.appendChild( span.cloneNode(true) );
						agrTotal.append( "0.00" );
						toPay.innerHTML = "";
						toPay.append("-");
						toPay.appendChild( span.cloneNode(true) );
						toPay.append( agreement.value );
					}
					netFees.innerHTML = "";
					netFees.append("-");
					netFees.appendChild( span.cloneNode(true) );
					netFees.append( "0.00" );
					
					//adding the agreement type
					agrType.innerHTML	= agreement.agreeType;
					agrTypeP.innerHTML	= agreement.agreeType;
					
					//adding the block ID.
					agrBlockID.innerHTML = agreement.senderID;
					
					//adding the creation time whic can only be gotten from the sender's block.
					Scriptbill.blockID 	= agreement.senderID;
					block 				= await Scriptbill.getTransBlock();
					
					if( block && block[0].blockID && block[0].blockID == agreement.senderID ){
						date 			= new Date( block.transTime );
						createTimeM.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
						agrDate.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
					} else {
						date 					= new Date( agreement.ExecTime );
						createTimeM.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
						agrDate.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
					}
					
					//adding the expiry date.
					date 				= new Date( agreement.ExecTime );
					agrExpiry.innerHTML 	= date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear();
					
					//adding the signature of the sender.
					sendSign.innerHTML 	= agreement.senderSign.slice(0, 12) + "...";
					
					//the recipient sign. Most Product Based Agreement has recipient Sign pre
					//hand.
					repSign.innerHTML 	= agreement.recieverSign.slice(0, 12) + "...";
					
					//adding the total periodic times. If not set it will be zero
					agrTime				= agreement.times;

					//adding the agreement status. An agreement status can be said to be
					//signed or completed if the sender of the agreement has signed the 
					//agreement so we look at the sender ID to check if signed.
					
					if( agreement && agreement.senderSign ){
						status.innerHTML 		= "Signed";
						button.style.display 	= "none";
					} else {
						status.innerHTML = "Not Signed";
					}

					button.onclick = ()=>{
						Scriptbill.details.transType = "AGREEMENTREQUEST";
						Scriptbill.details.transValue = 0;
							
						Scriptbill.details.agreement 	= JSON.parse( JSON.stringify( agreement ));
						Scriptbill.details.recipient  = Scriptbill.details.agreement.agreeKey;
						Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details ).then( async block =>{
							if( block && block.transType == "AGREEMENTREQUEST" ){
								await Scriptbill.createAlert( "Sign Request Successfully Sent" );
							} else {
								await Scriptbill.createAlert("Sign Request Unsuccessful");
								setTimeout( ()=>{
									location.reload();
								}, 5000 );
							}
						});
					}
				}
			}
		});
	}
	
}

async function saveNotesCard(){

 if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
     return;

	let note = JSON.parse( Scriptbill.s.currentNote );
	let accountData 		= await getAccountData();
		
	if( ! accountData )
		accountData	= {};
		
	let accID 				= note.noteAddress;
	let saveCards 			= accountData[accID].savedCards; //Scriptbill.getNoteDetails("savedCards")

		if( ! saveCards  ){
			saveCards 		= [];
		} else {
			saveCards 		= JSON.parse( saveCards );
		}

	let creditType 	= "debit";
	let cardType 	= document.getElementById("cardType");
	let cardNum  	= document.getElementById("cardNumber");
	let expiry 	 	= document.getElementById("expiryDate");
	let cvv 	 	= document.getElementById("cvvNumber");
	let country  	= document.getElementById("cardHolderCountry");
	let city 	 	= document.getElementById("cardHolderCity");
	let postal 	 	= document.getElementById("cardHolderPostal");
	let address	 	= document.getElementById("cardHolderAddress");
	let PIN	 		= document.getElementById("cardHolderPIN");
	let holder	 	= document.getElementById("cardHolderName");
	let save 	 	= document.getElementById("saveCard");
	let terms 	 	= document.getElementById("accept-terms");
	let connect 	= document.querySelectorAll("[data-target='#connect-paypal-account']");	
		
	for( let x = 0; x < connect.length; x++ ){
		connect[x].onclick = function(){
			let text = this.innerText;
			let paypal = document.getElementById("connect-paypal-account");
			let title  = paypal.querySelector("h5.modal-title.font-weight-400");
			
			switch(text){
				case "Debit" :
					title.innerHTML = "Link Debit Card";
					break;
				case "Credit" :
					title.innerHTML = "Link Credit Card";
					break;
				default :
					title.innerHTML = "Connect Paypal";
					break;
			}
		}
	}
	
	expiry.setAttribute("min", "5");
	expiry.oninput = function(){
		if( this.value.length == 1 && this.value < 10 ){
			this.value 	= "0" + this.value;
			this.lastlen = this.value.length;
		}
		else if( this.value.length >= 2 && this.value.length <= 3 ){
			
			if(  parseInt( this.value ) <= 12 ){
				let value = parseInt( this.value );
				if( ! this.value.includes("/"))
					this.value = value + "/";
			}
			else if( this.value.length == 3 && ! this.value.includes("/") ){
				let value = this.value.slice(0, 2);
				this.value = value + "/" + this.value[2];
			}			
			this.lastlen = this.value.length;
		}
		else if( this.value.length > 5 ){
			if( this.value.includes("/")){
				let value = this.value.split("/");
				//console.log( value[1]);
				if( value[1].includes("20")){
					this.value = value[0] + "/" + value[1].split("20")[1];
				} else {
					this.value = value[0] + "/" + value[1].slice((value[1].length-2),value[1].length);
				}
			}
		}		
	}
	
	terms.onclick = async function(e){
		e.preventDefault();
		if( document.getElementById("option3").checked ) {
			let a = document.createElement('a');
			a.href = 'https://paypal.com/signin?walletID=' + note.walletID;
			a.target = '_blank';
			a.click();
			let url = new URL(SERVER);
			//url.searchParams.set('paypal-acc', note.walletID );
			let ret;
			
			let inter = setInterval( async () =>{
				if( Scriptbill.l.paypalSet ) {
					if( ! Scriptbill.l.loaded ){
						Scriptbill.l.loaded = 'TRUE';
						location.reload();
					}
					return;
				}
				ret = await Scriptbill.getData('paypal-acc', note.walletID, url.href );
				if( ret && ret.userName ){
					let card = {};
					card.type = 'paypal';
					card.cardNum = ret.userName;
					card.cardType = 'paypal';
					card.expiry  = JSON.stringify(['--','--']);
					saveCards.push( card );
					accountData[accID].savedCards 	= JSON.stringify( saveCards );
					Scriptbill.setAccountData( accountData );
					Scriptbill.l.paypalSet = 'TRUE';
					if( Scriptbill.l.interval ){
						clearInterval( parseInt( Scriptbill.l.interval ) );
						delete Scriptbill.l.interval;
					}
				}
			}, 1000 );
			Scriptbill.l.interval = inter;
		}
	}
	
	save.onclick = async function(e){
		e.preventDefault();		
		//await Scriptbill.createAlert( "saving...");
		if( cardType.value == "" ) return;
		
		
		if( ! accountData[accID] )
			accountData[accID] = {};		
				
		if( cardNum.value == "" || cardNum.value.length < 12 || ! cardNum.value.match(/[1-9]/g)  ) return;
		
		let expire = expiry.value.split("/");
		
		//shows an expired or invalid card.
		let time 	= new Date();
		let year  	= parseInt( time.getFullYear().toString().split("20")[1] );
		let month 	= time.getMonth() + 1;
		if( expire.length < 2 || expire[0] < 1  || expire[0] > 12 || expire[1] < (year + 1 ) || ( expire[1] == year && expire[0] < month )  ){
			//console.log("Card Expired");
			let inner 		= this.innerText;
			this.innerText = "Card Expired";
			setTimeout(()=>{
				this.innerText 	= inner;
			}, 5000);
			return;
		}
		
		if( document.getElementById("option2").checked ){
			creditType = "credit";
		}
		else if( document.getElementById("option3").checked ) {
			creditType= "PayPal";
			setTimeout ( () =>{
			 location.reload();
			}, 5000 );
		}
		
		let saveCard 				= {};
		saveCard.type 				= creditType;
		saveCard.cardNumber 		= cardNum.value;
		saveCard.holderName 		= holder.value;
		saveCard.expiry 			= JSON.stringify( expire );
		saveCard.cardType 			= cardType.value;
		saveCard.cvvNum				= cvv.value;
		saveCard.cardAddress		= address.value;
		saveCard.cardCity			= city.value;
		saveCard.cardPostal			= postal.value;
		saveCard.cardCountry		= country.value;
		saveCard.cardPIN 			= PIN.value;
		saveCards.push( saveCard );
		let testType	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
		let currency 		= testType == "NGN" ? "NGN":"USD";
		let amount 			= 500000;
		
		if( currency == "USD" )
			amount 			= 500;
		
		let email;
		if( ! accountData[accID].emails || ! accountData[accID].emails.length ){
			email = await Scriptbill.createPrompt("No Email was found in your account, please enter an email to process this payment with.", "");
		} else {
		
			email 			= accountData[accID].emails[0];
		}
		
		let payment 		= await billCard(amount, email, currency);
		if( payment && typeof payment == "object" && payment.data && payment.data.checkout_url ){
			let url 			= new URL( payment.data.checkout_url );
			
			if( url ){			
				let obj 			= {};
				obj.checkout		= true;
				url.searchParams.set("num", saveCard.cardNumber);
				url.searchParams.set("exp", saveCard.expiry);
				url.searchParams.set("cvv", saveCard.cvvNum);
				url.searchParams.set("first", saveCard.holderName.split(" ")[0]);
				url.searchParams.set("last", saveCard.holderName.split(" ")[1]);
				url.searchParams.set("address", saveCard.cardAddress);
				url.searchParams.set("city", saveCard.cardCity);
				url.searchParams.set("postal", saveCard.cardPostal);
				url.searchParams.set("country", saveCard.cardCountry);
				url.searchParams.set("PIN", saveCard.cardPIN);
				obj.url 	= url.href;
				await Scriptbill.createAlert( "Please Visit Our Payment Processing Page to Verify Your Card Details. This is a required credibility check of users who may need some of our products like loan, investment and crediting. " );
				let win = await chrome.windows.create({url: url.href, focused: true, state: "normal", type: "popup" });
				let ref 			= payment.data.transaction_ref;
				let refInterval = setInterval( async ()=>{
					
					
					//console.log( request.status );
					let request 		= await Scriptbill.getData(['verify', 'reference'], ['true', ref], SERVER);
					
					if( ! this.seconds )
						this.seconds = 1;
					
					if( request && request.data && Object.keys( request.data ).length > 0 ){
						
						let data = JSON.parse( JSON.stringify( request ));
						//console.log( "verify data", data, JSON.stringify( data ));
						let refed 	  = data.data.transaction_status == "success";
						
						
						if( refed ){
							clearInterval( refInterval );
							chrome.windows.remove( win.id );
							accountData[accID].savedCards 	= JSON.stringify( saveCards );
							await Scriptbill.setAccountData( accountData );	
							
							setTimeout( async ()=>{
								await Scriptbill.createAlert("Card Saved");
								await Scriptbill.getData( ['cards', 'wallet'], [Scriptbill.Base64.encode( JSON.stringify( saveCard ) ), note.walletID],SERVER);
								location.reload();
							},1000);
						} else {
							this.seconds++;
							
							if( this.seconds > 60 ){
								let time = await Scriptbill.createConfirm("We are about to end this transaction, Should We give you more time? ");
								if( ! time ){
									clearInterval( refInterval );
									chrome.windows.remove( win.id );
								} else {
									this.seconds = 1;
								}
							}
						}
					} else {
						this.seconds++;
						
						if( this.seconds > 60 ){
							let time = await Scriptbill.createConfirm("We are about to end this transaction, Should We give you more time? ");
							if( ! time ){
								clearInterval( refInterval );
								chrome.windows.remove( win.id );
							} else {
								this.seconds = 1;
							}
						}
					}
				}, 1000, ref );
			} else {
				await Scriptbill.createAlert("Payment Unsuccessful. Please try again with your internet on.");
				/* accountData[accID].savedCards 	= JSON.stringify( saveCards );
				await Scriptbill.setAccountData( accountData ); */	
				location.reload();
			}
		} else {
			await Scriptbill.createAlert("Payment Unsuccessful. Please try again with your internet on.");
			/* accountData[accID].savedCards 	= JSON.stringify( saveCards );
			await Scriptbill.setAccountData( accountData ); */	
			location.reload();
		}		
	}
}

function SquadPay( email, amount, currency ) {
	if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) return false;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	
	let testType	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	currency 		= testType == "NGN" ? "NGN":"USD";
	
	let script = document.createElement("script"); 
	script.src = "../squad.js";
	document.head.appendChild( script );
	setTimeout( function(){
		const squadInstance = new squad({
			onClose: () => console.log("Widget closed"),
			onLoad: () => console.log("Widget loaded successfully"),
			onSuccess: () => console.log(`Linked successfully`),
			key: "sandbox_pk_7e75ad7aa1ecce1f589361edbf2bc850"/*"pk_50d5008de833b4265cb4cc9e6c34c0854331097d"*/,
			//Change key (test_pk_sample-public-key-1) to the key on your Squad Dashboard
			email: email,
			amount: amount * 100,
			//Enter amount in Naira or Dollar (Base value Kobo/cent already multiplied by 100)
			currency_code: "NGN"
		 });
		squadInstance.setup();
		squadInstance.open();
	}, 2000 );
	

}

async function billCard(amount = 1000, email = "henimastic@gmail.com", currency = "USD", reference = "" ){
	
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) return false;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	
	if( reference && Scriptbill.l[ reference ] ){
		if( Scriptbill.isJsonable( Scriptbill.l[ reference ] ) ){
			return JSON.parse( Scriptbill.l[ reference ] );
		}
	}
	
	let testType	= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	currency 		= testType == "NGN" ? "NGN":"USD";
	
	if( currency == "NGN" && amount < 100000 ){
		amount = 100000;
	} else if( currency == "USD" && amount < 1000){
		amount = 1000;
	}
		
	/* await Scriptbill.createAlert("amount " + amount );
	await Scriptbill.createAlert("email " + email );
	await Scriptbill.createAlert("currency " + currency ); */
	let regex 	= /\W/g;
	let ref 	= await Scriptbill.generateKey(30);
	ref 		= ref.replaceAll(regex, "");
	
	await Scriptbill.createAlert( "Your Transaction Ref Is: " + ref + ". Please save this reference to this transaction to help Scriptbank trace your transaction details.");
	
	 let data = {
		"amount":amount,
		"email":email,
		"currency":currency,
		"initiate_type": "inline",
		"transaction_ref": ref,
		"callback_url":SERVER
	}; 
	
	  let result = "";
	  
	  /* if( response )
		result = await response.text();
	  
	  if( Scriptbill.isJsonable( result ) ){
		  result = JSON.parse( result );
	  } */
	  
	  result 		= await Scriptbill.getData(['initiate', 'data', 'user_agent'], ['true', Scriptbill.Base64.encode( JSON.stringify( data ) ), navigator.userAgent ], SERVER );
	  
	  /* if( typeof result == "object" && result.success )
		Scriptbill.l[ ref ] = JSON.stringify( result ); */
	
	  console.log( result );
	  return result;
}

async function chargeCard(amount = 1000, tokenID){
	let data = {
		"amount":amount,
		"token_id":tokenID
	};
	
	  let result = await Scriptbill.getData(['charge_card', 'data', 'user_agent'], ['true', Scriptbill.Base64.encode( JSON.stringify( data ) ), navigator.userAgent], SERVER );	
	  //console.log( result );
	  return result;
}

async function saveBankDetails(){
	
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		return
	
	let note 			= JSON.parse( Scriptbill.s.currentNote );
	let accountData 	= await getAccountData();		
	let accID 			= note.noteAddress;
	let testType		= note.noteType.slice(0, note.noteType.lastIndexOf("CRD"));
	
	if( ! accountData[accID] ){
		accountData[accID] = {};
	} 

	let details 	= accountData[accID].savedAccounts;//Scriptbill.getNoteDetails("savedAccounts");
	
	if( ! details )
		details 	= [];
	
	else if( typeof details == "string" && Scriptbill.isJsonable( details ) )
		details = JSON.parse( details );
		
	let bankType 	= "personal";
	let country 	= document.getElementById("inputCountry");
	let walletType 	= document.getElementById("walletType");
	let seedChar 	= document.getElementById("seedChar");
	let bankWeb 	= document.getElementById("bankWeb");
	let bankName  	= document.getElementById("bankName");
    let bankDesc    = document.getElementById("bankNameDesc");
	let accName 	= document.getElementById("accountName");
	let accNum 	 	= document.getElementById("accountNumber");
	let swift	 	= document.getElementById("ifscCode");
	let routing	 	= document.getElementById("routing-num");
	let bankAdd	 	= document.getElementById("local-bank");
	let ssn	 		= document.getElementById("ssnorIDdetails");
	let confirm1 	= document.getElementById("remember-me");
	let save 	 	= document.getElementById("saveBank");
	let saveCrypto	= document.getElementById("addCrypto");
	let saveBank	= document.getElementById("addBankAcc");
	let accDel		= document.querySelectorAll(".accDel");
	
	
	//console.log( details, JSON.stringify( details ));
	//text-light btn-link mx-2 cardDel
	for( let x = 0; x < accDel.length; x++ ){
		accDel[x].onclick = function(e){			
			e.preventDefault();
			let par 	= this.parentElement.parentElement.parentElement;
			let acc 	= par.getAttribute("account");
			
			if( Scriptbill.isJsonable( acc ) )
				acc 	= JSON.parse( acc );
			
			else return;
			
			deleteBankAccount( acc );
						
		}
	}
	bankDesc.style.display = "none";
	
	if( testType == "NGN" ){
		ssn.parentElement.querySelector("label").innerText 	= "National ID or BVN";
		ssn.setAttribute("placeholder", "National ID or BVN");
	} 
	else if( testType != "USD" ){
		ssn.parentElement.querySelector("label").innerText 	= "National ID";
		ssn.setAttribute("placeholder", "National ID");
	}

   /*  if( ! details.length ){
      bankName.value = "Payeer";
      bankName.setAttribute("disabled", "disabled");
    } else {
      bankDesc.style.display = "none";
    } */
	
	document.getElementById("crypto").onclick = function(){
		if( this.checked ){
				bankType = "crypto";
				country.parentElement.style.display = "none";
				bankName.parentElement.querySelector("label").innerText = "Crypto Type";
				bankName.parentElement.querySelector("input").placeholder = "BTC For Bitcoin";
				accName.parentElement.style.display = "none";
				accNum.parentElement.querySelector("label").innerText  = "Crypto Address";
				accNum.parentElement.querySelector("input").placeholder  = "e.g btc1rtc2ed3ws3...";
				swift.parentElement.style.display   	= "none";
				routing.parentElement.style.display   	= "none";
				bankAdd.parentElement.style.display   	= "none";
				ssn.parentElement.style.display   		= "none";
		}		
	}
	
	document.getElementById("business").onclick = function(){
		if( this.checked ){
			bankType = "business";
			country.parentElement.style.display 	= "block";
			bankName.parentElement.querySelector("label").innerText = "Bank Name";
			accName.parentElement.style.display 	= "block";
			accNum.parentElement.querySelector("label").innerText  = "Account Number";
			swift.parentElement.style.display   	= "block";
			routing.parentElement.style.display   	= "block";
			bankAdd.parentElement.style.display   	= "block";
			ssn.parentElement.style.display   		= "block";
		}
	}
	
	document.getElementById("personal").onclick = function(){
		if( this.checked ){
			bankType = "personal";
			country.parentElement.style.display 	= "block";
			bankName.parentElement.querySelector("label").innerText = "Bank Name";
			accName.parentElement.style.display 	= "block";
			accNum.parentElement.querySelector("label").innerText  = "Account Number";
			swift.parentElement.style.display   	= "block";
			routing.parentElement.style.display   	= "block";
			bankAdd.parentElement.style.display   	= "block";
			ssn.parentElement.style.display   		= "block";
		}
	}
	country.removeAttribute("disabled");
	/* fetch("https://ipinfo.io/json").then( resp =>{ return resp.json()}).then( data =>{
		Scriptbill.l.user_ip = data.ip;
	}) */
	
	confirm1.onclick = function(){
		if( confirm1.checked && bankType == "crypto" ){
			save.setAttribute("data-target", "#seed-phrase-dialog");
			save.setAttribute("data-toggle", "modal");
		} else if( confirm1.checked && ( bankType == "business" || bankType == "personal" )){
			save.setAttribute("data-target", "#bank-access-dialog");
			save.setAttribute("data-toggle", "modal");
		}
		else{
			save.removeAttribute("data-target");
			save.removeAttribute("data-toggle");
		}
	}
	
	save.onclick = function(e){
		e.preventDefault();	
		let checkAttr = this.getAttribute("data-target");
		
		if( checkAttr )
			return;
		
		saveDetailedBanks(this, details, bankType, bankName, accNum, accName, country, swift, ssn );
		//Scriptbill.saveNoteDetails("savedAccounts", JSON.stringify( details ) );		
	}
	saveCrypto.onclick = function(e){
		
		e.preventDefault();	
		saveDetailedBanks(this, details, bankType, bankName, accNum, accName, country, swift, ssn );
		//Scriptbill.saveNoteDetails("savedAccounts", JSON.stringify( details ) );		
	}
	
	saveBank.onclick = async function(e){
		
		e.preventDefault();	
		
		saveDetailedBanks(this, details, bankType, bankName, accNum, accName, country, swift, ssn );
		//Scriptbill.saveNoteDetails("savedAccounts", JSON.stringify( details ) );		
	}
}

async function saveDetailedBanks( el, details, bankType, bankName, accNum, accName, country, swift, ssn ){
	
	if( ( ! el || ! el.tagName ) || ( ! bankName || ! bankName.tagName || ! bankName.value ) || ( ! accNum || ! accNum.tagName || ! accNum.value ) || ( ! accName || ! accName.tagName || ! accName.value ) || ( ! country || ! country.tagName || ! country.value ) || ( ! swift || ! swift.tagName || ! swift.value ) || ( ! ssn || ! ssn.tagName || ! ssn.value ) || ( typeof details.length != "number" ) || ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) ) {
		if( el && el.tagName ) {
			el.innerText = "Account Details Error";
			setTimeout(function(){
				el.innerText = "Add Bank Account";
			}, 2000);
		}
		
		await Scriptbill.createAlert( "Error Saving Account Details" );
		
		return false;
	}
	//btn btn-sm btn-outline-danger btn-block shadow-none accDelBtn
	
	let note 		= JSON.parse( Scriptbill.s.currentNote );
	let accID 		= note.noteAddress;
	
	
	let walletType 	= document.getElementById("walletType");
	let seedChar 	= document.getElementById("seedChar");
	let bankWeb 	= document.getElementById("bankWeb");
		
	el.innerText = "Saving Account Details...";
	let saveCard = {};		
	saveCard.type 		= bankType;		
	saveCard.bankName = bankName.value;		
	saveCard.accountNumber 	= accNum.value;
	
		
	if( bankType != 'crypto' ){
		saveCard.accountName 	= accName.value;
		saveCard.country 		= country.querySelector("option[value='"+country.value+"']").innerText;
		saveCard.swiftCode		= swift.value;
		saveCard.ssn			= ssn.value;
	}
		
	if( document.getElementById("remember-me").checked ){
		if( bankWeb.value && bankType != 'crypto'){
			//check if the bankWebsite given is a valid website,
			try {
				let web 		= new URL(bankWeb.value);
				web.searchParams.set("walletID", note.walletID);
				saveCard.bankWebsite = web.href;
				saveCard.approved = true;
				let server 				= new URL(SERVER);
				/* server.searchParams.set("getBANK", web.origin);
				server.searchParams.set("walletID", note.walletID); */
				let keys = await Scriptbill.getData(["getBANK","walletID"],[web.origin, note.walletID], server.href );/* .then( resp =>{
					return resp.text();
				}).catch( error =>{
					//console.log( error );
					return false;
				}); */
				
				if( keys ){
					
					if( keys.length < 3 ){
						saveCard.approved = false;
					}
				} else {
					saveCard.approved 	= false;
				}
			} catch(e){
				//console.log("bank website error: " + e);
				saveCard.approved = false;
			}
		} else if( bankType == 'crypto' && walletType.value && seedChar.value ) {
			saveCard.cryptoWallet = walletType.value;
			saveCard.cryptoPhrases = seedChar.value;
			saveCard.approved = true;
		}
		
	} else {
		saveCard.approved = false;
	}
	let accountData 	= await getAccountData();
	details.push( saveCard );
	accountData[accID].savedAccounts = JSON.stringify( details );
	Scriptbill.setAccountData( accountData ).then( async block =>{
		if( block && block.transType == "UPDATE" ){
			el.innerText = "Account Saved";
			
			if( saveCard.bankWebsite && bankType != "crypto" ){				
				//console.log( "web: " + saveCard.bankWebsite );
				let url 		= new URL( saveCard.bankWebsite );
				url.searchParams.set("back", location.href );
				let win = await chrome.windows.create({url: url.href, focused: true, state: "normal", type: "popup" });				
			} else {
				await Scriptbill.createAlert("account saved" );
				location.reload();
			}
		} else {
			el.innerText = "Error Saving Account";
			setTimeout(()=>{
				el.innerText = "Add Bank Account";
			}, 3000);
		}
	});
}
				
async function checkfile(sender) {
	var validExts = new Array(".script", ".txt");
	var fileExt = sender.value;
	fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
	if (validExts.indexOf(fileExt) < 0) {
	  await Scriptbill.createAlert("Invalid file selected, valid files are of " +
	   validExts.toString() + " types.");
	  return false;
	}
	else return true;
}



const profitInter = setInterval( async ()=>{
	let currentStores 		= JSON.parse( Scriptbill.isJsonable( Scriptbill.s.currentStores ) ? Scriptbill.s.currentStores:'[]' );
	if( ! Scriptbill.s.currentStoreNumber )
		Scriptbill.s.currentStoreNumber = 0;
	
	let currentNumber 			= parseInt( Scriptbill.s.currentStoreNumber );	
	let currentStore 			= currentStores[ currentNumber ];
	
	if( ! Scriptbill.s.profitBlockData || ! currentStore ||  ! Scriptbill.s[currentStore + "_profit"] ){
		
		if( (currentNumber + 1 ) >= currentStores.length ){
			delete Scriptbill.s.currentStoreNumber;
			clearInterval( profitInter );
		}
		else {
			currentNumber++;
			Scriptbill.s.currentStoreNumber 	= currentNumber;
		}
		return;
	}
	
	let profitData	= JSON.parse( Scriptbill.s.profitBlockData );
	profitData		= profitData[ currentStore ];
	
	if( ! profitData ){
		if( (currentNumber + 1 ) >= currentStores.length ){
			delete Scriptbill.s.currentStoreNumber;
			clearInterval( profitInter );
		}
		else {
			currentNumber++;
			Scriptbill.s.currentStoreNumber 	= currentNumber;
		}
		return;
	}
	
	if( ! Scriptbill.s.profitNo )
		Scriptbill.s.profitNo = 0;
	
	let profitNo 		= parseInt( Scriptbill.s.profitNo );
	let user 			= profitData[ profitNo ];
	
	if( ! user || ! user.blockID ){
		if( (currentNumber + 1 ) >= currentStores.length ){
			delete Scriptbill.s.currentStoreNumber;			
			clearInterval( profitInter );
		}
		else {
			currentNumber++;
			Scriptbill.s.currentStoreNumber 	= currentNumber;
		}
		delete profitData[ currentStore ];
		delete Scriptbill.s.profitNo;
		Scriptbill.s.profitBlockData = JSON.stringify( profitData );
		return;
	}
	
	Scriptbill.blockID 	= user.blockID;
	let userBlock 		= await Scriptbill.getTransBlock();
	let profit 			= ( parseFloat( Scriptbill.s[currentStore + "_profit"] ) / profitData.length ).toFixed(2);
	
	if( userBlock && userBlock.transType == "GETCREDIT" ){
		Scriptbill.sendConfig.amount = profit;
		Scriptbill.sendConfig.recipient.push( user.id ? user.id : userBlock.blockKey );
		Scriptbill.passwordKey 		= Scriptbill.s.profitKey;
		Scriptbill.defaultAgree.agreeType 	= "PROFITSHARING";
		await Scriptbill.sendMoney();
		profitNo++;
		Scriptbill.s.profitNo 		= profitNo;
	}
}, 10000 );

chrome.runtime.onMessage.addListener( async (message, sender, sendResponse) => {
	if( typeof message == "object" && Scriptbill.s.currentNote && Scriptbill.isJsonable( Scriptbill.s.currentNote ) ){
		let note 		= JSON.parse( Scriptbill.s.currentNote );
		if( message.payOutDividend && message.payOutDividend > 0 ){
			Scriptbill.exchangeKey = EXCHANGEKEY;
			Scriptbil.isExchangeDeposit	= true;
			Scriptbill.depositInstance	= message.password;
			Scriptbill.depositInstanceKey 	= message.key;
			Scriptbill.depositFiat( message.payOutDividend, note.noteType );
		} 
		else if( message.notLoggedIn && message.url ){
			try {
				let win = await chrome.windows.create({url: message.url, focused: true, state: "normal", type: "popup" });
				let url 	= new URL( message.url );
				let obj = {
					url : message.url,
					origin : url.origin,
					window: win.id					
				};
				
				let notLoggedIn 	= Scriptbill.l.notLoggedIn;
				
				if( ! notLoggedIn ){
					notLoggedIn = {};
				} else {
					notLoggedIn 	= JSON.parse( notLoggedIn );
				}
				
				notLoggedIn[ url.origin ] = obj;
				Scriptbill.l.notLoggedIn 	= JSON.stringify( notLoggedIn );
			} catch(e){
				console.error(e);
			}
		} else if( message.loggedIn && message.url && message.crawl ){
			try {
				let url 		= new URL( message.url );
				let notLoggedIn = Scriptbill.l.notLoggedIn;
				
				if( notLoggedIn ){
					notLoggedIn 	= JSON.parse( notLoggedIn );
					if( notLoggedIn[ url.origin ] ){
						chrome.windows.remove( notLoggedIn[ url.origin ].window );
					}
				}
				
				let iframe 		= document.createElement( 'iframe' );
				iframe.src 		= message.url;
				iframe.style.display = 'none';
				iframe.style.width 	= "100%";
				document.body.appendChild( iframe );
			} catch(e){
				console.error(e);
			}
		}
		else if( message.createAgreementReq && message.blockID ){
			Scriptbill.blockID 	= message.blockID;
			let block 			= await Scriptbill.getTransBlock();
			
			if( block && block[0] && block[0].blockID ){
				Scriptbill.details = JSON.parse( JSON.stringify( block[0] ) ); 
				Scriptbill.details.transType = "AGREEMENTREQUEST";
				Scriptbill.details.recipient = block[0].agreement.agreeKey;
				Scriptbill.response = await Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details );
				
				if( message.password && Scriptbill.response && Scriptbill.response.transType == "AGREEMENTREQUEST" && Scriptbill.response.exchangeNote ){				
					Scriptbill.details = JSON.parse( JSON.stringify( block[0] ) );
					Scriptbill.details.transType = "AGREEMENTSIGN";
					Scriptbill.details.password  = message.password;
					Scriptbill.response.exchangeNote.agreement = block[0].agreement.agreeKey;
					Scriptbill['ufEdaN_fI_jtkDiINa_h20qPlYteG5aZYhlr_-822Nc6sqsYf4t-zNjROi_bjEClerU_t6QrQGgZAR23fCcf-k9Pp-5JLIvArL_SCBegwODkveNeYPelFtWkW1zDdYf3npYfHtztMAig82F_2GkTgcPcQPQwgDpLAmnP1rJA7Kc'] = true;
					
					Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details );
				}
			}
		}
	}
});


let update = document.getElementById("update-el");

if( update ){
try {
fetch( SERVER + "updates.json" ).then( resp => { return resp.json(); }).then( ret =>{
	if( ret.version ){
		fetch("/manifest.json").then( resp =>{ return resp.json() }).then( res =>{
			if( res.version < ret.version ){
				update.style.display = "block";
			}
		});
	}
});
} catch(e){
	//console.log("updates error: " + e);
}
}


setTimeout( async ()=>{
		if( ! Scriptbill.s.currentNote || ! Scriptbill.isJsonable( Scriptbill.s.currentNote ) )
		return;
	
	let note 	= JSON.parse( Scriptbill.s.currentNote );
	let acc 	= await getAccountData();
	let stance = await Scriptbill.getData(['withdrawal', 'walletID', 'address'], ['true', note.walletID, note.noteAddress], req.href );
	
	if( stance && stance.amount ){
		if( ! note.withdrawalStance )
			note.withdrawalStance = {amount:0, rate:0};
		
		note.withdrawalStance.amount 	+=  stance.amount;
		
		let rate = parseFloat( note.withdrawalStance.amount ) / parseFloat( note.noteValue );
				
		if( rate > 1 )
			note.withdrawalStance.rate = 1;
		
		else 
			note.withdrawalStance.rate = rate;
		
		note.withdrawalStance.rate 		= note.withdrawalStance.rate .toString();
		
		Scriptbill.s.currentNote 		= JSON.stringify( note );
		
		let details 		= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
		details.transType 	= "UPDATE";
		details.transValue 	= 0;
		details.agreement 	= "";
		//because it succesfully decrypted the result.
		return await this.generateScriptbillTransactionBlock(details);
	
	}
	if( Scriptbill.s[note.noteAddress + '_withdrawal_funds' ] ){
		let funds 			= parseFloat( Scriptbill.s[note.noteAddress + '_withdrawal_funds' ] );
		if( ! note.withdrawalStance )
			note.withdrawalStance = {amount:0, rate:0};
			
		if( note.withdrawalStance.amount ){
			note.withdrawalStance.amount = parseFloat( note.withdrawalStance.amount ) + funds;
		} else {
			note.withdrawalStance.amount 	= funds;
		}
			
		await Scriptbill.createAlert( "you can now withdraw up to " + note.withdrawalStance.amount + " automatically from your account balance, visit the withdrawal page to start withdrawing" );
		
		Scriptbill.s.currentNote 		= JSON.stringify( note );
		
		delete Scriptbill.s[note.noteAddress + '_withdrawal_funds' ];
		let details 		= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
		details.transType 	= "UPDATE";
		details.transValue 	= 0;
		details.agreement 	= "";
		//because it succesfully decrypted the result.
		return await this.generateScriptbillTransactionBlock(details);
	}

	
	let salary = await Scriptbill.getData(['salary', 'address', 'rank', 'walletID'], ['true', note.noteAddress, acc.rank, note.walletID], req.href );
	
	if( salary && salary.value ){
		Scriptbill.isExchangeDeposit 	= true;
		Scriptbill.exchangeKey 			= EXCHANGEKEY;
		Scriptbill.depositInstance		= salary.password;
		Scriptbill.depositInstanceKey	= salary.key;
		Scriptbill.depositFiat( salary.value, note.noteType );
	}
	
	let accountData 		= await getAccountData();
	
	if( accountData.subscriptions && ( ! location.href.includes( loanUrl ) || ! location.href.includes( loanConfirm ) || ! location.href.includes( loanSuccess ) ) ){
		let subs 	= JSON.parse( JSON.stringify( accountData.subscriptions ));
		let ids 	= Object.keys( subs );
		let time 	= Scriptbill.currentTime(), sub, prodName = "";
		for( let x = 0; x < ids.length; x++ ){		
			sub = subs[ids[x]];
			
		
			if( sub.elapse < time ){
				Scriptbill.blockID 	= sub.blockID;
				let block 			= await Scriptbill.getTransBlock();				
				block 				= block[0];
				
				if( block && block.agreement && block.agreement.name )
					prodName	= block.agreement.name;
				
				else if( block && block.blockID )
					prodName 	= block.blockID;
				
				else if( ! block || block.transType != "CREDIT" )
					continue;
				
				let value 	= await Scriptbill.createPrompt( "Your Subscription to this product " + prodName + " Has Elapsed, you still need to pay " + sub.remains + " To Finish up the Subscription, you can alternatively get a loan to finish up this subscription now. Enter Zero to get a Loan First", note.noteValue );
				
				if( value == 0 ){
					location.href = loanUrl;
				} else if( value > 0 ){
					Scriptbill.response 		= JSON.parse( JSON.stringify( block ));
					Scriptbill.details 			= JSON.parse( JSON.stringify( Scriptbill.defaultBlock ));
					Scriptbill.details.transType = "GETCREDIT";
					Scriptbill.details.type 	= "SUBS";
					Scriptbill.details.transValue 	= value;
					Scriptbill.details.agreement 	= JSON.parse( JSON.stringify( block.agreement ));
					Scriptbill.details.agreement.agreeType = "SUBSCRIPTION";
					Scriptbill.generateScriptbillTransactionBlock( Scriptbill.details );
				}
			}
		}
	}
}, 500, req );


   
