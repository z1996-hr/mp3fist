<template>
<div id="app">
        <div class="top">
            <img src="../assets/img/MP3.png" alt="">
            <input type="text" class="ssk" v-model="query" @keyup.enter="searchmusic" placeholder="请输入要搜索的歌手名字">
        </div>
        <div class="middle">
            <div class="left">
                <ul class="songlist">
                    <li class="mp3dan" v-for="item in musiclist" :key='item.name'>
                        <div class="playimg" @click="playmusic(item.id)" >
                            
                        </div>
                        <div class="musicname"  >
                        <b v-cloak>{{item.name}} </b>
                        </div>
                        <div class="mvimg" v-if="item.mvid!=0" @click="playmv(item.mvid)">
                           
                          
                        </div>
                    </li>
                </ul>
            </div>
            <div class="z">
                
                <div class="mp3img" :class="{playing:isPlaying}">
                    <img :src="musicpic" alt="" >
                </div>
            </div>
            <div class="right">
                <div><h2>热门留言</h2></div>
                <!-- <c:if ${musiccontent=full}>
                    <p>抱歉，没有找到留言!</p>
                </c:if> -->
                <!-- <div class="content"> -->
                    <ul>
                        <li v-for="item in musiccomments" :key="item.user">
                            <div class="usertou">
                                <img :src="item.user.avatarUrl" alt="">
                            </div>
                            <div class="username">
                                <h2 style="color:salmon">{{item.user.nickname}}</h2>
                               
                            </div>
                            <div class="wenzi">
                               <p>  {{item.content}}</p>
                            </div>
                        </li>
                    </ul>
                        
                <!-- </div> -->
            </div>
        </div>
        <div class="down">
            <audio  ref="audio" @play="play1" @pause="pause1" :src='musicurl' controls autoplay loop id="myaudio"></audio>
        </div>
        <div class="video_con" v-show="isshow" style="display:none">
            <video :src="mvurl" controls="controls" id="video1" ></video>
            <div class="mask" @click="hidden">退出播放 </div>
        </div>
    </div>
  
</template>

<script>
export default {
  name: 'App',
   
    data(){
        return{
        query:"",
        //歌曲数组
        musiclist:[],
        // 歌去链接
        musicurl:"",
        // 歌曲封面
        musicpic:"",
        // 歌去品论
        musiccomments:[],
        //歌曲播放状态
        isPlaying:false,
        // 歌曲MV链接
        mvurl:"",
        // 遮罩层显示状态
        isshow:false
        }
    },
    methods:{
        // 搜索歌曲列表
        searchmusic:function(){
            var that=this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query)
            .then(function(response){
                console.log(response)
                
                that.musiclist=response.data.result.songs;
            },function(err){});
            
        },
        // 实现单曲播放
        playmusic:function(musicID){
            var that=this;
            axios.get("https://autumnfish.cn/song/url?id="+musicID)
            .then(function(response){
              
              if(response.data.data[0].url==null){
                  alert("抱歉，没有找到歌曲信息！请你播放下一首")

              }
               that.musicurl=response.data.data[0].url
                // that.musiclist=response.data.result.songs;
            },function(err){});

            //歌曲详情获得。封面
            axios.get("https://autumnfish.cn/song/detail?ids="+musicID)
            .then(function(response){
                that.musicpic=response.data.songs[0].al.picUrl;
            },function(err){});

            //歌曲评论获取
            axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicID)
            .then(function(response){
                // console.log(response.data.hotComments)
                that.musiccomments=response.data.hotComments;
            },function(err){});
            
        },
        // 实现播放封面旋转状态切换
        play1:function(){
            // console.log("play");
            this.isPlaying=true;
        },
        pause1:function(){
            // console.log("pause");
            this.isPlaying=false;
        },

        // 播放MV，获取MV链接
        playmv:function(mvid){
            var that=this;
            var audio=document.getElementById('myaudio')
            if(audio.play){
                audio.pause();
            }
            //歌曲MV
            axios.get("https://autumnfish.cn/mv/url?id="+mvid)
            .then(function(response){
                // console.log(response);
                that.isshow=true;
                that.mvurl=response.data.data.url;
                console.log(response.data.data.url);
            },function(err){});
        //    var audio = document.getElementsByClassName('myaudio')
           
        },
       
        // 隐藏遮罩层，退出MV播放
        hidden:function(){
            this.isshow=false;
            var  video=document.getElementById("video1")
            var audio=document.getElementById("myaudio")
           
            video.pause();
            if(audio.pause){
                audio.play();
            }
            
           
            
        }

    }


}
</script>

<style>
    *{
    margin: 0;
    padding: 0;
}
#app{
    width: 910px;
    height: 700px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    margin-top: 50px;

}
.top{
    height: 100px;
    
    background: linear-gradient(to right,#85D0E7,#85D1EB);
    border-radius:10px 10px 0 0 ;
}
.top img{
    margin-left: 50px;
}
.top .ssk{
    float: right;
    width: 350px;
    margin-top: 30px;
    margin-right: 100px;
    height: 30px;
    border-radius:20px 20px 20px 20px ;
    background: linear-gradient(to right,#15A8E0,#1FACDA);
    outline:none;
}
.middle{
    height: 500px;
    border: solid 1px yellow;
    
    background: linear-gradient(to right,#E4D4B3,#B4C8C9);
}
.left{
    float: left;
    width: 300px;
    border-right:solid 2px #BBA686 ;
    height: 500px;
}
.songlist{
    height: 500px;
    overflow: auto;
    outline: none;
}
ul li{
    list-style:none;
}
.songlist li{
    list-style:none; 
    height: 80px;
    
    

}
.playimg{
   background-image: url(../assets/img/play.png);
   background-repeat: no-repeat;
   width: 60px;
   height: 60px;
   /* CSS3属性 设置大小宽度以及摆放位置*/
  background-size: 95% 95%;
  background-position: center;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 10px;
  float: left;
}
.mvimg{
    background-image: url(../assets/img/MVPB.png);
    background-repeat: no-repeat;
    width: 45px;
    height: 60px;
    /* CSS3属性 设置大小宽度以及摆放位置*/
   background-size: 95% 95%;
   background-position: center;
   margin-top: 10px;
   margin-bottom: 10px;
    margin-right: 0px ;
   float: right;
 }
 
 .musicname{
     width: 145px;
     height: 25px;
     float: left;
     margin-left: 0px;
    margin-top: 26px;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

 }





.z{
    float: left;
    width: 300px;
    
    height: 500px;
    
}
.mp3img{
    width: 200px;
    height: 200px;
    border-radius:100px 100px 100px 100px ;
    
    
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    overflow: hidden;
    
    
}
.mp3img img{
    width: 100%;
    height: 100%;
    list-style-type: disc;
    
}
.right{
    float: left;
    width: 300px;
    border-left:solid 2px #BBA686;
    height: 500px;
    overflow: auto;
}

.usertou{
    width: 100%;
    float: left;
}


 
.usertou{
    width: 50px;
    height: 50px;
    overflow: hidden;
    border-radius: 25px 25px 25px 25px;
    float: left;
    margin-left:2% ;
    
    
    
}
.username{
    
    width: 65%;
    height: 50px;
    float: right;
    
    margin-right: 13%;

}
.username h2{
    font-family: 幼圆;
    margin-top: 10px;
    font-size: small;
   
    
}
.wenzi{
    width: 100%;
    float: left;
    
    

}
.right > li{
    /* height: 150px; */
    margin-bottom: 20px;
}
.wenzi p{
    font-family: 楷体;
    font-size: small;
}
.usertou img{
    width: 100%;
    height: 100%;

}
.down{
    height: 100px;
    
    background-color: whitesmoke;
    border-radius:0 0 10px 10px ;
}
#myaudio{
    width: 100%;
    height: 80%;
    border: none;
    outline: none;
    

}
.playing{
    /*调用动画:动画名称 时间  速度（linear）匀速  持续状态（一直）*/
	animation: dd 20s linear infinite;
	position: relative;
	/*相对定位*/
	transform-style: preserve-3d;/*元素3D效果*/
}
@keyframes dd{
	0%{transform: rotateZ(0deg);}
	100%{transform: rotateZ(360deg);}
}
.video_con{
    width: 100%;
    height: 600px;
   
    position: absolute;
    top: 100px;
    background-color: #000;
}
#video1{
    width: 100%;
    height: 600px;
    
}
.mask{
    width: 40px;
    height: 40px;
    position: absolute;
    left: 860px;
    border-radius: 50%;
    border: red 1px solid;
    top:0px;
    background-color: snow;
    overflow: hidden;
    text-align: center;
}
</style>
