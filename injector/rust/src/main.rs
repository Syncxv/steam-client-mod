use sysinfo::{System, SystemExt};
use std::{thread, time::Duration};
use clap::Parser;
use std::env;

mod config;
mod args;
mod utils;
mod friend;
mod library;

use config::Config;

use args::SteamedInjectorArgs;
use args::SteamInjectorCommands;
use args::LaunchSubCommand;
use args::GenericSubCommand;


use utils::execute_steam;
use utils::is_steam_open;
use utils::pause;
use utils::wait_for_steam;

use friend::inject_friend_javascript;
use friend::restore_friend_assets;
use friend::delete_backups;
use friend::backup_friend_assets;

use library::restore_library_assets;
use library::inject_library;


fn main() {
    println!("{}", env::current_dir().unwrap().to_str().unwrap());
    let args  = SteamedInjectorArgs::parse();
    match args.command {
        None => {
            println!("welp you cant replace steam.exe with our one HAVE TO USE A FUCKING shortcut for now")
        },
        Some(x) => {
            match x {
                SteamInjectorCommands::Launch(arg_config) => handle_launch_steam(arg_config),
                SteamInjectorCommands::Restore(arg_config) => handle_restore(arg_config),
                SteamInjectorCommands::Inject(arg_config) => handle_inject(arg_config),
                SteamInjectorCommands::DeleteBackups(arg_config) => handle_delete_backup(arg_config),
                SteamInjectorCommands::CreateBackups(arg_config) => handle_create_backup(arg_config)

            }
        }
    };

    

}

fn handle_create_backup(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    let steam_friend_js_bak = config.steam_friend_js.to_string() + ".bak";
    let steam_friend_index_html_bak = config.steam_friend_index_html.to_string()  + ".bak";
    let need_to_restore = backup_friend_assets(&config.steam_friend_js, &config.steam_friend_index_html, &steam_friend_js_bak, &steam_friend_index_html_bak);
    if !need_to_restore {
        println!("[Friends Injector] dont need to restore anything :)");
    }
}

fn handle_delete_backup(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    remove_back_up(&config)
}

pub fn remove_back_up(config: &Config) {
    let steam_friend_js_bak = config.steam_friend_js.to_string() + ".bak";
    let steam_friend_index_html_bak = config.steam_friend_index_html.to_string()  + ".bak";
    delete_backups(&steam_friend_js_bak, &steam_friend_index_html_bak);
}

pub fn restore(config: &Config) {
    restore_library_assets(&config.steam_library_index_html);
    restore_friend_assets(&config.steam_friend_js, &config.steam_friend_index_html);
}


fn handle_inject(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    print!("{:?}", arg_config);
    restore(&config);
    inject_friend_javascript(&config);
    // inject_library(&config);
}
 
fn handle_restore(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path, None);
    restore(&config);
}

fn handle_launch_steam(arg_config:LaunchSubCommand) {
    let mut system = System::new_all();
    if is_steam_open(&mut system) {
        println!("close steam pls thanks");
        pause();
        return;
    }
    let config = Config::new_launch(arg_config);
    println!("{:?}", config);

    restore(&config);

    execute_steam(&config.steam_exe_path);

    println!("LOOKING FOR STEAM");
    
    thread::sleep(Duration::from_millis(config.timeout));
    

    wait_for_steam(&mut system);
    
    println!("steam found :D can inject javascript now");
    

    inject_library(&config);
    inject_friend_javascript(&config);
}




//WORKS IT INJEDCTS it
//ok time to play rocket :D
// fn test() {
//     let mut s = r#"GetSavedDimensionsKey(){return this.m_strSavedDimensionsKey}OnResizeComplete(e){window.parent.postMessage({message:"ErrorPopupRestoreDetailsChanged",data:e},"https://steamloopback.host")}Render(e,t){t.setAttribute("class","fullheight popup_chat_frame"),n.render(s.createElement(T,{popup:this,offlineStore:this.m_offlineStore}),t)}OnClose(){super.OnClose(),window.parent.postMessage({message:"ErrorPopupClosed"},"https://steamloopback.host")}}T;var e=t("vDqi"),rt=t.n(e);function nt(e){var t,[e,r]=e.split(".",2);return e&&r&&(t=e,"object"==typeof SteamClient&&t in SteamClient)&&r in SteamClient[e]}t("whIR"),t("HQzE"),t("ChfH");window._Steam={onComponentMounted:function(r){if(r&&r._reactInternalInstance._currentElement&&r._reactInternalInstance._currentElement._source){let t=n.findDOMNode(r);if(t){let e="";e=r._reactInternalInstance._currentElement.type&&r._reactInternalInstance._currentElement.type.name?r._reactInternalInstance._currentElement.type.name:r&&r.constructor&&r.constructor.name?r.constructor.name:"unknown",t.setAttribute("data-react-type",e);r=r._reactInternalInstance._renderedComponent._currentElement._source;null!=r&&(t.setAttribute("data-react-file",r.fileName),t.setAttribute("data-react-line",r.lineNumber))}}}},window.test=function(){SteamClient._internal.RegisterForStyleChanges(function(n){var o="https://steamloopback.host/";let i=[];var t,a=document.querySelectorAll('link[rel="stylesheet"]');for(let r=0;r<a.length;r++){var s=a[r];let e=s.href,t="";var l,u=(t=e.startsWith(o)?e.substr(o.length):t).indexOf("?");0<=u&&(t=t.substr(0,u));for(l of n)if(t==l){i.push({sheet:s,newRelative:l});break}}for(t of i){r=void 0;c=void 0;p=void 0;var r=t.newRelative;var c=t.sheet;var p=document.createElement("link");p.href=r,p.type="text/css",p.rel="stylesheet";let e=c.parentElement;e.insertBefore(p,c),e.removeChild(c)}})};let j="",ot="",A=void 0,O=void 0,it=void 0,B=0,C=[],at="",st=-1,x=void 0,lt=void 0,M=0,ut=0,I=void 0,k,ct=!1,pt=!1;function ft(e){SteamClient.WebChat.RegisterForFriendPostMessage(wt),void 0!==it&&(clearInterval(it),it=void 0),j=e,k.SetLoadingState(E.Loading),M=0,R(),ct?(k.SetLoadingState(E.FailRetry),N()):pt?N():(O=setTimeout(ht,4e3),A=setTimeout(dt,1e3),SteamClient.WebChat.GetWebChatURL().then(t=>{if(ot=t,void 0!==A&&(clearTimeout(A),A=void 0),t){let e=new URL(t);e.searchParams.set("origin",window.origin),ot=e.href,console.log("Loading chat from url: ",e.href),!function t(e){console.log("Checking network... "+B);let r=7500;0==B?r=500:1==B&&(r=2e3);let n=e;++B;rt.a.head(e,{timeout:r}).then(e=>{void 0===e.headers["x-buildtimestamp"]&&console.log("Network check (head req) got 200, but no x-buildtimestamp, not valid? Proceeding anyway..."),console.log("Network check (head req) passed after "+B+" tries..."),gt(n)}).catch(e=>{console.log("Network check try "+B+" failed..."),3<=B?dt():t(n)})}(e.href)}else R(),console.log("Empty webchat URL, we are in offline mode"),k.SetLoadingState(E.OfflineMode)}))}function R(){void 0!==A&&(clearTimeout(A),A=void 0),void 0!==O&&(clearTimeout(O),O=void 0)}function gt(e){console.log("Loading chat from url: ",e),void 0!==A&&clearTimeout(A),A=setTimeout(dt,15e3);let t=document.getElementById(j);t.src=e}function dt(){console.log("Failed to load chat!"),R(),k.SetLoadingState(E.FailRetry),4!=st&&N()}function ht(){4!=st&&k.loadingState!=E.Loaded&&N(),O=void 0}function bt(){let e=document.getElementById(j);e&&null!=e.src&&(e.src=void 0),SteamClient.WebChat.RegisterForFriendPostMessage(wt),SteamClient.WebChat.RegisterOverlayChatBrowserInfoChanged(vt)}function mt(){B=0,ft("tracked_frame_friends_chat")}function yt(){_t(!1)}function _t(a){SteamClient.WebChat.GetWebChatURL().then(i=>{console.log("Checking for updates from chat from url: ",i),void 0!==A&&(clearTimeout(A),A=void 0),rt.a.head(i,{timeout:1e4}).then(t=>{var r,n,o;if(void 0!==t.headers["x-buildtimestamp"]){ut=Number(t.headers["x-buildtimestamp"]),console.log("Currently available build: "+ut);let e=86400;a&&(e=0),0!=ut&&0!=M&&(r=ut-M,k.loadingState==E.Loaded&&r>e&&(n=604800<r,t=Number(t.headers["x-forceuiupdate"])||a,console.log("We are out of date enough to reload if idle, bVeryOutOfDate="+(n?"true":"false")),o=i.match(/(https:\/\/[^\/]+)\/.*/)[1],window.frames[0].postMessage({message:"UpdatedBuildAvailable",bVeryOutOfDate:n,bForce:t,nSecondsOutOfDate:r},o)))}}).catch(e=>{console.log("Failed trying to check available build timestamp")})})}function vt(){SteamClient.WebChat.GetOverlayChatBrowserInfo().then(e=>{let t=new Map;for(let e=0;e<C.length;++e)C[e].browser_info&&0!=C[e].browser_info.m_unPID&&t.set(C[e].browser_info.m_unPID,!0);for(var r of e)t.delete(r.unPID);for(let e=C.length-1;0<=e;e--)null!=C[e].browser_info&&t.has(C[e].browser_info.m_unPID)&&(console.log("Deleting error/offline dialog for: "+C[e].browser_info.m_unPID),C[e].Close(),C[e]=void 0,C.pop())}).catch(e=>{console.log("Failed to load overlay browser info:",e)})}function wt(t){var e=t.data;if(e&&e.command)if("ShowPopupFriendsList"==e.command){console.log("ShowPopupFriendsList");let e={m_unPID:0,m_nBrowserID:-1};N(e=void 0!==t.data.pid?{m_unPID:t.data.pid,m_nBrowserID:t"#.to_string();
//     let index: usize = s.find(r#"console.log("Loading chat from url: ",e)"#).map(|i| i).unwrap();
//     println!("{:?}", index);
    
//     s.replace_range(index..index,"bruh");
//     println!("{}",s);
// }