Vue.component('top-nav',{
   template:
       `
       <ul class="top">
       <router-link v-for="(item,key) in navData" :to="item.url" :key="key" tag="li" exact active-class="act">{{item.title}}</router-link>
       <router-link to="/login" tag="li" v-if="!isLogin">登录</router-link>
       <li v-if="isLogin" @click="show">
           {{name}}
       <span class="logout" v-show="isShow" @click="logout">退出登录</span>
       </li>
       </ul>
       `,
   data(){
       return {
           navData: [
               {title:'首页',url:'/'},
               {title:'简介',url:'/info'},
               {title:'文档',url:'/doc'}
           ],
           isLogin:false,
           name:"",
           isShow:false
       }
   },
   created(){
       this.name=this.get("login","name");
       this.isLogin=this.get("login","name");
   },
   methods:{
        show(){
            this.isShow=!this.isShow
        },
        logout(){
            this.del("login");
            router.push("/");
        }
   }
});
let home = Vue.component('home',{
    template:
        `
        <div class="box">
            <top-nav></top-nav>
            <img src="img/eg.jpg" alt="" class="img">
        </div>
        `
});
let info = Vue.component('info',{
    template:
        `
        <div class="box">
            <top-nav></top-nav>
            <transition>
                <router-view></router-view>
            </transition>
        </div>
        `
});
let list = Vue.component('list',{
    template:
        `
        <div class="box">
            <ul class="mui-table-view">
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/list/1" tag="a">
                    <img class="mui-media-object mui-pull-left" src="img/eg.jpg">
                    <div class="mui-media-body">
                    幸福
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                    </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/list/2" tag="a">
                    <img class="mui-media-object mui-pull-left" src="img/eg.jpg">
                    <div class="mui-media-body">
                    呼噜
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                    </div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media">
                    <router-link to="/list/3" tag="a">
                    <img class="mui-media-object mui-pull-left" src="img/eg.jpg">
                    <div class="mui-media-body">
                    心爱
                    <p class='mui-ellipsis'>能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？</p>
                    </div>
                    </router-link>
                </li>
            </ul>
        </div>
        `
});
let con = Vue.component('con',{
    template:
    `
    <div class="box">
        <h1>{{Data[$route.params.id-1].title}}</h1>
        <pre>{{Data[$route.params.id-1].con}}</pre>
    </div>
    `,
    data(){
        return {
            Data: [
                {'title': '幸福', 'con': '能和心爱的人一起睡觉'},
                {'title': '呼噜', 'con': '是件幸福的事情'},
                {'title': '心爱', 'con': '可是，打呼噜怎么办'}
            ]
        }
    }
});
let doc = Vue.component('doc',{
    template:
        `
        <div class="box">
            <top-nav></top-nav>
            <router-view class="left" name="left"></router-view>
            <router-view class="right" name="right"></router-view>
        </div>
        `
});
let leftNav = Vue.component('left-nav',{
    template:
        `
        <div>
            <ul>
                <router-link to="#one" tag="li">文档六</router-link>
                <router-link to="#two" tag="li">文档十</router-link>
                <router-link to="#trd" tag="li">文档十七</router-link>
            </ul>
        </div>
        `,
    watch:{
        $route(){
            let hash = this.$route.hash;
            function animate(){
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({tweeningNumber: document.querySelector('.right').scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({tweeningNumber: (document.querySelector(hash).offsetTop)-44}, 500)
                .onUpdate(function () {
                    document.querySelector('.right').scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start();
            animate()
        }
    }
});
let rightCon = Vue.component('right-con',{
    template:
        `
        <div>
            <div class="list">文档一</div>
            <div class="list">文档二</div>
            <div class="list">文档三</div>
            <div class="list">文档四</div>
            <div class="list">文档五</div>
            <div class="list" id="one">文档六</div>
            <div class="list">文档七</div>
            <div class="list">文档八</div>
            <div class="list">文档九</div>
            <div class="list" id="two">文档十</div>
            <div class="list">文档十一</div>
            <div class="list">文档十二</div>
            <div class="list">文档十三</div>
            <div class="list">文档十四</div>
            <div class="list">文档十五</div>
            <div class="list">文档十六</div>
            <div class="list" id="trd">文档十七</div>
            <div class="list">文档十八</div>
            <div class="list">文档十九</div>
            <div class="list">文档二十</div>
        </div>
        `
});
let login = Vue.component("login",{
    template:`
        <div class="box">
        <header class="mui-bar mui-bar-nav">
            <a class="mui-icon mui-icon-back" @click="back"></a>
			<h1 class="mui-title">登录</h1>
        </header>
        <div class="mui-content">
			<form id='login-form' class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='name' type="text" class="mui-input-clear mui-input" placeholder="请输入账号">
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码">
				</div>
			</form>

			<div class="mui-content-padded">
				<button id='login' class="mui-btn mui-btn-block mui-btn-primary" @click="submit">登录</button>
			</div>
			<div class="mui-content-padded oauth-area">
            </div>
		    </div>
		    </div>`,
    methods:{
        back(){
            router.push("/");
        },
        submit(){
            let obj={"name":document.querySelector("#name").value};
            this.save("login",obj);
            router.go(-1)
        }
    }
});