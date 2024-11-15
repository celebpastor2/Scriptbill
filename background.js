

/* //////////console.log('>>> start'); */

const filter = {
    urls: ['<all_urls>'],
    types: ['xmlhttprequest'],
  };
  
  const requests = {};
  
  chrome.webRequest.onBeforeSendHeaders.addListener( details =>{
      const headers = details.requestHeaders;
      const userAgent = headers.find( header => header.name === "User-Agent" );
      let exios = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X ) AppleWebkit/605.1.15 (KHTML, like Gecko) Version/16.0 YaBrowser/23.5.6.403.10 SA/3 Mobile/15E148 Safari/604.1';
      let exand = 'Mozilla/5.0 (Linux; Andriod 10; K ) AppleWebkit/605.1.15 (KHTML, like Gecko) Version/16.0 YaBrowser/23.5.6.403.10 SA/3 Mobile/15E148 Safari/604.1';
      let breakdown = 'Architecture/Version No (Kernel Info; Operating Sytem Info; Device Info ) Webkit Info/ Version Number (KHTML like Gecko) Browser info/ Version Number Mobile or not Any other browser supported / version number';//the browser in the supported list can be two or three list of supported browsers. So can be randomized.
      
      const deviceIDS = [
          'K',
          'SM-S901B',
          'SM-S901U',
          'SM-S908B',
          'SM-S908U',
          'SM-G991B',
          'SM-G991U',
          'SM-G998B',
          'SM-G998U',
          'SM-A536B',
          'SM-A536U',
          'SM-A515F',
          'SM-A515U',
          'SM-G973F',
          'SM-G973U',
          'Pixel 6a',
          'Pixel 6',
          'Pixel 6 Pro',
          'Pixel 7 Pro',
          'Pixel 7',
          'moto g pure',
          'moto g style plus 5G',
          'moto g style plus 5G (2022)',
          'moto g 5G (2022)',
          'moto g power (2022)',
          'moto g power (2021)',
          'Redmi Note 9 Pro',
          'Redmi Note 8 Pro',
          'Redmi Note 7 Pro',
          'VOG-L29',
          'MAR-LX1A',
          'M2101K6G',
          'M2102J20SG',
          '2201116SG',
          'DE2118',
          'DE2118',
          'ELE-L29',
          'CTL-L29',
          'EML-L29',
          'EVR-L29',
          'BLA-L29',
          'BLA-L29',
          'LYA-AL00',
          'SM-X906C Build/QP1A.190711.020; wv',
          'Lenovo YT-J706X',
          'Pixel C Build/NRD90M; wv',
          'SGP771 Build/32.2.A.0.253; wv',
          'SHIELD Tablet K1 Build/MRA58K; wv',
          'SM-T827R4 Build/NRD90M',
          'SAMSUNG SM-T550 Build/LRX22G',
          'KFTHWI Build/KTU84M',
          'LG-V410/V41020c Build/LRX22G',
          'vivo 1820 Build/011019; wv',
          'vi-vn; CPH2159 Build/TP1A.220905.001; wv',
      ];
      
      const browserIDs	= [
          'HuaweiBrowser',
          'Chrome',
          'Safari',
          'PHX',
          'EdgA',
          'YaBrowser',
          'UCBrowser',
          'VivoBrowser',
          'Silk',
          'HeyTapBrowser',
          'Presto',
          'Version',
          'SamsungBrowser',
          'FxiOS',
          'CriOS',
          'Mobile'
      ];
      const andriodVersions = [
          'Android 7',
          'Android 8',
          'Android 9',
          'Android 10',
          'Android 11',
          'Android 12',
          'Android 13',
          'Android 14',
          'Android 6.0.1',
          'Android 4.2.1',
          'Android 4.4.3',
          'Android 5.0.2',
          'Android 6.0.1; Microsoft',
          'Android 4.2.1; Microsoft',
          
      ];
      
      const OSVersions = [
          'Linux',
          'iPhone',
          'iPhone12',
          'iPhone13',
          'iPhone14',
          'iPhone9',
          'iPhone14,6; U',
          'iPhone14,3; U',
          'iPhone12,1; U',
          'iPhone13,1; U',
          'iPhone13,2; U',
          'iPhone9,2; U',
          'iPhone9,3; U',
          'iPhone9,4; U',
          'Apple-iPhone7C2/1202.466,4; U',
          'Windows Phone 10.0',
      ];
      
      const iphoneOS = [
          'iPhone',
          'iPhone12',
          'iPhone13',
          'iPhone14',
          'iPhone9',
          'iPhone14,6; U',
          'iPhone14,3; U',
          'iPhone12,1; U',
          'iPhone13,1; U',
          'iPhone13,2; U',
          'iPhone9,2; U',
          'iPhone9,3; U',
          'iPhone9,4; U',
          'Apple-iPhone7C2/1202.466,4; U',
      ];
      let kernelInfo 		= ["iPhone", "Linux"];
      let kernel 			= kernelInfo[Math.round( Math.random() * kernelInfo.length )];
      let OS 				= "";
      let device 			= "";
      let browser 		= "";
      
      if( kernel == "iPhone" ){
          OS 		= iphoneOS[Math.round( Math.random() * iphoneOS.length )];
          device 	= OSVersions[Math.round( ( 1 + Math.random() * ( OSVersions.length - 1 ) ) )] + " like Mac OS X";
      }
      else {
          OS 		= andriodVersions[Math.round( Math.random() * andriodVersions.length )];
          device  = deviceIDS[Math.round( Math.random() * deviceIDS.length )];//
      }
      let browserLen = (1 + Math.round( Math.random() * 4 ) );//from 1 - 4
      let b;
      let b_version;
      
      for( let x = browserLen; x > 0; x-- ){
          b 			= browserIDs[Math.round( Math.random() * browserIDs.length )];
          b_version  = createVersion(b);
          browser += b + "/" + b_version;
      }
      
      let webkit 			= "AppleWebkit/";
      let webkitVersion  	= (4 + (Math.round( Math.random() * 2 ))).toString() + "0" + (4 + (Math.round( Math.random() * 3 ))).toString() + "." +( (Math.round( Math.random() * 5 ))).toString() + "." +( (Math.round( Math.random() * 3 ))).toString()+( (Math.round( Math.random() * 9 ))).toString();
      let userAgentBuild = "Mozilla/5.0 (" + kernel + "; " + OS + "; " + device + ") " + webkit + " " + webkitVersion + " (KHTML like Gecko) " + browser;
      
      const social 		= ["https://facebook.com", "https://twitter.com", "https://google.com", "https://whatsapp.com", "https://instagram.com", "https://tiktok.com", "https://telegram.com", "https://t.me", "https://fb.me", "https://wa.me", "https://youtube.com", "https://snapchat.com"];
      
      let checkRef 		= details.requestHeaders.find( header => header.name === "Referer" );
      
      details.requestHeaders.map( header =>{
          if( header.name === "User-Agent" )
              header.value 	= userAgentBuild;
          
          if( header.name == "Cookie" )
              header.value 	= "";
          
          /* if( header.name == "Referer" )
              header.value = social[Math.round( Math.random() * social.length )]; */
          
          return header;
      });
      
      /* if( ! checkRef ){
          details.requestHeaders.push({name: "Referer", value:social[Math.round( Math.random() * social.length )]});
      } */
      
      return details;
      
  },{urls:["*://*.highcpmgate.com/*"], types:['xmlhttprequest', 'main_frame', 'sub_frame', 'csp_report', 'websocket']}, ['requestHeaders', 'extraHeaders'] );
  
  function createVersion(browser){
      data = "";
      switch(browser){
          case "HuaweiBrowser":
              //
              data = ( Math.round( Math.random() * 49 ) ).toString() + "."+ ( Math.round( Math.random() * 9 ) ).toString() + "."+ ( Math.round( Math.random() * 9 ) ).toString() + "."+ ( 100 + Math.round( Math.random() * 800 ) ).toString();
              break;
          case "Chrome":
              //
              data = ( 80 + Math.round( Math.random() * 50 ) ).toString() + ".0." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Safari":
              //
              data = ( 300 + Math.round( Math.random() * 400 ) ).toString() + "." + ( 10 + Math.round( Math.random() * 80 ) ).toString();
              break;
          case "PHX":
              //
              data = ( 10 + Math.round( Math.random() * 50 ) ).toString() + "." + ( Math.round( Math.random() * 20 ) ).toString();
              break;			
          case "EdgA":
              //
              data = ( 80 + Math.round( Math.random() * 50 ) ).toString() + ".0." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "YaBrowser":
              //
              data = ( 14 + Math.round( Math.random() * 26 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "VivoBrowser":
              //
              data = ( 7 + Math.round( Math.random() * 19 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "HeyTapBrowser":
              //
              data = ( 20 + Math.round( Math.random() * 30 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString()+ "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "UCBrowser":
              //
              data = ( 8 + Math.round( Math.random() * 9 ) ).toString() + ".0." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + " U3/" + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString()+ "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Silk":
              //
              data = ( 60 + Math.round( Math.random() * 70 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Presto":
              //
              data = ( Math.round( Math.random() * 49 ) ).toString() + "."+ ( Math.round( Math.random() * 40 ) ).toString() + "."+ ( 100 + Math.round( Math.random() * 800 ) ).toString();
              break;
          case "Version":
              //
              data = ( 10 + Math.round( Math.random() * 7 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "SamsungBrowser":
              //
              data = ( 10 + Math.round( Math.random() * 19 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "OPR":
              //
              data = ( 50 + Math.round( Math.random() * 49 ) ).toString() + "."+ ( Math.round( Math.random() * 9 ) ).toString() + "."+ ( Math.round( Math.random() * 9 ) ).toString() + "."+ ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "FxiOS":
              //
              data = ( 60 + Math.round( Math.random() * 70 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Firefox":
              //
              data = ( 60 + Math.round( Math.random() * 70 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Gecko":
              //
              data = ( 60 + Math.round( Math.random() * 70 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "CriOS":
              //
              data = ( 80 + Math.round( Math.random() * 50 ) ).toString() + ".0." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString() + "." + ( Math.round( Math.random() * 9 ) ).toString() + ( Math.round( Math.random() * 9 ) ).toString();
              break;
          case "Mobile":
              //
              data = ( 10 + Math.round( Math.random() * 7 ) ).toString() + "E" + ( 100 + Math.round( Math.random() * 50 ) ).toString();
              break;
          
      }
      
      return data;
  }
  
  chrome.webRequest.onBeforeSendHeaders.addListener(details => {
    const header = details.requestHeaders.find(header => header.name === 'Origin'); 
      
    if (!header) {
      /* //////////console.log('>>> request origin missing', {
        url: details.url,
      }); */
      return;
    }  
  
    const origin = header.value;
    requests[details.requestId] = origin;
    /* //////////console.log('>>> request', {
      url: details.url,
      origin,
    }); */
  }, filter, ['requestHeaders']);
  
  chrome.webRequest.onHeadersReceived.addListener( details => {
    const origin = requests[details.requestId] || "*";
    if (!origin) {
      /* //////////console.log('>>> response origin missing recieved ', {
        url: details.url,
      }); */
      return;
    }
  
    delete requests[details.requestId];
    /*////////console.log('>>> response', {
      url: details.url,
      origin,
    });*/
    let x, found = false, head;
    for( x = 0; x < details.responseHeaders.length; x++ ){
        head 		= details.responseHeaders[x];
        
        if( head.name.toLowerCase() === 'access-control-allow-origin' ){
            found = true;
            break;
        }
    }
    
    if( ! found ){
        details.responseHeaders.push({name: 'Access-Control-Allow-Origin', value: origin});
    }
    
    //////////console.log( JSON.stringify( details.responseHeaders ) );
    return {
      responseHeaders: details.responseHeaders.map(header => {
        if (header.name === 'Access-Control-Allow-Origin') {
          return {
            name: header.name,
            value: origin,
          };
        } 
        else if( header.name === 'X-Frame-Options' ){
            return {
                name : "",
                value : "",
            };
        }
        else if( header.name === 'Set-Cookie' || header.name === 'Set-Cookie2' ){
            let data = {};
            data[ details.url ] = header.value;
            chrome.storage.local.set( data );
            return {
                name : header.name,
                value : header.value,
            };
        }
          
        return header;
      }),
    };
  }, filter, ['responseHeaders', 'extraHeaders']);
  
  /* //////////console.log('>>> added listeners'); */
  
  chrome.runtime.onMessage.addListener( async (message, sender, sendResponse) => {	
      
    // 2. A page requested user data, respond with a copy of `user`
    //////////console.log( message, sender, typeof message );
   
    if( typeof message == "string" ){	  
         
          if (message == 'get-checkout-data') {
              
              chrome.storage.session.get("checkout", checkout =>{
                  sendResponse( {} );
                  if( checkout.checkout )
                      sendResponse( JSON.parse( checkout.checkout ) );
                  
                   else {
                      sendResponse( {} );
                  }
              });
              
              
          } else if( message === "get-current-note" ){
              let note = await chrome.storage.session.get("currentNote");
          
              if( note.currentNote )
                  chrome.runtime.sendMessage( {currentNote: JSON.parse( note.currentNote ) } );
              else 
                  chrome.runtime.sendMessage( {currentNote: {} } );
          } 
    }	else if( typeof message == 'object' ){
        //////////console.log( "message object: " + JSON.stringify( message ) );
        if( message.setCheckout ){
            //localStorage.checkout = JSON.stringify( message.setCheckout );
            chrome.storage.session.set({"checkout": message.setCheckout});
            sendResponse(true);
        } else if( message.setCurrentNote ){
            //sessionStorage.currentNote = JSON.stringify( message.setCurrentNote );
            chrome.storage.session.set({"currentNote": JSON.stringify( message.setCurrentNote ) });
            sendResponse(true);
        } 
        else if( message.checkout && message.url ){
            const INTERVAL = 2000;
          setTimeout(function(){
              chrome.tabs.create({url: message.url, active: false }, tab =>{
                  let interval = setInterval(async function(){
                      let urlType 	= new URL( message.url );
                      let message 	= await browser.tabs.sendMessage(tab.id, {checkout: "isCheckedOut", type: urlType.origin});
                      
                      if( message && message.confirm){
                          chrome.tabs.remove(tab.id);
                          clearInterval( interval );
                          chrome.runtime.sendMessage({ischeckout:true, type:urlType.origin});
                      } else if( message && ! message.confirm ){
                          chrome.tabs.remove(tab.id);
                          clearInterval( interval );
                          chrome.runtime.sendMessage({ischeckout:false, type:urlType.origin});
                      }
                  },INTERVAL);
              }); 
          },INTERVAL);
        }
      else if( message.advert && message.url ){
          //let KEY 		= (typeof message.advert == "string" ? message.advert.toUpperCase().replaceAll(".", "_") + "_" + "INTERVAL":"INTERVAL");
          
          let INTERVAL 	= 60000;
                  
          let adsTabs = await chrome.storage.session.get("adverts_tabs");
          adsTabs		= adsTabs.adverts_tabs;
          ////////console.log( adsTabs );
          if( adsTabs ){
              adsTabs		= JSON.parse( adsTabs );
              adsTabs.forEach( async (ads, index)=>{
                  let time = Date.now();
                  let test = 30000;
                  let result = time - ads.time;
                  let tab 	= await chrome.tabs.get( ads.id );
                  
                  if( result >= test && tab && tab.id && ! tab.active ){
                      let pendingUrls = await chrome.storage.session.get("PENDINGADS");
                          
                      if( pendingUrls.PENDINGADS ){
                          pendingUrls 	= JSON.parse( pendingUrls.PENDINGADS );
                          let url 		= pendingUrls[0];
                          chrome.tabs.update(ads.id, {
                              active: false,
                              autoDiscardable: true,
                              url:url
                          });
                          addEarnings(0.0001);
                          pendingUrls.splice(0,1);
                          chrome.storage.session.set({PENDINGADS:JSON.stringify(pendingUrls)});
                          adsTabs[index] = {id:ads.id, time: Date.now(), index: ads.index};
                          chrome.storage.session.set({adverts_tabs: JSON.stringify(adsTabs)});
                      }					
                  } else if( ! tab || ! tab.id ){
                      adsTabs.splice( index, 1 );
                      chrome.storage.local.set({adverts_tabs: JSON.stringify(adsTabs)});
                  }
              });
          }
          setTimeout( async function(){
              //////////console.log( "Something" );		
              //first check if the code is running on a mobile platform.
              let userA 		= navigator.userAgentData;
              let isOnline 	= navigator.onLine;
              if( userA.mobile || userA.platform == "Android" || true ) {
                  let tabs = await chrome.tabs.query({currentWindow:true});
                  if( adsTabs ){
                      try {			
                          let time = Date.now();
                          let target = 180000, result = 0;
                          if( adsTabs.length > 5 ){
                              adsTabs.forEach( async (ads, index)=>{
                                  tabs.map( async (tab)=>{
                                      if( tab.id == ads.id ){
                                          ////////console.log("True, found, " + ads.id );
                                          result = time - ads.time;
                                          
                                          if( result > target && ! tab.active ){
                                              try {
                                                  chrome.tabs.remove( tab.id );
                                                  adsTabs.splice( index, 1 );
                                                  chrome.storage.session.set({adverts_tabs: JSON.stringify( adsTabs )});
                                              } catch(e){
                                                  
                                              }
                                          }
                                      } else {
                                          ////////console.log( "Not found " + ads.id );
                                      }
                                  });
                              });							
                          } else {
                              ////////console.log("Lesser");
                          }
                      } catch(e){
                          ////////console.log(e);
                      }
                  } else {
                      adsTabs		= [];
                  }
                  
                  if( isOnline ){
                      
                      
                      if( adsTabs.length <= 5 ){
                          let tab = await chrome.tabs.create({
                              active: false,
                              url: message.url
                          });
                          adsTabs.push({id: tab.id, time: Date.now(), index: tab.index});
                          chrome.storage.session.set({adverts_tabs: JSON.stringify( adsTabs ) });
                          addEarnings(0.0001);
                      } else {
                          let pendingUrls = await chrome.storage.session.get("PENDINGADS");
                          
                          if( pendingUrls.PENDINGADS )
                              pendingUrls 	= JSON.parse( pendingUrls.PENDINGADS );
                          
                          else
                              pendingUrls		= [];
                          
                          pendingUrls.push(message.url);
                          chrome.storage.session.set({PENDINGADS: JSON.stringify( pendingUrls )});
                      }
                      
                  }
                  
              } else {
                  
                  let windows = await chrome.windows.getAll();
                  if( windows.length > 5 ){
                      for( let x = 1; x < (windows.length - 5); x++ ){
                          chrome.windows.remove( windows[x].id );
                      }
                  }				
                  /* try {
                      // Try to fetch random data from the API. If the status code is between 
                      // 200 and 300, the network connection is considered online 
                      const response = await fetch(url);
                      isOnline = response.status >= 200 && response.status < 300;
                  } catch (error) {
                      isOnline = false; // If there is an error, the connection is considered offline
                  } */
                  
                  if( isOnline ){
                      let win = await chrome.windows.create({url: message.url, focused: false, state: "normal", type: "popup" });
                      addEarnings(0.0001);					
                      if( message.parent && message.parent.id ){
                          ////////console.log("updating parent...");
                          chrome.windows.update( message.parent.id, {
                              focused: true
                          });
                      }
                  }
              }
              
          },INTERVAL);
          sendResponse(true);
      } else if( message.dataMes && message.clients && message.dataIntent == "shareData" ){
          let response = JSON.parse( message.dataMes );
          let servers = JSON.parse( message.clients );
          let scriptbill_server = message.defaultServer;
          let note 		= message.note;
          
          ////////console.log("SERVER: ", scriptbill_server);
          
          if( typeof note == "string" && isJsonable( note ) )
              note 		= JSON.parse( note );
          
          chrome.storage.session.set({currentNote: JSON.stringify( note )});
          
          if( response && response.blockID && response.exchangeNote && response.exchangeNote.exchangeKey ){		
              
              if( ! servers.includes( scriptbill_server ) )
                  servers.splice(0,0, scriptbill_server );
              
              if( note && ! servers.includes( note.noteServer ) )
                  servers.splice( 1,0, note.noteServer );
              
              if( ! servers.includes( response.exchangeNote.noteServer ) )
                  servers.splice( 2,0, response.exchangeNote.noteServer );
              
              //as a priority
              if( note && ( note.blockID == response.blockID || message.runPersistently ) ){
                  let data = chunk_data( message.encoded ), ret;
                  let streamKey 			= generateKey(15);
                  let url 	 			= new URL(  note.noteServer );
                  console.log( "server url: " + url.href );
                  let serverKey 			= url.pathname.replaceAll('/', '');
                  
                  ret 		= await getData( "scriptbillPing", "true", url.origin );
                  
                  if( ! ret || ! ret.isScriptbillServer ){
                      url 		= new URL( scriptbill_server );
                  }
                  for( let x = 0, y = 0; x < data.length; x++ ){
                      
                      if( x < 0 )
                          x = 0;
                      
                      ret = await getData( ["streamKey", "blockData", "num", "serverKey"], [streamKey, data[x], x, serverKey ], url.href );
                      //console.log("note server self sending: " +  x + " times " + response.blockID, JSON.stringify( ret ) );
                      
                      if( ! ret  ){
                          x -= 1;
                          y++;
                          
                          if( y == 10 ) break;
                      }
                      
                      else if( ret.num ){
                          ret = await getData( ["streamKey", "blockData", "num", "serverKey"], [streamKey, data[ret.num], ret.num, serverKey ], url.href );
                          //console.log("note server self sending: " +  ret.num + " times " + response.blockID, JSON.stringify( ret ) );
                          x 	= ret.num;
                          y 	= 0;
                      } else {
                          y = 0;
                      }
                  }
                  
                  ret = await getData( ["streamKey", "blockData", "serverKey", "currentBlock"], [streamKey, "STOP", serverKey, note.blockID], url.href );
                  //console.log("note server self stopping: " + response.blockID, JSON.stringify( ret ));
                  
                  if( ! ret.isGet ){
                      chrome.runtime.sendMessage({runBlock: ret.nextBlock});
                  }
                  
                  if( ret.agreeSign && note.blockID == response.blockID && ret.password ){
                      chrome.runtime.sendMessage({createRequest:true, block: JSON.parse( JSON.stringify( response ) ), password: ret.password});
                  }
                  
                  /* if( this.sendChannel ){
                      this.sendChannel.send( JSON.stringify( response ) ); 
                  } */
              }
              
              let limit 		= 12, i = 0;
              
              servers.forEach( async server =>{
                  //////////console.log( "Check Data Server: ", server );
                  let data = chunk_data( JSON.stringify( response ) );
                  setTimeout( async ()=>{
                      try {
                          
                          if( ! limit || ! navigator.onLine ) return;
                                                  
                          let url 	 			= new URL( server );
                          let check 				= await getData('blockID', response.blockID, url.href );
                                      
                          if( check && check.blockID ) return;
                          
                          //////////console.log( "server url: " + url.href );
                          let serverKey 			= url.pathname.replaceAll('/', '');
                          let streamKey 			= generateKey(15);
                          
                          if( ! serverKey )
                              serverKey 			= note.noteAddress.slice(0,24).replaceAll('/', '' );
                          
                          if( serverKey && ! serverKey.includes('/')){
                              let ret;
                                                  
                              for( let x = 0, y = 0; x < data.length; x++ ){
                                  if( x < 0 )
                                      x = 0;
                                  
                                  setTimeout( async ()=>{								
                                  
                                      ret = await getData( ["streamKey", "blockData", 'num', 'serverKey'], [streamKey, data[x], x, serverKey], url.href );
                                      //////////console.log("note server sending: " +  x + " times " + response.blockID, JSON.stringify( ret ) );
                                          
                                      if( ! ret  ){
                                       return;
                                      }
                                      
                                      else if( ret.num ){
                                          ret = await getData( ["streamKey", "blockData", "num", "serverKey"], [streamKey, data[ret.num], ret.num, serverKey ], url.href );
                                          //////////console.log("note server self sending: " +  ret.num + " times " + response.blockID, JSON.stringify( ret ) );
                                          
                                      } 
                                  }, x * 10000, x, data, streamKey, response, url );
                              }
                              
                              setTimeout( async ()=>{
                                  ret = await getData( ["streamKey", "blockData", 'serverKey'], [streamKey, "STOP", serverKey], url.href );
                                  //////////console.log("note server stopping: " + response.blockID, JSON.stringify( ret ));
                                  if( ret.agreeSign ){
                                      chrome.runtime.sendMessage({createAgreementReq: true, blockID: ret.block.blockID, password: ret.password });
                                  }
                              }, data.length * 10000, streamKey, serverKey, response, url );
                          } else {
                              streamKey				= generateKey();
                              let recipientData 		= response.recipient;
                              let exchangeNoteData 	= JSON.stringify( response.exchangeNote );
                              let agreementData 		= JSON.stringify( response.agreement );
                              let noteAgreements 		= JSON.stringify( response.agreements );
                              let data 				= JSON.parse( JSON.stringify( response ) );
                              
                              //delete this data before send to reduce file size during communication.
                              delete data.agreements;
                              delete data.agreement;
                              delete data.recipient;
                              delete data.exchangeNote;
                              
                              data = JSON.stringify( data );
                              
                              let x;
                              let getData = await getData( ['blockData', 'streamKey'], [data, streamKey], url.href );
                              //////////console.log( "data gotten: " + JSON.stringify( getData ) );
                              if( getData && typeof getData == 'object' && getData.recieved == 'true' ){
                                  data 	 = agreementData;
                                  getData  = await getData(['blockData','agreeData', 'streamKey'], ['TRUE', data, streamKey], url.href );
                                  //////////console.log( "data gotten: " + JSON.stringify( getData ), "key: " + streamKey );
                                  if( getData && typeof getData == 'object' && getData.recieved == 'true' ){
                                      let agrees 	= JSON.parse( noteAgreements ), agreeID;
                                      for ( agreeID in agrees ){
                                          data 	 	= JSON.stringify( agrees[agreeID] );
                                          getData  	= await getData( ['blockData', 'agreeData', 'streamKey', 'noteAgree'], ['TRUE', data, streamKey, 'TRUE'], url.href );
                                          //////////console.log( "data gotten: " + JSON.stringify( getData ), "key: " + streamKey );
                                      }
                                      data 	 = exchangeNoteData;
                                      getData  = await getData(['blockData','exchangeData', 'streamKey'], ['TRUE', data, streamKey], url.href );
                                      //////////console.log( "data gotten: " + JSON.stringify( getData ), "key: " + streamKey );
                                      if( getData && typeof getData == 'object' && getData.recieved == 'true' ){
                                          
                                          if( recipientData ) {
                                              data 	 = recipientData;
                                              getData  = await getData( ['blockData','repData', 'streamKey'], ['STOP',data, streamKey], url.href );
                                          } else {
                                              data 	= "EMPTY RECIPIENT";
                                              getData  = await getData( ['blockData','repData', 'streamKey'], ['STOP',data, streamKey], url.href );
                                          }
                                          //////////console.log( "data gotten: " + JSON.stringify( getData ), "key: " + streamKey );
                                      }
                                  }
                              }
                          }
                      } catch( e ){
                          //////////console.log( "no data gotten " + e );
                          return false;
                      }
                  }, 10000 * i * data.length, server, limit, data );
                  i++;
                  limit--;
              });
          }
      } else if( message.latest && message.streamKey && message.time && message.noteServer ){		 
          let url 		= new URL( message.noteServer );
          let ret 		= await getData( "scriptbillPing", "true", message.noteServer  );
          let streamKey	= url.pathname.replaceAll("/","");
                  
          if( ! ret || ! ret.isScriptbillServer )
              url 		= new URL( message.defaultServer );
              
          let response = await getData(["streamKey", "latest", "time"], [message.streamKey, message.latest, message.time], url.origin );
          if( response  )
              chrome.runtime.sendMessage(response);
          else 
              chrome.runtime.sendMessage("Not a Response");
          //sendResponse( response );
      } else if( message.response && message.server && message.note ){
          let response = await getData('response', 'true', message.server );
          
          if( response )
              chrome.runtime.sendMessage({responseKey: response});
          else {
              response = await getData('response', 'true', message.defaultServer );
              if( response )
                  chrome.runtime.sendMessage({responseKey: response});
              else
                  chrome.runtime.sendMessage({responseKey:"Not a Response"});
          }
          //sendResponse( response );
      }else if( message.currentBlock && message.noteServer  ){
          
          let ping	 = await getData('scriptbillPing', 'true', message.noteServer );
          
          if( ! ping || ! ping.isScriptbillServer )
              message.noteServer = message.defaultServer;
          
          let response = await getData('currentBlock', 'true', message.noteServer );
          if( response && response.blockID )
              chrome.runtime.sendMessage(response);
          else 
              chrome.runtime.sendMessage("Not a Response");
          //sendResponse( response );
      } else if( message.userAgent && message.data ){
          let note 		= await chrome.storage.session.get('currentNote');
          
          if( note && isJsonable( note ) ){
              note 	 		= JSON.parse( note );
              let response 	= await getData(['userAgent', 'data', 'noteAdd'], [message.userAgent, JSON.stringify( message.data ), noteID ], message.noteServer );
              
              if( response && message.value && response.server ){
                  
                  if( response.server != message.data.server || response.name == "NOT FOUND" )
                      chrome.runtime.sendMessage({payOutDividend:message.value, password:message.password, key:message.key});
              }
              chrome.storage.session.set({currentNote:JSON.stringify( note )});
          }
      } else if( message.earnings && message.minedKey ){
          addEarnings( message.earnings );
      }
      else if( message.getEarnings ){
          chrome.storage.session.get("currentNote", function( currentNote ){
              let note = false;
              
              if( currentNote.currentNote && isJsonable( currentNote.currentNote ) )
                  note 		= JSON.parse( currentNote.currentNote );
              
              if( note && note.noteAddress ){
                  chrome.storage.local.get( note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings", function(earning){
                      let value = 0;
                      
                      if( earning && earning[note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings"] ){
                          value 	= parseFloat(earning[note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings"]);
                          
                          if( isNaN( value ) )
                              value 	= 0;						
                      }
                      
                      chrome.runtime.sendMessage( {advertEarnings: value, note: note.noteAddress, noteType: note.noteType });
                  });
              } else {
                  chrome.runtime.sendMessage( {advertEarnings: 0});
              }
          });
      }
      else if( message.isMined ){
          let note 		= await chrome.storage.session.get("currentNote");
          
          let isMined = {isMinedSend: false};
          
          if(  note && note.currentNote ) {
          
              note 			= JSON.parse( note.currentNote );
              let details 	= await chrome.storage.local.get(note.noteAddress.slice(0,12) + "_mining_set");		
              if( details[note.noteAddress.slice(0,12) + "_mining_set"] && details[note.noteAddress.slice(0,12) + "_mining_set"] == "TRUE" ){
                  isMined.isMinedSend 	= true;
                  isMined.key 			= Date.now();
                  let obj 				= {};
                  obj[note.noteAddress.slice(0,12) + "_current_mining_key"] = isMined.key;
                  chrome.storage.session.set(obj);
              }
          }
          
          chrome.runtime.sendMessage( isMined );
      }
      else if( message.openUrl ){
          console.error( message.openUrl );
          chrome.tabs.create({url: message.openUrl});
      }
    }
    return true;  
  });
  
  async function addEarnings( value ){
      let note 		= await chrome.storage.session.get("currentNote");
          
      if( ! note || ! note.currentNote || ! isJsonable( note.currentNote ) ) return false;
      
      note 			= JSON.parse( note.currentNote );		
      let earnings 	= await chrome.storage.local.get( note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings");
      
      if( earnings[note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings"] )
          earnings 		= parseFloat( earnings[note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings"] );
      
      else earnings = 0;
      
      if( isNaN( earnings ))
          earnings = 0;
      
      earnings 	+=	parseFloat( value );
      await chrome.storage.local.set( {[note.noteAddress.slice(0,12).replaceAll(/[^a-zA-Z0-9]/g, "_") + "_advert_earnings"]: earnings });
  }
  
  
  async function getData( key, data, url = "", type = "GET" ){
      
      //////////console.log("url setting: " + url);
      this.url 	= new URL( url );
          
      if( type == "GET" ){
              
          if( typeof key == "object" && key.length && typeof data == "object" && data.length && data.length == key.length ){
              let x;
              for( x = 0; x < key.length; x++ ){
                  this.url.searchParams.set(key[x], data[x]);
              }
          } else if( typeof key == "string" && typeof data == "string" ){
              this.url.searchParams.set( key, data );
          }
          else {
              /* this.errorMessage("data can't be gotten, Key and Data Gotten was not Properly Configured. Please Set the data and key as an array with the same length or as a String!!!"); */
              return false;
          }
          this.result = false;
          try {
              return await fetch( this.url ).then( response =>{
                  return response.text();
              }).then( async result=>{
                  if( isJsonable( result ) ){
                      this.result = JSON.parse( result );					
                  } else {			
                      this.result = result;
                  }
                  
                  return this.result;
              }).catch( async error =>{
                  try {
                      url 		= this.url.href;
                      this.url 	= new URL( url );
                      let path 	= this.url.pathname;
                      if( path.split("/")[1] && path.split("/")[1] == path.replaceAll("/", "") ){
                          path 		= path.replaceAll("/", "");
                          this.url.searchParams.set("walletID", path );
                      }
                      this.url.pathname 		= "";
                      return await fetch( this.url.href ).then( response =>{
                          return response.text();
                      }).then( result =>{
                          this.result 	= result;
                          
                          if( isJsonable( this.result ) ){
                              this.result 	= JSON.parse( this.result );
                          }
                          return this.result;
                      }).catch( error =>{
                          return false;
                      });
                  } catch(e){
                      return false;
                  }
              });
          } catch(e){
              return this.result;
          }
      } 
      else if( type == "POST" ){
          let obj = {};
          if( typeof key == "object" && key.length && typeof data == "object" && data.length && data.length == key.length ){
              let x;
              for( x = 0; x < key.length; x++ ){
                  obj[key[x]] =  data[x];
              }
          } else if( typeof key == "string" && typeof data == "string" ){
              obj[key] =  data;
          }else {
              //this.errorMessage("data can't be gotten, Key and Data Gotten was not Properly Configured. Please Set the data and key as an array with the same length or as a String!!!");
              return false;
          }
          
          return await fetch( this.url.origin, {
              method: "POST",
              mode: "no-cors",
              headers : {
                  "Content-Type" : "application/json",
              },
              body: JSON.stringify( obj )
          }).then(response =>{
              return response.text();
          }).then(data =>{
              if( isJsonable( data ))
                  return JSON.parse( data );
              
              return data;
          }).catch( error =>{
              console.error( error );
              ////////console.log( "url fetched: ", this.url.href );
              //this.errorMessage( error.toString() );
              return false;
          });
      }
          
  }
      
  
  function isJsonable( data ){
          
      if( typeof data == 'string' && ( ( data.indexOf('{') == 0 && data.lastIndexOf('}') == ( data.length - 1 ) ) || ( data.indexOf('[') == 0 && data.lastIndexOf(']') == ( data.length - 1 ) ) ) && data != "[object Object]" )
          return true;
          
      return false;
  }
  
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
  
  function generateKey(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  
  
  
  chrome.runtime.onInstalled.addListener(({ reason, version }) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      showReadme();
    }
  });
  
  
  chrome.action.onClicked.addListener( async (tab) => {
      //////////console.log( "ID: " + tab.id );
      let currentNote = await chrome.storage.session.get('currentNote');
      let obj = {location:tab.url};
      
      if( currentNote && isJsonable( currentNote ) ){
          obj.currentNote = btoa( currentNote );
      }
      showReadme(obj);
  });
  
  
  
  function showReadme(args) {
    ////////////console.log( sessionStorage );
    let url 	= chrome.runtime.getURL("HTML/index.html");
    
    if( args )
        url 	= chrome.runtime.getURL("HTML/buyProduct.html");
   
    url 		= new URL( url );
    
    if( args && typeof args == "object" && ! args.length && Object.keys( args ).length > 0 ){
        for( let key in args ){
            url.searchParams.set(key, args[key]);
        }
    }
    
    chrome.tabs.create({ url:url.href });
  }
  