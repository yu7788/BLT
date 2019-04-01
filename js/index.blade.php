<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>
        (function(){
            var currClientWidth,
                fontValue,
                originWidth;
            originWidth = 750;//ui设计稿的宽度，一般750或640
            __resize();

            window.addEventListener('resize', __resize, false);

            function __resize() {
                currClientWidth = document.documentElement.clientWidth;
                if (currClientWidth > 768){
                    currClientWidth = 768;
                }
                if (currClientWidth < 320){
                    currClientWidth = 320;
                }
                fontValue = ((625 * currClientWidth) / originWidth).toFixed(2);
                document.documentElement.style.fontSize = fontValue + '%';
            }
        })();
    </script>
    <title>貝萊通</title>
    <script type="text/javascript" src="/js/jquery-2.2.1.js"></script>
    <script type="text/javascript" src="/js/home.js?v={{config('version.version')}}"></script>
    <link rel="stylesheet" href="/css/home.css?v={{config('version.version')}}">
    <script type="text/javascript" src="/js/sweetalert.min.js"></script>
    <link rel="stylesheet" href="/css/sweetalert.css">
</head>
<body>
<header>
    <div class="logo"></div>
    <div class="nav_btn nav_btn_a"></div>
    <ul class="nav">
        <li><a href="/homes">貝萊通機器人</a></li>
        <li><a href="/homes/account">我的賬戶</a></li>
        <li><a class="logout">退出</a></li>
    </ul>
</header>
<section>

    <!--banner导航图-->
    <div class="banner">
        <p class="total_name">基金池總額</p>
        <p class="total_num"><span></span>USDT</p>
        <p class="residue_name">基金池剩余額度</p>
        <p class="residue_num"><span></span>USDT</p>
    </div>

    <!--内容区域-->
    <div class="box">
        <div class="token">
            <img src="/img/shouye_gonggao_icon.png" />
            <p class="token_p">最新公告:</p>
            <marquee class="token_title">貝萊通搬磚套利服務平臺</marquee>
        </div>

        <!--项目信息-->
        <div class="project">
            <h4>貝萊通</h4>

                <p class="name">暫無</p>
                <p class="pro_id">編號:<span>0</span></p>
                <p class="beted">已參投金額</p>
                <p class="beted_num">0&nbsp;USDT</p>
                <p class="aim">目標金額</p>
                <p class="aim_num">0&nbsp;USDT</p>
                <p class="abort">項目狀態</p>
                <p class="abort_time">暫無項目</p>
                <div class="btn"><a href="/projects">立即參與</a></div>
           {{--@if(!$project)
            @else
                <p class="name">{{$project->name}}</p>
                <p class="pro_id">編號:<span>{{$project->id}}</span></p>
                <p class="beted">已參投金額</p>
                <p class="beted_num">{{$allowed}}&nbsp;USDT</p>
                <p class="aim">目標金額</p>
                <p class="aim_num">{{$project->total}}&nbsp;USDT</p>
                <p class="abort">項目狀態</p>
                @if($project->status==0)
                    <p class="abort_time">籌集中</p>
                    @if($allowed!=$project->total)
                        <div class="btn"><a href="/projects/{{\Auth::id()}}">立即參與</a></div>
                    @endif
                @elseif($project->status==1)
                    <p class="abort_time">運營中</p>
                @elseif($project->status==2)
                    <p class="abort_time">分紅中</p>
                @elseif($project->status==3)
                    <p class="abort_time">已結束</p>
                @endif
            @endif--}}
        </div>

        <div class="trait">
            <h3>平臺特點</h3>
            <ul class="trait_lists">
                <li class="list_a"><img src="/img/tedian_1.png" /></li>
                <li class="list_b"><img src="/img/tedian_2.png" /></li>
                <li class="list_c"><img src="/img/tedian_3.png" /></li>
            </ul>
        </div>
        <div class="detail">
            <h3>貝萊通搬砖套利</h3>
            <p class="detail_content">BEILAITONG(貝萊通）是集多種區塊鏈主流數字資產，在全球交易所範圍內智能套利服務平臺。從嵌入合約應用程序，全球200多家交易所api端口，智能獲取行情分析，智能分析市場交易，智能獲取交易大數據，智能機器人多種套利策略，實現24小時的交易挖礦，對沖交易，高頻交易，合約交易的全球區塊鏈資產套利。</p>
        </div>
        <div class="rule">
            <h3>貝萊通規則</h3>
            <ul class="rule_lists">
                <li><p>1.以交易數據為基礎，以大數據分析技術為引擎，以智能機器人為套利策略，鎖定套利機會，為區塊鏈投資者開啟零風險，穩收益區塊鏈套利服務。</p></li>
                <li><p>2.10天-15天為壹期套利周期，投資人所投註USDT在投註過程中不可申請提現，收益2%-4%以當期套利服務結束收益為準，保本保息，使用USDT幣本位結算。</p></li>
                <li><p>3.套利場景<br />　　(1)數字貨幣交易所<br />　　(2)去中心化交易所<br />　　(3)總額限定，發布每期額度，滿額後開啟套利服務</p></li>
                <li><p>4.提現申請48小時（工作日除外）到投資者賬戶，投資者無需擔心投資風險；回報率等問題，只需要授權BEILAITONG平臺進行套利，省心省力獲得穩定收益。</p></li>
            </ul>
        </div>
        <div class="about">
            <h3>關於我們</h3>
            <p class="about_content">BEILAITONG未來在全世界範圍內為BEILAITONG的合約用戶提供高質量服務，在向合約用戶提供安全、智能、快速、穩定、高效的人性化服務的同時，也向全球各地提供智能合約交易的合約交易機制和經驗。</p>
            <img src="/img/guanyuwomen_tu.png" />
        </div>
    </div>
</section>
<footer>
    <div class="footer_box">贝莱通搬磚套利服務平臺&nbsp;|&nbsp;基金</div>
</footer>
    <div id="wrap"  class="common-part pay-part pay-part_a">
         <div class="common-dialog pay-dialog">
             <div class="dialog-title"></div>
             <textarea class="pay-content" readonly></textarea>
             <div class="know">確定</div>
         </div>
    </div>
    <div id="wrap_b"  class="common-part_b pay-part_b pay-part_b">
         <div class="common-dialog_b pay-dialog_b">
             <div class="dialog-title_b">您確定要退出</div>
             <p>{{\Auth::user()->name}}&nbsp;?</p>
             <div class="btn_box">
                <div class="n" id="n">取消</div>
                <div class="y" id="y">確定</div>
             </div>
         </div>
    </div>
</body>
<script type="text/javascript">
    $(function(){
                $(".nav_btn").click(function () {
                    $(".nav").slideToggle(200);
                    if ($(this).hasClass("nav_btn_a")){
                        $(this).removeClass("nav_btn_a").addClass("nav_btn_b")
                    } else{
                        $(this).removeClass("nav_btn_b").addClass("nav_btn_a")
                    }
                    $("section").click(function () {
                        $(".nav").slideUp(200);
                        $(".nav_btn").removeClass("nav_btn_b").addClass("nav_btn_a")
                    });
                });
            })
</script>
</html>