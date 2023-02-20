import{u as j,r as g,a as H,b as s,j as n}from"./index.f530364c.js";import{H as k}from"./Header.65a93eeb.js";import{A as P}from"./Home.c056669a.js";function T({chats:r}){const{onlineStatus:l}=j(),[d,L]=g.exports.useState(""),c=g.exports.useMemo(()=>r!=null&&r.data()?Object.entries(r==null?void 0:r.data()):[],[JSON.stringify(r==null?void 0:r.data())]),i=g.exports.useMemo(()=>d.trim()?c.filter(e=>(e[1].userInfo.firstName+" "+e[1].userInfo.lastName).toLowerCase().includes(d.toLowerCase())):c,[d.trim(),JSON.stringify(c)]),A=H();return s("div",{className:"flex-1 bg-gray-100 w-full h-full",children:n("div",{className:"main-body container m-auto w-11/12 h-full flex flex-col pb-7",children:[s(k,{}),n("div",{className:"main flex-1 flex flex-col overflow-auto",children:[s("div",{className:"heading flex-2",children:s("h1",{className:"text-3xl text-gray-700 mb-4",children:"Chat"})}),s("div",{className:"flex-1 flex h-full ",children:n("div",{className:"sidebar w-full lg:flex flex-2 flex-col pr-6",children:[s("div",{className:"search flex-2 pb-6 px-2",children:s("input",{value:d,onChange:e=>L(e.target.value),type:"text",className:"outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200",placeholder:"Search"})}),s("div",{className:"flex-1 h-full px-2",children:i&&(i==null?void 0:i.length)>0?i.sort((e,a)=>a[1].lastMessage.date.seconds-e[1].lastMessage.date.seconds).map(e=>{var p,v,h,b,w,M,y,I,D,O;const a=new Date(((v=(p=e[1].lastMessage)==null?void 0:p.date)==null?void 0:v.seconds)*1e3),x=new Date,N={year:"numeric",month:"long",day:"numeric"};let f=null;if(a.getDate()===x.getDate()){const t=a.getHours(),o=a.getMinutes()<10?`0${a.getMinutes()}`:a.getMinutes(),u=t>=12;f=(u?t%12:t)+":"+o+(u?" PM":" AM")}else f=a.toLocaleDateString("en",N);let m=null;if(l!=null&&l.get(e[1].userInfo.userId).lastOnline){const t=new Date(l==null?void 0:l.get(e[1].userInfo.userId).lastOnline);if(t.getDate()===x.getDate()){const o=t.getHours(),u=t.getMinutes()<10?`0${t.getMinutes()}`:t.getMinutes(),C=o>=12;m=(C?o%12:o)+":"+u+(C?" PM":" AM")}else m=t.toLocaleDateString("en",N)}if((b=(h=e[1])==null?void 0:h.lastMessage)!=null&&b.message)return n("div",{onClick:()=>A(`/profile/chat/${e[0]}`),className:"entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md",children:[s("div",{className:"flex-2",children:n("div",{className:"w-12 h-12 relative",children:[s(P,{name:e[1].userInfo.firstName+" "+e[1].userInfo.lastName,url:e[1].userInfo.profilePictureURL,size:"1"}),(l==null?void 0:l.get(e[1].userInfo.userId).connected)===!0?s("span",{className:"absolute w-4 h-4 bg-green-400 rounded-full right-0 bottom-0 border-2 border-white"}):null]})}),n("div",{className:"flex-1 px-3",children:[s("div",{className:"truncate w-32",children:s("span",{className:"text-lg text-gray-800",children:e[1].userInfo.firstName+" "+e[1].userInfo.lastName})}),s("div",{children:s("span",{className:"text-sm text-gray-600",children:(w=e[1])==null?void 0:w.lastMessage.message})}),(M=l==null?void 0:l.get(e[1].userInfo.userId))!=null&&M.lastOnline?n("p",{className:"text-xs w-18 mt-1 text-gray-400",children:["Last seen ",m]}):null]}),n("div",{className:"flex-2 text-right",children:[s("div",{children:s("small",{className:"text-gray-500",children:f})}),((I=(y=e[1])==null?void 0:y.unOpened)==null?void 0:I.count)>0?s("div",{children:s("small",{className:"text-xs bg-red-500 text-white rounded-full h-6 w-6 leading-6 text-center inline-block",children:(O=(D=e[1])==null?void 0:D.unOpened)==null?void 0:O.count})}):null]})]},e[0])}):null})]})})]})]})})}export{T as default};
