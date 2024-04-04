"use strict";const core=require("@clack/core"),process$1=require("node:process"),color=require("picocolors"),sisteransi=require("sisteransi");function isUnicodeSupported(){return process$1.platform!=="win32"?process$1.env.TERM!=="linux":Boolean(process$1.env.CI)||Boolean(process$1.env.WT_SESSION)||Boolean(process$1.env.TERMINUS_SUBLIME)||process$1.env.ConEmuTask==="{cmd::Cmder}"||process$1.env.TERM_PROGRAM==="Terminus-Sublime"||process$1.env.TERM_PROGRAM==="vscode"||process$1.env.TERM==="xterm-256color"||process$1.env.TERM==="alacritty"||process$1.env.TERMINAL_EMULATOR==="JetBrains-JediTerm"}const unicode=isUnicodeSupported(),s=(t,n)=>unicode?t:n,S_STEP_ACTIVE=s("\u25C6","*"),S_STEP_CANCEL=s("\u25A0","x"),S_STEP_ERROR=s("\u25B2","x"),S_STEP_SUBMIT=s("\u25C7","o"),S_BAR_START=s("\u250C","T"),S_BAR=s("\u2502","|"),S_BAR_END=s("\u2514","\u2014"),S_RADIO_ACTIVE=s("\u25CF",">"),S_RADIO_INACTIVE=s("\u25CB"," "),S_CHECKBOX_ACTIVE=s("\u25FB","[\u2022]"),S_CHECKBOX_SELECTED=s("\u25FC","[+]"),S_CHECKBOX_INACTIVE=s("\u25FB","[ ]"),S_PASSWORD_MASK=s("\u25AA","\u2022"),S_BAR_H=s("\u2500","-"),S_CORNER_TOP_RIGHT=s("\u256E","+"),S_CONNECT_LEFT=s("\u251C","+"),S_CORNER_BOTTOM_RIGHT=s("\u256F","+"),S_INFO=s("\u25CF","\u2022"),S_SUCCESS=s("\u25C6","*"),S_WARN=s("\u25B2","!"),S_ERROR=s("\u25A0","x"),symbol=t=>{switch(t){case"initial":case"active":return color.cyan(S_STEP_ACTIVE);case"cancel":return color.red(S_STEP_CANCEL);case"error":return color.yellow(S_STEP_ERROR);case"submit":return color.green(S_STEP_SUBMIT)}},text=t=>new core.TextPrompt({validate:t.validate,placeholder:t.placeholder,defaultValue:t.defaultValue,initialValue:t.initialValue,render(){const n=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`,i=t.placeholder?color.inverse(t.placeholder[0])+color.dim(t.placeholder.slice(1)):color.inverse(color.hidden("_")),e=this.value?this.valueWithCursor:i;switch(this.state){case"error":return`${n.trim()}
${color.yellow(S_BAR)}  ${e}
${color.yellow(S_BAR_END)}  ${color.yellow(this.error)}
`;case"submit":return`${n}${color.gray(S_BAR)}  ${color.dim(this.value||t.placeholder)}`;case"cancel":return`${n}${color.gray(S_BAR)}  ${color.strikethrough(color.dim(this.value??""))}${this.value?.trim()?`
`+color.gray(S_BAR):""}`;default:return`${n}${color.cyan(S_BAR)}  ${e}
${color.cyan(S_BAR_END)}
`}}}).prompt(),password=t=>new core.PasswordPrompt({validate:t.validate,mask:t.mask??S_PASSWORD_MASK,render(){const n=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`,i=this.valueWithCursor,e=this.masked;switch(this.state){case"error":return`${n.trim()}
${color.yellow(S_BAR)}  ${e}
${color.yellow(S_BAR_END)}  ${color.yellow(this.error)}
`;case"submit":return`${n}${color.gray(S_BAR)}  ${color.dim(e)}`;case"cancel":return`${n}${color.gray(S_BAR)}  ${color.strikethrough(color.dim(e??""))}${e?`
`+color.gray(S_BAR):""}`;default:return`${n}${color.cyan(S_BAR)}  ${i}
${color.cyan(S_BAR_END)}
`}}}).prompt(),confirm=t=>{const n=t.active??"Yes",i=t.inactive??"No";return new core.ConfirmPrompt({active:n,inactive:i,initialValue:t.initialValue??!0,render(){const e=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`,r=this.value?n:i;switch(this.state){case"submit":return`${e}${color.gray(S_BAR)}  ${color.dim(r)}`;case"cancel":return`${e}${color.gray(S_BAR)}  ${color.strikethrough(color.dim(r))}
${color.gray(S_BAR)}`;default:return`${e}${color.cyan(S_BAR)}  ${this.value?`${color.green(S_RADIO_ACTIVE)} ${n}`:`${color.dim(S_RADIO_INACTIVE)} ${color.dim(n)}`} ${color.dim("/")} ${this.value?`${color.dim(S_RADIO_INACTIVE)} ${color.dim(i)}`:`${color.green(S_RADIO_ACTIVE)} ${i}`}
${color.cyan(S_BAR_END)}
`}}}).prompt()},select=t=>{const n=(e,r)=>{const c=e.label??String(e.value);return r==="active"?`${color.green(S_RADIO_ACTIVE)} ${c} ${e.hint?color.dim(`(${e.hint})`):""}`:r==="selected"?`${color.dim(c)}`:r==="cancelled"?`${color.strikethrough(color.dim(c))}`:`${color.dim(S_RADIO_INACTIVE)} ${color.dim(c)}`};let i=0;return new core.SelectPrompt({options:t.options,initialValue:t.initialValue,render(){const e=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`;switch(this.state){case"submit":return`${e}${color.gray(S_BAR)}  ${n(this.options[this.cursor],"selected")}`;case"cancel":return`${e}${color.gray(S_BAR)}  ${n(this.options[this.cursor],"cancelled")}
${color.gray(S_BAR)}`;default:{const r=t.maxItems===void 0?1/0:Math.max(t.maxItems,5);this.cursor>=i+r-3?i=Math.max(Math.min(this.cursor-r+3,this.options.length-r),0):this.cursor<i+2&&(i=Math.max(this.cursor-2,0));const c=r<this.options.length&&i>0,a=r<this.options.length&&i+r<this.options.length;return`${e}${color.cyan(S_BAR)}  ${this.options.slice(i,i+r).map((l,o,u)=>o===0&&c||o===u.length-1&&a?color.dim("..."):n(l,o+i===this.cursor?"active":"inactive")).join(`
${color.cyan(S_BAR)}  `)}
${color.cyan(S_BAR_END)}
`}}}}).prompt()},selectKey=t=>{const n=(i,e="inactive")=>{const r=i.label??String(i.value);return e==="selected"?`${color.dim(r)}`:e==="cancelled"?`${color.strikethrough(color.dim(r))}`:e==="active"?`${color.bgCyan(color.gray(` ${i.value} `))} ${r} ${i.hint?color.dim(`(${i.hint})`):""}`:`${color.gray(color.bgWhite(color.inverse(` ${i.value} `)))} ${r} ${i.hint?color.dim(`(${i.hint})`):""}`};return new core.SelectKeyPrompt({options:t.options,initialValue:t.initialValue,render(){const i=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`;switch(this.state){case"submit":return`${i}${color.gray(S_BAR)}  ${n(this.options.find(e=>e.value===this.value),"selected")}`;case"cancel":return`${i}${color.gray(S_BAR)}  ${n(this.options[0],"cancelled")}
${color.gray(S_BAR)}`;default:return`${i}${color.cyan(S_BAR)}  ${this.options.map((e,r)=>n(e,r===this.cursor?"active":"inactive")).join(`
${color.cyan(S_BAR)}  `)}
${color.cyan(S_BAR_END)}
`}}}).prompt()},multiselect=t=>{const n=(i,e)=>{const r=i.label??String(i.value);return e==="active"?`${color.cyan(S_CHECKBOX_ACTIVE)} ${r} ${i.hint?color.dim(`(${i.hint})`):""}`:e==="selected"?`${color.green(S_CHECKBOX_SELECTED)} ${color.dim(r)}`:e==="cancelled"?`${color.strikethrough(color.dim(r))}`:e==="active-selected"?`${color.green(S_CHECKBOX_SELECTED)} ${r} ${i.hint?color.dim(`(${i.hint})`):""}`:e==="submitted"?`${color.dim(r)}`:`${color.dim(S_CHECKBOX_INACTIVE)} ${color.dim(r)}`};return new core.MultiSelectPrompt({options:t.options,initialValues:t.initialValues,required:t.required??!0,cursorAt:t.cursorAt,validate(i){if(this.required&&i.length===0)return`Please select at least one option.
${color.reset(color.dim(`Press ${color.gray(color.bgWhite(color.inverse(" space ")))} to select, ${color.gray(color.bgWhite(color.inverse(" enter ")))} to submit`))}`},render(){let i=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`;switch(this.state){case"submit":return`${i}${color.gray(S_BAR)}  ${this.options.filter(({value:e})=>this.value.includes(e)).map(e=>n(e,"submitted")).join(color.dim(", "))||color.dim("none")}`;case"cancel":{const e=this.options.filter(({value:r})=>this.value.includes(r)).map(r=>n(r,"cancelled")).join(color.dim(", "));return`${i}${color.gray(S_BAR)}  ${e.trim()?`${e}
${color.gray(S_BAR)}`:""}`}case"error":{const e=this.error.split(`
`).map((r,c)=>c===0?`${color.yellow(S_BAR_END)}  ${color.yellow(r)}`:`   ${r}`).join(`
`);return i+color.yellow(S_BAR)+"  "+this.options.map((r,c)=>{const a=this.value.includes(r.value),l=c===this.cursor;return l&&a?n(r,"active-selected"):a?n(r,"selected"):n(r,l?"active":"inactive")}).join(`
${color.yellow(S_BAR)}  `)+`
`+e+`
`}default:return`${i}${color.cyan(S_BAR)}  ${this.options.map((e,r)=>{const c=this.value.includes(e.value),a=r===this.cursor;return a&&c?n(e,"active-selected"):c?n(e,"selected"):n(e,a?"active":"inactive")}).join(`
${color.cyan(S_BAR)}  `)}
${color.cyan(S_BAR_END)}
`}}}).prompt()},groupMultiselect=t=>{const n=(i,e,r=[])=>{const c=i.label??String(i.value),a=typeof i.group=="string",l=a&&(r[r.indexOf(i)+1]??{group:!0}),o=a&&l.group===!0,u=a?`${o?S_BAR_END:S_BAR} `:"";return e==="active"?`${color.dim(u)}${color.cyan(S_CHECKBOX_ACTIVE)} ${c} ${i.hint?color.dim(`(${i.hint})`):""}`:e==="group-active"?`${u}${color.cyan(S_CHECKBOX_ACTIVE)} ${color.dim(c)}`:e==="group-active-selected"?`${u}${color.green(S_CHECKBOX_SELECTED)} ${color.dim(c)}`:e==="selected"?`${color.dim(u)}${color.green(S_CHECKBOX_SELECTED)} ${color.dim(c)}`:e==="cancelled"?`${color.strikethrough(color.dim(c))}`:e==="active-selected"?`${color.dim(u)}${color.green(S_CHECKBOX_SELECTED)} ${c} ${i.hint?color.dim(`(${i.hint})`):""}`:e==="submitted"?`${color.dim(c)}`:`${color.dim(u)}${color.dim(S_CHECKBOX_INACTIVE)} ${color.dim(c)}`};return new core.GroupMultiSelectPrompt({options:t.options,initialValues:t.initialValues,required:t.required??!0,cursorAt:t.cursorAt,validate(i){if(this.required&&i.length===0)return`Please select at least one option.
${color.reset(color.dim(`Press ${color.gray(color.bgWhite(color.inverse(" space ")))} to select, ${color.gray(color.bgWhite(color.inverse(" enter ")))} to submit`))}`},render(){let i=`${color.gray(S_BAR)}
${symbol(this.state)}  ${t.message}
`;switch(this.state){case"submit":return`${i}${color.gray(S_BAR)}  ${this.options.filter(({value:e})=>this.value.includes(e)).map(e=>n(e,"submitted")).join(color.dim(", "))}`;case"cancel":{const e=this.options.filter(({value:r})=>this.value.includes(r)).map(r=>n(r,"cancelled")).join(color.dim(", "));return`${i}${color.gray(S_BAR)}  ${e.trim()?`${e}
${color.gray(S_BAR)}`:""}`}case"error":{const e=this.error.split(`
`).map((r,c)=>c===0?`${color.yellow(S_BAR_END)}  ${color.yellow(r)}`:`   ${r}`).join(`
`);return`${i}${color.yellow(S_BAR)}  ${this.options.map((r,c,a)=>{const l=this.value.includes(r.value)||r.group===!0&&this.isGroupSelected(`${r.value}`),o=c===this.cursor;return!o&&typeof r.group=="string"&&this.options[this.cursor].value===r.group?n(r,l?"group-active-selected":"group-active",a):o&&l?n(r,"active-selected",a):l?n(r,"selected",a):n(r,o?"active":"inactive",a)}).join(`
${color.yellow(S_BAR)}  `)}
${e}
`}default:return`${i}${color.cyan(S_BAR)}  ${this.options.map((e,r,c)=>{const a=this.value.includes(e.value)||e.group===!0&&this.isGroupSelected(`${e.value}`),l=r===this.cursor;return!l&&typeof e.group=="string"&&this.options[this.cursor].value===e.group?n(e,a?"group-active-selected":"group-active",c):l&&a?n(e,"active-selected",c):a?n(e,"selected",c):n(e,l?"active":"inactive",c)}).join(`
${color.cyan(S_BAR)}  `)}
${color.cyan(S_BAR_END)}
`}}}).prompt()},strip=t=>t.replace(ansiRegex(),""),note=(t="",n="")=>{const i=`
${t}
`.split(`
`),e=strip(n).length,r=Math.max(i.reduce((a,l)=>(l=strip(l),l.length>a?l.length:a),0),e)+2,c=i.map(a=>`${color.gray(S_BAR)}  ${color.dim(a)}${" ".repeat(r-strip(a).length)}${color.gray(S_BAR)}`).join(`
`);process.stdout.write(`${color.gray(S_BAR)}
${color.green(S_STEP_SUBMIT)}  ${color.reset(n)} ${color.gray(S_BAR_H.repeat(Math.max(r-e-1,1))+S_CORNER_TOP_RIGHT)}
${c}
${color.gray(S_CONNECT_LEFT+S_BAR_H.repeat(r+2)+S_CORNER_BOTTOM_RIGHT)}
`)},cancel=(t="")=>{process.stdout.write(`${color.gray(S_BAR_END)}  ${color.red(t)}

`)},intro=(t="")=>{process.stdout.write(`${color.gray(S_BAR_START)}  ${t}
`)},outro=(t="")=>{process.stdout.write(`${color.gray(S_BAR)}
${color.gray(S_BAR_END)}  ${t}

`)},log={message:(t="",{symbol:n=color.gray(S_BAR)}={})=>{const i=[`${color.gray(S_BAR)}`];if(t){const[e,...r]=t.split(`
`);i.push(`${n}  ${e}`,...r.map(c=>`${color.gray(S_BAR)}  ${c}`))}process.stdout.write(`${i.join(`
`)}
`)},info:t=>{log.message(t,{symbol:color.blue(S_INFO)})},success:t=>{log.message(t,{symbol:color.green(S_SUCCESS)})},step:t=>{log.message(t,{symbol:color.green(S_STEP_SUBMIT)})},warn:t=>{log.message(t,{symbol:color.yellow(S_WARN)})},warning:t=>{log.warn(t)},error:t=>{log.message(t,{symbol:color.red(S_ERROR)})}},spinner=()=>{const t=unicode?["\u25D2","\u25D0","\u25D3","\u25D1"]:["\u2022","o","O","0"],n=unicode?80:120;let i,e,r=!1,c="";const a=(d="")=>{r=!0,i=core.block(),c=d.replace(/\.+$/,""),process.stdout.write(`${color.gray(S_BAR)}
`);let $=0,m=0;e=setInterval(()=>{const h=color.magenta(t[$]),g=".".repeat(Math.floor(m)).slice(0,3);process.stdout.write(sisteransi.cursor.move(-999,0)),process.stdout.write(sisteransi.erase.down(1)),process.stdout.write(`${h}  ${c}${g}`),$=$+1<t.length?$+1:0,m=m<t.length?m+.125:0},n)},l=(d="",$=0)=>{c=d??c,r=!1,clearInterval(e);const m=$===0?color.green(S_STEP_SUBMIT):$===1?color.red(S_STEP_CANCEL):color.red(S_STEP_ERROR);process.stdout.write(sisteransi.cursor.move(-999,0)),process.stdout.write(sisteransi.erase.down(1)),process.stdout.write(`${m}  ${c}
`),i()},o=(d="")=>{c=d??c},u=d=>{const $=d>1?"Something went wrong":"Canceled";r&&l($,d)};return process.on("uncaughtExceptionMonitor",()=>u(2)),process.on("unhandledRejection",()=>u(2)),process.on("SIGINT",()=>u(1)),process.on("SIGTERM",()=>u(1)),process.on("exit",u),{start:a,stop:l,message:o}};function ansiRegex(){const t=["[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)","(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))"].join("|");return new RegExp(t,"g")}const group=async(t,n)=>{const i={},e=Object.keys(t);for(const r of e){const c=t[r],a=await c({results:i})?.catch(l=>{throw l});if(typeof n?.onCancel=="function"&&core.isCancel(a)){i[r]="canceled",n.onCancel({results:i});continue}i[r]=a}return i};exports.isCancel=core.isCancel,exports.cancel=cancel,exports.confirm=confirm,exports.group=group,exports.groupMultiselect=groupMultiselect,exports.intro=intro,exports.log=log,exports.multiselect=multiselect,exports.note=note,exports.outro=outro,exports.password=password,exports.select=select,exports.selectKey=selectKey,exports.spinner=spinner,exports.text=text;
