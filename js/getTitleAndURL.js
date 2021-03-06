const createTextFromTemplate = (title, url, template) => {
    let txt = template;

    txt = txt.replace(/%%title%%/g,title);
    txt = txt.replace(/%%URL%%/g,url);
    return txt;
}


const run = () => {
    //現在のウインドウのタブをすべて取得
    chrome.tabs.query({windowId: chrome.windows.WINDOW_ID_CURRENT},(tabs) => {
        let txt = '';
        const delimiter = ', \n';  //区切り文字
        // const template = '[%%title%%](%%URL%% \"%%title%%\")'; //テンプレ
        const template = '{url:"%%URL%%", title:"%%title%%"}'; //テンプレ

        tabs.forEach((tab,i) => {
            if(i!=0) txt += delimiter;  //最初は区切り文字不要
            console.log(tab.title+" "+tab.url);
            txt += createTextFromTemplate(tab.title,tab.url,template);
        });

        document.querySelector('#numOfTabs').innerHTML = tabs.length;
        document.querySelector('#txt').value = txt;
        document.querySelector('#txtdiv').innerHTML = txt;
        connsole.log(txt);

    });
}

const copy = () => {
    const copyText = document.querySelector('#txt');
    copyText.select();
    document.execCommand('copy');
}

const reload = () => {
    run();
}

window.addEventListener('load',()=>{
    run();
    document.querySelector("#copy").addEventListener("click", copy);
    document.querySelector("#reload").addEventListener("click", reload());
}) 
