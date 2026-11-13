(()=>{var Ag=Object.create;var vu=Object.defineProperty;var Rg=Object.getOwnPropertyDescriptor;var Cg=Object.getOwnPropertyNames;var Pg=Object.getPrototypeOf,Ig=Object.prototype.hasOwnProperty;var ve=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var Lg=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Cg(t))!Ig.call(n,s)&&s!==e&&vu(n,s,{get:()=>t[s],enumerable:!(i=Rg(t,s))||i.enumerable});return n};var Dg=(n,t,e)=>(e=n!=null?Ag(Pg(n)):{},Lg(t||!n||!n.__esModule?vu(e,"default",{value:n,enumerable:!0}):e,n));var hm=ve((lm,Mo)=>{(function(){var n,t,e,i,s,r,o,a,c,l,h,u,d,p,x;e=Math.floor,l=Math.min,t=function(g,m){return g<m?-1:g>m?1:0},c=function(g,m,f,y,_){var M;if(f==null&&(f=0),_==null&&(_=t),f<0)throw new Error("lo must be non-negative");for(y==null&&(y=g.length);f<y;)M=e((f+y)/2),_(m,g[M])<0?y=M:f=M+1;return[].splice.apply(g,[f,f-f].concat(m)),m},r=function(g,m,f){return f==null&&(f=t),g.push(m),p(g,0,g.length-1,f)},s=function(g,m){var f,y;return m==null&&(m=t),f=g.pop(),g.length?(y=g[0],g[0]=f,x(g,0,m)):y=f,y},a=function(g,m,f){var y;return f==null&&(f=t),y=g[0],g[0]=m,x(g,0,f),y},o=function(g,m,f){var y;return f==null&&(f=t),g.length&&f(g[0],m)<0&&(y=[g[0],m],m=y[0],g[0]=y[1],x(g,0,f)),m},i=function(g,m){var f,y,_,M,E,S,w,R;for(m==null&&(m=t),S=function(){R=[];for(var b=0,v=e(g.length/2);0<=v?b<v:b>v;0<=v?b++:b--)R.push(b);return R}.apply(this).reverse(),w=[],y=0,M=S.length;y<M;y++)f=S[y],w.push(x(g,f,m));return w},d=function(g,m,f){var y;if(f==null&&(f=t),y=g.indexOf(m),y!==-1)return p(g,0,y,f),x(g,y,f)},h=function(g,m,f){var y,_,M,E,S;if(f==null&&(f=t),_=g.slice(0,m),!_.length)return _;for(i(_,f),S=g.slice(m),M=0,E=S.length;M<E;M++)y=S[M],o(_,y,f);return _.sort(f).reverse()},u=function(g,m,f){var y,_,M,E,S,w,R,b,v,A;if(f==null&&(f=t),m*10<=g.length){if(E=g.slice(0,m).sort(f),!E.length)return E;for(M=E[E.length-1],b=g.slice(m),S=0,R=b.length;S<R;S++)y=b[S],f(y,M)<0&&(c(E,y,0,null,f),E.pop(),M=E[E.length-1]);return E}for(i(g,f),A=[],_=w=0,v=l(m,g.length);0<=v?w<v:w>v;_=0<=v?++w:--w)A.push(s(g,f));return A},p=function(g,m,f,y){var _,M,E;for(y==null&&(y=t),_=g[f];f>m;){if(E=f-1>>1,M=g[E],y(_,M)<0){g[f]=M,f=E;continue}break}return g[f]=_},x=function(g,m,f){var y,_,M,E,S;for(f==null&&(f=t),_=g.length,S=m,M=g[m],y=2*m+1;y<_;)E=y+1,E<_&&!(f(g[y],g[E])<0)&&(y=E),g[m]=g[y],m=y,y=2*m+1;return g[m]=M,p(g,S,m,f)},n=function(){g.push=r,g.pop=s,g.replace=a,g.pushpop=o,g.heapify=i,g.updateItem=d,g.nlargest=h,g.nsmallest=u;function g(m){this.cmp=m??t,this.nodes=[]}return g.prototype.push=function(m){return r(this.nodes,m,this.cmp)},g.prototype.pop=function(){return s(this.nodes,this.cmp)},g.prototype.peek=function(){return this.nodes[0]},g.prototype.contains=function(m){return this.nodes.indexOf(m)!==-1},g.prototype.replace=function(m){return a(this.nodes,m,this.cmp)},g.prototype.pushpop=function(m){return o(this.nodes,m,this.cmp)},g.prototype.heapify=function(){return i(this.nodes,this.cmp)},g.prototype.updateItem=function(m){return d(this.nodes,m,this.cmp)},g.prototype.clear=function(){return this.nodes=[]},g.prototype.empty=function(){return this.nodes.length===0},g.prototype.size=function(){return this.nodes.length},g.prototype.clone=function(){var m;return m=new g,m.nodes=this.nodes.slice(0),m},g.prototype.toArray=function(){return this.nodes.slice(0)},g.prototype.insert=g.prototype.push,g.prototype.top=g.prototype.peek,g.prototype.front=g.prototype.peek,g.prototype.has=g.prototype.contains,g.prototype.copy=g.prototype.clone,g}(),typeof Mo<"u"&&Mo!==null&&Mo.exports?Mo.exports=n:window.Heap=n}).call(lm)});var bo=ve((pT,um)=>{um.exports=hm()});var yc=ve((mT,fm)=>{function aE(n,t,e){this.x=n,this.y=t,this.walkable=e===void 0?!0:e}fm.exports=aE});var mn=ve((gT,dm)=>{var cE={Always:1,Never:2,IfAtMostOneObstacle:3,OnlyWhenNoObstacles:4};dm.exports=cE});var gm=ve((xT,mm)=>{var pm=yc(),vc=mn();function fi(n,t,e){var i;typeof n!="object"?i=n:(t=n.length,i=n[0].length,e=n),this.width=i,this.height=t,this.nodes=this._buildNodes(i,t,e)}fi.prototype._buildNodes=function(n,t,e){var i,s,r=new Array(t);for(i=0;i<t;++i)for(r[i]=new Array(n),s=0;s<n;++s)r[i][s]=new pm(s,i);if(e===void 0)return r;if(e.length!==t||e[0].length!==n)throw new Error("Matrix size does not fit");for(i=0;i<t;++i)for(s=0;s<n;++s)e[i][s]&&(r[i][s].walkable=!1);return r};fi.prototype.getNodeAt=function(n,t){return this.nodes[t][n]};fi.prototype.isWalkableAt=function(n,t){return this.isInside(n,t)&&this.nodes[t][n].walkable};fi.prototype.isInside=function(n,t){return n>=0&&n<this.width&&t>=0&&t<this.height};fi.prototype.setWalkableAt=function(n,t,e){this.nodes[t][n].walkable=e};fi.prototype.getNeighbors=function(n,t){var e=n.x,i=n.y,s=[],r=!1,o=!1,a=!1,c=!1,l=!1,h=!1,u=!1,d=!1,p=this.nodes;if(this.isWalkableAt(e,i-1)&&(s.push(p[i-1][e]),r=!0),this.isWalkableAt(e+1,i)&&(s.push(p[i][e+1]),a=!0),this.isWalkableAt(e,i+1)&&(s.push(p[i+1][e]),l=!0),this.isWalkableAt(e-1,i)&&(s.push(p[i][e-1]),u=!0),t===vc.Never)return s;if(t===vc.OnlyWhenNoObstacles)o=u&&r,c=r&&a,h=a&&l,d=l&&u;else if(t===vc.IfAtMostOneObstacle)o=u||r,c=r||a,h=a||l,d=l||u;else if(t===vc.Always)o=!0,c=!0,h=!0,d=!0;else throw new Error("Incorrect value of diagonalMovement");return o&&this.isWalkableAt(e-1,i-1)&&s.push(p[i-1][e-1]),c&&this.isWalkableAt(e+1,i-1)&&s.push(p[i-1][e+1]),h&&this.isWalkableAt(e+1,i+1)&&s.push(p[i+1][e+1]),d&&this.isWalkableAt(e-1,i+1)&&s.push(p[i+1][e-1]),s};fi.prototype.clone=function(){var n,t,e=this.width,i=this.height,s=this.nodes,r=new fi(e,i),o=new Array(i);for(n=0;n<i;++n)for(o[n]=new Array(e),t=0;t<e;++t)o[n][t]=new pm(t,n,s[n][t].walkable);return r.nodes=o,r};mm.exports=fi});var Fi=ve(Oi=>{function su(n){for(var t=[[n.x,n.y]];n.parent;)n=n.parent,t.push([n.x,n.y]);return t.reverse()}Oi.backtrace=su;function lE(n,t){var e=su(n),i=su(t);return e.concat(i.reverse())}Oi.biBacktrace=lE;function hE(n){var t,e=0,i,s,r,o;for(t=1;t<n.length;++t)i=n[t-1],s=n[t],r=i[0]-s[0],o=i[1]-s[1],e+=Math.sqrt(r*r+o*o);return e}Oi.pathLength=hE;function ru(n,t,e,i){var s=Math.abs,r=[],o,a,c,l,h,u;for(c=s(e-n),l=s(i-t),o=n<e?1:-1,a=t<i?1:-1,h=c-l;r.push([n,t]),!(n===e&&t===i);)u=2*h,u>-l&&(h=h-l,n=n+o),u<c&&(h=h+c,t=t+a);return r}Oi.interpolate=ru;function uE(n){var t=[],e=n.length,i,s,r,o,a,c;if(e<2)return t;for(a=0;a<e-1;++a)for(i=n[a],s=n[a+1],r=ru(i[0],i[1],s[0],s[1]),o=r.length,c=0;c<o-1;++c)t.push(r[c]);return t.push(n[e-1]),t}Oi.expandPath=uE;function fE(n,t){var e=t.length,i=t[0][0],s=t[0][1],r=t[e-1][0],o=t[e-1][1],a,c,l,h,u,d,p,x,g,m,f;for(a=i,c=s,u=[[a,c]],d=2;d<e;++d){for(x=t[d],l=x[0],h=x[1],g=ru(a,c,l,h),f=!1,p=1;p<g.length;++p)if(m=g[p],!n.isWalkableAt(m[0],m[1])){f=!0;break}f&&(lastValidCoord=t[d-1],u.push(lastValidCoord),a=lastValidCoord[0],c=lastValidCoord[1])}return u.push([r,o]),u}Oi.smoothenPath=fE;function dE(n){if(n.length<3)return n;var t=[],e=n[0][0],i=n[0][1],s=n[1][0],r=n[1][1],o=s-e,a=r-i,c,l,h,u,d,p;for(d=Math.sqrt(o*o+a*a),o/=d,a/=d,t.push([e,i]),p=2;p<n.length;p++)c=s,l=r,h=o,u=a,s=n[p][0],r=n[p][1],o=s-c,a=r-l,d=Math.sqrt(o*o+a*a),o/=d,a/=d,(o!==h||a!==u)&&t.push([c,l]);return t.push([s,r]),t}Oi.compressPath=dE});var gr=ve((yT,xm)=>{xm.exports={manhattan:function(n,t){return n+t},euclidean:function(n,t){return Math.sqrt(n*n+t*t)},octile:function(n,t){var e=Math.SQRT2-1;return n<t?e*n+t:e*t+n},chebyshev:function(n,t){return Math.max(n,t)}}});var bc=ve((vT,ym)=>{var pE=bo(),mE=Fi(),ou=gr(),Mc=mn();function _m(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.heuristic=n.heuristic||ou.manhattan,this.weight=n.weight||1,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Mc.OnlyWhenNoObstacles:this.diagonalMovement=Mc.IfAtMostOneObstacle:this.diagonalMovement=Mc.Never),this.diagonalMovement===Mc.Never?this.heuristic=n.heuristic||ou.manhattan:this.heuristic=n.heuristic||ou.octile}_m.prototype.findPath=function(n,t,e,i,s){var r=new pE(function(E,S){return E.f-S.f}),o=s.getNodeAt(n,t),a=s.getNodeAt(e,i),c=this.heuristic,l=this.diagonalMovement,h=this.weight,u=Math.abs,d=Math.SQRT2,p,x,g,m,f,y,_,M;for(o.g=0,o.f=0,r.push(o),o.opened=!0;!r.empty();){if(p=r.pop(),p.closed=!0,p===a)return mE.backtrace(a);for(x=s.getNeighbors(p,l),m=0,f=x.length;m<f;++m)g=x[m],!g.closed&&(y=g.x,_=g.y,M=p.g+(y-p.x===0||_-p.y===0?1:d),(!g.opened||M<g.g)&&(g.g=M,g.h=g.h||h*c(u(y-e),u(_-i)),g.f=g.g+g.h,g.parent=p,g.opened?r.updateItem(g):(r.push(g),g.opened=!0)))}return[]};ym.exports=_m});var bm=ve((MT,Mm)=>{var vm=bc();function Ec(n){vm.call(this,n);var t=this.heuristic;this.heuristic=function(e,i){return t(e,i)*1e6}}Ec.prototype=new vm;Ec.prototype.constructor=Ec;Mm.exports=Ec});var wm=ve((bT,Sm)=>{var gE=Fi(),au=mn();function Em(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=au.OnlyWhenNoObstacles:this.diagonalMovement=au.IfAtMostOneObstacle:this.diagonalMovement=au.Never)}Em.prototype.findPath=function(n,t,e,i,s){var r=[],o=this.diagonalMovement,a=s.getNodeAt(n,t),c=s.getNodeAt(e,i),l,h,u,d,p;for(r.push(a),a.opened=!0;r.length;){if(u=r.shift(),u.closed=!0,u===c)return gE.backtrace(c);for(l=s.getNeighbors(u,o),d=0,p=l.length;d<p;++d)h=l[d],!(h.closed||h.opened)&&(r.push(h),h.opened=!0,h.parent=u)}return[]};Sm.exports=Em});var Rm=ve((ET,Am)=>{var Tm=bc();function Sc(n){Tm.call(this,n),this.heuristic=function(t,e){return 0}}Sc.prototype=new Tm;Sc.prototype.constructor=Sc;Am.exports=Sc});var Tc=ve((ST,Lm)=>{var Cm=bo(),Pm=Fi(),cu=gr(),wc=mn();function Im(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.heuristic=n.heuristic||cu.manhattan,this.weight=n.weight||1,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=wc.OnlyWhenNoObstacles:this.diagonalMovement=wc.IfAtMostOneObstacle:this.diagonalMovement=wc.Never),this.diagonalMovement===wc.Never?this.heuristic=n.heuristic||cu.manhattan:this.heuristic=n.heuristic||cu.octile}Im.prototype.findPath=function(n,t,e,i,s){var r=function(b,v){return b.f-v.f},o=new Cm(r),a=new Cm(r),c=s.getNodeAt(n,t),l=s.getNodeAt(e,i),h=this.heuristic,u=this.diagonalMovement,d=this.weight,p=Math.abs,x=Math.SQRT2,g,m,f,y,_,M,E,S,w=1,R=2;for(c.g=0,c.f=0,o.push(c),c.opened=w,l.g=0,l.f=0,a.push(l),l.opened=R;!o.empty()&&!a.empty();){for(g=o.pop(),g.closed=!0,m=s.getNeighbors(g,u),y=0,_=m.length;y<_;++y)if(f=m[y],!f.closed){if(f.opened===R)return Pm.biBacktrace(g,f);M=f.x,E=f.y,S=g.g+(M-g.x===0||E-g.y===0?1:x),(!f.opened||S<f.g)&&(f.g=S,f.h=f.h||d*h(p(M-e),p(E-i)),f.f=f.g+f.h,f.parent=g,f.opened?o.updateItem(f):(o.push(f),f.opened=w))}for(g=a.pop(),g.closed=!0,m=s.getNeighbors(g,u),y=0,_=m.length;y<_;++y)if(f=m[y],!f.closed){if(f.opened===w)return Pm.biBacktrace(f,g);M=f.x,E=f.y,S=g.g+(M-g.x===0||E-g.y===0?1:x),(!f.opened||S<f.g)&&(f.g=S,f.h=f.h||d*h(p(M-n),p(E-t)),f.f=f.g+f.h,f.parent=g,f.opened?a.updateItem(f):(a.push(f),f.opened=R))}}return[]};Lm.exports=Im});var Nm=ve((wT,Um)=>{var Dm=Tc();function Ac(n){Dm.call(this,n);var t=this.heuristic;this.heuristic=function(e,i){return t(e,i)*1e6}}Ac.prototype=new Dm;Ac.prototype.constructor=Ac;Um.exports=Ac});var Bm=ve((TT,Fm)=>{var zm=Fi(),lu=mn();function Om(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=lu.OnlyWhenNoObstacles:this.diagonalMovement=lu.IfAtMostOneObstacle:this.diagonalMovement=lu.Never)}Om.prototype.findPath=function(n,t,e,i,s){var r=s.getNodeAt(n,t),o=s.getNodeAt(e,i),a=[],c=[],l,h,u,d=this.diagonalMovement,p=0,x=1,g,m;for(a.push(r),r.opened=!0,r.by=p,c.push(o),o.opened=!0,o.by=x;a.length&&c.length;){for(u=a.shift(),u.closed=!0,l=s.getNeighbors(u,d),g=0,m=l.length;g<m;++g)if(h=l[g],!h.closed){if(h.opened){if(h.by===x)return zm.biBacktrace(u,h);continue}a.push(h),h.parent=u,h.opened=!0,h.by=p}for(u=c.shift(),u.closed=!0,l=s.getNeighbors(u,d),g=0,m=l.length;g<m;++g)if(h=l[g],!h.closed){if(h.opened){if(h.by===p)return zm.biBacktrace(h,u);continue}c.push(h),h.parent=u,h.opened=!0,h.by=x}}return[]};Fm.exports=Om});var Gm=ve((AT,Hm)=>{var km=Tc();function Rc(n){km.call(this,n),this.heuristic=function(t,e){return 0}}Rc.prototype=new km;Rc.prototype.constructor=Rc;Hm.exports=Rc});var qm=ve((CT,Xm)=>{var RT=Fi(),hu=gr(),Vm=yc(),Cc=mn();function Wm(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.heuristic=n.heuristic||hu.manhattan,this.weight=n.weight||1,this.trackRecursion=n.trackRecursion||!1,this.timeLimit=n.timeLimit||1/0,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Cc.OnlyWhenNoObstacles:this.diagonalMovement=Cc.IfAtMostOneObstacle:this.diagonalMovement=Cc.Never),this.diagonalMovement===Cc.Never?this.heuristic=n.heuristic||hu.manhattan:this.heuristic=n.heuristic||hu.octile}Wm.prototype.findPath=function(n,t,e,i,s){var r=0,o=new Date().getTime(),a=function(m,f){return this.heuristic(Math.abs(f.x-m.x),Math.abs(f.y-m.y))}.bind(this),c=function(m,f){return m.x===f.x||m.y===f.y?1:Math.SQRT2},l=function(m,f,y,_,M){if(r++,this.timeLimit>0&&new Date().getTime()-o>this.timeLimit*1e3)return 1/0;var E=f+a(m,u)*this.weight;if(E>y)return E;if(m==u)return _[M]=[m.x,m.y],m;var S,w,R,b,v=s.getNeighbors(m,this.diagonalMovement);for(R=0,S=1/0;b=v[R];++R){if(this.trackRecursion&&(b.retainCount=b.retainCount+1||1,b.tested!==!0&&(b.tested=!0)),w=l(b,f+c(m,b),y,_,M+1),w instanceof Vm)return _[M]=[m.x,m.y],w;this.trackRecursion&&--b.retainCount===0&&(b.tested=!1),w<S&&(S=w)}return S}.bind(this),h=s.getNodeAt(n,t),u=s.getNodeAt(e,i),d=a(h,u),p,x,g;for(p=0;;++p){if(x=[],g=l(h,0,d,x,0),g===1/0)return[];if(g instanceof Vm)return x;d=g}return[]};Xm.exports=Wm});var Eo=ve((IT,Zm)=>{var xE=bo(),Ym=Fi(),$m=gr(),PT=mn();function uu(n){n=n||{},this.heuristic=n.heuristic||$m.manhattan,this.trackJumpRecursion=n.trackJumpRecursion||!1}uu.prototype.findPath=function(n,t,e,i,s){var r=this.openList=new xE(function(l,h){return l.f-h.f}),o=this.startNode=s.getNodeAt(n,t),a=this.endNode=s.getNodeAt(e,i),c;for(this.grid=s,o.g=0,o.f=0,r.push(o),o.opened=!0;!r.empty();){if(c=r.pop(),c.closed=!0,c===a)return Ym.expandPath(Ym.backtrace(a));this._identifySuccessors(c)}return[]};uu.prototype._identifySuccessors=function(n){var t=this.grid,e=this.heuristic,i=this.openList,s=this.endNode.x,r=this.endNode.y,o,a,c,l,h,u=n.x,d=n.y,p,x,g,m,f,y,_,M=Math.abs,E=Math.max;for(o=this._findNeighbors(n),l=0,h=o.length;l<h;++l)if(a=o[l],c=this._jump(a[0],a[1],u,d),c){if(p=c[0],x=c[1],_=t.getNodeAt(p,x),_.closed)continue;f=$m.octile(M(p-u),M(x-d)),y=n.g+f,(!_.opened||y<_.g)&&(_.g=y,_.h=_.h||e(M(p-s),M(x-r)),_.f=_.g+_.h,_.parent=n,_.opened?i.updateItem(_):(i.push(_),_.opened=!0))}};Zm.exports=uu});var jm=ve((LT,Km)=>{var Jm=Eo(),_E=mn();function xr(n){Jm.call(this,n)}xr.prototype=new Jm;xr.prototype.constructor=xr;xr.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0){if(s.isWalkableAt(n,t-1)&&!s.isWalkableAt(n-r,t-1)||s.isWalkableAt(n,t+1)&&!s.isWalkableAt(n-r,t+1))return[n,t]}else if(o!==0){if(s.isWalkableAt(n-1,t)&&!s.isWalkableAt(n-1,t-o)||s.isWalkableAt(n+1,t)&&!s.isWalkableAt(n+1,t-o))return[n,t];if(this._jump(n+1,t,n,t)||this._jump(n-1,t,n,t))return[n,t]}else throw new Error("Only horizontal and vertical movements are allowed");return this._jump(n+r,t+o,n,t)};xr.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],d,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0?(s.isWalkableAt(e,i-1)&&u.push([e,i-1]),s.isWalkableAt(e,i+1)&&u.push([e,i+1]),s.isWalkableAt(e+l,i)&&u.push([e+l,i])):h!==0&&(s.isWalkableAt(e-1,i)&&u.push([e-1,i]),s.isWalkableAt(e+1,i)&&u.push([e+1,i]),s.isWalkableAt(e,i+h)&&u.push([e,i+h]));else for(d=s.getNeighbors(n,_E.Never),x=0,g=d.length;x<g;++x)p=d[x],u.push([p.x,p.y]);return u};Km.exports=xr});var eg=ve((DT,tg)=>{var Qm=Eo(),yE=mn();function _r(n){Qm.call(this,n)}_r.prototype=new Qm;_r.prototype.constructor=_r;_r.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(s.isWalkableAt(n-r,t+o)&&!s.isWalkableAt(n-r,t)||s.isWalkableAt(n+r,t-o)&&!s.isWalkableAt(n,t-o))return[n,t];if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n+r,t+1)&&!s.isWalkableAt(n,t+1)||s.isWalkableAt(n+r,t-1)&&!s.isWalkableAt(n,t-1))return[n,t]}else if(s.isWalkableAt(n+1,t+o)&&!s.isWalkableAt(n+1,t)||s.isWalkableAt(n-1,t+o)&&!s.isWalkableAt(n-1,t))return[n,t];return this._jump(n+r,t+o,n,t)};_r.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],d,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e+l,i+h)&&u.push([e+l,i+h]),s.isWalkableAt(e-l,i)||u.push([e-l,i+h]),s.isWalkableAt(e,i-h)||u.push([e+l,i-h])):l===0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+1,i)||u.push([e+1,i+h]),s.isWalkableAt(e-1,i)||u.push([e-1,i+h])):(s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e,i+1)||u.push([e+l,i+1]),s.isWalkableAt(e,i-1)||u.push([e+l,i-1]));else for(d=s.getNeighbors(n,yE.Always),x=0,g=d.length;x<g;++x)p=d[x],u.push([p.x,p.y]);return u};tg.exports=_r});var sg=ve((UT,ig)=>{var ng=Eo(),vE=mn();function yr(n){ng.call(this,n)}yr.prototype=new ng;yr.prototype.constructor=yr;yr.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n,t-1)&&!s.isWalkableAt(n-r,t-1)||s.isWalkableAt(n,t+1)&&!s.isWalkableAt(n-r,t+1))return[n,t]}else if(o!==0&&(s.isWalkableAt(n-1,t)&&!s.isWalkableAt(n-1,t-o)||s.isWalkableAt(n+1,t)&&!s.isWalkableAt(n+1,t-o)))return[n,t];return s.isWalkableAt(n+r,t)&&s.isWalkableAt(n,t+o)?this._jump(n+r,t+o,n,t):null};yr.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],d,p,x,g;if(t)if(r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0)s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e,i+h)&&s.isWalkableAt(e+l,i)&&u.push([e+l,i+h]);else{var m;if(l!==0){m=s.isWalkableAt(e+l,i);var f=s.isWalkableAt(e,i+1),y=s.isWalkableAt(e,i-1);m&&(u.push([e+l,i]),f&&u.push([e+l,i+1]),y&&u.push([e+l,i-1])),f&&u.push([e,i+1]),y&&u.push([e,i-1])}else if(h!==0){m=s.isWalkableAt(e,i+h);var _=s.isWalkableAt(e+1,i),M=s.isWalkableAt(e-1,i);m&&(u.push([e,i+h]),_&&u.push([e+1,i+h]),M&&u.push([e-1,i+h])),_&&u.push([e+1,i]),M&&u.push([e-1,i])}}else for(d=s.getNeighbors(n,vE.OnlyWhenNoObstacles),x=0,g=d.length;x<g;++x)p=d[x],u.push([p.x,p.y]);return u};ig.exports=yr});var ag=ve((NT,og)=>{var rg=Eo(),ME=mn();function vr(n){rg.call(this,n)}vr.prototype=new rg;vr.prototype.constructor=vr;vr.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(s.isWalkableAt(n-r,t+o)&&!s.isWalkableAt(n-r,t)||s.isWalkableAt(n+r,t-o)&&!s.isWalkableAt(n,t-o))return[n,t];if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n+r,t+1)&&!s.isWalkableAt(n,t+1)||s.isWalkableAt(n+r,t-1)&&!s.isWalkableAt(n,t-1))return[n,t]}else if(s.isWalkableAt(n+1,t+o)&&!s.isWalkableAt(n+1,t)||s.isWalkableAt(n-1,t+o)&&!s.isWalkableAt(n-1,t))return[n,t];return s.isWalkableAt(n+r,t)||s.isWalkableAt(n,t+o)?this._jump(n+r,t+o,n,t):null};vr.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],d,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),(s.isWalkableAt(e,i+h)||s.isWalkableAt(e+l,i))&&u.push([e+l,i+h]),!s.isWalkableAt(e-l,i)&&s.isWalkableAt(e,i+h)&&u.push([e-l,i+h]),!s.isWalkableAt(e,i-h)&&s.isWalkableAt(e+l,i)&&u.push([e+l,i-h])):l===0?s.isWalkableAt(e,i+h)&&(u.push([e,i+h]),s.isWalkableAt(e+1,i)||u.push([e+1,i+h]),s.isWalkableAt(e-1,i)||u.push([e-1,i+h])):s.isWalkableAt(e+l,i)&&(u.push([e+l,i]),s.isWalkableAt(e,i+1)||u.push([e+l,i+1]),s.isWalkableAt(e,i-1)||u.push([e+l,i-1]));else for(d=s.getNeighbors(n,ME.IfAtMostOneObstacle),x=0,g=d.length;x<g;++x)p=d[x],u.push([p.x,p.y]);return u};og.exports=vr});var lg=ve((zT,cg)=>{var fu=mn(),bE=jm(),EE=eg(),SE=sg(),wE=ag();function TE(n){return n=n||{},n.diagonalMovement===fu.Never?new bE(n):n.diagonalMovement===fu.Always?new EE(n):n.diagonalMovement===fu.OnlyWhenNoObstacles?new SE(n):new wE(n)}cg.exports=TE});var ug=ve((OT,hg)=>{hg.exports={Heap:bo(),Node:yc(),Grid:gm(),Util:Fi(),DiagonalMovement:mn(),Heuristic:gr(),AStarFinder:bc(),BestFirstFinder:bm(),BreadthFirstFinder:wm(),DijkstraFinder:Rm(),BiAStarFinder:Tc(),BiBestFirstFinder:Nm(),BiBreadthFirstFinder:Bm(),BiDijkstraFinder:Gm(),IDAStarFinder:qm(),JumpPointFinder:lg()}});var dg=ve((FT,fg)=>{fg.exports=ug()});/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var uh="160";var Ug=0,Mu=1,Ng=2;var sd=1,fh=2,ti=3,wi=0,ln=1,ze=2;var bi=0,Ws=1,bu=2,Eu=3,Su=4,zg=5,$i=100,Og=101,Fg=102,wu=103,Tu=104,Bg=200,kg=201,Hg=202,Gg=203,_l=204,yl=205,Vg=206,Wg=207,Xg=208,qg=209,Yg=210,$g=211,Zg=212,Jg=213,Kg=214,jg=0,Qg=1,t0=2,Ys=3,e0=4,n0=5,dh=6,i0=7,rd=0,s0=1,r0=2,Ei=0,o0=1,a0=2,c0=3,ph=4,l0=5,h0=6;var od=300,$s=301,Zs=302,vl=303,Ml=304,Fa=306,bl=1e3,kn=1001,El=1002,$e=1003,Au=1004;var Fc=1005;var cn=1006,u0=1007;var Fr=1008;var Si=1009,f0=1010,d0=1011,mh=1012,ad=1013,vi=1014,Mi=1015,Br=1016,cd=1017,ld=1018,Ji=1020,p0=1021,Hn=1023,m0=1024,g0=1025,Ki=1026,Js=1027,x0=1028,hd=1029,_0=1030,ud=1031,fd=1033,Bc=33776,kc=33777,Hc=33778,Gc=33779,Ru=35840,Cu=35841,Pu=35842,Iu=35843,dd=36196,Lu=37492,Du=37496,Uu=37808,Nu=37809,zu=37810,Ou=37811,Fu=37812,Bu=37813,ku=37814,Hu=37815,Gu=37816,Vu=37817,Wu=37818,Xu=37819,qu=37820,Yu=37821,Vc=36492,$u=36494,Zu=36495,y0=36283,Ju=36284,Ku=36285,ju=36286;var ca=2300,la=2301,Wc=2302,Qu=2400,tf=2401,ef=2402;var pd=3e3,ji=3001,v0=3200,M0=3201,md=0,b0=1,An="",Ze="srgb",ii="srgb-linear",gh="display-p3",Ba="display-p3-linear",ha="linear",_e="srgb",ua="rec709",fa="p3";var bs=7680;var nf=519,E0=512,S0=513,w0=514,gd=515,T0=516,A0=517,R0=518,C0=519,sf=35044,ss=35048;var rf="300 es",Sl=1035,ni=2e3,da=2001,Ti=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},Qe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],of=1234567,Ir=Math.PI/180,kr=180/Math.PI;function rs(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Qe[n&255]+Qe[n>>8&255]+Qe[n>>16&255]+Qe[n>>24&255]+"-"+Qe[t&255]+Qe[t>>8&255]+"-"+Qe[t>>16&15|64]+Qe[t>>24&255]+"-"+Qe[e&63|128]+Qe[e>>8&255]+"-"+Qe[e>>16&255]+Qe[e>>24&255]+Qe[i&255]+Qe[i>>8&255]+Qe[i>>16&255]+Qe[i>>24&255]).toLowerCase()}function We(n,t,e){return Math.max(t,Math.min(e,n))}function xh(n,t){return(n%t+t)%t}function P0(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function I0(n,t,e){return n!==t?(e-n)/(t-n):0}function Lr(n,t,e){return(1-e)*n+e*t}function L0(n,t,e,i){return Lr(n,t,1-Math.exp(-e*i))}function D0(n,t=1){return t-Math.abs(xh(n,t*2)-t)}function U0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function N0(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function z0(n,t){return n+Math.floor(Math.random()*(t-n+1))}function O0(n,t){return n+Math.random()*(t-n)}function F0(n){return n*(.5-Math.random())}function B0(n){n!==void 0&&(of=n);let t=of+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function k0(n){return n*Ir}function H0(n){return n*kr}function wl(n){return(n&n-1)===0&&n!==0}function G0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function pa(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function V0(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),d=o((t-i)/2),p=r((i-t)/2),x=o((i-t)/2);switch(s){case"XYX":n.set(a*h,c*u,c*d,a*l);break;case"YZY":n.set(c*d,a*h,c*u,a*l);break;case"ZXZ":n.set(c*u,c*d,a*h,a*l);break;case"XZX":n.set(a*h,c*x,c*p,a*l);break;case"YXY":n.set(c*p,a*h,c*x,a*l);break;case"ZYZ":n.set(c*x,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Bs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function sn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var kt={DEG2RAD:Ir,RAD2DEG:kr,generateUUID:rs,clamp:We,euclideanModulo:xh,mapLinear:P0,inverseLerp:I0,lerp:Lr,damp:L0,pingpong:D0,smoothstep:U0,smootherstep:N0,randInt:z0,randFloat:O0,randFloatSpread:F0,seededRandom:B0,degToRad:k0,radToDeg:H0,isPowerOfTwo:wl,ceilPowerOfTwo:G0,floorPowerOfTwo:pa,setQuaternionFromProperEuler:V0,normalize:sn,denormalize:Bs},At=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},re=class n{constructor(t,e,i,s,r,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],d=i[2],p=i[5],x=i[8],g=s[0],m=s[3],f=s[6],y=s[1],_=s[4],M=s[7],E=s[2],S=s[5],w=s[8];return r[0]=o*g+a*y+c*E,r[3]=o*m+a*_+c*S,r[6]=o*f+a*M+c*w,r[1]=l*g+h*y+u*E,r[4]=l*m+h*_+u*S,r[7]=l*f+h*M+u*w,r[2]=d*g+p*y+x*E,r[5]=d*m+p*_+x*S,r[8]=d*f+p*M+x*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,p=l*r-o*c,x=e*u+i*d+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/x;return t[0]=u*g,t[1]=(s*l-h*i)*g,t[2]=(a*i-s*o)*g,t[3]=d*g,t[4]=(h*e-s*c)*g,t[5]=(s*r-a*e)*g,t[6]=p*g,t[7]=(i*c-l*e)*g,t[8]=(o*e-i*r)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xc.makeScale(t,e)),this}rotate(t){return this.premultiply(Xc.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xc.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Xc=new re;function xd(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function ma(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function W0(){let n=ma("canvas");return n.style.display="block",n}var af={};function Dr(n){n in af||(af[n]=!0,console.warn(n))}var cf=new re().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),lf=new re().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Uo={[ii]:{transfer:ha,primaries:ua,toReference:n=>n,fromReference:n=>n},[Ze]:{transfer:_e,primaries:ua,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[Ba]:{transfer:ha,primaries:fa,toReference:n=>n.applyMatrix3(lf),fromReference:n=>n.applyMatrix3(cf)},[gh]:{transfer:_e,primaries:fa,toReference:n=>n.convertSRGBToLinear().applyMatrix3(lf),fromReference:n=>n.applyMatrix3(cf).convertLinearToSRGB()}},X0=new Set([ii,Ba]),fe={enabled:!0,_workingColorSpace:ii,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!X0.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=Uo[t].toReference,s=Uo[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return Uo[n].primaries},getTransfer:function(n){return n===An?ha:Uo[n].transfer}};function Xs(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function qc(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Es,ga=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Es===void 0&&(Es=ma("canvas")),Es.width=t.width,Es.height=t.height;let i=Es.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Es}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=ma("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=Xs(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Xs(e[i]/255)*255):e[i]=Xs(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},q0=0,xa=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:q0++}),this.uuid=rs(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(Yc(s[o].image)):r.push(Yc(s[o]))}else r=Yc(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function Yc(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?ga.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Y0=0,Rn=class n extends Ti{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=kn,s=kn,r=cn,o=Fr,a=Hn,c=Si,l=n.DEFAULT_ANISOTROPY,h=An){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Y0++}),this.uuid=rs(),this.name="",this.source=new xa(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new At(0,0),this.repeat=new At(1,1),this.center=new At(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new re,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===ji?Ze:An),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==od)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case bl:t.x=t.x-Math.floor(t.x);break;case kn:t.x=t.x<0?0:1;break;case El:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case bl:t.y=t.y-Math.floor(t.y);break;case kn:t.y=t.y<0?0:1;break;case El:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Ze?ji:pd}set encoding(t){Dr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===ji?Ze:An}};Rn.DEFAULT_IMAGE=null;Rn.DEFAULT_MAPPING=od;Rn.DEFAULT_ANISOTROPY=1;var Xe=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],p=c[5],x=c[9],g=c[2],m=c[6],f=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let _=(l+1)/2,M=(p+1)/2,E=(f+1)/2,S=(h+d)/4,w=(u+g)/4,R=(x+m)/4;return _>M&&_>E?_<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(_),s=S/i,r=w/i):M>E?M<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(M),i=S/s,r=R/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=w/r,s=R/r),this.set(i,s,r,e),this}let y=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-x)/y,this.y=(u-g)/y,this.z=(d-h)/y,this.w=Math.acos((l+p+f-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Tl=class extends Ti{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Xe(0,0,t,e),this.scissorTest=!1,this.viewport=new Xe(0,0,t,e);let s={width:t,height:e,depth:1};i.encoding!==void 0&&(Dr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===ji?Ze:An),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Rn(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new xa(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},si=class extends Tl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},_a=class extends Rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Al=class extends Rn{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=$e,this.minFilter=$e,this.wrapR=kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Ai=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],d=r[o+0],p=r[o+1],x=r[o+2],g=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=p,t[e+2]=x,t[e+3]=g;return}if(u!==g||c!==d||l!==p||h!==x){let m=1-a,f=c*d+l*p+h*x+u*g,y=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){let E=Math.sqrt(_),S=Math.atan2(E,f*y);m=Math.sin(m*S)/E,a=Math.sin(a*S)/E}let M=a*y;if(c=c*m+d*M,l=l*m+p*M,h=h*m+x*M,u=u*m+g*M,m===1-a){let E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],d=r[o+1],p=r[o+2],x=r[o+3];return t[e]=a*x+h*u+c*p-l*d,t[e+1]=c*x+h*d+l*u-a*p,t[e+2]=l*x+h*p+a*d-c*u,t[e+3]=h*x-a*u-c*d-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),d=c(i/2),p=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u-d*p*x;break;case"YXZ":this._x=d*h*u+l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u+d*p*x;break;case"ZXY":this._x=d*h*u-l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u-d*p*x;break;case"ZYX":this._x=d*h*u-l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u+d*p*x;break;case"YZX":this._x=d*h*u+l*p*x,this._y=l*p*u+d*h*x,this._z=l*h*x-d*p*u,this._w=l*h*u-d*p*x;break;case"XZY":this._x=d*h*u-l*p*x,this._y=l*p*u-d*h*x,this._z=l*h*x+d*p*u,this._w=l*h*u+d*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=i+a+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(hf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(hf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return $c.copy(this).projectOnVector(t),this.sub($c)}reflect(t){return this.sub($c.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(We(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$c=new k,hf=new Ai,ri=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,On):On.fromBufferAttribute(r,o),On.applyMatrix4(t.matrixWorld),this.expandByPoint(On);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),No.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),No.copy(i.boundingBox)),No.applyMatrix4(t.matrixWorld),this.union(No)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(wr),zo.subVectors(this.max,wr),Ss.subVectors(t.a,wr),ws.subVectors(t.b,wr),Ts.subVectors(t.c,wr),mi.subVectors(ws,Ss),gi.subVectors(Ts,ws),Vi.subVectors(Ss,Ts);let e=[0,-mi.z,mi.y,0,-gi.z,gi.y,0,-Vi.z,Vi.y,mi.z,0,-mi.x,gi.z,0,-gi.x,Vi.z,0,-Vi.x,-mi.y,mi.x,0,-gi.y,gi.x,0,-Vi.y,Vi.x,0];return!Zc(e,Ss,ws,Ts,zo)||(e=[1,0,0,0,1,0,0,0,1],!Zc(e,Ss,ws,Ts,zo))?!1:(Oo.crossVectors(mi,gi),e=[Oo.x,Oo.y,Oo.z],Zc(e,Ss,ws,Ts,zo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Zn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Zn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Zn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Zn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Zn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Zn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Zn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Zn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Zn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},Zn=[new k,new k,new k,new k,new k,new k,new k,new k],On=new k,No=new ri,Ss=new k,ws=new k,Ts=new k,mi=new k,gi=new k,Vi=new k,wr=new k,zo=new k,Oo=new k,Wi=new k;function Zc(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Wi.fromArray(n,r);let a=s.x*Math.abs(Wi.x)+s.y*Math.abs(Wi.y)+s.z*Math.abs(Wi.z),c=t.dot(Wi),l=e.dot(Wi),h=i.dot(Wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var $0=new ri,Tr=new k,Jc=new k,Ri=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):$0.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Tr.subVectors(t,this.center);let e=Tr.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Tr,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Jc.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Tr.copy(t.center).add(Jc)),this.expandByPoint(Tr.copy(t.center).sub(Jc))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},Jn=new k,Kc=new k,Fo=new k,xi=new k,jc=new k,Bo=new k,Qc=new k,Hr=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Jn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=Jn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Jn.copy(this.origin).addScaledVector(this.direction,e),Jn.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){Kc.copy(t).add(e).multiplyScalar(.5),Fo.copy(e).sub(t).normalize(),xi.copy(this.origin).sub(Kc);let r=t.distanceTo(e)*.5,o=-this.direction.dot(Fo),a=xi.dot(this.direction),c=-xi.dot(Fo),l=xi.lengthSq(),h=Math.abs(1-o*o),u,d,p,x;if(h>0)if(u=o*c-a,d=o*a-c,x=r*h,u>=0)if(d>=-x)if(d<=x){let g=1/h;u*=g,d*=g,p=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;else d<=-x?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l):d<=x?(u=0,d=Math.min(Math.max(-r,-c),r),p=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),p=-u*u+d*(d+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Kc).addScaledVector(Fo,d),p}intersectSphere(t,e){Jn.subVectors(t.center,this.origin);let i=Jn.dot(this.direction),s=Jn.dot(Jn)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(i=(t.min.x-d.x)*l,s=(t.max.x-d.x)*l):(i=(t.max.x-d.x)*l,s=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,Jn)!==null}intersectTriangle(t,e,i,s,r){jc.subVectors(e,t),Bo.subVectors(i,t),Qc.crossVectors(jc,Bo);let o=this.direction.dot(Qc),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,t);let c=a*this.direction.dot(Bo.crossVectors(xi,Bo));if(c<0)return null;let l=a*this.direction.dot(jc.cross(xi));if(l<0||c+l>o)return null;let h=-a*xi.dot(Qc);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},me=class n{constructor(t,e,i,s,r,o,a,c,l,h,u,d,p,x,g,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,d,p,x,g,m)}set(t,e,i,s,r,o,a,c,l,h,u,d,p,x,g,m){let f=this.elements;return f[0]=t,f[4]=e,f[8]=i,f[12]=s,f[1]=r,f[5]=o,f[9]=a,f[13]=c,f[2]=l,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=x,f[11]=g,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/As.setFromMatrixColumn(t,0).length(),r=1/As.setFromMatrixColumn(t,1).length(),o=1/As.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let d=o*h,p=o*u,x=a*h,g=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+x*l,e[5]=d-g*l,e[9]=-a*c,e[2]=g-d*l,e[6]=x+p*l,e[10]=o*c}else if(t.order==="YXZ"){let d=c*h,p=c*u,x=l*h,g=l*u;e[0]=d+g*a,e[4]=x*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-x,e[6]=g+d*a,e[10]=o*c}else if(t.order==="ZXY"){let d=c*h,p=c*u,x=l*h,g=l*u;e[0]=d-g*a,e[4]=-o*u,e[8]=x+p*a,e[1]=p+x*a,e[5]=o*h,e[9]=g-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let d=o*h,p=o*u,x=a*h,g=a*u;e[0]=c*h,e[4]=x*l-p,e[8]=d*l+g,e[1]=c*u,e[5]=g*l+d,e[9]=p*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let d=o*c,p=o*l,x=a*c,g=a*l;e[0]=c*h,e[4]=g-d*u,e[8]=x*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+x,e[10]=d-g*u}else if(t.order==="XZY"){let d=o*c,p=o*l,x=a*c,g=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+g,e[5]=o*h,e[9]=p*u-x,e[2]=x*u-p,e[6]=a*h,e[10]=g*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Z0,t,J0)}lookAt(t,e,i){let s=this.elements;return gn.subVectors(t,e),gn.lengthSq()===0&&(gn.z=1),gn.normalize(),_i.crossVectors(i,gn),_i.lengthSq()===0&&(Math.abs(i.z)===1?gn.x+=1e-4:gn.z+=1e-4,gn.normalize(),_i.crossVectors(i,gn)),_i.normalize(),ko.crossVectors(gn,_i),s[0]=_i.x,s[4]=ko.x,s[8]=gn.x,s[1]=_i.y,s[5]=ko.y,s[9]=gn.y,s[2]=_i.z,s[6]=ko.z,s[10]=gn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],d=i[9],p=i[13],x=i[2],g=i[6],m=i[10],f=i[14],y=i[3],_=i[7],M=i[11],E=i[15],S=s[0],w=s[4],R=s[8],b=s[12],v=s[1],A=s[5],I=s[9],z=s[13],P=s[2],D=s[6],N=s[10],V=s[14],H=s[3],G=s[7],O=s[11],B=s[15];return r[0]=o*S+a*v+c*P+l*H,r[4]=o*w+a*A+c*D+l*G,r[8]=o*R+a*I+c*N+l*O,r[12]=o*b+a*z+c*V+l*B,r[1]=h*S+u*v+d*P+p*H,r[5]=h*w+u*A+d*D+p*G,r[9]=h*R+u*I+d*N+p*O,r[13]=h*b+u*z+d*V+p*B,r[2]=x*S+g*v+m*P+f*H,r[6]=x*w+g*A+m*D+f*G,r[10]=x*R+g*I+m*N+f*O,r[14]=x*b+g*z+m*V+f*B,r[3]=y*S+_*v+M*P+E*H,r[7]=y*w+_*A+M*D+E*G,r[11]=y*R+_*I+M*N+E*O,r[15]=y*b+_*z+M*V+E*B,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],p=t[14],x=t[3],g=t[7],m=t[11],f=t[15];return x*(+r*c*u-s*l*u-r*a*d+i*l*d+s*a*p-i*c*p)+g*(+e*c*p-e*l*d+r*o*d-s*o*p+s*l*h-r*c*h)+m*(+e*l*u-e*a*p-r*o*u+i*o*p+r*a*h-i*l*h)+f*(-s*a*h-e*c*u+e*a*d+s*o*u-i*o*d+i*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],p=t[11],x=t[12],g=t[13],m=t[14],f=t[15],y=u*m*l-g*d*l+g*c*p-a*m*p-u*c*f+a*d*f,_=x*d*l-h*m*l-x*c*p+o*m*p+h*c*f-o*d*f,M=h*g*l-x*u*l+x*a*p-o*g*p-h*a*f+o*u*f,E=x*u*c-h*g*c-x*a*d+o*g*d+h*a*m-o*u*m,S=e*y+i*_+s*M+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/S;return t[0]=y*w,t[1]=(g*d*r-u*m*r-g*s*p+i*m*p+u*s*f-i*d*f)*w,t[2]=(a*m*r-g*c*r+g*s*l-i*m*l-a*s*f+i*c*f)*w,t[3]=(u*c*r-a*d*r-u*s*l+i*d*l+a*s*p-i*c*p)*w,t[4]=_*w,t[5]=(h*m*r-x*d*r+x*s*p-e*m*p-h*s*f+e*d*f)*w,t[6]=(x*c*r-o*m*r-x*s*l+e*m*l+o*s*f-e*c*f)*w,t[7]=(o*d*r-h*c*r+h*s*l-e*d*l-o*s*p+e*c*p)*w,t[8]=M*w,t[9]=(x*u*r-h*g*r-x*i*p+e*g*p+h*i*f-e*u*f)*w,t[10]=(o*g*r-x*a*r+x*i*l-e*g*l-o*i*f+e*a*f)*w,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*p-e*a*p)*w,t[12]=E*w,t[13]=(h*g*s-x*u*s+x*i*d-e*g*d-h*i*m+e*u*m)*w,t[14]=(x*a*s-o*g*s-x*i*c+e*g*c+o*i*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*d+e*a*d)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,p=r*h,x=r*u,g=o*h,m=o*u,f=a*u,y=c*l,_=c*h,M=c*u,E=i.x,S=i.y,w=i.z;return s[0]=(1-(g+f))*E,s[1]=(p+M)*E,s[2]=(x-_)*E,s[3]=0,s[4]=(p-M)*S,s[5]=(1-(d+f))*S,s[6]=(m+y)*S,s[7]=0,s[8]=(x+_)*w,s[9]=(m-y)*w,s[10]=(1-(d+g))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=As.set(s[0],s[1],s[2]).length(),o=As.set(s[4],s[5],s[6]).length(),a=As.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Fn.copy(this);let l=1/r,h=1/o,u=1/a;return Fn.elements[0]*=l,Fn.elements[1]*=l,Fn.elements[2]*=l,Fn.elements[4]*=h,Fn.elements[5]*=h,Fn.elements[6]*=h,Fn.elements[8]*=u,Fn.elements[9]*=u,Fn.elements[10]*=u,e.setFromRotationMatrix(Fn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=ni){let c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),d=(i+s)/(i-s),p,x;if(a===ni)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===da)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=ni){let c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(o-r),d=(e+t)*l,p=(i+s)*h,x,g;if(a===ni)x=(o+r)*u,g=-2*u;else if(a===da)x=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=g,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},As=new k,Fn=new me,Z0=new k(0,0,0),J0=new k(1,1,1),_i=new k,ko=new k,gn=new k,uf=new me,ff=new Ai,ya=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return uf.makeRotationFromQuaternion(t),this.setFromRotationMatrix(uf,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ff.setFromEuler(this),this.setFromQuaternion(ff,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ya.DEFAULT_ORDER="XYZ";var Gr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},K0=0,df=new k,Rs=new Ai,Kn=new me,Ho=new k,Ar=new k,j0=new k,Q0=new Ai,pf=new k(1,0,0),mf=new k(0,1,0),gf=new k(0,0,1),tx={type:"added"},ex={type:"removed"},Oe=class n extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:K0++}),this.uuid=rs(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new k,e=new ya,i=new Ai,s=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new me},normalMatrix:{value:new re}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Gr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Rs.setFromAxisAngle(t,e),this.quaternion.multiply(Rs),this}rotateOnWorldAxis(t,e){return Rs.setFromAxisAngle(t,e),this.quaternion.premultiply(Rs),this}rotateX(t){return this.rotateOnAxis(pf,t)}rotateY(t){return this.rotateOnAxis(mf,t)}rotateZ(t){return this.rotateOnAxis(gf,t)}translateOnAxis(t,e){return df.copy(t).applyQuaternion(this.quaternion),this.position.add(df.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(pf,t)}translateY(t){return this.translateOnAxis(mf,t)}translateZ(t){return this.translateOnAxis(gf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Kn.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Ho.copy(t):Ho.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ar.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Kn.lookAt(Ar,Ho,this.up):Kn.lookAt(Ho,Ar,this.up),this.quaternion.setFromRotationMatrix(Kn),s&&(Kn.extractRotation(s.matrixWorld),Rs.setFromRotationMatrix(Kn),this.quaternion.premultiply(Rs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(tx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ex)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Kn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Kn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Kn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,t,j0),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ar,Q0,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++){let r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),p=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};Oe.DEFAULT_UP=new k(0,1,0);Oe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Oe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Bn=new k,jn=new k,tl=new k,Qn=new k,Cs=new k,Ps=new k,xf=new k,el=new k,nl=new k,il=new k,Go=!1,ks=class n{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Bn.subVectors(t,e),s.cross(Bn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Bn.subVectors(s,e),jn.subVectors(i,e),tl.subVectors(t,e);let o=Bn.dot(Bn),a=Bn.dot(jn),c=Bn.dot(tl),l=jn.dot(jn),h=jn.dot(tl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(l*c-a*h)*d,x=(o*h-a*c)*d;return r.set(1-p-x,x,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getUV(t,e,i,s,r,o,a,c){return Go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Go=!0),this.getInterpolation(t,e,i,s,r,o,a,c)}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,Qn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Qn.x),c.addScaledVector(o,Qn.y),c.addScaledVector(a,Qn.z),c)}static isFrontFacing(t,e,i,s){return Bn.subVectors(i,e),jn.subVectors(t,e),Bn.cross(jn).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Bn.subVectors(this.c,this.b),jn.subVectors(this.a,this.b),Bn.cross(jn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return Go===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Go=!0),n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Cs.subVectors(s,i),Ps.subVectors(r,i),el.subVectors(t,i);let c=Cs.dot(el),l=Ps.dot(el);if(c<=0&&l<=0)return e.copy(i);nl.subVectors(t,s);let h=Cs.dot(nl),u=Ps.dot(nl);if(h>=0&&u<=h)return e.copy(s);let d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Cs,o);il.subVectors(t,r);let p=Cs.dot(il),x=Ps.dot(il);if(x>=0&&p<=x)return e.copy(r);let g=p*l-c*x;if(g<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(i).addScaledVector(Ps,a);let m=h*x-p*u;if(m<=0&&u-h>=0&&p-x>=0)return xf.subVectors(r,s),a=(u-h)/(u-h+(p-x)),e.copy(s).addScaledVector(xf,a);let f=1/(m+g+d);return o=g*f,a=d*f,e.copy(i).addScaledVector(Cs,o).addScaledVector(Ps,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},_d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yi={h:0,s:0,l:0},Vo={h:0,s:0,l:0};function sl(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var yt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ze){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,fe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=fe.workingColorSpace){return this.r=t,this.g=e,this.b=i,fe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=fe.workingColorSpace){if(t=xh(t,1),e=We(e,0,1),i=We(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=sl(o,r,t+1/3),this.g=sl(o,r,t),this.b=sl(o,r,t-1/3)}return fe.toWorkingColorSpace(this,s),this}setStyle(t,e=Ze){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ze){let i=_d[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Xs(t.r),this.g=Xs(t.g),this.b=Xs(t.b),this}copyLinearToSRGB(t){return this.r=qc(t.r),this.g=qc(t.g),this.b=qc(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ze){return fe.fromWorkingColorSpace(tn.copy(this),t),Math.round(We(tn.r*255,0,255))*65536+Math.round(We(tn.g*255,0,255))*256+Math.round(We(tn.b*255,0,255))}getHexString(t=Ze){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=fe.workingColorSpace){fe.fromWorkingColorSpace(tn.copy(this),e);let i=tn.r,s=tn.g,r=tn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=fe.workingColorSpace){return fe.fromWorkingColorSpace(tn.copy(this),e),t.r=tn.r,t.g=tn.g,t.b=tn.b,t}getStyle(t=Ze){fe.fromWorkingColorSpace(tn.copy(this),t);let e=tn.r,i=tn.g,s=tn.b;return t!==Ze?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(yi),this.setHSL(yi.h+t,yi.s+e,yi.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(yi),t.getHSL(Vo);let i=Lr(yi.h,Vo.h,e),s=Lr(yi.s,Vo.s,e),r=Lr(yi.l,Vo.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},tn=new yt;yt.NAMES=_d;var nx=0,Ci=class extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=rs(),this.name="",this.type="Material",this.blending=Ws,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=_l,this.blendDst=yl,this.blendEquation=$i,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=Ys,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=nf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bs,this.stencilZFail=bs,this.stencilZPass=bs,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==Ws&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==_l&&(i.blendSrc=this.blendSrc),this.blendDst!==yl&&(i.blendDst=this.blendDst),this.blendEquation!==$i&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Ys&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==nf&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bs&&(i.stencilFail=this.stencilFail),this.stencilZFail!==bs&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==bs&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},en=class extends Ci{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Ne=new k,Wo=new At,Ie=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=sf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Mi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Wo.fromBufferAttribute(this,e),Wo.applyMatrix3(t),this.setXY(e,Wo.x,Wo.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix3(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyMatrix4(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.applyNormalMatrix(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Ne.fromBufferAttribute(this,e),Ne.transformDirection(t),this.setXYZ(e,Ne.x,Ne.y,Ne.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Bs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=sn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Bs(e,this.array)),e}setX(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Bs(e,this.array)),e}setY(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Bs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Bs(e,this.array)),e}setW(t,e){return this.normalized&&(e=sn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array),s=sn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=sn(e,this.array),i=sn(i,this.array),s=sn(s,this.array),r=sn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==sf&&(t.usage=this.usage),t}};var va=class extends Ie{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Ma=class extends Ie{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var Yt=class extends Ie{constructor(t,e,i){super(new Float32Array(t),e,i)}};var ix=0,Tn=new me,rl=new Oe,Is=new k,xn=new ri,Rr=new ri,Ve=new k,oe=class n extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ix++}),this.uuid=rs(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xd(t)?Ma:va)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new re().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Tn.makeRotationFromQuaternion(t),this.applyMatrix4(Tn),this}rotateX(t){return Tn.makeRotationX(t),this.applyMatrix4(Tn),this}rotateY(t){return Tn.makeRotationY(t),this.applyMatrix4(Tn),this}rotateZ(t){return Tn.makeRotationZ(t),this.applyMatrix4(Tn),this}translate(t,e,i){return Tn.makeTranslation(t,e,i),this.applyMatrix4(Tn),this}scale(t,e,i){return Tn.makeScale(t,e,i),this.applyMatrix4(Tn),this}lookAt(t){return rl.lookAt(t),rl.updateMatrix(),this.applyMatrix4(rl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Is).negate(),this.translate(Is.x,Is.y,Is.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Yt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];xn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ve.addVectors(this.boundingBox.min,xn.min),this.boundingBox.expandByPoint(Ve),Ve.addVectors(this.boundingBox.max,xn.max),this.boundingBox.expandByPoint(Ve)):(this.boundingBox.expandByPoint(xn.min),this.boundingBox.expandByPoint(xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ri);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(xn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Rr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ve.addVectors(xn.min,Rr.min),xn.expandByPoint(Ve),Ve.addVectors(xn.max,Rr.max),xn.expandByPoint(Ve)):(xn.expandByPoint(Rr.min),xn.expandByPoint(Rr.max))}xn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ve.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ve));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ve.fromBufferAttribute(a,l),c&&(Is.fromBufferAttribute(t,l),Ve.add(Is)),s=Math.max(s,i.distanceToSquared(Ve))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ie(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let v=0;v<a;v++)l[v]=new k,h[v]=new k;let u=new k,d=new k,p=new k,x=new At,g=new At,m=new At,f=new k,y=new k;function _(v,A,I){u.fromArray(s,v*3),d.fromArray(s,A*3),p.fromArray(s,I*3),x.fromArray(o,v*2),g.fromArray(o,A*2),m.fromArray(o,I*2),d.sub(u),p.sub(u),g.sub(x),m.sub(x);let z=1/(g.x*m.y-m.x*g.y);isFinite(z)&&(f.copy(d).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar(z),y.copy(p).multiplyScalar(g.x).addScaledVector(d,-m.x).multiplyScalar(z),l[v].add(f),l[A].add(f),l[I].add(f),h[v].add(y),h[A].add(y),h[I].add(y))}let M=this.groups;M.length===0&&(M=[{start:0,count:i.length}]);for(let v=0,A=M.length;v<A;++v){let I=M[v],z=I.start,P=I.count;for(let D=z,N=z+P;D<N;D+=3)_(i[D+0],i[D+1],i[D+2])}let E=new k,S=new k,w=new k,R=new k;function b(v){w.fromArray(r,v*3),R.copy(w);let A=l[v];E.copy(A),E.sub(w.multiplyScalar(w.dot(A))).normalize(),S.crossVectors(R,A);let z=S.dot(h[v])<0?-1:1;c[v*4]=E.x,c[v*4+1]=E.y,c[v*4+2]=E.z,c[v*4+3]=z}for(let v=0,A=M.length;v<A;++v){let I=M[v],z=I.start,P=I.count;for(let D=z,N=z+P;D<N;D+=3)b(i[D+0]),b(i[D+1]),b(i[D+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ie(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,p=i.count;d<p;d++)i.setXYZ(d,0,0,0);let s=new k,r=new k,o=new k,a=new k,c=new k,l=new k,h=new k,u=new k;if(t)for(let d=0,p=t.count;d<p;d+=3){let x=t.getX(d+0),g=t.getX(d+1),m=t.getX(d+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,p=e.count;d<p;d+=3)s.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ve.fromBufferAttribute(t,e),Ve.normalize(),t.setXYZ(e,Ve.x,Ve.y,Ve.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h),p=0,x=0;for(let g=0,m=c.length;g<m;g++){a.isInterleavedBufferAttribute?p=c[g]*a.data.stride+a.offset:p=c[g]*h;for(let f=0;f<h;f++)d[x++]=l[p++]}return new Ie(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,i);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let d=l[h],p=t(d,i);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){let p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},_f=new me,Xi=new Hr,Xo=new Ri,yf=new k,Ls=new k,Ds=new k,Us=new k,ol=new k,qo=new k,Yo=new At,$o=new At,Zo=new At,vf=new k,Mf=new k,bf=new k,Jo=new k,Ko=new k,Vt=class extends Oe{constructor(t=new oe,e=new en){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){qo.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(ol.fromBufferAttribute(u,t),o?qo.addScaledVector(ol,h):qo.addScaledVector(ol.sub(e),h))}e.add(qo)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Xo.copy(i.boundingSphere),Xo.applyMatrix4(r),Xi.copy(t.ray).recast(t.near),!(Xo.containsPoint(Xi.origin)===!1&&(Xi.intersectSphere(Xo,yf)===null||Xi.origin.distanceToSquared(yf)>(t.far-t.near)**2))&&(_f.copy(r).invert(),Xi.copy(t.ray).applyMatrix4(_f),!(i.boundingBox!==null&&Xi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Xi)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,g=d.length;x<g;x++){let m=d[x],f=o[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,E=_;M<E;M+=3){let S=a.getX(M),w=a.getX(M+1),R=a.getX(M+2);s=jo(this,f,t,i,l,h,u,S,w,R),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let m=x,f=g;m<f;m+=3){let y=a.getX(m),_=a.getX(m+1),M=a.getX(m+2);s=jo(this,o,t,i,l,h,u,y,_,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,g=d.length;x<g;x++){let m=d[x],f=o[m.materialIndex],y=Math.max(m.start,p.start),_=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let M=y,E=_;M<E;M+=3){let S=M,w=M+1,R=M+2;s=jo(this,f,t,i,l,h,u,S,w,R),s&&(s.faceIndex=Math.floor(M/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let m=x,f=g;m<f;m+=3){let y=m,_=m+1,M=m+2;s=jo(this,o,t,i,l,h,u,y,_,M),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function sx(n,t,e,i,s,r,o,a){let c;if(t.side===ln?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===wi,a),c===null)return null;Ko.copy(a),Ko.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(Ko);return l<e.near||l>e.far?null:{distance:l,point:Ko.clone(),object:n}}function jo(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Ls),n.getVertexPosition(c,Ds),n.getVertexPosition(l,Us);let h=sx(n,t,e,i,Ls,Ds,Us,Jo);if(h){s&&(Yo.fromBufferAttribute(s,a),$o.fromBufferAttribute(s,c),Zo.fromBufferAttribute(s,l),h.uv=ks.getInterpolation(Jo,Ls,Ds,Us,Yo,$o,Zo,new At)),r&&(Yo.fromBufferAttribute(r,a),$o.fromBufferAttribute(r,c),Zo.fromBufferAttribute(r,l),h.uv1=ks.getInterpolation(Jo,Ls,Ds,Us,Yo,$o,Zo,new At),h.uv2=h.uv1),o&&(vf.fromBufferAttribute(o,a),Mf.fromBufferAttribute(o,c),bf.fromBufferAttribute(o,l),h.normal=ks.getInterpolation(Jo,Ls,Ds,Us,vf,Mf,bf,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new k,materialIndex:0};ks.getNormal(Ls,Ds,Us,u.normal),h.face=u}return h}var on=class n extends oe{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],d=0,p=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new Yt(l,3)),this.setAttribute("normal",new Yt(h,3)),this.setAttribute("uv",new Yt(u,2));function x(g,m,f,y,_,M,E,S,w,R,b){let v=M/w,A=E/R,I=M/2,z=E/2,P=S/2,D=w+1,N=R+1,V=0,H=0,G=new k;for(let O=0;O<N;O++){let B=O*A-z;for(let K=0;K<D;K++){let Y=K*v-I;G[g]=Y*y,G[m]=B*_,G[f]=P,l.push(G.x,G.y,G.z),G[g]=0,G[m]=0,G[f]=S>0?1:-1,h.push(G.x,G.y,G.z),u.push(K/w),u.push(1-O/R),V+=1}}for(let O=0;O<R;O++)for(let B=0;B<w;B++){let K=d+B+D*O,Y=d+B+D*(O+1),st=d+(B+1)+D*(O+1),ot=d+(B+1)+D*O;c.push(K,Y,ot),c.push(Y,st,ot),H+=6}a.addGroup(p,H,b),p+=H,d+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Ks(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function rn(n){let t={};for(let e=0;e<n.length;e++){let i=Ks(n[e]);for(let s in i)t[s]=i[s]}return t}function rx(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function yd(n){return n.getRenderTarget()===null?n.outputColorSpace:fe.workingColorSpace}var ox={clone:Ks,merge:rn},ax=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,cx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,oi=class extends Ci{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ax,this.fragmentShader=cx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Ks(t.uniforms),this.uniformsGroups=rx(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ba=class extends Oe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=ni}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},_n=class extends ba{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=kr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Ir*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return kr*2*Math.atan(Math.tan(Ir*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Ir*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Ns=-90,zs=1,Rl=class extends Oe{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new _n(Ns,zs,t,e);s.layers=this.layers,this.add(s);let r=new _n(Ns,zs,t,e);r.layers=this.layers,this.add(r);let o=new _n(Ns,zs,t,e);o.layers=this.layers,this.add(o);let a=new _n(Ns,zs,t,e);a.layers=this.layers,this.add(a);let c=new _n(Ns,zs,t,e);c.layers=this.layers,this.add(c);let l=new _n(Ns,zs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===ni)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===da)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,d,p),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Ea=class extends Rn{constructor(t,e,i,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:$s,super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Cl=class extends si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(Dr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===ji?Ze:An),this.texture=new Ea(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:cn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new on(5,5,5),r=new oi({name:"CubemapFromEquirect",uniforms:Ks(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:ln,blending:bi});r.uniforms.tEquirect.value=e;let o=new Vt(s,r),a=e.minFilter;return e.minFilter===Fr&&(e.minFilter=cn),new Rl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},al=new k,lx=new k,hx=new re,ei=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=al.subVectors(i,e).cross(lx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(al),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||hx.getNormalMatrix(t),s=this.coplanarPoint(al).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},qi=new Ri,Qo=new k,Vr=class{constructor(t=new ei,e=new ei,i=new ei,s=new ei,r=new ei,o=new ei){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=ni){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],p=s[8],x=s[9],g=s[10],m=s[11],f=s[12],y=s[13],_=s[14],M=s[15];if(i[0].setComponents(c-r,d-l,m-p,M-f).normalize(),i[1].setComponents(c+r,d+l,m+p,M+f).normalize(),i[2].setComponents(c+o,d+h,m+x,M+y).normalize(),i[3].setComponents(c-o,d-h,m-x,M-y).normalize(),i[4].setComponents(c-a,d-u,m-g,M-_).normalize(),e===ni)i[5].setComponents(c+a,d+u,m+g,M+_).normalize();else if(e===da)i[5].setComponents(a,u,g,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),qi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),qi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(qi)}intersectsSprite(t){return qi.center.set(0,0,0),qi.radius=.7071067811865476,qi.applyMatrix4(t.matrixWorld),this.intersectsSphere(qi)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(Qo.x=s.normal.x>0?t.max.x:t.min.x,Qo.y=s.normal.y>0?t.max.y:t.min.y,Qo.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Qo)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function vd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function ux(n,t){let e=t.isWebGL2,i=new WeakMap;function s(l,h){let u=l.array,d=l.usage,p=u.byteLength,x=n.createBuffer();n.bindBuffer(h,x),n.bufferData(h,u,d),l.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:x,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let d=h.array,p=h._updateRange,x=h.updateRanges;if(n.bindBuffer(u,l),p.count===-1&&x.length===0&&n.bufferSubData(u,0,d),x.length!==0){for(let g=0,m=x.length;g<m;g++){let f=x[g];e?n.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d,f.start,f.count):n.bufferSubData(u,f.start*d.BYTES_PER_ELEMENT,d.subarray(f.start,f.start+f.count))}h.clearUpdateRanges()}p.count!==-1&&(e?n.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d,p.offset,p.count):n.bufferSubData(u,p.offset*d.BYTES_PER_ELEMENT,d.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let d=i.get(l);(!d||d.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=i.get(l);if(u===void 0)i.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var js=class n extends oe{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,d=e/c,p=[],x=[],g=[],m=[];for(let f=0;f<h;f++){let y=f*d-o;for(let _=0;_<l;_++){let M=_*u-r;x.push(M,-y,0),g.push(0,0,1),m.push(_/a),m.push(1-f/c)}}for(let f=0;f<c;f++)for(let y=0;y<a;y++){let _=y+l*f,M=y+l*(f+1),E=y+1+l*(f+1),S=y+1+l*f;p.push(_,M,S),p.push(M,E,S)}this.setIndex(p),this.setAttribute("position",new Yt(x,3)),this.setAttribute("normal",new Yt(g,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},fx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,px=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,mx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,gx=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,xx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_x=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,yx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vx=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Mx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,bx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ex=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Sx=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,wx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Ax=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,Rx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Cx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ix=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Lx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Dx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Ux=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Nx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,zx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ox=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,kx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Gx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vx=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Wx=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Xx=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qx=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Yx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,$x=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Zx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Kx=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,jx=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Qx=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,t_=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,e_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,n_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,i_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,s_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,r_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,o_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,a_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,c_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,l_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,h_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,u_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,f_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,d_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,p_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,m_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,g_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,__=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,y_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,v_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,M_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,b_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,E_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,S_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,w_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,T_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,A_=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,R_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,C_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,P_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,I_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,L_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,U_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,N_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,z_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,O_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,F_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,B_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,k_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,H_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,G_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,W_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,X_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,q_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Y_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,$_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Z_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,J_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,K_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,j_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Q_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ty=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ey=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,ny=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,iy=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,sy=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,ry=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,oy=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,ay=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,cy=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ly=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,hy=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,uy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,dy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,py=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,my=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,gy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,_y=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,yy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,vy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,My=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,by=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ey=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Sy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,wy=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Ty=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ay=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ry=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Py=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Iy=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Ly=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Dy=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Uy=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ny=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,zy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Oy=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Fy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,By=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,ky=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Hy=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gy=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Vy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Wy=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ie={alphahash_fragment:fx,alphahash_pars_fragment:dx,alphamap_fragment:px,alphamap_pars_fragment:mx,alphatest_fragment:gx,alphatest_pars_fragment:xx,aomap_fragment:_x,aomap_pars_fragment:yx,batching_pars_vertex:vx,batching_vertex:Mx,begin_vertex:bx,beginnormal_vertex:Ex,bsdfs:Sx,iridescence_fragment:wx,bumpmap_pars_fragment:Tx,clipping_planes_fragment:Ax,clipping_planes_pars_fragment:Rx,clipping_planes_pars_vertex:Cx,clipping_planes_vertex:Px,color_fragment:Ix,color_pars_fragment:Lx,color_pars_vertex:Dx,color_vertex:Ux,common:Nx,cube_uv_reflection_fragment:zx,defaultnormal_vertex:Ox,displacementmap_pars_vertex:Fx,displacementmap_vertex:Bx,emissivemap_fragment:kx,emissivemap_pars_fragment:Hx,colorspace_fragment:Gx,colorspace_pars_fragment:Vx,envmap_fragment:Wx,envmap_common_pars_fragment:Xx,envmap_pars_fragment:qx,envmap_pars_vertex:Yx,envmap_physical_pars_fragment:r_,envmap_vertex:$x,fog_vertex:Zx,fog_pars_vertex:Jx,fog_fragment:Kx,fog_pars_fragment:jx,gradientmap_pars_fragment:Qx,lightmap_fragment:t_,lightmap_pars_fragment:e_,lights_lambert_fragment:n_,lights_lambert_pars_fragment:i_,lights_pars_begin:s_,lights_toon_fragment:o_,lights_toon_pars_fragment:a_,lights_phong_fragment:c_,lights_phong_pars_fragment:l_,lights_physical_fragment:h_,lights_physical_pars_fragment:u_,lights_fragment_begin:f_,lights_fragment_maps:d_,lights_fragment_end:p_,logdepthbuf_fragment:m_,logdepthbuf_pars_fragment:g_,logdepthbuf_pars_vertex:x_,logdepthbuf_vertex:__,map_fragment:y_,map_pars_fragment:v_,map_particle_fragment:M_,map_particle_pars_fragment:b_,metalnessmap_fragment:E_,metalnessmap_pars_fragment:S_,morphcolor_vertex:w_,morphnormal_vertex:T_,morphtarget_pars_vertex:A_,morphtarget_vertex:R_,normal_fragment_begin:C_,normal_fragment_maps:P_,normal_pars_fragment:I_,normal_pars_vertex:L_,normal_vertex:D_,normalmap_pars_fragment:U_,clearcoat_normal_fragment_begin:N_,clearcoat_normal_fragment_maps:z_,clearcoat_pars_fragment:O_,iridescence_pars_fragment:F_,opaque_fragment:B_,packing:k_,premultiplied_alpha_fragment:H_,project_vertex:G_,dithering_fragment:V_,dithering_pars_fragment:W_,roughnessmap_fragment:X_,roughnessmap_pars_fragment:q_,shadowmap_pars_fragment:Y_,shadowmap_pars_vertex:$_,shadowmap_vertex:Z_,shadowmask_pars_fragment:J_,skinbase_vertex:K_,skinning_pars_vertex:j_,skinning_vertex:Q_,skinnormal_vertex:ty,specularmap_fragment:ey,specularmap_pars_fragment:ny,tonemapping_fragment:iy,tonemapping_pars_fragment:sy,transmission_fragment:ry,transmission_pars_fragment:oy,uv_pars_fragment:ay,uv_pars_vertex:cy,uv_vertex:ly,worldpos_vertex:hy,background_vert:uy,background_frag:fy,backgroundCube_vert:dy,backgroundCube_frag:py,cube_vert:my,cube_frag:gy,depth_vert:xy,depth_frag:_y,distanceRGBA_vert:yy,distanceRGBA_frag:vy,equirect_vert:My,equirect_frag:by,linedashed_vert:Ey,linedashed_frag:Sy,meshbasic_vert:wy,meshbasic_frag:Ty,meshlambert_vert:Ay,meshlambert_frag:Ry,meshmatcap_vert:Cy,meshmatcap_frag:Py,meshnormal_vert:Iy,meshnormal_frag:Ly,meshphong_vert:Dy,meshphong_frag:Uy,meshphysical_vert:Ny,meshphysical_frag:zy,meshtoon_vert:Oy,meshtoon_frag:Fy,points_vert:By,points_frag:ky,shadow_vert:Hy,shadow_frag:Gy,sprite_vert:Vy,sprite_frag:Wy},It={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new re}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new re}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new re}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new re},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new re},normalScale:{value:new At(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new re},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new re}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new re}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new re}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0},uvTransform:{value:new re}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new At(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new re},alphaMap:{value:null},alphaMapTransform:{value:new re},alphaTest:{value:0}}},Yn={basic:{uniforms:rn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.fog]),vertexShader:ie.meshbasic_vert,fragmentShader:ie.meshbasic_frag},lambert:{uniforms:rn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new yt(0)}}]),vertexShader:ie.meshlambert_vert,fragmentShader:ie.meshlambert_frag},phong:{uniforms:rn([It.common,It.specularmap,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.fog,It.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30}}]),vertexShader:ie.meshphong_vert,fragmentShader:ie.meshphong_frag},standard:{uniforms:rn([It.common,It.envmap,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.roughnessmap,It.metalnessmap,It.fog,It.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag},toon:{uniforms:rn([It.common,It.aomap,It.lightmap,It.emissivemap,It.bumpmap,It.normalmap,It.displacementmap,It.gradientmap,It.fog,It.lights,{emissive:{value:new yt(0)}}]),vertexShader:ie.meshtoon_vert,fragmentShader:ie.meshtoon_frag},matcap:{uniforms:rn([It.common,It.bumpmap,It.normalmap,It.displacementmap,It.fog,{matcap:{value:null}}]),vertexShader:ie.meshmatcap_vert,fragmentShader:ie.meshmatcap_frag},points:{uniforms:rn([It.points,It.fog]),vertexShader:ie.points_vert,fragmentShader:ie.points_frag},dashed:{uniforms:rn([It.common,It.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ie.linedashed_vert,fragmentShader:ie.linedashed_frag},depth:{uniforms:rn([It.common,It.displacementmap]),vertexShader:ie.depth_vert,fragmentShader:ie.depth_frag},normal:{uniforms:rn([It.common,It.bumpmap,It.normalmap,It.displacementmap,{opacity:{value:1}}]),vertexShader:ie.meshnormal_vert,fragmentShader:ie.meshnormal_frag},sprite:{uniforms:rn([It.sprite,It.fog]),vertexShader:ie.sprite_vert,fragmentShader:ie.sprite_frag},background:{uniforms:{uvTransform:{value:new re},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ie.background_vert,fragmentShader:ie.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:ie.backgroundCube_vert,fragmentShader:ie.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ie.cube_vert,fragmentShader:ie.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ie.equirect_vert,fragmentShader:ie.equirect_frag},distanceRGBA:{uniforms:rn([It.common,It.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ie.distanceRGBA_vert,fragmentShader:ie.distanceRGBA_frag},shadow:{uniforms:rn([It.lights,It.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:ie.shadow_vert,fragmentShader:ie.shadow_frag}};Yn.physical={uniforms:rn([Yn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new re},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new re},clearcoatNormalScale:{value:new At(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new re},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new re},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new re},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new re},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new re},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new re},transmissionSamplerSize:{value:new At},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new re},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new re},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new re},anisotropyVector:{value:new At},anisotropyMap:{value:null},anisotropyMapTransform:{value:new re}}]),vertexShader:ie.meshphysical_vert,fragmentShader:ie.meshphysical_frag};var ta={r:0,b:0,g:0};function Xy(n,t,e,i,s,r,o){let a=new yt(0),c=r===!0?0:1,l,h,u=null,d=0,p=null;function x(m,f){let y=!1,_=f.isScene===!0?f.background:null;_&&_.isTexture&&(_=(f.backgroundBlurriness>0?e:t).get(_)),_===null?g(a,c):_&&_.isColor&&(g(_,1),y=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||y)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),_&&(_.isCubeTexture||_.mapping===Fa)?(h===void 0&&(h=new Vt(new on(1,1,1),new oi({name:"BackgroundCubeMaterial",uniforms:Ks(Yn.backgroundCube.uniforms),vertexShader:Yn.backgroundCube.vertexShader,fragmentShader:Yn.backgroundCube.fragmentShader,side:ln,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=_,h.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,h.material.toneMapped=fe.getTransfer(_.colorSpace)!==_e,(u!==_||d!==_.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=_,d=_.version,p=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Vt(new js(2,2),new oi({name:"BackgroundMaterial",uniforms:Ks(Yn.background.uniforms),vertexShader:Yn.background.vertexShader,fragmentShader:Yn.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,l.material.toneMapped=fe.getTransfer(_.colorSpace)!==_e,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(u!==_||d!==_.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=_,d=_.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,f){m.getRGB(ta,yd(n)),i.buffers.color.setClear(ta.r,ta.g,ta.b,f,o)}return{getClearColor:function(){return a},setClearColor:function(m,f=1){a.set(m),c=f,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(a,c)},render:x}}function qy(n,t,e,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(P,D,N,V,H){let G=!1;if(o){let O=g(V,N,D);l!==O&&(l=O,p(l.object)),G=f(P,V,N,H),G&&y(P,V,N,H)}else{let O=D.wireframe===!0;(l.geometry!==V.id||l.program!==N.id||l.wireframe!==O)&&(l.geometry=V.id,l.program=N.id,l.wireframe=O,G=!0)}H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(G||h)&&(h=!1,R(P,D,N,V),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function d(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(P){return i.isWebGL2?n.bindVertexArray(P):r.bindVertexArrayOES(P)}function x(P){return i.isWebGL2?n.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function g(P,D,N){let V=N.wireframe===!0,H=a[P.id];H===void 0&&(H={},a[P.id]=H);let G=H[D.id];G===void 0&&(G={},H[D.id]=G);let O=G[V];return O===void 0&&(O=m(d()),G[V]=O),O}function m(P){let D=[],N=[],V=[];for(let H=0;H<s;H++)D[H]=0,N[H]=0,V[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:V,object:P,attributes:{},index:null}}function f(P,D,N,V){let H=l.attributes,G=D.attributes,O=0,B=N.getAttributes();for(let K in B)if(B[K].location>=0){let st=H[K],ot=G[K];if(ot===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(ot=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(ot=P.instanceColor)),st===void 0||st.attribute!==ot||ot&&st.data!==ot.data)return!0;O++}return l.attributesNum!==O||l.index!==V}function y(P,D,N,V){let H={},G=D.attributes,O=0,B=N.getAttributes();for(let K in B)if(B[K].location>=0){let st=G[K];st===void 0&&(K==="instanceMatrix"&&P.instanceMatrix&&(st=P.instanceMatrix),K==="instanceColor"&&P.instanceColor&&(st=P.instanceColor));let ot={};ot.attribute=st,st&&st.data&&(ot.data=st.data),H[K]=ot,O++}l.attributes=H,l.attributesNum=O,l.index=V}function _(){let P=l.newAttributes;for(let D=0,N=P.length;D<N;D++)P[D]=0}function M(P){E(P,0)}function E(P,D){let N=l.newAttributes,V=l.enabledAttributes,H=l.attributeDivisors;N[P]=1,V[P]===0&&(n.enableVertexAttribArray(P),V[P]=1),H[P]!==D&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,D),H[P]=D)}function S(){let P=l.newAttributes,D=l.enabledAttributes;for(let N=0,V=D.length;N<V;N++)D[N]!==P[N]&&(n.disableVertexAttribArray(N),D[N]=0)}function w(P,D,N,V,H,G,O){O===!0?n.vertexAttribIPointer(P,D,N,H,G):n.vertexAttribPointer(P,D,N,V,H,G)}function R(P,D,N,V){if(i.isWebGL2===!1&&(P.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;_();let H=V.attributes,G=N.getAttributes(),O=D.defaultAttributeValues;for(let B in G){let K=G[B];if(K.location>=0){let Y=H[B];if(Y===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){let st=Y.normalized,ot=Y.itemSize,Q=e.get(Y);if(Q===void 0)continue;let ht=Q.buffer,ct=Q.type,at=Q.bytesPerElement,mt=i.isWebGL2===!0&&(ct===n.INT||ct===n.UNSIGNED_INT||Y.gpuType===ad);if(Y.isInterleavedBufferAttribute){let St=Y.data,F=St.stride,vt=Y.offset;if(St.isInstancedInterleavedBuffer){for(let j=0;j<K.locationSize;j++)E(K.location+j,St.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=St.meshPerAttribute*St.count)}else for(let j=0;j<K.locationSize;j++)M(K.location+j);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let j=0;j<K.locationSize;j++)w(K.location+j,ot/K.locationSize,ct,st,F*at,(vt+ot/K.locationSize*j)*at,mt)}else{if(Y.isInstancedBufferAttribute){for(let St=0;St<K.locationSize;St++)E(K.location+St,Y.meshPerAttribute);P.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let St=0;St<K.locationSize;St++)M(K.location+St);n.bindBuffer(n.ARRAY_BUFFER,ht);for(let St=0;St<K.locationSize;St++)w(K.location+St,ot/K.locationSize,ct,st,ot*at,ot/K.locationSize*St*at,mt)}}else if(O!==void 0){let st=O[B];if(st!==void 0)switch(st.length){case 2:n.vertexAttrib2fv(K.location,st);break;case 3:n.vertexAttrib3fv(K.location,st);break;case 4:n.vertexAttrib4fv(K.location,st);break;default:n.vertexAttrib1fv(K.location,st)}}}}S()}function b(){I();for(let P in a){let D=a[P];for(let N in D){let V=D[N];for(let H in V)x(V[H].object),delete V[H];delete D[N]}delete a[P]}}function v(P){if(a[P.id]===void 0)return;let D=a[P.id];for(let N in D){let V=D[N];for(let H in V)x(V[H].object),delete V[H];delete D[N]}delete a[P.id]}function A(P){for(let D in a){let N=a[D];if(N[P.id]===void 0)continue;let V=N[P.id];for(let H in V)x(V[H].object),delete V[H];delete N[P.id]}}function I(){z(),h=!0,l!==c&&(l=c,p(l.object))}function z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:I,resetDefaultState:z,dispose:b,releaseStatesOfGeometry:v,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:M,disableUnusedAttributes:S}}function Yy(n,t,e,i){let s=i.isWebGL2,r;function o(h){r=h}function a(h,u){n.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,d){if(d===0)return;let p,x;if(s)p=n,x="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](r,h,u,d),e.update(u,r,d)}function l(h,u,d){if(d===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<d;x++)this.render(h[x],u[x]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,d);let x=0;for(let g=0;g<d;g++)x+=u[g];e.update(x,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function $y(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),d=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),f=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),_=d>0,M=o||t.has("OES_texture_float"),E=_&&M,S=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:p,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:m,maxVaryings:f,maxFragmentUniforms:y,vertexTextures:_,floatFragmentTextures:M,floatVertexTextures:E,maxSamples:S}}function Zy(n){let t=this,e=null,i=0,s=!1,r=!1,o=new ei,a=new re,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||i!==0||s;return s=d,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,p){let x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,f=n.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{let y=r?0:i,_=y*4,M=f.clippingState||null;c.value=M,M=h(x,d,_,p);for(let E=0;E!==_;++E)M[E]=e[E];f.clippingState=M,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,p,x){let g=u!==null?u.length:0,m=null;if(g!==0){if(m=c.value,x!==!0||m===null){let f=p+g*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,M=p;_!==g;++_,M+=4)o.copy(u[_]).applyMatrix4(y,a),o.normal.toArray(m,M),m[M+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function Jy(n){let t=new WeakMap;function e(o,a){return a===vl?o.mapping=$s:a===Ml&&(o.mapping=Zs),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===vl||a===Ml)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Cl(c.height/2);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var Qs=class extends ba{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Hs=4,Ef=[.125,.215,.35,.446,.526,.582],Zi=20,cl=new Qs,Sf=new yt,ll=null,hl=0,ul=0,Yi=(1+Math.sqrt(5))/2,Os=1/Yi,wf=[new k(1,1,1),new k(-1,1,1),new k(1,1,-1),new k(-1,1,-1),new k(0,Yi,Os),new k(0,Yi,-Os),new k(Os,0,Yi),new k(-Os,0,Yi),new k(Yi,Os,0),new k(-Yi,Os,0)],Sa=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){ll=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Rf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Af(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ll,hl,ul),t.scissorTest=!1,ea(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===$s||t.mapping===Zs?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ll=this._renderer.getRenderTarget(),hl=this._renderer.getActiveCubeFace(),ul=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Br,format:Hn,colorSpace:ii,depthBuffer:!1},s=Tf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Tf(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Ky(r)),this._blurMaterial=jy(r,t,e)}return s}_compileMaterial(t){let e=new Vt(this._lodPlanes[0],t);this._renderer.compile(e,cl)}_sceneToCubeUV(t,e,i,s){let a=new _n(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Sf),h.toneMapping=Ei,h.autoClear=!1;let p=new en({name:"PMREM.Background",side:ln,depthWrite:!1,depthTest:!1}),x=new Vt(new on,p),g=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,g=!0):(p.color.copy(Sf),g=!0);for(let f=0;f<6;f++){let y=f%3;y===0?(a.up.set(0,c[f],0),a.lookAt(l[f],0,0)):y===1?(a.up.set(0,0,c[f]),a.lookAt(0,l[f],0)):(a.up.set(0,c[f],0),a.lookAt(0,0,l[f]));let _=this._cubeSize;ea(s,y*_,f>2?_:0,_,_),h.setRenderTarget(s),g&&h.render(x,a),h.render(t,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===$s||t.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Rf()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Af());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Vt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;ea(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,cl)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=wf[(s-1)%wf.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Vt(this._lodPlanes[s],l),d=l.uniforms,p=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*Zi-1),g=r/x,m=isFinite(r)?1+Math.floor(h*g):Zi;m>Zi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Zi}`);let f=[],y=0;for(let w=0;w<Zi;++w){let R=w/g,b=Math.exp(-R*R/2);f.push(b),w===0?y+=b:w<m&&(y+=2*b)}for(let w=0;w<f.length;w++)f[w]=f[w]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:_}=this;d.dTheta.value=x,d.mipInt.value=_-i;let M=this._sizeLods[s],E=3*M*(s>_-Hs?s-_+Hs:0),S=4*(this._cubeSize-M);ea(e,E,S,3*M,2*M),c.setRenderTarget(e),c.render(u,cl)}};function Ky(n){let t=[],e=[],i=[],s=n,r=n-Hs+1+Ef.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>n-Hs?c=Ef[o-n+Hs-1]:o===0&&(c=0),i.push(c);let l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,x=6,g=3,m=2,f=1,y=new Float32Array(g*x*p),_=new Float32Array(m*x*p),M=new Float32Array(f*x*p);for(let S=0;S<p;S++){let w=S%3*2/3-1,R=S>2?0:-1,b=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];y.set(b,g*x*S),_.set(d,m*x*S);let v=[S,S,S,S,S,S];M.set(v,f*x*S)}let E=new oe;E.setAttribute("position",new Ie(y,g)),E.setAttribute("uv",new Ie(_,m)),E.setAttribute("faceIndex",new Ie(M,f)),t.push(E),s>Hs&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function Tf(n,t,e){let i=new si(n,t,e);return i.texture.mapping=Fa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ea(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function jy(n,t,e){let i=new Float32Array(Zi),s=new k(0,1,0);return new oi({name:"SphericalGaussianBlur",defines:{n:Zi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Af(){return new oi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function Rf(){return new oi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:_h(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function _h(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Qy(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===vl||c===Ml,h=c===$s||c===Zs;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Sa(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Sa(n));let d=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function tv(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function ev(n,t,e,i){let s={},r=new WeakMap;function o(u){let d=u.target;d.index!==null&&t.remove(d.index);for(let x in d.attributes)t.remove(d.attributes[x]);for(let x in d.morphAttributes){let g=d.morphAttributes[x];for(let m=0,f=g.length;m<f;m++)t.remove(g[m])}d.removeEventListener("dispose",o),delete s[d.id];let p=r.get(d);p&&(t.remove(p),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return s[d.id]===!0||(d.addEventListener("dispose",o),s[d.id]=!0,e.memory.geometries++),d}function c(u){let d=u.attributes;for(let x in d)t.update(d[x],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let x in p){let g=p[x];for(let m=0,f=g.length;m<f;m++)t.update(g[m],n.ARRAY_BUFFER)}}function l(u){let d=[],p=u.index,x=u.attributes.position,g=0;if(p!==null){let y=p.array;g=p.version;for(let _=0,M=y.length;_<M;_+=3){let E=y[_+0],S=y[_+1],w=y[_+2];d.push(E,S,S,w,w,E)}}else if(x!==void 0){let y=x.array;g=x.version;for(let _=0,M=y.length/3-1;_<M;_+=3){let E=_+0,S=_+1,w=_+2;d.push(E,S,S,w,w,E)}}else return;let m=new(xd(d)?Ma:va)(d,1);m.version=g;let f=r.get(u);f&&t.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function nv(n,t,e,i){let s=i.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,x){n.drawElements(r,x,a,p*c),e.update(x,r,1)}function u(p,x,g){if(g===0)return;let m,f;if(s)m=n,f="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),f="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[f](r,x,a,p*c,g),e.update(x,r,g)}function d(p,x,g){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<g;f++)this.render(p[f]/c,x[f]);else{m.multiDrawElementsWEBGL(r,x,0,a,p,0,g);let f=0;for(let y=0;y<g;y++)f+=x[y];e.update(f,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function iv(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function sv(n,t){return n[0]-t[0]}function rv(n,t){return Math.abs(t[1])-Math.abs(n[1])}function ov(n,t,e){let i={},s=new Float32Array(8),r=new WeakMap,o=new Xe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let d=l.morphTargetInfluences;if(t.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=p!==void 0?p.length:0,g=r.get(h);if(g===void 0||g.count!==x){let P=function(){I.dispose(),r.delete(h),h.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();let y=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],w=h.morphAttributes.color||[],R=0;y===!0&&(R=1),_===!0&&(R=2),M===!0&&(R=3);let b=h.attributes.position.count*R,v=1;b>t.maxTextureSize&&(v=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let A=new Float32Array(b*v*4*x),I=new _a(A,b,v,x);I.type=Mi,I.needsUpdate=!0;let z=R*4;for(let D=0;D<x;D++){let N=E[D],V=S[D],H=w[D],G=b*v*4*D;for(let O=0;O<N.count;O++){let B=O*z;y===!0&&(o.fromBufferAttribute(N,O),A[G+B+0]=o.x,A[G+B+1]=o.y,A[G+B+2]=o.z,A[G+B+3]=0),_===!0&&(o.fromBufferAttribute(V,O),A[G+B+4]=o.x,A[G+B+5]=o.y,A[G+B+6]=o.z,A[G+B+7]=0),M===!0&&(o.fromBufferAttribute(H,O),A[G+B+8]=o.x,A[G+B+9]=o.y,A[G+B+10]=o.z,A[G+B+11]=H.itemSize===4?o.w:1)}}g={count:x,texture:I,size:new At(b,v)},r.set(h,g),h.addEventListener("dispose",P)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];let f=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",f),u.getUniforms().setValue(n,"morphTargetInfluences",d),u.getUniforms().setValue(n,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{let p=d===void 0?0:d.length,x=i[h.id];if(x===void 0||x.length!==p){x=[];for(let _=0;_<p;_++)x[_]=[_,0];i[h.id]=x}for(let _=0;_<p;_++){let M=x[_];M[0]=_,M[1]=d[_]}x.sort(rv);for(let _=0;_<8;_++)_<p&&x[_][1]?(a[_][0]=x[_][0],a[_][1]=x[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(sv);let g=h.morphAttributes.position,m=h.morphAttributes.normal,f=0;for(let _=0;_<8;_++){let M=a[_],E=M[0],S=M[1];E!==Number.MAX_SAFE_INTEGER&&S?(g&&h.getAttribute("morphTarget"+_)!==g[E]&&h.setAttribute("morphTarget"+_,g[E]),m&&h.getAttribute("morphNormal"+_)!==m[E]&&h.setAttribute("morphNormal"+_,m[E]),s[_]=S,f+=S):(g&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),s[_]=0)}let y=h.morphTargetsRelative?1:1-f;u.getUniforms().setValue(n,"morphTargetBaseInfluence",y),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function av(n,t,e,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var wa=class extends Rn{constructor(t,e,i,s,r,o,a,c,l,h){if(h=h!==void 0?h:Ki,h!==Ki&&h!==Js)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===Ki&&(i=vi),i===void 0&&h===Js&&(i=Ji),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:$e,this.minFilter=c!==void 0?c:$e,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Md=new Rn,bd=new wa(1,1);bd.compareFunction=gd;var Ed=new _a,Sd=new Al,wd=new Ea,Cf=[],Pf=[],If=new Float32Array(16),Lf=new Float32Array(9),Df=new Float32Array(4);function er(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Cf[s];if(r===void 0&&(r=new Float32Array(s),Cf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Fe(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Be(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ka(n,t){let e=Pf[t];e===void 0&&(e=new Int32Array(t),Pf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function cv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function lv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2fv(this.addr,t),Be(e,t)}}function hv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Fe(e,t))return;n.uniform3fv(this.addr,t),Be(e,t)}}function uv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4fv(this.addr,t),Be(e,t)}}function fv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;Df.set(i),n.uniformMatrix2fv(this.addr,!1,Df),Be(e,i)}}function dv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;Lf.set(i),n.uniformMatrix3fv(this.addr,!1,Lf),Be(e,i)}}function pv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Fe(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Be(e,t)}else{if(Fe(e,i))return;If.set(i),n.uniformMatrix4fv(this.addr,!1,If),Be(e,i)}}function mv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function gv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2iv(this.addr,t),Be(e,t)}}function xv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;n.uniform3iv(this.addr,t),Be(e,t)}}function _v(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4iv(this.addr,t),Be(e,t)}}function yv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function vv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Fe(e,t))return;n.uniform2uiv(this.addr,t),Be(e,t)}}function Mv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Fe(e,t))return;n.uniform3uiv(this.addr,t),Be(e,t)}}function bv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Fe(e,t))return;n.uniform4uiv(this.addr,t),Be(e,t)}}function Ev(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?bd:Md;e.setTexture2D(t||r,s)}function Sv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Sd,s)}function wv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||wd,s)}function Tv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Ed,s)}function Av(n){switch(n){case 5126:return cv;case 35664:return lv;case 35665:return hv;case 35666:return uv;case 35674:return fv;case 35675:return dv;case 35676:return pv;case 5124:case 35670:return mv;case 35667:case 35671:return gv;case 35668:case 35672:return xv;case 35669:case 35673:return _v;case 5125:return yv;case 36294:return vv;case 36295:return Mv;case 36296:return bv;case 35678:case 36198:case 36298:case 36306:case 35682:return Ev;case 35679:case 36299:case 36307:return Sv;case 35680:case 36300:case 36308:case 36293:return wv;case 36289:case 36303:case 36311:case 36292:return Tv}}function Rv(n,t){n.uniform1fv(this.addr,t)}function Cv(n,t){let e=er(t,this.size,2);n.uniform2fv(this.addr,e)}function Pv(n,t){let e=er(t,this.size,3);n.uniform3fv(this.addr,e)}function Iv(n,t){let e=er(t,this.size,4);n.uniform4fv(this.addr,e)}function Lv(n,t){let e=er(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function Dv(n,t){let e=er(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Uv(n,t){let e=er(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Nv(n,t){n.uniform1iv(this.addr,t)}function zv(n,t){n.uniform2iv(this.addr,t)}function Ov(n,t){n.uniform3iv(this.addr,t)}function Fv(n,t){n.uniform4iv(this.addr,t)}function Bv(n,t){n.uniform1uiv(this.addr,t)}function kv(n,t){n.uniform2uiv(this.addr,t)}function Hv(n,t){n.uniform3uiv(this.addr,t)}function Gv(n,t){n.uniform4uiv(this.addr,t)}function Vv(n,t,e){let i=this.cache,s=t.length,r=ka(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Md,r[o])}function Wv(n,t,e){let i=this.cache,s=t.length,r=ka(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Sd,r[o])}function Xv(n,t,e){let i=this.cache,s=t.length,r=ka(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||wd,r[o])}function qv(n,t,e){let i=this.cache,s=t.length,r=ka(e,s);Fe(i,r)||(n.uniform1iv(this.addr,r),Be(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Ed,r[o])}function Yv(n){switch(n){case 5126:return Rv;case 35664:return Cv;case 35665:return Pv;case 35666:return Iv;case 35674:return Lv;case 35675:return Dv;case 35676:return Uv;case 5124:case 35670:return Nv;case 35667:case 35671:return zv;case 35668:case 35672:return Ov;case 35669:case 35673:return Fv;case 5125:return Bv;case 36294:return kv;case 36295:return Hv;case 36296:return Gv;case 35678:case 36198:case 36298:case 36306:case 35682:return Vv;case 35679:case 36299:case 36307:return Wv;case 35680:case 36300:case 36308:case 36293:return Xv;case 36289:case 36303:case 36311:case 36292:return qv}}var Pl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Av(e.type)}},Il=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Yv(e.type)}},Ll=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},fl=/(\w+)(\])?(\[|\.)?/g;function Uf(n,t){n.seq.push(t),n.map[t.id]=t}function $v(n,t,e){let i=n.name,s=i.length;for(fl.lastIndex=0;;){let r=fl.exec(i),o=fl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){Uf(e,l===void 0?new Pl(a,n,t):new Il(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new Ll(a),Uf(e,u)),e=u}}}var qs=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);$v(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function Nf(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Zv=37297,Jv=0;function Kv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function jv(n){let t=fe.getPrimaries(fe.workingColorSpace),e=fe.getPrimaries(n),i;switch(t===e?i="":t===fa&&e===ua?i="LinearDisplayP3ToLinearSRGB":t===ua&&e===fa&&(i="LinearSRGBToLinearDisplayP3"),n){case ii:case Ba:return[i,"LinearTransferOETF"];case Ze:case gh:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function zf(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+Kv(n.getShaderSource(t),o)}else return s}function Qv(n,t){let e=jv(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function t1(n,t){let e;switch(t){case o0:e="Linear";break;case a0:e="Reinhard";break;case c0:e="OptimizedCineon";break;case ph:e="ACESFilmic";break;case h0:e="AgX";break;case l0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function e1(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Gs).join(`
`)}function n1(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Gs).join(`
`)}function i1(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function s1(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function Gs(n){return n!==""}function Of(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ff(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var r1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Dl(n){return n.replace(r1,a1)}var o1=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function a1(n,t){let e=ie[t];if(e===void 0){let i=o1.get(t);if(i!==void 0)e=ie[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Dl(e)}var c1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Bf(n){return n.replace(c1,l1)}function l1(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function kf(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function h1(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===sd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===fh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ti&&(t="SHADOWMAP_TYPE_VSM"),t}function u1(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case $s:case Zs:t="ENVMAP_TYPE_CUBE";break;case Fa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function f1(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case Zs:t="ENVMAP_MODE_REFRACTION";break}return t}function d1(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case rd:t="ENVMAP_BLENDING_MULTIPLY";break;case s0:t="ENVMAP_BLENDING_MIX";break;case r0:t="ENVMAP_BLENDING_ADD";break}return t}function p1(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function m1(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=h1(e),l=u1(e),h=f1(e),u=d1(e),d=p1(e),p=e.isWebGL2?"":e1(e),x=n1(e),g=i1(r),m=s.createProgram(),f,y,_=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gs).join(`
`),f.length>0&&(f+=`
`),y=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Gs).join(`
`),y.length>0&&(y+=`
`)):(f=[kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Gs).join(`
`),y=[p,kf(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Ei?"#define TONE_MAPPING":"",e.toneMapping!==Ei?ie.tonemapping_pars_fragment:"",e.toneMapping!==Ei?t1("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",ie.colorspace_pars_fragment,Qv("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Gs).join(`
`)),o=Dl(o),o=Of(o,e),o=Ff(o,e),a=Dl(a),a=Of(a,e),a=Ff(a,e),o=Bf(o),a=Bf(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,f=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+f,y=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===rf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===rf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+y);let M=_+f+o,E=_+y+a,S=Nf(s,s.VERTEX_SHADER,M),w=Nf(s,s.FRAGMENT_SHADER,E);s.attachShader(m,S),s.attachShader(m,w),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function R(I){if(n.debug.checkShaderErrors){let z=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(S).trim(),D=s.getShaderInfoLog(w).trim(),N=!0,V=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,S,w);else{let H=zf(s,S,"vertex"),G=zf(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+H+`
`+G)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(P===""||D==="")&&(V=!1);V&&(I.diagnostics={runnable:N,programLog:z,vertexShader:{log:P,prefix:f},fragmentShader:{log:D,prefix:y}})}s.deleteShader(S),s.deleteShader(w),b=new qs(s,m),v=s1(s,m)}let b;this.getUniforms=function(){return b===void 0&&R(this),b};let v;this.getAttributes=function(){return v===void 0&&R(this),v};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(m,Zv)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Jv++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=w,this}var g1=0,Ul=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Nl(t),e.set(t,i)),i}},Nl=class{constructor(t){this.id=g1++,this.code=t,this.usedTimes=0}};function x1(n,t,e,i,s,r,o){let a=new Gr,c=new Ul,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return b===0?"uv":`uv${b}`}function m(b,v,A,I,z){let P=I.fog,D=z.geometry,N=b.isMeshStandardMaterial?I.environment:null,V=(b.isMeshStandardMaterial?e:t).get(b.envMap||N),H=V&&V.mapping===Fa?V.image.height:null,G=x[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let O=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,B=O!==void 0?O.length:0,K=0;D.morphAttributes.position!==void 0&&(K=1),D.morphAttributes.normal!==void 0&&(K=2),D.morphAttributes.color!==void 0&&(K=3);let Y,st,ot,Q;if(G){let Le=Yn[G];Y=Le.vertexShader,st=Le.fragmentShader}else Y=b.vertexShader,st=b.fragmentShader,c.update(b),ot=c.getVertexShaderID(b),Q=c.getFragmentShaderID(b);let ht=n.getRenderTarget(),ct=z.isInstancedMesh===!0,at=z.isBatchedMesh===!0,mt=!!b.map,St=!!b.matcap,F=!!V,vt=!!b.aoMap,j=!!b.lightMap,tt=!!b.bumpMap,nt=!!b.normalMap,Mt=!!b.displacementMap,et=!!b.emissiveMap,L=!!b.metalnessMap,C=!!b.roughnessMap,Z=b.anisotropy>0,gt=b.clearcoat>0,pt=b.iridescence>0,xt=b.sheen>0,Nt=b.transmission>0,Pt=Z&&!!b.anisotropyMap,Ot=gt&&!!b.clearcoatMap,Wt=gt&&!!b.clearcoatNormalMap,te=gt&&!!b.clearcoatRoughnessMap,bt=pt&&!!b.iridescenceMap,ae=pt&&!!b.iridescenceThicknessMap,ee=xt&&!!b.sheenColorMap,$t=xt&&!!b.sheenRoughnessMap,Ht=!!b.specularMap,Bt=!!b.specularColorMap,Xt=!!b.specularIntensityMap,se=Nt&&!!b.transmissionMap,pe=Nt&&!!b.thicknessMap,ne=!!b.gradientMap,wt=!!b.alphaMap,$=b.alphaTest>0,Rt=!!b.alphaHash,Ut=!!b.extensions,Qt=!!D.attributes.uv1,Kt=!!D.attributes.uv2,le=!!D.attributes.uv3,he=Ei;return b.toneMapped&&(ht===null||ht.isXRRenderTarget===!0)&&(he=n.toneMapping),{isWebGL2:h,shaderID:G,shaderType:b.type,shaderName:b.name,vertexShader:Y,fragmentShader:st,defines:b.defines,customVertexShaderID:ot,customFragmentShaderID:Q,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:at,instancing:ct,instancingColor:ct&&z.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:ht===null?n.outputColorSpace:ht.isXRRenderTarget===!0?ht.texture.colorSpace:ii,map:mt,matcap:St,envMap:F,envMapMode:F&&V.mapping,envMapCubeUVHeight:H,aoMap:vt,lightMap:j,bumpMap:tt,normalMap:nt,displacementMap:d&&Mt,emissiveMap:et,normalMapObjectSpace:nt&&b.normalMapType===b0,normalMapTangentSpace:nt&&b.normalMapType===md,metalnessMap:L,roughnessMap:C,anisotropy:Z,anisotropyMap:Pt,clearcoat:gt,clearcoatMap:Ot,clearcoatNormalMap:Wt,clearcoatRoughnessMap:te,iridescence:pt,iridescenceMap:bt,iridescenceThicknessMap:ae,sheen:xt,sheenColorMap:ee,sheenRoughnessMap:$t,specularMap:Ht,specularColorMap:Bt,specularIntensityMap:Xt,transmission:Nt,transmissionMap:se,thicknessMap:pe,gradientMap:ne,opaque:b.transparent===!1&&b.blending===Ws,alphaMap:wt,alphaTest:$,alphaHash:Rt,combine:b.combine,mapUv:mt&&g(b.map.channel),aoMapUv:vt&&g(b.aoMap.channel),lightMapUv:j&&g(b.lightMap.channel),bumpMapUv:tt&&g(b.bumpMap.channel),normalMapUv:nt&&g(b.normalMap.channel),displacementMapUv:Mt&&g(b.displacementMap.channel),emissiveMapUv:et&&g(b.emissiveMap.channel),metalnessMapUv:L&&g(b.metalnessMap.channel),roughnessMapUv:C&&g(b.roughnessMap.channel),anisotropyMapUv:Pt&&g(b.anisotropyMap.channel),clearcoatMapUv:Ot&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:Wt&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:te&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:bt&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:ee&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:$t&&g(b.sheenRoughnessMap.channel),specularMapUv:Ht&&g(b.specularMap.channel),specularColorMapUv:Bt&&g(b.specularColorMap.channel),specularIntensityMapUv:Xt&&g(b.specularIntensityMap.channel),transmissionMapUv:se&&g(b.transmissionMap.channel),thicknessMapUv:pe&&g(b.thicknessMap.channel),alphaMapUv:wt&&g(b.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(nt||Z),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:Qt,vertexUv2s:Kt,vertexUv3s:le,pointsUvs:z.isPoints===!0&&!!D.attributes.uv&&(mt||wt),fog:!!P,useFog:b.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:K,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:he,useLegacyLights:n._useLegacyLights,decodeVideoTexture:mt&&b.map.isVideoTexture===!0&&fe.getTransfer(b.map.colorSpace)===_e,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===ze,flipSided:b.side===ln,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:Ut&&b.extensions.derivatives===!0,extensionFragDepth:Ut&&b.extensions.fragDepth===!0,extensionDrawBuffers:Ut&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ut&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ut&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function f(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let A in b.defines)v.push(A),v.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(y(v,b),_(v,b),v.push(n.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function y(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function _(b,v){a.disableAll(),v.isWebGL2&&a.enable(0),v.supportsVertexTextures&&a.enable(1),v.instancing&&a.enable(2),v.instancingColor&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.skinning&&a.enable(4),v.morphTargets&&a.enable(5),v.morphNormals&&a.enable(6),v.morphColors&&a.enable(7),v.premultipliedAlpha&&a.enable(8),v.shadowMapEnabled&&a.enable(9),v.useLegacyLights&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function M(b){let v=x[b.type],A;if(v){let I=Yn[v];A=ox.clone(I.uniforms)}else A=b.uniforms;return A}function E(b,v){let A;for(let I=0,z=l.length;I<z;I++){let P=l[I];if(P.cacheKey===v){A=P,++A.usedTimes;break}}return A===void 0&&(A=new m1(n,v,b,r),l.push(A)),A}function S(b){if(--b.usedTimes===0){let v=l.indexOf(b);l[v]=l[l.length-1],l.pop(),b.destroy()}}function w(b){c.remove(b)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:M,acquireProgram:E,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:R}}function _1(){let n=new WeakMap;function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function e(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function y1(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function Hf(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function Gf(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,d,p,x,g,m){let f=n[t];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},n[t]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=x,f.renderOrder=u.renderOrder,f.z=g,f.group=m),t++,f}function a(u,d,p,x,g,m){let f=o(u,d,p,x,g,m);p.transmission>0?i.push(f):p.transparent===!0?s.push(f):e.push(f)}function c(u,d,p,x,g,m){let f=o(u,d,p,x,g,m);p.transmission>0?i.unshift(f):p.transparent===!0?s.unshift(f):e.unshift(f)}function l(u,d){e.length>1&&e.sort(u||y1),i.length>1&&i.sort(d||Hf),s.length>1&&s.sort(d||Hf)}function h(){for(let u=t,d=n.length;u<d;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function v1(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new Gf,n.set(i,[o])):s>=r.length?(o=new Gf,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function M1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new yt};break;case"SpotLight":e={position:new k,direction:new k,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function b1(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new At,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var E1=0;function S1(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function w1(n,t){let e=new M1,i=b1(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new k);let r=new k,o=new me,a=new me;function c(h,u){let d=0,p=0,x=0;for(let I=0;I<9;I++)s.probe[I].set(0,0,0);let g=0,m=0,f=0,y=0,_=0,M=0,E=0,S=0,w=0,R=0,b=0;h.sort(S1);let v=u===!0?Math.PI:1;for(let I=0,z=h.length;I<z;I++){let P=h[I],D=P.color,N=P.intensity,V=P.distance,H=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)d+=D.r*N*v,p+=D.g*N*v,x+=D.b*N*v;else if(P.isLightProbe){for(let G=0;G<9;G++)s.probe[G].addScaledVector(P.sh.coefficients[G],N);b++}else if(P.isDirectionalLight){let G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*v),P.castShadow){let O=P.shadow,B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,s.directionalShadow[g]=B,s.directionalShadowMap[g]=H,s.directionalShadowMatrix[g]=P.shadow.matrix,M++}s.directional[g]=G,g++}else if(P.isSpotLight){let G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(D).multiplyScalar(N*v),G.distance=V,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,s.spot[f]=G;let O=P.shadow;if(P.map&&(s.spotLightMap[w]=P.map,w++,O.updateMatrices(P),P.castShadow&&R++),s.spotLightMatrix[f]=O.matrix,P.castShadow){let B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,s.spotShadow[f]=B,s.spotShadowMap[f]=H,S++}f++}else if(P.isRectAreaLight){let G=e.get(P);G.color.copy(D).multiplyScalar(N),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),s.rectArea[y]=G,y++}else if(P.isPointLight){let G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*v),G.distance=P.distance,G.decay=P.decay,P.castShadow){let O=P.shadow,B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,B.shadowCameraNear=O.camera.near,B.shadowCameraFar=O.camera.far,s.pointShadow[m]=B,s.pointShadowMap[m]=H,s.pointShadowMatrix[m]=P.shadow.matrix,E++}s.point[m]=G,m++}else if(P.isHemisphereLight){let G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(N*v),G.groundColor.copy(P.groundColor).multiplyScalar(N*v),s.hemi[_]=G,_++}}y>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=It.LTC_FLOAT_1,s.rectAreaLTC2=It.LTC_FLOAT_2):(s.rectAreaLTC1=It.LTC_HALF_1,s.rectAreaLTC2=It.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=It.LTC_FLOAT_1,s.rectAreaLTC2=It.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=It.LTC_HALF_1,s.rectAreaLTC2=It.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=d,s.ambient[1]=p,s.ambient[2]=x;let A=s.hash;(A.directionalLength!==g||A.pointLength!==m||A.spotLength!==f||A.rectAreaLength!==y||A.hemiLength!==_||A.numDirectionalShadows!==M||A.numPointShadows!==E||A.numSpotShadows!==S||A.numSpotMaps!==w||A.numLightProbes!==b)&&(s.directional.length=g,s.spot.length=f,s.rectArea.length=y,s.point.length=m,s.hemi.length=_,s.directionalShadow.length=M,s.directionalShadowMap.length=M,s.pointShadow.length=E,s.pointShadowMap.length=E,s.spotShadow.length=S,s.spotShadowMap.length=S,s.directionalShadowMatrix.length=M,s.pointShadowMatrix.length=E,s.spotLightMatrix.length=S+w-R,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=R,s.numLightProbes=b,A.directionalLength=g,A.pointLength=m,A.spotLength=f,A.rectAreaLength=y,A.hemiLength=_,A.numDirectionalShadows=M,A.numPointShadows=E,A.numSpotShadows=S,A.numSpotMaps=w,A.numLightProbes=b,s.version=E1++)}function l(h,u){let d=0,p=0,x=0,g=0,m=0,f=u.matrixWorldInverse;for(let y=0,_=h.length;y<_;y++){let M=h[y];if(M.isDirectionalLight){let E=s.directional[d];E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(f),d++}else if(M.isSpotLight){let E=s.spot[x];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),E.direction.setFromMatrixPosition(M.matrixWorld),r.setFromMatrixPosition(M.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(f),x++}else if(M.isRectAreaLight){let E=s.rectArea[g];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),a.identity(),o.copy(M.matrixWorld),o.premultiply(f),a.extractRotation(o),E.halfWidth.set(M.width*.5,0,0),E.halfHeight.set(0,M.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(M.isPointLight){let E=s.point[p];E.position.setFromMatrixPosition(M.matrixWorld),E.position.applyMatrix4(f),p++}else if(M.isHemisphereLight){let E=s.hemi[m];E.direction.setFromMatrixPosition(M.matrixWorld),E.direction.transformDirection(f),m++}}}return{setup:c,setupView:l,state:s}}function Vf(n,t){let e=new w1(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function o(u){i.push(u)}function a(u){s.push(u)}function c(u){e.setup(i,u)}function l(u){e.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function T1(n,t){let e=new WeakMap;function i(r,o=0){let a=e.get(r),c;return a===void 0?(c=new Vf(n,t),e.set(r,[c])):o>=a.length?(c=new Vf(n,t),a.push(c)):c=a[o],c}function s(){e=new WeakMap}return{get:i,dispose:s}}var zl=class extends Ci{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=v0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Ol=class extends Ci{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},A1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,R1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function C1(n,t,e){let i=new Vr,s=new At,r=new At,o=new Xe,a=new zl({depthPacking:M0}),c=new Ol,l={},h=e.maxTextureSize,u={[wi]:ln,[ln]:wi,[ze]:ze},d=new oi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new At},radius:{value:4}},vertexShader:A1,fragmentShader:R1}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let x=new oe;x.setAttribute("position",new Ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Vt(x,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sd;let f=this.type;this.render=function(S,w,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let b=n.getRenderTarget(),v=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),I=n.state;I.setBlending(bi),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let z=f!==ti&&this.type===ti,P=f===ti&&this.type!==ti;for(let D=0,N=S.length;D<N;D++){let V=S[D],H=V.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;s.copy(H.mapSize);let G=H.getFrameExtents();if(s.multiply(G),r.copy(H.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/G.x),s.x=r.x*G.x,H.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/G.y),s.y=r.y*G.y,H.mapSize.y=r.y)),H.map===null||z===!0||P===!0){let B=this.type!==ti?{minFilter:$e,magFilter:$e}:{};H.map!==null&&H.map.dispose(),H.map=new si(s.x,s.y,B),H.map.texture.name=V.name+".shadowMap",H.camera.updateProjectionMatrix()}n.setRenderTarget(H.map),n.clear();let O=H.getViewportCount();for(let B=0;B<O;B++){let K=H.getViewport(B);o.set(r.x*K.x,r.y*K.y,r.x*K.z,r.y*K.w),I.viewport(o),H.updateMatrices(V,B),i=H.getFrustum(),M(w,R,H.camera,V,this.type)}H.isPointLightShadow!==!0&&this.type===ti&&y(H,R),H.needsUpdate=!1}f=this.type,m.needsUpdate=!1,n.setRenderTarget(b,v,A)};function y(S,w){let R=t.update(g);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new si(s.x,s.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,R,d,g,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,R,p,g,null)}function _(S,w,R,b){let v=null,A=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(A!==void 0)v=A;else if(v=R.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let I=v.uuid,z=w.uuid,P=l[I];P===void 0&&(P={},l[I]=P);let D=P[z];D===void 0&&(D=v.clone(),P[z]=D,w.addEventListener("dispose",E)),v=D}if(v.visible=w.visible,v.wireframe=w.wireframe,b===ti?v.side=w.shadowSide!==null?w.shadowSide:w.side:v.side=w.shadowSide!==null?w.shadowSide:u[w.side],v.alphaMap=w.alphaMap,v.alphaTest=w.alphaTest,v.map=w.map,v.clipShadows=w.clipShadows,v.clippingPlanes=w.clippingPlanes,v.clipIntersection=w.clipIntersection,v.displacementMap=w.displacementMap,v.displacementScale=w.displacementScale,v.displacementBias=w.displacementBias,v.wireframeLinewidth=w.wireframeLinewidth,v.linewidth=w.linewidth,R.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let I=n.properties.get(v);I.light=R}return v}function M(S,w,R,b,v){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&v===ti)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);let z=t.update(S),P=S.material;if(Array.isArray(P)){let D=z.groups;for(let N=0,V=D.length;N<V;N++){let H=D[N],G=P[H.materialIndex];if(G&&G.visible){let O=_(S,G,b,v);S.onBeforeShadow(n,S,w,R,z,O,H),n.renderBufferDirect(R,null,z,O,S,H),S.onAfterShadow(n,S,w,R,z,O,H)}}}else if(P.visible){let D=_(S,P,b,v);S.onBeforeShadow(n,S,w,R,z,D,null),n.renderBufferDirect(R,null,z,D,S,null),S.onAfterShadow(n,S,w,R,z,D,null)}}let I=S.children;for(let z=0,P=I.length;z<P;z++)M(I[z],w,R,b,v)}function E(S){S.target.removeEventListener("dispose",E);for(let R in l){let b=l[R],v=S.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}function P1(n,t,e){let i=e.isWebGL2;function s(){let $=!1,Rt=new Xe,Ut=null,Qt=new Xe(0,0,0,0);return{setMask:function(Kt){Ut!==Kt&&!$&&(n.colorMask(Kt,Kt,Kt,Kt),Ut=Kt)},setLocked:function(Kt){$=Kt},setClear:function(Kt,le,he,we,Le){Le===!0&&(Kt*=we,le*=we,he*=we),Rt.set(Kt,le,he,we),Qt.equals(Rt)===!1&&(n.clearColor(Kt,le,he,we),Qt.copy(Rt))},reset:function(){$=!1,Ut=null,Qt.set(-1,0,0,0)}}}function r(){let $=!1,Rt=null,Ut=null,Qt=null;return{setTest:function(Kt){Kt?at(n.DEPTH_TEST):mt(n.DEPTH_TEST)},setMask:function(Kt){Rt!==Kt&&!$&&(n.depthMask(Kt),Rt=Kt)},setFunc:function(Kt){if(Ut!==Kt){switch(Kt){case jg:n.depthFunc(n.NEVER);break;case Qg:n.depthFunc(n.ALWAYS);break;case t0:n.depthFunc(n.LESS);break;case Ys:n.depthFunc(n.LEQUAL);break;case e0:n.depthFunc(n.EQUAL);break;case n0:n.depthFunc(n.GEQUAL);break;case dh:n.depthFunc(n.GREATER);break;case i0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ut=Kt}},setLocked:function(Kt){$=Kt},setClear:function(Kt){Qt!==Kt&&(n.clearDepth(Kt),Qt=Kt)},reset:function(){$=!1,Rt=null,Ut=null,Qt=null}}}function o(){let $=!1,Rt=null,Ut=null,Qt=null,Kt=null,le=null,he=null,we=null,Le=null;return{setTest:function(ue){$||(ue?at(n.STENCIL_TEST):mt(n.STENCIL_TEST))},setMask:function(ue){Rt!==ue&&!$&&(n.stencilMask(ue),Rt=ue)},setFunc:function(ue,De,Ge){(Ut!==ue||Qt!==De||Kt!==Ge)&&(n.stencilFunc(ue,De,Ge),Ut=ue,Qt=De,Kt=Ge)},setOp:function(ue,De,Ge){(le!==ue||he!==De||we!==Ge)&&(n.stencilOp(ue,De,Ge),le=ue,he=De,we=Ge)},setLocked:function(ue){$=ue},setClear:function(ue){Le!==ue&&(n.clearStencil(ue),Le=ue)},reset:function(){$=!1,Rt=null,Ut=null,Qt=null,Kt=null,le=null,he=null,we=null,Le=null}}}let a=new s,c=new r,l=new o,h=new WeakMap,u=new WeakMap,d={},p={},x=new WeakMap,g=[],m=null,f=!1,y=null,_=null,M=null,E=null,S=null,w=null,R=null,b=new yt(0,0,0),v=0,A=!1,I=null,z=null,P=null,D=null,N=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),H=!1,G=0,O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(O)[1]),H=G>=1):O.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),H=G>=2);let B=null,K={},Y=n.getParameter(n.SCISSOR_BOX),st=n.getParameter(n.VIEWPORT),ot=new Xe().fromArray(Y),Q=new Xe().fromArray(st);function ht($,Rt,Ut,Qt){let Kt=new Uint8Array(4),le=n.createTexture();n.bindTexture($,le),n.texParameteri($,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri($,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let he=0;he<Ut;he++)i&&($===n.TEXTURE_3D||$===n.TEXTURE_2D_ARRAY)?n.texImage3D(Rt,0,n.RGBA,1,1,Qt,0,n.RGBA,n.UNSIGNED_BYTE,Kt):n.texImage2D(Rt+he,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Kt);return le}let ct={};ct[n.TEXTURE_2D]=ht(n.TEXTURE_2D,n.TEXTURE_2D,1),ct[n.TEXTURE_CUBE_MAP]=ht(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(ct[n.TEXTURE_2D_ARRAY]=ht(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ct[n.TEXTURE_3D]=ht(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),at(n.DEPTH_TEST),c.setFunc(Ys),et(!1),L(Mu),at(n.CULL_FACE),nt(bi);function at($){d[$]!==!0&&(n.enable($),d[$]=!0)}function mt($){d[$]!==!1&&(n.disable($),d[$]=!1)}function St($,Rt){return p[$]!==Rt?(n.bindFramebuffer($,Rt),p[$]=Rt,i&&($===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=Rt),$===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=Rt)),!0):!1}function F($,Rt){let Ut=g,Qt=!1;if($)if(Ut=x.get(Rt),Ut===void 0&&(Ut=[],x.set(Rt,Ut)),$.isWebGLMultipleRenderTargets){let Kt=$.texture;if(Ut.length!==Kt.length||Ut[0]!==n.COLOR_ATTACHMENT0){for(let le=0,he=Kt.length;le<he;le++)Ut[le]=n.COLOR_ATTACHMENT0+le;Ut.length=Kt.length,Qt=!0}}else Ut[0]!==n.COLOR_ATTACHMENT0&&(Ut[0]=n.COLOR_ATTACHMENT0,Qt=!0);else Ut[0]!==n.BACK&&(Ut[0]=n.BACK,Qt=!0);Qt&&(e.isWebGL2?n.drawBuffers(Ut):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ut))}function vt($){return m!==$?(n.useProgram($),m=$,!0):!1}let j={[$i]:n.FUNC_ADD,[Og]:n.FUNC_SUBTRACT,[Fg]:n.FUNC_REVERSE_SUBTRACT};if(i)j[wu]=n.MIN,j[Tu]=n.MAX;else{let $=t.get("EXT_blend_minmax");$!==null&&(j[wu]=$.MIN_EXT,j[Tu]=$.MAX_EXT)}let tt={[Bg]:n.ZERO,[kg]:n.ONE,[Hg]:n.SRC_COLOR,[_l]:n.SRC_ALPHA,[Yg]:n.SRC_ALPHA_SATURATE,[Xg]:n.DST_COLOR,[Vg]:n.DST_ALPHA,[Gg]:n.ONE_MINUS_SRC_COLOR,[yl]:n.ONE_MINUS_SRC_ALPHA,[qg]:n.ONE_MINUS_DST_COLOR,[Wg]:n.ONE_MINUS_DST_ALPHA,[$g]:n.CONSTANT_COLOR,[Zg]:n.ONE_MINUS_CONSTANT_COLOR,[Jg]:n.CONSTANT_ALPHA,[Kg]:n.ONE_MINUS_CONSTANT_ALPHA};function nt($,Rt,Ut,Qt,Kt,le,he,we,Le,ue){if($===bi){f===!0&&(mt(n.BLEND),f=!1);return}if(f===!1&&(at(n.BLEND),f=!0),$!==zg){if($!==y||ue!==A){if((_!==$i||S!==$i)&&(n.blendEquation(n.FUNC_ADD),_=$i,S=$i),ue)switch($){case Ws:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bu:n.blendFunc(n.ONE,n.ONE);break;case Eu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Su:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}else switch($){case Ws:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case bu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Eu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Su:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",$);break}M=null,E=null,w=null,R=null,b.set(0,0,0),v=0,y=$,A=ue}return}Kt=Kt||Rt,le=le||Ut,he=he||Qt,(Rt!==_||Kt!==S)&&(n.blendEquationSeparate(j[Rt],j[Kt]),_=Rt,S=Kt),(Ut!==M||Qt!==E||le!==w||he!==R)&&(n.blendFuncSeparate(tt[Ut],tt[Qt],tt[le],tt[he]),M=Ut,E=Qt,w=le,R=he),(we.equals(b)===!1||Le!==v)&&(n.blendColor(we.r,we.g,we.b,Le),b.copy(we),v=Le),y=$,A=!1}function Mt($,Rt){$.side===ze?mt(n.CULL_FACE):at(n.CULL_FACE);let Ut=$.side===ln;Rt&&(Ut=!Ut),et(Ut),$.blending===Ws&&$.transparent===!1?nt(bi):nt($.blending,$.blendEquation,$.blendSrc,$.blendDst,$.blendEquationAlpha,$.blendSrcAlpha,$.blendDstAlpha,$.blendColor,$.blendAlpha,$.premultipliedAlpha),c.setFunc($.depthFunc),c.setTest($.depthTest),c.setMask($.depthWrite),a.setMask($.colorWrite);let Qt=$.stencilWrite;l.setTest(Qt),Qt&&(l.setMask($.stencilWriteMask),l.setFunc($.stencilFunc,$.stencilRef,$.stencilFuncMask),l.setOp($.stencilFail,$.stencilZFail,$.stencilZPass)),Z($.polygonOffset,$.polygonOffsetFactor,$.polygonOffsetUnits),$.alphaToCoverage===!0?at(n.SAMPLE_ALPHA_TO_COVERAGE):mt(n.SAMPLE_ALPHA_TO_COVERAGE)}function et($){I!==$&&($?n.frontFace(n.CW):n.frontFace(n.CCW),I=$)}function L($){$!==Ug?(at(n.CULL_FACE),$!==z&&($===Mu?n.cullFace(n.BACK):$===Ng?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):mt(n.CULL_FACE),z=$}function C($){$!==P&&(H&&n.lineWidth($),P=$)}function Z($,Rt,Ut){$?(at(n.POLYGON_OFFSET_FILL),(D!==Rt||N!==Ut)&&(n.polygonOffset(Rt,Ut),D=Rt,N=Ut)):mt(n.POLYGON_OFFSET_FILL)}function gt($){$?at(n.SCISSOR_TEST):mt(n.SCISSOR_TEST)}function pt($){$===void 0&&($=n.TEXTURE0+V-1),B!==$&&(n.activeTexture($),B=$)}function xt($,Rt,Ut){Ut===void 0&&(B===null?Ut=n.TEXTURE0+V-1:Ut=B);let Qt=K[Ut];Qt===void 0&&(Qt={type:void 0,texture:void 0},K[Ut]=Qt),(Qt.type!==$||Qt.texture!==Rt)&&(B!==Ut&&(n.activeTexture(Ut),B=Ut),n.bindTexture($,Rt||ct[$]),Qt.type=$,Qt.texture=Rt)}function Nt(){let $=K[B];$!==void 0&&$.type!==void 0&&(n.bindTexture($.type,null),$.type=void 0,$.texture=void 0)}function Pt(){try{n.compressedTexImage2D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ot(){try{n.compressedTexImage3D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Wt(){try{n.texSubImage2D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function te(){try{n.texSubImage3D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function bt(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ae(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function ee(){try{n.texStorage2D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function $t(){try{n.texStorage3D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Ht(){try{n.texImage2D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Bt(){try{n.texImage3D.apply(n,arguments)}catch($){console.error("THREE.WebGLState:",$)}}function Xt($){ot.equals($)===!1&&(n.scissor($.x,$.y,$.z,$.w),ot.copy($))}function se($){Q.equals($)===!1&&(n.viewport($.x,$.y,$.z,$.w),Q.copy($))}function pe($,Rt){let Ut=u.get(Rt);Ut===void 0&&(Ut=new WeakMap,u.set(Rt,Ut));let Qt=Ut.get($);Qt===void 0&&(Qt=n.getUniformBlockIndex(Rt,$.name),Ut.set($,Qt))}function ne($,Rt){let Qt=u.get(Rt).get($);h.get(Rt)!==Qt&&(n.uniformBlockBinding(Rt,Qt,$.__bindingPointIndex),h.set(Rt,Qt))}function wt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),d={},B=null,K={},p={},x=new WeakMap,g=[],m=null,f=!1,y=null,_=null,M=null,E=null,S=null,w=null,R=null,b=new yt(0,0,0),v=0,A=!1,I=null,z=null,P=null,D=null,N=null,ot.set(0,0,n.canvas.width,n.canvas.height),Q.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:at,disable:mt,bindFramebuffer:St,drawBuffers:F,useProgram:vt,setBlending:nt,setMaterial:Mt,setFlipSided:et,setCullFace:L,setLineWidth:C,setPolygonOffset:Z,setScissorTest:gt,activeTexture:pt,bindTexture:xt,unbindTexture:Nt,compressedTexImage2D:Pt,compressedTexImage3D:Ot,texImage2D:Ht,texImage3D:Bt,updateUBOMapping:pe,uniformBlockBinding:ne,texStorage2D:ee,texStorage3D:$t,texSubImage2D:Wt,texSubImage3D:te,compressedTexSubImage2D:bt,compressedTexSubImage3D:ae,scissor:Xt,viewport:se,reset:wt}}function I1(n,t,e,i,s,r,o){let a=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,C){return p?new OffscreenCanvas(L,C):ma("canvas")}function g(L,C,Z,gt){let pt=1;if((L.width>gt||L.height>gt)&&(pt=gt/Math.max(L.width,L.height)),pt<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){let xt=C?pa:Math.floor,Nt=xt(pt*L.width),Pt=xt(pt*L.height);u===void 0&&(u=x(Nt,Pt));let Ot=Z?x(Nt,Pt):u;return Ot.width=Nt,Ot.height=Pt,Ot.getContext("2d").drawImage(L,0,0,Nt,Pt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Nt+"x"+Pt+")."),Ot}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function m(L){return wl(L.width)&&wl(L.height)}function f(L){return a?!1:L.wrapS!==kn||L.wrapT!==kn||L.minFilter!==$e&&L.minFilter!==cn}function y(L,C){return L.generateMipmaps&&C&&L.minFilter!==$e&&L.minFilter!==cn}function _(L){n.generateMipmap(L)}function M(L,C,Z,gt,pt=!1){if(a===!1)return C;if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let xt=C;if(C===n.RED&&(Z===n.FLOAT&&(xt=n.R32F),Z===n.HALF_FLOAT&&(xt=n.R16F),Z===n.UNSIGNED_BYTE&&(xt=n.R8)),C===n.RED_INTEGER&&(Z===n.UNSIGNED_BYTE&&(xt=n.R8UI),Z===n.UNSIGNED_SHORT&&(xt=n.R16UI),Z===n.UNSIGNED_INT&&(xt=n.R32UI),Z===n.BYTE&&(xt=n.R8I),Z===n.SHORT&&(xt=n.R16I),Z===n.INT&&(xt=n.R32I)),C===n.RG&&(Z===n.FLOAT&&(xt=n.RG32F),Z===n.HALF_FLOAT&&(xt=n.RG16F),Z===n.UNSIGNED_BYTE&&(xt=n.RG8)),C===n.RGBA){let Nt=pt?ha:fe.getTransfer(gt);Z===n.FLOAT&&(xt=n.RGBA32F),Z===n.HALF_FLOAT&&(xt=n.RGBA16F),Z===n.UNSIGNED_BYTE&&(xt=Nt===_e?n.SRGB8_ALPHA8:n.RGBA8),Z===n.UNSIGNED_SHORT_4_4_4_4&&(xt=n.RGBA4),Z===n.UNSIGNED_SHORT_5_5_5_1&&(xt=n.RGB5_A1)}return(xt===n.R16F||xt===n.R32F||xt===n.RG16F||xt===n.RG32F||xt===n.RGBA16F||xt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),xt}function E(L,C,Z){return y(L,Z)===!0||L.isFramebufferTexture&&L.minFilter!==$e&&L.minFilter!==cn?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function S(L){return L===$e||L===Au||L===Fc?n.NEAREST:n.LINEAR}function w(L){let C=L.target;C.removeEventListener("dispose",w),b(C),C.isVideoTexture&&h.delete(C)}function R(L){let C=L.target;C.removeEventListener("dispose",R),A(C)}function b(L){let C=i.get(L);if(C.__webglInit===void 0)return;let Z=L.source,gt=d.get(Z);if(gt){let pt=gt[C.__cacheKey];pt.usedTimes--,pt.usedTimes===0&&v(L),Object.keys(gt).length===0&&d.delete(Z)}i.remove(L)}function v(L){let C=i.get(L);n.deleteTexture(C.__webglTexture);let Z=L.source,gt=d.get(Z);delete gt[C.__cacheKey],o.memory.textures--}function A(L){let C=L.texture,Z=i.get(L),gt=i.get(C);if(gt.__webglTexture!==void 0&&(n.deleteTexture(gt.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let pt=0;pt<6;pt++){if(Array.isArray(Z.__webglFramebuffer[pt]))for(let xt=0;xt<Z.__webglFramebuffer[pt].length;xt++)n.deleteFramebuffer(Z.__webglFramebuffer[pt][xt]);else n.deleteFramebuffer(Z.__webglFramebuffer[pt]);Z.__webglDepthbuffer&&n.deleteRenderbuffer(Z.__webglDepthbuffer[pt])}else{if(Array.isArray(Z.__webglFramebuffer))for(let pt=0;pt<Z.__webglFramebuffer.length;pt++)n.deleteFramebuffer(Z.__webglFramebuffer[pt]);else n.deleteFramebuffer(Z.__webglFramebuffer);if(Z.__webglDepthbuffer&&n.deleteRenderbuffer(Z.__webglDepthbuffer),Z.__webglMultisampledFramebuffer&&n.deleteFramebuffer(Z.__webglMultisampledFramebuffer),Z.__webglColorRenderbuffer)for(let pt=0;pt<Z.__webglColorRenderbuffer.length;pt++)Z.__webglColorRenderbuffer[pt]&&n.deleteRenderbuffer(Z.__webglColorRenderbuffer[pt]);Z.__webglDepthRenderbuffer&&n.deleteRenderbuffer(Z.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let pt=0,xt=C.length;pt<xt;pt++){let Nt=i.get(C[pt]);Nt.__webglTexture&&(n.deleteTexture(Nt.__webglTexture),o.memory.textures--),i.remove(C[pt])}i.remove(C),i.remove(L)}let I=0;function z(){I=0}function P(){let L=I;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),I+=1,L}function D(L){let C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function N(L,C){let Z=i.get(L);if(L.isVideoTexture&&Mt(L),L.isRenderTargetTexture===!1&&L.version>0&&Z.__version!==L.version){let gt=L.image;if(gt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(gt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ot(Z,L,C);return}}e.bindTexture(n.TEXTURE_2D,Z.__webglTexture,n.TEXTURE0+C)}function V(L,C){let Z=i.get(L);if(L.version>0&&Z.__version!==L.version){ot(Z,L,C);return}e.bindTexture(n.TEXTURE_2D_ARRAY,Z.__webglTexture,n.TEXTURE0+C)}function H(L,C){let Z=i.get(L);if(L.version>0&&Z.__version!==L.version){ot(Z,L,C);return}e.bindTexture(n.TEXTURE_3D,Z.__webglTexture,n.TEXTURE0+C)}function G(L,C){let Z=i.get(L);if(L.version>0&&Z.__version!==L.version){Q(Z,L,C);return}e.bindTexture(n.TEXTURE_CUBE_MAP,Z.__webglTexture,n.TEXTURE0+C)}let O={[bl]:n.REPEAT,[kn]:n.CLAMP_TO_EDGE,[El]:n.MIRRORED_REPEAT},B={[$e]:n.NEAREST,[Au]:n.NEAREST_MIPMAP_NEAREST,[Fc]:n.NEAREST_MIPMAP_LINEAR,[cn]:n.LINEAR,[u0]:n.LINEAR_MIPMAP_NEAREST,[Fr]:n.LINEAR_MIPMAP_LINEAR},K={[E0]:n.NEVER,[C0]:n.ALWAYS,[S0]:n.LESS,[gd]:n.LEQUAL,[w0]:n.EQUAL,[R0]:n.GEQUAL,[T0]:n.GREATER,[A0]:n.NOTEQUAL};function Y(L,C,Z){if(Z?(n.texParameteri(L,n.TEXTURE_WRAP_S,O[C.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,O[C.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,O[C.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,B[C.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,B[C.minFilter])):(n.texParameteri(L,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(L,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(C.wrapS!==kn||C.wrapT!==kn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(L,n.TEXTURE_MAG_FILTER,S(C.magFilter)),n.texParameteri(L,n.TEXTURE_MIN_FILTER,S(C.minFilter)),C.minFilter!==$e&&C.minFilter!==cn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,K[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let gt=t.get("EXT_texture_filter_anisotropic");if(C.magFilter===$e||C.minFilter!==Fc&&C.minFilter!==Fr||C.type===Mi&&t.has("OES_texture_float_linear")===!1||a===!1&&C.type===Br&&t.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||i.get(C).__currentAnisotropy)&&(n.texParameterf(L,gt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy)}}function st(L,C){let Z=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",w));let gt=C.source,pt=d.get(gt);pt===void 0&&(pt={},d.set(gt,pt));let xt=D(C);if(xt!==L.__cacheKey){pt[xt]===void 0&&(pt[xt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,Z=!0),pt[xt].usedTimes++;let Nt=pt[L.__cacheKey];Nt!==void 0&&(pt[L.__cacheKey].usedTimes--,Nt.usedTimes===0&&v(C)),L.__cacheKey=xt,L.__webglTexture=pt[xt].texture}return Z}function ot(L,C,Z){let gt=n.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(gt=n.TEXTURE_2D_ARRAY),C.isData3DTexture&&(gt=n.TEXTURE_3D);let pt=st(L,C),xt=C.source;e.bindTexture(gt,L.__webglTexture,n.TEXTURE0+Z);let Nt=i.get(xt);if(xt.version!==Nt.__version||pt===!0){e.activeTexture(n.TEXTURE0+Z);let Pt=fe.getPrimaries(fe.workingColorSpace),Ot=C.colorSpace===An?null:fe.getPrimaries(C.colorSpace),Wt=C.colorSpace===An||Pt===Ot?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Wt);let te=f(C)&&m(C.image)===!1,bt=g(C.image,te,!1,s.maxTextureSize);bt=et(C,bt);let ae=m(bt)||a,ee=r.convert(C.format,C.colorSpace),$t=r.convert(C.type),Ht=M(C.internalFormat,ee,$t,C.colorSpace,C.isVideoTexture);Y(gt,C,ae);let Bt,Xt=C.mipmaps,se=a&&C.isVideoTexture!==!0&&Ht!==dd,pe=Nt.__version===void 0||pt===!0,ne=E(C,bt,ae);if(C.isDepthTexture)Ht=n.DEPTH_COMPONENT,a?C.type===Mi?Ht=n.DEPTH_COMPONENT32F:C.type===vi?Ht=n.DEPTH_COMPONENT24:C.type===Ji?Ht=n.DEPTH24_STENCIL8:Ht=n.DEPTH_COMPONENT16:C.type===Mi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===Ki&&Ht===n.DEPTH_COMPONENT&&C.type!==mh&&C.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=vi,$t=r.convert(C.type)),C.format===Js&&Ht===n.DEPTH_COMPONENT&&(Ht=n.DEPTH_STENCIL,C.type!==Ji&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=Ji,$t=r.convert(C.type))),pe&&(se?e.texStorage2D(n.TEXTURE_2D,1,Ht,bt.width,bt.height):e.texImage2D(n.TEXTURE_2D,0,Ht,bt.width,bt.height,0,ee,$t,null));else if(C.isDataTexture)if(Xt.length>0&&ae){se&&pe&&e.texStorage2D(n.TEXTURE_2D,ne,Ht,Xt[0].width,Xt[0].height);for(let wt=0,$=Xt.length;wt<$;wt++)Bt=Xt[wt],se?e.texSubImage2D(n.TEXTURE_2D,wt,0,0,Bt.width,Bt.height,ee,$t,Bt.data):e.texImage2D(n.TEXTURE_2D,wt,Ht,Bt.width,Bt.height,0,ee,$t,Bt.data);C.generateMipmaps=!1}else se?(pe&&e.texStorage2D(n.TEXTURE_2D,ne,Ht,bt.width,bt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,bt.width,bt.height,ee,$t,bt.data)):e.texImage2D(n.TEXTURE_2D,0,Ht,bt.width,bt.height,0,ee,$t,bt.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){se&&pe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ne,Ht,Xt[0].width,Xt[0].height,bt.depth);for(let wt=0,$=Xt.length;wt<$;wt++)Bt=Xt[wt],C.format!==Hn?ee!==null?se?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,wt,0,0,0,Bt.width,Bt.height,bt.depth,ee,Bt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,wt,Ht,Bt.width,Bt.height,bt.depth,0,Bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage3D(n.TEXTURE_2D_ARRAY,wt,0,0,0,Bt.width,Bt.height,bt.depth,ee,$t,Bt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,wt,Ht,Bt.width,Bt.height,bt.depth,0,ee,$t,Bt.data)}else{se&&pe&&e.texStorage2D(n.TEXTURE_2D,ne,Ht,Xt[0].width,Xt[0].height);for(let wt=0,$=Xt.length;wt<$;wt++)Bt=Xt[wt],C.format!==Hn?ee!==null?se?e.compressedTexSubImage2D(n.TEXTURE_2D,wt,0,0,Bt.width,Bt.height,ee,Bt.data):e.compressedTexImage2D(n.TEXTURE_2D,wt,Ht,Bt.width,Bt.height,0,Bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):se?e.texSubImage2D(n.TEXTURE_2D,wt,0,0,Bt.width,Bt.height,ee,$t,Bt.data):e.texImage2D(n.TEXTURE_2D,wt,Ht,Bt.width,Bt.height,0,ee,$t,Bt.data)}else if(C.isDataArrayTexture)se?(pe&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ne,Ht,bt.width,bt.height,bt.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,bt.width,bt.height,bt.depth,ee,$t,bt.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Ht,bt.width,bt.height,bt.depth,0,ee,$t,bt.data);else if(C.isData3DTexture)se?(pe&&e.texStorage3D(n.TEXTURE_3D,ne,Ht,bt.width,bt.height,bt.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,bt.width,bt.height,bt.depth,ee,$t,bt.data)):e.texImage3D(n.TEXTURE_3D,0,Ht,bt.width,bt.height,bt.depth,0,ee,$t,bt.data);else if(C.isFramebufferTexture){if(pe)if(se)e.texStorage2D(n.TEXTURE_2D,ne,Ht,bt.width,bt.height);else{let wt=bt.width,$=bt.height;for(let Rt=0;Rt<ne;Rt++)e.texImage2D(n.TEXTURE_2D,Rt,Ht,wt,$,0,ee,$t,null),wt>>=1,$>>=1}}else if(Xt.length>0&&ae){se&&pe&&e.texStorage2D(n.TEXTURE_2D,ne,Ht,Xt[0].width,Xt[0].height);for(let wt=0,$=Xt.length;wt<$;wt++)Bt=Xt[wt],se?e.texSubImage2D(n.TEXTURE_2D,wt,0,0,ee,$t,Bt):e.texImage2D(n.TEXTURE_2D,wt,Ht,ee,$t,Bt);C.generateMipmaps=!1}else se?(pe&&e.texStorage2D(n.TEXTURE_2D,ne,Ht,bt.width,bt.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,ee,$t,bt)):e.texImage2D(n.TEXTURE_2D,0,Ht,ee,$t,bt);y(C,ae)&&_(gt),Nt.__version=xt.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function Q(L,C,Z){if(C.image.length!==6)return;let gt=st(L,C),pt=C.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+Z);let xt=i.get(pt);if(pt.version!==xt.__version||gt===!0){e.activeTexture(n.TEXTURE0+Z);let Nt=fe.getPrimaries(fe.workingColorSpace),Pt=C.colorSpace===An?null:fe.getPrimaries(C.colorSpace),Ot=C.colorSpace===An||Nt===Pt?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ot);let Wt=C.isCompressedTexture||C.image[0].isCompressedTexture,te=C.image[0]&&C.image[0].isDataTexture,bt=[];for(let wt=0;wt<6;wt++)!Wt&&!te?bt[wt]=g(C.image[wt],!1,!0,s.maxCubemapSize):bt[wt]=te?C.image[wt].image:C.image[wt],bt[wt]=et(C,bt[wt]);let ae=bt[0],ee=m(ae)||a,$t=r.convert(C.format,C.colorSpace),Ht=r.convert(C.type),Bt=M(C.internalFormat,$t,Ht,C.colorSpace),Xt=a&&C.isVideoTexture!==!0,se=xt.__version===void 0||gt===!0,pe=E(C,ae,ee);Y(n.TEXTURE_CUBE_MAP,C,ee);let ne;if(Wt){Xt&&se&&e.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Bt,ae.width,ae.height);for(let wt=0;wt<6;wt++){ne=bt[wt].mipmaps;for(let $=0;$<ne.length;$++){let Rt=ne[$];C.format!==Hn?$t!==null?Xt?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$,0,0,Rt.width,Rt.height,$t,Rt.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$,Bt,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$,0,0,Rt.width,Rt.height,$t,Ht,Rt.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$,Bt,Rt.width,Rt.height,0,$t,Ht,Rt.data)}}}else{ne=C.mipmaps,Xt&&se&&(ne.length>0&&pe++,e.texStorage2D(n.TEXTURE_CUBE_MAP,pe,Bt,bt[0].width,bt[0].height));for(let wt=0;wt<6;wt++)if(te){Xt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0,0,0,bt[wt].width,bt[wt].height,$t,Ht,bt[wt].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0,Bt,bt[wt].width,bt[wt].height,0,$t,Ht,bt[wt].data);for(let $=0;$<ne.length;$++){let Ut=ne[$].image[wt].image;Xt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$+1,0,0,Ut.width,Ut.height,$t,Ht,Ut.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$+1,Bt,Ut.width,Ut.height,0,$t,Ht,Ut.data)}}else{Xt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0,0,0,$t,Ht,bt[wt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,0,Bt,$t,Ht,bt[wt]);for(let $=0;$<ne.length;$++){let Rt=ne[$];Xt?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$+1,0,0,$t,Ht,Rt.image[wt]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+wt,$+1,Bt,$t,Ht,Rt.image[wt])}}}y(C,ee)&&_(n.TEXTURE_CUBE_MAP),xt.__version=pt.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function ht(L,C,Z,gt,pt,xt){let Nt=r.convert(Z.format,Z.colorSpace),Pt=r.convert(Z.type),Ot=M(Z.internalFormat,Nt,Pt,Z.colorSpace);if(!i.get(C).__hasExternalTextures){let te=Math.max(1,C.width>>xt),bt=Math.max(1,C.height>>xt);pt===n.TEXTURE_3D||pt===n.TEXTURE_2D_ARRAY?e.texImage3D(pt,xt,Ot,te,bt,C.depth,0,Nt,Pt,null):e.texImage2D(pt,xt,Ot,te,bt,0,Nt,Pt,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),nt(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,gt,pt,i.get(Z).__webglTexture,0,tt(C)):(pt===n.TEXTURE_2D||pt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&pt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,gt,pt,i.get(Z).__webglTexture,xt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function ct(L,C,Z){if(n.bindRenderbuffer(n.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let gt=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(Z||nt(C)){let pt=C.depthTexture;pt&&pt.isDepthTexture&&(pt.type===Mi?gt=n.DEPTH_COMPONENT32F:pt.type===vi&&(gt=n.DEPTH_COMPONENT24));let xt=tt(C);nt(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,xt,gt,C.width,C.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,xt,gt,C.width,C.height)}else n.renderbufferStorage(n.RENDERBUFFER,gt,C.width,C.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){let gt=tt(C);Z&&nt(C)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,gt,n.DEPTH24_STENCIL8,C.width,C.height):nt(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,gt,n.DEPTH24_STENCIL8,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,L)}else{let gt=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let pt=0;pt<gt.length;pt++){let xt=gt[pt],Nt=r.convert(xt.format,xt.colorSpace),Pt=r.convert(xt.type),Ot=M(xt.internalFormat,Nt,Pt,xt.colorSpace),Wt=tt(C);Z&&nt(C)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Wt,Ot,C.width,C.height):nt(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Wt,Ot,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,Ot,C.width,C.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function at(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),N(C.depthTexture,0);let gt=i.get(C.depthTexture).__webglTexture,pt=tt(C);if(C.depthTexture.format===Ki)nt(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,gt,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,gt,0);else if(C.depthTexture.format===Js)nt(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,gt,0,pt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,gt,0);else throw new Error("Unknown depthTexture format")}function mt(L){let C=i.get(L),Z=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(Z)throw new Error("target.depthTexture not supported in Cube render targets");at(C.__webglFramebuffer,L)}else if(Z){C.__webglDepthbuffer=[];for(let gt=0;gt<6;gt++)e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[gt]),C.__webglDepthbuffer[gt]=n.createRenderbuffer(),ct(C.__webglDepthbuffer[gt],L,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=n.createRenderbuffer(),ct(C.__webglDepthbuffer,L,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function St(L,C,Z){let gt=i.get(L);C!==void 0&&ht(gt.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),Z!==void 0&&mt(L)}function F(L){let C=L.texture,Z=i.get(L),gt=i.get(C);L.addEventListener("dispose",R),L.isWebGLMultipleRenderTargets!==!0&&(gt.__webglTexture===void 0&&(gt.__webglTexture=n.createTexture()),gt.__version=C.version,o.memory.textures++);let pt=L.isWebGLCubeRenderTarget===!0,xt=L.isWebGLMultipleRenderTargets===!0,Nt=m(L)||a;if(pt){Z.__webglFramebuffer=[];for(let Pt=0;Pt<6;Pt++)if(a&&C.mipmaps&&C.mipmaps.length>0){Z.__webglFramebuffer[Pt]=[];for(let Ot=0;Ot<C.mipmaps.length;Ot++)Z.__webglFramebuffer[Pt][Ot]=n.createFramebuffer()}else Z.__webglFramebuffer[Pt]=n.createFramebuffer()}else{if(a&&C.mipmaps&&C.mipmaps.length>0){Z.__webglFramebuffer=[];for(let Pt=0;Pt<C.mipmaps.length;Pt++)Z.__webglFramebuffer[Pt]=n.createFramebuffer()}else Z.__webglFramebuffer=n.createFramebuffer();if(xt)if(s.drawBuffers){let Pt=L.texture;for(let Ot=0,Wt=Pt.length;Ot<Wt;Ot++){let te=i.get(Pt[Ot]);te.__webglTexture===void 0&&(te.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&nt(L)===!1){let Pt=xt?C:[C];Z.__webglMultisampledFramebuffer=n.createFramebuffer(),Z.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,Z.__webglMultisampledFramebuffer);for(let Ot=0;Ot<Pt.length;Ot++){let Wt=Pt[Ot];Z.__webglColorRenderbuffer[Ot]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,Z.__webglColorRenderbuffer[Ot]);let te=r.convert(Wt.format,Wt.colorSpace),bt=r.convert(Wt.type),ae=M(Wt.internalFormat,te,bt,Wt.colorSpace,L.isXRRenderTarget===!0),ee=tt(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,ee,ae,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ot,n.RENDERBUFFER,Z.__webglColorRenderbuffer[Ot])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(Z.__webglDepthRenderbuffer=n.createRenderbuffer(),ct(Z.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(pt){e.bindTexture(n.TEXTURE_CUBE_MAP,gt.__webglTexture),Y(n.TEXTURE_CUBE_MAP,C,Nt);for(let Pt=0;Pt<6;Pt++)if(a&&C.mipmaps&&C.mipmaps.length>0)for(let Ot=0;Ot<C.mipmaps.length;Ot++)ht(Z.__webglFramebuffer[Pt][Ot],L,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,Ot);else ht(Z.__webglFramebuffer[Pt],L,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+Pt,0);y(C,Nt)&&_(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(xt){let Pt=L.texture;for(let Ot=0,Wt=Pt.length;Ot<Wt;Ot++){let te=Pt[Ot],bt=i.get(te);e.bindTexture(n.TEXTURE_2D,bt.__webglTexture),Y(n.TEXTURE_2D,te,Nt),ht(Z.__webglFramebuffer,L,te,n.COLOR_ATTACHMENT0+Ot,n.TEXTURE_2D,0),y(te,Nt)&&_(n.TEXTURE_2D)}e.unbindTexture()}else{let Pt=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?Pt=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(Pt,gt.__webglTexture),Y(Pt,C,Nt),a&&C.mipmaps&&C.mipmaps.length>0)for(let Ot=0;Ot<C.mipmaps.length;Ot++)ht(Z.__webglFramebuffer[Ot],L,C,n.COLOR_ATTACHMENT0,Pt,Ot);else ht(Z.__webglFramebuffer,L,C,n.COLOR_ATTACHMENT0,Pt,0);y(C,Nt)&&_(Pt),e.unbindTexture()}L.depthBuffer&&mt(L)}function vt(L){let C=m(L)||a,Z=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let gt=0,pt=Z.length;gt<pt;gt++){let xt=Z[gt];if(y(xt,C)){let Nt=L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,Pt=i.get(xt).__webglTexture;e.bindTexture(Nt,Pt),_(Nt),e.unbindTexture()}}}function j(L){if(a&&L.samples>0&&nt(L)===!1){let C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],Z=L.width,gt=L.height,pt=n.COLOR_BUFFER_BIT,xt=[],Nt=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,Pt=i.get(L),Ot=L.isWebGLMultipleRenderTargets===!0;if(Ot)for(let Wt=0;Wt<C.length;Wt++)e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Wt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Wt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pt.__webglFramebuffer);for(let Wt=0;Wt<C.length;Wt++){xt.push(n.COLOR_ATTACHMENT0+Wt),L.depthBuffer&&xt.push(Nt);let te=Pt.__ignoreDepthValues!==void 0?Pt.__ignoreDepthValues:!1;if(te===!1&&(L.depthBuffer&&(pt|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&(pt|=n.STENCIL_BUFFER_BIT)),Ot&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,Pt.__webglColorRenderbuffer[Wt]),te===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Nt]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Nt])),Ot){let bt=i.get(C[Wt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,bt,0)}n.blitFramebuffer(0,0,Z,gt,0,0,Z,gt,pt,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,xt)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Ot)for(let Wt=0;Wt<C.length;Wt++){e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Wt,n.RENDERBUFFER,Pt.__webglColorRenderbuffer[Wt]);let te=i.get(C[Wt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,Pt.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Wt,n.TEXTURE_2D,te,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,Pt.__webglMultisampledFramebuffer)}}function tt(L){return Math.min(s.maxSamples,L.samples)}function nt(L){let C=i.get(L);return a&&L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Mt(L){let C=o.render.frame;h.get(L)!==C&&(h.set(L,C),L.update())}function et(L,C){let Z=L.colorSpace,gt=L.format,pt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Sl||Z!==ii&&Z!==An&&(fe.getTransfer(Z)===_e?a===!1?t.has("EXT_sRGB")===!0&&gt===Hn?(L.format=Sl,L.minFilter=cn,L.generateMipmaps=!1):C=ga.sRGBToLinear(C):(gt!==Hn||pt!==Si)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Z)),C}this.allocateTextureUnit=P,this.resetTextureUnits=z,this.setTexture2D=N,this.setTexture2DArray=V,this.setTexture3D=H,this.setTextureCube=G,this.rebindTextures=St,this.setupRenderTarget=F,this.updateRenderTargetMipmap=vt,this.updateMultisampleRenderTarget=j,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=ht,this.useMultisampledRTT=nt}function L1(n,t,e){let i=e.isWebGL2;function s(r,o=An){let a,c=fe.getTransfer(o);if(r===Si)return n.UNSIGNED_BYTE;if(r===cd)return n.UNSIGNED_SHORT_4_4_4_4;if(r===ld)return n.UNSIGNED_SHORT_5_5_5_1;if(r===f0)return n.BYTE;if(r===d0)return n.SHORT;if(r===mh)return n.UNSIGNED_SHORT;if(r===ad)return n.INT;if(r===vi)return n.UNSIGNED_INT;if(r===Mi)return n.FLOAT;if(r===Br)return i?n.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===p0)return n.ALPHA;if(r===Hn)return n.RGBA;if(r===m0)return n.LUMINANCE;if(r===g0)return n.LUMINANCE_ALPHA;if(r===Ki)return n.DEPTH_COMPONENT;if(r===Js)return n.DEPTH_STENCIL;if(r===Sl)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===x0)return n.RED;if(r===hd)return n.RED_INTEGER;if(r===_0)return n.RG;if(r===ud)return n.RG_INTEGER;if(r===fd)return n.RGBA_INTEGER;if(r===Bc||r===kc||r===Hc||r===Gc)if(c===_e)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Bc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===kc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Hc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Gc)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Bc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===kc)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Hc)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Gc)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Ru||r===Cu||r===Pu||r===Iu)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Ru)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Cu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Pu)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Iu)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===dd)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Lu||r===Du)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Lu)return c===_e?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Du)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Uu||r===Nu||r===zu||r===Ou||r===Fu||r===Bu||r===ku||r===Hu||r===Gu||r===Vu||r===Wu||r===Xu||r===qu||r===Yu)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Uu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Nu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===zu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Ou)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Bu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===ku)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Hu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Gu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Vu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Wu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===Xu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===qu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Yu)return c===_e?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Vc||r===$u||r===Zu)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===Vc)return c===_e?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===$u)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Zu)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===y0||r===Ju||r===Ku||r===ju)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===Vc)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Ju)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Ku)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===ju)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===Ji?i?n.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var Fl=class extends _n{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},jt=class extends Oe{constructor(){super(),this.isGroup=!0,this.type="Group"}},D1={type:"move"},Ur=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,i),f=this._getHandJoint(l,g);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,x=.005;l.inputState.pinching&&d>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(D1)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new jt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Bl=class extends Ti{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,p=null,x=null,g=e.getContextAttributes(),m=null,f=null,y=[],_=[],M=new At,E=null,S=new _n;S.layers.enable(1),S.viewport=new Xe;let w=new _n;w.layers.enable(2),w.viewport=new Xe;let R=[S,w],b=new Fl;b.layers.enable(1),b.layers.enable(2);let v=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let st=y[Y];return st===void 0&&(st=new Ur,y[Y]=st),st.getTargetRaySpace()},this.getControllerGrip=function(Y){let st=y[Y];return st===void 0&&(st=new Ur,y[Y]=st),st.getGripSpace()},this.getHand=function(Y){let st=y[Y];return st===void 0&&(st=new Ur,y[Y]=st),st.getHandSpace()};function I(Y){let st=_.indexOf(Y.inputSource);if(st===-1)return;let ot=y[st];ot!==void 0&&(ot.update(Y.inputSource,Y.frame,l||o),ot.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",P);for(let Y=0;Y<y.length;Y++){let st=_[Y];st!==null&&(_[Y]=null,y[Y].disconnect(st))}v=null,A=null,t.setRenderTarget(m),p=null,d=null,u=null,s=null,f=null,K.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(M.width,M.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",z),s.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(M),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let st={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,st),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),f=new si(p.framebufferWidth,p.framebufferHeight,{format:Hn,type:Si,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let st=null,ot=null,Q=null;g.depth&&(Q=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,st=g.stencil?Js:Ki,ot=g.stencil?Ji:vi);let ht={colorFormat:e.RGBA8,depthFormat:Q,scaleFactor:r};u=new XRWebGLBinding(s,e),d=u.createProjectionLayer(ht),s.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),f=new si(d.textureWidth,d.textureHeight,{format:Hn,type:Si,depthTexture:new wa(d.textureWidth,d.textureHeight,ot,void 0,void 0,void 0,void 0,void 0,void 0,st),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});let ct=t.properties.get(f);ct.__ignoreDepthValues=d.ignoreDepthValues}f.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),K.setContext(s),K.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(Y){for(let st=0;st<Y.removed.length;st++){let ot=Y.removed[st],Q=_.indexOf(ot);Q>=0&&(_[Q]=null,y[Q].disconnect(ot))}for(let st=0;st<Y.added.length;st++){let ot=Y.added[st],Q=_.indexOf(ot);if(Q===-1){for(let ct=0;ct<y.length;ct++)if(ct>=_.length){_.push(ot),Q=ct;break}else if(_[ct]===null){_[ct]=ot,Q=ct;break}if(Q===-1)break}let ht=y[Q];ht&&ht.connect(ot)}}let D=new k,N=new k;function V(Y,st,ot){D.setFromMatrixPosition(st.matrixWorld),N.setFromMatrixPosition(ot.matrixWorld);let Q=D.distanceTo(N),ht=st.projectionMatrix.elements,ct=ot.projectionMatrix.elements,at=ht[14]/(ht[10]-1),mt=ht[14]/(ht[10]+1),St=(ht[9]+1)/ht[5],F=(ht[9]-1)/ht[5],vt=(ht[8]-1)/ht[0],j=(ct[8]+1)/ct[0],tt=at*vt,nt=at*j,Mt=Q/(-vt+j),et=Mt*-vt;st.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(et),Y.translateZ(Mt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();let L=at+Mt,C=mt+Mt,Z=tt-et,gt=nt+(Q-et),pt=St*mt/C*L,xt=F*mt/C*L;Y.projectionMatrix.makePerspective(Z,gt,pt,xt,L,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function H(Y,st){st===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(st.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;b.near=w.near=S.near=Y.near,b.far=w.far=S.far=Y.far,(v!==b.near||A!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),v=b.near,A=b.far);let st=Y.parent,ot=b.cameras;H(b,st);for(let Q=0;Q<ot.length;Q++)H(ot[Q],st);ot.length===2?V(b,S,w):b.projectionMatrix.copy(S.projectionMatrix),G(Y,b,st)};function G(Y,st,ot){ot===null?Y.matrix.copy(st.matrixWorld):(Y.matrix.copy(ot.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(st.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(st.projectionMatrix),Y.projectionMatrixInverse.copy(st.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=kr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(d===null&&p===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let O=null;function B(Y,st){if(h=st.getViewerPose(l||o),x=st,h!==null){let ot=h.views;p!==null&&(t.setRenderTargetFramebuffer(f,p.framebuffer),t.setRenderTarget(f));let Q=!1;ot.length!==b.cameras.length&&(b.cameras.length=0,Q=!0);for(let ht=0;ht<ot.length;ht++){let ct=ot[ht],at=null;if(p!==null)at=p.getViewport(ct);else{let St=u.getViewSubImage(d,ct);at=St.viewport,ht===0&&(t.setRenderTargetTextures(f,St.colorTexture,d.ignoreDepthValues?void 0:St.depthStencilTexture),t.setRenderTarget(f))}let mt=R[ht];mt===void 0&&(mt=new _n,mt.layers.enable(ht),mt.viewport=new Xe,R[ht]=mt),mt.matrix.fromArray(ct.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(ct.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(at.x,at.y,at.width,at.height),ht===0&&(b.matrix.copy(mt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),Q===!0&&b.cameras.push(mt)}}for(let ot=0;ot<y.length;ot++){let Q=_[ot],ht=y[ot];Q!==null&&ht!==void 0&&ht.update(Q,st,l||o)}O&&O(Y,st),st.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:st}),x=null}let K=new vd;K.setAnimationLoop(B),this.setAnimationLoop=function(Y){O=Y},this.dispose=function(){}}};function U1(n,t){function e(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function i(m,f){f.color.getRGB(m.fogColor.value,yd(n)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,y,_,M){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,M)):f.isMeshMatcapMaterial?(r(m,f),x(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),g(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(o(m,f),f.isLineDashedMaterial&&a(m,f)):f.isPointsMaterial?c(m,f,y,_):f.isSpriteMaterial?l(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,e(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===ln&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,e(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===ln&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,e(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,e(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let y=t.get(f).envMap;if(y&&(m.envMap.value=y,m.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap){m.lightMap.value=f.lightMap;let _=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=f.lightMapIntensity*_,e(f.lightMap,m.lightMapTransform)}f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,m.aoMapTransform))}function o(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform))}function a(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function c(m,f,y,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*y,m.scale.value=_*.5,f.map&&(m.map.value=f.map,e(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function l(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,e(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,e(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,m.roughnessMapTransform)),t.get(f).envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,y){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===ln&&m.clearcoatNormalScale.value.negate())),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,f){f.matcap&&(m.matcap.value=f.matcap)}function g(m,f){let y=t.get(f).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function N1(n,t,e,i){let s={},r={},o=[],a=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(y,_){let M=_.program;i.uniformBlockBinding(y,M)}function l(y,_){let M=s[y.id];M===void 0&&(x(y),M=h(y),s[y.id]=M,y.addEventListener("dispose",m));let E=_.program;i.updateUBOMapping(y,E);let S=t.render.frame;r[y.id]!==S&&(d(y),r[y.id]=S)}function h(y){let _=u();y.__bindingPointIndex=_;let M=n.createBuffer(),E=y.__size,S=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,E,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,_,M),M}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){let _=s[y.id],M=y.uniforms,E=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,_);for(let S=0,w=M.length;S<w;S++){let R=Array.isArray(M[S])?M[S]:[M[S]];for(let b=0,v=R.length;b<v;b++){let A=R[b];if(p(A,S,b,E)===!0){let I=A.__offset,z=Array.isArray(A.value)?A.value:[A.value],P=0;for(let D=0;D<z.length;D++){let N=z[D],V=g(N);typeof N=="number"||typeof N=="boolean"?(A.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,I+P,A.__data)):N.isMatrix3?(A.__data[0]=N.elements[0],A.__data[1]=N.elements[1],A.__data[2]=N.elements[2],A.__data[3]=0,A.__data[4]=N.elements[3],A.__data[5]=N.elements[4],A.__data[6]=N.elements[5],A.__data[7]=0,A.__data[8]=N.elements[6],A.__data[9]=N.elements[7],A.__data[10]=N.elements[8],A.__data[11]=0):(N.toArray(A.__data,P),P+=V.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(y,_,M,E){let S=y.value,w=_+"_"+M;if(E[w]===void 0)return typeof S=="number"||typeof S=="boolean"?E[w]=S:E[w]=S.clone(),!0;{let R=E[w];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return E[w]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function x(y){let _=y.uniforms,M=0,E=16;for(let w=0,R=_.length;w<R;w++){let b=Array.isArray(_[w])?_[w]:[_[w]];for(let v=0,A=b.length;v<A;v++){let I=b[v],z=Array.isArray(I.value)?I.value:[I.value];for(let P=0,D=z.length;P<D;P++){let N=z[P],V=g(N),H=M%E;H!==0&&E-H<V.boundary&&(M+=E-H),I.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=M,M+=V.storage}}}let S=M%E;return S>0&&(M+=E-S),y.__size=M,y.__cache={},this}function g(y){let _={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(_.boundary=4,_.storage=4):y.isVector2?(_.boundary=8,_.storage=8):y.isVector3||y.isColor?(_.boundary=16,_.storage=12):y.isVector4?(_.boundary=16,_.storage=16):y.isMatrix3?(_.boundary=48,_.storage=48):y.isMatrix4?(_.boundary=64,_.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),_}function m(y){let _=y.target;_.removeEventListener("dispose",m);let M=o.indexOf(_.__bindingPointIndex);o.splice(M,1),n.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function f(){for(let y in s)n.deleteBuffer(s[y]);o=[],s={},r={}}return{bind:c,update:l,dispose:f}}var Wr=class{constructor(t={}){let{canvas:e=W0(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;i!==null?d=i.getContextAttributes().alpha:d=o;let p=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,f=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ze,this._useLegacyLights=!1,this.toneMapping=Ei,this.toneMappingExposure=1;let _=this,M=!1,E=0,S=0,w=null,R=-1,b=null,v=new Xe,A=new Xe,I=null,z=new yt(0),P=0,D=e.width,N=e.height,V=1,H=null,G=null,O=new Xe(0,0,D,N),B=new Xe(0,0,D,N),K=!1,Y=new Vr,st=!1,ot=!1,Q=null,ht=new me,ct=new At,at=new k,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function St(){return w===null?V:1}let F=i;function vt(U,rt){for(let ft=0;ft<U.length;ft++){let dt=U[ft],ut=e.getContext(dt,rt);if(ut!==null)return ut}return null}try{let U={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${uh}`),e.addEventListener("webglcontextlost",wt,!1),e.addEventListener("webglcontextrestored",$,!1),e.addEventListener("webglcontextcreationerror",Rt,!1),F===null){let rt=["webgl2","webgl","experimental-webgl"];if(_.isWebGL1Renderer===!0&&rt.shift(),F=vt(rt,U),F===null)throw vt(rt)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(U){throw console.error("THREE.WebGLRenderer: "+U.message),U}let j,tt,nt,Mt,et,L,C,Z,gt,pt,xt,Nt,Pt,Ot,Wt,te,bt,ae,ee,$t,Ht,Bt,Xt,se;function pe(){j=new tv(F),tt=new $y(F,j,t),j.init(tt),Bt=new L1(F,j,tt),nt=new P1(F,j,tt),Mt=new iv(F),et=new _1,L=new I1(F,j,nt,et,tt,Bt,Mt),C=new Jy(_),Z=new Qy(_),gt=new ux(F,tt),Xt=new qy(F,j,gt,tt),pt=new ev(F,gt,Mt,Xt),xt=new av(F,pt,gt,Mt),ee=new ov(F,tt,L),te=new Zy(et),Nt=new x1(_,C,Z,j,tt,Xt,te),Pt=new U1(_,et),Ot=new v1,Wt=new T1(j,tt),ae=new Xy(_,C,Z,nt,xt,d,c),bt=new C1(_,xt,tt),se=new N1(F,Mt,tt,nt),$t=new Yy(F,j,Mt,tt),Ht=new nv(F,j,Mt,tt),Mt.programs=Nt.programs,_.capabilities=tt,_.extensions=j,_.properties=et,_.renderLists=Ot,_.shadowMap=bt,_.state=nt,_.info=Mt}pe();let ne=new Bl(_,F);this.xr=ne,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let U=j.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){let U=j.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(U){U!==void 0&&(V=U,this.setSize(D,N,!1))},this.getSize=function(U){return U.set(D,N)},this.setSize=function(U,rt,ft=!0){if(ne.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=U,N=rt,e.width=Math.floor(U*V),e.height=Math.floor(rt*V),ft===!0&&(e.style.width=U+"px",e.style.height=rt+"px"),this.setViewport(0,0,U,rt)},this.getDrawingBufferSize=function(U){return U.set(D*V,N*V).floor()},this.setDrawingBufferSize=function(U,rt,ft){D=U,N=rt,V=ft,e.width=Math.floor(U*ft),e.height=Math.floor(rt*ft),this.setViewport(0,0,U,rt)},this.getCurrentViewport=function(U){return U.copy(v)},this.getViewport=function(U){return U.copy(O)},this.setViewport=function(U,rt,ft,dt){U.isVector4?O.set(U.x,U.y,U.z,U.w):O.set(U,rt,ft,dt),nt.viewport(v.copy(O).multiplyScalar(V).floor())},this.getScissor=function(U){return U.copy(B)},this.setScissor=function(U,rt,ft,dt){U.isVector4?B.set(U.x,U.y,U.z,U.w):B.set(U,rt,ft,dt),nt.scissor(A.copy(B).multiplyScalar(V).floor())},this.getScissorTest=function(){return K},this.setScissorTest=function(U){nt.setScissorTest(K=U)},this.setOpaqueSort=function(U){H=U},this.setTransparentSort=function(U){G=U},this.getClearColor=function(U){return U.copy(ae.getClearColor())},this.setClearColor=function(){ae.setClearColor.apply(ae,arguments)},this.getClearAlpha=function(){return ae.getClearAlpha()},this.setClearAlpha=function(){ae.setClearAlpha.apply(ae,arguments)},this.clear=function(U=!0,rt=!0,ft=!0){let dt=0;if(U){let ut=!1;if(w!==null){let zt=w.texture.format;ut=zt===fd||zt===ud||zt===hd}if(ut){let zt=w.texture.type,T=zt===Si||zt===vi||zt===mh||zt===Ji||zt===cd||zt===ld,W=ae.getClearColor(),X=ae.getClearAlpha(),q=W.r,J=W.g,it=W.b;T?(p[0]=q,p[1]=J,p[2]=it,p[3]=X,F.clearBufferuiv(F.COLOR,0,p)):(x[0]=q,x[1]=J,x[2]=it,x[3]=X,F.clearBufferiv(F.COLOR,0,x))}else dt|=F.COLOR_BUFFER_BIT}rt&&(dt|=F.DEPTH_BUFFER_BIT),ft&&(dt|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(dt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",wt,!1),e.removeEventListener("webglcontextrestored",$,!1),e.removeEventListener("webglcontextcreationerror",Rt,!1),Ot.dispose(),Wt.dispose(),et.dispose(),C.dispose(),Z.dispose(),xt.dispose(),Xt.dispose(),se.dispose(),Nt.dispose(),ne.dispose(),ne.removeEventListener("sessionstart",Le),ne.removeEventListener("sessionend",ue),Q&&(Q.dispose(),Q=null),De.stop()};function wt(U){U.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function $(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;let U=Mt.autoReset,rt=bt.enabled,ft=bt.autoUpdate,dt=bt.needsUpdate,ut=bt.type;pe(),Mt.autoReset=U,bt.enabled=rt,bt.autoUpdate=ft,bt.needsUpdate=dt,bt.type=ut}function Rt(U){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function Ut(U){let rt=U.target;rt.removeEventListener("dispose",Ut),Qt(rt)}function Qt(U){Kt(U),et.remove(U)}function Kt(U){let rt=et.get(U).programs;rt!==void 0&&(rt.forEach(function(ft){Nt.releaseProgram(ft)}),U.isShaderMaterial&&Nt.releaseShaderCache(U))}this.renderBufferDirect=function(U,rt,ft,dt,ut,zt){rt===null&&(rt=mt);let T=ut.isMesh&&ut.matrixWorld.determinant()<0,W=Lo(U,rt,ft,dt,ut);nt.setMaterial(dt,T);let X=ft.index,q=1;if(dt.wireframe===!0){if(X=pt.getWireframeAttribute(ft),X===void 0)return;q=2}let J=ft.drawRange,it=ft.attributes.position,_t=J.start*q,Ct=(J.start+J.count)*q;zt!==null&&(_t=Math.max(_t,zt.start*q),Ct=Math.min(Ct,(zt.start+zt.count)*q)),X!==null?(_t=Math.max(_t,0),Ct=Math.min(Ct,X.count)):it!=null&&(_t=Math.max(_t,0),Ct=Math.min(Ct,it.count));let Dt=Ct-_t;if(Dt<0||Dt===1/0)return;Xt.setup(ut,dt,W,ft,X);let qt,Gt=$t;if(X!==null&&(qt=gt.get(X),Gt=Ht,Gt.setIndex(qt)),ut.isMesh)dt.wireframe===!0?(nt.setLineWidth(dt.wireframeLinewidth*St()),Gt.setMode(F.LINES)):Gt.setMode(F.TRIANGLES);else if(ut.isLine){let Tt=dt.linewidth;Tt===void 0&&(Tt=1),nt.setLineWidth(Tt*St()),ut.isLineSegments?Gt.setMode(F.LINES):ut.isLineLoop?Gt.setMode(F.LINE_LOOP):Gt.setMode(F.LINE_STRIP)}else ut.isPoints?Gt.setMode(F.POINTS):ut.isSprite&&Gt.setMode(F.TRIANGLES);if(ut.isBatchedMesh)Gt.renderMultiDraw(ut._multiDrawStarts,ut._multiDrawCounts,ut._multiDrawCount);else if(ut.isInstancedMesh)Gt.renderInstances(_t,Dt,ut.count);else if(ft.isInstancedBufferGeometry){let Tt=ft._maxInstanceCount!==void 0?ft._maxInstanceCount:1/0,Ft=Math.min(ft.instanceCount,Tt);Gt.renderInstances(_t,Dt,Ft)}else Gt.render(_t,Dt)};function le(U,rt,ft){U.transparent===!0&&U.side===ze&&U.forceSinglePass===!1?(U.side=ln,U.needsUpdate=!0,Hi(U,rt,ft),U.side=wi,U.needsUpdate=!0,Hi(U,rt,ft),U.side=ze):Hi(U,rt,ft)}this.compile=function(U,rt,ft=null){ft===null&&(ft=U),m=Wt.get(ft),m.init(),y.push(m),ft.traverseVisible(function(ut){ut.isLight&&ut.layers.test(rt.layers)&&(m.pushLight(ut),ut.castShadow&&m.pushShadow(ut))}),U!==ft&&U.traverseVisible(function(ut){ut.isLight&&ut.layers.test(rt.layers)&&(m.pushLight(ut),ut.castShadow&&m.pushShadow(ut))}),m.setupLights(_._useLegacyLights);let dt=new Set;return U.traverse(function(ut){let zt=ut.material;if(zt)if(Array.isArray(zt))for(let T=0;T<zt.length;T++){let W=zt[T];le(W,ft,ut),dt.add(W)}else le(zt,ft,ut),dt.add(zt)}),y.pop(),m=null,dt},this.compileAsync=function(U,rt,ft=null){let dt=this.compile(U,rt,ft);return new Promise(ut=>{function zt(){if(dt.forEach(function(T){et.get(T).currentProgram.isReady()&&dt.delete(T)}),dt.size===0){ut(U);return}setTimeout(zt,10)}j.get("KHR_parallel_shader_compile")!==null?zt():setTimeout(zt,10)})};let he=null;function we(U){he&&he(U)}function Le(){De.stop()}function ue(){De.start()}let De=new vd;De.setAnimationLoop(we),typeof self<"u"&&De.setContext(self),this.setAnimationLoop=function(U){he=U,ne.setAnimationLoop(U),U===null?De.stop():De.start()},ne.addEventListener("sessionstart",Le),ne.addEventListener("sessionend",ue),this.render=function(U,rt){if(rt!==void 0&&rt.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),rt.parent===null&&rt.matrixWorldAutoUpdate===!0&&rt.updateMatrixWorld(),ne.enabled===!0&&ne.isPresenting===!0&&(ne.cameraAutoUpdate===!0&&ne.updateCamera(rt),rt=ne.getCamera()),U.isScene===!0&&U.onBeforeRender(_,U,rt,w),m=Wt.get(U,y.length),m.init(),y.push(m),ht.multiplyMatrices(rt.projectionMatrix,rt.matrixWorldInverse),Y.setFromProjectionMatrix(ht),ot=this.localClippingEnabled,st=te.init(this.clippingPlanes,ot),g=Ot.get(U,f.length),g.init(),f.push(g),Ge(U,rt,0,_.sortObjects),g.finish(),_.sortObjects===!0&&g.sort(H,G),this.info.render.frame++,st===!0&&te.beginShadows();let ft=m.state.shadowsArray;if(bt.render(ft,U,rt),st===!0&&te.endShadows(),this.info.autoReset===!0&&this.info.reset(),ae.render(g,U),m.setupLights(_._useLegacyLights),rt.isArrayCamera){let dt=rt.cameras;for(let ut=0,zt=dt.length;ut<zt;ut++){let T=dt[ut];ys(g,U,T,T.viewport)}}else ys(g,U,rt);w!==null&&(L.updateMultisampleRenderTarget(w),L.updateRenderTargetMipmap(w)),U.isScene===!0&&U.onAfterRender(_,U,rt),Xt.resetDefaultState(),R=-1,b=null,y.pop(),y.length>0?m=y[y.length-1]:m=null,f.pop(),f.length>0?g=f[f.length-1]:g=null};function Ge(U,rt,ft,dt){if(U.visible===!1)return;if(U.layers.test(rt.layers)){if(U.isGroup)ft=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(rt);else if(U.isLight)m.pushLight(U),U.castShadow&&m.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||Y.intersectsSprite(U)){dt&&at.setFromMatrixPosition(U.matrixWorld).applyMatrix4(ht);let T=xt.update(U),W=U.material;W.visible&&g.push(U,T,W,ft,at.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||Y.intersectsObject(U))){let T=xt.update(U),W=U.material;if(dt&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),at.copy(U.boundingSphere.center)):(T.boundingSphere===null&&T.computeBoundingSphere(),at.copy(T.boundingSphere.center)),at.applyMatrix4(U.matrixWorld).applyMatrix4(ht)),Array.isArray(W)){let X=T.groups;for(let q=0,J=X.length;q<J;q++){let it=X[q],_t=W[it.materialIndex];_t&&_t.visible&&g.push(U,T,_t,ft,at.z,it)}}else W.visible&&g.push(U,T,W,ft,at.z,null)}}let zt=U.children;for(let T=0,W=zt.length;T<W;T++)Ge(zt[T],rt,ft,dt)}function ys(U,rt,ft,dt){let ut=U.opaque,zt=U.transmissive,T=U.transparent;m.setupLightsView(ft),st===!0&&te.setGlobalState(_.clippingPlanes,ft),zt.length>0&&Po(ut,zt,rt,ft),dt&&nt.viewport(v.copy(dt)),ut.length>0&&ki(ut,rt,ft),zt.length>0&&ki(zt,rt,ft),T.length>0&&ki(T,rt,ft),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function Po(U,rt,ft,dt){if((ft.isScene===!0?ft.overrideMaterial:null)!==null)return;let zt=tt.isWebGL2;Q===null&&(Q=new si(1,1,{generateMipmaps:!0,type:j.has("EXT_color_buffer_half_float")?Br:Si,minFilter:Fr,samples:zt?4:0})),_.getDrawingBufferSize(ct),zt?Q.setSize(ct.x,ct.y):Q.setSize(pa(ct.x),pa(ct.y));let T=_.getRenderTarget();_.setRenderTarget(Q),_.getClearColor(z),P=_.getClearAlpha(),P<1&&_.setClearColor(16777215,.5),_.clear();let W=_.toneMapping;_.toneMapping=Ei,ki(U,ft,dt),L.updateMultisampleRenderTarget(Q),L.updateRenderTargetMipmap(Q);let X=!1;for(let q=0,J=rt.length;q<J;q++){let it=rt[q],_t=it.object,Ct=it.geometry,Dt=it.material,qt=it.group;if(Dt.side===ze&&_t.layers.test(dt.layers)){let Gt=Dt.side;Dt.side=ln,Dt.needsUpdate=!0,vs(_t,ft,dt,Ct,Dt,qt),Dt.side=Gt,Dt.needsUpdate=!0,X=!0}}X===!0&&(L.updateMultisampleRenderTarget(Q),L.updateRenderTargetMipmap(Q)),_.setRenderTarget(T),_.setClearColor(z,P),_.toneMapping=W}function ki(U,rt,ft){let dt=rt.isScene===!0?rt.overrideMaterial:null;for(let ut=0,zt=U.length;ut<zt;ut++){let T=U[ut],W=T.object,X=T.geometry,q=dt===null?T.material:dt,J=T.group;W.layers.test(ft.layers)&&vs(W,rt,ft,X,q,J)}}function vs(U,rt,ft,dt,ut,zt){U.onBeforeRender(_,rt,ft,dt,ut,zt),U.modelViewMatrix.multiplyMatrices(ft.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),ut.onBeforeRender(_,rt,ft,dt,U,zt),ut.transparent===!0&&ut.side===ze&&ut.forceSinglePass===!1?(ut.side=ln,ut.needsUpdate=!0,_.renderBufferDirect(ft,rt,dt,ut,U,zt),ut.side=wi,ut.needsUpdate=!0,_.renderBufferDirect(ft,rt,dt,ut,U,zt),ut.side=ze):_.renderBufferDirect(ft,rt,dt,ut,U,zt),U.onAfterRender(_,rt,ft,dt,ut,zt)}function Hi(U,rt,ft){rt.isScene!==!0&&(rt=mt);let dt=et.get(U),ut=m.state.lights,zt=m.state.shadowsArray,T=ut.state.version,W=Nt.getParameters(U,ut.state,zt,rt,ft),X=Nt.getProgramCacheKey(W),q=dt.programs;dt.environment=U.isMeshStandardMaterial?rt.environment:null,dt.fog=rt.fog,dt.envMap=(U.isMeshStandardMaterial?Z:C).get(U.envMap||dt.environment),q===void 0&&(U.addEventListener("dispose",Ut),q=new Map,dt.programs=q);let J=q.get(X);if(J!==void 0){if(dt.currentProgram===J&&dt.lightsStateVersion===T)return Sr(U,W),J}else W.uniforms=Nt.getUniforms(U),U.onBuild(ft,W,_),U.onBeforeCompile(W,_),J=Nt.acquireProgram(W,X),q.set(X,J),dt.uniforms=W.uniforms;let it=dt.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(it.clippingPlanes=te.uniform),Sr(U,W),dt.needsLights=Do(U),dt.lightsStateVersion=T,dt.needsLights&&(it.ambientLightColor.value=ut.state.ambient,it.lightProbe.value=ut.state.probe,it.directionalLights.value=ut.state.directional,it.directionalLightShadows.value=ut.state.directionalShadow,it.spotLights.value=ut.state.spot,it.spotLightShadows.value=ut.state.spotShadow,it.rectAreaLights.value=ut.state.rectArea,it.ltc_1.value=ut.state.rectAreaLTC1,it.ltc_2.value=ut.state.rectAreaLTC2,it.pointLights.value=ut.state.point,it.pointLightShadows.value=ut.state.pointShadow,it.hemisphereLights.value=ut.state.hemi,it.directionalShadowMap.value=ut.state.directionalShadowMap,it.directionalShadowMatrix.value=ut.state.directionalShadowMatrix,it.spotShadowMap.value=ut.state.spotShadowMap,it.spotLightMatrix.value=ut.state.spotLightMatrix,it.spotLightMap.value=ut.state.spotLightMap,it.pointShadowMap.value=ut.state.pointShadowMap,it.pointShadowMatrix.value=ut.state.pointShadowMatrix),dt.currentProgram=J,dt.uniformsList=null,J}function Io(U){if(U.uniformsList===null){let rt=U.currentProgram.getUniforms();U.uniformsList=qs.seqWithValue(rt.seq,U.uniforms)}return U.uniformsList}function Sr(U,rt){let ft=et.get(U);ft.outputColorSpace=rt.outputColorSpace,ft.batching=rt.batching,ft.instancing=rt.instancing,ft.instancingColor=rt.instancingColor,ft.skinning=rt.skinning,ft.morphTargets=rt.morphTargets,ft.morphNormals=rt.morphNormals,ft.morphColors=rt.morphColors,ft.morphTargetsCount=rt.morphTargetsCount,ft.numClippingPlanes=rt.numClippingPlanes,ft.numIntersection=rt.numClipIntersection,ft.vertexAlphas=rt.vertexAlphas,ft.vertexTangents=rt.vertexTangents,ft.toneMapping=rt.toneMapping}function Lo(U,rt,ft,dt,ut){rt.isScene!==!0&&(rt=mt),L.resetTextureUnits();let zt=rt.fog,T=dt.isMeshStandardMaterial?rt.environment:null,W=w===null?_.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ii,X=(dt.isMeshStandardMaterial?Z:C).get(dt.envMap||T),q=dt.vertexColors===!0&&!!ft.attributes.color&&ft.attributes.color.itemSize===4,J=!!ft.attributes.tangent&&(!!dt.normalMap||dt.anisotropy>0),it=!!ft.morphAttributes.position,_t=!!ft.morphAttributes.normal,Ct=!!ft.morphAttributes.color,Dt=Ei;dt.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Dt=_.toneMapping);let qt=ft.morphAttributes.position||ft.morphAttributes.normal||ft.morphAttributes.color,Gt=qt!==void 0?qt.length:0,Tt=et.get(dt),Ft=m.state.lights;if(st===!0&&(ot===!0||U!==b)){let wn=U===b&&dt.id===R;te.setState(dt,U,wn)}let Lt=!1;dt.version===Tt.__version?(Tt.needsLights&&Tt.lightsStateVersion!==Ft.state.version||Tt.outputColorSpace!==W||ut.isBatchedMesh&&Tt.batching===!1||!ut.isBatchedMesh&&Tt.batching===!0||ut.isInstancedMesh&&Tt.instancing===!1||!ut.isInstancedMesh&&Tt.instancing===!0||ut.isSkinnedMesh&&Tt.skinning===!1||!ut.isSkinnedMesh&&Tt.skinning===!0||ut.isInstancedMesh&&Tt.instancingColor===!0&&ut.instanceColor===null||ut.isInstancedMesh&&Tt.instancingColor===!1&&ut.instanceColor!==null||Tt.envMap!==X||dt.fog===!0&&Tt.fog!==zt||Tt.numClippingPlanes!==void 0&&(Tt.numClippingPlanes!==te.numPlanes||Tt.numIntersection!==te.numIntersection)||Tt.vertexAlphas!==q||Tt.vertexTangents!==J||Tt.morphTargets!==it||Tt.morphNormals!==_t||Tt.morphColors!==Ct||Tt.toneMapping!==Dt||tt.isWebGL2===!0&&Tt.morphTargetsCount!==Gt)&&(Lt=!0):(Lt=!0,Tt.__version=dt.version);let ce=Tt.currentProgram;Lt===!0&&(ce=Hi(dt,rt,ut));let Ue=!1,Ke=!1,Ms=!1,je=ce.getUniforms(),Gi=Tt.uniforms;if(nt.useProgram(ce.program)&&(Ue=!0,Ke=!0,Ms=!0),dt.id!==R&&(R=dt.id,Ke=!0),Ue||b!==U){je.setValue(F,"projectionMatrix",U.projectionMatrix),je.setValue(F,"viewMatrix",U.matrixWorldInverse);let wn=je.map.cameraPosition;wn!==void 0&&wn.setValue(F,at.setFromMatrixPosition(U.matrixWorld)),tt.logarithmicDepthBuffer&&je.setValue(F,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(dt.isMeshPhongMaterial||dt.isMeshToonMaterial||dt.isMeshLambertMaterial||dt.isMeshBasicMaterial||dt.isMeshStandardMaterial||dt.isShaderMaterial)&&je.setValue(F,"isOrthographic",U.isOrthographicCamera===!0),b!==U&&(b=U,Ke=!0,Ms=!0)}if(ut.isSkinnedMesh){je.setOptional(F,ut,"bindMatrix"),je.setOptional(F,ut,"bindMatrixInverse");let wn=ut.skeleton;wn&&(tt.floatVertexTextures?(wn.boneTexture===null&&wn.computeBoneTexture(),je.setValue(F,"boneTexture",wn.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ut.isBatchedMesh&&(je.setOptional(F,ut,"batchingTexture"),je.setValue(F,"batchingTexture",ut._matricesTexture,L));let zc=ft.morphAttributes;if((zc.position!==void 0||zc.normal!==void 0||zc.color!==void 0&&tt.isWebGL2===!0)&&ee.update(ut,ft,ce),(Ke||Tt.receiveShadow!==ut.receiveShadow)&&(Tt.receiveShadow=ut.receiveShadow,je.setValue(F,"receiveShadow",ut.receiveShadow)),dt.isMeshGouraudMaterial&&dt.envMap!==null&&(Gi.envMap.value=X,Gi.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1),Ke&&(je.setValue(F,"toneMappingExposure",_.toneMappingExposure),Tt.needsLights&&pi(Gi,Ms),zt&&dt.fog===!0&&Pt.refreshFogUniforms(Gi,zt),Pt.refreshMaterialUniforms(Gi,dt,V,N,Q),qs.upload(F,Io(Tt),Gi,L)),dt.isShaderMaterial&&dt.uniformsNeedUpdate===!0&&(qs.upload(F,Io(Tt),Gi,L),dt.uniformsNeedUpdate=!1),dt.isSpriteMaterial&&je.setValue(F,"center",ut.center),je.setValue(F,"modelViewMatrix",ut.modelViewMatrix),je.setValue(F,"normalMatrix",ut.normalMatrix),je.setValue(F,"modelMatrix",ut.matrixWorld),dt.isShaderMaterial||dt.isRawShaderMaterial){let wn=dt.uniformsGroups;for(let Oc=0,Tg=wn.length;Oc<Tg;Oc++)if(tt.isWebGL2){let yu=wn[Oc];se.update(yu,ce),se.bind(yu,ce)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ce}function pi(U,rt){U.ambientLightColor.needsUpdate=rt,U.lightProbe.needsUpdate=rt,U.directionalLights.needsUpdate=rt,U.directionalLightShadows.needsUpdate=rt,U.pointLights.needsUpdate=rt,U.pointLightShadows.needsUpdate=rt,U.spotLights.needsUpdate=rt,U.spotLightShadows.needsUpdate=rt,U.rectAreaLights.needsUpdate=rt,U.hemisphereLights.needsUpdate=rt}function Do(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(U,rt,ft){et.get(U.texture).__webglTexture=rt,et.get(U.depthTexture).__webglTexture=ft;let dt=et.get(U);dt.__hasExternalTextures=!0,dt.__hasExternalTextures&&(dt.__autoAllocateDepthBuffer=ft===void 0,dt.__autoAllocateDepthBuffer||j.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),dt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(U,rt){let ft=et.get(U);ft.__webglFramebuffer=rt,ft.__useDefaultFramebuffer=rt===void 0},this.setRenderTarget=function(U,rt=0,ft=0){w=U,E=rt,S=ft;let dt=!0,ut=null,zt=!1,T=!1;if(U){let X=et.get(U);X.__useDefaultFramebuffer!==void 0?(nt.bindFramebuffer(F.FRAMEBUFFER,null),dt=!1):X.__webglFramebuffer===void 0?L.setupRenderTarget(U):X.__hasExternalTextures&&L.rebindTextures(U,et.get(U.texture).__webglTexture,et.get(U.depthTexture).__webglTexture);let q=U.texture;(q.isData3DTexture||q.isDataArrayTexture||q.isCompressedArrayTexture)&&(T=!0);let J=et.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(J[rt])?ut=J[rt][ft]:ut=J[rt],zt=!0):tt.isWebGL2&&U.samples>0&&L.useMultisampledRTT(U)===!1?ut=et.get(U).__webglMultisampledFramebuffer:Array.isArray(J)?ut=J[ft]:ut=J,v.copy(U.viewport),A.copy(U.scissor),I=U.scissorTest}else v.copy(O).multiplyScalar(V).floor(),A.copy(B).multiplyScalar(V).floor(),I=K;if(nt.bindFramebuffer(F.FRAMEBUFFER,ut)&&tt.drawBuffers&&dt&&nt.drawBuffers(U,ut),nt.viewport(v),nt.scissor(A),nt.setScissorTest(I),zt){let X=et.get(U.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+rt,X.__webglTexture,ft)}else if(T){let X=et.get(U.texture),q=rt||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.__webglTexture,ft||0,q)}R=-1},this.readRenderTargetPixels=function(U,rt,ft,dt,ut,zt,T){if(!(U&&U.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let W=et.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&T!==void 0&&(W=W[T]),W){nt.bindFramebuffer(F.FRAMEBUFFER,W);try{let X=U.texture,q=X.format,J=X.type;if(q!==Hn&&Bt.convert(q)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let it=J===Br&&(j.has("EXT_color_buffer_half_float")||tt.isWebGL2&&j.has("EXT_color_buffer_float"));if(J!==Si&&Bt.convert(J)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(J===Mi&&(tt.isWebGL2||j.has("OES_texture_float")||j.has("WEBGL_color_buffer_float")))&&!it){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}rt>=0&&rt<=U.width-dt&&ft>=0&&ft<=U.height-ut&&F.readPixels(rt,ft,dt,ut,Bt.convert(q),Bt.convert(J),zt)}finally{let X=w!==null?et.get(w).__webglFramebuffer:null;nt.bindFramebuffer(F.FRAMEBUFFER,X)}}},this.copyFramebufferToTexture=function(U,rt,ft=0){let dt=Math.pow(2,-ft),ut=Math.floor(rt.image.width*dt),zt=Math.floor(rt.image.height*dt);L.setTexture2D(rt,0),F.copyTexSubImage2D(F.TEXTURE_2D,ft,0,0,U.x,U.y,ut,zt),nt.unbindTexture()},this.copyTextureToTexture=function(U,rt,ft,dt=0){let ut=rt.image.width,zt=rt.image.height,T=Bt.convert(ft.format),W=Bt.convert(ft.type);L.setTexture2D(ft,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,ft.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,ft.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,ft.unpackAlignment),rt.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,dt,U.x,U.y,ut,zt,T,W,rt.image.data):rt.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,dt,U.x,U.y,rt.mipmaps[0].width,rt.mipmaps[0].height,T,rt.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,dt,U.x,U.y,T,W,rt.image),dt===0&&ft.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),nt.unbindTexture()},this.copyTextureToTexture3D=function(U,rt,ft,dt,ut=0){if(_.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let zt=U.max.x-U.min.x+1,T=U.max.y-U.min.y+1,W=U.max.z-U.min.z+1,X=Bt.convert(dt.format),q=Bt.convert(dt.type),J;if(dt.isData3DTexture)L.setTexture3D(dt,0),J=F.TEXTURE_3D;else if(dt.isDataArrayTexture||dt.isCompressedArrayTexture)L.setTexture2DArray(dt,0),J=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,dt.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,dt.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,dt.unpackAlignment);let it=F.getParameter(F.UNPACK_ROW_LENGTH),_t=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Ct=F.getParameter(F.UNPACK_SKIP_PIXELS),Dt=F.getParameter(F.UNPACK_SKIP_ROWS),qt=F.getParameter(F.UNPACK_SKIP_IMAGES),Gt=ft.isCompressedTexture?ft.mipmaps[ut]:ft.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,Gt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Gt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,U.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,U.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,U.min.z),ft.isDataTexture||ft.isData3DTexture?F.texSubImage3D(J,ut,rt.x,rt.y,rt.z,zt,T,W,X,q,Gt.data):ft.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(J,ut,rt.x,rt.y,rt.z,zt,T,W,X,Gt.data)):F.texSubImage3D(J,ut,rt.x,rt.y,rt.z,zt,T,W,X,q,Gt),F.pixelStorei(F.UNPACK_ROW_LENGTH,it),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,_t),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Ct),F.pixelStorei(F.UNPACK_SKIP_ROWS,Dt),F.pixelStorei(F.UNPACK_SKIP_IMAGES,qt),ut===0&&dt.generateMipmaps&&F.generateMipmap(J),nt.unbindTexture()},this.initTexture=function(U){U.isCubeTexture?L.setTextureCube(U,0):U.isData3DTexture?L.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?L.setTexture2DArray(U,0):L.setTexture2D(U,0),nt.unbindTexture()},this.resetState=function(){E=0,S=0,w=null,nt.reset(),Xt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ni}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===gh?"display-p3":"srgb",e.unpackColorSpace=fe.workingColorSpace===Ba?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Ze?ji:pd}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===ji?Ze:ii}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},kl=class extends Wr{};kl.prototype.isWebGL1Renderer=!0;var Ta=class extends Oe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var Aa=class extends Rn{constructor(t=null,e=1,i=1,s,r,o,a,c,l=$e,h=$e,u,d){super(null,o,a,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xr=class extends Ie{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},Fs=new me,Wf=new me,na=[],Xf=new ri,z1=new me,Cr=new Vt,Pr=new Ri,qr=class extends Vt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Xr(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,z1)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ri),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Fs),Xf.copy(t.boundingBox).applyMatrix4(Fs),this.boundingBox.union(Xf)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ri),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Fs),Pr.copy(t.boundingSphere).applyMatrix4(Fs),this.boundingSphere.union(Pr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Cr.geometry=this.geometry,Cr.material=this.material,Cr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Pr.copy(this.boundingSphere),Pr.applyMatrix4(i),t.ray.intersectsSphere(Pr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Fs),Wf.multiplyMatrices(i,Fs),Cr.matrixWorld=Wf,Cr.raycast(t,na);for(let o=0,a=na.length;o<a;o++){let c=na[o];c.instanceId=r,c.object=this,e.push(c)}na.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Xr(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Cn=class extends Ci{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new yt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},qf=new k,Yf=new k,$f=new me,dl=new Hr,ia=new Ri,Hl=class extends Oe{constructor(t=new oe,e=new Cn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)qf.fromBufferAttribute(e,s-1),Yf.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=qf.distanceTo(Yf);t.setAttribute("lineDistance",new Yt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),ia.copy(i.boundingSphere),ia.applyMatrix4(s),ia.radius+=r,t.ray.intersectsSphere(ia)===!1)return;$f.copy(s).invert(),dl.copy(t.ray).applyMatrix4($f);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new k,h=new k,u=new k,d=new k,p=this.isLineSegments?2:1,x=i.index,m=i.attributes.position;if(x!==null){let f=Math.max(0,o.start),y=Math.min(x.count,o.start+o.count);for(let _=f,M=y-1;_<M;_+=p){let E=x.getX(_),S=x.getX(_+1);if(l.fromBufferAttribute(m,E),h.fromBufferAttribute(m,S),dl.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let R=t.ray.origin.distanceTo(d);R<t.near||R>t.far||e.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}else{let f=Math.max(0,o.start),y=Math.min(m.count,o.start+o.count);for(let _=f,M=y-1;_<M;_+=p){if(l.fromBufferAttribute(m,_),h.fromBufferAttribute(m,_+1),dl.distanceSqToSegment(l,h,d,u)>c)continue;d.applyMatrix4(this.matrixWorld);let S=t.ray.origin.distanceTo(d);S<t.near||S>t.far||e.push({distance:S,point:u.clone().applyMatrix4(this.matrixWorld),index:_,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},Zf=new k,Jf=new k,Gn=class extends Hl{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)Zf.fromBufferAttribute(e,s),Jf.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+Zf.distanceTo(Jf);t.setAttribute("lineDistance",new Yt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Pn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let h=i[s],d=i[s+1]-h,p=(o-h)/d;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new At:new k);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new k,s=[],r=[],o=[],a=new k,c=new me;for(let p=0;p<=t;p++){let x=p/t;s[p]=this.getTangentAt(x,new k)}r[0]=new k,o[0]=new k;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),d=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),d<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos(We(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,x))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(We(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],p*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Yr=class extends Pn{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){let i=e||new At,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,p=l-this.aY;c=d*h-p*u+this.aX,l=d*u+p*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},Gl=class extends Yr{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function yh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,p*=h,s(o,a,d,p)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var sa=new k,pl=new yh,ml=new yh,gl=new yh,yn=class extends Pn{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new k){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(sa.subVectors(s[0],s[1]).add(s[0]),l=sa);let u=s[a%r],d=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(sa.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=sa),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,x=Math.pow(l.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(h),p);g<1e-4&&(g=1),x<1e-4&&(x=g),m<1e-4&&(m=g),pl.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,x,g,m),ml.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,x,g,m),gl.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,x,g,m)}else this.curveType==="catmullrom"&&(pl.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ml.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),gl.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return i.set(pl.calc(c),ml.calc(c),gl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new k().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Kf(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function O1(n,t){let e=1-n;return e*e*t}function F1(n,t){return 2*(1-n)*n*t}function B1(n,t){return n*n*t}function Nr(n,t,e,i){return O1(n,t)+F1(n,e)+B1(n,i)}function k1(n,t){let e=1-n;return e*e*e*t}function H1(n,t){let e=1-n;return 3*e*e*n*t}function G1(n,t){return 3*(1-n)*n*n*t}function V1(n,t){return n*n*n*t}function zr(n,t,e,i,s){return k1(n,t)+H1(n,e)+G1(n,i)+V1(n,s)}var Ra=class extends Pn{constructor(t=new At,e=new At,i=new At,s=new At){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new At){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(zr(t,s.x,r.x,o.x,a.x),zr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Vl=class extends Pn{constructor(t=new k,e=new k,i=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new k){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(zr(t,s.x,r.x,o.x,a.x),zr(t,s.y,r.y,o.y,a.y),zr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},Ca=class extends Pn{constructor(t=new At,e=new At){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new At){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new At){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Wl=class extends Pn{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Pa=class extends Pn{constructor(t=new At,e=new At,i=new At){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new At){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Nr(t,s.x,r.x,o.x),Nr(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Xl=class extends Pn{constructor(t=new k,e=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new k){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set(Nr(t,s.x,r.x,o.x),Nr(t,s.y,r.y,o.y),Nr(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ia=class extends Pn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new At){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(Kf(a,c.x,l.x,h.x,u.x),Kf(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new At().fromArray(s))}return this}},ql=Object.freeze({__proto__:null,ArcCurve:Gl,CatmullRomCurve3:yn,CubicBezierCurve:Ra,CubicBezierCurve3:Vl,EllipseCurve:Yr,LineCurve:Ca,LineCurve3:Wl,QuadraticBezierCurve:Pa,QuadraticBezierCurve3:Xl,SplineCurve:Ia}),Yl=class extends Pn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ql[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new ql[s.type]().fromJSON(s))}return this}},$r=class extends Yl{constructor(t){super(),this.type="Path",this.currentPoint=new At,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new Ca(this.currentPoint.clone(),new At(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Pa(this.currentPoint.clone(),new At(t,e),new At(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Ra(this.currentPoint.clone(),new At(t,e),new At(i,s),new At(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new Ia(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){let l=new Yr(t,e,i,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},$l=class n extends oe{constructor(t=[new At(0,-.5),new At(.5,0),new At(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=We(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new k,d=new At,p=new k,x=new k,g=new k,m=0,f=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,f=t[y+1].y-t[y].y,p.x=f*1,p.y=-m,p.z=f*0,g.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(g.x,g.y,g.z);break;default:m=t[y+1].x-t[y].x,f=t[y+1].y-t[y].y,p.x=f*1,p.y=-m,p.z=f*0,x.copy(p),p.x+=g.x,p.y+=g.y,p.z+=g.z,p.normalize(),c.push(p.x,p.y,p.z),g.copy(x)}for(let y=0;y<=e;y++){let _=i+y*h*s,M=Math.sin(_),E=Math.cos(_);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*M,u.y=t[S].y,u.z=t[S].x*E,o.push(u.x,u.y,u.z),d.x=y/e,d.y=S/(t.length-1),a.push(d.x,d.y);let w=c[3*S+0]*M,R=c[3*S+1],b=c[3*S+0]*E;l.push(w,R,b)}}for(let y=0;y<e;y++)for(let _=0;_<t.length-1;_++){let M=_+y*t.length,E=M,S=M+t.length,w=M+t.length+1,R=M+1;r.push(E,S,R),r.push(w,R,S)}this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("uv",new Yt(a,2)),this.setAttribute("normal",new Yt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}},Zr=class n extends $l{constructor(t=1,e=1,i=4,s=8){let r=new $r;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:s}}static fromJSON(t){return new n(t.radius,t.length,t.capSegments,t.radialSegments)}},La=class n extends oe{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new k,h=new At;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){let p=i+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Yt(o,3)),this.setAttribute("normal",new Yt(a,3)),this.setAttribute("uv",new Yt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},hn=class n extends oe{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],x=0,g=[],m=i/2,f=0;y(),o===!1&&(t>0&&_(!0),e>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Yt(u,3)),this.setAttribute("normal",new Yt(d,3)),this.setAttribute("uv",new Yt(p,2));function y(){let M=new k,E=new k,S=0,w=(e-t)/i;for(let R=0;R<=r;R++){let b=[],v=R/r,A=v*(e-t)+t;for(let I=0;I<=s;I++){let z=I/s,P=z*c+a,D=Math.sin(P),N=Math.cos(P);E.x=A*D,E.y=-v*i+m,E.z=A*N,u.push(E.x,E.y,E.z),M.set(D,w,N).normalize(),d.push(M.x,M.y,M.z),p.push(z,1-v),b.push(x++)}g.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){let v=g[b][R],A=g[b+1][R],I=g[b+1][R+1],z=g[b][R+1];h.push(v,A,z),h.push(A,I,z),S+=6}l.addGroup(f,S,0),f+=S}function _(M){let E=x,S=new At,w=new k,R=0,b=M===!0?t:e,v=M===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*v,0),d.push(0,v,0),p.push(.5,.5),x++;let A=x;for(let I=0;I<=s;I++){let P=I/s*c+a,D=Math.cos(P),N=Math.sin(P);w.x=b*N,w.y=m*v,w.z=b*D,u.push(w.x,w.y,w.z),d.push(0,v,0),S.x=D*.5+.5,S.y=N*.5*v+.5,p.push(S.x,S.y),x++}for(let I=0;I<s;I++){let z=E+I,P=A+I;M===!0?h.push(P,P+1,z):h.push(P+1,P,z),R+=3}l.addGroup(f,R,M===!0?1:2),f+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Qi=class n extends hn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zl=class n extends oe{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new Yt(r,3)),this.setAttribute("normal",new Yt(r.slice(),3)),this.setAttribute("uv",new Yt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(y){let _=new k,M=new k,E=new k;for(let S=0;S<e.length;S+=3)p(e[S+0],_),p(e[S+1],M),p(e[S+2],E),c(_,M,E,y)}function c(y,_,M,E){let S=E+1,w=[];for(let R=0;R<=S;R++){w[R]=[];let b=y.clone().lerp(M,R/S),v=_.clone().lerp(M,R/S),A=S-R;for(let I=0;I<=A;I++)I===0&&R===S?w[R][I]=b:w[R][I]=b.clone().lerp(v,I/A)}for(let R=0;R<S;R++)for(let b=0;b<2*(S-R)-1;b++){let v=Math.floor(b/2);b%2===0?(d(w[R][v+1]),d(w[R+1][v]),d(w[R][v])):(d(w[R][v+1]),d(w[R+1][v+1]),d(w[R+1][v]))}}function l(y){let _=new k;for(let M=0;M<r.length;M+=3)_.x=r[M+0],_.y=r[M+1],_.z=r[M+2],_.normalize().multiplyScalar(y),r[M+0]=_.x,r[M+1]=_.y,r[M+2]=_.z}function h(){let y=new k;for(let _=0;_<r.length;_+=3){y.x=r[_+0],y.y=r[_+1],y.z=r[_+2];let M=m(y)/2/Math.PI+.5,E=f(y)/Math.PI+.5;o.push(M,1-E)}x(),u()}function u(){for(let y=0;y<o.length;y+=6){let _=o[y+0],M=o[y+2],E=o[y+4],S=Math.max(_,M,E),w=Math.min(_,M,E);S>.9&&w<.1&&(_<.2&&(o[y+0]+=1),M<.2&&(o[y+2]+=1),E<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function p(y,_){let M=y*3;_.x=t[M+0],_.y=t[M+1],_.z=t[M+2]}function x(){let y=new k,_=new k,M=new k,E=new k,S=new At,w=new At,R=new At;for(let b=0,v=0;b<r.length;b+=9,v+=6){y.set(r[b+0],r[b+1],r[b+2]),_.set(r[b+3],r[b+4],r[b+5]),M.set(r[b+6],r[b+7],r[b+8]),S.set(o[v+0],o[v+1]),w.set(o[v+2],o[v+3]),R.set(o[v+4],o[v+5]),E.copy(y).add(_).add(M).divideScalar(3);let A=m(E);g(S,v+0,y,A),g(w,v+2,_,A),g(R,v+4,M,A)}}function g(y,_,M,E){E<0&&y.x===1&&(o[_]=y.x-1),M.x===0&&M.z===0&&(o[_]=E/2/Math.PI+.5)}function m(y){return Math.atan2(y.z,-y.x)}function f(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var Pi=class extends $r{constructor(t){super(t),this.uuid=rs(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new $r().fromJSON(s))}return this}},W1={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=Td(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,p;if(i&&(r=Z1(n,t,r,e)),n.length>80*e){a=l=n[0],c=h=n[1];for(let x=e;x<s;x+=e)u=n[x],d=n[x+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return Jr(r,o,e,a,c,p,0),o}};function Td(n,t,e,i,s){let r,o;if(s===oM(n,t,e,i)>0)for(r=t;r<e;r+=i)o=jf(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=jf(r,n[r],n[r+1],o);return o&&Ha(o,o.next)&&(jr(o),o=o.next),o}function ts(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(Ha(e,e.next)||Te(e.prev,e,e.next)===0)){if(jr(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function Jr(n,t,e,i,s,r,o){if(!n)return;!o&&r&&tM(n,i,s,r);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?q1(n,i,s,r):X1(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),jr(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=Y1(ts(n),t,e),Jr(n,t,e,i,s,r,2)):o===2&&$1(n,t,e,i,s,r):Jr(ts(n),t,e,i,s,r,1);break}}}function X1(n){let t=n.prev,e=n,i=n.next;if(Te(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l,x=i.next;for(;x!==t;){if(x.x>=h&&x.x<=d&&x.y>=u&&x.y<=p&&Vs(s,a,r,c,o,l,x.x,x.y)&&Te(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function q1(n,t,e,i){let s=n.prev,r=n,o=n.next;if(Te(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,d=o.y,p=a<c?a<l?a:l:c<l?c:l,x=h<u?h<d?h:d:u<d?u:d,g=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,f=Jl(p,x,t,e,i),y=Jl(g,m,t,e,i),_=n.prevZ,M=n.nextZ;for(;_&&_.z>=f&&M&&M.z<=y;){if(_.x>=p&&_.x<=g&&_.y>=x&&_.y<=m&&_!==s&&_!==o&&Vs(a,h,c,u,l,d,_.x,_.y)&&Te(_.prev,_,_.next)>=0||(_=_.prevZ,M.x>=p&&M.x<=g&&M.y>=x&&M.y<=m&&M!==s&&M!==o&&Vs(a,h,c,u,l,d,M.x,M.y)&&Te(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;_&&_.z>=f;){if(_.x>=p&&_.x<=g&&_.y>=x&&_.y<=m&&_!==s&&_!==o&&Vs(a,h,c,u,l,d,_.x,_.y)&&Te(_.prev,_,_.next)>=0)return!1;_=_.prevZ}for(;M&&M.z<=y;){if(M.x>=p&&M.x<=g&&M.y>=x&&M.y<=m&&M!==s&&M!==o&&Vs(a,h,c,u,l,d,M.x,M.y)&&Te(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function Y1(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!Ha(s,r)&&Ad(s,i,i.next,r)&&Kr(s,r)&&Kr(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),jr(i),jr(i.next),i=n=r),i=i.next}while(i!==n);return ts(i)}function $1(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&iM(o,a)){let c=Rd(o,a);o=ts(o,o.next),c=ts(c,c.next),Jr(o,t,e,i,s,r,0),Jr(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function Z1(n,t,e,i){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=Td(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(nM(l));for(s.sort(J1),r=0;r<s.length;r++)e=K1(s[r],e);return e}function J1(n,t){return n.x-t.x}function K1(n,t){let e=j1(n,t);if(!e)return t;let i=Rd(e,n);return ts(i,i.next),ts(e,e.next)}function j1(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>i&&(i=d,s=e.x<e.next.x?e:e.next,d===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Vs(o<l?r:i,o,c,l,o<l?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Kr(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&Q1(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function Q1(n,t){return Te(n.prev,n,t.prev)<0&&Te(t.next,n,n.next)<0}function tM(n,t,e,i){let s=n;do s.z===0&&(s.z=Jl(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,eM(s)}function eM(n){let t,e,i,s,r,o,a,c,l=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(o>1);return n}function Jl(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function nM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Vs(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function iM(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!sM(n,t)&&(Kr(n,t)&&Kr(t,n)&&rM(n,t)&&(Te(n.prev,n,t.prev)||Te(n,t.prev,t))||Ha(n,t)&&Te(n.prev,n,n.next)>0&&Te(t.prev,t,t.next)>0)}function Te(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function Ha(n,t){return n.x===t.x&&n.y===t.y}function Ad(n,t,e,i){let s=oa(Te(n,t,e)),r=oa(Te(n,t,i)),o=oa(Te(e,i,n)),a=oa(Te(e,i,t));return!!(s!==r&&o!==a||s===0&&ra(n,e,t)||r===0&&ra(n,i,t)||o===0&&ra(e,n,i)||a===0&&ra(e,t,i))}function ra(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function oa(n){return n>0?1:n<0?-1:0}function sM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Ad(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function Kr(n,t){return Te(n.prev,n,n.next)<0?Te(n,t,n.next)>=0&&Te(n,n.prev,t)>=0:Te(n,t,n.prev)<0||Te(n,n.next,t)<0}function rM(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function Rd(n,t){let e=new Kl(n.i,n.x,n.y),i=new Kl(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function jf(n,t,e,i){let s=new Kl(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function jr(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function Kl(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function oM(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var Or=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];Qf(t),td(i,t);let o=t.length;e.forEach(Qf);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,td(i,e[c]);let a=W1.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function Qf(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function td(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var es=class n extends oe{constructor(t=new Pi([new At(.5,.5),new At(-.5,.5),new At(-.5,-.5),new At(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new Yt(s,3)),this.setAttribute("uv",new Yt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:p-.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,f=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:aM,_,M=!1,E,S,w,R;f&&(_=f.getSpacedPoints(h),M=!0,d=!1,E=f.computeFrenetFrames(h,!1),S=new k,w=new k,R=new k),d||(m=0,p=0,x=0,g=0);let b=a.extractPoints(l),v=b.shape,A=b.holes;if(!Or.isClockWise(v)){v=v.reverse();for(let F=0,vt=A.length;F<vt;F++){let j=A[F];Or.isClockWise(j)&&(A[F]=j.reverse())}}let z=Or.triangulateShape(v,A),P=v;for(let F=0,vt=A.length;F<vt;F++){let j=A[F];v=v.concat(j)}function D(F,vt,j){return vt||console.error("THREE.ExtrudeGeometry: vec does not exist"),F.clone().addScaledVector(vt,j)}let N=v.length,V=z.length;function H(F,vt,j){let tt,nt,Mt,et=F.x-vt.x,L=F.y-vt.y,C=j.x-F.x,Z=j.y-F.y,gt=et*et+L*L,pt=et*Z-L*C;if(Math.abs(pt)>Number.EPSILON){let xt=Math.sqrt(gt),Nt=Math.sqrt(C*C+Z*Z),Pt=vt.x-L/xt,Ot=vt.y+et/xt,Wt=j.x-Z/Nt,te=j.y+C/Nt,bt=((Wt-Pt)*Z-(te-Ot)*C)/(et*Z-L*C);tt=Pt+et*bt-F.x,nt=Ot+L*bt-F.y;let ae=tt*tt+nt*nt;if(ae<=2)return new At(tt,nt);Mt=Math.sqrt(ae/2)}else{let xt=!1;et>Number.EPSILON?C>Number.EPSILON&&(xt=!0):et<-Number.EPSILON?C<-Number.EPSILON&&(xt=!0):Math.sign(L)===Math.sign(Z)&&(xt=!0),xt?(tt=-L,nt=et,Mt=Math.sqrt(gt)):(tt=et,nt=L,Mt=Math.sqrt(gt/2))}return new At(tt/Mt,nt/Mt)}let G=[];for(let F=0,vt=P.length,j=vt-1,tt=F+1;F<vt;F++,j++,tt++)j===vt&&(j=0),tt===vt&&(tt=0),G[F]=H(P[F],P[j],P[tt]);let O=[],B,K=G.concat();for(let F=0,vt=A.length;F<vt;F++){let j=A[F];B=[];for(let tt=0,nt=j.length,Mt=nt-1,et=tt+1;tt<nt;tt++,Mt++,et++)Mt===nt&&(Mt=0),et===nt&&(et=0),B[tt]=H(j[tt],j[Mt],j[et]);O.push(B),K=K.concat(B)}for(let F=0;F<m;F++){let vt=F/m,j=p*Math.cos(vt*Math.PI/2),tt=x*Math.sin(vt*Math.PI/2)+g;for(let nt=0,Mt=P.length;nt<Mt;nt++){let et=D(P[nt],G[nt],tt);ht(et.x,et.y,-j)}for(let nt=0,Mt=A.length;nt<Mt;nt++){let et=A[nt];B=O[nt];for(let L=0,C=et.length;L<C;L++){let Z=D(et[L],B[L],tt);ht(Z.x,Z.y,-j)}}}let Y=x+g;for(let F=0;F<N;F++){let vt=d?D(v[F],K[F],Y):v[F];M?(w.copy(E.normals[0]).multiplyScalar(vt.x),S.copy(E.binormals[0]).multiplyScalar(vt.y),R.copy(_[0]).add(w).add(S),ht(R.x,R.y,R.z)):ht(vt.x,vt.y,0)}for(let F=1;F<=h;F++)for(let vt=0;vt<N;vt++){let j=d?D(v[vt],K[vt],Y):v[vt];M?(w.copy(E.normals[F]).multiplyScalar(j.x),S.copy(E.binormals[F]).multiplyScalar(j.y),R.copy(_[F]).add(w).add(S),ht(R.x,R.y,R.z)):ht(j.x,j.y,u/h*F)}for(let F=m-1;F>=0;F--){let vt=F/m,j=p*Math.cos(vt*Math.PI/2),tt=x*Math.sin(vt*Math.PI/2)+g;for(let nt=0,Mt=P.length;nt<Mt;nt++){let et=D(P[nt],G[nt],tt);ht(et.x,et.y,u+j)}for(let nt=0,Mt=A.length;nt<Mt;nt++){let et=A[nt];B=O[nt];for(let L=0,C=et.length;L<C;L++){let Z=D(et[L],B[L],tt);M?ht(Z.x,Z.y+_[h-1].y,_[h-1].x+j):ht(Z.x,Z.y,u+j)}}}st(),ot();function st(){let F=s.length/3;if(d){let vt=0,j=N*vt;for(let tt=0;tt<V;tt++){let nt=z[tt];ct(nt[2]+j,nt[1]+j,nt[0]+j)}vt=h+m*2,j=N*vt;for(let tt=0;tt<V;tt++){let nt=z[tt];ct(nt[0]+j,nt[1]+j,nt[2]+j)}}else{for(let vt=0;vt<V;vt++){let j=z[vt];ct(j[2],j[1],j[0])}for(let vt=0;vt<V;vt++){let j=z[vt];ct(j[0]+N*h,j[1]+N*h,j[2]+N*h)}}i.addGroup(F,s.length/3-F,0)}function ot(){let F=s.length/3,vt=0;Q(P,vt),vt+=P.length;for(let j=0,tt=A.length;j<tt;j++){let nt=A[j];Q(nt,vt),vt+=nt.length}i.addGroup(F,s.length/3-F,1)}function Q(F,vt){let j=F.length;for(;--j>=0;){let tt=j,nt=j-1;nt<0&&(nt=F.length-1);for(let Mt=0,et=h+m*2;Mt<et;Mt++){let L=N*Mt,C=N*(Mt+1),Z=vt+tt+L,gt=vt+nt+L,pt=vt+nt+C,xt=vt+tt+C;at(Z,gt,pt,xt)}}}function ht(F,vt,j){c.push(F),c.push(vt),c.push(j)}function ct(F,vt,j){mt(F),mt(vt),mt(j);let tt=s.length/3,nt=y.generateTopUV(i,s,tt-3,tt-2,tt-1);St(nt[0]),St(nt[1]),St(nt[2])}function at(F,vt,j,tt){mt(F),mt(vt),mt(tt),mt(vt),mt(j),mt(tt);let nt=s.length/3,Mt=y.generateSideWallUV(i,s,nt-6,nt-3,nt-2,nt-1);St(Mt[0]),St(Mt[1]),St(Mt[3]),St(Mt[1]),St(Mt[2]),St(Mt[3])}function mt(F){s.push(c[F*3+0]),s.push(c[F*3+1]),s.push(c[F*3+2])}function St(F){r.push(F.x),r.push(F.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return cM(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new ql[s.type]().fromJSON(s)),new n(i,t.options)}},aM={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new At(r,o),new At(a,c),new At(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],d=t[s*3],p=t[s*3+1],x=t[s*3+2],g=t[r*3],m=t[r*3+1],f=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new At(o,1-c),new At(l,1-u),new At(d,1-x),new At(g,1-f)]:[new At(a,1-c),new At(h,1-u),new At(p,1-x),new At(m,1-f)]}};function cM(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ai=class n extends Zl{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var Qr=class n extends oe{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,d=(e-t)/s,p=new k,x=new At;for(let g=0;g<=s;g++){for(let m=0;m<=i;m++){let f=r+m/i*o;p.x=u*Math.cos(f),p.y=u*Math.sin(f),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/e+1)/2,x.y=(p.y/e+1)/2,h.push(x.x,x.y)}u+=d}for(let g=0;g<s;g++){let m=g*(i+1);for(let f=0;f<i;f++){let y=f+m,_=y,M=y+i+1,E=y+i+2,S=y+1;a.push(_,M,S),a.push(M,E,S)}}this.setIndex(a),this.setAttribute("position",new Yt(c,3)),this.setAttribute("normal",new Yt(l,3)),this.setAttribute("uv",new Yt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var un=class n extends oe{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new k,d=new k,p=[],x=[],g=[],m=[];for(let f=0;f<=i;f++){let y=[],_=f/i,M=0;f===0&&o===0?M=.5/e:f===i&&c===Math.PI&&(M=-.5/e);for(let E=0;E<=e;E++){let S=E/e;u.x=-t*Math.cos(s+S*r)*Math.sin(o+_*a),u.y=t*Math.cos(o+_*a),u.z=t*Math.sin(s+S*r)*Math.sin(o+_*a),x.push(u.x,u.y,u.z),d.copy(u).normalize(),g.push(d.x,d.y,d.z),m.push(S+M,1-_),y.push(l++)}h.push(y)}for(let f=0;f<i;f++)for(let y=0;y<e;y++){let _=h[f][y+1],M=h[f][y],E=h[f+1][y],S=h[f+1][y+1];(f!==0||o>0)&&p.push(_,M,S),(f!==i-1||c<Math.PI)&&p.push(M,E,S)}this.setIndex(p),this.setAttribute("position",new Yt(x,3)),this.setAttribute("normal",new Yt(g,3)),this.setAttribute("uv",new Yt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Da=class n extends oe{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new k,u=new k,d=new k;for(let p=0;p<=i;p++)for(let x=0;x<=s;x++){let g=x/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(g),u.y=(t+e*Math.cos(m))*Math.sin(g),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(x/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let x=1;x<=s;x++){let g=(s+1)*p+x-1,m=(s+1)*(p-1)+x-1,f=(s+1)*(p-1)+x,y=(s+1)*p+x;o.push(g,m,y),o.push(m,f,y)}this.setIndex(o),this.setAttribute("position",new Yt(a,3)),this.setAttribute("normal",new Yt(c,3)),this.setAttribute("uv",new Yt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var Ae=class extends Ci{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=md,this.normalScale=new At(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function aa(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function lM(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var tr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},jl=class extends tr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Qu,endingEnd:Qu}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case tf:r=t,a=2*e-i;break;case ef:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case tf:o=t,c=2*i-e;break;case ef:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,x=(i-e)/(s-e),g=x*x,m=g*x,f=-d*m+2*d*g-d*x,y=(1+d)*m+(-1.5-2*d)*g+(-.5+d)*x+1,_=(-1-p)*m+(1.5+p)*g+.5*x,M=p*m-p*g;for(let E=0;E!==a;++E)r[E]=f*o[h+E]+y*o[l+E]+_*o[c+E]+M*o[u+E];return r}},Ql=class extends tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(i-e)/(s-e),u=1-h;for(let d=0;d!==a;++d)r[d]=o[l+d]*u+o[c+d]*h;return r}},th=class extends tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Vn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=aa(e,this.TimeBufferType),this.values=aa(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:aa(t.times,Array),values:aa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new th(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ql(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new jl(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case ca:e=this.InterpolantFactoryMethodDiscrete;break;case la:e=this.InterpolantFactoryMethodLinear;break;case Wc:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ca;case this.InterpolantFactoryMethodLinear:return la;case this.InterpolantFactoryMethodSmooth:return Wc}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&lM(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Wc,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*i,d=u-i,p=u+i;for(let x=0;x!==i;++x){let g=e[u+x];if(g!==e[d+x]||g!==e[p+x]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,d=o*i;for(let p=0;p!==i;++p)e[d+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Vn.prototype.TimeBufferType=Float32Array;Vn.prototype.ValueBufferType=Float32Array;Vn.prototype.DefaultInterpolation=la;var ns=class extends Vn{};ns.prototype.ValueTypeName="bool";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=ca;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;var eh=class extends Vn{};eh.prototype.ValueTypeName="color";var nh=class extends Vn{};nh.prototype.ValueTypeName="number";var ih=class extends tr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)Ai.slerpFlat(r,0,o,l-a,o,l,c);return r}},to=class extends Vn{InterpolantFactoryMethodLinear(t){return new ih(this.times,this.values,this.getValueSize(),t)}};to.prototype.ValueTypeName="quaternion";to.prototype.DefaultInterpolation=la;to.prototype.InterpolantFactoryMethodSmooth=void 0;var is=class extends Vn{};is.prototype.ValueTypeName="string";is.prototype.ValueBufferType=Array;is.prototype.DefaultInterpolation=ca;is.prototype.InterpolantFactoryMethodLinear=void 0;is.prototype.InterpolantFactoryMethodSmooth=void 0;var sh=class extends Vn{};sh.prototype.ValueTypeName="vector";var rh=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){let p=l[u],x=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return x}return null}}},hM=new rh,oh=class{constructor(t){this.manager=t!==void 0?t:hM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};oh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Ua=class extends Oe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Na=class extends Ua{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},xl=new me,ed=new k,nd=new k,ah=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new At(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Vr,this._frameExtents=new At(1,1),this._viewportCount=1,this._viewports=[new Xe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;ed.setFromMatrixPosition(t.matrixWorld),e.position.copy(ed),nd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nd),e.updateMatrixWorld(),xl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(xl),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(xl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var ch=class extends ah{constructor(){super(new Qs(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},za=class extends Ua{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Oe.DEFAULT_UP),this.updateMatrix(),this.target=new Oe,this.shadow=new ch}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var vh="\\[\\]\\.:\\/",uM=new RegExp("["+vh+"]","g"),Mh="[^"+vh+"]",fM="[^"+vh.replace("\\.","")+"]",dM=/((?:WC+[\/:])*)/.source.replace("WC",Mh),pM=/(WCOD+)?/.source.replace("WCOD",fM),mM=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mh),gM=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mh),xM=new RegExp("^"+dM+pM+mM+gM+"$"),_M=["material","materials","bones","map"],lh=class{constructor(t,e,i){let s=i||Me.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Me=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(uM,"")}static parseTrackName(t){let e=xM.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);_M.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Me.Composite=lh;Me.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Me.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Me.prototype.GetterByBindingType=[Me.prototype._getValue_direct,Me.prototype._getValue_array,Me.prototype._getValue_arrayElement,Me.prototype._getValue_toArray];Me.prototype.SetterByBindingTypeAndVersioning=[[Me.prototype._setValue_direct,Me.prototype._setValue_direct_setNeedsUpdate,Me.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_array,Me.prototype._setValue_array_setNeedsUpdate,Me.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_arrayElement,Me.prototype._setValue_arrayElement_setNeedsUpdate,Me.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Me.prototype._setValue_fromArray,Me.prototype._setValue_fromArray_setNeedsUpdate,Me.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var OE=new Float32Array(1);var Oa=class{constructor(t,e,i=0,s=1/0){this.ray=new Hr(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new Gr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,i=[]){return hh(t,this,i,e),i.sort(id),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)hh(t[s],this,i,e);return i.sort(id),i}};function id(n,t){return n.distance-t.distance}function hh(n,t,e,i){if(n.layers.test(t.layers)&&n.raycast(t,e),i===!0){let s=n.children;for(let r=0,o=s.length;r<o;r++)hh(s[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:uh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=uh);var eo=new k;function In(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;eo.copy(t),eo[i]=0,eo.normalize();let l=.5*o/(o+a),h=1-eo.angleTo(n)/c;return Math.sign(eo[e])===1?h*l:a/(o+a)+l+l*(1-h)}var Ga=class extends on{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new k,c=new k,l=new k(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,x=new k,g=.5/s;for(let m=0,f=0;m<h.length;m+=3,f+=2)switch(a.fromArray(h,m),c.copy(a),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),h[m+0]=l.x*Math.sign(a.x)+c.x*r,h[m+1]=l.y*Math.sign(a.y)+c.y*r,h[m+2]=l.z*Math.sign(a.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:x.set(1,0,0),d[f+0]=In(x,c,"z","y",r,i),d[f+1]=1-In(x,c,"y","z",r,e);break;case 1:x.set(-1,0,0),d[f+0]=1-In(x,c,"z","y",r,i),d[f+1]=1-In(x,c,"y","z",r,e);break;case 2:x.set(0,1,0),d[f+0]=1-In(x,c,"x","z",r,t),d[f+1]=In(x,c,"z","x",r,i);break;case 3:x.set(0,-1,0),d[f+0]=1-In(x,c,"x","z",r,t),d[f+1]=1-In(x,c,"z","x",r,i);break;case 4:x.set(0,0,1),d[f+0]=1-In(x,c,"x","y",r,t),d[f+1]=1-In(x,c,"y","x",r,e);break;case 5:x.set(0,0,-1),d[f+0]=In(x,c,"x","y",r,t),d[f+1]=1-In(x,c,"y","x",r,e);break}}};function bh(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new oe,l=0;for(let h=0;h<n.length;++h){let u=n[h],d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0,u=[];for(let d=0;d<n.length;++d){let p=n[d].index;for(let x=0;x<p.count;++x)u.push(p.getX(x)+h);h+=n[d].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Cd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){let p=[];for(let g=0;g<o[h].length;++g)p.push(o[h][g][d]);let x=Cd(p);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}return c}function Cd(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let o=new t(r),a=0;for(let l=0;l<n.length;++l)o.set(n[l].array,a),a+=n[l].array.length;let c=new Ie(o,e,i);return s!==void 0&&(c.gpuType=s),c}function Pd(n,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},i=n.getIndex(),s=n.getAttribute("position"),r=i?i.count:s.count,o=0,a=Object.keys(n.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],d=["setX","setY","setZ","setW"];for(let y=0,_=a.length;y<_;y++){let M=a[y],E=n.attributes[M];c[M]=new Ie(new E.array.constructor(E.count*E.itemSize),E.itemSize,E.normalized);let S=n.morphAttributes[M];S&&(l[M]=new Ie(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized))}let p=t*.5,x=Math.log10(1/t),g=Math.pow(10,x),m=p*g;for(let y=0;y<r;y++){let _=i?i.getX(y):y,M="";for(let E=0,S=a.length;E<S;E++){let w=a[E],R=n.getAttribute(w),b=R.itemSize;for(let v=0;v<b;v++)M+=`${~~(R[u[v]](_)*g+m)},`}if(M in e)h.push(e[M]);else{for(let E=0,S=a.length;E<S;E++){let w=a[E],R=n.getAttribute(w),b=n.morphAttributes[w],v=R.itemSize,A=c[w],I=l[w];for(let z=0;z<v;z++){let P=u[z],D=d[z];if(A[D](o,R[P](_)),b)for(let N=0,V=b.length;N<V;N++)I[N][D](o,b[N][P](_))}}e[M]=o,h.push(o),o++}}let f=n.clone();for(let y in n.attributes){let _=c[y];if(f.setAttribute(y,new Ie(_.array.slice(0,o*_.itemSize),_.itemSize,_.normalized)),y in l)for(let M=0;M<l[y].length;M++){let E=l[y][M];f.morphAttributes[y][M]=new Ie(E.array.slice(0,o*E.itemSize),E.itemSize,E.normalized)}}return f.setIndex(h),f}var Id=new Map;function Re(n,t={}){let e=`${n}|${t.emissive??""}|${t.rough??""}`,i=Id.get(e);return i||(i=new Ae({color:n,roughness:t.rough??.85,metalness:0}),t.emissive&&(i.emissive.set(t.emissive),i.emissiveIntensity=.6),Id.set(e,i)),i}function Eh(n,t,e,i,s,r){return t.position.set(e,i+r/2,s),t.castShadow=!0,t.receiveShadow=!0,n.add(t),t}function de(n,t,e,i,s,r=0,o=0,a=0){return Eh(n,new Vt(new on(t,e,i),Re(s)),r,o,a,e)}function Ln(n,t,e,i,s,r=0,o=0,a=0,c=.08){let l=new Ga(t,e,i,2,Math.min(c,t/2,e/2,i/2));return Eh(n,new Vt(l,Re(s)),r,o,a,e)}function fn(n,t,e,i,s,r=0,o=0,a=0,c=12){return Eh(n,new Vt(new hn(t,e,i,c),Re(s)),r,o,a,i)}function Je(n){n.updateMatrixWorld(!0);let t=new me().copy(n.matrixWorld).invert(),e=new Map,i=[];n.traverse(r=>{if(r===n)return;let o=r;if(!o.isMesh||r.userData.dynamic||Array.isArray(o.material)||yM(r,n))return;let a=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();for(let l of Object.keys(a.attributes))["position","normal","uv"].includes(l)||a.deleteAttribute(l);a.applyMatrix4(new me().multiplyMatrices(t,o.matrixWorld));let c=e.get(o.material)??[];c.push(a),e.set(o.material,c),i.push(r)});for(let r of i)r.removeFromParent(),r.geometry.dispose();for(let[r,o]of e){let a=bh(o,!1);if(o.forEach(l=>l.dispose()),!a)continue;let c=new Vt(a,r);c.castShadow=!0,c.receiveShadow=!0,n.add(c)}let s=[];return n.traverse(r=>{r!==n&&!r.isMesh&&r.children.length===0&&!r.userData.dynamic&&s.push(r)}),s.forEach(r=>r.removeFromParent()),n}function yM(n,t){for(let e=n.parent;e&&e!==t;e=e.parent)if(e.userData.dynamic)return!0;return!1}var vM=new Ae({vertexColors:!0,roughness:.85,metalness:0});function Ld(n,t=()=>!1){let e=n.children.filter(r=>r.isMesh&&!t(r));if(e.length<2)return;let i=e.map(r=>{r.updateMatrix();let o=(r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone()).applyMatrix4(r.matrix);for(let h of Object.keys(o.attributes))["position","normal"].includes(h)||o.deleteAttribute(h);let a=r.material.color,c=o.attributes.position.count,l=new Float32Array(c*3);for(let h=0;h<c;h++)l.set([a.r,a.g,a.b],h*3);return o.setAttribute("color",new Ie(l,3)),o}),s=bh(i,!1);i.forEach(r=>r.dispose()),s&&(e.forEach(r=>r.removeFromParent()),n.add(new Vt(s,vM)))}var MM=new La(1,20).rotateX(-Math.PI/2),bM=new en({color:"#1e2a33",transparent:!0,opacity:.22,depthWrite:!1});function Sh(n,t=n){let e=new Vt(MM,bM);return e.scale.set(n,1,t),e.position.y=.012,e.renderOrder=1,e}function dn(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ii(n,t,e,i=3){let s=new oe;return s.setAttribute("position",new Yt(n,3)),s.setAttribute("color",new Yt(t,i)),s.setIndex(e),s.computeVertexNormals(),s}var lt=({x:n,z:t})=>`${n},${t}`,nr=(n,t)=>Math.hypot(t[0]-n[0],t[1]-n[1]),ir=(n,t)=>{let e=nr(n,t);return[(t[0]-n[0])/e,(t[1]-n[1])/e]},no=(n,t,e)=>[n[0]+t[0]*e,n[1]+t[1]*e];function os(n,t){if(n.length<3)return n;let e=n[0],i=n.at(-1),s=nr(e,i),r=s?ir(e,i):[0,0],o=-1,a=t;for(let c=1;c<n.length-1;c++){let[l,h]=[n[c][0]-e[0],n[c][1]-e[1]],u=Math.max(0,Math.min(s,l*r[0]+h*r[1])),d=nr(n[c],no(e,r,u));d>a&&([o,a]=[c,d])}return o<0?[e,i]:[...os(n.slice(0,o+1),t).slice(0,-1),...os(n.slice(o),t)]}function Va(n,t){let e=[n[0]],i=r=>{let o=e.at(-1),a=Math.ceil(nr(o,r)/.18);for(let c=1;c<=a;c++)e.push(no(o,[r[0]-o[0],r[1]-o[1]],c/a))},s=0;for(let r=1;r<n.length-1;r++){let[o,a,c]=n.slice(r-1,r+2),l=ir(o,a),h=ir(a,c),u=Math.atan2(l[0]*h[1]-l[1]*h[0],l[0]*h[0]+l[1]*h[1]),d=t*Math.tan(Math.abs(u)/2);if(s+d>=nr(o,a)-.05||d>=nr(a,c)-.05)return null;if(s=d,d<.01)continue;let p=no(a,l,-d),x=no(p,[-l[1],l[0]],Math.sign(u)*t),g=Math.atan2(p[1]-x[1],p[0]-x[0]),m=Math.ceil(Math.abs(u)*t/.16);i(p);for(let f=1;f<=m;f++){let y=g+u*f/m;e.push(no(x,[Math.cos(y),Math.sin(y)],t))}}return i(n.at(-1)),e}function Li(n){return n.map(([t,e],i)=>{let[s,r]=ir(n[Math.max(0,i-1)],n[Math.min(n.length-1,i+1)]);return{x:t,z:e,dx:s,dz:r}})}function sr({points:n}){let[t,e]=n,i=n.at(-1);return[[t,ir(e,t)],[i,ir(n.at(-2),i)]]}function ci(n){let t=new Map;for(let i of n.values())i.roadCurveId&&(t.has(i.roadCurveId)||t.set(i.roadCurveId,[]),t.get(i.roadCurveId).push(i));let e=new Map;for(let[i,s]of t){let r=s.find(o=>o.roadCurve)?.roadCurve;r?.cells?.length===s.length&&r.points?.length>1&&r.cells.every(o=>n.get(o)?.roadCurveId===i)&&s.every(o=>o.material===s[0].material&&!o.bridgeId&&!o.approachBridgeId)&&e.set(i,{...r,material:s[0].material})}return e}function Dd(n,t){let e=new Set(t.map(s=>n.get(typeof s=="string"?s:lt(s))?.roadCurveId).filter(Boolean));if(!e.size)return n;let i=new Map(n);for(let[s,r]of n)if(e.has(r.roadCurveId))if(r.curveOnly)i.delete(s);else{let{roadCurveId:o,roadCurve:a,...c}=r;i.set(s,c)}return i}var Et=1,Jt=2,Di=["dirt","stone","asphalt"],li=({x:n,z:t})=>({x:Math.floor(n),z:Math.floor(t)}),hi=(n,t)=>n&&t&&n.x===t.x&&n.z===t.z,EM=[Et,Jt],rr=(n,t)=>t===Et?n.x:n.z,io=(n,t)=>t===Et?n.z:n.x,Ah=(n,t,e)=>n===Et?{x:t,z:e}:{x:e,z:t},so=(n,t,e,i)=>n.get(lt(Ah(t,e,i)));function qe(n,t,e){let i=rr(t,e),s=io(t,e),r=s;for(;(so(n,e,i,s-1)?.axes??0)&e;)s--;for(;(so(n,e,i,r+1)?.axes??0)&e;)r++;let o=Array.from({length:r-s+1},(a,c)=>so(n,e,i,s+c));return{id:`${e}:${i}:${s}`,axis:e,t:i,lo:s,hi:r,cells:o,width:o.length,material:o[Math.floor((o.length-1)/2)].material,junction:o.some(a=>a.axes===(Et|Jt))}}function Wa(n,t,e,i,s,r=Et){let o=Math.abs(e.x-t.x),a=Math.abs(e.z-t.z),c=o+a?o>=a?Et:Jt:r,l=io(t,c),h=rr(t,c),u=rr(e,c),d=Array.from({length:Math.abs(u-h)+1},(g,m)=>Ah(c,h+m*Math.sign(u-h),l)),p=new Map(n),x=1;for(let g of d){let m=lt(g);if(i==="erase"){p.delete(m);continue}let f=s(g);if(f)return{roads:n,cells:d,error:f};let y=n.get(m);p.set(m,{...g,material:y?.material??i,axes:(y?.axes??0)|c})}if(i!=="erase")for(let g of d){let m=qe(p,g,c);if(x=Math.max(x,m.width),x>4)return{roads:n,cells:d,error:"\u0110\u01B0\u1EDDng r\u1ED9ng t\u1ED1i \u0111a 4 \xF4."}}return{roads:p,cells:d,width:x,error:""}}function as(n){let t=new Map;for(let e of EM){let i=[...n.values()].filter(s=>s.axes&e).sort((s,r)=>rr(s,e)-rr(r,e)||io(s,e)-io(r,e));for(let s of i){if((so(n,e,rr(s,e),io(s,e)-1)?.axes??0)&e)continue;let r=qe(n,s,e);t.set(r.id,r)}}return[...t.values()]}function wh(n,t,e){let i=new Map,s=t.t+e;for(let r=t.lo;r<=t.hi;r++){let o=so(n,t.axis,s,r);if(!(o?.axes&t.axis))continue;let a=qe(n,o,t.axis);i.set(a.id,a)}return[...i.values()]}function Rh(n,t){let e=n.get(lt(t));if(!e)return[];let i=e.roadCurveId&&ci(n).get(e.roadCurveId);if(i)return i.cells.map(o=>n.get(o));if(e.curveOnly)return[];if(e.axes===(Et|Jt))return[];let s=qe(n,e,e.axes);if(s.junction)return s.cells.filter(o=>o.axes===s.axis);let r=[...s.cells];for(let o of[-1,1]){let a=s;for(;;){let c=wh(n,a,o);if(c.length!==1||c[0].junction||c[0].material!==s.material)break;[a]=c,r.push(...a.cells)}}return r}function or(n,t,e){let i=new Map(n);for(let s of t){let r=lt(s),o=i.get(r);o&&i.set(r,{...o,material:e})}return i}function Th(n,t){if(t==="walk")return[n.width===1?.36:n.width/2-.16];if(t==="motorcycle"){if(n.width===1)return[.12];if(n.width===3)return[1]}return n.width===1?[]:n.width===4&&n.material==="asphalt"?[.32,.91]:[n.width===2?.29:.39]}function oo(n){let t=new Map([...n].filter(([,i])=>i.axes===(Et|Jt))),e=new Map;for(let[i,s]of t){let r=[s];t.delete(i);for(let o of r){e.set(lt(o),i);for(let[a,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=lt({x:o.x+a,z:o.z+c}),h=t.get(l);h&&(r.push(h),t.delete(l))}}}return e}function Ch(n,t=oo(n)){let e=new Map,i=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let[s,r]of t){e.has(r)||e.set(r,{cells:[],directions:new Set});let o=e.get(r),a=n.get(s);o.cells.push(a);for(let c of i){let l=lt({x:a.x+c.x,z:a.z+c.z}),h=n.get(l),u=c.x?Et:Jt;t.get(l)!==r&&h?.axes&u&&o.directions.add(c)}}return[...e].map(([s,r])=>({id:s,cells:r.cells,directions:[...r.directions]}))}function ro(n,t=oo(n),e=!1){let i=new Map;for(let{id:s,cells:r,directions:o}of Ch(n,t)){if(o.length<3||r.some(g=>g.bridgeId||g.approachBridgeId||g.roadCurveId||!e&&g.junctionStyle==="crossing"))continue;let a=Math.min(...r.map(g=>g.x)),c=Math.max(...r.map(g=>g.x))+1,l=Math.min(...r.map(g=>g.z)),h=Math.max(...r.map(g=>g.z))+1,u=c-a,d=h-l;if(Math.min(u,d)<2||r.length!==u*d||o.some(({x:g,z:m})=>r.some(f=>{let y=lt({x:f.x+g,z:f.z+m}),_=n.get(y),M=g?Et:Jt;return t.get(y)!==s&&_?.axes&M&&qe(n,_,M).width<2})))continue;let x=Math.min(u,d)/2;i.set(s,{id:s,x:(a+c)/2,z:(l+h)/2,radius:x,material:r[0].material,width:Math.min(u,d),cells:r})}return i}function Ud(n,t,e){let i=new Set(e.map(lt)),s=ro(n,void 0,!0),r=[...ro(t,void 0,!0).values()].filter(o=>{if(!o.cells.some(c=>i.has(lt(c))))return!1;let a=s.get(o.id);return!a||o.cells.length!==a.cells.length||o.cells.some(c=>n.get(lt(c))?.axes!==c.axes)});return r.length?["roundabout","crossing"].map(o=>{let a=new Map(t);for(let{cells:c}of r)for(let l of c)a.set(lt(l),{...l,junctionStyle:o});return{style:o,roads:a}}):[]}function SM(n,t){for(let e of t.values()){let i=[...n.values()].filter(o=>o.junction===e.id);if(!i.length)continue;let s=Array.from({length:16},(o,a)=>{let c=a/16*Math.PI*2;return{...i[0],id:`roundabout:${e.id}:${a}`,signal:void 0,links:[],x:e.x+Math.cos(c)*e.radius*.68,z:e.z-Math.sin(c)*e.radius*.68}}),r=o=>s.reduce((a,c)=>Math.hypot(o.x-c.x,o.z-c.z)<Math.hypot(o.x-a.x,o.z-a.z)?c:a);for(let[o,a]of s.entries())a.links.push({id:s[(o+1)%s.length].id,crossing:!0});for(let o of n.values()){if(o.junction===e.id){for(let a of o.links){let c=n.get(a.id);if(c.junction===e.id)continue;let l=r(c);l.links.some(h=>h.id===c.id)||l.links.push({id:c.id,crossing:!0})}continue}o.links.some(a=>n.get(a.id)?.junction===e.id)&&(o.links=o.links.filter(a=>n.get(a.id)?.junction!==e.id),o.links.push({id:r(o).id,crossing:!0}),o.roundaboutEntry=!0)}for(let o of i)n.delete(o.id);for(let o of s)n.set(o.id,o)}}function wM(n,t,e,i){for(let s of ci(n).values()){let r=[...t.values()].filter(u=>u.section.cells.every(d=>d.roadCurveId===s.id));if(!r.length&&!s.continuous)continue;let o=new Set(r.map(u=>u.id)),a={...r[0]?.section,id:s.id,width:s.width,material:s.material,junction:!1,cells:s.cells.map(u=>n.get(u))},c=Li(s.points),l=[];for(let u of[-1,1])for(let[d,p]of Th(a,e).entries()){let x=(u===1?c:[...c].reverse()).map(({x:g,z:m,dx:f,dz:y},_)=>({id:`${s.id}:${u}:${d}:${_}`,section:a,index:d,direction:u,links:[],x:g-y*p*u,z:m+f*p*u}));for(let g=0;g<x.length-1;g++)x[g].links.push({id:x[g+1].id,crossing:!1});l.push(x)}if(!l.length)continue;let h=(u,d)=>l.map(x=>d?x.at(-1):x[0]).reduce((x,g)=>Math.hypot(u.x-g.x,u.z-g.z)<Math.hypot(u.x-x.x,u.z-x.z)?g:x);for(let u of t.values())if(o.has(u.id))for(let d of u.links){if(o.has(d.id))continue;let p=h(t.get(d.id),!0);p.links.some(x=>x.id===d.id)||p.links.push(d)}else u.links.some(d=>o.has(d.id))&&(u.links=u.links.filter(d=>!o.has(d.id)),u.links.push({id:h(u,!1).id,crossing:!1}));if(s.continuous){let u=new Set;for(let x of s.cells){let{x:g,z:m}=n.get(x);for(let[f,y]of[[1,0],[-1,0],[0,1],[0,-1]])u.add(lt({x:g+f,z:m+y}))}let d=[...t.values()].filter(x=>!o.has(x.id)&&!x.section.junction&&x.section.cells.some(g=>u.has(lt(g))&&!g.bridgeId&&!g.approachBridgeId)),p=sr(s);for(let x of l){let g=x[0],m=x.at(-1);for(let[f,y,_]of[[g,g.direction===1?0:1,!1],[m,g.direction===1?1:0,!0]]){let[[M,E],[S,w]]=p[y],R,b=1.85;for(let v of d){let A=Math.hypot(v.x-f.x,v.z-f.z),I=(v.x-M)*S+(v.z-E)*w,z=v.direction*(v.section.axis===Et?S:w),P=i?Math.abs(i(v.x,v.z)-i(f.x,f.z)):0;A>=b||I<-.05||P>A*.27+.05||(_?z<.65:z>-.65)||(R=v,b=A)}R&&_&&f.links.push({id:R.id,crossing:!1}),R&&!_&&R.links.push({id:f.id,crossing:!1})}}}for(let u of l){let d=u.at(-1);!d.links.length&&e==="walk"&&d.links.push({id:h(d,!1).id,crossing:!0});for(let p of u)t.set(p.id,p)}for(let u of o)t.delete(u)}}function Xa(n,t,e){let i=as(n),s=oo(n),r=new Map,o=new Map,a=new Map;for(let l of i){let h=[],u=l.cells.map(p=>s.get(lt(p))).find(Boolean),d=Th(l,t);for(let p of[-1,1])for(let[x,g]of d.entries()){let m=l.cells[0].taper,y=(m?(m.startCenter+m.endCenter)/2:(l.lo+l.hi+1)/2)+g*p*(l.axis===Et?1:-1),_=`${l.id}:${p}:${x}`,M={...Ah(l.axis,l.t+.5,y),id:_,section:l,direction:p,index:x,junction:u,links:[]};a.set(_,M),h.push(M)}r.set(l.id,h);for(let p of l.cells)o.has(lt(p))||o.set(lt(p),[]),o.get(lt(p)).push(l)}function c(l,h,u=!1){!h||l.links.some(d=>d.id===h.id)||l.links.push({id:h.id,crossing:u})}for(let l of a.values()){let{section:h,direction:u,index:d}=l;for(let p of wh(n,h,u)){let x=r.get(p.id)?.filter(g=>g.direction===u)??[];if(c(l,x[Math.min(d,x.length-1)]),d===0)for(let g of x.slice(Th(h,t).length))c(l,g)}for(let p of h.cells)if(p.axes===(Et|Jt)){for(let x of o.get(lt(p)))if(x.axis!==h.axis)for(let g of r.get(x.id))g.index!==0||!wh(n,x,g.direction).length||c(l,g,!0)}}return wM(n,a,t,e),(t==="car"||t==="motorcycle")&&SM(a,ro(n,s)),a}var vn={x:9,z:-13.2,height:4.7},cs=([n,t])=>new k(vn.x+(n+t)/Math.SQRT2,0,vn.z+(t-n)/Math.SQRT2),Nd=(n,t)=>(n-vn.x-t+vn.z)/Math.SQRT2,zd=(n,t)=>(n-vn.x+t-vn.z)/Math.SQRT2,TM=new k(8,0,-5.85),Ph=new yn([TM,new k(8.01,0,-6.55),new k(8.44,0,-7.26),new k(9.2,0,-7.58),new k(10.24,0,-7.38),...[[-2.31,6.56],[-.82,7.97],[1.03,9.3],[3.34,9.5],[5.21,8.89],[5.89,7.77],[5.38,6.59],[4.12,6.18],[2.41,6.2],[.71,6.09],[-.29,5.57],[-.44,4.84],[-.06,3.56],[.04,2.09],[.09,.66]].map(cs)]),AM=Ph.getLength(),Od=AM,qa=1.94,RM=.37,CM=vn.height,Wn=Array.from({length:125},(n,t)=>{let e=t/124,i=Ph.getPointAt(e),s=Ph.getTangentAt(e),r=Math.min(1,(e-.032*Math.sin(Math.PI*2*e))/.997);return{x:i.x,z:i.z,y:kt.lerp(RM,CM,r),dx:s.x,dz:s.z}});function Mn(n,t,e=Wn){if(n<5||n>23||t<-18||t>-3.9)return null;let i=5,s=0,r=0;for(let o=1;o<e.length;o++){let a=e[o-1],c=e[o],l=c.x-a.x,h=c.z-a.z,u=kt.clamp(((n-a.x)*l+(t-a.z)*h)/(l*l+h*h),0,1),d=(n-a.x-u*l)**2+(t-a.z-u*h)**2;d>=i||(i=d,s=kt.lerp(a.y,c.y,u),r=(o-1+u)/(e.length-1))}return i<5?{distance:Math.sqrt(i),height:s,progress:r}:null}var ao=n=>{let t=n.get("7,-6"),e=n.get("8,-6");return t?.axes&Jt&&e?.axes&Jt?t.material:null};function Ya(n,t,e,i=Wn){let s=ao(t);if(!s)return;let r=[...n.values()].filter(g=>g.section.axis===Jt&&g.section.t===-6&&g.section.width>=2&&g.section.cells.some(m=>lt(m)==="7,-6")&&g.index===0),o=r.find(g=>g.direction===-1),a=r.find(g=>g.direction===1);if(!o||!a)return;let c=e==="walk"?.74:.31,l=g=>i.filter((m,f)=>f%3===0||f===i.length-1).map((m,f)=>({x:m.x-m.dz*c*g,z:m.z+m.dx*c*g,id:`hill:${g}:${f}`,section:{id:`hill:${f}`,width:2,material:s,junction:!1},direction:g,index:0,links:[]})),h=l(1),u=l(-1).reverse(),d=i.at(-1),p={...h.at(-1),id:"hill:turn",links:[],x:d.x+d.dx*.37,z:d.z+d.dz*.37},x=[o,...h,p,...u,a];for(let g=1;g<x.length;g++)n.set(x[g].id,x[g]),x[g-1].links.push({id:x[g].id,crossing:!1})}var bn=kt.smoothstep;function Fd(n,t,e){let i=kt.lerp,s=(l,h,u)=>bn(l,h-.36,h)*(1-bn(l,u,u+.36));if(n<-7.36||n>-.64||t<-8.85||t>1.42)return e;let r=.41+.66*kt.clamp((-t-1)/5,0,1),o=i(e,r,s(n,-3,-1)*bn(t,-8.85,-7)*(1-bn(t,1,1.42))),a=1.07+.56*kt.clamp((-n-3)/4,0,1);o=i(o,a,s(n,-7,-1)*bn(t,-8.85,-7)*(1-bn(t,-5,-4.64)));let c=i(a,1.64,bn(t,-5,-4));return i(o,c,s(n,-7,-5)*bn(t,-6.45,-5.75)*(1-bn(t,-4,-3.64)))}function Bd(n,t){return bn(n,-6.85,-5.25)*(1-bn(n,-.9,.45))*bn(t,-10.82,-9.14)*(1-bn(t,-5.12,-4.02))}function Ih(n,t){let e=new yn(n.map(i=>new k(...i)));return Array.from({length:t},(i,s)=>{let r=s/(t-1),o=e.getPointAt(r),a=e.getTangentAt(r),c=Math.hypot(a.x,a.z);return{x:o.x,y:o.y,z:o.z,dx:a.x/c,dz:a.z/c}})}var $a=Ih([[-5.52,.47,-12.53],[-6.25,.48,-12.74],[-7.37,.54,-12.37],[-8.24,.56,-11.72],[-8.94,.47,-10.44],[-9.37,.33,-9.02],[-10.07,.12,-7.65],[-10.55,-.15,-6.58],[-11.15,-.4,-5.75]],54),ar=Ih([[-11.15,-.4,-5.75],[-12.6,-.31,-5.61],[-14,-.25,-5.49],[-15.4,-.31,-5.37],[-16.82,-.4,-5.24]],33),Za=Ih([[-16.82,-.4,-5.24],[-17.39,-.31,-5.16],[-17.91,-.19,-4.86],[-18.34,-.07,-4.52]],15);function Ui(n,t){if(n>-4||n<-20||t<-14.2||t>-3)return null;let e=4,i=0;for(let s of[$a,Za])for(let r=1;r<s.length;r++){let o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=kt.clamp(((n-o.x)*c+(t-o.z)*l)/(c*c+l*l),0,1),u=(n-o.x-c*h)**2+(t-o.z-l*h)**2;u<e&&(e=u,i=kt.lerp(o.y,a.y,h))}return e<4?{distance:Math.sqrt(e),height:i}:null}var co=n=>!!((n.get("-6,-13")?.axes??0)&Et);function kd(n,t){if(n<-16.9||n>-11.1||t<-6.35||t>-4.65)return null;let i=kt.clamp((-11.15-n)/(16.82-11.15),0,1)*(ar.length-1),s=ar[Math.floor(i)],r=ar[Math.ceil(i)],o=kt.lerp(s.z,r.z,i%1);return Math.abs(t-o)>.57?null:kt.lerp(s.y,r.y,i%1)+.024}function Hd(n,t){if(!co(t))return;let e=[...n.values()].filter(c=>c.section.axis===Et&&c.section.cells.some(l=>lt(l)==="-6,-13")),i=e.find(c=>c.direction===-1),s=e.find(c=>c.direction===1);if(!i||!s)return;let r=[...$a.filter((c,l)=>l%3===0),...ar.filter((c,l)=>l%3===0),...Za.filter((c,l)=>l%2===0)],o=c=>r.map((l,h)=>({x:l.x-l.dz*.2*c,z:l.z+l.dx*.2*c,id:`bridge:${c}:${h}`,section:{id:`bridge:${h}`,width:1,material:"dirt",junction:!1},direction:c,index:0,links:[]})),a=[i,...o(1),...o(-1).reverse(),s];for(let c=1;c<a.length;c++)n.set(a[c].id,a[c]),a[c-1].links.push({id:a[c].id,crossing:!1})}var ge=kt.smoothstep,Gd=new yt("#7d9e60"),PM=new yt("#97a462"),IM=new yt("#a8ad72"),Vd=new yt("#5a7b48"),LM=new yt("#b5a87a"),sS=new yt("#ab9a72"),Wd=new yt("#8e7858"),Xd=new yt("#9a8868"),DM=new yt("#a49070"),UM=new yt("#7a7872"),NM=new yt("#8a8880"),zM=new yt("#a8a89c"),OM=new yt("#5e5e58"),FM=new yt("#6a8e50"),BM=new yt("#7e6e50"),kM=new yt("#6e6e66"),HM=new yt("#667852"),GM=new yt("#586a50"),VM=new yt("#c8b888"),WM=new yt("#c4c0b4"),XM=new yt("#9e9c92");function qd(n,t,e){let{position:i,normal:s,color:r}=n.attributes,o=new yt,a=new yt;for(let c=0;c<i.count;c++){let l=i.getX(c),h=i.getY(c),u=i.getZ(c),d=t(l,u),p=e(l,u),x=s.getX(c),g=Math.max(.01,s.getY(c)),m=s.getZ(c),f=Math.hypot(x,m)/g,y=Math.sin(l*.23+u*.16)*Math.cos(u*.31-l*.11),_=Math.sin(l*.41+u*.29)*Math.sin(u*.19-l*.37),M=Math.cos(l*.34+u*.22),E=Math.sin(h*7.3+.8*Math.sin(l*.36+u*.21)),S=Math.sin(h*14.5+l*1.2+u*.9);o.copy(PM).lerp(IM,.3+.12*y);let w=ge(y,-.3,.5)*(1-ge(f,.12,.4));o.lerp(Gd,w*.5),o.lerp(LM,(.12+.08*_)*(1-ge(f,.15,.45)));let R=ge(f,.15,.45)*(1-ge(f,.45,.7));a.copy(DM).lerp(Xd,.35+.15*y),o.lerp(a,R*.55);let b=ge(f,.45,.8);a.copy(Wd).lerp(Xd,.3+.15*_),o.lerp(a,b*.75);let v=ge(f,.8,1.2);if(v>.01){let P=h*4.2+y*.6,D=1-ge(P%3,0,.5),N=ge(P%3,.3,.8)*(1-ge(P%3,1.2,1.8)),V=ge(P%3,1.5,2.4);a.copy(FM).lerp(Vd,.15+.1*_),o.lerp(a,v*D*.65),a.copy(BM).lerp(Wd,.2+.12*E),o.lerp(a,v*N*.7),a.copy(kM).lerp(NM,.25+.2*ge(E,-.3,.6)+.06*S),o.lerp(a,v*V*.85);let H=ge(f,1.4,2.2)*(1-ge(E,-.1,.5));o.lerp(OM,H*.4)}let A=ge(f,1.2,2);a.copy(UM).lerp(zM,.25+.25*ge(E,-.2,.7)+.05*S),o.lerp(a,A*.9),o.lerp(XM,ge(h,5,9)*.4),o.lerp(WM,ge(h,8.5,12)*.5);let I=1-ge(d,.8,5.5);o.lerp(Vd,I*.3*(1-ge(f,.3,.8)));let z=(1-ge(d,.4,2.8))*(1-ge(f,.25,.6));o.lerp(Gd,z*.35),o.multiplyScalar(1+.045*y+.02*M),o.lerp(HM,(1-ge(d,.02,.65))*.86),o.lerp(VM,1-ge(p,1.05,4)),o.lerp(GM,Math.max(1-ge(d,-.37,.02),1-ge(p,-.72,.1))),r.setXYZ(c,o.r,o.g,o.b)}}function Lh(n){let t=new jt,e=new k(1,0,0);for(let[i,{x:s,y:r,z:o}]of n.entries()){if(Ln(t,.144,.64,.144,i%2?"#8d6a46":"#98734e",s,r-.075,o,.018),Ln(t,.161,.108,.161,"#795c41",s,r-.01,o,.012),Ln(t,.175,.062,.175,"#b4986c",s,r+.553,o,.017),!i)continue;let a=n[i-1],c=new k(s-a.x,r-a.y,o-a.z),l=c.length();if(!(l<.001)){c.divideScalar(l);for(let[h,u]of[[.218,"#98764d"],[.444,"#b38d5b"]])Ln(t,l,.085,.075,u,(a.x+s)/2,(a.y+r)/2+h-.0425,(a.z+o)/2,.013).quaternion.setFromUnitVectors(e,c)}}return Je(t)}var ls=new k(0,1,0),Dh=new Map,qM=JM(),Zd="#755b42",Yd={broadleaf:{palette:["#507741","#70984e","#9dbc66"],trunk:[.08,1.32,-.03],forks:[[-.51,1.23,.02],[.44,1.55,.16],[-.07,1.73,-.21]],crowns:[[-.55,1.42,.03,.39,.36,.35,25],[.46,1.6,.17,.39,.39,.36,27],[-.06,1.86,-.23,.45,.34,.4,36],[.27,1.3,-.37,.31,.28,.31,16]]},oak:{palette:["#45693d","#648b4b","#90ad60"],trunk:[.08,1.35,.01],forks:[[-.49,1.4,-.07],[.47,1.41,.24]],crowns:[[.02,1.56,.01,.82,.57,.66,115],[-.48,1.42,.24,.38,.31,.34,30],[.51,1.52,-.26,.33,.33,.34,29]]},umbrella:{palette:["#426f4a","#649653","#9dbd6a"],trunk:[.1,1.57,-.04],forks:[[-.71,1.59,.1],[.68,1.58,-.1],[-.14,1.52,.52]],crowns:[[0,1.74,-.03,.92,.3,.68,90],[.05,1.62,.47,.57,.2,.28,30]]},birch:{palette:["#5d8243","#82a351","#acc675"],pale:!0,trunk:[-.13,1.91,-.11],forks:[[-.44,1.47,.08],[.38,1.35,.19]],crowns:[[-.23,1.88,-.13,.35,.52,.35,54],[-.51,1.5,.08,.33,.31,.29,34],[.42,1.43,.2,.32,.33,.32,36]]},poplar:{palette:["#648543","#89a957","#b4c876"],trunk:[.07,1.64,0],forks:[[-.32,1.44,.12],[.31,1.66,-.12]],crowns:[[-.31,1.45,.11,.28,.4,.27,36],[.3,1.68,-.11,.32,.44,.31,38],[.03,1.98,0,.29,.4,.29,30]]},amber:{palette:["#a9562d","#cd7b3a","#edac57"],trunk:[.03,1.26,0],crowns:[[.02,1.48,0,.5,.83,.47,116]]},golden:{palette:["#94743c","#c2a34d","#efd47c"],trunk:[-.04,1,.01],forks:[[-.31,.99,-.13],[.37,1.13,.13]],crowns:[[.06,1.23,-.02,.61,.43,.54,77],[-.29,1.12,.28,.33,.32,.29,25]]},shrub:{palette:["#55763d","#76994d","#a7bd64"],crowns:[[.02,.22,.01,.55,.26,.43,58]]},bush:{palette:["#426c48","#659451","#9cbb6b"],crowns:[[-.23,.26,-.05,.33,.32,.31,39],[.21,.33,.03,.37,.39,.33,50]]}},$d={pine:{height:2.08,spread:.72,layers:5,count:9,lift:-.16,palette:["#2c5242","#3e6e50","#6b935b"]},spruce:{height:2.31,spread:.48,layers:8,count:7,lift:-.23,palette:["#294e49","#44766b","#74a28a"]},cypress:{height:1.94,spread:.31,layers:8,count:8,lift:.4,palette:["#3b593b","#587746","#89a063"]}};function Jd(n,t,e=0){let i=new jt,s=dn(37+Math.round(Math.abs(e)*67));return Object.hasOwn(Yd,n)?YM(i,Yd[n],s):Object.hasOwn($d,n)?$M(i,$d[n],s):ZM(i,n),i.name=n,i.scale.setScalar(t),i.rotation.y=e,i}function YM(n,{palette:t,trunk:e,forks:i,pale:s,crowns:r},o){let a=s?"#b1a58b":Zd;if(e){Ja(n,[0,0,0],[0,.56,0],s?.057:.106,.065,a),Ja(n,[0,.54,0],e,.066,.029,a);for(let l of i??[])Ja(n,[0,.67,0],l,.042,.014,a);if(s)for(let l of[.22,.43,.65,.87,1.08]){let h=fn(n,.064-l*.014,.067-l*.014,.025,"#77694f",-.046*l,l,-.058*l,7);h.rotation.z=.18}}let c=[[],[]];for(let[l,h,u,d,p,x,g]of r){let m=new Vt(qM.clone(),Re(t[0]));m.name="canopy",m.position.set(l,h,u),m.scale.set(d,p,x),m.castShadow=m.receiveShadow=!0,n.add(m);for(let f=0;f<g;f++){let y=(f+.5)/g*1.68-.7,_=f*2.39996+o()*.28,M=Math.sqrt(1-y*y),E=Math.cos(_)*M,S=Math.sin(_)*M,w=Kd(E,y,S),R=new k(E/d,y/p,S/x).normalize(),b=new k(l+E*d*w,h+y*p*w,u+S*x*w),v=new k().crossVectors(R,ls).normalize();v.applyAxisAngle(R,o()*Math.PI*2);let A=(.075+o()*.06)*Math.min(1,Math.max(.68,d+.35));b.addScaledVector(v,-A*.35).addScaledVector(R,.012);let I=b.clone().addScaledVector(v,A).addScaledVector(R,.016);cr(c[y>.15&&o()>.31?1:0],b,I,A*.38,.018,R)}}lr(n,c[0],t[1]),lr(n,c[1],t[2])}function $M(n,{height:t,spread:e,layers:i,count:s,lift:r,palette:o},a){fn(n,.026,e*.12,t*.97,Zd,0,0,0,7);let c=fn(n,.006,e*.47,t*.82,o[0],0,t*.17,0,8);c.name="canopy";let l=[[],[]];for(let h=0;h<i;h++){let u=h/i,d=t*(.24+.64*u),p=e*(r>0?Math.sin(Math.PI*(.28+u*.65)):1-u*.86);for(let x=0;x<s;x++){let g=(x/s+h*.33)*Math.PI*2+a()*.23,m=new k(Math.cos(g),0,Math.sin(g)),f=new k(-m.z,0,m.x),y=new k(0,d,0),_=y.clone().addScaledVector(m,p*(.76+a()*.24));_.y+=r*p,cr(l[0],y,_,p*.32,p*.18,ls);for(let M of[-1,1])for(let E of[.33,.62]){let S=y.clone().lerp(_,E);S.y+=p*.058;let w=S.clone().addScaledVector(m,p*.34).addScaledVector(f,p*.2*M);w.y+=p*(r>0?.55:-.2),cr(l[E>.5?1:0],S,w,p*.12,p*.045,ls)}}}lr(n,l[0],o[1]),lr(n,l[1],o[2])}function ZM(n,t){let e=t==="palm",i=t==="fern";if(!e&&!i&&t!=="rosette")throw new Error(`Unknown plant kind: ${t}`);let s=new k(.04,e?.74:.055,0);e&&Ja(n,[0,0,0],s.toArray(),.068,.042,"#89714e");let r=[[],[]],o=e||i?8:11;for(let a=0;a<o;a++){let c=a*2.39996,l=a%2===0,h=(e?.68:i?.6:.37)*(l?1:.76),u=new k(Math.cos(c),0,Math.sin(c)),d=s.clone().addScaledVector(u,h);if(d.y+=e?-.095:l?.2:.28,i){let p=new k(-u.z,0,u.x);cr(r[0],s,d,.013,.045,ls);for(let x=1;x<=5;x++){let g=x/6,m=s.clone().lerp(d,g);m.y+=.1*Math.sin(g*Math.PI);for(let f of[-1,1]){let y=m.clone().addScaledVector(u,.13).addScaledVector(p,(.17-g*.11)*f);y.y-=.045,cr(r[x%2],m,y,.033,.019,ls)}}}else cr(r[a%2],s,d,h*(e?.18:.27),e?.18:.09,ls)}lr(n,r[0],e?"#47774c":i?"#54894e":"#527e4d"),lr(n,r[1],e?"#77a458":i?"#96b966":"#8daa60")}function Ja(n,t,e,i,s,r){let o=new k(...t),a=new k(...e),c=a.clone().sub(o),l=fn(n,s,i,c.length(),r,0,0,0,7);l.position.copy(o).lerp(a,.5),l.quaternion.setFromUnitVectors(ls,c.normalize())}function cr(n,t,e,i,s,r){let o=new k().crossVectors(e.clone().sub(t),r).normalize(),a=t.clone().lerp(e,.43),c=a.clone().addScaledVector(o,i),l=a.clone().addScaledVector(o,-i),h=a.addScaledVector(r,s);for(let u of[t,c,h,c,e,h,t,h,l,h,e,l])n.push(u.x,u.y,u.z)}function lr(n,t,e){if(!t.length)return;Dh.has(e)||Dh.set(e,new Ae({color:e,side:ze,roughness:.94}));let i=new oe;i.setAttribute("position",new Yt(t,3)),i.computeVertexNormals();let s=new Vt(i,Dh.get(e));s.castShadow=s.receiveShadow=!0,n.add(s)}function Kd(n,t,e){return 1+.11*Math.sin(6*n+1.4*e)*Math.cos(5*t-e)+.07*Math.sin(7*e+4*t)}function JM(){let n=new ai(1,6);n.deleteAttribute("normal"),n.deleteAttribute("uv");let t=Pd(n);n.dispose();let e=t.attributes.position;for(let i=0;i<e.count;i++){let s=e.getX(i),r=e.getY(i),o=e.getZ(i),a=Kd(s,r,o);e.setXYZ(i,s*a,r*a,o*a)}return t.computeVertexNormals(),t}var KM=new ai(1,0),jd=["#b5a88b","#9e9d86","#c8b99e","#858f80"].map(n=>Re(n)),jM=new Ae({vertexColors:!0,flatShading:!0,roughness:.97});function Qd(n,t){let e=new Vt(KM.clone(),jd[Math.floor(t()*jd.length)]);return e.scale.set(n*(1+t()*.45),n*(.46+t()*.34),n*(.74+t()*.28)),e.rotation.y=t()*Math.PI*2,e}function tp(n,t,e,i){let s=dn(i),r=Array.from({length:7},(d,p)=>{let x=p/7*Math.PI*2+(s()-.5)*.24;return[Math.cos(x)*(.79+s()*.31),Math.sin(x)*(.79+s()*.31)]}),o=[[-.6,1.04,"#88856d"],[.19,1.03,"#a19b82"],[.32,.94,"#9c937b"],[.7,.85,"#b1a389"],[1,.61,"#c2b296"]],a=[],c=[],l=[];for(let[d,p,x]of o){let g=new yt(x);for(let[m,f]of r){a.push(m*n*p+d*.2,(d+(m-f)*.09)*e,f*t*p+d*.13);let y=.88+s()*.19;c.push(g.r*y,g.g*y,g.b*y)}}let h=(o.length-1)*r.length;for(let d=1;d<o.length;d++)for(let p=0;p<r.length;p++){let x=(p+1)%r.length,g=(d-1)*r.length,m=d*r.length;l.push(g+p,m+p,g+x,g+x,m+p,m+x)}for(let d=1;d<r.length-1;d++)l.push(h,h+d+1,h+d);let u=new Vt(Ii(a,c,l),jM);return u.castShadow=u.receiveShadow=!0,u}var np=new hn(.018,.027,1,5),QM=new hn(.041,.034,.14,6),tb=new Qi(.077,.48,3),eb=new ai(1,0),nb=new Qi(.09,.28,3),ip=Re("#788c57"),ib=Re("#8f9e5d"),sb=Re("#a27a52"),rb=["#efe3b7","#dbb87c","#cfa5ac","#acacc7"].map(n=>Re(n)),ep=["#839d58","#9caa63","#729054","#a3ac6b"].map(n=>Re(n));function sp(n,t,e,i,s){let r=.43+s()*.31,o=new Vt(np.clone(),ib);o.scale.y=r,o.position.set(n,t+r/2,e);let a=[o];if(i){let l=new Vt(QM.clone(),sb);l.position.set(n,t+r+.026,e),a.push(l)}let c=new Vt(tb.clone(),ip);return c.position.set(n+.08,t+.2,e),c.rotation.set((s()-.5)*.66,s()*6,.34),a.push(c),a}function rp(n,t,e,i,s){let r=.15+s()*.12,o=new Vt(np.clone(),ip);o.scale.set(.46,r,.46),o.position.set(n,t+r/2,e);let a=new Vt(eb.clone(),rb[i]),c=.05+s()*.043;return a.position.set(n,t+r,e),a.scale.set(c,c*.5,c),[o,a]}function op(n,t,e,i,s){let r=new Vt(nb.clone(),ep[Math.floor(i*ep.length)]),o=.55+s()*.61;return r.position.set(n,t+.088*o,e),r.scale.set(.55,o,.6),r.rotation.set((s()-.5)*.47,s()*6,(s()-.5)*.43),r}var ob=new k(0,1,0),ab=Re("#887357");function ap(n,t,e,i,s){let r=new Vt(new hn(.097,.124,s,8),ab);return r.position.set(n,t+.095,e),r.quaternion.setFromUnitVectors(ob,new k(Math.sin(i),.025,Math.cos(i)).normalize()),r.castShadow=r.receiveShadow=!0,r}var cb=[[-4.1,-1.4],[-4.18,-.45],[-4.09,.54],[-3.68,1.46],[-3.25,2.15],[-2.67,2.8],[-1.92,3.12]].map(([n,t])=>{let e=cs([n,t]),i=cs([n*1.25,t*1.25]);return{x:e.x,z:e.z,downX:i.x,downZ:i.z}}),lb=[76,80,84,88,92].map(n=>{let{x:t,z:e,dx:i,dz:s}=Wn[n];return{x:t+s*1.2,z:e-i*1.2,downX:t+s*2.05,downZ:e-i*2.05}});function cp(n,t,e){return(Mn(n,t)?.distance??1/0)>qa/2+.12&&!e.some(i=>Math.hypot(i.x-n,i.z-t)<i.radius+.16)}function lp(n,t){let e=[];for(let i of[cb,lb]){let s=[];for(let{x:r,z:o,downX:a,downZ:c}of i){let l=n(r,o),h=s.at(-1),u=cp(r,o,t),d=l-n(a,c);(!(!h||Math.abs(h.y-l)<=.65&&cp((h.x+r)/2,(h.z+o)/2,t))||d<.62||!u)&&s.length&&(s.length>=3&&e.push(s),s=[]),u&&d>=.62&&s.push({x:r,y:l,z:o})}s.length>=3&&e.push(s)}return e}var hp=10;function up(n,t,e){let i=new jt,s=new Map,r=new Map,o=new Set;for(let[u,d]of n.children.entries()){let{x:p,z:x}=d.position,g=`${Math.floor(p/hp)},${Math.floor(x/hp)}`;s.has(g)||s.set(g,{items:[],mesh:null});let m=s.get(g),f={id:u,item:d,x:p,z:x,chunk:m},y=e.get(d);y&&(y.sceneryId=u),m.items.push(f),r.set(u,f)}function a(u){u.mesh&&(i.remove(u.mesh),u.mesh.traverse(p=>p.geometry?.dispose()));let d=new jt;for(let{id:p,item:x}of u.items){if(o.has(p))continue;let g=x.clone();g.traverse(m=>{m.geometry&&(m.geometry=m.geometry.clone(),m.geometry.hasAttribute("color")&&(m.userData.dynamic=!0))}),d.add(g)}u.mesh=Je(d),i.add(u.mesh)}for(let u of s.values())a(u);function c(u,d){let p=new Set;for(let x of u)!r.has(x)||o.has(x)===d||(d?o.add(x):o.delete(x),p.add(r.get(x).chunk));for(let x of p)a(x)}function l(u,d,p=[]){let x=new Set(u.map(lt)),g=new Set(p.map(lt)),m=new Map(d.map(({index:f,newY:y})=>[f,y]));return[...r.values()].filter(({id:f,x:y,z:_})=>{if(o.has(f))return!1;let M=lt({x:Math.floor(y),z:Math.floor(_)});return x.has(M)||g.has(M)&&Math.abs(t(y,_,m)-t(y,_))>.025}).map(f=>f.id)}function h(u){return u.map(d=>r.get(d)).filter(Boolean)}return{group:i,apply:c,removals:l,points:h,hidden:o}}var Ka=kt.smoothstep,Uh=kt.lerp,Nh=[[15.2,-13.3,1.57,1.21,1.15,.48,93],[16.3,-11.65,1.41,1.06,1.32,-.62,36],[15.7,-10.5,.83,.81,.61,.38,59]];function hb(n,t,e,i,s,{riverX:r,riverWidth:o,waterfall:a}){let c=new jt,l=a.start,h=r(l),u=o(l),d=[[h-u-.75,l+.16,1.24,.96,1.25,.48,61],[h+u+.7,l+.22,1.25,.97,1.18,-.38,64],[h-u-1.03,l-.93,1.05,.76,.78,-.16,62],[h+u+.72,l-1.14,1.02,.83,.72,.62,63],[h-u-1.1,a.end+.32,1.65,1.17,2.4,.36,66],[h+u+1.13,a.end+.78,1.25,1.34,2.1,-.24,67],[-18.1,-8,1.63,1.05,1.18,.24,35],[-17.4,-6.78,1.11,.87,.64,.57,71],[-20.12,-4.32,1.89,1.1,1.45,-.23,13],...e?Nh.map((p,x)=>[[20.94,-12.18],[21.72,-11.15],[17.84,-14.72]][x].concat(p.slice(2))):Nh,[13.62,5.72,1.62,.93,.8,.47,53],[14.93,5.93,1.4,1.03,1.17,-.41,84]];for(let[p,x,g,m,f,y,_]of d){let M=Math.min(g,m)*.86;if(i(p,x,M))continue;n.push({x:p,z:x,radius:M});let E=tp(g,m,f,_);E.position.set(p,t(p,x),x),E.rotation.y=y,c.add(E),s?.set(E,n.at(-1))}return c}function ub(n,t,e,{riverX:i,riverWidth:s}){for(let[r,o]of[[-15.2,-1],[-12.9,1],[-9.82,-1],[-7.43,1],[-5.57,1],[-3.14,-1],[1.41,1],[4.87,-1],[7.46,1],[10.91,-1],[15.5,1]]){let a=i(r)+o*(s(r)+.47);for(let c=0;c<7;c++){let l=a+(t()-.5)*.52,h=r+(t()-.5)*.86;n.add(...sp(l,e(l,h),h,c%2===0,t))}}for(let[r,o,a]of[[-10.1,-7.2,3],[-10.6,-4.2,0],[-7.98,5.9,1],[-6.96,9.4,2],[-16.28,2.8,0],[-17.6,-1.53,1],[9.25,-7.85,1],[11.23,4.54,0],[10.14,10.9,2],[-2.9,-13.3,3],[-7.2,14.88,0]])for(let c=0;c<13;c++){let l=r+(t()-.5)*1.24,h=o+(t()-.5)*1.01;n.add(...rp(l,e(l,h),h,c%5?a:0,t))}}function fb(n,t,e,i,s,r){let{coastZ:o,inland:a,rapid:c,riverX:l,riverWidth:h,riverOffset:u}=r,d=new jt,p=dn(321),x=[],g=(_,M,E)=>e&&((Mn(_,M)?.distance??1/0)<.99+E||(Ui(_,M)?.distance??1/0)<.51+E);function m(_,M,E,S){if(a(M,E)<2.1)return;let w=p()*Math.PI*2;if(g(M,E,.14+S*.17)||Nh.some(([b,v,A])=>Math.hypot(M-b,E-v)<A)||(x.push([M,E]),i(M,E,.19*S)))return;let R=Jd(_,S,w);if(R.position.set(M,t(M,E)-.015,E),d.add(R),S>=.68&&_!=="bush"&&_!=="fern"){let b={x:M,z:E,radius:.19*S};n.push(b),s?.set(R,b)}}function f(_,M,E){if(a(_,M)<-.35)return;let S=Qd(E,p);if(S.position.set(_,t(_,M)+E*.075,M),g(_,M,E*.78)||i(_,M,E*.75)){S.geometry.dispose();return}if(d.add(S),E>=.47){let w={x:_,z:M,radius:E*.75};n.push(w),s?.set(S,w)}}let y=[[-19.5,-17.6,6.8,4.6,11,["pine","spruce","golden"]],[-17,-4.6,3.7,4.1,8,["oak","birch","broadleaf"]],[-19.4,7.9,4.8,4.2,9,["spruce","umbrella","pine"]],[5.2,-17.2,6.5,3.6,9,["pine","spruce","golden"]],[17.8,-12.8,5.9,4.6,13,["pine","spruce","broadleaf"]],[19,2.6,4.6,5.1,10,["oak","pine","amber","birch"]],[10.8,15,6.9,4.6,10,["umbrella","golden","oak","spruce"]],[-5.8,17.4,4.8,3.4,7,["oak","amber","birch"]]];for(let[_,M,E,S,w,R]of y)for(let b=0,v=0;b<w*4&&v<w;b++){let A=p()*Math.PI*2,I=Math.sqrt(p()),z=_+Math.cos(A)*E*I,P=M+Math.sin(A)*S*I;u(z,P)<1.03||a(z,P)<2.1||x.some(([D,N])=>Math.hypot(D-z,N-P)<1.19)||(m(R[Math.floor(p()*R.length)],z,P,.74+p()*.67),v++)}for(let[_,M,E,S]of[["broadleaf",-7.7,-7,.98],["birch",-9.7,1.4,.84],["amber",-7.15,10.75,.93],["umbrella",10.4,4.6,1.03],["broadleaf",8,-10.5,.79],["golden",-4.8,-13.3,.92]])m(_,M,E,S);for(let _=0;_<138;_++){let M=-24+p()*49,E=_%2?1:-1,S=_<93,w=l(M)+E*(h(M)+(S?-.21+p()*1.15:2.1+p()*9));(S||p()<.35)&&f(w,M,.1+p()**2*(S?.53:.82)),_%9===0&&u(w,M)>.38&&m(_%18?"fern":"bush",w,M,.39+p()*.41)}for(let[_,M,E]of[[-17.6,-9.65,1.22],[-17.08,-9.14,.65],[-8.48,6.58,.76],[12.65,-15.1,1.13],[14.61,-15.78,.72],[15.7,-12.9,.86],[14.9,11.24,.86]])f(_,M,E);for(let[_,M,E]of[[c-.4,-1.02,.64],[c-.08,1.13,.56],[c+.45,-.97,.7],[c+.72,.76,.57],[c+.97,-1.15,.4],[c+1.45,1.16,.46]])f(l(_)+M,_,E);for(let[_,M,E]of[[-16.7,1.4,.64],[-15.85,.96,.33],[-11.9,1.21,.43],[-10.65,.71,.33],[-5.2,1.12,.34],[-4.77,1.69,.23],[-2.9,1.61,.56],[4.96,1.81,.56],[5.48,1.03,.31],[11.83,1.74,.77],[12.6,.99,.48]])f(_,o(_)-M,E);ub(d,p,t,r);for(let _=0;_<140;_++){let M=-21+p()*43,E=_<84?l(M)+(_%2?1:-1)*(h(M)+.53+p()*2.6):-8.2+p()*26;if(u(E,M)<.27||a(E,M)<2.6)continue;let S=p();for(let w=0;w<3;w++){let R=E+(p()-.5)*.45,b=M+(p()-.5)*.45,v=op(R,t(R,b),b,S,p);g(R,b,0)?v.geometry.dispose():d.add(v)}}for(let[_,M,E,S]of[[-7.8,6.8,.67,1.29],[-16.6,-3.6,1.92,1.11],[13.6,8.2,.76,1.24]])a(_,M)<1.3||d.add(ap(_,t(_,M),M,E,S));for(let[_,M,E,S]of[["pine",-32.3,10.5,1.1],["spruce",-34.1,9.1,.9],["golden",-30.8,12.4,.96],["bush",-30.2,10.6,.69],["birch",-24.3,-14.1,.9],["fern",-23.2,-13.6,.67],["oak",-21.7,-22.7,1.1],["pine",-23.7,-22,.88],["bush",-20.9,-21.6,.61],["spruce",-4.8,-34,.92],["pine",-5.6,-35.9,1.05],["amber",3.9,-36,.89],["bush",4.2,-34.9,.64]])m(_,M,E,S);for(let[_,M,E]of[[-31.9,11.3,.83],[-31.2,11,.46],[-32.4,12,.32],[-22.3,-22.1,.75],[-21.6,-21.8,.44],[-23.8,-13.4,.57],[-3.8,-33.9,.84],[-4.5,-33.2,.56],[3.7,-34.6,.66]])f(_,M,E);return s?d:Je(d)}function db(n){let t=new yn([[1.35,9.25],[1.72,7.9],[1.4,6.6],[.56,5.4],[.12,4.32],[.05,3.52],[.18,2.35]].map(cs)),e=[],i=[],s=[],r=[-1,-.74,0,.74,1],o=new yt("#bba271"),a=57;for(let l=0;l<=a;l++){let h=l/a,{x:u,z:d}=t.getPointAt(h),p=t.getTangentAt(h),x=(.48+.052*Math.sin(l*.49))*Uh(.46,1,Ka(h,0,.17)*(1-Ka(h,.86,1))),g=Ka(h,0,.15)*(1-Ka(h,.88,1));for(let[m,f]of r.entries()){let y=u+p.z*x*f,_=d-p.x*x*f;e.push(y,n(y,_)+.032,_);let M=.98+.05*Math.sin(l*.39+f);if(i.push(o.r*M,o.g*M,o.b*M,(1-Math.abs(f)**3)*g),l&&m){let E=(l-1)*r.length+m-1,S=E+r.length;s.push(E,S,E+1,E+1,S,S+1)}}}let c=new Vt(Ii(e,i,s,4),new Ae({vertexColors:!0,roughness:.99,transparent:!0,depthWrite:!1,side:ze}));return c.receiveShadow=!0,c}function pb(n,t,e){let i=new jt,s=new jt;if(s.name="H\xE0ng r\xE0o an to\xE0n",t)for(let r of lp(n,e)){s.add(Lh(r));for(let[o,a]of r.entries()){if(e.push({x:a.x,z:a.z,radius:.12,kind:"fence"}),!o)continue;let c=r[o-1];for(let l of[.25,.5,.75])e.push({x:Uh(c.x,a.x,l),z:Uh(c.z,a.z,l),radius:.12,kind:"fence"})}}else{i.add(db(n));let r=[[[-3.75,-1.45],[-3.88,-.12],[-3.54,1.42],[-2.72,2.53],[-1.66,3.25],[-.63,3.52]],[[.73,3.5],[1.97,3.2],[3.16,2.68]]];for(let o of r)s.add(Lh(o.map(cs).map(({x:a,z:c})=>({x:a,y:n(a,c),z:c}))))}return i.add(s),i}function fp(n,{surfaceY:t,blockers:e,plannedHill:i,clearGround:s,editableScenery:r,showHillDetails:o,layout:a}){let c=r?new WeakMap:void 0,l=hb(e,t,i,s,c,a),h=fb(e,t,i,s,c,a);if(r)for(let d of[...l.children])d.position.z>=-25&&h.add(d);let u=r?up(h,t,c):null;return n.add(l,u?.group??h),o&&n.add(pb(t,i,e)),u}var mb=[[-36.5,-11.8,4.2,9.1,13.4],[-36.7,8.2,3.6,10.5,10],[8.5,-24,4.6,10.4,7],[18.6,-19.8,6.2,8.1,8.2],[26,-10,4.4,9.2,10.3],[23.6,10.9,3.6,7.6,9.1],[4.4,22,2.6,12.8,7.3],[-18.6,22,2.4,8,9.1]],gb=[[-40,10,7.7,10.4,11.2],[-38.2,3.3,7.9,10.1,10],[-38,-4.8,7.1,9.8,10.2],[-34.4,-13.1,6.5,9.7,10.2],[-30.2,-21,5.6,9.3,9.4],[-24,-27.9,5.3,9,8.7],[-17.2,-33.1,4.4,8.8,7.5]],Zt=kt.smoothstep,xe=kt.lerp,Dn=-8.25,$n=-43,Ee={start:-36.45,end:-35.28,drop:6.4},lo=-1.54,Oh=n=>17.8-.72*n+1.7*Math.sin(n*.14+.65)-3.1*Math.exp(-(((n+6.1)/6.2)**2))+1.7*Math.exp(-(((n-9)/8)**2)),us=(n,t)=>Oh(n)-t,xb=n=>-12.4+1.9*Math.sin(.205*n+.74)+1.1*Math.sin(.094*n-.4)+7.3*Zt(n,9,24)+10.3*(1-Zt(n,-19.1,-10.9)),Un=n=>xe(-.3+.59*(n-Ee.start),xb(n),Zt(n,-36.5,-20)),Ni=n=>(1.25+.2*Math.sin(.23*n-.4)+.12*Math.sin(.57*n)+.49*Math.exp(-(((n-Dn-3)/2.8)**2))+.68*Zt(n,15,20)+.94*Math.exp(-(((n-Ee.start+3.25)/2.55)**2))+.47*Math.exp(-(((n-Ee.end-.9)/1.65)**2)))*xe(.25,1,Zt(n,$n,$n+1.5)),ui=n=>xe(-.51-.006*n-.65*Zt(n,Dn-.65,Dn+.72)-.13*Zt(n,8.5,10.4)+Ee.drop*(1-Zt(n,Ee.start,Ee.end)),lo+.012,Zt(n,14,21)),ho=(n,t)=>Math.max(Math.abs(n-Un(t))-Ni(t),$n-t),ja=(n,t)=>Math.min(ho(n,t),us(n,t)),zh=[...Array.from({length:249},(n,t)=>(t-124)*.5),Dn-.93,Dn-.59,Dn-.23,Dn+.28,Dn+.61,Dn+.93,...Array.from({length:13},(n,t)=>xe(Ee.start-.2,Ee.end+.2,t/12))].sort((n,t)=>n-t),hs=zh.filter(n=>n>=$n&&n<=25.5);function Xn(n,t){if(us(n,t)<=0)return{kind:"sea",y:lo-.012};if(t<hs[0]||t>hs.at(-1))return null;let e=0,i=hs.length-1;for(;i-e>1;){let l=e+i>>1;hs[l]<=t?e=l:i=l}let s=hs[e],r=hs[i],o=(t-s)/(r-s),a=xe(Un(s),Un(r),o);return Math.abs(n-a)>xe(Ni(s),Ni(r),o)?null:{kind:t>=Ee.start-.16&&t<=Ee.end+.33?"falls":"river",y:xe(ui(s),ui(r),o)}}var pp=(n,t)=>Zt(n,-9.65,-7.2)*(1-Zt(n,-4.6,-1.15))*Zt(t,-15.1,-6.8)*(1-Zt(t,6.8,11.7)),mp=(n,t)=>Math.hypot((n-vn.x)/6.9,(t-vn.z)/6.1),gp=(n,t)=>Zt(-Nd(n,t),.83,1.85)*Zt(zd(n,t),-1.3,.35),xp=(n,t,e)=>{let i=mp(n,t),s=1-Zt(i,.62,1.25);return e?xe(s,1-Zt(i,.65,.735),gp(n,t)):s};function _p(n,t){let e=0;for(let[i,s,r,o,a]of gb){let c=(n-i)/o,l=(t-s)/a,h=Math.atan2(l,c),u=1+.13*Math.cos(h*5+.43)+.09*Math.sin(h*3-.27),d=Math.hypot(c,l)/u;e=Math.max(e,r*Math.max(0,1-d)**1.37)}return e}function dp(n,t,e){let i=.11+.12*Math.sin(n*.24+t*.18)+.1*Math.cos(t*.32-n*.18);for(let[l,h,u,d,p]of mb){let x=((n-l)/d)**2+((t-h)/p)**2;i+=u*Math.exp(-x)}let s=Un(t)-n-Ni(t),r=Zt(s,2.45,3.75)*(1-Zt(s,5.35,7.45))*Zt(t,-9.1,-5.4)*(1-Zt(t,7.4,11.5));i=xe(i,1.47+.08*Math.cos(t*.24),r*.89);let o=(Ee.drop+2.1)*Math.exp(-(((n-Un(t))/7.5)**2))*Zt(t,$n-7.2,$n)*(1-Zt(t,Ee.start-.18,Ee.end+3.1));i+=o+1.65*pp(n,t)+_p(n,t)+.13*Math.sin(n*.43+t*.37)*Zt(i,.45,2.6);let a=1-Zt(Math.hypot((n+17.8)/9.2,(t+17.9)/7.2),.58,1.18);if(i=xe(i,2.05+.21*Math.sin(t*.24),a),e&&(i=xe(i,.83,Bd(n,t))),i=xe(i,vn.height,xp(n,t,e)),!e)return i;let c=Mn(n,t);return c?xe(i,c.height-.055,1-Zt(c.distance,1.36,1.95)):i}function Qa(n,t,e=!1){let i=ho(n,t),s=us(n,t);if(s<0)return lo-.1-1.36*Zt(-s,0,7.8);let r=lo-.1+s*.27;if(i<0)return Math.min(ui(t)-.04-.66*Zt(-i,0,1.2),xe(r,dp(n,t,e),Zt(s,.55,5.2)));let o=xe(ui(t)-.04,dp(n,t,e),Zt(i,0,3.35)),a=xe(r,o,Zt(s,.55,5.2));if(!e||i<.26)return a;let c=Ui(n,t),l=Fd(n,t,a);return c?xe(l,c.height-.04,1-Zt(c.distance,.73,1.18)):l}function _b(n,t,e){let i=[0,.4,.73,.94,1,1.16,1.37,1.62,1.95,2.35,2.83,3.36,3.95];for(let E=4.65;E<80;E+=.7)i.push(E),t&&E>10&&E<36&&i.push(E+.35);let s=[...i.slice(1).reverse().map(E=>-E),...i],r=[],o=[],a=[],c=new yt("#a4ad68"),l=new yt("#c0b878"),h=new yt("#6d9455"),u=new yt("#708e5c"),d=new yt("#c0a878"),p=new yt("#6b8e6a"),x=new yt("#d0be90"),g=new yt("#908880"),m=new yt("#b8ac98"),f=new yt,y=t?[...zh,...Array.from({length:25},(E,S)=>-15.25+S*.5)].sort((E,S)=>E-S):zh;for(let[E,S]of y.entries()){let w=Ni(S);for(let R=0;R<s.length;R++){let b=s[R],v=Math.abs(b),A=Un(S)+Math.sign(b)*(v<=1?w*v:w+v-1),I=n(A,S),z=ho(A,S),P=us(A,S),D=Math.sin(A*.38+S*.27)*Math.cos(S*.23-A*.12);if(f.copy(c).lerp(l,.27+.18*D),f.lerp(h,Zt(I,.25,4.3)*.75),f.lerp(u,pp(A,S)*.23),f.lerp(l,xp(A,S,t)*(.24+.08*D)),f.lerp(u,Zt(I,1.4,3.6)*(Math.sin(A*.46-S*.34)*.17+.19)),f.lerp(h,(1-Zt(z,1.05,5.7))*(.16+.12*D)),f.lerp(l,Zt(Math.sin(A*.41+S*.23)*Math.sin(S*.32-A*.19),.4,.85)*.19),z>=0?f.lerp(d,(1-Zt(z,.18,.91))*.88):f.copy(p),f.lerp(g,Zt(_p(A,S),1.35,4.18)*.91),t&&Math.abs(A-vn.x)<9&&Math.abs(S-vn.z)<9){let N=mp(A,S),V=Zt(N,.64,.67)*(1-Zt(N,.735,.78))*gp(A,S),H=g.clone().lerp(m,.42+Math.sin(I*13+D)*.2);f.lerp(H,V*.94)}if(f.lerp(m,Zt(I,7.4,11.1)*.62),P<4.2&&f.lerp(x,(1-Zt(P,1.25,4.2))*.92),r.push(A,I,S),o.push(f.r,f.g,f.b),E&&R){let N=(E-1)*s.length+R-1,V=N+1,H=N+s.length,G=H+1;(E+R)%2?a.push(N,H,V,V,H,G):a.push(N,H,G,N,G,V)}}}let _=Ii(r,o,a);e==="earth"&&qd(_,ho,us);let M=new Vt(_,new Ae({vertexColors:!0,roughness:.96}));return M.receiveShadow=!0,{mesh:M,vertexColumns:s.length,surfaceY:yb(_.attributes.position,s.length,n)}}function yb(n,t,e){function i(s,r,o){let a=0,c=s-1;for(;c-a>1;){let l=c+a>>1;r(l)<=o?a=l:c=l}return a}return(s,r,o)=>{let a=n.count/t,c=w=>n.getZ(w*t);if(r<c(0)||r>c(a-1))return e(s,r);let l=i(a,c,r),h=(r-c(l))/(c(l+1)-c(l)),u=w=>xe(n.getX(l*t+w),n.getX((l+1)*t+w),h);if(s<u(0)||s>u(t-1))return e(s,r);let d=i(t,u,s),p=l*t+d,x=p+1,g=p+t,m=g+1,f=w=>o?.get?.(w)??n.getY(w),y=(l+d)%2===1,_=y?xe(n.getX(x),n.getX(g),h):xe(n.getX(p),n.getX(m),h),M=y?xe(f(x),f(g),h):xe(f(p),f(m),h),E=u(s<=_?d:d+1),S=s<=_?xe(f(p),f(g),h):xe(f(x),f(m),h);return Math.abs(E-_)<1e-7?M:xe(M,S,(s-_)/(E-_))}}function vb(){let n=[-1.17,-1,-.84,-.58,0,.58,.84,1,1.17],t=[],e=[],i=[],s=new yt("#82b5b2"),r=new yt("#549aa7"),o=new yt("#75aaaf"),a=new yt("#c2ded8"),c=new yt;for(let[h,u]of hs.entries())for(let[d,p]of n.entries()){let x=Un(u)+p*Ni(u);c.copy(r).lerp(s,Zt(Math.abs(p),.47,1.08)*.91),c.lerp(s,(1-Zt(Math.abs(u-Dn),.24,1.12))*.51);let g=Zt(u,Ee.start-.13,Ee.start+.11)*(1-Zt(u,Ee.end,Ee.end+.48));c.lerp(a,g*(.71+.11*Math.cos(p*10))),c.lerp(o,Zt(u,15.2,21.3)*.86),c.multiplyScalar(.97+Math.sin(u*.39+p)*.036),t.push(x,ui(u),u);let m=-us(x,u),f=1-Zt(m,.15,2.2),y=1-Zt(Math.abs(p),.63,1.16)*Zt(m,.08,.92);if(e.push(c.r,c.g,c.b,f*y*Zt(u,$n,$n+.42)),h&&d){let _=(h-1)*n.length+d-1,M=_+n.length;i.push(_,M,_+1,_+1,M,M+1)}}let l=new Vt(Ii(t,e,i,4),new Ae({vertexColors:!0,roughness:.73,transparent:!0,depthWrite:!1}));return l.receiveShadow=!0,l.renderOrder=1,l}function Mb(){let n=[-.66,-.18,.18,.52,.9,1.34,2,3.1,4.8,7.4,12,22,46,81],t=[],e=[],i=[],s=new yt("#538b9f"),r=new yt("#90bfba"),o=new yt("#c4d4bf"),a=new yt;for(let l=0;l<=248;l++){let h=(l-124)*.62;for(let[u,d]of n.entries()){let p=Oh(h)+d;a.copy(r).lerp(s,Zt(d,.45,8.9));let x=(1-Zt(Math.abs(d-.55),.11,.73))*(.2+.12*Math.sin(h*.42));if(a.lerp(o,x),a.multiplyScalar(.98+.026*Math.sin(h*.46+d*.64)),t.push(h,lo-.012,p),e.push(a.r,a.g,a.b),l&&u){let g=(l-1)*n.length+u-1,m=g+n.length;i.push(g,g+1,m,g+1,m+1,m)}}}let c=new Vt(Ii(t,e,i),new Ae({vertexColors:!0,roughness:.7}));return c.receiveShadow=!0,c}function bb(){let n=new Uint8Array(2048);for(let e=0;e<32;e++)for(let i=0;i<16;i++){let s=Math.sin(Math.PI*i/15),r=Math.sin(Math.PI*e/31);n.set([255,255,255,Math.round(240*s*r**1.45)],(i+e*16)*4)}let t=new Aa(n,16,32);return t.magFilter=t.minFilter=cn,t.needsUpdate=!0,t}function Eb(n,t){let e=dn(825),i=[{count:48,origin:Ee.end,span:20.8-Ee.end,whitewater:!1},{count:9,origin:$n+.6,span:Ee.start-$n-.6,whitewater:!1},{count:29,origin:Dn-.54,span:2.75,whitewater:!0},{count:26,origin:Ee.end-.04,span:2.15,whitewater:!0}].flatMap(({count:o,origin:a,span:c,whitewater:l})=>Array.from({length:o},()=>({start:e()*c,side:(e()-.5)*(l?1.64:1.82),width:.032+e()*(l?.135:.067),length:.12+e()**1.5*(l?.47:.84),yaw:(e()-.5)*(l?1.36:.46),speed:.24+e()*(l?1:.3),origin:a,span:c}))),s=new qr(new js().rotateX(-Math.PI/2),new en({color:"#e0f0de",map:t,transparent:!0,opacity:.61,depthWrite:!1}),i.length);s.frustumCulled=!1,s.renderOrder=2,s.instanceMatrix.setUsage(ss),n.add(s);let r=new Oe;return o=>{for(let[a,c]of i.entries()){let l=(c.start+o*c.speed)%c.span,h=c.origin+l,u=c.span>3?1:Math.sin(Math.PI*l/c.span)**.4;r.position.set(Un(h)+c.side,ui(h)+.018,h),r.rotation.y=Math.atan2(Un(h+.05)-Un(h-.05),.1)+c.yaw,r.scale.set(c.width*u,1,c.length*u),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}s.instanceMatrix.needsUpdate=!0}}function Sb(n,t){let e=dn(342),i=Array.from({length:42},()=>({start:e(),side:(e()-.5)*1.72,speed:.7+e()*.62,width:.043+e()*.11,length:.42+e()*1.3})),s=new qr(new js,new en({color:"#f0f8e9",map:t,transparent:!0,opacity:.78,depthWrite:!1,side:ze}),i.length);s.frustumCulled=!1,s.renderOrder=3,s.instanceMatrix.setUsage(ss),n.add(s);let r=new Oe,o=new k(0,1,0),a=new k;return c=>{for(let[l,h]of i.entries()){let u=(h.start+c*h.speed)%1,d=xe(Ee.start+.03,Ee.end,u),p=Math.sin(u*Math.PI)**.65;a.set(0,ui(d+.025)-ui(d-.025),.05).normalize(),r.quaternion.setFromUnitVectors(o,a),r.position.set(Un(d)+h.side*Ni(d),ui(d)+.018,d+.042),r.scale.set(h.width*p,h.length*p,1),r.updateMatrix(),s.setMatrixAt(l,r.matrix)}s.instanceMatrix.needsUpdate=!0}}function uo({plannedHill:n=!1,clearGround:t=()=>!1,gradeGround:e=(a,c,l)=>l,showHillDetails:i=!0,editableScenery:s=!1,showScenery:r=!0,groundPalette:o}={}){let a=new jt,c=(f,y)=>e(f,y,Qa(f,y,n)),{mesh:l,vertexColumns:h,surfaceY:u}=_b(c,n,o),d=[];a.add(l,vb(),Mb());let p=r?fp(a,{surfaceY:u,blockers:d,plannedHill:n,clearGround:t,editableScenery:s,showHillDetails:i,layout:{coastZ:Oh,inland:us,rapid:Dn,riverX:Un,riverWidth:Ni,riverOffset:ho,waterfall:Ee}}):null,x=bb(),g=Eb(a,x),m=Sb(a,x);return{group:a,ground:l,vertexColumns:h,surfaceY:u,waterAt:Xn,blockers:d,scenery:p,updateWater(f){g(f),m(f)}}}var wb=(n,t,e)=>e.has(lt({x:Math.floor(n),z:Math.floor(t)}));function Tb(n,t){if(!n?.points?.length)return!1;let e=new Set(t.map(lt)),i=Li(n.points);for(let s of i)for(let r=-n.width/2+.045;r<=n.width/2-.045;r+=.11)if(!wb(s.x-s.dz*r,s.z+s.dx*r,e))return!1;return!0}function yp(n,{material:t="dirt"}={}){if(!n?.points||n.points.length<3||!n?.cells?.length)return null;let e=n.slices?.[0]?.length??1,i=Math.min(.92,Math.max(.26,e*.48)),s=o=>[o.reduce((a,c)=>a+c.x+.5,0)/o.length,o.reduce((a,c)=>a+c.z+.5,0)/o.length],r=os([s(n.slices[0]),...(n.corners??[]).map(s),s(n.slices.at(-1))],.12);for(let o of[1,.78,.58,.4,.24]){let a=Va(r,i*o);if(!a)continue;let c={id:`rounded:${lt(n.cells[0])}:${lt(n.cells.at(-1))}`,cells:n.cells.map(lt),points:a,width:e,material:t,radius:i*o};if(Tb(c,n.cells))return c}return null}function vp(n,t){if(!t)return n;let e=new Map(n);if(t.cells.map(r=>e.get(r)).some(r=>!r||r.bridgeId||r.approachBridgeId))return n;for(let r of t.cells)e.set(r,{...e.get(r),roadVisualId:t.id});let s=t.cells[0];return e.set(s,{...e.get(s),roadVisual:t}),e}function Mp(n){let t=[];for(let e of n.values()){let i=e.roadVisual;!i||i.cells.some(s=>n.get(s)?.roadVisualId!==i.id)||t.push(i)}return t}var bp=1,En={left:-15,right:16,top:-15,bottom:12},Bh=[{x:-1,z:-4,w:3,d:3,gate:{x:0,z:-1}},{x:2,z:-6,w:4,d:5,gate:{x:4,z:-1}},{x:-2,z:1,w:3,d:3,gate:{x:-1,z:0}},{x:1,z:1,w:3,d:3,gate:{x:2,z:0}},{x:4,z:2,w:3,d:4,gate:{x:5,z:1}},{x:-7,z:-4,w:3,d:4,gate:{x:-6,z:-5},future:!0},{x:-2,z:4,w:6,d:3,gate:{x:0,z:7},future:!0}],Ab=[0,.5,1].flatMap(n=>[0,.5,1].map(t=>[n,t])),Fh=new Map,Rb=(n,t)=>t.x>=n.x&&t.x<n.x+n.w&&t.z>=n.z&&t.z<n.z+n.d,fs=n=>Bh.find(t=>Rb(t,n));function fo(n){let t=lt(n);if(Fh.has(t))return Fh.get(t);let{x:e,z:i}=n,s=Ab.map(([l,h])=>[e+l,i+h]),r=s.map(([l,h])=>Qa(l,h,!0)),o=Math.min(...r),a=Math.max(...r),c={low:o,high:a,rise:a-o,clearance:Math.min(...s.map(([l,h])=>ja(l,h)))};return Fh.set(t,c),c}function kh(n){let{x:t,z:e}=n,{rise:i,clearance:s}=fo(n);if(s<.12)return"water";if(s<.85)return"buffer";let r=t>=-4&&t<=11&&e>=-7&&e<=7,o=t>=-8&&t<=13&&e>=-13&&e<=9&&(t<4||e>=-9);return i>.72?"slope":i>.38?r||o?"terrace":"buffer":fs(n)?.future||t>=-6&&t<=-1&&e>=-10&&e<=-5?"expansion":r?"core":o?"expansion":"buffer"}function Hh(n,t=fs){let{x:e,z:i}=n;if(e<En.left||e>En.right||i<En.top||i>En.bottom)return"Ngo\xE0i khu v\u1EF1c quy ho\u1EA1ch.";if(t(n))return"\xD4 n\xE0y thu\u1ED9c l\xF4 c\xF4ng tr\xECnh.";let{rise:s,clearance:r}=fo(n);return r<.12?"\u0110\u01B0\u1EDDng kh\xF4ng \u0111i qua l\xF2ng su\u1ED1i ho\u1EB7c bi\u1EC3n.":r<.55?"Ch\u1EEBa kho\u1EA3ng \u0111\u1EC7m \u1EDF b\u1EDD n\u01B0\u1EDBc.":s>.8?"\xD4 qu\xE1 d\u1ED1c \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng.":""}function Gh(n,t=(i,s)=>Qa(i,s,!0),e=fo){for(let i of n){if(i.width===1)continue;let s=i.hi+1;for(let r of[0,.5,1]){let o=i.t+r,a=c=>i.axis===Et?t(o,c):t(c,o);if(Math.abs(a(i.lo)-a(s))/i.width>.18)return"M\u1EB7t \u0111\u01B0\u1EDDng xe b\u1ECB d\u1ED1c ngang qu\xE1 18%."}if(i.cells.some(r=>e(r).rise>.45))return"\u0110o\u1EA1n d\u1ED1c n\xE0y ph\xF9 h\u1EE3p v\u1EDBi l\u1ED1i \u0111i b\u1ED9 1\xD7."}return""}var Ce=(n,t,e,i)=>[{x:n,z:t},{x:e,z:i}],Cb=[Ce(-3,-1,11,-1),Ce(-3,0,11,0),Ce(7,-6,7,5),Ce(8,-6,8,5),Ce(6,-2,11,-2),Ce(9,1,11,1),Ce(5,0,5,1),Ce(-3,-13,-3,0),Ce(-7,-13,-3,-13),Ce(-7,-13,-7,-5),Ce(7,5,7,8),Ce(8,5,8,8),Ce(-3,7,8,7),Ce(-2,8,8,8),Ce(-3,0,-3,7),Ce(5,6,5,7),Ce(-3,-7,-3,0),Ce(-2,-7,-2,0),Ce(-7,-7,-2,-7),Ce(-7,-6,-2,-6),Ce(-7,-7,-7,-5),Ce(-6,-7,-6,-5)];function Pb(){let n=new Map;for(let[t,e]of Cb){let i=Wa(n,t,e,"dirt",Hh);if(i.error)throw new Error(`${lt(t)} \u2192 ${lt(e)}: ${i.error}`);n=i.roads}return n}function Ep(n){let t=Pb();return n>=2&&(t=or(t,[...t.values()].filter(({x:e,z:i})=>e>=1&&(e<=5||i>=2)),"stone")),n>=3&&(t=or(t,[...t.values()].filter(({x:e,z:i})=>e>=6&&i<2),"asphalt")),t}function Sp(n,t){let e=[...n.values()].filter(i=>Di.indexOf(i.material)>=t);return e.length?or(n,e,Di[t-1]):n}var tc=[[-2.5,-7.5],[-2.5,-12.5],[-6.5,-12.5],[-6.5,-5.5]];function ec(n,t){if(t.material!=="asphalt"||!t.cells)return 0;for(let{x:e,z:i}of t.cells)for(let[s,r]of[[1,0],[-1,0],[0,1],[0,-1],[0,0]]){let o=n.get(lt({x:e+s,z:i+r}));if(o?.axes!==(Et|Jt))continue;let a=[Et,Jt].map(c=>qe(n,o,c));if(a.every(c=>c.width>=2)&&a.some(c=>c.width>=3&&c.material==="asphalt"))return t.axis}return 0}function nc(n,t){let e=(n+(t===Jt?5:0))%10;return e<4?"green":e<4.7?"yellow":"red"}var ds=new Pi;ds.moveTo(-.14,-.066);ds.lineTo(.15,-.066);ds.lineTo(.285,0);ds.lineTo(.15,.066);ds.lineTo(-.14,.066);ds.closePath();function wp(n,t=!1){let e=new jt;e.userData.arrows=n;let i=.67+.158*(n.length-1);Ln(e,.096,i,.096,t?"#6d756f":"#876545",0,-.045,0,.013);for(let[s,{x:r,z:o}]of n.entries()){let a=new jt;a.position.y=.505+s*.158,a.rotation.y=Math.atan2(-o,r),e.add(a);let c=new es(ds,{depth:.039,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:1,steps:1});c.translate(0,0,-.0195);let l=new Vt(c,Re(t?"#377f94":["#b38a5d","#c19a68","#aa8054"][s]));a.add(l);for(let h of[-1,1])if(t){de(a,.23,.028,.007,"#f5ead0",.035,0,h*.028);let u=de(a,.076,.022,.007,"#f5ead0",.15,0,h*.029);u.rotation.z=Math.PI/4;let d=de(a,.076,.022,.007,"#f5ead0",.15,0,h*.029);d.rotation.z=-Math.PI/4,u.position.y-=.022,d.position.y+=.022}else for(let u of[-.043,.043])de(a,.019,.019,.009,"#786650",u,-.0095,h*.029)}return Je(e)}var pn=60,po=([n,t],[e,i])=>Math.hypot(e-n,i-t),sc=n=>n.slice(1).reduce((t,e,i)=>t+po(n[i],e),0);function rc(n,t){let e=[[0,t.left,1],[0,t.right+1,-1],[1,t.top,1],[1,t.bottom+1,-1]],i=Array.from({length:192},(s,r)=>{let o=r*Math.PI/96;return[n[0]+pn*Math.cos(o),n[1]+pn*Math.sin(o)]});for(let[s,r,o]of e){let a=c=>(c[s]-r)*o>=0;i=i.flatMap((c,l,h)=>{let u=h[(l+h.length-1)%h.length];if(a(u)===a(c))return a(c)?[c]:[];let d=(r-u[s])/(c[s]-u[s]),p=u.map((x,g)=>g===s?r:x+(c[g]-x)*d);return a(c)?[p,c]:[p]})}return{outline:i,contains:s=>s[0]>=t.left&&s[0]<t.right+1&&s[1]>=t.top&&s[1]<t.bottom+1&&Math.hypot(s[0]-n[0],s[1]-n[1])<=pn}}var ic=(n,t,e)=>n===Et?{x:t,z:e,axes:Et}:{x:e,z:t,axes:Jt},Vh=(n,t)=>Math.ceil(n-t/2-.5-1e-9);function Wh(n,t,e){if(n.length<2)return n;n=os(n,.18);let i=ci(t),s=[...n];for(let[r,o]of[[0,1],[n.length-1,-1]]){let a=n[r],c=n[r+o],l=po(a,c);if(l<.24)continue;let h=[(c[0]-a[0])/l,(c[1]-a[1])/l],u=.58,d=g=>{let m=po(a,g);m<u&&po(c,g)>=.24&&(u=m,s[r]=g)};for(let g of i.values())for(let[m,[f,y]]of sr(g))h[0]*f+h[1]*y>.76&&d(m);let p=Math.floor(a[0]),x=Math.floor(a[1]);for(let g=p-1;g<=p+1;g++)for(let m=x-1;m<=x+1;m++){let f=t.get(lt({x:g,z:m}));if(!f||f.bridgeId||f.approachBridgeId||f.roadCurveId||![Et,Jt].includes(f.axes))continue;let y=f.axes===Et?0:1;if(Math.abs(h[y])<.93)continue;let _=qe(t,f,f.axes),M=Math.sign(h[y]);if(_.width!==e||_.cells.some(S=>t.get(lt(ic(f.axes,_.t+M,f.axes===Et?S.z:S.x)))?.axes&f.axes))continue;let E=(_.lo+_.hi+1)/2;d(f.axes===Et?[_.t+.5,E]:[E,_.t+.5])}}return s}function hr(n,t){let e=os(n.filter((h,u)=>!u||po(n[u-1],h)>.001),.18),i=sc(e),s=[],r=[],o=[],a=new Map,c=h=>{for(let u of h){let d=lt(u);a.set(d,{...u,axes:u.axes|(a.get(d)?.axes??0)})}},l=h=>({points:e,length:i,slices:s,corners:r,steps:o,cells:[...a.values()],error:h});if(i<.24)return l("Ch\u1ECDn \u0111i\u1EC3m cu\u1ED1i kh\xE1c \u0111i\u1EC3m \u0111\u1EA7u.");if(i>pn+1e-9)return l("Tim tuy\u1EBFn d\xE0i qu\xE1 60 \u0111\u01A1n v\u1ECB.");if(!Number.isInteger(t)||t<1||t>4)return l("Ch\u1ECDn b\u1EC1 r\u1ED9ng t\u1EEB 1\xD7 \u0111\u1EBFn 4\xD7.");for(let h=1;h<e.length;h++){let[u,d]=e[h-1],[p,x]=e[h],g=p-u,m=x-d,f=Math.abs(g)>=Math.abs(m)?Et:Jt,[y,_,M,E]=f===Et?[u,p,d,m]:[d,x,u,g],S=Math.floor(y),w=Math.floor(_),R=Math.sign(w-S),b=null;for(let N=0;N<=Math.abs(w-S);N++){let V=S+N*R,H=Math.max(0,Math.min(1,(V+.5-y)/(_-y))),G=Vh(M+H*E,t),O=Array.from({length:t},(K,Y)=>ic(f,V,G+Y));s.push(O),c(O);let B={segment:h,point:[u+g*H,d+m*H],cells:O};if(o.push(B),t===1&&b!==null&&b!==G){let K=Math.min(V,V-R),Y=R>0?G:b,st=ic(f,K,Y),ot=R>0?b:G,Q=[st,ic(f,K,ot)].map(ht=>({...ht,axes:Et|Jt}));c(Q),B.cells=[...O,...Q]}b=G}if(h===e.length-1)continue;let[v,A]=e[h+1];if(Math.abs(Math.atan2(g*(A-x)-m*(v-p),g*(v-p)+m*(A-x)))<Math.PI/3&&f===(Math.abs(v-p)>=Math.abs(A-x)?Et:Jt))continue;let z=Vh(p,t),P=Vh(x,t),D=[];for(let N=z;N<z+t;N++)for(let V=P;V<P+t;V++)D.push({x:N,z:V,axes:Et|Jt});r.push(D),c(D),o.push({segment:h,point:e[h],cells:D})}return l("")}function oc(n,t,e){let i=n.steps.findIndex(r=>r.cells.some(e));if(i<0)return null;let s=n.steps[i].cells.find(e);for(let r=i-1;r>=0;r--){let{segment:o,point:a}=n.steps[r],c=hr([...n.points.slice(0,o),a],t);if(c.error||c.cells.some(e))continue;let l=new Set(c.cells.map(lt));return{route:c,blocked:s,discarded:n.cells.filter(h=>!l.has(lt(h)))}}return{route:null,blocked:s,discarded:n.cells}}var Pe={bridgeLimit:6,deckThickness:.22,clearance:.3,crossSlope:.18,cutFill:.22,approachCut:.25,approachFill:.85,approachExtension:3,pillarHeight:4};var an=(n,t)=>t===Et?n.x:n.z,Ye=(n,t)=>t===Et?n.z:n.x,ke=(n,t,e)=>n===Et?{x:t,z:e}:{x:e,z:t},ur=(n,t)=>n.x===t.x?Jt:Et,fr=n=>n===1?.35:.27,Ib=[[1,0],[-1,0],[0,1],[0,-1]],Xh=(n,t)=>Math.abs(n.x-t.x)+Math.abs(n.z-t.z),qh=(n,t,e,i)=>Array.from({length:Math.abs(e-t)+1},(s,r)=>ke(n,t+r*Math.sign(e-t),i));function zi(n,t){if(!n.length)return[t];if(hi(n.at(-1),t))return n;let e=[...n],{x:i,z:s}=e.at(-1),r=Math.abs(t.x-i),o=Math.abs(t.z-s),a=Math.sign(t.x-i),c=Math.sign(t.z-s),l=0,h=0;for(;l<r||h<o;){l<r&&(h===o||(l+.5)*o<=(h+.5)*r)?(i+=a,l++):(s+=c,h++);let u={x:i,z:s};hi(u,e.at(-2))?e.pop():e.push(u)}return e}function Yh(n,t,e){return Array.from({length:e},(i,s)=>ke(t,an(n,t),Ye(n,t)+s))}function cc(n,t,e,i,s){let r=an(n,t),o=Ye(n,t),a=ke(t,r+.5,o+e/2),c=({x:f,z:y})=>i(f,y),l=[],h=[],u=null,d=null,p=0;for(let f of[.02,.25,.5,.75,.98]){let y=[];for(let E=0;E<e;E++)for(let S of[.02,.25,.5,.75,.98]){let w=ke(t,r+f,o+E+S),R=s(w.x,w.z);R&&R.kind!=="river"&&(d=R),R&&(!u||R.y>u.y)&&(u=R),y.push(c(w))}let _=c(ke(t,r+f,o+.02)),M=c(ke(t,r+f,o+e-.02));p=Math.max(p,Math.abs(_-M)/(e-.04)),l.push(...y),h.push({t:r+f,low:Math.min(...y),high:Math.max(...y)})}let x=[0,.25,.5,.75,1].map(f=>c(ke(t,r+f,o+e/2))),g=[0,1].map(f=>Math.max(...Array.from({length:e*4+1},(y,_)=>c(ke(t,r+f,o+_/4))))),m=Math.max(...x.slice(1).map((f,y)=>Math.abs(f-x[y])*4));return{...a,t:r,side:o,axis:t,water:u,prohibitedWater:d,maxCrossSlope:p,grade:m,profile:x,crossHeights:h,edgeCrown:g,y:c(a),low:Math.min(...l),high:Math.max(...l),cells:Yh(n,t,e)}}function ac(n,t,e,i,s,r,o){let a=n[t-e]?.axis,c=n[t-e]?.side,l=[],h=!1;for(let u=t;u>=0&&u<n.length;u+=e){let d=n[u];if(d.axis!==a||d.side!==c||d.water||d.turn)break;l.push({station:d,i:u});let p=d.t+(d.t>=i?1:0),x=fr(r),g=p===d.t,m=d.profile[g?0:4],f=Math.abs(p-i)*x;if(Math.abs(m-s)>f+1e-6)continue;let y=Math.min(d.edgeCrown[g?0:1],m+.35,s+f),_=S=>s+(y-s)*((S-i)/(p-i)),M=[],E=!0;for(let S of l){let w=Math.max(...S.station.crossHeights.map(b=>b.high-_(b.t)));if(Math.max(...S.station.crossHeights.map(b=>_(b.t)-b.low))>Pe.approachFill||w>(o?Pe.approachCut:.05)){E=!1,h=!0;break}w>.05&&M.push(S.i)}if(E)return{heightAt:_,endIndex:u,requiredCuts:M}}return{terrainBlocked:h}}function Lb(n,t,e){let i=new Map,s=(r,o)=>{let a=lt(r);i.set(a,{...r,axes:(i.get(a)?.axes??0)|o})};for(let[r,o]of n.entries()){let a=e?.get(r),c=r?ur(n[r-1],o):null,l=r+1<n.length?ur(o,n[r+1]):null;if(c&&l&&c!==l)for(let h=0;h<t;h++)for(let u=0;u<t;u++)s({x:o.x+h,z:o.z+u},Et|Jt);else{let h=c??l??Et;for(let u of Yh(a?.cell??o,h,a?.width??t))s(u,h)}}return i}function Db(n,t,e){if(!t||n.length<3)return null;let i=(u,d)=>Math.abs(u.x-d.x)+Math.abs(u.z-d.z),s=n.reduce((u,d,p)=>i(d,t)<i(n[u],t)?p:u,0),r=Math.max(0,s-3),o=Math.min(n.length-1,s+3),a=n[r],c=n[o],l=[{cell:a,path:[a],distance:0,rank:i(a,c)}],h=new Map([[lt(a),0]]);for(let u=0;u<120&&l.length;u++){l.sort((p,x)=>x.rank-p.rank);let d=l.pop();if(hi(d.cell,c)){let p=[...n.slice(0,r),...d.path,...n.slice(o+1)];return lc({...e,cells:p,suggestDetour:!1}).error?null:p}for(let[p,x]of Ib){let g={x:d.cell.x+p,z:d.cell.z+x};if(i(g,t)>6)continue;let m=p?Et:Jt,f=cc(g,m,e.width,e.surfaceY,e.waterAt),y=e.width===1?.28:Pe.crossSlope,_=e.surfaceY(d.cell.x+(m===Et?.5:e.width/2),d.cell.z+(m===Jt?.5:e.width/2));if(f.water||f.cells.some(e.obstacle)||f.grade>fr(e.width)||Math.abs(f.y-_)>fr(e.width)||f.maxCrossSlope>y)continue;let M=d.distance+1,E=lt(g);M>=(h.get(E)??1/0)||(h.set(E,M),l.push({cell:g,path:[...d.path,g],distance:M,rank:M+i(g,c)}))}}return null}function Ub(n,t){let e=new Map;for(let i=1;i<n.length-1;i++){let s=n[i-1];if(s.turn||s.water)continue;let r;for(let o=i;o<Math.min(n.length-1,i+t);o++){let a=n[o];if(a.turn||a.water||a.axis!==s.axis||a.side!==s.side)break;let c=n[o+1];if(c.turn||c.water||c.axis!==s.axis||c.side!==s.side)continue;let l=n.slice(i,o+1),h=Math.min(s.y,c.y);l.every(u=>u.y<h-.05&&u.high<=h+.05)&&l.some(u=>u.low<h-.35)&&(r=o)}r!==void 0&&(e.set(i,r),i=r+1)}return e}function mo({roads:n,cells:t,width:e=1,material:i,surfaceY:s,waterAt:r,obstacle:o=()=>"",allowLeveling:a=!1,suggestDetour:c=!1,sections:l,elevated:h=!1,bridgeRetreat:u,readStation:d=(x,g,m)=>cc(x,g,m,s,r),sliced:p}){if(!t.length||!Number.isInteger(e)||e<1||e>4)return{roads:n,cells:[],error:"Ch\u1ECDn b\u1EC1 r\u1ED9ng \u0111\u01B0\u1EDDng t\u1EEB 1 \u0111\u1EBFn 4 \xF4.",errorCell:t[0]??null,bridges:[],gradeEdits:[],width:e};let x=p?.footprint??Lb(t,e,l),g=[...x.values()],m={roads:n,cells:g,error:"",errorCell:null,bridges:[],gradeEdits:[],width:e},f=(v,A,I=!1)=>({...m,error:v,errorCell:A,detour:I&&c?Db(t,A,{roads:n,width:e,material:i,surfaceY:s,waterAt:r,obstacle:o,allowLeveling:a}):null}),y=new Set;for(let[v,A]of[[0,t[1]],[t.length-1,t.at(-2)]]){if(p)break;if(!A)continue;let I=l?.get(v),z=I?.cell??t[v],P=I?.width??e,D=ur(t[v],A),N=Yh(z,D,P),V=n.get(lt(z));if(V?.approachBridgeId&&V.axes===D&&N.every(H=>n.get(lt(H))?.approachBridgeId===V.approachBridgeId)&&qe(n,V,D).width===P)for(let H of N)y.add(lt(H))}for(let v of g){let A=lt(v),I=n.get(A);if(p?.preserved.has(A))continue;if(I?.bridgeId||I?.approachBridgeId&&(!y.has(A)||I.axes!==v.axes))return f("\u0110o\u1EA1n n\xE0y thu\u1ED9c c\u1EA7u ho\u1EB7c \u0111\u01B0\u1EDDng d\u1EABn \u0111ang c\xF3.",v);let z=o(v);if(z)return f(z,v,!0)}let _=p?.stations??t.map((v,A)=>{let I=A?ur(t[A-1],v):null,z=A+1<t.length?ur(v,t[A+1]):null,P=l?.get(A),D={...d(P?.cell??v,I??z??Et,P?.width??e)};D.width=P?.width??e;let N=lt(P?.cell??v);if(y.has(N)){let V=n.get(N);D.y=V.roadY,D.profile=D.profile.map((H,G)=>V.roadStartY+(V.roadEndY-V.roadStartY)*G/4),D.grade=Math.abs(V.roadEndY-V.roadStartY),D.maxCrossSlope=0}if(I&&z&&I!==z){D.turn=!0;for(let V of[Et,Jt])for(let H=0;H<e;H++){let G=ke(V,an(v,V)+H,Ye(v,V)),O=d(G,V,e);O.water&&(!D.water||O.water.y>D.water.y)&&(D.water=O.water),O.prohibitedWater&&(D.prohibitedWater=O.prohibitedWater),D.maxCrossSlope=Math.max(D.maxCrossSlope,O.maxCrossSlope),D.grade=Math.max(D.grade,O.grade)}}return D}),M=new Map(n);for(let[v,A]of x){let I=n.get(v);p?.preserved.has(v)||I&&(I.axes&A.axes)===A.axes||M.set(v,{...I,...A,material:I?.material??i,axes:(I?.axes??0)|A.axes})}let E=new Map,S=[],w=[],R=h?Ub(_,Pe.bridgeLimit):new Map;for(let v=0;v<_.length;v++){let A=_[v],I=R.has(v);if(!A.water&&!I)continue;let z=R.get(v)??v;for(;!I&&_[z+1]?.water;)z++;let P=v,D=z;if(!I&&u&&!S.length){if(v-=u[0],z+=u[1],v<1||z>=_.length-1||z-v+1>Pe.bridgeLimit||_.slice(v,P).some(tt=>tt.water)||_.slice(D+1,z+1).some(tt=>tt.water))return f("Ch\u01B0a \u0111\u1EE7 \u0111\u1EA5t kh\xF4 \u0111\u1EC3 l\xF9i \u0111\u1EA7u c\u1EA7u.",t[P]);A=_[v]}let N=_.slice(v,z+1),V=N.find(tt=>tt.prohibitedWater);if(V)return f("Ch\u1EC9 b\u1EAFc c\u1EA7u qua l\xF2ng su\u1ED1i, ch\u1EEBa kho\u1EA3ng c\xE1ch v\u1EDBi th\xE1c v\xE0 bi\u1EC3n.",t[v+N.indexOf(V)]);if(N.some(tt=>tt.axis!==A.axis||tt.side!==A.side||tt.turn||tt.width!==e))return f("C\u1EA7u ph\u1EA3i \u0111i th\u1EB3ng qua s\xF4ng, h\xE3y r\u1EBD h\u01B0\u1EDBng sau khi l\xEAn b\u1EDD.",t[v]);if(!v||z===_.length-1)return f("K\xE9o t\u1EDBi b\u1EDD b\xEAn kia \u0111\u1EC3 xem c\u1EA7u.",t[v]);if(N.length>Pe.bridgeLimit)return f(`Nh\u1ECBp c\u1EA7u t\u1ED1i \u0111a ${Pe.bridgeLimit} \xF4.`,t[v]);let H=_[v-1],G=_[z+1];if(H.axis!==A.axis||H.side!==A.side||G.axis!==A.axis||G.side!==A.side||H.turn||G.turn)return f("C\u1EA7u ph\u1EA3i \u0111i th\u1EB3ng qua s\xF4ng, h\xE3y r\u1EBD h\u01B0\u1EDBng sau khi l\xEAn b\u1EDD.",t[v]);let O=A.t>H.t,B=A.t+(O?0:1),K=_[z].t+(O?1:0),Y=I?null:Math.max(...N.filter(tt=>tt.water).map(tt=>tt.water.y));for(let tt of N)for(let nt of[tt.t,tt.t+1])for(let Mt=0;Mt<=e*4;Mt++){let et=ke(tt.axis,nt,tt.side+Mt/4),L=r(et.x,et.z);L?.kind==="river"&&(Y=Math.max(Y,L.y))}let st=N.filter(tt=>!tt.water).reduce((tt,nt)=>Math.max(tt,Math.max(nt.high,...nt.edgeCrown)+Pe.deckThickness),-1/0),ot=Math.max(H.y,G.y,st,I?-1/0:Y+Pe.clearance+Pe.deckThickness),Q=ot,ht=ac(_,v-1,-1,B,Q,e,a),ct=ac(_,z+1,1,K,Q,e,a),at=(tt,nt)=>tt.heightAt&&nt.heightAt?tt.requiredCuts.length+nt.requiredCuts.length:1/0;for(let tt=1;tt<=12&&at(ht,ct);tt++){let nt=ot+tt*.025,Mt=ac(_,v-1,-1,B,nt,e,a),et=ac(_,z+1,1,K,nt,e,a);at(Mt,et)<at(ht,ct)&&(Q=nt,ht=Mt,ct=et)}if(!ht.heightAt||!ct.heightAt){let tt=!ht.heightAt,Mt=(tt?ht:ct).terrainBlocked?"\u0110\u01B0\u1EDDng d\u1EABn c\u1EA7u b\u1ECB ch\xF4n ho\u1EB7c cao qu\xE1 so v\u1EDBi n\u1EC1n. Th\u1EED m\u1ED9t v\u1ECB tr\xED b\u1EDD kh\xE1c ho\u1EB7c san \u0111\u1EA5t.":tt?"L\xF9i \u0111i\u1EC3m b\u1EAFt \u0111\u1EA7u \u0111\u1EC3 \u0111\u1EE7 \u0111\u01B0\u1EDDng d\u1EABn l\xEAn c\u1EA7u.":"K\xE9o xa h\u01A1n \u0111\u1EC3 \u0111\u1EE7 \u0111\u01B0\u1EDDng d\u1EABn l\xEAn c\u1EA7u.";return f(Mt,t[tt?v-1:z+1])}if(N.some(tt=>Q-Pe.deckThickness-tt.low>Pe.pillarHeight))return f("V\u1EF1c qu\xE1 s\xE2u, kh\xF4ng th\u1EC3 d\u1EF1ng tr\u1EE5 \u0111\u1EE1.",t[v]);let mt=N.flatMap(tt=>tt.cells),St=Math.min(B,K),F=Math.max(B,K),vt=`bridge:${A.axis}:${A.side}:${St}:${F}`,j=new Set([...ht.requiredCuts,...ct.requiredCuts]);for(let tt=ht.endIndex;tt<=ct.endIndex;tt++){let nt=_[tt],Mt=tt>=v&&tt<=z,et=Mt?()=>Q:tt<v?ht.heightAt:ct.heightAt;if(E.has(tt))return f("Hai \u0111\u01B0\u1EDDng d\u1EABn c\u1EA7u ch\u1ED3ng nhau. Ch\u1EEBa th\xEAm \u0111\u1EA5t gi\u1EEFa hai nh\u1ECBp.",t[tt]);E.set(tt,{yAt:et,wet:Mt});let L=et(nt.t),C=et(nt.t+.5),Z=et(nt.t+1);j.has(tt)&&w.push({x:nt.x,z:nt.z,y:C,width:e,axis:nt.axis,startY:L,endY:Z,cutOnly:!0});for(let gt of nt.cells){let pt=lt(gt);if(M.get(pt).axes!==nt.axis)return f("Gi\u1EEF \u0111\u01B0\u1EDDng d\u1EABn v\xE0 m\u1EB7t c\u1EA7u th\u1EB3ng, \u0111\u1EB7t n\xFAt giao tr\xEAn b\u1EDD.",gt);let xt=n.get(pt);if(xt){if(Mt||Math.abs(nt.y-C)>.02||Math.abs(nt.profile[0]-L)>.02||Math.abs(nt.profile[4]-Z)>.02||xt.axes&~nt.axis)return f("\u0110\u01B0\u1EDDng d\u1EABn c\u1EA7u ch\u1EA1m \u0111\u01B0\u1EDDng hi\u1EC7n c\xF3. H\xE3y ch\u1EEBa th\xEAm \u0111\u1EA5t \u1EDF \u0111\u1EA7u c\u1EA7u.",gt);continue}let Nt=Mt?{bridgeId:vt,bridgeY:Q,...I?{bridgeKind:"viaduct"}:{}}:{approachBridgeId:vt};M.set(pt,{...M.get(pt),...Nt,roadY:C,roadStartY:L,roadEndY:Z})}}S.push({id:vt,axis:A.axis,width:e,y:Q,maxWaterY:Y,cells:mt,...I?{kind:"viaduct"}:{},start:ke(A.axis,St,A.side+e/2),end:ke(A.axis,F,A.side+e/2)}),v=z}let b=new Map;for(let[v,A]of _.entries()){let I=_[v-1];if(E.get(v))continue;let P=I&&(E.get(v-1)?.yAt(I.t+.5)??b.get(v-1)??I.y),D=I?Math.hypot(A.x-I.x,A.z-I.z):1,N=I&&D>.01?(A.y-P)/D:0,V=fr(A.width),H=A.width===1?.28:Pe.crossSlope,G=Math.max(Math.abs(N),A.grade),O=A.maxCrossSlope;if(G<=V&&O<=H)continue;let B=I&&Math.abs(N)>V?P+Math.sign(N)*V*D:A.y;if(a&&!A.turn&&!A.cells.some(K=>n.has(lt(K)))&&G<=V+.18&&O<=H+.15&&Math.max(Math.abs(A.low-B),Math.abs(A.high-B))<=Pe.cutFill)w.push({x:A.x,z:A.z,y:B,width:A.width,axis:A.axis}),b.set(v,B);else{let K=O>H?`\u0110\u01B0\u1EDDng ${A.width}\xD7 nghi\xEAng ngang ${Math.round(O*100)}% t\u1EA1i \u0111\xE2y.`:`\u0110o\u1EA1n \u0111\u01B0\u1EDDng d\u1ED1c d\u1ECDc ${Math.round(G*100)}% t\u1EA1i \u0111\xE2y.`;return f(K,t[v],!0)}}for(let v of g)for(let A of[Et,Jt]){if(p?.preserved.has(lt(v))||!(v.axes&A))continue;let I=qe(M,M.get(lt(v)),A);if(I.width>4)return f("\u0110\u01B0\u1EDDng r\u1ED9ng t\u1ED1i \u0111a 4 \xF4.",v);if(I.cells.filter(P=>P.bridgeId||P.approachBridgeId).some(P=>(n.has(lt(P))?qe(n,n.get(lt(P)),A).width:e)!==I.width))return f("Gi\u1EEF nguy\xEAn b\u1EC1 r\u1ED9ng m\u1EB7t c\u1EA7u v\xE0 \u0111\u01B0\u1EDDng d\u1EABn.",v)}for(let[v,A]of l??[]){if(!A.taper)continue;let I=_[v],{startCenter:z,endCenter:P,startWidth:D,endWidth:N}=A.taper,V=Math.floor(Math.min(z-D/2,P-N/2)),H=Math.ceil(Math.max(z+D/2,P+N/2)),G=d(ke(I.axis,I.t,V),I.axis,H-V),O=G.cells.find(K=>o(K)||n.has(lt(K))&&!I.cells.some(Y=>hi(Y,K)));if(G.water||O)return f("Ch\u1EEBa th\xEAm \u0111\u1EA5t hai b\xEAn \u0111\u1EC3 n\u1ED1i \u0111\xFAng b\u1EC1 r\u1ED9ng c\u1EA7u.",O??t[v]);for(let K of G.cells)x.has(lt(K))||g.push({...K,axes:I.axis});let B=_[v+1];if(v===_.length-2&&y.has(lt(B.cells[0]))){let K=I.t<B.t,Y=B.profile[K?0:4],st=I.profile[K?0:4];if(Math.abs(Y-st)>fr(I.width))return f("\u0110\u1EA7u \u0111\u01B0\u1EDDng d\u1EABn cao qu\xE1 so v\u1EDBi n\u1EC1n.",t[v]);let ot=K?st:Y,Q=K?Y:st;for(let ht of I.cells){let ct=lt(ht);n.has(ct)||M.set(ct,{...M.get(ct),roadStartY:ot,roadEndY:Q,roadY:(ot+Q)/2})}}for(let K of I.cells){let Y=lt(K);n.has(Y)||M.set(Y,{...M.get(Y),taper:A.taper})}}return{...m,roads:M,bridges:S,gradeEdits:w,route:t}}function $h({route:n,roads:t,width:e,surfaceY:i,waterAt:s,...r}){let o=(x,g,m=!1)=>({roads:t,width:e,cells:n.cells,bridges:[],gradeEdits:[],error:x,errorCell:g,legacyBridge:m});if(n.error)return o(n.error);let a=new Set,c=ci(t);for(let x of n.cells){let g=lt(x),m=c.get(t.get(g)?.roadCurveId);if(!m)continue;if(!sr(m).some(([[y,_],[M,E]])=>(x.x+.5-y)*M+(x.z+.5-_)*E<-.7?!1:[[n.points[0],n.points[1]],[n.points.at(-1),n.points.at(-2)]].some(([w,R])=>Math.hypot(w[0]-y,w[1]-_)<=.58&&(R[0]-w[0])*M+(R[1]-w[1])*E>.76*Math.hypot(R[0]-w[0],R[1]-w[1]))))return o("N\u1ED1i \u0111\u01B0\u1EDDng t\u1EA1i \u0111\u1EA7u d\u1EA3i cong c\xF3 s\u1EB5n.",x);a.add(g)}let l=(x,g)=>cc(x,g,e,i,s),h=n.slices.map(([x])=>({...l(x,x.axes),width:e})),u=n.corners.flatMap(x=>[...x.filter(g=>g.z===x[0].z).map(g=>l(g,Jt)),...x.filter(g=>g.x===x[0].x).map(g=>l(g,Et))]);if([...h,...u].some(x=>x.water)||n.cells.some(x=>{let g=t.get(lt(x));return g?.bridgeId||g?.approachBridgeId||[.02,.5,.98].some(m=>[.02,.5,.98].some(f=>s(x.x+m,x.z+f)))}))return o("Th\u1EED c\u0103n c\u1EA7u theo tuy\u1EBFn hi\u1EC7n c\xF3.",void 0,!0);let d=u.find(x=>x.grade>fr(e)||x.maxCrossSlope>(e===1?.28:Pe.crossSlope));if(d)return o("G\xF3c cua qu\xE1 d\u1ED1c.",d.cells[0]);let p=new Map(n.cells.map(x=>[lt(x),x]));return mo({...r,roads:t,width:e,surfaceY:i,waterAt:s,cells:n.slices.map(x=>x[0]),sliced:{footprint:p,stations:h,preserved:a}})}function Ap(n,t){if(n.error||!n.route?.length)return n;let e=n.route.map(({x:s,z:r})=>[s+.5,r+.5]),i=Math.max(t.length,sc(e));return{...n,length:i,error:i>pn+1e-9?"Tuy\u1EBFn v\xE0 \u0111\u01B0\u1EDDng d\u1EABn d\xE0i qu\xE1 60 \u0111\u01A1n v\u1ECB.":""}}function Nb(n){let{roads:t,cells:e,width:i}=n;if(e.length<2)return[];let s=e.at(-1),r=[];for(let o=s.x-2;o<=s.x+2;o++)for(let a=s.z-2;a<=s.z+2;a++){let c=t.get(lt({x:o,z:a}));if(!c?.approachBridgeId||Xh(s,c)>2)continue;let l=c.axes;if(l!==Et&&l!==Jt)continue;let h=qe(t,c,l);if(Ye(c,l)!==h.lo)continue;let u=an(c,l),d=Ye(c,l);for(let p of[-1,1]){let x=t.get(lt(ke(l,u-p,d)));if((x?.bridgeId??x?.approachBridgeId)!==c.approachBridgeId)continue;let g=t.get(lt(ke(l,u+p,d)));if((g?.bridgeId??g?.approachBridgeId)===c.approachBridgeId)continue;let m=h.width,f=Math.abs(i-m),y=Math.floor((m-i)/2),_=ke(l,u,d+y);for(let M=e.length-2;M>=Math.max(0,e.length-9);M--){let E=e[M];if((an(E,l)-u)*p<=f||Math.abs(Ye(E,l)-Ye(_,l))>2)continue;let w=ke(l,an(E,l),Ye(_,l)),R=zi(e.slice(0,M+1),w),b=qh(l,an(w,l),u,Ye(_,l)).slice(1),v=[...R,...b];if(new Set(v.map(lt)).size!==v.length)continue;let A=new Map;for(let I=0;I<f+1;I++){let z=v.length-1-I,P=m+Math.sign(i-m)*Math.min(I,f);A.set(z,{width:P,cell:ke(l,an(v[z],l),d+Math.floor((m-P)/2))})}for(let I=1;I<=f;I++){let z=v.length-1-I,P=A.get(z),D=A.get(z+1),[N,V]=p<0?[P,D]:[D,P];P.taper={startCenter:Ye(N.cell,l)+N.width/2,endCenter:Ye(V.cell,l)+V.width/2,startWidth:N.width,endWidth:V.width}}r.push({cells:v,sections:A,score:Xh(s,c)+e.length-M})}}}return r.sort((o,a)=>o.score-a.score)}function zb(n){let{cells:t}=n,e=t[0],i=t.at(-1);if(!e||!i)return[];let s=Math.abs(e.x-i.x)>=Math.abs(e.z-i.z)?Et:Jt;return[s,s===Et?Jt:Et].flatMap(r=>Ob(n,r))}function Ob({cells:n,width:t,waterAt:e,readStation:i},s){let r=f=>{for(let y=0;y<t;y++)for(let _ of[.02,.5,.98]){let M=ke(s,an(f,s)+.5,Ye(f,s)+y+_);if(e(M.x,M.z)?.kind==="river")return!0}return!1},o=n.findIndex(r),a=n.findLastIndex(r);if(o<1||a===n.length-1)return[];let c=n[o-1],l=n[a+1],h=Ye(c,s),u=Ye(l,s);if(Math.abs(h-u)>2)return[];if(n.slice(o,a+1).some(f=>Math.abs(Ye(f,s)-h)>2))return[];if(!Math.sign(an(l,s)-an(c,s)))return[];let p=[Math.max(0,o-4),0],x=[Math.min(n.length-1,a+4),n.length-1],g=[...new Set([h,u,Math.round((h+u)/2),h-1,h+1,h-2,h+2])],m=[];for(let f of g)for(let y=0;y<2;y++){let _=p[y],M=x[y];if(Math.abs(Ye(n[_],s)-f)>2||Math.abs(Ye(n[M],s)-f)>2)continue;let E=qh(s,an(n[_],s),an(n[M],s),f),S=v=>!i(v,s,t).water;if(!S(E[0])||!S(E.at(-1)))continue;let w=_?zi(n.slice(0,_+1),E[0]):[E[0]],R=M<n.length-1?zi([E.at(-1)],n[M]).slice(1).concat(n.slice(M+1)):[],b=[...w,...E.slice(1),...R];b.some((v,A)=>A&&Xh(v,b[A-1])!==1)||new Set(b.map(lt)).size===b.length&&m.push(b)}return m}function Tp(n,t){let{cells:e}=n;if(!/đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(t.error)||e.length<2)return t;let i=(o,a,c)=>{let l=ur(o,a),h=an(o,l),u=Math.sign(h-an(a,l));return qh(l,h,h+c*u,Ye(o,l)).slice(1)},s=o=>{for(let a=o?0:1;a<=Pe.approachExtension*2;a++)for(let c=0;c<=Pe.approachExtension;c++){let l=a-c;if(l<0||l>Pe.approachExtension)continue;let h=[...i(e[0],e[1],c).reverse(),...e,...i(e.at(-1),e.at(-2),l)];if(new Set(h.map(lt)).size!==h.length)continue;let u=mo({...n,cells:h,suggestDetour:!1,bridgeRetreat:o});if(!u.error&&u.bridges.length===1)return u}return null},r=s(void 0);if(r)return r;if(/bị chôn/.test(t.error))for(let o=1;o<=Pe.approachExtension;o++)for(let a=0;a<=o;a++){let c=s([a,o-a]);if(c)return c}return t}function lc(n){let t={width:1,...n};if(t.assisted){let i=new Map;t.readStation=(s,r,o)=>{let a=`${lt(s)}:${r}:${o}`;return i.has(a)||i.set(a,cc(s,r,o,t.surfaceY,t.waterAt)),i.get(a)}}let e=mo(t);if(!t.assisted||t.cells.length<2||!Number.isInteger(t.width)||t.width<1||t.width>4||!e.error&&e.bridges.length)return e;if(e.error){let i=Tp(t,e);if(!i.error)return i;if(/đi thẳng qua sông|đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(e.error))for(let s of zb(t)){let r={...t,cells:s,suggestDetour:!1},o=Tp(r,mo(r));if(!o.error&&o.bridges.length===1)return o}}for(let i of[t.cells,[...t.cells].reverse()])for(let s of Nb({...t,cells:i})){let r=mo({...t,...s,suggestDetour:!1});if(!r.error)return r}return e}var Nn={dirt:["#c4a47b","#9e7b54","#dbc49c"],stone:["#77766c","#8b8778","#ded7c5"],asphalt:["#50575d","#8c8f87","#f9efd9"]},go="#d9d6c8",xo=n=>n===4?[-.62,0,.62]:[0];var Fb=new Ae({color:"#9b815d",roughness:.86,side:ze}),Rp={dirt:"C\u1EA7u g\u1ED7",stone:"C\u1EA7u \u0111\xE1",asphalt:"C\u1EA7u b\xEA t\xF4ng"};function Cp(n){return n.every(t=>t.material==="asphalt")?"asphalt":n.some(t=>t.material==="dirt")?"dirt":"stone"}function Pp(n){return Rp[Cp(n)]}function hc(n,t){return(e,i)=>{let s=Math.floor(e),r=Math.floor(i),o=n.get(lt({x:s,z:r}));if(Number.isFinite(o?.roadY)||(o=[[Math.floor(e-1e-7),r],[s,Math.floor(i-1e-7)],[Math.floor(e-1e-7),Math.floor(i-1e-7)]].map(([l,h])=>n.get(lt({x:l,z:h}))).find(l=>Number.isFinite(l?.roadY))),!Number.isFinite(o?.roadY))return t(e,i);if(!Number.isFinite(o.roadStartY)||!Number.isFinite(o.roadEndY))return o.roadY;let a=o.axes===Et?e-o.x:i-o.z;return kt.lerp(o.roadStartY,o.roadEndY,kt.clamp(a,0,1))}}function Ip(n,t,e,i){let s=[];for(let a of n.values())if(!(a.bridgeId||a.approachBridgeId||a.roadCurveId))for(let[c,l]of[[1,0],[-1,0],[0,1],[0,-1]]){if(n.has(lt({x:a.x+c,z:a.z+l})))continue;let h=u=>{let d=a.x+(c?.5+c*.47:u),p=a.z+(l?.5+l*.47:u),x=d+c*.21,g=p+l*.21,m=t(d,p)+.034,f=e(x,g);return{top:[d,m,p],bottom:[x,Math.min(m,f-.025),g],cut:i(x,g)-f}};for(let u=0;u<4;u++){let d=h(u/4),p=h((u+1)/4);Math.max(d.cut,p.cut)<.035||Math.max(d.top[1]-d.bottom[1],p.top[1]-p.bottom[1])<.15||s.push(...d.top,...d.bottom,...p.top,...p.top,...d.bottom,...p.bottom)}}if(!s.length)return null;let r=new oe().setAttribute("position",new Yt(s,3));r.computeVertexNormals();let o=new Vt(r,Fb);return o.receiveShadow=!0,o}function Lp(n,t){let e=new jt;e.name="C\u1EA7u ng\u01B0\u1EDDi ch\u01A1i";let i=new Map;for(let r of n.values())r.bridgeId&&(i.has(r.bridgeId)||i.set(r.bridgeId,[]),i.get(r.bridgeId).push(r));for(let r of i.values()){let o=new jt,a=Cp(r);o.name=Rp[a];let c=r[0].axes,[l,h]=c===Et?["x","z"]:["z","x"],u=Math.min(...r.map(b=>b[l])),d=Math.max(...r.map(b=>b[l]))+1,p=Math.min(...r.map(b=>b[h])),x=Math.max(...r.map(b=>b[h]))+1,g=r[0].bridgeY+.035,m=g-Pe.deckThickness,f=d-u,y=x-p,_=(b,v,A,I,z,P,D)=>c===Et?de(o,b,v,A,I,z,P,D):de(o,A,v,b,I,D,P,z),M=r.filter(b=>b.material==="asphalt"),E=(p+x)/2,S=(u+d)/2;if(a==="stone"){let b=new Pi;b.moveTo(u,g),b.lineTo(u,m);let v=f*8;for(let z=1;z<=v;z++){let P=z/v;b.lineTo(u+P*f,m+Math.sin(P*Math.PI)*.145)}b.lineTo(d,g),b.closePath();let A=new es(b,{depth:y,bevelEnabled:!1});c===Et?A.translate(0,0,p):A.rotateY(-Math.PI/2).translate(x,0,0);let I=new Vt(A,Re("#8f8c7e"));I.castShadow=I.receiveShadow=!0,o.add(I)}else _(f,Pe.deckThickness,y,a==="asphalt"?"#90958f":"#856145",S,m,E);for(let b of r){if(b.material==="dirt")for(let v=0;v<5;v++)_(.188,.021,.99,(v+b[l])%3?"#bb9063":"#af8056",b[l]+(v+.5)/5,g-.016,b[h]+.5);if(b.material==="stone")for(let v=0;v<5;v++)for(let A=0;A<4;A++){let I=["#a6a297","#8f8e83","#b4b0a4"][(v*2+A+Math.abs(b[l]))%3];_(.181,.021,.228,I,b[l]+(v+.5)/5,g,b[h]+(A+.5)/4)}}for(let b of M){let v=b[l]+.5,A=b[h];_(1,.012,1,Nn.asphalt[0],v,g,A+.5),A===p&&_(1,.004,.038,go,v,g+.013,p+.158),A===x-1&&_(1,.004,.038,go,v,g+.013,x-.158)}if(y>=2){let b=new Map;for(let v of M)b.set(v[l],(b.get(v[l])??0)+1);for(let[v,A]of b)if(A===y)for(let I of xo(y))_(.54,.004,.055,Nn.asphalt[2],v+.5,g+.014,E+I)}let w=(b,v)=>c===Et?t(b,v):t(v,b),R=(b,v,A,I,z)=>{let P=w(b,v);P<m&&_(A,m-P+.08,I,z,b,P-.08,v)};for(let b of[p+.08,x-.08]){if(a==="stone"){_(f,.18,.13,"#8e897b",S,g,b);for(let A=0;A<f*4;A++)_(.237,.051,.17,A%3?"#c1b9a7":"#aaa393",u+(A+.5)/4,g+.18,b);for(let A of[u+.14,d-.14])R(A,b,.27,.19,"#8f8c7e");continue}let v=a==="asphalt";_(f,.05,.055,v?"#b4c0bf":"#a3764d",S,g+.26,b),_(f,.038,.044,v?"#899a9b":"#946840",S,g+.13,b);for(let A=0;A<=f;A++){let I=kt.clamp(u+A,u+.07,d-.07),z=v?.063:.105;_(z,.32,z,v?"#6c7b7c":"#765135",I,g,b),!v&&(A%2||f===1)&&A<f&&R(I,b,.18,.18,"#755944")}}if(a==="asphalt")for(let b=u+Math.min(.65,f/2);b<d;b+=2.5)R(b,E,.28,y*.47,"#a2a59c");e.add(Je(o))}let s=[];for(let r of n.values()){if(!r.approachBridgeId||!Number.isFinite(r.roadStartY)||!Number.isFinite(r.roadEndY))continue;let o=r.axes===Et;for(let a of[0,1]){if(n.get(lt({x:r.x+(o?0:a*2-1),z:r.z+(o?a*2-1:0)}))?.approachBridgeId===r.approachBridgeId)continue;let l=r.x+(o?0:a),h=r.z+(o?a:0);for(let u=0;u<4;u++){let d=g=>{let m=l+(o?g:0),f=h+(o?0:g),y=kt.lerp(r.roadStartY,r.roadEndY,g)+.032;return{top:[m,y,f],bottom:[m,Math.min(y,t(m,f)-.015),f]}},p=d(u/4),x=d((u+1)/4);s.push(...p.top,...p.bottom,...x.top,...x.top,...p.bottom,...x.bottom)}}}if(s.length){let r=new oe().setAttribute("position",new Yt(s,3));r.computeVertexNormals();let o=new Vt(r,Re("#a68a60",{side:ze}));o.castShadow=o.receiveShadow=!0,e.add(o)}return e}var mc=new yt(go),uc=[[0,-1],[1,0],[0,1],[-1,0]],Bb=[[0,0],[1,0],[1,1],[0,1]],kb=new Ae({vertexColors:!0,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});function fc(n,t,e,i=kb){let s=new oe;s.setAttribute("position",new Yt(n,3)),s.setAttribute("color",new Yt(t,3)),s.setIndex(e),s.computeVertexNormals();let r=new Vt(s,i);return r.receiveShadow=!0,r}function _o(n,t,e,i,s,r,o=i,a=4){let{positions:c,colors:l,indices:h}=n,u=c.length/3,d=(x,g,m)=>{c.push(x,s(x,g)+r,g),l.push(m.r,m.g,m.b)};d(...e,i);let p=[];for(let[x,g]of t.entries()){let m=t[(x+1)%t.length];for(let f=0;f<a;f++){let y=f/a;p.push([kt.lerp(g[0],m[0],y),kt.lerp(g[1],m[1],y)])}}for(let[x,g]of p)d((x+e[0])/2,(g+e[1])/2,i);for(let[x,g]of p)d(x,g,o);for(let x=0;x<p.length;x++){let g=u+1+x,m=u+1+(x+1)%p.length,f=g+p.length,y=m+p.length;h.push(u,m,g,g,m,f,f,m,y)}}function ps(n,t,e,i,s,r,o,a){let c=Bb.map(([l,h])=>[t+(l-.5)*i,e+(h-.5)*s]);_o(n,c,[t,e],r,o,a)}var Np=["#8d8c82","#9c9b90","#aaa79c","#b5b0a2","#96948b"],Hb=["#a38f72","#b7a589","#c1ac88"],Dp=["#78834c","#96974e","#6e7c46"],Gb=[[-.35,-.5],[.32,-.5],[.5,-.24],[.48,.28],[.26,.5],[-.36,.47],[-.5,.25],[-.49,-.24]];function Zh(n,t,e,i,s,r,o,a,c,l,h){let u=new yt(a[Math.floor(h()*a.length)]),d=Gb.map(([p,x])=>{let g=(p+(h()-.5)*.07)*o,m=(x+(h()-.5)*.07)*r;return[t+g*i-m*s,e+g*s+m*i]});_o(n,d,[t,e],u,l,c,u.clone().multiplyScalar(.72),1)}function Vb(n,t,e,i,s,r){let o=i[0][0],a=i[1][0],c=i[0][1],l=i[2][1],h=5,u=(l-c)/h,d=(a-o)/4;for(let p=0;p<h;p++){let x=o-p%2*d/2;for(let g=0;g<5;g++){let m=Math.max(o,x+g*d),f=Math.min(a,x+(g+1)*d);f-m<.08||Zh(n,t+(m+f)/2,e+c+(p+.5)*u,1,0,u-.025,f-m-.027,Np,.053+r()*.012,s,r)}}}function zp(n,t,e,i,s,r,o,a=.05){if(Zh(n,t,e,i,s,.036+o()*.034,.04+o()*.044,Hb,a,r,o),o()<.46)return;let c=new yt(Dp[Math.floor(o()*Dp.length)]),l=r(t,e)+a-.015;for(let h of[-1,0,1]){let u=o()*Math.PI*2,d=Math.cos(u)*.017,p=Math.sin(u)*.017,x=.065+o()*.07,g=n.positions.length/3,m=t+h*.018,f=[m-d,l,e-p,m+d,l,e+p,m+d*2+h*.023,l+x,e+p*2],y=[c.r*.68,c.g*.68,c.b*.68,c.r,c.g,c.b,c.r*1.15,c.g*1.15,c.b*1.15];n.positions.push(...f,...f),n.colors.push(...y,...y),n.indices.push(g,g+1,g+2,g+5,g+4,g+3)}}var dc=()=>({positions:[],colors:[],indices:[]}),dr=(n,t,e)=>n.axis===Et?[t,e]:[e,t];function nn(n,t,e,i,s,r,o){let a=n.positions.length/3;for(let[c,l]of t.entries()){for(let h of[e,i]){let u=h*(l.scale??1),d=l.x-l.dz*u,p=l.z+l.dx*u;n.positions.push(d,(o?o(d,p,l):l.y)+r,p);let x=typeof s=="function"?s(d,p):s;n.colors.push(x.r,x.g,x.b)}if(c){let h=a+(c-1)*2;n.indices.push(h,h+1,h+2,h+1,h+3,h+2)}}}function pc(n,t,e){let i=s=>kt.lerp(n[s],t[s],e);return{x:i("x"),z:i("z"),dx:i("dx"),dz:i("dz"),y:n.y===void 0?void 0:i("y"),scale:kt.lerp(n.scale??1,t.scale??1,e)}}function Wb(n,t,e){let i=0,s=t/2;for(let r=1;r<n.length;r++){let o=n[r-1],a=n[r],c=Math.hypot(a.x-o.x,a.z-o.z);if(c){for(;s<i+c;)e(pc(o,a,(s-i)/c)),s+=t;i+=c}}}function Op(n){let t=[n[0]];for(let e=1;e<n.length;e++){let i=n[e-1],s=n[e],r=Math.ceil(Math.hypot(s.x-i.x,s.z-i.z)/.2);for(let o=1;o<=r;o++){let a=pc(i,s,o/r);(e<n.length-1||o<r)&&(a.scale=1+.026*Math.sin(a.x*6.7+a.z*8.3)+.016*Math.sin(a.x*11.3-a.z*5.6)),t.push(a)}}return t}function Jh(n,t,e,i,s,r){let{x:o,z:a}=t[0],c=dn(Math.round(o*173+a*271)>>>0),l=0;Wb(t,s==="stone"?.195:.31,h=>{let u=(f,y)=>i?i(f,y,h):h.y,{x:d,z:p,dx:x,dz:g}=h,m=e*h.scale/2;if(s==="stone"){let f=Math.ceil(m*2/.24),y=(m*2-.12)/f,_=-m+.06-l++%2*y/2;for(let M=0;M<=f;M++){let E=Math.max(_+M*y,-m+.06),S=Math.min(_+(M+1)*y,m-.06);if(S-E<.07)continue;let w=(E+S)/2;Zh(n,d-g*w,p+x*w,x,g,S-E-.027,.17,Np,r+c()*.009,u,c)}}else for(let f of[-1,1]){if(c()<.47)continue;let y=f*(m-.04-c()*.09);zp(n,d-g*y,p+x*y,x,g,u,c,r)}})}function Fp(n,t){let e=0;for(let i=1;i<n.length;i++){let s=n[i-1],r=n[i],o=Math.hypot(r.x-s.x,r.z-s.z);if(o){for(let a=Math.floor(e);a<e+o;a++){let c=Math.max(e,a+.23),l=Math.min(e+o,a+.77);c<l&&t([pc(s,r,(c-e)/o),pc(s,r,(l-e)/o)])}e+=o}}}function Up(n,t,{points:e,width:i,material:s,continuous:r},o){let a=Li(e),c=s==="dirt"?Op(a):a,[l,h,u]=Nn[s].map(x=>new yt(x)),d=i/2-(r?0:.02);nn(n,c,-d,d,l,.04,o);let p=(x,g,m,f)=>nn(t,x,g-m/2,g+m/2,f,.055,o);for(let x of[-1,1])p(c,x*(d-.05),.1,s==="dirt"?l.clone().lerp(h,.46):h),s==="asphalt"&&p(c,x*(d-.14),.038,mc);if(s!=="asphalt"&&Jh(t,c,d*2,o,s,.062),!(i<2)){if(s==="dirt")for(let x of[-.39,.39])p(c,x,.08,h.clone().lerp(l,.5));s==="asphalt"&&Fp(c,x=>{for(let g of xo(i))p(x,g,.055,u)})}}function Bp(n,t,e,i,s="#fffdf5"){let r=dc(),o=typeof e=="function"?e:new yt(e);nn(r,n.stations,-n.width/2,n.width/2,o,.1,t);let a=new en({vertexColors:!0,transparent:!0,opacity:i,depthWrite:!1}),c=fc(r.positions,r.colors,r.indices,a);c.renderOrder=5;let l=[];for(let d of[-n.width/2,n.width/2]){let p=n.stations.map(x=>{let g=x.x-x.dz*d,m=x.z+x.dx*d;return[g,t(g,m,x)+.105,m]});for(let x=1;x<p.length;x++)l.push(...p[x-1],...p[x]);if(d<0)for(let x of[n.stations[0],n.stations.at(-1)]){let g=x.x-x.dz*n.width/2,m=x.z+x.dx*n.width/2;l.push(x.x-x.dz*d,t(x.x-x.dz*d,x.z+x.dx*d,x)+.105,x.z+x.dx*d,g,t(g,m,x)+.105,m)}}let h=new oe().setAttribute("position",new Yt(l,3)),u=new Gn(h,new Cn({color:s,transparent:!0,opacity:.84,depthWrite:!1}));return u.renderOrder=7,new jt().add(c,u)}function Xb(n,{x:t,z:e,radius:i,material:s},r){let o=(d,p)=>[t+Math.cos(d)*i*p,e+Math.sin(d)*i*p],a=d=>Array.from({length:32},(p,x)=>o(x*Math.PI/16,d)),c=new yt(s==="dirt"?"#aa875f":"#ccc4b0"),l=new yt("#82985a");if(_o(n,a(.44),[t,e],c,r,.084),_o(n,a(.34),[t,e],l,r,.098,l.clone().multiplyScalar(.87)),s!=="asphalt")return;let h=Math.max(8,Math.round(i*8)),u=new yt(Nn.asphalt[2]);for(let d=0;d<h;d++){let p=Array.from({length:4},(x,g)=>{let m=(d+.2+.18*g)/h*Math.PI*2,[f,y]=o(m,.54);return{x:f,z:y,dx:-Math.sin(m),dz:Math.cos(m)}});nn(n,p,-.026,.026,u,.056,r)}}function qb(n,t,e,i,s){let[r,o,a]=Nn[e.material].map(l=>new yt(l)),c=Array.from({length:7},(l,h)=>{let u=h/6,d=kt.lerp(i.startCenter,i.endCenter,u),[p,x]=dr(e,e.t+u,d);return{x:p,z:x,dx:e.axis===Et?1:0,dz:e.axis===Jt?1:0,scale:kt.lerp(i.startWidth,i.endWidth,u)}});nn(n,c,-.49,.49,r,.035,s);for(let l of[-1,1])nn(t,c,l*.46-.027,l*.46+.027,o,.05,s),e.material==="asphalt"&&nn(t,c,l*.4-.012,l*.4+.012,mc,.053,s);e.material==="asphalt"&&Math.min(i.startWidth,i.endWidth)>=2&&nn(t,c.slice(2,5),-.015,.015,a,.055,s),e.material!=="asphalt"&&Jh(t,c,.98,s,e.material,.058)}function Yb(n,t,e,i,s){if(!e)return;let[r,o,a]=Nn[e].map(p=>new yt(p)),c=i.at(-1),l=[...i,{...c,x:c.x+c.dx*.52,z:c.z+c.dz*.52}],h=e==="dirt"?Op(l):l,u=qa/2,d=s&&((p,x,g)=>Math.max(g.y,s(p,x)));nn(n,h,-u,u,r,.059,d);for(let p of[-1,1]){let[x,g]=[p*(u-.09),p*u].sort((m,f)=>m-f);nn(t,h,x,g,e==="dirt"?r.clone().lerp(o,.46):o,.065,d)}if(e==="asphalt"){for(let p of[-1,1]){let x=p*(u-.15);nn(t,h,x-.019,x+.019,mc,.068,d)}Fp(h,p=>nn(t,p,-.027,.027,a,.068,d))}if(e!=="asphalt"&&Jh(t,h,u*2,d,e,.073),e==="dirt"){let p=new yt("#be9a6c");for(let x of[-.34,.34])nn(t,h,x-.055,x+.055,p,.063,d)}}function $b(n,t){let e=new yt("#c2a271");for(let i of[$a,Za])nn(n,i,-.45,.45,e,.052);Zb(n,t,ar)}function Zb(n,t,e){nn(n,e,-.59,.59,new yt("#967151"),.035);for(let i=1;i<e.length;i++){let s=i%3===0?"#ad865f":i%3===1?"#ba9469":"#a88058";nn(n,e.slice(i-1,i+1),-.56,.56,new yt(s),.043)}for(let i of[-1,1]){let s;for(let[r,o]of e.entries()){if(r%4)continue;let a=new k(o.x-o.dz*.56*i,o.y+.037,o.z+o.dx*.56*i);if(de(t,.085,.36,.085,"#8d6a49",a.x,a.y,a.z),r%8===0&&r>0&&r<e.length-1&&de(t,.13,a.y+1.57,.14,"#746149",a.x,-1.57,a.z),s){let c=a.clone().sub(s);de(t,c.length()+.02,.063,.065,"#ae865d",(a.x+s.x)/2,(a.y+s.y)/2+.25,(a.z+s.z)/2).quaternion.setFromUnitVectors(new k(1,0,0),c.normalize())}s=a}}}function Jb(n,t,e,i,s,r){let o=new jt;o.name="Bi\u1EC3n ch\u1EC9 \u0111\u01B0\u1EDDng";for(let{cells:a,directions:c}of Ch(n,t)){if(c.length<3||a.some(M=>r.has(M.roadCurveId)))continue;let l=c.find(({x:M,z:E})=>!c.some(S=>S.x===-M&&S.z===-E))??c.find(({z:M})=>M===1),h=Math.min(...a.map(M=>M.x)),u=Math.max(...a.map(M=>M.x))+1,d=Math.min(...a.map(M=>M.z)),p=Math.max(...a.map(M=>M.z))+1,x=(h+u)/2+l.x*((u-h)/2+.34),g=(d+p)/2+l.z*((p-d)/2+.34),m=[];for(let M of[.36,.72])for(let E of[h-M,u+M])for(let S of[d-M,p+M])m.push({x:E,z:S});m.sort((M,E)=>Math.hypot(M.x-x,M.z-g)-Math.hypot(E.x-x,E.z-g));let f=({x:M,z:E})=>{if(i.some(w=>Math.hypot(M-w.x,E-w.z)<w.radius+.24))return!1;let S=e(M,E);return uc.every(([w,R])=>Math.abs(S-e(M+w*.24,E+R*.24))<.16)},y=m.find(({x:M,z:E})=>{let S={x:Math.floor(M),z:Math.floor(E)};return!n.has(lt(S))&&!s(S)&&f({x:M,z:E})});if(!y){let M=l.x?Et:Jt,E=a.map(S=>n.get(lt({x:S.x+l.x,z:S.z+l.z}))).find(S=>S?.axes===M&&qe(n,S,M).width===1);E&&(y=[-.459,.459].map(S=>({x:E.x+.5-l.z*S,z:E.z+.5+l.x*S})).find(f))}if(!y)continue;let _=wp(c.filter(M=>M!==l),a.some(M=>M.material==="asphalt"));_.position.set(y.x,e(y.x,y.z),y.z),o.add(_)}return o}function Kh(n,t,e=[],{terrainPaths:i=!0,hillRoute:s=i?Wn:null,reserved:r=fs,groundY:o=t,preview:a=!1}={}){let c=new jt,l=[],h=dc(),u=dc(),d=new jt,p=as(n);s&&Yb(h,u,ao(n),s,i?void 0:t),i&&co(n)&&$b(h,d);let x=oo(n),g=ro(n,x),m=ci(n);for(let w of m.values())Up(h,u,w,t);for(let w of Mp(n))Up(h,u,w,t);for(let w of g.values())Xb(u,w,t);let f=new Map;for(let w of p)for(let R of w.cells){let b=lt(R),v=f.get(b);(!v||w.width>v.width||w.width===v.width&&v.axis===Jt&&w.axis===Et)&&f.set(b,w)}let y=new Set;for(let w of p){let R=w.cells[0].taper;!R||w.junction||!w.cells.every(b=>b.taper&&b.axes===w.axis)||(y.add(w.id),qb(h,u,w,R,t))}let _=w=>w.axes===(Et|Jt)?f.get(lt(w)).material:w.material;for(let w of n.values()){if(w.bridgeId||w.curveOnly||m.has(w.roadCurveId))continue;let{x:R,z:b}=w,v=f.get(lt(w));if(y.has(v.id))continue;let A=_(w),[I,z]=Nn[A].map(O=>new yt(O)),P=dn((Math.imul(R,73856093)^Math.imul(b,19349663))>>>0),D=uc.map(([O,B])=>n.get(lt({x:R+O,z:b+B}))),N=D.map(O=>O?0:v.width===1?.06:.02),V=[[N[3],N[0]],[1-N[1],N[0]],[1-N[1],1-N[2]],[N[3],1-N[2]]],H=[];for(let[O,B]of V.entries()){let K=V[(O+3)%4],Y=V[(O+1)%4];if(!D[O]&&!D[(O+3)%4]){let st=v.axis===Et?D[1]||D[3]:D[0]||D[2],ot=A!=="dirt"?.14:v.width===1?.17:st?.29:.23;H.push([R+kt.lerp(B[0],K[0],ot),b+kt.lerp(B[1],K[1],ot)]),H.push([R+kt.lerp(B[0],Y[0],ot),b+kt.lerp(B[1],Y[1],ot)])}else H.push([R+B[0],b+B[1]]);if(A==="dirt"&&!D[O]){let[st,ot]=uc[O];for(let Q of[.31,.53,.72]){let ht=(P()-.5)*.066,ct=R+kt.lerp(B[0],Y[0],Q)+st*ht,at=b+kt.lerp(B[1],Y[1],Q)+ot*ht;H.push([ct,at]),P()<.36&&zp(u,ct-st*.024,at-ot*.024,-ot,st,t,P)}}}let G=A==="asphalt"?1:.98+.025*Math.sin(R*8.7+b*4.2);_o(h,H,[R+.5,b+.5],I.clone().multiplyScalar(G),t,.035,I.clone().lerp(z,A==="asphalt"?0:D.some(O=>!O)?.26:.07));for(let[O,B]of D.entries()){let[K,Y]=uc[O];if(!B&&A==="asphalt"){let st=D[(O+3)%4]?0:.15,ot=D[(O+1)%4]?0:.15,Q=(st-ot)/2,ht=1-st-ot,ct=v.width===1?.397:.425;for(let[at,mt,St,F]of[[ct,.086,z,.048],[.342,.038,mc,.052]]){let vt=R+.5+K*at-Y*Q,j=b+.5+Y*at+K*Q;ps(u,vt,j,K?mt:ht,Y?mt:ht,St,t,F)}}else if(!B&&A==="stone"){let st=R+.5+K*.413,ot=b+.5+Y*.413;ps(u,st,ot,K?.082:.78,Y?.082:.78,z,t,.048)}if(B&&_(B)!==A&&(K>0||Y>0)){let st=new yt(Nn[_(B)][0]);ps(u,R+.5+K*.5,b+.5+Y*.5,K?.1:.91,Y?.1:.91,I.clone().lerp(st,.5),t,.049)}}A==="stone"&&Vb(u,R,b,V,t,P)}for(let w of p){let{axis:R,t:b,lo:v,hi:A,width:I,material:z,junction:P}=w;if(z!=="dirt"||P||I<2||y.has(w.id)||w.cells.some(N=>N.bridgeId||m.has(N.roadCurveId)))continue;let D=(v+A+1)/2;for(let N of[-.39,.39]){let[V,H]=dr(w,b+.5,D+N);ps(u,V,H,R===Et?1:.1,R===Jt?1:.1,new yt("#b09167"),t,.046)}}let M=new Set,E=new Set;for(let w of p)if(!(w.junction||w.cells.some(R=>R.bridgeId||m.has(R.roadCurveId))))for(let R of[-1,1]){let b=w.cells.map(H=>x.get(lt({x:H.x+(w.axis===Et?R:0),z:H.z+(w.axis===Jt?R:0)}))).find(Boolean),v=`${b}:${w.axis}:${R}`;if(!b||M.has(v))continue;M.add(v);let A=(w.lo+w.hi+1)/2,I=w.t+.5+R*.15;if(w.width>=2&&w.material!=="dirt"&&!y.has(w.id)){E.add(w.id);let H=new yt(Nn[w.material][2]),G=w.width*3,O=(w.width-.45)/G;for(let B=0;B<G;B++){let[K,Y]=dr(w,I,A+(B+.5-G/2)*O);ps(u,K,Y,w.axis===Et?.26:O*.55,w.axis===Et?O*.55:.26,H,t,w.material==="stone"?.068:.056)}if(w.material==="asphalt"&&!g.has(b)){let B=w.width/2,[K,Y]=dr(w,I-R*.27,A+R*B/2*(w.axis===Et?1:-1));ps(u,K,Y,w.axis===Et?.062:B-.25,w.axis===Et?B-.25:.062,H,t,.056)}}let z=g.has(b)?null:ec(n,w);if(!z||a)continue;let P=[w.hi+1.11,w.lo-.11].map(H=>dr(w,I-R*.32,H)).find(([H,G])=>{let O={x:Math.floor(H),z:Math.floor(G)};return!r(O)&&!n.has(lt(O))});if(!P)continue;let[D,N]=P,V=t(D,N);fn(d,.082,.092,.055,"#827e70",D,V,N,8),fn(d,.026,.035,.69,"#646960",D,V,N,8),de(d,z===Et?.124:.155,.31,z===Et?.155:.124,"#303934",D,V+.59,N);for(let[H,[G,O]]of[["green","#72ef9c"],["yellow","#f6bf4b"],["red","#f07859"]].entries()){let B=new Vt(new un(.034,10,6),new en);B.position.set(D,V+.643+H*.093,N),B.rotation.y=z===Et?Math.PI/2:0,B.scale.z=2.2,c.add(B),l.push({lamp:B,color:O,phase:G,axis:z})}}let S=new yt(Nn.asphalt[2]);for(let w of p){let{axis:R,t:b,lo:v,hi:A,width:I}=w;if(w.junction||I<2||y.has(w.id)||E.has(w.id)||!w.cells.every(P=>P.material==="asphalt"&&!P.bridgeId&&!m.has(P.roadCurveId)))continue;let z=(v+A+1)/2;for(let P of xo(I)){let[D,N]=dr(w,b+.5,z+P);ps(u,D,N,R===Et?.54:.055,R===Jt?.54:.055,S,t,.052)}}return c.add(fc(h.positions,h.colors,h.indices),fc(u.positions,u.colors,u.indices)),a||c.add(Je(d),Jb(n,x,t,e,r,m)),[...n.values()].some(w=>w.bridgeId)&&c.add(Lp(n,o)),{group:c,update(w){for(let{lamp:R,color:b,phase:v,axis:A}of l)R.material.color.set(nc(w,A)===v?b:"#555649")}}}function ms(n,t,e){let i=dc(),s=5,r=s+1,o=e.grid?.045:0;for(let{x:l,z:h,color:u}of n){let d=new yt(u),p=i.positions.length/3;for(let x=0;x<=s;x++)for(let g=0;g<=s;g++){let m=l+kt.lerp(o,1-o,g/s),f=h+kt.lerp(o,1-o,x/s);if(i.positions.push(m,t(m,f)+(e.elevation??.029),f),i.colors.push(d.r,d.g,d.b),x&&g){let y=p+(x-1)*r+g-1,_=y+r;i.indices.push(y,_,y+1,y+1,_,_+1)}}}let a=new en({vertexColors:!0,transparent:!0,opacity:e.opacity,depthWrite:!1}),c=fc(i.positions,i.colors,i.indices,a);return c.renderOrder=e.order??0,c}function kp(n,t,e){let i=[],s=[],r=new Map,o=new yt("#fffdf5"),a=new yt("#ff322e");for(let{x:u,z:d}of n)for(let[p,x,g,m]of[[u,d,u+1,d],[u,d+1,u+1,d+1],[u,d,u,d+1],[u+1,d,u+1,d+1]])r.set(`${p},${x}:${g},${m}`,[p,x,g,m]);function c(u,d,p,x,g,m){for(let f=0;f<m;f++)for(let y of[f/m,(f+1)/m]){let _=kt.lerp(u,p,y),M=kt.lerp(d,x,y);i.push(_,e(_,M)+.095,M),s.push(g.r,g.g,g.b)}}for(let u of r.values())c(...u,o,8);for(let{x:u,z:d}of t)c(u+.2,d+.5,u+.8,d+.5,a,4),c(u+.5,d+.2,u+.5,d+.8,a,4);let l=new oe().setAttribute("position",new Yt(i,3)).setAttribute("color",new Yt(s,3)),h=new Gn(l,new Cn({vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1}));return h.renderOrder=7,h}function gc(n,t,e,i=()=>!0){let s=[];for(let o of n.values())for(let a of o.links){let c=n.get(a.id);if(!(!c||!i(o,c)||a.crossing&&!o.id.startsWith("roundabout:")&&!c.id.startsWith("roundabout:")))for(let[l,h]of[[0,.25],[.4,.65],[.8,1]])for(let u of[l,h]){let d=kt.lerp(o.x,c.x,u),p=kt.lerp(o.z,c.z,u);s.push(d,t(d,p)+.075,p)}}let r=new oe().setAttribute("position",new Yt(s,3));return new Gn(r,new Cn({color:e,transparent:!0,opacity:.85}))}var{lerp:gs,smoothstep:xc}=kt,jh=.4,Hp=2.25,Gp=[-9.25,-5.8],Vp=[-18.5,-5.2],Kb=[[[-1.86,-4.5],[-3.1,-4.7],[-4.3,-5.3],[-5.7,-5.65],[-7.6,-5.55],Gp],[Vp,[-19.75,-5.75],[-21.45,-5.55],[-22.5,-4.75],[-22.4,-2],[-20.6,-.2],[-18.9,.3]],[[-5.7,-5.65],[-5.35,-4.7],[-4.85,-3.55],[-5.55,-2.3],[-7.1,-1.7],[-8.4,-.7]],[[-7.6,-5.55],[-7.9,-6.45],[-7.25,-7.6],[-5.4,-8],[-4.7,-8.9]],[[-21.45,-5.55],[-21.9,-6.7],[-22.1,-8.25],[-21.5,-9.5]],[[10.45,-14.12],[9.35,-14.05],[8.2,-13.65],[7.3,-13.35],[6.4,-14.2]],[[10.45,-14.12],[10,-15.5],[9.6,-16.7],[8.8,-17.58],[7.4,-17.62],[6.55,-17.85]]],jb=Qh([Gp,[-12.5,-5.67],[-15.2,-5.44],Vp]);function Qh(n){return new yn(n.map(([t,e])=>new k(t,0,e)))}function Qb(n,t,e){return Array.from({length:e},(i,s)=>{let r=s/(e-1),{x:o,z:a}=n.getPointAt(r),c=n.getTangentAt(r);return{x:o,z:a,y:t(o,a,r),dx:c.x,dz:c.z}})}var tE=Qh([[8,-5.78],[8.3,-7.25],[9.2,-8.5],[10.65,-9.65],[12.05,-11.05],[12.45,-12.4],[11.95,-13.55],[11.15,-14],[10.45,-14.12]]),eE=Qb(tE,(n,t,e)=>{let i=e-.02*Math.sin(2*Math.PI*e);return gs(jh,Hp,i)},121),nE=Kb.map(Qh),ww=[...nE,jb].flatMap(n=>n.getSpacedPoints(Math.ceil(n.getLength()*5)));function yo(n,t,e,i,s,r,o){return 1-xc(Math.hypot(Math.max(e-n,0,n-i),Math.max(s-t,0,t-r)),0,o)}function Wp(n,t,e){let i=xc(ja(n,t),1.1,3.5);if(!i)return e;let s=gs(e,.67,i*yo(n,t,-9.4,-3,-9.2,1.4,3.3));if(s=gs(s,.77,i*yo(n,t,-24.2,-18.5,-9.5,1.5,4)),s=gs(s,jh,i*yo(n,t,-2.9,13.1,-6.2,9.9,3.1)),s=gs(s,Hp,i*yo(n,t,4.7,10.8,-20.65,-10.6,4.5)),s=gs(s,jh+.06,i*yo(n,t,-.45,3.9,-9.8,-6,1.85)),t>=-6)return s;let r=Mn(n,t,eE);if(!r)return s;let a=(1-xc(t,-7.3,-6))*(1-xc(r.distance,1.28,2.22));return gs(s,r.height-.028,a)}function Xp({clearGround:n,editableScenery:t,showScenery:e,groundPalette:i}={}){return uo({clearGround:n,editableScenery:t,showScenery:e,groundPalette:i,gradeGround:Wp,showHillDetails:!1})}function qp(n){let t=new Set(n.map(lt)),e=[];for(let{x:i,z:s}of n)for(let[r,o,...a]of[[-1,0,i,s,i,s+1],[1,0,i+1,s,i+1,s+1],[0,-1,i,s,i+1,s],[0,1,i,s+1,i+1,s+1]])t.has(lt({x:i+r,z:s+o}))||e.push(a);return e}function pr(n,[t,e,i,s],r,o,a=!1){for(let c=0;c<o;c+=a?2:1)for(let l of[c/o,(c+1)/o]){let h=kt.lerp(t,i,l),u=kt.lerp(e,s,l);n.push(h,r(h,u),u)}}function tu(n,t,e,i,s=Ys){let r=new oe().setAttribute("position",new Yt(n,3)),o=new Cn({color:t,transparent:!0,opacity:e,depthWrite:!1,depthFunc:s}),a=new Gn(r,o);return a.renderOrder=i,a}function Yp({core:n,transition:t,targetY:e,targetAt:i},s,r){let o=new jt;if(n.length){let a=i??(()=>e),c=ms(n.map(u=>({...u,color:"#76e8ff"})),a,{opacity:.22,elevation:0,order:4});c.material.polygonOffset=!0,c.material.polygonOffsetFactor=-1,c.material.polygonOffsetUnits=-1;let l=[],h=[];for(let u of qp(n))pr(l,u,a,i?8:1),pr(h,u,a,8,!0);o.add(c,tu(l,"#a3f5ff",.98,8),tu(h,"#a3f5ff",.7,8,dh))}if(t.length){let a=[],c=(l,h)=>s(l,h)+.1;for(let l of qp(t))pr(a,l,c,8,!0);if(r)for(let{x:l,z:h}of t)pr(a,[l+.12,h+.56,l+.55,h+.13],c,4),pr(a,[l+.18,h+.87,l+.87,h+.18],c,5),pr(a,[l+.45,h+.87,l+.88,h+.44],c,4);o.add(tu(a,r?"#ffeb90":"#e7d6a6",r?.9:.6,7))}return o}var mr={grass:"#9fd486",grassDark:"#86c06c",dirt:"#b98a5e",dirtDark:"#8a6342",soil:"#d2b48c",road:"#5d6470",roadDirt:"#c9a37a",line:"#f4f1e8",sidewalk:"#e7dfd2",curb:"#cfc5b6",plaza:"#efe6d6",wallCream:"#f3e7d3",wallPeach:"#f2c9a8",wallMint:"#cfe7d6",wallSky:"#cfe0f0",wallBrick:"#d98c6a",wallWhite:"#f7f5f0",roofRed:"#d9654b",roofBlue:"#5f86b5",roofGreen:"#6aa36f",roofGray:"#8d96a3",trim:"#ffffff",wood:"#a8784d",woodDark:"#7a5534",glass:"#a9d6e5",door:"#8c5a3c",metal:"#9aa3ad",metalDark:"#5b6470",leaf:"#6fbf6a",leafDark:"#4f9d57",leafLight:"#93d27d",trunk:"#8b5e3c",flowerPink:"#f29bb8",flowerYellow:"#f7d35c",water:"#7cc6e6",sand:"#ecd9a6",busYellow:"#f4b740",carRed:"#e0604f",carBlue:"#5f8fd0",scaffold:"#e8a23a",crane:"#f2c14e"},$p=["#f9dcc4","#f1c7a5","#e3ad86","#c98f66","#9c6b4c"],Zp=["#2b2522","#4a3426","#7a4b2a","#c98a4b","#e6c27a","#5b6b8c","#b05a6a"],Jp=["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8","#4db6ac","#f06292","#fff176","#90a4ae"],Kp=["#455a64","#5d4037","#3949ab","#6d4c41","#37474f","#8d6e63"];var eu=.28,vo=(n,t)=>n[Math.floor(t()*n.length)];function jp(n=Math.random){return{skin:vo($p,n),hair:vo(Zp,n),shirt:vo(Jp,n),pants:vo(Kp,n),style:vo(["short","long","bun","cap"],n),bag:n()<.35}}var Se={head:new un(.2,20,14),hairCap:new un(.215,20,10,0,Math.PI*2,0,Math.PI*.55),eye:new un(.026,8,6),cheek:new un(.03,8,6),torso:new Zr(.13,.12,4,12),limb:new Zr(.045,.1,4,8),hand:new un(.048,8,6),shoe:new on(.09,.05,.14),bun:new un(.08,10,8),bag:new on(.2,.2,.09),brim:new hn(.16,.16,.02,14),book:new on(.2,.14,.03),spike:new Qi(.055,.13,5),hatCrown:new hn(.16,.19,.13,14),hatBrim:new hn(.29,.29,.02,18),lens:new Da(.045,.009,6,14),bridge:new on(.05,.012,.012)};function ye(n,t,e,i,s,r){let o=new Vt(t,Re(e));return o.position.set(i,s,r),n.add(o),o}function _c(n,t,e,i,s,r,o){let a=new jt;if(a.position.set(t,e,0),n.add(a),!r)return ye(a,Se.limb,i,0,-.09,0),ye(a,Se.hand,s,0,-.2,0),{joint:a};ye(a,Se.limb,o,0,-.07,0);let c=new jt;return c.position.y=-.13,a.add(c),ye(c,Se.limb,o,0,-.06,0),ye(c,Se.shoe,"#3a3f47",0,-.13,.02),{joint:a,knee:c}}function Qp(n){let t=new jt;t.add(Sh(.22));let e=new jt;e.position.y=eu,t.add(e),ye(e,Se.torso,n.shirt,0,.16,0).scale.set(1,1,.78),ye(e,Se.torso,n.pants,0,.05,0).scale.set(1.02,.45,.8),n.bag&&ye(e,Se.bag,"#8d6e63",0,.2,-.12);let i=new jt;i.position.y=.33,e.add(i),ye(i,Se.head,n.skin,0,.18,0);let s=ye(i,Se.hairCap,n.style==="cap"?"#e05a4f":n.hair,0,.19,-.012);if(s.rotation.x=-.25,n.style==="long"&&ye(i,new on(.36,.26,.12),n.hair,0,.1,-.12),n.style==="bun"&&ye(i,Se.bun,n.hair,0,.38,-.08),n.style==="cap"&&ye(i,Se.brim,"#e05a4f",0,.27,.1).scale.set(1,1,.8),n.style==="spiky"){for(let d=0;d<6;d++){let p=d/6*Math.PI*2;ye(i,Se.spike,n.hair,Math.sin(p)*.09,.37,Math.cos(p)*.08-.03).rotation.set(Math.cos(p)*.55,0,-Math.sin(p)*.55)}ye(i,Se.spike,n.hair,0,.42,-.02)}if(n.accessory==="hat"&&(ye(i,Se.hatCrown,"#3f4a5a",0,.38,-.01),ye(i,Se.hatBrim,"#3f4a5a",0,.32,0),ye(i,Se.bridge,"#f4b740",0,.35,.17).scale.set(5.5,3,1)),n.accessory==="glasses"){for(let d of[-.07,.07])ye(i,Se.lens,"#2b2522",d,.17,.195);ye(i,Se.bridge,"#2b2522",0,.175,.2)}let r=[ye(i,Se.eye,"#2b2522",-.07,.17,.18),ye(i,Se.eye,"#2b2522",.07,.17,.18)];ye(i,Se.cheek,"#f4a3a3",-.12,.11,.16).scale.set(1,.6,.5),ye(i,Se.cheek,"#f4a3a3",.12,.11,.16).scale.set(1,.6,.5);let o=_c(e,.17,.25,n.shirt,n.skin,!1,n.pants).joint,a=_c(e,-.17,.25,n.shirt,n.skin,!1,n.pants).joint,c=_c(e,.07,0,n.shirt,n.skin,!0,n.pants),l=_c(e,-.07,0,n.shirt,n.skin,!0,n.pants),h=ye(e,Se.book,"#4a7bd0",0,.2,.2);h.rotation.x=-.5,h.visible=!1;let u=d=>r.includes(d)||d===h;for(let d of[e,i,o,a,c.joint,l.joint,c.knee,l.knee])Ld(d,u);return{root:t,hips:e,head:i,armL:o,armR:a,legL:c.joint,legR:l.joint,kneeL:c.knee,kneeR:l.knee,eyes:r,book:h}}var nu=()=>({legL:0,legR:0,kneeL:0,kneeR:0,armL:0,armR:0,outL:.08,outR:.08,bob:0,lean:0,nod:0,turn:0,book:!1});function tm(n,t,e,i){let s=nu();switch(s.turn=i,n){case"walk":{let r=Math.sin(e);s.legL=r*.6,s.legR=-r*.6,s.kneeL=Math.max(0,r)*.7,s.kneeR=Math.max(0,-r)*.7,s.armL=-r*.55,s.armR=r*.55,s.bob=Math.abs(Math.cos(e))*.025,s.lean=.06,s.turn=0;break}case"idle":s.bob=Math.sin(t*2)*.006,s.armL=Math.sin(t*2)*.04,s.armR=-s.armL;break;case"sit":s.legL=s.legR=-1.45,s.kneeL=s.kneeR=1.35,s.kneeL+=Math.sin(t*3)*.15,s.kneeR-=Math.sin(t*3)*.15,s.bob=.19,s.armL=s.armR=-.35;break;case"read":s.armL=s.armR=-1.05,s.outL=s.outR=-.25,s.nod=.28+Math.sin(t*.7)*.04,s.book=!0;break;case"wave":s.outR=2.5+Math.sin(t*9)*.35,s.armR=-.2,s.turn=0;break;case"celebrate":{let r=Math.abs(Math.sin(t*6));s.outL=s.outR=2.6,s.bob=r*.12,s.kneeL=s.kneeR=(1-r)*.4,s.legL=s.legR=-(1-r)*.2;break}case"talk":s.armR=-.6+Math.sin(t*4)*.25,s.outR=.3+Math.sin(t*3)*.2,s.nod=Math.sin(t*5)*.06;break}return s}var iE=(n,t,e)=>n+(t-n)*e;function em(n,t,e,i,s){let r=Math.min(1,i*(s?8:14));for(let o of Object.keys(e))o!=="book"&&(t[o]=iE(t[o],e[o],r));t.book=e.book,n.legL.rotation.x=t.legL,n.legR.rotation.x=t.legR,n.kneeL.rotation.x=t.kneeL,n.kneeR.rotation.x=t.kneeR,n.armL.rotation.x=t.armL,n.armR.rotation.x=t.armR,n.armL.rotation.z=t.outL,n.armR.rotation.z=-t.outR,n.hips.position.y=eu+t.bob,n.hips.rotation.x=t.lean,n.head.rotation.x=t.nod,n.head.rotation.y=t.turn,n.book.visible=t.book}function nm(n){let t=new jt;Ln(t,.85,.38,1.55,n,0,.12,0,.12),Ln(t,.72,.32,.85,n,0,.48,-.1,.1),de(t,.74,.22,.7,mr.glass,0,.52,-.1);for(let[e,i]of[[-.4,.5],[.4,.5],[-.4,-.5],[.4,-.5]]){let s=fn(t,.15,.15,.12,"#2d3138",e,0,i,10);s.rotation.z=Math.PI/2,s.position.y=.15}return de(t,.12,.08,.04,"#fff6c8",-.28,.3,.78),de(t,.12,.08,.04,"#fff6c8",.28,.3,.78),Je(t)}function im(){let n=new jt;Ln(n,1.1,1.15,3,mr.busYellow,0,.15,0,.14),de(n,1.14,.38,2.5,"#3b4654",0,.75,-.1),de(n,1,.45,.05,mr.glass,0,.65,1.5),de(n,1.14,.1,3,mr.trim,0,.45,0);for(let[t,e]of[[-.5,1],[.5,1],[-.5,-1],[.5,-1]]){let i=fn(n,.2,.2,.14,"#2d3138",t,0,e,10);i.rotation.z=Math.PI/2,i.position.y=.2}return Je(n)}var nT=2+.35;function sm(n){let t=new jt;for(let i of[-.125,.125]){let s=fn(t,.057,.057,.029,"#333637",0,.057,i,10);s.rotation.z=Math.PI/2}de(t,.105,.077,.25,n,0,.09,0),de(t,.079,.03,.125,"#454039",0,.145,-.057),de(t,.036,.085,.033,n,0,.14,.09),de(t,.147,.017,.022,"#494b47",0,.194,.096),de(t,.042,.032,.027,"#fff2c5",0,.148,.126),de(t,.09,.09,.059,"#566257",0,.192,-.045);let e=new Vt(new un(.055,8,6),new Ae({color:"#f1db9e"}));return e.position.set(0,.27,-.032),t.add(e),Je(t)}var rm=(n,{x:t,z:e},i)=>n.x>t-i&&n.x<t+1+i&&n.z>e-i&&n.z<e+1+i,am="east:turn",rE=["hill:turn","west:turn"];function om(n,t,e,i,s){let r=[...n.values()].find(c=>c.section.axis===e&&c.section.t===i&&c.section.lo<=s&&c.section.hi>=s&&c.section.width>=2&&c.direction===1&&c.index===0&&!c.links.length);if(!r)return;let o=n.get(`${r.section.id}:-1:0`);if(!o?.links.length)return;let a={...r,id:t,links:[{id:o.id,crossing:!1}],x:(r.x+o.x)/2+(e===Et?.31:0),z:(r.z+o.z)/2+(e===Jt?.31:0)};n.set(t,a),r.links.push({id:t,crossing:!1})}function iu(n,t,e){if(!n.has(t)||!n.has(e))return null;let i=new Map([[t,null]]),s=[t];for(let r of s){if(r===e){let o=[];for(let a=e;a!==t;a=i.get(a))o.push(a);return o.reverse()}for(let o of n.get(r).links)i.has(o.id)||(i.set(o.id,r),s.push(o.id))}return null}function oE(n){om(n,am,Et,11,0),om(n,"west:turn",Jt,-5,-6)}function cm(n,t){let e=new jt,i=dn(519),s=["walk","walk","walk","walk","walk","car","car","motorcycle","motorcycle"].map((m,f)=>{let y=m==="walk"?Qp(jp(i)):null,_=m==="motorcycle",M=f===6,E=y?.root??(_?sm(f===7?"#4b8682":"#ab6256"):M?im():nm("#5a8899"));return E.name=m,E.scale.setScalar(y?.38:_?1:.45),M&&E.scale.set(.36,.36,.23),E.visible=!1,e.add(E),{mode:m,model:E,rig:y,pose:y&&nu(),index:f,node:null,next:null,speed:y?.79+i()*.22:_?1.16:1.28,radius:y?.135:_?.075:.25,wait:0,restartAt:0,stride:0,steps:0,junction:null,path:[],origin:am,destination:rE[f-5],returning:!1}}),r={},o={},a=[],c=m=>{a=m},l=(m,f)=>a.some(y=>rm(m,y,f));function h(m,f,y,_=new Map){t||oE(y);let M=t?.(y);r={walk:f,car:y,motorcycle:_};for(let E of[y,_])for(let S of E.values())S.signal=S.roundaboutEntry?null:ec(m,S.section);o={walk:[...f.values()].filter(E=>E.links.length&&!E.section.junction).sort((E,S)=>E.section.width-S.section.width||S.z-E.z),motorcycle:[..._.values()].filter(E=>E.links.length&&!E.section.junction).sort((E,S)=>E.section.width-S.section.width||S.z-E.z)};for(let E of s){let S=r[E.mode];if(E.path=[],M&&E.mode==="car"&&Object.assign(E,M[E.index-5]),!S.has(E.node)||E.next&&!S.has(E.next)){if(E.node=E.next=null,E.junction=null,E.mode!=="car")E.model.visible=!1;else if(E.model.visible){let w=[...S.values()].find(R=>Math.hypot(R.x-E.model.position.x,R.z-E.model.position.z)<.12);E.node=w?.id??null}}}}function u(m,f,y){m.model.position.set(f,n(f,y)+.046,y)}function d(m){if(m.mode==="car"){if(m.model.visible)return;let _=r.car,M=iu(_,m.origin,m.destination);if(!M?.length||!iu(_,m.destination,m.origin))return;let E=_.get(m.origin);if(l(E,m.radius)||s.some(S=>S!==m&&S.model.visible&&Math.hypot(S.model.position.x-E.x,S.model.position.z-E.z)<.85))return;m.node=E.id,m.path=M,u(m,E.x,E.z),m.model.visible=!0;return}let f=o[m.mode]??[],y=Math.floor((m.index+m.steps*.63)*f.length/s.length);for(let _=0;_<f.length;_++){let M=f[(y+_)%f.length];if(!l(M,m.radius)&&!s.some(E=>E.model.visible&&Math.hypot(E.model.position.x-M.x,E.model.position.z-M.z)<.85)){u(m,M.x,M.z),m.node=M.id,m.model.visible=!0,m.wait=0;return}}}function p(m,f,y){if(m.mode==="car")return m.path.length||(m.path=iu(f,y.id,m.returning?m.origin:m.destination)??[]),m.path[0];if(t&&y.junction){let w=[{node:y,first:null}],R=new Set([y.id]);for(let{node:b,first:v}of w)for(let A of b.links){let I=f.get(A.id);if(!R.has(I.id)){if(R.add(I.id),I.junction===y.junction)w.push({node:I,first:v??I.id});else if(!s.some(z=>z!==m&&z.model.visible&&Math.hypot(z.model.position.x-I.x,z.model.position.z-I.z)<.42))return v??I.id}}}let _=y.links.filter(w=>!w.crossing),M=y.links.filter(w=>w.crossing),E=M.length&&(!_.length||(m.index+m.steps)%5===0)?M:_;if(E.length)return E[m.index%E.length].id;let S=`${y.section.id}:${-y.direction}:${y.index}`;return f.get(S)?.links.length?S:null}function x(m,f){for(let y of[...s].sort((_,M)=>M.wait-_.wait||+(_.mode==="car")-+(M.mode==="car"))){if(!y.node){m>=y.restartAt&&d(y);continue}if(m<y.restartAt)continue;let _=r[y.mode],M=_.get(y.node),E=y.next??p(y,_,M);if(!E){if(y.mode==="car")continue;y.node=null,y.junction=null,y.model.visible=!1,y.restartAt=m+1.4,y.steps++;continue}let S=_.get(E),w=S.junction&&M.junction!==S.junction,R=!y.next&&w&&M.signal&&nc(m,M.signal)!=="green",b=y.model.position,v=S.x-b.x,A=S.z-b.z,I=Math.hypot(v,A),z=y.mode!=="walk"&&M.section.material==="dirt"?.77:1,P=Math.min(I,f*y.speed*z),D=I>.001?b.x+v/I*P:S.x,N=I>.001?b.z+A/I*P:S.z,V=!l(b,y.radius)&&l(S,y.radius),H=w&&s.some(B=>B!==y&&B.junction===S.junction),G=s.some(B=>{if(B===y||!B.model.visible)return!1;let K=B.model.position.x-b.x,Y=B.model.position.z-b.z,st=v*Math.sin(B.model.rotation.y)+A*Math.cos(B.model.rotation.y)>I*.8,ot=y.mode!=="walk"&&B.mode!=="walk"&&st&&Math.abs(K*A-Y*v)<.24*I,Q=y.radius+B.radius+(ot?.24:.025);return K*v+Y*A>0&&Math.hypot(B.model.position.x-D,B.model.position.z-N)<Q}),O=R||G||V||H;O?y.wait+=f:(y.wait=0,y.next=E,y.junction=M.junction||S.junction,u(y,D,N),I>.001&&(y.model.rotation.y=Math.atan2(v,A)),y.stride+=P*14,I<=P+.001&&(y.node=E,y.next=null,y.junction=S.junction,y.steps++,y.mode==="car"&&(y.path[0]===E&&y.path.shift(),E===(y.returning?y.origin:y.destination)&&(y.returning=!y.returning,y.restartAt=m+1.2,y.junction=null)))),y.rig&&em(y.rig,y.pose,tm(O?"idle":"walk",m,y.stride,0),f,!1)}}function g(m){return s.some(({model:f,radius:y})=>f.visible&&m.some(_=>rm(f.position,_,y)))}return{group:e,setRoads:h,tick:x,busy:g,restrict:c}}var wo=Dg(dg());var du=({x:n,z:t})=>[n+.5,t+.5],So=([n,t],[e,i])=>Math.hypot(n-e,t-i);function pg({origin:n,end:t,width:e,bounds:i,obstacle:s,waterAt:r,surfaceY:o,autoGrade:a,tryRoute:c}){let l=li({x:n[0],z:n[1]}),h=li({x:t[0],z:t[1]}),u=({x:v,z:A})=>v>=i.left&&v<=i.right&&A>=i.top&&A<=i.bottom;if(!u(l)||!u(h)||So(n,t)>pn)return null;let d=new Map,p=v=>{let A=lt(v);return d.has(A)||d.set(A,!u(v)||s(v)||[.08,.5,.92].some(I=>[.08,.5,.92].some(z=>r(v.x+I,v.z+z)))),d.get(A)};if(p(l)||p(h))return null;let x=Math.max(i.left,Math.min(l.x,h.x)-pn),g=Math.max(i.top,Math.min(l.z,h.z)-pn),m=Math.min(i.right,Math.max(l.x,h.x)+pn),f=Math.min(i.bottom,Math.max(l.z,h.z)+pn),y=new wo.default.Grid(m-x+1,f-g+1),_=lt(l),M=lt(h),E=Math.floor(e/2);for(let v=g;v<=f;v++)for(let A=x;A<=m;A++){let I={x:A,z:v},z=lt(I);if(z===_||z===M)continue;let P=So(n,du(I))+So(du(I),t)<=pn+1.5;for(let D=0;P&&D<e;D++)for(let N=0;P&&N<e;N++)P=!p({x:A+D-E,z:v+N-E});P||y.setWalkableAt(A-x,v-g,!1)}let S=new wo.default.AStarFinder({diagonalMovement:wo.default.DiagonalMovement.Never}),w=new Map,R=(v,A)=>{let I=A*y.width+v;return w.has(I)||w.set(I,o(v+x+.5,A+g+.5)),w.get(I)},b=new Set;for(let v=0;v<8;v++){let A=y.clone(),I=A.getNeighbors.bind(A),z=a?v===0?.45:.9:e===1?.35:.27;A.getNeighbors=(B,K)=>{let Y=R(B.x,B.y);return I(B,K).filter(st=>Math.abs(R(st.x,st.y)-Y)<=z)};let P=S.findPath(l.x-x,l.z-g,h.x-x,h.z-g,A);if(P.length<2)continue;let D=wo.default.Util.compressPath(P).map(([B,K])=>[B+x+.5,K+g+.5]);D[0]=n,D[D.length-1]=t;let N=hr(D,e);if(N.error)continue;let V=c(N);if(!V.error)return{route:N,trial:V};let H=V.errorCell?du(V.errorCell):D[Math.floor(D.length/2)],O=P.slice(1,-1).filter(B=>!b.has(B.join(","))).sort((B,K)=>So([B[0]+x+.5,B[1]+g+.5],H)-So([K[0]+x+.5,K[1]+g+.5],H))[0];O&&(b.add(O.join(",")),y.setWalkableAt(...O,!1))}return null}var{clamp:di,lerp:qn,smoothstep:To}=kt,xs=1.25,Sn=1e-5,pu=.35,Pc=12,mu=20,AE=1.4,Ic="Qu\xE1 s\xE1t c\xF4ng tr\xECnh/\u0111\u01B0\u1EDDng hi\u1EC7n c\xF3.",Ao="Ch\u1EEBa m\u1EB7t n\u01B0\u1EDBc v\xE0 l\xF2ng su\u1ED1i khi ch\u1EC9nh \u0111\u1ECBa h\xECnh.",Lc=(n,t)=>({x:Math.floor(n),z:Math.floor(t)}),Dc=({x:n,z:t})=>({left:n,right:n+1,top:t,bottom:t+1}),Mr=(n,t,e)=>Math.hypot(Math.max(n.left-t,t-n.right,0),Math.max(n.top-e,e-n.bottom,0));function gu(n,t){if(!n?.addUpdateRange||!t.size)return;let e=-1,i=-1;for(let s of[...t].sort((r,o)=>r-o))(e<0||s>i+2)&&(e>=0&&n.addUpdateRange(e*3,(i-e+1)*3),e=s),i=s;n.addUpdateRange(e*3,(i-e+1)*3)}function mg({ground:n,surfaceY:t,waterAt:e=()=>null,vertexColumns:i}){let{geometry:s}=n,r=s.getAttribute("position"),o=s.getAttribute("color");r.setUsage(ss),s.getAttribute("normal")?.setUsage(ss),o?.setUsage(ss);let a=new Map,c=new Map,l=new yt("#a08b68");function h(R,b,v=xs){let A=R.left-v,I=R.right+v,z=R.top-v,P=R.bottom+v;if(!i){for(let D=0;D<r.count;D++){let N=r.getX(D),V=r.getZ(D);N>=A&&N<=I&&V>=z&&V<=P&&b(D,N,V)}return}for(let D=0;D<r.count;D+=i){let N=r.getZ(D);if(N<z)continue;if(N>P)break;let V=D,H=D+i;for(;V<H;){let G=V+H>>1;r.getX(G)<A?V=G+1:H=G}for(let G=V;G<D+i;G++){let O=r.getX(G);if(O>I)break;b(G,O,N)}}}function u(R){let b=new Map;function v(I,z,P){let D=lt({x:I,z});b.has(D)||b.set(D,new Set);for(let N of P)b.get(D).add(N)}let A=s.index;return h(R,(I,z,P)=>{if(!A||!i){v(Math.floor(z),Math.floor(P),[I]);return}let D=I%i,N=Math.floor(I/i);if(D===i-1||I+i+1>=r.count)return;let V=(N*(i-1)+D)*6;for(let H=0;H<6;H+=3){let G=[0,1,2].map(K=>A.getX(V+H+K)),O=G.map(K=>r.getX(K)),B=G.map(K=>r.getZ(K));for(let K=Math.floor(Math.min(...O));K<Math.max(...O)-Sn;K++)for(let Y=Math.floor(Math.min(...B));Y<Math.max(...B)-Sn;Y++)O.every((ot,Q)=>{let ht=(Q+1)%3,ct=B[Q]-B[ht],at=O[ht]-ot,mt=(K-ot)*ct+(Y-B[Q])*at;return(O[(Q+2)%3]-ot)*ct+(B[(Q+2)%3]-B[Q])*at>0?mt+Math.max(0,ct)+Math.max(0,at)>Sn:mt+Math.min(0,ct)+Math.min(0,at)<-Sn})&&v(K,Y,G)}},2),b}function d(R,b){let v=b?.(R);if(v)return typeof v=="string"?v:Ic;for(let A of[.02,.5,.98])for(let I of[.02,.5,.98])if(e(R.x+A,R.z+I))return Ao;return""}function p(R,b,v,A,I){let z=[],P=[],D=new Set,N=new Set,V=u(R),H=new Map,G=I?2:1;for(let st=R.left-G;st<R.right+G;st++)for(let ot=R.top-G;ot<R.bottom+G;ot++){let Q={x:st,z:ot},ht=lt(Q),ct=d(Q,A);if(ct){H.set(ht,ct);for(let at of V.get(ht)??[])N.add(at)}}for(let st=R.left;st<R.right;st++)for(let ot=R.top;ot<R.bottom;ot++){let Q={x:st,z:ot},ht=lt(Q),ct=Dc(Q),at=V.get(ht),mt=H.get(ht);!mt&&!at?.size&&(mt="\xD4 n\u1EB1m ngo\xE0i ph\u1EA7n \u0111\u1ECBa h\xECnh c\xF3 th\u1EC3 ch\u1EC9nh.");for(let St of at??[]){if(mt)break;if(Math.abs(r.getY(St)-b)<Sn)continue;let F=r.getX(St),vt=r.getZ(St),j=v?.(F,vt);e(F,vt)?mt=Ao:j||N.has(St)?mt=typeof j=="string"?j:Ic:Mr(ct,F,vt)>=G&&(mt="M\xE9p \xF4 qu\xE1 r\u1ED9ng \u0111\u1EC3 san v\u1EDBi vi\u1EC1n chuy\u1EC3n ti\u1EBFp n\xE0y.")}if(mt)P.push({...Q,reason:mt});else{z.push(Q);for(let St of at)D.add(St)}}if(!z.length)return{changes:[],cells:[],core:z,transition:[],skipped:P,targetY:b,error:P[0]?.reason||"Kh\xF4ng c\xF3 \xF4 n\xE0o c\xF3 th\u1EC3 san \u1EDF \u0111\xE2y.",errorCell:P[0]};let O=[],B=new Map,K=new Set(z.map(lt)),Y=new Set(P.map(lt));return h(R,(st,ot,Q)=>{let ht=D.has(st),ct=r.getY(st),at=Lc(ot,Q),mt=lt(at),St=G;if(!ht){if(N.has(st)||Y.has(mt)||e(ot,Q)||v?.(ot,Q))return;for(let vt=at.x-G;vt<=at.x+G;vt++)for(let j=at.z-G;j<=at.z+G;j++){let tt={x:vt,z:j};K.has(lt(tt))&&(St=Math.min(St,Mr(Dc(tt),ot,Q)))}if(St>=G)return}let F=Math.fround(ht?b:qn(b,ct,To(St,0,G)));Math.abs(ct-F)<Sn||(O.push({index:st,oldY:ct,newY:F}),!K.has(mt)&&!Y.has(mt)&&B.set(mt,at))},G),{changes:O,cells:[...z,...B.values()],core:z,transition:[...B.values()],skipped:P,targetY:b,error:""}}function x(R,b,v,A,I=!1){let z=[],P=new Map,D=new Map,N="",V;return h(R,(H,G,O)=>{if(N)return;let B=b(G,O);if(!B||B.distance>=xs)return;let K=r.getY(H),Y=B.cutOnly?Math.min(K,B.y):B.y,st=Math.fround(qn(Y,K,To(B.distance,0,xs)));if(Math.abs(K-st)<Sn)return;let ot=Lc(G,O),Q=e(G,O);if(Q&&A&&B.distance>Sn)return;let ht=v?.(G,O);if(ht&&I&&B.distance>Sn){D.set(lt(ot),ot);return}if(Q||ht){N=Q?Ao:typeof ht=="string"?ht:Ic,V=ot;return}z.push({index:H,oldY:K,newY:st}),P.set(lt(ot),ot)}),{changes:N?[]:z,error:N,errorCell:V,cells:[...P.values()],trimmed:[...D.values()]}}function g(R,b,v,A){let I=(ot,Q)=>({changes:[],cells:[],core:R,error:ot,errorCell:Q});if(R.length<2)return I("K\xE9o t\u1EEB \u0111\u1EA7u n\xE0y t\u1EDBi \u0111\u1EA7u kia c\u1EE7a d\u1ED1c.",R[0]);if(R.length>mu)return I(`M\u1ED7i l\u1EA7n l\xE0m d\u1ED1c t\u1ED1i \u0111a ${mu} \xF4.`,R[mu]);let z=new Set,P=[],D=R[0],N=R.at(-1),V=t(D.x+.5,D.z+.5),H=t(N.x+.5,N.z+.5),G=0;for(let[ot,Q]of R.entries()){let ht=lt(Q),ct=R[ot-1];if(z.has(ht))return I("N\xE9t l\xE0m d\u1ED1c b\u1ECB t\u1EF1 giao nhau.",Q);if(z.add(ht),!ct)continue;let at=Q.x-ct.x,mt=Q.z-ct.z;if(Math.abs(at)+Math.abs(mt)!==1)return I("N\xE9t l\xE0m d\u1ED1c ph\u1EA3i n\u1ED1i c\xE1c \xF4 li\u1EC1n c\u1EA1nh.",Q);P.push({x:ct.x+.5,z:ct.z+.5,dx:at,dz:mt,distance:G}),G+=Math.hypot(at,mt)}let O=Math.abs(H-V)/G;if(O>pu)return I("K\xE9o d\xE0i n\xE9t v\u1EBD \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.",N);for(let[ot,Q]of R.entries()){let ht=d(Q,v);if(ht)return I(ht,Q);for(let ct=0;ct<ot-2;ct++){let at=R[ct];if(Math.abs(Q.x-at.x)+Math.abs(Q.z-at.z)<=1)return I("Ch\u1EEBa \xEDt nh\u1EA5t m\u1ED9t \xF4 \u0111\u1EC7m gi\u1EEFa hai nh\xE1nh d\u1ED1c.",Q)}}let B=R.map(Dc),K={left:Math.min(...R.map(ot=>ot.x)),right:Math.max(...R.map(ot=>ot.x))+1,top:Math.min(...R.map(ot=>ot.z)),bottom:Math.max(...R.map(ot=>ot.z))+1},Y=x(K,(ot,Q)=>{let ht=Math.min(...B.map(mt=>Mr(mt,ot,Q)));if(ht>=xs)return null;let ct=1/0,at=0;for(let mt of P){let St=di((ot-mt.x)*mt.dx+(Q-mt.z)*mt.dz,0,1),F=Math.hypot(ot-mt.x-St*mt.dx,Q-mt.z-St*mt.dz);F<ct&&(ct=F,at=(mt.distance+St)/G)}return{y:qn(V,H,at),distance:ht}},b,!0,A),st=Y.cells.filter(ot=>!z.has(lt(ot)));return{...Y,cells:[...R,...st],core:R,transition:st,grade:O,length:G,skipped:[]}}function m(R,b,v,A){let{cells:I,points:z,width:P}=R,D=z[0],N=z.at(-1),V=t(...D),H=t(...N),G=0,O=z.slice(1).map((ct,at)=>{let[mt,St]=z[at],F=ct[0]-mt,vt=ct[1]-St,j=Math.hypot(F,vt),tt={x:mt,z:St,dx:F,dz:vt,span:j,at:G};return G+=j,tt}),B=Math.abs(H-V)/G,K=(ct,at)=>({changes:[],cells:I,core:I,transition:[],grade:B,error:ct,errorCell:at,ribbon:R});if(B>pu)return K("K\xE9o d\xE0i n\xE9t v\u1EBD \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.",Lc(...N));for(let ct of I){let at=d(ct,v);if(at)return K(at,ct)}let Y={left:Math.min(...I.map(ct=>ct.x)),right:Math.max(...I.map(ct=>ct.x))+1,top:Math.min(...I.map(ct=>ct.z)),bottom:Math.max(...I.map(ct=>ct.z))+1};function st(ct,at){let mt=1/0,St=0;for(let{x:Mt,z:et,dx:L,dz:C,span:Z,at:gt}of O){let pt=di(((ct-Mt)*L+(at-et)*C)/Z**2,0,1),xt=Math.hypot(ct-Mt-pt*L,at-et-pt*C);xt<mt&&([mt,St]=[xt,(gt+pt*Z)/G])}let F=O[0],vt=O.at(-1),j=-((ct-D[0])*F.dx+(at-D[1])*F.dz)/F.span,tt=((ct-N[0])*vt.dx+(at-N[1])*vt.dz)/vt.span,nt=St===0?j:St===1?tt:0;return{y:qn(V,H,St),distance:Math.max(0,mt-P/2,nt)}}let ot=x(Y,st,b,!0,A),Q=new Set(I.map(lt)),ht=ot.cells.filter(ct=>!Q.has(lt(ct)));return{...ot,cells:[...I,...ht],core:I,transition:ht,grade:B,length:G,ribbon:R,targetAt:(ct,at)=>st(ct,at).y}}function f({mode:R,from:b,to:v,size:A,isLocked:I,lockCell:z,cells:P,ribbon:D,softEdges:N=!1,trimLockedShoulder:V=!1}){let H={left:Math.min(b.x,v.x),right:Math.max(b.x,v.x)+1,top:Math.min(b.z,v.z),bottom:Math.max(b.z,v.z)+1},G=b.x+.5,O=b.z+.5,B=t(G,O);if(R==="flatten"){if(e(G,O))return{changes:[],cells:[],core:[],error:"Ch\u1ECDn m\u1ED9t \xF4 \u0111\u1EA5t kh\xF4 l\xE0m cao \u0111\u1ED9 san.",errorCell:b};if(b.x===v.x&&b.z===v.z&&[1,3,4].includes(A)){let ht=Math.floor((A-1)/2);H.left=v.x-ht,H.top=v.z-ht,H.right=H.left+A,H.bottom=H.top+A}let Q={x:di(v.x,b.x-Pc+1,b.x+Pc-1),z:di(v.z,b.z-Pc+1,b.z+Pc-1)};return(Q.x!==v.x||Q.z!==v.z)&&(H.left=Math.min(b.x,Q.x),H.right=Math.max(b.x,Q.x)+1,H.top=Math.min(b.z,Q.z),H.bottom=Math.max(b.z,Q.z)+1),{...p(H,B,I,z,N),capped:Q.x!==v.x||Q.z!==v.z}}if(D)return m(D,I,z,V);if(P)return g(P,I,z,V);let K=v.x-b.x,Y=v.z-b.z,st=Math.hypot(K,Y),ot=t(v.x+.5,v.z+.5);return!st||Math.abs(ot-B)/st>pu?{changes:[],cells:[],errorCell:v,error:st?"K\xE9o d\xE0i v\xF9ng ch\u1ECDn \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.":"K\xE9o t\u1EEB \u0111\u1EA7u n\xE0y t\u1EDBi \u0111\u1EA7u kia c\u1EE7a d\u1ED1c."}:x(H,(Q,ht)=>{let ct=di(((Q-G)*K+(ht-O)*Y)/st**2,0,1);return{y:qn(B,ot,ct),distance:Mr(H,Q,ht)}},I)}function y(R,b){if(!R.length)return{changes:[],error:"",cells:[]};let v=R.map(I=>{let{x:z,z:P,axis:D,width:N}=I,V=D===Et?.5:N/2,H=D===Et?N/2:.5;return{...I,left:z-V,right:z+V,top:P-H,bottom:P+H}}),A={left:Math.min(...v.map(I=>I.left)),right:Math.max(...v.map(I=>I.right)),top:Math.min(...v.map(I=>I.top)),bottom:Math.max(...v.map(I=>I.bottom))};return x(A,(I,z)=>{let P,D=1/0,N=0,V=0,H=1/0,G=1/0;for(let O of v){let B=Mr(O,I,z);if(B>=xs)continue;let K=O.axis===Et?I-O.x:z-O.z,Y=qn(O.startY??O.y,O.endY??O.y,di(K+.5,0,1));B<D&&(P=Y,D=B),O.cutOnly?H=Math.min(H,B):G=Math.min(G,B);let st=Math.max(0,1-Math.abs(K))*(1-To(B,0,xs));N+=Y*st,V+=st}return P===void 0?null:{y:V?N/V:P,distance:D,cutOnly:H<=G}},b,!0)}function _(R,{mode:b,width:v,isLocked:A,shoulder:I=xs}){let z=R.cells,P=(j,tt)=>({error:j,errorCell:tt,changes:[],cells:[],core:z,transition:[]});if(R.error||!z.length)return P(R.error||"Ch\u1ECDn m\u1ED9t tuy\u1EBFn tr\xEAn \u0111\u1EA5t kh\xF4.");let D=z.find(j=>d(j));if(D)return P(Ao,D);let N=[],V=0;for(let[[j,tt],[nt,Mt]]of R.points.slice(1).map((et,L)=>[R.points[L],et])){let et=nt-j,L=Mt-tt,C=Math.hypot(et,L);C&&(N.push({x:j,z:tt,dx:et,dz:L,span:C,start:V}),V+=C)}let H=[];for(let{x:j,z:tt,dx:nt,dz:Mt,span:et,start:L}of N){let C=Math.ceil(et/.65);for(let Z=0;Z<C;Z++)H.push({s:L+et*Z/C,y:t(j+nt*Z/C,tt+Mt*Z/C)})}H.push({s:V,y:t(...R.points.at(-1))});let G=H[0].y,O=H.at(-1).y,B=v===1?.31:.23;if(b==="slope"&&Math.abs(O-G)>B*V)return P("Hai \u0111\u1EA7u tuy\u1EBFn ch\xEAnh cao qu\xE1 l\u1EDBn. K\xE9o d\xE0i \u0111\u01B0\u1EDDng ho\u1EB7c \u0111i v\xF2ng.",z.at(-1));let K=H.map(j=>j.y).sort((j,tt)=>j-tt);if(b==="slope"){for(let j of H){let tt=V-j.s;j.y=di(j.y,Math.max(G-B*j.s,O-B*tt),Math.min(G+B*j.s,O+B*tt))}for(let j=1;j<H.length-1;j++){let tt=H[j-1],nt=H[j],Mt=B*(nt.s-tt.s);nt.y=di(nt.y,tt.y-Mt,tt.y+Mt)}}function Y(j,tt){if(b==="flatten")return K[Math.floor(K.length/2)];let nt=1/0,Mt=0;for(let Z of N){let gt=j-Z.x,pt=tt-Z.z,xt=di((gt*Z.dx+pt*Z.dz)/Z.span**2,0,1),Nt=(gt-xt*Z.dx)**2+(pt-xt*Z.dz)**2;Nt>=nt||(nt=Nt,Mt=Z.start+xt*Z.span)}let et=H.findIndex(Z=>Z.s>=Mt);if(et<0)return H.at(-1).y;if(et<=0)return H[0].y;let L=H[et-1],C=H[et];return qn(L.y,C.y,(Mt-L.s)/(C.s-L.s))}let st={left:Math.min(...z.map(j=>j.x)),right:Math.max(...z.map(j=>j.x))+1,top:Math.min(...z.map(j=>j.z)),bottom:Math.max(...z.map(j=>j.z))+1},ot=u(st),Q=new Set,ht=new Set(z.map(lt)),ct=new Map,at=[];for(let j of ht)for(let tt of ot.get(j)??[])Q.add(tt);let mt,St,F=0,vt=0;return h(st,(j,tt,nt)=>{let Mt=Lc(tt,nt),et=lt(Mt),L=Q.has(j)?0:I;if(L)for(let xt=Mt.x-Math.ceil(I);xt<=Mt.x+Math.ceil(I);xt++)for(let Nt=Mt.z-Math.ceil(I);Nt<=Mt.z+Math.ceil(I);Nt++){let Pt={x:xt,z:Nt};ht.has(lt(Pt))&&(L=Math.min(L,Mr(Dc(Pt),tt,nt)))}if(L>=I)return;let C=r.getY(j),Z=Math.fround(qn(Y(tt,nt),C,To(L,0,I))),gt=Math.abs(Z-C);if(gt<Sn)return;let pt=e(tt,nt)?Ao:A?.(tt,nt);if(pt){L||(St??={cell:Mt,reason:typeof pt=="string"?pt:Ic});return}if(gt>AE){mt??=Mt;return}at.push({index:j,oldY:C,newY:Z}),F=Math.max(F,gt),vt+=gt,ht.has(et)||ct.set(et,Mt)},I),mt?P("Ph\u1EA3i \u0111\xE0o ho\u1EB7c \u0111\u1EAFp qu\xE1 s\xE2u. Th\u1EED k\xE9o d\xE0i tuy\u1EBFn ho\u1EB7c \u0111i v\xF2ng.",mt):!at.length&&St?P(St.reason,St.cell):{error:"",changes:at,core:z,cells:[...z,...ct.values()],transition:[...ct.values()],targetAt:Y,maxChange:F,movedHeight:vt,blocked:St}}function M(R,b){if(!i){b(R);return}let v=R%i;for(let A=-1;A<=1;A++)for(let I=-1;I<=1;I++){if(v+I<0||v+I>=i)continue;let z=R+A*i+I;z>=0&&z<r.count&&b(z)}}function E(R,b=!0){if(!R.length)return;let v=new Set,A=new Set;for(let{index:z,oldY:P,newY:D}of R)a.has(z)||a.set(z,P),r.setY(z,b?D:P),v.add(z),M(z,N=>A.add(N));gu(r,v),r.needsUpdate=!0,s.computeVertexNormals();let I=s.getAttribute("normal");if(gu(I,A),o){let z=new Set;for(let P of A){let D=!1;if(M(P,O=>{let B=a.get(O);D||=B!==void 0&&Math.abs(r.getY(O)-B)>=Sn}),!D&&!c.has(P))continue;c.has(P)||c.set(P,[o.getX(P),o.getY(P),o.getZ(P)]);let[N,V,H]=c.get(P),G=D?(1-To(I.getY(P),.48,.85))*.86:0;o.setXYZ(P,qn(N,l.r,G),qn(V,l.g,G),qn(H,l.b,G)),z.add(P)}gu(o,z),z.size&&(o.needsUpdate=!0)}s.boundingBox=null,s.boundingSphere=null}function S(){let R=[];for(let[b,v]of a){let A=r.getY(b);Math.abs(A-v)>=Sn&&R.push({index:b,oldY:v,newY:A})}return R}function w(R){if(!Array.isArray(R)||R.length>r.count)return!1;let b=new Set;for(let v of R){if(!v)return!1;let{index:A,oldY:I,newY:z}=v;if(!Number.isInteger(A)||A<0||A>=r.count||b.has(A)||!Number.isFinite(I)||!Number.isFinite(z)||!Number.isFinite(Math.fround(z))||Math.abs(r.getY(A)-I)>=Sn||e(r.getX(A),r.getZ(A)))return!1;b.add(A)}return E(R),!0}return{planBrush:f,planRoad:y,planRoadCorridor:_,apply:E,heightDeltas:S,restoreDeltas:w}}var _s=(n,t)=>Math.hypot(t[0]-n[0],t[1]-n[1]),br=(n,t,e)=>(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0]);function xu(n){if(n.length<3)return n;let t=n[0],e=n.at(-1),i=0,s=.18;for(let r=1;r<n.length-1;r++){let o=n[r],a=_s(t,e),c=a?Math.max(0,Math.min(1,((o[0]-t[0])*(e[0]-t[0])+(o[1]-t[1])*(e[1]-t[1]))/a**2)):0,l=_s(o,[t[0]+(e[0]-t[0])*c,t[1]+(e[1]-t[1])*c]);l>s&&([i,s]=[r,l])}return i?[...xu(n.slice(0,i+1)).slice(0,-1),...xu(n.slice(i))]:[t,e]}function RE(n,t,e){return n.every((i,s)=>{let r=n[(s+1)%4],o=i[1]-r[1],a=r[0]-i[0];return(t-i[0])*o+(e-i[1])*a+Math.max(0,o)+Math.max(0,a)>1e-7})}function gg(n){for(let t=0;t<n.length;t++){let e=n[t],i=n[(t+1)%n.length];for(let s=t+2;s<n.length;s++){if(t===0&&s===n.length-1)continue;let r=n[s],o=n[(s+1)%n.length];if(!(Math.max(e[0],i[0])<Math.min(r[0],o[0])||Math.max(r[0],o[0])<Math.min(e[0],i[0])||Math.max(e[1],i[1])<Math.min(r[1],o[1])||Math.max(r[1],o[1])<Math.min(e[1],i[1]))&&br(e,i,r)*br(e,i,o)<=0&&br(r,o,e)*br(r,o,i)<=0)return!0}}return!1}function xg(n,t){return n.slice(1,-1).some((e,i)=>{let s=n[i],r=n[i+2],o=Math.abs(br(s,e,r));return o>1e-7&&_s(s,e)*_s(e,r)*_s(s,r)<2*o*t*.6})}function _g(n,t,e=0){let i=n.filter((p,x)=>x===0||_s(p,n[x-1])>.001);if(i.length<2)return{error:"K\xE9o d\xE0i n\xE9t \u0111\u1EC3 t\u1EA1o tuy\u1EBFn."};let s=xu(i),r=new yn(s.map(([p,x])=>new k(p,0,x)),!1,"centripetal"),o=r.getLength();if(o<.24)return{error:"K\xE9o d\xE0i n\xE9t \u0111\u1EC3 t\u1EA1o tuy\u1EBFn."};if(o>20)return{error:"M\u1ED7i n\xE9t d\xE0i t\u1ED1i \u0111a 20 \u0111\u01A1n v\u1ECB. Chia tuy\u1EBFn th\xE0nh nhi\u1EC1u \u0111o\u1EA1n."};let a=r.getSpacedPoints(Math.ceil(o/.2)).map(({x:p,z:x})=>[p,x]);if(xg(a,t)){if(a=Va(s,t*.64),!a||xg(a,t))return{error:"Kh\xFAc cua qu\xE1 g\u1EAFt v\u1EDBi b\u1EC1 r\u1ED9ng n\xE0y. H\xE3y v\u1EBD cua r\u1ED9ng h\u01A1n."};o=a.slice(1).reduce((p,x,g)=>p+_s(x,a[g]),0)}let c=Li(a),l=p=>c.map(({x,z:g,dx:m,dz:f})=>[x-f*p,g+m*p]),h=l(-t/2),u=l(t/2);if(gg([...h,...[...u].reverse()]))return{error:"D\u1EA3i v\u1EBD b\u1ECB ch\u1ED3ng l\xEAn ch\xEDnh n\xF3."};if(e&&gg([...l(-(t+e)/2),...l((t+e)/2).reverse()]))return{error:"Ch\u1EEBa th\xEAm kho\u1EA3ng \u0111\u1EA5t gi\u1EEFa hai nh\xE1nh d\u1ED1c."};let d=new Map;for(let p=1;p<a.length;p++){let x=[h[p-1],h[p],u[p],u[p-1]];if(x.some((f,y)=>br(f,x[(y+1)%4],x[(y+2)%4])<=0))return{error:"Kh\xFAc cua qu\xE1 g\u1EAFt v\u1EDBi b\u1EC1 r\u1ED9ng n\xE0y. H\xE3y v\u1EBD cua r\u1ED9ng h\u01A1n."};let g=x.map(([f])=>f),m=x.map(([,f])=>f);for(let f=Math.floor(Math.min(...g));f<Math.ceil(Math.max(...g));f++)for(let y=Math.floor(Math.min(...m));y<Math.ceil(Math.max(...m));y++)RE(x,f,y)&&d.set(`${f},${y}`,{x:f,z:y})}return{points:a,stations:c,cells:[...d.values()],width:t,length:o,error:""}}var CE={core:"#92c67a",expansion:"#e2c672",terrace:"#dfcf9c",slope:"#ae775a",buffer:"#c5a880",water:"#5699ae"},PE={core:"L\xF5i c\xF3 th\u1EC3 x\xE2y",expansion:"V\xF9ng m\u1EDF r\u1ED9ng",terrace:"\u0110\u1EA5t chuy\u1EC3n cao \u0111\u1ED9",slope:"S\u01B0\u1EDDn d\u1ED1c",buffer:"V\xF9ng \u0111\u1EC7m c\u1EA3nh quan",water:"M\u1EB7t n\u01B0\u1EDBc"},Ro={dirt:"\u0110\u1EA5t",stone:"\u0110\xE1 l\xE1t",asphalt:"Nh\u1EF1a"},Uc={level:new yt("#00e5ff"),fill:new yt("#ffffff"),shallowCut:new yt("#ffab87"),deepCut:new yt("#ff5722")};function yg(n){return Math.abs(n)<=.025?Uc.level:n<0?Uc.fill:Uc.shallowCut.clone().lerp(Uc.deepCut,kt.clamp((n-.025)/.775,0,1))}var He={left:-24,right:22,top:-25,bottom:20};function vg({scene:n,canvas:t,surfaceY:e,blockers:i,town:s}){let r=s?"linguacity-demo-built-town-v1":"linguacity-demo-planning-v3",o=s?s.roadSample:Ep,a=T=>s?Gh(T,e,s.measure):Gh(T),c=document.querySelector("#planning-controls"),l=document.querySelector("#planning-status"),h=document.querySelector("#bus-level"),u=document.querySelector("#road-surface"),d=document.querySelector("#apply-surface"),p=[...document.querySelectorAll("[data-plan-mode]")],x=document.querySelector("#show-zones"),g=document.querySelector("#show-lanes"),m=document.querySelector("#traffic-legend"),f=document.querySelector("#show-grid"),y=document.querySelector("#road-width"),_=document.querySelector("#auto-level"),M=document.querySelector("#flatten-size"),E=document.querySelector("#suggest-detour"),S=document.querySelector("#undo-edit"),w=document.querySelector("#redo-edit"),R=document.querySelector("#stroke-mode"),b=document.querySelector("#road-gesture"),v=null,A=null,I=document.querySelector("#edit-options"),z=document.querySelector("#edit-option-list"),P=s&&mg(s.terrain),D=s?.terrain.scenery,N=new Set(i.filter(T=>Number.isInteger(T.sceneryId)).map(T=>T.sceneryId)),V=[],H=[],G=new jt,O=e,B=(T,W)=>{let X=s&&O(T,W);if(s&&Math.abs(X-e(T,W))>1e-5)return X;let q=ao(Q)&&Mn(T,W,s?.hillRoute);if(q&&q.distance<=1)return(s?Math.max(q.height,e(T,W)):q.height)+.016;if(s)return s.landscape.height(T,W);if(co(Q)){let J=kd(T,W);if(J!==null)return J;let it=Ui(T,W);if(it&&it.distance<=.45)return it.height-.01}return e(T,W)},K=cm(B,s?.trips);G.add(K.group),n.add(G),c.hidden=!1,s&&(x.checked=!1,x.closest("label").hidden=!0,f.closest("label").hidden=!0,c.querySelector(".planning-legend").hidden=!0);let Y=[];for(let T=En.top;!s&&T<=En.bottom;T++)for(let W=En.left;W<=En.right;W++){let X={x:W,z:T},q=kh(X);if(q==="water")continue;let J=fs(X),it=i.some(_t=>Nt(X,_t));q==="buffer"&&!J&&!it||Y.push({...X,color:J?J.future?"#f5ce68":"#ffda91":CE[it?"buffer":q]})}let st=[];for(let{x:T,z:W,w:X,d:q}of s?[]:Bh)for(let[J,it,_t,Ct]of[[T,W,T+X,W],[T+X,W,T+X,W+q],[T+X,W+q,T,W+q],[T,W+q,T,W]]){let Dt=4*Math.hypot(_t-J,Ct-it);for(let qt=0;qt<Dt;qt++)for(let Gt of[qt/Dt,(qt+1)/Dt]){let Tt=kt.lerp(J,_t,Gt),Ft=kt.lerp(it,Ct,Gt);st.push(Tt,e(Tt,Ft)+.055,Ft)}}let ot=new Gn(new oe().setAttribute("position",new Yt(st,3)),new Cn({color:"#968054",transparent:!0,opacity:.72,depthWrite:!1}));ot.renderOrder=5,G.add(ot);let Q,ht,ct=bp,at="inspect",mt,St,F,vt,j,tt,nt,Mt,et,L,C,Z,gt,pt,xt=0;function Nt(T,W){return Math.hypot(Math.max(T.x-W.x,0,W.x-T.x-1),Math.max(T.z-W.z,0,W.z-T.z-1))<W.radius}let Pt=T=>!D?.hidden.has(T.sceneryId);function Ot(T){if(s&&(T.x<En.left||T.x>En.right||T.z<En.top||T.z>En.bottom))return"Ngo\xE0i ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng c\u1EE7a b\u1EA3n \u0111\u1ED3.";let W=s?s.error(T):Hh(T);if(W)return W;let X=i.find(it=>Nt(T,it));return X?X.kind==="fence"?"Ch\u1EEBa h\xE0ng r\xE0o \u1EDF m\xE9p d\u1ED1c.":"Gi\u1EEF kho\u1EA3ng c\xE1ch v\u1EDBi c\xE2y ho\u1EB7c c\u1EE5m \u0111\xE1.":s?"":!((T.x===7||T.x===8)&&(T.z===-6||T.z===-5))&&(Mn(T.x+.5,T.z+.5)?.distance??1/0)<1.52?"Ch\u1EEBa h\xE0nh lang c\u1EE7a \u0111\u01B0\u1EDDng xe l\xEAn \u0111\u1ED3i.":!(T.z===-13&&T.x>=-7&&T.x<=-5)&&(Ui(T.x+.5,T.z+.5)?.distance??1/0)<.65?"Ch\u1EEBa l\u1ED1i xu\u1ED1ng c\u1EA7u ven su\u1ED1i.":""}function Wt(T){return T.x<He.left||T.x>He.right||T.z<He.top||T.z>He.bottom?"Ngo\xE0i ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng c\u1EE7a b\u1EA3n \u0111\u1ED3.":s.overlaps(T)?"\u0110\u01B0\u1EDDng ch\u1EA1m c\xF4ng tr\xECnh hi\u1EC7n c\xF3.":Q.get(lt(T))?.roadCurveId?"N\u1ED1i \u0111\u01B0\u1EDDng t\u1EA1i \u0111\u1EA7u d\u1EA3i cong c\xF3 s\u1EB5n.":s.landscape.bridge.some(q=>Nt(T,{...q,radius:.58}))||T.z<-6&&s.protectedPath(T.x+.5,T.z+.5,.12)&&Mn(T.x+.5,T.z+.5,s.hillRoute)?.distance<1.12?"Ch\u1EEBa kho\u1EA3ng tr\u1ED1ng cho \u0111\u01B0\u1EDDng \u0111\u1ED3i ho\u1EB7c c\u1EA7u c\xF3 s\u1EB5n.":i.some(q=>!Number.isInteger(q.sceneryId)&&Nt(T,q))?"\u0110\u01B0\u1EDDng ch\u1EA1m c\u1EA3nh quan \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7.":""}function te(T){return T.x<He.left||T.x>He.right||T.z<He.top||T.z>He.bottom?"V\xF9ng san ch\u1EA1m r\xECa b\u1EA3n \u0111\u1ED3.":Q.has(lt(T))||s.overlaps(T)||s.protectedPath(T.x+.5,T.z+.5,.07)?"V\xF9ng san ch\u1EA1m c\xF4ng tr\xECnh ho\u1EB7c l\u1ED1i c\xF3 s\u1EB5n.":!1}function bt(T,W,X=!0){if(T<He.left||T>He.right+1||W<He.top||W>He.bottom+1)return"V\xF9ng ch\u1EC9nh \u0111\u1ECBa h\xECnh ch\u1EA1m r\xECa b\u1EA3n \u0111\u1ED3.";if(Xn(T,W)||s.protectedPath(T,W,.07))return"Qu\xE1 s\xE1t m\u1EB7t n\u01B0\u1EDBc ho\u1EB7c l\u1ED1i c\xF3 s\u1EB5n.";for(let q of[T-.001,T+.001])for(let J of[W-.001,W+.001]){let it=li({x:q,z:J});if(Q.has(lt(it))||s.overlaps(it))return"Qu\xE1 s\xE1t c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng hi\u1EC7n c\xF3.";if(X&&i.some(_t=>Pt(_t)&&Nt(it,_t)))return"Qu\xE1 s\xE1t c\xE2y ho\u1EB7c c\u1EE5m \u0111\xE1."}return!1}function ae(){try{let T=JSON.parse(localStorage.getItem(r));if(!T||!Array.isArray(T.roads)||![1,2,3].includes(T.level))return!1;let W=new Map;for(let q of T.roads){if(!Number.isInteger(q.x)||!Number.isInteger(q.z)||![Et,Jt,Et|Jt].includes(q.axes)&&!(q.axes===0&&q.curveOnly&&typeof q.roadCurveId=="string")||!Di.includes(q.material)||!s&&Ot(q)||s&&(q.x<He.left||q.x>He.right||q.z<He.top||q.z>He.bottom||s.overlaps(q)||["roadY","roadStartY","roadEndY","bridgeY"].some(J=>q[J]!==void 0&&!Number.isFinite(q[J]))||q.bridgeId!==void 0&&(typeof q.bridgeId!="string"||!Number.isFinite(q.bridgeY)||q.axes===(Et|Jt))))return!1;W.set(lt(q),q)}let X=as(W);return X.some(q=>q.width>4)||!s&&a(X)||P&&T.terrain&&!P.restoreDeltas(T.terrain)?!1:(D&&Array.isArray(T.hiddenScenery)&&D.apply(T.hiddenScenery,!0),Q=W,ct=T.level,!0)}catch{return!1}}function ee(){try{localStorage.setItem(r,JSON.stringify({roads:[...Q.values()],level:ct,terrain:P?.heightDeltas(),hiddenScenery:D&&[...D.hidden]}))}catch{l.textContent+=" Tr\xECnh duy\u1EC7t ch\u1EC9 gi\u1EEF c\xE1c thay \u0111\u1ED5i trong phi\xEAn n\xE0y."}}function $t(T){T&&(G.remove(T),T.traverse(W=>W.geometry?.dispose()))}function Ht(){ht=Sp(Q,ct),O=s?hc(ht,e):e,mt&&(mt.group.children.filter(J=>J.material?.isMeshBasicMaterial).forEach(J=>J.material.dispose()),$t(mt.group)),St&&(St.children.forEach(J=>J.material.dispose()),$t(St));for(let J of[C,Z])J?.material.dispose(),$t(J);let T=Y.filter(J=>{if(Q.has(lt(J)))return!1;let it=J.x+.5,_t=J.z+.5;return(Mn(it,_t)?.distance??1/0)>=1.35&&(Ui(it,_t)?.distance??1/0)>=.83});C=ms(T,e,{opacity:.3,order:4}),Z=ms(T,e,{opacity:.42,order:4,grid:!0}),G.add(C,Z);let W=Xa(ht,"walk",B),X=Xa(ht,"car",B),q=Xa(ht,"motorcycle",B);if(Ya(X,ht,"car",s?.hillRoute),Ya(q,ht,"motorcycle",s?.hillRoute),s?s.landscape.connect(W):(Ya(W,ht,"walk"),Hd(W,ht)),mt=Kh(ht,O,D?i.filter(Pt):i,s?{terrainPaths:!1,hillRoute:s.hillRoute,reserved:s.overlaps,groundY:e}:void 0),s){let J=new Map(P.heightDeltas().map(({index:it,oldY:_t})=>[it,_t]));if(J.size){let it=Ip(ht,O,e,(_t,Ct)=>e(_t,Ct,J));it&&mt.group.add(it)}}St=new jt,K.setRoads(ht,W,X,q),St.add(gc(W,B,"#237c64"),gc(X,B,"#344f9e"),gc(q,B,"#af4826",(J,it)=>(!J.id.startsWith("roundabout:")||!it.id.startsWith("roundabout:"))&&([1,3].includes(J.section.width)||[1,3].includes(it.section.width)))),G.add(mt.group,St),Bt()}function Bt(){C.visible=x.checked&&!f.checked,Z.visible=x.checked&&f.checked,ot.visible=x.checked,St.visible=g.checked,m&&(m.hidden=!g.checked)}function Xt(T,W,X=O,q=.61){vt?.material.dispose(),$t(vt),vt=null,T.length&&(vt=ms(T.map(J=>({...J,color:J.color??W})),X,{opacity:q,grid:!0,elevation:.081,order:5}),G.add(vt))}function se(){h.value=String(ct);for(let[T,W]of[...u.options].entries())W.disabled=T>=ct;u.selectedIndex>=ct&&(u.value="dirt"),d.disabled=!F?.length,s&&(S.disabled=!V.length||!!L||!!et||!!pt,w.disabled=!H.length||!!L||!!et||!!pt)}function pe(){Xt([],""),j?.material.dispose(),$t(j),j=null,tt?.material.dispose(),$t(tt),tt=null,nt?.traverse(T=>T.material?.dispose()),$t(nt),nt=null,Mt&&(Mt.traverse(T=>T.material?.dispose()),$t(Mt),Mt=null)}function ne(){pt=null,I.hidden=!0,z.replaceChildren(),pe()}function wt(){v=null,A?.traverse(T=>T.material?.dispose()),$t(A),A=null}function $(T){wt(),v={origin:T,...rc(T,He)},A=new jt;let W=[],{outline:X}=v;for(let[it,_t]of X.entries()){let Ct=X[(it+1)%X.length],Dt=Math.max(1,Math.ceil(Math.hypot(Ct[0]-_t[0],Ct[1]-_t[1])/.5));for(let qt=0;qt<Dt;qt++)for(let Gt of[qt/Dt,(qt+1)/Dt]){let Tt=kt.lerp(_t[0],Ct[0],Gt),Ft=kt.lerp(_t[1],Ct[1],Gt);W.push(Tt,Math.max(e(Tt,Ft),Xn(Tt,Ft)?.y??-1/0)+.14,Ft)}}let q=new Gn(new oe().setAttribute("position",new Yt(W,3)),new Cn({color:"#72edff",transparent:!0,opacity:.85,depthTest:!1})),J=new Vt(new Qr(.28,.41,24),new en({color:"#72edff",depthTest:!1,side:ze}));J.rotation.x=-Math.PI/2,J.position.set(T[0],Math.max(e(...T),Xn(...T)?.y??-1/0)+.16,T[1]),q.renderOrder=J.renderOrder=8,A.add(q,J),G.add(A)}function Rt(T){L=null,K.restrict([]),at=T,F=null,s?(ne(),wt(),et=null,M.closest("label").hidden=T!=="flatten",b&&(b.closest("label").hidden=T!=="draw"),R.closest("label").hidden=T!=="slope"&&(T!=="draw"||b?.value==="points"),gt=null,E.hidden=!0):Xt([],"");for(let W of p)W.setAttribute("aria-pressed",String(W.dataset.planMode===at));t.dataset.planMode=at,se(),l.textContent={inspect:s?"K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng \u0111\u1EC3 xem th\xF4ng tin.":"K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m m\u1ED9t l\xF4 ho\u1EB7c \u0111o\u1EA1n \u0111\u01B0\u1EDDng \u0111\u1EC3 ki\u1EC3m tra.",draw:s?b?.value==="points"?"Ch\u1EA5m A, r\u1ED3i ch\u1EA5m B trong ph\u1EA1m vi 60 \u0111\u01A1n v\u1ECB. K\xE9o \u0111\u1EC3 d\u1ECBch camera.":"Ch\u1ECDn b\u1EC1 r\u1ED9ng r\u1ED3i k\xE9o. Tim tuy\u1EBFn d\xE0i t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.":"K\xE9o m\u1ED9t d\u1EA3i th\u1EB3ng. V\u1EBD d\u1EA3i song song s\xE1t b\xEAn \u0111\u1EC3 t\u0103ng b\u1EC1 r\u1ED9ng.",erase:s?"K\xE9o qua \u0111o\u1EA1n mu\u1ED1n x\xF3a. Ch\u1EA1m m\u1ED9t ph\u1EA7n c\u1EA7u \u0111\u1EC3 x\xF3a c\u1EA3 c\u1EA7u v\xE0 \u0111\u01B0\u1EDDng d\u1EABn.":"K\xE9o qua d\u1EA3i mu\u1ED1n x\xF3a. C\xE1c d\u1EA3i li\u1EC1n k\u1EC1 s\u1EBD t\xEDnh l\u1EA1i b\u1EC1 r\u1ED9ng.",upgrade:"B\u1EA5m \u0111o\u1EA1n c\u1EA7n \u0111\u1ED5i m\u1EB7t, ch\u1ECDn v\u1EADt li\u1EC7u r\u1ED3i b\u1EA5m \xC1p d\u1EE5ng.",flatten:"Ch\u1EA1m \u0111\u1EC3 d\xF9ng c\u1EE1 v\xF9ng san, ho\u1EB7c k\xE9o m\u1ED9t v\xF9ng t\u1ED1i \u0111a 12\xD712. \xD4 \u0111\u1EA7u quy\u1EBFt \u0111\u1ECBnh cao \u0111\u1ED9.",slope:"Ch\u1ECDn b\u1EC1 r\u1ED9ng r\u1ED3i k\xE9o t\u1EEB ch\xE2n l\xEAn \u0111\u1EC9nh ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i. Ch\u1ECDn V\u1EBD t\u1EF1 do \u0111\u1EC3 u\u1ED1n quanh s\u01B0\u1EDDn \u0111\u1ED3i."}[at]}function Ut(T){let W=[];for(let J=T.z;J<T.z+T.d;J++)for(let it=T.x;it<T.x+T.w;it++)W.push({x:it,z:J});Xt([...W,T.gate],"#fed98c");let X=ht.get(lt(T.gate)),q=X?Qt(X)>=2?"Ti\u1EBFp c\u1EADn b\u1EB1ng \u0111\u01B0\u1EDDng xe.":"Ti\u1EBFp c\u1EADn b\u1EB1ng l\u1ED1i \u0111i b\u1ED9.":"L\u1ED1i v\xE0o \u0111ang thi\u1EBFu \u0111\u01B0\u1EDDng n\u1ED1i.";l.textContent=`L\xF4 tr\u1ED1ng \xB7 ${T.w} \xD7 ${T.d} \xF4. ${q}`}function Qt(T){if(T.roadCurveId){let W=[...ht.values()].find(X=>X.roadCurve?.id===T.roadCurveId)?.roadCurve;if(W)return W.width}return Math.max(1,...[Et,Jt].filter(W=>T.axes&W).map(W=>qe(Q,T,W).width))}function Kt(T,W){if(!T)return;let X=ht.get(lt(T));if(at==="upgrade")F=Rh(ht,T),Xt(F,"#ffd071"),se(),l.textContent=F.length?`\u0110\xE3 ch\u1ECDn ${F.length} \xF4 \u0111\u01B0\u1EDDng ${Ro[X.material].toLowerCase()}. Ch\u1ECDn v\u1EADt li\u1EC7u \u0111\u1EC3 \xE1p d\u1EE5ng.`:"Ch\u1ECDn m\u1ED9t nh\xE1nh gi\u1EEFa hai n\xFAt giao, ho\u1EB7c m\u1ED9t \u0111o\u1EA1n t\u1EDBi \u0111\u1EA7u c\u1EE5t.";else if(W)Xt([],""),l.textContent=W.name;else if(X){Xt(Rh(ht,T),"#ffd071");let q=Qt(X),J={1:"\u0110i b\u1ED9 v\xE0 xe m\xE1y",2:"\u0110i b\u1ED9 v\xE0 l\xE0n chung \xF4 t\xF4, xe m\xE1y",3:"\u0110i b\u1ED9, xe m\xE1y b\xEAn ph\u1EA3i v\xE0 \xF4 t\xF4 ri\xEAng"}[q]??"\u0110i b\u1ED9 v\xE0 xe c\u01A1 gi\u1EDBi",it=X.bridgeId?Pp([...ht.values()].filter(_t=>_t.bridgeId===X.bridgeId)):Ro[X.material];l.textContent=`${it} \xB7 ${q}\xD7 \xB7 ${J}.`}else if(s)Xt([],""),l.textContent="K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng \u0111\u1EC3 xem th\xF4ng tin.";else{let q=fs(T);if(q)Ut(q);else{let J=kh(T),it=fo(T),_t=Ot(T);Xt([T],_t?"#d78769":"#e3d582");let Ct=J==="terrace"?" Ki\u1EC3m tra \u0111\u1ED9 ch\xEAnh to\xE0n l\xF4 tr\u01B0\u1EDBc khi ch\u1ECDn m\xF3ng b\u1EADc.":"";l.textContent=`${PE[J]} \xB7 Cao \u0111\u1ED9 ${it.low.toFixed(2)}\u2013${it.high.toFixed(2)}.${Ct} ${_t}`}}}function le(T){if(!T)return;let W=et.from;!et.axis&&!hi(W,T)&&(et.axis=Math.abs(T.x-W.x)>=Math.abs(T.z-W.z)?Et:Jt);let X=et.axis??Et,q=X===Et?{x:T.x,z:W.z}:{x:W.x,z:T.z},J=at==="erase"?"erase":u.value,it=Wa(Q,W,q,J,Ot,X),_t=Tt=>Tt.cells.some(Ft=>it.cells.some(Lt=>hi(Ft,Lt))),Ct=it.error?[]:as(it.roads).filter(_t),Dt=!it.error&&at==="erase"?as(Q).filter(_t):[],qt=it.error||a(Ct),Gt=[...new Map([...it.cells,...[...Ct,...Dt].flatMap(Tt=>Tt.cells)].map(Tt=>[lt(Tt),Tt])).values()];et.trial={...it,error:qt,affected:Gt},Xt(Gt,qt?"#db7d60":at==="erase"?"#dbbc81":"#e4d575"),l.textContent=qt||(at==="erase"?`X\xF3a ${it.cells.length} \xF4 theo n\xE9t k\xE9o.`:`Xem tr\u01B0\u1EDBc \xB7 r\u1ED9ng t\u1EDBi ${it.width}\xD7.`)}function he(T){let W=new Set(T.map(J=>{let it=Q.get(lt(J));return it?.bridgeId??it?.approachBridgeId}).filter(Boolean)),X=new Map(T.map(J=>[lt(J),J]));for(let[J,it]of Q)W.has(it.bridgeId??it.approachBridgeId)&&X.set(J,it);let q=new Map(Dd(Q,[...X.keys()]));for(let[J,it]of Q)q.has(J)||X.set(J,it);for(let J of X.keys())q.delete(J);return{roads:q,cells:[...X.values()],changes:[],error:"",width:1}}function we(T,W=T.cells,X=[],q=!1){let J=new Set(T.error?[]:D.removals(W,T.changes,X));if(q&&!T.error)for(let it of i)Number.isInteger(it.sceneryId)&&Pt(it)&&W.some(_t=>Nt(_t,it))&&J.add(it.sceneryId);return{...T,scenery:[...J].map(it=>({id:it,hidden:!0}))}}function Le(T,{centerline:W,...X}={}){let q={roads:Q,cells:T,width:Number(y.value),material:u.value,surfaceY:e,waterAt:Xn,obstacle:Wt,allowLeveling:_.checked,assisted:!0,...X},J=Tt=>{if(!W)return lc(Tt);if(!Tt.elevated){let Ft=$h({...Tt,route:W});if(!Ft.legacyBridge)return{...Ft,length:W.length}}return{...Ap(lc(Tt),W),legacyBridge:!0}},it=J(q);if(it.error||!it.gradeEdits.length)return we({...it,changes:[]},it.cells,[],!0);let _t=P.planRoad(it.gradeEdits,(Tt,Ft)=>bt(Tt,Ft,!1));if(_t.error)return{...it,error:_t.error,errorCell:_t.errorCell,changes:[]};let Ct=new Map(_t.changes.map(({index:Tt,newY:Ft})=>[Tt,Ft])),Dt=J({...q,cells:it.route??T,surfaceY:(Tt,Ft)=>e(Tt,Ft,Ct),allowLeveling:!1});if(Dt.error)return{...Dt,changes:[]};let qt=Dt.cells.filter(Tt=>!Dt.roads.get(lt(Tt))?.bridgeId),Gt=new Set(qt.map(lt));return we({...Dt,core:qt,transition:_t.cells.filter(Tt=>!Gt.has(lt(Tt))),changes:_t.changes},Dt.cells,_t.cells,!0)}function ue(T,W){let X=Number(y.value),q;for(let J of[1.25,2.25]){let it=P.planRoadCorridor(T,{mode:W,width:X,shoulder:J,isLocked:(Dt,qt)=>bt(Dt,qt,!1)});if(it.error||!it.changes.length)return it;let _t=new Map(it.changes.map(({index:Dt,newY:qt})=>[Dt,qt])),Ct=$h({roads:Q,route:T,width:X,material:u.value,surfaceY:(Dt,qt)=>e(Dt,qt,_t),waterAt:Xn,obstacle:Wt});if(!Ct.error)return we({...it,...Ct,length:T.length},Ct.cells,it.transition,!0);q={...Ct,error:it.blocked?.reason??Ct.error,errorCell:it.blocked?.cell??Ct.errorCell,changes:[]}}return q}function De({cells:T,centerline:W}){let X=Le(T,{centerline:W}),q=Ct=>W&&!Ct.legacyBridge?{...Ct,visualRoute:W}:Ct;if(X=q(X),!X.error)return{trial:X,candidates:[{trial:X,label:X.bridges?.length?"\u0110\u01B0\u1EDDng v\xE0 c\u1EA7u":X.changes.length?"\u0110\u01B0\u1EDDng v\xE0 g\u1ECDt \u0111\u1EAFp nh\u1EB9":"\u0110\u01B0\u1EDDng theo \xF4"}]};if(!_.checked||!W||W.error||X.legacyBridge||W.cells.some(Ct=>Wt(Ct)&&!Q.get(lt(Ct))?.roadCurveId))return{trial:X,candidates:[]};let it=(W.length<=12?["slope","flatten"]:["slope"]).map(Ct=>({label:Ct==="flatten"?"San ph\u1EB3ng d\u01B0\u1EDBi \u0111\u01B0\u1EDDng":"L\xE0m d\u1ED1c d\u01B0\u1EDBi \u0111\u01B0\u1EDDng",trial:q(ue(W,Ct))})),_t=it.filter(({trial:Ct})=>!Ct.error&&Ct.changes.length).sort((Ct,Dt)=>Ct.trial.movedHeight-Dt.trial.movedHeight);if(!_t.length){let Ct=it.find(Dt=>Dt.trial.error)?.trial;Ct?.error!==X.error&&(X={...X,note:Ct?.error})}return{trial:X,candidates:_t}}function Ge(T,W=!1,X=!1){pe();let q=at==="flatten",J=q||at==="slope"||at==="draw"&&T.core&&T.changes.length,it=new Map((T.skipped??[]).map(Ft=>[lt(Ft),Ft]));q&&T.errorCell&&it.set(lt(T.errorCell),T.errorCell);let _t=new Map(T.changes.map(({index:Ft,newY:Lt})=>[Ft,Lt])),Ct=(Ft,Lt)=>e(Ft,Lt,_t),Dt=new Map((T.cells??[]).map(Ft=>[lt(Ft),{...Ft,color:T.roads?.get(lt(Ft))?.bridgeId?"#80cbe4":T.changes.length?"#edc368":"#a0db87"}]));if(T.core){for(let Ft of T.transition??[])Dt.set(lt(Ft),{...Ft,color:"#c6b47f"});for(let Ft of T.core){let Lt=Ft.x+.5,ce=Ft.z+.5,Ue=T.targetAt?.(Lt,ce)??T.targetY??Ct(Lt,ce),Ke=J?yg(e(Lt,ce)-Ue):"#83cd93";Dt.set(lt(Ft),{...Ft,color:Ke})}}T.errorCell&&!q&&Dt.set(lt(T.errorCell),{...T.errorCell,color:"#d66c58"});let qt=(Ft,Lt)=>Math.max(e(Ft,Lt),e(Ft,Lt,_t)),Gt=at==="erase"?O:T.roads?hc(T.roads,qt):qt,Tt=(Ft,Lt)=>Math.max(Gt(Ft,Lt),Xn(Ft,Lt)?.y??-1/0);if(T.ribbon){T.errorCell&&Xt([T.errorCell],"#ff5722",e,.25);let Ft=(Ue,Ke)=>Math.max(e(Ue,Ke),Xn(Ue,Ke)?.y??-1/0),Lt=T.error?"#ff5722":T.targetAt?(Ue,Ke)=>yg(e(Ue,Ke)-T.targetAt(Ue,Ke)):"#00e5ff",ce=W&&at==="draw"?.1:.25;nt=Bp(T.ribbon,Ft,Lt,ce,T.error?"#ff7665":"#fffdf5"),G.add(nt)}else if(J){let Ft=[...Dt.values()].filter(ce=>!it.has(lt(ce))),Lt=(ce,Ue)=>Math.max(e(ce,Ue),Xn(ce,Ue)?.y??-1/0);if(Xt(Ft,"#a0db87",Lt,.25),Ft.length||it.size){let ce=W?T.core??[]:Ft;tt=kp(ce,it.values(),Lt),G.add(tt)}}else Xt([...Dt.values()],"#a0db87",Tt,W?.35:.61);if(J&&W&&T.core?.length&&!T.error){let Ft=q?T:{...T,targetAt:Ct},Lt=Yp(Ft,Ct,X||!q);nt?nt.add(Lt):(nt=Lt,G.add(nt))}if(T.discarded?.length&&(j=ms(T.discarded.map(Ft=>({...Ft,color:"#eb645b"})),Tt,{opacity:.28,grid:!0,elevation:.085,order:5}),G.add(j)),W&&at==="draw"&&!T.error){let Ft=new Map(T.cells.map(Lt=>[lt(Lt),T.roads.get(lt(Lt))]).filter(([,Lt])=>Lt));if(T.junctionStyle){for(let Lt of T.roads.values())if(Lt.junctionStyle&&Lt.junctionStyle!==Q.get(lt(Lt))?.junctionStyle)for(let ce=-1;ce<=1;ce++)for(let Ue=-1;Ue<=1;Ue++){let Ke=lt({x:Lt.x+ce,z:Lt.z+Ue}),Ms=T.roads.get(Ke);Ms&&Ft.set(Ke,Ms)}}Mt=Kh(Ft,hc(T.roads,(Lt,ce)=>e(Lt,ce,_t)),[],{terrainPaths:!1,groundY:e,preview:!0}).group,Mt.traverse(Lt=>{if(!Lt.material)return;let ce=Lt.material.clone();Lt.material.isMeshBasicMaterial&&Lt.material.dispose(),Lt.material=ce,ce.transparent=!0,ce.opacity=.62,ce.depthWrite=!1,Lt.castShadow=!1,Lt.renderOrder=6}),G.add(Mt)}if(W&&T.scenery?.length)for(let Ft of D.points(T.scenery.map(Lt=>Lt.id).filter(Lt=>N.has(Lt)))){let Lt=new Vt(new Qr(.16,.22,12),new en({color:"#c8574e",transparent:!0,opacity:.8,depthTest:!1}));Lt.rotation.x=-Math.PI/2,Lt.position.set(Ft.x,e(Ft.x,Ft.z)+.08,Ft.z),Lt.renderOrder=7,Mt||(Mt=new jt,G.add(Mt)),Mt.add(Lt)}l.textContent=T.error?`${T.error}${T.errorCell?` \xB7 \xD4 (${T.errorCell.x}, ${T.errorCell.z})`:""}${T.note?` ${T.note}`:""}`:at==="draw"?`Xem tr\u01B0\u1EDBc \xB7 ${T.width}\xD7${Number.isFinite(T.length)?` \xB7 ${T.length.toLocaleString("vi-VN",{maximumFractionDigits:1})}/60 \u0111\u01A1n v\u1ECB`:""}${T.bridges?.length?` \xB7 ${T.bridges.length} c\u1EA7u`:""}${T.changes.length?" \xB7 c\xF3 ch\u1EC9nh n\u1EC1n":""}.${T.note?` ${T.note}`:""}`:at==="erase"?`Xem tr\u01B0\u1EDBc x\xF3a ${T.cells.length} \xF4.`:at==="slope"?`D\u1ED1c ${Math.round((T.grade??0)*100)}% \xB7 ${T.ribbon?`r\u1ED9ng ${T.ribbon.width}\xD7 \xB7 `:""}${T.core?.length??0} \xF4.`:T.core?`San ${T.core.length} \xF4 \xB7 vi\u1EC1n ${T.transition.length} \xF4${T.skipped?.length?` \xB7 b\u1ECF qua ${T.skipped.length} \xF4`:""}${T.capped?" \xB7 gi\u1EDBi h\u1EA1n 12\xD712":""}.`:`Xem tr\u01B0\u1EDBc \xB7 ${T.changes.length} \u0111\u1EC9nh \u0111\u1ECBa h\xECnh thay \u0111\u1ED5i.`}function ys({from:T,cells:W},X,q={}){let J=P.planBrush({mode:at,from:T,to:X,size:Number(M.value),cells:at==="slope"?W:void 0,isLocked:(it,_t)=>bt(it,_t,!1),lockCell:te,...q});return we({...J,roads:Q},J.core??[],J.transition)}function Po(T,W={}){let X=_g(T.points,Number(y.value),1);return X.error?{changes:[],cells:[],error:X.error}:ys(T,T.last,{ribbon:X,...W})}function ki(T){let W=Number(y.value),X=hr(Wh(T,Q,W),W);return vs(X)}function vs(T){let W=T.points.reduce((X,[q,J])=>zi(X,li({x:q,z:J})),[]);return{centerline:T,cells:W}}function Hi(T,W){if(T.centerline?.error||!T.centerline)return null;let X=oc(T.centerline,Number(y.value),_t=>s.overlaps(_t));if(!X)return null;let q=X.route?De(vs(X.route)):{candidates:[]},J=`\xD4 (${X.blocked.x}, ${X.blocked.z})`,it=W?`${J} v\u01B0\u1EDBng c\xF4ng tr\xECnh. Ch\u01B0a n\u1ED1i t\u1EDBi B.`:`${J} v\u01B0\u1EDBng c\xF4ng tr\xECnh. Ch\u1EC9 x\xE2y \u0111o\u1EA1n ph\xEDa tr\u01B0\u1EDBc.`;return{...X,candidates:q.candidates.map(({trial:_t,label:Ct})=>({label:Ct==="\u0110\u01B0\u1EDDng theo \xF4"?"\u0110\u1EBFn tr\u01B0\u1EDBc c\xF4ng tr\xECnh":Ct,trial:{..._t,discarded:X.discarded,errorCell:X.blocked,note:it}}))}}function Io(T){if(!T)return;let W=[T.x,T.z];if(!v){if(!rc(W,He).contains(W)){l.textContent="Ch\u1ECDn A trong ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng.";return}$(W),l.textContent="\u0110\xE3 ch\u1ECDn A. Ch\u1EA5m B trong v\xF9ng vi\u1EC1n xanh, c\xE1ch A t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.";return}if(!v.contains(W)){l.textContent="Ch\u1ECDn B trong ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng v\xE0 c\xE1ch A t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.";return}let X=ki([v.origin,W]),q=De(X);if(q.candidates.length){wt(),pi(q.candidates);return}if(X.centerline.error){Ge(q.trial);return}let J;if(pg({origin:v.origin,end:W,width:Number(y.value),bounds:He,obstacle:Wt,waterAt:Xn,surfaceY:e,autoGrade:_.checked,tryRoute:Dt=>{let qt=De(vs(Dt));return qt.candidates.length&&(J=qt.candidates),qt.candidates[0]?.trial??qt.trial}})&&J){wt(),pi(J.map(({label:Dt,trial:qt})=>({label:Dt==="\u0110\u01B0\u1EDDng theo \xF4"?"\u0110i v\xF2ng t\u1EDBi B":`\u0110i v\xF2ng \xB7 ${Dt}`,trial:{...qt,note:"Tuy\u1EBFn \u0111i v\xF2ng \u0111\xE3 n\u1ED1i t\u1EDBi B."}})));return}let _t=Hi(X,!0);if(_t?.candidates.length){pi(_t.candidates);return}let Ct=q.trial;Ge({...Ct,note:`${Ct.note?Ct.note+" ":""}Ch\u01B0a t\xECm \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng v\xF2ng h\u1EE3p l\u1EC7 trong 60 \u0111\u01A1n v\u1ECB. Ch\u1ECDn l\u1EA1i B.`})}function Sr(T,W){if(at==="draw"){let X=Math.abs(W.x-et.origin.x),q=Math.abs(W.z-et.origin.z),it=R.value==="snap"&&Math.min(X,q)<=Math.max(X,q)*Math.tan(Math.PI/12)&&et.points.every(([Gt,Tt])=>X>=q?Math.abs(Tt-et.origin.z)<=1:Math.abs(Gt-et.origin.x)<=1)&&et.points.length>1?[et.points[0],X>=q?[W.x,et.origin.z]:[et.origin.x,W.z]]:et.points;Object.assign(et,ki(it));let{centerline:_t}=et,Ct=_t.steps.find(Gt=>Gt.cells.some(Tt=>s.overlaps(Tt))),Dt=Ct?.cells.find(Gt=>s.overlaps(Gt))??_t.cells.find(Gt=>!Q.get(lt(Gt))?.roadCurveId&&Wt(Gt)),qt=Ct?oc(_t,Number(y.value),Gt=>s.overlaps(Gt))?.discarded:[];et.trial={..._t,width:Number(y.value),changes:[],error:it.length>1?_t.error||(Dt?Wt(Dt):""):"",errorCell:Dt,discarded:qt}}else if(at==="flatten")et.trial=ys(et,T);else{if(at==="erase")et.cells=zi(et.cells,T);else{let X=et.raw.at(-1);et.raw.push(...zi([X],T).slice(1,21-et.raw.length));let q=Math.abs(W.x-et.origin.x),J=Math.abs(W.z-et.origin.z),it=R.value==="snap"&&et.raw.every(_t=>Math.abs(q>=J?_t.z-et.from.z:_t.x-et.from.x)<=1)&&Math.min(q,J)<=Math.max(q,J)*Math.tan(Math.PI/12)&&new Set(et.raw.map(lt)).size===et.raw.length;if(et.cells=it?zi([et.from],q>=J?{x:T.x,z:et.from.z}:{x:et.from.x,z:T.z}):et.raw,et.useRibbon=!0,it){let[_t,Ct]=et.points[0];et.slopePoints=[et.points[0],q>=J?[W.x,Ct]:[_t,W.z]]}else et.slopePoints=null}et.trial=et.useRibbon?Po(et.slopePoints?{...et,points:et.slopePoints}:et):et.cells.length>20?{cells:et.cells.slice(0,20),changes:[],error:"M\u1ED7i n\xE9t t\u1ED1i \u0111a 20 \xF4. Chia tuy\u1EBFn th\xE0nh nhi\u1EC1u \u0111o\u1EA1n."}:he(et.cells)}Ge(et.trial)}function Lo(T){return[...new Set([...Q.keys(),...T.keys()])].filter(X=>Q.get(X)!==T.get(X)).map(X=>({key:X,before:Q.get(X),after:T.get(X)}))}function pi(T){let X=T.filter(({trial:q})=>q&&!q.error).flatMap(q=>{let{trial:J}=q;if(at!=="draw")return[q];let it=Ud(Q,J.roads,J.cells);return it.length?it.map(({style:_t,roads:Ct})=>({...q,label:_t==="roundabout"?"V\xF2ng xoay":"Giao c\xF9ng m\u1EE9c",trial:{...J,roads:Ct,junctionStyle:_t}})):[q]}).flatMap(q=>{if(at!=="draw"||!q.trial.visualRoute||q.trial.bridges?.length||q.trial.legacyBridge)return[q];let J=yp(q.trial.visualRoute,{material:u.value});return J?[{...q,label:`${q.label} \xB7 \xD4 vu\xF4ng`},{...q,label:`${q.label} \xB7 Bo tr\xF2n`,trial:{...q.trial,roads:vp(q.trial.roads,J),roadVisual:J}}]:[{...q,label:`${q.label} \xB7 \xD4 vu\xF4ng`}]});return X.length?(pt={options:X,current:0},z.replaceChildren(),X.forEach(({label:q,trial:J},it)=>{let _t=document.createElement("button");_t.type="button";let Ct=document.createElement("strong"),Dt=document.createElement("small");Ct.textContent=q;let qt=J.scenery?.filter(Tt=>N.has(Tt.id)).length??0,Gt=(at==="draw"?J.cells.filter(Tt=>!Q.has(lt(Tt))).length:0)+(J.bridges?.length??0)*3+Math.ceil(J.changes.length/4)+qt;if(Dt.textContent=at==="erase"?`${J.cells.length} \xF4`:`\u01AF\u1EDBc t\xEDnh ${Gt} \u0111i\u1EC3m${qt?` \xB7 d\u1ECDn ${qt}`:""}`,_t.append(Ct),at==="flatten"){let Tt=document.createElement("small");Tt.textContent=`San ${J.core.length} \xF4 \xB7 Taluy ${J.transition.length} \xF4`,_t.append(Tt)}if(at==="draw"&&J.changes.length){let Tt=document.createElement("small"),Ft=new Set([...J.core??[],...J.transition??[]].map(lt)),Lt=J.maxChange??J.changes.reduce((ce,Ue)=>Math.max(ce,Math.abs(Ue.newY-Ue.oldY)),0);Tt.textContent=`V\xF9ng ch\u1EC9nh n\u1EC1n ${Ft.size} \xF4 \xB7 cao \u0111\u1ED9 \u0111\u1ED5i t\u1ED1i \u0111a ${Lt.toLocaleString("vi-VN",{maximumFractionDigits:2})}`,_t.append(Tt)}_t.append(Dt),_t.addEventListener("click",()=>Do(it)),z.append(_t)}),I.hidden=!1,Do(0),se(),!0):!1}function Do(T){pt.current=T;for(let[q,J]of[...z.children].entries())J.setAttribute("aria-pressed",String(q===T));let{trial:W,softShoulder:X}=pt.options[T];Ge(W,!0,X)}function U(){if(!pt)return;let{trial:T,label:W}=pt.options[pt.current];ne(),wt();let X=new Map(T.cells.map(J=>[lt(J),J]));if(T.roads!==Q)for(let{key:J,before:it,after:_t}of Lo(T.roads))X.set(J,it??_t);let q=T.scenery?.filter(J=>N.has(J.id)).length??0;ut(T.roads,[...X.values()],`\u0110\xE3 \xE1p d\u1EE5ng ${W.toLocaleLowerCase("vi")}${q?` v\xE0 d\u1ECDn ${q} c\xE2y \u0111\xE1`:""}.`,T.changes,T.scenery),se()}function rt(T,W){let{cells:X,last:q}=T;if(se(),W){pe();return}let J=T.centerline?.points.length>1?T.centerline:void 0,it=at==="draw"?De({cells:X,centerline:J}):null,_t=it?.trial??T.trial,Ct=[];if(it){let Dt=!it.candidates.length&&Hi(T,!1);if(Dt){pi(Dt.candidates)||Ge({..._t,discarded:Dt.discarded,errorCell:Dt.blocked});return}if(Ct.push(...it.candidates),!J?.error&&X.length>=3&&X.length<=20){let qt=Le(X,{centerline:J,elevated:!0});!qt.error&&qt.bridges?.some(Gt=>Gt.kind==="viaduct")&&Ct.push({label:"\u0110\u01B0\u1EDDng tr\xEAn tr\u1EE5",trial:qt})}}else{if(Ct.push({label:{flatten:"San ph\u1EB3ng",slope:"L\xE0m d\u1ED1c",erase:"X\xF3a \u0111o\u1EA1n \u0111\u01B0\u1EDDng"}[at],trial:_t}),at==="flatten"&&!_t.error&&_t.changes.length&&_t.core.length>1){let Dt=ys(T,q,{softEdges:!0}),qt=new Map(_t.changes.map(Gt=>[Gt.index,Gt.newY]));!Dt.error&&(Dt.changes.length!==qt.size||Dt.changes.some(Gt=>Gt.newY!==qt.get(Gt.index)))&&Ct.push({label:"San v\xE0 chuy\u1EC3n ti\u1EBFp tho\u1EA3i",trial:Dt,softShoulder:!0})}if(at==="slope"&&_t.error&&_t.ribbon){let Dt=Po(T.slopePoints?{...T,points:T.slopePoints}:T,{trimLockedShoulder:!0});!Dt.error&&Dt.trimmed?.length&&Ct.push({label:"L\xE0m d\u1ED1c, gi\u1EEF n\u1EC1n b\xEAn c\u1EA1nh",trial:Dt})}}pi(Ct)||(Ge(_t),at==="draw"&&!J?.error&&X.length>1&&X.length<=20&&(gt=X,E.hidden=!1))}function ft(T,W=!0){for(let X of[!1,!0])D.apply(T.filter(q=>(W?q.hidden:!q.hidden)===X).map(q=>q.id),X)}function dt(T,W,X=[],q=ct,J=[]){if(s){let it={roads:Lo(T),terrain:X,scenery:J,beforeLevel:ct,afterLevel:q};(it.roads.length||X.length||J.length||ct!==q)&&(V.push(it),V.length>40&&V.shift(),H.length=0),P.apply(X),ft(J)}Q=T,ct=q,Ht(),l.textContent=W,ee(),se()}function ut(T,W,X,q=[],J=[]){if(K.busy(W)){L={next:T,cells:W,message:X,changes:q,sceneryEdits:J},K.restrict(W),l.textContent="\u0110ang \u0111\u1EE3i ng\u01B0\u1EDDi v\xE0 xe r\u1EDDi \u0111o\u1EA1n \u0111\u01B0\u1EDDng. \u0110\u1ED5i ch\u1EBF \u0111\u1ED9 \u0111\u1EC3 h\u1EE7y.",se();return}dt(T,X,q,ct,J)}function zt(T,W,X){if(L||et||pt||!T.length)return;let q=T.at(-1),J=q.roads.map(it=>it.after??it.before);if(K.busy(J)){l.textContent="\u0110\u1EE3i ng\u01B0\u1EDDi v\xE0 xe r\u1EDDi \u0111o\u1EA1n n\xE0y r\u1ED3i th\u1EED l\u1EA1i.";return}T.pop(),W.push(q),P.apply(q.terrain,X),ft(q.scenery,X);for(let it of q.roads){let _t=X?it.after:it.before;_t?Q.set(it.key,_t):Q.delete(it.key)}ct=X?q.afterLevel:q.beforeLevel,Rt("inspect"),Ht(),l.textContent=X?"\u0110\xE3 l\xE0m l\u1EA1i thao t\xE1c.":"\u0110\xE3 ho\xE0n t\xE1c.",ee()}for(let T of p)T.addEventListener("click",()=>Rt(T.dataset.planMode));for(let T of[x,g,f])T.addEventListener("change",Bt);if(h.addEventListener("change",()=>{if(s){let T=Number(h.value);Rt(at),dt(Q,`B\u1EBFn xe Lv${T} \xB7 m\u1EDF ${Di.slice(0,T).map(W=>Ro[W]).join(", ")}.`,[],T);return}ct=Number(h.value),F=null,Xt([],""),se(),Ht(),l.textContent=`B\u1EBFn xe Lv${ct} \xB7 m\u1EDF ${Di.slice(0,ct).map(T=>Ro[T]).join(", ")}.`,ee()}),d.addEventListener("click",()=>{!F?.length||L||Di.indexOf(u.value)>=ct||ut(or(Q,F,u.value),F,`\u0110\xE3 \u0111\u1ED5i ${F.length} \xF4 sang ${Ro[u.value].toLowerCase()}.`)}),document.querySelector("#load-sample").addEventListener("click",()=>{if(s){Rt("inspect");let T=P.heightDeltas().map(({index:X,oldY:q,newY:J})=>({index:X,oldY:J,newY:q})),W=[...D.hidden].map(X=>({id:X,hidden:!1}));dt(o(ct),`\u0110\xE3 n\u1EA1p m\u1EA1ng \u0111\u01B0\u1EDDng m\u1EABu theo c\u1EA5p b\u1EBFn xe Lv${ct}.`,T,ct,W);return}Q=o(ct),Ht(),Rt("inspect"),l.textContent=`\u0110\xE3 n\u1EA1p m\u1EA1ng \u0111\u01B0\u1EDDng m\u1EABu theo c\u1EA5p b\u1EBFn xe Lv${ct}.`,ee()}),s){document.querySelector("#confirm-edit").addEventListener("click",U),document.querySelector("#cancel-edit").addEventListener("click",()=>Rt(at)),document.addEventListener("keydown",T=>{!pt&&!v||T.ctrlKey||T.metaKey||T.altKey||(T.key==="Escape"&&Rt(at),T.key.toLowerCase()==="v"&&U())}),S.addEventListener("click",()=>zt(V,H,!1)),w.addEventListener("click",()=>zt(H,V,!0)),E.addEventListener("click",()=>{if(at!=="draw"||L||et||pt||!gt)return;let T=Le(gt,{suggestDetour:!0}).detour;if(!T?.length){l.textContent="Ch\u01B0a t\xECm \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng v\xF2ng ng\u1EAFn quanh n\xE9t k\xE9o. Th\u1EED \u0111\u1ED5i \u0111i\u1EC3m \u0111\u1EA7u ho\u1EB7c \u0111i\u1EC3m cu\u1ED1i.";return}let W=Le(T);pi([{label:"\u0110\u01B0\u1EDDng v\xF2ng",trial:W}])?E.hidden=!0:Ge(W)});for(let T of[u,y,_,M,R,b].filter(Boolean))T.addEventListener("change",()=>{!L&&!et&&Rt(at)})}return s||IE(e),ae()||(Q=o(ct)),Ht(),Rt("inspect"),{begin(T,W){if(!T||L||pt||W.shiftKey||!["draw","erase","flatten","slope"].includes(at)||at==="draw"&&b?.value==="points")return!1;let X=li(T);return et={from:X,origin:T,cells:[X],raw:[X],last:X,points:[[T.x,T.z]]},s?(gt=null,E.hidden=!0,se(),Sr(X,T)):le(et.from),!0},move(T){if(!et||!T)return;let W=li(T);if(s){if(at==="draw"||at==="slope"){let X=et.points.at(-1);if(Math.hypot(T.x-X[0],T.z-X[1])<.18)return;let q=at==="draw"?512:96;et.points.length>=q?et.points[q-1]=[T.x,T.z]:et.points.push([T.x,T.z])}else if(hi(W,et.last))return;et.last=W,Sr(W,T)}else le(W)},finish(T){if(!et)return;let W=et,{trial:X}=W;if(et=null,s){rt(W,T);return}Xt([],""),!(T||X.error)&&ut(X.roads,X.affected,at==="erase"?"\u0110\xE3 x\xF3a d\u1EA3i \u0111\u01B0\u1EDDng.":`\u0110\xE3 v\u1EBD d\u1EA3i \u0111\u01B0\u1EDDng \xB7 r\u1ED9ng t\u1EDBi ${X.width}\xD7.`)},inspect(T,W){at==="draw"&&b?.value==="points"&&!L&&!pt&&Io(T),T&&["inspect","upgrade"].includes(at)&&Kt(li(T),W)},pickRoad(T,W){if(!s||!["inspect","draw","erase","upgrade"].includes(at))return W?.point;let X=mt.group.getObjectByName("C\u1EA7u ng\u01B0\u1EDDi ch\u01A1i"),q=X&&T.intersectObject(X,!0)[0];return q&&(!W||q.distance<W.distance)?q.point:W?.point},update(T,W){mt.update(T);let X=Math.min(.05,T-xt);if(W&&K.tick(T,X),L&&!K.busy(L.cells)){let{next:q,message:J,changes:it,sceneryEdits:_t}=L;L=null,K.restrict([]),dt(q,J,it,ct,_t)}xt=T}}}function IE(n){let t=[];for(let h=1;h<tc.length;h++){let[u,d]=tc[h-1],[p,x]=tc[h],g=Math.hypot(p-u,x-d)*4;for(let m=h===1?0:1;m<=g;m++)t.push(n(u+(p-u)*m/g,d+(x-d)*m/g))}let e=t.at(-1)-t[0],i=Math.max(...t.slice(1).map((h,u)=>Math.abs(h-t[u])*4));document.querySelector("#terrace-profile").textContent=`L\u1ED1i b\u1ED9 1\xD7 men \u0111\u1EA7u th\u1EC1m \xB7 d\xE0i ${((t.length-1)/4).toFixed(0)} \xF4 \xB7 ch\xEAnh cao ${e.toFixed(2)} \xB7 d\u1ED1c d\u1ECDc l\u1EDBn nh\u1EA5t ${(i*100).toFixed(0)}%.`;let s=Math.max(...Wn.slice(1).map((h,u)=>{let d=Wn[u];return(h.y-d.y)/Math.hypot(h.x-d.x,h.z-d.z)}));document.querySelector("#hill-profile").textContent=`\u0110\u01B0\u1EDDng xe 2\xD7 l\xEAn \u0111\u1ED3i \xB7 d\xE0i ${Od.toFixed(1)} \xF4 \xB7 ch\xEAnh cao ${(Wn.at(-1).y-Wn[0].y).toFixed(2)} \xB7 d\u1ED1c d\u1ECDc l\u1EDBn nh\u1EA5t ${(s*100).toFixed(0)}% theo t\u1EF7 l\u1EC7 demo.`;let r=document.querySelector("#terrace-chart").getContext("2d"),o=r.canvas.height,a=r.canvas.width,c=Math.min(...t),l=Math.max(...t);r.strokeStyle="#557247",r.lineWidth=2,r.beginPath();for(let[h,u]of t.entries())r.lineTo(4+h/(t.length-1)*(a-8),o-4-(u-c)/(l-c)*(o-8));r.stroke()}var Er={x:-7.7,y:.32,z:-2.5},Bi=new k(36,34.68,36),Eg=Bi.y/(Bi.length()*Math.SQRT2),LE=Math.hypot(Bi.x,Bi.z)/Bi.length(),zn={left:-33.72,right:36.3,bottom:-19.83,top:22.1},DE=zn.right-zn.left,_u=zn.top-zn.bottom,Mg=(zn.left+zn.right)/(2*Math.SQRT2),bg=(zn.bottom+zn.top)/(4*Eg),UE={overview:{x:Er.x+Mg-bg,z:Er.z-Mg-bg,span:_u,minWidth:0},bank:{x:-10.5,z:.55,span:11.8,minWidth:16},rapid:{x:-14.35,z:-7.2,span:9.9,minWidth:13.4},waterfall:{x:-.7,y:3.45,z:-37.25,span:15,minWidth:18.8},hill:{x:10.2,y:3.1,z:-12.45,span:12.8,minWidth:17.6},slope:{x:-14.4,z:6.4,span:18.4,minWidth:25},coast:{x:-5.7,z:17.3,span:13.8,minWidth:20}};function Sg({createTerrain:n,mountLayers:t,views:e={},initialView:i="overview"}){let s=document.querySelector("#status");try{NE(n,t,{...UE,...e},i,s)}catch(r){console.error(r),s.textContent="Kh\xF4ng m\u1EDF \u0111\u01B0\u1EE3c \u0111\u1ECBa h\xECnh 3D. H\xE3y th\u1EED Chrome ho\u1EB7c Edge c\xF3 WebGL."}}function NE(n,t,e,i,s){let r=document.querySelector("#terrain"),o=[...document.querySelectorAll("[data-camera]")].filter(O=>e[O.dataset.camera]),a=matchMedia("(prefers-reduced-motion: reduce)"),c=new Wr({canvas:r,antialias:!0});c.setPixelRatio(Math.min(devicePixelRatio,1.5)),c.shadowMap.enabled=!0,c.shadowMap.type=fh,c.toneMapping=ph;let l=new Ta;l.background=new yt("#b5b88a");let h=new Na("#fff1d3","#7c937c",1.92),u=new za("#ffebc8",2.11);u.position.set(-18,26,16),u.castShadow=!0,u.shadow.mapSize.set(1536,1536),Object.assign(u.shadow.camera,{left:-35,right:35,top:33,bottom:-33,near:1,far:90}),u.shadow.normalBias=.045;let d=n(),{group:p,updateWater:x,ground:g}=d;l.add(h,u,p);let m=new Qs(-20,20,12,-12,.1,200),f=new k,y=new Oa,_=new At,{controls:M,pickBuilding:E}=t?.({scene:l,canvas:r,terrain:d})??{},S={...e[i]},w=null,R=S.span,b=Eg,v=0,A=0;function I(O){let B=r.getBoundingClientRect();_.set((O.clientX-B.left)/B.width*2-1,1-(O.clientY-B.top)/B.height*2),y.setFromCamera(_,m);let K=y.intersectObject(g,!1)[0];return M?.pickRoad?M.pickRoad(y,K):K?.point}function z(){let O=r.clientWidth/Math.max(1,r.clientHeight);if(!O)return;let B=Math.min(_u,DE/O);R=Math.min(Math.max(S.span,S.minWidth/O),B);let K=R/2,Y=K*O;m.left=-Y,m.right=Y,m.top=K,m.bottom=-K,m.updateProjectionMatrix();let st=S.y??Er.y,ot=S.elevation?new k(Bi.x,S.elevation,Bi.z):Bi;b=ot.y/(ot.length()*Math.SQRT2);let Q=S.elevation?Math.hypot(ot.x,ot.z)/ot.length():LE,ht=S.x-Er.x,ct=S.z-Er.z,at=(ht-ct)/Math.SQRT2,mt=(st-Er.y)*Q-(ht+ct)*b,St=kt.clamp(at,zn.left+Y,zn.right-Y),F=kt.clamp(mt,zn.bottom+K,zn.top-K),vt=(St-at)/Math.SQRT2,j=(F-mt)/(2*b);f.set(S.x+vt-j,st,S.z-vt-j),m.position.copy(f).add(ot),m.lookAt(f),m.updateMatrixWorld()}function P(){c.setSize(r.clientWidth,r.clientHeight,!1),z()}function D(O){for(let B of o)B.setAttribute("aria-pressed",String(B.dataset.camera===O))}D(i);function N(O){S.x=f.x,S.z=f.z,S.span=kt.clamp(R*O,8.5,_u),S.minWidth=0,D(null),z()}for(let O of o)O.addEventListener("click",()=>{S={...e[O.dataset.camera]},D(O.dataset.camera),z()});document.querySelector("#zoom-in").addEventListener("click",()=>N(.84)),document.querySelector("#zoom-out").addEventListener("click",()=>N(1.19)),r.addEventListener("wheel",O=>{O.preventDefault(),N(O.deltaY<0?.91:1.1)},{passive:!1});let V=document.querySelector("#edit-cursor");function H(O){if(!V||O.pointerType!=="touch")return;let B=r.getBoundingClientRect();V.style.left=`${O.clientX-B.left}px`,V.style.top=`${Math.max(12,O.clientY-B.top-44)}px`,V.hidden=!1}r.addEventListener("pointerdown",O=>{if(!O.isPrimary||O.button!==0)return;let B=M?.begin(I(O),O);w={id:O.pointerId,x:O.clientX,y:O.clientY,editing:B,moved:!1},B&&H(O),r.setPointerCapture(O.pointerId)}),r.addEventListener("pointermove",O=>{if(!w||w.id!==O.pointerId)return;if(w.editing){H(O),M.move(I(O));return}if(!w.moved&&Math.hypot(O.clientX-w.x,O.clientY-w.y)<4)return;w.moved=!0;let B=R/Math.max(1,r.clientHeight),K=(O.clientX-w.x)*B/Math.SQRT2,Y=(O.clientY-w.y)*B/(2*b);S.x=f.x-K-Y,S.z=f.z+K-Y,w.x=O.clientX,w.y=O.clientY,D(null),z()});for(let O of["pointerup","pointercancel","lostpointercapture"])r.addEventListener(O,B=>{if(w?.id===B.pointerId){if(w.editing)V&&(V.hidden=!0),O==="pointerup"&&M.move(I(B)),M.finish(O!=="pointerup");else if(O==="pointerup"&&!w.moved&&M){let K=I(B),Y=r.dataset.planMode==="inspect"?E?.(y):void 0;M.inspect(K,Y)}w=null}});function G(O){a.matches||(v+=Math.min(.05,A?(O-A)/1e3:.016)),A=O,x(v),M?.update(v,!a.matches),c.render(l,m),requestAnimationFrame(G)}new ResizeObserver(P).observe(r),P(),s.textContent="K\xE9o \u0111\u1EC3 d\u1ECBch g\xF3c nh\xECn. Cu\u1ED9n ho\u1EB7c d\xF9ng + v\xE0 \u2212 \u0111\u1EC3 thu ph\xF3ng.",document.documentElement.dataset.ready="true",requestAnimationFrame(G)}var wg=new URLSearchParams(location.search),Nc=wg.get("dia-hinh")==="1",Co=!Nc&&wg.get("quy-hoach")==="1";document.querySelector("#terrain-link").hidden=Nc;Co&&(document.querySelector("#planning-profile").hidden=!1,document.querySelector('[data-camera="plan"]').hidden=!1,document.querySelector('[data-camera="bridge"]').hidden=!1,document.querySelector("h1").textContent="Duy\u1EC7t quy ho\u1EA1ch",document.title="LinguaCity \xB7 Duy\u1EC7t quy ho\u1EA1ch");Sg({createTerrain:Co?()=>uo({plannedHill:!0}):()=>(Nc?uo:Xp)({showScenery:!1,groundPalette:"earth"}),initialView:Co?"plan":"overview",views:Co?{plan:{x:.6,z:-2.4,span:16.2,minWidth:25.5},bridge:{x:-8.8,y:.3,z:-4.85,span:12.1,minWidth:17.3},hill:{x:13.6,y:2.55,z:-10.2,span:13.7,minWidth:20.8}}:Nc?{}:{hill:{x:9.7,y:1.75,z:-13.35,span:13.9,minWidth:21}},mountLayers:Co?({scene:n,canvas:t,terrain:e})=>({controls:vg({scene:n,canvas:t,surfaceY:e.surfaceY,blockers:e.blockers})}):void 0});})();
