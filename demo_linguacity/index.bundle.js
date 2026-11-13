(()=>{var g0=Object.create;var ku=Object.defineProperty;var x0=Object.getOwnPropertyDescriptor;var _0=Object.getOwnPropertyNames;var y0=Object.getPrototypeOf,v0=Object.prototype.hasOwnProperty;var we=(n,t)=>()=>(t||n((t={exports:{}}).exports,t),t.exports);var M0=(n,t,e,i)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of _0(t))!v0.call(n,s)&&s!==e&&ku(n,s,{get:()=>t[s],enumerable:!(i=x0(t,s))||i.enumerable});return n};var b0=(n,t,e)=>(e=n!=null?g0(y0(n)):{},M0(t||!n||!n.__esModule?ku(e,"default",{value:n,enumerable:!0}):e,n));var sg=we((ig,ko)=>{(function(){var n,t,e,i,s,r,o,a,c,l,h,u,f,p,x;e=Math.floor,l=Math.min,t=function(g,m){return g<m?-1:g>m?1:0},c=function(g,m,d,_,y){var v;if(d==null&&(d=0),y==null&&(y=t),d<0)throw new Error("lo must be non-negative");for(_==null&&(_=g.length);d<_;)v=e((d+_)/2),y(m,g[v])<0?_=v:d=v+1;return[].splice.apply(g,[d,d-d].concat(m)),m},r=function(g,m,d){return d==null&&(d=t),g.push(m),p(g,0,g.length-1,d)},s=function(g,m){var d,_;return m==null&&(m=t),d=g.pop(),g.length?(_=g[0],g[0]=d,x(g,0,m)):_=d,_},a=function(g,m,d){var _;return d==null&&(d=t),_=g[0],g[0]=m,x(g,0,d),_},o=function(g,m,d){var _;return d==null&&(d=t),g.length&&d(g[0],m)<0&&(_=[g[0],m],m=_[0],g[0]=_[1],x(g,0,d)),m},i=function(g,m){var d,_,y,v,E,S,w,R;for(m==null&&(m=t),S=function(){R=[];for(var b=0,M=e(g.length/2);0<=M?b<M:b>M;0<=M?b++:b--)R.push(b);return R}.apply(this).reverse(),w=[],_=0,v=S.length;_<v;_++)d=S[_],w.push(x(g,d,m));return w},f=function(g,m,d){var _;if(d==null&&(d=t),_=g.indexOf(m),_!==-1)return p(g,0,_,d),x(g,_,d)},h=function(g,m,d){var _,y,v,E,S;if(d==null&&(d=t),y=g.slice(0,m),!y.length)return y;for(i(y,d),S=g.slice(m),v=0,E=S.length;v<E;v++)_=S[v],o(y,_,d);return y.sort(d).reverse()},u=function(g,m,d){var _,y,v,E,S,w,R,b,M,A;if(d==null&&(d=t),m*10<=g.length){if(E=g.slice(0,m).sort(d),!E.length)return E;for(v=E[E.length-1],b=g.slice(m),S=0,R=b.length;S<R;S++)_=b[S],d(_,v)<0&&(c(E,_,0,null,d),E.pop(),v=E[E.length-1]);return E}for(i(g,d),A=[],y=w=0,M=l(m,g.length);0<=M?w<M:w>M;y=0<=M?++w:--w)A.push(s(g,d));return A},p=function(g,m,d,_){var y,v,E;for(_==null&&(_=t),y=g[d];d>m;){if(E=d-1>>1,v=g[E],_(y,v)<0){g[d]=v,d=E;continue}break}return g[d]=y},x=function(g,m,d){var _,y,v,E,S;for(d==null&&(d=t),y=g.length,S=m,v=g[m],_=2*m+1;_<y;)E=_+1,E<y&&!(d(g[_],g[E])<0)&&(_=E),g[m]=g[_],m=_,_=2*m+1;return g[m]=v,p(g,S,m,d)},n=function(){g.push=r,g.pop=s,g.replace=a,g.pushpop=o,g.heapify=i,g.updateItem=f,g.nlargest=h,g.nsmallest=u;function g(m){this.cmp=m??t,this.nodes=[]}return g.prototype.push=function(m){return r(this.nodes,m,this.cmp)},g.prototype.pop=function(){return s(this.nodes,this.cmp)},g.prototype.peek=function(){return this.nodes[0]},g.prototype.contains=function(m){return this.nodes.indexOf(m)!==-1},g.prototype.replace=function(m){return a(this.nodes,m,this.cmp)},g.prototype.pushpop=function(m){return o(this.nodes,m,this.cmp)},g.prototype.heapify=function(){return i(this.nodes,this.cmp)},g.prototype.updateItem=function(m){return f(this.nodes,m,this.cmp)},g.prototype.clear=function(){return this.nodes=[]},g.prototype.empty=function(){return this.nodes.length===0},g.prototype.size=function(){return this.nodes.length},g.prototype.clone=function(){var m;return m=new g,m.nodes=this.nodes.slice(0),m},g.prototype.toArray=function(){return this.nodes.slice(0)},g.prototype.insert=g.prototype.push,g.prototype.top=g.prototype.peek,g.prototype.front=g.prototype.peek,g.prototype.has=g.prototype.contains,g.prototype.copy=g.prototype.clone,g}(),typeof ko<"u"&&ko!==null&&ko.exports?ko.exports=n:window.Heap=n}).call(ig)});var Ho=we((ZT,rg)=>{rg.exports=sg()});var Uc=we((JT,og)=>{function cS(n,t,e){this.x=n,this.y=t,this.walkable=e===void 0?!0:e}og.exports=cS});var xn=we((KT,ag)=>{var lS={Always:1,Never:2,IfAtMostOneObstacle:3,OnlyWhenNoObstacles:4};ag.exports=lS});var hg=we((jT,lg)=>{var cg=Uc(),Nc=xn();function Mi(n,t,e){var i;typeof n!="object"?i=n:(t=n.length,i=n[0].length,e=n),this.width=i,this.height=t,this.nodes=this._buildNodes(i,t,e)}Mi.prototype._buildNodes=function(n,t,e){var i,s,r=new Array(t);for(i=0;i<t;++i)for(r[i]=new Array(n),s=0;s<n;++s)r[i][s]=new cg(s,i);if(e===void 0)return r;if(e.length!==t||e[0].length!==n)throw new Error("Matrix size does not fit");for(i=0;i<t;++i)for(s=0;s<n;++s)e[i][s]&&(r[i][s].walkable=!1);return r};Mi.prototype.getNodeAt=function(n,t){return this.nodes[t][n]};Mi.prototype.isWalkableAt=function(n,t){return this.isInside(n,t)&&this.nodes[t][n].walkable};Mi.prototype.isInside=function(n,t){return n>=0&&n<this.width&&t>=0&&t<this.height};Mi.prototype.setWalkableAt=function(n,t,e){this.nodes[t][n].walkable=e};Mi.prototype.getNeighbors=function(n,t){var e=n.x,i=n.y,s=[],r=!1,o=!1,a=!1,c=!1,l=!1,h=!1,u=!1,f=!1,p=this.nodes;if(this.isWalkableAt(e,i-1)&&(s.push(p[i-1][e]),r=!0),this.isWalkableAt(e+1,i)&&(s.push(p[i][e+1]),a=!0),this.isWalkableAt(e,i+1)&&(s.push(p[i+1][e]),l=!0),this.isWalkableAt(e-1,i)&&(s.push(p[i][e-1]),u=!0),t===Nc.Never)return s;if(t===Nc.OnlyWhenNoObstacles)o=u&&r,c=r&&a,h=a&&l,f=l&&u;else if(t===Nc.IfAtMostOneObstacle)o=u||r,c=r||a,h=a||l,f=l||u;else if(t===Nc.Always)o=!0,c=!0,h=!0,f=!0;else throw new Error("Incorrect value of diagonalMovement");return o&&this.isWalkableAt(e-1,i-1)&&s.push(p[i-1][e-1]),c&&this.isWalkableAt(e+1,i-1)&&s.push(p[i-1][e+1]),h&&this.isWalkableAt(e+1,i+1)&&s.push(p[i+1][e+1]),f&&this.isWalkableAt(e-1,i+1)&&s.push(p[i+1][e-1]),s};Mi.prototype.clone=function(){var n,t,e=this.width,i=this.height,s=this.nodes,r=new Mi(e,i),o=new Array(i);for(n=0;n<i;++n)for(o[n]=new Array(e),t=0;t<e;++t)o[n][t]=new cg(t,n,s[n][t].walkable);return r.nodes=o,r};lg.exports=Mi});var $i=we(Yi=>{function wu(n){for(var t=[[n.x,n.y]];n.parent;)n=n.parent,t.push([n.x,n.y]);return t.reverse()}Yi.backtrace=wu;function hS(n,t){var e=wu(n),i=wu(t);return e.concat(i.reverse())}Yi.biBacktrace=hS;function uS(n){var t,e=0,i,s,r,o;for(t=1;t<n.length;++t)i=n[t-1],s=n[t],r=i[0]-s[0],o=i[1]-s[1],e+=Math.sqrt(r*r+o*o);return e}Yi.pathLength=uS;function Tu(n,t,e,i){var s=Math.abs,r=[],o,a,c,l,h,u;for(c=s(e-n),l=s(i-t),o=n<e?1:-1,a=t<i?1:-1,h=c-l;r.push([n,t]),!(n===e&&t===i);)u=2*h,u>-l&&(h=h-l,n=n+o),u<c&&(h=h+c,t=t+a);return r}Yi.interpolate=Tu;function fS(n){var t=[],e=n.length,i,s,r,o,a,c;if(e<2)return t;for(a=0;a<e-1;++a)for(i=n[a],s=n[a+1],r=Tu(i[0],i[1],s[0],s[1]),o=r.length,c=0;c<o-1;++c)t.push(r[c]);return t.push(n[e-1]),t}Yi.expandPath=fS;function dS(n,t){var e=t.length,i=t[0][0],s=t[0][1],r=t[e-1][0],o=t[e-1][1],a,c,l,h,u,f,p,x,g,m,d;for(a=i,c=s,u=[[a,c]],f=2;f<e;++f){for(x=t[f],l=x[0],h=x[1],g=Tu(a,c,l,h),d=!1,p=1;p<g.length;++p)if(m=g[p],!n.isWalkableAt(m[0],m[1])){d=!0;break}d&&(lastValidCoord=t[f-1],u.push(lastValidCoord),a=lastValidCoord[0],c=lastValidCoord[1])}return u.push([r,o]),u}Yi.smoothenPath=dS;function pS(n){if(n.length<3)return n;var t=[],e=n[0][0],i=n[0][1],s=n[1][0],r=n[1][1],o=s-e,a=r-i,c,l,h,u,f,p;for(f=Math.sqrt(o*o+a*a),o/=f,a/=f,t.push([e,i]),p=2;p<n.length;p++)c=s,l=r,h=o,u=a,s=n[p][0],r=n[p][1],o=s-c,a=r-l,f=Math.sqrt(o*o+a*a),o/=f,a/=f,(o!==h||a!==u)&&t.push([c,l]);return t.push([s,r]),t}Yi.compressPath=pS});var Pr=we((tA,ug)=>{ug.exports={manhattan:function(n,t){return n+t},euclidean:function(n,t){return Math.sqrt(n*n+t*t)},octile:function(n,t){var e=Math.SQRT2-1;return n<t?e*n+t:e*t+n},chebyshev:function(n,t){return Math.max(n,t)}}});var Oc=we((eA,dg)=>{var mS=Ho(),gS=$i(),Au=Pr(),zc=xn();function fg(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.heuristic=n.heuristic||Au.manhattan,this.weight=n.weight||1,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=zc.OnlyWhenNoObstacles:this.diagonalMovement=zc.IfAtMostOneObstacle:this.diagonalMovement=zc.Never),this.diagonalMovement===zc.Never?this.heuristic=n.heuristic||Au.manhattan:this.heuristic=n.heuristic||Au.octile}fg.prototype.findPath=function(n,t,e,i,s){var r=new mS(function(E,S){return E.f-S.f}),o=s.getNodeAt(n,t),a=s.getNodeAt(e,i),c=this.heuristic,l=this.diagonalMovement,h=this.weight,u=Math.abs,f=Math.SQRT2,p,x,g,m,d,_,y,v;for(o.g=0,o.f=0,r.push(o),o.opened=!0;!r.empty();){if(p=r.pop(),p.closed=!0,p===a)return gS.backtrace(a);for(x=s.getNeighbors(p,l),m=0,d=x.length;m<d;++m)g=x[m],!g.closed&&(_=g.x,y=g.y,v=p.g+(_-p.x===0||y-p.y===0?1:f),(!g.opened||v<g.g)&&(g.g=v,g.h=g.h||h*c(u(_-e),u(y-i)),g.f=g.g+g.h,g.parent=p,g.opened?r.updateItem(g):(r.push(g),g.opened=!0)))}return[]};dg.exports=fg});var gg=we((nA,mg)=>{var pg=Oc();function Fc(n){pg.call(this,n);var t=this.heuristic;this.heuristic=function(e,i){return t(e,i)*1e6}}Fc.prototype=new pg;Fc.prototype.constructor=Fc;mg.exports=Fc});var yg=we((iA,_g)=>{var xS=$i(),Ru=xn();function xg(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Ru.OnlyWhenNoObstacles:this.diagonalMovement=Ru.IfAtMostOneObstacle:this.diagonalMovement=Ru.Never)}xg.prototype.findPath=function(n,t,e,i,s){var r=[],o=this.diagonalMovement,a=s.getNodeAt(n,t),c=s.getNodeAt(e,i),l,h,u,f,p;for(r.push(a),a.opened=!0;r.length;){if(u=r.shift(),u.closed=!0,u===c)return xS.backtrace(c);for(l=s.getNeighbors(u,o),f=0,p=l.length;f<p;++f)h=l[f],!(h.closed||h.opened)&&(r.push(h),h.opened=!0,h.parent=u)}return[]};_g.exports=xg});var bg=we((sA,Mg)=>{var vg=Oc();function Bc(n){vg.call(this,n),this.heuristic=function(t,e){return 0}}Bc.prototype=new vg;Bc.prototype.constructor=Bc;Mg.exports=Bc});var Hc=we((rA,Tg)=>{var Eg=Ho(),Sg=$i(),Cu=Pr(),kc=xn();function wg(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.heuristic=n.heuristic||Cu.manhattan,this.weight=n.weight||1,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=kc.OnlyWhenNoObstacles:this.diagonalMovement=kc.IfAtMostOneObstacle:this.diagonalMovement=kc.Never),this.diagonalMovement===kc.Never?this.heuristic=n.heuristic||Cu.manhattan:this.heuristic=n.heuristic||Cu.octile}wg.prototype.findPath=function(n,t,e,i,s){var r=function(b,M){return b.f-M.f},o=new Eg(r),a=new Eg(r),c=s.getNodeAt(n,t),l=s.getNodeAt(e,i),h=this.heuristic,u=this.diagonalMovement,f=this.weight,p=Math.abs,x=Math.SQRT2,g,m,d,_,y,v,E,S,w=1,R=2;for(c.g=0,c.f=0,o.push(c),c.opened=w,l.g=0,l.f=0,a.push(l),l.opened=R;!o.empty()&&!a.empty();){for(g=o.pop(),g.closed=!0,m=s.getNeighbors(g,u),_=0,y=m.length;_<y;++_)if(d=m[_],!d.closed){if(d.opened===R)return Sg.biBacktrace(g,d);v=d.x,E=d.y,S=g.g+(v-g.x===0||E-g.y===0?1:x),(!d.opened||S<d.g)&&(d.g=S,d.h=d.h||f*h(p(v-e),p(E-i)),d.f=d.g+d.h,d.parent=g,d.opened?o.updateItem(d):(o.push(d),d.opened=w))}for(g=a.pop(),g.closed=!0,m=s.getNeighbors(g,u),_=0,y=m.length;_<y;++_)if(d=m[_],!d.closed){if(d.opened===w)return Sg.biBacktrace(d,g);v=d.x,E=d.y,S=g.g+(v-g.x===0||E-g.y===0?1:x),(!d.opened||S<d.g)&&(d.g=S,d.h=d.h||f*h(p(v-n),p(E-t)),d.f=d.g+d.h,d.parent=g,d.opened?a.updateItem(d):(a.push(d),d.opened=R))}}return[]};Tg.exports=wg});var Cg=we((oA,Rg)=>{var Ag=Hc();function Gc(n){Ag.call(this,n);var t=this.heuristic;this.heuristic=function(e,i){return t(e,i)*1e6}}Gc.prototype=new Ag;Gc.prototype.constructor=Gc;Rg.exports=Gc});var Dg=we((aA,Lg)=>{var Pg=$i(),Pu=xn();function Ig(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Pu.OnlyWhenNoObstacles:this.diagonalMovement=Pu.IfAtMostOneObstacle:this.diagonalMovement=Pu.Never)}Ig.prototype.findPath=function(n,t,e,i,s){var r=s.getNodeAt(n,t),o=s.getNodeAt(e,i),a=[],c=[],l,h,u,f=this.diagonalMovement,p=0,x=1,g,m;for(a.push(r),r.opened=!0,r.by=p,c.push(o),o.opened=!0,o.by=x;a.length&&c.length;){for(u=a.shift(),u.closed=!0,l=s.getNeighbors(u,f),g=0,m=l.length;g<m;++g)if(h=l[g],!h.closed){if(h.opened){if(h.by===x)return Pg.biBacktrace(u,h);continue}a.push(h),h.parent=u,h.opened=!0,h.by=p}for(u=c.shift(),u.closed=!0,l=s.getNeighbors(u,f),g=0,m=l.length;g<m;++g)if(h=l[g],!h.closed){if(h.opened){if(h.by===p)return Pg.biBacktrace(h,u);continue}c.push(h),h.parent=u,h.opened=!0,h.by=x}}return[]};Lg.exports=Ig});var zg=we((cA,Ng)=>{var Ug=Hc();function Vc(n){Ug.call(this,n),this.heuristic=function(t,e){return 0}}Vc.prototype=new Ug;Vc.prototype.constructor=Vc;Ng.exports=Vc});var kg=we((hA,Bg)=>{var lA=$i(),Iu=Pr(),Og=Uc(),Wc=xn();function Fg(n){n=n||{},this.allowDiagonal=n.allowDiagonal,this.dontCrossCorners=n.dontCrossCorners,this.diagonalMovement=n.diagonalMovement,this.heuristic=n.heuristic||Iu.manhattan,this.weight=n.weight||1,this.trackRecursion=n.trackRecursion||!1,this.timeLimit=n.timeLimit||1/0,this.diagonalMovement||(this.allowDiagonal?this.dontCrossCorners?this.diagonalMovement=Wc.OnlyWhenNoObstacles:this.diagonalMovement=Wc.IfAtMostOneObstacle:this.diagonalMovement=Wc.Never),this.diagonalMovement===Wc.Never?this.heuristic=n.heuristic||Iu.manhattan:this.heuristic=n.heuristic||Iu.octile}Fg.prototype.findPath=function(n,t,e,i,s){var r=0,o=new Date().getTime(),a=function(m,d){return this.heuristic(Math.abs(d.x-m.x),Math.abs(d.y-m.y))}.bind(this),c=function(m,d){return m.x===d.x||m.y===d.y?1:Math.SQRT2},l=function(m,d,_,y,v){if(r++,this.timeLimit>0&&new Date().getTime()-o>this.timeLimit*1e3)return 1/0;var E=d+a(m,u)*this.weight;if(E>_)return E;if(m==u)return y[v]=[m.x,m.y],m;var S,w,R,b,M=s.getNeighbors(m,this.diagonalMovement);for(R=0,S=1/0;b=M[R];++R){if(this.trackRecursion&&(b.retainCount=b.retainCount+1||1,b.tested!==!0&&(b.tested=!0)),w=l(b,d+c(m,b),_,y,v+1),w instanceof Og)return y[v]=[m.x,m.y],w;this.trackRecursion&&--b.retainCount===0&&(b.tested=!1),w<S&&(S=w)}return S}.bind(this),h=s.getNodeAt(n,t),u=s.getNodeAt(e,i),f=a(h,u),p,x,g;for(p=0;;++p){if(x=[],g=l(h,0,f,x,0),g===1/0)return[];if(g instanceof Og)return x;f=g}return[]};Bg.exports=Fg});var Go=we((fA,Vg)=>{var _S=Ho(),Hg=$i(),Gg=Pr(),uA=xn();function Lu(n){n=n||{},this.heuristic=n.heuristic||Gg.manhattan,this.trackJumpRecursion=n.trackJumpRecursion||!1}Lu.prototype.findPath=function(n,t,e,i,s){var r=this.openList=new _S(function(l,h){return l.f-h.f}),o=this.startNode=s.getNodeAt(n,t),a=this.endNode=s.getNodeAt(e,i),c;for(this.grid=s,o.g=0,o.f=0,r.push(o),o.opened=!0;!r.empty();){if(c=r.pop(),c.closed=!0,c===a)return Hg.expandPath(Hg.backtrace(a));this._identifySuccessors(c)}return[]};Lu.prototype._identifySuccessors=function(n){var t=this.grid,e=this.heuristic,i=this.openList,s=this.endNode.x,r=this.endNode.y,o,a,c,l,h,u=n.x,f=n.y,p,x,g,m,d,_,y,v=Math.abs,E=Math.max;for(o=this._findNeighbors(n),l=0,h=o.length;l<h;++l)if(a=o[l],c=this._jump(a[0],a[1],u,f),c){if(p=c[0],x=c[1],y=t.getNodeAt(p,x),y.closed)continue;d=Gg.octile(v(p-u),v(x-f)),_=n.g+d,(!y.opened||_<y.g)&&(y.g=_,y.h=y.h||e(v(p-s),v(x-r)),y.f=y.g+y.h,y.parent=n,y.opened?i.updateItem(y):(i.push(y),y.opened=!0))}};Vg.exports=Lu});var qg=we((dA,Xg)=>{var Wg=Go(),yS=xn();function Ir(n){Wg.call(this,n)}Ir.prototype=new Wg;Ir.prototype.constructor=Ir;Ir.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0){if(s.isWalkableAt(n,t-1)&&!s.isWalkableAt(n-r,t-1)||s.isWalkableAt(n,t+1)&&!s.isWalkableAt(n-r,t+1))return[n,t]}else if(o!==0){if(s.isWalkableAt(n-1,t)&&!s.isWalkableAt(n-1,t-o)||s.isWalkableAt(n+1,t)&&!s.isWalkableAt(n+1,t-o))return[n,t];if(this._jump(n+1,t,n,t)||this._jump(n-1,t,n,t))return[n,t]}else throw new Error("Only horizontal and vertical movements are allowed");return this._jump(n+r,t+o,n,t)};Ir.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],f,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0?(s.isWalkableAt(e,i-1)&&u.push([e,i-1]),s.isWalkableAt(e,i+1)&&u.push([e,i+1]),s.isWalkableAt(e+l,i)&&u.push([e+l,i])):h!==0&&(s.isWalkableAt(e-1,i)&&u.push([e-1,i]),s.isWalkableAt(e+1,i)&&u.push([e+1,i]),s.isWalkableAt(e,i+h)&&u.push([e,i+h]));else for(f=s.getNeighbors(n,yS.Never),x=0,g=f.length;x<g;++x)p=f[x],u.push([p.x,p.y]);return u};Xg.exports=Ir});var Zg=we((pA,$g)=>{var Yg=Go(),vS=xn();function Lr(n){Yg.call(this,n)}Lr.prototype=new Yg;Lr.prototype.constructor=Lr;Lr.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(s.isWalkableAt(n-r,t+o)&&!s.isWalkableAt(n-r,t)||s.isWalkableAt(n+r,t-o)&&!s.isWalkableAt(n,t-o))return[n,t];if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n+r,t+1)&&!s.isWalkableAt(n,t+1)||s.isWalkableAt(n+r,t-1)&&!s.isWalkableAt(n,t-1))return[n,t]}else if(s.isWalkableAt(n+1,t+o)&&!s.isWalkableAt(n+1,t)||s.isWalkableAt(n-1,t+o)&&!s.isWalkableAt(n-1,t))return[n,t];return this._jump(n+r,t+o,n,t)};Lr.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],f,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e+l,i+h)&&u.push([e+l,i+h]),s.isWalkableAt(e-l,i)||u.push([e-l,i+h]),s.isWalkableAt(e,i-h)||u.push([e+l,i-h])):l===0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+1,i)||u.push([e+1,i+h]),s.isWalkableAt(e-1,i)||u.push([e-1,i+h])):(s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e,i+1)||u.push([e+l,i+1]),s.isWalkableAt(e,i-1)||u.push([e+l,i-1]));else for(f=s.getNeighbors(n,vS.Always),x=0,g=f.length;x<g;++x)p=f[x],u.push([p.x,p.y]);return u};$g.exports=Lr});var jg=we((mA,Kg)=>{var Jg=Go(),MS=xn();function Dr(n){Jg.call(this,n)}Dr.prototype=new Jg;Dr.prototype.constructor=Dr;Dr.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n,t-1)&&!s.isWalkableAt(n-r,t-1)||s.isWalkableAt(n,t+1)&&!s.isWalkableAt(n-r,t+1))return[n,t]}else if(o!==0&&(s.isWalkableAt(n-1,t)&&!s.isWalkableAt(n-1,t-o)||s.isWalkableAt(n+1,t)&&!s.isWalkableAt(n+1,t-o)))return[n,t];return s.isWalkableAt(n+r,t)&&s.isWalkableAt(n,t+o)?this._jump(n+r,t+o,n,t):null};Dr.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],f,p,x,g;if(t)if(r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0)s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),s.isWalkableAt(e,i+h)&&s.isWalkableAt(e+l,i)&&u.push([e+l,i+h]);else{var m;if(l!==0){m=s.isWalkableAt(e+l,i);var d=s.isWalkableAt(e,i+1),_=s.isWalkableAt(e,i-1);m&&(u.push([e+l,i]),d&&u.push([e+l,i+1]),_&&u.push([e+l,i-1])),d&&u.push([e,i+1]),_&&u.push([e,i-1])}else if(h!==0){m=s.isWalkableAt(e,i+h);var y=s.isWalkableAt(e+1,i),v=s.isWalkableAt(e-1,i);m&&(u.push([e,i+h]),y&&u.push([e+1,i+h]),v&&u.push([e-1,i+h])),y&&u.push([e+1,i]),v&&u.push([e-1,i])}}else for(f=s.getNeighbors(n,MS.OnlyWhenNoObstacles),x=0,g=f.length;x<g;++x)p=f[x],u.push([p.x,p.y]);return u};Kg.exports=Dr});var e0=we((gA,t0)=>{var Qg=Go(),bS=xn();function Ur(n){Qg.call(this,n)}Ur.prototype=new Qg;Ur.prototype.constructor=Ur;Ur.prototype._jump=function(n,t,e,i){var s=this.grid,r=n-e,o=t-i;if(!s.isWalkableAt(n,t))return null;if(this.trackJumpRecursion===!0&&(s.getNodeAt(n,t).tested=!0),s.getNodeAt(n,t)===this.endNode)return[n,t];if(r!==0&&o!==0){if(s.isWalkableAt(n-r,t+o)&&!s.isWalkableAt(n-r,t)||s.isWalkableAt(n+r,t-o)&&!s.isWalkableAt(n,t-o))return[n,t];if(this._jump(n+r,t,n,t)||this._jump(n,t+o,n,t))return[n,t]}else if(r!==0){if(s.isWalkableAt(n+r,t+1)&&!s.isWalkableAt(n,t+1)||s.isWalkableAt(n+r,t-1)&&!s.isWalkableAt(n,t-1))return[n,t]}else if(s.isWalkableAt(n+1,t+o)&&!s.isWalkableAt(n+1,t)||s.isWalkableAt(n-1,t+o)&&!s.isWalkableAt(n-1,t))return[n,t];return s.isWalkableAt(n+r,t)||s.isWalkableAt(n,t+o)?this._jump(n+r,t+o,n,t):null};Ur.prototype._findNeighbors=function(n){var t=n.parent,e=n.x,i=n.y,s=this.grid,r,o,a,c,l,h,u=[],f,p,x,g;if(t)r=t.x,o=t.y,l=(e-r)/Math.max(Math.abs(e-r),1),h=(i-o)/Math.max(Math.abs(i-o),1),l!==0&&h!==0?(s.isWalkableAt(e,i+h)&&u.push([e,i+h]),s.isWalkableAt(e+l,i)&&u.push([e+l,i]),(s.isWalkableAt(e,i+h)||s.isWalkableAt(e+l,i))&&u.push([e+l,i+h]),!s.isWalkableAt(e-l,i)&&s.isWalkableAt(e,i+h)&&u.push([e-l,i+h]),!s.isWalkableAt(e,i-h)&&s.isWalkableAt(e+l,i)&&u.push([e+l,i-h])):l===0?s.isWalkableAt(e,i+h)&&(u.push([e,i+h]),s.isWalkableAt(e+1,i)||u.push([e+1,i+h]),s.isWalkableAt(e-1,i)||u.push([e-1,i+h])):s.isWalkableAt(e+l,i)&&(u.push([e+l,i]),s.isWalkableAt(e,i+1)||u.push([e+l,i+1]),s.isWalkableAt(e,i-1)||u.push([e+l,i-1]));else for(f=s.getNeighbors(n,bS.IfAtMostOneObstacle),x=0,g=f.length;x<g;++x)p=f[x],u.push([p.x,p.y]);return u};t0.exports=Ur});var i0=we((xA,n0)=>{var Du=xn(),ES=qg(),SS=Zg(),wS=jg(),TS=e0();function AS(n){return n=n||{},n.diagonalMovement===Du.Never?new ES(n):n.diagonalMovement===Du.Always?new SS(n):n.diagonalMovement===Du.OnlyWhenNoObstacles?new wS(n):new TS(n)}n0.exports=AS});var r0=we((_A,s0)=>{s0.exports={Heap:Ho(),Node:Uc(),Grid:hg(),Util:$i(),DiagonalMovement:xn(),Heuristic:Pr(),AStarFinder:Oc(),BestFirstFinder:gg(),BreadthFirstFinder:yg(),DijkstraFinder:bg(),BiAStarFinder:Hc(),BiBestFirstFinder:Cg(),BiBreadthFirstFinder:Dg(),BiDijkstraFinder:zg(),IDAStarFinder:kg(),JumpPointFinder:i0()}});var a0=we((yA,o0)=>{o0.exports=r0()});/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */var Sh="160";var E0=0,Hu=1,S0=2;var Sd=1,wh=2,ci=3,Ui=0,fn=1,Ie=2;var Ii=0,tr=1,Gu=2,Vu=3,Wu=4,w0=5,is=100,T0=101,A0=102,Xu=103,qu=104,R0=200,C0=201,P0=202,I0=203,Ll=204,Dl=205,L0=206,D0=207,U0=208,N0=209,z0=210,O0=211,F0=212,B0=213,k0=214,H0=0,G0=1,V0=2,ir=3,W0=4,X0=5,Th=6,q0=7,wd=0,Y0=1,$0=2,Li=0,Z0=1,J0=2,K0=3,Ah=4,j0=5,Q0=6;var Td=300,sr=301,rr=302,Ul=303,Nl=304,Qa=306,zl=1e3,Vn=1001,Ol=1002,Qe=1003,Yu=1004;var jc=1005;var on=1006,tx=1007;var Kr=1008;var Di=1009,ex=1010,nx=1011,Rh=1012,Ad=1013,Ci=1014,Pi=1015,jr=1016,Rd=1017,Cd=1018,rs=1020,ix=1021,Wn=1023,sx=1024,rx=1025,os=1026,or=1027,ox=1028,Pd=1029,ax=1030,Id=1031,Ld=1033,Qc=33776,tl=33777,el=33778,nl=33779,$u=35840,Zu=35841,Ju=35842,Ku=35843,Dd=36196,ju=37492,Qu=37496,tf=37808,ef=37809,nf=37810,sf=37811,rf=37812,of=37813,af=37814,cf=37815,lf=37816,hf=37817,uf=37818,ff=37819,df=37820,pf=37821,il=36492,mf=36494,gf=36495,cx=36283,xf=36284,_f=36285,yf=36286;var Ta=2300,Aa=2301,sl=2302,vf=2400,Mf=2401,bf=2402;var Ud=3e3,as=3001,lx=3200,hx=3201,Nd=0,ux=1,In="",$e="srgb",ui="srgb-linear",Ch="display-p3",tc="display-p3-linear",Ra="linear",Ee="srgb",Ca="rec709",Pa="p3";var Ls=7680;var Ef=519,fx=512,dx=513,px=514,zd=515,mx=516,gx=517,xx=518,_x=519,Sf=35044,fs=35048;var wf="300 es",Fl=1035,hi=2e3,Ia=2001,Ni=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let i=this._listeners;return i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let i=this._listeners[t.type];if(i!==void 0){t.target=this;let s=i.slice(0);for(let r=0,o=s.length;r<o;r++)s[r].call(this,t);t.target=null}}},sn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Tf=1234567,Wr=Math.PI/180,Qr=180/Math.PI;function ds(){let n=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(sn[n&255]+sn[n>>8&255]+sn[n>>16&255]+sn[n>>24&255]+"-"+sn[t&255]+sn[t>>8&255]+"-"+sn[t>>16&15|64]+sn[t>>24&255]+"-"+sn[e&63|128]+sn[e>>8&255]+"-"+sn[e>>16&255]+sn[e>>24&255]+sn[i&255]+sn[i>>8&255]+sn[i>>16&255]+sn[i>>24&255]).toLowerCase()}function Ze(n,t,e){return Math.max(t,Math.min(e,n))}function Ph(n,t){return(n%t+t)%t}function yx(n,t,e,i,s){return i+(n-t)*(s-i)/(e-t)}function vx(n,t,e){return n!==t?(e-n)/(t-n):0}function Xr(n,t,e){return(1-e)*n+e*t}function Mx(n,t,e,i){return Xr(n,t,1-Math.exp(-e*i))}function bx(n,t=1){return t-Math.abs(Ph(n,t*2)-t)}function Ex(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*(3-2*n))}function Sx(n,t,e){return n<=t?0:n>=e?1:(n=(n-t)/(e-t),n*n*n*(n*(n*6-15)+10))}function wx(n,t){return n+Math.floor(Math.random()*(t-n+1))}function Tx(n,t){return n+Math.random()*(t-n)}function Ax(n){return n*(.5-Math.random())}function Rx(n){n!==void 0&&(Tf=n);let t=Tf+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Cx(n){return n*Wr}function Px(n){return n*Qr}function Bl(n){return(n&n-1)===0&&n!==0}function Ix(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function La(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Lx(n,t,e,i,s){let r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+i)/2),h=o((t+i)/2),u=r((t-i)/2),f=o((t-i)/2),p=r((i-t)/2),x=o((i-t)/2);switch(s){case"XYX":n.set(a*h,c*u,c*f,a*l);break;case"YZY":n.set(c*f,a*h,c*u,a*l);break;case"ZXZ":n.set(c*u,c*f,a*h,a*l);break;case"XZX":n.set(a*h,c*x,c*p,a*l);break;case"YXY":n.set(c*p,a*h,c*x,a*l);break;case"ZYZ":n.set(c*x,c*p,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Zs(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function cn(n,t){switch(t.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Bt={DEG2RAD:Wr,RAD2DEG:Qr,generateUUID:ds,clamp:Ze,euclideanModulo:Ph,mapLinear:yx,inverseLerp:vx,lerp:Xr,damp:Mx,pingpong:bx,smoothstep:Ex,smootherstep:Sx,randInt:wx,randFloat:Tx,randFloatSpread:Ax,seededRandom:Rx,degToRad:Cx,radToDeg:Px,isPowerOfTwo:Bl,ceilPowerOfTwo:Ix,floorPowerOfTwo:La,setQuaternionFromProperEuler:Lx,normalize:cn,denormalize:Zs},Tt=class n{constructor(t=0,e=0){n.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,i=this.y,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6],this.y=s[1]*e+s[4]*i+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let i=Math.cos(e),s=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*i-o*s+t.x,this.y=r*s+o*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},oe=class n{constructor(t,e,i,s,r,o,a,c,l){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l)}set(t,e,i,s,r,o,a,c,l){let h=this.elements;return h[0]=t,h[1]=s,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=i,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[3],c=i[6],l=i[1],h=i[4],u=i[7],f=i[2],p=i[5],x=i[8],g=s[0],m=s[3],d=s[6],_=s[1],y=s[4],v=s[7],E=s[2],S=s[5],w=s[8];return r[0]=o*g+a*_+c*E,r[3]=o*m+a*y+c*S,r[6]=o*d+a*v+c*w,r[1]=l*g+h*_+u*E,r[4]=l*m+h*y+u*S,r[7]=l*d+h*v+u*w,r[2]=f*g+p*_+x*E,r[5]=f*m+p*y+x*S,r[8]=f*d+p*v+x*w,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-i*r*h+i*a*c+s*r*l-s*o*c}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,f=a*c-h*r,p=l*r-o*c,x=e*u+i*f+s*p;if(x===0)return this.set(0,0,0,0,0,0,0,0,0);let g=1/x;return t[0]=u*g,t[1]=(s*l-h*i)*g,t[2]=(a*i-s*o)*g,t[3]=f*g,t[4]=(h*e-s*c)*g,t[5]=(s*r-a*e)*g,t[6]=p*g,t[7]=(i*c-l*e)*g,t[8]=(o*e-i*r)*g,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,s,r,o,a){let c=Math.cos(r),l=Math.sin(r);return this.set(i*c,i*l,-i*(c*o+l*a)+o+t,-s*l,s*c,-s*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(rl.makeScale(t,e)),this}rotate(t){return this.premultiply(rl.makeRotation(-t)),this}translate(t,e){return this.premultiply(rl.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<9;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}},rl=new oe;function Od(n){for(let t=n.length-1;t>=0;--t)if(n[t]>=65535)return!0;return!1}function Da(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Dx(){let n=Da("canvas");return n.style.display="block",n}var Af={};function qr(n){n in Af||(Af[n]=!0,console.warn(n))}var Rf=new oe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Cf=new oe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),jo={[ui]:{transfer:Ra,primaries:Ca,toReference:n=>n,fromReference:n=>n},[$e]:{transfer:Ee,primaries:Ca,toReference:n=>n.convertSRGBToLinear(),fromReference:n=>n.convertLinearToSRGB()},[tc]:{transfer:Ra,primaries:Pa,toReference:n=>n.applyMatrix3(Cf),fromReference:n=>n.applyMatrix3(Rf)},[Ch]:{transfer:Ee,primaries:Pa,toReference:n=>n.convertSRGBToLinear().applyMatrix3(Cf),fromReference:n=>n.applyMatrix3(Rf).convertLinearToSRGB()}},Ux=new Set([ui,tc]),xe={enabled:!0,_workingColorSpace:ui,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(n){if(!Ux.has(n))throw new Error(`Unsupported working color space, "${n}".`);this._workingColorSpace=n},convert:function(n,t,e){if(this.enabled===!1||t===e||!t||!e)return n;let i=jo[t].toReference,s=jo[e].fromReference;return s(i(n))},fromWorkingColorSpace:function(n,t){return this.convert(n,this._workingColorSpace,t)},toWorkingColorSpace:function(n,t){return this.convert(n,t,this._workingColorSpace)},getPrimaries:function(n){return jo[n].primaries},getTransfer:function(n){return n===In?Ra:jo[n].transfer}};function er(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function ol(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ds,Ua=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ds===void 0&&(Ds=Da("canvas")),Ds.width=t.width,Ds.height=t.height;let i=Ds.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),e=Ds}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Da("canvas");e.width=t.width,e.height=t.height;let i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);let s=i.getImageData(0,0,t.width,t.height),r=s.data;for(let o=0;o<r.length;o++)r[o]=er(r[o]/255)*255;return i.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(er(e[i]/255)*255):e[i]=er(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Nx=0,Na=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nx++}),this.uuid=ds(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let o=0,a=s.length;o<a;o++)s[o].isDataTexture?r.push(al(s[o].image)):r.push(al(s[o]))}else r=al(s);i.url=r}return e||(t.images[this.uuid]=i),i}};function al(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Ua.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var zx=0,Ln=class n extends Ni{constructor(t=n.DEFAULT_IMAGE,e=n.DEFAULT_MAPPING,i=Vn,s=Vn,r=on,o=Kr,a=Wn,c=Di,l=n.DEFAULT_ANISOTROPY,h=In){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zx++}),this.uuid=ds(),this.name="",this.source=new Na(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new Tt(0,0),this.repeat=new Tt(1,1),this.center=new Tt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(qr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===as?$e:In),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let i={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Td)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case zl:t.x=t.x-Math.floor(t.x);break;case Vn:t.x=t.x<0?0:1;break;case Ol:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case zl:t.y=t.y-Math.floor(t.y);break;case Vn:t.y=t.y<0?0:1;break;case Ol:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return qr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===$e?as:Ud}set encoding(t){qr("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===as?$e:In}};Ln.DEFAULT_IMAGE=null;Ln.DEFAULT_MAPPING=Td;Ln.DEFAULT_ANISOTROPY=1;var Je=class n{constructor(t=0,e=0,i=0,s=1){n.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,s){return this.x=t,this.y=e,this.z=i,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*i+o[8]*s+o[12]*r,this.y=o[1]*e+o[5]*i+o[9]*s+o[13]*r,this.z=o[2]*e+o[6]*i+o[10]*s+o[14]*r,this.w=o[3]*e+o[7]*i+o[11]*s+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,s,r,c=t.elements,l=c[0],h=c[4],u=c[8],f=c[1],p=c[5],x=c[9],g=c[2],m=c[6],d=c[10];if(Math.abs(h-f)<.01&&Math.abs(u-g)<.01&&Math.abs(x-m)<.01){if(Math.abs(h+f)<.1&&Math.abs(u+g)<.1&&Math.abs(x+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,v=(p+1)/2,E=(d+1)/2,S=(h+f)/4,w=(u+g)/4,R=(x+m)/4;return y>v&&y>E?y<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(y),s=S/i,r=w/i):v>E?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=S/s,r=R/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=w/r,s=R/r),this.set(i,s,r,e),this}let _=Math.sqrt((m-x)*(m-x)+(u-g)*(u-g)+(f-h)*(f-h));return Math.abs(_)<.001&&(_=1),this.x=(m-x)/_,this.y=(u-g)/_,this.z=(f-h)/_,this.w=Math.acos((l+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},kl=class extends Ni{constructor(t=1,e=1,i={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Je(0,0,t,e),this.scissorTest=!1,this.viewport=new Je(0,0,t,e);let s={width:t,height:e,depth:1};i.encoding!==void 0&&(qr("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),i.colorSpace=i.encoding===as?$e:In),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:on,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},i),this.texture=new Ln(s,i.mapping,i.wrapS,i.wrapT,i.magFilter,i.minFilter,i.format,i.type,i.anisotropy,i.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=i.generateMipmaps,this.texture.internalFormat=i.internalFormat,this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.depthTexture=i.depthTexture,this.samples=i.samples}setSize(t,e,i=1){(this.width!==t||this.height!==e||this.depth!==i)&&(this.width=t,this.height=e,this.depth=i,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=i,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Na(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},fi=class extends kl{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}},za=class extends Ln{constructor(t=null,e=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hl=class extends Ln{constructor(t=null,e=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:s},this.magFilter=Qe,this.minFilter=Qe,this.wrapR=Vn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var zi=class{constructor(t=0,e=0,i=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=s}static slerpFlat(t,e,i,s,r,o,a){let c=i[s+0],l=i[s+1],h=i[s+2],u=i[s+3],f=r[o+0],p=r[o+1],x=r[o+2],g=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=f,t[e+1]=p,t[e+2]=x,t[e+3]=g;return}if(u!==g||c!==f||l!==p||h!==x){let m=1-a,d=c*f+l*p+h*x+u*g,_=d>=0?1:-1,y=1-d*d;if(y>Number.EPSILON){let E=Math.sqrt(y),S=Math.atan2(E,d*_);m=Math.sin(m*S)/E,a=Math.sin(a*S)/E}let v=a*_;if(c=c*m+f*v,l=l*m+p*v,h=h*m+x*v,u=u*m+g*v,m===1-a){let E=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=E,l*=E,h*=E,u*=E}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,s,r,o){let a=i[s],c=i[s+1],l=i[s+2],h=i[s+3],u=r[o],f=r[o+1],p=r[o+2],x=r[o+3];return t[e]=a*x+h*u+c*p-l*f,t[e+1]=c*x+h*f+l*u-a*p,t[e+2]=l*x+h*p+a*f-c*u,t[e+3]=h*x-a*u-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,s){return this._x=t,this._y=e,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let i=t._x,s=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(i/2),h=a(s/2),u=a(r/2),f=c(i/2),p=c(s/2),x=c(r/2);switch(o){case"XYZ":this._x=f*h*u+l*p*x,this._y=l*p*u-f*h*x,this._z=l*h*x+f*p*u,this._w=l*h*u-f*p*x;break;case"YXZ":this._x=f*h*u+l*p*x,this._y=l*p*u-f*h*x,this._z=l*h*x-f*p*u,this._w=l*h*u+f*p*x;break;case"ZXY":this._x=f*h*u-l*p*x,this._y=l*p*u+f*h*x,this._z=l*h*x+f*p*u,this._w=l*h*u-f*p*x;break;case"ZYX":this._x=f*h*u-l*p*x,this._y=l*p*u+f*h*x,this._z=l*h*x-f*p*u,this._w=l*h*u+f*p*x;break;case"YZX":this._x=f*h*u+l*p*x,this._y=l*p*u+f*h*x,this._z=l*h*x-f*p*u,this._w=l*h*u-f*p*x;break;case"XZY":this._x=f*h*u-l*p*x,this._y=l*p*u-f*h*x,this._z=l*h*x+f*p*u,this._w=l*h*u+f*p*x;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let i=e/2,s=Math.sin(i);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,i=e[0],s=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],f=i+a+u;if(f>0){let p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(h-c)*p,this._y=(r-l)*p,this._z=(o-s)*p}else if(i>a&&i>u){let p=2*Math.sqrt(1+i-a-u);this._w=(h-c)/p,this._x=.25*p,this._y=(s+o)/p,this._z=(r+l)/p}else if(a>u){let p=2*Math.sqrt(1+a-i-u);this._w=(r-l)/p,this._x=(s+o)/p,this._y=.25*p,this._z=(c+h)/p}else{let p=2*Math.sqrt(1+u-i-a);this._w=(o-s)/p,this._x=(r+l)/p,this._y=(c+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<Number.EPSILON?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ze(this.dot(t),-1,1)))}rotateTowards(t,e){let i=this.angleTo(t);if(i===0)return this;let s=Math.min(1,e/i);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let i=t._x,s=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=i*h+o*a+s*l-r*c,this._y=s*h+o*c+r*a-i*l,this._z=r*h+o*l+i*c-s*a,this._w=o*h-i*a-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let i=this._x,s=this._y,r=this._z,o=this._w,a=o*t._w+i*t._x+s*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=i,this._y=s,this._z=r,this;let c=1-a*a;if(c<=Number.EPSILON){let p=1-e;return this._w=p*o+e*this._w,this._x=p*i+e*this._x,this._y=p*s+e*this._y,this._z=p*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,f=Math.sin(e*h)/l;return this._w=o*u+this._w*f,this._x=i*u+this._x*f,this._y=s*u+this._y*f,this._z=r*u+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){let t=Math.random(),e=Math.sqrt(1-t),i=Math.sqrt(t),s=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(s),i*Math.sin(r),i*Math.cos(r),e*Math.sin(s))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class n{constructor(t=0,e=0,i=0){n.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Pf.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Pf.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*i+r[6]*s,this.y=r[1]*e+r[4]*i+r[7]*s,this.z=r[2]*e+r[5]*i+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,i=this.y,s=this.z,r=t.elements,o=1/(r[3]*e+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*i+r[8]*s+r[12])*o,this.y=(r[1]*e+r[5]*i+r[9]*s+r[13])*o,this.z=(r[2]*e+r[6]*i+r[10]*s+r[14])*o,this}applyQuaternion(t){let e=this.x,i=this.y,s=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*s-a*i),h=2*(a*e-r*s),u=2*(r*i-o*e);return this.x=e+c*l+o*u-a*h,this.y=i+c*h+a*l-r*u,this.z=s+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,i=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*i+r[8]*s,this.y=r[1]*e+r[5]*i+r[9]*s,this.z=r[2]*e+r[6]*i+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let i=this.length();return this.divideScalar(i||1).multiplyScalar(Math.max(t,Math.min(e,i)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let i=t.x,s=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=s*c-r*a,this.y=r*o-i*c,this.z=i*a-s*o,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return cl.copy(this).projectOnVector(t),this.sub(cl)}reflect(t){return this.sub(cl.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let i=this.dot(t)/e;return Math.acos(Ze(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,i=this.y-t.y,s=this.z-t.z;return e*e+i*i+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){let s=Math.sin(e)*t;return this.x=s*Math.sin(i),this.y=Math.cos(e)*t,this.z=s*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,i=Math.sqrt(1-t**2);return this.x=i*Math.cos(e),this.y=i*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},cl=new k,Pf=new zi,Xn=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(kn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(kn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let i=kn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let i=t.geometry;if(i!==void 0){let r=i.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,kn):kn.fromBufferAttribute(r,o),kn.applyMatrix4(t.matrixWorld),this.expandByPoint(kn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Qo.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Qo.copy(i.boundingBox)),Qo.applyMatrix4(t.matrixWorld),this.union(Qo)}let s=t.children;for(let r=0,o=s.length;r<o;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,kn),kn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Fr),ta.subVectors(this.max,Fr),Us.subVectors(t.a,Fr),Ns.subVectors(t.b,Fr),zs.subVectors(t.c,Fr),Si.subVectors(Ns,Us),wi.subVectors(zs,Ns),ji.subVectors(Us,zs);let e=[0,-Si.z,Si.y,0,-wi.z,wi.y,0,-ji.z,ji.y,Si.z,0,-Si.x,wi.z,0,-wi.x,ji.z,0,-ji.x,-Si.y,Si.x,0,-wi.y,wi.x,0,-ji.y,ji.x,0];return!ll(e,Us,Ns,zs,ta)||(e=[1,0,0,0,1,0,0,0,1],!ll(e,Us,Ns,zs,ta))?!1:(ea.crossVectors(Si,wi),e=[ea.x,ea.y,ea.z],ll(e,Us,Ns,zs,ta))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,kn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(kn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(ii),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},ii=[new k,new k,new k,new k,new k,new k,new k,new k],kn=new k,Qo=new Xn,Us=new k,Ns=new k,zs=new k,Si=new k,wi=new k,ji=new k,Fr=new k,ta=new k,ea=new k,Qi=new k;function ll(n,t,e,i,s){for(let r=0,o=n.length-3;r<=o;r+=3){Qi.fromArray(n,r);let a=s.x*Math.abs(Qi.x)+s.y*Math.abs(Qi.y)+s.z*Math.abs(Qi.z),c=t.dot(Qi),l=e.dot(Qi),h=i.dot(Qi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}var Ox=new Xn,Br=new k,hl=new k,Oi=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let i=this.center;e!==void 0?i.copy(e):Ox.setFromPoints(t).getCenter(i);let s=0;for(let r=0,o=t.length;r<o;r++)s=Math.max(s,i.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Br.subVectors(t,this.center);let e=Br.lengthSq();if(e>this.radius*this.radius){let i=Math.sqrt(e),s=(i-this.radius)*.5;this.center.addScaledVector(Br,s/i),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(hl.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Br.copy(t.center).add(hl)),this.expandByPoint(Br.copy(t.center).sub(hl))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},si=new k,ul=new k,na=new k,Ti=new k,fl=new k,ia=new k,dl=new k,to=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,si)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=si.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(si.copy(this.origin).addScaledVector(this.direction,e),si.distanceToSquared(t))}distanceSqToSegment(t,e,i,s){ul.copy(t).add(e).multiplyScalar(.5),na.copy(e).sub(t).normalize(),Ti.copy(this.origin).sub(ul);let r=t.distanceTo(e)*.5,o=-this.direction.dot(na),a=Ti.dot(this.direction),c=-Ti.dot(na),l=Ti.lengthSq(),h=Math.abs(1-o*o),u,f,p,x;if(h>0)if(u=o*c-a,f=o*a-c,x=r*h,u>=0)if(f>=-x)if(f<=x){let g=1/h;u*=g,f*=g,p=u*(u+o*f+2*a)+f*(o*u+f+2*c)+l}else f=r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f=-r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;else f<=-x?(u=Math.max(0,-(-o*r+a)),f=u>0?-r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l):f<=x?(u=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(u=Math.max(0,-(o*r+a)),f=u>0?r:Math.min(Math.max(-r,-c),r),p=-u*u+f*(f+2*c)+l);else f=o>0?-r:r,u=Math.max(0,-(o*f+a)),p=-u*u+f*(f+2*c)+l;return i&&i.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(ul).addScaledVector(na,f),p}intersectSphere(t,e){si.subVectors(t.center,this.origin);let i=si.dot(this.direction),s=si.dot(si)-i*i,r=t.radius*t.radius;if(s>r)return null;let o=Math.sqrt(r-s),a=i-o,c=i+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){let i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,s,r,o,a,c,l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,f=this.origin;return l>=0?(i=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(i=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),h>=0?(r=(t.min.y-f.y)*h,o=(t.max.y-f.y)*h):(r=(t.max.y-f.y)*h,o=(t.min.y-f.y)*h),i>o||r>s||((r>i||isNaN(i))&&(i=r),(o<s||isNaN(s))&&(s=o),u>=0?(a=(t.min.z-f.z)*u,c=(t.max.z-f.z)*u):(a=(t.max.z-f.z)*u,c=(t.min.z-f.z)*u),i>c||a>s)||((a>i||i!==i)&&(i=a),(c<s||s!==s)&&(s=c),s<0)?null:this.at(i>=0?i:s,e)}intersectsBox(t){return this.intersectBox(t,si)!==null}intersectTriangle(t,e,i,s,r){fl.subVectors(e,t),ia.subVectors(i,t),dl.crossVectors(fl,ia);let o=this.direction.dot(dl),a;if(o>0){if(s)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Ti.subVectors(this.origin,t);let c=a*this.direction.dot(ia.crossVectors(Ti,ia));if(c<0)return null;let l=a*this.direction.dot(fl.cross(Ti));if(l<0||c+l>o)return null;let h=-a*Ti.dot(dl);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ve=class n{constructor(t,e,i,s,r,o,a,c,l,h,u,f,p,x,g,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,s,r,o,a,c,l,h,u,f,p,x,g,m)}set(t,e,i,s,r,o,a,c,l,h,u,f,p,x,g,m){let d=this.elements;return d[0]=t,d[4]=e,d[8]=i,d[12]=s,d[1]=r,d[5]=o,d[9]=a,d[13]=c,d[2]=l,d[6]=h,d[10]=u,d[14]=f,d[3]=p,d[7]=x,d[11]=g,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(t){let e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){let e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,i=t.elements,s=1/Os.setFromMatrixColumn(t,0).length(),r=1/Os.setFromMatrixColumn(t,1).length(),o=1/Os.setFromMatrixColumn(t,2).length();return e[0]=i[0]*s,e[1]=i[1]*s,e[2]=i[2]*s,e[3]=0,e[4]=i[4]*r,e[5]=i[5]*r,e[6]=i[6]*r,e[7]=0,e[8]=i[8]*o,e[9]=i[9]*o,e[10]=i[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,i=t.x,s=t.y,r=t.z,o=Math.cos(i),a=Math.sin(i),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){let f=o*h,p=o*u,x=a*h,g=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=p+x*l,e[5]=f-g*l,e[9]=-a*c,e[2]=g-f*l,e[6]=x+p*l,e[10]=o*c}else if(t.order==="YXZ"){let f=c*h,p=c*u,x=l*h,g=l*u;e[0]=f+g*a,e[4]=x*a-p,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=p*a-x,e[6]=g+f*a,e[10]=o*c}else if(t.order==="ZXY"){let f=c*h,p=c*u,x=l*h,g=l*u;e[0]=f-g*a,e[4]=-o*u,e[8]=x+p*a,e[1]=p+x*a,e[5]=o*h,e[9]=g-f*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){let f=o*h,p=o*u,x=a*h,g=a*u;e[0]=c*h,e[4]=x*l-p,e[8]=f*l+g,e[1]=c*u,e[5]=g*l+f,e[9]=p*l-x,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){let f=o*c,p=o*l,x=a*c,g=a*l;e[0]=c*h,e[4]=g-f*u,e[8]=x*u+p,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=p*u+x,e[10]=f-g*u}else if(t.order==="XZY"){let f=o*c,p=o*l,x=a*c,g=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=f*u+g,e[5]=o*h,e[9]=p*u-x,e[2]=x*u-p,e[6]=a*h,e[10]=g*u+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Fx,t,Bx)}lookAt(t,e,i){let s=this.elements;return _n.subVectors(t,e),_n.lengthSq()===0&&(_n.z=1),_n.normalize(),Ai.crossVectors(i,_n),Ai.lengthSq()===0&&(Math.abs(i.z)===1?_n.x+=1e-4:_n.z+=1e-4,_n.normalize(),Ai.crossVectors(i,_n)),Ai.normalize(),sa.crossVectors(_n,Ai),s[0]=Ai.x,s[4]=sa.x,s[8]=_n.x,s[1]=Ai.y,s[5]=sa.y,s[9]=_n.y,s[2]=Ai.z,s[6]=sa.z,s[10]=_n.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let i=t.elements,s=e.elements,r=this.elements,o=i[0],a=i[4],c=i[8],l=i[12],h=i[1],u=i[5],f=i[9],p=i[13],x=i[2],g=i[6],m=i[10],d=i[14],_=i[3],y=i[7],v=i[11],E=i[15],S=s[0],w=s[4],R=s[8],b=s[12],M=s[1],A=s[5],I=s[9],z=s[13],P=s[2],D=s[6],N=s[10],H=s[14],G=s[3],V=s[7],O=s[11],B=s[15];return r[0]=o*S+a*M+c*P+l*G,r[4]=o*w+a*A+c*D+l*V,r[8]=o*R+a*I+c*N+l*O,r[12]=o*b+a*z+c*H+l*B,r[1]=h*S+u*M+f*P+p*G,r[5]=h*w+u*A+f*D+p*V,r[9]=h*R+u*I+f*N+p*O,r[13]=h*b+u*z+f*H+p*B,r[2]=x*S+g*M+m*P+d*G,r[6]=x*w+g*A+m*D+d*V,r[10]=x*R+g*I+m*N+d*O,r[14]=x*b+g*z+m*H+d*B,r[3]=_*S+y*M+v*P+E*G,r[7]=_*w+y*A+v*D+E*V,r[11]=_*R+y*I+v*N+E*O,r[15]=_*b+y*z+v*H+E*B,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],i=t[4],s=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],f=t[10],p=t[14],x=t[3],g=t[7],m=t[11],d=t[15];return x*(+r*c*u-s*l*u-r*a*f+i*l*f+s*a*p-i*c*p)+g*(+e*c*p-e*l*f+r*o*f-s*o*p+s*l*h-r*c*h)+m*(+e*l*u-e*a*p-r*o*u+i*o*p+r*a*h-i*l*h)+d*(-s*a*h-e*c*u+e*a*f+s*o*u-i*o*f+i*c*h)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=i),this}invert(){let t=this.elements,e=t[0],i=t[1],s=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],f=t[10],p=t[11],x=t[12],g=t[13],m=t[14],d=t[15],_=u*m*l-g*f*l+g*c*p-a*m*p-u*c*d+a*f*d,y=x*f*l-h*m*l-x*c*p+o*m*p+h*c*d-o*f*d,v=h*g*l-x*u*l+x*a*p-o*g*p-h*a*d+o*u*d,E=x*u*c-h*g*c-x*a*f+o*g*f+h*a*m-o*u*m,S=e*_+i*y+s*v+r*E;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let w=1/S;return t[0]=_*w,t[1]=(g*f*r-u*m*r-g*s*p+i*m*p+u*s*d-i*f*d)*w,t[2]=(a*m*r-g*c*r+g*s*l-i*m*l-a*s*d+i*c*d)*w,t[3]=(u*c*r-a*f*r-u*s*l+i*f*l+a*s*p-i*c*p)*w,t[4]=y*w,t[5]=(h*m*r-x*f*r+x*s*p-e*m*p-h*s*d+e*f*d)*w,t[6]=(x*c*r-o*m*r-x*s*l+e*m*l+o*s*d-e*c*d)*w,t[7]=(o*f*r-h*c*r+h*s*l-e*f*l-o*s*p+e*c*p)*w,t[8]=v*w,t[9]=(x*u*r-h*g*r-x*i*p+e*g*p+h*i*d-e*u*d)*w,t[10]=(o*g*r-x*a*r+x*i*l-e*g*l-o*i*d+e*a*d)*w,t[11]=(h*a*r-o*u*r-h*i*l+e*u*l+o*i*p-e*a*p)*w,t[12]=E*w,t[13]=(h*g*s-x*u*s+x*i*f-e*g*f-h*i*m+e*u*m)*w,t[14]=(x*a*s-o*g*s-x*i*c+e*g*c+o*i*m-e*a*m)*w,t[15]=(o*u*s-h*a*s+h*i*c-e*u*c-o*i*f+e*a*f)*w,this}scale(t){let e=this.elements,i=t.x,s=t.y,r=t.z;return e[0]*=i,e[4]*=s,e[8]*=r,e[1]*=i,e[5]*=s,e[9]*=r,e[2]*=i,e[6]*=s,e[10]*=r,e[3]*=i,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,s))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let i=Math.cos(e),s=Math.sin(e),r=1-i,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+i,l*a-s*c,l*c+s*a,0,l*a+s*c,h*a+i,h*c-s*o,0,l*c-s*a,h*c+s*o,r*c*c+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,s,r,o){return this.set(1,i,r,0,t,1,o,0,e,s,1,0,0,0,0,1),this}compose(t,e,i){let s=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,f=r*l,p=r*h,x=r*u,g=o*h,m=o*u,d=a*u,_=c*l,y=c*h,v=c*u,E=i.x,S=i.y,w=i.z;return s[0]=(1-(g+d))*E,s[1]=(p+v)*E,s[2]=(x-y)*E,s[3]=0,s[4]=(p-v)*S,s[5]=(1-(f+d))*S,s[6]=(m+_)*S,s[7]=0,s[8]=(x+y)*w,s[9]=(m-_)*w,s[10]=(1-(f+g))*w,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,i){let s=this.elements,r=Os.set(s[0],s[1],s[2]).length(),o=Os.set(s[4],s[5],s[6]).length(),a=Os.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],Hn.copy(this);let l=1/r,h=1/o,u=1/a;return Hn.elements[0]*=l,Hn.elements[1]*=l,Hn.elements[2]*=l,Hn.elements[4]*=h,Hn.elements[5]*=h,Hn.elements[6]*=h,Hn.elements[8]*=u,Hn.elements[9]*=u,Hn.elements[10]*=u,e.setFromRotationMatrix(Hn),i.x=r,i.y=o,i.z=a,this}makePerspective(t,e,i,s,r,o,a=hi){let c=this.elements,l=2*r/(e-t),h=2*r/(i-s),u=(e+t)/(e-t),f=(i+s)/(i-s),p,x;if(a===hi)p=-(o+r)/(o-r),x=-2*o*r/(o-r);else if(a===Ia)p=-o/(o-r),x=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,s,r,o,a=hi){let c=this.elements,l=1/(e-t),h=1/(i-s),u=1/(o-r),f=(e+t)*l,p=(i+s)*h,x,g;if(a===hi)x=(o+r)*u,g=-2*u;else if(a===Ia)x=r*u,g=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-p,c[2]=0,c[6]=0,c[10]=g,c[14]=-x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,i=t.elements;for(let s=0;s<16;s++)if(e[s]!==i[s])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){let i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}},Os=new k,Hn=new ve,Fx=new k(0,0,0),Bx=new k(1,1,1),Ai=new k,sa=new k,_n=new k,If=new ve,Lf=new zi,Oa=class n{constructor(t=0,e=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,s=this._order){return this._x=t,this._y=e,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){let s=t.elements,r=s[0],o=s[4],a=s[8],c=s[1],l=s[5],h=s[9],u=s[2],f=s[6],p=s[10];switch(e){case"XYZ":this._y=Math.asin(Ze(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ze(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ze(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Ze(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Ze(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,p));break;case"XZY":this._z=Math.asin(-Ze(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return If.makeRotationFromQuaternion(t),this.setFromRotationMatrix(If,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Lf.setFromEuler(this),this.setFromQuaternion(Lf,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Oa.DEFAULT_ORDER="XYZ";var eo=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},kx=0,Df=new k,Fs=new zi,ri=new ve,ra=new k,kr=new k,Hx=new k,Gx=new zi,Uf=new k(1,0,0),Nf=new k(0,1,0),zf=new k(0,0,1),Vx={type:"added"},Wx={type:"removed"},ke=class n extends Ni{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kx++}),this.uuid=ds(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let t=new k,e=new Oa,i=new zi,s=new k(1,1,1);function r(){i.setFromEuler(e,!1)}function o(){e.setFromQuaternion(i,void 0,!1)}e._onChange(r),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ve},normalMatrix:{value:new oe}}),this.matrix=new ve,this.matrixWorld=new ve,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new eo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Fs.setFromAxisAngle(t,e),this.quaternion.multiply(Fs),this}rotateOnWorldAxis(t,e){return Fs.setFromAxisAngle(t,e),this.quaternion.premultiply(Fs),this}rotateX(t){return this.rotateOnAxis(Uf,t)}rotateY(t){return this.rotateOnAxis(Nf,t)}rotateZ(t){return this.rotateOnAxis(zf,t)}translateOnAxis(t,e){return Df.copy(t).applyQuaternion(this.quaternion),this.position.add(Df.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Uf,t)}translateY(t){return this.translateOnAxis(Nf,t)}translateZ(t){return this.translateOnAxis(zf,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?ra.copy(t):ra.set(t,e,i);let s=this.parent;this.updateWorldMatrix(!0,!1),kr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(kr,ra,this.up):ri.lookAt(ra,kr,this.up),this.quaternion.setFromRotationMatrix(ri),s&&(ri.extractRotation(s.matrixWorld),Fs.setFromRotationMatrix(ri),this.quaternion.premultiply(Fs.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Vx)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wx)),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ri.multiply(t.parent.matrixWorld)),t.applyMatrix4(ri),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,s=this.children.length;i<s;i++){let o=this.children[i].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);let s=this.children;for(let r=0,o=s.length;r<o;r++)s[r].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,t,Hx),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(kr,Gx,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let i=0,s=e.length;i<s;i++)e[i].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let i=0,s=e.length;i<s;i++){let r=e[i];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){let i=this.parent;if(t===!0&&i!==null&&i.matrixWorldAutoUpdate===!0&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){let s=this.children;for(let r=0,o=s.length;r<o;r++){let a=s[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){let e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),s.maxGeometryCount=this._maxGeometryCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){let u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));s.material=a}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let a=0;a<this.children.length;a++)s.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let a=0;a<this.animations.length;a++){let c=this.animations[a];s.animations.push(r(t.animations,c))}}if(e){let a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),f=o(t.skeletons),p=o(t.animations),x=o(t.nodes);a.length>0&&(i.geometries=a),c.length>0&&(i.materials=c),l.length>0&&(i.textures=l),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),f.length>0&&(i.skeletons=f),p.length>0&&(i.animations=p),x.length>0&&(i.nodes=x)}return i.object=s,i;function o(a){let c=[];for(let l in a){let h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){let s=t.children[i];this.add(s.clone())}return this}};ke.DEFAULT_UP=new k(0,1,0);ke.DEFAULT_MATRIX_AUTO_UPDATE=!0;ke.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gn=new k,oi=new k,pl=new k,ai=new k,Bs=new k,ks=new k,Of=new k,ml=new k,gl=new k,xl=new k,oa=!1,Js=class n{constructor(t=new k,e=new k,i=new k){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,s){s.subVectors(i,e),Gn.subVectors(t,e),s.cross(Gn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,i,s,r){Gn.subVectors(s,e),oi.subVectors(i,e),pl.subVectors(t,e);let o=Gn.dot(Gn),a=Gn.dot(oi),c=Gn.dot(pl),l=oi.dot(oi),h=oi.dot(pl),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;let f=1/u,p=(l*c-a*h)*f,x=(o*h-a*c)*f;return r.set(1-p-x,x,p)}static containsPoint(t,e,i,s){return this.getBarycoord(t,e,i,s,ai)===null?!1:ai.x>=0&&ai.y>=0&&ai.x+ai.y<=1}static getUV(t,e,i,s,r,o,a,c){return oa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),oa=!0),this.getInterpolation(t,e,i,s,r,o,a,c)}static getInterpolation(t,e,i,s,r,o,a,c){return this.getBarycoord(t,e,i,s,ai)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,ai.x),c.addScaledVector(o,ai.y),c.addScaledVector(a,ai.z),c)}static isFrontFacing(t,e,i,s){return Gn.subVectors(i,e),oi.subVectors(t,e),Gn.cross(oi).dot(s)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,s){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,i,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Gn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Gn.cross(oi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return n.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return n.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,i,s,r){return oa===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),oa=!0),n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}getInterpolation(t,e,i,s,r){return n.getInterpolation(t,this.a,this.b,this.c,e,i,s,r)}containsPoint(t){return n.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return n.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let i=this.a,s=this.b,r=this.c,o,a;Bs.subVectors(s,i),ks.subVectors(r,i),ml.subVectors(t,i);let c=Bs.dot(ml),l=ks.dot(ml);if(c<=0&&l<=0)return e.copy(i);gl.subVectors(t,s);let h=Bs.dot(gl),u=ks.dot(gl);if(h>=0&&u<=h)return e.copy(s);let f=c*u-h*l;if(f<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(i).addScaledVector(Bs,o);xl.subVectors(t,r);let p=Bs.dot(xl),x=ks.dot(xl);if(x>=0&&p<=x)return e.copy(r);let g=p*l-c*x;if(g<=0&&l>=0&&x<=0)return a=l/(l-x),e.copy(i).addScaledVector(ks,a);let m=h*x-p*u;if(m<=0&&u-h>=0&&p-x>=0)return Of.subVectors(r,s),a=(u-h)/(u-h+(p-x)),e.copy(s).addScaledVector(Of,a);let d=1/(m+g+f);return o=g*d,a=f*d,e.copy(i).addScaledVector(Bs,o).addScaledVector(ks,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},Fd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ri={h:0,s:0,l:0},aa={h:0,s:0,l:0};function _l(n,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?n+(t-n)*6*e:e<1/2?t:e<2/3?n+(t-n)*6*(2/3-e):n}var gt=class{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$e){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,xe.toWorkingColorSpace(this,e),this}setRGB(t,e,i,s=xe.workingColorSpace){return this.r=t,this.g=e,this.b=i,xe.toWorkingColorSpace(this,s),this}setHSL(t,e,i,s=xe.workingColorSpace){if(t=Ph(t,1),e=Ze(e,0,1),i=Ze(i,0,1),e===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+e):i+e-i*e,o=2*i-r;this.r=_l(o,r,t+1/3),this.g=_l(o,r,t),this.b=_l(o,r,t-1/3)}return xe.toWorkingColorSpace(this,s),this}setStyle(t,e=$e){function i(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,o=s[1],a=s[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$e){let i=Fd[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=er(t.r),this.g=er(t.g),this.b=er(t.b),this}copyLinearToSRGB(t){return this.r=ol(t.r),this.g=ol(t.g),this.b=ol(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$e){return xe.fromWorkingColorSpace(rn.copy(this),t),Math.round(Ze(rn.r*255,0,255))*65536+Math.round(Ze(rn.g*255,0,255))*256+Math.round(Ze(rn.b*255,0,255))}getHexString(t=$e){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=xe.workingColorSpace){xe.fromWorkingColorSpace(rn.copy(this),e);let i=rn.r,s=rn.g,r=rn.b,o=Math.max(i,s,r),a=Math.min(i,s,r),c,l,h=(a+o)/2;if(a===o)c=0,l=0;else{let u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case i:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-i)/u+2;break;case r:c=(i-s)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=xe.workingColorSpace){return xe.fromWorkingColorSpace(rn.copy(this),e),t.r=rn.r,t.g=rn.g,t.b=rn.b,t}getStyle(t=$e){xe.fromWorkingColorSpace(rn.copy(this),t);let e=rn.r,i=rn.g,s=rn.b;return t!==$e?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(t,e,i){return this.getHSL(Ri),this.setHSL(Ri.h+t,Ri.s+e,Ri.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ri),t.getHSL(aa);let i=Xr(Ri.h,aa.h,e),s=Xr(Ri.s,aa.s,e),r=Xr(Ri.l,aa.l,e);return this.setHSL(i,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,i=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*i+r[6]*s,this.g=r[1]*e+r[4]*i+r[7]*s,this.b=r[2]*e+r[5]*i+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},rn=new gt;gt.NAMES=Fd;var Xx=0,Fi=class extends Ni{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xx++}),this.uuid=ds(),this.name="",this.type="Material",this.blending=tr,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ll,this.blendDst=Dl,this.blendEquation=is,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new gt(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ef,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ls,this.stencilZFail=Ls,this.stencilZPass=Ls,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[e]=i}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let i={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==tr&&(i.blending=this.blending),this.side!==Ui&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Ll&&(i.blendSrc=this.blendSrc),this.blendDst!==Dl&&(i.blendDst=this.blendDst),this.blendEquation!==is&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ef&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ls&&(i.stencilFail=this.stencilFail),this.stencilZFail!==Ls&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==Ls&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let o=[];for(let a in r){let c=r[a];delete c.metadata,o.push(c)}return o}if(e){let r=s(t.textures),o=s(t.images);r.length>0&&(i.textures=r),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,i=null;if(e!==null){let s=e.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=e[r].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}},Be=class extends Fi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new gt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=wd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var Fe=new k,ca=new Tt,Ue=class{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Sf,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[i+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)ca.fromBufferAttribute(this,e),ca.applyMatrix3(t),this.setXY(e,ca.x,ca.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix3(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyMatrix4(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.applyNormalMatrix(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Fe.fromBufferAttribute(this,e),Fe.transformDirection(t),this.setXYZ(e,Fe.x,Fe.y,Fe.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=Zs(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=cn(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Zs(e,this.array)),e}setX(t,e){return this.normalized&&(e=cn(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Zs(e,this.array)),e}setY(t,e){return this.normalized&&(e=cn(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Zs(e,this.array)),e}setZ(t,e){return this.normalized&&(e=cn(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Zs(e,this.array)),e}setW(t,e){return this.normalized&&(e=cn(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=cn(e,this.array),i=cn(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,s){return t*=this.itemSize,this.normalized&&(e=cn(e,this.array),i=cn(i,this.array),s=cn(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this}setXYZW(t,e,i,s,r){return t*=this.itemSize,this.normalized&&(e=cn(e,this.array),i=cn(i,this.array),s=cn(s,this.array),r=cn(r,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Sf&&(t.usage=this.usage),t}};var Fa=class extends Ue{constructor(t,e,i){super(new Uint16Array(t),e,i)}};var Ba=class extends Ue{constructor(t,e,i){super(new Uint32Array(t),e,i)}};var qt=class extends Ue{constructor(t,e,i){super(new Float32Array(t),e,i)}};var qx=0,Pn=new ve,yl=new ke,Hs=new k,yn=new Xn,Hr=new Xn,Ye=new k,ae=class n extends Ni{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qx++}),this.uuid=ds(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Od(t)?Ba:Fa)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new oe().getNormalMatrix(t);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Pn.makeRotationFromQuaternion(t),this.applyMatrix4(Pn),this}rotateX(t){return Pn.makeRotationX(t),this.applyMatrix4(Pn),this}rotateY(t){return Pn.makeRotationY(t),this.applyMatrix4(Pn),this}rotateZ(t){return Pn.makeRotationZ(t),this.applyMatrix4(Pn),this}translate(t,e,i){return Pn.makeTranslation(t,e,i),this.applyMatrix4(Pn),this}scale(t,e,i){return Pn.makeScale(t,e,i),this.applyMatrix4(Pn),this}lookAt(t){return yl.lookAt(t),yl.updateMatrix(),this.applyMatrix4(yl.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Hs).negate(),this.translate(Hs.x,Hs.y,Hs.z),this}setFromPoints(t){let e=[];for(let i=0,s=t.length;i<s;i++){let r=t[i];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new qt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Xn);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,s=e.length;i<s;i++){let r=e[i];yn.setFromBufferAttribute(r),this.morphTargetsRelative?(Ye.addVectors(this.boundingBox.min,yn.min),this.boundingBox.expandByPoint(Ye),Ye.addVectors(this.boundingBox.max,yn.max),this.boundingBox.expandByPoint(Ye)):(this.boundingBox.expandByPoint(yn.min),this.boundingBox.expandByPoint(yn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Oi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new k,1/0);return}if(t){let i=this.boundingSphere.center;if(yn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){let a=e[r];Hr.setFromBufferAttribute(a),this.morphTargetsRelative?(Ye.addVectors(yn.min,Hr.min),yn.expandByPoint(Ye),Ye.addVectors(yn.max,Hr.max),yn.expandByPoint(Ye)):(yn.expandByPoint(Hr.min),yn.expandByPoint(Hr.max))}yn.getCenter(i);let s=0;for(let r=0,o=t.count;r<o;r++)Ye.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Ye));if(e)for(let r=0,o=e.length;r<o;r++){let a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ye.fromBufferAttribute(a,l),c&&(Hs.fromBufferAttribute(t,l),Ye.add(Hs)),s=Math.max(s,i.distanceToSquared(Ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.array,s=e.position.array,r=e.normal.array,o=e.uv.array,a=s.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ue(new Float32Array(4*a),4));let c=this.getAttribute("tangent").array,l=[],h=[];for(let M=0;M<a;M++)l[M]=new k,h[M]=new k;let u=new k,f=new k,p=new k,x=new Tt,g=new Tt,m=new Tt,d=new k,_=new k;function y(M,A,I){u.fromArray(s,M*3),f.fromArray(s,A*3),p.fromArray(s,I*3),x.fromArray(o,M*2),g.fromArray(o,A*2),m.fromArray(o,I*2),f.sub(u),p.sub(u),g.sub(x),m.sub(x);let z=1/(g.x*m.y-m.x*g.y);isFinite(z)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-g.y).multiplyScalar(z),_.copy(p).multiplyScalar(g.x).addScaledVector(f,-m.x).multiplyScalar(z),l[M].add(d),l[A].add(d),l[I].add(d),h[M].add(_),h[A].add(_),h[I].add(_))}let v=this.groups;v.length===0&&(v=[{start:0,count:i.length}]);for(let M=0,A=v.length;M<A;++M){let I=v[M],z=I.start,P=I.count;for(let D=z,N=z+P;D<N;D+=3)y(i[D+0],i[D+1],i[D+2])}let E=new k,S=new k,w=new k,R=new k;function b(M){w.fromArray(r,M*3),R.copy(w);let A=l[M];E.copy(A),E.sub(w.multiplyScalar(w.dot(A))).normalize(),S.crossVectors(R,A);let z=S.dot(h[M])<0?-1:1;c[M*4]=E.x,c[M*4+1]=E.y,c[M*4+2]=E.z,c[M*4+3]=z}for(let M=0,A=v.length;M<A;++M){let I=v[M],z=I.start,P=I.count;for(let D=z,N=z+P;D<N;D+=3)b(i[D+0]),b(i[D+1]),b(i[D+2])}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Ue(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let f=0,p=i.count;f<p;f++)i.setXYZ(f,0,0,0);let s=new k,r=new k,o=new k,a=new k,c=new k,l=new k,h=new k,u=new k;if(t)for(let f=0,p=t.count;f<p;f+=3){let x=t.getX(f+0),g=t.getX(f+1),m=t.getX(f+2);s.fromBufferAttribute(e,x),r.fromBufferAttribute(e,g),o.fromBufferAttribute(e,m),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),a.fromBufferAttribute(i,x),c.fromBufferAttribute(i,g),l.fromBufferAttribute(i,m),a.add(h),c.add(h),l.add(h),i.setXYZ(x,a.x,a.y,a.z),i.setXYZ(g,c.x,c.y,c.z),i.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),o.fromBufferAttribute(e,f+2),h.subVectors(o,r),u.subVectors(s,r),h.cross(u),i.setXYZ(f+0,h.x,h.y,h.z),i.setXYZ(f+1,h.x,h.y,h.z),i.setXYZ(f+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Ye.fromBufferAttribute(t,e),Ye.normalize(),t.setXYZ(e,Ye.x,Ye.y,Ye.z)}toNonIndexed(){function t(a,c){let l=a.array,h=a.itemSize,u=a.normalized,f=new l.constructor(c.length*h),p=0,x=0;for(let g=0,m=c.length;g<m;g++){a.isInterleavedBufferAttribute?p=c[g]*a.data.stride+a.offset:p=c[g]*h;for(let d=0;d<h;d++)f[x++]=l[p++]}return new Ue(f,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new n,i=this.index.array,s=this.attributes;for(let a in s){let c=s[a],l=t(c,i);e.setAttribute(a,l)}let r=this.morphAttributes;for(let a in r){let c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){let f=l[h],p=t(f,i);c.push(p)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,c=o.length;a<c;a++){let l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let i=this.attributes;for(let c in i){let l=i[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],h=[];for(let u=0,f=l.length;u<f;u++){let p=l[u];h.push(p.toJSON(t.data))}h.length>0&&(s[c]=h,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let i=t.index;i!==null&&this.setIndex(i.clone(e));let s=t.attributes;for(let l in s){let h=s[l];this.setAttribute(l,h.clone(e))}let r=t.morphAttributes;for(let l in r){let h=[],u=r[l];for(let f=0,p=u.length;f<p;f++)h.push(u[f].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;let o=t.groups;for(let l=0,h=o.length;l<h;l++){let u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}let a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ff=new ve,ts=new to,la=new Oi,Bf=new k,Gs=new k,Vs=new k,Ws=new k,vl=new k,ha=new k,ua=new Tt,fa=new Tt,da=new Tt,kf=new k,Hf=new k,Gf=new k,pa=new k,ma=new k,Nt=class extends ke{constructor(t=new ae,e=new Be){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,o=i.morphTargetsRelative;e.fromBufferAttribute(s,t);let a=this.morphTargetInfluences;if(r&&a){ha.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let h=a[c],u=r[c];h!==0&&(vl.fromBufferAttribute(u,t),o?ha.addScaledVector(vl,h):ha.addScaledVector(vl.sub(e),h))}e.add(ha)}return e}raycast(t,e){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),la.copy(i.boundingSphere),la.applyMatrix4(r),ts.copy(t.ray).recast(t.near),!(la.containsPoint(ts.origin)===!1&&(ts.intersectSphere(la,Bf)===null||ts.origin.distanceToSquared(Bf)>(t.far-t.near)**2))&&(Ff.copy(r).invert(),ts.copy(t.ray).applyMatrix4(Ff),!(i.boundingBox!==null&&ts.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,ts)))}_computeIntersections(t,e,i){let s,r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,f=r.groups,p=r.drawRange;if(a!==null)if(Array.isArray(o))for(let x=0,g=f.length;x<g;x++){let m=f[x],d=o[m.materialIndex],_=Math.max(m.start,p.start),y=Math.min(a.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,E=y;v<E;v+=3){let S=a.getX(v),w=a.getX(v+1),R=a.getX(v+2);s=ga(this,d,t,i,l,h,u,S,w,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(a.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){let _=a.getX(m),y=a.getX(m+1),v=a.getX(m+2);s=ga(this,o,t,i,l,h,u,_,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(o))for(let x=0,g=f.length;x<g;x++){let m=f[x],d=o[m.materialIndex],_=Math.max(m.start,p.start),y=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let v=_,E=y;v<E;v+=3){let S=v,w=v+1,R=v+2;s=ga(this,d,t,i,l,h,u,S,w,R),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=m.materialIndex,e.push(s))}}else{let x=Math.max(0,p.start),g=Math.min(c.count,p.start+p.count);for(let m=x,d=g;m<d;m+=3){let _=m,y=m+1,v=m+2;s=ga(this,o,t,i,l,h,u,_,y,v),s&&(s.faceIndex=Math.floor(m/3),e.push(s))}}}};function Yx(n,t,e,i,s,r,o,a){let c;if(t.side===fn?c=i.intersectTriangle(o,r,s,!0,a):c=i.intersectTriangle(s,r,o,t.side===Ui,a),c===null)return null;ma.copy(a),ma.applyMatrix4(n.matrixWorld);let l=e.ray.origin.distanceTo(ma);return l<e.near||l>e.far?null:{distance:l,point:ma.clone(),object:n}}function ga(n,t,e,i,s,r,o,a,c,l){n.getVertexPosition(a,Gs),n.getVertexPosition(c,Vs),n.getVertexPosition(l,Ws);let h=Yx(n,t,e,i,Gs,Vs,Ws,pa);if(h){s&&(ua.fromBufferAttribute(s,a),fa.fromBufferAttribute(s,c),da.fromBufferAttribute(s,l),h.uv=Js.getInterpolation(pa,Gs,Vs,Ws,ua,fa,da,new Tt)),r&&(ua.fromBufferAttribute(r,a),fa.fromBufferAttribute(r,c),da.fromBufferAttribute(r,l),h.uv1=Js.getInterpolation(pa,Gs,Vs,Ws,ua,fa,da,new Tt),h.uv2=h.uv1),o&&(kf.fromBufferAttribute(o,a),Hf.fromBufferAttribute(o,c),Gf.fromBufferAttribute(o,l),h.normal=Js.getInterpolation(pa,Gs,Vs,Ws,kf,Hf,Gf,new k),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let u={a,b:c,c:l,normal:new k,materialIndex:0};Js.getNormal(Gs,Vs,Ws,u.normal),h.face=u}return h}var He=class n extends ae{constructor(t=1,e=1,i=1,s=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:s,heightSegments:r,depthSegments:o};let a=this;s=Math.floor(s),r=Math.floor(r),o=Math.floor(o);let c=[],l=[],h=[],u=[],f=0,p=0;x("z","y","x",-1,-1,i,e,t,o,r,0),x("z","y","x",1,-1,i,e,-t,o,r,1),x("x","z","y",1,1,t,i,e,s,o,2),x("x","z","y",1,-1,t,i,-e,s,o,3),x("x","y","z",1,-1,t,e,i,s,r,4),x("x","y","z",-1,-1,t,e,-i,s,r,5),this.setIndex(c),this.setAttribute("position",new qt(l,3)),this.setAttribute("normal",new qt(h,3)),this.setAttribute("uv",new qt(u,2));function x(g,m,d,_,y,v,E,S,w,R,b){let M=v/w,A=E/R,I=v/2,z=E/2,P=S/2,D=w+1,N=R+1,H=0,G=0,V=new k;for(let O=0;O<N;O++){let B=O*A-z;for(let j=0;j<D;j++){let Y=j*M-I;V[g]=Y*_,V[m]=B*y,V[d]=P,l.push(V.x,V.y,V.z),V[g]=0,V[m]=0,V[d]=S>0?1:-1,h.push(V.x,V.y,V.z),u.push(j/w),u.push(1-O/R),H+=1}}for(let O=0;O<R;O++)for(let B=0;B<w;B++){let j=f+B+D*O,Y=f+B+D*(O+1),rt=f+(B+1)+D*(O+1),at=f+(B+1)+D*O;c.push(j,Y,at),c.push(Y,rt,at),G+=6}a.addGroup(p,G,b),p+=G,f+=H}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function ar(n){let t={};for(let e in n){t[e]={};for(let i in n[e]){let s=n[e][i];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=s.clone():Array.isArray(s)?t[e][i]=s.slice():t[e][i]=s}}return t}function ln(n){let t={};for(let e=0;e<n.length;e++){let i=ar(n[e]);for(let s in i)t[s]=i[s]}return t}function $x(n){let t=[];for(let e=0;e<n.length;e++)t.push(n[e].clone());return t}function Bd(n){return n.getRenderTarget()===null?n.outputColorSpace:xe.workingColorSpace}var Zx={clone:ar,merge:ln},Jx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,di=class extends Fi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jx,this.fragmentShader=Kx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ar(t.uniforms),this.uniformsGroups=$x(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let o=this.uniforms[s].value;o&&o.isTexture?e.uniforms[s]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[s]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[s]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[s]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[s]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[s]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[s]={type:"m4",value:o.toArray()}:e.uniforms[s]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}},ka=class extends ke{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ve,this.projectionMatrix=new ve,this.projectionMatrixInverse=new ve,this.coordinateSystem=hi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},vn=class extends ka{constructor(t=50,e=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=Qr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(Wr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Qr*2*Math.atan(Math.tan(Wr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,i,s,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(Wr*.5*this.fov)/this.zoom,i=2*e,s=this.aspect*i,r=-.5*s,o=this.view;if(this.view!==null&&this.view.enabled){let c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*s/c,e-=o.offsetY*i/l,s*=o.width/c,i*=o.height/l}let a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-i,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Xs=-90,qs=1,Gl=class extends ke{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new vn(Xs,qs,t,e);s.layers=this.layers,this.add(s);let r=new vn(Xs,qs,t,e);r.layers=this.layers,this.add(r);let o=new vn(Xs,qs,t,e);o.layers=this.layers,this.add(o);let a=new vn(Xs,qs,t,e);a.layers=this.layers,this.add(a);let c=new vn(Xs,qs,t,e);c.layers=this.layers,this.add(c);let l=new vn(Xs,qs,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[i,s,r,o,a,c]=e;for(let l of e)this.remove(l);if(t===hi)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ia)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),f=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),x=t.xr.enabled;t.xr.enabled=!1;let g=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,s),t.render(e,r),t.setRenderTarget(i,1,s),t.render(e,o),t.setRenderTarget(i,2,s),t.render(e,a),t.setRenderTarget(i,3,s),t.render(e,c),t.setRenderTarget(i,4,s),t.render(e,l),i.texture.generateMipmaps=g,t.setRenderTarget(i,5,s),t.render(e,h),t.setRenderTarget(u,f,p),t.xr.enabled=x,i.texture.needsPMREMUpdate=!0}},Ha=class extends Ln{constructor(t,e,i,s,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:sr,super(t,e,i,s,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},Vl=class extends fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let i={width:t,height:t,depth:1},s=[i,i,i,i,i,i];e.encoding!==void 0&&(qr("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===as?$e:In),this.texture=new Ha(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:on}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new He(5,5,5),r=new di({name:"CubemapFromEquirect",uniforms:ar(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:fn,blending:Ii});r.uniforms.tEquirect.value=e;let o=new Nt(s,r),a=e.minFilter;return e.minFilter===Kr&&(e.minFilter=on),new Gl(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,i,s){let r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,i,s);t.setRenderTarget(r)}},Ml=new k,jx=new k,Qx=new oe,li=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,s){return this.normal.set(t,e,i),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){let s=Ml.subVectors(i,e).cross(jx.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let i=t.delta(Ml),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(i,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let i=e||Qx.getNormalMatrix(t),s=this.coplanarPoint(Ml).applyMatrix4(t),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},es=new Oi,xa=new k,no=class{constructor(t=new li,e=new li,i=new li,s=new li,r=new li,o=new li){this.planes=[t,e,i,s,r,o]}set(t,e,i,s,r,o){let a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(i),a[3].copy(s),a[4].copy(r),a[5].copy(o),this}copy(t){let e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=hi){let i=this.planes,s=t.elements,r=s[0],o=s[1],a=s[2],c=s[3],l=s[4],h=s[5],u=s[6],f=s[7],p=s[8],x=s[9],g=s[10],m=s[11],d=s[12],_=s[13],y=s[14],v=s[15];if(i[0].setComponents(c-r,f-l,m-p,v-d).normalize(),i[1].setComponents(c+r,f+l,m+p,v+d).normalize(),i[2].setComponents(c+o,f+h,m+x,v+_).normalize(),i[3].setComponents(c-o,f-h,m-x,v-_).normalize(),i[4].setComponents(c-a,f-u,m-g,v-y).normalize(),e===hi)i[5].setComponents(c+a,f+u,m+g,v+y).normalize();else if(e===Ia)i[5].setComponents(a,u,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),es.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),es.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(es)}intersectsSprite(t){return es.center.set(0,0,0),es.radius=.7071067811865476,es.applyMatrix4(t.matrixWorld),this.intersectsSphere(es)}intersectsSphere(t){let e=this.planes,i=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let i=0;i<6;i++){let s=e[i];if(xa.x=s.normal.x>0?t.max.x:t.min.x,xa.y=s.normal.y>0?t.max.y:t.min.y,xa.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(xa)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function kd(){let n=null,t=!1,e=null,i=null;function s(r,o){e(r,o),i=n.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(i=n.requestAnimationFrame(s),t=!0)},stop:function(){n.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){n=r}}}function t1(n,t){let e=t.isWebGL2,i=new WeakMap;function s(l,h){let u=l.array,f=l.usage,p=u.byteLength,x=n.createBuffer();n.bindBuffer(h,x),n.bufferData(h,u,f),l.onUploadCallback();let g;if(u instanceof Float32Array)g=n.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=n.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=n.UNSIGNED_SHORT;else if(u instanceof Int16Array)g=n.SHORT;else if(u instanceof Uint32Array)g=n.UNSIGNED_INT;else if(u instanceof Int32Array)g=n.INT;else if(u instanceof Int8Array)g=n.BYTE;else if(u instanceof Uint8Array)g=n.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)g=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:x,type:g,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:p}}function r(l,h,u){let f=h.array,p=h._updateRange,x=h.updateRanges;if(n.bindBuffer(u,l),p.count===-1&&x.length===0&&n.bufferSubData(u,0,f),x.length!==0){for(let g=0,m=x.length;g<m;g++){let d=x[g];e?n.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f,d.start,d.count):n.bufferSubData(u,d.start*f.BYTES_PER_ELEMENT,f.subarray(d.start,d.start+d.count))}h.clearUpdateRanges()}p.count!==-1&&(e?n.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):n.bufferSubData(u,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),i.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);let h=i.get(l);h&&(n.deleteBuffer(h.buffer),i.delete(l))}function c(l,h){if(l.isGLBufferAttribute){let f=i.get(l);(!f||f.version<l.version)&&i.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);let u=i.get(l);if(u===void 0)i.set(l,s(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}var Mn=class n extends ae{constructor(t=1,e=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:s};let r=t/2,o=e/2,a=Math.floor(i),c=Math.floor(s),l=a+1,h=c+1,u=t/a,f=e/c,p=[],x=[],g=[],m=[];for(let d=0;d<h;d++){let _=d*f-o;for(let y=0;y<l;y++){let v=y*u-r;x.push(v,-_,0),g.push(0,0,1),m.push(y/a),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let _=0;_<a;_++){let y=_+l*d,v=_+l*(d+1),E=_+1+l*(d+1),S=_+1+l*d;p.push(y,v,S),p.push(v,E,S)}this.setIndex(p),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.width,t.height,t.widthSegments,t.heightSegments)}},e1=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,n1=`#ifdef USE_ALPHAHASH
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
#endif`,i1=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,s1=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,r1=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,o1=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,a1=`#ifdef USE_AOMAP
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
#endif`,c1=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,l1=`#ifdef USE_BATCHING
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
#endif`,h1=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,u1=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,f1=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,d1=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,p1=`#ifdef USE_IRIDESCENCE
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
#endif`,m1=`#ifdef USE_BUMPMAP
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
#endif`,g1=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,x1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,_1=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,y1=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,v1=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,M1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,b1=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,E1=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,S1=`#define PI 3.141592653589793
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
} // validated`,w1=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,T1=`vec3 transformedNormal = objectNormal;
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
#endif`,A1=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,R1=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,C1=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,P1=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,I1="gl_FragColor = linearToOutputTexel( gl_FragColor );",L1=`
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
}`,D1=`#ifdef USE_ENVMAP
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
#endif`,U1=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,N1=`#ifdef USE_ENVMAP
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
#endif`,z1=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,O1=`#ifdef USE_ENVMAP
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
#endif`,F1=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,B1=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,k1=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H1=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,G1=`#ifdef USE_GRADIENTMAP
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
}`,V1=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,W1=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,X1=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,q1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Y1=`uniform bool receiveShadow;
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
#endif`,$1=`#ifdef USE_ENVMAP
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
#endif`,Z1=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,J1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,K1=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,j1=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Q1=`PhysicalMaterial material;
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
#endif`,t_=`struct PhysicalMaterial {
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
}`,e_=`
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
#endif`,n_=`#if defined( RE_IndirectDiffuse )
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
#endif`,i_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,s_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,r_=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,o_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,a_=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,c_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,l_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,h_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,u_=`#if defined( USE_POINTS_UV )
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
#endif`,f_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,d_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,p_=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,m_=`#ifdef USE_MORPHNORMALS
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
#endif`,g_=`#ifdef USE_MORPHTARGETS
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
#endif`,x_=`#ifdef USE_MORPHTARGETS
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
#endif`,__=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,y_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,v_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,M_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,b_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,E_=`#ifdef USE_NORMALMAP
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
#endif`,S_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,w_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,T_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,A_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,R_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,C_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,P_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,I_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,L_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,D_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,U_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,N_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,z_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,O_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,F_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,B_=`float getShadowMask() {
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
}`,k_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,H_=`#ifdef USE_SKINNING
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
#endif`,G_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,V_=`#ifdef USE_SKINNING
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
#endif`,W_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,X_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,q_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Y_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$_=`#ifdef USE_TRANSMISSION
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
#endif`,Z_=`#ifdef USE_TRANSMISSION
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
#endif`,J_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,K_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Q_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,ty=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ey=`uniform sampler2D t2D;
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
}`,ny=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,iy=`#ifdef ENVMAP_TYPE_CUBE
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
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ry=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,oy=`#include <common>
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
}`,ay=`#if DEPTH_PACKING == 3200
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
}`,cy=`#define DISTANCE
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
}`,ly=`#define DISTANCE
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
}`,hy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,uy=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,fy=`uniform float scale;
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
}`,dy=`uniform vec3 diffuse;
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
}`,py=`#include <common>
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
}`,my=`uniform vec3 diffuse;
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
}`,gy=`#define LAMBERT
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
}`,xy=`#define LAMBERT
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
}`,_y=`#define MATCAP
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
}`,yy=`#define MATCAP
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
}`,vy=`#define NORMAL
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
}`,My=`#define NORMAL
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
}`,by=`#define PHONG
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
}`,Ey=`#define PHONG
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
}`,Sy=`#define STANDARD
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
}`,wy=`#define STANDARD
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
}`,Ty=`#define TOON
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
}`,Ay=`#define TOON
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
}`,Ry=`uniform float size;
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
}`,Cy=`uniform vec3 diffuse;
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
}`,Py=`#include <common>
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
}`,Iy=`uniform vec3 color;
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
}`,Ly=`uniform float rotation;
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
}`,Dy=`uniform vec3 diffuse;
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
}`,se={alphahash_fragment:e1,alphahash_pars_fragment:n1,alphamap_fragment:i1,alphamap_pars_fragment:s1,alphatest_fragment:r1,alphatest_pars_fragment:o1,aomap_fragment:a1,aomap_pars_fragment:c1,batching_pars_vertex:l1,batching_vertex:h1,begin_vertex:u1,beginnormal_vertex:f1,bsdfs:d1,iridescence_fragment:p1,bumpmap_pars_fragment:m1,clipping_planes_fragment:g1,clipping_planes_pars_fragment:x1,clipping_planes_pars_vertex:_1,clipping_planes_vertex:y1,color_fragment:v1,color_pars_fragment:M1,color_pars_vertex:b1,color_vertex:E1,common:S1,cube_uv_reflection_fragment:w1,defaultnormal_vertex:T1,displacementmap_pars_vertex:A1,displacementmap_vertex:R1,emissivemap_fragment:C1,emissivemap_pars_fragment:P1,colorspace_fragment:I1,colorspace_pars_fragment:L1,envmap_fragment:D1,envmap_common_pars_fragment:U1,envmap_pars_fragment:N1,envmap_pars_vertex:z1,envmap_physical_pars_fragment:$1,envmap_vertex:O1,fog_vertex:F1,fog_pars_vertex:B1,fog_fragment:k1,fog_pars_fragment:H1,gradientmap_pars_fragment:G1,lightmap_fragment:V1,lightmap_pars_fragment:W1,lights_lambert_fragment:X1,lights_lambert_pars_fragment:q1,lights_pars_begin:Y1,lights_toon_fragment:Z1,lights_toon_pars_fragment:J1,lights_phong_fragment:K1,lights_phong_pars_fragment:j1,lights_physical_fragment:Q1,lights_physical_pars_fragment:t_,lights_fragment_begin:e_,lights_fragment_maps:n_,lights_fragment_end:i_,logdepthbuf_fragment:s_,logdepthbuf_pars_fragment:r_,logdepthbuf_pars_vertex:o_,logdepthbuf_vertex:a_,map_fragment:c_,map_pars_fragment:l_,map_particle_fragment:h_,map_particle_pars_fragment:u_,metalnessmap_fragment:f_,metalnessmap_pars_fragment:d_,morphcolor_vertex:p_,morphnormal_vertex:m_,morphtarget_pars_vertex:g_,morphtarget_vertex:x_,normal_fragment_begin:__,normal_fragment_maps:y_,normal_pars_fragment:v_,normal_pars_vertex:M_,normal_vertex:b_,normalmap_pars_fragment:E_,clearcoat_normal_fragment_begin:S_,clearcoat_normal_fragment_maps:w_,clearcoat_pars_fragment:T_,iridescence_pars_fragment:A_,opaque_fragment:R_,packing:C_,premultiplied_alpha_fragment:P_,project_vertex:I_,dithering_fragment:L_,dithering_pars_fragment:D_,roughnessmap_fragment:U_,roughnessmap_pars_fragment:N_,shadowmap_pars_fragment:z_,shadowmap_pars_vertex:O_,shadowmap_vertex:F_,shadowmask_pars_fragment:B_,skinbase_vertex:k_,skinning_pars_vertex:H_,skinning_vertex:G_,skinnormal_vertex:V_,specularmap_fragment:W_,specularmap_pars_fragment:X_,tonemapping_fragment:q_,tonemapping_pars_fragment:Y_,transmission_fragment:$_,transmission_pars_fragment:Z_,uv_pars_fragment:J_,uv_pars_vertex:K_,uv_vertex:j_,worldpos_vertex:Q_,background_vert:ty,background_frag:ey,backgroundCube_vert:ny,backgroundCube_frag:iy,cube_vert:sy,cube_frag:ry,depth_vert:oy,depth_frag:ay,distanceRGBA_vert:cy,distanceRGBA_frag:ly,equirect_vert:hy,equirect_frag:uy,linedashed_vert:fy,linedashed_frag:dy,meshbasic_vert:py,meshbasic_frag:my,meshlambert_vert:gy,meshlambert_frag:xy,meshmatcap_vert:_y,meshmatcap_frag:yy,meshnormal_vert:vy,meshnormal_frag:My,meshphong_vert:by,meshphong_frag:Ey,meshphysical_vert:Sy,meshphysical_frag:wy,meshtoon_vert:Ty,meshtoon_frag:Ay,points_vert:Ry,points_frag:Cy,shadow_vert:Py,shadow_frag:Iy,sprite_vert:Ly,sprite_frag:Dy},Lt={common:{diffuse:{value:new gt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new oe}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new oe},normalScale:{value:new Tt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new gt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new gt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0},uvTransform:{value:new oe}},sprite:{diffuse:{value:new gt(16777215)},opacity:{value:1},center:{value:new Tt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new oe},alphaMap:{value:null},alphaMapTransform:{value:new oe},alphaTest:{value:0}}},Qn={basic:{uniforms:ln([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.fog]),vertexShader:se.meshbasic_vert,fragmentShader:se.meshbasic_frag},lambert:{uniforms:ln([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new gt(0)}}]),vertexShader:se.meshlambert_vert,fragmentShader:se.meshlambert_frag},phong:{uniforms:ln([Lt.common,Lt.specularmap,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,Lt.lights,{emissive:{value:new gt(0)},specular:{value:new gt(1118481)},shininess:{value:30}}]),vertexShader:se.meshphong_vert,fragmentShader:se.meshphong_frag},standard:{uniforms:ln([Lt.common,Lt.envmap,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.roughnessmap,Lt.metalnessmap,Lt.fog,Lt.lights,{emissive:{value:new gt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag},toon:{uniforms:ln([Lt.common,Lt.aomap,Lt.lightmap,Lt.emissivemap,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.gradientmap,Lt.fog,Lt.lights,{emissive:{value:new gt(0)}}]),vertexShader:se.meshtoon_vert,fragmentShader:se.meshtoon_frag},matcap:{uniforms:ln([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,Lt.fog,{matcap:{value:null}}]),vertexShader:se.meshmatcap_vert,fragmentShader:se.meshmatcap_frag},points:{uniforms:ln([Lt.points,Lt.fog]),vertexShader:se.points_vert,fragmentShader:se.points_frag},dashed:{uniforms:ln([Lt.common,Lt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:se.linedashed_vert,fragmentShader:se.linedashed_frag},depth:{uniforms:ln([Lt.common,Lt.displacementmap]),vertexShader:se.depth_vert,fragmentShader:se.depth_frag},normal:{uniforms:ln([Lt.common,Lt.bumpmap,Lt.normalmap,Lt.displacementmap,{opacity:{value:1}}]),vertexShader:se.meshnormal_vert,fragmentShader:se.meshnormal_frag},sprite:{uniforms:ln([Lt.sprite,Lt.fog]),vertexShader:se.sprite_vert,fragmentShader:se.sprite_frag},background:{uniforms:{uvTransform:{value:new oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:se.background_vert,fragmentShader:se.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:se.backgroundCube_vert,fragmentShader:se.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:se.cube_vert,fragmentShader:se.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:se.equirect_vert,fragmentShader:se.equirect_frag},distanceRGBA:{uniforms:ln([Lt.common,Lt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:se.distanceRGBA_vert,fragmentShader:se.distanceRGBA_frag},shadow:{uniforms:ln([Lt.lights,Lt.fog,{color:{value:new gt(0)},opacity:{value:1}}]),vertexShader:se.shadow_vert,fragmentShader:se.shadow_frag}};Qn.physical={uniforms:ln([Qn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new oe},clearcoatNormalScale:{value:new Tt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new oe},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new oe},sheen:{value:0},sheenColor:{value:new gt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new oe},transmissionSamplerSize:{value:new Tt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new oe},attenuationDistance:{value:0},attenuationColor:{value:new gt(0)},specularColor:{value:new gt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new oe},anisotropyVector:{value:new Tt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new oe}}]),vertexShader:se.meshphysical_vert,fragmentShader:se.meshphysical_frag};var _a={r:0,b:0,g:0};function Uy(n,t,e,i,s,r,o){let a=new gt(0),c=r===!0?0:1,l,h,u=null,f=0,p=null;function x(m,d){let _=!1,y=d.isScene===!0?d.background:null;y&&y.isTexture&&(y=(d.backgroundBlurriness>0?e:t).get(y)),y===null?g(a,c):y&&y.isColor&&(g(y,1),_=!0);let v=n.xr.getEnvironmentBlendMode();v==="additive"?i.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil),y&&(y.isCubeTexture||y.mapping===Qa)?(h===void 0&&(h=new Nt(new He(1,1,1),new di({name:"BackgroundCubeMaterial",uniforms:ar(Qn.backgroundCube.uniforms),vertexShader:Qn.backgroundCube.vertexShader,fragmentShader:Qn.backgroundCube.fragmentShader,side:fn,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(E,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,h.material.toneMapped=xe.getTransfer(y.colorSpace)!==Ee,(u!==y||f!==y.version||p!==n.toneMapping)&&(h.material.needsUpdate=!0,u=y,f=y.version,p=n.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Nt(new Mn(2,2),new di({name:"BackgroundMaterial",uniforms:ar(Qn.background.uniforms),vertexShader:Qn.background.vertexShader,fragmentShader:Qn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=xe.getTransfer(y.colorSpace)!==Ee,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||f!==y.version||p!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,f=y.version,p=n.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function g(m,d){m.getRGB(_a,Bd(n)),i.buffers.color.setClear(_a.r,_a.g,_a.b,d,o)}return{getClearColor:function(){return a},setClearColor:function(m,d=1){a.set(m),c=d,g(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,g(a,c)},render:x}}function Ny(n,t,e,i){let s=n.getParameter(n.MAX_VERTEX_ATTRIBS),r=i.isWebGL2?null:t.get("OES_vertex_array_object"),o=i.isWebGL2||r!==null,a={},c=m(null),l=c,h=!1;function u(P,D,N,H,G){let V=!1;if(o){let O=g(H,N,D);l!==O&&(l=O,p(l.object)),V=d(P,H,N,G),V&&_(P,H,N,G)}else{let O=D.wireframe===!0;(l.geometry!==H.id||l.program!==N.id||l.wireframe!==O)&&(l.geometry=H.id,l.program=N.id,l.wireframe=O,V=!0)}G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(V||h)&&(h=!1,R(P,D,N,H),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function f(){return i.isWebGL2?n.createVertexArray():r.createVertexArrayOES()}function p(P){return i.isWebGL2?n.bindVertexArray(P):r.bindVertexArrayOES(P)}function x(P){return i.isWebGL2?n.deleteVertexArray(P):r.deleteVertexArrayOES(P)}function g(P,D,N){let H=N.wireframe===!0,G=a[P.id];G===void 0&&(G={},a[P.id]=G);let V=G[D.id];V===void 0&&(V={},G[D.id]=V);let O=V[H];return O===void 0&&(O=m(f()),V[H]=O),O}function m(P){let D=[],N=[],H=[];for(let G=0;G<s;G++)D[G]=0,N[G]=0,H[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:H,object:P,attributes:{},index:null}}function d(P,D,N,H){let G=l.attributes,V=D.attributes,O=0,B=N.getAttributes();for(let j in B)if(B[j].location>=0){let rt=G[j],at=V[j];if(at===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(at=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(at=P.instanceColor)),rt===void 0||rt.attribute!==at||at&&rt.data!==at.data)return!0;O++}return l.attributesNum!==O||l.index!==H}function _(P,D,N,H){let G={},V=D.attributes,O=0,B=N.getAttributes();for(let j in B)if(B[j].location>=0){let rt=V[j];rt===void 0&&(j==="instanceMatrix"&&P.instanceMatrix&&(rt=P.instanceMatrix),j==="instanceColor"&&P.instanceColor&&(rt=P.instanceColor));let at={};at.attribute=rt,rt&&rt.data&&(at.data=rt.data),G[j]=at,O++}l.attributes=G,l.attributesNum=O,l.index=H}function y(){let P=l.newAttributes;for(let D=0,N=P.length;D<N;D++)P[D]=0}function v(P){E(P,0)}function E(P,D){let N=l.newAttributes,H=l.enabledAttributes,G=l.attributeDivisors;N[P]=1,H[P]===0&&(n.enableVertexAttribArray(P),H[P]=1),G[P]!==D&&((i.isWebGL2?n:t.get("ANGLE_instanced_arrays"))[i.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](P,D),G[P]=D)}function S(){let P=l.newAttributes,D=l.enabledAttributes;for(let N=0,H=D.length;N<H;N++)D[N]!==P[N]&&(n.disableVertexAttribArray(N),D[N]=0)}function w(P,D,N,H,G,V,O){O===!0?n.vertexAttribIPointer(P,D,N,G,V):n.vertexAttribPointer(P,D,N,H,G,V)}function R(P,D,N,H){if(i.isWebGL2===!1&&(P.isInstancedMesh||H.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();let G=H.attributes,V=N.getAttributes(),O=D.defaultAttributeValues;for(let B in V){let j=V[B];if(j.location>=0){let Y=G[B];if(Y===void 0&&(B==="instanceMatrix"&&P.instanceMatrix&&(Y=P.instanceMatrix),B==="instanceColor"&&P.instanceColor&&(Y=P.instanceColor)),Y!==void 0){let rt=Y.normalized,at=Y.itemSize,tt=e.get(Y);if(tt===void 0)continue;let ut=tt.buffer,lt=tt.type,ct=tt.bytesPerElement,xt=i.isWebGL2===!0&&(lt===n.INT||lt===n.UNSIGNED_INT||Y.gpuType===Ad);if(Y.isInterleavedBufferAttribute){let wt=Y.data,F=wt.stride,Mt=Y.offset;if(wt.isInstancedInterleavedBuffer){for(let Q=0;Q<j.locationSize;Q++)E(j.location+Q,wt.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=wt.meshPerAttribute*wt.count)}else for(let Q=0;Q<j.locationSize;Q++)v(j.location+Q);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let Q=0;Q<j.locationSize;Q++)w(j.location+Q,at/j.locationSize,lt,rt,F*ct,(Mt+at/j.locationSize*Q)*ct,xt)}else{if(Y.isInstancedBufferAttribute){for(let wt=0;wt<j.locationSize;wt++)E(j.location+wt,Y.meshPerAttribute);P.isInstancedMesh!==!0&&H._maxInstanceCount===void 0&&(H._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let wt=0;wt<j.locationSize;wt++)v(j.location+wt);n.bindBuffer(n.ARRAY_BUFFER,ut);for(let wt=0;wt<j.locationSize;wt++)w(j.location+wt,at/j.locationSize,lt,rt,at*ct,at/j.locationSize*wt*ct,xt)}}else if(O!==void 0){let rt=O[B];if(rt!==void 0)switch(rt.length){case 2:n.vertexAttrib2fv(j.location,rt);break;case 3:n.vertexAttrib3fv(j.location,rt);break;case 4:n.vertexAttrib4fv(j.location,rt);break;default:n.vertexAttrib1fv(j.location,rt)}}}}S()}function b(){I();for(let P in a){let D=a[P];for(let N in D){let H=D[N];for(let G in H)x(H[G].object),delete H[G];delete D[N]}delete a[P]}}function M(P){if(a[P.id]===void 0)return;let D=a[P.id];for(let N in D){let H=D[N];for(let G in H)x(H[G].object),delete H[G];delete D[N]}delete a[P.id]}function A(P){for(let D in a){let N=a[D];if(N[P.id]===void 0)continue;let H=N[P.id];for(let G in H)x(H[G].object),delete H[G];delete N[P.id]}}function I(){z(),h=!0,l!==c&&(l=c,p(l.object))}function z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:I,resetDefaultState:z,dispose:b,releaseStatesOfGeometry:M,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:v,disableUnusedAttributes:S}}function zy(n,t,e,i){let s=i.isWebGL2,r;function o(h){r=h}function a(h,u){n.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,f){if(f===0)return;let p,x;if(s)p=n,x="drawArraysInstanced";else if(p=t.get("ANGLE_instanced_arrays"),x="drawArraysInstancedANGLE",p===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}p[x](r,h,u,f),e.update(u,r,f)}function l(h,u,f){if(f===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let x=0;x<f;x++)this.render(h[x],u[x]);else{p.multiDrawArraysWEBGL(r,h,0,u,0,f);let x=0;for(let g=0;g<f;g++)x+=u[g];e.update(x,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Oy(n,t,e){let i;function s(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){let w=t.get("EXT_texture_filter_anisotropic");i=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=typeof WebGL2RenderingContext<"u"&&n.constructor.name==="WebGL2RenderingContext",a=e.precision!==void 0?e.precision:"highp",c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);let l=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),f=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),p=n.getParameter(n.MAX_TEXTURE_SIZE),x=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),m=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),d=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),y=f>0,v=o||t.has("OES_texture_float"),E=y&&v,S=o?n.getParameter(n.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:s,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:x,maxAttributes:g,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:_,vertexTextures:y,floatFragmentTextures:v,floatVertexTextures:E,maxSamples:S}}function Fy(n){let t=this,e=null,i=0,s=!1,r=!1,o=new li,a=new oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,f){let p=u.length!==0||f||i!==0||s;return s=f,i=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,f){e=h(u,f,0)},this.setState=function(u,f,p){let x=u.clippingPlanes,g=u.clipIntersection,m=u.clipShadows,d=n.get(u);if(!s||x===null||x.length===0||r&&!m)r?h(null):l();else{let _=r?0:i,y=_*4,v=d.clippingState||null;c.value=v,v=h(x,f,y,p);for(let E=0;E!==y;++E)v[E]=e[E];d.clippingState=v,this.numIntersection=g?this.numPlanes:0,this.numPlanes+=_}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,f,p,x){let g=u!==null?u.length:0,m=null;if(g!==0){if(m=c.value,x!==!0||m===null){let d=p+g*4,_=f.matrixWorldInverse;a.getNormalMatrix(_),(m===null||m.length<d)&&(m=new Float32Array(d));for(let y=0,v=p;y!==g;++y,v+=4)o.copy(u[y]).applyMatrix4(_,a),o.normal.toArray(m,v),m[v+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=g,t.numIntersection=0,m}}function By(n){let t=new WeakMap;function e(o,a){return a===Ul?o.mapping=sr:a===Nl&&(o.mapping=rr),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===Ul||a===Nl)if(t.has(o)){let c=t.get(o).texture;return e(c,o.mapping)}else{let c=o.image;if(c&&c.height>0){let l=new Vl(c.height/2);return l.fromEquirectangularTexture(n,o),t.set(o,l),o.addEventListener("dispose",s),e(l.texture,o.mapping)}else return null}}return o}function s(o){let a=o.target;a.removeEventListener("dispose",s);let c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:i,dispose:r}}var cr=class extends ka{constructor(t=-1,e=1,i=1,s=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=s,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,s,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-t,o=i+t,a=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ks=4,Vf=[.125,.215,.35,.446,.526,.582],ss=20,bl=new cr,Wf=new gt,El=null,Sl=0,wl=0,ns=(1+Math.sqrt(5))/2,Ys=1/ns,Xf=[new k(1,1,1),new k(-1,1,1),new k(1,1,-1),new k(-1,1,-1),new k(0,ns,Ys),new k(0,ns,-Ys),new k(Ys,0,ns),new k(-Ys,0,ns),new k(ns,Ys,0),new k(-ns,Ys,0)],Ga=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,s=100){El=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),wl=this._renderer.getActiveMipmapLevel(),this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,i,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$f(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(El,Sl,wl),t.scissorTest=!1,ya(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===sr||t.mapping===rr?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),El=this._renderer.getRenderTarget(),Sl=this._renderer.getActiveCubeFace(),wl=this._renderer.getActiveMipmapLevel();let i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:on,minFilter:on,generateMipmaps:!1,type:jr,format:Wn,colorSpace:ui,depthBuffer:!1},s=qf(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qf(t,e,i);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=ky(r)),this._blurMaterial=Hy(r,t,e)}return s}_compileMaterial(t){let e=new Nt(this._lodPlanes[0],t);this._renderer.compile(e,bl)}_sceneToCubeUV(t,e,i,s){let a=new vn(90,1,e,i),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(Wf),h.toneMapping=Li,h.autoClear=!1;let p=new Be({name:"PMREM.Background",side:fn,depthWrite:!1,depthTest:!1}),x=new Nt(new He,p),g=!1,m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,g=!0):(p.color.copy(Wf),g=!0);for(let d=0;d<6;d++){let _=d%3;_===0?(a.up.set(0,c[d],0),a.lookAt(l[d],0,0)):_===1?(a.up.set(0,0,c[d]),a.lookAt(0,l[d],0)):(a.up.set(0,c[d],0),a.lookAt(0,0,l[d]));let y=this._cubeSize;ya(s,_*y,d>2?y:0,y,y),h.setRenderTarget(s),g&&h.render(x,a),h.render(t,a)}x.geometry.dispose(),x.material.dispose(),h.toneMapping=f,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){let i=this._renderer,s=t.mapping===sr||t.mapping===rr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$f()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yf());let r=s?this._cubemapMaterial:this._equirectMaterial,o=new Nt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;let c=this._cubeSize;ya(e,0,0,3*c,2*c),i.setRenderTarget(e),i.render(o,bl)}_applyPMREM(t){let e=this._renderer,i=e.autoClear;e.autoClear=!1;for(let s=1;s<this._lodPlanes.length;s++){let r=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Xf[(s-1)%Xf.length];this._blur(t,s-1,s,r,o)}e.autoClear=i}_blur(t,e,i,s,r){let o=this._pingPongRenderTarget;this._halfBlur(t,o,e,i,s,"latitudinal",r),this._halfBlur(o,t,i,i,s,"longitudinal",r)}_halfBlur(t,e,i,s,r,o,a){let c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Nt(this._lodPlanes[s],l),f=l.uniforms,p=this._sizeLods[i]-1,x=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*ss-1),g=r/x,m=isFinite(r)?1+Math.floor(h*g):ss;m>ss&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ss}`);let d=[],_=0;for(let w=0;w<ss;++w){let R=w/g,b=Math.exp(-R*R/2);d.push(b),w===0?_+=b:w<m&&(_+=2*b)}for(let w=0;w<d.length;w++)d[w]=d[w]/_;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=o==="latitudinal",a&&(f.poleAxis.value=a);let{_lodMax:y}=this;f.dTheta.value=x,f.mipInt.value=y-i;let v=this._sizeLods[s],E=3*v*(s>y-Ks?s-y+Ks:0),S=4*(this._cubeSize-v);ya(e,E,S,3*v,2*v),c.setRenderTarget(e),c.render(u,bl)}};function ky(n){let t=[],e=[],i=[],s=n,r=n-Ks+1+Vf.length;for(let o=0;o<r;o++){let a=Math.pow(2,s);e.push(a);let c=1/a;o>n-Ks?c=Vf[o-n+Ks-1]:o===0&&(c=0),i.push(c);let l=1/(a-2),h=-l,u=1+l,f=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,x=6,g=3,m=2,d=1,_=new Float32Array(g*x*p),y=new Float32Array(m*x*p),v=new Float32Array(d*x*p);for(let S=0;S<p;S++){let w=S%3*2/3-1,R=S>2?0:-1,b=[w,R,0,w+2/3,R,0,w+2/3,R+1,0,w,R,0,w+2/3,R+1,0,w,R+1,0];_.set(b,g*x*S),y.set(f,m*x*S);let M=[S,S,S,S,S,S];v.set(M,d*x*S)}let E=new ae;E.setAttribute("position",new Ue(_,g)),E.setAttribute("uv",new Ue(y,m)),E.setAttribute("faceIndex",new Ue(v,d)),t.push(E),s>Ks&&s--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function qf(n,t,e){let i=new fi(n,t,e);return i.texture.mapping=Qa,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ya(n,t,e,i,s){n.viewport.set(t,e,i,s),n.scissor.set(t,e,i,s)}function Hy(n,t,e){let i=new Float32Array(ss),s=new k(0,1,0);return new di({name:"SphericalGaussianBlur",defines:{n:ss,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ih(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Yf(){return new di({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ih(),fragmentShader:`

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
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function $f(){return new di({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ih(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ii,depthTest:!1,depthWrite:!1})}function Ih(){return`

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
	`}function Gy(n){let t=new WeakMap,e=null;function i(a){if(a&&a.isTexture){let c=a.mapping,l=c===Ul||c===Nl,h=c===sr||c===rr;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Ga(n)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{let u=a.image;if(l&&u&&u.height>0||h&&u&&s(u)){e===null&&(e=new Ga(n));let f=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,f),a.addEventListener("dispose",r),f.texture}else return null}}}return a}function s(a){let c=0,l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){let c=a.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:o}}function Vy(n){let t={};function e(i){if(t[i]!==void 0)return t[i];let s;switch(i){case"WEBGL_depth_texture":s=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=n.getExtension(i)}return t[i]=s,s}return{has:function(i){return e(i)!==null},init:function(i){i.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(i){let s=e(i);return s===null&&console.warn("THREE.WebGLRenderer: "+i+" extension not supported."),s}}}function Wy(n,t,e,i){let s={},r=new WeakMap;function o(u){let f=u.target;f.index!==null&&t.remove(f.index);for(let x in f.attributes)t.remove(f.attributes[x]);for(let x in f.morphAttributes){let g=f.morphAttributes[x];for(let m=0,d=g.length;m<d;m++)t.remove(g[m])}f.removeEventListener("dispose",o),delete s[f.id];let p=r.get(f);p&&(t.remove(p),r.delete(f)),i.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function a(u,f){return s[f.id]===!0||(f.addEventListener("dispose",o),s[f.id]=!0,e.memory.geometries++),f}function c(u){let f=u.attributes;for(let x in f)t.update(f[x],n.ARRAY_BUFFER);let p=u.morphAttributes;for(let x in p){let g=p[x];for(let m=0,d=g.length;m<d;m++)t.update(g[m],n.ARRAY_BUFFER)}}function l(u){let f=[],p=u.index,x=u.attributes.position,g=0;if(p!==null){let _=p.array;g=p.version;for(let y=0,v=_.length;y<v;y+=3){let E=_[y+0],S=_[y+1],w=_[y+2];f.push(E,S,S,w,w,E)}}else if(x!==void 0){let _=x.array;g=x.version;for(let y=0,v=_.length/3-1;y<v;y+=3){let E=y+0,S=y+1,w=y+2;f.push(E,S,S,w,w,E)}}else return;let m=new(Od(f)?Ba:Fa)(f,1);m.version=g;let d=r.get(u);d&&t.remove(d),r.set(u,m)}function h(u){let f=r.get(u);if(f){let p=u.index;p!==null&&f.version<p.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Xy(n,t,e,i){let s=i.isWebGL2,r;function o(p){r=p}let a,c;function l(p){a=p.type,c=p.bytesPerElement}function h(p,x){n.drawElements(r,x,a,p*c),e.update(x,r,1)}function u(p,x,g){if(g===0)return;let m,d;if(s)m=n,d="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),d="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[d](r,x,a,p*c,g),e.update(x,r,g)}function f(p,x,g){if(g===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let d=0;d<g;d++)this.render(p[d]/c,x[d]);else{m.multiDrawElementsWEBGL(r,x,0,a,p,0,g);let d=0;for(let _=0;_<g;_++)d+=x[_];e.update(d,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=f}function qy(n){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,o,a){switch(e.calls++,o){case n.TRIANGLES:e.triangles+=a*(r/3);break;case n.LINES:e.lines+=a*(r/2);break;case n.LINE_STRIP:e.lines+=a*(r-1);break;case n.LINE_LOOP:e.lines+=a*r;break;case n.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:i}}function Yy(n,t){return n[0]-t[0]}function $y(n,t){return Math.abs(t[1])-Math.abs(n[1])}function Zy(n,t,e){let i={},s=new Float32Array(8),r=new WeakMap,o=new Je,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){let f=l.morphTargetInfluences;if(t.isWebGL2===!0){let p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,x=p!==void 0?p.length:0,g=r.get(h);if(g===void 0||g.count!==x){let P=function(){I.dispose(),r.delete(h),h.removeEventListener("dispose",P)};g!==void 0&&g.texture.dispose();let _=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,v=h.morphAttributes.color!==void 0,E=h.morphAttributes.position||[],S=h.morphAttributes.normal||[],w=h.morphAttributes.color||[],R=0;_===!0&&(R=1),y===!0&&(R=2),v===!0&&(R=3);let b=h.attributes.position.count*R,M=1;b>t.maxTextureSize&&(M=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);let A=new Float32Array(b*M*4*x),I=new za(A,b,M,x);I.type=Pi,I.needsUpdate=!0;let z=R*4;for(let D=0;D<x;D++){let N=E[D],H=S[D],G=w[D],V=b*M*4*D;for(let O=0;O<N.count;O++){let B=O*z;_===!0&&(o.fromBufferAttribute(N,O),A[V+B+0]=o.x,A[V+B+1]=o.y,A[V+B+2]=o.z,A[V+B+3]=0),y===!0&&(o.fromBufferAttribute(H,O),A[V+B+4]=o.x,A[V+B+5]=o.y,A[V+B+6]=o.z,A[V+B+7]=0),v===!0&&(o.fromBufferAttribute(G,O),A[V+B+8]=o.x,A[V+B+9]=o.y,A[V+B+10]=o.z,A[V+B+11]=G.itemSize===4?o.w:1)}}g={count:x,texture:I,size:new Tt(b,M)},r.set(h,g),h.addEventListener("dispose",P)}let m=0;for(let _=0;_<f.length;_++)m+=f[_];let d=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(n,"morphTargetBaseInfluence",d),u.getUniforms().setValue(n,"morphTargetInfluences",f),u.getUniforms().setValue(n,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(n,"morphTargetsTextureSize",g.size)}else{let p=f===void 0?0:f.length,x=i[h.id];if(x===void 0||x.length!==p){x=[];for(let y=0;y<p;y++)x[y]=[y,0];i[h.id]=x}for(let y=0;y<p;y++){let v=x[y];v[0]=y,v[1]=f[y]}x.sort($y);for(let y=0;y<8;y++)y<p&&x[y][1]?(a[y][0]=x[y][0],a[y][1]=x[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(Yy);let g=h.morphAttributes.position,m=h.morphAttributes.normal,d=0;for(let y=0;y<8;y++){let v=a[y],E=v[0],S=v[1];E!==Number.MAX_SAFE_INTEGER&&S?(g&&h.getAttribute("morphTarget"+y)!==g[E]&&h.setAttribute("morphTarget"+y,g[E]),m&&h.getAttribute("morphNormal"+y)!==m[E]&&h.setAttribute("morphNormal"+y,m[E]),s[y]=S,d+=S):(g&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),s[y]=0)}let _=h.morphTargetsRelative?1:1-d;u.getUniforms().setValue(n,"morphTargetBaseInfluence",_),u.getUniforms().setValue(n,"morphTargetInfluences",s)}}return{update:c}}function Jy(n,t,e,i){let s=new WeakMap;function r(c){let l=i.render.frame,h=c.geometry,u=t.get(c,h);if(s.get(u)!==l&&(t.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),s.get(c)!==l&&(e.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,n.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return u}function o(){s=new WeakMap}function a(c){let l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}var Va=class extends Ln{constructor(t,e,i,s,r,o,a,c,l,h){if(h=h!==void 0?h:os,h!==os&&h!==or)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");i===void 0&&h===os&&(i=Ci),i===void 0&&h===or&&(i=rs),super(null,s,r,o,a,c,h,i,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Qe,this.minFilter=c!==void 0?c:Qe,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Hd=new Ln,Gd=new Va(1,1);Gd.compareFunction=zd;var Vd=new za,Wd=new Hl,Xd=new Ha,Zf=[],Jf=[],Kf=new Float32Array(16),jf=new Float32Array(9),Qf=new Float32Array(4);function dr(n,t,e){let i=n[0];if(i<=0||i>0)return n;let s=t*e,r=Zf[s];if(r===void 0&&(r=new Float32Array(s),Zf[s]=r),t!==0){i.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,n[o].toArray(r,a)}return r}function Ge(n,t){if(n.length!==t.length)return!1;for(let e=0,i=n.length;e<i;e++)if(n[e]!==t[e])return!1;return!0}function Ve(n,t){for(let e=0,i=t.length;e<i;e++)n[e]=t[e]}function ec(n,t){let e=Jf[t];e===void 0&&(e=new Int32Array(t),Jf[t]=e);for(let i=0;i!==t;++i)e[i]=n.allocateTextureUnit();return e}function Ky(n,t){let e=this.cache;e[0]!==t&&(n.uniform1f(this.addr,t),e[0]=t)}function jy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2fv(this.addr,t),Ve(e,t)}}function Qy(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(n.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ge(e,t))return;n.uniform3fv(this.addr,t),Ve(e,t)}}function tv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4fv(this.addr,t),Ve(e,t)}}function ev(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix2fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Qf.set(i),n.uniformMatrix2fv(this.addr,!1,Qf),Ve(e,i)}}function nv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix3fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;jf.set(i),n.uniformMatrix3fv(this.addr,!1,jf),Ve(e,i)}}function iv(n,t){let e=this.cache,i=t.elements;if(i===void 0){if(Ge(e,t))return;n.uniformMatrix4fv(this.addr,!1,t),Ve(e,t)}else{if(Ge(e,i))return;Kf.set(i),n.uniformMatrix4fv(this.addr,!1,Kf),Ve(e,i)}}function sv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1i(this.addr,t),e[0]=t)}function rv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2iv(this.addr,t),Ve(e,t)}}function ov(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3iv(this.addr,t),Ve(e,t)}}function av(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4iv(this.addr,t),Ve(e,t)}}function cv(n,t){let e=this.cache;e[0]!==t&&(n.uniform1ui(this.addr,t),e[0]=t)}function lv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(n.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ge(e,t))return;n.uniform2uiv(this.addr,t),Ve(e,t)}}function hv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(n.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ge(e,t))return;n.uniform3uiv(this.addr,t),Ve(e,t)}}function uv(n,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(n.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ge(e,t))return;n.uniform4uiv(this.addr,t),Ve(e,t)}}function fv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r=this.type===n.SAMPLER_2D_SHADOW?Gd:Hd;e.setTexture2D(t||r,s)}function dv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture3D(t||Wd,s)}function pv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTextureCube(t||Xd,s)}function mv(n,t,e){let i=this.cache,s=e.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),e.setTexture2DArray(t||Vd,s)}function gv(n){switch(n){case 5126:return Ky;case 35664:return jy;case 35665:return Qy;case 35666:return tv;case 35674:return ev;case 35675:return nv;case 35676:return iv;case 5124:case 35670:return sv;case 35667:case 35671:return rv;case 35668:case 35672:return ov;case 35669:case 35673:return av;case 5125:return cv;case 36294:return lv;case 36295:return hv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return fv;case 35679:case 36299:case 36307:return dv;case 35680:case 36300:case 36308:case 36293:return pv;case 36289:case 36303:case 36311:case 36292:return mv}}function xv(n,t){n.uniform1fv(this.addr,t)}function _v(n,t){let e=dr(t,this.size,2);n.uniform2fv(this.addr,e)}function yv(n,t){let e=dr(t,this.size,3);n.uniform3fv(this.addr,e)}function vv(n,t){let e=dr(t,this.size,4);n.uniform4fv(this.addr,e)}function Mv(n,t){let e=dr(t,this.size,4);n.uniformMatrix2fv(this.addr,!1,e)}function bv(n,t){let e=dr(t,this.size,9);n.uniformMatrix3fv(this.addr,!1,e)}function Ev(n,t){let e=dr(t,this.size,16);n.uniformMatrix4fv(this.addr,!1,e)}function Sv(n,t){n.uniform1iv(this.addr,t)}function wv(n,t){n.uniform2iv(this.addr,t)}function Tv(n,t){n.uniform3iv(this.addr,t)}function Av(n,t){n.uniform4iv(this.addr,t)}function Rv(n,t){n.uniform1uiv(this.addr,t)}function Cv(n,t){n.uniform2uiv(this.addr,t)}function Pv(n,t){n.uniform3uiv(this.addr,t)}function Iv(n,t){n.uniform4uiv(this.addr,t)}function Lv(n,t,e){let i=this.cache,s=t.length,r=ec(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2D(t[o]||Hd,r[o])}function Dv(n,t,e){let i=this.cache,s=t.length,r=ec(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture3D(t[o]||Wd,r[o])}function Uv(n,t,e){let i=this.cache,s=t.length,r=ec(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTextureCube(t[o]||Xd,r[o])}function Nv(n,t,e){let i=this.cache,s=t.length,r=ec(e,s);Ge(i,r)||(n.uniform1iv(this.addr,r),Ve(i,r));for(let o=0;o!==s;++o)e.setTexture2DArray(t[o]||Vd,r[o])}function zv(n){switch(n){case 5126:return xv;case 35664:return _v;case 35665:return yv;case 35666:return vv;case 35674:return Mv;case 35675:return bv;case 35676:return Ev;case 5124:case 35670:return Sv;case 35667:case 35671:return wv;case 35668:case 35672:return Tv;case 35669:case 35673:return Av;case 5125:return Rv;case 36294:return Cv;case 36295:return Pv;case 36296:return Iv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Dv;case 35680:case 36300:case 36308:case 36293:return Uv;case 36289:case 36303:case 36311:case 36292:return Nv}}var Wl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=gv(e.type)}},Xl=class{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=zv(e.type)}},ql=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){let s=this.seq;for(let r=0,o=s.length;r!==o;++r){let a=s[r];a.setValue(t,e[a.id],i)}}},Tl=/(\w+)(\])?(\[|\.)?/g;function td(n,t){n.seq.push(t),n.map[t.id]=t}function Ov(n,t,e){let i=n.name,s=i.length;for(Tl.lastIndex=0;;){let r=Tl.exec(i),o=Tl.lastIndex,a=r[1],c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===s){td(e,l===void 0?new Wl(a,n,t):new Xl(a,n,t));break}else{let u=e.map[a];u===void 0&&(u=new ql(a),td(e,u)),e=u}}}var nr=class{constructor(t,e){this.seq=[],this.map={};let i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<i;++s){let r=t.getActiveUniform(e,s),o=t.getUniformLocation(e,r.name);Ov(r,o,this)}}setValue(t,e,i,s){let r=this.map[e];r!==void 0&&r.setValue(t,i,s)}setOptional(t,e,i){let s=e[i];s!==void 0&&this.setValue(t,i,s)}static upload(t,e,i,s){for(let r=0,o=e.length;r!==o;++r){let a=e[r],c=i[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,s)}}static seqWithValue(t,e){let i=[];for(let s=0,r=t.length;s!==r;++s){let o=t[s];o.id in e&&i.push(o)}return i}};function ed(n,t,e){let i=n.createShader(t);return n.shaderSource(i,e),n.compileShader(i),i}var Fv=37297,Bv=0;function kv(n,t){let e=n.split(`
`),i=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=s;o<r;o++){let a=o+1;i.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return i.join(`
`)}function Hv(n){let t=xe.getPrimaries(xe.workingColorSpace),e=xe.getPrimaries(n),i;switch(t===e?i="":t===Pa&&e===Ca?i="LinearDisplayP3ToLinearSRGB":t===Ca&&e===Pa&&(i="LinearSRGBToLinearDisplayP3"),n){case ui:case tc:return[i,"LinearTransferOETF"];case $e:case Ch:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[i,"LinearTransferOETF"]}}function nd(n,t,e){let i=n.getShaderParameter(t,n.COMPILE_STATUS),s=n.getShaderInfoLog(t).trim();if(i&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let o=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+kv(n.getShaderSource(t),o)}else return s}function Gv(n,t){let e=Hv(t);return`vec4 ${n}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Vv(n,t){let e;switch(t){case Z0:e="Linear";break;case J0:e="Reinhard";break;case K0:e="OptimizedCineon";break;case Ah:e="ACESFilmic";break;case Q0:e="AgX";break;case j0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+n+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Wv(n){return[n.extensionDerivatives||n.envMapCubeUVHeight||n.bumpMap||n.normalMapTangentSpace||n.clearcoatNormalMap||n.flatShading||n.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(n.extensionFragDepth||n.logarithmicDepthBuffer)&&n.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",n.extensionDrawBuffers&&n.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(n.extensionShaderTextureLOD||n.envMap||n.transmission)&&n.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(js).join(`
`)}function Xv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(js).join(`
`)}function qv(n){let t=[];for(let e in n){let i=n[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Yv(n,t){let e={},i=n.getProgramParameter(t,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(t,s),o=r.name,a=1;r.type===n.FLOAT_MAT2&&(a=2),r.type===n.FLOAT_MAT3&&(a=3),r.type===n.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:n.getAttribLocation(t,o),locationSize:a}}return e}function js(n){return n!==""}function id(n,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sd(n,t){return n.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var $v=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yl(n){return n.replace($v,Jv)}var Zv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function Jv(n,t){let e=se[t];if(e===void 0){let i=Zv.get(t);if(i!==void 0)e=se[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return Yl(e)}var Kv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rd(n){return n.replace(Kv,jv)}function jv(n,t,e,i){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function od(n){let t="precision "+n.precision+` float;
precision `+n.precision+" int;";return n.precision==="highp"?t+=`
#define HIGH_PRECISION`:n.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Qv(n){let t="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Sd?t="SHADOWMAP_TYPE_PCF":n.shadowMapType===wh?t="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===ci&&(t="SHADOWMAP_TYPE_VSM"),t}function tM(n){let t="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case sr:case rr:t="ENVMAP_TYPE_CUBE";break;case Qa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function eM(n){let t="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case rr:t="ENVMAP_MODE_REFRACTION";break}return t}function nM(n){let t="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case wd:t="ENVMAP_BLENDING_MULTIPLY";break;case Y0:t="ENVMAP_BLENDING_MIX";break;case $0:t="ENVMAP_BLENDING_ADD";break}return t}function iM(n){let t=n.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:i,maxMip:e}}function sM(n,t,e,i){let s=n.getContext(),r=e.defines,o=e.vertexShader,a=e.fragmentShader,c=Qv(e),l=tM(e),h=eM(e),u=nM(e),f=iM(e),p=e.isWebGL2?"":Wv(e),x=Xv(e),g=qv(r),m=s.createProgram(),d,_,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),d.length>0&&(d+=`
`),_=[p,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(js).join(`
`),_.length>0&&(_+=`
`)):(d=[od(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(js).join(`
`),_=[p,od(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Li?"#define TONE_MAPPING":"",e.toneMapping!==Li?se.tonemapping_pars_fragment:"",e.toneMapping!==Li?Vv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",se.colorspace_pars_fragment,Gv("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(js).join(`
`)),o=Yl(o),o=id(o,e),o=sd(o,e),a=Yl(a),a=id(a,e),a=sd(a,e),o=rd(o),a=rd(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,d=[x,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+d,_=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===wf?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===wf?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+_);let v=y+d+o,E=y+_+a,S=ed(s,s.VERTEX_SHADER,v),w=ed(s,s.FRAGMENT_SHADER,E);s.attachShader(m,S),s.attachShader(m,w),e.index0AttributeName!==void 0?s.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(m,0,"position"),s.linkProgram(m);function R(I){if(n.debug.checkShaderErrors){let z=s.getProgramInfoLog(m).trim(),P=s.getShaderInfoLog(S).trim(),D=s.getShaderInfoLog(w).trim(),N=!0,H=!0;if(s.getProgramParameter(m,s.LINK_STATUS)===!1)if(N=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,m,S,w);else{let G=nd(s,S,"vertex"),V=nd(s,w,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(m,s.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+G+`
`+V)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(P===""||D==="")&&(H=!1);H&&(I.diagnostics={runnable:N,programLog:z,vertexShader:{log:P,prefix:d},fragmentShader:{log:D,prefix:_}})}s.deleteShader(S),s.deleteShader(w),b=new nr(s,m),M=Yv(s,m)}let b;this.getUniforms=function(){return b===void 0&&R(this),b};let M;this.getAttributes=function(){return M===void 0&&R(this),M};let A=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return A===!1&&(A=s.getProgramParameter(m,Fv)),A},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Bv++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=w,this}var rM=0,$l=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,i=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(i),o=this._getShaderCacheForMaterial(t);return o.has(s)===!1&&(o.add(s),s.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){let e=this.shaderCache,i=e.get(t);return i===void 0&&(i=new Zl(t),e.set(t,i)),i}},Zl=class{constructor(t){this.id=rM++,this.code=t,this.usedTimes=0}};function oM(n,t,e,i,s,r,o){let a=new eo,c=new $l,l=[],h=s.isWebGL2,u=s.logarithmicDepthBuffer,f=s.vertexTextures,p=s.precision,x={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(b){return b===0?"uv":`uv${b}`}function m(b,M,A,I,z){let P=I.fog,D=z.geometry,N=b.isMeshStandardMaterial?I.environment:null,H=(b.isMeshStandardMaterial?e:t).get(b.envMap||N),G=H&&H.mapping===Qa?H.image.height:null,V=x[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let O=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,B=O!==void 0?O.length:0,j=0;D.morphAttributes.position!==void 0&&(j=1),D.morphAttributes.normal!==void 0&&(j=2),D.morphAttributes.color!==void 0&&(j=3);let Y,rt,at,tt;if(V){let Ne=Qn[V];Y=Ne.vertexShader,rt=Ne.fragmentShader}else Y=b.vertexShader,rt=b.fragmentShader,c.update(b),at=c.getVertexShaderID(b),tt=c.getFragmentShaderID(b);let ut=n.getRenderTarget(),lt=z.isInstancedMesh===!0,ct=z.isBatchedMesh===!0,xt=!!b.map,wt=!!b.matcap,F=!!H,Mt=!!b.aoMap,Q=!!b.lightMap,et=!!b.bumpMap,it=!!b.normalMap,bt=!!b.displacementMap,nt=!!b.emissiveMap,L=!!b.metalnessMap,C=!!b.roughnessMap,J=b.anisotropy>0,_t=b.clearcoat>0,mt=b.iridescence>0,yt=b.sheen>0,Ft=b.transmission>0,It=J&&!!b.anisotropyMap,Ht=_t&&!!b.clearcoatMap,Yt=_t&&!!b.clearcoatNormalMap,ee=_t&&!!b.clearcoatRoughnessMap,Et=mt&&!!b.iridescenceMap,he=mt&&!!b.iridescenceThicknessMap,ne=yt&&!!b.sheenColorMap,Kt=yt&&!!b.sheenRoughnessMap,Wt=!!b.specularMap,Vt=!!b.specularColorMap,$t=!!b.specularIntensityMap,re=Ft&&!!b.transmissionMap,ye=Ft&&!!b.thicknessMap,ie=!!b.gradientMap,At=!!b.alphaMap,Z=b.alphaTest>0,Ct=!!b.alphaHash,Ot=!!b.extensions,te=!!D.attributes.uv1,Qt=!!D.attributes.uv2,pe=!!D.attributes.uv3,me=Li;return b.toneMapped&&(ut===null||ut.isXRRenderTarget===!0)&&(me=n.toneMapping),{isWebGL2:h,shaderID:V,shaderType:b.type,shaderName:b.name,vertexShader:Y,fragmentShader:rt,defines:b.defines,customVertexShaderID:at,customFragmentShaderID:tt,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:ct,instancing:lt,instancingColor:lt&&z.instanceColor!==null,supportsVertexTextures:f,outputColorSpace:ut===null?n.outputColorSpace:ut.isXRRenderTarget===!0?ut.texture.colorSpace:ui,map:xt,matcap:wt,envMap:F,envMapMode:F&&H.mapping,envMapCubeUVHeight:G,aoMap:Mt,lightMap:Q,bumpMap:et,normalMap:it,displacementMap:f&&bt,emissiveMap:nt,normalMapObjectSpace:it&&b.normalMapType===ux,normalMapTangentSpace:it&&b.normalMapType===Nd,metalnessMap:L,roughnessMap:C,anisotropy:J,anisotropyMap:It,clearcoat:_t,clearcoatMap:Ht,clearcoatNormalMap:Yt,clearcoatRoughnessMap:ee,iridescence:mt,iridescenceMap:Et,iridescenceThicknessMap:he,sheen:yt,sheenColorMap:ne,sheenRoughnessMap:Kt,specularMap:Wt,specularColorMap:Vt,specularIntensityMap:$t,transmission:Ft,transmissionMap:re,thicknessMap:ye,gradientMap:ie,opaque:b.transparent===!1&&b.blending===tr,alphaMap:At,alphaTest:Z,alphaHash:Ct,combine:b.combine,mapUv:xt&&g(b.map.channel),aoMapUv:Mt&&g(b.aoMap.channel),lightMapUv:Q&&g(b.lightMap.channel),bumpMapUv:et&&g(b.bumpMap.channel),normalMapUv:it&&g(b.normalMap.channel),displacementMapUv:bt&&g(b.displacementMap.channel),emissiveMapUv:nt&&g(b.emissiveMap.channel),metalnessMapUv:L&&g(b.metalnessMap.channel),roughnessMapUv:C&&g(b.roughnessMap.channel),anisotropyMapUv:It&&g(b.anisotropyMap.channel),clearcoatMapUv:Ht&&g(b.clearcoatMap.channel),clearcoatNormalMapUv:Yt&&g(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ee&&g(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Et&&g(b.iridescenceMap.channel),iridescenceThicknessMapUv:he&&g(b.iridescenceThicknessMap.channel),sheenColorMapUv:ne&&g(b.sheenColorMap.channel),sheenRoughnessMapUv:Kt&&g(b.sheenRoughnessMap.channel),specularMapUv:Wt&&g(b.specularMap.channel),specularColorMapUv:Vt&&g(b.specularColorMap.channel),specularIntensityMapUv:$t&&g(b.specularIntensityMap.channel),transmissionMapUv:re&&g(b.transmissionMap.channel),thicknessMapUv:ye&&g(b.thicknessMap.channel),alphaMapUv:At&&g(b.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(it||J),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:te,vertexUv2s:Qt,vertexUv3s:pe,pointsUvs:z.isPoints===!0&&!!D.attributes.uv&&(xt||At),fog:!!P,useFog:b.fog===!0,fogExp2:P&&P.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:B,morphTextureStride:j,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&A.length>0,shadowMapType:n.shadowMap.type,toneMapping:me,useLegacyLights:n._useLegacyLights,decodeVideoTexture:xt&&b.map.isVideoTexture===!0&&xe.getTransfer(b.map.colorSpace)===Ee,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===Ie,flipSided:b.side===fn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionDerivatives:Ot&&b.extensions.derivatives===!0,extensionFragDepth:Ot&&b.extensions.fragDepth===!0,extensionDrawBuffers:Ot&&b.extensions.drawBuffers===!0,extensionShaderTextureLOD:Ot&&b.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Ot&&b.extensions.clipCullDistance&&i.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||i.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||i.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||i.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()}}function d(b){let M=[];if(b.shaderID?M.push(b.shaderID):(M.push(b.customVertexShaderID),M.push(b.customFragmentShaderID)),b.defines!==void 0)for(let A in b.defines)M.push(A),M.push(b.defines[A]);return b.isRawShaderMaterial===!1&&(_(M,b),y(M,b),M.push(n.outputColorSpace)),M.push(b.customProgramCacheKey),M.join()}function _(b,M){b.push(M.precision),b.push(M.outputColorSpace),b.push(M.envMapMode),b.push(M.envMapCubeUVHeight),b.push(M.mapUv),b.push(M.alphaMapUv),b.push(M.lightMapUv),b.push(M.aoMapUv),b.push(M.bumpMapUv),b.push(M.normalMapUv),b.push(M.displacementMapUv),b.push(M.emissiveMapUv),b.push(M.metalnessMapUv),b.push(M.roughnessMapUv),b.push(M.anisotropyMapUv),b.push(M.clearcoatMapUv),b.push(M.clearcoatNormalMapUv),b.push(M.clearcoatRoughnessMapUv),b.push(M.iridescenceMapUv),b.push(M.iridescenceThicknessMapUv),b.push(M.sheenColorMapUv),b.push(M.sheenRoughnessMapUv),b.push(M.specularMapUv),b.push(M.specularColorMapUv),b.push(M.specularIntensityMapUv),b.push(M.transmissionMapUv),b.push(M.thicknessMapUv),b.push(M.combine),b.push(M.fogExp2),b.push(M.sizeAttenuation),b.push(M.morphTargetsCount),b.push(M.morphAttributeCount),b.push(M.numDirLights),b.push(M.numPointLights),b.push(M.numSpotLights),b.push(M.numSpotLightMaps),b.push(M.numHemiLights),b.push(M.numRectAreaLights),b.push(M.numDirLightShadows),b.push(M.numPointLightShadows),b.push(M.numSpotLightShadows),b.push(M.numSpotLightShadowsWithMaps),b.push(M.numLightProbes),b.push(M.shadowMapType),b.push(M.toneMapping),b.push(M.numClippingPlanes),b.push(M.numClipIntersection),b.push(M.depthPacking)}function y(b,M){a.disableAll(),M.isWebGL2&&a.enable(0),M.supportsVertexTextures&&a.enable(1),M.instancing&&a.enable(2),M.instancingColor&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),b.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),b.push(a.mask)}function v(b){let M=x[b.type],A;if(M){let I=Qn[M];A=Zx.clone(I.uniforms)}else A=b.uniforms;return A}function E(b,M){let A;for(let I=0,z=l.length;I<z;I++){let P=l[I];if(P.cacheKey===M){A=P,++A.usedTimes;break}}return A===void 0&&(A=new sM(n,M,b,r),l.push(A)),A}function S(b){if(--b.usedTimes===0){let M=l.indexOf(b);l[M]=l[l.length-1],l.pop(),b.destroy()}}function w(b){c.remove(b)}function R(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:v,acquireProgram:E,releaseProgram:S,releaseShaderCache:w,programs:l,dispose:R}}function aM(){let n=new WeakMap;function t(r){let o=n.get(r);return o===void 0&&(o={},n.set(r,o)),o}function e(r){n.delete(r)}function i(r,o,a){n.get(r)[o]=a}function s(){n=new WeakMap}return{get:t,remove:e,update:i,dispose:s}}function cM(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.material.id!==t.material.id?n.material.id-t.material.id:n.z!==t.z?n.z-t.z:n.id-t.id}function ad(n,t){return n.groupOrder!==t.groupOrder?n.groupOrder-t.groupOrder:n.renderOrder!==t.renderOrder?n.renderOrder-t.renderOrder:n.z!==t.z?t.z-n.z:n.id-t.id}function cd(){let n=[],t=0,e=[],i=[],s=[];function r(){t=0,e.length=0,i.length=0,s.length=0}function o(u,f,p,x,g,m){let d=n[t];return d===void 0?(d={id:u.id,object:u,geometry:f,material:p,groupOrder:x,renderOrder:u.renderOrder,z:g,group:m},n[t]=d):(d.id=u.id,d.object=u,d.geometry=f,d.material=p,d.groupOrder=x,d.renderOrder=u.renderOrder,d.z=g,d.group=m),t++,d}function a(u,f,p,x,g,m){let d=o(u,f,p,x,g,m);p.transmission>0?i.push(d):p.transparent===!0?s.push(d):e.push(d)}function c(u,f,p,x,g,m){let d=o(u,f,p,x,g,m);p.transmission>0?i.unshift(d):p.transparent===!0?s.unshift(d):e.unshift(d)}function l(u,f){e.length>1&&e.sort(u||cM),i.length>1&&i.sort(f||ad),s.length>1&&s.sort(f||ad)}function h(){for(let u=t,f=n.length;u<f;u++){let p=n[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:i,transparent:s,init:r,push:a,unshift:c,finish:h,sort:l}}function lM(){let n=new WeakMap;function t(i,s){let r=n.get(i),o;return r===void 0?(o=new cd,n.set(i,[o])):s>=r.length?(o=new cd,r.push(o)):o=r[s],o}function e(){n=new WeakMap}return{get:t,dispose:e}}function hM(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new gt};break;case"SpotLight":e={position:new k,direction:new k,color:new gt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new gt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new gt,groundColor:new gt};break;case"RectAreaLight":e={color:new gt,position:new k,halfWidth:new k,halfHeight:new k};break}return n[t.id]=e,e}}}function uM(){let n={};return{get:function(t){if(n[t.id]!==void 0)return n[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Tt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[t.id]=e,e}}}var fM=0;function dM(n,t){return(t.castShadow?2:0)-(n.castShadow?2:0)+(t.map?1:0)-(n.map?1:0)}function pM(n,t){let e=new hM,i=uM(),s={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)s.probe.push(new k);let r=new k,o=new ve,a=new ve;function c(h,u){let f=0,p=0,x=0;for(let I=0;I<9;I++)s.probe[I].set(0,0,0);let g=0,m=0,d=0,_=0,y=0,v=0,E=0,S=0,w=0,R=0,b=0;h.sort(dM);let M=u===!0?Math.PI:1;for(let I=0,z=h.length;I<z;I++){let P=h[I],D=P.color,N=P.intensity,H=P.distance,G=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=D.r*N*M,p+=D.g*N*M,x+=D.b*N*M;else if(P.isLightProbe){for(let V=0;V<9;V++)s.probe[V].addScaledVector(P.sh.coefficients[V],N);b++}else if(P.isDirectionalLight){let V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity*M),P.castShadow){let O=P.shadow,B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,s.directionalShadow[g]=B,s.directionalShadowMap[g]=G,s.directionalShadowMatrix[g]=P.shadow.matrix,v++}s.directional[g]=V,g++}else if(P.isSpotLight){let V=e.get(P);V.position.setFromMatrixPosition(P.matrixWorld),V.color.copy(D).multiplyScalar(N*M),V.distance=H,V.coneCos=Math.cos(P.angle),V.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),V.decay=P.decay,s.spot[d]=V;let O=P.shadow;if(P.map&&(s.spotLightMap[w]=P.map,w++,O.updateMatrices(P),P.castShadow&&R++),s.spotLightMatrix[d]=O.matrix,P.castShadow){let B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,s.spotShadow[d]=B,s.spotShadowMap[d]=G,S++}d++}else if(P.isRectAreaLight){let V=e.get(P);V.color.copy(D).multiplyScalar(N),V.halfWidth.set(P.width*.5,0,0),V.halfHeight.set(0,P.height*.5,0),s.rectArea[_]=V,_++}else if(P.isPointLight){let V=e.get(P);if(V.color.copy(P.color).multiplyScalar(P.intensity*M),V.distance=P.distance,V.decay=P.decay,P.castShadow){let O=P.shadow,B=i.get(P);B.shadowBias=O.bias,B.shadowNormalBias=O.normalBias,B.shadowRadius=O.radius,B.shadowMapSize=O.mapSize,B.shadowCameraNear=O.camera.near,B.shadowCameraFar=O.camera.far,s.pointShadow[m]=B,s.pointShadowMap[m]=G,s.pointShadowMatrix[m]=P.shadow.matrix,E++}s.point[m]=V,m++}else if(P.isHemisphereLight){let V=e.get(P);V.skyColor.copy(P.color).multiplyScalar(N*M),V.groundColor.copy(P.groundColor).multiplyScalar(N*M),s.hemi[y]=V,y++}}_>0&&(t.isWebGL2?n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2):n.has("OES_texture_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_FLOAT_1,s.rectAreaLTC2=Lt.LTC_FLOAT_2):n.has("OES_texture_half_float_linear")===!0?(s.rectAreaLTC1=Lt.LTC_HALF_1,s.rectAreaLTC2=Lt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),s.ambient[0]=f,s.ambient[1]=p,s.ambient[2]=x;let A=s.hash;(A.directionalLength!==g||A.pointLength!==m||A.spotLength!==d||A.rectAreaLength!==_||A.hemiLength!==y||A.numDirectionalShadows!==v||A.numPointShadows!==E||A.numSpotShadows!==S||A.numSpotMaps!==w||A.numLightProbes!==b)&&(s.directional.length=g,s.spot.length=d,s.rectArea.length=_,s.point.length=m,s.hemi.length=y,s.directionalShadow.length=v,s.directionalShadowMap.length=v,s.pointShadow.length=E,s.pointShadowMap.length=E,s.spotShadow.length=S,s.spotShadowMap.length=S,s.directionalShadowMatrix.length=v,s.pointShadowMatrix.length=E,s.spotLightMatrix.length=S+w-R,s.spotLightMap.length=w,s.numSpotLightShadowsWithMaps=R,s.numLightProbes=b,A.directionalLength=g,A.pointLength=m,A.spotLength=d,A.rectAreaLength=_,A.hemiLength=y,A.numDirectionalShadows=v,A.numPointShadows=E,A.numSpotShadows=S,A.numSpotMaps=w,A.numLightProbes=b,s.version=fM++)}function l(h,u){let f=0,p=0,x=0,g=0,m=0,d=u.matrixWorldInverse;for(let _=0,y=h.length;_<y;_++){let v=h[_];if(v.isDirectionalLight){let E=s.directional[f];E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(d),f++}else if(v.isSpotLight){let E=s.spot[x];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),E.direction.setFromMatrixPosition(v.matrixWorld),r.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(r),E.direction.transformDirection(d),x++}else if(v.isRectAreaLight){let E=s.rectArea[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),a.identity(),o.copy(v.matrixWorld),o.premultiply(d),a.extractRotation(o),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),g++}else if(v.isPointLight){let E=s.point[p];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(d),p++}else if(v.isHemisphereLight){let E=s.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(d),m++}}}return{setup:c,setupView:l,state:s}}function ld(n,t){let e=new pM(n,t),i=[],s=[];function r(){i.length=0,s.length=0}function o(u){i.push(u)}function a(u){s.push(u)}function c(u){e.setup(i,u)}function l(u){e.setupView(i,u)}return{init:r,state:{lightsArray:i,shadowsArray:s,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function mM(n,t){let e=new WeakMap;function i(r,o=0){let a=e.get(r),c;return a===void 0?(c=new ld(n,t),e.set(r,[c])):o>=a.length?(c=new ld(n,t),a.push(c)):c=a[o],c}function s(){e=new WeakMap}return{get:i,dispose:s}}var Jl=class extends Fi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=lx,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},Kl=class extends Fi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},gM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,xM=`uniform sampler2D shadow_pass;
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
}`;function _M(n,t,e){let i=new no,s=new Tt,r=new Tt,o=new Je,a=new Jl({depthPacking:hx}),c=new Kl,l={},h=e.maxTextureSize,u={[Ui]:fn,[fn]:Ui,[Ie]:Ie},f=new di({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Tt},radius:{value:4}},vertexShader:gM,fragmentShader:xM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let x=new ae;x.setAttribute("position",new Ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let g=new Nt(x,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sd;let d=this.type;this.render=function(S,w,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;let b=n.getRenderTarget(),M=n.getActiveCubeFace(),A=n.getActiveMipmapLevel(),I=n.state;I.setBlending(Ii),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);let z=d!==ci&&this.type===ci,P=d===ci&&this.type!==ci;for(let D=0,N=S.length;D<N;D++){let H=S[D],G=H.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",H,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;s.copy(G.mapSize);let V=G.getFrameExtents();if(s.multiply(V),r.copy(G.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/V.x),s.x=r.x*V.x,G.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/V.y),s.y=r.y*V.y,G.mapSize.y=r.y)),G.map===null||z===!0||P===!0){let B=this.type!==ci?{minFilter:Qe,magFilter:Qe}:{};G.map!==null&&G.map.dispose(),G.map=new fi(s.x,s.y,B),G.map.texture.name=H.name+".shadowMap",G.camera.updateProjectionMatrix()}n.setRenderTarget(G.map),n.clear();let O=G.getViewportCount();for(let B=0;B<O;B++){let j=G.getViewport(B);o.set(r.x*j.x,r.y*j.y,r.x*j.z,r.y*j.w),I.viewport(o),G.updateMatrices(H,B),i=G.getFrustum(),v(w,R,G.camera,H,this.type)}G.isPointLightShadow!==!0&&this.type===ci&&_(G,R),G.needsUpdate=!1}d=this.type,m.needsUpdate=!1,n.setRenderTarget(b,M,A)};function _(S,w){let R=t.update(g);f.defines.VSM_SAMPLES!==S.blurSamples&&(f.defines.VSM_SAMPLES=S.blurSamples,p.defines.VSM_SAMPLES=S.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new fi(s.x,s.y)),f.uniforms.shadow_pass.value=S.map.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,n.setRenderTarget(S.mapPass),n.clear(),n.renderBufferDirect(w,null,R,f,g,null),p.uniforms.shadow_pass.value=S.mapPass.texture,p.uniforms.resolution.value=S.mapSize,p.uniforms.radius.value=S.radius,n.setRenderTarget(S.map),n.clear(),n.renderBufferDirect(w,null,R,p,g,null)}function y(S,w,R,b){let M=null,A=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(A!==void 0)M=A;else if(M=R.isPointLight===!0?c:a,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){let I=M.uuid,z=w.uuid,P=l[I];P===void 0&&(P={},l[I]=P);let D=P[z];D===void 0&&(D=M.clone(),P[z]=D,w.addEventListener("dispose",E)),M=D}if(M.visible=w.visible,M.wireframe=w.wireframe,b===ci?M.side=w.shadowSide!==null?w.shadowSide:w.side:M.side=w.shadowSide!==null?w.shadowSide:u[w.side],M.alphaMap=w.alphaMap,M.alphaTest=w.alphaTest,M.map=w.map,M.clipShadows=w.clipShadows,M.clippingPlanes=w.clippingPlanes,M.clipIntersection=w.clipIntersection,M.displacementMap=w.displacementMap,M.displacementScale=w.displacementScale,M.displacementBias=w.displacementBias,M.wireframeLinewidth=w.wireframeLinewidth,M.linewidth=w.linewidth,R.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let I=n.properties.get(M);I.light=R}return M}function v(S,w,R,b,M){if(S.visible===!1)return;if(S.layers.test(w.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&M===ci)&&(!S.frustumCulled||i.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);let z=t.update(S),P=S.material;if(Array.isArray(P)){let D=z.groups;for(let N=0,H=D.length;N<H;N++){let G=D[N],V=P[G.materialIndex];if(V&&V.visible){let O=y(S,V,b,M);S.onBeforeShadow(n,S,w,R,z,O,G),n.renderBufferDirect(R,null,z,O,S,G),S.onAfterShadow(n,S,w,R,z,O,G)}}}else if(P.visible){let D=y(S,P,b,M);S.onBeforeShadow(n,S,w,R,z,D,null),n.renderBufferDirect(R,null,z,D,S,null),S.onAfterShadow(n,S,w,R,z,D,null)}}let I=S.children;for(let z=0,P=I.length;z<P;z++)v(I[z],w,R,b,M)}function E(S){S.target.removeEventListener("dispose",E);for(let R in l){let b=l[R],M=S.target.uuid;M in b&&(b[M].dispose(),delete b[M])}}}function yM(n,t,e){let i=e.isWebGL2;function s(){let Z=!1,Ct=new Je,Ot=null,te=new Je(0,0,0,0);return{setMask:function(Qt){Ot!==Qt&&!Z&&(n.colorMask(Qt,Qt,Qt,Qt),Ot=Qt)},setLocked:function(Qt){Z=Qt},setClear:function(Qt,pe,me,Ce,Ne){Ne===!0&&(Qt*=Ce,pe*=Ce,me*=Ce),Ct.set(Qt,pe,me,Ce),te.equals(Ct)===!1&&(n.clearColor(Qt,pe,me,Ce),te.copy(Ct))},reset:function(){Z=!1,Ot=null,te.set(-1,0,0,0)}}}function r(){let Z=!1,Ct=null,Ot=null,te=null;return{setTest:function(Qt){Qt?ct(n.DEPTH_TEST):xt(n.DEPTH_TEST)},setMask:function(Qt){Ct!==Qt&&!Z&&(n.depthMask(Qt),Ct=Qt)},setFunc:function(Qt){if(Ot!==Qt){switch(Qt){case H0:n.depthFunc(n.NEVER);break;case G0:n.depthFunc(n.ALWAYS);break;case V0:n.depthFunc(n.LESS);break;case ir:n.depthFunc(n.LEQUAL);break;case W0:n.depthFunc(n.EQUAL);break;case X0:n.depthFunc(n.GEQUAL);break;case Th:n.depthFunc(n.GREATER);break;case q0:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ot=Qt}},setLocked:function(Qt){Z=Qt},setClear:function(Qt){te!==Qt&&(n.clearDepth(Qt),te=Qt)},reset:function(){Z=!1,Ct=null,Ot=null,te=null}}}function o(){let Z=!1,Ct=null,Ot=null,te=null,Qt=null,pe=null,me=null,Ce=null,Ne=null;return{setTest:function(ge){Z||(ge?ct(n.STENCIL_TEST):xt(n.STENCIL_TEST))},setMask:function(ge){Ct!==ge&&!Z&&(n.stencilMask(ge),Ct=ge)},setFunc:function(ge,ze,qe){(Ot!==ge||te!==ze||Qt!==qe)&&(n.stencilFunc(ge,ze,qe),Ot=ge,te=ze,Qt=qe)},setOp:function(ge,ze,qe){(pe!==ge||me!==ze||Ce!==qe)&&(n.stencilOp(ge,ze,qe),pe=ge,me=ze,Ce=qe)},setLocked:function(ge){Z=ge},setClear:function(ge){Ne!==ge&&(n.clearStencil(ge),Ne=ge)},reset:function(){Z=!1,Ct=null,Ot=null,te=null,Qt=null,pe=null,me=null,Ce=null,Ne=null}}}let a=new s,c=new r,l=new o,h=new WeakMap,u=new WeakMap,f={},p={},x=new WeakMap,g=[],m=null,d=!1,_=null,y=null,v=null,E=null,S=null,w=null,R=null,b=new gt(0,0,0),M=0,A=!1,I=null,z=null,P=null,D=null,N=null,H=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,V=0,O=n.getParameter(n.VERSION);O.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(O)[1]),G=V>=1):O.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),G=V>=2);let B=null,j={},Y=n.getParameter(n.SCISSOR_BOX),rt=n.getParameter(n.VIEWPORT),at=new Je().fromArray(Y),tt=new Je().fromArray(rt);function ut(Z,Ct,Ot,te){let Qt=new Uint8Array(4),pe=n.createTexture();n.bindTexture(Z,pe),n.texParameteri(Z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let me=0;me<Ot;me++)i&&(Z===n.TEXTURE_3D||Z===n.TEXTURE_2D_ARRAY)?n.texImage3D(Ct,0,n.RGBA,1,1,te,0,n.RGBA,n.UNSIGNED_BYTE,Qt):n.texImage2D(Ct+me,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Qt);return pe}let lt={};lt[n.TEXTURE_2D]=ut(n.TEXTURE_2D,n.TEXTURE_2D,1),lt[n.TEXTURE_CUBE_MAP]=ut(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),i&&(lt[n.TEXTURE_2D_ARRAY]=ut(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),lt[n.TEXTURE_3D]=ut(n.TEXTURE_3D,n.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ct(n.DEPTH_TEST),c.setFunc(ir),nt(!1),L(Hu),ct(n.CULL_FACE),it(Ii);function ct(Z){f[Z]!==!0&&(n.enable(Z),f[Z]=!0)}function xt(Z){f[Z]!==!1&&(n.disable(Z),f[Z]=!1)}function wt(Z,Ct){return p[Z]!==Ct?(n.bindFramebuffer(Z,Ct),p[Z]=Ct,i&&(Z===n.DRAW_FRAMEBUFFER&&(p[n.FRAMEBUFFER]=Ct),Z===n.FRAMEBUFFER&&(p[n.DRAW_FRAMEBUFFER]=Ct)),!0):!1}function F(Z,Ct){let Ot=g,te=!1;if(Z)if(Ot=x.get(Ct),Ot===void 0&&(Ot=[],x.set(Ct,Ot)),Z.isWebGLMultipleRenderTargets){let Qt=Z.texture;if(Ot.length!==Qt.length||Ot[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,me=Qt.length;pe<me;pe++)Ot[pe]=n.COLOR_ATTACHMENT0+pe;Ot.length=Qt.length,te=!0}}else Ot[0]!==n.COLOR_ATTACHMENT0&&(Ot[0]=n.COLOR_ATTACHMENT0,te=!0);else Ot[0]!==n.BACK&&(Ot[0]=n.BACK,te=!0);te&&(e.isWebGL2?n.drawBuffers(Ot):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ot))}function Mt(Z){return m!==Z?(n.useProgram(Z),m=Z,!0):!1}let Q={[is]:n.FUNC_ADD,[T0]:n.FUNC_SUBTRACT,[A0]:n.FUNC_REVERSE_SUBTRACT};if(i)Q[Xu]=n.MIN,Q[qu]=n.MAX;else{let Z=t.get("EXT_blend_minmax");Z!==null&&(Q[Xu]=Z.MIN_EXT,Q[qu]=Z.MAX_EXT)}let et={[R0]:n.ZERO,[C0]:n.ONE,[P0]:n.SRC_COLOR,[Ll]:n.SRC_ALPHA,[z0]:n.SRC_ALPHA_SATURATE,[U0]:n.DST_COLOR,[L0]:n.DST_ALPHA,[I0]:n.ONE_MINUS_SRC_COLOR,[Dl]:n.ONE_MINUS_SRC_ALPHA,[N0]:n.ONE_MINUS_DST_COLOR,[D0]:n.ONE_MINUS_DST_ALPHA,[O0]:n.CONSTANT_COLOR,[F0]:n.ONE_MINUS_CONSTANT_COLOR,[B0]:n.CONSTANT_ALPHA,[k0]:n.ONE_MINUS_CONSTANT_ALPHA};function it(Z,Ct,Ot,te,Qt,pe,me,Ce,Ne,ge){if(Z===Ii){d===!0&&(xt(n.BLEND),d=!1);return}if(d===!1&&(ct(n.BLEND),d=!0),Z!==w0){if(Z!==_||ge!==A){if((y!==is||S!==is)&&(n.blendEquation(n.FUNC_ADD),y=is,S=is),ge)switch(Z){case tr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gu:n.blendFunc(n.ONE,n.ONE);break;case Vu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wu:n.blendFuncSeparate(n.ZERO,n.SRC_COLOR,n.ZERO,n.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}else switch(Z){case tr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Gu:n.blendFunc(n.SRC_ALPHA,n.ONE);break;case Vu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Wu:n.blendFunc(n.ZERO,n.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",Z);break}v=null,E=null,w=null,R=null,b.set(0,0,0),M=0,_=Z,A=ge}return}Qt=Qt||Ct,pe=pe||Ot,me=me||te,(Ct!==y||Qt!==S)&&(n.blendEquationSeparate(Q[Ct],Q[Qt]),y=Ct,S=Qt),(Ot!==v||te!==E||pe!==w||me!==R)&&(n.blendFuncSeparate(et[Ot],et[te],et[pe],et[me]),v=Ot,E=te,w=pe,R=me),(Ce.equals(b)===!1||Ne!==M)&&(n.blendColor(Ce.r,Ce.g,Ce.b,Ne),b.copy(Ce),M=Ne),_=Z,A=!1}function bt(Z,Ct){Z.side===Ie?xt(n.CULL_FACE):ct(n.CULL_FACE);let Ot=Z.side===fn;Ct&&(Ot=!Ot),nt(Ot),Z.blending===tr&&Z.transparent===!1?it(Ii):it(Z.blending,Z.blendEquation,Z.blendSrc,Z.blendDst,Z.blendEquationAlpha,Z.blendSrcAlpha,Z.blendDstAlpha,Z.blendColor,Z.blendAlpha,Z.premultipliedAlpha),c.setFunc(Z.depthFunc),c.setTest(Z.depthTest),c.setMask(Z.depthWrite),a.setMask(Z.colorWrite);let te=Z.stencilWrite;l.setTest(te),te&&(l.setMask(Z.stencilWriteMask),l.setFunc(Z.stencilFunc,Z.stencilRef,Z.stencilFuncMask),l.setOp(Z.stencilFail,Z.stencilZFail,Z.stencilZPass)),J(Z.polygonOffset,Z.polygonOffsetFactor,Z.polygonOffsetUnits),Z.alphaToCoverage===!0?ct(n.SAMPLE_ALPHA_TO_COVERAGE):xt(n.SAMPLE_ALPHA_TO_COVERAGE)}function nt(Z){I!==Z&&(Z?n.frontFace(n.CW):n.frontFace(n.CCW),I=Z)}function L(Z){Z!==E0?(ct(n.CULL_FACE),Z!==z&&(Z===Hu?n.cullFace(n.BACK):Z===S0?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):xt(n.CULL_FACE),z=Z}function C(Z){Z!==P&&(G&&n.lineWidth(Z),P=Z)}function J(Z,Ct,Ot){Z?(ct(n.POLYGON_OFFSET_FILL),(D!==Ct||N!==Ot)&&(n.polygonOffset(Ct,Ot),D=Ct,N=Ot)):xt(n.POLYGON_OFFSET_FILL)}function _t(Z){Z?ct(n.SCISSOR_TEST):xt(n.SCISSOR_TEST)}function mt(Z){Z===void 0&&(Z=n.TEXTURE0+H-1),B!==Z&&(n.activeTexture(Z),B=Z)}function yt(Z,Ct,Ot){Ot===void 0&&(B===null?Ot=n.TEXTURE0+H-1:Ot=B);let te=j[Ot];te===void 0&&(te={type:void 0,texture:void 0},j[Ot]=te),(te.type!==Z||te.texture!==Ct)&&(B!==Ot&&(n.activeTexture(Ot),B=Ot),n.bindTexture(Z,Ct||lt[Z]),te.type=Z,te.texture=Ct)}function Ft(){let Z=j[B];Z!==void 0&&Z.type!==void 0&&(n.bindTexture(Z.type,null),Z.type=void 0,Z.texture=void 0)}function It(){try{n.compressedTexImage2D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Ht(){try{n.compressedTexImage3D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Yt(){try{n.texSubImage2D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ee(){try{n.texSubImage3D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Et(){try{n.compressedTexSubImage2D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function he(){try{n.compressedTexSubImage3D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function ne(){try{n.texStorage2D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Kt(){try{n.texStorage3D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Wt(){try{n.texImage2D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function Vt(){try{n.texImage3D.apply(n,arguments)}catch(Z){console.error("THREE.WebGLState:",Z)}}function $t(Z){at.equals(Z)===!1&&(n.scissor(Z.x,Z.y,Z.z,Z.w),at.copy(Z))}function re(Z){tt.equals(Z)===!1&&(n.viewport(Z.x,Z.y,Z.z,Z.w),tt.copy(Z))}function ye(Z,Ct){let Ot=u.get(Ct);Ot===void 0&&(Ot=new WeakMap,u.set(Ct,Ot));let te=Ot.get(Z);te===void 0&&(te=n.getUniformBlockIndex(Ct,Z.name),Ot.set(Z,te))}function ie(Z,Ct){let te=u.get(Ct).get(Z);h.get(Ct)!==te&&(n.uniformBlockBinding(Ct,te,Z.__bindingPointIndex),h.set(Ct,te))}function At(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),i===!0&&(n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null)),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),f={},B=null,j={},p={},x=new WeakMap,g=[],m=null,d=!1,_=null,y=null,v=null,E=null,S=null,w=null,R=null,b=new gt(0,0,0),M=0,A=!1,I=null,z=null,P=null,D=null,N=null,at.set(0,0,n.canvas.width,n.canvas.height),tt.set(0,0,n.canvas.width,n.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ct,disable:xt,bindFramebuffer:wt,drawBuffers:F,useProgram:Mt,setBlending:it,setMaterial:bt,setFlipSided:nt,setCullFace:L,setLineWidth:C,setPolygonOffset:J,setScissorTest:_t,activeTexture:mt,bindTexture:yt,unbindTexture:Ft,compressedTexImage2D:It,compressedTexImage3D:Ht,texImage2D:Wt,texImage3D:Vt,updateUBOMapping:ye,uniformBlockBinding:ie,texStorage2D:ne,texStorage3D:Kt,texSubImage2D:Yt,texSubImage3D:ee,compressedTexSubImage2D:Et,compressedTexSubImage3D:he,scissor:$t,viewport:re,reset:At}}function vM(n,t,e,i,s,r,o){let a=s.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap,u,f=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(L,C){return p?new OffscreenCanvas(L,C):Da("canvas")}function g(L,C,J,_t){let mt=1;if((L.width>_t||L.height>_t)&&(mt=_t/Math.max(L.width,L.height)),mt<1||C===!0)if(typeof HTMLImageElement<"u"&&L instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&L instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&L instanceof ImageBitmap){let yt=C?La:Math.floor,Ft=yt(mt*L.width),It=yt(mt*L.height);u===void 0&&(u=x(Ft,It));let Ht=J?x(Ft,It):u;return Ht.width=Ft,Ht.height=It,Ht.getContext("2d").drawImage(L,0,0,Ft,It),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+Ft+"x"+It+")."),Ht}else return"data"in L&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),L;return L}function m(L){return Bl(L.width)&&Bl(L.height)}function d(L){return a?!1:L.wrapS!==Vn||L.wrapT!==Vn||L.minFilter!==Qe&&L.minFilter!==on}function _(L,C){return L.generateMipmaps&&C&&L.minFilter!==Qe&&L.minFilter!==on}function y(L){n.generateMipmap(L)}function v(L,C,J,_t,mt=!1){if(a===!1)return C;if(L!==null){if(n[L]!==void 0)return n[L];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+L+"'")}let yt=C;if(C===n.RED&&(J===n.FLOAT&&(yt=n.R32F),J===n.HALF_FLOAT&&(yt=n.R16F),J===n.UNSIGNED_BYTE&&(yt=n.R8)),C===n.RED_INTEGER&&(J===n.UNSIGNED_BYTE&&(yt=n.R8UI),J===n.UNSIGNED_SHORT&&(yt=n.R16UI),J===n.UNSIGNED_INT&&(yt=n.R32UI),J===n.BYTE&&(yt=n.R8I),J===n.SHORT&&(yt=n.R16I),J===n.INT&&(yt=n.R32I)),C===n.RG&&(J===n.FLOAT&&(yt=n.RG32F),J===n.HALF_FLOAT&&(yt=n.RG16F),J===n.UNSIGNED_BYTE&&(yt=n.RG8)),C===n.RGBA){let Ft=mt?Ra:xe.getTransfer(_t);J===n.FLOAT&&(yt=n.RGBA32F),J===n.HALF_FLOAT&&(yt=n.RGBA16F),J===n.UNSIGNED_BYTE&&(yt=Ft===Ee?n.SRGB8_ALPHA8:n.RGBA8),J===n.UNSIGNED_SHORT_4_4_4_4&&(yt=n.RGBA4),J===n.UNSIGNED_SHORT_5_5_5_1&&(yt=n.RGB5_A1)}return(yt===n.R16F||yt===n.R32F||yt===n.RG16F||yt===n.RG32F||yt===n.RGBA16F||yt===n.RGBA32F)&&t.get("EXT_color_buffer_float"),yt}function E(L,C,J){return _(L,J)===!0||L.isFramebufferTexture&&L.minFilter!==Qe&&L.minFilter!==on?Math.log2(Math.max(C.width,C.height))+1:L.mipmaps!==void 0&&L.mipmaps.length>0?L.mipmaps.length:L.isCompressedTexture&&Array.isArray(L.image)?C.mipmaps.length:1}function S(L){return L===Qe||L===Yu||L===jc?n.NEAREST:n.LINEAR}function w(L){let C=L.target;C.removeEventListener("dispose",w),b(C),C.isVideoTexture&&h.delete(C)}function R(L){let C=L.target;C.removeEventListener("dispose",R),A(C)}function b(L){let C=i.get(L);if(C.__webglInit===void 0)return;let J=L.source,_t=f.get(J);if(_t){let mt=_t[C.__cacheKey];mt.usedTimes--,mt.usedTimes===0&&M(L),Object.keys(_t).length===0&&f.delete(J)}i.remove(L)}function M(L){let C=i.get(L);n.deleteTexture(C.__webglTexture);let J=L.source,_t=f.get(J);delete _t[C.__cacheKey],o.memory.textures--}function A(L){let C=L.texture,J=i.get(L),_t=i.get(C);if(_t.__webglTexture!==void 0&&(n.deleteTexture(_t.__webglTexture),o.memory.textures--),L.depthTexture&&L.depthTexture.dispose(),L.isWebGLCubeRenderTarget)for(let mt=0;mt<6;mt++){if(Array.isArray(J.__webglFramebuffer[mt]))for(let yt=0;yt<J.__webglFramebuffer[mt].length;yt++)n.deleteFramebuffer(J.__webglFramebuffer[mt][yt]);else n.deleteFramebuffer(J.__webglFramebuffer[mt]);J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer[mt])}else{if(Array.isArray(J.__webglFramebuffer))for(let mt=0;mt<J.__webglFramebuffer.length;mt++)n.deleteFramebuffer(J.__webglFramebuffer[mt]);else n.deleteFramebuffer(J.__webglFramebuffer);if(J.__webglDepthbuffer&&n.deleteRenderbuffer(J.__webglDepthbuffer),J.__webglMultisampledFramebuffer&&n.deleteFramebuffer(J.__webglMultisampledFramebuffer),J.__webglColorRenderbuffer)for(let mt=0;mt<J.__webglColorRenderbuffer.length;mt++)J.__webglColorRenderbuffer[mt]&&n.deleteRenderbuffer(J.__webglColorRenderbuffer[mt]);J.__webglDepthRenderbuffer&&n.deleteRenderbuffer(J.__webglDepthRenderbuffer)}if(L.isWebGLMultipleRenderTargets)for(let mt=0,yt=C.length;mt<yt;mt++){let Ft=i.get(C[mt]);Ft.__webglTexture&&(n.deleteTexture(Ft.__webglTexture),o.memory.textures--),i.remove(C[mt])}i.remove(C),i.remove(L)}let I=0;function z(){I=0}function P(){let L=I;return L>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+L+" texture units while this GPU supports only "+s.maxTextures),I+=1,L}function D(L){let C=[];return C.push(L.wrapS),C.push(L.wrapT),C.push(L.wrapR||0),C.push(L.magFilter),C.push(L.minFilter),C.push(L.anisotropy),C.push(L.internalFormat),C.push(L.format),C.push(L.type),C.push(L.generateMipmaps),C.push(L.premultiplyAlpha),C.push(L.flipY),C.push(L.unpackAlignment),C.push(L.colorSpace),C.join()}function N(L,C){let J=i.get(L);if(L.isVideoTexture&&bt(L),L.isRenderTargetTexture===!1&&L.version>0&&J.__version!==L.version){let _t=L.image;if(_t===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(_t.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{at(J,L,C);return}}e.bindTexture(n.TEXTURE_2D,J.__webglTexture,n.TEXTURE0+C)}function H(L,C){let J=i.get(L);if(L.version>0&&J.__version!==L.version){at(J,L,C);return}e.bindTexture(n.TEXTURE_2D_ARRAY,J.__webglTexture,n.TEXTURE0+C)}function G(L,C){let J=i.get(L);if(L.version>0&&J.__version!==L.version){at(J,L,C);return}e.bindTexture(n.TEXTURE_3D,J.__webglTexture,n.TEXTURE0+C)}function V(L,C){let J=i.get(L);if(L.version>0&&J.__version!==L.version){tt(J,L,C);return}e.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture,n.TEXTURE0+C)}let O={[zl]:n.REPEAT,[Vn]:n.CLAMP_TO_EDGE,[Ol]:n.MIRRORED_REPEAT},B={[Qe]:n.NEAREST,[Yu]:n.NEAREST_MIPMAP_NEAREST,[jc]:n.NEAREST_MIPMAP_LINEAR,[on]:n.LINEAR,[tx]:n.LINEAR_MIPMAP_NEAREST,[Kr]:n.LINEAR_MIPMAP_LINEAR},j={[fx]:n.NEVER,[_x]:n.ALWAYS,[dx]:n.LESS,[zd]:n.LEQUAL,[px]:n.EQUAL,[xx]:n.GEQUAL,[mx]:n.GREATER,[gx]:n.NOTEQUAL};function Y(L,C,J){if(J?(n.texParameteri(L,n.TEXTURE_WRAP_S,O[C.wrapS]),n.texParameteri(L,n.TEXTURE_WRAP_T,O[C.wrapT]),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,O[C.wrapR]),n.texParameteri(L,n.TEXTURE_MAG_FILTER,B[C.magFilter]),n.texParameteri(L,n.TEXTURE_MIN_FILTER,B[C.minFilter])):(n.texParameteri(L,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(L,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE),(L===n.TEXTURE_3D||L===n.TEXTURE_2D_ARRAY)&&n.texParameteri(L,n.TEXTURE_WRAP_R,n.CLAMP_TO_EDGE),(C.wrapS!==Vn||C.wrapT!==Vn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),n.texParameteri(L,n.TEXTURE_MAG_FILTER,S(C.magFilter)),n.texParameteri(L,n.TEXTURE_MIN_FILTER,S(C.minFilter)),C.minFilter!==Qe&&C.minFilter!==on&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(n.texParameteri(L,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(L,n.TEXTURE_COMPARE_FUNC,j[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){let _t=t.get("EXT_texture_filter_anisotropic");if(C.magFilter===Qe||C.minFilter!==jc&&C.minFilter!==Kr||C.type===Pi&&t.has("OES_texture_float_linear")===!1||a===!1&&C.type===jr&&t.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||i.get(C).__currentAnisotropy)&&(n.texParameterf(L,_t.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,s.getMaxAnisotropy())),i.get(C).__currentAnisotropy=C.anisotropy)}}function rt(L,C){let J=!1;L.__webglInit===void 0&&(L.__webglInit=!0,C.addEventListener("dispose",w));let _t=C.source,mt=f.get(_t);mt===void 0&&(mt={},f.set(_t,mt));let yt=D(C);if(yt!==L.__cacheKey){mt[yt]===void 0&&(mt[yt]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,J=!0),mt[yt].usedTimes++;let Ft=mt[L.__cacheKey];Ft!==void 0&&(mt[L.__cacheKey].usedTimes--,Ft.usedTimes===0&&M(C)),L.__cacheKey=yt,L.__webglTexture=mt[yt].texture}return J}function at(L,C,J){let _t=n.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(_t=n.TEXTURE_2D_ARRAY),C.isData3DTexture&&(_t=n.TEXTURE_3D);let mt=rt(L,C),yt=C.source;e.bindTexture(_t,L.__webglTexture,n.TEXTURE0+J);let Ft=i.get(yt);if(yt.version!==Ft.__version||mt===!0){e.activeTexture(n.TEXTURE0+J);let It=xe.getPrimaries(xe.workingColorSpace),Ht=C.colorSpace===In?null:xe.getPrimaries(C.colorSpace),Yt=C.colorSpace===In||It===Ht?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Yt);let ee=d(C)&&m(C.image)===!1,Et=g(C.image,ee,!1,s.maxTextureSize);Et=nt(C,Et);let he=m(Et)||a,ne=r.convert(C.format,C.colorSpace),Kt=r.convert(C.type),Wt=v(C.internalFormat,ne,Kt,C.colorSpace,C.isVideoTexture);Y(_t,C,he);let Vt,$t=C.mipmaps,re=a&&C.isVideoTexture!==!0&&Wt!==Dd,ye=Ft.__version===void 0||mt===!0,ie=E(C,Et,he);if(C.isDepthTexture)Wt=n.DEPTH_COMPONENT,a?C.type===Pi?Wt=n.DEPTH_COMPONENT32F:C.type===Ci?Wt=n.DEPTH_COMPONENT24:C.type===rs?Wt=n.DEPTH24_STENCIL8:Wt=n.DEPTH_COMPONENT16:C.type===Pi&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===os&&Wt===n.DEPTH_COMPONENT&&C.type!==Rh&&C.type!==Ci&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Ci,Kt=r.convert(C.type)),C.format===or&&Wt===n.DEPTH_COMPONENT&&(Wt=n.DEPTH_STENCIL,C.type!==rs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=rs,Kt=r.convert(C.type))),ye&&(re?e.texStorage2D(n.TEXTURE_2D,1,Wt,Et.width,Et.height):e.texImage2D(n.TEXTURE_2D,0,Wt,Et.width,Et.height,0,ne,Kt,null));else if(C.isDataTexture)if($t.length>0&&he){re&&ye&&e.texStorage2D(n.TEXTURE_2D,ie,Wt,$t[0].width,$t[0].height);for(let At=0,Z=$t.length;At<Z;At++)Vt=$t[At],re?e.texSubImage2D(n.TEXTURE_2D,At,0,0,Vt.width,Vt.height,ne,Kt,Vt.data):e.texImage2D(n.TEXTURE_2D,At,Wt,Vt.width,Vt.height,0,ne,Kt,Vt.data);C.generateMipmaps=!1}else re?(ye&&e.texStorage2D(n.TEXTURE_2D,ie,Wt,Et.width,Et.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,Et.width,Et.height,ne,Kt,Et.data)):e.texImage2D(n.TEXTURE_2D,0,Wt,Et.width,Et.height,0,ne,Kt,Et.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){re&&ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ie,Wt,$t[0].width,$t[0].height,Et.depth);for(let At=0,Z=$t.length;At<Z;At++)Vt=$t[At],C.format!==Wn?ne!==null?re?e.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,At,0,0,0,Vt.width,Vt.height,Et.depth,ne,Vt.data,0,0):e.compressedTexImage3D(n.TEXTURE_2D_ARRAY,At,Wt,Vt.width,Vt.height,Et.depth,0,Vt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?e.texSubImage3D(n.TEXTURE_2D_ARRAY,At,0,0,0,Vt.width,Vt.height,Et.depth,ne,Kt,Vt.data):e.texImage3D(n.TEXTURE_2D_ARRAY,At,Wt,Vt.width,Vt.height,Et.depth,0,ne,Kt,Vt.data)}else{re&&ye&&e.texStorage2D(n.TEXTURE_2D,ie,Wt,$t[0].width,$t[0].height);for(let At=0,Z=$t.length;At<Z;At++)Vt=$t[At],C.format!==Wn?ne!==null?re?e.compressedTexSubImage2D(n.TEXTURE_2D,At,0,0,Vt.width,Vt.height,ne,Vt.data):e.compressedTexImage2D(n.TEXTURE_2D,At,Wt,Vt.width,Vt.height,0,Vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):re?e.texSubImage2D(n.TEXTURE_2D,At,0,0,Vt.width,Vt.height,ne,Kt,Vt.data):e.texImage2D(n.TEXTURE_2D,At,Wt,Vt.width,Vt.height,0,ne,Kt,Vt.data)}else if(C.isDataArrayTexture)re?(ye&&e.texStorage3D(n.TEXTURE_2D_ARRAY,ie,Wt,Et.width,Et.height,Et.depth),e.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,Et.width,Et.height,Et.depth,ne,Kt,Et.data)):e.texImage3D(n.TEXTURE_2D_ARRAY,0,Wt,Et.width,Et.height,Et.depth,0,ne,Kt,Et.data);else if(C.isData3DTexture)re?(ye&&e.texStorage3D(n.TEXTURE_3D,ie,Wt,Et.width,Et.height,Et.depth),e.texSubImage3D(n.TEXTURE_3D,0,0,0,0,Et.width,Et.height,Et.depth,ne,Kt,Et.data)):e.texImage3D(n.TEXTURE_3D,0,Wt,Et.width,Et.height,Et.depth,0,ne,Kt,Et.data);else if(C.isFramebufferTexture){if(ye)if(re)e.texStorage2D(n.TEXTURE_2D,ie,Wt,Et.width,Et.height);else{let At=Et.width,Z=Et.height;for(let Ct=0;Ct<ie;Ct++)e.texImage2D(n.TEXTURE_2D,Ct,Wt,At,Z,0,ne,Kt,null),At>>=1,Z>>=1}}else if($t.length>0&&he){re&&ye&&e.texStorage2D(n.TEXTURE_2D,ie,Wt,$t[0].width,$t[0].height);for(let At=0,Z=$t.length;At<Z;At++)Vt=$t[At],re?e.texSubImage2D(n.TEXTURE_2D,At,0,0,ne,Kt,Vt):e.texImage2D(n.TEXTURE_2D,At,Wt,ne,Kt,Vt);C.generateMipmaps=!1}else re?(ye&&e.texStorage2D(n.TEXTURE_2D,ie,Wt,Et.width,Et.height),e.texSubImage2D(n.TEXTURE_2D,0,0,0,ne,Kt,Et)):e.texImage2D(n.TEXTURE_2D,0,Wt,ne,Kt,Et);_(C,he)&&y(_t),Ft.__version=yt.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function tt(L,C,J){if(C.image.length!==6)return;let _t=rt(L,C),mt=C.source;e.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+J);let yt=i.get(mt);if(mt.version!==yt.__version||_t===!0){e.activeTexture(n.TEXTURE0+J);let Ft=xe.getPrimaries(xe.workingColorSpace),It=C.colorSpace===In?null:xe.getPrimaries(C.colorSpace),Ht=C.colorSpace===In||Ft===It?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,C.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,C.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ht);let Yt=C.isCompressedTexture||C.image[0].isCompressedTexture,ee=C.image[0]&&C.image[0].isDataTexture,Et=[];for(let At=0;At<6;At++)!Yt&&!ee?Et[At]=g(C.image[At],!1,!0,s.maxCubemapSize):Et[At]=ee?C.image[At].image:C.image[At],Et[At]=nt(C,Et[At]);let he=Et[0],ne=m(he)||a,Kt=r.convert(C.format,C.colorSpace),Wt=r.convert(C.type),Vt=v(C.internalFormat,Kt,Wt,C.colorSpace),$t=a&&C.isVideoTexture!==!0,re=yt.__version===void 0||_t===!0,ye=E(C,he,ne);Y(n.TEXTURE_CUBE_MAP,C,ne);let ie;if(Yt){$t&&re&&e.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Vt,he.width,he.height);for(let At=0;At<6;At++){ie=Et[At].mipmaps;for(let Z=0;Z<ie.length;Z++){let Ct=ie[Z];C.format!==Wn?Kt!==null?$t?e.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z,0,0,Ct.width,Ct.height,Kt,Ct.data):e.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z,Vt,Ct.width,Ct.height,0,Ct.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):$t?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z,0,0,Ct.width,Ct.height,Kt,Wt,Ct.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z,Vt,Ct.width,Ct.height,0,Kt,Wt,Ct.data)}}}else{ie=C.mipmaps,$t&&re&&(ie.length>0&&ye++,e.texStorage2D(n.TEXTURE_CUBE_MAP,ye,Vt,Et[0].width,Et[0].height));for(let At=0;At<6;At++)if(ee){$t?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,0,0,Et[At].width,Et[At].height,Kt,Wt,Et[At].data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,Vt,Et[At].width,Et[At].height,0,Kt,Wt,Et[At].data);for(let Z=0;Z<ie.length;Z++){let Ot=ie[Z].image[At].image;$t?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z+1,0,0,Ot.width,Ot.height,Kt,Wt,Ot.data):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z+1,Vt,Ot.width,Ot.height,0,Kt,Wt,Ot.data)}}else{$t?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,0,0,Kt,Wt,Et[At]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,0,Vt,Kt,Wt,Et[At]);for(let Z=0;Z<ie.length;Z++){let Ct=ie[Z];$t?e.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z+1,0,0,Kt,Wt,Ct.image[At]):e.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+At,Z+1,Vt,Kt,Wt,Ct.image[At])}}}_(C,ne)&&y(n.TEXTURE_CUBE_MAP),yt.__version=mt.version,C.onUpdate&&C.onUpdate(C)}L.__version=C.version}function ut(L,C,J,_t,mt,yt){let Ft=r.convert(J.format,J.colorSpace),It=r.convert(J.type),Ht=v(J.internalFormat,Ft,It,J.colorSpace);if(!i.get(C).__hasExternalTextures){let ee=Math.max(1,C.width>>yt),Et=Math.max(1,C.height>>yt);mt===n.TEXTURE_3D||mt===n.TEXTURE_2D_ARRAY?e.texImage3D(mt,yt,Ht,ee,Et,C.depth,0,Ft,It,null):e.texImage2D(mt,yt,Ht,ee,Et,0,Ft,It,null)}e.bindFramebuffer(n.FRAMEBUFFER,L),it(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,_t,mt,i.get(J).__webglTexture,0,et(C)):(mt===n.TEXTURE_2D||mt>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&mt<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,_t,mt,i.get(J).__webglTexture,yt),e.bindFramebuffer(n.FRAMEBUFFER,null)}function lt(L,C,J){if(n.bindRenderbuffer(n.RENDERBUFFER,L),C.depthBuffer&&!C.stencilBuffer){let _t=a===!0?n.DEPTH_COMPONENT24:n.DEPTH_COMPONENT16;if(J||it(C)){let mt=C.depthTexture;mt&&mt.isDepthTexture&&(mt.type===Pi?_t=n.DEPTH_COMPONENT32F:mt.type===Ci&&(_t=n.DEPTH_COMPONENT24));let yt=et(C);it(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,yt,_t,C.width,C.height):n.renderbufferStorageMultisample(n.RENDERBUFFER,yt,_t,C.width,C.height)}else n.renderbufferStorage(n.RENDERBUFFER,_t,C.width,C.height);n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.RENDERBUFFER,L)}else if(C.depthBuffer&&C.stencilBuffer){let _t=et(C);J&&it(C)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,_t,n.DEPTH24_STENCIL8,C.width,C.height):it(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,_t,n.DEPTH24_STENCIL8,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,n.DEPTH_STENCIL,C.width,C.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.RENDERBUFFER,L)}else{let _t=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let mt=0;mt<_t.length;mt++){let yt=_t[mt],Ft=r.convert(yt.format,yt.colorSpace),It=r.convert(yt.type),Ht=v(yt.internalFormat,Ft,It,yt.colorSpace),Yt=et(C);J&&it(C)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Yt,Ht,C.width,C.height):it(C)?c.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Yt,Ht,C.width,C.height):n.renderbufferStorage(n.RENDERBUFFER,Ht,C.width,C.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function ct(L,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(n.FRAMEBUFFER,L),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!i.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),N(C.depthTexture,0);let _t=i.get(C.depthTexture).__webglTexture,mt=et(C);if(C.depthTexture.format===os)it(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,_t,0,mt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,_t,0);else if(C.depthTexture.format===or)it(C)?c.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,_t,0,mt):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,_t,0);else throw new Error("Unknown depthTexture format")}function xt(L){let C=i.get(L),J=L.isWebGLCubeRenderTarget===!0;if(L.depthTexture&&!C.__autoAllocateDepthBuffer){if(J)throw new Error("target.depthTexture not supported in Cube render targets");ct(C.__webglFramebuffer,L)}else if(J){C.__webglDepthbuffer=[];for(let _t=0;_t<6;_t++)e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer[_t]),C.__webglDepthbuffer[_t]=n.createRenderbuffer(),lt(C.__webglDepthbuffer[_t],L,!1)}else e.bindFramebuffer(n.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=n.createRenderbuffer(),lt(C.__webglDepthbuffer,L,!1);e.bindFramebuffer(n.FRAMEBUFFER,null)}function wt(L,C,J){let _t=i.get(L);C!==void 0&&ut(_t.__webglFramebuffer,L,L.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),J!==void 0&&xt(L)}function F(L){let C=L.texture,J=i.get(L),_t=i.get(C);L.addEventListener("dispose",R),L.isWebGLMultipleRenderTargets!==!0&&(_t.__webglTexture===void 0&&(_t.__webglTexture=n.createTexture()),_t.__version=C.version,o.memory.textures++);let mt=L.isWebGLCubeRenderTarget===!0,yt=L.isWebGLMultipleRenderTargets===!0,Ft=m(L)||a;if(mt){J.__webglFramebuffer=[];for(let It=0;It<6;It++)if(a&&C.mipmaps&&C.mipmaps.length>0){J.__webglFramebuffer[It]=[];for(let Ht=0;Ht<C.mipmaps.length;Ht++)J.__webglFramebuffer[It][Ht]=n.createFramebuffer()}else J.__webglFramebuffer[It]=n.createFramebuffer()}else{if(a&&C.mipmaps&&C.mipmaps.length>0){J.__webglFramebuffer=[];for(let It=0;It<C.mipmaps.length;It++)J.__webglFramebuffer[It]=n.createFramebuffer()}else J.__webglFramebuffer=n.createFramebuffer();if(yt)if(s.drawBuffers){let It=L.texture;for(let Ht=0,Yt=It.length;Ht<Yt;Ht++){let ee=i.get(It[Ht]);ee.__webglTexture===void 0&&(ee.__webglTexture=n.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&L.samples>0&&it(L)===!1){let It=yt?C:[C];J.__webglMultisampledFramebuffer=n.createFramebuffer(),J.__webglColorRenderbuffer=[],e.bindFramebuffer(n.FRAMEBUFFER,J.__webglMultisampledFramebuffer);for(let Ht=0;Ht<It.length;Ht++){let Yt=It[Ht];J.__webglColorRenderbuffer[Ht]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,J.__webglColorRenderbuffer[Ht]);let ee=r.convert(Yt.format,Yt.colorSpace),Et=r.convert(Yt.type),he=v(Yt.internalFormat,ee,Et,Yt.colorSpace,L.isXRRenderTarget===!0),ne=et(L);n.renderbufferStorageMultisample(n.RENDERBUFFER,ne,he,L.width,L.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ht,n.RENDERBUFFER,J.__webglColorRenderbuffer[Ht])}n.bindRenderbuffer(n.RENDERBUFFER,null),L.depthBuffer&&(J.__webglDepthRenderbuffer=n.createRenderbuffer(),lt(J.__webglDepthRenderbuffer,L,!0)),e.bindFramebuffer(n.FRAMEBUFFER,null)}}if(mt){e.bindTexture(n.TEXTURE_CUBE_MAP,_t.__webglTexture),Y(n.TEXTURE_CUBE_MAP,C,Ft);for(let It=0;It<6;It++)if(a&&C.mipmaps&&C.mipmaps.length>0)for(let Ht=0;Ht<C.mipmaps.length;Ht++)ut(J.__webglFramebuffer[It][Ht],L,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+It,Ht);else ut(J.__webglFramebuffer[It],L,C,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+It,0);_(C,Ft)&&y(n.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){let It=L.texture;for(let Ht=0,Yt=It.length;Ht<Yt;Ht++){let ee=It[Ht],Et=i.get(ee);e.bindTexture(n.TEXTURE_2D,Et.__webglTexture),Y(n.TEXTURE_2D,ee,Ft),ut(J.__webglFramebuffer,L,ee,n.COLOR_ATTACHMENT0+Ht,n.TEXTURE_2D,0),_(ee,Ft)&&y(n.TEXTURE_2D)}e.unbindTexture()}else{let It=n.TEXTURE_2D;if((L.isWebGL3DRenderTarget||L.isWebGLArrayRenderTarget)&&(a?It=L.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(It,_t.__webglTexture),Y(It,C,Ft),a&&C.mipmaps&&C.mipmaps.length>0)for(let Ht=0;Ht<C.mipmaps.length;Ht++)ut(J.__webglFramebuffer[Ht],L,C,n.COLOR_ATTACHMENT0,It,Ht);else ut(J.__webglFramebuffer,L,C,n.COLOR_ATTACHMENT0,It,0);_(C,Ft)&&y(It),e.unbindTexture()}L.depthBuffer&&xt(L)}function Mt(L){let C=m(L)||a,J=L.isWebGLMultipleRenderTargets===!0?L.texture:[L.texture];for(let _t=0,mt=J.length;_t<mt;_t++){let yt=J[_t];if(_(yt,C)){let Ft=L.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:n.TEXTURE_2D,It=i.get(yt).__webglTexture;e.bindTexture(Ft,It),y(Ft),e.unbindTexture()}}}function Q(L){if(a&&L.samples>0&&it(L)===!1){let C=L.isWebGLMultipleRenderTargets?L.texture:[L.texture],J=L.width,_t=L.height,mt=n.COLOR_BUFFER_BIT,yt=[],Ft=L.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,It=i.get(L),Ht=L.isWebGLMultipleRenderTargets===!0;if(Ht)for(let Yt=0;Yt<C.length;Yt++)e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.RENDERBUFFER,null),e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.TEXTURE_2D,null,0);e.bindFramebuffer(n.READ_FRAMEBUFFER,It.__webglMultisampledFramebuffer),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglFramebuffer);for(let Yt=0;Yt<C.length;Yt++){yt.push(n.COLOR_ATTACHMENT0+Yt),L.depthBuffer&&yt.push(Ft);let ee=It.__ignoreDepthValues!==void 0?It.__ignoreDepthValues:!1;if(ee===!1&&(L.depthBuffer&&(mt|=n.DEPTH_BUFFER_BIT),L.stencilBuffer&&(mt|=n.STENCIL_BUFFER_BIT)),Ht&&n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,It.__webglColorRenderbuffer[Yt]),ee===!0&&(n.invalidateFramebuffer(n.READ_FRAMEBUFFER,[Ft]),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[Ft])),Ht){let Et=i.get(C[Yt]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Et,0)}n.blitFramebuffer(0,0,J,_t,0,0,J,_t,mt,n.NEAREST),l&&n.invalidateFramebuffer(n.READ_FRAMEBUFFER,yt)}if(e.bindFramebuffer(n.READ_FRAMEBUFFER,null),e.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),Ht)for(let Yt=0;Yt<C.length;Yt++){e.bindFramebuffer(n.FRAMEBUFFER,It.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.RENDERBUFFER,It.__webglColorRenderbuffer[Yt]);let ee=i.get(C[Yt]).__webglTexture;e.bindFramebuffer(n.FRAMEBUFFER,It.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Yt,n.TEXTURE_2D,ee,0)}e.bindFramebuffer(n.DRAW_FRAMEBUFFER,It.__webglMultisampledFramebuffer)}}function et(L){return Math.min(s.maxSamples,L.samples)}function it(L){let C=i.get(L);return a&&L.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function bt(L){let C=o.render.frame;h.get(L)!==C&&(h.set(L,C),L.update())}function nt(L,C){let J=L.colorSpace,_t=L.format,mt=L.type;return L.isCompressedTexture===!0||L.isVideoTexture===!0||L.format===Fl||J!==ui&&J!==In&&(xe.getTransfer(J)===Ee?a===!1?t.has("EXT_sRGB")===!0&&_t===Wn?(L.format=Fl,L.minFilter=on,L.generateMipmaps=!1):C=Ua.sRGBToLinear(C):(_t!==Wn||mt!==Di)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",J)),C}this.allocateTextureUnit=P,this.resetTextureUnits=z,this.setTexture2D=N,this.setTexture2DArray=H,this.setTexture3D=G,this.setTextureCube=V,this.rebindTextures=wt,this.setupRenderTarget=F,this.updateRenderTargetMipmap=Mt,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=ut,this.useMultisampledRTT=it}function MM(n,t,e){let i=e.isWebGL2;function s(r,o=In){let a,c=xe.getTransfer(o);if(r===Di)return n.UNSIGNED_BYTE;if(r===Rd)return n.UNSIGNED_SHORT_4_4_4_4;if(r===Cd)return n.UNSIGNED_SHORT_5_5_5_1;if(r===ex)return n.BYTE;if(r===nx)return n.SHORT;if(r===Rh)return n.UNSIGNED_SHORT;if(r===Ad)return n.INT;if(r===Ci)return n.UNSIGNED_INT;if(r===Pi)return n.FLOAT;if(r===jr)return i?n.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===ix)return n.ALPHA;if(r===Wn)return n.RGBA;if(r===sx)return n.LUMINANCE;if(r===rx)return n.LUMINANCE_ALPHA;if(r===os)return n.DEPTH_COMPONENT;if(r===or)return n.DEPTH_STENCIL;if(r===Fl)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===ox)return n.RED;if(r===Pd)return n.RED_INTEGER;if(r===ax)return n.RG;if(r===Id)return n.RG_INTEGER;if(r===Ld)return n.RGBA_INTEGER;if(r===Qc||r===tl||r===el||r===nl)if(c===Ee)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Qc)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===tl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===el)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===nl)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Qc)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===tl)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===el)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===nl)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===$u||r===Zu||r===Ju||r===Ku)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===$u)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Zu)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Ju)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ku)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Dd)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===ju||r===Qu)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===ju)return c===Ee?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Qu)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===tf||r===ef||r===nf||r===sf||r===rf||r===of||r===af||r===cf||r===lf||r===hf||r===uf||r===ff||r===df||r===pf)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===tf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===ef)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===nf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===sf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===rf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===of)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===af)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===cf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===lf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===hf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===uf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===ff)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===df)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===pf)return c===Ee?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===il||r===mf||r===gf)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===il)return c===Ee?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===mf)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===gf)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===cx||r===xf||r===_f||r===yf)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===il)return a.COMPRESSED_RED_RGTC1_EXT;if(r===xf)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===_f)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===yf)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===rs?i?n.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):n[r]!==void 0?n[r]:null}return{convert:s}}var jl=class extends vn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},zt=class extends ke{constructor(){super(),this.isGroup=!0,this.type="Group"}},bM={type:"move"},Yr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new zt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new zt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new zt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let s=null,r=null,o=null,a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(let g of t.hand.values()){let m=e.getJointPose(g,i),d=this._getHandJoint(l,g);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.matrixWorldNeedsUpdate=!0,d.jointRadius=m.radius),d.visible=m!==null}let h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],f=h.position.distanceTo(u.position),p=.02,x=.005;l.inputState.pinching&&f>p+x?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-x&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,i),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(s=e.getPose(t.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(a.matrix.fromArray(s.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,s.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(s.linearVelocity)):a.hasLinearVelocity=!1,s.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(s.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(bM)))}return a!==null&&(a.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let i=new zt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}},Ql=class extends Ni{constructor(t,e){super();let i=this,s=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,f=null,p=null,x=null,g=e.getContextAttributes(),m=null,d=null,_=[],y=[],v=new Tt,E=null,S=new vn;S.layers.enable(1),S.viewport=new Je;let w=new vn;w.layers.enable(2),w.viewport=new Je;let R=[S,w],b=new jl;b.layers.enable(1),b.layers.enable(2);let M=null,A=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let rt=_[Y];return rt===void 0&&(rt=new Yr,_[Y]=rt),rt.getTargetRaySpace()},this.getControllerGrip=function(Y){let rt=_[Y];return rt===void 0&&(rt=new Yr,_[Y]=rt),rt.getGripSpace()},this.getHand=function(Y){let rt=_[Y];return rt===void 0&&(rt=new Yr,_[Y]=rt),rt.getHandSpace()};function I(Y){let rt=y.indexOf(Y.inputSource);if(rt===-1)return;let at=_[rt];at!==void 0&&(at.update(Y.inputSource,Y.frame,l||o),at.dispatchEvent({type:Y.type,data:Y.inputSource}))}function z(){s.removeEventListener("select",I),s.removeEventListener("selectstart",I),s.removeEventListener("selectend",I),s.removeEventListener("squeeze",I),s.removeEventListener("squeezestart",I),s.removeEventListener("squeezeend",I),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",P);for(let Y=0;Y<_.length;Y++){let rt=y[Y];rt!==null&&(y[Y]=null,_[Y].disconnect(rt))}M=null,A=null,t.setRenderTarget(m),p=null,f=null,u=null,s=null,d=null,j.stop(),i.isPresenting=!1,t.setPixelRatio(E),t.setSize(v.width,v.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return u},this.getFrame=function(){return x},this.getSession=function(){return s},this.setSession=async function(Y){if(s=Y,s!==null){if(m=t.getRenderTarget(),s.addEventListener("select",I),s.addEventListener("selectstart",I),s.addEventListener("selectend",I),s.addEventListener("squeeze",I),s.addEventListener("squeezestart",I),s.addEventListener("squeezeend",I),s.addEventListener("end",z),s.addEventListener("inputsourceschange",P),g.xrCompatible!==!0&&await e.makeXRCompatible(),E=t.getPixelRatio(),t.getSize(v),s.renderState.layers===void 0||t.capabilities.isWebGL2===!1){let rt={antialias:s.renderState.layers===void 0?g.antialias:!0,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,e,rt),s.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),d=new fi(p.framebufferWidth,p.framebufferHeight,{format:Wn,type:Di,colorSpace:t.outputColorSpace,stencilBuffer:g.stencil})}else{let rt=null,at=null,tt=null;g.depth&&(tt=g.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,rt=g.stencil?or:os,at=g.stencil?rs:Ci);let ut={colorFormat:e.RGBA8,depthFormat:tt,scaleFactor:r};u=new XRWebGLBinding(s,e),f=u.createProjectionLayer(ut),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),d=new fi(f.textureWidth,f.textureHeight,{format:Wn,type:Di,depthTexture:new Va(f.textureWidth,f.textureHeight,at,void 0,void 0,void 0,void 0,void 0,void 0,rt),stencilBuffer:g.stencil,colorSpace:t.outputColorSpace,samples:g.antialias?4:0});let lt=t.properties.get(d);lt.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await s.requestReferenceSpace(a),j.setContext(s),j.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode};function P(Y){for(let rt=0;rt<Y.removed.length;rt++){let at=Y.removed[rt],tt=y.indexOf(at);tt>=0&&(y[tt]=null,_[tt].disconnect(at))}for(let rt=0;rt<Y.added.length;rt++){let at=Y.added[rt],tt=y.indexOf(at);if(tt===-1){for(let lt=0;lt<_.length;lt++)if(lt>=y.length){y.push(at),tt=lt;break}else if(y[lt]===null){y[lt]=at,tt=lt;break}if(tt===-1)break}let ut=_[tt];ut&&ut.connect(at)}}let D=new k,N=new k;function H(Y,rt,at){D.setFromMatrixPosition(rt.matrixWorld),N.setFromMatrixPosition(at.matrixWorld);let tt=D.distanceTo(N),ut=rt.projectionMatrix.elements,lt=at.projectionMatrix.elements,ct=ut[14]/(ut[10]-1),xt=ut[14]/(ut[10]+1),wt=(ut[9]+1)/ut[5],F=(ut[9]-1)/ut[5],Mt=(ut[8]-1)/ut[0],Q=(lt[8]+1)/lt[0],et=ct*Mt,it=ct*Q,bt=tt/(-Mt+Q),nt=bt*-Mt;rt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(nt),Y.translateZ(bt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();let L=ct+bt,C=xt+bt,J=et-nt,_t=it+(tt-nt),mt=wt*xt/C*L,yt=F*xt/C*L;Y.projectionMatrix.makePerspective(J,_t,mt,yt,L,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function G(Y,rt){rt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(rt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(s===null)return;b.near=w.near=S.near=Y.near,b.far=w.far=S.far=Y.far,(M!==b.near||A!==b.far)&&(s.updateRenderState({depthNear:b.near,depthFar:b.far}),M=b.near,A=b.far);let rt=Y.parent,at=b.cameras;G(b,rt);for(let tt=0;tt<at.length;tt++)G(at[tt],rt);at.length===2?H(b,S,w):b.projectionMatrix.copy(S.projectionMatrix),V(Y,b,rt)};function V(Y,rt,at){at===null?Y.matrix.copy(rt.matrixWorld):(Y.matrix.copy(at.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(rt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(rt.projectionMatrix),Y.projectionMatrixInverse.copy(rt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Qr*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return b},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(Y){c=Y,f!==null&&(f.fixedFoveation=Y),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Y)};let O=null;function B(Y,rt){if(h=rt.getViewerPose(l||o),x=rt,h!==null){let at=h.views;p!==null&&(t.setRenderTargetFramebuffer(d,p.framebuffer),t.setRenderTarget(d));let tt=!1;at.length!==b.cameras.length&&(b.cameras.length=0,tt=!0);for(let ut=0;ut<at.length;ut++){let lt=at[ut],ct=null;if(p!==null)ct=p.getViewport(lt);else{let wt=u.getViewSubImage(f,lt);ct=wt.viewport,ut===0&&(t.setRenderTargetTextures(d,wt.colorTexture,f.ignoreDepthValues?void 0:wt.depthStencilTexture),t.setRenderTarget(d))}let xt=R[ut];xt===void 0&&(xt=new vn,xt.layers.enable(ut),xt.viewport=new Je,R[ut]=xt),xt.matrix.fromArray(lt.transform.matrix),xt.matrix.decompose(xt.position,xt.quaternion,xt.scale),xt.projectionMatrix.fromArray(lt.projectionMatrix),xt.projectionMatrixInverse.copy(xt.projectionMatrix).invert(),xt.viewport.set(ct.x,ct.y,ct.width,ct.height),ut===0&&(b.matrix.copy(xt.matrix),b.matrix.decompose(b.position,b.quaternion,b.scale)),tt===!0&&b.cameras.push(xt)}}for(let at=0;at<_.length;at++){let tt=y[at],ut=_[at];tt!==null&&ut!==void 0&&ut.update(tt,rt,l||o)}O&&O(Y,rt),rt.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:rt}),x=null}let j=new kd;j.setAnimationLoop(B),this.setAnimationLoop=function(Y){O=Y},this.dispose=function(){}}};function EM(n,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function i(m,d){d.color.getRGB(m.fogColor.value,Bd(n)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function s(m,d,_,y,v){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),u(m,d)):d.isMeshPhongMaterial?(r(m,d),h(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,v)):d.isMeshMatcapMaterial?(r(m,d),x(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),g(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(o(m,d),d.isLineDashedMaterial&&a(m,d)):d.isPointsMaterial?c(m,d,_,y):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===fn&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===fn&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);let _=t.get(d).envMap;if(_&&(m.envMap.value=_,m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;let y=n._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*y,e(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function o(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function a(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,_,y){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*_,m.scale.value=y*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function h(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function u(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),t.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,_){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===fn&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=_.texture,m.transmissionSamplerSize.value.set(_.width,_.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),d.anisotropy>0&&(m.anisotropyVector.value.set(d.anisotropy*Math.cos(d.anisotropyRotation),d.anisotropy*Math.sin(d.anisotropyRotation)),d.anisotropyMap&&(m.anisotropyMap.value=d.anisotropyMap,e(d.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function x(m,d){d.matcap&&(m.matcap.value=d.matcap)}function g(m,d){let _=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(_.matrixWorld),m.nearDistance.value=_.shadow.camera.near,m.farDistance.value=_.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function SM(n,t,e,i){let s={},r={},o=[],a=e.isWebGL2?n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(_,y){let v=y.program;i.uniformBlockBinding(_,v)}function l(_,y){let v=s[_.id];v===void 0&&(x(_),v=h(_),s[_.id]=v,_.addEventListener("dispose",m));let E=y.program;i.updateUBOMapping(_,E);let S=t.render.frame;r[_.id]!==S&&(f(_),r[_.id]=S)}function h(_){let y=u();_.__bindingPointIndex=y;let v=n.createBuffer(),E=_.__size,S=_.usage;return n.bindBuffer(n.UNIFORM_BUFFER,v),n.bufferData(n.UNIFORM_BUFFER,E,S),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,y,v),v}function u(){for(let _=0;_<a;_++)if(o.indexOf(_)===-1)return o.push(_),_;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(_){let y=s[_.id],v=_.uniforms,E=_.__cache;n.bindBuffer(n.UNIFORM_BUFFER,y);for(let S=0,w=v.length;S<w;S++){let R=Array.isArray(v[S])?v[S]:[v[S]];for(let b=0,M=R.length;b<M;b++){let A=R[b];if(p(A,S,b,E)===!0){let I=A.__offset,z=Array.isArray(A.value)?A.value:[A.value],P=0;for(let D=0;D<z.length;D++){let N=z[D],H=g(N);typeof N=="number"||typeof N=="boolean"?(A.__data[0]=N,n.bufferSubData(n.UNIFORM_BUFFER,I+P,A.__data)):N.isMatrix3?(A.__data[0]=N.elements[0],A.__data[1]=N.elements[1],A.__data[2]=N.elements[2],A.__data[3]=0,A.__data[4]=N.elements[3],A.__data[5]=N.elements[4],A.__data[6]=N.elements[5],A.__data[7]=0,A.__data[8]=N.elements[6],A.__data[9]=N.elements[7],A.__data[10]=N.elements[8],A.__data[11]=0):(N.toArray(A.__data,P),P+=H.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,I,A.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function p(_,y,v,E){let S=_.value,w=y+"_"+v;if(E[w]===void 0)return typeof S=="number"||typeof S=="boolean"?E[w]=S:E[w]=S.clone(),!0;{let R=E[w];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return E[w]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function x(_){let y=_.uniforms,v=0,E=16;for(let w=0,R=y.length;w<R;w++){let b=Array.isArray(y[w])?y[w]:[y[w]];for(let M=0,A=b.length;M<A;M++){let I=b[M],z=Array.isArray(I.value)?I.value:[I.value];for(let P=0,D=z.length;P<D;P++){let N=z[P],H=g(N),G=v%E;G!==0&&E-G<H.boundary&&(v+=E-G),I.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=v,v+=H.storage}}}let S=v%E;return S>0&&(v+=E-S),_.__size=v,_.__cache={},this}function g(_){let y={boundary:0,storage:0};return typeof _=="number"||typeof _=="boolean"?(y.boundary=4,y.storage=4):_.isVector2?(y.boundary=8,y.storage=8):_.isVector3||_.isColor?(y.boundary=16,y.storage=12):_.isVector4?(y.boundary=16,y.storage=16):_.isMatrix3?(y.boundary=48,y.storage=48):_.isMatrix4?(y.boundary=64,y.storage=64):_.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",_),y}function m(_){let y=_.target;y.removeEventListener("dispose",m);let v=o.indexOf(y.__bindingPointIndex);o.splice(v,1),n.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function d(){for(let _ in s)n.deleteBuffer(s[_]);o=[],s={},r={}}return{bind:c,update:l,dispose:d}}var io=class{constructor(t={}){let{canvas:e=Dx(),context:i=null,depth:s=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let f;i!==null?f=i.getContextAttributes().alpha:f=o;let p=new Uint32Array(4),x=new Int32Array(4),g=null,m=null,d=[],_=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$e,this._useLegacyLights=!1,this.toneMapping=Li,this.toneMappingExposure=1;let y=this,v=!1,E=0,S=0,w=null,R=-1,b=null,M=new Je,A=new Je,I=null,z=new gt(0),P=0,D=e.width,N=e.height,H=1,G=null,V=null,O=new Je(0,0,D,N),B=new Je(0,0,D,N),j=!1,Y=new no,rt=!1,at=!1,tt=null,ut=new ve,lt=new Tt,ct=new k,xt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function wt(){return w===null?H:1}let F=i;function Mt(U,ot){for(let dt=0;dt<U.length;dt++){let pt=U[dt],ft=e.getContext(pt,ot);if(ft!==null)return ft}return null}try{let U={alpha:!0,depth:s,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sh}`),e.addEventListener("webglcontextlost",At,!1),e.addEventListener("webglcontextrestored",Z,!1),e.addEventListener("webglcontextcreationerror",Ct,!1),F===null){let ot=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&ot.shift(),F=Mt(ot,U),F===null)throw Mt(ot)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(U){throw console.error("THREE.WebGLRenderer: "+U.message),U}let Q,et,it,bt,nt,L,C,J,_t,mt,yt,Ft,It,Ht,Yt,ee,Et,he,ne,Kt,Wt,Vt,$t,re;function ye(){Q=new Vy(F),et=new Oy(F,Q,t),Q.init(et),Vt=new MM(F,Q,et),it=new yM(F,Q,et),bt=new qy(F),nt=new aM,L=new vM(F,Q,it,nt,et,Vt,bt),C=new By(y),J=new Gy(y),_t=new t1(F,et),$t=new Ny(F,Q,_t,et),mt=new Wy(F,_t,bt,$t),yt=new Jy(F,mt,_t,bt),ne=new Zy(F,et,L),ee=new Fy(nt),Ft=new oM(y,C,J,Q,et,$t,ee),It=new EM(y,nt),Ht=new lM,Yt=new mM(Q,et),he=new Uy(y,C,J,it,yt,f,c),Et=new _M(y,yt,et),re=new SM(F,bt,et,it),Kt=new zy(F,Q,bt,et),Wt=new Xy(F,Q,bt,et),bt.programs=Ft.programs,y.capabilities=et,y.extensions=Q,y.properties=nt,y.renderLists=Ht,y.shadowMap=Et,y.state=it,y.info=bt}ye();let ie=new Ql(y,F);this.xr=ie,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let U=Q.get("WEBGL_lose_context");U&&U.loseContext()},this.forceContextRestore=function(){let U=Q.get("WEBGL_lose_context");U&&U.restoreContext()},this.getPixelRatio=function(){return H},this.setPixelRatio=function(U){U!==void 0&&(H=U,this.setSize(D,N,!1))},this.getSize=function(U){return U.set(D,N)},this.setSize=function(U,ot,dt=!0){if(ie.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=U,N=ot,e.width=Math.floor(U*H),e.height=Math.floor(ot*H),dt===!0&&(e.style.width=U+"px",e.style.height=ot+"px"),this.setViewport(0,0,U,ot)},this.getDrawingBufferSize=function(U){return U.set(D*H,N*H).floor()},this.setDrawingBufferSize=function(U,ot,dt){D=U,N=ot,H=dt,e.width=Math.floor(U*dt),e.height=Math.floor(ot*dt),this.setViewport(0,0,U,ot)},this.getCurrentViewport=function(U){return U.copy(M)},this.getViewport=function(U){return U.copy(O)},this.setViewport=function(U,ot,dt,pt){U.isVector4?O.set(U.x,U.y,U.z,U.w):O.set(U,ot,dt,pt),it.viewport(M.copy(O).multiplyScalar(H).floor())},this.getScissor=function(U){return U.copy(B)},this.setScissor=function(U,ot,dt,pt){U.isVector4?B.set(U.x,U.y,U.z,U.w):B.set(U,ot,dt,pt),it.scissor(A.copy(B).multiplyScalar(H).floor())},this.getScissorTest=function(){return j},this.setScissorTest=function(U){it.setScissorTest(j=U)},this.setOpaqueSort=function(U){G=U},this.setTransparentSort=function(U){V=U},this.getClearColor=function(U){return U.copy(he.getClearColor())},this.setClearColor=function(){he.setClearColor.apply(he,arguments)},this.getClearAlpha=function(){return he.getClearAlpha()},this.setClearAlpha=function(){he.setClearAlpha.apply(he,arguments)},this.clear=function(U=!0,ot=!0,dt=!0){let pt=0;if(U){let ft=!1;if(w!==null){let kt=w.texture.format;ft=kt===Ld||kt===Id||kt===Pd}if(ft){let kt=w.texture.type,T=kt===Di||kt===Ci||kt===Rh||kt===rs||kt===Rd||kt===Cd,W=he.getClearColor(),X=he.getClearAlpha(),q=W.r,K=W.g,st=W.b;T?(p[0]=q,p[1]=K,p[2]=st,p[3]=X,F.clearBufferuiv(F.COLOR,0,p)):(x[0]=q,x[1]=K,x[2]=st,x[3]=X,F.clearBufferiv(F.COLOR,0,x))}else pt|=F.COLOR_BUFFER_BIT}ot&&(pt|=F.DEPTH_BUFFER_BIT),dt&&(pt|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(pt)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",At,!1),e.removeEventListener("webglcontextrestored",Z,!1),e.removeEventListener("webglcontextcreationerror",Ct,!1),Ht.dispose(),Yt.dispose(),nt.dispose(),C.dispose(),J.dispose(),yt.dispose(),$t.dispose(),re.dispose(),Ft.dispose(),ie.dispose(),ie.removeEventListener("sessionstart",Ne),ie.removeEventListener("sessionend",ge),tt&&(tt.dispose(),tt=null),ze.stop()};function At(U){U.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),v=!0}function Z(){console.log("THREE.WebGLRenderer: Context Restored."),v=!1;let U=bt.autoReset,ot=Et.enabled,dt=Et.autoUpdate,pt=Et.needsUpdate,ft=Et.type;ye(),bt.autoReset=U,Et.enabled=ot,Et.autoUpdate=dt,Et.needsUpdate=pt,Et.type=ft}function Ct(U){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",U.statusMessage)}function Ot(U){let ot=U.target;ot.removeEventListener("dispose",Ot),te(ot)}function te(U){Qt(U),nt.remove(U)}function Qt(U){let ot=nt.get(U).programs;ot!==void 0&&(ot.forEach(function(dt){Ft.releaseProgram(dt)}),U.isShaderMaterial&&Ft.releaseShaderCache(U))}this.renderBufferDirect=function(U,ot,dt,pt,ft,kt){ot===null&&(ot=xt);let T=ft.isMesh&&ft.matrixWorld.determinant()<0,W=Jo(U,ot,dt,pt,ft);it.setMaterial(pt,T);let X=dt.index,q=1;if(pt.wireframe===!0){if(X=mt.getWireframeAttribute(dt),X===void 0)return;q=2}let K=dt.drawRange,st=dt.attributes.position,vt=K.start*q,Pt=(K.start+K.count)*q;kt!==null&&(vt=Math.max(vt,kt.start*q),Pt=Math.min(Pt,(kt.start+kt.count)*q)),X!==null?(vt=Math.max(vt,0),Pt=Math.min(Pt,X.count)):st!=null&&(vt=Math.max(vt,0),Pt=Math.min(Pt,st.count));let Ut=Pt-vt;if(Ut<0||Ut===1/0)return;$t.setup(ft,pt,W,dt,X);let Zt,Xt=Kt;if(X!==null&&(Zt=_t.get(X),Xt=Wt,Xt.setIndex(Zt)),ft.isMesh)pt.wireframe===!0?(it.setLineWidth(pt.wireframeLinewidth*wt()),Xt.setMode(F.LINES)):Xt.setMode(F.TRIANGLES);else if(ft.isLine){let Rt=pt.linewidth;Rt===void 0&&(Rt=1),it.setLineWidth(Rt*wt()),ft.isLineSegments?Xt.setMode(F.LINES):ft.isLineLoop?Xt.setMode(F.LINE_LOOP):Xt.setMode(F.LINE_STRIP)}else ft.isPoints?Xt.setMode(F.POINTS):ft.isSprite&&Xt.setMode(F.TRIANGLES);if(ft.isBatchedMesh)Xt.renderMultiDraw(ft._multiDrawStarts,ft._multiDrawCounts,ft._multiDrawCount);else if(ft.isInstancedMesh)Xt.renderInstances(vt,Ut,ft.count);else if(dt.isInstancedBufferGeometry){let Rt=dt._maxInstanceCount!==void 0?dt._maxInstanceCount:1/0,Gt=Math.min(dt.instanceCount,Rt);Xt.renderInstances(vt,Ut,Gt)}else Xt.render(vt,Ut)};function pe(U,ot,dt){U.transparent===!0&&U.side===Ie&&U.forceSinglePass===!1?(U.side=fn,U.needsUpdate=!0,Ji(U,ot,dt),U.side=Ui,U.needsUpdate=!0,Ji(U,ot,dt),U.side=Ie):Ji(U,ot,dt)}this.compile=function(U,ot,dt=null){dt===null&&(dt=U),m=Yt.get(dt),m.init(),_.push(m),dt.traverseVisible(function(ft){ft.isLight&&ft.layers.test(ot.layers)&&(m.pushLight(ft),ft.castShadow&&m.pushShadow(ft))}),U!==dt&&U.traverseVisible(function(ft){ft.isLight&&ft.layers.test(ot.layers)&&(m.pushLight(ft),ft.castShadow&&m.pushShadow(ft))}),m.setupLights(y._useLegacyLights);let pt=new Set;return U.traverse(function(ft){let kt=ft.material;if(kt)if(Array.isArray(kt))for(let T=0;T<kt.length;T++){let W=kt[T];pe(W,dt,ft),pt.add(W)}else pe(kt,dt,ft),pt.add(kt)}),_.pop(),m=null,pt},this.compileAsync=function(U,ot,dt=null){let pt=this.compile(U,ot,dt);return new Promise(ft=>{function kt(){if(pt.forEach(function(T){nt.get(T).currentProgram.isReady()&&pt.delete(T)}),pt.size===0){ft(U);return}setTimeout(kt,10)}Q.get("KHR_parallel_shader_compile")!==null?kt():setTimeout(kt,10)})};let me=null;function Ce(U){me&&me(U)}function Ne(){ze.stop()}function ge(){ze.start()}let ze=new kd;ze.setAnimationLoop(Ce),typeof self<"u"&&ze.setContext(self),this.setAnimationLoop=function(U){me=U,ie.setAnimationLoop(U),U===null?ze.stop():ze.start()},ie.addEventListener("sessionstart",Ne),ie.addEventListener("sessionend",ge),this.render=function(U,ot){if(ot!==void 0&&ot.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(v===!0)return;U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),ot.parent===null&&ot.matrixWorldAutoUpdate===!0&&ot.updateMatrixWorld(),ie.enabled===!0&&ie.isPresenting===!0&&(ie.cameraAutoUpdate===!0&&ie.updateCamera(ot),ot=ie.getCamera()),U.isScene===!0&&U.onBeforeRender(y,U,ot,w),m=Yt.get(U,_.length),m.init(),_.push(m),ut.multiplyMatrices(ot.projectionMatrix,ot.matrixWorldInverse),Y.setFromProjectionMatrix(ut),at=this.localClippingEnabled,rt=ee.init(this.clippingPlanes,at),g=Ht.get(U,d.length),g.init(),d.push(g),qe(U,ot,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(G,V),this.info.render.frame++,rt===!0&&ee.beginShadows();let dt=m.state.shadowsArray;if(Et.render(dt,U,ot),rt===!0&&ee.endShadows(),this.info.autoReset===!0&&this.info.reset(),he.render(g,U),m.setupLights(y._useLegacyLights),ot.isArrayCamera){let pt=ot.cameras;for(let ft=0,kt=pt.length;ft<kt;ft++){let T=pt[ft];Cs(g,U,T,T.viewport)}}else Cs(g,U,ot);w!==null&&(L.updateMultisampleRenderTarget(w),L.updateRenderTargetMipmap(w)),U.isScene===!0&&U.onAfterRender(y,U,ot),$t.resetDefaultState(),R=-1,b=null,_.pop(),_.length>0?m=_[_.length-1]:m=null,d.pop(),d.length>0?g=d[d.length-1]:g=null};function qe(U,ot,dt,pt){if(U.visible===!1)return;if(U.layers.test(ot.layers)){if(U.isGroup)dt=U.renderOrder;else if(U.isLOD)U.autoUpdate===!0&&U.update(ot);else if(U.isLight)m.pushLight(U),U.castShadow&&m.pushShadow(U);else if(U.isSprite){if(!U.frustumCulled||Y.intersectsSprite(U)){pt&&ct.setFromMatrixPosition(U.matrixWorld).applyMatrix4(ut);let T=yt.update(U),W=U.material;W.visible&&g.push(U,T,W,dt,ct.z,null)}}else if((U.isMesh||U.isLine||U.isPoints)&&(!U.frustumCulled||Y.intersectsObject(U))){let T=yt.update(U),W=U.material;if(pt&&(U.boundingSphere!==void 0?(U.boundingSphere===null&&U.computeBoundingSphere(),ct.copy(U.boundingSphere.center)):(T.boundingSphere===null&&T.computeBoundingSphere(),ct.copy(T.boundingSphere.center)),ct.applyMatrix4(U.matrixWorld).applyMatrix4(ut)),Array.isArray(W)){let X=T.groups;for(let q=0,K=X.length;q<K;q++){let st=X[q],vt=W[st.materialIndex];vt&&vt.visible&&g.push(U,T,vt,dt,ct.z,st)}}else W.visible&&g.push(U,T,W,dt,ct.z,null)}}let kt=U.children;for(let T=0,W=kt.length;T<W;T++)qe(kt[T],ot,dt,pt)}function Cs(U,ot,dt,pt){let ft=U.opaque,kt=U.transmissive,T=U.transparent;m.setupLightsView(dt),rt===!0&&ee.setGlobalState(y.clippingPlanes,dt),kt.length>0&&$o(ft,kt,ot,dt),pt&&it.viewport(M.copy(pt)),ft.length>0&&Zi(ft,ot,dt),kt.length>0&&Zi(kt,ot,dt),T.length>0&&Zi(T,ot,dt),it.buffers.depth.setTest(!0),it.buffers.depth.setMask(!0),it.buffers.color.setMask(!0),it.setPolygonOffset(!1)}function $o(U,ot,dt,pt){if((dt.isScene===!0?dt.overrideMaterial:null)!==null)return;let kt=et.isWebGL2;tt===null&&(tt=new fi(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")?jr:Di,minFilter:Kr,samples:kt?4:0})),y.getDrawingBufferSize(lt),kt?tt.setSize(lt.x,lt.y):tt.setSize(La(lt.x),La(lt.y));let T=y.getRenderTarget();y.setRenderTarget(tt),y.getClearColor(z),P=y.getClearAlpha(),P<1&&y.setClearColor(16777215,.5),y.clear();let W=y.toneMapping;y.toneMapping=Li,Zi(U,dt,pt),L.updateMultisampleRenderTarget(tt),L.updateRenderTargetMipmap(tt);let X=!1;for(let q=0,K=ot.length;q<K;q++){let st=ot[q],vt=st.object,Pt=st.geometry,Ut=st.material,Zt=st.group;if(Ut.side===Ie&&vt.layers.test(pt.layers)){let Xt=Ut.side;Ut.side=fn,Ut.needsUpdate=!0,Ps(vt,dt,pt,Pt,Ut,Zt),Ut.side=Xt,Ut.needsUpdate=!0,X=!0}}X===!0&&(L.updateMultisampleRenderTarget(tt),L.updateRenderTargetMipmap(tt)),y.setRenderTarget(T),y.setClearColor(z,P),y.toneMapping=W}function Zi(U,ot,dt){let pt=ot.isScene===!0?ot.overrideMaterial:null;for(let ft=0,kt=U.length;ft<kt;ft++){let T=U[ft],W=T.object,X=T.geometry,q=pt===null?T.material:pt,K=T.group;W.layers.test(dt.layers)&&Ps(W,ot,dt,X,q,K)}}function Ps(U,ot,dt,pt,ft,kt){U.onBeforeRender(y,ot,dt,pt,ft,kt),U.modelViewMatrix.multiplyMatrices(dt.matrixWorldInverse,U.matrixWorld),U.normalMatrix.getNormalMatrix(U.modelViewMatrix),ft.onBeforeRender(y,ot,dt,pt,U,kt),ft.transparent===!0&&ft.side===Ie&&ft.forceSinglePass===!1?(ft.side=fn,ft.needsUpdate=!0,y.renderBufferDirect(dt,ot,pt,ft,U,kt),ft.side=Ui,ft.needsUpdate=!0,y.renderBufferDirect(dt,ot,pt,ft,U,kt),ft.side=Ie):y.renderBufferDirect(dt,ot,pt,ft,U,kt),U.onAfterRender(y,ot,dt,pt,ft,kt)}function Ji(U,ot,dt){ot.isScene!==!0&&(ot=xt);let pt=nt.get(U),ft=m.state.lights,kt=m.state.shadowsArray,T=ft.state.version,W=Ft.getParameters(U,ft.state,kt,ot,dt),X=Ft.getProgramCacheKey(W),q=pt.programs;pt.environment=U.isMeshStandardMaterial?ot.environment:null,pt.fog=ot.fog,pt.envMap=(U.isMeshStandardMaterial?J:C).get(U.envMap||pt.environment),q===void 0&&(U.addEventListener("dispose",Ot),q=new Map,pt.programs=q);let K=q.get(X);if(K!==void 0){if(pt.currentProgram===K&&pt.lightsStateVersion===T)return Or(U,W),K}else W.uniforms=Ft.getUniforms(U),U.onBuild(dt,W,y),U.onBeforeCompile(W,y),K=Ft.acquireProgram(W,X),q.set(X,K),pt.uniforms=W.uniforms;let st=pt.uniforms;return(!U.isShaderMaterial&&!U.isRawShaderMaterial||U.clipping===!0)&&(st.clippingPlanes=ee.uniform),Or(U,W),pt.needsLights=Ko(U),pt.lightsStateVersion=T,pt.needsLights&&(st.ambientLightColor.value=ft.state.ambient,st.lightProbe.value=ft.state.probe,st.directionalLights.value=ft.state.directional,st.directionalLightShadows.value=ft.state.directionalShadow,st.spotLights.value=ft.state.spot,st.spotLightShadows.value=ft.state.spotShadow,st.rectAreaLights.value=ft.state.rectArea,st.ltc_1.value=ft.state.rectAreaLTC1,st.ltc_2.value=ft.state.rectAreaLTC2,st.pointLights.value=ft.state.point,st.pointLightShadows.value=ft.state.pointShadow,st.hemisphereLights.value=ft.state.hemi,st.directionalShadowMap.value=ft.state.directionalShadowMap,st.directionalShadowMatrix.value=ft.state.directionalShadowMatrix,st.spotShadowMap.value=ft.state.spotShadowMap,st.spotLightMatrix.value=ft.state.spotLightMatrix,st.spotLightMap.value=ft.state.spotLightMap,st.pointShadowMap.value=ft.state.pointShadowMap,st.pointShadowMatrix.value=ft.state.pointShadowMatrix),pt.currentProgram=K,pt.uniformsList=null,K}function Zo(U){if(U.uniformsList===null){let ot=U.currentProgram.getUniforms();U.uniformsList=nr.seqWithValue(ot.seq,U.uniforms)}return U.uniformsList}function Or(U,ot){let dt=nt.get(U);dt.outputColorSpace=ot.outputColorSpace,dt.batching=ot.batching,dt.instancing=ot.instancing,dt.instancingColor=ot.instancingColor,dt.skinning=ot.skinning,dt.morphTargets=ot.morphTargets,dt.morphNormals=ot.morphNormals,dt.morphColors=ot.morphColors,dt.morphTargetsCount=ot.morphTargetsCount,dt.numClippingPlanes=ot.numClippingPlanes,dt.numIntersection=ot.numClipIntersection,dt.vertexAlphas=ot.vertexAlphas,dt.vertexTangents=ot.vertexTangents,dt.toneMapping=ot.toneMapping}function Jo(U,ot,dt,pt,ft){ot.isScene!==!0&&(ot=xt),L.resetTextureUnits();let kt=ot.fog,T=pt.isMeshStandardMaterial?ot.environment:null,W=w===null?y.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:ui,X=(pt.isMeshStandardMaterial?J:C).get(pt.envMap||T),q=pt.vertexColors===!0&&!!dt.attributes.color&&dt.attributes.color.itemSize===4,K=!!dt.attributes.tangent&&(!!pt.normalMap||pt.anisotropy>0),st=!!dt.morphAttributes.position,vt=!!dt.morphAttributes.normal,Pt=!!dt.morphAttributes.color,Ut=Li;pt.toneMapped&&(w===null||w.isXRRenderTarget===!0)&&(Ut=y.toneMapping);let Zt=dt.morphAttributes.position||dt.morphAttributes.normal||dt.morphAttributes.color,Xt=Zt!==void 0?Zt.length:0,Rt=nt.get(pt),Gt=m.state.lights;if(rt===!0&&(at===!0||U!==b)){let Cn=U===b&&pt.id===R;ee.setState(pt,U,Cn)}let Dt=!1;pt.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==Gt.state.version||Rt.outputColorSpace!==W||ft.isBatchedMesh&&Rt.batching===!1||!ft.isBatchedMesh&&Rt.batching===!0||ft.isInstancedMesh&&Rt.instancing===!1||!ft.isInstancedMesh&&Rt.instancing===!0||ft.isSkinnedMesh&&Rt.skinning===!1||!ft.isSkinnedMesh&&Rt.skinning===!0||ft.isInstancedMesh&&Rt.instancingColor===!0&&ft.instanceColor===null||ft.isInstancedMesh&&Rt.instancingColor===!1&&ft.instanceColor!==null||Rt.envMap!==X||pt.fog===!0&&Rt.fog!==kt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==ee.numPlanes||Rt.numIntersection!==ee.numIntersection)||Rt.vertexAlphas!==q||Rt.vertexTangents!==K||Rt.morphTargets!==st||Rt.morphNormals!==vt||Rt.morphColors!==Pt||Rt.toneMapping!==Ut||et.isWebGL2===!0&&Rt.morphTargetsCount!==Xt)&&(Dt=!0):(Dt=!0,Rt.__version=pt.version);let ue=Rt.currentProgram;Dt===!0&&(ue=Ji(pt,ot,ft));let Oe=!1,en=!1,Is=!1,nn=ue.getUniforms(),Ki=Rt.uniforms;if(it.useProgram(ue.program)&&(Oe=!0,en=!0,Is=!0),pt.id!==R&&(R=pt.id,en=!0),Oe||b!==U){nn.setValue(F,"projectionMatrix",U.projectionMatrix),nn.setValue(F,"viewMatrix",U.matrixWorldInverse);let Cn=nn.map.cameraPosition;Cn!==void 0&&Cn.setValue(F,ct.setFromMatrixPosition(U.matrixWorld)),et.logarithmicDepthBuffer&&nn.setValue(F,"logDepthBufFC",2/(Math.log(U.far+1)/Math.LN2)),(pt.isMeshPhongMaterial||pt.isMeshToonMaterial||pt.isMeshLambertMaterial||pt.isMeshBasicMaterial||pt.isMeshStandardMaterial||pt.isShaderMaterial)&&nn.setValue(F,"isOrthographic",U.isOrthographicCamera===!0),b!==U&&(b=U,en=!0,Is=!0)}if(ft.isSkinnedMesh){nn.setOptional(F,ft,"bindMatrix"),nn.setOptional(F,ft,"bindMatrixInverse");let Cn=ft.skeleton;Cn&&(et.floatVertexTextures?(Cn.boneTexture===null&&Cn.computeBoneTexture(),nn.setValue(F,"boneTexture",Cn.boneTexture,L)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}ft.isBatchedMesh&&(nn.setOptional(F,ft,"batchingTexture"),nn.setValue(F,"batchingTexture",ft._matricesTexture,L));let Jc=dt.morphAttributes;if((Jc.position!==void 0||Jc.normal!==void 0||Jc.color!==void 0&&et.isWebGL2===!0)&&ne.update(ft,dt,ue),(en||Rt.receiveShadow!==ft.receiveShadow)&&(Rt.receiveShadow=ft.receiveShadow,nn.setValue(F,"receiveShadow",ft.receiveShadow)),pt.isMeshGouraudMaterial&&pt.envMap!==null&&(Ki.envMap.value=X,Ki.flipEnvMap.value=X.isCubeTexture&&X.isRenderTargetTexture===!1?-1:1),en&&(nn.setValue(F,"toneMappingExposure",y.toneMappingExposure),Rt.needsLights&&Ei(Ki,Is),kt&&pt.fog===!0&&It.refreshFogUniforms(Ki,kt),It.refreshMaterialUniforms(Ki,pt,H,N,tt),nr.upload(F,Zo(Rt),Ki,L)),pt.isShaderMaterial&&pt.uniformsNeedUpdate===!0&&(nr.upload(F,Zo(Rt),Ki,L),pt.uniformsNeedUpdate=!1),pt.isSpriteMaterial&&nn.setValue(F,"center",ft.center),nn.setValue(F,"modelViewMatrix",ft.modelViewMatrix),nn.setValue(F,"normalMatrix",ft.normalMatrix),nn.setValue(F,"modelMatrix",ft.matrixWorld),pt.isShaderMaterial||pt.isRawShaderMaterial){let Cn=pt.uniformsGroups;for(let Kc=0,m0=Cn.length;Kc<m0;Kc++)if(et.isWebGL2){let Bu=Cn[Kc];re.update(Bu,ue),re.bind(Bu,ue)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ue}function Ei(U,ot){U.ambientLightColor.needsUpdate=ot,U.lightProbe.needsUpdate=ot,U.directionalLights.needsUpdate=ot,U.directionalLightShadows.needsUpdate=ot,U.pointLights.needsUpdate=ot,U.pointLightShadows.needsUpdate=ot,U.spotLights.needsUpdate=ot,U.spotLightShadows.needsUpdate=ot,U.rectAreaLights.needsUpdate=ot,U.hemisphereLights.needsUpdate=ot}function Ko(U){return U.isMeshLambertMaterial||U.isMeshToonMaterial||U.isMeshPhongMaterial||U.isMeshStandardMaterial||U.isShadowMaterial||U.isShaderMaterial&&U.lights===!0}this.getActiveCubeFace=function(){return E},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(U,ot,dt){nt.get(U.texture).__webglTexture=ot,nt.get(U.depthTexture).__webglTexture=dt;let pt=nt.get(U);pt.__hasExternalTextures=!0,pt.__hasExternalTextures&&(pt.__autoAllocateDepthBuffer=dt===void 0,pt.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),pt.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(U,ot){let dt=nt.get(U);dt.__webglFramebuffer=ot,dt.__useDefaultFramebuffer=ot===void 0},this.setRenderTarget=function(U,ot=0,dt=0){w=U,E=ot,S=dt;let pt=!0,ft=null,kt=!1,T=!1;if(U){let X=nt.get(U);X.__useDefaultFramebuffer!==void 0?(it.bindFramebuffer(F.FRAMEBUFFER,null),pt=!1):X.__webglFramebuffer===void 0?L.setupRenderTarget(U):X.__hasExternalTextures&&L.rebindTextures(U,nt.get(U.texture).__webglTexture,nt.get(U.depthTexture).__webglTexture);let q=U.texture;(q.isData3DTexture||q.isDataArrayTexture||q.isCompressedArrayTexture)&&(T=!0);let K=nt.get(U).__webglFramebuffer;U.isWebGLCubeRenderTarget?(Array.isArray(K[ot])?ft=K[ot][dt]:ft=K[ot],kt=!0):et.isWebGL2&&U.samples>0&&L.useMultisampledRTT(U)===!1?ft=nt.get(U).__webglMultisampledFramebuffer:Array.isArray(K)?ft=K[dt]:ft=K,M.copy(U.viewport),A.copy(U.scissor),I=U.scissorTest}else M.copy(O).multiplyScalar(H).floor(),A.copy(B).multiplyScalar(H).floor(),I=j;if(it.bindFramebuffer(F.FRAMEBUFFER,ft)&&et.drawBuffers&&pt&&it.drawBuffers(U,ft),it.viewport(M),it.scissor(A),it.setScissorTest(I),kt){let X=nt.get(U.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+ot,X.__webglTexture,dt)}else if(T){let X=nt.get(U.texture),q=ot||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,X.__webglTexture,dt||0,q)}R=-1},this.readRenderTargetPixels=function(U,ot,dt,pt,ft,kt,T){if(!(U&&U.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let W=nt.get(U).__webglFramebuffer;if(U.isWebGLCubeRenderTarget&&T!==void 0&&(W=W[T]),W){it.bindFramebuffer(F.FRAMEBUFFER,W);try{let X=U.texture,q=X.format,K=X.type;if(q!==Wn&&Vt.convert(q)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}let st=K===jr&&(Q.has("EXT_color_buffer_half_float")||et.isWebGL2&&Q.has("EXT_color_buffer_float"));if(K!==Di&&Vt.convert(K)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(K===Pi&&(et.isWebGL2||Q.has("OES_texture_float")||Q.has("WEBGL_color_buffer_float")))&&!st){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}ot>=0&&ot<=U.width-pt&&dt>=0&&dt<=U.height-ft&&F.readPixels(ot,dt,pt,ft,Vt.convert(q),Vt.convert(K),kt)}finally{let X=w!==null?nt.get(w).__webglFramebuffer:null;it.bindFramebuffer(F.FRAMEBUFFER,X)}}},this.copyFramebufferToTexture=function(U,ot,dt=0){let pt=Math.pow(2,-dt),ft=Math.floor(ot.image.width*pt),kt=Math.floor(ot.image.height*pt);L.setTexture2D(ot,0),F.copyTexSubImage2D(F.TEXTURE_2D,dt,0,0,U.x,U.y,ft,kt),it.unbindTexture()},this.copyTextureToTexture=function(U,ot,dt,pt=0){let ft=ot.image.width,kt=ot.image.height,T=Vt.convert(dt.format),W=Vt.convert(dt.type);L.setTexture2D(dt,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,dt.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,dt.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,dt.unpackAlignment),ot.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,pt,U.x,U.y,ft,kt,T,W,ot.image.data):ot.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,pt,U.x,U.y,ot.mipmaps[0].width,ot.mipmaps[0].height,T,ot.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,pt,U.x,U.y,T,W,ot.image),pt===0&&dt.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),it.unbindTexture()},this.copyTextureToTexture3D=function(U,ot,dt,pt,ft=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}let kt=U.max.x-U.min.x+1,T=U.max.y-U.min.y+1,W=U.max.z-U.min.z+1,X=Vt.convert(pt.format),q=Vt.convert(pt.type),K;if(pt.isData3DTexture)L.setTexture3D(pt,0),K=F.TEXTURE_3D;else if(pt.isDataArrayTexture||pt.isCompressedArrayTexture)L.setTexture2DArray(pt,0),K=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,pt.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,pt.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,pt.unpackAlignment);let st=F.getParameter(F.UNPACK_ROW_LENGTH),vt=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Pt=F.getParameter(F.UNPACK_SKIP_PIXELS),Ut=F.getParameter(F.UNPACK_SKIP_ROWS),Zt=F.getParameter(F.UNPACK_SKIP_IMAGES),Xt=dt.isCompressedTexture?dt.mipmaps[ft]:dt.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,Xt.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Xt.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,U.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,U.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,U.min.z),dt.isDataTexture||dt.isData3DTexture?F.texSubImage3D(K,ft,ot.x,ot.y,ot.z,kt,T,W,X,q,Xt.data):dt.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(K,ft,ot.x,ot.y,ot.z,kt,T,W,X,Xt.data)):F.texSubImage3D(K,ft,ot.x,ot.y,ot.z,kt,T,W,X,q,Xt),F.pixelStorei(F.UNPACK_ROW_LENGTH,st),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,vt),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Pt),F.pixelStorei(F.UNPACK_SKIP_ROWS,Ut),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Zt),ft===0&&pt.generateMipmaps&&F.generateMipmap(K),it.unbindTexture()},this.initTexture=function(U){U.isCubeTexture?L.setTextureCube(U,0):U.isData3DTexture?L.setTexture3D(U,0):U.isDataArrayTexture||U.isCompressedArrayTexture?L.setTexture2DArray(U,0):L.setTexture2D(U,0),it.unbindTexture()},this.resetState=function(){E=0,S=0,w=null,it.reset(),$t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorSpace=t===Ch?"display-p3":"srgb",e.unpackColorSpace=xe.workingColorSpace===tc?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===$e?as:Ud}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===as?$e:ui}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}},th=class extends io{};th.prototype.isWebGL1Renderer=!0;var Wa=class extends ke{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}};var lr=class extends Ln{constructor(t=null,e=1,i=1,s,r,o,a,c,l=Qe,h=Qe,u,f){super(null,o,a,c,l,h,s,r,u,f),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var so=class extends Ue{constructor(t,e,i,s=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}},$s=new ve,hd=new ve,va=[],ud=new Xn,wM=new ve,Gr=new Nt,Vr=new Oi,ro=class extends Nt{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new so(new Float32Array(i*16),16),this.instanceColor=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<i;s++)this.setMatrixAt(s,wM)}computeBoundingBox(){let t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Xn),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,$s),ud.copy(t.boundingBox).applyMatrix4($s),this.boundingBox.union(ud)}computeBoundingSphere(){let t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Oi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,$s),Vr.copy(t.boundingSphere).applyMatrix4($s),this.boundingSphere.union(Vr)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){let i=this.matrixWorld,s=this.count;if(Gr.geometry=this.geometry,Gr.material=this.material,Gr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Vr.copy(this.boundingSphere),Vr.applyMatrix4(i),t.ray.intersectsSphere(Vr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,$s),hd.multiplyMatrices(i,$s),Gr.matrixWorld=hd,Gr.raycast(t,va);for(let o=0,a=va.length;o<a;o++){let c=va[o];c.instanceId=r,c.object=this,e.push(c)}va.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new so(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}};var Dn=class extends Fi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new gt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},fd=new k,dd=new k,pd=new ve,Al=new to,Ma=new Oi,eh=class extends ke{constructor(t=new ae,e=new Dn){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[0];for(let s=1,r=e.count;s<r;s++)fd.fromBufferAttribute(e,s-1),dd.fromBufferAttribute(e,s),i[s]=i[s-1],i[s]+=fd.distanceTo(dd);t.setAttribute("lineDistance",new qt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let i=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ma.copy(i.boundingSphere),Ma.applyMatrix4(s),Ma.radius+=r,t.ray.intersectsSphere(Ma)===!1)return;pd.copy(s).invert(),Al.copy(t.ray).applyMatrix4(pd);let a=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=new k,h=new k,u=new k,f=new k,p=this.isLineSegments?2:1,x=i.index,m=i.attributes.position;if(x!==null){let d=Math.max(0,o.start),_=Math.min(x.count,o.start+o.count);for(let y=d,v=_-1;y<v;y+=p){let E=x.getX(y),S=x.getX(y+1);if(l.fromBufferAttribute(m,E),h.fromBufferAttribute(m,S),Al.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let R=t.ray.origin.distanceTo(f);R<t.near||R>t.far||e.push({distance:R,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}else{let d=Math.max(0,o.start),_=Math.min(m.count,o.start+o.count);for(let y=d,v=_-1;y<v;y+=p){if(l.fromBufferAttribute(m,y),h.fromBufferAttribute(m,y+1),Al.distanceSqToSegment(l,h,f,u)>c)continue;f.applyMatrix4(this.matrixWorld);let S=t.ray.origin.distanceTo(f);S<t.near||S>t.far||e.push({distance:S,point:u.clone().applyMatrix4(this.matrixWorld),index:y,face:null,faceIndex:null,object:this})}}}updateMorphTargets(){let e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){let s=e[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=s.length;r<o;r++){let a=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}},md=new k,gd=new k,qn=class extends eh{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,i=[];for(let s=0,r=e.count;s<r;s+=2)md.fromBufferAttribute(e,s),gd.fromBufferAttribute(e,s+1),i[s]=s===0?0:i[s-1],i[s+1]=i[s]+md.distanceTo(gd);t.setAttribute("lineDistance",new qt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Un=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){let e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],i,s=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)i=this.getPoint(o/t),r+=i.distanceTo(s),e.push(r),s=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let i=this.getLengths(),s=0,r=i.length,o;e?o=e:o=t*i[r-1];let a=0,c=r-1,l;for(;a<=c;)if(s=Math.floor(a+(c-a)/2),l=i[s]-o,l<0)a=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,i[s]===o)return s/(r-1);let h=i[s],f=i[s+1]-h,p=(o-h)/f;return(s+p)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let o=this.getPoint(s),a=this.getPoint(r),c=e||(o.isVector2?new Tt:new k);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){let i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e){let i=new k,s=[],r=[],o=[],a=new k,c=new ve;for(let p=0;p<=t;p++){let x=p/t;s[p]=this.getTangentAt(x,new k)}r[0]=new k,o[0]=new k;let l=Number.MAX_VALUE,h=Math.abs(s[0].x),u=Math.abs(s[0].y),f=Math.abs(s[0].z);h<=l&&(l=h,i.set(1,0,0)),u<=l&&(l=u,i.set(0,1,0)),f<=l&&i.set(0,0,1),a.crossVectors(s[0],i).normalize(),r[0].crossVectors(s[0],a),o[0].crossVectors(s[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),o[p]=o[p-1].clone(),a.crossVectors(s[p-1],s[p]),a.length()>Number.EPSILON){a.normalize();let x=Math.acos(Ze(s[p-1].dot(s[p]),-1,1));r[p].applyMatrix4(c.makeRotationAxis(a,x))}o[p].crossVectors(s[p],r[p])}if(e===!0){let p=Math.acos(Ze(r[0].dot(r[t]),-1,1));p/=t,s[0].dot(a.crossVectors(r[0],r[t]))>0&&(p=-p);for(let x=1;x<=t;x++)r[x].applyMatrix4(c.makeRotationAxis(s[x],p*x)),o[x].crossVectors(s[x],r[x])}return{tangents:s,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},oo=class extends Un{constructor(t=0,e=0,i=1,s=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){let i=e||new Tt,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(o?r=0:r=s),this.aClockwise===!0&&!o&&(r===s?r=-s:r=r-s);let a=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),f=c-this.aX,p=l-this.aY;c=f*h-p*u+this.aX,l=f*u+p*h+this.aY}return i.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},nh=class extends oo{constructor(t,e,i,s,r,o){super(t,e,i,i,s,r,o),this.isArcCurve=!0,this.type="ArcCurve"}};function Lh(){let n=0,t=0,e=0,i=0;function s(r,o,a,c){n=r,t=a,e=-3*r+3*o-2*a-c,i=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){s(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let f=(o-r)/l-(a-r)/(l+h)+(a-o)/h,p=(a-o)/h-(c-o)/(h+u)+(c-a)/u;f*=h,p*=h,s(o,a,f,p)},calc:function(r){let o=r*r,a=o*r;return n+t*r+e*o+i*a}}}var ba=new k,Rl=new Lh,Cl=new Lh,Pl=new Lh,bn=class extends Un{constructor(t=[],e=!1,i="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=s}getPoint(t,e=new k){let i=e,s=this.points,r=s.length,o=(r-(this.closed?0:1))*t,a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=s[(a-1)%r]:(ba.subVectors(s[0],s[1]).add(s[0]),l=ba);let u=s[a%r],f=s[(a+1)%r];if(this.closed||a+2<r?h=s[(a+2)%r]:(ba.subVectors(s[r-1],s[r-2]).add(s[r-1]),h=ba),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,x=Math.pow(l.distanceToSquared(u),p),g=Math.pow(u.distanceToSquared(f),p),m=Math.pow(f.distanceToSquared(h),p);g<1e-4&&(g=1),x<1e-4&&(x=g),m<1e-4&&(m=g),Rl.initNonuniformCatmullRom(l.x,u.x,f.x,h.x,x,g,m),Cl.initNonuniformCatmullRom(l.y,u.y,f.y,h.y,x,g,m),Pl.initNonuniformCatmullRom(l.z,u.z,f.z,h.z,x,g,m)}else this.curveType==="catmullrom"&&(Rl.initCatmullRom(l.x,u.x,f.x,h.x,this.tension),Cl.initCatmullRom(l.y,u.y,f.y,h.y,this.tension),Pl.initCatmullRom(l.z,u.z,f.z,h.z,this.tension));return i.set(Rl.calc(c),Cl.calc(c),Pl.calc(c)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new k().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function xd(n,t,e,i,s){let r=(i-t)*.5,o=(s-e)*.5,a=n*n,c=n*a;return(2*e-2*i+r+o)*c+(-3*e+3*i-2*r-o)*a+r*n+e}function TM(n,t){let e=1-n;return e*e*t}function AM(n,t){return 2*(1-n)*n*t}function RM(n,t){return n*n*t}function $r(n,t,e,i){return TM(n,t)+AM(n,e)+RM(n,i)}function CM(n,t){let e=1-n;return e*e*e*t}function PM(n,t){let e=1-n;return 3*e*e*n*t}function IM(n,t){return 3*(1-n)*n*n*t}function LM(n,t){return n*n*n*t}function Zr(n,t,e,i,s){return CM(n,t)+PM(n,e)+IM(n,i)+LM(n,s)}var Xa=class extends Un{constructor(t=new Tt,e=new Tt,i=new Tt,s=new Tt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new Tt){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},ih=class extends Un{constructor(t=new k,e=new k,i=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=s}getPoint(t,e=new k){let i=e,s=this.v0,r=this.v1,o=this.v2,a=this.v3;return i.set(Zr(t,s.x,r.x,o.x,a.x),Zr(t,s.y,r.y,o.y,a.y),Zr(t,s.z,r.z,o.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qa=class extends Un{constructor(t=new Tt,e=new Tt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new Tt){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new Tt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},sh=class extends Un{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Ya=class extends Un{constructor(t=new Tt,e=new Tt,i=new Tt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new Tt){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set($r(t,s.x,r.x,o.x),$r(t,s.y,r.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},rh=class extends Un{constructor(t=new k,e=new k,i=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new k){let i=e,s=this.v0,r=this.v1,o=this.v2;return i.set($r(t,s.x,r.x,o.x),$r(t,s.y,r.y,o.y),$r(t,s.z,r.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$a=class extends Un{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new Tt){let i=e,s=this.points,r=(s.length-1)*t,o=Math.floor(r),a=r-o,c=s[o===0?o:o-1],l=s[o],h=s[o>s.length-2?s.length-1:o+1],u=s[o>s.length-3?s.length-1:o+2];return i.set(xd(a,c.x,l.x,h.x,u.x),xd(a,c.y,l.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){let s=t.points[e];this.points.push(new Tt().fromArray(s))}return this}},oh=Object.freeze({__proto__:null,ArcCurve:nh,CatmullRomCurve3:bn,CubicBezierCurve:Xa,CubicBezierCurve3:ih,EllipseCurve:oo,LineCurve:qa,LineCurve3:sh,QuadraticBezierCurve:Ya,QuadraticBezierCurve3:rh,SplineCurve:$a}),ah=class extends Un{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let i=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new oh[i](e,t))}return this}getPoint(t,e){let i=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=i){let o=s[r]-i,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let i=0,s=this.curves.length;i<s;i++)e+=this.curves[i].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],i;for(let s=0,r=this.curves;s<r.length;s++){let o=r[s],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){let h=c[l];i&&i.equals(h)||(e.push(h),i=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,i=this.curves.length;e<i;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,i=t.curves.length;e<i;e++){let s=t.curves[e];this.curves.push(new oh[s.type]().fromJSON(s))}return this}},ao=class extends ah{constructor(t){super(),this.type="Path",this.currentPoint=new Tt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,i=t.length;e<i;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let i=new qa(this.currentPoint.clone(),new Tt(t,e));return this.curves.push(i),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,i,s){let r=new Ya(this.currentPoint.clone(),new Tt(t,e),new Tt(i,s));return this.curves.push(r),this.currentPoint.set(i,s),this}bezierCurveTo(t,e,i,s,r,o){let a=new Xa(this.currentPoint.clone(),new Tt(t,e),new Tt(i,s),new Tt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),i=new $a(e);return this.curves.push(i),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,i,s,r,o){let a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,i,s,r,o),this}absarc(t,e,i,s,r,o){return this.absellipse(t,e,i,i,s,r,o),this}ellipse(t,e,i,s,r,o,a,c){let l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,i,s,r,o,a,c),this}absellipse(t,e,i,s,r,o,a,c){let l=new oo(t,e,i,s,r,o,a,c);if(this.curves.length>0){let u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);let h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},co=class n extends ae{constructor(t=[new Tt(0,-.5),new Tt(.5,0),new Tt(0,.5)],e=12,i=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:i,phiLength:s},e=Math.floor(e),s=Ze(s,0,Math.PI*2);let r=[],o=[],a=[],c=[],l=[],h=1/e,u=new k,f=new Tt,p=new k,x=new k,g=new k,m=0,d=0;for(let _=0;_<=t.length-1;_++)switch(_){case 0:m=t[_+1].x-t[_].x,d=t[_+1].y-t[_].y,p.x=d*1,p.y=-m,p.z=d*0,g.copy(p),p.normalize(),c.push(p.x,p.y,p.z);break;case t.length-1:c.push(g.x,g.y,g.z);break;default:m=t[_+1].x-t[_].x,d=t[_+1].y-t[_].y,p.x=d*1,p.y=-m,p.z=d*0,x.copy(p),p.x+=g.x,p.y+=g.y,p.z+=g.z,p.normalize(),c.push(p.x,p.y,p.z),g.copy(x)}for(let _=0;_<=e;_++){let y=i+_*h*s,v=Math.sin(y),E=Math.cos(y);for(let S=0;S<=t.length-1;S++){u.x=t[S].x*v,u.y=t[S].y,u.z=t[S].x*E,o.push(u.x,u.y,u.z),f.x=_/e,f.y=S/(t.length-1),a.push(f.x,f.y);let w=c[3*S+0]*v,R=c[3*S+1],b=c[3*S+0]*E;l.push(w,R,b)}}for(let _=0;_<e;_++)for(let y=0;y<t.length-1;y++){let v=y+_*t.length,E=v,S=v+t.length,w=v+t.length+1,R=v+1;r.push(E,S,R),r.push(w,R,S)}this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("uv",new qt(a,2)),this.setAttribute("normal",new qt(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.points,t.segments,t.phiStart,t.phiLength)}},lo=class n extends co{constructor(t=1,e=1,i=4,s=8){let r=new ao;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(i),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:i,radialSegments:s}}static fromJSON(t){return new n(t.radius,t.length,t.capSegments,t.radialSegments)}},hr=class n extends ae{constructor(t=1,e=32,i=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:s},e=Math.max(3,e);let r=[],o=[],a=[],c=[],l=new k,h=new Tt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,f=3;u<=e;u++,f+=3){let p=i+u/e*s;l.x=t*Math.cos(p),l.y=t*Math.sin(p),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[f]/t+1)/2,h.y=(o[f+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new qt(o,3)),this.setAttribute("normal",new qt(a,3)),this.setAttribute("uv",new qt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.segments,t.thetaStart,t.thetaLength)}},dn=class n extends ae{constructor(t=1,e=1,i=1,s=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:s,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],f=[],p=[],x=0,g=[],m=i/2,d=0;_(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new qt(u,3)),this.setAttribute("normal",new qt(f,3)),this.setAttribute("uv",new qt(p,2));function _(){let v=new k,E=new k,S=0,w=(e-t)/i;for(let R=0;R<=r;R++){let b=[],M=R/r,A=M*(e-t)+t;for(let I=0;I<=s;I++){let z=I/s,P=z*c+a,D=Math.sin(P),N=Math.cos(P);E.x=A*D,E.y=-M*i+m,E.z=A*N,u.push(E.x,E.y,E.z),v.set(D,w,N).normalize(),f.push(v.x,v.y,v.z),p.push(z,1-M),b.push(x++)}g.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){let M=g[b][R],A=g[b+1][R],I=g[b+1][R+1],z=g[b][R+1];h.push(M,A,z),h.push(A,I,z),S+=6}l.addGroup(d,S,0),d+=S}function y(v){let E=x,S=new Tt,w=new k,R=0,b=v===!0?t:e,M=v===!0?1:-1;for(let I=1;I<=s;I++)u.push(0,m*M,0),f.push(0,M,0),p.push(.5,.5),x++;let A=x;for(let I=0;I<=s;I++){let P=I/s*c+a,D=Math.cos(P),N=Math.sin(P);w.x=b*N,w.y=m*M,w.z=b*D,u.push(w.x,w.y,w.z),f.push(0,M,0),S.x=D*.5+.5,S.y=N*.5*M+.5,p.push(S.x,S.y),x++}for(let I=0;I<s;I++){let z=E+I,P=A+I;v===!0?h.push(P,P+1,z):h.push(P+1,P,z),R+=3}l.addGroup(d,R,v===!0?1:2),d+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},pi=class n extends dn{constructor(t=1,e=1,i=32,s=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,i,s,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:i,heightSegments:s,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new n(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ch=class n extends ae{constructor(t=[],e=[],i=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:i,detail:s};let r=[],o=[];a(s),l(i),h(),this.setAttribute("position",new qt(r,3)),this.setAttribute("normal",new qt(r.slice(),3)),this.setAttribute("uv",new qt(o,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function a(_){let y=new k,v=new k,E=new k;for(let S=0;S<e.length;S+=3)p(e[S+0],y),p(e[S+1],v),p(e[S+2],E),c(y,v,E,_)}function c(_,y,v,E){let S=E+1,w=[];for(let R=0;R<=S;R++){w[R]=[];let b=_.clone().lerp(v,R/S),M=y.clone().lerp(v,R/S),A=S-R;for(let I=0;I<=A;I++)I===0&&R===S?w[R][I]=b:w[R][I]=b.clone().lerp(M,I/A)}for(let R=0;R<S;R++)for(let b=0;b<2*(S-R)-1;b++){let M=Math.floor(b/2);b%2===0?(f(w[R][M+1]),f(w[R+1][M]),f(w[R][M])):(f(w[R][M+1]),f(w[R+1][M+1]),f(w[R+1][M]))}}function l(_){let y=new k;for(let v=0;v<r.length;v+=3)y.x=r[v+0],y.y=r[v+1],y.z=r[v+2],y.normalize().multiplyScalar(_),r[v+0]=y.x,r[v+1]=y.y,r[v+2]=y.z}function h(){let _=new k;for(let y=0;y<r.length;y+=3){_.x=r[y+0],_.y=r[y+1],_.z=r[y+2];let v=m(_)/2/Math.PI+.5,E=d(_)/Math.PI+.5;o.push(v,1-E)}x(),u()}function u(){for(let _=0;_<o.length;_+=6){let y=o[_+0],v=o[_+2],E=o[_+4],S=Math.max(y,v,E),w=Math.min(y,v,E);S>.9&&w<.1&&(y<.2&&(o[_+0]+=1),v<.2&&(o[_+2]+=1),E<.2&&(o[_+4]+=1))}}function f(_){r.push(_.x,_.y,_.z)}function p(_,y){let v=_*3;y.x=t[v+0],y.y=t[v+1],y.z=t[v+2]}function x(){let _=new k,y=new k,v=new k,E=new k,S=new Tt,w=new Tt,R=new Tt;for(let b=0,M=0;b<r.length;b+=9,M+=6){_.set(r[b+0],r[b+1],r[b+2]),y.set(r[b+3],r[b+4],r[b+5]),v.set(r[b+6],r[b+7],r[b+8]),S.set(o[M+0],o[M+1]),w.set(o[M+2],o[M+3]),R.set(o[M+4],o[M+5]),E.copy(_).add(y).add(v).divideScalar(3);let A=m(E);g(S,M+0,_,A),g(w,M+2,y,A),g(R,M+4,v,A)}}function g(_,y,v,E){E<0&&_.x===1&&(o[y]=_.x-1),v.x===0&&v.z===0&&(o[y]=E/2/Math.PI+.5)}function m(_){return Math.atan2(_.z,-_.x)}function d(_){return Math.atan2(-_.y,Math.sqrt(_.x*_.x+_.z*_.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.vertices,t.indices,t.radius,t.details)}};var mi=class extends ao{constructor(t){super(t),this.uuid=ds(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let i=0,s=this.holes.length;i<s;i++)e[i]=this.holes[i].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,i=this.holes.length;e<i;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,i=t.holes.length;e<i;e++){let s=t.holes[e];this.holes.push(new ao().fromJSON(s))}return this}},DM={triangulate:function(n,t,e=2){let i=t&&t.length,s=i?t[0]*e:n.length,r=qd(n,0,s,e,!0),o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,f,p;if(i&&(r=FM(n,t,r,e)),n.length>80*e){a=l=n[0],c=h=n[1];for(let x=e;x<s;x+=e)u=n[x],f=n[x+1],u<a&&(a=u),f<c&&(c=f),u>l&&(l=u),f>h&&(h=f);p=Math.max(l-a,h-c),p=p!==0?32767/p:0}return ho(r,o,e,a,c,p,0),o}};function qd(n,t,e,i,s){let r,o;if(s===ZM(n,t,e,i)>0)for(r=t;r<e;r+=i)o=_d(r,n[r],n[r+1],o);else for(r=e-i;r>=t;r-=i)o=_d(r,n[r],n[r+1],o);return o&&nc(o,o.next)&&(fo(o),o=o.next),o}function cs(n,t){if(!n)return n;t||(t=n);let e=n,i;do if(i=!1,!e.steiner&&(nc(e,e.next)||Pe(e.prev,e,e.next)===0)){if(fo(e),e=t=e.prev,e===e.next)break;i=!0}else e=e.next;while(i||e!==t);return t}function ho(n,t,e,i,s,r,o){if(!n)return;!o&&r&&VM(n,i,s,r);let a=n,c,l;for(;n.prev!==n.next;){if(c=n.prev,l=n.next,r?NM(n,i,s,r):UM(n)){t.push(c.i/e|0),t.push(n.i/e|0),t.push(l.i/e|0),fo(n),n=l.next,a=l.next;continue}if(n=l,n===a){o?o===1?(n=zM(cs(n),t,e),ho(n,t,e,i,s,r,2)):o===2&&OM(n,t,e,i,s,r):ho(cs(n),t,e,i,s,r,1);break}}}function UM(n){let t=n.prev,e=n,i=n.next;if(Pe(t,e,i)>=0)return!1;let s=t.x,r=e.x,o=i.x,a=t.y,c=e.y,l=i.y,h=s<r?s<o?s:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,f=s>r?s>o?s:o:r>o?r:o,p=a>c?a>l?a:l:c>l?c:l,x=i.next;for(;x!==t;){if(x.x>=h&&x.x<=f&&x.y>=u&&x.y<=p&&Qs(s,a,r,c,o,l,x.x,x.y)&&Pe(x.prev,x,x.next)>=0)return!1;x=x.next}return!0}function NM(n,t,e,i){let s=n.prev,r=n,o=n.next;if(Pe(s,r,o)>=0)return!1;let a=s.x,c=r.x,l=o.x,h=s.y,u=r.y,f=o.y,p=a<c?a<l?a:l:c<l?c:l,x=h<u?h<f?h:f:u<f?u:f,g=a>c?a>l?a:l:c>l?c:l,m=h>u?h>f?h:f:u>f?u:f,d=lh(p,x,t,e,i),_=lh(g,m,t,e,i),y=n.prevZ,v=n.nextZ;for(;y&&y.z>=d&&v&&v.z<=_;){if(y.x>=p&&y.x<=g&&y.y>=x&&y.y<=m&&y!==s&&y!==o&&Qs(a,h,c,u,l,f,y.x,y.y)&&Pe(y.prev,y,y.next)>=0||(y=y.prevZ,v.x>=p&&v.x<=g&&v.y>=x&&v.y<=m&&v!==s&&v!==o&&Qs(a,h,c,u,l,f,v.x,v.y)&&Pe(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;y&&y.z>=d;){if(y.x>=p&&y.x<=g&&y.y>=x&&y.y<=m&&y!==s&&y!==o&&Qs(a,h,c,u,l,f,y.x,y.y)&&Pe(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;v&&v.z<=_;){if(v.x>=p&&v.x<=g&&v.y>=x&&v.y<=m&&v!==s&&v!==o&&Qs(a,h,c,u,l,f,v.x,v.y)&&Pe(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function zM(n,t,e){let i=n;do{let s=i.prev,r=i.next.next;!nc(s,r)&&Yd(s,i,i.next,r)&&uo(s,r)&&uo(r,s)&&(t.push(s.i/e|0),t.push(i.i/e|0),t.push(r.i/e|0),fo(i),fo(i.next),i=n=r),i=i.next}while(i!==n);return cs(i)}function OM(n,t,e,i,s,r){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&qM(o,a)){let c=$d(o,a);o=cs(o,o.next),c=cs(c,c.next),ho(o,t,e,i,s,r,0),ho(c,t,e,i,s,r,0);return}a=a.next}o=o.next}while(o!==n)}function FM(n,t,e,i){let s=[],r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*i,c=r<o-1?t[r+1]*i:n.length,l=qd(n,a,c,i,!1),l===l.next&&(l.steiner=!0),s.push(XM(l));for(s.sort(BM),r=0;r<s.length;r++)e=kM(s[r],e);return e}function BM(n,t){return n.x-t.x}function kM(n,t){let e=HM(n,t);if(!e)return t;let i=$d(e,n);return cs(i,i.next),cs(e,e.next)}function HM(n,t){let e=t,i=-1/0,s,r=n.x,o=n.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){let f=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>i&&(i=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let a=s,c=s.x,l=s.y,h=1/0,u;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Qs(o<l?r:i,o,c,l,o<l?i:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),uo(e,n)&&(u<h||u===h&&(e.x>s.x||e.x===s.x&&GM(s,e)))&&(s=e,h=u)),e=e.next;while(e!==a);return s}function GM(n,t){return Pe(n.prev,n,t.prev)<0&&Pe(t.next,n,n.next)<0}function VM(n,t,e,i){let s=n;do s.z===0&&(s.z=lh(s.x,s.y,t,e,i)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==n);s.prevZ.nextZ=null,s.prevZ=null,WM(s)}function WM(n){let t,e,i,s,r,o,a,c,l=1;do{for(e=n,n=null,r=null,o=0;e;){for(o++,i=e,a=0,t=0;t<l&&(a++,i=i.nextZ,!!i);t++);for(c=l;a>0||c>0&&i;)a!==0&&(c===0||!i||e.z<=i.z)?(s=e,e=e.nextZ,a--):(s=i,i=i.nextZ,c--),r?r.nextZ=s:n=s,s.prevZ=r,r=s;e=i}r.nextZ=null,l*=2}while(o>1);return n}function lh(n,t,e,i,s){return n=(n-e)*s|0,t=(t-i)*s|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,n|t<<1}function XM(n){let t=n,e=n;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==n);return e}function Qs(n,t,e,i,s,r,o,a){return(s-o)*(t-a)>=(n-o)*(r-a)&&(n-o)*(i-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(s-o)*(i-a)}function qM(n,t){return n.next.i!==t.i&&n.prev.i!==t.i&&!YM(n,t)&&(uo(n,t)&&uo(t,n)&&$M(n,t)&&(Pe(n.prev,n,t.prev)||Pe(n,t.prev,t))||nc(n,t)&&Pe(n.prev,n,n.next)>0&&Pe(t.prev,t,t.next)>0)}function Pe(n,t,e){return(t.y-n.y)*(e.x-t.x)-(t.x-n.x)*(e.y-t.y)}function nc(n,t){return n.x===t.x&&n.y===t.y}function Yd(n,t,e,i){let s=Sa(Pe(n,t,e)),r=Sa(Pe(n,t,i)),o=Sa(Pe(e,i,n)),a=Sa(Pe(e,i,t));return!!(s!==r&&o!==a||s===0&&Ea(n,e,t)||r===0&&Ea(n,i,t)||o===0&&Ea(e,n,i)||a===0&&Ea(e,t,i))}function Ea(n,t,e){return t.x<=Math.max(n.x,e.x)&&t.x>=Math.min(n.x,e.x)&&t.y<=Math.max(n.y,e.y)&&t.y>=Math.min(n.y,e.y)}function Sa(n){return n>0?1:n<0?-1:0}function YM(n,t){let e=n;do{if(e.i!==n.i&&e.next.i!==n.i&&e.i!==t.i&&e.next.i!==t.i&&Yd(e,e.next,n,t))return!0;e=e.next}while(e!==n);return!1}function uo(n,t){return Pe(n.prev,n,n.next)<0?Pe(n,t,n.next)>=0&&Pe(n,n.prev,t)>=0:Pe(n,t,n.prev)<0||Pe(n,n.next,t)<0}function $M(n,t){let e=n,i=!1,s=(n.x+t.x)/2,r=(n.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(i=!i),e=e.next;while(e!==n);return i}function $d(n,t){let e=new hh(n.i,n.x,n.y),i=new hh(t.i,t.x,t.y),s=n.next,r=t.prev;return n.next=t,t.prev=n,e.next=s,s.prev=e,i.next=e,e.prev=i,r.next=i,i.prev=r,i}function _d(n,t,e,i){let s=new hh(n,t,e);return i?(s.next=i.next,s.prev=i,i.next.prev=s,i.next=s):(s.prev=s,s.next=s),s}function fo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function hh(n,t,e){this.i=n,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ZM(n,t,e,i){let s=0;for(let r=t,o=e-i;r<e;r+=i)s+=(n[o]-n[r])*(n[r+1]+n[o+1]),o=r;return s}var Jr=class n{static area(t){let e=t.length,i=0;for(let s=e-1,r=0;r<e;s=r++)i+=t[s].x*t[r].y-t[r].x*t[s].y;return i*.5}static isClockWise(t){return n.area(t)<0}static triangulateShape(t,e){let i=[],s=[],r=[];yd(t),vd(i,t);let o=t.length;e.forEach(yd);for(let c=0;c<e.length;c++)s.push(o),o+=e[c].length,vd(i,e[c]);let a=DM.triangulate(i,s);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}};function yd(n){let t=n.length;t>2&&n[t-1].equals(n[0])&&n.pop()}function vd(n,t){for(let e=0;e<t.length;e++)n.push(t[e].x),n.push(t[e].y)}var Bi=class n extends ae{constructor(t=new mi([new Tt(.5,.5),new Tt(-.5,.5),new Tt(-.5,-.5),new Tt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let i=this,s=[],r=[];for(let a=0,c=t.length;a<c;a++){let l=t[a];o(l)}this.setAttribute("position",new qt(s,3)),this.setAttribute("uv",new qt(r,2)),this.computeVertexNormals();function o(a){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,p=e.bevelThickness!==void 0?e.bevelThickness:.2,x=e.bevelSize!==void 0?e.bevelSize:p-.1,g=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3,d=e.extrudePath,_=e.UVGenerator!==void 0?e.UVGenerator:JM,y,v=!1,E,S,w,R;d&&(y=d.getSpacedPoints(h),v=!0,f=!1,E=d.computeFrenetFrames(h,!1),S=new k,w=new k,R=new k),f||(m=0,p=0,x=0,g=0);let b=a.extractPoints(l),M=b.shape,A=b.holes;if(!Jr.isClockWise(M)){M=M.reverse();for(let F=0,Mt=A.length;F<Mt;F++){let Q=A[F];Jr.isClockWise(Q)&&(A[F]=Q.reverse())}}let z=Jr.triangulateShape(M,A),P=M;for(let F=0,Mt=A.length;F<Mt;F++){let Q=A[F];M=M.concat(Q)}function D(F,Mt,Q){return Mt||console.error("THREE.ExtrudeGeometry: vec does not exist"),F.clone().addScaledVector(Mt,Q)}let N=M.length,H=z.length;function G(F,Mt,Q){let et,it,bt,nt=F.x-Mt.x,L=F.y-Mt.y,C=Q.x-F.x,J=Q.y-F.y,_t=nt*nt+L*L,mt=nt*J-L*C;if(Math.abs(mt)>Number.EPSILON){let yt=Math.sqrt(_t),Ft=Math.sqrt(C*C+J*J),It=Mt.x-L/yt,Ht=Mt.y+nt/yt,Yt=Q.x-J/Ft,ee=Q.y+C/Ft,Et=((Yt-It)*J-(ee-Ht)*C)/(nt*J-L*C);et=It+nt*Et-F.x,it=Ht+L*Et-F.y;let he=et*et+it*it;if(he<=2)return new Tt(et,it);bt=Math.sqrt(he/2)}else{let yt=!1;nt>Number.EPSILON?C>Number.EPSILON&&(yt=!0):nt<-Number.EPSILON?C<-Number.EPSILON&&(yt=!0):Math.sign(L)===Math.sign(J)&&(yt=!0),yt?(et=-L,it=nt,bt=Math.sqrt(_t)):(et=nt,it=L,bt=Math.sqrt(_t/2))}return new Tt(et/bt,it/bt)}let V=[];for(let F=0,Mt=P.length,Q=Mt-1,et=F+1;F<Mt;F++,Q++,et++)Q===Mt&&(Q=0),et===Mt&&(et=0),V[F]=G(P[F],P[Q],P[et]);let O=[],B,j=V.concat();for(let F=0,Mt=A.length;F<Mt;F++){let Q=A[F];B=[];for(let et=0,it=Q.length,bt=it-1,nt=et+1;et<it;et++,bt++,nt++)bt===it&&(bt=0),nt===it&&(nt=0),B[et]=G(Q[et],Q[bt],Q[nt]);O.push(B),j=j.concat(B)}for(let F=0;F<m;F++){let Mt=F/m,Q=p*Math.cos(Mt*Math.PI/2),et=x*Math.sin(Mt*Math.PI/2)+g;for(let it=0,bt=P.length;it<bt;it++){let nt=D(P[it],V[it],et);ut(nt.x,nt.y,-Q)}for(let it=0,bt=A.length;it<bt;it++){let nt=A[it];B=O[it];for(let L=0,C=nt.length;L<C;L++){let J=D(nt[L],B[L],et);ut(J.x,J.y,-Q)}}}let Y=x+g;for(let F=0;F<N;F++){let Mt=f?D(M[F],j[F],Y):M[F];v?(w.copy(E.normals[0]).multiplyScalar(Mt.x),S.copy(E.binormals[0]).multiplyScalar(Mt.y),R.copy(y[0]).add(w).add(S),ut(R.x,R.y,R.z)):ut(Mt.x,Mt.y,0)}for(let F=1;F<=h;F++)for(let Mt=0;Mt<N;Mt++){let Q=f?D(M[Mt],j[Mt],Y):M[Mt];v?(w.copy(E.normals[F]).multiplyScalar(Q.x),S.copy(E.binormals[F]).multiplyScalar(Q.y),R.copy(y[F]).add(w).add(S),ut(R.x,R.y,R.z)):ut(Q.x,Q.y,u/h*F)}for(let F=m-1;F>=0;F--){let Mt=F/m,Q=p*Math.cos(Mt*Math.PI/2),et=x*Math.sin(Mt*Math.PI/2)+g;for(let it=0,bt=P.length;it<bt;it++){let nt=D(P[it],V[it],et);ut(nt.x,nt.y,u+Q)}for(let it=0,bt=A.length;it<bt;it++){let nt=A[it];B=O[it];for(let L=0,C=nt.length;L<C;L++){let J=D(nt[L],B[L],et);v?ut(J.x,J.y+y[h-1].y,y[h-1].x+Q):ut(J.x,J.y,u+Q)}}}rt(),at();function rt(){let F=s.length/3;if(f){let Mt=0,Q=N*Mt;for(let et=0;et<H;et++){let it=z[et];lt(it[2]+Q,it[1]+Q,it[0]+Q)}Mt=h+m*2,Q=N*Mt;for(let et=0;et<H;et++){let it=z[et];lt(it[0]+Q,it[1]+Q,it[2]+Q)}}else{for(let Mt=0;Mt<H;Mt++){let Q=z[Mt];lt(Q[2],Q[1],Q[0])}for(let Mt=0;Mt<H;Mt++){let Q=z[Mt];lt(Q[0]+N*h,Q[1]+N*h,Q[2]+N*h)}}i.addGroup(F,s.length/3-F,0)}function at(){let F=s.length/3,Mt=0;tt(P,Mt),Mt+=P.length;for(let Q=0,et=A.length;Q<et;Q++){let it=A[Q];tt(it,Mt),Mt+=it.length}i.addGroup(F,s.length/3-F,1)}function tt(F,Mt){let Q=F.length;for(;--Q>=0;){let et=Q,it=Q-1;it<0&&(it=F.length-1);for(let bt=0,nt=h+m*2;bt<nt;bt++){let L=N*bt,C=N*(bt+1),J=Mt+et+L,_t=Mt+it+L,mt=Mt+it+C,yt=Mt+et+C;ct(J,_t,mt,yt)}}}function ut(F,Mt,Q){c.push(F),c.push(Mt),c.push(Q)}function lt(F,Mt,Q){xt(F),xt(Mt),xt(Q);let et=s.length/3,it=_.generateTopUV(i,s,et-3,et-2,et-1);wt(it[0]),wt(it[1]),wt(it[2])}function ct(F,Mt,Q,et){xt(F),xt(Mt),xt(et),xt(Mt),xt(Q),xt(et);let it=s.length/3,bt=_.generateSideWallUV(i,s,it-6,it-3,it-2,it-1);wt(bt[0]),wt(bt[1]),wt(bt[3]),wt(bt[1]),wt(bt[2]),wt(bt[3])}function xt(F){s.push(c[F*3+0]),s.push(c[F*3+1]),s.push(c[F*3+2])}function wt(F){r.push(F.x),r.push(F.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,i=this.parameters.options;return KM(e,i,t)}static fromJSON(t,e){let i=[];for(let r=0,o=t.shapes.length;r<o;r++){let a=e[t.shapes[r]];i.push(a)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new oh[s.type]().fromJSON(s)),new n(i,t.options)}},JM={generateTopUV:function(n,t,e,i,s){let r=t[e*3],o=t[e*3+1],a=t[i*3],c=t[i*3+1],l=t[s*3],h=t[s*3+1];return[new Tt(r,o),new Tt(a,c),new Tt(l,h)]},generateSideWallUV:function(n,t,e,i,s,r){let o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[i*3],h=t[i*3+1],u=t[i*3+2],f=t[s*3],p=t[s*3+1],x=t[s*3+2],g=t[r*3],m=t[r*3+1],d=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new Tt(o,1-c),new Tt(l,1-u),new Tt(f,1-x),new Tt(g,1-d)]:[new Tt(a,1-c),new Tt(h,1-u),new Tt(p,1-x),new Tt(m,1-d)]}};function KM(n,t,e){if(e.shapes=[],Array.isArray(n))for(let i=0,s=n.length;i<s;i++){let r=n[i];e.shapes.push(r.uuid)}else e.shapes.push(n.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var ti=class n extends ch{constructor(t=1,e=0){let i=(1+Math.sqrt(5))/2,s=[-1,i,0,1,i,0,-1,-i,0,1,-i,0,0,-1,i,0,1,i,0,-1,-i,0,1,-i,i,0,-1,i,0,1,-i,0,-1,-i,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new n(t.radius,t.detail)}};var ls=class n extends ae{constructor(t=.5,e=1,i=32,s=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:o},i=Math.max(3,i),s=Math.max(1,s);let a=[],c=[],l=[],h=[],u=t,f=(e-t)/s,p=new k,x=new Tt;for(let g=0;g<=s;g++){for(let m=0;m<=i;m++){let d=r+m/i*o;p.x=u*Math.cos(d),p.y=u*Math.sin(d),c.push(p.x,p.y,p.z),l.push(0,0,1),x.x=(p.x/e+1)/2,x.y=(p.y/e+1)/2,h.push(x.x,x.y)}u+=f}for(let g=0;g<s;g++){let m=g*(i+1);for(let d=0;d<i;d++){let _=d+m,y=_,v=_+i+1,E=_+i+2,S=_+1;a.push(y,v,S),a.push(v,E,S)}}this.setIndex(a),this.setAttribute("position",new qt(c,3)),this.setAttribute("normal",new qt(l,3)),this.setAttribute("uv",new qt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}};var pn=class n extends ae{constructor(t=1,e=32,i=16,s=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:s,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));let c=Math.min(o+a,Math.PI),l=0,h=[],u=new k,f=new k,p=[],x=[],g=[],m=[];for(let d=0;d<=i;d++){let _=[],y=d/i,v=0;d===0&&o===0?v=.5/e:d===i&&c===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){let S=E/e;u.x=-t*Math.cos(s+S*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(s+S*r)*Math.sin(o+y*a),x.push(u.x,u.y,u.z),f.copy(u).normalize(),g.push(f.x,f.y,f.z),m.push(S+v,1-y),_.push(l++)}h.push(_)}for(let d=0;d<i;d++)for(let _=0;_<e;_++){let y=h[d][_+1],v=h[d][_],E=h[d+1][_],S=h[d+1][_+1];(d!==0||o>0)&&p.push(y,v,S),(d!==i-1||c<Math.PI)&&p.push(v,E,S)}this.setIndex(p),this.setAttribute("position",new qt(x,3)),this.setAttribute("normal",new qt(g,3)),this.setAttribute("uv",new qt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var ur=class n extends ae{constructor(t=1,e=.4,i=12,s=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:s,arc:r},i=Math.floor(i),s=Math.floor(s);let o=[],a=[],c=[],l=[],h=new k,u=new k,f=new k;for(let p=0;p<=i;p++)for(let x=0;x<=s;x++){let g=x/s*r,m=p/i*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(g),u.y=(t+e*Math.cos(m))*Math.sin(g),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(g),h.y=t*Math.sin(g),f.subVectors(u,h).normalize(),c.push(f.x,f.y,f.z),l.push(x/s),l.push(p/i)}for(let p=1;p<=i;p++)for(let x=1;x<=s;x++){let g=(s+1)*p+x-1,m=(s+1)*(p-1)+x-1,d=(s+1)*(p-1)+x,_=(s+1)*p+x;o.push(g,m,_),o.push(m,d,_)}this.setIndex(o),this.setAttribute("position",new qt(a,3)),this.setAttribute("normal",new qt(c,3)),this.setAttribute("uv",new qt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};var _e=class extends Fi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new gt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new gt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Nd,this.normalScale=new Tt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}};function wa(n,t,e){return!n||!e&&n.constructor===t?n:typeof t.BYTES_PER_ELEMENT=="number"?new t(n):Array.prototype.slice.call(n)}function jM(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var fr=class{constructor(t,e,i,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(i),this.sampleValues=e,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,i=this._cachedIndex,s=e[i],r=e[i-1];n:{t:{let o;e:{i:if(!(t<s)){for(let a=i+2;;){if(s===void 0){if(t<r)break i;return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(r=s,s=e[++i],t<s)break t}o=e.length;break e}if(!(t>=r)){let a=e[1];t<a&&(i=2,r=a);for(let c=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===c)break;if(s=r,r=e[--i-1],t>=r)break t}o=i,i=0;break e}break n}for(;i<o;){let a=i+o>>>1;t<e[a]?o=a:i=a+1}if(s=e[i],r=e[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=e.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=t*s;for(let o=0;o!==s;++o)e[o]=i[r+o];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},uh=class extends fr{constructor(t,e,i,s){super(t,e,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:vf,endingEnd:vf}}intervalChanged_(t,e,i){let s=this.parameterPositions,r=t-2,o=t+1,a=s[r],c=s[o];if(a===void 0)switch(this.getSettings_().endingStart){case Mf:r=t,a=2*e-i;break;case bf:r=s.length-2,a=e+s[r]-s[r+1];break;default:r=t,a=i}if(c===void 0)switch(this.getSettings_().endingEnd){case Mf:o=t,c=2*i-e;break;case bf:o=1,c=i+s[1]-s[0];break;default:o=t-1,c=e}let l=(i-e)*.5,h=this.valueSize;this._weightPrev=l/(e-a),this._weightNext=l/(c-i),this._offsetPrev=r*h,this._offsetNext=o*h}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=this._offsetPrev,u=this._offsetNext,f=this._weightPrev,p=this._weightNext,x=(i-e)/(s-e),g=x*x,m=g*x,d=-f*m+2*f*g-f*x,_=(1+f)*m+(-1.5-2*f)*g+(-.5+f)*x+1,y=(-1-p)*m+(1.5+p)*g+.5*x,v=p*m-p*g;for(let E=0;E!==a;++E)r[E]=d*o[h+E]+_*o[l+E]+y*o[c+E]+v*o[u+E];return r}},fh=class extends fr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=t*a,l=c-a,h=(i-e)/(s-e),u=1-h;for(let f=0;f!==a;++f)r[f]=o[l+f]*u+o[c+f]*h;return r}},dh=class extends fr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Yn=class{constructor(t,e,i,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=wa(e,this.TimeBufferType),this.values=wa(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,i;if(e.toJSON!==this.toJSON)i=e.toJSON(t);else{i={name:t.name,times:wa(t.times,Array),values:wa(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(i.interpolation=s)}return i.type=t.ValueTypeName,i}InterpolantFactoryMethodDiscrete(t){return new dh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new fh(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new uh(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Ta:e=this.InterpolantFactoryMethodDiscrete;break;case Aa:e=this.InterpolantFactoryMethodLinear;break;case sl:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ta;case this.InterpolantFactoryMethodLinear:return Aa;case this.InterpolantFactoryMethodSmooth:return sl}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let i=0,s=e.length;i!==s;++i)e[i]*=t}return this}trim(t,e){let i=this.times,s=i.length,r=0,o=s-1;for(;r!==s&&i[r]<t;)++r;for(;o!==-1&&i[o]>e;)--o;if(++o,r!==0||o!==s){r>=o&&(o=Math.max(o,1),r=o-1);let a=this.getValueSize();this.times=i.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let i=this.times,s=this.values,r=i.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let o=null;for(let a=0;a!==r;a++){let c=i[a];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,c),t=!1;break}if(o!==null&&o>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,c,o),t=!1;break}o=c}if(s!==void 0&&jM(s))for(let a=0,c=s.length;a!==c;++a){let l=s[a];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===sl,r=t.length-1,o=1;for(let a=1;a<r;++a){let c=!1,l=t[a],h=t[a+1];if(l!==h&&(a!==1||l!==t[0]))if(s)c=!0;else{let u=a*i,f=u-i,p=u+i;for(let x=0;x!==i;++x){let g=e[u+x];if(g!==e[f+x]||g!==e[p+x]){c=!0;break}}}if(c){if(a!==o){t[o]=t[a];let u=a*i,f=o*i;for(let p=0;p!==i;++p)e[f+p]=e[u+p]}++o}}if(r>0){t[o]=t[r];for(let a=r*i,c=o*i,l=0;l!==i;++l)e[c+l]=e[a+l];++o}return o!==t.length?(this.times=t.slice(0,o),this.values=e.slice(0,o*i)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),i=this.constructor,s=new i(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Yn.prototype.TimeBufferType=Float32Array;Yn.prototype.ValueBufferType=Float32Array;Yn.prototype.DefaultInterpolation=Aa;var hs=class extends Yn{};hs.prototype.ValueTypeName="bool";hs.prototype.ValueBufferType=Array;hs.prototype.DefaultInterpolation=Ta;hs.prototype.InterpolantFactoryMethodLinear=void 0;hs.prototype.InterpolantFactoryMethodSmooth=void 0;var ph=class extends Yn{};ph.prototype.ValueTypeName="color";var mh=class extends Yn{};mh.prototype.ValueTypeName="number";var gh=class extends fr{constructor(t,e,i,s){super(t,e,i,s)}interpolate_(t,e,i,s){let r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,c=(i-e)/(s-e),l=t*a;for(let h=l+a;l!==h;l+=4)zi.slerpFlat(r,0,o,l-a,o,l,c);return r}},po=class extends Yn{InterpolantFactoryMethodLinear(t){return new gh(this.times,this.values,this.getValueSize(),t)}};po.prototype.ValueTypeName="quaternion";po.prototype.DefaultInterpolation=Aa;po.prototype.InterpolantFactoryMethodSmooth=void 0;var us=class extends Yn{};us.prototype.ValueTypeName="string";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=Ta;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;var xh=class extends Yn{};xh.prototype.ValueTypeName="vector";var _h=class{constructor(t,e,i){let s=this,r=!1,o=0,a=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=i,this.itemStart=function(h){a++,r===!1&&s.onStart!==void 0&&s.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,s.onProgress!==void 0&&s.onProgress(h,o,a),o===a&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){let u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,f=l.length;u<f;u+=2){let p=l[u],x=l[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return x}return null}}},QM=new _h,yh=class{constructor(t){this.manager=t!==void 0?t:QM,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let i=this;return new Promise(function(s,r){i.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};yh.DEFAULT_MATERIAL_NAME="__DEFAULT";var Za=class extends ke{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new gt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}},Ja=class extends Za{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.groundColor=new gt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},Il=new ve,Md=new k,bd=new k,vh=class{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Tt(512,512),this.map=null,this.mapPass=null,this.matrix=new ve,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new no,this._frameExtents=new Tt(1,1),this._viewportCount=1,this._viewports=[new Je(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,i=this.matrix;Md.setFromMatrixPosition(t.matrixWorld),e.position.copy(Md),bd.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(bd),e.updateMatrixWorld(),Il.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Il),i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Il)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Mh=class extends vh{constructor(){super(new cr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ka=class extends Za{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ke.DEFAULT_UP),this.updateMatrix(),this.target=new ke,this.shadow=new Mh}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var Dh="\\[\\]\\.:\\/",tb=new RegExp("["+Dh+"]","g"),Uh="[^"+Dh+"]",eb="[^"+Dh.replace("\\.","")+"]",nb=/((?:WC+[\/:])*)/.source.replace("WC",Uh),ib=/(WCOD+)?/.source.replace("WCOD",eb),sb=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Uh),rb=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Uh),ob=new RegExp("^"+nb+ib+sb+rb+"$"),ab=["material","materials","bones","map"],bh=class{constructor(t,e,i){let s=i||Te.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(t,e)}setValue(t,e){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,i=t.length;e!==i;++e)t[e].unbind()}},Te=class n{constructor(t,e,i){this.path=e,this.parsedPath=i||n.parseTrackName(e),this.node=n.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,i){return t&&t.isAnimationObjectGroup?new n.Composite(t,e,i):new n(t,e,i)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(tb,"")}static parseTrackName(t){let e=ob.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let i={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);ab.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return i}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let i=t.skeleton.getBoneByName(e);if(i!==void 0)return i}if(t.children){let i=function(r){for(let o=0;o<r.length;o++){let a=r[o];if(a.name===e||a.uuid===e)return a;let c=i(a.children);if(c)return c}return null},s=i(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)t[e++]=i[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,i=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=n.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let l=e.objectIndex;switch(i){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let h=0;h<t.length;h++)if(t[h].name===l){l=h;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[i]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let o=t[s];if(o===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let a=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?a=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Te.Composite=bh;Te.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Te.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Te.prototype.GetterByBindingType=[Te.prototype._getValue_direct,Te.prototype._getValue_array,Te.prototype._getValue_arrayElement,Te.prototype._getValue_toArray];Te.prototype.SetterByBindingTypeAndVersioning=[[Te.prototype._setValue_direct,Te.prototype._setValue_direct_setNeedsUpdate,Te.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_array,Te.prototype._setValue_array_setNeedsUpdate,Te.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_arrayElement,Te.prototype._setValue_arrayElement_setNeedsUpdate,Te.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Te.prototype._setValue_fromArray,Te.prototype._setValue_fromArray_setNeedsUpdate,Te.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var NS=new Float32Array(1);var ja=class{constructor(t,e,i=0,s=1/0){this.ray=new to(t,e),this.near=i,this.far=s,this.camera=null,this.layers=new eo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}intersectObject(t,e=!0,i=[]){return Eh(t,this,i,e),i.sort(Ed),i}intersectObjects(t,e=!0,i=[]){for(let s=0,r=t.length;s<r;s++)Eh(t[s],this,i,e);return i.sort(Ed),i}};function Ed(n,t){return n.distance-t.distance}function Eh(n,t,e,i){if(n.layers.test(t.layers)&&n.raycast(t,e),i===!0){let s=n.children;for(let r=0,o=s.length;r<o;r++)Eh(s[r],t,e,!0)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sh}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sh);var pr={x:-7.7,y:.32,z:-2.5},ki=new k(36,34.68,36),Kd=ki.y/(ki.length()*Math.SQRT2),cb=Math.hypot(ki.x,ki.z)/ki.length(),Nn={left:-33.72,right:36.3,bottom:-19.83,top:22.1},lb=Nn.right-Nn.left,Nh=Nn.top-Nn.bottom,Zd=(Nn.left+Nn.right)/(2*Math.SQRT2),Jd=(Nn.bottom+Nn.top)/(4*Kd),hb={overview:{x:pr.x+Zd-Jd,z:pr.z-Zd-Jd,span:Nh,minWidth:0},bank:{x:-10.5,z:.55,span:11.8,minWidth:16},rapid:{x:-14.35,z:-7.2,span:9.9,minWidth:13.4},waterfall:{x:-.7,y:3.45,z:-37.25,span:15,minWidth:18.8},hill:{x:10.2,y:3.1,z:-12.45,span:12.8,minWidth:17.6},slope:{x:-14.4,z:6.4,span:18.4,minWidth:25},coast:{x:-5.7,z:17.3,span:13.8,minWidth:20}};function jd({createTerrain:n,mountLayers:t,views:e={},initialView:i="overview"}){let s=document.querySelector("#status");try{ub(n,t,{...hb,...e},i,s)}catch(r){console.error(r),s.textContent="Kh\xF4ng m\u1EDF \u0111\u01B0\u1EE3c \u0111\u1ECBa h\xECnh 3D. H\xE3y th\u1EED Chrome ho\u1EB7c Edge c\xF3 WebGL."}}function ub(n,t,e,i,s){let r=document.querySelector("#terrain"),o=[...document.querySelectorAll("[data-camera]")].filter(O=>e[O.dataset.camera]),a=matchMedia("(prefers-reduced-motion: reduce)"),c=new io({canvas:r,antialias:!0});c.setPixelRatio(Math.min(devicePixelRatio,1.5)),c.shadowMap.enabled=!0,c.shadowMap.type=wh,c.toneMapping=Ah;let l=new Wa;l.background=new gt("#b5b88a");let h=new Ja("#fff1d3","#7c937c",1.92),u=new Ka("#ffebc8",2.11);u.position.set(-18,26,16),u.castShadow=!0,u.shadow.mapSize.set(1536,1536),Object.assign(u.shadow.camera,{left:-35,right:35,top:33,bottom:-33,near:1,far:90}),u.shadow.normalBias=.045;let f=n(),{group:p,updateWater:x,ground:g}=f;l.add(h,u,p);let m=new cr(-20,20,12,-12,.1,200),d=new k,_=new ja,y=new Tt,{controls:v,pickBuilding:E}=t?.({scene:l,canvas:r,terrain:f})??{},S={...e[i]},w=null,R=S.span,b=Kd,M=0,A=0;function I(O){let B=r.getBoundingClientRect();y.set((O.clientX-B.left)/B.width*2-1,1-(O.clientY-B.top)/B.height*2),_.setFromCamera(y,m);let j=_.intersectObject(g,!1)[0];return v?.pickRoad?v.pickRoad(_,j):j?.point}function z(){let O=r.clientWidth/Math.max(1,r.clientHeight);if(!O)return;let B=Math.min(Nh,lb/O);R=Math.min(Math.max(S.span,S.minWidth/O),B);let j=R/2,Y=j*O;m.left=-Y,m.right=Y,m.top=j,m.bottom=-j,m.updateProjectionMatrix();let rt=S.y??pr.y,at=S.elevation?new k(ki.x,S.elevation,ki.z):ki;b=at.y/(at.length()*Math.SQRT2);let tt=S.elevation?Math.hypot(at.x,at.z)/at.length():cb,ut=S.x-pr.x,lt=S.z-pr.z,ct=(ut-lt)/Math.SQRT2,xt=(rt-pr.y)*tt-(ut+lt)*b,wt=Bt.clamp(ct,Nn.left+Y,Nn.right-Y),F=Bt.clamp(xt,Nn.bottom+j,Nn.top-j),Mt=(wt-ct)/Math.SQRT2,Q=(F-xt)/(2*b);d.set(S.x+Mt-Q,rt,S.z-Mt-Q),m.position.copy(d).add(at),m.lookAt(d),m.updateMatrixWorld()}function P(){c.setSize(r.clientWidth,r.clientHeight,!1),z()}function D(O){for(let B of o)B.setAttribute("aria-pressed",String(B.dataset.camera===O))}D(i);function N(O){S.x=d.x,S.z=d.z,S.span=Bt.clamp(R*O,8.5,Nh),S.minWidth=0,D(null),z()}for(let O of o)O.addEventListener("click",()=>{S={...e[O.dataset.camera]},D(O.dataset.camera),z()});document.querySelector("#zoom-in").addEventListener("click",()=>N(.84)),document.querySelector("#zoom-out").addEventListener("click",()=>N(1.19)),r.addEventListener("wheel",O=>{O.preventDefault(),N(O.deltaY<0?.91:1.1)},{passive:!1});let H=document.querySelector("#edit-cursor");function G(O){if(!H||O.pointerType!=="touch")return;let B=r.getBoundingClientRect();H.style.left=`${O.clientX-B.left}px`,H.style.top=`${Math.max(12,O.clientY-B.top-44)}px`,H.hidden=!1}r.addEventListener("pointerdown",O=>{if(!O.isPrimary||O.button!==0)return;let B=v?.begin(I(O),O);w={id:O.pointerId,x:O.clientX,y:O.clientY,editing:B,moved:!1},B&&G(O),r.setPointerCapture(O.pointerId)}),r.addEventListener("pointermove",O=>{if(!w||w.id!==O.pointerId)return;if(w.editing){G(O),v.move(I(O));return}if(!w.moved&&Math.hypot(O.clientX-w.x,O.clientY-w.y)<4)return;w.moved=!0;let B=R/Math.max(1,r.clientHeight),j=(O.clientX-w.x)*B/Math.SQRT2,Y=(O.clientY-w.y)*B/(2*b);S.x=d.x-j-Y,S.z=d.z+j-Y,w.x=O.clientX,w.y=O.clientY,D(null),z()});for(let O of["pointerup","pointercancel","lostpointercapture"])r.addEventListener(O,B=>{if(w?.id===B.pointerId){if(w.editing)H&&(H.hidden=!0),O==="pointerup"&&v.move(I(B)),v.finish(O!=="pointerup");else if(O==="pointerup"&&!w.moved&&v){let j=I(B),Y=r.dataset.planMode==="inspect"?E?.(_):void 0;v.inspect(j,Y)}w=null}});function V(O){a.matches||(M+=Math.min(.05,A?(O-A)/1e3:.016)),A=O,x(M),v?.update(M,!a.matches),c.render(l,m),requestAnimationFrame(V)}new ResizeObserver(P).observe(r),P(),s.textContent="K\xE9o \u0111\u1EC3 d\u1ECBch g\xF3c nh\xECn. Cu\u1ED9n ho\u1EB7c d\xF9ng + v\xE0 \u2212 \u0111\u1EC3 thu ph\xF3ng.",document.documentElement.dataset.ready="true",requestAnimationFrame(V)}var mo=new k;function zn(n,t,e,i,s,r){let o=2*Math.PI*s/4,a=Math.max(r-2*s,0),c=Math.PI/4;mo.copy(t),mo[i]=0,mo.normalize();let l=.5*o/(o+a),h=1-mo.angleTo(n)/c;return Math.sign(mo[e])===1?h*l:a/(o+a)+l+l*(1-h)}var ic=class extends He{constructor(t=1,e=1,i=1,s=2,r=.1){if(s=s*2+1,r=Math.min(t/2,e/2,i/2,r),super(1,1,1,s,s,s),s===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let a=new k,c=new k,l=new k(t,e,i).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,f=this.attributes.uv.array,p=h.length/6,x=new k,g=.5/s;for(let m=0,d=0;m<h.length;m+=3,d+=2)switch(a.fromArray(h,m),c.copy(a),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),h[m+0]=l.x*Math.sign(a.x)+c.x*r,h[m+1]=l.y*Math.sign(a.y)+c.y*r,h[m+2]=l.z*Math.sign(a.z)+c.z*r,u[m+0]=c.x,u[m+1]=c.y,u[m+2]=c.z,Math.floor(m/p)){case 0:x.set(1,0,0),f[d+0]=zn(x,c,"z","y",r,i),f[d+1]=1-zn(x,c,"y","z",r,e);break;case 1:x.set(-1,0,0),f[d+0]=1-zn(x,c,"z","y",r,i),f[d+1]=1-zn(x,c,"y","z",r,e);break;case 2:x.set(0,1,0),f[d+0]=1-zn(x,c,"x","z",r,t),f[d+1]=zn(x,c,"z","x",r,i);break;case 3:x.set(0,-1,0),f[d+0]=1-zn(x,c,"x","z",r,t),f[d+1]=1-zn(x,c,"z","x",r,i);break;case 4:x.set(0,0,1),f[d+0]=1-zn(x,c,"x","y",r,t),f[d+1]=1-zn(x,c,"y","x",r,e);break;case 5:x.set(0,0,-1),f[d+0]=zn(x,c,"x","y",r,t),f[d+1]=1-zn(x,c,"y","x",r,e);break}}};function zh(n,t=!1){let e=n[0].index!==null,i=new Set(Object.keys(n[0].attributes)),s=new Set(Object.keys(n[0].morphAttributes)),r={},o={},a=n[0].morphTargetsRelative,c=new ae,l=0;for(let h=0;h<n.length;++h){let u=n[h],f=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;r[p]===void 0&&(r[p]=[]),r[p].push(u.attributes[p]),f++}if(f!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!s.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[p]===void 0&&(o[p]=[]),o[p].push(u.morphAttributes[p])}if(t){let p;if(e)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,p,h),l+=p}}if(e){let h=0,u=[];for(let f=0;f<n.length;++f){let p=n[f].index;for(let x=0;x<p.count;++x)u.push(p.getX(x)+h);h+=n[f].attributes.position.count}c.setIndex(u)}for(let h in r){let u=Qd(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(let h in o){let u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let f=0;f<u;++f){let p=[];for(let g=0;g<o[h].length;++g)p.push(o[h][g][f]);let x=Qd(p);if(!x)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(x)}}return c}function Qd(n){let t,e,i,s=-1,r=0;for(let l=0;l<n.length;++l){let h=n[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(s===-1&&(s=h.gpuType),s!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}let o=new t(r),a=0;for(let l=0;l<n.length;++l)o.set(n[l].array,a),a+=n[l].array.length;let c=new Ue(o,e,i);return s!==void 0&&(c.gpuType=s),c}function tp(n,t=1e-4){t=Math.max(t,Number.EPSILON);let e={},i=n.getIndex(),s=n.getAttribute("position"),r=i?i.count:s.count,o=0,a=Object.keys(n.attributes),c={},l={},h=[],u=["getX","getY","getZ","getW"],f=["setX","setY","setZ","setW"];for(let _=0,y=a.length;_<y;_++){let v=a[_],E=n.attributes[v];c[v]=new Ue(new E.array.constructor(E.count*E.itemSize),E.itemSize,E.normalized);let S=n.morphAttributes[v];S&&(l[v]=new Ue(new S.array.constructor(S.count*S.itemSize),S.itemSize,S.normalized))}let p=t*.5,x=Math.log10(1/t),g=Math.pow(10,x),m=p*g;for(let _=0;_<r;_++){let y=i?i.getX(_):_,v="";for(let E=0,S=a.length;E<S;E++){let w=a[E],R=n.getAttribute(w),b=R.itemSize;for(let M=0;M<b;M++)v+=`${~~(R[u[M]](y)*g+m)},`}if(v in e)h.push(e[v]);else{for(let E=0,S=a.length;E<S;E++){let w=a[E],R=n.getAttribute(w),b=n.morphAttributes[w],M=R.itemSize,A=c[w],I=l[w];for(let z=0;z<M;z++){let P=u[z],D=f[z];if(A[D](o,R[P](y)),b)for(let N=0,H=b.length;N<H;N++)I[N][D](o,b[N][P](y))}}e[v]=o,h.push(o),o++}}let d=n.clone();for(let _ in n.attributes){let y=c[_];if(d.setAttribute(_,new Ue(y.array.slice(0,o*y.itemSize),y.itemSize,y.normalized)),_ in l)for(let v=0;v<l[_].length;v++){let E=l[_][v];d.morphAttributes[_][v]=new Ue(E.array.slice(0,o*E.itemSize),E.itemSize,E.normalized)}}return d.setIndex(h),d}var ep=new Map;function le(n,t={}){let e=`${n}|${t.emissive??""}|${t.rough??""}`,i=ep.get(e);return i||(i=new _e({color:n,roughness:t.rough??.85,metalness:0}),t.emissive&&(i.emissive.set(t.emissive),i.emissiveIntensity=.6),ep.set(e,i)),i}function Oh(n,t,e,i,s,r){return t.position.set(e,i+r/2,s),t.castShadow=!0,t.receiveShadow=!0,n.add(t),t}function $(n,t,e,i,s,r=0,o=0,a=0){return Oh(n,new Nt(new He(t,e,i),le(s)),r,o,a,e)}function En(n,t,e,i,s,r=0,o=0,a=0,c=.08){let l=new ic(t,e,i,2,Math.min(c,t/2,e/2,i/2));return Oh(n,new Nt(l,le(s)),r,o,a,e)}function de(n,t,e,i,s,r=0,o=0,a=0,c=12){return Oh(n,new Nt(new dn(t,e,i,c),le(s)),r,o,a,i)}function np(n,t,e,i=0,s=0,r=0,o=1){let a=new Nt(new ti(t,o),le(e));return a.position.set(i,s+t,r),a.castShadow=!0,a.receiveShadow=!0,n.add(a),a}function $n(n,t,e,i,s,r=0,o=0,a=0){let c=new mi;c.moveTo(-i/2,0),c.lineTo(i/2,0),c.lineTo(0,e),c.closePath();let l=new Bi(c,{depth:t,bevelEnabled:!1});l.translate(0,0,-t/2),l.rotateY(Math.PI/2);let h=new Nt(l,le(s));return h.position.set(r,o,a),h.castShadow=!0,h.receiveShadow=!0,n.add(h),h}function fe(n){n.updateMatrixWorld(!0);let t=new ve().copy(n.matrixWorld).invert(),e=new Map,i=[];n.traverse(r=>{if(r===n)return;let o=r;if(!o.isMesh||r.userData.dynamic||Array.isArray(o.material)||fb(r,n))return;let a=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();for(let l of Object.keys(a.attributes))["position","normal","uv"].includes(l)||a.deleteAttribute(l);a.applyMatrix4(new ve().multiplyMatrices(t,o.matrixWorld));let c=e.get(o.material)??[];c.push(a),e.set(o.material,c),i.push(r)});for(let r of i)r.removeFromParent(),r.geometry.dispose();for(let[r,o]of e){let a=zh(o,!1);if(o.forEach(l=>l.dispose()),!a)continue;let c=new Nt(a,r);c.castShadow=!0,c.receiveShadow=!0,n.add(c)}let s=[];return n.traverse(r=>{r!==n&&!r.isMesh&&r.children.length===0&&!r.userData.dynamic&&s.push(r)}),s.forEach(r=>r.removeFromParent()),n}function fb(n,t){for(let e=n.parent;e&&e!==t;e=e.parent)if(e.userData.dynamic)return!0;return!1}var db=new _e({vertexColors:!0,roughness:.85,metalness:0});function ip(n,t=()=>!1){let e=n.children.filter(r=>r.isMesh&&!t(r));if(e.length<2)return;let i=e.map(r=>{r.updateMatrix();let o=(r.geometry.index?r.geometry.toNonIndexed():r.geometry.clone()).applyMatrix4(r.matrix);for(let h of Object.keys(o.attributes))["position","normal"].includes(h)||o.deleteAttribute(h);let a=r.material.color,c=o.attributes.position.count,l=new Float32Array(c*3);for(let h=0;h<c;h++)l.set([a.r,a.g,a.b],h*3);return o.setAttribute("color",new Ue(l,3)),o}),s=zh(i,!1);i.forEach(r=>r.dispose()),s&&(e.forEach(r=>r.removeFromParent()),n.add(new Nt(s,db)))}var pb=new hr(1,20).rotateX(-Math.PI/2),mb=new Be({color:"#1e2a33",transparent:!0,opacity:.22,depthWrite:!1});function Fh(n,t=n){let e=new Nt(pb,mb);return e.scale.set(n,1,t),e.position.y=.012,e.renderOrder=1,e}function an(n){let t=n>>>0;return()=>{t=t+1831565813>>>0;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Hi(n,t,e,i=3){let s=new ae;return s.setAttribute("position",new qt(n,3)),s.setAttribute("color",new qt(t,i)),s.setIndex(e),s.computeVertexNormals(),s}var ht=({x:n,z:t})=>`${n},${t}`,mr=(n,t)=>Math.hypot(t[0]-n[0],t[1]-n[1]),gr=(n,t)=>{let e=mr(n,t);return[(t[0]-n[0])/e,(t[1]-n[1])/e]},go=(n,t,e)=>[n[0]+t[0]*e,n[1]+t[1]*e];function ps(n,t){if(n.length<3)return n;let e=n[0],i=n.at(-1),s=mr(e,i),r=s?gr(e,i):[0,0],o=-1,a=t;for(let c=1;c<n.length-1;c++){let[l,h]=[n[c][0]-e[0],n[c][1]-e[1]],u=Math.max(0,Math.min(s,l*r[0]+h*r[1])),f=mr(n[c],go(e,r,u));f>a&&([o,a]=[c,f])}return o<0?[e,i]:[...ps(n.slice(0,o+1),t).slice(0,-1),...ps(n.slice(o),t)]}function sc(n,t){let e=[n[0]],i=r=>{let o=e.at(-1),a=Math.ceil(mr(o,r)/.18);for(let c=1;c<=a;c++)e.push(go(o,[r[0]-o[0],r[1]-o[1]],c/a))},s=0;for(let r=1;r<n.length-1;r++){let[o,a,c]=n.slice(r-1,r+2),l=gr(o,a),h=gr(a,c),u=Math.atan2(l[0]*h[1]-l[1]*h[0],l[0]*h[0]+l[1]*h[1]),f=t*Math.tan(Math.abs(u)/2);if(s+f>=mr(o,a)-.05||f>=mr(a,c)-.05)return null;if(s=f,f<.01)continue;let p=go(a,l,-f),x=go(p,[-l[1],l[0]],Math.sign(u)*t),g=Math.atan2(p[1]-x[1],p[0]-x[0]),m=Math.ceil(Math.abs(u)*t/.16);i(p);for(let d=1;d<=m;d++){let _=g+u*d/m;e.push(go(x,[Math.cos(_),Math.sin(_)],t))}}return i(n.at(-1)),e}function Gi(n){return n.map(([t,e],i)=>{let[s,r]=gr(n[Math.max(0,i-1)],n[Math.min(n.length-1,i+1)]);return{x:t,z:e,dx:s,dz:r}})}function xr({points:n}){let[t,e]=n,i=n.at(-1);return[[t,gr(e,t)],[i,gr(n.at(-2),i)]]}function gi(n){let t=new Map;for(let i of n.values())i.roadCurveId&&(t.has(i.roadCurveId)||t.set(i.roadCurveId,[]),t.get(i.roadCurveId).push(i));let e=new Map;for(let[i,s]of t){let r=s.find(o=>o.roadCurve)?.roadCurve;r?.cells?.length===s.length&&r.points?.length>1&&r.cells.every(o=>n.get(o)?.roadCurveId===i)&&s.every(o=>o.material===s[0].material&&!o.bridgeId&&!o.approachBridgeId)&&e.set(i,{...r,material:s[0].material})}return e}function sp(n,t){let e=new Set(t.map(s=>n.get(typeof s=="string"?s:ht(s))?.roadCurveId).filter(Boolean));if(!e.size)return n;let i=new Map(n);for(let[s,r]of n)if(e.has(r.roadCurveId))if(r.curveOnly)i.delete(s);else{let{roadCurveId:o,roadCurve:a,...c}=r;i.set(s,c)}return i}var St=1,Jt=2,Vi=["dirt","stone","asphalt"],xi=({x:n,z:t})=>({x:Math.floor(n),z:Math.floor(t)}),_i=(n,t)=>n&&t&&n.x===t.x&&n.z===t.z,gb=[St,Jt],_r=(n,t)=>t===St?n.x:n.z,xo=(n,t)=>t===St?n.z:n.x,Hh=(n,t,e)=>n===St?{x:t,z:e}:{x:e,z:t},_o=(n,t,e,i)=>n.get(ht(Hh(t,e,i)));function Ke(n,t,e){let i=_r(t,e),s=xo(t,e),r=s;for(;(_o(n,e,i,s-1)?.axes??0)&e;)s--;for(;(_o(n,e,i,r+1)?.axes??0)&e;)r++;let o=Array.from({length:r-s+1},(a,c)=>_o(n,e,i,s+c));return{id:`${e}:${i}:${s}`,axis:e,t:i,lo:s,hi:r,cells:o,width:o.length,material:o[Math.floor((o.length-1)/2)].material,junction:o.some(a=>a.axes===(St|Jt))}}function yr(n,t,e,i,s,r=St){let o=Math.abs(e.x-t.x),a=Math.abs(e.z-t.z),c=o+a?o>=a?St:Jt:r,l=xo(t,c),h=_r(t,c),u=_r(e,c),f=Array.from({length:Math.abs(u-h)+1},(g,m)=>Hh(c,h+m*Math.sign(u-h),l)),p=new Map(n),x=1;for(let g of f){let m=ht(g);if(i==="erase"){p.delete(m);continue}let d=s(g);if(d)return{roads:n,cells:f,error:d};let _=n.get(m);p.set(m,{...g,material:_?.material??i,axes:(_?.axes??0)|c})}if(i!=="erase")for(let g of f){let m=Ke(p,g,c);if(x=Math.max(x,m.width),x>4)return{roads:n,cells:f,error:"\u0110\u01B0\u1EDDng r\u1ED9ng t\u1ED1i \u0111a 4 \xF4."}}return{roads:p,cells:f,width:x,error:""}}function ms(n){let t=new Map;for(let e of gb){let i=[...n.values()].filter(s=>s.axes&e).sort((s,r)=>_r(s,e)-_r(r,e)||xo(s,e)-xo(r,e));for(let s of i){if((_o(n,e,_r(s,e),xo(s,e)-1)?.axes??0)&e)continue;let r=Ke(n,s,e);t.set(r.id,r)}}return[...t.values()]}function Bh(n,t,e){let i=new Map,s=t.t+e;for(let r=t.lo;r<=t.hi;r++){let o=_o(n,t.axis,s,r);if(!(o?.axes&t.axis))continue;let a=Ke(n,o,t.axis);i.set(a.id,a)}return[...i.values()]}function Gh(n,t){let e=n.get(ht(t));if(!e)return[];let i=e.roadCurveId&&gi(n).get(e.roadCurveId);if(i)return i.cells.map(o=>n.get(o));if(e.curveOnly)return[];if(e.axes===(St|Jt))return[];let s=Ke(n,e,e.axes);if(s.junction)return s.cells.filter(o=>o.axes===s.axis);let r=[...s.cells];for(let o of[-1,1]){let a=s;for(;;){let c=Bh(n,a,o);if(c.length!==1||c[0].junction||c[0].material!==s.material)break;[a]=c,r.push(...a.cells)}}return r}function yi(n,t,e){let i=new Map(n);for(let s of t){let r=ht(s),o=i.get(r);o&&i.set(r,{...o,material:e})}return i}function kh(n,t){if(t==="walk")return[n.width===1?.36:n.width/2-.16];if(t==="motorcycle"){if(n.width===1)return[.12];if(n.width===3)return[1]}return n.width===1?[]:n.width===4&&n.material==="asphalt"?[.32,.91]:[n.width===2?.29:.39]}function vo(n){let t=new Map([...n].filter(([,i])=>i.axes===(St|Jt))),e=new Map;for(let[i,s]of t){let r=[s];t.delete(i);for(let o of r){e.set(ht(o),i);for(let[a,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let l=ht({x:o.x+a,z:o.z+c}),h=t.get(l);h&&(r.push(h),t.delete(l))}}}return e}function Vh(n,t=vo(n)){let e=new Map,i=[{x:1,z:0},{x:-1,z:0},{x:0,z:1},{x:0,z:-1}];for(let[s,r]of t){e.has(r)||e.set(r,{cells:[],directions:new Set});let o=e.get(r),a=n.get(s);o.cells.push(a);for(let c of i){let l=ht({x:a.x+c.x,z:a.z+c.z}),h=n.get(l),u=c.x?St:Jt;t.get(l)!==r&&h?.axes&u&&o.directions.add(c)}}return[...e].map(([s,r])=>({id:s,cells:r.cells,directions:[...r.directions]}))}function yo(n,t=vo(n),e=!1){let i=new Map;for(let{id:s,cells:r,directions:o}of Vh(n,t)){if(o.length<3||r.some(g=>g.bridgeId||g.approachBridgeId||g.roadCurveId||!e&&g.junctionStyle==="crossing"))continue;let a=Math.min(...r.map(g=>g.x)),c=Math.max(...r.map(g=>g.x))+1,l=Math.min(...r.map(g=>g.z)),h=Math.max(...r.map(g=>g.z))+1,u=c-a,f=h-l;if(Math.min(u,f)<2||r.length!==u*f||o.some(({x:g,z:m})=>r.some(d=>{let _=ht({x:d.x+g,z:d.z+m}),y=n.get(_),v=g?St:Jt;return t.get(_)!==s&&y?.axes&v&&Ke(n,y,v).width<2})))continue;let x=Math.min(u,f)/2;i.set(s,{id:s,x:(a+c)/2,z:(l+h)/2,radius:x,material:r[0].material,width:Math.min(u,f),cells:r})}return i}function rp(n,t,e){let i=new Set(e.map(ht)),s=yo(n,void 0,!0),r=[...yo(t,void 0,!0).values()].filter(o=>{if(!o.cells.some(c=>i.has(ht(c))))return!1;let a=s.get(o.id);return!a||o.cells.length!==a.cells.length||o.cells.some(c=>n.get(ht(c))?.axes!==c.axes)});return r.length?["roundabout","crossing"].map(o=>{let a=new Map(t);for(let{cells:c}of r)for(let l of c)a.set(ht(l),{...l,junctionStyle:o});return{style:o,roads:a}}):[]}function xb(n,t){for(let e of t.values()){let i=[...n.values()].filter(o=>o.junction===e.id);if(!i.length)continue;let s=Array.from({length:16},(o,a)=>{let c=a/16*Math.PI*2;return{...i[0],id:`roundabout:${e.id}:${a}`,signal:void 0,links:[],x:e.x+Math.cos(c)*e.radius*.68,z:e.z-Math.sin(c)*e.radius*.68}}),r=o=>s.reduce((a,c)=>Math.hypot(o.x-c.x,o.z-c.z)<Math.hypot(o.x-a.x,o.z-a.z)?c:a);for(let[o,a]of s.entries())a.links.push({id:s[(o+1)%s.length].id,crossing:!0});for(let o of n.values()){if(o.junction===e.id){for(let a of o.links){let c=n.get(a.id);if(c.junction===e.id)continue;let l=r(c);l.links.some(h=>h.id===c.id)||l.links.push({id:c.id,crossing:!0})}continue}o.links.some(a=>n.get(a.id)?.junction===e.id)&&(o.links=o.links.filter(a=>n.get(a.id)?.junction!==e.id),o.links.push({id:r(o).id,crossing:!0}),o.roundaboutEntry=!0)}for(let o of i)n.delete(o.id);for(let o of s)n.set(o.id,o)}}function _b(n,t,e,i){for(let s of gi(n).values()){let r=[...t.values()].filter(u=>u.section.cells.every(f=>f.roadCurveId===s.id));if(!r.length&&!s.continuous)continue;let o=new Set(r.map(u=>u.id)),a={...r[0]?.section,id:s.id,width:s.width,material:s.material,junction:!1,cells:s.cells.map(u=>n.get(u))},c=Gi(s.points),l=[];for(let u of[-1,1])for(let[f,p]of kh(a,e).entries()){let x=(u===1?c:[...c].reverse()).map(({x:g,z:m,dx:d,dz:_},y)=>({id:`${s.id}:${u}:${f}:${y}`,section:a,index:f,direction:u,links:[],x:g-_*p*u,z:m+d*p*u}));for(let g=0;g<x.length-1;g++)x[g].links.push({id:x[g+1].id,crossing:!1});l.push(x)}if(!l.length)continue;let h=(u,f)=>l.map(x=>f?x.at(-1):x[0]).reduce((x,g)=>Math.hypot(u.x-g.x,u.z-g.z)<Math.hypot(u.x-x.x,u.z-x.z)?g:x);for(let u of t.values())if(o.has(u.id))for(let f of u.links){if(o.has(f.id))continue;let p=h(t.get(f.id),!0);p.links.some(x=>x.id===f.id)||p.links.push(f)}else u.links.some(f=>o.has(f.id))&&(u.links=u.links.filter(f=>!o.has(f.id)),u.links.push({id:h(u,!1).id,crossing:!1}));if(s.continuous){let u=new Set;for(let x of s.cells){let{x:g,z:m}=n.get(x);for(let[d,_]of[[1,0],[-1,0],[0,1],[0,-1]])u.add(ht({x:g+d,z:m+_}))}let f=[...t.values()].filter(x=>!o.has(x.id)&&!x.section.junction&&x.section.cells.some(g=>u.has(ht(g))&&!g.bridgeId&&!g.approachBridgeId)),p=xr(s);for(let x of l){let g=x[0],m=x.at(-1);for(let[d,_,y]of[[g,g.direction===1?0:1,!1],[m,g.direction===1?1:0,!0]]){let[[v,E],[S,w]]=p[_],R,b=1.85;for(let M of f){let A=Math.hypot(M.x-d.x,M.z-d.z),I=(M.x-v)*S+(M.z-E)*w,z=M.direction*(M.section.axis===St?S:w),P=i?Math.abs(i(M.x,M.z)-i(d.x,d.z)):0;A>=b||I<-.05||P>A*.27+.05||(y?z<.65:z>-.65)||(R=M,b=A)}R&&y&&d.links.push({id:R.id,crossing:!1}),R&&!y&&R.links.push({id:d.id,crossing:!1})}}}for(let u of l){let f=u.at(-1);!f.links.length&&e==="walk"&&f.links.push({id:h(f,!1).id,crossing:!0});for(let p of u)t.set(p.id,p)}for(let u of o)t.delete(u)}}function rc(n,t,e){let i=ms(n),s=vo(n),r=new Map,o=new Map,a=new Map;for(let l of i){let h=[],u=l.cells.map(p=>s.get(ht(p))).find(Boolean),f=kh(l,t);for(let p of[-1,1])for(let[x,g]of f.entries()){let m=l.cells[0].taper,_=(m?(m.startCenter+m.endCenter)/2:(l.lo+l.hi+1)/2)+g*p*(l.axis===St?1:-1),y=`${l.id}:${p}:${x}`,v={...Hh(l.axis,l.t+.5,_),id:y,section:l,direction:p,index:x,junction:u,links:[]};a.set(y,v),h.push(v)}r.set(l.id,h);for(let p of l.cells)o.has(ht(p))||o.set(ht(p),[]),o.get(ht(p)).push(l)}function c(l,h,u=!1){!h||l.links.some(f=>f.id===h.id)||l.links.push({id:h.id,crossing:u})}for(let l of a.values()){let{section:h,direction:u,index:f}=l;for(let p of Bh(n,h,u)){let x=r.get(p.id)?.filter(g=>g.direction===u)??[];if(c(l,x[Math.min(f,x.length-1)]),f===0)for(let g of x.slice(kh(h,t).length))c(l,g)}for(let p of h.cells)if(p.axes===(St|Jt)){for(let x of o.get(ht(p)))if(x.axis!==h.axis)for(let g of r.get(x.id))g.index!==0||!Bh(n,x,g.direction).length||c(l,g,!0)}}return _b(n,a,t,e),(t==="car"||t==="motorcycle")&&xb(a,yo(n,s)),a}var Sn={x:9,z:-13.2,height:4.7},gs=([n,t])=>new k(Sn.x+(n+t)/Math.SQRT2,0,Sn.z+(t-n)/Math.SQRT2),op=(n,t)=>(n-Sn.x-t+Sn.z)/Math.SQRT2,ap=(n,t)=>(n-Sn.x+t-Sn.z)/Math.SQRT2,yb=new k(8,0,-5.85),Wh=new bn([yb,new k(8.01,0,-6.55),new k(8.44,0,-7.26),new k(9.2,0,-7.58),new k(10.24,0,-7.38),...[[-2.31,6.56],[-.82,7.97],[1.03,9.3],[3.34,9.5],[5.21,8.89],[5.89,7.77],[5.38,6.59],[4.12,6.18],[2.41,6.2],[.71,6.09],[-.29,5.57],[-.44,4.84],[-.06,3.56],[.04,2.09],[.09,.66]].map(gs)]),vb=Wh.getLength(),cp=vb,oc=1.94,Mb=.37,bb=Sn.height,Zn=Array.from({length:125},(n,t)=>{let e=t/124,i=Wh.getPointAt(e),s=Wh.getTangentAt(e),r=Math.min(1,(e-.032*Math.sin(Math.PI*2*e))/.997);return{x:i.x,z:i.z,y:Bt.lerp(Mb,bb,r),dx:s.x,dz:s.z}});function mn(n,t,e=Zn){if(n<5||n>23||t<-18||t>-3.9)return null;let i=5,s=0,r=0;for(let o=1;o<e.length;o++){let a=e[o-1],c=e[o],l=c.x-a.x,h=c.z-a.z,u=Bt.clamp(((n-a.x)*l+(t-a.z)*h)/(l*l+h*h),0,1),f=(n-a.x-u*l)**2+(t-a.z-u*h)**2;f>=i||(i=f,s=Bt.lerp(a.y,c.y,u),r=(o-1+u)/(e.length-1))}return i<5?{distance:Math.sqrt(i),height:s,progress:r}:null}var Mo=n=>{let t=n.get("7,-6"),e=n.get("8,-6");return t?.axes&Jt&&e?.axes&Jt?t.material:null};function ac(n,t,e,i=Zn){let s=Mo(t);if(!s)return;let r=[...n.values()].filter(g=>g.section.axis===Jt&&g.section.t===-6&&g.section.width>=2&&g.section.cells.some(m=>ht(m)==="7,-6")&&g.index===0),o=r.find(g=>g.direction===-1),a=r.find(g=>g.direction===1);if(!o||!a)return;let c=e==="walk"?.74:.31,l=g=>i.filter((m,d)=>d%3===0||d===i.length-1).map((m,d)=>({x:m.x-m.dz*c*g,z:m.z+m.dx*c*g,id:`hill:${g}:${d}`,section:{id:`hill:${d}`,width:2,material:s,junction:!1},direction:g,index:0,links:[]})),h=l(1),u=l(-1).reverse(),f=i.at(-1),p={...h.at(-1),id:"hill:turn",links:[],x:f.x+f.dx*.37,z:f.z+f.dz*.37},x=[o,...h,p,...u,a];for(let g=1;g<x.length;g++)n.set(x[g].id,x[g]),x[g-1].links.push({id:x[g].id,crossing:!1})}var wn=Bt.smoothstep;function lp(n,t,e){let i=Bt.lerp,s=(l,h,u)=>wn(l,h-.36,h)*(1-wn(l,u,u+.36));if(n<-7.36||n>-.64||t<-8.85||t>1.42)return e;let r=.41+.66*Bt.clamp((-t-1)/5,0,1),o=i(e,r,s(n,-3,-1)*wn(t,-8.85,-7)*(1-wn(t,1,1.42))),a=1.07+.56*Bt.clamp((-n-3)/4,0,1);o=i(o,a,s(n,-7,-1)*wn(t,-8.85,-7)*(1-wn(t,-5,-4.64)));let c=i(a,1.64,wn(t,-5,-4));return i(o,c,s(n,-7,-5)*wn(t,-6.45,-5.75)*(1-wn(t,-4,-3.64)))}function hp(n,t){return wn(n,-6.85,-5.25)*(1-wn(n,-.9,.45))*wn(t,-10.82,-9.14)*(1-wn(t,-5.12,-4.02))}function Xh(n,t){let e=new bn(n.map(i=>new k(...i)));return Array.from({length:t},(i,s)=>{let r=s/(t-1),o=e.getPointAt(r),a=e.getTangentAt(r),c=Math.hypot(a.x,a.z);return{x:o.x,y:o.y,z:o.z,dx:a.x/c,dz:a.z/c}})}var cc=Xh([[-5.52,.47,-12.53],[-6.25,.48,-12.74],[-7.37,.54,-12.37],[-8.24,.56,-11.72],[-8.94,.47,-10.44],[-9.37,.33,-9.02],[-10.07,.12,-7.65],[-10.55,-.15,-6.58],[-11.15,-.4,-5.75]],54),vr=Xh([[-11.15,-.4,-5.75],[-12.6,-.31,-5.61],[-14,-.25,-5.49],[-15.4,-.31,-5.37],[-16.82,-.4,-5.24]],33),lc=Xh([[-16.82,-.4,-5.24],[-17.39,-.31,-5.16],[-17.91,-.19,-4.86],[-18.34,-.07,-4.52]],15);function Wi(n,t){if(n>-4||n<-20||t<-14.2||t>-3)return null;let e=4,i=0;for(let s of[cc,lc])for(let r=1;r<s.length;r++){let o=s[r-1],a=s[r],c=a.x-o.x,l=a.z-o.z,h=Bt.clamp(((n-o.x)*c+(t-o.z)*l)/(c*c+l*l),0,1),u=(n-o.x-c*h)**2+(t-o.z-l*h)**2;u<e&&(e=u,i=Bt.lerp(o.y,a.y,h))}return e<4?{distance:Math.sqrt(e),height:i}:null}var bo=n=>!!((n.get("-6,-13")?.axes??0)&St);function up(n,t){if(n<-16.9||n>-11.1||t<-6.35||t>-4.65)return null;let i=Bt.clamp((-11.15-n)/(16.82-11.15),0,1)*(vr.length-1),s=vr[Math.floor(i)],r=vr[Math.ceil(i)],o=Bt.lerp(s.z,r.z,i%1);return Math.abs(t-o)>.57?null:Bt.lerp(s.y,r.y,i%1)+.024}function fp(n,t){if(!bo(t))return;let e=[...n.values()].filter(c=>c.section.axis===St&&c.section.cells.some(l=>ht(l)==="-6,-13")),i=e.find(c=>c.direction===-1),s=e.find(c=>c.direction===1);if(!i||!s)return;let r=[...cc.filter((c,l)=>l%3===0),...vr.filter((c,l)=>l%3===0),...lc.filter((c,l)=>l%2===0)],o=c=>r.map((l,h)=>({x:l.x-l.dz*.2*c,z:l.z+l.dx*.2*c,id:`bridge:${c}:${h}`,section:{id:`bridge:${h}`,width:1,material:"dirt",junction:!1},direction:c,index:0,links:[]})),a=[i,...o(1),...o(-1).reverse(),s];for(let c=1;c<a.length;c++)n.set(a[c].id,a[c]),a[c-1].links.push({id:a[c].id,crossing:!1})}var Me=Bt.smoothstep,dp=new gt("#7d9e60"),Eb=new gt("#97a462"),Sb=new gt("#a8ad72"),pp=new gt("#5a7b48"),wb=new gt("#b5a87a"),iw=new gt("#ab9a72"),mp=new gt("#8e7858"),gp=new gt("#9a8868"),Tb=new gt("#a49070"),Ab=new gt("#7a7872"),Rb=new gt("#8a8880"),Cb=new gt("#a8a89c"),Pb=new gt("#5e5e58"),Ib=new gt("#6a8e50"),Lb=new gt("#7e6e50"),Db=new gt("#6e6e66"),Ub=new gt("#667852"),Nb=new gt("#586a50"),zb=new gt("#c8b888"),Ob=new gt("#c4c0b4"),Fb=new gt("#9e9c92");function xp(n,t,e){let{position:i,normal:s,color:r}=n.attributes,o=new gt,a=new gt;for(let c=0;c<i.count;c++){let l=i.getX(c),h=i.getY(c),u=i.getZ(c),f=t(l,u),p=e(l,u),x=s.getX(c),g=Math.max(.01,s.getY(c)),m=s.getZ(c),d=Math.hypot(x,m)/g,_=Math.sin(l*.23+u*.16)*Math.cos(u*.31-l*.11),y=Math.sin(l*.41+u*.29)*Math.sin(u*.19-l*.37),v=Math.cos(l*.34+u*.22),E=Math.sin(h*7.3+.8*Math.sin(l*.36+u*.21)),S=Math.sin(h*14.5+l*1.2+u*.9);o.copy(Eb).lerp(Sb,.3+.12*_);let w=Me(_,-.3,.5)*(1-Me(d,.12,.4));o.lerp(dp,w*.5),o.lerp(wb,(.12+.08*y)*(1-Me(d,.15,.45)));let R=Me(d,.15,.45)*(1-Me(d,.45,.7));a.copy(Tb).lerp(gp,.35+.15*_),o.lerp(a,R*.55);let b=Me(d,.45,.8);a.copy(mp).lerp(gp,.3+.15*y),o.lerp(a,b*.75);let M=Me(d,.8,1.2);if(M>.01){let P=h*4.2+_*.6,D=1-Me(P%3,0,.5),N=Me(P%3,.3,.8)*(1-Me(P%3,1.2,1.8)),H=Me(P%3,1.5,2.4);a.copy(Ib).lerp(pp,.15+.1*y),o.lerp(a,M*D*.65),a.copy(Lb).lerp(mp,.2+.12*E),o.lerp(a,M*N*.7),a.copy(Db).lerp(Rb,.25+.2*Me(E,-.3,.6)+.06*S),o.lerp(a,M*H*.85);let G=Me(d,1.4,2.2)*(1-Me(E,-.1,.5));o.lerp(Pb,G*.4)}let A=Me(d,1.2,2);a.copy(Ab).lerp(Cb,.25+.25*Me(E,-.2,.7)+.05*S),o.lerp(a,A*.9),o.lerp(Fb,Me(h,5,9)*.4),o.lerp(Ob,Me(h,8.5,12)*.5);let I=1-Me(f,.8,5.5);o.lerp(pp,I*.3*(1-Me(d,.3,.8)));let z=(1-Me(f,.4,2.8))*(1-Me(d,.25,.6));o.lerp(dp,z*.35),o.multiplyScalar(1+.045*_+.02*v),o.lerp(Ub,(1-Me(f,.02,.65))*.86),o.lerp(zb,1-Me(p,1.05,4)),o.lerp(Nb,Math.max(1-Me(f,-.37,.02),1-Me(p,-.72,.1))),r.setXYZ(c,o.r,o.g,o.b)}}function qh(n){let t=new zt,e=new k(1,0,0);for(let[i,{x:s,y:r,z:o}]of n.entries()){if(En(t,.144,.64,.144,i%2?"#8d6a46":"#98734e",s,r-.075,o,.018),En(t,.161,.108,.161,"#795c41",s,r-.01,o,.012),En(t,.175,.062,.175,"#b4986c",s,r+.553,o,.017),!i)continue;let a=n[i-1],c=new k(s-a.x,r-a.y,o-a.z),l=c.length();if(!(l<.001)){c.divideScalar(l);for(let[h,u]of[[.218,"#98764d"],[.444,"#b38d5b"]])En(t,l,.085,.075,u,(a.x+s)/2,(a.y+r)/2+h-.0425,(a.z+o)/2,.013).quaternion.setFromUnitVectors(e,c)}}return fe(t)}var xs=new k(0,1,0),Yh=new Map,Bb=Vb(),vp="#755b42",_p={broadleaf:{palette:["#507741","#70984e","#9dbc66"],trunk:[.08,1.32,-.03],forks:[[-.51,1.23,.02],[.44,1.55,.16],[-.07,1.73,-.21]],crowns:[[-.55,1.42,.03,.39,.36,.35,25],[.46,1.6,.17,.39,.39,.36,27],[-.06,1.86,-.23,.45,.34,.4,36],[.27,1.3,-.37,.31,.28,.31,16]]},oak:{palette:["#45693d","#648b4b","#90ad60"],trunk:[.08,1.35,.01],forks:[[-.49,1.4,-.07],[.47,1.41,.24]],crowns:[[.02,1.56,.01,.82,.57,.66,115],[-.48,1.42,.24,.38,.31,.34,30],[.51,1.52,-.26,.33,.33,.34,29]]},umbrella:{palette:["#426f4a","#649653","#9dbd6a"],trunk:[.1,1.57,-.04],forks:[[-.71,1.59,.1],[.68,1.58,-.1],[-.14,1.52,.52]],crowns:[[0,1.74,-.03,.92,.3,.68,90],[.05,1.62,.47,.57,.2,.28,30]]},birch:{palette:["#5d8243","#82a351","#acc675"],pale:!0,trunk:[-.13,1.91,-.11],forks:[[-.44,1.47,.08],[.38,1.35,.19]],crowns:[[-.23,1.88,-.13,.35,.52,.35,54],[-.51,1.5,.08,.33,.31,.29,34],[.42,1.43,.2,.32,.33,.32,36]]},poplar:{palette:["#648543","#89a957","#b4c876"],trunk:[.07,1.64,0],forks:[[-.32,1.44,.12],[.31,1.66,-.12]],crowns:[[-.31,1.45,.11,.28,.4,.27,36],[.3,1.68,-.11,.32,.44,.31,38],[.03,1.98,0,.29,.4,.29,30]]},amber:{palette:["#a9562d","#cd7b3a","#edac57"],trunk:[.03,1.26,0],crowns:[[.02,1.48,0,.5,.83,.47,116]]},golden:{palette:["#94743c","#c2a34d","#efd47c"],trunk:[-.04,1,.01],forks:[[-.31,.99,-.13],[.37,1.13,.13]],crowns:[[.06,1.23,-.02,.61,.43,.54,77],[-.29,1.12,.28,.33,.32,.29,25]]},shrub:{palette:["#55763d","#76994d","#a7bd64"],crowns:[[.02,.22,.01,.55,.26,.43,58]]},bush:{palette:["#426c48","#659451","#9cbb6b"],crowns:[[-.23,.26,-.05,.33,.32,.31,39],[.21,.33,.03,.37,.39,.33,50]]}},yp={pine:{height:2.08,spread:.72,layers:5,count:9,lift:-.16,palette:["#2c5242","#3e6e50","#6b935b"]},spruce:{height:2.31,spread:.48,layers:8,count:7,lift:-.23,palette:["#294e49","#44766b","#74a28a"]},cypress:{height:1.94,spread:.31,layers:8,count:8,lift:.4,palette:["#3b593b","#587746","#89a063"]}};function uc(n,t,e=0){let i=new zt,s=an(37+Math.round(Math.abs(e)*67));return Object.hasOwn(_p,n)?kb(i,_p[n],s):Object.hasOwn(yp,n)?Hb(i,yp[n],s):Gb(i,n),i.name=n,i.scale.setScalar(t),i.rotation.y=e,i}function kb(n,{palette:t,trunk:e,forks:i,pale:s,crowns:r},o){let a=s?"#b1a58b":vp;if(e){hc(n,[0,0,0],[0,.56,0],s?.057:.106,.065,a),hc(n,[0,.54,0],e,.066,.029,a);for(let l of i??[])hc(n,[0,.67,0],l,.042,.014,a);if(s)for(let l of[.22,.43,.65,.87,1.08]){let h=de(n,.064-l*.014,.067-l*.014,.025,"#77694f",-.046*l,l,-.058*l,7);h.rotation.z=.18}}let c=[[],[]];for(let[l,h,u,f,p,x,g]of r){let m=new Nt(Bb.clone(),le(t[0]));m.name="canopy",m.position.set(l,h,u),m.scale.set(f,p,x),m.castShadow=m.receiveShadow=!0,n.add(m);for(let d=0;d<g;d++){let _=(d+.5)/g*1.68-.7,y=d*2.39996+o()*.28,v=Math.sqrt(1-_*_),E=Math.cos(y)*v,S=Math.sin(y)*v,w=Mp(E,_,S),R=new k(E/f,_/p,S/x).normalize(),b=new k(l+E*f*w,h+_*p*w,u+S*x*w),M=new k().crossVectors(R,xs).normalize();M.applyAxisAngle(R,o()*Math.PI*2);let A=(.075+o()*.06)*Math.min(1,Math.max(.68,f+.35));b.addScaledVector(M,-A*.35).addScaledVector(R,.012);let I=b.clone().addScaledVector(M,A).addScaledVector(R,.016);Mr(c[_>.15&&o()>.31?1:0],b,I,A*.38,.018,R)}}br(n,c[0],t[1]),br(n,c[1],t[2])}function Hb(n,{height:t,spread:e,layers:i,count:s,lift:r,palette:o},a){de(n,.026,e*.12,t*.97,vp,0,0,0,7);let c=de(n,.006,e*.47,t*.82,o[0],0,t*.17,0,8);c.name="canopy";let l=[[],[]];for(let h=0;h<i;h++){let u=h/i,f=t*(.24+.64*u),p=e*(r>0?Math.sin(Math.PI*(.28+u*.65)):1-u*.86);for(let x=0;x<s;x++){let g=(x/s+h*.33)*Math.PI*2+a()*.23,m=new k(Math.cos(g),0,Math.sin(g)),d=new k(-m.z,0,m.x),_=new k(0,f,0),y=_.clone().addScaledVector(m,p*(.76+a()*.24));y.y+=r*p,Mr(l[0],_,y,p*.32,p*.18,xs);for(let v of[-1,1])for(let E of[.33,.62]){let S=_.clone().lerp(y,E);S.y+=p*.058;let w=S.clone().addScaledVector(m,p*.34).addScaledVector(d,p*.2*v);w.y+=p*(r>0?.55:-.2),Mr(l[E>.5?1:0],S,w,p*.12,p*.045,xs)}}}br(n,l[0],o[1]),br(n,l[1],o[2])}function Gb(n,t){let e=t==="palm",i=t==="fern";if(!e&&!i&&t!=="rosette")throw new Error(`Unknown plant kind: ${t}`);let s=new k(.04,e?.74:.055,0);e&&hc(n,[0,0,0],s.toArray(),.068,.042,"#89714e");let r=[[],[]],o=e||i?8:11;for(let a=0;a<o;a++){let c=a*2.39996,l=a%2===0,h=(e?.68:i?.6:.37)*(l?1:.76),u=new k(Math.cos(c),0,Math.sin(c)),f=s.clone().addScaledVector(u,h);if(f.y+=e?-.095:l?.2:.28,i){let p=new k(-u.z,0,u.x);Mr(r[0],s,f,.013,.045,xs);for(let x=1;x<=5;x++){let g=x/6,m=s.clone().lerp(f,g);m.y+=.1*Math.sin(g*Math.PI);for(let d of[-1,1]){let _=m.clone().addScaledVector(u,.13).addScaledVector(p,(.17-g*.11)*d);_.y-=.045,Mr(r[x%2],m,_,.033,.019,xs)}}}else Mr(r[a%2],s,f,h*(e?.18:.27),e?.18:.09,xs)}br(n,r[0],e?"#47774c":i?"#54894e":"#527e4d"),br(n,r[1],e?"#77a458":i?"#96b966":"#8daa60")}function hc(n,t,e,i,s,r){let o=new k(...t),a=new k(...e),c=a.clone().sub(o),l=de(n,s,i,c.length(),r,0,0,0,7);l.position.copy(o).lerp(a,.5),l.quaternion.setFromUnitVectors(xs,c.normalize())}function Mr(n,t,e,i,s,r){let o=new k().crossVectors(e.clone().sub(t),r).normalize(),a=t.clone().lerp(e,.43),c=a.clone().addScaledVector(o,i),l=a.clone().addScaledVector(o,-i),h=a.addScaledVector(r,s);for(let u of[t,c,h,c,e,h,t,h,l,h,e,l])n.push(u.x,u.y,u.z)}function br(n,t,e){if(!t.length)return;Yh.has(e)||Yh.set(e,new _e({color:e,side:Ie,roughness:.94}));let i=new ae;i.setAttribute("position",new qt(t,3)),i.computeVertexNormals();let s=new Nt(i,Yh.get(e));s.castShadow=s.receiveShadow=!0,n.add(s)}function Mp(n,t,e){return 1+.11*Math.sin(6*n+1.4*e)*Math.cos(5*t-e)+.07*Math.sin(7*e+4*t)}function Vb(){let n=new ti(1,6);n.deleteAttribute("normal"),n.deleteAttribute("uv");let t=tp(n);n.dispose();let e=t.attributes.position;for(let i=0;i<e.count;i++){let s=e.getX(i),r=e.getY(i),o=e.getZ(i),a=Mp(s,r,o);e.setXYZ(i,s*a,r*a,o*a)}return t.computeVertexNormals(),t}var Wb=new ti(1,0),bp=["#b5a88b","#9e9d86","#c8b99e","#858f80"].map(n=>le(n)),Xb=new _e({vertexColors:!0,flatShading:!0,roughness:.97});function Ep(n,t){let e=new Nt(Wb.clone(),bp[Math.floor(t()*bp.length)]);return e.scale.set(n*(1+t()*.45),n*(.46+t()*.34),n*(.74+t()*.28)),e.rotation.y=t()*Math.PI*2,e}function Sp(n,t,e,i){let s=an(i),r=Array.from({length:7},(f,p)=>{let x=p/7*Math.PI*2+(s()-.5)*.24;return[Math.cos(x)*(.79+s()*.31),Math.sin(x)*(.79+s()*.31)]}),o=[[-.6,1.04,"#88856d"],[.19,1.03,"#a19b82"],[.32,.94,"#9c937b"],[.7,.85,"#b1a389"],[1,.61,"#c2b296"]],a=[],c=[],l=[];for(let[f,p,x]of o){let g=new gt(x);for(let[m,d]of r){a.push(m*n*p+f*.2,(f+(m-d)*.09)*e,d*t*p+f*.13);let _=.88+s()*.19;c.push(g.r*_,g.g*_,g.b*_)}}let h=(o.length-1)*r.length;for(let f=1;f<o.length;f++)for(let p=0;p<r.length;p++){let x=(p+1)%r.length,g=(f-1)*r.length,m=f*r.length;l.push(g+p,m+p,g+x,g+x,m+p,m+x)}for(let f=1;f<r.length-1;f++)l.push(h,h+f+1,h+f);let u=new Nt(Hi(a,c,l),Xb);return u.castShadow=u.receiveShadow=!0,u}var Tp=new dn(.018,.027,1,5),qb=new dn(.041,.034,.14,6),Yb=new pi(.077,.48,3),$b=new ti(1,0),Zb=new pi(.09,.28,3),Ap=le("#788c57"),Jb=le("#8f9e5d"),Kb=le("#a27a52"),jb=["#efe3b7","#dbb87c","#cfa5ac","#acacc7"].map(n=>le(n)),wp=["#839d58","#9caa63","#729054","#a3ac6b"].map(n=>le(n));function Rp(n,t,e,i,s){let r=.43+s()*.31,o=new Nt(Tp.clone(),Jb);o.scale.y=r,o.position.set(n,t+r/2,e);let a=[o];if(i){let l=new Nt(qb.clone(),Kb);l.position.set(n,t+r+.026,e),a.push(l)}let c=new Nt(Yb.clone(),Ap);return c.position.set(n+.08,t+.2,e),c.rotation.set((s()-.5)*.66,s()*6,.34),a.push(c),a}function Cp(n,t,e,i,s){let r=.15+s()*.12,o=new Nt(Tp.clone(),Ap);o.scale.set(.46,r,.46),o.position.set(n,t+r/2,e);let a=new Nt($b.clone(),jb[i]),c=.05+s()*.043;return a.position.set(n,t+r,e),a.scale.set(c,c*.5,c),[o,a]}function Pp(n,t,e,i,s){let r=new Nt(Zb.clone(),wp[Math.floor(i*wp.length)]),o=.55+s()*.61;return r.position.set(n,t+.088*o,e),r.scale.set(.55,o,.6),r.rotation.set((s()-.5)*.47,s()*6,(s()-.5)*.43),r}var Qb=new k(0,1,0),tE=le("#887357");function Ip(n,t,e,i,s){let r=new Nt(new dn(.097,.124,s,8),tE);return r.position.set(n,t+.095,e),r.quaternion.setFromUnitVectors(Qb,new k(Math.sin(i),.025,Math.cos(i)).normalize()),r.castShadow=r.receiveShadow=!0,r}var eE=[[-4.1,-1.4],[-4.18,-.45],[-4.09,.54],[-3.68,1.46],[-3.25,2.15],[-2.67,2.8],[-1.92,3.12]].map(([n,t])=>{let e=gs([n,t]),i=gs([n*1.25,t*1.25]);return{x:e.x,z:e.z,downX:i.x,downZ:i.z}}),nE=[76,80,84,88,92].map(n=>{let{x:t,z:e,dx:i,dz:s}=Zn[n];return{x:t+s*1.2,z:e-i*1.2,downX:t+s*2.05,downZ:e-i*2.05}});function Lp(n,t,e){return(mn(n,t)?.distance??1/0)>oc/2+.12&&!e.some(i=>Math.hypot(i.x-n,i.z-t)<i.radius+.16)}function Dp(n,t){let e=[];for(let i of[eE,nE]){let s=[];for(let{x:r,z:o,downX:a,downZ:c}of i){let l=n(r,o),h=s.at(-1),u=Lp(r,o,t),f=l-n(a,c);(!(!h||Math.abs(h.y-l)<=.65&&Lp((h.x+r)/2,(h.z+o)/2,t))||f<.62||!u)&&s.length&&(s.length>=3&&e.push(s),s=[]),u&&f>=.62&&s.push({x:r,y:l,z:o})}s.length>=3&&e.push(s)}return e}var Up=10;function Np(n,t,e){let i=new zt,s=new Map,r=new Map,o=new Set;for(let[u,f]of n.children.entries()){let{x:p,z:x}=f.position,g=`${Math.floor(p/Up)},${Math.floor(x/Up)}`;s.has(g)||s.set(g,{items:[],mesh:null});let m=s.get(g),d={id:u,item:f,x:p,z:x,chunk:m},_=e.get(f);_&&(_.sceneryId=u),m.items.push(d),r.set(u,d)}function a(u){u.mesh&&(i.remove(u.mesh),u.mesh.traverse(p=>p.geometry?.dispose()));let f=new zt;for(let{id:p,item:x}of u.items){if(o.has(p))continue;let g=x.clone();g.traverse(m=>{m.geometry&&(m.geometry=m.geometry.clone(),m.geometry.hasAttribute("color")&&(m.userData.dynamic=!0))}),f.add(g)}u.mesh=fe(f),i.add(u.mesh)}for(let u of s.values())a(u);function c(u,f){let p=new Set;for(let x of u)!r.has(x)||o.has(x)===f||(f?o.add(x):o.delete(x),p.add(r.get(x).chunk));for(let x of p)a(x)}function l(u,f,p=[]){let x=new Set(u.map(ht)),g=new Set(p.map(ht)),m=new Map(f.map(({index:d,newY:_})=>[d,_]));return[...r.values()].filter(({id:d,x:_,z:y})=>{if(o.has(d))return!1;let v=ht({x:Math.floor(_),z:Math.floor(y)});return x.has(v)||g.has(v)&&Math.abs(t(_,y,m)-t(_,y))>.025}).map(d=>d.id)}function h(u){return u.map(f=>r.get(f)).filter(Boolean)}return{group:i,apply:c,removals:l,points:h,hidden:o}}var fc=Bt.smoothstep,$h=Bt.lerp,Zh=[[15.2,-13.3,1.57,1.21,1.15,.48,93],[16.3,-11.65,1.41,1.06,1.32,-.62,36],[15.7,-10.5,.83,.81,.61,.38,59]];function iE(n,t,e,i,s,{riverX:r,riverWidth:o,waterfall:a}){let c=new zt,l=a.start,h=r(l),u=o(l),f=[[h-u-.75,l+.16,1.24,.96,1.25,.48,61],[h+u+.7,l+.22,1.25,.97,1.18,-.38,64],[h-u-1.03,l-.93,1.05,.76,.78,-.16,62],[h+u+.72,l-1.14,1.02,.83,.72,.62,63],[h-u-1.1,a.end+.32,1.65,1.17,2.4,.36,66],[h+u+1.13,a.end+.78,1.25,1.34,2.1,-.24,67],[-18.1,-8,1.63,1.05,1.18,.24,35],[-17.4,-6.78,1.11,.87,.64,.57,71],[-20.12,-4.32,1.89,1.1,1.45,-.23,13],...e?Zh.map((p,x)=>[[20.94,-12.18],[21.72,-11.15],[17.84,-14.72]][x].concat(p.slice(2))):Zh,[13.62,5.72,1.62,.93,.8,.47,53],[14.93,5.93,1.4,1.03,1.17,-.41,84]];for(let[p,x,g,m,d,_,y]of f){let v=Math.min(g,m)*.86;if(i(p,x,v))continue;n.push({x:p,z:x,radius:v});let E=Sp(g,m,d,y);E.position.set(p,t(p,x),x),E.rotation.y=_,c.add(E),s?.set(E,n.at(-1))}return c}function sE(n,t,e,{riverX:i,riverWidth:s}){for(let[r,o]of[[-15.2,-1],[-12.9,1],[-9.82,-1],[-7.43,1],[-5.57,1],[-3.14,-1],[1.41,1],[4.87,-1],[7.46,1],[10.91,-1],[15.5,1]]){let a=i(r)+o*(s(r)+.47);for(let c=0;c<7;c++){let l=a+(t()-.5)*.52,h=r+(t()-.5)*.86;n.add(...Rp(l,e(l,h),h,c%2===0,t))}}for(let[r,o,a]of[[-10.1,-7.2,3],[-10.6,-4.2,0],[-7.98,5.9,1],[-6.96,9.4,2],[-16.28,2.8,0],[-17.6,-1.53,1],[9.25,-7.85,1],[11.23,4.54,0],[10.14,10.9,2],[-2.9,-13.3,3],[-7.2,14.88,0]])for(let c=0;c<13;c++){let l=r+(t()-.5)*1.24,h=o+(t()-.5)*1.01;n.add(...Cp(l,e(l,h),h,c%5?a:0,t))}}function rE(n,t,e,i,s,r){let{coastZ:o,inland:a,rapid:c,riverX:l,riverWidth:h,riverOffset:u}=r,f=new zt,p=an(321),x=[],g=(y,v,E)=>e&&((mn(y,v)?.distance??1/0)<.99+E||(Wi(y,v)?.distance??1/0)<.51+E);function m(y,v,E,S){if(a(v,E)<2.1)return;let w=p()*Math.PI*2;if(g(v,E,.14+S*.17)||Zh.some(([b,M,A])=>Math.hypot(v-b,E-M)<A)||(x.push([v,E]),i(v,E,.19*S)))return;let R=uc(y,S,w);if(R.position.set(v,t(v,E)-.015,E),f.add(R),S>=.68&&y!=="bush"&&y!=="fern"){let b={x:v,z:E,radius:.19*S};n.push(b),s?.set(R,b)}}function d(y,v,E){if(a(y,v)<-.35)return;let S=Ep(E,p);if(S.position.set(y,t(y,v)+E*.075,v),g(y,v,E*.78)||i(y,v,E*.75)){S.geometry.dispose();return}if(f.add(S),E>=.47){let w={x:y,z:v,radius:E*.75};n.push(w),s?.set(S,w)}}let _=[[-19.5,-17.6,6.8,4.6,11,["pine","spruce","golden"]],[-17,-4.6,3.7,4.1,8,["oak","birch","broadleaf"]],[-19.4,7.9,4.8,4.2,9,["spruce","umbrella","pine"]],[5.2,-17.2,6.5,3.6,9,["pine","spruce","golden"]],[17.8,-12.8,5.9,4.6,13,["pine","spruce","broadleaf"]],[19,2.6,4.6,5.1,10,["oak","pine","amber","birch"]],[10.8,15,6.9,4.6,10,["umbrella","golden","oak","spruce"]],[-5.8,17.4,4.8,3.4,7,["oak","amber","birch"]]];for(let[y,v,E,S,w,R]of _)for(let b=0,M=0;b<w*4&&M<w;b++){let A=p()*Math.PI*2,I=Math.sqrt(p()),z=y+Math.cos(A)*E*I,P=v+Math.sin(A)*S*I;u(z,P)<1.03||a(z,P)<2.1||x.some(([D,N])=>Math.hypot(D-z,N-P)<1.19)||(m(R[Math.floor(p()*R.length)],z,P,.74+p()*.67),M++)}for(let[y,v,E,S]of[["broadleaf",-7.7,-7,.98],["birch",-9.7,1.4,.84],["amber",-7.15,10.75,.93],["umbrella",10.4,4.6,1.03],["broadleaf",8,-10.5,.79],["golden",-4.8,-13.3,.92]])m(y,v,E,S);for(let y=0;y<138;y++){let v=-24+p()*49,E=y%2?1:-1,S=y<93,w=l(v)+E*(h(v)+(S?-.21+p()*1.15:2.1+p()*9));(S||p()<.35)&&d(w,v,.1+p()**2*(S?.53:.82)),y%9===0&&u(w,v)>.38&&m(y%18?"fern":"bush",w,v,.39+p()*.41)}for(let[y,v,E]of[[-17.6,-9.65,1.22],[-17.08,-9.14,.65],[-8.48,6.58,.76],[12.65,-15.1,1.13],[14.61,-15.78,.72],[15.7,-12.9,.86],[14.9,11.24,.86]])d(y,v,E);for(let[y,v,E]of[[c-.4,-1.02,.64],[c-.08,1.13,.56],[c+.45,-.97,.7],[c+.72,.76,.57],[c+.97,-1.15,.4],[c+1.45,1.16,.46]])d(l(y)+v,y,E);for(let[y,v,E]of[[-16.7,1.4,.64],[-15.85,.96,.33],[-11.9,1.21,.43],[-10.65,.71,.33],[-5.2,1.12,.34],[-4.77,1.69,.23],[-2.9,1.61,.56],[4.96,1.81,.56],[5.48,1.03,.31],[11.83,1.74,.77],[12.6,.99,.48]])d(y,o(y)-v,E);sE(f,p,t,r);for(let y=0;y<140;y++){let v=-21+p()*43,E=y<84?l(v)+(y%2?1:-1)*(h(v)+.53+p()*2.6):-8.2+p()*26;if(u(E,v)<.27||a(E,v)<2.6)continue;let S=p();for(let w=0;w<3;w++){let R=E+(p()-.5)*.45,b=v+(p()-.5)*.45,M=Pp(R,t(R,b),b,S,p);g(R,b,0)?M.geometry.dispose():f.add(M)}}for(let[y,v,E,S]of[[-7.8,6.8,.67,1.29],[-16.6,-3.6,1.92,1.11],[13.6,8.2,.76,1.24]])a(y,v)<1.3||f.add(Ip(y,t(y,v),v,E,S));for(let[y,v,E,S]of[["pine",-32.3,10.5,1.1],["spruce",-34.1,9.1,.9],["golden",-30.8,12.4,.96],["bush",-30.2,10.6,.69],["birch",-24.3,-14.1,.9],["fern",-23.2,-13.6,.67],["oak",-21.7,-22.7,1.1],["pine",-23.7,-22,.88],["bush",-20.9,-21.6,.61],["spruce",-4.8,-34,.92],["pine",-5.6,-35.9,1.05],["amber",3.9,-36,.89],["bush",4.2,-34.9,.64]])m(y,v,E,S);for(let[y,v,E]of[[-31.9,11.3,.83],[-31.2,11,.46],[-32.4,12,.32],[-22.3,-22.1,.75],[-21.6,-21.8,.44],[-23.8,-13.4,.57],[-3.8,-33.9,.84],[-4.5,-33.2,.56],[3.7,-34.6,.66]])d(y,v,E);return s?f:fe(f)}function oE(n){let t=new bn([[1.35,9.25],[1.72,7.9],[1.4,6.6],[.56,5.4],[.12,4.32],[.05,3.52],[.18,2.35]].map(gs)),e=[],i=[],s=[],r=[-1,-.74,0,.74,1],o=new gt("#bba271"),a=57;for(let l=0;l<=a;l++){let h=l/a,{x:u,z:f}=t.getPointAt(h),p=t.getTangentAt(h),x=(.48+.052*Math.sin(l*.49))*$h(.46,1,fc(h,0,.17)*(1-fc(h,.86,1))),g=fc(h,0,.15)*(1-fc(h,.88,1));for(let[m,d]of r.entries()){let _=u+p.z*x*d,y=f-p.x*x*d;e.push(_,n(_,y)+.032,y);let v=.98+.05*Math.sin(l*.39+d);if(i.push(o.r*v,o.g*v,o.b*v,(1-Math.abs(d)**3)*g),l&&m){let E=(l-1)*r.length+m-1,S=E+r.length;s.push(E,S,E+1,E+1,S,S+1)}}}let c=new Nt(Hi(e,i,s,4),new _e({vertexColors:!0,roughness:.99,transparent:!0,depthWrite:!1,side:Ie}));return c.receiveShadow=!0,c}function aE(n,t,e){let i=new zt,s=new zt;if(s.name="H\xE0ng r\xE0o an to\xE0n",t)for(let r of Dp(n,e)){s.add(qh(r));for(let[o,a]of r.entries()){if(e.push({x:a.x,z:a.z,radius:.12,kind:"fence"}),!o)continue;let c=r[o-1];for(let l of[.25,.5,.75])e.push({x:$h(c.x,a.x,l),z:$h(c.z,a.z,l),radius:.12,kind:"fence"})}}else{i.add(oE(n));let r=[[[-3.75,-1.45],[-3.88,-.12],[-3.54,1.42],[-2.72,2.53],[-1.66,3.25],[-.63,3.52]],[[.73,3.5],[1.97,3.2],[3.16,2.68]]];for(let o of r)s.add(qh(o.map(gs).map(({x:a,z:c})=>({x:a,y:n(a,c),z:c}))))}return i.add(s),i}function zp(n,{surfaceY:t,blockers:e,plannedHill:i,clearGround:s,editableScenery:r,showHillDetails:o,layout:a}){let c=r?new WeakMap:void 0,l=iE(e,t,i,s,c,a),h=rE(e,t,i,s,c,a);if(r)for(let f of[...l.children])f.position.z>=-25&&h.add(f);let u=r?Np(h,t,c):null;return n.add(l,u?.group??h),o&&n.add(aE(t,i,e)),u}var cE=[[-36.5,-11.8,4.2,9.1,13.4],[-36.7,8.2,3.6,10.5,10],[8.5,-24,4.6,10.4,7],[18.6,-19.8,6.2,8.1,8.2],[26,-10,4.4,9.2,10.3],[23.6,10.9,3.6,7.6,9.1],[4.4,22,2.6,12.8,7.3],[-18.6,22,2.4,8,9.1]],lE=[[-40,10,7.7,10.4,11.2],[-38.2,3.3,7.9,10.1,10],[-38,-4.8,7.1,9.8,10.2],[-34.4,-13.1,6.5,9.7,10.2],[-30.2,-21,5.6,9.3,9.4],[-24,-27.9,5.3,9,8.7],[-17.2,-33.1,4.4,8.8,7.5]],jt=Bt.smoothstep,be=Bt.lerp,On=-8.25,ei=-43,Ae={start:-36.45,end:-35.28,drop:6.4},Eo=-1.54,Kh=n=>17.8-.72*n+1.7*Math.sin(n*.14+.65)-3.1*Math.exp(-(((n+6.1)/6.2)**2))+1.7*Math.exp(-(((n-9)/8)**2)),ys=(n,t)=>Kh(n)-t,hE=n=>-12.4+1.9*Math.sin(.205*n+.74)+1.1*Math.sin(.094*n-.4)+7.3*jt(n,9,24)+10.3*(1-jt(n,-19.1,-10.9)),Fn=n=>be(-.3+.59*(n-Ae.start),hE(n),jt(n,-36.5,-20)),Xi=n=>(1.25+.2*Math.sin(.23*n-.4)+.12*Math.sin(.57*n)+.49*Math.exp(-(((n-On-3)/2.8)**2))+.68*jt(n,15,20)+.94*Math.exp(-(((n-Ae.start+3.25)/2.55)**2))+.47*Math.exp(-(((n-Ae.end-.9)/1.65)**2)))*be(.25,1,jt(n,ei,ei+1.5)),vi=n=>be(-.51-.006*n-.65*jt(n,On-.65,On+.72)-.13*jt(n,8.5,10.4)+Ae.drop*(1-jt(n,Ae.start,Ae.end)),Eo+.012,jt(n,14,21)),So=(n,t)=>Math.max(Math.abs(n-Fn(t))-Xi(t),ei-t),Er=(n,t)=>Math.min(So(n,t),ys(n,t)),Jh=[...Array.from({length:249},(n,t)=>(t-124)*.5),On-.93,On-.59,On-.23,On+.28,On+.61,On+.93,...Array.from({length:13},(n,t)=>be(Ae.start-.2,Ae.end+.2,t/12))].sort((n,t)=>n-t),_s=Jh.filter(n=>n>=ei&&n<=25.5);function Jn(n,t){if(ys(n,t)<=0)return{kind:"sea",y:Eo-.012};if(t<_s[0]||t>_s.at(-1))return null;let e=0,i=_s.length-1;for(;i-e>1;){let l=e+i>>1;_s[l]<=t?e=l:i=l}let s=_s[e],r=_s[i],o=(t-s)/(r-s),a=be(Fn(s),Fn(r),o);return Math.abs(n-a)>be(Xi(s),Xi(r),o)?null:{kind:t>=Ae.start-.16&&t<=Ae.end+.33?"falls":"river",y:be(vi(s),vi(r),o)}}var Fp=(n,t)=>jt(n,-9.65,-7.2)*(1-jt(n,-4.6,-1.15))*jt(t,-15.1,-6.8)*(1-jt(t,6.8,11.7)),Bp=(n,t)=>Math.hypot((n-Sn.x)/6.9,(t-Sn.z)/6.1),kp=(n,t)=>jt(-op(n,t),.83,1.85)*jt(ap(n,t),-1.3,.35),Hp=(n,t,e)=>{let i=Bp(n,t),s=1-jt(i,.62,1.25);return e?be(s,1-jt(i,.65,.735),kp(n,t)):s};function Gp(n,t){let e=0;for(let[i,s,r,o,a]of lE){let c=(n-i)/o,l=(t-s)/a,h=Math.atan2(l,c),u=1+.13*Math.cos(h*5+.43)+.09*Math.sin(h*3-.27),f=Math.hypot(c,l)/u;e=Math.max(e,r*Math.max(0,1-f)**1.37)}return e}function Op(n,t,e){let i=.11+.12*Math.sin(n*.24+t*.18)+.1*Math.cos(t*.32-n*.18);for(let[l,h,u,f,p]of cE){let x=((n-l)/f)**2+((t-h)/p)**2;i+=u*Math.exp(-x)}let s=Fn(t)-n-Xi(t),r=jt(s,2.45,3.75)*(1-jt(s,5.35,7.45))*jt(t,-9.1,-5.4)*(1-jt(t,7.4,11.5));i=be(i,1.47+.08*Math.cos(t*.24),r*.89);let o=(Ae.drop+2.1)*Math.exp(-(((n-Fn(t))/7.5)**2))*jt(t,ei-7.2,ei)*(1-jt(t,Ae.start-.18,Ae.end+3.1));i+=o+1.65*Fp(n,t)+Gp(n,t)+.13*Math.sin(n*.43+t*.37)*jt(i,.45,2.6);let a=1-jt(Math.hypot((n+17.8)/9.2,(t+17.9)/7.2),.58,1.18);if(i=be(i,2.05+.21*Math.sin(t*.24),a),e&&(i=be(i,.83,hp(n,t))),i=be(i,Sn.height,Hp(n,t,e)),!e)return i;let c=mn(n,t);return c?be(i,c.height-.055,1-jt(c.distance,1.36,1.95)):i}function dc(n,t,e=!1){let i=So(n,t),s=ys(n,t);if(s<0)return Eo-.1-1.36*jt(-s,0,7.8);let r=Eo-.1+s*.27;if(i<0)return Math.min(vi(t)-.04-.66*jt(-i,0,1.2),be(r,Op(n,t,e),jt(s,.55,5.2)));let o=be(vi(t)-.04,Op(n,t,e),jt(i,0,3.35)),a=be(r,o,jt(s,.55,5.2));if(!e||i<.26)return a;let c=Wi(n,t),l=lp(n,t,a);return c?be(l,c.height-.04,1-jt(c.distance,.73,1.18)):l}function uE(n,t,e){let i=[0,.4,.73,.94,1,1.16,1.37,1.62,1.95,2.35,2.83,3.36,3.95];for(let E=4.65;E<80;E+=.7)i.push(E),t&&E>10&&E<36&&i.push(E+.35);let s=[...i.slice(1).reverse().map(E=>-E),...i],r=[],o=[],a=[],c=new gt("#a4ad68"),l=new gt("#c0b878"),h=new gt("#6d9455"),u=new gt("#708e5c"),f=new gt("#c0a878"),p=new gt("#6b8e6a"),x=new gt("#d0be90"),g=new gt("#908880"),m=new gt("#b8ac98"),d=new gt,_=t?[...Jh,...Array.from({length:25},(E,S)=>-15.25+S*.5)].sort((E,S)=>E-S):Jh;for(let[E,S]of _.entries()){let w=Xi(S);for(let R=0;R<s.length;R++){let b=s[R],M=Math.abs(b),A=Fn(S)+Math.sign(b)*(M<=1?w*M:w+M-1),I=n(A,S),z=So(A,S),P=ys(A,S),D=Math.sin(A*.38+S*.27)*Math.cos(S*.23-A*.12);if(d.copy(c).lerp(l,.27+.18*D),d.lerp(h,jt(I,.25,4.3)*.75),d.lerp(u,Fp(A,S)*.23),d.lerp(l,Hp(A,S,t)*(.24+.08*D)),d.lerp(u,jt(I,1.4,3.6)*(Math.sin(A*.46-S*.34)*.17+.19)),d.lerp(h,(1-jt(z,1.05,5.7))*(.16+.12*D)),d.lerp(l,jt(Math.sin(A*.41+S*.23)*Math.sin(S*.32-A*.19),.4,.85)*.19),z>=0?d.lerp(f,(1-jt(z,.18,.91))*.88):d.copy(p),d.lerp(g,jt(Gp(A,S),1.35,4.18)*.91),t&&Math.abs(A-Sn.x)<9&&Math.abs(S-Sn.z)<9){let N=Bp(A,S),H=jt(N,.64,.67)*(1-jt(N,.735,.78))*kp(A,S),G=g.clone().lerp(m,.42+Math.sin(I*13+D)*.2);d.lerp(G,H*.94)}if(d.lerp(m,jt(I,7.4,11.1)*.62),P<4.2&&d.lerp(x,(1-jt(P,1.25,4.2))*.92),r.push(A,I,S),o.push(d.r,d.g,d.b),E&&R){let N=(E-1)*s.length+R-1,H=N+1,G=N+s.length,V=G+1;(E+R)%2?a.push(N,G,H,H,G,V):a.push(N,G,V,N,V,H)}}}let y=Hi(r,o,a);e==="earth"&&xp(y,So,ys);let v=new Nt(y,new _e({vertexColors:!0,roughness:.96}));return v.receiveShadow=!0,{mesh:v,vertexColumns:s.length,surfaceY:fE(y.attributes.position,s.length,n)}}function fE(n,t,e){function i(s,r,o){let a=0,c=s-1;for(;c-a>1;){let l=c+a>>1;r(l)<=o?a=l:c=l}return a}return(s,r,o)=>{let a=n.count/t,c=w=>n.getZ(w*t);if(r<c(0)||r>c(a-1))return e(s,r);let l=i(a,c,r),h=(r-c(l))/(c(l+1)-c(l)),u=w=>be(n.getX(l*t+w),n.getX((l+1)*t+w),h);if(s<u(0)||s>u(t-1))return e(s,r);let f=i(t,u,s),p=l*t+f,x=p+1,g=p+t,m=g+1,d=w=>o?.get?.(w)??n.getY(w),_=(l+f)%2===1,y=_?be(n.getX(x),n.getX(g),h):be(n.getX(p),n.getX(m),h),v=_?be(d(x),d(g),h):be(d(p),d(m),h),E=u(s<=y?f:f+1),S=s<=y?be(d(p),d(g),h):be(d(x),d(m),h);return Math.abs(E-y)<1e-7?v:be(v,S,(s-y)/(E-y))}}function dE(){let n=[-1.17,-1,-.84,-.58,0,.58,.84,1,1.17],t=[],e=[],i=[],s=new gt("#82b5b2"),r=new gt("#549aa7"),o=new gt("#75aaaf"),a=new gt("#c2ded8"),c=new gt;for(let[h,u]of _s.entries())for(let[f,p]of n.entries()){let x=Fn(u)+p*Xi(u);c.copy(r).lerp(s,jt(Math.abs(p),.47,1.08)*.91),c.lerp(s,(1-jt(Math.abs(u-On),.24,1.12))*.51);let g=jt(u,Ae.start-.13,Ae.start+.11)*(1-jt(u,Ae.end,Ae.end+.48));c.lerp(a,g*(.71+.11*Math.cos(p*10))),c.lerp(o,jt(u,15.2,21.3)*.86),c.multiplyScalar(.97+Math.sin(u*.39+p)*.036),t.push(x,vi(u),u);let m=-ys(x,u),d=1-jt(m,.15,2.2),_=1-jt(Math.abs(p),.63,1.16)*jt(m,.08,.92);if(e.push(c.r,c.g,c.b,d*_*jt(u,ei,ei+.42)),h&&f){let y=(h-1)*n.length+f-1,v=y+n.length;i.push(y,v,y+1,y+1,v,v+1)}}let l=new Nt(Hi(t,e,i,4),new _e({vertexColors:!0,roughness:.73,transparent:!0,depthWrite:!1}));return l.receiveShadow=!0,l.renderOrder=1,l}function pE(){let n=[-.66,-.18,.18,.52,.9,1.34,2,3.1,4.8,7.4,12,22,46,81],t=[],e=[],i=[],s=new gt("#538b9f"),r=new gt("#90bfba"),o=new gt("#c4d4bf"),a=new gt;for(let l=0;l<=248;l++){let h=(l-124)*.62;for(let[u,f]of n.entries()){let p=Kh(h)+f;a.copy(r).lerp(s,jt(f,.45,8.9));let x=(1-jt(Math.abs(f-.55),.11,.73))*(.2+.12*Math.sin(h*.42));if(a.lerp(o,x),a.multiplyScalar(.98+.026*Math.sin(h*.46+f*.64)),t.push(h,Eo-.012,p),e.push(a.r,a.g,a.b),l&&u){let g=(l-1)*n.length+u-1,m=g+n.length;i.push(g,g+1,m,g+1,m+1,m)}}}let c=new Nt(Hi(t,e,i),new _e({vertexColors:!0,roughness:.7}));return c.receiveShadow=!0,c}function mE(){let n=new Uint8Array(2048);for(let e=0;e<32;e++)for(let i=0;i<16;i++){let s=Math.sin(Math.PI*i/15),r=Math.sin(Math.PI*e/31);n.set([255,255,255,Math.round(240*s*r**1.45)],(i+e*16)*4)}let t=new lr(n,16,32);return t.magFilter=t.minFilter=on,t.needsUpdate=!0,t}function gE(n,t){let e=an(825),i=[{count:48,origin:Ae.end,span:20.8-Ae.end,whitewater:!1},{count:9,origin:ei+.6,span:Ae.start-ei-.6,whitewater:!1},{count:29,origin:On-.54,span:2.75,whitewater:!0},{count:26,origin:Ae.end-.04,span:2.15,whitewater:!0}].flatMap(({count:o,origin:a,span:c,whitewater:l})=>Array.from({length:o},()=>({start:e()*c,side:(e()-.5)*(l?1.64:1.82),width:.032+e()*(l?.135:.067),length:.12+e()**1.5*(l?.47:.84),yaw:(e()-.5)*(l?1.36:.46),speed:.24+e()*(l?1:.3),origin:a,span:c}))),s=new ro(new Mn().rotateX(-Math.PI/2),new Be({color:"#e0f0de",map:t,transparent:!0,opacity:.61,depthWrite:!1}),i.length);s.frustumCulled=!1,s.renderOrder=2,s.instanceMatrix.setUsage(fs),n.add(s);let r=new ke;return o=>{for(let[a,c]of i.entries()){let l=(c.start+o*c.speed)%c.span,h=c.origin+l,u=c.span>3?1:Math.sin(Math.PI*l/c.span)**.4;r.position.set(Fn(h)+c.side,vi(h)+.018,h),r.rotation.y=Math.atan2(Fn(h+.05)-Fn(h-.05),.1)+c.yaw,r.scale.set(c.width*u,1,c.length*u),r.updateMatrix(),s.setMatrixAt(a,r.matrix)}s.instanceMatrix.needsUpdate=!0}}function xE(n,t){let e=an(342),i=Array.from({length:42},()=>({start:e(),side:(e()-.5)*1.72,speed:.7+e()*.62,width:.043+e()*.11,length:.42+e()*1.3})),s=new ro(new Mn,new Be({color:"#f0f8e9",map:t,transparent:!0,opacity:.78,depthWrite:!1,side:Ie}),i.length);s.frustumCulled=!1,s.renderOrder=3,s.instanceMatrix.setUsage(fs),n.add(s);let r=new ke,o=new k(0,1,0),a=new k;return c=>{for(let[l,h]of i.entries()){let u=(h.start+c*h.speed)%1,f=be(Ae.start+.03,Ae.end,u),p=Math.sin(u*Math.PI)**.65;a.set(0,vi(f+.025)-vi(f-.025),.05).normalize(),r.quaternion.setFromUnitVectors(o,a),r.position.set(Fn(f)+h.side*Xi(f),vi(f)+.018,f+.042),r.scale.set(h.width*p,h.length*p,1),r.updateMatrix(),s.setMatrixAt(l,r.matrix)}s.instanceMatrix.needsUpdate=!0}}function Vp({plannedHill:n=!1,clearGround:t=()=>!1,gradeGround:e=(a,c,l)=>l,showHillDetails:i=!0,editableScenery:s=!1,showScenery:r=!0,groundPalette:o}={}){let a=new zt,c=(d,_)=>e(d,_,dc(d,_,n)),{mesh:l,vertexColumns:h,surfaceY:u}=uE(c,n,o),f=[];a.add(l,dE(),pE());let p=r?zp(a,{surfaceY:u,blockers:f,plannedHill:n,clearGround:t,editableScenery:s,showHillDetails:i,layout:{coastZ:Kh,inland:ys,rapid:On,riverX:Fn,riverWidth:Xi,riverOffset:So,waterfall:Ae}}):null,x=mE(),g=gE(a,x),m=xE(a,x);return{group:a,ground:l,vertexColumns:h,surfaceY:u,waterAt:Jn,blockers:f,scenery:p,updateWater(d){g(d),m(d)}}}var _E=(n,t,e)=>e.has(ht({x:Math.floor(n),z:Math.floor(t)}));function yE(n,t){if(!n?.points?.length)return!1;let e=new Set(t.map(ht)),i=Gi(n.points);for(let s of i)for(let r=-n.width/2+.045;r<=n.width/2-.045;r+=.11)if(!_E(s.x-s.dz*r,s.z+s.dx*r,e))return!1;return!0}function Wp(n,{material:t="dirt"}={}){if(!n?.points||n.points.length<3||!n?.cells?.length)return null;let e=n.slices?.[0]?.length??1,i=Math.min(.92,Math.max(.26,e*.48)),s=o=>[o.reduce((a,c)=>a+c.x+.5,0)/o.length,o.reduce((a,c)=>a+c.z+.5,0)/o.length],r=ps([s(n.slices[0]),...(n.corners??[]).map(s),s(n.slices.at(-1))],.12);for(let o of[1,.78,.58,.4,.24]){let a=sc(r,i*o);if(!a)continue;let c={id:`rounded:${ht(n.cells[0])}:${ht(n.cells.at(-1))}`,cells:n.cells.map(ht),points:a,width:e,material:t,radius:i*o};if(yE(c,n.cells))return c}return null}function Xp(n,t){if(!t)return n;let e=new Map(n);if(t.cells.map(r=>e.get(r)).some(r=>!r||r.bridgeId||r.approachBridgeId))return n;for(let r of t.cells)e.set(r,{...e.get(r),roadVisualId:t.id});let s=t.cells[0];return e.set(s,{...e.get(s),roadVisual:t}),e}function qp(n){let t=[];for(let e of n.values()){let i=e.roadVisual;!i||i.cells.some(s=>n.get(s)?.roadVisualId!==i.id)||t.push(i)}return t}var Yp=1,Tn={left:-15,right:16,top:-15,bottom:12},Qh=[{x:-1,z:-4,w:3,d:3,gate:{x:0,z:-1}},{x:2,z:-6,w:4,d:5,gate:{x:4,z:-1}},{x:-2,z:1,w:3,d:3,gate:{x:-1,z:0}},{x:1,z:1,w:3,d:3,gate:{x:2,z:0}},{x:4,z:2,w:3,d:4,gate:{x:5,z:1}},{x:-7,z:-4,w:3,d:4,gate:{x:-6,z:-5},future:!0},{x:-2,z:4,w:6,d:3,gate:{x:0,z:7},future:!0}],vE=[0,.5,1].flatMap(n=>[0,.5,1].map(t=>[n,t])),jh=new Map,ME=(n,t)=>t.x>=n.x&&t.x<n.x+n.w&&t.z>=n.z&&t.z<n.z+n.d,vs=n=>Qh.find(t=>ME(t,n));function wo(n){let t=ht(n);if(jh.has(t))return jh.get(t);let{x:e,z:i}=n,s=vE.map(([l,h])=>[e+l,i+h]),r=s.map(([l,h])=>dc(l,h,!0)),o=Math.min(...r),a=Math.max(...r),c={low:o,high:a,rise:a-o,clearance:Math.min(...s.map(([l,h])=>Er(l,h)))};return jh.set(t,c),c}function tu(n){let{x:t,z:e}=n,{rise:i,clearance:s}=wo(n);if(s<.12)return"water";if(s<.85)return"buffer";let r=t>=-4&&t<=11&&e>=-7&&e<=7,o=t>=-8&&t<=13&&e>=-13&&e<=9&&(t<4||e>=-9);return i>.72?"slope":i>.38?r||o?"terrace":"buffer":vs(n)?.future||t>=-6&&t<=-1&&e>=-10&&e<=-5?"expansion":r?"core":o?"expansion":"buffer"}function eu(n,t=vs){let{x:e,z:i}=n;if(e<Tn.left||e>Tn.right||i<Tn.top||i>Tn.bottom)return"Ngo\xE0i khu v\u1EF1c quy ho\u1EA1ch.";if(t(n))return"\xD4 n\xE0y thu\u1ED9c l\xF4 c\xF4ng tr\xECnh.";let{rise:s,clearance:r}=wo(n);return r<.12?"\u0110\u01B0\u1EDDng kh\xF4ng \u0111i qua l\xF2ng su\u1ED1i ho\u1EB7c bi\u1EC3n.":r<.55?"Ch\u1EEBa kho\u1EA3ng \u0111\u1EC7m \u1EDF b\u1EDD n\u01B0\u1EDBc.":s>.8?"\xD4 qu\xE1 d\u1ED1c \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng.":""}function nu(n,t=(i,s)=>dc(i,s,!0),e=wo){for(let i of n){if(i.width===1)continue;let s=i.hi+1;for(let r of[0,.5,1]){let o=i.t+r,a=c=>i.axis===St?t(o,c):t(c,o);if(Math.abs(a(i.lo)-a(s))/i.width>.18)return"M\u1EB7t \u0111\u01B0\u1EDDng xe b\u1ECB d\u1ED1c ngang qu\xE1 18%."}if(i.cells.some(r=>e(r).rise>.45))return"\u0110o\u1EA1n d\u1ED1c n\xE0y ph\xF9 h\u1EE3p v\u1EDBi l\u1ED1i \u0111i b\u1ED9 1\xD7."}return""}var Le=(n,t,e,i)=>[{x:n,z:t},{x:e,z:i}],bE=[Le(-3,-1,11,-1),Le(-3,0,11,0),Le(7,-6,7,5),Le(8,-6,8,5),Le(6,-2,11,-2),Le(9,1,11,1),Le(5,0,5,1),Le(-3,-13,-3,0),Le(-7,-13,-3,-13),Le(-7,-13,-7,-5),Le(7,5,7,8),Le(8,5,8,8),Le(-3,7,8,7),Le(-2,8,8,8),Le(-3,0,-3,7),Le(5,6,5,7),Le(-3,-7,-3,0),Le(-2,-7,-2,0),Le(-7,-7,-2,-7),Le(-7,-6,-2,-6),Le(-7,-7,-7,-5),Le(-6,-7,-6,-5)];function EE(){let n=new Map;for(let[t,e]of bE){let i=yr(n,t,e,"dirt",eu);if(i.error)throw new Error(`${ht(t)} \u2192 ${ht(e)}: ${i.error}`);n=i.roads}return n}function $p(n){let t=EE();return n>=2&&(t=yi(t,[...t.values()].filter(({x:e,z:i})=>e>=1&&(e<=5||i>=2)),"stone")),n>=3&&(t=yi(t,[...t.values()].filter(({x:e,z:i})=>e>=6&&i<2),"asphalt")),t}function Zp(n,t){let e=[...n.values()].filter(i=>Vi.indexOf(i.material)>=t);return e.length?yi(n,e,Vi[t-1]):n}var pc=[[-2.5,-7.5],[-2.5,-12.5],[-6.5,-12.5],[-6.5,-5.5]];function mc(n,t){if(t.material!=="asphalt"||!t.cells)return 0;for(let{x:e,z:i}of t.cells)for(let[s,r]of[[1,0],[-1,0],[0,1],[0,-1],[0,0]]){let o=n.get(ht({x:e+s,z:i+r}));if(o?.axes!==(St|Jt))continue;let a=[St,Jt].map(c=>Ke(n,o,c));if(a.every(c=>c.width>=2)&&a.some(c=>c.width>=3&&c.material==="asphalt"))return t.axis}return 0}function gc(n,t){let e=(n+(t===Jt?5:0))%10;return e<4?"green":e<4.7?"yellow":"red"}var Ms=new mi;Ms.moveTo(-.14,-.066);Ms.lineTo(.15,-.066);Ms.lineTo(.285,0);Ms.lineTo(.15,.066);Ms.lineTo(-.14,.066);Ms.closePath();function Jp(n,t=!1){let e=new zt;e.userData.arrows=n;let i=.67+.158*(n.length-1);En(e,.096,i,.096,t?"#6d756f":"#876545",0,-.045,0,.013);for(let[s,{x:r,z:o}]of n.entries()){let a=new zt;a.position.y=.505+s*.158,a.rotation.y=Math.atan2(-o,r),e.add(a);let c=new Bi(Ms,{depth:.039,bevelEnabled:!0,bevelThickness:.008,bevelSize:.008,bevelSegments:1,steps:1});c.translate(0,0,-.0195);let l=new Nt(c,le(t?"#377f94":["#b38a5d","#c19a68","#aa8054"][s]));a.add(l);for(let h of[-1,1])if(t){$(a,.23,.028,.007,"#f5ead0",.035,0,h*.028);let u=$(a,.076,.022,.007,"#f5ead0",.15,0,h*.029);u.rotation.z=Math.PI/4;let f=$(a,.076,.022,.007,"#f5ead0",.15,0,h*.029);f.rotation.z=-Math.PI/4,u.position.y-=.022,f.position.y+=.022}else for(let u of[-.043,.043])$(a,.019,.019,.009,"#786650",u,-.0095,h*.029)}return fe(e)}var gn=60,To=([n,t],[e,i])=>Math.hypot(e-n,i-t),_c=n=>n.slice(1).reduce((t,e,i)=>t+To(n[i],e),0);function yc(n,t){let e=[[0,t.left,1],[0,t.right+1,-1],[1,t.top,1],[1,t.bottom+1,-1]],i=Array.from({length:192},(s,r)=>{let o=r*Math.PI/96;return[n[0]+gn*Math.cos(o),n[1]+gn*Math.sin(o)]});for(let[s,r,o]of e){let a=c=>(c[s]-r)*o>=0;i=i.flatMap((c,l,h)=>{let u=h[(l+h.length-1)%h.length];if(a(u)===a(c))return a(c)?[c]:[];let f=(r-u[s])/(c[s]-u[s]),p=u.map((x,g)=>g===s?r:x+(c[g]-x)*f);return a(c)?[p,c]:[p]})}return{outline:i,contains:s=>s[0]>=t.left&&s[0]<t.right+1&&s[1]>=t.top&&s[1]<t.bottom+1&&Math.hypot(s[0]-n[0],s[1]-n[1])<=gn}}var xc=(n,t,e)=>n===St?{x:t,z:e,axes:St}:{x:e,z:t,axes:Jt},iu=(n,t)=>Math.ceil(n-t/2-.5-1e-9);function su(n,t,e){if(n.length<2)return n;n=ps(n,.18);let i=gi(t),s=[...n];for(let[r,o]of[[0,1],[n.length-1,-1]]){let a=n[r],c=n[r+o],l=To(a,c);if(l<.24)continue;let h=[(c[0]-a[0])/l,(c[1]-a[1])/l],u=.58,f=g=>{let m=To(a,g);m<u&&To(c,g)>=.24&&(u=m,s[r]=g)};for(let g of i.values())for(let[m,[d,_]]of xr(g))h[0]*d+h[1]*_>.76&&f(m);let p=Math.floor(a[0]),x=Math.floor(a[1]);for(let g=p-1;g<=p+1;g++)for(let m=x-1;m<=x+1;m++){let d=t.get(ht({x:g,z:m}));if(!d||d.bridgeId||d.approachBridgeId||d.roadCurveId||![St,Jt].includes(d.axes))continue;let _=d.axes===St?0:1;if(Math.abs(h[_])<.93)continue;let y=Ke(t,d,d.axes),v=Math.sign(h[_]);if(y.width!==e||y.cells.some(S=>t.get(ht(xc(d.axes,y.t+v,d.axes===St?S.z:S.x)))?.axes&d.axes))continue;let E=(y.lo+y.hi+1)/2;f(d.axes===St?[y.t+.5,E]:[E,y.t+.5])}}return s}function Sr(n,t){let e=ps(n.filter((h,u)=>!u||To(n[u-1],h)>.001),.18),i=_c(e),s=[],r=[],o=[],a=new Map,c=h=>{for(let u of h){let f=ht(u);a.set(f,{...u,axes:u.axes|(a.get(f)?.axes??0)})}},l=h=>({points:e,length:i,slices:s,corners:r,steps:o,cells:[...a.values()],error:h});if(i<.24)return l("Ch\u1ECDn \u0111i\u1EC3m cu\u1ED1i kh\xE1c \u0111i\u1EC3m \u0111\u1EA7u.");if(i>gn+1e-9)return l("Tim tuy\u1EBFn d\xE0i qu\xE1 60 \u0111\u01A1n v\u1ECB.");if(!Number.isInteger(t)||t<1||t>4)return l("Ch\u1ECDn b\u1EC1 r\u1ED9ng t\u1EEB 1\xD7 \u0111\u1EBFn 4\xD7.");for(let h=1;h<e.length;h++){let[u,f]=e[h-1],[p,x]=e[h],g=p-u,m=x-f,d=Math.abs(g)>=Math.abs(m)?St:Jt,[_,y,v,E]=d===St?[u,p,f,m]:[f,x,u,g],S=Math.floor(_),w=Math.floor(y),R=Math.sign(w-S),b=null;for(let N=0;N<=Math.abs(w-S);N++){let H=S+N*R,G=Math.max(0,Math.min(1,(H+.5-_)/(y-_))),V=iu(v+G*E,t),O=Array.from({length:t},(j,Y)=>xc(d,H,V+Y));s.push(O),c(O);let B={segment:h,point:[u+g*G,f+m*G],cells:O};if(o.push(B),t===1&&b!==null&&b!==V){let j=Math.min(H,H-R),Y=R>0?V:b,rt=xc(d,j,Y),at=R>0?b:V,tt=[rt,xc(d,j,at)].map(ut=>({...ut,axes:St|Jt}));c(tt),B.cells=[...O,...tt]}b=V}if(h===e.length-1)continue;let[M,A]=e[h+1];if(Math.abs(Math.atan2(g*(A-x)-m*(M-p),g*(M-p)+m*(A-x)))<Math.PI/3&&d===(Math.abs(M-p)>=Math.abs(A-x)?St:Jt))continue;let z=iu(p,t),P=iu(x,t),D=[];for(let N=z;N<z+t;N++)for(let H=P;H<P+t;H++)D.push({x:N,z:H,axes:St|Jt});r.push(D),c(D),o.push({segment:h,point:e[h],cells:D})}return l("")}function vc(n,t,e){let i=n.steps.findIndex(r=>r.cells.some(e));if(i<0)return null;let s=n.steps[i].cells.find(e);for(let r=i-1;r>=0;r--){let{segment:o,point:a}=n.steps[r],c=Sr([...n.points.slice(0,o),a],t);if(c.error||c.cells.some(e))continue;let l=new Set(c.cells.map(ht));return{route:c,blocked:s,discarded:n.cells.filter(h=>!l.has(ht(h)))}}return{route:null,blocked:s,discarded:n.cells}}var De={bridgeLimit:6,deckThickness:.22,clearance:.3,crossSlope:.18,cutFill:.22,approachCut:.25,approachFill:.85,approachExtension:3,pillarHeight:4};var hn=(n,t)=>t===St?n.x:n.z,je=(n,t)=>t===St?n.z:n.x,We=(n,t,e)=>n===St?{x:t,z:e}:{x:e,z:t},wr=(n,t)=>n.x===t.x?Jt:St,Tr=n=>n===1?.35:.27,SE=[[1,0],[-1,0],[0,1],[0,-1]],ru=(n,t)=>Math.abs(n.x-t.x)+Math.abs(n.z-t.z),ou=(n,t,e,i)=>Array.from({length:Math.abs(e-t)+1},(s,r)=>We(n,t+r*Math.sign(e-t),i));function qi(n,t){if(!n.length)return[t];if(_i(n.at(-1),t))return n;let e=[...n],{x:i,z:s}=e.at(-1),r=Math.abs(t.x-i),o=Math.abs(t.z-s),a=Math.sign(t.x-i),c=Math.sign(t.z-s),l=0,h=0;for(;l<r||h<o;){l<r&&(h===o||(l+.5)*o<=(h+.5)*r)?(i+=a,l++):(s+=c,h++);let u={x:i,z:s};_i(u,e.at(-2))?e.pop():e.push(u)}return e}function au(n,t,e){return Array.from({length:e},(i,s)=>We(t,hn(n,t),je(n,t)+s))}function bc(n,t,e,i,s){let r=hn(n,t),o=je(n,t),a=We(t,r+.5,o+e/2),c=({x:d,z:_})=>i(d,_),l=[],h=[],u=null,f=null,p=0;for(let d of[.02,.25,.5,.75,.98]){let _=[];for(let E=0;E<e;E++)for(let S of[.02,.25,.5,.75,.98]){let w=We(t,r+d,o+E+S),R=s(w.x,w.z);R&&R.kind!=="river"&&(f=R),R&&(!u||R.y>u.y)&&(u=R),_.push(c(w))}let y=c(We(t,r+d,o+.02)),v=c(We(t,r+d,o+e-.02));p=Math.max(p,Math.abs(y-v)/(e-.04)),l.push(..._),h.push({t:r+d,low:Math.min(..._),high:Math.max(..._)})}let x=[0,.25,.5,.75,1].map(d=>c(We(t,r+d,o+e/2))),g=[0,1].map(d=>Math.max(...Array.from({length:e*4+1},(_,y)=>c(We(t,r+d,o+y/4))))),m=Math.max(...x.slice(1).map((d,_)=>Math.abs(d-x[_])*4));return{...a,t:r,side:o,axis:t,water:u,prohibitedWater:f,maxCrossSlope:p,grade:m,profile:x,crossHeights:h,edgeCrown:g,y:c(a),low:Math.min(...l),high:Math.max(...l),cells:au(n,t,e)}}function Mc(n,t,e,i,s,r,o){let a=n[t-e]?.axis,c=n[t-e]?.side,l=[],h=!1;for(let u=t;u>=0&&u<n.length;u+=e){let f=n[u];if(f.axis!==a||f.side!==c||f.water||f.turn)break;l.push({station:f,i:u});let p=f.t+(f.t>=i?1:0),x=Tr(r),g=p===f.t,m=f.profile[g?0:4],d=Math.abs(p-i)*x;if(Math.abs(m-s)>d+1e-6)continue;let _=Math.min(f.edgeCrown[g?0:1],m+.35,s+d),y=S=>s+(_-s)*((S-i)/(p-i)),v=[],E=!0;for(let S of l){let w=Math.max(...S.station.crossHeights.map(b=>b.high-y(b.t)));if(Math.max(...S.station.crossHeights.map(b=>y(b.t)-b.low))>De.approachFill||w>(o?De.approachCut:.05)){E=!1,h=!0;break}w>.05&&v.push(S.i)}if(E)return{heightAt:y,endIndex:u,requiredCuts:v}}return{terrainBlocked:h}}function wE(n,t,e){let i=new Map,s=(r,o)=>{let a=ht(r);i.set(a,{...r,axes:(i.get(a)?.axes??0)|o})};for(let[r,o]of n.entries()){let a=e?.get(r),c=r?wr(n[r-1],o):null,l=r+1<n.length?wr(o,n[r+1]):null;if(c&&l&&c!==l)for(let h=0;h<t;h++)for(let u=0;u<t;u++)s({x:o.x+h,z:o.z+u},St|Jt);else{let h=c??l??St;for(let u of au(a?.cell??o,h,a?.width??t))s(u,h)}}return i}function TE(n,t,e){if(!t||n.length<3)return null;let i=(u,f)=>Math.abs(u.x-f.x)+Math.abs(u.z-f.z),s=n.reduce((u,f,p)=>i(f,t)<i(n[u],t)?p:u,0),r=Math.max(0,s-3),o=Math.min(n.length-1,s+3),a=n[r],c=n[o],l=[{cell:a,path:[a],distance:0,rank:i(a,c)}],h=new Map([[ht(a),0]]);for(let u=0;u<120&&l.length;u++){l.sort((p,x)=>x.rank-p.rank);let f=l.pop();if(_i(f.cell,c)){let p=[...n.slice(0,r),...f.path,...n.slice(o+1)];return Ec({...e,cells:p,suggestDetour:!1}).error?null:p}for(let[p,x]of SE){let g={x:f.cell.x+p,z:f.cell.z+x};if(i(g,t)>6)continue;let m=p?St:Jt,d=bc(g,m,e.width,e.surfaceY,e.waterAt),_=e.width===1?.28:De.crossSlope,y=e.surfaceY(f.cell.x+(m===St?.5:e.width/2),f.cell.z+(m===Jt?.5:e.width/2));if(d.water||d.cells.some(e.obstacle)||d.grade>Tr(e.width)||Math.abs(d.y-y)>Tr(e.width)||d.maxCrossSlope>_)continue;let v=f.distance+1,E=ht(g);v>=(h.get(E)??1/0)||(h.set(E,v),l.push({cell:g,path:[...f.path,g],distance:v,rank:v+i(g,c)}))}}return null}function AE(n,t){let e=new Map;for(let i=1;i<n.length-1;i++){let s=n[i-1];if(s.turn||s.water)continue;let r;for(let o=i;o<Math.min(n.length-1,i+t);o++){let a=n[o];if(a.turn||a.water||a.axis!==s.axis||a.side!==s.side)break;let c=n[o+1];if(c.turn||c.water||c.axis!==s.axis||c.side!==s.side)continue;let l=n.slice(i,o+1),h=Math.min(s.y,c.y);l.every(u=>u.y<h-.05&&u.high<=h+.05)&&l.some(u=>u.low<h-.35)&&(r=o)}r!==void 0&&(e.set(i,r),i=r+1)}return e}function Ao({roads:n,cells:t,width:e=1,material:i,surfaceY:s,waterAt:r,obstacle:o=()=>"",allowLeveling:a=!1,suggestDetour:c=!1,sections:l,elevated:h=!1,bridgeRetreat:u,readStation:f=(x,g,m)=>bc(x,g,m,s,r),sliced:p}){if(!t.length||!Number.isInteger(e)||e<1||e>4)return{roads:n,cells:[],error:"Ch\u1ECDn b\u1EC1 r\u1ED9ng \u0111\u01B0\u1EDDng t\u1EEB 1 \u0111\u1EBFn 4 \xF4.",errorCell:t[0]??null,bridges:[],gradeEdits:[],width:e};let x=p?.footprint??wE(t,e,l),g=[...x.values()],m={roads:n,cells:g,error:"",errorCell:null,bridges:[],gradeEdits:[],width:e},d=(M,A,I=!1)=>({...m,error:M,errorCell:A,detour:I&&c?TE(t,A,{roads:n,width:e,material:i,surfaceY:s,waterAt:r,obstacle:o,allowLeveling:a}):null}),_=new Set;for(let[M,A]of[[0,t[1]],[t.length-1,t.at(-2)]]){if(p)break;if(!A)continue;let I=l?.get(M),z=I?.cell??t[M],P=I?.width??e,D=wr(t[M],A),N=au(z,D,P),H=n.get(ht(z));if(H?.approachBridgeId&&H.axes===D&&N.every(G=>n.get(ht(G))?.approachBridgeId===H.approachBridgeId)&&Ke(n,H,D).width===P)for(let G of N)_.add(ht(G))}for(let M of g){let A=ht(M),I=n.get(A);if(p?.preserved.has(A))continue;if(I?.bridgeId||I?.approachBridgeId&&(!_.has(A)||I.axes!==M.axes))return d("\u0110o\u1EA1n n\xE0y thu\u1ED9c c\u1EA7u ho\u1EB7c \u0111\u01B0\u1EDDng d\u1EABn \u0111ang c\xF3.",M);let z=o(M);if(z)return d(z,M,!0)}let y=p?.stations??t.map((M,A)=>{let I=A?wr(t[A-1],M):null,z=A+1<t.length?wr(M,t[A+1]):null,P=l?.get(A),D={...f(P?.cell??M,I??z??St,P?.width??e)};D.width=P?.width??e;let N=ht(P?.cell??M);if(_.has(N)){let H=n.get(N);D.y=H.roadY,D.profile=D.profile.map((G,V)=>H.roadStartY+(H.roadEndY-H.roadStartY)*V/4),D.grade=Math.abs(H.roadEndY-H.roadStartY),D.maxCrossSlope=0}if(I&&z&&I!==z){D.turn=!0;for(let H of[St,Jt])for(let G=0;G<e;G++){let V=We(H,hn(M,H)+G,je(M,H)),O=f(V,H,e);O.water&&(!D.water||O.water.y>D.water.y)&&(D.water=O.water),O.prohibitedWater&&(D.prohibitedWater=O.prohibitedWater),D.maxCrossSlope=Math.max(D.maxCrossSlope,O.maxCrossSlope),D.grade=Math.max(D.grade,O.grade)}}return D}),v=new Map(n);for(let[M,A]of x){let I=n.get(M);p?.preserved.has(M)||I&&(I.axes&A.axes)===A.axes||v.set(M,{...I,...A,material:I?.material??i,axes:(I?.axes??0)|A.axes})}let E=new Map,S=[],w=[],R=h?AE(y,De.bridgeLimit):new Map;for(let M=0;M<y.length;M++){let A=y[M],I=R.has(M);if(!A.water&&!I)continue;let z=R.get(M)??M;for(;!I&&y[z+1]?.water;)z++;let P=M,D=z;if(!I&&u&&!S.length){if(M-=u[0],z+=u[1],M<1||z>=y.length-1||z-M+1>De.bridgeLimit||y.slice(M,P).some(et=>et.water)||y.slice(D+1,z+1).some(et=>et.water))return d("Ch\u01B0a \u0111\u1EE7 \u0111\u1EA5t kh\xF4 \u0111\u1EC3 l\xF9i \u0111\u1EA7u c\u1EA7u.",t[P]);A=y[M]}let N=y.slice(M,z+1),H=N.find(et=>et.prohibitedWater);if(H)return d("Ch\u1EC9 b\u1EAFc c\u1EA7u qua l\xF2ng su\u1ED1i, ch\u1EEBa kho\u1EA3ng c\xE1ch v\u1EDBi th\xE1c v\xE0 bi\u1EC3n.",t[M+N.indexOf(H)]);if(N.some(et=>et.axis!==A.axis||et.side!==A.side||et.turn||et.width!==e))return d("C\u1EA7u ph\u1EA3i \u0111i th\u1EB3ng qua s\xF4ng, h\xE3y r\u1EBD h\u01B0\u1EDBng sau khi l\xEAn b\u1EDD.",t[M]);if(!M||z===y.length-1)return d("K\xE9o t\u1EDBi b\u1EDD b\xEAn kia \u0111\u1EC3 xem c\u1EA7u.",t[M]);if(N.length>De.bridgeLimit)return d(`Nh\u1ECBp c\u1EA7u t\u1ED1i \u0111a ${De.bridgeLimit} \xF4.`,t[M]);let G=y[M-1],V=y[z+1];if(G.axis!==A.axis||G.side!==A.side||V.axis!==A.axis||V.side!==A.side||G.turn||V.turn)return d("C\u1EA7u ph\u1EA3i \u0111i th\u1EB3ng qua s\xF4ng, h\xE3y r\u1EBD h\u01B0\u1EDBng sau khi l\xEAn b\u1EDD.",t[M]);let O=A.t>G.t,B=A.t+(O?0:1),j=y[z].t+(O?1:0),Y=I?null:Math.max(...N.filter(et=>et.water).map(et=>et.water.y));for(let et of N)for(let it of[et.t,et.t+1])for(let bt=0;bt<=e*4;bt++){let nt=We(et.axis,it,et.side+bt/4),L=r(nt.x,nt.z);L?.kind==="river"&&(Y=Math.max(Y,L.y))}let rt=N.filter(et=>!et.water).reduce((et,it)=>Math.max(et,Math.max(it.high,...it.edgeCrown)+De.deckThickness),-1/0),at=Math.max(G.y,V.y,rt,I?-1/0:Y+De.clearance+De.deckThickness),tt=at,ut=Mc(y,M-1,-1,B,tt,e,a),lt=Mc(y,z+1,1,j,tt,e,a),ct=(et,it)=>et.heightAt&&it.heightAt?et.requiredCuts.length+it.requiredCuts.length:1/0;for(let et=1;et<=12&&ct(ut,lt);et++){let it=at+et*.025,bt=Mc(y,M-1,-1,B,it,e,a),nt=Mc(y,z+1,1,j,it,e,a);ct(bt,nt)<ct(ut,lt)&&(tt=it,ut=bt,lt=nt)}if(!ut.heightAt||!lt.heightAt){let et=!ut.heightAt,bt=(et?ut:lt).terrainBlocked?"\u0110\u01B0\u1EDDng d\u1EABn c\u1EA7u b\u1ECB ch\xF4n ho\u1EB7c cao qu\xE1 so v\u1EDBi n\u1EC1n. Th\u1EED m\u1ED9t v\u1ECB tr\xED b\u1EDD kh\xE1c ho\u1EB7c san \u0111\u1EA5t.":et?"L\xF9i \u0111i\u1EC3m b\u1EAFt \u0111\u1EA7u \u0111\u1EC3 \u0111\u1EE7 \u0111\u01B0\u1EDDng d\u1EABn l\xEAn c\u1EA7u.":"K\xE9o xa h\u01A1n \u0111\u1EC3 \u0111\u1EE7 \u0111\u01B0\u1EDDng d\u1EABn l\xEAn c\u1EA7u.";return d(bt,t[et?M-1:z+1])}if(N.some(et=>tt-De.deckThickness-et.low>De.pillarHeight))return d("V\u1EF1c qu\xE1 s\xE2u, kh\xF4ng th\u1EC3 d\u1EF1ng tr\u1EE5 \u0111\u1EE1.",t[M]);let xt=N.flatMap(et=>et.cells),wt=Math.min(B,j),F=Math.max(B,j),Mt=`bridge:${A.axis}:${A.side}:${wt}:${F}`,Q=new Set([...ut.requiredCuts,...lt.requiredCuts]);for(let et=ut.endIndex;et<=lt.endIndex;et++){let it=y[et],bt=et>=M&&et<=z,nt=bt?()=>tt:et<M?ut.heightAt:lt.heightAt;if(E.has(et))return d("Hai \u0111\u01B0\u1EDDng d\u1EABn c\u1EA7u ch\u1ED3ng nhau. Ch\u1EEBa th\xEAm \u0111\u1EA5t gi\u1EEFa hai nh\u1ECBp.",t[et]);E.set(et,{yAt:nt,wet:bt});let L=nt(it.t),C=nt(it.t+.5),J=nt(it.t+1);Q.has(et)&&w.push({x:it.x,z:it.z,y:C,width:e,axis:it.axis,startY:L,endY:J,cutOnly:!0});for(let _t of it.cells){let mt=ht(_t);if(v.get(mt).axes!==it.axis)return d("Gi\u1EEF \u0111\u01B0\u1EDDng d\u1EABn v\xE0 m\u1EB7t c\u1EA7u th\u1EB3ng, \u0111\u1EB7t n\xFAt giao tr\xEAn b\u1EDD.",_t);let yt=n.get(mt);if(yt){if(bt||Math.abs(it.y-C)>.02||Math.abs(it.profile[0]-L)>.02||Math.abs(it.profile[4]-J)>.02||yt.axes&~it.axis)return d("\u0110\u01B0\u1EDDng d\u1EABn c\u1EA7u ch\u1EA1m \u0111\u01B0\u1EDDng hi\u1EC7n c\xF3. H\xE3y ch\u1EEBa th\xEAm \u0111\u1EA5t \u1EDF \u0111\u1EA7u c\u1EA7u.",_t);continue}let Ft=bt?{bridgeId:Mt,bridgeY:tt,...I?{bridgeKind:"viaduct"}:{}}:{approachBridgeId:Mt};v.set(mt,{...v.get(mt),...Ft,roadY:C,roadStartY:L,roadEndY:J})}}S.push({id:Mt,axis:A.axis,width:e,y:tt,maxWaterY:Y,cells:xt,...I?{kind:"viaduct"}:{},start:We(A.axis,wt,A.side+e/2),end:We(A.axis,F,A.side+e/2)}),M=z}let b=new Map;for(let[M,A]of y.entries()){let I=y[M-1];if(E.get(M))continue;let P=I&&(E.get(M-1)?.yAt(I.t+.5)??b.get(M-1)??I.y),D=I?Math.hypot(A.x-I.x,A.z-I.z):1,N=I&&D>.01?(A.y-P)/D:0,H=Tr(A.width),G=A.width===1?.28:De.crossSlope,V=Math.max(Math.abs(N),A.grade),O=A.maxCrossSlope;if(V<=H&&O<=G)continue;let B=I&&Math.abs(N)>H?P+Math.sign(N)*H*D:A.y;if(a&&!A.turn&&!A.cells.some(j=>n.has(ht(j)))&&V<=H+.18&&O<=G+.15&&Math.max(Math.abs(A.low-B),Math.abs(A.high-B))<=De.cutFill)w.push({x:A.x,z:A.z,y:B,width:A.width,axis:A.axis}),b.set(M,B);else{let j=O>G?`\u0110\u01B0\u1EDDng ${A.width}\xD7 nghi\xEAng ngang ${Math.round(O*100)}% t\u1EA1i \u0111\xE2y.`:`\u0110o\u1EA1n \u0111\u01B0\u1EDDng d\u1ED1c d\u1ECDc ${Math.round(V*100)}% t\u1EA1i \u0111\xE2y.`;return d(j,t[M],!0)}}for(let M of g)for(let A of[St,Jt]){if(p?.preserved.has(ht(M))||!(M.axes&A))continue;let I=Ke(v,v.get(ht(M)),A);if(I.width>4)return d("\u0110\u01B0\u1EDDng r\u1ED9ng t\u1ED1i \u0111a 4 \xF4.",M);if(I.cells.filter(P=>P.bridgeId||P.approachBridgeId).some(P=>(n.has(ht(P))?Ke(n,n.get(ht(P)),A).width:e)!==I.width))return d("Gi\u1EEF nguy\xEAn b\u1EC1 r\u1ED9ng m\u1EB7t c\u1EA7u v\xE0 \u0111\u01B0\u1EDDng d\u1EABn.",M)}for(let[M,A]of l??[]){if(!A.taper)continue;let I=y[M],{startCenter:z,endCenter:P,startWidth:D,endWidth:N}=A.taper,H=Math.floor(Math.min(z-D/2,P-N/2)),G=Math.ceil(Math.max(z+D/2,P+N/2)),V=f(We(I.axis,I.t,H),I.axis,G-H),O=V.cells.find(j=>o(j)||n.has(ht(j))&&!I.cells.some(Y=>_i(Y,j)));if(V.water||O)return d("Ch\u1EEBa th\xEAm \u0111\u1EA5t hai b\xEAn \u0111\u1EC3 n\u1ED1i \u0111\xFAng b\u1EC1 r\u1ED9ng c\u1EA7u.",O??t[M]);for(let j of V.cells)x.has(ht(j))||g.push({...j,axes:I.axis});let B=y[M+1];if(M===y.length-2&&_.has(ht(B.cells[0]))){let j=I.t<B.t,Y=B.profile[j?0:4],rt=I.profile[j?0:4];if(Math.abs(Y-rt)>Tr(I.width))return d("\u0110\u1EA7u \u0111\u01B0\u1EDDng d\u1EABn cao qu\xE1 so v\u1EDBi n\u1EC1n.",t[M]);let at=j?rt:Y,tt=j?Y:rt;for(let ut of I.cells){let lt=ht(ut);n.has(lt)||v.set(lt,{...v.get(lt),roadStartY:at,roadEndY:tt,roadY:(at+tt)/2})}}for(let j of I.cells){let Y=ht(j);n.has(Y)||v.set(Y,{...v.get(Y),taper:A.taper})}}return{...m,roads:v,bridges:S,gradeEdits:w,route:t}}function cu({route:n,roads:t,width:e,surfaceY:i,waterAt:s,...r}){let o=(x,g,m=!1)=>({roads:t,width:e,cells:n.cells,bridges:[],gradeEdits:[],error:x,errorCell:g,legacyBridge:m});if(n.error)return o(n.error);let a=new Set,c=gi(t);for(let x of n.cells){let g=ht(x),m=c.get(t.get(g)?.roadCurveId);if(!m)continue;if(!xr(m).some(([[_,y],[v,E]])=>(x.x+.5-_)*v+(x.z+.5-y)*E<-.7?!1:[[n.points[0],n.points[1]],[n.points.at(-1),n.points.at(-2)]].some(([w,R])=>Math.hypot(w[0]-_,w[1]-y)<=.58&&(R[0]-w[0])*v+(R[1]-w[1])*E>.76*Math.hypot(R[0]-w[0],R[1]-w[1]))))return o("N\u1ED1i \u0111\u01B0\u1EDDng t\u1EA1i \u0111\u1EA7u d\u1EA3i cong c\xF3 s\u1EB5n.",x);a.add(g)}let l=(x,g)=>bc(x,g,e,i,s),h=n.slices.map(([x])=>({...l(x,x.axes),width:e})),u=n.corners.flatMap(x=>[...x.filter(g=>g.z===x[0].z).map(g=>l(g,Jt)),...x.filter(g=>g.x===x[0].x).map(g=>l(g,St))]);if([...h,...u].some(x=>x.water)||n.cells.some(x=>{let g=t.get(ht(x));return g?.bridgeId||g?.approachBridgeId||[.02,.5,.98].some(m=>[.02,.5,.98].some(d=>s(x.x+m,x.z+d)))}))return o("Th\u1EED c\u0103n c\u1EA7u theo tuy\u1EBFn hi\u1EC7n c\xF3.",void 0,!0);let f=u.find(x=>x.grade>Tr(e)||x.maxCrossSlope>(e===1?.28:De.crossSlope));if(f)return o("G\xF3c cua qu\xE1 d\u1ED1c.",f.cells[0]);let p=new Map(n.cells.map(x=>[ht(x),x]));return Ao({...r,roads:t,width:e,surfaceY:i,waterAt:s,cells:n.slices.map(x=>x[0]),sliced:{footprint:p,stations:h,preserved:a}})}function jp(n,t){if(n.error||!n.route?.length)return n;let e=n.route.map(({x:s,z:r})=>[s+.5,r+.5]),i=Math.max(t.length,_c(e));return{...n,length:i,error:i>gn+1e-9?"Tuy\u1EBFn v\xE0 \u0111\u01B0\u1EDDng d\u1EABn d\xE0i qu\xE1 60 \u0111\u01A1n v\u1ECB.":""}}function RE(n){let{roads:t,cells:e,width:i}=n;if(e.length<2)return[];let s=e.at(-1),r=[];for(let o=s.x-2;o<=s.x+2;o++)for(let a=s.z-2;a<=s.z+2;a++){let c=t.get(ht({x:o,z:a}));if(!c?.approachBridgeId||ru(s,c)>2)continue;let l=c.axes;if(l!==St&&l!==Jt)continue;let h=Ke(t,c,l);if(je(c,l)!==h.lo)continue;let u=hn(c,l),f=je(c,l);for(let p of[-1,1]){let x=t.get(ht(We(l,u-p,f)));if((x?.bridgeId??x?.approachBridgeId)!==c.approachBridgeId)continue;let g=t.get(ht(We(l,u+p,f)));if((g?.bridgeId??g?.approachBridgeId)===c.approachBridgeId)continue;let m=h.width,d=Math.abs(i-m),_=Math.floor((m-i)/2),y=We(l,u,f+_);for(let v=e.length-2;v>=Math.max(0,e.length-9);v--){let E=e[v];if((hn(E,l)-u)*p<=d||Math.abs(je(E,l)-je(y,l))>2)continue;let w=We(l,hn(E,l),je(y,l)),R=qi(e.slice(0,v+1),w),b=ou(l,hn(w,l),u,je(y,l)).slice(1),M=[...R,...b];if(new Set(M.map(ht)).size!==M.length)continue;let A=new Map;for(let I=0;I<d+1;I++){let z=M.length-1-I,P=m+Math.sign(i-m)*Math.min(I,d);A.set(z,{width:P,cell:We(l,hn(M[z],l),f+Math.floor((m-P)/2))})}for(let I=1;I<=d;I++){let z=M.length-1-I,P=A.get(z),D=A.get(z+1),[N,H]=p<0?[P,D]:[D,P];P.taper={startCenter:je(N.cell,l)+N.width/2,endCenter:je(H.cell,l)+H.width/2,startWidth:N.width,endWidth:H.width}}r.push({cells:M,sections:A,score:ru(s,c)+e.length-v})}}}return r.sort((o,a)=>o.score-a.score)}function CE(n){let{cells:t}=n,e=t[0],i=t.at(-1);if(!e||!i)return[];let s=Math.abs(e.x-i.x)>=Math.abs(e.z-i.z)?St:Jt;return[s,s===St?Jt:St].flatMap(r=>PE(n,r))}function PE({cells:n,width:t,waterAt:e,readStation:i},s){let r=d=>{for(let _=0;_<t;_++)for(let y of[.02,.5,.98]){let v=We(s,hn(d,s)+.5,je(d,s)+_+y);if(e(v.x,v.z)?.kind==="river")return!0}return!1},o=n.findIndex(r),a=n.findLastIndex(r);if(o<1||a===n.length-1)return[];let c=n[o-1],l=n[a+1],h=je(c,s),u=je(l,s);if(Math.abs(h-u)>2)return[];if(n.slice(o,a+1).some(d=>Math.abs(je(d,s)-h)>2))return[];if(!Math.sign(hn(l,s)-hn(c,s)))return[];let p=[Math.max(0,o-4),0],x=[Math.min(n.length-1,a+4),n.length-1],g=[...new Set([h,u,Math.round((h+u)/2),h-1,h+1,h-2,h+2])],m=[];for(let d of g)for(let _=0;_<2;_++){let y=p[_],v=x[_];if(Math.abs(je(n[y],s)-d)>2||Math.abs(je(n[v],s)-d)>2)continue;let E=ou(s,hn(n[y],s),hn(n[v],s),d),S=M=>!i(M,s,t).water;if(!S(E[0])||!S(E.at(-1)))continue;let w=y?qi(n.slice(0,y+1),E[0]):[E[0]],R=v<n.length-1?qi([E.at(-1)],n[v]).slice(1).concat(n.slice(v+1)):[],b=[...w,...E.slice(1),...R];b.some((M,A)=>A&&ru(M,b[A-1])!==1)||new Set(b.map(ht)).size===b.length&&m.push(b)}return m}function Kp(n,t){let{cells:e}=n;if(!/đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(t.error)||e.length<2)return t;let i=(o,a,c)=>{let l=wr(o,a),h=hn(o,l),u=Math.sign(h-hn(a,l));return ou(l,h,h+c*u,je(o,l)).slice(1)},s=o=>{for(let a=o?0:1;a<=De.approachExtension*2;a++)for(let c=0;c<=De.approachExtension;c++){let l=a-c;if(l<0||l>De.approachExtension)continue;let h=[...i(e[0],e[1],c).reverse(),...e,...i(e.at(-1),e.at(-2),l)];if(new Set(h.map(ht)).size!==h.length)continue;let u=Ao({...n,cells:h,suggestDetour:!1,bridgeRetreat:o});if(!u.error&&u.bridges.length===1)return u}return null},r=s(void 0);if(r)return r;if(/bị chôn/.test(t.error))for(let o=1;o<=De.approachExtension;o++)for(let a=0;a<=o;a++){let c=s([a,o-a]);if(c)return c}return t}function Ec(n){let t={width:1,...n};if(t.assisted){let i=new Map;t.readStation=(s,r,o)=>{let a=`${ht(s)}:${r}:${o}`;return i.has(a)||i.set(a,bc(s,r,o,t.surfaceY,t.waterAt)),i.get(a)}}let e=Ao(t);if(!t.assisted||t.cells.length<2||!Number.isInteger(t.width)||t.width<1||t.width>4||!e.error&&e.bridges.length)return e;if(e.error){let i=Kp(t,e);if(!i.error)return i;if(/đi thẳng qua sông|đường dẫn lên cầu|Đường dẫn cầu bị chôn/.test(e.error))for(let s of CE(t)){let r={...t,cells:s,suggestDetour:!1},o=Kp(r,Ao(r));if(!o.error&&o.bridges.length===1)return o}}for(let i of[t.cells,[...t.cells].reverse()])for(let s of RE({...t,cells:i})){let r=Ao({...t,...s,suggestDetour:!1});if(!r.error)return r}return e}var Bn={dirt:["#c4a47b","#9e7b54","#dbc49c"],stone:["#77766c","#8b8778","#ded7c5"],asphalt:["#50575d","#8c8f87","#f9efd9"]},Ro="#d9d6c8",Co=n=>n===4?[-.62,0,.62]:[0];var IE=new _e({color:"#9b815d",roughness:.86,side:Ie}),Qp={dirt:"C\u1EA7u g\u1ED7",stone:"C\u1EA7u \u0111\xE1",asphalt:"C\u1EA7u b\xEA t\xF4ng"};function tm(n){return n.every(t=>t.material==="asphalt")?"asphalt":n.some(t=>t.material==="dirt")?"dirt":"stone"}function em(n){return Qp[tm(n)]}function Sc(n,t){return(e,i)=>{let s=Math.floor(e),r=Math.floor(i),o=n.get(ht({x:s,z:r}));if(Number.isFinite(o?.roadY)||(o=[[Math.floor(e-1e-7),r],[s,Math.floor(i-1e-7)],[Math.floor(e-1e-7),Math.floor(i-1e-7)]].map(([l,h])=>n.get(ht({x:l,z:h}))).find(l=>Number.isFinite(l?.roadY))),!Number.isFinite(o?.roadY))return t(e,i);if(!Number.isFinite(o.roadStartY)||!Number.isFinite(o.roadEndY))return o.roadY;let a=o.axes===St?e-o.x:i-o.z;return Bt.lerp(o.roadStartY,o.roadEndY,Bt.clamp(a,0,1))}}function nm(n,t,e,i){let s=[];for(let a of n.values())if(!(a.bridgeId||a.approachBridgeId||a.roadCurveId))for(let[c,l]of[[1,0],[-1,0],[0,1],[0,-1]]){if(n.has(ht({x:a.x+c,z:a.z+l})))continue;let h=u=>{let f=a.x+(c?.5+c*.47:u),p=a.z+(l?.5+l*.47:u),x=f+c*.21,g=p+l*.21,m=t(f,p)+.034,d=e(x,g);return{top:[f,m,p],bottom:[x,Math.min(m,d-.025),g],cut:i(x,g)-d}};for(let u=0;u<4;u++){let f=h(u/4),p=h((u+1)/4);Math.max(f.cut,p.cut)<.035||Math.max(f.top[1]-f.bottom[1],p.top[1]-p.bottom[1])<.15||s.push(...f.top,...f.bottom,...p.top,...p.top,...f.bottom,...p.bottom)}}if(!s.length)return null;let r=new ae().setAttribute("position",new qt(s,3));r.computeVertexNormals();let o=new Nt(r,IE);return o.receiveShadow=!0,o}function im(n,t){let e=new zt;e.name="C\u1EA7u ng\u01B0\u1EDDi ch\u01A1i";let i=new Map;for(let r of n.values())r.bridgeId&&(i.has(r.bridgeId)||i.set(r.bridgeId,[]),i.get(r.bridgeId).push(r));for(let r of i.values()){let o=new zt,a=tm(r);o.name=Qp[a];let c=r[0].axes,[l,h]=c===St?["x","z"]:["z","x"],u=Math.min(...r.map(b=>b[l])),f=Math.max(...r.map(b=>b[l]))+1,p=Math.min(...r.map(b=>b[h])),x=Math.max(...r.map(b=>b[h]))+1,g=r[0].bridgeY+.035,m=g-De.deckThickness,d=f-u,_=x-p,y=(b,M,A,I,z,P,D)=>c===St?$(o,b,M,A,I,z,P,D):$(o,A,M,b,I,D,P,z),v=r.filter(b=>b.material==="asphalt"),E=(p+x)/2,S=(u+f)/2;if(a==="stone"){let b=new mi;b.moveTo(u,g),b.lineTo(u,m);let M=d*8;for(let z=1;z<=M;z++){let P=z/M;b.lineTo(u+P*d,m+Math.sin(P*Math.PI)*.145)}b.lineTo(f,g),b.closePath();let A=new Bi(b,{depth:_,bevelEnabled:!1});c===St?A.translate(0,0,p):A.rotateY(-Math.PI/2).translate(x,0,0);let I=new Nt(A,le("#8f8c7e"));I.castShadow=I.receiveShadow=!0,o.add(I)}else y(d,De.deckThickness,_,a==="asphalt"?"#90958f":"#856145",S,m,E);for(let b of r){if(b.material==="dirt")for(let M=0;M<5;M++)y(.188,.021,.99,(M+b[l])%3?"#bb9063":"#af8056",b[l]+(M+.5)/5,g-.016,b[h]+.5);if(b.material==="stone")for(let M=0;M<5;M++)for(let A=0;A<4;A++){let I=["#a6a297","#8f8e83","#b4b0a4"][(M*2+A+Math.abs(b[l]))%3];y(.181,.021,.228,I,b[l]+(M+.5)/5,g,b[h]+(A+.5)/4)}}for(let b of v){let M=b[l]+.5,A=b[h];y(1,.012,1,Bn.asphalt[0],M,g,A+.5),A===p&&y(1,.004,.038,Ro,M,g+.013,p+.158),A===x-1&&y(1,.004,.038,Ro,M,g+.013,x-.158)}if(_>=2){let b=new Map;for(let M of v)b.set(M[l],(b.get(M[l])??0)+1);for(let[M,A]of b)if(A===_)for(let I of Co(_))y(.54,.004,.055,Bn.asphalt[2],M+.5,g+.014,E+I)}let w=(b,M)=>c===St?t(b,M):t(M,b),R=(b,M,A,I,z)=>{let P=w(b,M);P<m&&y(A,m-P+.08,I,z,b,P-.08,M)};for(let b of[p+.08,x-.08]){if(a==="stone"){y(d,.18,.13,"#8e897b",S,g,b);for(let A=0;A<d*4;A++)y(.237,.051,.17,A%3?"#c1b9a7":"#aaa393",u+(A+.5)/4,g+.18,b);for(let A of[u+.14,f-.14])R(A,b,.27,.19,"#8f8c7e");continue}let M=a==="asphalt";y(d,.05,.055,M?"#b4c0bf":"#a3764d",S,g+.26,b),y(d,.038,.044,M?"#899a9b":"#946840",S,g+.13,b);for(let A=0;A<=d;A++){let I=Bt.clamp(u+A,u+.07,f-.07),z=M?.063:.105;y(z,.32,z,M?"#6c7b7c":"#765135",I,g,b),!M&&(A%2||d===1)&&A<d&&R(I,b,.18,.18,"#755944")}}if(a==="asphalt")for(let b=u+Math.min(.65,d/2);b<f;b+=2.5)R(b,E,.28,_*.47,"#a2a59c");e.add(fe(o))}let s=[];for(let r of n.values()){if(!r.approachBridgeId||!Number.isFinite(r.roadStartY)||!Number.isFinite(r.roadEndY))continue;let o=r.axes===St;for(let a of[0,1]){if(n.get(ht({x:r.x+(o?0:a*2-1),z:r.z+(o?a*2-1:0)}))?.approachBridgeId===r.approachBridgeId)continue;let l=r.x+(o?0:a),h=r.z+(o?a:0);for(let u=0;u<4;u++){let f=g=>{let m=l+(o?g:0),d=h+(o?0:g),_=Bt.lerp(r.roadStartY,r.roadEndY,g)+.032;return{top:[m,_,d],bottom:[m,Math.min(_,t(m,d)-.015),d]}},p=f(u/4),x=f((u+1)/4);s.push(...p.top,...p.bottom,...x.top,...x.top,...p.bottom,...x.bottom)}}}if(s.length){let r=new ae().setAttribute("position",new qt(s,3));r.computeVertexNormals();let o=new Nt(r,le("#a68a60",{side:Ie}));o.castShadow=o.receiveShadow=!0,e.add(o)}return e}var Ac=new gt(Ro),wc=[[0,-1],[1,0],[0,1],[-1,0]],LE=[[0,0],[1,0],[1,1],[0,1]],DE=new _e({vertexColors:!0,roughness:.94,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1});function Po(n,t,e,i=DE){let s=new ae;s.setAttribute("position",new qt(n,3)),s.setAttribute("color",new qt(t,3)),s.setIndex(e),s.computeVertexNormals();let r=new Nt(s,i);return r.receiveShadow=!0,r}function Io(n,t,e,i,s,r,o=i,a=4){let{positions:c,colors:l,indices:h}=n,u=c.length/3,f=(x,g,m)=>{c.push(x,s(x,g)+r,g),l.push(m.r,m.g,m.b)};f(...e,i);let p=[];for(let[x,g]of t.entries()){let m=t[(x+1)%t.length];for(let d=0;d<a;d++){let _=d/a;p.push([Bt.lerp(g[0],m[0],_),Bt.lerp(g[1],m[1],_)])}}for(let[x,g]of p)f((x+e[0])/2,(g+e[1])/2,i);for(let[x,g]of p)f(x,g,o);for(let x=0;x<p.length;x++){let g=u+1+x,m=u+1+(x+1)%p.length,d=g+p.length,_=m+p.length;h.push(u,m,g,g,m,d,d,m,_)}}function bs(n,t,e,i,s,r,o,a){let c=LE.map(([l,h])=>[t+(l-.5)*i,e+(h-.5)*s]);Io(n,c,[t,e],r,o,a)}var om=["#8d8c82","#9c9b90","#aaa79c","#b5b0a2","#96948b"],UE=["#a38f72","#b7a589","#c1ac88"],sm=["#78834c","#96974e","#6e7c46"],NE=[[-.35,-.5],[.32,-.5],[.5,-.24],[.48,.28],[.26,.5],[-.36,.47],[-.5,.25],[-.49,-.24]];function lu(n,t,e,i,s,r,o,a,c,l,h){let u=new gt(a[Math.floor(h()*a.length)]),f=NE.map(([p,x])=>{let g=(p+(h()-.5)*.07)*o,m=(x+(h()-.5)*.07)*r;return[t+g*i-m*s,e+g*s+m*i]});Io(n,f,[t,e],u,l,c,u.clone().multiplyScalar(.72),1)}function zE(n,t,e,i,s,r){let o=i[0][0],a=i[1][0],c=i[0][1],l=i[2][1],h=5,u=(l-c)/h,f=(a-o)/4;for(let p=0;p<h;p++){let x=o-p%2*f/2;for(let g=0;g<5;g++){let m=Math.max(o,x+g*f),d=Math.min(a,x+(g+1)*f);d-m<.08||lu(n,t+(m+d)/2,e+c+(p+.5)*u,1,0,u-.025,d-m-.027,om,.053+r()*.012,s,r)}}}function am(n,t,e,i,s,r,o,a=.05){if(lu(n,t,e,i,s,.036+o()*.034,.04+o()*.044,UE,a,r,o),o()<.46)return;let c=new gt(sm[Math.floor(o()*sm.length)]),l=r(t,e)+a-.015;for(let h of[-1,0,1]){let u=o()*Math.PI*2,f=Math.cos(u)*.017,p=Math.sin(u)*.017,x=.065+o()*.07,g=n.positions.length/3,m=t+h*.018,d=[m-f,l,e-p,m+f,l,e+p,m+f*2+h*.023,l+x,e+p*2],_=[c.r*.68,c.g*.68,c.b*.68,c.r,c.g,c.b,c.r*1.15,c.g*1.15,c.b*1.15];n.positions.push(...d,...d),n.colors.push(..._,..._),n.indices.push(g,g+1,g+2,g+5,g+4,g+3)}}var Lo=()=>({positions:[],colors:[],indices:[]}),Ar=(n,t,e)=>n.axis===St?[t,e]:[e,t];function tn(n,t,e,i,s,r,o){let a=n.positions.length/3;for(let[c,l]of t.entries()){for(let h of[e,i]){let u=h*(l.scale??1),f=l.x-l.dz*u,p=l.z+l.dx*u;n.positions.push(f,(o?o(f,p,l):l.y)+r,p);let x=typeof s=="function"?s(f,p):s;n.colors.push(x.r,x.g,x.b)}if(c){let h=a+(c-1)*2;n.indices.push(h,h+1,h+2,h+1,h+3,h+2)}}}function Tc(n,t,e){let i=s=>Bt.lerp(n[s],t[s],e);return{x:i("x"),z:i("z"),dx:i("dx"),dz:i("dz"),y:n.y===void 0?void 0:i("y"),scale:Bt.lerp(n.scale??1,t.scale??1,e)}}function OE(n,t,e){let i=0,s=t/2;for(let r=1;r<n.length;r++){let o=n[r-1],a=n[r],c=Math.hypot(a.x-o.x,a.z-o.z);if(c){for(;s<i+c;)e(Tc(o,a,(s-i)/c)),s+=t;i+=c}}}function cm(n){let t=[n[0]];for(let e=1;e<n.length;e++){let i=n[e-1],s=n[e],r=Math.ceil(Math.hypot(s.x-i.x,s.z-i.z)/.2);for(let o=1;o<=r;o++){let a=Tc(i,s,o/r);(e<n.length-1||o<r)&&(a.scale=1+.026*Math.sin(a.x*6.7+a.z*8.3)+.016*Math.sin(a.x*11.3-a.z*5.6)),t.push(a)}}return t}function hu(n,t,e,i,s,r){let{x:o,z:a}=t[0],c=an(Math.round(o*173+a*271)>>>0),l=0;OE(t,s==="stone"?.195:.31,h=>{let u=(d,_)=>i?i(d,_,h):h.y,{x:f,z:p,dx:x,dz:g}=h,m=e*h.scale/2;if(s==="stone"){let d=Math.ceil(m*2/.24),_=(m*2-.12)/d,y=-m+.06-l++%2*_/2;for(let v=0;v<=d;v++){let E=Math.max(y+v*_,-m+.06),S=Math.min(y+(v+1)*_,m-.06);if(S-E<.07)continue;let w=(E+S)/2;lu(n,f-g*w,p+x*w,x,g,S-E-.027,.17,om,r+c()*.009,u,c)}}else for(let d of[-1,1]){if(c()<.47)continue;let _=d*(m-.04-c()*.09);am(n,f-g*_,p+x*_,x,g,u,c,r)}})}function lm(n,t){let e=0;for(let i=1;i<n.length;i++){let s=n[i-1],r=n[i],o=Math.hypot(r.x-s.x,r.z-s.z);if(o){for(let a=Math.floor(e);a<e+o;a++){let c=Math.max(e,a+.23),l=Math.min(e+o,a+.77);c<l&&t([Tc(s,r,(c-e)/o),Tc(s,r,(l-e)/o)])}e+=o}}}function rm(n,t,{points:e,width:i,material:s,continuous:r},o){let a=Gi(e),c=s==="dirt"?cm(a):a,[l,h,u]=Bn[s].map(x=>new gt(x)),f=i/2-(r?0:.02);tn(n,c,-f,f,l,.04,o);let p=(x,g,m,d)=>tn(t,x,g-m/2,g+m/2,d,.055,o);for(let x of[-1,1])p(c,x*(f-.05),.1,s==="dirt"?l.clone().lerp(h,.46):h),s==="asphalt"&&p(c,x*(f-.14),.038,Ac);if(s!=="asphalt"&&hu(t,c,f*2,o,s,.062),!(i<2)){if(s==="dirt")for(let x of[-.39,.39])p(c,x,.08,h.clone().lerp(l,.5));s==="asphalt"&&lm(c,x=>{for(let g of Co(i))p(x,g,.055,u)})}}function hm(n,t,e,i,s="#fffdf5"){let r=Lo(),o=typeof e=="function"?e:new gt(e);tn(r,n.stations,-n.width/2,n.width/2,o,.1,t);let a=new Be({vertexColors:!0,transparent:!0,opacity:i,depthWrite:!1}),c=Po(r.positions,r.colors,r.indices,a);c.renderOrder=5;let l=[];for(let f of[-n.width/2,n.width/2]){let p=n.stations.map(x=>{let g=x.x-x.dz*f,m=x.z+x.dx*f;return[g,t(g,m,x)+.105,m]});for(let x=1;x<p.length;x++)l.push(...p[x-1],...p[x]);if(f<0)for(let x of[n.stations[0],n.stations.at(-1)]){let g=x.x-x.dz*n.width/2,m=x.z+x.dx*n.width/2;l.push(x.x-x.dz*f,t(x.x-x.dz*f,x.z+x.dx*f,x)+.105,x.z+x.dx*f,g,t(g,m,x)+.105,m)}}let h=new ae().setAttribute("position",new qt(l,3)),u=new qn(h,new Dn({color:s,transparent:!0,opacity:.84,depthWrite:!1}));return u.renderOrder=7,new zt().add(c,u)}function FE(n,{x:t,z:e,radius:i,material:s},r){let o=(f,p)=>[t+Math.cos(f)*i*p,e+Math.sin(f)*i*p],a=f=>Array.from({length:32},(p,x)=>o(x*Math.PI/16,f)),c=new gt(s==="dirt"?"#aa875f":"#ccc4b0"),l=new gt("#82985a");if(Io(n,a(.44),[t,e],c,r,.084),Io(n,a(.34),[t,e],l,r,.098,l.clone().multiplyScalar(.87)),s!=="asphalt")return;let h=Math.max(8,Math.round(i*8)),u=new gt(Bn.asphalt[2]);for(let f=0;f<h;f++){let p=Array.from({length:4},(x,g)=>{let m=(f+.2+.18*g)/h*Math.PI*2,[d,_]=o(m,.54);return{x:d,z:_,dx:-Math.sin(m),dz:Math.cos(m)}});tn(n,p,-.026,.026,u,.056,r)}}function BE(n,t,e,i,s){let[r,o,a]=Bn[e.material].map(l=>new gt(l)),c=Array.from({length:7},(l,h)=>{let u=h/6,f=Bt.lerp(i.startCenter,i.endCenter,u),[p,x]=Ar(e,e.t+u,f);return{x:p,z:x,dx:e.axis===St?1:0,dz:e.axis===Jt?1:0,scale:Bt.lerp(i.startWidth,i.endWidth,u)}});tn(n,c,-.49,.49,r,.035,s);for(let l of[-1,1])tn(t,c,l*.46-.027,l*.46+.027,o,.05,s),e.material==="asphalt"&&tn(t,c,l*.4-.012,l*.4+.012,Ac,.053,s);e.material==="asphalt"&&Math.min(i.startWidth,i.endWidth)>=2&&tn(t,c.slice(2,5),-.015,.015,a,.055,s),e.material!=="asphalt"&&hu(t,c,.98,s,e.material,.058)}function kE(n,t,e,i,s){if(!e)return;let[r,o,a]=Bn[e].map(p=>new gt(p)),c=i.at(-1),l=[...i,{...c,x:c.x+c.dx*.52,z:c.z+c.dz*.52}],h=e==="dirt"?cm(l):l,u=oc/2,f=s&&((p,x,g)=>Math.max(g.y,s(p,x)));tn(n,h,-u,u,r,.059,f);for(let p of[-1,1]){let[x,g]=[p*(u-.09),p*u].sort((m,d)=>m-d);tn(t,h,x,g,e==="dirt"?r.clone().lerp(o,.46):o,.065,f)}if(e==="asphalt"){for(let p of[-1,1]){let x=p*(u-.15);tn(t,h,x-.019,x+.019,Ac,.068,f)}lm(h,p=>tn(t,p,-.027,.027,a,.068,f))}if(e!=="asphalt"&&hu(t,h,u*2,f,e,.073),e==="dirt"){let p=new gt("#be9a6c");for(let x of[-.34,.34])tn(t,h,x-.055,x+.055,p,.063,f)}}function HE(n,t){let e=new gt("#c2a271");for(let i of[cc,lc])tn(n,i,-.45,.45,e,.052);um(n,t,vr)}function um(n,t,e){tn(n,e,-.59,.59,new gt("#967151"),.035);for(let i=1;i<e.length;i++){let s=i%3===0?"#ad865f":i%3===1?"#ba9469":"#a88058";tn(n,e.slice(i-1,i+1),-.56,.56,new gt(s),.043)}for(let i of[-1,1]){let s;for(let[r,o]of e.entries()){if(r%4)continue;let a=new k(o.x-o.dz*.56*i,o.y+.037,o.z+o.dx*.56*i);if($(t,.085,.36,.085,"#8d6a49",a.x,a.y,a.z),r%8===0&&r>0&&r<e.length-1&&$(t,.13,a.y+1.57,.14,"#746149",a.x,-1.57,a.z),s){let c=a.clone().sub(s);$(t,c.length()+.02,.063,.065,"#ae865d",(a.x+s.x)/2,(a.y+s.y)/2+.25,(a.z+s.z)/2).quaternion.setFromUnitVectors(new k(1,0,0),c.normalize())}s=a}}}function fm(n,t,e){let i=new zt;i.name="L\u1ED1i ven s\xF4ng v\xE0 c\u1EA7u g\u1ED7";let s=Lo();for(let{samples:r,width:o}of n)tn(s,r,-o/2,o/2,new gt("#bc9e6e"),.049,e);return um(s,i,t),i.add(Po(s.positions,s.colors,s.indices)),i}function GE(n,t,e,i,s,r){let o=new zt;o.name="Bi\u1EC3n ch\u1EC9 \u0111\u01B0\u1EDDng";for(let{cells:a,directions:c}of Vh(n,t)){if(c.length<3||a.some(v=>r.has(v.roadCurveId)))continue;let l=c.find(({x:v,z:E})=>!c.some(S=>S.x===-v&&S.z===-E))??c.find(({z:v})=>v===1),h=Math.min(...a.map(v=>v.x)),u=Math.max(...a.map(v=>v.x))+1,f=Math.min(...a.map(v=>v.z)),p=Math.max(...a.map(v=>v.z))+1,x=(h+u)/2+l.x*((u-h)/2+.34),g=(f+p)/2+l.z*((p-f)/2+.34),m=[];for(let v of[.36,.72])for(let E of[h-v,u+v])for(let S of[f-v,p+v])m.push({x:E,z:S});m.sort((v,E)=>Math.hypot(v.x-x,v.z-g)-Math.hypot(E.x-x,E.z-g));let d=({x:v,z:E})=>{if(i.some(w=>Math.hypot(v-w.x,E-w.z)<w.radius+.24))return!1;let S=e(v,E);return wc.every(([w,R])=>Math.abs(S-e(v+w*.24,E+R*.24))<.16)},_=m.find(({x:v,z:E})=>{let S={x:Math.floor(v),z:Math.floor(E)};return!n.has(ht(S))&&!s(S)&&d({x:v,z:E})});if(!_){let v=l.x?St:Jt,E=a.map(S=>n.get(ht({x:S.x+l.x,z:S.z+l.z}))).find(S=>S?.axes===v&&Ke(n,S,v).width===1);E&&(_=[-.459,.459].map(S=>({x:E.x+.5-l.z*S,z:E.z+.5+l.x*S})).find(d))}if(!_)continue;let y=Jp(c.filter(v=>v!==l),a.some(v=>v.material==="asphalt"));y.position.set(_.x,e(_.x,_.z),_.z),o.add(y)}return o}function uu(n,t,e=[],{terrainPaths:i=!0,hillRoute:s=i?Zn:null,reserved:r=vs,groundY:o=t,preview:a=!1}={}){let c=new zt,l=[],h=Lo(),u=Lo(),f=new zt,p=ms(n);s&&kE(h,u,Mo(n),s,i?void 0:t),i&&bo(n)&&HE(h,f);let x=vo(n),g=yo(n,x),m=gi(n);for(let w of m.values())rm(h,u,w,t);for(let w of qp(n))rm(h,u,w,t);for(let w of g.values())FE(u,w,t);let d=new Map;for(let w of p)for(let R of w.cells){let b=ht(R),M=d.get(b);(!M||w.width>M.width||w.width===M.width&&M.axis===Jt&&w.axis===St)&&d.set(b,w)}let _=new Set;for(let w of p){let R=w.cells[0].taper;!R||w.junction||!w.cells.every(b=>b.taper&&b.axes===w.axis)||(_.add(w.id),BE(h,u,w,R,t))}let y=w=>w.axes===(St|Jt)?d.get(ht(w)).material:w.material;for(let w of n.values()){if(w.bridgeId||w.curveOnly||m.has(w.roadCurveId))continue;let{x:R,z:b}=w,M=d.get(ht(w));if(_.has(M.id))continue;let A=y(w),[I,z]=Bn[A].map(O=>new gt(O)),P=an((Math.imul(R,73856093)^Math.imul(b,19349663))>>>0),D=wc.map(([O,B])=>n.get(ht({x:R+O,z:b+B}))),N=D.map(O=>O?0:M.width===1?.06:.02),H=[[N[3],N[0]],[1-N[1],N[0]],[1-N[1],1-N[2]],[N[3],1-N[2]]],G=[];for(let[O,B]of H.entries()){let j=H[(O+3)%4],Y=H[(O+1)%4];if(!D[O]&&!D[(O+3)%4]){let rt=M.axis===St?D[1]||D[3]:D[0]||D[2],at=A!=="dirt"?.14:M.width===1?.17:rt?.29:.23;G.push([R+Bt.lerp(B[0],j[0],at),b+Bt.lerp(B[1],j[1],at)]),G.push([R+Bt.lerp(B[0],Y[0],at),b+Bt.lerp(B[1],Y[1],at)])}else G.push([R+B[0],b+B[1]]);if(A==="dirt"&&!D[O]){let[rt,at]=wc[O];for(let tt of[.31,.53,.72]){let ut=(P()-.5)*.066,lt=R+Bt.lerp(B[0],Y[0],tt)+rt*ut,ct=b+Bt.lerp(B[1],Y[1],tt)+at*ut;G.push([lt,ct]),P()<.36&&am(u,lt-rt*.024,ct-at*.024,-at,rt,t,P)}}}let V=A==="asphalt"?1:.98+.025*Math.sin(R*8.7+b*4.2);Io(h,G,[R+.5,b+.5],I.clone().multiplyScalar(V),t,.035,I.clone().lerp(z,A==="asphalt"?0:D.some(O=>!O)?.26:.07));for(let[O,B]of D.entries()){let[j,Y]=wc[O];if(!B&&A==="asphalt"){let rt=D[(O+3)%4]?0:.15,at=D[(O+1)%4]?0:.15,tt=(rt-at)/2,ut=1-rt-at,lt=M.width===1?.397:.425;for(let[ct,xt,wt,F]of[[lt,.086,z,.048],[.342,.038,Ac,.052]]){let Mt=R+.5+j*ct-Y*tt,Q=b+.5+Y*ct+j*tt;bs(u,Mt,Q,j?xt:ut,Y?xt:ut,wt,t,F)}}else if(!B&&A==="stone"){let rt=R+.5+j*.413,at=b+.5+Y*.413;bs(u,rt,at,j?.082:.78,Y?.082:.78,z,t,.048)}if(B&&y(B)!==A&&(j>0||Y>0)){let rt=new gt(Bn[y(B)][0]);bs(u,R+.5+j*.5,b+.5+Y*.5,j?.1:.91,Y?.1:.91,I.clone().lerp(rt,.5),t,.049)}}A==="stone"&&zE(u,R,b,H,t,P)}for(let w of p){let{axis:R,t:b,lo:M,hi:A,width:I,material:z,junction:P}=w;if(z!=="dirt"||P||I<2||_.has(w.id)||w.cells.some(N=>N.bridgeId||m.has(N.roadCurveId)))continue;let D=(M+A+1)/2;for(let N of[-.39,.39]){let[H,G]=Ar(w,b+.5,D+N);bs(u,H,G,R===St?1:.1,R===Jt?1:.1,new gt("#b09167"),t,.046)}}let v=new Set,E=new Set;for(let w of p)if(!(w.junction||w.cells.some(R=>R.bridgeId||m.has(R.roadCurveId))))for(let R of[-1,1]){let b=w.cells.map(G=>x.get(ht({x:G.x+(w.axis===St?R:0),z:G.z+(w.axis===Jt?R:0)}))).find(Boolean),M=`${b}:${w.axis}:${R}`;if(!b||v.has(M))continue;v.add(M);let A=(w.lo+w.hi+1)/2,I=w.t+.5+R*.15;if(w.width>=2&&w.material!=="dirt"&&!_.has(w.id)){E.add(w.id);let G=new gt(Bn[w.material][2]),V=w.width*3,O=(w.width-.45)/V;for(let B=0;B<V;B++){let[j,Y]=Ar(w,I,A+(B+.5-V/2)*O);bs(u,j,Y,w.axis===St?.26:O*.55,w.axis===St?O*.55:.26,G,t,w.material==="stone"?.068:.056)}if(w.material==="asphalt"&&!g.has(b)){let B=w.width/2,[j,Y]=Ar(w,I-R*.27,A+R*B/2*(w.axis===St?1:-1));bs(u,j,Y,w.axis===St?.062:B-.25,w.axis===St?B-.25:.062,G,t,.056)}}let z=g.has(b)?null:mc(n,w);if(!z||a)continue;let P=[w.hi+1.11,w.lo-.11].map(G=>Ar(w,I-R*.32,G)).find(([G,V])=>{let O={x:Math.floor(G),z:Math.floor(V)};return!r(O)&&!n.has(ht(O))});if(!P)continue;let[D,N]=P,H=t(D,N);de(f,.082,.092,.055,"#827e70",D,H,N,8),de(f,.026,.035,.69,"#646960",D,H,N,8),$(f,z===St?.124:.155,.31,z===St?.155:.124,"#303934",D,H+.59,N);for(let[G,[V,O]]of[["green","#72ef9c"],["yellow","#f6bf4b"],["red","#f07859"]].entries()){let B=new Nt(new pn(.034,10,6),new Be);B.position.set(D,H+.643+G*.093,N),B.rotation.y=z===St?Math.PI/2:0,B.scale.z=2.2,c.add(B),l.push({lamp:B,color:O,phase:V,axis:z})}}let S=new gt(Bn.asphalt[2]);for(let w of p){let{axis:R,t:b,lo:M,hi:A,width:I}=w;if(w.junction||I<2||_.has(w.id)||E.has(w.id)||!w.cells.every(P=>P.material==="asphalt"&&!P.bridgeId&&!m.has(P.roadCurveId)))continue;let z=(M+A+1)/2;for(let P of Co(I)){let[D,N]=Ar(w,b+.5,z+P);bs(u,D,N,R===St?.54:.055,R===Jt?.54:.055,S,t,.052)}}return c.add(Po(h.positions,h.colors,h.indices),Po(u.positions,u.colors,u.indices)),a||c.add(fe(f),GE(n,x,t,e,r,m)),[...n.values()].some(w=>w.bridgeId)&&c.add(im(n,o)),{group:c,update(w){for(let{lamp:R,color:b,phase:M,axis:A}of l)R.material.color.set(gc(w,A)===M?b:"#555649")}}}function Es(n,t,e){let i=Lo(),s=5,r=s+1,o=e.grid?.045:0;for(let{x:l,z:h,color:u}of n){let f=new gt(u),p=i.positions.length/3;for(let x=0;x<=s;x++)for(let g=0;g<=s;g++){let m=l+Bt.lerp(o,1-o,g/s),d=h+Bt.lerp(o,1-o,x/s);if(i.positions.push(m,t(m,d)+(e.elevation??.029),d),i.colors.push(f.r,f.g,f.b),x&&g){let _=p+(x-1)*r+g-1,y=_+r;i.indices.push(_,y,_+1,_+1,y,y+1)}}}let a=new Be({vertexColors:!0,transparent:!0,opacity:e.opacity,depthWrite:!1}),c=Po(i.positions,i.colors,i.indices,a);return c.renderOrder=e.order??0,c}function dm(n,t,e){let i=[],s=[],r=new Map,o=new gt("#fffdf5"),a=new gt("#ff322e");for(let{x:u,z:f}of n)for(let[p,x,g,m]of[[u,f,u+1,f],[u,f+1,u+1,f+1],[u,f,u,f+1],[u+1,f,u+1,f+1]])r.set(`${p},${x}:${g},${m}`,[p,x,g,m]);function c(u,f,p,x,g,m){for(let d=0;d<m;d++)for(let _ of[d/m,(d+1)/m]){let y=Bt.lerp(u,p,_),v=Bt.lerp(f,x,_);i.push(y,e(y,v)+.095,v),s.push(g.r,g.g,g.b)}}for(let u of r.values())c(...u,o,8);for(let{x:u,z:f}of t)c(u+.2,f+.5,u+.8,f+.5,a,4),c(u+.5,f+.2,u+.5,f+.8,a,4);let l=new ae().setAttribute("position",new qt(i,3)).setAttribute("color",new qt(s,3)),h=new qn(l,new Dn({vertexColors:!0,transparent:!0,opacity:.82,depthWrite:!1}));return h.renderOrder=7,h}function Rc(n,t,e,i=()=>!0){let s=[];for(let o of n.values())for(let a of o.links){let c=n.get(a.id);if(!(!c||!i(o,c)||a.crossing&&!o.id.startsWith("roundabout:")&&!c.id.startsWith("roundabout:")))for(let[l,h]of[[0,.25],[.4,.65],[.8,1]])for(let u of[l,h]){let f=Bt.lerp(o.x,c.x,u),p=Bt.lerp(o.z,c.z,u);s.push(f,t(f,p)+.075,p)}}let r=new ae().setAttribute("position",new qt(s,3));return new qn(r,new Dn({color:e,transparent:!0,opacity:.85}))}var{lerp:Ss,smoothstep:Cc}=Bt,fu=.4,pm=2.25,pu=[-9.25,-5.8],mu=[-18.5,-5.2],VE=[[[-1.86,-4.5],[-3.1,-4.7],[-4.3,-5.3],[-5.7,-5.65],[-7.6,-5.55],pu],[mu,[-19.75,-5.75],[-21.45,-5.55],[-22.5,-4.75],[-22.4,-2],[-20.6,-.2],[-18.9,.3]],[[-5.7,-5.65],[-5.35,-4.7],[-4.85,-3.55],[-5.55,-2.3],[-7.1,-1.7],[-8.4,-.7]],[[-7.6,-5.55],[-7.9,-6.45],[-7.25,-7.6],[-5.4,-8],[-4.7,-8.9]],[[-21.45,-5.55],[-21.9,-6.7],[-22.1,-8.25],[-21.5,-9.5]],[[10.45,-14.12],[9.35,-14.05],[8.2,-13.65],[7.3,-13.35],[6.4,-14.2]],[[10.45,-14.12],[10,-15.5],[9.6,-16.7],[8.8,-17.58],[7.4,-17.62],[6.55,-17.85]]],mm=gu([pu,[-12.5,-5.67],[-15.2,-5.44],mu]);function gu(n){return new bn(n.map(([t,e])=>new k(t,0,e)))}function du(n,t,e){return Array.from({length:e},(i,s)=>{let r=s/(e-1),{x:o,z:a}=n.getPointAt(r),c=n.getTangentAt(r);return{x:o,z:a,y:t(o,a,r),dx:c.x,dz:c.z}})}var WE=gu([[8,-5.78],[8.3,-7.25],[9.2,-8.5],[10.65,-9.65],[12.05,-11.05],[12.45,-12.4],[11.95,-13.55],[11.15,-14],[10.45,-14.12]]),Pc=du(WE,(n,t,e)=>{let i=e-.02*Math.sin(2*Math.PI*e);return Ss(fu,pm,i)},121),gm=VE.map(gu),XE=[...gm,mm].flatMap(n=>n.getSpacedPoints(Math.ceil(n.getLength()*5)));function Ic(n,t,e){return(mn(n,t,Pc)?.distance??1/0)<1.06+e||XE.some(i=>Math.hypot(n-i.x,t-i.z)<.42+e)}function Do(n,t,e,i,s,r,o){return 1-Cc(Math.hypot(Math.max(e-n,0,n-i),Math.max(s-t,0,t-r)),0,o)}function xm(n,t,e){let i=Cc(Er(n,t),1.1,3.5);if(!i)return e;let s=Ss(e,.67,i*Do(n,t,-9.4,-3,-9.2,1.4,3.3));if(s=Ss(s,.77,i*Do(n,t,-24.2,-18.5,-9.5,1.5,4)),s=Ss(s,fu,i*Do(n,t,-2.9,13.1,-6.2,9.9,3.1)),s=Ss(s,pm,i*Do(n,t,4.7,10.8,-20.65,-10.6,4.5)),s=Ss(s,fu+.06,i*Do(n,t,-.45,3.9,-9.8,-6,1.85)),t>=-6)return s;let r=mn(n,t,Pc);if(!r)return s;let a=(1-Cc(t,-7.3,-6))*(1-Cc(r.distance,1.28,2.22));return Ss(s,r.height-.028,a)}function _m(n){let t=gm.map(l=>({width:.82,samples:du(l,n,Math.ceil(l.getLength()*8))})),e=n(...pu),i=n(...mu),s=du(mm,(l,h,u)=>Bt.lerp(e,i,u)+Math.sin(u*Math.PI)*.28,57),r=[...t[0].samples,...s.slice(1),...t[1].samples.slice(1)],o=fm(t,s,n);function a(l,h){for(let u=1;u<s.length;u++){let f=s[u-1],p=s[u];if(l>f.x||l<p.x)continue;let x=(l-f.x)/(p.x-f.x);if(Math.abs(h-Bt.lerp(f.z,p.z,x))<.6)return Bt.lerp(f.y,p.y,x)}return n(l,h)}function c(l){let h=[...l.values()].filter(m=>m.section.axis===Jt&&m.section.lo===-2&&m.direction===1&&m.index===0),u=h.find(m=>m.section.t===-5),f=h.find(m=>m.section.t===-4);if(!u||!f)return;let p=r.filter((m,d)=>d%5===0||d===r.length-1),x=m=>p.map((d,_)=>({x:d.x-d.dz*.17*m,z:d.z+d.dx*.17*m,id:`town-bridge:${m}:${_}`,section:{id:`town-bridge:${_}`,width:1,material:"dirt"},direction:m,index:0,links:[]})),g=[u,...x(1),...x(-1).reverse(),f];for(let m=1;m<g.length;m++)l.set(g[m].id,g[m]),g[m-1].links.push({id:g[m].id,crossing:!1})}return{group:o,height:a,connect:c,bridge:s,paths:t}}function ym({clearGround:n,editableScenery:t,showScenery:e,groundPalette:i}={}){return Vp({clearGround:n,editableScenery:t,showScenery:e,groundPalette:i,gradeGround:xm,showHillDetails:!1})}var qE=new Be({color:"#865c43"});function ni(n,t,e){let i=new zt,s=n*.67,r=n*.63,o=t===3?2:1,a=1.05,c="#f0d9ab",l="#89573d",h=r/2,u=h+.02,f=.49,p=a*o,x=t===3,g=p+.21,m=r+.36;$(i,s+.18,.12,r+.19,"#aa9575",0,0,0),$(i,s,p,.12,c,0,.12,-h);for(let v of[-1,1]){$(i,.12,p,r,c,v*s/2,.12,0);let E=(s-f)/2;$(i,E,p,.12,c,v*(f+E)/2,.12,h)}$(i,f,p-.75,.12,c,0,.87,h),$(i,s,.1,r,"#997352",0,p+.12,0),YE(i,s+.31,m,g,e,x);for(let v of[-1,1])for(let E of[-h,h])$(i,.12,.1,.13,"#bb9c72",v*s/2,.1,E),$(i,.095,p-.1,.095,"#bd956c",v*s/2,.2,E);if(x){$(i,s+.11,.07,.095,"#be9b76",0,a+.1,h);for(let v of[-1,1])$(i,.075,.07,r,"#be9b76",v*s/2,a+.1)}for(let v of[-f/2,f/2])$(i,.065,.77,.09,l,v,.12,u+.055);$(i,.59,.06,.1,l,0,.87,u+.045),$(i,.76,.11,.28,"#d1bb95",0,.008,u+.14),$(i,.65,.052,.19,"#dccaab",0,.005,u+.34),$(i,.7,.008,Math.max(.1,n/2-h-.25),"#c1ad80",0,.004,(n/2+h+.25)/2),$(i,f,.72,.04,"#544435",0,.12,h-.31);let d=new zt;d.userData.dynamic=!0,d.position.set(-f/2,.12,u+.055),$(d,f,.74,.057,l,f/2);for(let v of[.12,.34])$(d,.1,.55,.012,"#aa7652",v,.09,.033);$(d,.049,.042,.022,"#e5ba6b",.385,.32,.04),i.add(d),$E(i,u,x);let _=new _e({color:"#ffca73",emissive:"#ffb04a",emissiveIntensity:.3}),y=[];for(let v=0;v<o;v++){let E=.4+v*a;for(let S of[-1,1]){let w=S*s/2;$(i,.045,.43,.4,"#716746",w+S*.08,E,-.1);let R=new Nt(new Mn(.31,.33),_);R.position.set(w+S*.105,E+.214,-.1),R.rotation.y=S*Math.PI/2,i.add(R),$(i,.029,.35,.022,l,w+S*.119,E+.048,-.1),$(i,.12,.045,.45,"#a97b53",w+S*.1,E-.023,-.1)}for(let S of[-s*.32,s*.32]){$(i,.37,.43,.055,"#716746",S,E,h+.07);let w=new Nt(new Mn(.28,.33),_);w.position.set(S,E+.214,h+.101),i.add(w);let R=new zt;R.userData.dynamic=!0;let b=new Nt(new hr(.037,8),qE);b.position.y=.055,R.add(b),$(R,.087,.09,.001,"#865c43",0,-.065),R.position.set(S,E+.16,h+.104),i.add(R),y.push({figure:R,x:S}),$(i,.022,.35,.029,"#936344",S,E+.048,h+.114),$(i,.3,.023,.029,"#936344",S,E+.212,h+.114),$(i,.43,.05,.12,"#a97b53",S,E-.025,h+.1);for(let M of[-1,1]){let A=$(i,.085,.37,.037,x?"#68816b":"#946345",S+M*.21,E+.038,h+.09);A.rotation.y=M*.14;for(let I of[.1,.27])$(i,.086,.018,.043,x?"#9aab81":"#b58157",S+M*.21,E+I,h+.1)}v===0&&ZE(i,S,E-.105,h+.13)}}return{group:fe(i),hinge:d,lights:_,silhouettes:y,threshold:u,open:!1}}function YE(n,t,e,i,s,r){let o=r?.63:.55,a=e/2,c=Math.atan2(o,a),l=new gt(s).lerp(new gt("#795042"),.24).getStyle(),h=new gt(s).lerp(new gt("#f3c48a"),.28).getStyle();$n(n,t,o,e,s,0,i);let u=de(n,.045,.049,t+.04,l,0,0,0,8);u.position.y=i+o,u.rotation.z=Math.PI/2;for(let f of[-1,1]){for(let x of[-t/2,t/2]){let g=$(n,.057,.057,Math.hypot(a,o),l,x,i+o/2-.028,f*a/2);g.rotation.x=f*c}$(n,t+.06,.064,.058,l,0,i-.032,f*a);let p=r?4:3;for(let x=1;x<=p;x++){let g=x/(p+1),m=f*a*g,d=i+o*(1-g),_=$(n,t-.14,.017,.026,l,0,d+.005,m);_.rotation.x=f*c;for(let y of x%2?[-.29,.18]:[-.12,.34]){let v=$(n,t*.2,.018,a*.11,h,t*y,d+.025,m+.04*f);v.rotation.x=f*c}}}if($(n,.23,.46,.25,"#a87557",t*.28,i+o*.56,-a*.33),$(n,.3,.065,.31,"#dbad82",t*.28,i+o*.56+.46,-a*.33),$(n,.14,.012,.15,"#725342",t*.28,i+o*.56+.524,-a*.33),r){let f=-t*.16,p=a*.53,x=i+o*.3;$(n,.42,.42,.46,"#e3c69e",f,x,p),$(n,.19,.23,.036,"#69776a",f,x+.108,p+.233),$n(n,.55,.18,.52,l,f,x+.42,p).rotation.y=Math.PI/2}}function $E(n,t,e){let s=$(n,e?.94:.73,.075,.43,e?"#a76a4c":"#aa7951",0,.95,t+.19);if(s.rotation.x=.16,e)for(let o of[-.41,.41])$(n,.059,.83,.062,"#956f4d",o,.12,t+.34);$(n,.16,.019,.06,"#7e5c41",-.35,.84,t+.096);let r=new Nt(new He(.071,.105,.071),le("#edbc69",{emissive:"#b77937"}));r.position.set(-.35,.774,t+.116),n.add(r),$(n,.13,.045,.1,"#8b6949",-.35,.82,t+.11)}function ZE(n,t,e,i){$(n,.37,.096,.13,"#976849",t,e,i),$(n,.31,.045,.1,"#77925e",t,e+.09,i);for(let s of[-.1,0,.1])$(n,.045,.035,.045,"#ebba79",t+s,e+.13,i)}function xu(n){let t=new zt,e="#e7d5b0",i="#d59a51",s="#f2dfba";$(t,2.65,.09,2.37,"#bdab8a"),$(t,2.28,1.72,1.64,e,0,.09,-.2),$n(t,2.52,.52,1.92,i,0,1.81,-.2),$(t,.88,1.85,.7,"#dfc79f",-.44,.09,.81),$n(t,.89,.39,1.11,"#dda25a",-.44,1.94,.82).rotation.y=Math.PI/2,$(t,.78,.075,.23,"#d3b389",-.44,.03,1.25),$(t,.31,.67,.048,"#815f45",-.44,.11,1.17);for(let r of[.34,1.1]){vm(t,.6,r,.626,s);for(let o of[-.65,.15])$(t,.047,.47,.29,s,1.15,r,o),$(t,.058,.37,.2,"#655f53",1.169,r+.05,o)}return vm(t,-.44,1.12,1.17,s),$(t,.84,.085,.1,"#b89163",-.44,.95,1.15),$(t,.2,.36,.23,"#c19872",.74,1.95,-.57),$(t,.26,.049,.28,"#f0d8af",.74,2.31,-.57),fe(t),t.scale.setScalar(n/3),t}function vm(n,t,e,i,s){$(n,.34,.45,.044,s,t,e,i),$(n,.23,.34,.055,"#655f53",t,e+.055,i+.015),$(n,.36,.045,.083,"#c9a77b",t,e-.025,i+.02)}function Uo(n){let t=new zt,e="#78543c",i="#aa7b50",s="#6c8152";$(t,3.44,.12,2.5,"#b3a381",0,.01,.1),$(t,2.94,1.15,1.81,i,0,.13,-.18),$n(t,3.28,.73,2.12,s,0,1.26,-.18);for(let r of[-1,1]){$(t,3.28,.08,.07,"#4f6240",0,1.24,-.18+r*1.06);for(let o of[-1.38,-.51,.51,1.38])$(t,.076,1.12,.07,e,o,.14,-.18+r*.915)}for(let r of[.35,.55,.75,.95])$(t,.023,.025,1.78,e,1.479,r,-.18);for(let r of[-1.05,-.72,.76,1.15])$(t,.25,.43,.068,e,r,.52,.75),$(t,.16,.31,.074,"#6b7d6a",r,.577,.768);$(t,.39,.75,.078,"#604733",0,.14,.757),$(t,1.5,.1,.72,"#c29c6e",0,.06,1.13),$(t,1.36,.065,.22,"#d1ac7d",0,.025,1.55);for(let r of[-.62,.62])$(t,.085,.98,.082,e,r,.15,1.38);return $n(t,.92,.36,1.52,"#778a5c",0,1.07,1.08).rotation.y=Math.PI/2,$(t,.25,.54,.27,"#947359",.92,1.54,-.46),$(t,.31,.073,.32,"#b29672",.92,2.07,-.46),fe(t),t.scale.setScalar(n/4),t}function bm(n){let t=new zt,e="#e5d9be",i="#f3e5c9",s="#51787b";$(t,3.28,.1,2.82,"#c4b59a",0,0,.09),$(t,2.73,1.24,1.8,e,-.16,.1,-.25),$n(t,2.94,.61,2.03,s,-.16,1.34,-.25);for(let l of[-1.22,-.66,-.1])$(t,.072,1.14,.07,i,l-.22,.11,.66),Mm(t,l,.55,.66);let r=.98,o=.62;$(t,.85,2.11,.81,e,r,.1,o);for(let l of[.73,1.65,2.12])$(t,.92,.065,.88,i,r,l,o);Mm(t,r,1.74,o+.41),$(t,.069,.34,.19,"#646957",r+.423,1.77,o),$(t,.38,.59,.055,"#8b694e",r,.1,o+.422),$(t,.71,.075,.31,"#c6b390",r,.014,1.18);let a=new co([[.45,0],[.43,.09],[.34,.2],[.24,.3],[.12,.42],[.075,.5],[0,.56]].map(([l,h])=>new Tt(l,h)),12),c=new Nt(a,le(s));return c.position.set(r,2.2,o),t.add(c),de(t,.017,.029,.22,"#a98a52",r,2.73,o,7),$(t,.13,.027,.025,"#a98a52",r,2.86,o),fe(t),t.scale.setScalar(n/4),t}function Mm(n,t,e,i){$(n,.24,.32,.041,"#b7aa90",t,e,i),$(n,.16,.23,.039,"#657d7a",t,e+.04,i+.023);let s=de(n,.08,.08,.041,"#657d7a",t,e+.242,i+.023,12);s.rotation.x=Math.PI/2,$(n,.019,.3,.048,"#b7aa90",t,e+.045,i+.034)}var JE="#ddd0b8",Kn="#f5e7ce",Em="#8e8072",Lc="#536364",ws=.81;function wm(n){let t=new zt;$(t,4.54,.065,3.02,"#cebea0",0,0,.17),$(t,2.14,1.81,1.48,"#cbbda4",.5,.065,-1.19),$(t,2.25,.08,1.56,Em,.5,1.875,-1.19);for(let e of[-.59,1.59])$(t,.085,.11,1.56,Kn,e,1.95,-1.19);$(t,2.22,.11,.075,Kn,.5,1.95,-1.94);for(let e of[-1.63,-1.18,-.72])$(t,.06,.61,.24,Lc,1.585,.95,e),$(t,.075,.64,.025,Kn,1.592,.94,e);$(t,4.28,1.72,1.51,JE,0,.065,.04),$(t,4.4,.08,1.62,Em,0,1.785,.04);for(let e of[-.73,.81])$(t,4.41,.13,.07,Kn,0,1.865,e);for(let e of[-2.17,2.17])$(t,.07,.13,1.57,Kn,e,1.865,.04);$(t,4.31,.07,.058,Kn,0,.87,ws);for(let e of[-1.78,-1.19,-.6,0,.6,1.19,1.78])Math.abs(e)>.75&&Sm(t,e,.29),Sm(t,e,1.1);for(let e of[.29,1.1])for(let i of[-.4,.29])$(t,.038,.41,.3,Kn,2.15,e,i),$(t,.052,.34,.23,Lc,2.166,e+.036,i);for(let e of[-1.4,0,1.4])$(t,.33,.125,.22,"#716357",e,1.865,-.25);$(t,1.32,.12,.68,"#bc9e80",0,.01,1.22),$(t,1.48,.063,.29,"#dcc8a4",0,.007,1.61),$(t,.76,.65,.07,"#785745",0,.126,ws);for(let e of[-.19,.19])$(t,.23,.29,.022,Lc,e,.42,.854);for(let e of[-.6,.6])$(t,.075,.69,.075,Kn,e,.13,1.42);$(t,1.37,.09,.72,"#bda58a",0,.82,1.16),$(t,.62,.15,.04,"#6b8e90",0,.97,ws+.01);for(let e of[-1.61,1.61])$(t,.64,.1,.28,"#af946e",e,.065,1.18),$(t,.54,.16,.18,"#849353",e,.164,1.18);return fe(t),t.scale.setScalar(n/5),t}function Sm(n,t,e){$(n,.38,.45,.048,Kn,t,e,ws),$(n,.3,.36,.053,Lc,t,e+.044,ws+.011),$(n,.025,.37,.059,Kn,t,e+.04,ws+.025),$(n,.31,.024,.059,Kn,t,e+.22,ws+.025)}var zo="#f4d9a0",_u="#d1d7c4",KE=2.78,jE=1.9;function Am(n){let t=new zt;$(t,2.96,.065,2.15,"#bea68a"),$(t,KE,.023,jE,"#ce8c74",0,.065);for(let e of[-.86,.86])$(t,2.6,.005,.018,zo,0,.089,e);for(let e of[-1.3,0,1.3])$(t,.018,.005,1.73,zo,e,.089);Tm(t,.24,0,0);for(let e of[-1,1]){for(let s of[-.28,.28])$(t,.56,.005,.016,zo,e*1.02,.089,s);$(t,.016,.005,.56,zo,e*.74,.089),Tm(t,.28,e*.74,0,e<0?-Math.PI/2:Math.PI/2,Math.PI),de(t,.018,.024,.68,_u,e*1.37,.086,0,8),$(t,.035,.14,.29,"#f4efe1",e*1.27,.63),$(t,.11,.029,.025,"#9e7155",e*1.32,.65);let i=new Nt(new ur(.056,.009,6,12),le("#b46a4c"));i.rotation.x=-Math.PI/2,i.position.set(e*1.2,.644,0),t.add(i)}return No(t,-1.42,-.98,1.42,-.98,10),No(t,-1.42,-.98,-1.42,.98,7),No(t,1.42,-.98,1.42,.98,7),No(t,-1.42,.98,-.24,.98,5),No(t,.24,.98,1.42,.98,5),fe(t),t.scale.setScalar(n/3),t}function Tm(n,t,e,i,s=0,r=Math.PI*2){let o=new Nt(new ls(t-.013,t,24,1,s,r),le(zo));o.rotation.x=-Math.PI/2,o.position.set(e,.091,i),n.add(o)}function No(n,t,e,i,s,r){let o=i-t,a=s-e,c=a===0,l=Math.hypot(o,a),h=(t+i)/2,u=(e+s)/2;for(let f of[.15,.53])$(n,c?l:.026,.026,c?.026:l,_u,h,f,u);for(let f=0;f<=r;f++){let p=f/r,x=f===0||f===r,g=x?.045:.017;$(n,g,x?.5:.39,g,_u,t+o*p,x?.086:.15,e+a*p)}}function Cm(n){let t=new zt,e="#bc9364";$(t,2.82,.045,2.66,"#bfa279"),$(t,2.16,.16,1.79,"#ccba99",0,.045,-.24),$(t,2.09,.58,.09,"#dec8a4",0,.2,-1.08),$(t,.09,.52,1.78,"#d3ba93",-1.03,.2,-.23);for(let i of[-1,0,1])for(let s of[-1.06,.62])$(t,.095,1.02,.095,e,i,.2,s);$(t,2.18,.085,.12,e,0,1.17,-.99),$(t,2.18,.085,.12,e,0,1.17,.56),$(t,2.27,.07,.086,"#cfa371",0,1.86,-.22);for(let i of[-1.05,-.69,-.34,0,.34,.69,1.05])Rm(t,i,-.22,-1.14),Rm(t,i,-.22,.7);for(let i of[1.01,1.14,1.27])$(t,.75,.085,.105,"#a98058",.69,.045,i);return $(t,.54,.075,.105,e,.65,.13,1.14),fe(t),t.scale.setScalar(n/3),t}function Rm(n,t,e,i){let s=i-e,r=.65,o=$(n,.063,.066,Math.hypot(s,r),"#d4aa77",t,1.505,(e+i)/2);o.rotation.x=Math.atan2(r,s)}var An={grass:"#9fd486",grassDark:"#86c06c",dirt:"#b98a5e",dirtDark:"#8a6342",soil:"#d2b48c",road:"#5d6470",roadDirt:"#c9a37a",line:"#f4f1e8",sidewalk:"#e7dfd2",curb:"#cfc5b6",plaza:"#efe6d6",wallCream:"#f3e7d3",wallPeach:"#f2c9a8",wallMint:"#cfe7d6",wallSky:"#cfe0f0",wallBrick:"#d98c6a",wallWhite:"#f7f5f0",roofRed:"#d9654b",roofBlue:"#5f86b5",roofGreen:"#6aa36f",roofGray:"#8d96a3",trim:"#ffffff",wood:"#a8784d",woodDark:"#7a5534",glass:"#a9d6e5",door:"#8c5a3c",metal:"#9aa3ad",metalDark:"#5b6470",leaf:"#6fbf6a",leafDark:"#4f9d57",leafLight:"#93d27d",trunk:"#8b5e3c",flowerPink:"#f29bb8",flowerYellow:"#f7d35c",water:"#7cc6e6",sand:"#ecd9a6",busYellow:"#f4b740",carRed:"#e0604f",carBlue:"#5f8fd0",scaffold:"#e8a23a",crane:"#f2c14e"},Pm=["#f9dcc4","#f1c7a5","#e3ad86","#c98f66","#9c6b4c"],Im=["#2b2522","#4a3426","#7a4b2a","#c98a4b","#e6c27a","#5b6b8c","#b05a6a"],Lm=["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8","#4db6ac","#f06292","#fff176","#90a4ae"],Dm=["#455a64","#5d4037","#3949ab","#6d4c41","#37474f","#8d6e63"];function Ts(n,t,e,i){let s=new zt;$(s,1,.07,.36,An.wood,0,.32,0),$(s,1,.3,.06,An.wood,0,.42,-.17);for(let r of[-.42,.42])$(s,.06,.32,.32,An.metalDark,r,0,0);s.position.set(t,0,e),s.rotation.y=i,n.add(s)}function yu(n,t,e,i,s,r=An.flowerPink){En(n,i,.18,s,An.wood,t,0,e,.03),$(n,i-.12,.2,s-.12,An.soil,t,0,e);let o=Math.max(2,Math.round(i*s/.12));for(let a=0;a<o;a++){let c=t+(a*.618%1-.5)*(i-.3),l=e+((a*.381+.2)%1-.5)*(s-.3);np(n,.07,a%3===0?An.flowerYellow:r,c,.2,l,0)}}var QE=le("#d6ad6b"),tS=le("#efc574"),Um=new Be({color:"#ffc47b",map:eS(),transparent:!0,depthWrite:!1,opacity:.48});Um.visible=!1;function un(n,t,e,i,s=0,r=0,o=.032,a=0){return $(n,t,o,e,i,s,a,r)}function Oo(n,t,e,i,s=1){let r=uc(t,s,e*.73+i*.41);r.position.set(e,.025,i),n.add(r)}function Fo(n,t,e,i,s,r){let o=an(r),a=le("#82974d");for(let c=0;c<s;c++){let l=new pi(.045+o()*.026,.12+o()*.13,3),h=new Nt(l,a);h.position.set(t+(o()-.5)*i,.085,e+(o()-.5)*i),h.rotation.z=(o()-.5)*.65,n.add(h)}}function Nm(n,t,e,i,s=.42,r=.47,o=!1){let a=o?"#826d52":"#a58b69";if($(n,s+.13,r+.11,.09,a,t,e-.04,i),$(n,s,r,.04,"#534b3d",t,e,i+.056),o){let c=$(n,s*1.06,.085,.052,"#ae875c",t,e+.13,i+.094);c.rotation.z=-.27}else{let c=new Nt(new Mn(s-.035,r-.05),QE);c.position.set(t,e+r/2,i+.078),n.add(c),$(n,.027,r,.031,a,t,e,i+.085),$(n,s,.025,.032,a,t,e+r*.5,i+.085)}$(n,s+.18,.058,.15,a,t,e-.07,i+.055)}function Rr(n,t,e,i=.92){de(n,.029,.052,i,"#65594c",t,0,e,7);let s=new Nt(new He(.15,.17,.15),tS);s.position.set(t,i+.05,e),n.add(s),$(n,.19,.055,.19,"#574d3f",t,i+.13,e);let r=new Nt(new Mn(1.84,1.84).rotateX(-Math.PI/2),Um);r.position.set(t,.071,e),n.add(r)}function eS(){let t=new Uint8Array(4096);for(let i=0;i<32;i++)for(let s=0;s<32;s++){let r=(s+i*32)*4,o=Math.hypot(s-31/2,i-31/2)/(32/2);t.set([255,255,255,Math.round(Math.max(0,1-o)**2*255)],r)}let e=new lr(t,32,32);return e.magFilter=e.minFilter=on,e.needsUpdate=!0,e}function zm(n,t,e,i,s,r="bus"){if(de(n,.031,.038,i,"#806950",t,0,e,7),$(n,.39,.27,.065,s,t,i-.07,e),r==="bus"){$(n,.23,.11,.019,"#f6e0b6",t,i+.003,e+.038);for(let o of[-.072,.072])$(n,.064,.043,.022,s,t+o,i+.046,e+.05),$(n,.04,.03,.023,"#615746",t+o,i-.017,e+.05)}}var nS=[[-1.3,.93],[1.28,.93]];function Om(n){let t=new zt;if(un(t,4.95,4.1,n===0?"#a7aa69":"#aebc77"),n===0){un(t,.72,2.47,"#b79c6e",-.33,.5,.022,.03).rotation.y=-.25,Oo(t,"broadleaf",-1.36,-.59,.79),de(t,.27,.34,.19,"#997a4c",.98,.021,-.88,8);for(let[e,i]of[[.7,.91],[-1.34,1.2],[1.5,-.18],[-.48,-1.47]])Fo(t,e,i,.54,11,34+e*13);return t}un(t,n>=2?.91:.68,3.77,n>=2?"#d5c298":"#c7af7d",0,0,.025,.033),un(t,4.34,n>=2?.74:.6,n>=2?"#d5c298":"#c7af7d",0,.58,.025,.032);for(let[e,i]of nS.slice(0,n===1?1:2))Ts(t,e,i,0);if(Oo(t,n>=2?"oak":"umbrella",-1.48,-.94,n>=2?.95:.82),n===1)return Oo(t,"shrub",1.4,-.75,.65),t;if(yu(t,-1.38,1.58,1.18,.39,"#d3a17b"),yu(t,1.38,1.58,1.18,.39,"#e4b668"),Rr(t,-.83,-.04),Rr(t,.88,-.04),n===2){for(let e of[.86,1.82])for(let i of[-1.43,-.54])$(t,.075,.96,.075,"#886c4e",e,.03,i);for(let e of[-1.47,-1.23,-.99,-.75,-.51])$(t,1.15,.08,.071,"#937252",1.34,1,e);Ts(t,1.34,-1.1,0)}else{de(t,.59,.63,.19,"#ae9b7f",0,.056,-.77,22),de(t,.5,.5,.029,"#669eab",0,.246,-.77,22),de(t,.078,.12,.41,"#baaa8f",0,.255,-.77,12),de(t,.215,.104,.087,"#c7b796",0,.651,-.77,16),un(t,1.31,.95,"#c6aa75",1.35,-.99,.038,.04);for(let e of[.92,1.75])$(t,.066,.93,.067,"#7a8064",e,.09,-1.04);$(t,.95,.065,.067,"#7a8064",1.34,1.01,-1.04);for(let e of[1.22,1.45])$(t,.019,.64,.02,"#a28562",e,.37,-1.04);$(t,.36,.042,.21,"#ad7851",1.34,.36,-1.04),Oo(t,"golden",1.9,-.18,.62)}return t}function Fm(n){let t=new zt;if(un(t,5.13,3.83,n<=1?"#b7ac78":"#c9b491"),un(t,5.12,1.12,["#bc9d6c","#bc9d6c","#a49a88","#726e65"][n],0,1.35,.025,.033),n===0){un(t,3.24,.61,"#bba477",0,.38,.026,.035);for(let r of[-1.3,1.55])$(t,.084,.44,.085,"#916d48",r,.037,.24);return Fo(t,1.26,-.69,1.19,23,42),t}if(zm(t,1.91,.47,.83,n===1?"#8a7754":"#627f75"),Ts(t,-.67,.29,0),n===1)return un(t,2.77,.66,"#c8b280",-.32,.37,.027,.033),Fo(t,-1.92,-.13,.76,12,83),t;un(t,4.42,1.39,"#dbc6a1",0,.08,.077,.031);let e=n===3?4.36:2.83,i=n===3?0:-.63,s=n===3?1.56:1.15;$(t,e,.105,n===3?1.5:1.13,"#5d7c74",i,s,-.15),$(t,e+.04,.18,.085,"#73918a",i,s-.045,.59-(n===2?.16:0));for(let r of[i-e*.44,i+e*.44,...n===3?[0]:[]])for(let o of[-.65,.44])$(t,.085,s-.01,.085,"#9a9074",r,.04,o);if(n===2)return $(t,2.65,.65,.075,"#a9ad91",-.63,.12,-.64),t;$(t,1.16,1.16,.91,"#d9c9a6",-1.38,.08,-.71),Nm(t,-1.38,.58,-.23,.49,.34),Ts(t,1.05,.29,0);for(let r of[-1.48,1.48])un(t,1.95,.035,"#e4d2a7",r,.94,.006,.063),un(t,1.95,.035,"#e4d2a7",r,1.76,.006,.063),un(t,.036,.85,"#e4d2a7",r+.95,1.35,.006,.063);return Rr(t,-2.14,.71,1.22),Rr(t,2.14,.71,1.22),t}var Bm=[["Nh\xE0 th\u1ECB tr\u01B0\u1EDFng",1.2,-2.55,1,()=>ni(2.8,1,"#c28b59").group],["Nh\xE0 hai t\u1EA7ng",3.7,-2.58,.87,()=>xu(3)],["Nh\xE0 g\u1ED7",7.17,-2.55,.66,()=>Uo(3)],["Nh\xE0 \u1EDF",9.62,-2.55,.98,()=>ni(2.85,3,"#a96244").group],["Nh\xE0 nguy\u1EC7n",1.65,-8.05,.73,()=>bm(3),0,[1.65,-6]],["C\xF4ng vi\xEAn",9.28,8.28,.51,()=>Om(1),Math.PI],["Tr\u01B0\u1EDDng h\u1ECDc",6.92,2.96,.69,()=>wm(4.86)],["S\xE2n b\xF3ng",9.7,2.75,.72,()=>Am(3)],["C\xF4ng tr\xECnh \u0111ang x\xE2y",.35,8.18,.66,()=>Cm(3),Math.PI],["B\u1EBFn xe",3.6,8.14,.59,()=>Fm(1),Math.PI],["Nh\xE0 \u1EDF",6.65,8.2,.8,()=>ni(2.85,1,"#7d8758").group,Math.PI],["Nh\xE0 ven s\xF4ng",-6.85,-3.3,.87,()=>ni(2.8,1,"#a96344").group,0,[-6.85,-1.75]],["Nh\xE0 ven s\xF4ng",-5.35,-7.12,.85,()=>ni(2.85,1,"#84915e").group,0,[-5.35,-5.7]],["X\u01B0\u1EDFng g\u1ED7 ven s\xF4ng",-6.3,-.45,.72,()=>Uo(3),Math.PI,[-6.3,-1.78]],["Nh\xE0 b\xEAn kia s\xF4ng",-21,-3.65,.86,()=>ni(2.8,1,"#c18e52").group,-Math.PI/2,[-22.45,-3.65]],["Nh\xE0 b\xEAn kia s\xF4ng",-20.2,-1.83,.71,()=>ni(2.85,3,"#9d654b").group,0,[-20.2,-.14]],["Nh\xE0 g\u1ED7 b\u1EDD t\xE2y",-20.55,-7.55,.74,()=>Uo(3),-Math.PI/2,[-22.05,-7.55]],["Nh\xE0 tr\xEAn \u0111\u1ED3i",6.35,-15.25,.86,()=>ni(2.85,3,"#ab6b49").group,0,[6.35,-14.2]],["Nh\xE0 ng\u1EAFm thung l\u0169ng",7.2,-11.52,.69,()=>xu(3),Math.PI,[7.2,-13.35]],["Nh\xE0 sau \u0111\u1ED3i",6.55,-19.25,.84,()=>ni(2.8,1,"#a98446").group,0,[6.55,-17.85]],["Nh\xE0 g\u1ED7 sau \u0111\u1ED3i",8.8,-19.27,.69,()=>Uo(3),0,[8.8,-17.58]]];function km(n,t,e){return Bm.some(([,i,s])=>Math.abs(i-n)<1.22+e&&Math.abs(s-t)<1.06+e)}function Hm(n,t){let e=new zt;e.name="C\xF4ng tr\xECnh th\u1ECB tr\u1EA5n";let i=[],s=new _e({color:"#bc9e6e",roughness:1,side:Ie});for(let[c,l,h,u,f,p=0,x]of Bm){let g=f();g.scale.setScalar(u),g.rotation.y=p,g.position.set(l,0,h);let{min:m,max:d}=new Xn().setFromObject(g,!0),_=[0,.5,1].flatMap(N=>[0,.5,1].map(H=>n(Bt.lerp(m.x,d.x,N),Bt.lerp(m.z,d.z,H)))),y=Math.min(..._),v=Math.max(..._),E=v+.018,S=new zt;$(S,d.x-m.x,E-y+.03,d.z-m.z,"#b5a182",(m.x+d.x)/2,y-.03,(m.z+d.z)/2),g.position.y=E,g.name=c,e.add(S,g),i.push({name:c,min:m,max:d,model:g,groundRise:v-y});let[w,R]=x??[l,p?7:h<0?-1:5],b=Bt.clamp(w,m.x,d.x),M=Bt.clamp(R,m.z,d.z),A=[],I=Math.ceil(Math.hypot(w-b,R-M)*8),z=Math.atan2(R-M,w-b),P=Math.sin(z)*.19,D=-Math.cos(z)*.19;for(let N=0;N<I;N++)for(let[H,G]of[[N,-1],[N,1],[N+1,1],[N,-1],[N+1,1],[N+1,-1]]){let V=Bt.lerp(b,w,H/I)+P*G,O=Bt.lerp(M,R,H/I)+D*G;A.push(V,n(V,O)+.035,O)}if(A.length){let N=new ae().setAttribute("position",new qt(A,3));N.computeVertexNormals();let H=new Nt(N,s);H.receiveShadow=!0,e.add(H)}}let r=({x:c,z:l})=>i.find(({min:h,max:u})=>c<u.x&&c+1>h.x&&l<u.z&&l+1>h.z),o=({x:c,z:l})=>{let h=[0,.5,1].flatMap(u=>[0,.5,1].map(f=>n(c+u,l+f)));return{low:Math.min(...h),high:Math.max(...h),rise:Math.max(...h)-Math.min(...h)}};function a(c){return r(c)?"\xD4 n\xE0y c\xF3 c\xF4ng tr\xECnh.":!((c.x===7||c.x===8)&&(c.z===-5||c.z===-6))&&c.z<-6&&t(c.x+.5,c.z+.5,.2)?"Ch\u1EEBa l\u1ED1i hi\u1EC7n c\xF3 tr\xEAn \u0111\u1ECBa h\xECnh.":[0,1].some(h=>[0,1].some(u=>Er(c.x+h,c.z+u)<.25))?"Ch\u1EEBa kho\u1EA3ng \u0111\u1EC7m \u1EDF b\u1EDD n\u01B0\u1EDBc.":o(c).rise>.8?"\xD4 qu\xE1 d\u1ED1c \u0111\u1EC3 v\u1EBD \u0111\u01B0\u1EDDng.":""}return{group:e,buildings:i,overlaps:r,measure:o,error:a}}var iS=[[-2,-6,12,-6],[-2,-5,12,-5],[-2,-1,12,-1],[-2,0,12,0],[-2,5,12,5],[-2,6,12,6],[-2,-6,-2,6],[-1,-6,-1,6],[11,-6,11,6],[12,-6,12,6],[5,-5,5,-1],[7,-6,7,-5],[8,-6,8,-5]];function vu(n){let t=new Map;for(let[e,i,s,r]of iS)t=yr(t,{x:e,z:i},{x:s,z:r},"dirt",()=>"").roads;return n>=2&&(t=yi(t,[...t.values()].filter(e=>e.z===-1||e.z===0),"stone")),n>=3&&(t=yi(t,[...t.values()].filter(e=>e.z===5||e.z===6),"asphalt")),t}function Gm(){let n=[...vu(1).values()];return(t,e,i)=>n.some(s=>Math.hypot(Math.max(s.x-t,0,t-s.x-1),Math.max(s.z-e,0,e-s.z-1))<i)}function Vm(n){let t=(e,i,s,r)=>[...n.values()].find(o=>o.section.axis===e&&o.section.t===i&&o.section.lo===s&&o.direction===r&&o.index===0)?.id;return[{origin:t(St,1,-6,1),destination:"hill:turn"},{origin:t(St,7,5,-1),destination:t(Jt,2,-2,-1)}]}function Wm(n){let t=new Set(n.map(ht)),e=[];for(let{x:i,z:s}of n)for(let[r,o,...a]of[[-1,0,i,s,i,s+1],[1,0,i+1,s,i+1,s+1],[0,-1,i,s,i+1,s],[0,1,i,s+1,i+1,s+1]])t.has(ht({x:i+r,z:s+o}))||e.push(a);return e}function Cr(n,[t,e,i,s],r,o,a=!1){for(let c=0;c<o;c+=a?2:1)for(let l of[c/o,(c+1)/o]){let h=Bt.lerp(t,i,l),u=Bt.lerp(e,s,l);n.push(h,r(h,u),u)}}function Mu(n,t,e,i,s=ir){let r=new ae().setAttribute("position",new qt(n,3)),o=new Dn({color:t,transparent:!0,opacity:e,depthWrite:!1,depthFunc:s}),a=new qn(r,o);return a.renderOrder=i,a}function Xm({core:n,transition:t,targetY:e,targetAt:i},s,r){let o=new zt;if(n.length){let a=i??(()=>e),c=Es(n.map(u=>({...u,color:"#76e8ff"})),a,{opacity:.22,elevation:0,order:4});c.material.polygonOffset=!0,c.material.polygonOffsetFactor=-1,c.material.polygonOffsetUnits=-1;let l=[],h=[];for(let u of Wm(n))Cr(l,u,a,i?8:1),Cr(h,u,a,8,!0);o.add(c,Mu(l,"#a3f5ff",.98,8),Mu(h,"#a3f5ff",.7,8,Th))}if(t.length){let a=[],c=(l,h)=>s(l,h)+.1;for(let l of Wm(t))Cr(a,l,c,8,!0);if(r)for(let{x:l,z:h}of t)Cr(a,[l+.12,h+.56,l+.55,h+.13],c,4),Cr(a,[l+.18,h+.87,l+.87,h+.18],c,5),Cr(a,[l+.45,h+.87,l+.88,h+.44],c,4);o.add(Mu(a,r?"#ffeb90":"#e7d6a6",r?.9:.6,7))}return o}var bu=.28,Bo=(n,t)=>n[Math.floor(t()*n.length)];function qm(n=Math.random){return{skin:Bo(Pm,n),hair:Bo(Im,n),shirt:Bo(Lm,n),pants:Bo(Dm,n),style:Bo(["short","long","bun","cap"],n),bag:n()<.35}}var Re={head:new pn(.2,20,14),hairCap:new pn(.215,20,10,0,Math.PI*2,0,Math.PI*.55),eye:new pn(.026,8,6),cheek:new pn(.03,8,6),torso:new lo(.13,.12,4,12),limb:new lo(.045,.1,4,8),hand:new pn(.048,8,6),shoe:new He(.09,.05,.14),bun:new pn(.08,10,8),bag:new He(.2,.2,.09),brim:new dn(.16,.16,.02,14),book:new He(.2,.14,.03),spike:new pi(.055,.13,5),hatCrown:new dn(.16,.19,.13,14),hatBrim:new dn(.29,.29,.02,18),lens:new ur(.045,.009,6,14),bridge:new He(.05,.012,.012)};function Se(n,t,e,i,s,r){let o=new Nt(t,le(e));return o.position.set(i,s,r),n.add(o),o}function Dc(n,t,e,i,s,r,o){let a=new zt;if(a.position.set(t,e,0),n.add(a),!r)return Se(a,Re.limb,i,0,-.09,0),Se(a,Re.hand,s,0,-.2,0),{joint:a};Se(a,Re.limb,o,0,-.07,0);let c=new zt;return c.position.y=-.13,a.add(c),Se(c,Re.limb,o,0,-.06,0),Se(c,Re.shoe,"#3a3f47",0,-.13,.02),{joint:a,knee:c}}function Ym(n){let t=new zt;t.add(Fh(.22));let e=new zt;e.position.y=bu,t.add(e),Se(e,Re.torso,n.shirt,0,.16,0).scale.set(1,1,.78),Se(e,Re.torso,n.pants,0,.05,0).scale.set(1.02,.45,.8),n.bag&&Se(e,Re.bag,"#8d6e63",0,.2,-.12);let i=new zt;i.position.y=.33,e.add(i),Se(i,Re.head,n.skin,0,.18,0);let s=Se(i,Re.hairCap,n.style==="cap"?"#e05a4f":n.hair,0,.19,-.012);if(s.rotation.x=-.25,n.style==="long"&&Se(i,new He(.36,.26,.12),n.hair,0,.1,-.12),n.style==="bun"&&Se(i,Re.bun,n.hair,0,.38,-.08),n.style==="cap"&&Se(i,Re.brim,"#e05a4f",0,.27,.1).scale.set(1,1,.8),n.style==="spiky"){for(let f=0;f<6;f++){let p=f/6*Math.PI*2;Se(i,Re.spike,n.hair,Math.sin(p)*.09,.37,Math.cos(p)*.08-.03).rotation.set(Math.cos(p)*.55,0,-Math.sin(p)*.55)}Se(i,Re.spike,n.hair,0,.42,-.02)}if(n.accessory==="hat"&&(Se(i,Re.hatCrown,"#3f4a5a",0,.38,-.01),Se(i,Re.hatBrim,"#3f4a5a",0,.32,0),Se(i,Re.bridge,"#f4b740",0,.35,.17).scale.set(5.5,3,1)),n.accessory==="glasses"){for(let f of[-.07,.07])Se(i,Re.lens,"#2b2522",f,.17,.195);Se(i,Re.bridge,"#2b2522",0,.175,.2)}let r=[Se(i,Re.eye,"#2b2522",-.07,.17,.18),Se(i,Re.eye,"#2b2522",.07,.17,.18)];Se(i,Re.cheek,"#f4a3a3",-.12,.11,.16).scale.set(1,.6,.5),Se(i,Re.cheek,"#f4a3a3",.12,.11,.16).scale.set(1,.6,.5);let o=Dc(e,.17,.25,n.shirt,n.skin,!1,n.pants).joint,a=Dc(e,-.17,.25,n.shirt,n.skin,!1,n.pants).joint,c=Dc(e,.07,0,n.shirt,n.skin,!0,n.pants),l=Dc(e,-.07,0,n.shirt,n.skin,!0,n.pants),h=Se(e,Re.book,"#4a7bd0",0,.2,.2);h.rotation.x=-.5,h.visible=!1;let u=f=>r.includes(f)||f===h;for(let f of[e,i,o,a,c.joint,l.joint,c.knee,l.knee])ip(f,u);return{root:t,hips:e,head:i,armL:o,armR:a,legL:c.joint,legR:l.joint,kneeL:c.knee,kneeR:l.knee,eyes:r,book:h}}var Eu=()=>({legL:0,legR:0,kneeL:0,kneeR:0,armL:0,armR:0,outL:.08,outR:.08,bob:0,lean:0,nod:0,turn:0,book:!1});function $m(n,t,e,i){let s=Eu();switch(s.turn=i,n){case"walk":{let r=Math.sin(e);s.legL=r*.6,s.legR=-r*.6,s.kneeL=Math.max(0,r)*.7,s.kneeR=Math.max(0,-r)*.7,s.armL=-r*.55,s.armR=r*.55,s.bob=Math.abs(Math.cos(e))*.025,s.lean=.06,s.turn=0;break}case"idle":s.bob=Math.sin(t*2)*.006,s.armL=Math.sin(t*2)*.04,s.armR=-s.armL;break;case"sit":s.legL=s.legR=-1.45,s.kneeL=s.kneeR=1.35,s.kneeL+=Math.sin(t*3)*.15,s.kneeR-=Math.sin(t*3)*.15,s.bob=.19,s.armL=s.armR=-.35;break;case"read":s.armL=s.armR=-1.05,s.outL=s.outR=-.25,s.nod=.28+Math.sin(t*.7)*.04,s.book=!0;break;case"wave":s.outR=2.5+Math.sin(t*9)*.35,s.armR=-.2,s.turn=0;break;case"celebrate":{let r=Math.abs(Math.sin(t*6));s.outL=s.outR=2.6,s.bob=r*.12,s.kneeL=s.kneeR=(1-r)*.4,s.legL=s.legR=-(1-r)*.2;break}case"talk":s.armR=-.6+Math.sin(t*4)*.25,s.outR=.3+Math.sin(t*3)*.2,s.nod=Math.sin(t*5)*.06;break}return s}var sS=(n,t,e)=>n+(t-n)*e;function Zm(n,t,e,i,s){let r=Math.min(1,i*(s?8:14));for(let o of Object.keys(e))o!=="book"&&(t[o]=sS(t[o],e[o],r));t.book=e.book,n.legL.rotation.x=t.legL,n.legR.rotation.x=t.legR,n.kneeL.rotation.x=t.kneeL,n.kneeR.rotation.x=t.kneeR,n.armL.rotation.x=t.armL,n.armR.rotation.x=t.armR,n.armL.rotation.z=t.outL,n.armR.rotation.z=-t.outR,n.hips.position.y=bu+t.bob,n.hips.rotation.x=t.lean,n.head.rotation.x=t.nod,n.head.rotation.y=t.turn,n.book.visible=t.book}function Jm(n){let t=new zt;En(t,.85,.38,1.55,n,0,.12,0,.12),En(t,.72,.32,.85,n,0,.48,-.1,.1),$(t,.74,.22,.7,An.glass,0,.52,-.1);for(let[e,i]of[[-.4,.5],[.4,.5],[-.4,-.5],[.4,-.5]]){let s=de(t,.15,.15,.12,"#2d3138",e,0,i,10);s.rotation.z=Math.PI/2,s.position.y=.15}return $(t,.12,.08,.04,"#fff6c8",-.28,.3,.78),$(t,.12,.08,.04,"#fff6c8",.28,.3,.78),fe(t)}function Km(){let n=new zt;En(n,1.1,1.15,3,An.busYellow,0,.15,0,.14),$(n,1.14,.38,2.5,"#3b4654",0,.75,-.1),$(n,1,.45,.05,An.glass,0,.65,1.5),$(n,1.14,.1,3,An.trim,0,.45,0);for(let[t,e]of[[-.5,1],[.5,1],[-.5,-1],[.5,-1]]){let i=de(n,.2,.2,.14,"#2d3138",t,0,e,10);i.rotation.z=Math.PI/2,i.position.y=.2}return fe(n)}var OT=2+.35;function jm(n){let t=new zt;for(let i of[-.125,.125]){let s=de(t,.057,.057,.029,"#333637",0,.057,i,10);s.rotation.z=Math.PI/2}$(t,.105,.077,.25,n,0,.09,0),$(t,.079,.03,.125,"#454039",0,.145,-.057),$(t,.036,.085,.033,n,0,.14,.09),$(t,.147,.017,.022,"#494b47",0,.194,.096),$(t,.042,.032,.027,"#fff2c5",0,.148,.126),$(t,.09,.09,.059,"#566257",0,.192,-.045);let e=new Nt(new pn(.055,8,6),new _e({color:"#f1db9e"}));return e.position.set(0,.27,-.032),t.add(e),fe(t)}var Qm=(n,{x:t,z:e},i)=>n.x>t-i&&n.x<t+1+i&&n.z>e-i&&n.z<e+1+i,eg="east:turn",oS=["hill:turn","west:turn"];function tg(n,t,e,i,s){let r=[...n.values()].find(c=>c.section.axis===e&&c.section.t===i&&c.section.lo<=s&&c.section.hi>=s&&c.section.width>=2&&c.direction===1&&c.index===0&&!c.links.length);if(!r)return;let o=n.get(`${r.section.id}:-1:0`);if(!o?.links.length)return;let a={...r,id:t,links:[{id:o.id,crossing:!1}],x:(r.x+o.x)/2+(e===St?.31:0),z:(r.z+o.z)/2+(e===Jt?.31:0)};n.set(t,a),r.links.push({id:t,crossing:!1})}function Su(n,t,e){if(!n.has(t)||!n.has(e))return null;let i=new Map([[t,null]]),s=[t];for(let r of s){if(r===e){let o=[];for(let a=e;a!==t;a=i.get(a))o.push(a);return o.reverse()}for(let o of n.get(r).links)i.has(o.id)||(i.set(o.id,r),s.push(o.id))}return null}function aS(n){tg(n,eg,St,11,0),tg(n,"west:turn",Jt,-5,-6)}function ng(n,t){let e=new zt,i=an(519),s=["walk","walk","walk","walk","walk","car","car","motorcycle","motorcycle"].map((m,d)=>{let _=m==="walk"?Ym(qm(i)):null,y=m==="motorcycle",v=d===6,E=_?.root??(y?jm(d===7?"#4b8682":"#ab6256"):v?Km():Jm("#5a8899"));return E.name=m,E.scale.setScalar(_?.38:y?1:.45),v&&E.scale.set(.36,.36,.23),E.visible=!1,e.add(E),{mode:m,model:E,rig:_,pose:_&&Eu(),index:d,node:null,next:null,speed:_?.79+i()*.22:y?1.16:1.28,radius:_?.135:y?.075:.25,wait:0,restartAt:0,stride:0,steps:0,junction:null,path:[],origin:eg,destination:oS[d-5],returning:!1}}),r={},o={},a=[],c=m=>{a=m},l=(m,d)=>a.some(_=>Qm(m,_,d));function h(m,d,_,y=new Map){t||aS(_);let v=t?.(_);r={walk:d,car:_,motorcycle:y};for(let E of[_,y])for(let S of E.values())S.signal=S.roundaboutEntry?null:mc(m,S.section);o={walk:[...d.values()].filter(E=>E.links.length&&!E.section.junction).sort((E,S)=>E.section.width-S.section.width||S.z-E.z),motorcycle:[...y.values()].filter(E=>E.links.length&&!E.section.junction).sort((E,S)=>E.section.width-S.section.width||S.z-E.z)};for(let E of s){let S=r[E.mode];if(E.path=[],v&&E.mode==="car"&&Object.assign(E,v[E.index-5]),!S.has(E.node)||E.next&&!S.has(E.next)){if(E.node=E.next=null,E.junction=null,E.mode!=="car")E.model.visible=!1;else if(E.model.visible){let w=[...S.values()].find(R=>Math.hypot(R.x-E.model.position.x,R.z-E.model.position.z)<.12);E.node=w?.id??null}}}}function u(m,d,_){m.model.position.set(d,n(d,_)+.046,_)}function f(m){if(m.mode==="car"){if(m.model.visible)return;let y=r.car,v=Su(y,m.origin,m.destination);if(!v?.length||!Su(y,m.destination,m.origin))return;let E=y.get(m.origin);if(l(E,m.radius)||s.some(S=>S!==m&&S.model.visible&&Math.hypot(S.model.position.x-E.x,S.model.position.z-E.z)<.85))return;m.node=E.id,m.path=v,u(m,E.x,E.z),m.model.visible=!0;return}let d=o[m.mode]??[],_=Math.floor((m.index+m.steps*.63)*d.length/s.length);for(let y=0;y<d.length;y++){let v=d[(_+y)%d.length];if(!l(v,m.radius)&&!s.some(E=>E.model.visible&&Math.hypot(E.model.position.x-v.x,E.model.position.z-v.z)<.85)){u(m,v.x,v.z),m.node=v.id,m.model.visible=!0,m.wait=0;return}}}function p(m,d,_){if(m.mode==="car")return m.path.length||(m.path=Su(d,_.id,m.returning?m.origin:m.destination)??[]),m.path[0];if(t&&_.junction){let w=[{node:_,first:null}],R=new Set([_.id]);for(let{node:b,first:M}of w)for(let A of b.links){let I=d.get(A.id);if(!R.has(I.id)){if(R.add(I.id),I.junction===_.junction)w.push({node:I,first:M??I.id});else if(!s.some(z=>z!==m&&z.model.visible&&Math.hypot(z.model.position.x-I.x,z.model.position.z-I.z)<.42))return M??I.id}}}let y=_.links.filter(w=>!w.crossing),v=_.links.filter(w=>w.crossing),E=v.length&&(!y.length||(m.index+m.steps)%5===0)?v:y;if(E.length)return E[m.index%E.length].id;let S=`${_.section.id}:${-_.direction}:${_.index}`;return d.get(S)?.links.length?S:null}function x(m,d){for(let _ of[...s].sort((y,v)=>v.wait-y.wait||+(y.mode==="car")-+(v.mode==="car"))){if(!_.node){m>=_.restartAt&&f(_);continue}if(m<_.restartAt)continue;let y=r[_.mode],v=y.get(_.node),E=_.next??p(_,y,v);if(!E){if(_.mode==="car")continue;_.node=null,_.junction=null,_.model.visible=!1,_.restartAt=m+1.4,_.steps++;continue}let S=y.get(E),w=S.junction&&v.junction!==S.junction,R=!_.next&&w&&v.signal&&gc(m,v.signal)!=="green",b=_.model.position,M=S.x-b.x,A=S.z-b.z,I=Math.hypot(M,A),z=_.mode!=="walk"&&v.section.material==="dirt"?.77:1,P=Math.min(I,d*_.speed*z),D=I>.001?b.x+M/I*P:S.x,N=I>.001?b.z+A/I*P:S.z,H=!l(b,_.radius)&&l(S,_.radius),G=w&&s.some(B=>B!==_&&B.junction===S.junction),V=s.some(B=>{if(B===_||!B.model.visible)return!1;let j=B.model.position.x-b.x,Y=B.model.position.z-b.z,rt=M*Math.sin(B.model.rotation.y)+A*Math.cos(B.model.rotation.y)>I*.8,at=_.mode!=="walk"&&B.mode!=="walk"&&rt&&Math.abs(j*A-Y*M)<.24*I,tt=_.radius+B.radius+(at?.24:.025);return j*M+Y*A>0&&Math.hypot(B.model.position.x-D,B.model.position.z-N)<tt}),O=R||V||H||G;O?_.wait+=d:(_.wait=0,_.next=E,_.junction=v.junction||S.junction,u(_,D,N),I>.001&&(_.model.rotation.y=Math.atan2(M,A)),_.stride+=P*14,I<=P+.001&&(_.node=E,_.next=null,_.junction=S.junction,_.steps++,_.mode==="car"&&(_.path[0]===E&&_.path.shift(),E===(_.returning?_.origin:_.destination)&&(_.returning=!_.returning,_.restartAt=m+1.2,_.junction=null)))),_.rig&&Zm(_.rig,_.pose,$m(O?"idle":"walk",m,_.stride,0),d,!1)}}function g(m){return s.some(({model:d,radius:_})=>d.visible&&m.some(y=>Qm(d.position,y,_)))}return{group:e,setRoads:h,tick:x,busy:g,restrict:c}}var Wo=b0(a0());var Uu=({x:n,z:t})=>[n+.5,t+.5],Vo=([n,t],[e,i])=>Math.hypot(n-e,t-i);function c0({origin:n,end:t,width:e,bounds:i,obstacle:s,waterAt:r,surfaceY:o,autoGrade:a,tryRoute:c}){let l=xi({x:n[0],z:n[1]}),h=xi({x:t[0],z:t[1]}),u=({x:M,z:A})=>M>=i.left&&M<=i.right&&A>=i.top&&A<=i.bottom;if(!u(l)||!u(h)||Vo(n,t)>gn)return null;let f=new Map,p=M=>{let A=ht(M);return f.has(A)||f.set(A,!u(M)||s(M)||[.08,.5,.92].some(I=>[.08,.5,.92].some(z=>r(M.x+I,M.z+z)))),f.get(A)};if(p(l)||p(h))return null;let x=Math.max(i.left,Math.min(l.x,h.x)-gn),g=Math.max(i.top,Math.min(l.z,h.z)-gn),m=Math.min(i.right,Math.max(l.x,h.x)+gn),d=Math.min(i.bottom,Math.max(l.z,h.z)+gn),_=new Wo.default.Grid(m-x+1,d-g+1),y=ht(l),v=ht(h),E=Math.floor(e/2);for(let M=g;M<=d;M++)for(let A=x;A<=m;A++){let I={x:A,z:M},z=ht(I);if(z===y||z===v)continue;let P=Vo(n,Uu(I))+Vo(Uu(I),t)<=gn+1.5;for(let D=0;P&&D<e;D++)for(let N=0;P&&N<e;N++)P=!p({x:A+D-E,z:M+N-E});P||_.setWalkableAt(A-x,M-g,!1)}let S=new Wo.default.AStarFinder({diagonalMovement:Wo.default.DiagonalMovement.Never}),w=new Map,R=(M,A)=>{let I=A*_.width+M;return w.has(I)||w.set(I,o(M+x+.5,A+g+.5)),w.get(I)},b=new Set;for(let M=0;M<8;M++){let A=_.clone(),I=A.getNeighbors.bind(A),z=a?M===0?.45:.9:e===1?.35:.27;A.getNeighbors=(B,j)=>{let Y=R(B.x,B.y);return I(B,j).filter(rt=>Math.abs(R(rt.x,rt.y)-Y)<=z)};let P=S.findPath(l.x-x,l.z-g,h.x-x,h.z-g,A);if(P.length<2)continue;let D=Wo.default.Util.compressPath(P).map(([B,j])=>[B+x+.5,j+g+.5]);D[0]=n,D[D.length-1]=t;let N=Sr(D,e);if(N.error)continue;let H=c(N);if(!H.error)return{route:N,trial:H};let G=H.errorCell?Uu(H.errorCell):D[Math.floor(D.length/2)],O=P.slice(1,-1).filter(B=>!b.has(B.join(","))).sort((B,j)=>Vo([B[0]+x+.5,B[1]+g+.5],G)-Vo([j[0]+x+.5,j[1]+g+.5],G))[0];O&&(b.add(O.join(",")),_.setWalkableAt(...O,!1))}return null}var{clamp:bi,lerp:jn,smoothstep:Xo}=Bt,As=1.25,Rn=1e-5,Nu=.35,Xc=12,zu=20,RS=1.4,qc="Qu\xE1 s\xE1t c\xF4ng tr\xECnh/\u0111\u01B0\u1EDDng hi\u1EC7n c\xF3.",qo="Ch\u1EEBa m\u1EB7t n\u01B0\u1EDBc v\xE0 l\xF2ng su\u1ED1i khi ch\u1EC9nh \u0111\u1ECBa h\xECnh.",Yc=(n,t)=>({x:Math.floor(n),z:Math.floor(t)}),$c=({x:n,z:t})=>({left:n,right:n+1,top:t,bottom:t+1}),Nr=(n,t,e)=>Math.hypot(Math.max(n.left-t,t-n.right,0),Math.max(n.top-e,e-n.bottom,0));function Ou(n,t){if(!n?.addUpdateRange||!t.size)return;let e=-1,i=-1;for(let s of[...t].sort((r,o)=>r-o))(e<0||s>i+2)&&(e>=0&&n.addUpdateRange(e*3,(i-e+1)*3),e=s),i=s;n.addUpdateRange(e*3,(i-e+1)*3)}function l0({ground:n,surfaceY:t,waterAt:e=()=>null,vertexColumns:i}){let{geometry:s}=n,r=s.getAttribute("position"),o=s.getAttribute("color");r.setUsage(fs),s.getAttribute("normal")?.setUsage(fs),o?.setUsage(fs);let a=new Map,c=new Map,l=new gt("#a08b68");function h(R,b,M=As){let A=R.left-M,I=R.right+M,z=R.top-M,P=R.bottom+M;if(!i){for(let D=0;D<r.count;D++){let N=r.getX(D),H=r.getZ(D);N>=A&&N<=I&&H>=z&&H<=P&&b(D,N,H)}return}for(let D=0;D<r.count;D+=i){let N=r.getZ(D);if(N<z)continue;if(N>P)break;let H=D,G=D+i;for(;H<G;){let V=H+G>>1;r.getX(V)<A?H=V+1:G=V}for(let V=H;V<D+i;V++){let O=r.getX(V);if(O>I)break;b(V,O,N)}}}function u(R){let b=new Map;function M(I,z,P){let D=ht({x:I,z});b.has(D)||b.set(D,new Set);for(let N of P)b.get(D).add(N)}let A=s.index;return h(R,(I,z,P)=>{if(!A||!i){M(Math.floor(z),Math.floor(P),[I]);return}let D=I%i,N=Math.floor(I/i);if(D===i-1||I+i+1>=r.count)return;let H=(N*(i-1)+D)*6;for(let G=0;G<6;G+=3){let V=[0,1,2].map(j=>A.getX(H+G+j)),O=V.map(j=>r.getX(j)),B=V.map(j=>r.getZ(j));for(let j=Math.floor(Math.min(...O));j<Math.max(...O)-Rn;j++)for(let Y=Math.floor(Math.min(...B));Y<Math.max(...B)-Rn;Y++)O.every((at,tt)=>{let ut=(tt+1)%3,lt=B[tt]-B[ut],ct=O[ut]-at,xt=(j-at)*lt+(Y-B[tt])*ct;return(O[(tt+2)%3]-at)*lt+(B[(tt+2)%3]-B[tt])*ct>0?xt+Math.max(0,lt)+Math.max(0,ct)>Rn:xt+Math.min(0,lt)+Math.min(0,ct)<-Rn})&&M(j,Y,V)}},2),b}function f(R,b){let M=b?.(R);if(M)return typeof M=="string"?M:qc;for(let A of[.02,.5,.98])for(let I of[.02,.5,.98])if(e(R.x+A,R.z+I))return qo;return""}function p(R,b,M,A,I){let z=[],P=[],D=new Set,N=new Set,H=u(R),G=new Map,V=I?2:1;for(let rt=R.left-V;rt<R.right+V;rt++)for(let at=R.top-V;at<R.bottom+V;at++){let tt={x:rt,z:at},ut=ht(tt),lt=f(tt,A);if(lt){G.set(ut,lt);for(let ct of H.get(ut)??[])N.add(ct)}}for(let rt=R.left;rt<R.right;rt++)for(let at=R.top;at<R.bottom;at++){let tt={x:rt,z:at},ut=ht(tt),lt=$c(tt),ct=H.get(ut),xt=G.get(ut);!xt&&!ct?.size&&(xt="\xD4 n\u1EB1m ngo\xE0i ph\u1EA7n \u0111\u1ECBa h\xECnh c\xF3 th\u1EC3 ch\u1EC9nh.");for(let wt of ct??[]){if(xt)break;if(Math.abs(r.getY(wt)-b)<Rn)continue;let F=r.getX(wt),Mt=r.getZ(wt),Q=M?.(F,Mt);e(F,Mt)?xt=qo:Q||N.has(wt)?xt=typeof Q=="string"?Q:qc:Nr(lt,F,Mt)>=V&&(xt="M\xE9p \xF4 qu\xE1 r\u1ED9ng \u0111\u1EC3 san v\u1EDBi vi\u1EC1n chuy\u1EC3n ti\u1EBFp n\xE0y.")}if(xt)P.push({...tt,reason:xt});else{z.push(tt);for(let wt of ct)D.add(wt)}}if(!z.length)return{changes:[],cells:[],core:z,transition:[],skipped:P,targetY:b,error:P[0]?.reason||"Kh\xF4ng c\xF3 \xF4 n\xE0o c\xF3 th\u1EC3 san \u1EDF \u0111\xE2y.",errorCell:P[0]};let O=[],B=new Map,j=new Set(z.map(ht)),Y=new Set(P.map(ht));return h(R,(rt,at,tt)=>{let ut=D.has(rt),lt=r.getY(rt),ct=Yc(at,tt),xt=ht(ct),wt=V;if(!ut){if(N.has(rt)||Y.has(xt)||e(at,tt)||M?.(at,tt))return;for(let Mt=ct.x-V;Mt<=ct.x+V;Mt++)for(let Q=ct.z-V;Q<=ct.z+V;Q++){let et={x:Mt,z:Q};j.has(ht(et))&&(wt=Math.min(wt,Nr($c(et),at,tt)))}if(wt>=V)return}let F=Math.fround(ut?b:jn(b,lt,Xo(wt,0,V)));Math.abs(lt-F)<Rn||(O.push({index:rt,oldY:lt,newY:F}),!j.has(xt)&&!Y.has(xt)&&B.set(xt,ct))},V),{changes:O,cells:[...z,...B.values()],core:z,transition:[...B.values()],skipped:P,targetY:b,error:""}}function x(R,b,M,A,I=!1){let z=[],P=new Map,D=new Map,N="",H;return h(R,(G,V,O)=>{if(N)return;let B=b(V,O);if(!B||B.distance>=As)return;let j=r.getY(G),Y=B.cutOnly?Math.min(j,B.y):B.y,rt=Math.fround(jn(Y,j,Xo(B.distance,0,As)));if(Math.abs(j-rt)<Rn)return;let at=Yc(V,O),tt=e(V,O);if(tt&&A&&B.distance>Rn)return;let ut=M?.(V,O);if(ut&&I&&B.distance>Rn){D.set(ht(at),at);return}if(tt||ut){N=tt?qo:typeof ut=="string"?ut:qc,H=at;return}z.push({index:G,oldY:j,newY:rt}),P.set(ht(at),at)}),{changes:N?[]:z,error:N,errorCell:H,cells:[...P.values()],trimmed:[...D.values()]}}function g(R,b,M,A){let I=(at,tt)=>({changes:[],cells:[],core:R,error:at,errorCell:tt});if(R.length<2)return I("K\xE9o t\u1EEB \u0111\u1EA7u n\xE0y t\u1EDBi \u0111\u1EA7u kia c\u1EE7a d\u1ED1c.",R[0]);if(R.length>zu)return I(`M\u1ED7i l\u1EA7n l\xE0m d\u1ED1c t\u1ED1i \u0111a ${zu} \xF4.`,R[zu]);let z=new Set,P=[],D=R[0],N=R.at(-1),H=t(D.x+.5,D.z+.5),G=t(N.x+.5,N.z+.5),V=0;for(let[at,tt]of R.entries()){let ut=ht(tt),lt=R[at-1];if(z.has(ut))return I("N\xE9t l\xE0m d\u1ED1c b\u1ECB t\u1EF1 giao nhau.",tt);if(z.add(ut),!lt)continue;let ct=tt.x-lt.x,xt=tt.z-lt.z;if(Math.abs(ct)+Math.abs(xt)!==1)return I("N\xE9t l\xE0m d\u1ED1c ph\u1EA3i n\u1ED1i c\xE1c \xF4 li\u1EC1n c\u1EA1nh.",tt);P.push({x:lt.x+.5,z:lt.z+.5,dx:ct,dz:xt,distance:V}),V+=Math.hypot(ct,xt)}let O=Math.abs(G-H)/V;if(O>Nu)return I("K\xE9o d\xE0i n\xE9t v\u1EBD \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.",N);for(let[at,tt]of R.entries()){let ut=f(tt,M);if(ut)return I(ut,tt);for(let lt=0;lt<at-2;lt++){let ct=R[lt];if(Math.abs(tt.x-ct.x)+Math.abs(tt.z-ct.z)<=1)return I("Ch\u1EEBa \xEDt nh\u1EA5t m\u1ED9t \xF4 \u0111\u1EC7m gi\u1EEFa hai nh\xE1nh d\u1ED1c.",tt)}}let B=R.map($c),j={left:Math.min(...R.map(at=>at.x)),right:Math.max(...R.map(at=>at.x))+1,top:Math.min(...R.map(at=>at.z)),bottom:Math.max(...R.map(at=>at.z))+1},Y=x(j,(at,tt)=>{let ut=Math.min(...B.map(xt=>Nr(xt,at,tt)));if(ut>=As)return null;let lt=1/0,ct=0;for(let xt of P){let wt=bi((at-xt.x)*xt.dx+(tt-xt.z)*xt.dz,0,1),F=Math.hypot(at-xt.x-wt*xt.dx,tt-xt.z-wt*xt.dz);F<lt&&(lt=F,ct=(xt.distance+wt)/V)}return{y:jn(H,G,ct),distance:ut}},b,!0,A),rt=Y.cells.filter(at=>!z.has(ht(at)));return{...Y,cells:[...R,...rt],core:R,transition:rt,grade:O,length:V,skipped:[]}}function m(R,b,M,A){let{cells:I,points:z,width:P}=R,D=z[0],N=z.at(-1),H=t(...D),G=t(...N),V=0,O=z.slice(1).map((lt,ct)=>{let[xt,wt]=z[ct],F=lt[0]-xt,Mt=lt[1]-wt,Q=Math.hypot(F,Mt),et={x:xt,z:wt,dx:F,dz:Mt,span:Q,at:V};return V+=Q,et}),B=Math.abs(G-H)/V,j=(lt,ct)=>({changes:[],cells:I,core:I,transition:[],grade:B,error:lt,errorCell:ct,ribbon:R});if(B>Nu)return j("K\xE9o d\xE0i n\xE9t v\u1EBD \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.",Yc(...N));for(let lt of I){let ct=f(lt,M);if(ct)return j(ct,lt)}let Y={left:Math.min(...I.map(lt=>lt.x)),right:Math.max(...I.map(lt=>lt.x))+1,top:Math.min(...I.map(lt=>lt.z)),bottom:Math.max(...I.map(lt=>lt.z))+1};function rt(lt,ct){let xt=1/0,wt=0;for(let{x:bt,z:nt,dx:L,dz:C,span:J,at:_t}of O){let mt=bi(((lt-bt)*L+(ct-nt)*C)/J**2,0,1),yt=Math.hypot(lt-bt-mt*L,ct-nt-mt*C);yt<xt&&([xt,wt]=[yt,(_t+mt*J)/V])}let F=O[0],Mt=O.at(-1),Q=-((lt-D[0])*F.dx+(ct-D[1])*F.dz)/F.span,et=((lt-N[0])*Mt.dx+(ct-N[1])*Mt.dz)/Mt.span,it=wt===0?Q:wt===1?et:0;return{y:jn(H,G,wt),distance:Math.max(0,xt-P/2,it)}}let at=x(Y,rt,b,!0,A),tt=new Set(I.map(ht)),ut=at.cells.filter(lt=>!tt.has(ht(lt)));return{...at,cells:[...I,...ut],core:I,transition:ut,grade:B,length:V,ribbon:R,targetAt:(lt,ct)=>rt(lt,ct).y}}function d({mode:R,from:b,to:M,size:A,isLocked:I,lockCell:z,cells:P,ribbon:D,softEdges:N=!1,trimLockedShoulder:H=!1}){let G={left:Math.min(b.x,M.x),right:Math.max(b.x,M.x)+1,top:Math.min(b.z,M.z),bottom:Math.max(b.z,M.z)+1},V=b.x+.5,O=b.z+.5,B=t(V,O);if(R==="flatten"){if(e(V,O))return{changes:[],cells:[],core:[],error:"Ch\u1ECDn m\u1ED9t \xF4 \u0111\u1EA5t kh\xF4 l\xE0m cao \u0111\u1ED9 san.",errorCell:b};if(b.x===M.x&&b.z===M.z&&[1,3,4].includes(A)){let ut=Math.floor((A-1)/2);G.left=M.x-ut,G.top=M.z-ut,G.right=G.left+A,G.bottom=G.top+A}let tt={x:bi(M.x,b.x-Xc+1,b.x+Xc-1),z:bi(M.z,b.z-Xc+1,b.z+Xc-1)};return(tt.x!==M.x||tt.z!==M.z)&&(G.left=Math.min(b.x,tt.x),G.right=Math.max(b.x,tt.x)+1,G.top=Math.min(b.z,tt.z),G.bottom=Math.max(b.z,tt.z)+1),{...p(G,B,I,z,N),capped:tt.x!==M.x||tt.z!==M.z}}if(D)return m(D,I,z,H);if(P)return g(P,I,z,H);let j=M.x-b.x,Y=M.z-b.z,rt=Math.hypot(j,Y),at=t(M.x+.5,M.z+.5);return!rt||Math.abs(at-B)/rt>Nu?{changes:[],cells:[],errorCell:M,error:rt?"K\xE9o d\xE0i v\xF9ng ch\u1ECDn \u0111\u1EC3 d\u1ED1c tho\u1EA3i h\u01A1n.":"K\xE9o t\u1EEB \u0111\u1EA7u n\xE0y t\u1EDBi \u0111\u1EA7u kia c\u1EE7a d\u1ED1c."}:x(G,(tt,ut)=>{let lt=bi(((tt-V)*j+(ut-O)*Y)/rt**2,0,1);return{y:jn(B,at,lt),distance:Nr(G,tt,ut)}},I)}function _(R,b){if(!R.length)return{changes:[],error:"",cells:[]};let M=R.map(I=>{let{x:z,z:P,axis:D,width:N}=I,H=D===St?.5:N/2,G=D===St?N/2:.5;return{...I,left:z-H,right:z+H,top:P-G,bottom:P+G}}),A={left:Math.min(...M.map(I=>I.left)),right:Math.max(...M.map(I=>I.right)),top:Math.min(...M.map(I=>I.top)),bottom:Math.max(...M.map(I=>I.bottom))};return x(A,(I,z)=>{let P,D=1/0,N=0,H=0,G=1/0,V=1/0;for(let O of M){let B=Nr(O,I,z);if(B>=As)continue;let j=O.axis===St?I-O.x:z-O.z,Y=jn(O.startY??O.y,O.endY??O.y,bi(j+.5,0,1));B<D&&(P=Y,D=B),O.cutOnly?G=Math.min(G,B):V=Math.min(V,B);let rt=Math.max(0,1-Math.abs(j))*(1-Xo(B,0,As));N+=Y*rt,H+=rt}return P===void 0?null:{y:H?N/H:P,distance:D,cutOnly:G<=V}},b,!0)}function y(R,{mode:b,width:M,isLocked:A,shoulder:I=As}){let z=R.cells,P=(Q,et)=>({error:Q,errorCell:et,changes:[],cells:[],core:z,transition:[]});if(R.error||!z.length)return P(R.error||"Ch\u1ECDn m\u1ED9t tuy\u1EBFn tr\xEAn \u0111\u1EA5t kh\xF4.");let D=z.find(Q=>f(Q));if(D)return P(qo,D);let N=[],H=0;for(let[[Q,et],[it,bt]]of R.points.slice(1).map((nt,L)=>[R.points[L],nt])){let nt=it-Q,L=bt-et,C=Math.hypot(nt,L);C&&(N.push({x:Q,z:et,dx:nt,dz:L,span:C,start:H}),H+=C)}let G=[];for(let{x:Q,z:et,dx:it,dz:bt,span:nt,start:L}of N){let C=Math.ceil(nt/.65);for(let J=0;J<C;J++)G.push({s:L+nt*J/C,y:t(Q+it*J/C,et+bt*J/C)})}G.push({s:H,y:t(...R.points.at(-1))});let V=G[0].y,O=G.at(-1).y,B=M===1?.31:.23;if(b==="slope"&&Math.abs(O-V)>B*H)return P("Hai \u0111\u1EA7u tuy\u1EBFn ch\xEAnh cao qu\xE1 l\u1EDBn. K\xE9o d\xE0i \u0111\u01B0\u1EDDng ho\u1EB7c \u0111i v\xF2ng.",z.at(-1));let j=G.map(Q=>Q.y).sort((Q,et)=>Q-et);if(b==="slope"){for(let Q of G){let et=H-Q.s;Q.y=bi(Q.y,Math.max(V-B*Q.s,O-B*et),Math.min(V+B*Q.s,O+B*et))}for(let Q=1;Q<G.length-1;Q++){let et=G[Q-1],it=G[Q],bt=B*(it.s-et.s);it.y=bi(it.y,et.y-bt,et.y+bt)}}function Y(Q,et){if(b==="flatten")return j[Math.floor(j.length/2)];let it=1/0,bt=0;for(let J of N){let _t=Q-J.x,mt=et-J.z,yt=bi((_t*J.dx+mt*J.dz)/J.span**2,0,1),Ft=(_t-yt*J.dx)**2+(mt-yt*J.dz)**2;Ft>=it||(it=Ft,bt=J.start+yt*J.span)}let nt=G.findIndex(J=>J.s>=bt);if(nt<0)return G.at(-1).y;if(nt<=0)return G[0].y;let L=G[nt-1],C=G[nt];return jn(L.y,C.y,(bt-L.s)/(C.s-L.s))}let rt={left:Math.min(...z.map(Q=>Q.x)),right:Math.max(...z.map(Q=>Q.x))+1,top:Math.min(...z.map(Q=>Q.z)),bottom:Math.max(...z.map(Q=>Q.z))+1},at=u(rt),tt=new Set,ut=new Set(z.map(ht)),lt=new Map,ct=[];for(let Q of ut)for(let et of at.get(Q)??[])tt.add(et);let xt,wt,F=0,Mt=0;return h(rt,(Q,et,it)=>{let bt=Yc(et,it),nt=ht(bt),L=tt.has(Q)?0:I;if(L)for(let yt=bt.x-Math.ceil(I);yt<=bt.x+Math.ceil(I);yt++)for(let Ft=bt.z-Math.ceil(I);Ft<=bt.z+Math.ceil(I);Ft++){let It={x:yt,z:Ft};ut.has(ht(It))&&(L=Math.min(L,Nr($c(It),et,it)))}if(L>=I)return;let C=r.getY(Q),J=Math.fround(jn(Y(et,it),C,Xo(L,0,I))),_t=Math.abs(J-C);if(_t<Rn)return;let mt=e(et,it)?qo:A?.(et,it);if(mt){L||(wt??={cell:bt,reason:typeof mt=="string"?mt:qc});return}if(_t>RS){xt??=bt;return}ct.push({index:Q,oldY:C,newY:J}),F=Math.max(F,_t),Mt+=_t,ut.has(nt)||lt.set(nt,bt)},I),xt?P("Ph\u1EA3i \u0111\xE0o ho\u1EB7c \u0111\u1EAFp qu\xE1 s\xE2u. Th\u1EED k\xE9o d\xE0i tuy\u1EBFn ho\u1EB7c \u0111i v\xF2ng.",xt):!ct.length&&wt?P(wt.reason,wt.cell):{error:"",changes:ct,core:z,cells:[...z,...lt.values()],transition:[...lt.values()],targetAt:Y,maxChange:F,movedHeight:Mt,blocked:wt}}function v(R,b){if(!i){b(R);return}let M=R%i;for(let A=-1;A<=1;A++)for(let I=-1;I<=1;I++){if(M+I<0||M+I>=i)continue;let z=R+A*i+I;z>=0&&z<r.count&&b(z)}}function E(R,b=!0){if(!R.length)return;let M=new Set,A=new Set;for(let{index:z,oldY:P,newY:D}of R)a.has(z)||a.set(z,P),r.setY(z,b?D:P),M.add(z),v(z,N=>A.add(N));Ou(r,M),r.needsUpdate=!0,s.computeVertexNormals();let I=s.getAttribute("normal");if(Ou(I,A),o){let z=new Set;for(let P of A){let D=!1;if(v(P,O=>{let B=a.get(O);D||=B!==void 0&&Math.abs(r.getY(O)-B)>=Rn}),!D&&!c.has(P))continue;c.has(P)||c.set(P,[o.getX(P),o.getY(P),o.getZ(P)]);let[N,H,G]=c.get(P),V=D?(1-Xo(I.getY(P),.48,.85))*.86:0;o.setXYZ(P,jn(N,l.r,V),jn(H,l.g,V),jn(G,l.b,V)),z.add(P)}Ou(o,z),z.size&&(o.needsUpdate=!0)}s.boundingBox=null,s.boundingSphere=null}function S(){let R=[];for(let[b,M]of a){let A=r.getY(b);Math.abs(A-M)>=Rn&&R.push({index:b,oldY:M,newY:A})}return R}function w(R){if(!Array.isArray(R)||R.length>r.count)return!1;let b=new Set;for(let M of R){if(!M)return!1;let{index:A,oldY:I,newY:z}=M;if(!Number.isInteger(A)||A<0||A>=r.count||b.has(A)||!Number.isFinite(I)||!Number.isFinite(z)||!Number.isFinite(Math.fround(z))||Math.abs(r.getY(A)-I)>=Rn||e(r.getX(A),r.getZ(A)))return!1;b.add(A)}return E(R),!0}return{planBrush:d,planRoad:_,planRoadCorridor:y,apply:E,heightDeltas:S,restoreDeltas:w}}var Rs=(n,t)=>Math.hypot(t[0]-n[0],t[1]-n[1]),zr=(n,t,e)=>(t[0]-n[0])*(e[1]-n[1])-(t[1]-n[1])*(e[0]-n[0]);function Fu(n){if(n.length<3)return n;let t=n[0],e=n.at(-1),i=0,s=.18;for(let r=1;r<n.length-1;r++){let o=n[r],a=Rs(t,e),c=a?Math.max(0,Math.min(1,((o[0]-t[0])*(e[0]-t[0])+(o[1]-t[1])*(e[1]-t[1]))/a**2)):0,l=Rs(o,[t[0]+(e[0]-t[0])*c,t[1]+(e[1]-t[1])*c]);l>s&&([i,s]=[r,l])}return i?[...Fu(n.slice(0,i+1)).slice(0,-1),...Fu(n.slice(i))]:[t,e]}function CS(n,t,e){return n.every((i,s)=>{let r=n[(s+1)%4],o=i[1]-r[1],a=r[0]-i[0];return(t-i[0])*o+(e-i[1])*a+Math.max(0,o)+Math.max(0,a)>1e-7})}function h0(n){for(let t=0;t<n.length;t++){let e=n[t],i=n[(t+1)%n.length];for(let s=t+2;s<n.length;s++){if(t===0&&s===n.length-1)continue;let r=n[s],o=n[(s+1)%n.length];if(!(Math.max(e[0],i[0])<Math.min(r[0],o[0])||Math.max(r[0],o[0])<Math.min(e[0],i[0])||Math.max(e[1],i[1])<Math.min(r[1],o[1])||Math.max(r[1],o[1])<Math.min(e[1],i[1]))&&zr(e,i,r)*zr(e,i,o)<=0&&zr(r,o,e)*zr(r,o,i)<=0)return!0}}return!1}function u0(n,t){return n.slice(1,-1).some((e,i)=>{let s=n[i],r=n[i+2],o=Math.abs(zr(s,e,r));return o>1e-7&&Rs(s,e)*Rs(e,r)*Rs(s,r)<2*o*t*.6})}function f0(n,t,e=0){let i=n.filter((p,x)=>x===0||Rs(p,n[x-1])>.001);if(i.length<2)return{error:"K\xE9o d\xE0i n\xE9t \u0111\u1EC3 t\u1EA1o tuy\u1EBFn."};let s=Fu(i),r=new bn(s.map(([p,x])=>new k(p,0,x)),!1,"centripetal"),o=r.getLength();if(o<.24)return{error:"K\xE9o d\xE0i n\xE9t \u0111\u1EC3 t\u1EA1o tuy\u1EBFn."};if(o>20)return{error:"M\u1ED7i n\xE9t d\xE0i t\u1ED1i \u0111a 20 \u0111\u01A1n v\u1ECB. Chia tuy\u1EBFn th\xE0nh nhi\u1EC1u \u0111o\u1EA1n."};let a=r.getSpacedPoints(Math.ceil(o/.2)).map(({x:p,z:x})=>[p,x]);if(u0(a,t)){if(a=sc(s,t*.64),!a||u0(a,t))return{error:"Kh\xFAc cua qu\xE1 g\u1EAFt v\u1EDBi b\u1EC1 r\u1ED9ng n\xE0y. H\xE3y v\u1EBD cua r\u1ED9ng h\u01A1n."};o=a.slice(1).reduce((p,x,g)=>p+Rs(x,a[g]),0)}let c=Gi(a),l=p=>c.map(({x,z:g,dx:m,dz:d})=>[x-d*p,g+m*p]),h=l(-t/2),u=l(t/2);if(h0([...h,...[...u].reverse()]))return{error:"D\u1EA3i v\u1EBD b\u1ECB ch\u1ED3ng l\xEAn ch\xEDnh n\xF3."};if(e&&h0([...l(-(t+e)/2),...l((t+e)/2).reverse()]))return{error:"Ch\u1EEBa th\xEAm kho\u1EA3ng \u0111\u1EA5t gi\u1EEFa hai nh\xE1nh d\u1ED1c."};let f=new Map;for(let p=1;p<a.length;p++){let x=[h[p-1],h[p],u[p],u[p-1]];if(x.some((d,_)=>zr(d,x[(_+1)%4],x[(_+2)%4])<=0))return{error:"Kh\xFAc cua qu\xE1 g\u1EAFt v\u1EDBi b\u1EC1 r\u1ED9ng n\xE0y. H\xE3y v\u1EBD cua r\u1ED9ng h\u01A1n."};let g=x.map(([d])=>d),m=x.map(([,d])=>d);for(let d=Math.floor(Math.min(...g));d<Math.ceil(Math.max(...g));d++)for(let _=Math.floor(Math.min(...m));_<Math.ceil(Math.max(...m));_++)CS(x,d,_)&&f.set(`${d},${_}`,{x:d,z:_})}return{points:a,stations:c,cells:[...f.values()],width:t,length:o,error:""}}var PS={core:"#92c67a",expansion:"#e2c672",terrace:"#dfcf9c",slope:"#ae775a",buffer:"#c5a880",water:"#5699ae"},IS={core:"L\xF5i c\xF3 th\u1EC3 x\xE2y",expansion:"V\xF9ng m\u1EDF r\u1ED9ng",terrace:"\u0110\u1EA5t chuy\u1EC3n cao \u0111\u1ED9",slope:"S\u01B0\u1EDDn d\u1ED1c",buffer:"V\xF9ng \u0111\u1EC7m c\u1EA3nh quan",water:"M\u1EB7t n\u01B0\u1EDBc"},Yo={dirt:"\u0110\u1EA5t",stone:"\u0110\xE1 l\xE1t",asphalt:"Nh\u1EF1a"},Zc={level:new gt("#00e5ff"),fill:new gt("#ffffff"),shallowCut:new gt("#ffab87"),deepCut:new gt("#ff5722")};function d0(n){return Math.abs(n)<=.025?Zc.level:n<0?Zc.fill:Zc.shallowCut.clone().lerp(Zc.deepCut,Bt.clamp((n-.025)/.775,0,1))}var Xe={left:-24,right:22,top:-25,bottom:20};function p0({scene:n,canvas:t,surfaceY:e,blockers:i,town:s}){let r=s?"linguacity-demo-built-town-v1":"linguacity-demo-planning-v3",o=s?s.roadSample:$p,a=T=>s?nu(T,e,s.measure):nu(T),c=document.querySelector("#planning-controls"),l=document.querySelector("#planning-status"),h=document.querySelector("#bus-level"),u=document.querySelector("#road-surface"),f=document.querySelector("#apply-surface"),p=[...document.querySelectorAll("[data-plan-mode]")],x=document.querySelector("#show-zones"),g=document.querySelector("#show-lanes"),m=document.querySelector("#traffic-legend"),d=document.querySelector("#show-grid"),_=document.querySelector("#road-width"),y=document.querySelector("#auto-level"),v=document.querySelector("#flatten-size"),E=document.querySelector("#suggest-detour"),S=document.querySelector("#undo-edit"),w=document.querySelector("#redo-edit"),R=document.querySelector("#stroke-mode"),b=document.querySelector("#road-gesture"),M=null,A=null,I=document.querySelector("#edit-options"),z=document.querySelector("#edit-option-list"),P=s&&l0(s.terrain),D=s?.terrain.scenery,N=new Set(i.filter(T=>Number.isInteger(T.sceneryId)).map(T=>T.sceneryId)),H=[],G=[],V=new zt,O=e,B=(T,W)=>{let X=s&&O(T,W);if(s&&Math.abs(X-e(T,W))>1e-5)return X;let q=Mo(tt)&&mn(T,W,s?.hillRoute);if(q&&q.distance<=1)return(s?Math.max(q.height,e(T,W)):q.height)+.016;if(s)return s.landscape.height(T,W);if(bo(tt)){let K=up(T,W);if(K!==null)return K;let st=Wi(T,W);if(st&&st.distance<=.45)return st.height-.01}return e(T,W)},j=ng(B,s?.trips);V.add(j.group),n.add(V),c.hidden=!1,s&&(x.checked=!1,x.closest("label").hidden=!0,d.closest("label").hidden=!0,c.querySelector(".planning-legend").hidden=!0);let Y=[];for(let T=Tn.top;!s&&T<=Tn.bottom;T++)for(let W=Tn.left;W<=Tn.right;W++){let X={x:W,z:T},q=tu(X);if(q==="water")continue;let K=vs(X),st=i.some(vt=>Ft(X,vt));q==="buffer"&&!K&&!st||Y.push({...X,color:K?K.future?"#f5ce68":"#ffda91":PS[st?"buffer":q]})}let rt=[];for(let{x:T,z:W,w:X,d:q}of s?[]:Qh)for(let[K,st,vt,Pt]of[[T,W,T+X,W],[T+X,W,T+X,W+q],[T+X,W+q,T,W+q],[T,W+q,T,W]]){let Ut=4*Math.hypot(vt-K,Pt-st);for(let Zt=0;Zt<Ut;Zt++)for(let Xt of[Zt/Ut,(Zt+1)/Ut]){let Rt=Bt.lerp(K,vt,Xt),Gt=Bt.lerp(st,Pt,Xt);rt.push(Rt,e(Rt,Gt)+.055,Gt)}}let at=new qn(new ae().setAttribute("position",new qt(rt,3)),new Dn({color:"#968054",transparent:!0,opacity:.72,depthWrite:!1}));at.renderOrder=5,V.add(at);let tt,ut,lt=Yp,ct="inspect",xt,wt,F,Mt,Q,et,it,bt,nt,L,C,J,_t,mt,yt=0;function Ft(T,W){return Math.hypot(Math.max(T.x-W.x,0,W.x-T.x-1),Math.max(T.z-W.z,0,W.z-T.z-1))<W.radius}let It=T=>!D?.hidden.has(T.sceneryId);function Ht(T){if(s&&(T.x<Tn.left||T.x>Tn.right||T.z<Tn.top||T.z>Tn.bottom))return"Ngo\xE0i ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng c\u1EE7a b\u1EA3n \u0111\u1ED3.";let W=s?s.error(T):eu(T);if(W)return W;let X=i.find(st=>Ft(T,st));return X?X.kind==="fence"?"Ch\u1EEBa h\xE0ng r\xE0o \u1EDF m\xE9p d\u1ED1c.":"Gi\u1EEF kho\u1EA3ng c\xE1ch v\u1EDBi c\xE2y ho\u1EB7c c\u1EE5m \u0111\xE1.":s?"":!((T.x===7||T.x===8)&&(T.z===-6||T.z===-5))&&(mn(T.x+.5,T.z+.5)?.distance??1/0)<1.52?"Ch\u1EEBa h\xE0nh lang c\u1EE7a \u0111\u01B0\u1EDDng xe l\xEAn \u0111\u1ED3i.":!(T.z===-13&&T.x>=-7&&T.x<=-5)&&(Wi(T.x+.5,T.z+.5)?.distance??1/0)<.65?"Ch\u1EEBa l\u1ED1i xu\u1ED1ng c\u1EA7u ven su\u1ED1i.":""}function Yt(T){return T.x<Xe.left||T.x>Xe.right||T.z<Xe.top||T.z>Xe.bottom?"Ngo\xE0i ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng c\u1EE7a b\u1EA3n \u0111\u1ED3.":s.overlaps(T)?"\u0110\u01B0\u1EDDng ch\u1EA1m c\xF4ng tr\xECnh hi\u1EC7n c\xF3.":tt.get(ht(T))?.roadCurveId?"N\u1ED1i \u0111\u01B0\u1EDDng t\u1EA1i \u0111\u1EA7u d\u1EA3i cong c\xF3 s\u1EB5n.":s.landscape.bridge.some(q=>Ft(T,{...q,radius:.58}))||T.z<-6&&s.protectedPath(T.x+.5,T.z+.5,.12)&&mn(T.x+.5,T.z+.5,s.hillRoute)?.distance<1.12?"Ch\u1EEBa kho\u1EA3ng tr\u1ED1ng cho \u0111\u01B0\u1EDDng \u0111\u1ED3i ho\u1EB7c c\u1EA7u c\xF3 s\u1EB5n.":i.some(q=>!Number.isInteger(q.sceneryId)&&Ft(T,q))?"\u0110\u01B0\u1EDDng ch\u1EA1m c\u1EA3nh quan \u0111\u01B0\u1EE3c b\u1EA3o v\u1EC7.":""}function ee(T){return T.x<Xe.left||T.x>Xe.right||T.z<Xe.top||T.z>Xe.bottom?"V\xF9ng san ch\u1EA1m r\xECa b\u1EA3n \u0111\u1ED3.":tt.has(ht(T))||s.overlaps(T)||s.protectedPath(T.x+.5,T.z+.5,.07)?"V\xF9ng san ch\u1EA1m c\xF4ng tr\xECnh ho\u1EB7c l\u1ED1i c\xF3 s\u1EB5n.":!1}function Et(T,W,X=!0){if(T<Xe.left||T>Xe.right+1||W<Xe.top||W>Xe.bottom+1)return"V\xF9ng ch\u1EC9nh \u0111\u1ECBa h\xECnh ch\u1EA1m r\xECa b\u1EA3n \u0111\u1ED3.";if(Jn(T,W)||s.protectedPath(T,W,.07))return"Qu\xE1 s\xE1t m\u1EB7t n\u01B0\u1EDBc ho\u1EB7c l\u1ED1i c\xF3 s\u1EB5n.";for(let q of[T-.001,T+.001])for(let K of[W-.001,W+.001]){let st=xi({x:q,z:K});if(tt.has(ht(st))||s.overlaps(st))return"Qu\xE1 s\xE1t c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng hi\u1EC7n c\xF3.";if(X&&i.some(vt=>It(vt)&&Ft(st,vt)))return"Qu\xE1 s\xE1t c\xE2y ho\u1EB7c c\u1EE5m \u0111\xE1."}return!1}function he(){try{let T=JSON.parse(localStorage.getItem(r));if(!T||!Array.isArray(T.roads)||![1,2,3].includes(T.level))return!1;let W=new Map;for(let q of T.roads){if(!Number.isInteger(q.x)||!Number.isInteger(q.z)||![St,Jt,St|Jt].includes(q.axes)&&!(q.axes===0&&q.curveOnly&&typeof q.roadCurveId=="string")||!Vi.includes(q.material)||!s&&Ht(q)||s&&(q.x<Xe.left||q.x>Xe.right||q.z<Xe.top||q.z>Xe.bottom||s.overlaps(q)||["roadY","roadStartY","roadEndY","bridgeY"].some(K=>q[K]!==void 0&&!Number.isFinite(q[K]))||q.bridgeId!==void 0&&(typeof q.bridgeId!="string"||!Number.isFinite(q.bridgeY)||q.axes===(St|Jt))))return!1;W.set(ht(q),q)}let X=ms(W);return X.some(q=>q.width>4)||!s&&a(X)||P&&T.terrain&&!P.restoreDeltas(T.terrain)?!1:(D&&Array.isArray(T.hiddenScenery)&&D.apply(T.hiddenScenery,!0),tt=W,lt=T.level,!0)}catch{return!1}}function ne(){try{localStorage.setItem(r,JSON.stringify({roads:[...tt.values()],level:lt,terrain:P?.heightDeltas(),hiddenScenery:D&&[...D.hidden]}))}catch{l.textContent+=" Tr\xECnh duy\u1EC7t ch\u1EC9 gi\u1EEF c\xE1c thay \u0111\u1ED5i trong phi\xEAn n\xE0y."}}function Kt(T){T&&(V.remove(T),T.traverse(W=>W.geometry?.dispose()))}function Wt(){ut=Zp(tt,lt),O=s?Sc(ut,e):e,xt&&(xt.group.children.filter(K=>K.material?.isMeshBasicMaterial).forEach(K=>K.material.dispose()),Kt(xt.group)),wt&&(wt.children.forEach(K=>K.material.dispose()),Kt(wt));for(let K of[C,J])K?.material.dispose(),Kt(K);let T=Y.filter(K=>{if(tt.has(ht(K)))return!1;let st=K.x+.5,vt=K.z+.5;return(mn(st,vt)?.distance??1/0)>=1.35&&(Wi(st,vt)?.distance??1/0)>=.83});C=Es(T,e,{opacity:.3,order:4}),J=Es(T,e,{opacity:.42,order:4,grid:!0}),V.add(C,J);let W=rc(ut,"walk",B),X=rc(ut,"car",B),q=rc(ut,"motorcycle",B);if(ac(X,ut,"car",s?.hillRoute),ac(q,ut,"motorcycle",s?.hillRoute),s?s.landscape.connect(W):(ac(W,ut,"walk"),fp(W,ut)),xt=uu(ut,O,D?i.filter(It):i,s?{terrainPaths:!1,hillRoute:s.hillRoute,reserved:s.overlaps,groundY:e}:void 0),s){let K=new Map(P.heightDeltas().map(({index:st,oldY:vt})=>[st,vt]));if(K.size){let st=nm(ut,O,e,(vt,Pt)=>e(vt,Pt,K));st&&xt.group.add(st)}}wt=new zt,j.setRoads(ut,W,X,q),wt.add(Rc(W,B,"#237c64"),Rc(X,B,"#344f9e"),Rc(q,B,"#af4826",(K,st)=>(!K.id.startsWith("roundabout:")||!st.id.startsWith("roundabout:"))&&([1,3].includes(K.section.width)||[1,3].includes(st.section.width)))),V.add(xt.group,wt),Vt()}function Vt(){C.visible=x.checked&&!d.checked,J.visible=x.checked&&d.checked,at.visible=x.checked,wt.visible=g.checked,m&&(m.hidden=!g.checked)}function $t(T,W,X=O,q=.61){Mt?.material.dispose(),Kt(Mt),Mt=null,T.length&&(Mt=Es(T.map(K=>({...K,color:K.color??W})),X,{opacity:q,grid:!0,elevation:.081,order:5}),V.add(Mt))}function re(){h.value=String(lt);for(let[T,W]of[...u.options].entries())W.disabled=T>=lt;u.selectedIndex>=lt&&(u.value="dirt"),f.disabled=!F?.length,s&&(S.disabled=!H.length||!!L||!!nt||!!mt,w.disabled=!G.length||!!L||!!nt||!!mt)}function ye(){$t([],""),Q?.material.dispose(),Kt(Q),Q=null,et?.material.dispose(),Kt(et),et=null,it?.traverse(T=>T.material?.dispose()),Kt(it),it=null,bt&&(bt.traverse(T=>T.material?.dispose()),Kt(bt),bt=null)}function ie(){mt=null,I.hidden=!0,z.replaceChildren(),ye()}function At(){M=null,A?.traverse(T=>T.material?.dispose()),Kt(A),A=null}function Z(T){At(),M={origin:T,...yc(T,Xe)},A=new zt;let W=[],{outline:X}=M;for(let[st,vt]of X.entries()){let Pt=X[(st+1)%X.length],Ut=Math.max(1,Math.ceil(Math.hypot(Pt[0]-vt[0],Pt[1]-vt[1])/.5));for(let Zt=0;Zt<Ut;Zt++)for(let Xt of[Zt/Ut,(Zt+1)/Ut]){let Rt=Bt.lerp(vt[0],Pt[0],Xt),Gt=Bt.lerp(vt[1],Pt[1],Xt);W.push(Rt,Math.max(e(Rt,Gt),Jn(Rt,Gt)?.y??-1/0)+.14,Gt)}}let q=new qn(new ae().setAttribute("position",new qt(W,3)),new Dn({color:"#72edff",transparent:!0,opacity:.85,depthTest:!1})),K=new Nt(new ls(.28,.41,24),new Be({color:"#72edff",depthTest:!1,side:Ie}));K.rotation.x=-Math.PI/2,K.position.set(T[0],Math.max(e(...T),Jn(...T)?.y??-1/0)+.16,T[1]),q.renderOrder=K.renderOrder=8,A.add(q,K),V.add(A)}function Ct(T){L=null,j.restrict([]),ct=T,F=null,s?(ie(),At(),nt=null,v.closest("label").hidden=T!=="flatten",b&&(b.closest("label").hidden=T!=="draw"),R.closest("label").hidden=T!=="slope"&&(T!=="draw"||b?.value==="points"),_t=null,E.hidden=!0):$t([],"");for(let W of p)W.setAttribute("aria-pressed",String(W.dataset.planMode===ct));t.dataset.planMode=ct,re(),l.textContent={inspect:s?"K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng \u0111\u1EC3 xem th\xF4ng tin.":"K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m m\u1ED9t l\xF4 ho\u1EB7c \u0111o\u1EA1n \u0111\u01B0\u1EDDng \u0111\u1EC3 ki\u1EC3m tra.",draw:s?b?.value==="points"?"Ch\u1EA5m A, r\u1ED3i ch\u1EA5m B trong ph\u1EA1m vi 60 \u0111\u01A1n v\u1ECB. K\xE9o \u0111\u1EC3 d\u1ECBch camera.":"Ch\u1ECDn b\u1EC1 r\u1ED9ng r\u1ED3i k\xE9o. Tim tuy\u1EBFn d\xE0i t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.":"K\xE9o m\u1ED9t d\u1EA3i th\u1EB3ng. V\u1EBD d\u1EA3i song song s\xE1t b\xEAn \u0111\u1EC3 t\u0103ng b\u1EC1 r\u1ED9ng.",erase:s?"K\xE9o qua \u0111o\u1EA1n mu\u1ED1n x\xF3a. Ch\u1EA1m m\u1ED9t ph\u1EA7n c\u1EA7u \u0111\u1EC3 x\xF3a c\u1EA3 c\u1EA7u v\xE0 \u0111\u01B0\u1EDDng d\u1EABn.":"K\xE9o qua d\u1EA3i mu\u1ED1n x\xF3a. C\xE1c d\u1EA3i li\u1EC1n k\u1EC1 s\u1EBD t\xEDnh l\u1EA1i b\u1EC1 r\u1ED9ng.",upgrade:"B\u1EA5m \u0111o\u1EA1n c\u1EA7n \u0111\u1ED5i m\u1EB7t, ch\u1ECDn v\u1EADt li\u1EC7u r\u1ED3i b\u1EA5m \xC1p d\u1EE5ng.",flatten:"Ch\u1EA1m \u0111\u1EC3 d\xF9ng c\u1EE1 v\xF9ng san, ho\u1EB7c k\xE9o m\u1ED9t v\xF9ng t\u1ED1i \u0111a 12\xD712. \xD4 \u0111\u1EA7u quy\u1EBFt \u0111\u1ECBnh cao \u0111\u1ED9.",slope:"Ch\u1ECDn b\u1EC1 r\u1ED9ng r\u1ED3i k\xE9o t\u1EEB ch\xE2n l\xEAn \u0111\u1EC9nh ho\u1EB7c ng\u01B0\u1EE3c l\u1EA1i. Ch\u1ECDn V\u1EBD t\u1EF1 do \u0111\u1EC3 u\u1ED1n quanh s\u01B0\u1EDDn \u0111\u1ED3i."}[ct]}function Ot(T){let W=[];for(let K=T.z;K<T.z+T.d;K++)for(let st=T.x;st<T.x+T.w;st++)W.push({x:st,z:K});$t([...W,T.gate],"#fed98c");let X=ut.get(ht(T.gate)),q=X?te(X)>=2?"Ti\u1EBFp c\u1EADn b\u1EB1ng \u0111\u01B0\u1EDDng xe.":"Ti\u1EBFp c\u1EADn b\u1EB1ng l\u1ED1i \u0111i b\u1ED9.":"L\u1ED1i v\xE0o \u0111ang thi\u1EBFu \u0111\u01B0\u1EDDng n\u1ED1i.";l.textContent=`L\xF4 tr\u1ED1ng \xB7 ${T.w} \xD7 ${T.d} \xF4. ${q}`}function te(T){if(T.roadCurveId){let W=[...ut.values()].find(X=>X.roadCurve?.id===T.roadCurveId)?.roadCurve;if(W)return W.width}return Math.max(1,...[St,Jt].filter(W=>T.axes&W).map(W=>Ke(tt,T,W).width))}function Qt(T,W){if(!T)return;let X=ut.get(ht(T));if(ct==="upgrade")F=Gh(ut,T),$t(F,"#ffd071"),re(),l.textContent=F.length?`\u0110\xE3 ch\u1ECDn ${F.length} \xF4 \u0111\u01B0\u1EDDng ${Yo[X.material].toLowerCase()}. Ch\u1ECDn v\u1EADt li\u1EC7u \u0111\u1EC3 \xE1p d\u1EE5ng.`:"Ch\u1ECDn m\u1ED9t nh\xE1nh gi\u1EEFa hai n\xFAt giao, ho\u1EB7c m\u1ED9t \u0111o\u1EA1n t\u1EDBi \u0111\u1EA7u c\u1EE5t.";else if(W)$t([],""),l.textContent=W.name;else if(X){$t(Gh(ut,T),"#ffd071");let q=te(X),K={1:"\u0110i b\u1ED9 v\xE0 xe m\xE1y",2:"\u0110i b\u1ED9 v\xE0 l\xE0n chung \xF4 t\xF4, xe m\xE1y",3:"\u0110i b\u1ED9, xe m\xE1y b\xEAn ph\u1EA3i v\xE0 \xF4 t\xF4 ri\xEAng"}[q]??"\u0110i b\u1ED9 v\xE0 xe c\u01A1 gi\u1EDBi",st=X.bridgeId?em([...ut.values()].filter(vt=>vt.bridgeId===X.bridgeId)):Yo[X.material];l.textContent=`${st} \xB7 ${q}\xD7 \xB7 ${K}.`}else if(s)$t([],""),l.textContent="K\xE9o \u0111\u1EC3 xem b\u1EA3n \u0111\u1ED3. B\u1EA5m c\xF4ng tr\xECnh ho\u1EB7c \u0111\u01B0\u1EDDng \u0111\u1EC3 xem th\xF4ng tin.";else{let q=vs(T);if(q)Ot(q);else{let K=tu(T),st=wo(T),vt=Ht(T);$t([T],vt?"#d78769":"#e3d582");let Pt=K==="terrace"?" Ki\u1EC3m tra \u0111\u1ED9 ch\xEAnh to\xE0n l\xF4 tr\u01B0\u1EDBc khi ch\u1ECDn m\xF3ng b\u1EADc.":"";l.textContent=`${IS[K]} \xB7 Cao \u0111\u1ED9 ${st.low.toFixed(2)}\u2013${st.high.toFixed(2)}.${Pt} ${vt}`}}}function pe(T){if(!T)return;let W=nt.from;!nt.axis&&!_i(W,T)&&(nt.axis=Math.abs(T.x-W.x)>=Math.abs(T.z-W.z)?St:Jt);let X=nt.axis??St,q=X===St?{x:T.x,z:W.z}:{x:W.x,z:T.z},K=ct==="erase"?"erase":u.value,st=yr(tt,W,q,K,Ht,X),vt=Rt=>Rt.cells.some(Gt=>st.cells.some(Dt=>_i(Gt,Dt))),Pt=st.error?[]:ms(st.roads).filter(vt),Ut=!st.error&&ct==="erase"?ms(tt).filter(vt):[],Zt=st.error||a(Pt),Xt=[...new Map([...st.cells,...[...Pt,...Ut].flatMap(Rt=>Rt.cells)].map(Rt=>[ht(Rt),Rt])).values()];nt.trial={...st,error:Zt,affected:Xt},$t(Xt,Zt?"#db7d60":ct==="erase"?"#dbbc81":"#e4d575"),l.textContent=Zt||(ct==="erase"?`X\xF3a ${st.cells.length} \xF4 theo n\xE9t k\xE9o.`:`Xem tr\u01B0\u1EDBc \xB7 r\u1ED9ng t\u1EDBi ${st.width}\xD7.`)}function me(T){let W=new Set(T.map(K=>{let st=tt.get(ht(K));return st?.bridgeId??st?.approachBridgeId}).filter(Boolean)),X=new Map(T.map(K=>[ht(K),K]));for(let[K,st]of tt)W.has(st.bridgeId??st.approachBridgeId)&&X.set(K,st);let q=new Map(sp(tt,[...X.keys()]));for(let[K,st]of tt)q.has(K)||X.set(K,st);for(let K of X.keys())q.delete(K);return{roads:q,cells:[...X.values()],changes:[],error:"",width:1}}function Ce(T,W=T.cells,X=[],q=!1){let K=new Set(T.error?[]:D.removals(W,T.changes,X));if(q&&!T.error)for(let st of i)Number.isInteger(st.sceneryId)&&It(st)&&W.some(vt=>Ft(vt,st))&&K.add(st.sceneryId);return{...T,scenery:[...K].map(st=>({id:st,hidden:!0}))}}function Ne(T,{centerline:W,...X}={}){let q={roads:tt,cells:T,width:Number(_.value),material:u.value,surfaceY:e,waterAt:Jn,obstacle:Yt,allowLeveling:y.checked,assisted:!0,...X},K=Rt=>{if(!W)return Ec(Rt);if(!Rt.elevated){let Gt=cu({...Rt,route:W});if(!Gt.legacyBridge)return{...Gt,length:W.length}}return{...jp(Ec(Rt),W),legacyBridge:!0}},st=K(q);if(st.error||!st.gradeEdits.length)return Ce({...st,changes:[]},st.cells,[],!0);let vt=P.planRoad(st.gradeEdits,(Rt,Gt)=>Et(Rt,Gt,!1));if(vt.error)return{...st,error:vt.error,errorCell:vt.errorCell,changes:[]};let Pt=new Map(vt.changes.map(({index:Rt,newY:Gt})=>[Rt,Gt])),Ut=K({...q,cells:st.route??T,surfaceY:(Rt,Gt)=>e(Rt,Gt,Pt),allowLeveling:!1});if(Ut.error)return{...Ut,changes:[]};let Zt=Ut.cells.filter(Rt=>!Ut.roads.get(ht(Rt))?.bridgeId),Xt=new Set(Zt.map(ht));return Ce({...Ut,core:Zt,transition:vt.cells.filter(Rt=>!Xt.has(ht(Rt))),changes:vt.changes},Ut.cells,vt.cells,!0)}function ge(T,W){let X=Number(_.value),q;for(let K of[1.25,2.25]){let st=P.planRoadCorridor(T,{mode:W,width:X,shoulder:K,isLocked:(Ut,Zt)=>Et(Ut,Zt,!1)});if(st.error||!st.changes.length)return st;let vt=new Map(st.changes.map(({index:Ut,newY:Zt})=>[Ut,Zt])),Pt=cu({roads:tt,route:T,width:X,material:u.value,surfaceY:(Ut,Zt)=>e(Ut,Zt,vt),waterAt:Jn,obstacle:Yt});if(!Pt.error)return Ce({...st,...Pt,length:T.length},Pt.cells,st.transition,!0);q={...Pt,error:st.blocked?.reason??Pt.error,errorCell:st.blocked?.cell??Pt.errorCell,changes:[]}}return q}function ze({cells:T,centerline:W}){let X=Ne(T,{centerline:W}),q=Pt=>W&&!Pt.legacyBridge?{...Pt,visualRoute:W}:Pt;if(X=q(X),!X.error)return{trial:X,candidates:[{trial:X,label:X.bridges?.length?"\u0110\u01B0\u1EDDng v\xE0 c\u1EA7u":X.changes.length?"\u0110\u01B0\u1EDDng v\xE0 g\u1ECDt \u0111\u1EAFp nh\u1EB9":"\u0110\u01B0\u1EDDng theo \xF4"}]};if(!y.checked||!W||W.error||X.legacyBridge||W.cells.some(Pt=>Yt(Pt)&&!tt.get(ht(Pt))?.roadCurveId))return{trial:X,candidates:[]};let st=(W.length<=12?["slope","flatten"]:["slope"]).map(Pt=>({label:Pt==="flatten"?"San ph\u1EB3ng d\u01B0\u1EDBi \u0111\u01B0\u1EDDng":"L\xE0m d\u1ED1c d\u01B0\u1EDBi \u0111\u01B0\u1EDDng",trial:q(ge(W,Pt))})),vt=st.filter(({trial:Pt})=>!Pt.error&&Pt.changes.length).sort((Pt,Ut)=>Pt.trial.movedHeight-Ut.trial.movedHeight);if(!vt.length){let Pt=st.find(Ut=>Ut.trial.error)?.trial;Pt?.error!==X.error&&(X={...X,note:Pt?.error})}return{trial:X,candidates:vt}}function qe(T,W=!1,X=!1){ye();let q=ct==="flatten",K=q||ct==="slope"||ct==="draw"&&T.core&&T.changes.length,st=new Map((T.skipped??[]).map(Gt=>[ht(Gt),Gt]));q&&T.errorCell&&st.set(ht(T.errorCell),T.errorCell);let vt=new Map(T.changes.map(({index:Gt,newY:Dt})=>[Gt,Dt])),Pt=(Gt,Dt)=>e(Gt,Dt,vt),Ut=new Map((T.cells??[]).map(Gt=>[ht(Gt),{...Gt,color:T.roads?.get(ht(Gt))?.bridgeId?"#80cbe4":T.changes.length?"#edc368":"#a0db87"}]));if(T.core){for(let Gt of T.transition??[])Ut.set(ht(Gt),{...Gt,color:"#c6b47f"});for(let Gt of T.core){let Dt=Gt.x+.5,ue=Gt.z+.5,Oe=T.targetAt?.(Dt,ue)??T.targetY??Pt(Dt,ue),en=K?d0(e(Dt,ue)-Oe):"#83cd93";Ut.set(ht(Gt),{...Gt,color:en})}}T.errorCell&&!q&&Ut.set(ht(T.errorCell),{...T.errorCell,color:"#d66c58"});let Zt=(Gt,Dt)=>Math.max(e(Gt,Dt),e(Gt,Dt,vt)),Xt=ct==="erase"?O:T.roads?Sc(T.roads,Zt):Zt,Rt=(Gt,Dt)=>Math.max(Xt(Gt,Dt),Jn(Gt,Dt)?.y??-1/0);if(T.ribbon){T.errorCell&&$t([T.errorCell],"#ff5722",e,.25);let Gt=(Oe,en)=>Math.max(e(Oe,en),Jn(Oe,en)?.y??-1/0),Dt=T.error?"#ff5722":T.targetAt?(Oe,en)=>d0(e(Oe,en)-T.targetAt(Oe,en)):"#00e5ff",ue=W&&ct==="draw"?.1:.25;it=hm(T.ribbon,Gt,Dt,ue,T.error?"#ff7665":"#fffdf5"),V.add(it)}else if(K){let Gt=[...Ut.values()].filter(ue=>!st.has(ht(ue))),Dt=(ue,Oe)=>Math.max(e(ue,Oe),Jn(ue,Oe)?.y??-1/0);if($t(Gt,"#a0db87",Dt,.25),Gt.length||st.size){let ue=W?T.core??[]:Gt;et=dm(ue,st.values(),Dt),V.add(et)}}else $t([...Ut.values()],"#a0db87",Rt,W?.35:.61);if(K&&W&&T.core?.length&&!T.error){let Gt=q?T:{...T,targetAt:Pt},Dt=Xm(Gt,Pt,X||!q);it?it.add(Dt):(it=Dt,V.add(it))}if(T.discarded?.length&&(Q=Es(T.discarded.map(Gt=>({...Gt,color:"#eb645b"})),Rt,{opacity:.28,grid:!0,elevation:.085,order:5}),V.add(Q)),W&&ct==="draw"&&!T.error){let Gt=new Map(T.cells.map(Dt=>[ht(Dt),T.roads.get(ht(Dt))]).filter(([,Dt])=>Dt));if(T.junctionStyle){for(let Dt of T.roads.values())if(Dt.junctionStyle&&Dt.junctionStyle!==tt.get(ht(Dt))?.junctionStyle)for(let ue=-1;ue<=1;ue++)for(let Oe=-1;Oe<=1;Oe++){let en=ht({x:Dt.x+ue,z:Dt.z+Oe}),Is=T.roads.get(en);Is&&Gt.set(en,Is)}}bt=uu(Gt,Sc(T.roads,(Dt,ue)=>e(Dt,ue,vt)),[],{terrainPaths:!1,groundY:e,preview:!0}).group,bt.traverse(Dt=>{if(!Dt.material)return;let ue=Dt.material.clone();Dt.material.isMeshBasicMaterial&&Dt.material.dispose(),Dt.material=ue,ue.transparent=!0,ue.opacity=.62,ue.depthWrite=!1,Dt.castShadow=!1,Dt.renderOrder=6}),V.add(bt)}if(W&&T.scenery?.length)for(let Gt of D.points(T.scenery.map(Dt=>Dt.id).filter(Dt=>N.has(Dt)))){let Dt=new Nt(new ls(.16,.22,12),new Be({color:"#c8574e",transparent:!0,opacity:.8,depthTest:!1}));Dt.rotation.x=-Math.PI/2,Dt.position.set(Gt.x,e(Gt.x,Gt.z)+.08,Gt.z),Dt.renderOrder=7,bt||(bt=new zt,V.add(bt)),bt.add(Dt)}l.textContent=T.error?`${T.error}${T.errorCell?` \xB7 \xD4 (${T.errorCell.x}, ${T.errorCell.z})`:""}${T.note?` ${T.note}`:""}`:ct==="draw"?`Xem tr\u01B0\u1EDBc \xB7 ${T.width}\xD7${Number.isFinite(T.length)?` \xB7 ${T.length.toLocaleString("vi-VN",{maximumFractionDigits:1})}/60 \u0111\u01A1n v\u1ECB`:""}${T.bridges?.length?` \xB7 ${T.bridges.length} c\u1EA7u`:""}${T.changes.length?" \xB7 c\xF3 ch\u1EC9nh n\u1EC1n":""}.${T.note?` ${T.note}`:""}`:ct==="erase"?`Xem tr\u01B0\u1EDBc x\xF3a ${T.cells.length} \xF4.`:ct==="slope"?`D\u1ED1c ${Math.round((T.grade??0)*100)}% \xB7 ${T.ribbon?`r\u1ED9ng ${T.ribbon.width}\xD7 \xB7 `:""}${T.core?.length??0} \xF4.`:T.core?`San ${T.core.length} \xF4 \xB7 vi\u1EC1n ${T.transition.length} \xF4${T.skipped?.length?` \xB7 b\u1ECF qua ${T.skipped.length} \xF4`:""}${T.capped?" \xB7 gi\u1EDBi h\u1EA1n 12\xD712":""}.`:`Xem tr\u01B0\u1EDBc \xB7 ${T.changes.length} \u0111\u1EC9nh \u0111\u1ECBa h\xECnh thay \u0111\u1ED5i.`}function Cs({from:T,cells:W},X,q={}){let K=P.planBrush({mode:ct,from:T,to:X,size:Number(v.value),cells:ct==="slope"?W:void 0,isLocked:(st,vt)=>Et(st,vt,!1),lockCell:ee,...q});return Ce({...K,roads:tt},K.core??[],K.transition)}function $o(T,W={}){let X=f0(T.points,Number(_.value),1);return X.error?{changes:[],cells:[],error:X.error}:Cs(T,T.last,{ribbon:X,...W})}function Zi(T){let W=Number(_.value),X=Sr(su(T,tt,W),W);return Ps(X)}function Ps(T){let W=T.points.reduce((X,[q,K])=>qi(X,xi({x:q,z:K})),[]);return{centerline:T,cells:W}}function Ji(T,W){if(T.centerline?.error||!T.centerline)return null;let X=vc(T.centerline,Number(_.value),vt=>s.overlaps(vt));if(!X)return null;let q=X.route?ze(Ps(X.route)):{candidates:[]},K=`\xD4 (${X.blocked.x}, ${X.blocked.z})`,st=W?`${K} v\u01B0\u1EDBng c\xF4ng tr\xECnh. Ch\u01B0a n\u1ED1i t\u1EDBi B.`:`${K} v\u01B0\u1EDBng c\xF4ng tr\xECnh. Ch\u1EC9 x\xE2y \u0111o\u1EA1n ph\xEDa tr\u01B0\u1EDBc.`;return{...X,candidates:q.candidates.map(({trial:vt,label:Pt})=>({label:Pt==="\u0110\u01B0\u1EDDng theo \xF4"?"\u0110\u1EBFn tr\u01B0\u1EDBc c\xF4ng tr\xECnh":Pt,trial:{...vt,discarded:X.discarded,errorCell:X.blocked,note:st}}))}}function Zo(T){if(!T)return;let W=[T.x,T.z];if(!M){if(!yc(W,Xe).contains(W)){l.textContent="Ch\u1ECDn A trong ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng.";return}Z(W),l.textContent="\u0110\xE3 ch\u1ECDn A. Ch\u1EA5m B trong v\xF9ng vi\u1EC1n xanh, c\xE1ch A t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.";return}if(!M.contains(W)){l.textContent="Ch\u1ECDn B trong ph\u1EA1m vi ch\u1EC9nh \u0111\u01B0\u1EDDng v\xE0 c\xE1ch A t\u1ED1i \u0111a 60 \u0111\u01A1n v\u1ECB.";return}let X=Zi([M.origin,W]),q=ze(X);if(q.candidates.length){At(),Ei(q.candidates);return}if(X.centerline.error){qe(q.trial);return}let K;if(c0({origin:M.origin,end:W,width:Number(_.value),bounds:Xe,obstacle:Yt,waterAt:Jn,surfaceY:e,autoGrade:y.checked,tryRoute:Ut=>{let Zt=ze(Ps(Ut));return Zt.candidates.length&&(K=Zt.candidates),Zt.candidates[0]?.trial??Zt.trial}})&&K){At(),Ei(K.map(({label:Ut,trial:Zt})=>({label:Ut==="\u0110\u01B0\u1EDDng theo \xF4"?"\u0110i v\xF2ng t\u1EDBi B":`\u0110i v\xF2ng \xB7 ${Ut}`,trial:{...Zt,note:"Tuy\u1EBFn \u0111i v\xF2ng \u0111\xE3 n\u1ED1i t\u1EDBi B."}})));return}let vt=Ji(X,!0);if(vt?.candidates.length){Ei(vt.candidates);return}let Pt=q.trial;qe({...Pt,note:`${Pt.note?Pt.note+" ":""}Ch\u01B0a t\xECm \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng v\xF2ng h\u1EE3p l\u1EC7 trong 60 \u0111\u01A1n v\u1ECB. Ch\u1ECDn l\u1EA1i B.`})}function Or(T,W){if(ct==="draw"){let X=Math.abs(W.x-nt.origin.x),q=Math.abs(W.z-nt.origin.z),st=R.value==="snap"&&Math.min(X,q)<=Math.max(X,q)*Math.tan(Math.PI/12)&&nt.points.every(([Xt,Rt])=>X>=q?Math.abs(Rt-nt.origin.z)<=1:Math.abs(Xt-nt.origin.x)<=1)&&nt.points.length>1?[nt.points[0],X>=q?[W.x,nt.origin.z]:[nt.origin.x,W.z]]:nt.points;Object.assign(nt,Zi(st));let{centerline:vt}=nt,Pt=vt.steps.find(Xt=>Xt.cells.some(Rt=>s.overlaps(Rt))),Ut=Pt?.cells.find(Xt=>s.overlaps(Xt))??vt.cells.find(Xt=>!tt.get(ht(Xt))?.roadCurveId&&Yt(Xt)),Zt=Pt?vc(vt,Number(_.value),Xt=>s.overlaps(Xt))?.discarded:[];nt.trial={...vt,width:Number(_.value),changes:[],error:st.length>1?vt.error||(Ut?Yt(Ut):""):"",errorCell:Ut,discarded:Zt}}else if(ct==="flatten")nt.trial=Cs(nt,T);else{if(ct==="erase")nt.cells=qi(nt.cells,T);else{let X=nt.raw.at(-1);nt.raw.push(...qi([X],T).slice(1,21-nt.raw.length));let q=Math.abs(W.x-nt.origin.x),K=Math.abs(W.z-nt.origin.z),st=R.value==="snap"&&nt.raw.every(vt=>Math.abs(q>=K?vt.z-nt.from.z:vt.x-nt.from.x)<=1)&&Math.min(q,K)<=Math.max(q,K)*Math.tan(Math.PI/12)&&new Set(nt.raw.map(ht)).size===nt.raw.length;if(nt.cells=st?qi([nt.from],q>=K?{x:T.x,z:nt.from.z}:{x:nt.from.x,z:T.z}):nt.raw,nt.useRibbon=!0,st){let[vt,Pt]=nt.points[0];nt.slopePoints=[nt.points[0],q>=K?[W.x,Pt]:[vt,W.z]]}else nt.slopePoints=null}nt.trial=nt.useRibbon?$o(nt.slopePoints?{...nt,points:nt.slopePoints}:nt):nt.cells.length>20?{cells:nt.cells.slice(0,20),changes:[],error:"M\u1ED7i n\xE9t t\u1ED1i \u0111a 20 \xF4. Chia tuy\u1EBFn th\xE0nh nhi\u1EC1u \u0111o\u1EA1n."}:me(nt.cells)}qe(nt.trial)}function Jo(T){return[...new Set([...tt.keys(),...T.keys()])].filter(X=>tt.get(X)!==T.get(X)).map(X=>({key:X,before:tt.get(X),after:T.get(X)}))}function Ei(T){let X=T.filter(({trial:q})=>q&&!q.error).flatMap(q=>{let{trial:K}=q;if(ct!=="draw")return[q];let st=rp(tt,K.roads,K.cells);return st.length?st.map(({style:vt,roads:Pt})=>({...q,label:vt==="roundabout"?"V\xF2ng xoay":"Giao c\xF9ng m\u1EE9c",trial:{...K,roads:Pt,junctionStyle:vt}})):[q]}).flatMap(q=>{if(ct!=="draw"||!q.trial.visualRoute||q.trial.bridges?.length||q.trial.legacyBridge)return[q];let K=Wp(q.trial.visualRoute,{material:u.value});return K?[{...q,label:`${q.label} \xB7 \xD4 vu\xF4ng`},{...q,label:`${q.label} \xB7 Bo tr\xF2n`,trial:{...q.trial,roads:Xp(q.trial.roads,K),roadVisual:K}}]:[{...q,label:`${q.label} \xB7 \xD4 vu\xF4ng`}]});return X.length?(mt={options:X,current:0},z.replaceChildren(),X.forEach(({label:q,trial:K},st)=>{let vt=document.createElement("button");vt.type="button";let Pt=document.createElement("strong"),Ut=document.createElement("small");Pt.textContent=q;let Zt=K.scenery?.filter(Rt=>N.has(Rt.id)).length??0,Xt=(ct==="draw"?K.cells.filter(Rt=>!tt.has(ht(Rt))).length:0)+(K.bridges?.length??0)*3+Math.ceil(K.changes.length/4)+Zt;if(Ut.textContent=ct==="erase"?`${K.cells.length} \xF4`:`\u01AF\u1EDBc t\xEDnh ${Xt} \u0111i\u1EC3m${Zt?` \xB7 d\u1ECDn ${Zt}`:""}`,vt.append(Pt),ct==="flatten"){let Rt=document.createElement("small");Rt.textContent=`San ${K.core.length} \xF4 \xB7 Taluy ${K.transition.length} \xF4`,vt.append(Rt)}if(ct==="draw"&&K.changes.length){let Rt=document.createElement("small"),Gt=new Set([...K.core??[],...K.transition??[]].map(ht)),Dt=K.maxChange??K.changes.reduce((ue,Oe)=>Math.max(ue,Math.abs(Oe.newY-Oe.oldY)),0);Rt.textContent=`V\xF9ng ch\u1EC9nh n\u1EC1n ${Gt.size} \xF4 \xB7 cao \u0111\u1ED9 \u0111\u1ED5i t\u1ED1i \u0111a ${Dt.toLocaleString("vi-VN",{maximumFractionDigits:2})}`,vt.append(Rt)}vt.append(Ut),vt.addEventListener("click",()=>Ko(st)),z.append(vt)}),I.hidden=!1,Ko(0),re(),!0):!1}function Ko(T){mt.current=T;for(let[q,K]of[...z.children].entries())K.setAttribute("aria-pressed",String(q===T));let{trial:W,softShoulder:X}=mt.options[T];qe(W,!0,X)}function U(){if(!mt)return;let{trial:T,label:W}=mt.options[mt.current];ie(),At();let X=new Map(T.cells.map(K=>[ht(K),K]));if(T.roads!==tt)for(let{key:K,before:st,after:vt}of Jo(T.roads))X.set(K,st??vt);let q=T.scenery?.filter(K=>N.has(K.id)).length??0;ft(T.roads,[...X.values()],`\u0110\xE3 \xE1p d\u1EE5ng ${W.toLocaleLowerCase("vi")}${q?` v\xE0 d\u1ECDn ${q} c\xE2y \u0111\xE1`:""}.`,T.changes,T.scenery),re()}function ot(T,W){let{cells:X,last:q}=T;if(re(),W){ye();return}let K=T.centerline?.points.length>1?T.centerline:void 0,st=ct==="draw"?ze({cells:X,centerline:K}):null,vt=st?.trial??T.trial,Pt=[];if(st){let Ut=!st.candidates.length&&Ji(T,!1);if(Ut){Ei(Ut.candidates)||qe({...vt,discarded:Ut.discarded,errorCell:Ut.blocked});return}if(Pt.push(...st.candidates),!K?.error&&X.length>=3&&X.length<=20){let Zt=Ne(X,{centerline:K,elevated:!0});!Zt.error&&Zt.bridges?.some(Xt=>Xt.kind==="viaduct")&&Pt.push({label:"\u0110\u01B0\u1EDDng tr\xEAn tr\u1EE5",trial:Zt})}}else{if(Pt.push({label:{flatten:"San ph\u1EB3ng",slope:"L\xE0m d\u1ED1c",erase:"X\xF3a \u0111o\u1EA1n \u0111\u01B0\u1EDDng"}[ct],trial:vt}),ct==="flatten"&&!vt.error&&vt.changes.length&&vt.core.length>1){let Ut=Cs(T,q,{softEdges:!0}),Zt=new Map(vt.changes.map(Xt=>[Xt.index,Xt.newY]));!Ut.error&&(Ut.changes.length!==Zt.size||Ut.changes.some(Xt=>Xt.newY!==Zt.get(Xt.index)))&&Pt.push({label:"San v\xE0 chuy\u1EC3n ti\u1EBFp tho\u1EA3i",trial:Ut,softShoulder:!0})}if(ct==="slope"&&vt.error&&vt.ribbon){let Ut=$o(T.slopePoints?{...T,points:T.slopePoints}:T,{trimLockedShoulder:!0});!Ut.error&&Ut.trimmed?.length&&Pt.push({label:"L\xE0m d\u1ED1c, gi\u1EEF n\u1EC1n b\xEAn c\u1EA1nh",trial:Ut})}}Ei(Pt)||(qe(vt),ct==="draw"&&!K?.error&&X.length>1&&X.length<=20&&(_t=X,E.hidden=!1))}function dt(T,W=!0){for(let X of[!1,!0])D.apply(T.filter(q=>(W?q.hidden:!q.hidden)===X).map(q=>q.id),X)}function pt(T,W,X=[],q=lt,K=[]){if(s){let st={roads:Jo(T),terrain:X,scenery:K,beforeLevel:lt,afterLevel:q};(st.roads.length||X.length||K.length||lt!==q)&&(H.push(st),H.length>40&&H.shift(),G.length=0),P.apply(X),dt(K)}tt=T,lt=q,Wt(),l.textContent=W,ne(),re()}function ft(T,W,X,q=[],K=[]){if(j.busy(W)){L={next:T,cells:W,message:X,changes:q,sceneryEdits:K},j.restrict(W),l.textContent="\u0110ang \u0111\u1EE3i ng\u01B0\u1EDDi v\xE0 xe r\u1EDDi \u0111o\u1EA1n \u0111\u01B0\u1EDDng. \u0110\u1ED5i ch\u1EBF \u0111\u1ED9 \u0111\u1EC3 h\u1EE7y.",re();return}pt(T,X,q,lt,K)}function kt(T,W,X){if(L||nt||mt||!T.length)return;let q=T.at(-1),K=q.roads.map(st=>st.after??st.before);if(j.busy(K)){l.textContent="\u0110\u1EE3i ng\u01B0\u1EDDi v\xE0 xe r\u1EDDi \u0111o\u1EA1n n\xE0y r\u1ED3i th\u1EED l\u1EA1i.";return}T.pop(),W.push(q),P.apply(q.terrain,X),dt(q.scenery,X);for(let st of q.roads){let vt=X?st.after:st.before;vt?tt.set(st.key,vt):tt.delete(st.key)}lt=X?q.afterLevel:q.beforeLevel,Ct("inspect"),Wt(),l.textContent=X?"\u0110\xE3 l\xE0m l\u1EA1i thao t\xE1c.":"\u0110\xE3 ho\xE0n t\xE1c.",ne()}for(let T of p)T.addEventListener("click",()=>Ct(T.dataset.planMode));for(let T of[x,g,d])T.addEventListener("change",Vt);if(h.addEventListener("change",()=>{if(s){let T=Number(h.value);Ct(ct),pt(tt,`B\u1EBFn xe Lv${T} \xB7 m\u1EDF ${Vi.slice(0,T).map(W=>Yo[W]).join(", ")}.`,[],T);return}lt=Number(h.value),F=null,$t([],""),re(),Wt(),l.textContent=`B\u1EBFn xe Lv${lt} \xB7 m\u1EDF ${Vi.slice(0,lt).map(T=>Yo[T]).join(", ")}.`,ne()}),f.addEventListener("click",()=>{!F?.length||L||Vi.indexOf(u.value)>=lt||ft(yi(tt,F,u.value),F,`\u0110\xE3 \u0111\u1ED5i ${F.length} \xF4 sang ${Yo[u.value].toLowerCase()}.`)}),document.querySelector("#load-sample").addEventListener("click",()=>{if(s){Ct("inspect");let T=P.heightDeltas().map(({index:X,oldY:q,newY:K})=>({index:X,oldY:K,newY:q})),W=[...D.hidden].map(X=>({id:X,hidden:!1}));pt(o(lt),`\u0110\xE3 n\u1EA1p m\u1EA1ng \u0111\u01B0\u1EDDng m\u1EABu theo c\u1EA5p b\u1EBFn xe Lv${lt}.`,T,lt,W);return}tt=o(lt),Wt(),Ct("inspect"),l.textContent=`\u0110\xE3 n\u1EA1p m\u1EA1ng \u0111\u01B0\u1EDDng m\u1EABu theo c\u1EA5p b\u1EBFn xe Lv${lt}.`,ne()}),s){document.querySelector("#confirm-edit").addEventListener("click",U),document.querySelector("#cancel-edit").addEventListener("click",()=>Ct(ct)),document.addEventListener("keydown",T=>{!mt&&!M||T.ctrlKey||T.metaKey||T.altKey||(T.key==="Escape"&&Ct(ct),T.key.toLowerCase()==="v"&&U())}),S.addEventListener("click",()=>kt(H,G,!1)),w.addEventListener("click",()=>kt(G,H,!0)),E.addEventListener("click",()=>{if(ct!=="draw"||L||nt||mt||!_t)return;let T=Ne(_t,{suggestDetour:!0}).detour;if(!T?.length){l.textContent="Ch\u01B0a t\xECm \u0111\u01B0\u1EE3c \u0111\u01B0\u1EDDng v\xF2ng ng\u1EAFn quanh n\xE9t k\xE9o. Th\u1EED \u0111\u1ED5i \u0111i\u1EC3m \u0111\u1EA7u ho\u1EB7c \u0111i\u1EC3m cu\u1ED1i.";return}let W=Ne(T);Ei([{label:"\u0110\u01B0\u1EDDng v\xF2ng",trial:W}])?E.hidden=!0:qe(W)});for(let T of[u,_,y,v,R,b].filter(Boolean))T.addEventListener("change",()=>{!L&&!nt&&Ct(ct)})}return s||LS(e),he()||(tt=o(lt)),Wt(),Ct("inspect"),{begin(T,W){if(!T||L||mt||W.shiftKey||!["draw","erase","flatten","slope"].includes(ct)||ct==="draw"&&b?.value==="points")return!1;let X=xi(T);return nt={from:X,origin:T,cells:[X],raw:[X],last:X,points:[[T.x,T.z]]},s?(_t=null,E.hidden=!0,re(),Or(X,T)):pe(nt.from),!0},move(T){if(!nt||!T)return;let W=xi(T);if(s){if(ct==="draw"||ct==="slope"){let X=nt.points.at(-1);if(Math.hypot(T.x-X[0],T.z-X[1])<.18)return;let q=ct==="draw"?512:96;nt.points.length>=q?nt.points[q-1]=[T.x,T.z]:nt.points.push([T.x,T.z])}else if(_i(W,nt.last))return;nt.last=W,Or(W,T)}else pe(W)},finish(T){if(!nt)return;let W=nt,{trial:X}=W;if(nt=null,s){ot(W,T);return}$t([],""),!(T||X.error)&&ft(X.roads,X.affected,ct==="erase"?"\u0110\xE3 x\xF3a d\u1EA3i \u0111\u01B0\u1EDDng.":`\u0110\xE3 v\u1EBD d\u1EA3i \u0111\u01B0\u1EDDng \xB7 r\u1ED9ng t\u1EDBi ${X.width}\xD7.`)},inspect(T,W){ct==="draw"&&b?.value==="points"&&!L&&!mt&&Zo(T),T&&["inspect","upgrade"].includes(ct)&&Qt(xi(T),W)},pickRoad(T,W){if(!s||!["inspect","draw","erase","upgrade"].includes(ct))return W?.point;let X=xt.group.getObjectByName("C\u1EA7u ng\u01B0\u1EDDi ch\u01A1i"),q=X&&T.intersectObject(X,!0)[0];return q&&(!W||q.distance<W.distance)?q.point:W?.point},update(T,W){xt.update(T);let X=Math.min(.05,T-yt);if(W&&j.tick(T,X),L&&!j.busy(L.cells)){let{next:q,message:K,changes:st,sceneryEdits:vt}=L;L=null,j.restrict([]),pt(q,K,st,lt,vt)}yt=T}}}function LS(n){let t=[];for(let h=1;h<pc.length;h++){let[u,f]=pc[h-1],[p,x]=pc[h],g=Math.hypot(p-u,x-f)*4;for(let m=h===1?0:1;m<=g;m++)t.push(n(u+(p-u)*m/g,f+(x-f)*m/g))}let e=t.at(-1)-t[0],i=Math.max(...t.slice(1).map((h,u)=>Math.abs(h-t[u])*4));document.querySelector("#terrace-profile").textContent=`L\u1ED1i b\u1ED9 1\xD7 men \u0111\u1EA7u th\u1EC1m \xB7 d\xE0i ${((t.length-1)/4).toFixed(0)} \xF4 \xB7 ch\xEAnh cao ${e.toFixed(2)} \xB7 d\u1ED1c d\u1ECDc l\u1EDBn nh\u1EA5t ${(i*100).toFixed(0)}%.`;let s=Math.max(...Zn.slice(1).map((h,u)=>{let f=Zn[u];return(h.y-f.y)/Math.hypot(h.x-f.x,h.z-f.z)}));document.querySelector("#hill-profile").textContent=`\u0110\u01B0\u1EDDng xe 2\xD7 l\xEAn \u0111\u1ED3i \xB7 d\xE0i ${cp.toFixed(1)} \xF4 \xB7 ch\xEAnh cao ${(Zn.at(-1).y-Zn[0].y).toFixed(2)} \xB7 d\u1ED1c d\u1ECDc l\u1EDBn nh\u1EA5t ${(s*100).toFixed(0)}% theo t\u1EF7 l\u1EC7 demo.`;let r=document.querySelector("#terrace-chart").getContext("2d"),o=r.canvas.height,a=r.canvas.width,c=Math.min(...t),l=Math.max(...t);r.strokeStyle="#557247",r.lineWidth=2,r.beginPath();for(let[h,u]of t.entries())r.lineTo(4+h/(t.length-1)*(a-8),o-4-(u-c)/(l-c)*(o-8));r.stroke()}var DS=Gm();jd({initialView:"town",views:{town:{x:-3.75,y:1.35,z:-5.95,span:26.8,minWidth:40},plan:{x:4.65,y:.65,z:.9,span:13.8,minWidth:24},bridge:{x:-13.5,y:.95,z:-4.9,span:12.7,minWidth:22},riverEdit:{x:-11.6,y:.32,z:2.9,span:10.8,minWidth:15,elevation:115},hill:{x:9.7,y:1.75,z:-13.35,span:13.9,minWidth:21}},createTerrain:()=>ym({editableScenery:!0,clearGround:(n,t,e)=>Ic(n,t,e)||km(n,t,e)||DS(n,t,e)}),mountLayers({scene:n,canvas:t,terrain:e}){let{surfaceY:i,blockers:s}=e,r=Hm(i,Ic),o=_m(i);n.add(o.group,r.group);let a=r.buildings.map(c=>c.model);return{controls:p0({scene:n,canvas:t,surfaceY:i,blockers:s,town:{...r,terrain:e,protectedPath:Ic,landscape:o,hillRoute:Pc,roadSample:vu,trips:Vm}}),pickBuilding(c){let l=c.intersectObjects(a,!0)[0]?.object;for(;l?.parent&&l.parent!==r.group;)l=l.parent;return r.buildings.find(h=>h.model===l)}}}});})();
