import{r as i,a as u,b as r,j as n}from"./index.3e47384e.js";import{H as d}from"./Header.d37665be.js";import{A as c}from"./Home.c9f168ed.js";function p({chats:s}){const[l,f]=i.exports.useState(""),t=i.exports.useMemo(()=>s?Object.entries(s==null?void 0:s.data()):[],[s]),o=i.exports.useMemo(()=>l.trim()?t.filter(e=>(e[1].userInfo.firstName+" "+e[1].userInfo.lastName).toLowerCase().includes(l.toLowerCase())):t,[l.trim(),t.length]),m=u();return r("div",{className:"flex-1 bg-gray-100 w-full h-full",children:n("div",{className:"main-body container m-auto w-11/12 h-full flex flex-col",children:[r(d,{}),n("div",{className:"main flex-1 flex flex-col overflow-auto",children:[r("div",{className:"heading flex-2",children:r("h1",{className:"text-3xl text-gray-700 mb-4",children:"Friends"})}),r("div",{className:"flex-1 flex h-full ",children:n("div",{className:"sidebar w-full lg:flex flex-2 flex-col pr-6",children:[r("div",{className:"search flex-2 pb-6 px-2",children:r("input",{value:l,onChange:e=>f(e.target.value),type:"text",className:"outline-none py-2 block w-full bg-transparent border-b-2 border-gray-200",placeholder:"Search"})}),r("div",{className:"flex-1 h-full px-2",children:o.length>0?o.sort((e,a)=>e[1].userInfo.firstName+" "+e[1].userInfo.lastName>a[1].userInfo.firstName+" "+a[1].userInfo.lastName?1:e[1].userInfo.firstName+" "+e[1].userInfo.lastName<a[1].userInfo.firstName+" "+a[1].userInfo.lastName?-1:0).map(e=>n("div",{onClick:()=>m(`/profile/chat/${e[0]}`),className:"entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md",children:[r("div",{className:"flex-2",children:r("div",{className:"w-12 h-12 relative",children:r(c,{name:e[1].userInfo.firstName+" "+e[1].userInfo.lastName,url:e[1].userInfo.profilePictureURL,size:"1"})})}),r("div",{className:"flex-1 px-2",children:r("div",{className:"truncate w-32",children:r("span",{className:"text-gray-800",children:e[1].userInfo.firstName+" "+e[1].userInfo.lastName})})})]},e[0])):null})]})})]})]})})}export{p as default};
