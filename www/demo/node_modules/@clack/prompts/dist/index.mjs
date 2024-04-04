import{TextPrompt as V,PasswordPrompt as j,ConfirmPrompt as N,SelectPrompt as k,SelectKeyPrompt as W,MultiSelectPrompt as D,GroupMultiSelectPrompt as L,isCancel as G,block as F}from"@clack/core";export{isCancel}from"@clack/core";import h from"node:process";import e from"picocolors";import{cursor as T,erase as A}from"sisteransi";function q(){return h.platform!=="win32"?h.env.TERM!=="linux":Boolean(h.env.CI)||Boolean(h.env.WT_SESSION)||Boolean(h.env.TERMINUS_SUBLIME)||h.env.ConEmuTask==="{cmd::Cmder}"||h.env.TERM_PROGRAM==="Terminus-Sublime"||h.env.TERM_PROGRAM==="vscode"||h.env.TERM==="xterm-256color"||h.env.TERM==="alacritty"||h.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}const _=q(),o=(r,n)=>_?r:n,H=o("\u25C6","*"),I=o("\u25A0","x"),x=o("\u25B2","x"),S=o("\u25C7","o"),K=o("\u250C","T"),a=o("\u2502","|"),d=o("\u2514","\u2014"),b=o("\u25CF",">"),E=o("\u25CB"," "),C=o("\u25FB","[\u2022]"),w=o("\u25FC","[+]"),M=o("\u25FB","[ ]"),U=o("\u25AA","\u2022"),B=o("\u2500","-"),Z=o("\u256E","+"),z=o("\u251C","+"),X=o("\u256F","+"),J=o("\u25CF","\u2022"),Y=o("\u25C6","*"),Q=o("\u25B2","!"),ee=o("\u25A0","x"),y=r=>{switch(r){case"initial":case"active":return e.cyan(H);case"cancel":return e.red(I);case"error":return e.yellow(x);case"submit":return e.green(S)}},te=r=>new V({validate:r.validate,placeholder:r.placeholder,defaultValue:r.defaultValue,initialValue:r.initialValue,render(){const n=`${e.gray(a)}
${y(this.state)}  ${r.message}
`,i=r.placeholder?e.inverse(r.placeholder[0])+e.dim(r.placeholder.slice(1)):e.inverse(e.hidden("_")),t=this.value?this.valueWithCursor:i;switch(this.state){case"error":return`${n.trim()}
${e.yellow(a)}  ${t}
${e.yellow(d)}  ${e.yellow(this.error)}
`;case"submit":return`${n}${e.gray(a)}  ${e.dim(this.value||r.placeholder)}`;case"cancel":return`${n}${e.gray(a)}  ${e.strikethrough(e.dim(this.value??""))}${this.value?.trim()?`
`+e.gray(a):""}`;default:return`${n}${e.cyan(a)}  ${t}
${e.cyan(d)}
`}}}).prompt(),re=r=>new j({validate:r.validate,mask:r.mask??U,render(){const n=`${e.gray(a)}
${y(this.state)}  ${r.message}
`,i=this.valueWithCursor,t=this.masked;switch(this.state){case"error":return`${n.trim()}
${e.yellow(a)}  ${t}
${e.yellow(d)}  ${e.yellow(this.error)}
`;case"submit":return`${n}${e.gray(a)}  ${e.dim(t)}`;case"cancel":return`${n}${e.gray(a)}  ${e.strikethrough(e.dim(t??""))}${t?`
`+e.gray(a):""}`;default:return`${n}${e.cyan(a)}  ${i}
${e.cyan(d)}
`}}}).prompt(),se=r=>{const n=r.active??"Yes",i=r.inactive??"No";return new N({active:n,inactive:i,initialValue:r.initialValue??!0,render(){const t=`${e.gray(a)}
${y(this.state)}  ${r.message}
`,s=this.value?n:i;switch(this.state){case"submit":return`${t}${e.gray(a)}  ${e.dim(s)}`;case"cancel":return`${t}${e.gray(a)}  ${e.strikethrough(e.dim(s))}
${e.gray(a)}`;default:return`${t}${e.cyan(a)}  ${this.value?`${e.green(b)} ${n}`:`${e.dim(E)} ${e.dim(n)}`} ${e.dim("/")} ${this.value?`${e.dim(E)} ${e.dim(i)}`:`${e.green(b)} ${i}`}
${e.cyan(d)}
`}}}).prompt()},ie=r=>{const n=(t,s)=>{const c=t.label??String(t.value);return s==="active"?`${e.green(b)} ${c} ${t.hint?e.dim(`(${t.hint})`):""}`:s==="selected"?`${e.dim(c)}`:s==="cancelled"?`${e.strikethrough(e.dim(c))}`:`${e.dim(E)} ${e.dim(c)}`};let i=0;return new k({options:r.options,initialValue:r.initialValue,render(){const t=`${e.gray(a)}
${y(this.state)}  ${r.message}
`;switch(this.state){case"submit":return`${t}${e.gray(a)}  ${n(this.options[this.cursor],"selected")}`;case"cancel":return`${t}${e.gray(a)}  ${n(this.options[this.cursor],"cancelled")}
${e.gray(a)}`;default:{const s=r.maxItems===void 0?1/0:Math.max(r.maxItems,5);this.cursor>=i+s-3?i=Math.max(Math.min(this.cursor-s+3,this.options.length-s),0):this.cursor<i+2&&(i=Math.max(this.cursor-2,0));const c=s<this.options.length&&i>0,l=s<this.options.length&&i+s<this.options.length;return`${t}${e.cyan(a)}  ${this.options.slice(i,i+s).map((u,m,$)=>m===0&&c?e.dim("..."):m===$.length-1&&l?e.dim("..."):n(u,m+i===this.cursor?"active":"inactive")).join(`
${e.cyan(a)}  `)}
${e.cyan(d)}
`}}}}).prompt()},ne=r=>{const n=(i,t="inactive")=>{const s=i.label??String(i.value);return t==="selected"?`${e.dim(s)}`:t==="cancelled"?`${e.strikethrough(e.dim(s))}`:t==="active"?`${e.bgCyan(e.gray(` ${i.value} `))} ${s} ${i.hint?e.dim(`(${i.hint})`):""}`:`${e.gray(e.bgWhite(e.inverse(` ${i.value} `)))} ${s} ${i.hint?e.dim(`(${i.hint})`):""}`};return new W({options:r.options,initialValue:r.initialValue,render(){const i=`${e.gray(a)}
${y(this.state)}  ${r.message}
`;switch(this.state){case"submit":return`${i}${e.gray(a)}  ${n(this.options.find(t=>t.value===this.value),"selected")}`;case"cancel":return`${i}${e.gray(a)}  ${n(this.options[0],"cancelled")}
${e.gray(a)}`;default:return`${i}${e.cyan(a)}  ${this.options.map((t,s)=>n(t,s===this.cursor?"active":"inactive")).join(`
${e.cyan(a)}  `)}
${e.cyan(d)}
`}}}).prompt()},ae=r=>{const n=(i,t)=>{const s=i.label??String(i.value);return t==="active"?`${e.cyan(C)} ${s} ${i.hint?e.dim(`(${i.hint})`):""}`:t==="selected"?`${e.green(w)} ${e.dim(s)}`:t==="cancelled"?`${e.strikethrough(e.dim(s))}`:t==="active-selected"?`${e.green(w)} ${s} ${i.hint?e.dim(`(${i.hint})`):""}`:t==="submitted"?`${e.dim(s)}`:`${e.dim(M)} ${e.dim(s)}`};return new D({options:r.options,initialValues:r.initialValues,required:r.required??!0,cursorAt:r.cursorAt,validate(i){if(this.required&&i.length===0)return`Please select at least one option.
${e.reset(e.dim(`Press ${e.gray(e.bgWhite(e.inverse(" space ")))} to select, ${e.gray(e.bgWhite(e.inverse(" enter ")))} to submit`))}`},render(){let i=`${e.gray(a)}
${y(this.state)}  ${r.message}
`;switch(this.state){case"submit":return`${i}${e.gray(a)}  ${this.options.filter(({value:t})=>this.value.includes(t)).map(t=>n(t,"submitted")).join(e.dim(", "))||e.dim("none")}`;case"cancel":{const t=this.options.filter(({value:s})=>this.value.includes(s)).map(s=>n(s,"cancelled")).join(e.dim(", "));return`${i}${e.gray(a)}  ${t.trim()?`${t}
${e.gray(a)}`:""}`}case"error":{const t=this.error.split(`
`).map((s,c)=>c===0?`${e.yellow(d)}  ${e.yellow(s)}`:`   ${s}`).join(`
`);return i+e.yellow(a)+"  "+this.options.map((s,c)=>{const l=this.value.includes(s.value),u=c===this.cursor;return u&&l?n(s,"active-selected"):l?n(s,"selected"):n(s,u?"active":"inactive")}).join(`
${e.yellow(a)}  `)+`
`+t+`
`}default:return`${i}${e.cyan(a)}  ${this.options.map((t,s)=>{const c=this.value.includes(t.value),l=s===this.cursor;return l&&c?n(t,"active-selected"):c?n(t,"selected"):n(t,l?"active":"inactive")}).join(`
${e.cyan(a)}  `)}
${e.cyan(d)}
`}}}).prompt()},ce=r=>{const n=(i,t,s=[])=>{const c=i.label??String(i.value),l=typeof i.group=="string",u=l&&(s[s.indexOf(i)+1]??{group:!0}),m=l&&u.group===!0,$=l?`${m?d:a} `:"";return t==="active"?`${e.dim($)}${e.cyan(C)} ${c} ${i.hint?e.dim(`(${i.hint})`):""}`:t==="group-active"?`${$}${e.cyan(C)} ${e.dim(c)}`:t==="group-active-selected"?`${$}${e.green(w)} ${e.dim(c)}`:t==="selected"?`${e.dim($)}${e.green(w)} ${e.dim(c)}`:t==="cancelled"?`${e.strikethrough(e.dim(c))}`:t==="active-selected"?`${e.dim($)}${e.green(w)} ${c} ${i.hint?e.dim(`(${i.hint})`):""}`:t==="submitted"?`${e.dim(c)}`:`${e.dim($)}${e.dim(M)} ${e.dim(c)}`};return new L({options:r.options,initialValues:r.initialValues,required:r.required??!0,cursorAt:r.cursorAt,validate(i){if(this.required&&i.length===0)return`Please select at least one option.
${e.reset(e.dim(`Press ${e.gray(e.bgWhite(e.inverse(" space ")))} to select, ${e.gray(e.bgWhite(e.inverse(" enter ")))} to submit`))}`},render(){let i=`${e.gray(a)}
${y(this.state)}  ${r.message}
`;switch(this.state){case"submit":return`${i}${e.gray(a)}  ${this.options.filter(({value:t})=>this.value.includes(t)).map(t=>n(t,"submitted")).join(e.dim(", "))}`;case"cancel":{const t=this.options.filter(({value:s})=>this.value.includes(s)).map(s=>n(s,"cancelled")).join(e.dim(", "));return`${i}${e.gray(a)}  ${t.trim()?`${t}
${e.gray(a)}`:""}`}case"error":{const t=this.error.split(`
`).map((s,c)=>c===0?`${e.yellow(d)}  ${e.yellow(s)}`:`   ${s}`).join(`
`);return`${i}${e.yellow(a)}  ${this.options.map((s,c,l)=>{const u=this.value.includes(s.value)||s.group===!0&&this.isGroupSelected(`${s.value}`),m=c===this.cursor;return!m&&typeof s.group=="string"&&this.options[this.cursor].value===s.group?n(s,u?"group-active-selected":"group-active",l):m&&u?n(s,"active-selected",l):u?n(s,"selected",l):n(s,m?"active":"inactive",l)}).join(`
${e.yellow(a)}  `)}
${t}
`}default:return`${i}${e.cyan(a)}  ${this.options.map((t,s,c)=>{const l=this.value.includes(t.value)||t.group===!0&&this.isGroupSelected(`${t.value}`),u=s===this.cursor;return!u&&typeof t.group=="string"&&this.options[this.cursor].value===t.group?n(t,l?"group-active-selected":"group-active",c):u&&l?n(t,"active-selected",c):l?n(t,"selected",c):n(t,u?"active":"inactive",c)}).join(`
${e.cyan(a)}  `)}
${e.cyan(d)}
`}}}).prompt()},R=r=>r.replace(me(),""),le=(r="",n="")=>{const i=`
${r}
`.split(`
`),t=R(n).length,s=Math.max(i.reduce((l,u)=>(u=R(u),u.length>l?u.length:l),0),t)+2,c=i.map(l=>`${e.gray(a)}  ${e.dim(l)}${" ".repeat(s-R(l).length)}${e.gray(a)}`).join(`
`);process.stdout.write(`${e.gray(a)}
${e.green(S)}  ${e.reset(n)} ${e.gray(B.repeat(Math.max(s-t-1,1))+Z)}
${c}
${e.gray(z+B.repeat(s+2)+X)}
`)},ue=(r="")=>{process.stdout.write(`${e.gray(d)}  ${e.red(r)}

`)},oe=(r="")=>{process.stdout.write(`${e.gray(K)}  ${r}
`)},$e=(r="")=>{process.stdout.write(`${e.gray(a)}
${e.gray(d)}  ${r}

`)},f={message:(r="",{symbol:n=e.gray(a)}={})=>{const i=[`${e.gray(a)}`];if(r){const[t,...s]=r.split(`
`);i.push(`${n}  ${t}`,...s.map(c=>`${e.gray(a)}  ${c}`))}process.stdout.write(`${i.join(`
`)}
`)},info:r=>{f.message(r,{symbol:e.blue(J)})},success:r=>{f.message(r,{symbol:e.green(Y)})},step:r=>{f.message(r,{symbol:e.green(S)})},warn:r=>{f.message(r,{symbol:e.yellow(Q)})},warning:r=>{f.warn(r)},error:r=>{f.message(r,{symbol:e.red(ee)})}},de=()=>{const r=_?["\u25D2","\u25D0","\u25D3","\u25D1"]:["\u2022","o","O","0"],n=_?80:120;let i,t,s=!1,c="";const l=(v="")=>{s=!0,i=F(),c=v.replace(/\.+$/,""),process.stdout.write(`${e.gray(a)}
`);let g=0,p=0;t=setInterval(()=>{const O=e.magenta(r[g]),P=".".repeat(Math.floor(p)).slice(0,3);process.stdout.write(T.move(-999,0)),process.stdout.write(A.down(1)),process.stdout.write(`${O}  ${c}${P}`),g=g+1<r.length?g+1:0,p=p<r.length?p+.125:0},n)},u=(v="",g=0)=>{c=v??c,s=!1,clearInterval(t);const p=g===0?e.green(S):g===1?e.red(I):e.red(x);process.stdout.write(T.move(-999,0)),process.stdout.write(A.down(1)),process.stdout.write(`${p}  ${c}
`),i()},m=(v="")=>{c=v??c},$=v=>{const g=v>1?"Something went wrong":"Canceled";s&&u(g,v)};return process.on("uncaughtExceptionMonitor",()=>$(2)),process.on("unhandledRejection",()=>$(2)),process.on("SIGINT",()=>$(1)),process.on("SIGTERM",()=>$(1)),process.on("exit",$),{start:l,stop:u,message:m}};function me(){const r=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");return new RegExp(r,"g")}const he=async(r,n)=>{const i={},t=Object.keys(r);for(const s of t){const c=r[s],l=await c({results:i})?.catch(u=>{throw u});if(typeof n?.onCancel=="function"&&G(l)){i[s]="canceled",n.onCancel({results:i});continue}i[s]=l}return i};export{ue as cancel,se as confirm,he as group,ce as groupMultiselect,oe as intro,f as log,ae as multiselect,le as note,$e as outro,re as password,ie as select,ne as selectKey,de as spinner,te as text};
