use std::process::Command;
use std::path::Path;
use std::fs;
use sysinfo::{ProcessExt, System, SystemExt};
use std::{thread, time::Duration};
use std::io;
use std::io::prelude::*;
use clap::Parser;

mod args;

use args::SteamedInjectorArgs;
use args::SteamInjectorCommands;
use args::LaunchSubCommand;
use args::GenericSubCommand;

fn main() {
    let args  = SteamedInjectorArgs::parse();
    match args.command {
        SteamInjectorCommands::Launch(arg_config) => handle_launch_steam(arg_config),
        SteamInjectorCommands::Restore(arg_config) => handle_restore(arg_config),
        SteamInjectorCommands::InjectFriend(arg_config) => handle_inject_friends_js(arg_config)
    };

    

}

fn handle_inject_friends_js(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path);
    restore_assets(&config.steam_friend_js, &config.steam_index_html);
    inject_friend_javascript(&config);
}
 
fn handle_restore(arg_config: GenericSubCommand) {
    let config = Config::new(&arg_config.steam_path);
    restore_assets(&config.steam_friend_js, &config.steam_index_html);
}

fn handle_launch_steam(arg_config:LaunchSubCommand) {
    let mut system = System::new_all();
    if is_steam_open(&mut system) {
        println!("close steam pls thanks");
        pause();
        return;
    }
    let config = Config::new_launch(arg_config);
    println!("steam_exe = {}\nsteam_path = {}\nsteam_client_ui = {}", config.steam_exe_path, config.steam_path, config.steam_client_ui);

    
    restore_assets(&config.steam_friend_js, &config.steam_index_html);

    execute_steam(&config.steam_exe_path);

    println!("LOOKING FOR STEAM");
    thread::sleep(Duration::from_millis(config.timeout));
    
    wait_for_steam(&mut system);
    
    println!("steam found :D can inject javascript now");
    

    inject_friend_javascript(&config);
}

fn wait_for_steam(system: &mut System) -> bool {
    let mut steam_found = false;

    while !steam_found {
        println!("looking for steam");
        system.refresh_all();
        

        if is_steam_open(system) {
            steam_found = true;
        }
        thread::sleep(Duration::from_millis(1000));
    }

    true
}

fn is_steam_open(system: &mut System) -> bool {
    system.refresh_all();

    for (pid, process) in system.processes() {
        if process.name() == ("steam.exe") {
            println!("FOUND STEAM PROCESS {}:{}", pid, process.name());
            return true;
        }
    };
    false
}

fn execute_steam(steam_exe_path: &String) {
    let output = Command::new(steam_exe_path)
        .arg("-dev")
        .spawn()
        .expect("welp wrong steam path probably");
    let steam_instance = output.stdout;
    println!("{:?}", steam_instance);
}


fn inject_friend_javascript(config: &Config) {
    let steamed = fs::read_to_string(&config.steamed_dist).unwrap();
    fs::write((&config.steam_client_ui).to_string() + "\\steamed.js", steamed).unwrap();

    let mut patched_js = fs::read_to_string(&config.steam_friend_js).unwrap();
    let index: usize = patched_js.find(r#"console.log("Loading chat from url: ",e)"#).unwrap();
    
    let hehe = r#"(async () => {
        const createElement = (html) => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            return temp.firstChild;
        };
        let parser = new DOMParser();
        const steamHtmlString = await (await fetch(e)).text();
        const HTML = parser.parseFromString(steamHtmlString, 'text/html');
        //edit html if ya want
        let blob = new Blob([HTML.documentElement.innerHTML], { type: 'text/html' });
        e = URL.createObjectURL(blob);
        let iframe = document.getElementById(j);
        iframe.src = e;
        ot = e;
        })();
        return;
    
    
        "#;
    


    // steamed = steamed.replace("${", "\\${");
    // let hehe = frist + &steamed.replace("`", "\\`") + second;

    patched_js.replace_range(index..index, &hehe);

    fs::write(&config.steam_friend_js, patched_js).unwrap();

    println!("injected steamed to friends and chat :D");

}


fn is_backed_up(steam_friend_js_bak: &String, steam_index_html_js_bak: &String) -> bool {
    Path::new(steam_friend_js_bak).exists() &&  Path::new(steam_index_html_js_bak).exists()
}

fn restore_assets(steam_friend_js: &String, steam_index_html: &String) {
    let steam_friend_js_bak = steam_friend_js.to_string() + ".bak";
    let steam_index_html_bak = steam_index_html.to_string()  + ".bak";
    let need_to_restore = backup_assets(steam_friend_js, steam_index_html, &steam_friend_js_bak, &steam_index_html_bak);
    if !need_to_restore {
        println!("dont need to restore anything :)");
        return;
    }
    

    let o_contents_friend_js = fs::read_to_string(&steam_friend_js_bak).unwrap();
    let o_contents_index_html = fs::read_to_string(&steam_index_html_bak).unwrap();

    println!("{}", o_contents_index_html);
    fs::write(steam_friend_js, o_contents_friend_js).unwrap();
    fs::write(steam_index_html, o_contents_index_html).unwrap();

    println!("restored assets successfully :D")

}


fn backup_assets(steam_friend_js: &String, steam_index_html: &String, steam_friend_js_bak: &String, steam_index_html_bak: &String) -> bool {
    if !is_backed_up(&steam_friend_js_bak, &steam_index_html_bak) {
        fs::copy(&steam_friend_js, &steam_friend_js_bak).expect("failed backing up friends.js");
        fs::copy(&steam_index_html, &steam_index_html_bak).expect("failed backing up index_friends.html");
        return false;
    }
    println!("files already backed up :D");
    return true;
}




#[derive(Debug)]
struct Config {
    steam_exe_path: String,
    steam_path: String,
    steam_client_ui: String,
    steam_friend_js: String,
    steam_index_html: String,
    steamed_dist: String,
    timeout: u64,
}

impl Config {
    fn new(steam_path: &String) -> Self {
        let steam_exe_path = steam_path.clone() + "\\steam.exe";
        let steam_client_ui = steam_path.clone() + "\\clientui";
        let steam_friend_js = steam_client_ui.to_string() + "\\friends.js";
        let steam_index_html = steam_client_ui.to_string() + "\\index_friends.html";
        //TODO: progrimatically get the steamed js file :)
        let steamed_dist = "C:\\Users\\USER\\Documents\\stuff\\steam-client\\dist\\js\\index.js".to_string();
        return Config { steamed_dist, steam_exe_path: steam_exe_path.to_string(), steam_client_ui, steam_friend_js, timeout: 5000, steam_path: steam_path.clone(), steam_index_html};
    }

    fn new_launch(clap_config: LaunchSubCommand) -> Self {
        let mut what = Config::new(&clap_config.steam_path);
        what.timeout = clap_config.timeout;
        what
    }
}

//https://users.rust-lang.org/t/rusts-equivalent-of-cs-system-pause/4494/4
fn pause() {
    let mut stdin = io::stdin();
    let mut stdout = io::stdout();

    // We want the cursor to stay at the end of the line, so we print without a newline and flush manually.
    write!(stdout, "Press any key to continue...").unwrap();
    stdout.flush().unwrap();

    // Read a single byte and discard
    let _ = stdin.read(&mut [0u8]).unwrap();
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